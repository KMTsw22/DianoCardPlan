import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { fillTemplate, loadAgentByName } from "@/lib/agent-loader";
import { generateImage, RefImage } from "@/lib/gemini";
import { frameHint, Motion, MOTIONS } from "@/lib/motion";
import { loadStyleRefs } from "@/lib/style-refs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RefSource = "field-summon" | "field-monster" | "card" | "character" | "attack-fx";

const IMG_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

/**
 * character refSource: 사용자가 references/character/{id}/ 에 넣어둔 이미지를 **최우선** 사용.
 *   - 엔티티 폴더에 파일이 있으면 (특히 CH001_ref.png 등) 그걸 소스로 잡음.
 *   - 없으면 public/generated/character/{id}.png (AI 생성본)으로 폴백.
 * 다른 refSource는 기존대로 public/generated 경로 사용.
 */
async function resolveRefPath(source: RefSource, refId: string): Promise<string> {
  const webRoot = process.cwd();
  const genBase = path.join(webRoot, "public", "generated");

  if (source === "character") {
    // references/character/{id}/ 에서 "ref" 가 포함된 파일명 우선, 없으면 첫 PNG
    const refDir = path.join(webRoot, "references", "character", refId);
    try {
      const files = (await fs.readdir(refDir))
        .filter((f) => IMG_EXT.has(path.extname(f).toLowerCase()))
        .sort();
      if (files.length > 0) {
        // "ref", "idle" 키워드 포함 파일 우선
        const preferred = files.find((f) => /ref|idle/i.test(f)) ?? files[0];
        return path.join(refDir, preferred);
      }
    } catch {
      /* 폴더 없음 — 폴백 */
    }
    return path.join(genBase, "character", `${refId}.png`);
  }
  if (source === "field-summon") return path.join(genBase, "field-summon", `${refId}.png`);
  if (source === "field-monster") return path.join(genBase, "field-monster", `${refId}.png`);
  if (source === "attack-fx") return path.join(genBase, "attack-fx", `${refId}.png`);
  return path.join(genBase, "card", `${refId}.png`);
}

async function loadRef(refPath: string): Promise<RefImage> {
  const ext = path.extname(refPath).toLowerCase();
  const mime =
    ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" :
    ext === ".webp" ? "image/webp" : "image/png";
  const buf = await fs.readFile(refPath);
  return { base64: buf.toString("base64"), mimeType: mime };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      refId: string;
      refSource: RefSource;
      motion: Motion;
      frameCount: number;
      description?: string;
      promptOverride?: string;
    };

    const { refId, refSource, motion, frameCount, description = "" } = body;

    if (!refId) return Response.json({ error: "refId required" }, { status: 400 });
    if (!MOTIONS.includes(motion))
      return Response.json({ error: `invalid motion ${motion}` }, { status: 400 });
    if (!Number.isInteger(frameCount) || frameCount < 2 || frameCount > 8)
      return Response.json({ error: "frameCount must be int 2..8" }, { status: 400 });

    const refPath = await resolveRefPath(refSource, refId);
    try {
      await fs.access(refPath);
    } catch {
      return Response.json(
        { error: `reference image not found: ${refPath}. Generate it first.` },
        { status: 404 }
      );
    }
    const ref = await loadRef(refPath);

    const agent = await loadAgentByName("move-board");
    const styleRefs = await loadStyleRefs(agent.name);
    const outDir = path.join(process.cwd(), agent.output.save_to);
    await fs.mkdir(outDir, { recursive: true });

    const frameBuffers: Buffer[] = [];
    for (let i = 1; i <= frameCount; i++) {
      const prevHint = i === 1 ? "없음 (첫 프레임)" : frameHint(motion, i - 1, frameCount);
      const currentHint = frameHint(motion, i, frameCount);

      const baseTemplate =
        body.promptOverride && i === 1 && body.promptOverride.trim().length > 0
          ? body.promptOverride
          : fillTemplate(agent.body, {
              refId,
              motion,
              frameCount: String(frameCount),
              frameIndex: String(i),
              prevFrameHint: prevHint,
              currentFrameHint: currentHint,
              description,
            });

      const styleNote =
        styleRefs.length > 0
          ? `\n\n# 스타일 레퍼런스\n첨부된 이미지 중 앞쪽 ${styleRefs.length}장은 게임의 공식 스타일 샘플. 화풍·색감·디테일 수준을 맞춰라.\n`
          : "";
      const prompt = baseTemplate + styleNote;

      const { base64 } = await generateImage(prompt, agent.model_image, [
        ...styleRefs,
        ref,
      ]);
      const buf = Buffer.from(base64, "base64");
      const normalized = await sharp(buf)
        .resize(agent.output.width, agent.output.height, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toBuffer();
      frameBuffers.push(normalized);

      const framePath = path.join(
        outDir,
        `${refId}_${motion}_f${String(i).padStart(2, "0")}.png`
      );
      await fs.writeFile(framePath, normalized);
    }

    const sheetWidth = agent.output.width * frameCount;
    const sheetHeight = agent.output.height;
    const composites = frameBuffers.map((buf, idx) => ({
      input: buf,
      left: idx * agent.output.width,
      top: 0,
    }));
    const sheet = await sharp({
      create: {
        width: sheetWidth,
        height: sheetHeight,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite(composites)
      .png()
      .toBuffer();

    const sheetName = fillTemplate(agent.output.filename, { refId, motion });
    const sheetPath = path.join(outDir, sheetName);
    await fs.writeFile(sheetPath, sheet);

    const publicSub = agent.output.save_to.replace(/^public[/\\]/, "").replace(/\\/g, "/");
    const publicSheetPath = `/${publicSub}/${sheetName}?t=${Date.now()}`;
    const publicFramePaths = Array.from({ length: frameCount }, (_, i) => {
      const name = `${refId}_${motion}_f${String(i + 1).padStart(2, "0")}.png`;
      return `/${publicSub}/${name}?t=${Date.now()}`;
    });

    return Response.json({
      ok: true,
      refId,
      motion,
      frameCount,
      sheetFilename: sheetName,
      publicSheetPath,
      publicFramePaths,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[generate-move-board]", err);
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const refId = url.searchParams.get("refId") ?? "";
  const motion = (url.searchParams.get("motion") ?? "idle") as Motion;
  const frameCount = Number(url.searchParams.get("frameCount") ?? "4");
  const description = url.searchParams.get("description") ?? "";

  const agent = await loadAgentByName("move-board");
  const prompt = fillTemplate(agent.body, {
    refId,
    motion,
    frameCount: String(frameCount),
    frameIndex: "1",
    prevFrameHint: "없음 (첫 프레임)",
    currentFrameHint: frameHint(motion, 1, frameCount),
    description,
  });
  return Response.json({
    prompt,
    agent: { name: agent.name, output: agent.output },
    motions: MOTIONS,
  });
}
