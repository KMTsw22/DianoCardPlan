import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 120;

type RefImage = { mimeType: string; base64: string };
type Body = {
  model: string;
  prompt: string;
  refImages?: RefImage[];
};

const ai = new GoogleGenAI({
  vertexai: true,
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION || "global",
});

export async function POST(req: NextRequest) {
  try {
    const { model, prompt, refImages = [] }: Body = await req.json();

    if (!model || !prompt) {
      return NextResponse.json(
        { error: "model and prompt are required" },
        { status: 400 }
      );
    }

    const parts: Array<
      { text: string } | { inlineData: { mimeType: string; data: string } }
    > = [
      ...refImages.map((img) => ({
        inlineData: { mimeType: img.mimeType, data: img.base64 },
      })),
      { text: prompt },
    ];

    const response = await ai.models.generateContent({
      model,
      contents: [{ role: "user", parts }],
      config: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    });

    const candidateParts = response.candidates?.[0]?.content?.parts ?? [];
    const images: string[] = [];
    let textOut = "";

    for (const part of candidateParts) {
      if (part.inlineData?.data) {
        const mime = part.inlineData.mimeType || "image/png";
        images.push(`data:${mime};base64,${part.inlineData.data}`);
      } else if (part.text) {
        textOut += part.text;
      }
    }

    if (images.length === 0) {
      return NextResponse.json(
        { error: textOut || "이미지가 생성되지 않았습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ images });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    const errObj = e as { status?: number; code?: number };
    const numericStatus =
      typeof errObj?.status === "number"
        ? errObj.status
        : typeof errObj?.code === "number"
        ? errObj.code
        : null;
    const isQuota =
      numericStatus === 429 ||
      /429|quota|rate.?limit|resource.*exhausted/i.test(msg);
    return NextResponse.json(
      { error: msg, rateLimit: isQuota || undefined },
      { status: isQuota ? 429 : 500 }
    );
  }
}
