import { readPassives } from "@/lib/csv";

export async function GET() {
  const passives = await readPassives();
  return Response.json({ passives });
}
