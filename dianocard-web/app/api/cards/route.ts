import { readCards } from "@/lib/csv";

export async function GET() {
  const cards = await readCards();
  return Response.json({ cards });
}
