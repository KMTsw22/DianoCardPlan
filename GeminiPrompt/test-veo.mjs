import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import path from "node:path";

const imagePath = process.argv[2];
const userPrompt = process.argv[3] || "gentle camera push-in, cinematic";

if (!imagePath) {
  console.error("Usage: node --env-file=.env.local test-veo.mjs <image> [prompt]");
  process.exit(1);
}
if (!fs.existsSync(imagePath)) {
  console.error("Image not found:", imagePath);
  process.exit(1);
}

const ext = path.extname(imagePath).slice(1).toLowerCase();
const mimeType =
  ext === "jpg" || ext === "jpeg" ? "image/jpeg" : `image/${ext || "png"}`;
const imageBytes = fs.readFileSync(imagePath).toString("base64");

const ai = new GoogleGenAI({
  vertexai: true,
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: "us-central1",
});

console.log("Project:", process.env.GOOGLE_CLOUD_PROJECT);
console.log("Image:", imagePath, `(${mimeType})`);
console.log("Prompt:", userPrompt);
console.log("Submitting...");

let op = await ai.models.generateVideos({
  model: "veo-2.0-generate-001",
  prompt: userPrompt,
  image: { imageBytes, mimeType },
  config: {
    aspectRatio: "16:9",
    numberOfVideos: 1,
    durationSeconds: 5,
  },
});

console.log("Operation:", op.name);
console.log("Polling (1~3 min)...");

const start = Date.now();
while (!op.done) {
  await new Promise((r) => setTimeout(r, 10000));
  process.stdout.write(`.[${Math.floor((Date.now() - start) / 1000)}s]`);
  op = await ai.operations.getVideosOperation({ operation: op });
}
console.log("\nDone in", Math.floor((Date.now() - start) / 1000), "s");

const videos = op.response?.generatedVideos || [];
if (videos.length === 0) {
  console.error("No videos. Full response:");
  console.error(JSON.stringify(op.response, null, 2));
  process.exit(1);
}

for (let i = 0; i < videos.length; i++) {
  const v = videos[i];
  const bytes = v.video?.videoBytes;
  if (!bytes) {
    console.warn(`Video ${i}: no bytes (uri=${v.video?.uri})`);
    continue;
  }
  const out = `veo-output-${Date.now()}-${i}.mp4`;
  fs.writeFileSync(out, Buffer.from(bytes, "base64"));
  console.log("✅ Saved:", out);
}
