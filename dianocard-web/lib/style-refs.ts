import fs from "node:fs/promises";
import path from "node:path";
import { RefImage } from "./gemini";
import { autoRefsFor } from "./auto-refs";

const IMG_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

const MIME_BY_EXT: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

export function agentRefDir(agentName: string): string {
  return path.join(process.cwd(), "references", agentName);
}

/**
 * 엔티티별(카드·적·패시브 ID별) 전용 레퍼런스 폴더.
 * 예: references/card-art/C001/ → C001 카드 전용 레퍼런스 이미지.
 * 있으면 우선, 없으면 agent 공용(agentRefDir)만 사용됨.
 */
export function entityRefDir(agentName: string, entityId: string): string {
  return path.join(agentRefDir(agentName), entityId);
}

/**
 * 환경(맵) 레퍼런스 폴더. `references/{agent}/_env/`.
 * 여기 이미지는 스타일/엔티티 ref와 별개로 **항상** 생성 프롬프트에 첨부된다 —
 * 화풍이 아니라 "이 캐릭터가 설 배경 맵"을 알려주는 용도.
 * 언더스코어 prefix라 entityId 폴더(E001 등)와 충돌 없음.
 */
export function envRefDir(agentName: string): string {
  return path.join(agentRefDir(agentName), "_env");
}

async function listImageFiles(dir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((f) => IMG_EXT.has(path.extname(f).toLowerCase()))
      .filter((f) => !f.startsWith("."))
      .sort();
  } catch {
    return [];
  }
}

async function loadRefsFromDir(dir: string): Promise<RefImage[]> {
  const files = await listImageFiles(dir);
  return Promise.all(
    files.map(async (name) => {
      const ext = path.extname(name).toLowerCase();
      const buf = await fs.readFile(path.join(dir, name));
      return {
        base64: buf.toString("base64"),
        mimeType: MIME_BY_EXT[ext] ?? "image/png",
      };
    })
  );
}

// =========================================================
// Agent-wide refs (모든 엔티티 공용)
// =========================================================

export async function listStyleRefFiles(agentName: string): Promise<string[]> {
  return listImageFiles(agentRefDir(agentName));
}

export async function loadStyleRefs(agentName: string): Promise<RefImage[]> {
  return loadRefsFromDir(agentRefDir(agentName));
}

export async function styleRefsInfo(agentName: string) {
  const files = await listStyleRefFiles(agentName);
  return { count: files.length, files, dir: agentRefDir(agentName) };
}

// =========================================================
// Per-entity refs (특정 카드/적/패시브 전용)
// =========================================================

export async function listEntityRefFiles(
  agentName: string,
  entityId: string,
): Promise<string[]> {
  return listImageFiles(entityRefDir(agentName, entityId));
}

export async function loadEntityRefs(
  agentName: string,
  entityId: string,
): Promise<RefImage[]> {
  return loadRefsFromDir(entityRefDir(agentName, entityId));
}

export async function entityRefsInfo(agentName: string, entityId: string) {
  const dir = entityRefDir(agentName, entityId);
  const files = await listEntityRefFiles(agentName, entityId);
  return { count: files.length, files, dir };
}

/**
 * 엔티티 레퍼런스 폴더가 없으면 만든다. (UI에서 "폴더 열기" 전 호출해서 경로를 보장.)
 */
export async function ensureEntityRefDir(
  agentName: string,
  entityId: string,
): Promise<string> {
  const dir = entityRefDir(agentName, entityId);
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

/**
 * 생성 시 최종 사용할 레퍼런스 로딩 규칙 (우선순위):
 * 1) `references/{agent}/{id}/`  — 엔티티 전용 폴더에 이미지가 있으면 그것만 사용 (사용자 명시)
 * 2) auto-refs                   — sub_type/enemy_type 기반 이웃 카드/적 아트를 자동 앵커로 첨부
 * 3) `references/{agent}/`       — agent 공용 폴더 폴백
 */
export async function resolveStyleRefs(
  agentName: string,
  entityId?: string,
): Promise<RefImage[]> {
  if (entityId) {
    const entityRefs = await loadEntityRefs(agentName, entityId);
    if (entityRefs.length > 0) return entityRefs;

    const { refs: autoRefs } = await autoRefsFor(agentName, entityId);
    if (autoRefs.length > 0) return autoRefs;
  }
  return loadStyleRefs(agentName);
}

// =========================================================
// Environment refs (배경 맵 — 모든 엔티티에 항상 첨부)
// =========================================================

export async function listEnvRefFiles(agentName: string): Promise<string[]> {
  return listImageFiles(envRefDir(agentName));
}

export async function loadEnvRefs(agentName: string): Promise<RefImage[]> {
  return loadRefsFromDir(envRefDir(agentName));
}

export async function envRefsInfo(agentName: string) {
  const files = await listEnvRefFiles(agentName);
  return { count: files.length, files, dir: envRefDir(agentName) };
}

/** UI용: 어느 소스가 실제 사용될지 + 자동 선택된 이웃 ID 목록을 계산해 리턴. */
export async function describeEffectiveRefs(
  agentName: string,
  entityId?: string,
) {
  if (entityId) {
    const entityFiles = await listEntityRefFiles(agentName, entityId);
    if (entityFiles.length > 0) {
      return {
        source: "entity" as const,
        entityCount: entityFiles.length,
        autoNeighborIds: [] as string[],
        autoCount: 0,
      };
    }
    const { neighborIds, refs } = await autoRefsFor(agentName, entityId);
    if (refs.length > 0) {
      return {
        source: "auto" as const,
        entityCount: 0,
        autoNeighborIds: neighborIds,
        autoCount: refs.length,
      };
    }
  }
  const agentFiles = await listStyleRefFiles(agentName);
  return {
    source: "agent" as const,
    entityCount: 0,
    autoNeighborIds: [] as string[],
    autoCount: 0,
    agentCount: agentFiles.length,
  };
}
