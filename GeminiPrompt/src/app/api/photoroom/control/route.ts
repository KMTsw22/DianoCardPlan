import { NextRequest } from "next/server";
import { runState } from "../state";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const action = body?.action as "pause" | "resume" | "abort" | undefined;

  if (!action || !["pause", "resume", "abort"].includes(action)) {
    return Response.json({ error: "action must be 'pause' | 'resume' | 'abort'" }, { status: 400 });
  }

  if (action === "pause") runState.paused = true;
  else if (action === "resume") runState.paused = false;
  else if (action === "abort") {
    runState.aborted = true;
    runState.paused = false;
  }

  return Response.json({ ok: true, state: { ...runState } });
}

export async function GET() {
  return Response.json({ state: { ...runState } });
}
