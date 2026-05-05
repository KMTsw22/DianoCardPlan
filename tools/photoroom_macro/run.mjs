import { chromium } from 'playwright';
import { readdir, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PHOTOROOM_URL = 'https://www.photoroom.com/tools/background-remover';
const USER_DATA_DIR = join(__dirname, '.browser_session');
const IMAGE_EXT = /\.(png|jpe?g|webp)$/i;

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { headless: false, retries: 1 };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--input' || a === '-i') opts.input = args[++i];
    else if (a === '--output' || a === '-o') opts.output = args[++i];
    else if (a === '--headless') opts.headless = true;
    else if (a === '--retries') opts.retries = Number(args[++i]) || 1;
    else if (a === '--help' || a === '-h') {
      printUsage();
      process.exit(0);
    }
  }
  if (!opts.input || !opts.output) {
    printUsage();
    process.exit(1);
  }
  opts.input = resolve(opts.input);
  opts.output = resolve(opts.output);
  return opts;
}

function printUsage() {
  console.log(`
사용법:
  node run.mjs --input <입력폴더> --output <출력폴더> [옵션]

필수:
  --input,  -i   입력 이미지 폴더 (png/jpg/webp)
  --output, -o   배경 제거된 이미지 저장 폴더 (없으면 생성)

옵션:
  --headless     브라우저 창 숨김 (기본: 보임)
  --retries N    실패 시 재시도 횟수 (기본: 1)
  --help, -h     이 도움말

예:
  node run.mjs -i "C:/.../frames_raw" -o "C:/.../frames_nobg"
`);
}

async function findFileInput(page, timeout = 30_000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    const handles = await page.$$('input[type="file"]');
    for (const h of handles) {
      const visible = await h.evaluate((el) => {
        const accept = el.getAttribute('accept') ?? '';
        return accept.includes('image') || accept === '' || accept === '*';
      });
      if (visible) return h;
    }
    await page.waitForTimeout(500);
  }
  throw new Error('파일 업로드 input 요소를 찾지 못함');
}

async function waitForDownloadAndSave(page, outPath) {
  const downloadButton = page.locator(
    'button:has-text("Download"), a:has-text("Download"), button:has-text("다운로드"), a:has-text("다운로드")'
  ).first();

  await downloadButton.waitFor({ state: 'visible', timeout: 120_000 });

  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 90_000 }),
    downloadButton.click(),
  ]);
  await download.saveAs(outPath);
}

async function processOne(page, inPath, outPath) {
  await page.goto(PHOTOROOM_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });

  // Dismiss cookie banner if present (best-effort)
  try {
    const cookieBtn = page.getByRole('button', { name: /accept|동의|허용|agree/i }).first();
    if (await cookieBtn.isVisible({ timeout: 2_000 })) await cookieBtn.click();
  } catch { /* ignore */ }

  const input = await findFileInput(page);
  await input.setInputFiles(inPath);

  await waitForDownloadAndSave(page, outPath);
}

async function main() {
  const { input, output, headless, retries } = parseArgs();

  if (!existsSync(input)) {
    console.error(`입력 폴더 없음: ${input}`);
    process.exit(1);
  }
  await mkdir(output, { recursive: true });

  const all = (await readdir(input))
    .filter((f) => IMAGE_EXT.test(f))
    .sort();
  const todo = all.filter((f) => !existsSync(join(output, f)));

  console.log(`입력:  ${input}`);
  console.log(`출력:  ${output}`);
  console.log(`이미지 ${all.length}개, 처리 필요 ${todo.length}개 (완료 ${all.length - todo.length}개)`);
  if (todo.length === 0) {
    console.log('모두 완료. 종료.');
    return;
  }

  const ctx = await chromium.launchPersistentContext(USER_DATA_DIR, {
    headless,
    acceptDownloads: true,
    viewport: { width: 1280, height: 900 },
  });
  const page = ctx.pages()[0] ?? (await ctx.newPage());

  console.log('\n첫 프레임 처리 시작. 로그인이 필요하면 브라우저에서 직접 로그인하세요.');
  console.log('(세션은 .browser_session 폴더에 저장되어 다음 실행부터 자동 유지)\n');

  let ok = 0, fail = 0;
  const failed = [];
  for (let i = 0; i < todo.length; i++) {
    const file = todo[i];
    const inPath = join(input, file);
    const outPath = join(output, file);
    const tag = `[${i + 1}/${todo.length}] ${file}`;

    let lastErr;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const t0 = Date.now();
        await processOne(page, inPath, outPath);
        const ms = Date.now() - t0;
        console.log(`${tag} ✓ ${(ms / 1000).toFixed(1)}s`);
        ok++;
        lastErr = null;
        break;
      } catch (err) {
        lastErr = err;
        if (attempt < retries) {
          console.log(`${tag} 재시도 (${attempt + 1}/${retries}) — ${err.message}`);
          await page.waitForTimeout(2_000);
        }
      }
    }
    if (lastErr) {
      console.error(`${tag} ✗ ${lastErr.message}`);
      failed.push(file);
      fail++;
    }
  }

  console.log(`\n완료: 성공 ${ok}, 실패 ${fail}`);
  if (failed.length) console.log('실패 목록:', failed.join(', '));

  await ctx.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
