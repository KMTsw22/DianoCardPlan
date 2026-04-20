"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import StyleRefsBanner from "../_components/StyleRefsBanner";

type CardRow = {
  id: string;
  name_kr: string;
  card_type: string;
  sub_type: string;
};

type StageKind = "card-art" | "card-effect" | "field-summon" | "move-board";

const STAGE_META: Record<
  StageKind,
  { label: string; desc: string; produces: string }
> = {
  "card-art": {
    label: "카드 아트",
    desc: "카드 일러스트 (512×768, 단순배경)",
    produces: "card",
  },
  "card-effect": {
    label: "카드 사용 이펙트",
    desc: "오버레이 이펙트 (투명배경)",
    produces: "card-effect",
  },
  "field-summon": {
    label: "맵 소환수(공룡)",
    desc: "측면 대기 스프라이트 (투명배경)",
    produces: "field-summon",
  },
  "move-board": {
    label: "무브 보드 (N프레임 모션)",
    desc: "field-summon을 기반으로 attack 모션 4프레임 + 시트",
    produces: "move-board",
  },
};

const DEFAULT_ORDER: StageKind[] = [
  "card-art",
  "card-effect",
  "field-summon",
  "move-board",
];

type StageResult = {
  kind: StageKind;
  status: "idle" | "running" | "ok" | "error" | "skipped";
  publicPath?: string;
  error?: string;
};

/** 파이프라인 단계 결과 다운로드 파일명 — "C107_정화_card-art.png" 포맷. */
function buildStageDownloadName(
  kind: StageKind,
  card: CardRow | undefined,
  publicPath: string,
): string {
  // publicPath 에서 확장자만 추출 (예: "/generated/card/C107.png?t=123" → ".png")
  const clean = publicPath.split("?")[0];
  const ext = clean.includes(".") ? clean.substring(clean.lastIndexOf(".")) : ".png";
  if (!card) return `${kind}${ext}`;
  const safeName = card.name_kr
    .replace(/[\\/:*?"<>|]/g, "")
    .replace(/\s+/g, "_")
    .trim();
  return `${card.id}_${safeName}_${kind}${ext}`;
}

export default function PipelinePage() {
  const [cards, setCards] = useState<CardRow[]>([]);
  const [cardId, setCardId] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedStages, setSelectedStages] = useState<Record<StageKind, boolean>>({
    "card-art": true,
    "card-effect": true,
    "field-summon": true,
    "move-board": false,
  });
  const [order] = useState<StageKind[]>(DEFAULT_ORDER);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<StageResult[]>([]);

  useEffect(() => {
    fetch("/api/cards")
      .then((r) => r.json())
      .then((d) => setCards(d.cards ?? []))
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return cards.slice(0, 80);
    return cards
      .filter(
        (c) =>
          c.id.toLowerCase().includes(q) ||
          c.name_kr.toLowerCase().includes(q) ||
          c.sub_type.toLowerCase().includes(q)
      )
      .slice(0, 80);
  }, [cards, filter]);

  const selectedCard = cards.find((c) => c.id === cardId);
  const activeStages = order.filter((k) => selectedStages[k]);

  function toggleStage(k: StageKind) {
    setSelectedStages((prev) => ({ ...prev, [k]: !prev[k] }));
  }

  async function runStage(
    kind: StageKind,
    card: CardRow,
    prior: StageResult[]
  ): Promise<StageResult> {
    const produced = (k: StageKind) =>
      prior.find((p) => p.kind === k && p.status === "ok");

    try {
      if (kind === "card-art") {
        const r = await fetch("/api/generate-card", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cardId: card.id }),
        });
        const d = await r.json();
        if (!r.ok || d.error) throw new Error(d.error ?? `HTTP ${r.status}`);
        return { kind, status: "ok", publicPath: d.publicPath };
      }

      if (kind === "card-effect") {
        if (card.card_type === "SUMMON") {
          return {
            kind,
            status: "skipped",
            error: `${card.id}는 SUMMON 카드라 card-effect 대상이 아님 (공룡 자체가 결과)`,
          };
        }
        const refs = produced("card-art")
          ? [{ category: "card", id: card.id }]
          : [];
        const r = await fetch("/api/generate-card-effect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cardId: card.id, refs }),
        });
        const d = await r.json();
        if (!r.ok || d.error) throw new Error(d.error ?? `HTTP ${r.status}`);
        return { kind, status: "ok", publicPath: d.publicPath };
      }

      if (kind === "field-summon") {
        if (card.card_type !== "SUMMON") {
          return {
            kind,
            status: "skipped",
            error: `${card.id}는 SUMMON 카드가 아니라 스킵됨`,
          };
        }
        const refs = produced("card-art")
          ? [{ category: "card", id: card.id }]
          : [];
        const r = await fetch("/api/generate-field-summon", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cardId: card.id, refs }),
        });
        const d = await r.json();
        if (!r.ok || d.error) throw new Error(d.error ?? `HTTP ${r.status}`);
        return { kind, status: "ok", publicPath: d.publicPath };
      }

      if (kind === "move-board") {
        if (!produced("field-summon")) {
          return {
            kind,
            status: "skipped",
            error: "field-summon 결과가 없어 스킵됨 (move-board는 참조 이미지 필요)",
          };
        }
        const r = await fetch("/api/generate-move-board", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            refId: card.id,
            refSource: "field-summon",
            motion: "attack",
            frameCount: 4,
          }),
        });
        const d = await r.json();
        if (!r.ok || d.error) throw new Error(d.error ?? `HTTP ${r.status}`);
        return { kind, status: "ok", publicPath: d.publicSheetPath };
      }

      return { kind, status: "error", error: `unknown stage ${kind}` };
    } catch (e) {
      return { kind, status: "error", error: e instanceof Error ? e.message : String(e) };
    }
  }

  async function runPipeline() {
    if (!selectedCard || activeStages.length === 0) return;
    setRunning(true);
    const initial: StageResult[] = activeStages.map((k) => ({ kind: k, status: "idle" }));
    setResults(initial);

    const accumulator: StageResult[] = [];
    for (let i = 0; i < activeStages.length; i++) {
      const kind = activeStages[i];
      setResults((prev) => {
        const next = [...prev];
        next[i] = { ...next[i], status: "running" };
        return next;
      });

      const r = await runStage(kind, selectedCard, accumulator);
      accumulator.push(r);
      setResults((prev) => {
        const next = [...prev];
        next[i] = r;
        return next;
      });

      if (r.status === "error") break;
    }
    setRunning(false);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-6 flex items-center gap-4">
          <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-100">
            ← Hub
          </Link>
          <h1 className="text-2xl font-bold">파이프라인</h1>
          <span className="text-xs text-zinc-500">
            카드 한 장을 고르고 단계를 체크하면, 앞 단계 결과 이미지를 다음 단계에 참조로 넘김
          </span>
        </header>

        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-4 space-y-4">
            <div>
              <label className="text-sm font-medium text-zinc-300 block mb-2">
                시드 카드 선택
              </label>
              <input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="검색"
                className="w-full mb-2 px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-sm"
              />
              <div className="max-h-[50vh] overflow-y-auto space-y-1 pr-1">
                {filtered.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCardId(c.id)}
                    className={`w-full text-left px-3 py-2 rounded text-sm border transition ${
                      cardId === c.id
                        ? "bg-indigo-950 border-indigo-600"
                        : "bg-zinc-900 border-zinc-800 hover:border-zinc-600"
                    }`}
                  >
                    <code className="text-xs text-zinc-500 mr-2">{c.id}</code>
                    {c.name_kr}
                    <span className="text-xs text-zinc-500 ml-2">
                      {c.card_type}/{c.sub_type}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-300 block mb-2">
                실행할 단계 (위→아래 순서)
              </label>
              <div className="space-y-2">
                {order.map((k) => {
                  const meta = STAGE_META[k];
                  const checked = selectedStages[k];
                  return (
                    <label
                      key={k}
                      className={`flex items-start gap-3 p-3 rounded border cursor-pointer ${
                        checked
                          ? "bg-zinc-900 border-zinc-700"
                          : "bg-zinc-950 border-zinc-800 opacity-60"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleStage(k)}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{meta.label}</div>
                        <div className="text-xs text-zinc-500 mb-1.5">{meta.desc}</div>
                        {checked && <StyleRefsBanner agent={k} entityId={cardId || undefined} />}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <button
              onClick={runPipeline}
              disabled={running || !selectedCard || activeStages.length === 0}
              className="w-full px-5 py-3 rounded bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 disabled:cursor-not-allowed font-medium"
            >
              {running
                ? "실행 중…"
                : selectedCard
                  ? `${selectedCard.name_kr} 로 ${activeStages.length}단계 실행`
                  : "카드를 먼저 선택하세요"}
            </button>
          </aside>

          <section className="col-span-8">
            {results.length === 0 ? (
              <div className="rounded-lg border border-dashed border-zinc-800 p-16 text-center text-zinc-500">
                좌측에서 카드와 단계를 고른 뒤 실행하면 여기에 각 단계 결과가 순서대로 표시돼요.
              </div>
            ) : (
              <ol className="space-y-4">
                {results.map((r, idx) => {
                  const meta = STAGE_META[r.kind];
                  return (
                    <li
                      key={r.kind}
                      className="rounded-lg border border-zinc-800 bg-zinc-900 p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold">
                          <span className="text-zinc-500 mr-2">Step {idx + 1}.</span>
                          {meta.label}
                        </div>
                        <StatusBadge status={r.status} />
                      </div>
                      {r.status === "running" && (
                        <div className="text-xs text-zinc-500">Gemini 호출 중… (보통 15–30초)</div>
                      )}
                      {r.status === "error" && (
                        <div className="text-sm text-red-300">{r.error}</div>
                      )}
                      {r.status === "skipped" && (
                        <div className="text-sm text-amber-300">{r.error}</div>
                      )}
                      {r.status === "ok" && r.publicPath && (
                        <>
                          <div className="flex justify-end mb-2">
                            <a
                              href={r.publicPath}
                              download={buildStageDownloadName(r.kind, selectedCard, r.publicPath)}
                              className="px-3 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-xs text-white font-medium inline-flex items-center gap-1.5 transition"
                            >
                              ⬇ 다운로드
                              <span className="text-[9px] text-emerald-200/80 font-mono">
                                {buildStageDownloadName(r.kind, selectedCard, r.publicPath)}
                              </span>
                            </a>
                          </div>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={r.publicPath}
                            alt={r.kind}
                            className="rounded border border-zinc-700 max-h-[50vh] bg-[repeating-conic-gradient(#27272a_0%_25%,#3f3f46_0%_50%)] bg-[length:16px_16px]"
                          />
                        </>
                      )}
                    </li>
                  );
                })}
              </ol>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: StageResult["status"] }) {
  const styles: Record<StageResult["status"], string> = {
    idle: "bg-zinc-800 text-zinc-400",
    running: "bg-indigo-900 text-indigo-200 animate-pulse",
    ok: "bg-emerald-950 text-emerald-300 border border-emerald-800",
    error: "bg-red-950 text-red-300 border border-red-800",
    skipped: "bg-amber-950 text-amber-300 border border-amber-800",
  };
  const labels: Record<StageResult["status"], string> = {
    idle: "대기",
    running: "실행 중",
    ok: "완료",
    error: "실패",
    skipped: "스킵",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
