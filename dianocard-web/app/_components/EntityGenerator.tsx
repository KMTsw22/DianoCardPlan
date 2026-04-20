"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import StyleRefsBanner from "./StyleRefsBanner";

export type EntityItem = {
  id: string;
  primary: string;
  secondary?: string;
  tag?: string;
  raw: Record<string, string>;
};

type Props = {
  title: string;
  agentName: string;
  fetchListUrl: string;
  listAccessor: (data: unknown) => EntityItem[];
  fetchPromptUrl: (id: string) => string;
  postGenerateUrl: string;
  postBody: (id: string, promptOverride: string) => Record<string, unknown>;
  searchFields?: (item: EntityItem) => string[];
};

/**
 * 다운로드 파일명 생성 — 원본 파일 확장자 유지하면서 "ID_이름_agent.ext" 포맷으로.
 * 예: C107 정화 (card-art) → "C107_정화_card-art.png"
 */
function buildDownloadName(
  item: EntityItem,
  agentName: string,
  originalFilename: string,
): string {
  const ext = originalFilename.includes(".")
    ? originalFilename.substring(originalFilename.lastIndexOf("."))
    : ".png";
  // 파일시스템 안전 문자로 치환 — 공백·특수문자 제거
  const safePrimary = item.primary
    .replace(/[\\/:*?"<>|]/g, "")
    .replace(/\s+/g, "_")
    .trim();
  return `${item.id}_${safePrimary}_${agentName}${ext}`;
}

export default function EntityGenerator(props: Props) {
  const {
    title,
    agentName,
    fetchListUrl,
    listAccessor,
    fetchPromptUrl,
    postGenerateUrl,
    postBody,
    searchFields,
  } = props;

  const [items, setItems] = useState<EntityItem[]>([]);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState<EntityItem | null>(null);
  const [prompt, setPrompt] = useState("");
  const [loadingPrompt, setLoadingPrompt] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<{ publicPath: string; filename: string } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(fetchListUrl)
      .then((r) => r.json())
      .then((d) => setItems(listAccessor(d)))
      .catch((e) => setError(String(e)));
  }, [fetchListUrl, listAccessor]);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => {
      const hay = searchFields ? searchFields(it).join(" ") : [it.id, it.primary, it.secondary, it.tag].join(" ");
      return hay.toLowerCase().includes(q);
    });
  }, [items, filter, searchFields]);

  async function selectItem(it: EntityItem) {
    setSelected(it);
    setResult(null);
    setError(null);
    setLoadingPrompt(true);
    try {
      const r = await fetch(fetchPromptUrl(it.id));
      const d = await r.json();
      if (d.error) throw new Error(d.error);
      setPrompt(d.prompt);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoadingPrompt(false);
    }
  }

  async function generate() {
    if (!selected) return;
    setGenerating(true);
    setError(null);
    setResult(null);
    try {
      const r = await fetch(postGenerateUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postBody(selected.id, prompt)),
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
      <main className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-4 flex items-center gap-4">
          <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-100">
            ← Hub
          </Link>
          <h1 className="text-2xl font-bold">{title}</h1>
        </header>

        <div className="mb-6">
          <StyleRefsBanner agent={agentName} entityId={selected?.id} />
        </div>

        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-4">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="검색"
              className="w-full mb-3 px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-sm focus:outline-none focus:border-zinc-600"
            />
            <div className="max-h-[75vh] overflow-y-auto space-y-1 pr-1">
              {filtered.map((it) => (
                <button
                  key={it.id}
                  onClick={() => selectItem(it)}
                  className={`w-full text-left px-3 py-2 rounded text-sm border transition ${
                    selected?.id === it.id
                      ? "bg-indigo-950 border-indigo-600"
                      : "bg-zinc-900 border-zinc-800 hover:border-zinc-600"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-medium">
                      <code className="text-xs text-zinc-500 mr-2">{it.id}</code>
                      {it.primary}
                    </span>
                    {it.tag && (
                      <span className="text-[10px] text-zinc-500">{it.tag}</span>
                    )}
                  </div>
                  {it.secondary && (
                    <div className="text-xs text-zinc-500 mt-0.5">{it.secondary}</div>
                  )}
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="text-sm text-zinc-500 text-center py-8">없음</div>
              )}
            </div>
          </aside>

          <section className="col-span-8">
            {!selected ? (
              <div className="rounded-lg border border-dashed border-zinc-800 p-16 text-center text-zinc-500">
                좌측에서 항목을 선택하세요.
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-zinc-300">
                      프롬프트 (수정 가능)
                    </label>
                    {loadingPrompt && (
                      <span className="text-xs text-zinc-500">로딩…</span>
                    )}
                  </div>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={14}
                    className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono leading-relaxed focus:outline-none focus:border-zinc-600"
                  />
                </div>

                <button
                  onClick={generate}
                  disabled={generating || loadingPrompt}
                  className="px-5 py-2.5 rounded bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 disabled:cursor-not-allowed font-medium transition"
                >
                  {generating ? "생성 중… (30초~)" : "이미지 생성"}
                </button>

                {error && (
                  <div className="p-3 rounded bg-red-950 border border-red-800 text-sm text-red-300">
                    {error}
                  </div>
                )}

                {result && (
                  <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900">
                    <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
                      <div className="text-sm text-zinc-400">
                        저장됨: <code className="text-zinc-200">{result.filename}</code>
                      </div>
                      <a
                        href={result.publicPath}
                        download={buildDownloadName(selected, agentName, result.filename)}
                        className="px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-600 text-sm text-white font-medium inline-flex items-center gap-1.5 transition"
                      >
                        ⬇ 다운로드
                        <span className="text-[10px] text-emerald-200/80 font-mono">
                          {buildDownloadName(selected, agentName, result.filename)}
                        </span>
                      </a>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={result.publicPath}
                      alt={selected.id}
                      className="rounded border border-zinc-700 max-h-[70vh] bg-[repeating-conic-gradient(#27272a_0%_25%,#3f3f46_0%_50%)] bg-[length:24px_24px]"
                    />
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
