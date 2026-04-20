import { loadAgentByName } from "@/lib/agent-loader";
import { readCardById } from "@/lib/csv";
import { generateAndSave, getPromptPreview } from "@/lib/generate";
import { resolveRefs, RefPointer } from "@/lib/refs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { cardId, promptOverride, refs: refPointers } = (await request.json()) as {
      cardId: string;
      promptOverride?: string;
      refs?: RefPointer[];
    };
    if (!cardId) return Response.json({ error: "cardId is required" }, { status: 400 });

    const card = await readCardById(cardId);
    if (!card) return Response.json({ error: `card ${cardId} not found` }, { status: 404 });
    if (card.card_type !== "SUMMON") {
      return Response.json(
        { error: `${cardId} is not a SUMMON card (card_type=${card.card_type})` },
        { status: 400 }
      );
    }

    const agent = await loadAgentByName("field-summon");
    const refs = await resolveRefs(refPointers ?? []);
    const result = await generateAndSave({
      agent,
      values: card as unknown as Record<string, string>,
      entityId: card.id,
      promptOverride,
      transparentBackground: true,
      refs,
    });

    return Response.json({ ok: true, cardId: card.id, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[generate-field-summon]", err);
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const cardId = url.searchParams.get("cardId");
  if (!cardId) return Response.json({ error: "cardId is required" }, { status: 400 });

  const [agent, card] = await Promise.all([
    loadAgentByName("field-summon"),
    readCardById(cardId),
  ]);
  if (!card) return Response.json({ error: `card ${cardId} not found` }, { status: 404 });

  const prompt = getPromptPreview(agent, card as unknown as Record<string, string>);
  return Response.json({ prompt, card, agent: { name: agent.name, output: agent.output } });
}
