import { loadAgentByName } from "@/lib/agent-loader";
import { readCharacterById } from "@/lib/csv";
import { generateAndSave, getPromptPreview } from "@/lib/generate";
import { resolveRefs, RefPointer } from "@/lib/refs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { characterId, promptOverride, refs: refPointers } = (await request.json()) as {
      characterId: string;
      promptOverride?: string;
      refs?: RefPointer[];
    };
    if (!characterId) return Response.json({ error: "characterId is required" }, { status: 400 });

    const character = await readCharacterById(characterId);
    if (!character) return Response.json({ error: `character ${characterId} not found` }, { status: 404 });

    const agent = await loadAgentByName("character");
    const refs = await resolveRefs(refPointers ?? []);
    const result = await generateAndSave({
      agent,
      values: character as unknown as Record<string, string>,
      entityId: character.id,
      promptOverride,
      transparentBackground: true,
      refs,
    });

    return Response.json({ ok: true, characterId: character.id, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[generate-character]", err);
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const characterId = url.searchParams.get("characterId");
  if (!characterId) return Response.json({ error: "characterId is required" }, { status: 400 });

  const [agent, character] = await Promise.all([
    loadAgentByName("character"),
    readCharacterById(characterId),
  ]);
  if (!character) return Response.json({ error: `character ${characterId} not found` }, { status: 404 });

  const prompt = getPromptPreview(agent, character as unknown as Record<string, string>);
  return Response.json({ prompt, character, agent: { name: agent.name, output: agent.output } });
}
