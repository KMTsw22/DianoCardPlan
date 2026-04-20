import { listAgents } from "@/lib/agent-loader";

export async function GET() {
  const agents = await listAgents();
  return Response.json({ agents });
}
