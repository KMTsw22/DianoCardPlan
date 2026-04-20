import fs from "node:fs/promises";
import path from "node:path";
import { RefImage } from "./gemini";

export type RefPointer = {
  category: "card" | "card-effect" | "field-summon" | "field-monster" | "move-board";
  id: string;
  filename?: string;
};

function pathFor(p: RefPointer): string {
  const base = path.join(process.cwd(), "public", "generated");
  if (p.filename) return path.join(base, p.category, p.filename);
  if (p.category === "card-effect") return path.join(base, "card-effect", `${p.id}_fx.png`);
  return path.join(base, p.category, `${p.id}.png`);
}

export async function resolveRefs(pointers: RefPointer[] = []): Promise<RefImage[]> {
  return Promise.all(
    pointers.map(async (p) => {
      const buf = await fs.readFile(pathFor(p));
      return { base64: buf.toString("base64"), mimeType: "image/png" };
    })
  );
}
