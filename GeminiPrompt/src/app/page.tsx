"use client";

import { useState, useRef, useMemo } from "react";

type Provider = "gemini" | "openai" | "vertex";

type ModelConfig = {
  id: string;
  name: string;
  tier: string;
  provider: Provider;
};

const MODELS: ModelConfig[] = [
  { id: "gemini-3-pro-image-preview", name: "Gemini 3 Pro Image (Vertex)", tier: "최고 품질 · $300 크레딧", provider: "vertex" },
  { id: "gemini-2.5-flash-image", name: "Gemini 2.5 Flash Image (Vertex)", tier: "나노바나나 🍌 · $300 크레딧", provider: "vertex" },
  { id: "gemini-3-pro-image-preview", name: "Gemini 3 Pro Image", tier: "최고 품질", provider: "gemini" },
  { id: "gemini-3.1-flash-image-preview", name: "Gemini 3.1 Flash Image", tier: "고품질 + 빠름", provider: "gemini" },
  { id: "gemini-2.5-flash-image", name: "Gemini 2.5 Flash Image", tier: "안정적", provider: "gemini" },
  { id: "nano-banana-pro-preview", name: "Nano Banana Pro", tier: "나노바나나 🍌", provider: "gemini" },
  { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", tier: "경량", provider: "gemini" },
  { id: "gpt-image-2", name: "GPT Image 2.0", tier: "OpenAI 최신", provider: "openai" },
  { id: "gpt-image-1", name: "GPT Image 1.0", tier: "OpenAI 안정", provider: "openai" },
];

const MAX_PROMPTS = 50;
const MAX_REPETITIONS = 10;

type GeneratedImage = { url: string; prompt: string; title?: string };
type GeneratedVideo = { url: string; prompt: string };
type Tab = "image" | "video" | "bgremove";
type RefImage = { base64: string; mimeType: string; preview: string };
type BgLogEntry = { id: number; file: string; status: "processing" | "ok" | "fail"; error?: string; ms?: number };
type GenerationError = { prompt: string; message: string };
type PromptSlot = { title: string; text: string; refImages: RefImage[] };
type RetryStatus = { secondsLeft: number; prompt: string };
type ImageMode = "shared" | "per-prompt";

const RATE_LIMIT_RETRY_SECONDS = 30;

const parseMarkdownPrompts = (
  text: string
): { title: string; text: string }[] => {
  const lines = text.split(/\r?\n/);
  const entries: { title: string; lines: string[] }[] = [];
  let current: { title: string; lines: string[] } | null = null;
  for (const line of lines) {
    const m = line.match(/^#+\s+(.*)$/);
    if (m) {
      if (current) entries.push(current);
      current = { title: m[1].trim(), lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  if (current) entries.push(current);
  const result = entries
    .map((e) => ({ title: e.title, text: e.lines.join("\n").trim() }))
    .filter((e) => e.text.length > 0);
  if (result.length === 0) {
    const t = text.trim();
    if (t) return [{ title: "", text: t }];
  }
  return result;
};

const isRateLimitError = (err: unknown): boolean => {
  if (!(err instanceof Error)) return false;
  if ((err as Error & { rateLimit?: boolean }).rateLimit) return true;
  return /429|rate.?limit|quota|resource.*exhausted/i.test(err.message);
};

const sleepAbortable = (ms: number, signal: AbortSignal): Promise<void> =>
  new Promise((resolve, reject) => {
    if (signal.aborted) return reject(new DOMException("Aborted", "AbortError"));
    const onAbort = () => {
      clearTimeout(t);
      reject(new DOMException("Aborted", "AbortError"));
    };
    const t = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    signal.addEventListener("abort", onAbort, { once: true });
  });

const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mimeType });
};

export default function Home() {
  const [geminiKey, setGeminiKey] = useState(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
  );
  const [openaiKey, setOpenaiKey] = useState(
    process.env.NEXT_PUBLIC_OPENAI_API_KEY || ""
  );
  const modelKey = (m: ModelConfig) => `${m.provider}:${m.id}`;
  const [selected, setSelected] = useState(modelKey(MODELS[0]));
  const currentModel =
    MODELS.find((m) => modelKey(m) === selected) ?? MODELS[0];
  const model = currentModel.id;
  const provider = currentModel.provider;
  const apiKey = provider === "openai" ? openaiKey : geminiKey;
  const setApiKey = provider === "openai" ? setOpenaiKey : setGeminiKey;
  const [tab, setTab] = useState<Tab>("image");
  const [prompts, setPrompts] = useState<PromptSlot[]>([
    { title: "", text: "", refImages: [] },
  ]);
  const [repetitions, setRepetitions] = useState(1);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState("");
  const [genErrors, setGenErrors] = useState<GenerationError[]>([]);
  const [showKey, setShowKey] = useState(false);
  const [refImages, setRefImages] = useState<RefImage[]>([]);
  const [imageMode, setImageMode] = useState<ImageMode>("shared");
  const [retryStatus, setRetryStatus] = useState<RetryStatus | null>(null);
  const mdInputRef = useRef<HTMLInputElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Video tab state
  const [videoSource, setVideoSource] = useState<RefImage | null>(null);
  const [videoPrompt, setVideoPrompt] = useState("");
  const [videoAspect, setVideoAspect] = useState<"16:9" | "9:16">("16:9");
  const [videoDuration, setVideoDuration] = useState(5);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoElapsed, setVideoElapsed] = useState(0);
  const [videos, setVideos] = useState<GeneratedVideo[]>([]);
  const [videoError, setVideoError] = useState("");

  // Background remove tab state
  const [bgInputDir, setBgInputDir] = useState("");
  const [bgOutputDir, setBgOutputDir] = useState("");
  const [bgHeadless, setBgHeadless] = useState(false);
  const [bgRunning, setBgRunning] = useState(false);
  const [bgInitInfo, setBgInitInfo] = useState<{ total: number; todo: number; completed: number } | null>(null);
  const [bgProgress, setBgProgress] = useState({ current: 0, total: 0, ok: 0, fail: 0 });
  const [bgLog, setBgLog] = useState<BgLogEntry[]>([]);
  const [bgError, setBgError] = useState("");
  const [bgCaptcha, setBgCaptcha] = useState("");
  const [bgPaused, setBgPaused] = useState(false);
  const bgAbortRef = useRef<AbortController | null>(null);
  const bgLogIdRef = useRef(0);

  const sanitizeForFilename = (text: string) => {
    const words = text
      .trim()
      .replace(/[\\/:*?"<>|\r\n\t]+/g, " ")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2);
    return words.join("_") || "image";
  };

  const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string; preview: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const base64 = dataUrl.split(",")[1];
        resolve({ base64, mimeType: file.type, preview: dataUrl });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFiles = async (files: FileList | File[]) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length === 0) return;
    const results = await Promise.all(imageFiles.map(fileToBase64));
    setRefImages((prev) => [...prev, ...results]);
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    const imageFiles: File[] = [];
    for (const item of Array.from(items)) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) imageFiles.push(file);
      }
    }
    if (imageFiles.length > 0) {
      e.preventDefault();
      await handleFiles(imageFiles);
    }
  };

  const removeRefImage = (index: number) => {
    setRefImages((prev) => prev.filter((_, i) => i !== index));
  };

  const updatePromptText = (index: number, text: string) => {
    setPrompts((prev) => prev.map((p, i) => (i === index ? { ...p, text } : p)));
  };

  const updatePromptTitle = (index: number, title: string) => {
    setPrompts((prev) => prev.map((p, i) => (i === index ? { ...p, title } : p)));
  };

  const addPrompt = () => {
    setPrompts((prev) =>
      prev.length >= MAX_PROMPTS
        ? prev
        : [...prev, { title: "", text: "", refImages: [] }]
    );
  };

  const removePrompt = (index: number) => {
    setPrompts((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)));
  };

  const addPromptImages = async (index: number, files: FileList | File[]) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length === 0) return;
    const results = await Promise.all(imageFiles.map(fileToBase64));
    setPrompts((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, refImages: [...p.refImages, ...results] } : p
      )
    );
  };

  const removePromptImage = (promptIndex: number, imageIndex: number) => {
    setPrompts((prev) =>
      prev.map((p, i) =>
        i === promptIndex
          ? { ...p, refImages: p.refImages.filter((_, k) => k !== imageIndex) }
          : p
      )
    );
  };

  const handlePromptPaste = async (index: number, e: React.ClipboardEvent) => {
    if (imageMode !== "per-prompt") return;
    const items = e.clipboardData?.items;
    if (!items) return;
    const imageFiles: File[] = [];
    for (const item of Array.from(items)) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) imageFiles.push(file);
      }
    }
    if (imageFiles.length > 0) {
      e.preventDefault();
      await addPromptImages(index, imageFiles);
    }
  };

  const importMarkdownFile = async (file: File) => {
    const text = await file.text();
    const entries = parseMarkdownPrompts(text);
    if (entries.length === 0) {
      setError("MD 파일에서 프롬프트를 찾지 못했습니다. (# 제목 뒤에 본문 형식)");
      return;
    }
    const limited = entries.slice(0, MAX_PROMPTS);
    setPrompts(
      limited.map((e) => ({ title: e.title, text: e.text, refImages: [] }))
    );
    setError("");
    if (entries.length > MAX_PROMPTS) {
      setError(
        `MD에 ${entries.length}개 항목이 있지만 최대 ${MAX_PROMPTS}개만 불러옵니다.`
      );
    }
  };

  const requestGemini = async (
    promptText: string,
    refs: RefImage[],
    signal: AbortSignal
  ): Promise<string[]> => {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal,
        body: JSON.stringify({
          contents: [
            {
              parts: [
                ...refs.map((img) => ({
                  inlineData: { mimeType: img.mimeType, data: img.base64 },
                })),
                { text: promptText },
              ],
            },
          ],
          generationConfig: {
            responseModalities: ["TEXT", "IMAGE"],
          },
        }),
      }
    );

    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      const err = new Error(
        errData?.error?.message || `API 오류: ${response.status}`
      ) as Error & { rateLimit?: boolean };
      if (response.status === 429) err.rateLimit = true;
      throw err;
    }

    const data = await response.json();
    const parts = data.candidates?.[0]?.content?.parts || [];
    const results: string[] = [];

    for (const part of parts) {
      if (part.inlineData) {
        const base64 = part.inlineData.data;
        const mimeType = part.inlineData.mimeType || "image/png";
        results.push(`data:${mimeType};base64,${base64}`);
      }
    }

    if (results.length === 0) {
      const textPart = parts.find((p: { text?: string }) => p.text);
      throw new Error(
        textPart?.text || "이미지가 생성되지 않았습니다. 프롬프트를 수정해보세요."
      );
    }

    return results;
  };

  const requestOpenAI = async (
    promptText: string,
    refs: RefImage[],
    signal: AbortSignal
  ): Promise<string[]> => {
    const hasRef = refs.length > 0;
    const url = hasRef
      ? "https://api.openai.com/v1/images/edits"
      : "https://api.openai.com/v1/images/generations";

    let body: BodyInit;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${apiKey}`,
    };

    if (hasRef) {
      const form = new FormData();
      form.append("model", model);
      form.append("prompt", promptText);
      form.append("n", "1");
      form.append("size", "1024x1024");
      refs.forEach((img, i) => {
        const blob = base64ToBlob(img.base64, img.mimeType);
        const ext = (img.mimeType.split("/")[1] || "png").replace("jpeg", "jpg");
        form.append("image[]", blob, `ref-${i}.${ext}`);
      });
      body = form;
    } else {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify({
        model,
        prompt: promptText,
        n: 1,
        size: "1024x1024",
      });
    }

    const response = await fetch(url, { method: "POST", headers, signal, body });

    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      const err = new Error(
        errData?.error?.message || `API 오류: ${response.status}`
      ) as Error & { rateLimit?: boolean };
      if (response.status === 429) err.rateLimit = true;
      throw err;
    }

    const data = await response.json();
    const items: Array<{ b64_json?: string; url?: string }> = data.data || [];
    const results: string[] = [];

    for (const item of items) {
      if (item.b64_json) {
        results.push(`data:image/png;base64,${item.b64_json}`);
      } else if (item.url) {
        results.push(item.url);
      }
    }

    if (results.length === 0) {
      throw new Error("이미지가 생성되지 않았습니다.");
    }

    return results;
  };

  const requestVertex = async (
    promptText: string,
    refs: RefImage[],
    signal: AbortSignal
  ): Promise<string[]> => {
    const response = await fetch("/api/vertex", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal,
      body: JSON.stringify({
        model,
        prompt: promptText,
        refImages: refs.map((img) => ({
          mimeType: img.mimeType,
          base64: img.base64,
        })),
      }),
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      const err = new Error(
        data?.error || `API 오류: ${response.status}`
      ) as Error & { rateLimit?: boolean };
      if (response.status === 429) err.rateLimit = true;
      throw err;
    }
    const images: string[] = data?.images || [];
    if (images.length === 0) {
      throw new Error("이미지가 생성되지 않았습니다.");
    }
    return images;
  };

  const requestOne = (
    promptText: string,
    refs: RefImage[],
    signal: AbortSignal
  ): Promise<string[]> => {
    if (provider === "vertex") return requestVertex(promptText, refs, signal);
    if (provider === "openai") return requestOpenAI(promptText, refs, signal);
    return requestGemini(promptText, refs, signal);
  };

  const stopGenerate = () => {
    abortRef.current?.abort();
  };

  const generateImage = async () => {
    if (provider !== "vertex" && !apiKey.trim()) {
      setError("API Key를 입력해주세요.");
      return;
    }
    const validPrompts = prompts
      .map((p) => ({
        title: p.title.trim(),
        text: p.text.trim(),
        refImages: p.refImages,
      }))
      .filter((p) => p.text.length > 0);
    if (validPrompts.length === 0) {
      setError("프롬프트를 1개 이상 입력해주세요.");
      return;
    }

    const reps = Math.max(1, Math.min(MAX_REPETITIONS, Math.floor(repetitions)));
    const total = validPrompts.length * reps;

    setLoading(true);
    setError("");
    setGenErrors([]);
    setRetryStatus(null);
    setProgress({ done: 0, total });

    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;

    outer: for (const p of validPrompts) {
      for (let r = 0; r < reps; r++) {
        if (signal.aborted) break outer;
        const refs =
          imageMode === "shared" ? refImages : p.refImages;
        // Retry loop — rate limit errors keep retrying after a wait,
        // other errors are recorded and we move on.
        retry: while (true) {
          if (signal.aborted) break outer;
          try {
            const urls = await requestOne(p.text, refs, signal);
            const tagged: GeneratedImage[] = urls.map((url) => ({
              url,
              prompt: p.text,
              title: p.title || undefined,
            }));
            setImages((prev) => [...tagged, ...prev]);
            break retry;
          } catch (err) {
            if (err instanceof Error && err.name === "AbortError") break outer;
            if (isRateLimitError(err)) {
              for (let s = RATE_LIMIT_RETRY_SECONDS; s > 0; s--) {
                if (signal.aborted) {
                  setRetryStatus(null);
                  break outer;
                }
                setRetryStatus({ secondsLeft: s, prompt: p.text });
                try {
                  await sleepAbortable(1000, signal);
                } catch {
                  setRetryStatus(null);
                  break outer;
                }
              }
              setRetryStatus(null);
              continue retry;
            }
            const message = err instanceof Error ? err.message : "알 수 없는 오류";
            setGenErrors((prev) => [...prev, { prompt: p.text, message }]);
            break retry;
          }
        }
        setProgress((pr) => ({ ...pr, done: pr.done + 1 }));
      }
    }

    setRetryStatus(null);
    setLoading(false);
  };

  const handleVideoSourcePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of Array.from(items)) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          e.preventDefault();
          const r = await fileToBase64(file);
          setVideoSource(r);
          return;
        }
      }
    }
  };

  const handleVideoSourceFile = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = Array.from(files).find((f) => f.type.startsWith("image/"));
    if (!file) return;
    const r = await fileToBase64(file);
    setVideoSource(r);
  };

  const generateVideo = async () => {
    if (!videoSource) {
      setVideoError("소스 이미지를 추가해주세요.");
      return;
    }
    if (!videoPrompt.trim()) {
      setVideoError("프롬프트를 입력해주세요.");
      return;
    }
    setVideoError("");
    setVideoLoading(true);
    setVideoElapsed(0);

    const timer = setInterval(() => {
      setVideoElapsed((s) => s + 1);
    }, 1000);

    try {
      const response = await fetch("/api/veo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: videoPrompt,
          image: {
            mimeType: videoSource.mimeType,
            base64: videoSource.base64,
          },
          aspectRatio: videoAspect,
          durationSeconds: videoDuration,
        }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error || `API 오류: ${response.status}`);
      }
      const urls: string[] = data?.videos || [];
      if (urls.length === 0) {
        throw new Error("영상이 생성되지 않았습니다.");
      }
      const tagged: GeneratedVideo[] = urls.map((url) => ({
        url,
        prompt: videoPrompt,
      }));
      setVideos((prev) => [...tagged, ...prev]);
    } catch (err) {
      setVideoError(err instanceof Error ? err.message : "알 수 없는 오류");
    } finally {
      clearInterval(timer);
      setVideoLoading(false);
    }
  };

  const downloadVideo = (v: GeneratedVideo, index: number) => {
    const link = document.createElement("a");
    link.href = v.url;
    link.download = `${sanitizeForFilename(v.prompt)}_${index + 1}.mp4`;
    link.click();
  };

  const startBgRemove = async () => {
    if (!bgInputDir.trim() || !bgOutputDir.trim()) {
      setBgError("입력 폴더와 출력 폴더를 모두 입력해주세요.");
      return;
    }
    setBgError("");
    setBgCaptcha("");
    setBgPaused(false);
    setBgRunning(true);
    setBgInitInfo(null);
    setBgProgress({ current: 0, total: 0, ok: 0, fail: 0 });
    setBgLog([]);

    bgAbortRef.current = new AbortController();

    try {
      const res = await fetch("/api/photoroom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: bgAbortRef.current.signal,
        body: JSON.stringify({
          inputDir: bgInputDir.trim(),
          outputDir: bgOutputDir.trim(),
          headless: bgHeadless,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `API 오류: ${res.status}`);
      }
      if (!res.body) throw new Error("스트림을 받을 수 없습니다.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const events = buf.split("\n\n");
        buf = events.pop() ?? "";
        for (const evt of events) {
          const dataLine = evt.split("\n").find((l) => l.startsWith("data: "));
          if (!dataLine) continue;
          const data = JSON.parse(dataLine.slice(6));

          if (data.type === "init") {
            setBgInitInfo({ total: data.total, todo: data.todo, completed: data.completed });
            setBgProgress({ current: 0, total: data.todo, ok: 0, fail: 0 });
          } else if (data.type === "captcha") {
            setBgCaptcha(data.message);
          } else if (data.type === "paused") {
            setBgPaused(true);
          } else if (data.type === "resumed") {
            setBgPaused(false);
          } else if (data.type === "progress") {
            if (data.status === "ok") setBgCaptcha("");
            setBgProgress((p) => ({
              current: data.current,
              total: data.total,
              ok: p.ok + (data.status === "ok" ? 1 : 0),
              fail: p.fail + (data.status === "fail" ? 1 : 0),
            }));
            if (data.status !== "processing") {
              const id = ++bgLogIdRef.current;
              setBgLog((prev) =>
                [
                  { id, file: data.file, status: data.status, error: data.error, ms: data.ms },
                  ...prev,
                ].slice(0, 100)
              );
            }
          } else if (data.type === "done") {
            setBgProgress((p) => ({ ...p, ok: data.ok, fail: data.fail }));
          } else if (data.type === "fatal") {
            setBgError(data.error);
          }
        }
      }
    } catch (err) {
      if (!(err instanceof Error && err.name === "AbortError")) {
        setBgError(err instanceof Error ? err.message : "알 수 없는 오류");
      }
    } finally {
      setBgRunning(false);
    }
  };

  const stopBgRemove = async () => {
    try {
      await fetch("/api/photoroom/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "abort" }),
      });
    } catch {
      /* ignore */
    }
    bgAbortRef.current?.abort();
  };

  const pauseBgRemove = async () => {
    try {
      await fetch("/api/photoroom/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "pause" }),
      });
      setBgPaused(true);
    } catch {
      /* ignore */
    }
  };

  const resumeBgRemove = async () => {
    try {
      await fetch("/api/photoroom/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "resume" }),
      });
      setBgPaused(false);
    } catch {
      /* ignore */
    }
  };

  const sanitizeTitleForFilename = (text: string) =>
    text
      .trim()
      .replace(/[\\/:*?"<>|\r\n\t]+/g, " ")
      .trim()
      .replace(/\s+/g, "_") || "image";

  const downloadImage = (img: GeneratedImage, index: number) => {
    const base = img.title?.trim()
      ? sanitizeTitleForFilename(img.title)
      : sanitizeForFilename(img.prompt);
    const link = document.createElement("a");
    link.href = img.url;
    link.download = `${base}_${index + 1}.png`;
    link.click();
  };

  const validCount = prompts.filter((p) => p.text.trim().length > 0).length;

  const groupedImages = useMemo(() => {
    const groups: {
      key: string;
      title: string;
      hasTitle: boolean;
      images: GeneratedImage[];
    }[] = [];
    const idx = new Map<string, number>();
    for (const img of images) {
      const hasTitle = !!img.title?.trim();
      const label = hasTitle ? img.title!.trim() : img.prompt;
      const key = (hasTitle ? "t:" : "p:") + label;
      const i = idx.get(key);
      if (i === undefined) {
        idx.set(key, groups.length);
        groups.push({ key, title: label, hasTitle, images: [img] });
      } else {
        groups[i].images.push(img);
      }
    }
    return groups;
  }, [images]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <h1 className="text-2xl font-bold tracking-tight">
          ✨ Gemini Studio
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          이미지/영상을 생성하세요
        </p>
      </header>

      {/* Tabs */}
      <div className="border-b border-gray-800 px-6">
        <div className="max-w-4xl mx-auto flex gap-1">
          {([
            { id: "image", label: "이미지" },
            { id: "video", label: "영상 (Veo 2)" },
            { id: "bgremove", label: "배경 제거 (Photoroom)" },
          ] as const).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id
                  ? "border-blue-500 text-white"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {tab === "image" && (
          <>
        {/* API Key (Vertex 모드는 서버 인증이라 키 불필요) */}
        {provider === "vertex" ? (
          <div className="bg-emerald-900/20 border border-emerald-800 rounded-lg px-4 py-3 text-sm text-emerald-300">
            🔐 Vertex AI 모드 — 서버의 ADC 인증 사용 ($300 크레딧)
          </div>
        ) : (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              {provider === "openai" ? "OpenAI API Key" : "Gemini API Key"}
            </label>
            <div className="flex gap-2">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={
                  provider === "openai"
                    ? "sk-... OpenAI API Key"
                    : "Gemini API Key를 입력하세요"
                }
                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm hover:bg-gray-700 transition-colors shrink-0"
              >
                {showKey ? "숨기기" : "보기"}
              </button>
            </div>
          </div>
        )}

        {/* Model Select */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">모델 선택</label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
          >
            {MODELS.map((m) => (
              <option key={modelKey(m)} value={modelKey(m)}>
                {m.name} — {m.tier}
              </option>
            ))}
          </select>
        </div>

        {/* Image attachment mode */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            참조 이미지 적용 방식
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setImageMode("shared")}
              className={`flex-1 px-3 py-2 rounded-lg text-sm border transition-colors ${
                imageMode === "shared"
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800"
              }`}
            >
              공통 — 모든 프롬프트에 같은 이미지
            </button>
            <button
              onClick={() => setImageMode("per-prompt")}
              className={`flex-1 px-3 py-2 rounded-lg text-sm border transition-colors ${
                imageMode === "per-prompt"
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800"
              }`}
            >
              프롬프트별 — 각 프롬프트마다 따로
            </button>
          </div>
        </div>

        {/* Shared reference images */}
        {imageMode === "shared" && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              공통 참조 이미지 ({refImages.length})
            </label>
            <div className="flex gap-2 flex-wrap items-center">
              {refImages.map((img, i) => (
                <div key={i} className="relative group w-16 h-16">
                  <img
                    src={img.preview}
                    alt={`ref-${i}`}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-700"
                  />
                  <button
                    onClick={() => removeRefImage(i)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    x
                  </button>
                </div>
              ))}
              <label className="w-16 h-16 flex items-center justify-center bg-gray-900 border border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 text-gray-500 hover:text-gray-300 text-2xl">
                +
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) =>
                    e.target.files && handleFiles(e.target.files)
                  }
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">
              첫 번째 프롬프트 칸에서 Ctrl + V로 붙여넣기도 가능
            </p>
          </div>
        )}

        {/* Prompts */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <label className="text-sm font-medium text-gray-300">
              프롬프트 ({prompts.length}/{MAX_PROMPTS})
            </label>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-400" htmlFor="repetitions">
                프롬프트당 반복
              </label>
              <input
                id="repetitions"
                type="number"
                min={1}
                max={MAX_REPETITIONS}
                value={repetitions}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  if (Number.isFinite(n)) {
                    setRepetitions(Math.max(1, Math.min(MAX_REPETITIONS, Math.floor(n))));
                  }
                }}
                className="w-14 bg-gray-900 border border-gray-700 rounded-md px-2 py-1 text-xs text-center focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => mdInputRef.current?.click()}
                className="text-xs px-2.5 py-1 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 transition-colors"
                title="# 제목 + 본문 형식의 .md 파일을 불러와서 프롬프트 자동 채우기"
              >
                📄 MD 불러오기
              </button>
              <input
                ref={mdInputRef}
                type="file"
                accept=".md,.markdown,.txt,text/markdown,text/plain"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) importMarkdownFile(f);
                  e.target.value = "";
                }}
              />
              <button
                onClick={addPrompt}
                disabled={prompts.length >= MAX_PROMPTS}
                className="text-xs px-2.5 py-1 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                + 프롬프트 추가
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {prompts.map((p, i) => (
              <div
                key={i}
                className="bg-gray-900 border border-gray-700 rounded-lg focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
              >
                <div className="flex items-center gap-2 px-3 py-1.5 border-b border-gray-800">
                  <span className="text-xs text-gray-500 font-mono shrink-0">
                    #{i + 1}
                  </span>
                  <input
                    type="text"
                    value={p.title}
                    onChange={(e) => updatePromptTitle(i, e.target.value)}
                    placeholder="제목 (선택) — 그룹 묶음 / 다운로드 파일명"
                    className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-500 focus:outline-none"
                  />
                  {imageMode === "per-prompt" && (
                    <label
                      className="text-xs text-gray-400 hover:text-gray-200 cursor-pointer shrink-0 px-1.5 py-0.5 border border-gray-700 rounded hover:border-gray-500"
                      title="이 프롬프트에만 적용되는 이미지 첨부"
                    >
                      📎 이미지
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files) addPromptImages(i, e.target.files);
                          e.target.value = "";
                        }}
                      />
                    </label>
                  )}
                  {prompts.length > 1 && (
                    <button
                      onClick={() => removePrompt(i)}
                      className="w-6 h-6 text-gray-500 hover:text-red-400 transition-colors text-sm shrink-0"
                      title="이 프롬프트 삭제"
                    >
                      ×
                    </button>
                  )}
                </div>
                {imageMode === "per-prompt" && p.refImages.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap px-3 py-2 border-b border-gray-800">
                    {p.refImages.map((img, k) => (
                      <div key={k} className="relative group w-12 h-12">
                        <img
                          src={img.preview}
                          alt={`p${i}-${k}`}
                          className="w-12 h-12 object-cover rounded border border-gray-700"
                        />
                        <button
                          onClick={() => removePromptImage(i, k)}
                          className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-600 rounded-full text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <textarea
                  value={p.text}
                  onChange={(e) => updatePromptText(i, e.target.value)}
                  onPaste={
                    imageMode === "per-prompt"
                      ? (e) => handlePromptPaste(i, e)
                      : i === 0
                      ? handlePaste
                      : undefined
                  }
                  placeholder={
                    imageMode === "per-prompt"
                      ? `프롬프트 ${i + 1} (Ctrl+V로 이 프롬프트에 이미지 붙여넣기)`
                      : i === 0
                      ? "생성하고 싶은 이미지를 설명하세요... (Ctrl+V로 공통 참조 이미지 붙여넣기)"
                      : `프롬프트 ${i + 1}`
                  }
                  rows={3}
                  className="w-full bg-transparent px-3 py-2.5 text-sm focus:outline-none placeholder-gray-500 resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                      e.preventDefault();
                      generateImage();
                    }
                  }}
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            Ctrl + Enter로 생성 · 빈 프롬프트는 무시 · 같은 제목끼리 묶여요
            {imageMode === "per-prompt"
              ? " · 각 프롬프트의 📎 버튼이나 Ctrl+V로 이미지 첨부"
              : " · 첫 번째 칸에 Ctrl+V로 공통 이미지 붙여넣기"}
          </p>
          <p className="text-xs text-gray-600">
            📄 MD 형식 — <code className="text-gray-400">{`# 제목\\n프롬프트 본문`}</code>
            {" "}한 항목마다 헤딩(#) 한 줄, 다음 #까지가 본문
          </p>
        </div>

        {/* Generate Button */}
        <div className="flex gap-2">
          <button
            onClick={generateImage}
            disabled={loading || validCount === 0}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-lg font-medium transition-colors text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                생성 중... ({progress.done}/{progress.total})
              </span>
            ) : (
              repetitions === 1
                ? `${validCount}개 프롬프트 순차 생성`
                : `${validCount * repetitions}장 생성 (${validCount}개 × ${repetitions}회)`
            )}
          </button>
          {loading && (
            <button
              onClick={stopGenerate}
              className="px-4 py-3 bg-red-700 hover:bg-red-600 rounded-lg font-medium text-sm shrink-0"
            >
              중단
            </button>
          )}
        </div>

        {/* Rate-limit retry status */}
        {retryStatus && (
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg px-4 py-3 text-sm text-yellow-200 flex items-start gap-2">
            <span className="text-lg">⏳</span>
            <div className="flex-1">
              <div className="font-semibold mb-0.5">
                Vertex 분당 토큰 한도 도달 — {retryStatus.secondsLeft}초 후 같은 요청 재시도
              </div>
              <div
                className="text-yellow-300/80 text-xs truncate"
                title={retryStatus.prompt}
              >
                {retryStatus.prompt}
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-900/30 border border-red-800 rounded-lg px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Per-prompt failures */}
        {genErrors.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm text-red-300">
                실패 {genErrors.length}개
              </div>
              <button
                onClick={() => setGenErrors([])}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                지우기
              </button>
            </div>
            <div className="bg-red-950/30 border border-red-900/60 rounded-lg divide-y divide-red-900/40 max-h-60 overflow-y-auto">
              {genErrors.map((g, i) => (
                <div key={i} className="px-3 py-2 text-xs space-y-0.5">
                  <div
                    className="text-gray-400 truncate"
                    title={g.prompt}
                  >
                    {g.prompt}
                  </div>
                  <div className="text-red-300 break-words">{g.message}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Images */}
        {groupedImages.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                생성된 이미지 ({images.length}장 · {groupedImages.length}그룹)
              </h2>
              <button
                onClick={() => setImages([])}
                className="text-sm text-gray-400 hover:text-red-400 transition-colors"
              >
                전체 삭제
              </button>
            </div>
            {groupedImages.map((group) => (
              <div key={group.key} className="space-y-2">
                <div className="flex items-center justify-between gap-2 px-1">
                  <div className="text-sm text-gray-200 break-words flex-1">
                    <span className="text-gray-500 font-mono mr-2">
                      [{group.images.length}]
                    </span>
                    {group.hasTitle ? (
                      <span className="font-medium">{group.title}</span>
                    ) : (
                      <span className="text-gray-400">{group.title}</span>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      setImages((prev) =>
                        prev.filter((img) => {
                          const t = img.title?.trim();
                          if (group.hasTitle) return t !== group.title;
                          return !!t || img.prompt !== group.title;
                        })
                      )
                    }
                    className="text-xs text-gray-500 hover:text-red-400 transition-colors shrink-0"
                  >
                    그룹 삭제
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {group.images.map((img, i) => (
                    <div
                      key={i}
                      className="group relative bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
                    >
                      <img
                        src={img.url}
                        alt={`Generated ${i + 1}`}
                        className="w-full h-auto"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 rounded text-xs text-gray-200 font-mono">
                        #{i + 1}
                      </div>
                      {group.hasTitle && (
                        <div
                          className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/80 to-transparent text-xs text-gray-300 truncate"
                          title={img.prompt}
                        >
                          {img.prompt}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => downloadImage(img, i)}
                          className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                          다운로드
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
          </>
        )}

        {tab === "video" && (
          <>
            {/* Vertex notice */}
            <div className="bg-emerald-900/20 border border-emerald-800 rounded-lg px-4 py-3 text-sm text-emerald-300">
              🔐 Vertex AI · Veo 2 (음성 없음) · {videoDuration}초 · 약 ${(videoDuration * 0.35).toFixed(2)}/회
            </div>

            {/* Source Image */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                소스 이미지 (필수)
              </label>
              {videoSource ? (
                <div className="relative group inline-block">
                  <img
                    src={videoSource.preview}
                    alt="source"
                    className="max-h-64 rounded-lg border border-gray-700"
                  />
                  <button
                    onClick={() => setVideoSource(null)}
                    className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    제거
                  </button>
                </div>
              ) : (
                <label
                  className="flex flex-col items-center justify-center h-40 bg-gray-900 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <span className="text-sm text-gray-400">
                    클릭해서 이미지 선택 또는 아래 프롬프트에 Ctrl+V로 붙여넣기
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleVideoSourceFile(e.target.files)}
                  />
                </label>
              )}
            </div>

            {/* Prompt */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                프롬프트
              </label>
              <textarea
                value={videoPrompt}
                onChange={(e) => setVideoPrompt(e.target.value)}
                onPaste={!videoSource ? handleVideoSourcePaste : undefined}
                placeholder="카메라 움직임, 동작, 분위기를 묘사하세요. 예: slow camera push-in, gentle wind, cinematic"
                rows={3}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-500 resize-none"
              />
            </div>

            {/* Aspect + Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  비율
                </label>
                <select
                  value={videoAspect}
                  onChange={(e) =>
                    setVideoAspect(e.target.value as "16:9" | "9:16")
                  }
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="16:9">가로 16:9</option>
                  <option value="9:16">세로 9:16</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  길이: {videoDuration}초
                </label>
                <input
                  type="range"
                  min={5}
                  max={8}
                  value={videoDuration}
                  onChange={(e) => setVideoDuration(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>

            {/* Generate */}
            <button
              onClick={generateVideo}
              disabled={videoLoading || !videoSource || !videoPrompt.trim()}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-lg font-medium transition-colors text-sm"
            >
              {videoLoading
                ? `생성 중... ${videoElapsed}s (보통 1~3분)`
                : "영상 생성"}
            </button>

            {/* Error */}
            {videoError && (
              <div className="bg-red-900/30 border border-red-800 rounded-lg px-4 py-3 text-sm text-red-300">
                {videoError}
              </div>
            )}

            {/* Videos */}
            {videos.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    생성된 영상 ({videos.length})
                  </h2>
                  <button
                    onClick={() => setVideos([])}
                    className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                  >
                    전체 삭제
                  </button>
                </div>
                <div className="space-y-4">
                  {videos.map((v, i) => (
                    <div
                      key={i}
                      className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
                    >
                      <video
                        src={v.url}
                        controls
                        loop
                        className="w-full"
                      />
                      <div className="px-4 py-3 flex items-center justify-between gap-3">
                        <div className="text-xs text-gray-300 truncate flex-1">
                          {v.prompt}
                        </div>
                        <button
                          onClick={() => downloadVideo(v, i)}
                          className="px-3 py-1.5 bg-white text-black rounded-md text-xs font-medium hover:bg-gray-200 transition-colors shrink-0"
                        >
                          다운로드
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {tab === "bgremove" && (
          <>
            <div className="bg-amber-900/20 border border-amber-800 rounded-lg px-4 py-3 text-sm text-amber-300 space-y-1">
              <div>🪄 photoroom.com 무료 배경 제거를 자동화합니다. 처음 실행 시 브라우저 창이 열리며, 캡차/로그인 필요 시 직접 처리하세요. 세션은 <code className="px-1 bg-amber-950/50 rounded">.photoroom_session</code>에 저장됩니다.</div>
              <div className="text-amber-400/80">💡 <b>첫 프레임 성공 후 브라우저는 자동으로 최소화됩니다</b> — Photoroom 앱의 스크롤 댄스를 안 보기 위함. 작업표시줄에서 다시 띄울 수 있어요.</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">입력 폴더 (절대 경로)</label>
              <input
                type="text"
                value={bgInputDir}
                onChange={(e) => setBgInputDir(e.target.value)}
                placeholder="C:\Users\mintae\coding\DianoCard\DianoCardPlan\MVP\Animation\lobby_main_idle\frames_raw"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">출력 폴더 (없으면 자동 생성)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={bgOutputDir}
                  onChange={(e) => setBgOutputDir(e.target.value)}
                  placeholder="C:\...\frames_nobg"
                  className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-600"
                />
                <button
                  onClick={() => {
                    if (!bgInputDir.trim()) return;
                    const trimmed = bgInputDir.trim().replace(/[\\/]+$/, "");
                    setBgOutputDir(trimmed + "_nobg");
                  }}
                  className="px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-xs hover:bg-gray-700 transition-colors shrink-0"
                  title="입력 폴더명 + _nobg"
                >
                  자동
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="bg-headless"
                checked={bgHeadless}
                onChange={(e) => setBgHeadless(e.target.checked)}
                className="accent-blue-500"
              />
              <label htmlFor="bg-headless" className="text-sm text-gray-300">
                백그라운드 실행 (브라우저 창 숨김 — 로그인 필요한 경우 끌 것)
              </label>
            </div>

            <div className="flex gap-2">
              <button
                onClick={startBgRemove}
                disabled={bgRunning || !bgInputDir.trim() || !bgOutputDir.trim()}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-lg font-medium transition-colors text-sm"
              >
                {bgRunning
                  ? bgPaused
                    ? `일시정지됨 (${bgProgress.current}/${bgProgress.total})`
                    : `처리 중... ${bgProgress.current}/${bgProgress.total}`
                  : "배경 제거 시작"}
              </button>
              {bgRunning && !bgPaused && (
                <button
                  onClick={pauseBgRemove}
                  className="px-4 py-3 bg-yellow-600 hover:bg-yellow-500 rounded-lg font-medium text-sm shrink-0"
                  title="브라우저에서 직접 캡차 풀고 싶을 때"
                >
                  ⏸ 일시정지
                </button>
              )}
              {bgRunning && bgPaused && (
                <button
                  onClick={resumeBgRemove}
                  className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium text-sm shrink-0"
                >
                  ▶ 재개
                </button>
              )}
              {bgRunning && (
                <button
                  onClick={stopBgRemove}
                  className="px-4 py-3 bg-red-700 hover:bg-red-600 rounded-lg font-medium text-sm shrink-0"
                >
                  중단
                </button>
              )}
            </div>

            {bgError && (
              <div className="bg-red-900/30 border border-red-800 rounded-lg px-4 py-3 text-sm text-red-300">
                {bgError}
              </div>
            )}

            {bgCaptcha && (
              <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg px-4 py-3 text-sm text-yellow-200 flex items-start gap-2">
                <span className="text-lg">🤖</span>
                <div className="flex-1">
                  <div className="font-semibold mb-1">Cloudflare 인증 필요</div>
                  <div>{bgCaptcha}</div>
                </div>
              </div>
            )}

            {bgPaused && (
              <div className="bg-blue-900/30 border border-blue-700 rounded-lg px-4 py-3 text-sm text-blue-200 flex items-start gap-2">
                <span className="text-lg">⏸</span>
                <div className="flex-1">
                  <div className="font-semibold mb-1">일시정지됨</div>
                  <div>
                    매크로가 멈췄습니다. 브라우저 창에서 캡차를 직접 풀거나 원하는 작업을 하세요. 끝나면 <b>▶ 재개</b> 버튼을 누르면 이어서 진행됩니다.
                  </div>
                </div>
              </div>
            )}

            {bgInitInfo && (
              <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-sm space-y-1">
                <div className="text-gray-300">
                  전체 <span className="font-semibold text-white">{bgInitInfo.total}</span>개 중
                  처리 필요 <span className="font-semibold text-blue-400">{bgInitInfo.todo}</span>개
                  (이미 완료 <span className="text-emerald-400">{bgInitInfo.completed}</span>개)
                </div>
                {bgProgress.total > 0 && (
                  <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>
                        진행 {bgProgress.current}/{bgProgress.total}
                        {" · "}
                        성공 <span className="text-emerald-400">{bgProgress.ok}</span>
                        {" · "}
                        실패 <span className="text-red-400">{bgProgress.fail}</span>
                      </span>
                      <span>
                        {Math.round((bgProgress.current / Math.max(1, bgProgress.total)) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all"
                        style={{
                          width: `${(bgProgress.current / Math.max(1, bgProgress.total)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {bgLog.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">처리 기록 (최근 100개)</label>
                <div className="bg-gray-900 border border-gray-800 rounded-lg max-h-80 overflow-y-auto divide-y divide-gray-800">
                  {bgLog.map((entry) => (
                    <div
                      key={entry.id}
                      className="px-3 py-1.5 text-xs flex items-center gap-2 font-mono"
                    >
                      <span
                        className={`shrink-0 w-12 text-center rounded px-1 ${
                          entry.status === "ok"
                            ? "bg-emerald-900/40 text-emerald-300"
                            : entry.status === "fail"
                            ? "bg-red-900/40 text-red-300"
                            : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        {entry.status === "ok" ? "OK" : entry.status === "fail" ? "FAIL" : "..."}
                      </span>
                      <span className="text-gray-200 truncate flex-1">{entry.file}</span>
                      {entry.ms !== undefined && (
                        <span className="text-gray-500 shrink-0">{(entry.ms / 1000).toFixed(1)}s</span>
                      )}
                      {entry.error && (
                        <span
                          className="text-red-400 truncate max-w-xs"
                          title={entry.error}
                        >
                          {entry.error}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
