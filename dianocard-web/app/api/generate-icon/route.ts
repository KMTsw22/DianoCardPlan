import { loadAgentByName } from "@/lib/agent-loader";
import { generateAndSave, getPromptPreview } from "@/lib/generate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 40) || "icon";
}

export async function POST(request: Request) {
  try {
    const { slug, label, concept, promptOverride } = (await request.json()) as {
      slug?: string;
      label: string;
      concept: string;
      promptOverride?: string;
    };
    if (!label || !concept) {
      return Response.json({ error: "label and concept are required" }, { status: 400 });
    }
    const finalSlug = slugify(slug || label);

    const agent = await loadAgentByName("icon");
    const result = await generateAndSave({
      agent,
      values: { slug: finalSlug, label, concept },
      promptOverride,
      transparentBackground: true,
    });

    return Response.json({ ok: true, slug: finalSlug, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[generate-icon]", err);
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const label = url.searchParams.get("label") ?? "";
  const concept = url.searchParams.get("concept") ?? "";
  const slug = slugify(url.searchParams.get("slug") || label);

  const agent = await loadAgentByName("icon");
  const prompt = getPromptPreview(agent, { slug, label, concept });
  return Response.json({ prompt, agent: { name: agent.name, output: agent.output } });
}
