"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import StyleRefsBanner from "../_components/StyleRefsBanner";

type RefSource = "field-summon" | "field-monster" | "card" | "character" | "attack-fx";
const MOTIONS = ["idle", "attack", "hit", "die", "summon", "special"] as const;
type Motion = (typeof MOTIONS)[number];

export default function MoveBoardPage() {
  const [refSource, setRefSource] = useState<RefSource>("field-summon");
  const [refId, setRefId] = useState("");
  const [motion, setMotion] = useState<Motion>("attack");
  const [frameCount, setFrameCount] = useState(4);
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    sheetFilename: string;
    publicSheetPath: string;
    publicFramePaths: string[];
  } | null>(null);
  // 선택한 refSource에 대응하는 "이미 생성된 레퍼런스" 목록 — 자동완성/선택용
  const [availableIds, setAvailableIds] = useState<string[]>([]);

  useEffect(() => {
    // attack-fx 는 freeform slug — CSV 없이 public/generated/attack-fx/ 에서 목록 가져오기
    if (refSource === "attack-fx") {
      fetch("/api/generated-list?source=attack-fx")
        .then((r) => r.json())
        .then((d) => setAvailableIds(d.ids ?? []))
        .catch(() => setAvailableIds([]));
      return;
    }
    // refSource별 엔티티 목록 API를 호출해서 pick-list 채움
    const urlMap: Record<Exclude<RefSource, "attack-fx">, string> = {
      "field-summon": "/api/cards",
      "field-monster": "/api/enemies",
      card: "/api/cards",
      character: "/api/characters",
    };
    const keyMap: Record<Exclude<RefSource, "attack-fx">, string> = {
      "field-summon": "cards",
      "field-monster": "enemies",
      card: "cards",
      character: "characters",
    };
    fetch(urlMap[refSource])
      .then((r) => r.json())
      .then((d) => {
        const arr = (d[keyMap[refSource]] ?? []) as Array<{
          id: string;
          card_type?: string;
        }>;
        const filtered =
          refSource === "field-summon"
            ? arr.filter((x) => x.card_type === "SUMMON")
            : arr;
        setAvailableIds(filtered.map((x) => x.id));
      })
      .catch(() => setAvailableIds([]));
  }, [refSource]);

  useEffect(() => {
    const params = new URLSearchParams({
      refId,
      motion,
      frameCount: String(frameCount),
      description,
    });
    fetch(`/api/generate-move-board?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.prompt) setPrompt(d.prompt);
      })
      .catch(() => {});
  }, [refId, motion, frameCount, description]);

  async function generate() {
    if (!refId) {
      setError("refId 필수");
      return;
    }
    setGenerating(true);
    setError(null);
    setResult(null);
    try {
      const r = await fetch("/api/generate-move-board", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refId,
          refSource,
          motion,
          frameCount,
          description,
          promptOverride: prompt,
        }),
      });
      const d = await r.json();
      if (!r.ok || d.error) throw new Error(d.error ?? `HTTP ${r.status}`);
      setResult({
        sheetFilename: d.sheetFilename,
        publicSheetPath: d.publicSheetPath,
        publicFramePaths: d.publicFramePaths,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setGenerating(false);
    }
  }

  const estimatedSec = frameCount * 15;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-4 flex items-center gap-4">
          <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-100">
            ← Hub
          </Link>
          <h1 className="text-2xl font-bold">모션 스프라이트 시트 생성기</h1>
        </header>

        <div className="mb-6">
          <StyleRefsBanner agent="move-board" />
        </div>

        <div className="grid grid-cols-12 gap-6">
          <section className="col-span-5 space-y-4">
            <div className="p-3 rounded bg-amber-950 border border-amber-800 text-xs text-amber-300">
              먼저 <b>field-summon / field-monster / card / character</b> 중 하나로 참조 이미지를
              생성해두어야 합니다. 이 페이지는 그 이미지를 가져와 모션별 N프레임을 뽑고 가로 시트로 합성합니다.
              <br />
              <span className="text-amber-400/80">
                예: 플레이어 캐릭터 공격 모션 → refSource=<code>character</code>, refId=<code>CH001</code>, motion=
                <code>attack</code>
              </span>
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-300 block mb-1">
                참조 소스
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["field-summon", "field-monster", "card", "character", "attack-fx"] as RefSource[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setRefSource(s)}
                    className={`px-3 py-2 rounded text-sm border ${
                      refSource === s
                        ? "bg-indigo-950 border-indigo-600"
                        : "bg-zinc-900 border-zinc-800 hover:border-zinc-600"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-300 block mb-1 flex items-center justify-between">
                <span>Ref ID</span>
                <span className="text-[10px] text-zinc-500">
                  사용 가능: {availableIds.length}개
                </span>
              </label>
              <input
                list="refid-list"
                value={refId}
                onChange={(e) => setRefId(e.target.value)}
                placeholder={availableIds[0] ?? "예: C001"}
                className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-sm"
              />
              <datalist id="refid-list">
                {availableIds.map((id) => (
                  <option key={id} value={id} />
                ))}
              </datalist>
              {/* 퀵 선택 칩 — 가장 자주 쓰는 것들만 최대 8개 노출 */}
              {availableIds.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {availableIds.slice(0, 8).map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setRefId(id)}
                      className={`px-2 py-0.5 rounded text-[11px] border ${
                        refId === id
                          ? "bg-indigo-900 border-indigo-600 text-indigo-200"
                          : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600"
                      }`}
                    >
                      {id}
                    </button>
                  ))}
                  {availableIds.length > 8 && (
                    <span className="text-[11px] text-zinc-500 px-1 py-0.5">
                      +{availableIds.length - 8}개 더…
                    </span>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-300 block mb-1">
                Motion
              </label>
              <div className="grid grid-cols-3 gap-2">
                {MOTIONS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMotion(m)}
                    className={`px-3 py-2 rounded text-sm border ${
                      motion === m
                        ? "bg-indigo-950 border-indigo-600"
                        : "bg-zinc-900 border-zinc-800 hover:border-zinc-600"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-300 block mb-1">
                Frame Count ({frameCount})
              </label>
              <input
                type="range"
                min={2}
                max={8}
                value={frameCount}
                onChange={(e) => setFrameCount(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-300 block mb-1">
                추가 설명 (선택)
              </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="예: 꼬리로 후려치는 공격"
                className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-300 block mb-1">
                프롬프트 (프레임 1 기준 미리보기)
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={10}
                className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono leading-relaxed"
              />
            </div>

            <button
              onClick={generate}
              disabled={generating || !refId}
              className="px-5 py-2.5 rounded bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 font-medium"
            >
              {generating
                ? `생성 중… (${frameCount}프레임, ~${estimatedSec}초)`
                : `${frameCount} 프레임 생성 + 시트 합성`}
            </button>

            {error && (
              <div className="p-3 rounded bg-red-950 border border-red-800 text-sm text-red-300">
                {error}
              </div>
            )}
          </section>

          <section className="col-span-7 space-y-4">
            {result ? (
              <>
                <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900">
                  <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
                    <div className="text-sm text-zinc-400">
                      스프라이트 시트:{" "}
                      <code className="text-zinc-200">{result.sheetFilename}</code>
                    </div>
                    <a
                      href={result.publicSheetPath}
                      download={`${refId}_${motion}_sheet.png`}
                      className="px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-600 text-sm text-white font-medium inline-flex items-center gap-1.5 transition"
                    >
                      ⬇ 시트 다운로드
                      <span className="text-[10px] text-emerald-200/80 font-mono">
                        {refId}_{motion}_sheet.png
                      </span>
                    </a>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={result.publicSheetPath}
                    alt="sheet"
                    className="rounded border border-zinc-700 w-full bg-[repeating-conic-gradient(#27272a_0%_25%,#3f3f46_0%_50%)] bg-[length:16px_16px]"
                  />
                </div>
                <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900">
                  <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                    <div className="text-sm text-zinc-400">개별 프레임</div>
                    <button
                      type="button"
                      onClick={async () => {
                        // 모든 프레임 한 번에 저장 — 브라우저가 허용하면 여러 다운로드 트리거
                        for (let i = 0; i < result.publicFramePaths.length; i++) {
                          const a = document.createElement("a");
                          a.href = result.publicFramePaths[i];
                          a.download = `${refId}_${motion}_f${String(i + 1).padStart(2, "0")}.png`;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          await new Promise((r) => setTimeout(r, 200));
                        }
                      }}
                      className="px-3 py-1 rounded bg-emerald-800 hover:bg-emerald-700 text-xs text-white font-medium transition"
                    >
                      ⬇ 프레임 전체 일괄 다운로드
                    </button>
                  </div>
                  <div
                    className="grid gap-2"
                    style={{
                      gridTemplateColumns: `repeat(${Math.min(frameCount, 4)}, minmax(0, 1fr))`,
                    }}
                  >
                    {result.publicFramePaths.map((p, i) => (
                      <div key={i}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p}
                          alt={`f${i + 1}`}
                          className="rounded border border-zinc-700 w-full bg-[repeating-conic-gradient(#27272a_0%_25%,#3f3f46_0%_50%)] bg-[length:12px_12px]"
                        />
                        <a
                          href={p}
                          download={`${refId}_${motion}_f${String(i + 1).padStart(2, "0")}.png`}
                          className="block mt-1 text-[11px] text-emerald-400 hover:text-emerald-300 text-center font-medium"
                        >
                          ⬇ f{String(i + 1).padStart(2, "0")}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-lg border border-dashed border-zinc-800 p-16 text-center text-zinc-500">
                좌측에서 참조 이미지와 모션을 지정하고 생성하세요.
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
