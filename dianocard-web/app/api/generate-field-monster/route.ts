import { loadAgentByName } from "@/lib/agent-loader";
import { readEnemyById } from "@/lib/csv";
import { generateAndSave, getPromptPreview } from "@/lib/generate";
import { resolveRefs, RefPointer } from "@/lib/refs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { enemyId, promptOverride, refs: refPointers } = (await request.json()) as {
      enemyId: string;
      promptOverride?: string;
      refs?: RefPointer[];
    };
    if (!enemyId) return Response.json({ error: "enemyId is required" }, { status: 400 });

    const enemy = await readEnemyById(enemyId);
    if (!enemy) return Response.json({ error: `enemy ${enemyId} not found` }, { status: 404 });

    const agent = await loadAgentByName("field-monster");
    const refs = await resolveRefs(refPointers ?? []);
    const result = await generateAndSave({
      agent,
      values: enemy as unknown as Record<string, string>,
      entityId: enemy.id,
      promptOverride,
      transparentBackground: true,
      refs,
    });

    return Response.json({ ok: true, enemyId: enemy.id, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[generate-field-monster]", err);
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const enemyId = url.searchParams.get("enemyId");
  if (!enemyId) return Response.json({ error: "enemyId is required" }, { status: 400 });

  const [agent, enemy] = await Promise.all([
    loadAgentByName("field-monster"),
    readEnemyById(enemyId),
  ]);
  if (!enemy) return Response.json({ error: `enemy ${enemyId} not found` }, { status: 404 });

  const prompt = getPromptPreview(agent, enemy as unknown as Record<string, string>);
  return Response.json({ prompt, enemy, agent: { name: agent.name, output: agent.output } });
}
