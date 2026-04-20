"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import StyleRefsBanner from "../_components/StyleRefsBanner";

type Preset = { slug: string; label: string; concept: string };

const PRESETS: Preset[] = [
  {
    slug: "slash_gold",
    label: "금빛 유물 슬래시",
    concept:
      "중앙에서 오른쪽 위로 뻗어가는 호(弧) 궤적. 금빛·베이지 그라데이션, 궤적 앞쪽은 굵고 뒤는 얇게. 사이드에 작은 광입자 파편 몇 개.",
  },
  {
    slug: "impact_punch",
    label: "주먹 임팩트",
    concept:
      "중앙에서 방사형으로 퍼지는 날카로운 흰/노랑 임팩트. 중앙 코어는 밝게 타오르고 외곽으로 파편 스파크 튐. 쇼크웨이브 링 1개.",
  },
  {
    slug: "magic_fire",
    label: "화염구 폭발",
    concept:
      "중심에서 불꽃이 바깥으로 터지는 구체. 붉은·주황 그라데이션, 위쪽으로 더 격렬한 불꽃 트레일.",
  },
  {
    slug: "magic_lightning",
    label: "번개 낙하",
    concept:
      "위에서 아래로 내리꽂히는 지그재그 번개 한 줄기. 청백색, 주변에 작은 번개 파편. 착탄점에 흰 빛 폭발.",
  },
  {
    slug: "shockwave_ring",
    label: "쇼크웨이브 링",
    concept:
      "중심에서 동심원 3겹이 바깥으로 퍼지는 파동. 반투명 푸른 은색, 중심 쪽은 진하고 바깥은 옅어짐. 중앙에 작은 코어 섬광.",
  },
  {
    slug: "slash_blue_curve",
    label: "푸른 마법 곡선 슬래시",
    concept:
      "왼쪽 아래에서 오른쪽 위로 그려지는 푸른 반달 궤적. 소프트 글로우 후광, 궤적 가장자리에 얇은 흰색 코어 라인.",
  },
];

export default function AttackFxPage() {
  const [slug, setSlug] = useState("");
  const [label, setLabel] = useState("");
  const [concept, setConcept] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ publicPath: string; filename: string } | null>(
    null,
  );

  useEffect(() => {
    const t = setTimeout(() => {
      if (!label && !concept) return;
      const params = new URLSearchParams({ slug, label, concept });
      fetch(`/api/generate-attack-fx?${params.toString()}`)
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
      const r = await fetch("/api/generate-attack-fx", {
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
          <h1 className="text-2xl font-bold">공격 이펙트 생성기</h1>
        </header>

        <div className="mb-6">
          <StyleRefsBanner agent="attack-fx" entityId={slug || undefined} />
        </div>

        <div className="mb-4">
          <div className="text-sm text-zinc-400 mb-2">빠른 프리셋</div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.slug}
                onClick={() => {
                  setSlug(p.slug);
                  setLabel(p.label);
                  setConcept(p.concept);
                }}
                className="px-3 py-1.5 rounded text-xs bg-zinc-900 border border-zinc-800 hover:border-amber-700 hover:bg-amber-950/40 transition"
              >
                <code className="text-zinc-500 mr-1">{p.slug}</code>
                {p.label}
              </button>
            ))}
          </div>
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
                placeholder="slash_gold / impact_punch …"
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
                placeholder="예: 금빛 유물 슬래시"
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
                rows={5}
                placeholder="방향성, 색상, 코어/파편 묘사 등"
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
              {generating ? "생성 중… (~20초)" : "이펙트 생성"}
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
                <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
                  <div className="text-sm text-zinc-400">
                    저장됨: <code className="text-zinc-200">{result.filename}</code>
                  </div>
                  <a
                    href={result.publicPath}
                    download={result.filename}
                    className="px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-600 text-sm text-white font-medium inline-flex items-center gap-1.5 transition"
                  >
                    ⬇ 다운로드
                  </a>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result.publicPath}
                  alt={result.filename}
                  className="rounded border border-zinc-700 w-96 h-96 bg-[repeating-conic-gradient(#27272a_0%_25%,#3f3f46_0%_50%)] bg-[length:16px_16px]"
                />
              </div>
            ) : (
              <div className="text-zinc-500 text-sm p-8 border border-dashed border-zinc-800 rounded">
                프리셋 클릭하거나 직접 작성 후 생성
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
