import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = new Set([
  "card",
  "card-effect",
  "field-summon",
  "field-monster",
  "character",
  "attack-fx",
  "enemy-passive",
  "icon",
  "move-board",
]);

/**
 * GET /api/generated-list?source=attack-fx
 * public/generated/{source}/ 에 있는 .png 파일명(확장자 제거)을 ids 배열로 반환.
 * move-board refSource 선택 시 이미 생성된 에셋 목록을 pick-list에 뿌리는 용도.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const source = url.searchParams.get("source") ?? "";
  if (!ALLOWED.has(source)) {
    return Response.json({ error: `unsupported source: ${source}` }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "public", "generated", source);
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const ids = entries
      .filter((e) => e.isFile() && /\.(png|jpg|jpeg|webp)$/i.test(e.name))
      .map((e) => e.name.replace(/\.[^.]+$/, ""))
      // move-board 는 프레임도 들어있어 sheet 만 뽑음
      .filter((n) => (source === "move-board" ? n.endsWith("_sheet") : true))
      .sort();
    return Response.json({ source, ids });
  } catch {
    return Response.json({ source, ids: [] });
  }
}
