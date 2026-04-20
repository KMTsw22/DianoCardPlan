import { GoogleGenAI } from "@google/genai";

export type GeminiImageResult = {
  base64: string;
  mimeType: string;
};

export type RefImage = {
  base64: string;
  mimeType: string;
};

function getClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in .env.local");
  }
  return new GoogleGenAI({ apiKey });
}

export async function generateImage(
  prompt: string,
  model: string = "gemini-2.5-flash-image",
  refs: RefImage[] = []
): Promise<GeminiImageResult> {
  const ai = getClient();

  const parts: Array<
    | { text: string }
    | { inlineData: { data: string; mimeType: string } }
  > = [];
  for (const ref of refs) {
    parts.push({ inlineData: { data: ref.base64, mimeType: ref.mimeType } });
  }
  parts.push({ text: prompt });

  const response = await ai.models.generateContent({
    model,
    contents: [{ role: "user", parts }],
  });

  const resParts = response.candidates?.[0]?.content?.parts ?? [];
  for (const part of resParts) {
    if (part.inlineData?.data) {
      return {
        base64: part.inlineData.data,
        mimeType: part.inlineData.mimeType ?? "image/png",
      };
    }
  }
  throw new Error("Gemini response contained no image data");
}

export async function refinePromptWithText(
  systemPrompt: string,
  userPrompt: string,
  model: string = "gemini-2.5-flash"
): Promise<string> {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model,
    contents: [
      { role: "user", parts: [{ text: `${systemPrompt}\n\n---\n\n${userPrompt}` }] },
    ],
  });
  return response.text ?? "";
}
