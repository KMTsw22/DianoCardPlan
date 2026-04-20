import {
  styleRefsInfo,
  entityRefsInfo,
  ensureEntityRefDir,
} from "@/lib/style-refs";
import { autoRefsFor } from "@/lib/auto-refs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/style-refs?agent=card-art              → agent 공용 레퍼런스 정보
 * GET /api/style-refs?agent=card-art&entityId=C001 → 카드 전용 레퍼런스 정보(폴더 포함, 없으면 0개)
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const agent = url.searchParams.get("agent");
  const entityId = url.searchParams.get("entityId");
  if (!agent) return Response.json({ error: "agent required" }, { status: 400 });

  const agentInfo = await styleRefsInfo(agent);
  if (entityId) {
    const entityInfo = await entityRefsInfo(agent, entityId);
    // 엔티티 폴더가 비면 auto-ref 후보도 체크
    const auto = entityInfo.count === 0
      ? await autoRefsFor(agent, entityId)
      : { neighbors: [], refs: [], neighborIds: [] };
    const effective =
      entityInfo.count > 0
        ? "entity"
        : auto.refs.length > 0
          ? "auto"
          : "agent";
    return Response.json({
      agent,
      entityId,
      effective,
      entity: entityInfo,
      agentScope: agentInfo,
      auto: {
        count: auto.refs.length,
        neighborIds: auto.neighborIds,
        neighbors: auto.neighbors, // { id, file, kind } 배열 — UI 썸네일용
      },
    });
  }
  return Response.json({ agent, ...agentInfo });
}

/**
 * POST /api/style-refs
 *   body: { agent, entityId }
 * 엔티티별 레퍼런스 폴더를 생성(없으면)하고 경로를 반환. 사용자가 폴더를 찾아 파일을 드롭할 수 있게 함.
 */
export async function POST(request: Request) {
  try {
    const { agent, entityId } = (await request.json()) as {
      agent: string;
      entityId: string;
    };
    if (!agent || !entityId) {
      return Response.json({ error: "agent and entityId required" }, { status: 400 });
    }
    const dir = await ensureEntityRefDir(agent, entityId);
    const info = await entityRefsInfo(agent, entityId);
    return Response.json({ ok: true, agent, entityId, dir, ...info });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ error: message }, { status: 500 });
  }
}
