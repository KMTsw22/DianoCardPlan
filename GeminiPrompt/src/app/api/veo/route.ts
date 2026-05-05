import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 300;

type Body = {
  prompt: string;
  image: { mimeType: string; base64: string };
  aspectRatio?: "16:9" | "9:16";
  durationSeconds?: number;
};

const ai = new GoogleGenAI({
  vertexai: true,
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: "us-central1",
});

export async function POST(req: NextRequest) {
  try {
    const {
      prompt,
      image,
      aspectRatio = "16:9",
      durationSeconds = 5,
    }: Body = await req.json();

    if (!prompt || !image?.base64) {
      return NextResponse.json(
        { error: "prompt and image are required" },
        { status: 400 }
      );
    }

    let op = await ai.models.generateVideos({
      model: "veo-2.0-generate-001",
      prompt,
      image: { imageBytes: image.base64, mimeType: image.mimeType },
      config: {
        aspectRatio,
        numberOfVideos: 1,
        durationSeconds,
      },
    });

    const start = Date.now();
    const TIMEOUT_MS = 280_000;
    while (!op.done) {
      if (Date.now() - start > TIMEOUT_MS) {
        return NextResponse.json(
          { error: "Timeout (4분 경과). 다시 시도해주세요." },
          { status: 504 }
        );
      }
      await new Promise((r) => setTimeout(r, 5000));
      op = await ai.operations.getVideosOperation({ operation: op });
    }

    const videos = op.response?.generatedVideos || [];
    const out: string[] = [];
    for (const v of videos) {
      const bytes = v.video?.videoBytes;
      if (bytes) out.push(`data:video/mp4;base64,${bytes}`);
    }

    if (out.length === 0) {
      return NextResponse.json(
        { error: "영상이 생성되지 않았습니다. (안전 필터 또는 기타 사유)" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      videos: out,
      elapsedSec: Math.floor((Date.now() - start) / 1000),
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
