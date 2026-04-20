"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ScopeInfo = { count: number; files: string[]; dir?: string };
type AutoNeighbor = { id: string; file: string; kind: "card" | "enemy" };
type AutoInfo = { count: number; neighborIds: string[]; neighbors: AutoNeighbor[] };
type EntityResponse = {
  agent: string;
  entityId: string;
  effective: "entity" | "auto" | "agent";
  entity: ScopeInfo;
  agentScope: ScopeInfo;
  auto: AutoInfo;
};

/** 이웃의 kind에 따라 썸네일이 저장된 폴더의 agent 이름 결정. */
function neighborThumbUrl(n: AutoNeighbor): string {
  const agentForFile = n.kind === "enemy" ? "field-monster" : "card-art";
  return `/api/style-refs/file?agent=${encodeURIComponent(agentForFile)}&entityId=${encodeURIComponent(n.id)}&file=${encodeURIComponent(n.file)}`;
}

type Props = {
  agent: string;
  /**
   * 엔티티 ID (카드·적·패시브). 지정되면 그 엔티티 전용 폴더(`references/{agent}/{id}/`)를
   * 우선 표시하고 업로드 대상도 이 폴더로 간다. 미지정 시 agent 공용 폴더.
   */
  entityId?: string;
};

export default function StyleRefsBanner({ agent, entityId }: Props) {
  const [entity, setEntity] = useState<ScopeInfo | null>(null);
  const [agentScope, setAgentScope] = useState<ScopeInfo | null>(null);
  const [effective, setEffective] = useState<"entity" | "auto" | "agent" | null>(null);
  const [auto, setAuto] = useState<AutoInfo | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const reload = useCallback(() => {
    setError(null);
    if (entityId) {
      fetch(
        `/api/style-refs?agent=${encodeURIComponent(agent)}&entityId=${encodeURIComponent(entityId)}`,
      )
        .then((r) => r.json())
        .then((d: EntityResponse) => {
          setEntity(d.entity);
          setAgentScope(d.agentScope);
          setEffective(d.effective);
          setAuto(d.auto);
        })
        .catch(() => {});
    } else {
      fetch(`/api/style-refs?agent=${encodeURIComponent(agent)}`)
        .then((r) => r.json())
        .then((d: { count: number; files: string[]; dir?: string }) => {
          setAgentScope({ count: d.count, files: d.files, dir: d.dir });
          setEntity(null);
          setEffective(null);
        })
        .catch(() => {});
    }
  }, [agent, entityId]);

  useEffect(() => {
    reload();
  }, [reload]);

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      setUploading(true);
      setError(null);
      try {
        for (const f of Array.from(files)) {
          const fd = new FormData();
          fd.append("agent", agent);
          if (entityId) fd.append("entityId", entityId);
          fd.append("file", f);
          const r = await fetch("/api/style-refs/file", { method: "POST", body: fd });
          const d = await r.json();
          if (!r.ok || d.error) throw new Error(d.error ?? `HTTP ${r.status}`);
        }
        reload();
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setUploading(false);
      }
    },
    [agent, entityId, reload],
  );

  const deleteFile = useCallback(
    async (file: string, scope: "entity" | "agent") => {
      setError(null);
      const params = new URLSearchParams({ agent, file });
      if (scope === "entity" && entityId) params.set("entityId", entityId);
      try {
        const r = await fetch(`/api/style-refs/file?${params}`, { method: "DELETE" });
        const d = await r.json();
        if (!r.ok || d.error) throw new Error(d.error ?? `HTTP ${r.status}`);
        reload();
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    },
    [agent, entityId, reload],
  );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer?.files?.length) uploadFiles(e.dataTransfer.files);
  };

  // 엔티티 모드 — 전용 폴더 영역 + agent 공용 영역 동시 표시
  if (entityId) {
    const usingEntity = effective === "entity";
    return (
      <div className="space-y-2">
        {/* 엔티티 전용 */}
        <div
          ref={dropRef}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`p-3 rounded border ${
            usingEntity
              ? "border-indigo-700 bg-indigo-950/40"
              : effective === "auto"
                ? "border-amber-700 bg-amber-950/30"
                : "border-dashed border-zinc-700 bg-zinc-900/40"
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="text-xs">
              <span className={usingEntity ? "text-indigo-300 font-semibold" : "text-zinc-400"}>
                {entityId} 전용 레퍼런스 {entity?.count ?? 0}장{" "}
              </span>
              {usingEntity ? (
                <span className="text-indigo-400">(이 생성에 적용됨)</span>
              ) : effective === "auto" && auto && auto.count > 0 ? (
                <span className="text-amber-300">
                  (비어있음 — 🤖 자동 선택 {auto.count}장 사용 중, 아래 썸네일 참고)
                </span>
              ) : (
                <span className="text-zinc-500">(없으면 agent 공용 폴백)</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="text-[11px] px-2 py-0.5 rounded bg-indigo-700 hover:bg-indigo-600 disabled:bg-zinc-700"
              >
                {uploading ? "업로드 중…" : "파일 추가"}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => e.target.files && uploadFiles(e.target.files)}
              />
            </div>
          </div>
          {entity && entity.count > 0 ? (
            <div className="flex gap-2 overflow-x-auto">
              {entity.files.map((f) => (
                <div key={f} className="relative flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/api/style-refs/file?agent=${encodeURIComponent(agent)}&entityId=${encodeURIComponent(
                      entityId,
                    )}&file=${encodeURIComponent(f)}`}
                    alt={f}
                    title={f}
                    className="w-14 h-14 rounded border border-indigo-800 object-cover bg-zinc-950"
                  />
                  <button
                    type="button"
                    onClick={() => deleteFile(f, "entity")}
                    title="삭제"
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-700 hover:bg-red-600 text-white text-[10px] leading-none"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : effective === "auto" && auto && auto.neighbors.length > 0 ? (
            <div>
              <div className="flex gap-2 overflow-x-auto mb-1">
                {auto.neighbors.map((n) => (
                  <div key={n.id} className="flex-shrink-0 text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={neighborThumbUrl(n)}
                      alt={n.id}
                      title={`${n.id} — ${n.file}`}
                      className="w-14 h-14 rounded border border-amber-700 object-cover bg-zinc-950"
                    />
                    <div className="text-[9px] text-amber-400 mt-0.5">{n.id}</div>
                  </div>
                ))}
              </div>
              <div className="text-[11px] text-zinc-500">
                🤖 이웃 에셋 {auto.neighbors.length}장이 자동으로 스타일 앵커로 붙었음. 원하지 않으면
                위 "파일 추가"로 전용 이미지를 올리면 자동 선택은 꺼짐.
              </div>
            </div>
          ) : (
            <div className="text-[11px] text-zinc-500">
              드래그&드롭 또는 "파일 추가" 버튼으로 이미지 넣어두면 이 엔티티 생성에 우선 사용됨.
              <br />
              폴더: <code className="text-zinc-400">references/{agent}/{entityId}/</code>
            </div>
          )}
          {error && <div className="mt-2 text-[11px] text-red-300">{error}</div>}
        </div>

        {/* agent 공용 요약 (접어두기) */}
        <div className="text-[11px] text-zinc-500">
          agent 공용 레퍼런스 {agentScope?.count ?? 0}장{" "}
          <span className="text-zinc-600">
            (<code>references/{agent}/</code>)
          </span>
          <span className="text-zinc-600 ml-1">
            — 우선순위: 엔티티 폴더 ▸ 자동 선택 ▸ 공용
          </span>
        </div>
      </div>
    );
  }

  // agent-전용 모드 — 기존 UX 유지
  if (!agentScope) return null;

  if (agentScope.count === 0) {
    return (
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="p-3 rounded border border-dashed border-zinc-700 bg-zinc-900/40 text-xs text-zinc-500"
      >
        스타일 레퍼런스 없음. <code className="text-zinc-400">references/{agent}/</code> 에
        PNG/JPG를 드롭(이 박스에 끌어놔도 됨)하면 다음 생성부터 자동 첨부돼요.
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="p-3 rounded border border-emerald-900 bg-emerald-950/40"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-emerald-300 font-medium">
          스타일 레퍼런스 {agentScope.count}장 자동 첨부 중
        </div>
        <code className="text-[10px] text-emerald-700">references/{agent}/</code>
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {agentScope.files.map((f) => (
          <div key={f} className="relative flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/api/style-refs/file?agent=${encodeURIComponent(
                agent,
              )}&file=${encodeURIComponent(f)}`}
              alt={f}
              title={f}
              className="w-14 h-14 rounded border border-emerald-800 object-cover bg-zinc-950"
            />
            <button
              type="button"
              onClick={() => deleteFile(f, "agent")}
              title="삭제"
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-700 hover:bg-red-600 text-white text-[10px] leading-none"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
