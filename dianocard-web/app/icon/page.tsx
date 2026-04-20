"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import StyleRefsBanner from "../_components/StyleRefsBanner";

export default function IconPage() {
  const [slug, setSlug] = useState("");
  const [label, setLabel] = useState("");
  const [concept, setConcept] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ publicPath: string; filename: string } | null>(
    null
  );

  useEffect(() => {
    const t = setTimeout(() => {
      if (!label && !concept) return;
      const params = new URLSearchParams({ slug, label, concept });
      fetch(`/api/generate-icon?${params.toString()}`)
        .then((r) => r.json())
        .then((d) => {
          if (d.prompt) setPrompt(d.prompt);
        })
        .catch(() => {});
    }, 400);
    return () => clearTimeout(t);
  }, [slug, label, concept]);

  async function generate() {
    if (!label || !concept) {
      setError("label 과 concept 는 필수");
      return;
    }
    setGenerating(true);
    setError(null);
    setResult(null);
    try {
      const r = await fetch("/api/generate-icon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, label, concept, promptOverride: prompt }),
      });
      const d = await r.json();
      if (!r.ok || d.error) throw new Error(d.error ?? `HTTP ${r.status}`);
      setResult({ publicPath: d.publicPath, filename: d.filename });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="max-w-5xl mx-auto px-6 py-8">
        <header className="mb-4 flex items-center gap-4">
          <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-100">
            ← Hub
          </Link>
          <h1 className="text-2xl font-bold">UI 아이콘 생성기</h1>
        </header>

        <div className="mb-6">
          <StyleRefsBanner agent="icon" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-zinc-300 block mb-1">
                Slug (파일명, 선택)
              </label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="mana / hp / burn_status …"
                className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-300 block mb-1">
                Label (표시 이름) *
              </label>
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="예: 마나"
                className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-300 block mb-1">
                Concept (시각적 요구사항) *
              </label>
              <textarea
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                rows={4}
                placeholder="예: 푸른 크리스탈 방울 모양, 상단에 작은 하이라이트"
                className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-300 block mb-1">
                최종 프롬프트 (자동 합성, 수정 가능)
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={12}
                className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono leading-relaxed"
              />
            </div>
            <button
              onClick={generate}
              disabled={generating}
              className="px-5 py-2.5 rounded bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 font-medium"
            >
              {generating ? "생성 중…" : "아이콘 생성"}
            </button>
            {error && (
              <div className="p-3 rounded bg-red-950 border border-red-800 text-sm text-red-300">
                {error}
              </div>
            )}
          </div>

          <div className="flex items-start justify-center">
            {result ? (
              <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900">
                <div className="text-sm text-zinc-400 mb-3">
                  저장됨: <code className="text-zinc-200">{result.filename}</code>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result.publicPath}
                  alt={result.filename}
                  className="rounded border border-zinc-700 w-64 h-64 bg-[repeating-conic-gradient(#27272a_0%_25%,#3f3f46_0%_50%)] bg-[length:16px_16px]"
                />
              </div>
            ) : (
              <div className="text-zinc-500 text-sm p-8 border border-dashed border-zinc-800 rounded">
                아직 결과 없음
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
