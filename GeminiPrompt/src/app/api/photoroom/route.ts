import { NextRequest } from "next/server";
import { Builder, By, WebDriver, WebElement } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { readdir, mkdir, rename, stat, copyFile, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { runState, resetRunState, endRunState } from "./state";

export const runtime = "nodejs";
export const maxDuration = 3600;

const PHOTOROOM_URL = "https://www.photoroom.com/tools/background-remover";
const SESSION_DIR = resolve(process.cwd(), ".photoroom_session");
const DOWNLOADS_DIR = resolve(process.cwd(), ".photoroom_downloads");
const IMAGE_EXT = /\.(png|jpe?g|webp)$/i;
const MIN_VALID_BYTES = 1024;

type SsePayload =
  | { type: "init"; total: number; todo: number; completed: number; input: string; output: string }
  | { type: "captcha"; message: string }
  | { type: "paused" }
  | { type: "resumed" }
  | { type: "progress"; current: number; total: number; file: string; status: "processing" | "ok" | "fail"; error?: string; ms?: number }
  | { type: "done"; ok: number; fail: number; failed: string[] }
  | { type: "fatal"; error: string };

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

async function buildDriver(headless: boolean): Promise<WebDriver> {
  await mkdir(SESSION_DIR, { recursive: true });
  await mkdir(DOWNLOADS_DIR, { recursive: true });

  const opts = new chrome.Options();
  opts.addArguments(`--user-data-dir=${SESSION_DIR}`);
  opts.addArguments("--disable-blink-features=AutomationControlled");
  opts.addArguments("--window-size=1280,900");
  opts.addArguments("--no-first-run");
  opts.addArguments("--no-default-browser-check");
  if (headless) opts.addArguments("--headless=new");
  opts.excludeSwitches("enable-automation");
  opts.setUserPreferences({
    "download.default_directory": DOWNLOADS_DIR,
    "download.prompt_for_download": false,
    "download.directory_upgrade": true,
    "safebrowsing.enabled": true,
    "profile.default_content_settings.popups": 0,
  });

  const driver = await new Builder().forBrowser("chrome").setChromeOptions(opts).build();

  // Belt-and-suspenders: also set download dir via DevTools (works regardless of profile prefs).
  try {
    const cdpDriver = driver as unknown as {
      sendDevToolsCommand?: (cmd: string, params: Record<string, unknown>) => Promise<unknown>;
    };
    if (cdpDriver.sendDevToolsCommand) {
      await cdpDriver.sendDevToolsCommand("Page.setDownloadBehavior", {
        behavior: "allow",
        downloadPath: DOWNLOADS_DIR,
      });
    }
  } catch {
    /* CDP path not available — preferences above should still apply */
  }

  return driver;
}

async function snapshotDir(dir: string): Promise<Set<string>> {
  try {
    return new Set(await readdir(dir));
  } catch {
    return new Set();
  }
}

async function waitForNewDownload(
  dir: string,
  before: Set<string>,
  timeoutMs: number
): Promise<string> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (runState.aborted) throw new Error("aborted");

    const entries = await readdir(dir).catch(() => [] as string[]);
    const candidates = entries.filter(
      (e) => !before.has(e) && !e.endsWith(".crdownload") && !e.endsWith(".tmp") && !e.endsWith(".part")
    );

    for (const name of candidates) {
      const full = join(dir, name);
      const s1 = await stat(full).catch(() => null);
      if (!s1 || !s1.isFile() || s1.size < MIN_VALID_BYTES) continue;
      // Confirm size is stable so we know download finished.
      await sleep(400);
      const s2 = await stat(full).catch(() => null);
      if (!s2 || s2.size !== s1.size) continue;
      return full;
    }
    await sleep(400);
  }
  throw new Error("다운로드 대기 시간 초과 — 새 결과 파일이 도착하지 않음 (로그인 모달 또는 처리 실패 의심)");
}

async function findFileInputWithCaptchaWait(
  driver: WebDriver,
  send: (data: SsePayload) => void,
  timeoutMs: number
): Promise<WebElement> {
  const deadline = Date.now() + timeoutMs;
  let captchaNotified = false;
  let pausedNotified = false;

  while (Date.now() < deadline) {
    if (runState.paused) {
      if (!pausedNotified) {
        send({ type: "paused" });
        pausedNotified = true;
      }
      await sleep(500);
      continue;
    }
    if (pausedNotified && !runState.paused) {
      send({ type: "resumed" });
      pausedNotified = false;
    }
    if (runState.aborted) throw new Error("aborted");

    const html = await driver.getPageSource().catch(() => "");
    const hasChallenge =
      /challenge|cf-chl|cloudflare|사람인지|verify you are human|just a moment/i.test(html);

    const inputs = await driver.findElements(By.css('input[type="file"]'));
    for (const el of inputs) {
      try {
        const accept = (await el.getAttribute("accept")) ?? "";
        if (accept === "" || accept === "*" || accept.includes("image")) {
          // Hidden inputs accept sendKeys, but force visibility just in case the
          // app guards against null offsetParent before processing 'change'.
          await driver
            .executeScript(
              "arguments[0].style.display='block';arguments[0].style.visibility='visible';arguments[0].style.opacity='1';arguments[0].removeAttribute('hidden');",
              el
            )
            .catch(() => {});
          return el;
        }
      } catch {
        // stale element — keep looking
      }
    }

    if (hasChallenge && !captchaNotified) {
      send({
        type: "captcha",
        message:
          "Cloudflare 인증이 표시됨. '일시정지' 누르고 브라우저 창에서 직접 풀어주세요. 풀면 쿠키 저장돼서 이후 자동 통과.",
      });
      captchaNotified = true;
    }

    await sleep(1000);
  }
  throw new Error("파일 업로드 input을 찾지 못함 (캡차 미해결 또는 페이지 구조 변경)");
}

async function findDownloadButton(driver: WebDriver): Promise<WebElement | null> {
  const xpath =
    "//button[contains(., 'Download') or contains(., '다운로드')]" +
    " | //a[contains(., 'Download') or contains(., '다운로드')]";
  const els = await driver.findElements(By.xpath(xpath));
  for (const el of els) {
    try {
      if ((await el.isDisplayed()) && (await el.isEnabled())) return el;
    } catch {
      // stale
    }
  }
  return null;
}

async function waitForDownloadButton(driver: WebDriver, timeoutMs: number): Promise<WebElement> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (runState.aborted) throw new Error("aborted");
    const btn = await findDownloadButton(driver);
    if (btn) return btn;
    await sleep(500);
  }
  throw new Error("Download 버튼이 시간 내에 나타나지 않음");
}

async function waitWhilePaused(send: (data: SsePayload) => void): Promise<boolean> {
  if (!runState.paused) return runState.aborted;
  send({ type: "paused" });
  while (runState.paused && !runState.aborted) await sleep(500);
  if (!runState.aborted) send({ type: "resumed" });
  return runState.aborted;
}

async function moveFile(src: string, dst: string): Promise<void> {
  try {
    await rename(src, dst);
  } catch {
    // cross-device or locked — fall back to copy + delete
    await copyFile(src, dst);
    await unlink(src).catch(() => {});
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const inputDir = body?.inputDir as string | undefined;
  const outputDir = body?.outputDir as string | undefined;
  const headless = Boolean(body?.headless);
  const retries = Math.max(0, Math.min(3, Number(body?.retries ?? 1)));

  if (!inputDir || !outputDir) {
    return Response.json({ error: "inputDir과 outputDir을 모두 지정해주세요" }, { status: 400 });
  }

  const input = resolve(inputDir);
  const output = resolve(outputDir);

  if (!existsSync(input)) {
    return Response.json({ error: `입력 폴더가 없습니다: ${input}` }, { status: 400 });
  }

  await mkdir(output, { recursive: true });

  const allFiles = (await readdir(input)).filter((f) => IMAGE_EXT.test(f)).sort();
  const todo = allFiles.filter((f) => !existsSync(join(output, f)));

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      let closed = false;
      const send = (data: SsePayload) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch {
          closed = true;
        }
      };

      send({
        type: "init",
        total: allFiles.length,
        todo: todo.length,
        completed: allFiles.length - todo.length,
        input,
        output,
      });

      if (todo.length === 0) {
        send({ type: "done", ok: 0, fail: 0, failed: [] });
        controller.close();
        return;
      }

      resetRunState();

      const failed: string[] = [];
      let ok = 0;
      let fail = 0;
      let driver: WebDriver | null = null;
      let minimized = false;

      try {
        driver = await buildDriver(headless);
        let needsNav = true;

        for (let i = 0; i < todo.length; i++) {
          if (await waitWhilePaused(send)) break;

          const file = todo[i];
          const inPath = join(input, file);
          const outPath = join(output, file);
          send({ type: "progress", current: i + 1, total: todo.length, file, status: "processing" });

          let lastErr: Error | null = null;
          const t0 = Date.now();

          for (let attempt = 0; attempt <= retries; attempt++) {
            try {
              if (await waitWhilePaused(send)) throw new Error("aborted");

              if (needsNav) {
                await driver.get(PHOTOROOM_URL);
                // best-effort cookie consent
                try {
                  const cookieBtns = await driver.findElements(
                    By.xpath(
                      "//button[contains(., 'Accept') or contains(., '동의') or contains(., '허용') or contains(., 'Agree')]"
                    )
                  );
                  if (cookieBtns.length) await cookieBtns[0].click().catch(() => {});
                } catch {
                  /* ignore */
                }
              }

              const inputTimeout = needsNav ? 300_000 : 30_000;
              const fileInput = await findFileInputWithCaptchaWait(driver, send, inputTimeout);

              // Snapshot downloads BEFORE upload — we'll detect the new file by diff.
              const before = await snapshotDir(DOWNLOADS_DIR);

              await fileInput.sendKeys(inPath);

              // Wait until the Download button is ready (signals processing complete).
              const downloadBtn = await waitForDownloadButton(driver, 120_000);

              try {
                await downloadBtn.click();
              } catch {
                await driver.executeScript("arguments[0].click();", downloadBtn);
              }

              // Photoroom sometimes opens a quality/format menu after the first click.
              // If a dialog/menu Download appears, click that too.
              await sleep(600);
              const menuDl = await driver.findElements(
                By.xpath(
                  "//div[contains(@role,'dialog') or contains(@role,'menu') or contains(@class,'popover') or contains(@class,'Modal')]" +
                    "//button[contains(., 'Download') or contains(., '다운로드')]"
                )
              );
              if (menuDl.length) {
                await menuDl[0].click().catch(() => {});
              }

              const downloadedFile = await waitForNewDownload(DOWNLOADS_DIR, before, 90_000);
              await moveFile(downloadedFile, outPath);

              // Verify the moved file actually has bytes (defense in depth).
              const finalStat = await stat(outPath).catch(() => null);
              if (!finalStat || finalStat.size < MIN_VALID_BYTES) {
                throw new Error(`저장된 파일이 비정상 (size=${finalStat?.size ?? 0})`);
              }

              needsNav = false;
              lastErr = null;
              break;
            } catch (err) {
              lastErr = err instanceof Error ? err : new Error(String(err));
              needsNav = true;
              if (attempt < retries) await sleep(2_000);
            }
          }

          const ms = Date.now() - t0;
          if (lastErr) {
            fail++;
            failed.push(file);
            send({
              type: "progress",
              current: i + 1,
              total: todo.length,
              file,
              status: "fail",
              error: lastErr.message,
              ms,
            });
          } else {
            ok++;
            send({ type: "progress", current: i + 1, total: todo.length, file, status: "ok", ms });
          }

          if (!minimized && !lastErr && !headless) {
            try {
              await driver.manage().window().minimize();
              minimized = true;
            } catch {
              /* ignore */
            }
          }
        }

        send({ type: "done", ok, fail, failed });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        send({ type: "fatal", error: msg });
      } finally {
        endRunState();
        if (driver) await driver.quit().catch(() => {});
        closed = true;
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
