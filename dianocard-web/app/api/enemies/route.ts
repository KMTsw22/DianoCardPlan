import { readEnemies } from "@/lib/csv";

export async function GET() {
  const enemies = await readEnemies();
  return Response.json({ enemies });
}
