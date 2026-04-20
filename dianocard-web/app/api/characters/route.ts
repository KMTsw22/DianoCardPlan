import { readCharacters } from "@/lib/csv";

export async function GET() {
  const characters = await readCharacters();
  return Response.json({ characters });
}
