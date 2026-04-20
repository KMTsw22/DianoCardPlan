import { loadAgentByName } from "@/lib/agent-loader";
import { readPassiveById } from "@/lib/csv";
import { generateAndSave, getPromptPreview } from "@/lib/generate";
import { resolveRefs, RefPointer } from "@/lib/refs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { passiveId, promptOverride, refs: refPointers } = (await request.json()) as {
      passiveId: string;
      promptOverride?: string;
      refs?: RefPointer[];
    };
    if (!passiveId) return Response.json({ error: "passiveId is required" }, { status: 400 });

    const passive = await readPassiveById(passiveId);
    if (!passive) return Response.json({ error: `passive ${passiveId} not found` }, { status: 404 });

    const agent = await loadAgentByName("enemy-passive");
    const refs = await resolveRefs(refPointers ?? []);
    const result = await generateAndSave({
      agent,
      values: passive as unknown as Record<string, string>,
      entityId: passive.id,
      promptOverride,
      transparentBackground: true,
      refs,
    });

    return Response.json({ ok: true, passiveId: passive.id, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[generate-enemy-passive]", err);
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const passiveId = url.searchParams.get("passiveId");
  if (!passiveId) return Response.json({ error: "passiveId is required" }, { status: 400 });

  const [agent, passive] = await Promise.all([
    loadAgentByName("enemy-passive"),
    readPassiveById(passiveId),
  ]);
  if (!passive) return Response.json({ error: `passive ${passiveId} not found` }, { status: 404 });

  const prompt = getPromptPreview(agent, passive as unknown as Record<string, string>);
  return Response.json({ prompt, passive, agent: { name: agent.name, output: agent.output } });
}
