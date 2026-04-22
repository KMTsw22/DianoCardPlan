"use client";

import { useState } from "react";

type EnemyType = "NORMAL" | "ELITE" | "BOSS";

type GenResult = {
  id: string;
  publicPath: string;
  filename: string;
  enemy_type: EnemyType;
};

/**
 * 랜덤 맵 몬스터 생성 패널 — 현재는 field-monster 전용.
 * CSV 엔트리 없이 배경 맵과 어울리는 새 몬스터를 즉석 발명하여 저장한다.
 * 결과는 `public/generated/field-monster/RAND_<timestamp>.png`.
 */
export default function RandomMonsterPanel() {
  const [enemyType, setEnemyType] = useState<EnemyType>("NORMAL");
  const [chapter, setChapter] = useState("1");
  const [hint, setHint] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<GenResult[]>([]);

  async function generate() {
    setGenerating(true);
    setError(null);
    try {
      const r = await fetch("/api/generate-field-monster-random", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enemy_type: enemyType, chapter, hint: hint.trim() }),
      });
      const d = await r.json();
      if (!r.ok || d.error) throw new Error(d.error ?? `HTTP ${r.status}`);
      setResults((prev) => [
        { id: d.id, publicPath: d.publicPath, filename: d.filename, enemy_type: enemyType },
        ...prev,
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="p-4 rounded-lg border border-fuchsia-900 bg-fuchsia-950/30">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
        <div>
          <div className="text-sm font-semibold text-fuchsia-200">
            🎲 랜덤 몬스터 — 배경 맵과 어울리는 새 몬스터 발명
          </div>
          <div className="text-[11px] text-fuchsia-400/80 mt-0.5">
            enemy.csv에 없는 신규 몬스터를 즉석 생성. 결과는{" "}
            <code>RAND_&lt;timestamp&gt;.png</code> 로 저장됨.
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-fuchsia-300">타입</label>
          <div className="flex rounded overflow-hidden border border-fuchsia-800">
            {(["NORMAL", "ELITE", "BOSS"] as EnemyType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setEnemyType(t)}
                className={`px-3 py-1.5 text-xs transition ${
                  enemyType === t
                    ? "bg-fuchsia-700 text-white"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-fuchsia-300">챕터</label>
          <select
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            className="px-2 py-1.5 rounded bg-zinc-900 border border-fuchsia-800 text-xs text-zinc-200 focus:outline-none focus:border-fuchsia-600"
          >
            <option value="1">1 (정글 유적)</option>
            <option value="2">2 (사막·피라미드)</option>
            <option value="3">3 (화산)</option>
            <option value="4">4 (심연)</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 flex-1 min-w-[240px]">
          <label className="text-[11px] text-fuchsia-300">
            추가 힌트 (선택) — 없으면 완전 자유 창작
          </label>
          <input
            type="text"
            value={hint}
            onChange={(e) => setHint(e.target.value)}
            placeholder="예: 양서류 원형, 등에 돌조각 박힌"
            className="px-2 py-1.5 rounded bg-zinc-900 border border-fuchsia-800 text-xs text-zinc-200 focus:outline-none focus:border-fuchsia-600"
          />
        </div>

        <button
          type="button"
          onClick={generate}
          disabled={generating}
          className="px-4 py-2 rounded bg-fuchsia-700 hover:bg-fuchsia-600 disabled:bg-zinc-700 disabled:cursor-not-allowed text-sm font-medium text-white transition"
        >
          {generating ? "생성 중… (30초~)" : "🎲 랜덤 생성"}
        </button>
      </div>

      {error && (
        <div className="mt-3 p-2 rounded bg-red-950 border border-red-800 text-xs text-red-300">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-4">
          <div className="text-[11px] text-fuchsia-400 mb-2">
            최근 랜덤 생성 결과 ({results.length}장) — 최신순
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {results.map((r) => (
              <a
                key={r.id}
                href={r.publicPath}
                download={r.filename}
                className="group block rounded border border-fuchsia-900 bg-zinc-950 overflow-hidden hover:border-fuchsia-500 transition"
                title={`${r.filename} — 클릭하여 다운로드`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.publicPath}
                  alt={r.id}
                  className="w-full aspect-square object-contain bg-[repeating-conic-gradient(#27272a_0%_25%,#3f3f46_0%_50%)] bg-[length:16px_16px]"
                />
                <div className="px-2 py-1 text-[10px] text-zinc-400 flex items-center justify-between">
                  <span className="truncate">{r.id}</span>
                  <span className="text-fuchsia-500">{r.enemy_type}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
