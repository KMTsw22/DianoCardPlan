import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type AgentSpec = {
  name: string;
  title: string;
  description: string;
  model_image: string;
  model_text: string;
  output: {
    width: number;
    height: number;
    format: "png" | "jpeg" | "webp";
    save_to: string;
    filename: string;
  };
  inputs: string[];
  body: string;
  filepath: string;
};

const AGENTS_DIR = path.join(process.cwd(), "agents");

export async function listAgents(): Promise<AgentSpec[]> {
  const entries = await fs.readdir(AGENTS_DIR);
  const files = entries.filter((f) => f.endsWith(".agent.md"));
  return Promise.all(files.map((f) => loadAgent(path.join(AGENTS_DIR, f))));
}

export async function loadAgentByName(name: string): Promise<AgentSpec> {
  const file = path.join(AGENTS_DIR, `${name}.agent.md`);
  return loadAgent(file);
}

async function loadAgent(filepath: string): Promise<AgentSpec> {
  const raw = await fs.readFile(filepath, "utf8");
  const { data, content } = matter(raw);
  return {
    name: data.name,
    title: data.title ?? data.name,
    description: data.description ?? "",
    model_image: data.model_image,
    model_text: data.model_text,
    output: data.output,
    inputs: data.inputs ?? [],
    body: content,
    filepath,
  };
}

export function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? `{${key}}`);
}
