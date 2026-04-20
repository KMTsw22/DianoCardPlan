import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const IMG_EXT_MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

function sanitize(component: string): string {
  return component.replace(/\.\.|[/\\:]/g, "");
}

/**
 * GET /api/style-refs/file?agent=card-art&file=X.png
 * GET /api/style-refs/file?agent=card-art&entityId=C001&file=X.png  (entity 폴더 내 파일)
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const agent = sanitize(url.searchParams.get("agent") ?? "");
  const entityId = sanitize(url.searchParams.get("entityId") ?? "");
  const file = sanitize(url.searchParams.get("file") ?? "");
  if (!agent || !file) {
    return new Response("agent and file required", { status: 400 });
  }
  const ext = path.extname(file).toLowerCase();
  const mime = IMG_EXT_MIME[ext];
  if (!mime) return new Response("unsupported ext", { status: 400 });

  const base = path.join(process.cwd(), "references", agent);
  const filePath = entityId ? path.join(base, entityId, file) : path.join(base, file);
  try {
    const buf = await fs.readFile(filePath);
    const ab = new ArrayBuffer(buf.byteLength);
    new Uint8Array(ab).set(buf);
    return new Response(ab, {
      headers: {
        "Content-Type": mime,
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch {
    return new Response("not found", { status: 404 });
  }
}

/**
 * POST /api/style-refs/file (multipart/form-data)
 *   agent, entityId(optional), file
 * 지정 폴더에 이미지 파일을 업로드. 엔티티 폴더가 없으면 생성.
 */
export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const agent = sanitize(String(form.get("agent") ?? ""));
    const entityId = sanitize(String(form.get("entityId") ?? ""));
    const file = form.get("file");

    if (!agent) return Response.json({ error: "agent required" }, { status: 400 });
    if (!(file instanceof Blob)) return Response.json({ error: "file required" }, { status: 400 });

    const nameRaw = (file as unknown as { name?: string }).name ?? "";
    const name = sanitize(nameRaw || `upload_${Date.now()}.png`);
    const ext = path.extname(name).toLowerCase();
    if (!IMG_EXT_MIME[ext]) {
      return Response.json({ error: `unsupported extension ${ext}` }, { status: 400 });
    }

    const base = path.join(process.cwd(), "references", agent);
    const dir = entityId ? path.join(base, entityId) : base;
    await fs.mkdir(dir, { recursive: true });
    const filePath = path.join(dir, name);
    const buf = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buf);

    return Response.json({ ok: true, agent, entityId: entityId || null, name, dir });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ error: message }, { status: 500 });
  }
}

/**
 * DELETE /api/style-refs/file?agent=...&entityId=...&file=...
 */
export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const agent = sanitize(url.searchParams.get("agent") ?? "");
  const entityId = sanitize(url.searchParams.get("entityId") ?? "");
  const file = sanitize(url.searchParams.get("file") ?? "");
  if (!agent || !file) return Response.json({ error: "agent and file required" }, { status: 400 });

  const base = path.join(process.cwd(), "references", agent);
  const filePath = entityId ? path.join(base, entityId, file) : path.join(base, file);
  try {
    await fs.unlink(filePath);
    return Response.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ error: message }, { status: 500 });
  }
}
