import { loadAgentByName } from "@/lib/agent-loader";
import { generateAndSave } from "@/lib/generate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 랜덤 맵 몬스터 생성 — CSV enemy 엔트리 없이 배경 맵 분위기에 맞춰 새 몬스터를 즉석 발명.
 * 결과는 `public/generated/field-monster/RAND_<timestamp>.png` 로 저장.
 * UI에서 "🎲 랜덤 생성" 버튼으로 호출.
 */

type RandomBody = {
  enemy_type?: "NORMAL" | "ELITE" | "BOSS";
  chapter?: string; // "1" ~ "4". 기본 "1" (현재 env refs가 Ch1만 커버)
  /** 자유 텍스트 힌트 — 비워두면 Gemini가 완전 자유 창작. */
  hint?: string;
};

const FREEFORM_DESCRIPTION = (enemyType: string, chapter: string, hint: string) =>
  [
    "**랜덤 창작 모드** — 기존 enemy.csv에 없는 새 몬스터 1종을 발명하라.",
    "",
    "제약:",
    `- 챕터 ${chapter}, enemy_type=${enemyType} 규격을 준수.`,
    "- 첨부된 환경 레퍼런스(맵) 와 자연스럽게 어울리는 팔레트·질감·밀도.",
    "- 공룡·파충류·양서류·대형 포유류 등 **실제 동물계에서 원형** 하나를 먼저 고르고 그 위에 디자인.",
    "- 이름·실루엣·색 배합·디테일 모두 새로 정할 것 (기존 enemy들과 겹치지 말 것).",
    "- 크툴루 힌트는 농도 규칙대로 — 대부분의 경우 0개. 기본은 '멋지게 위협적인 평범한 동물'.",
    hint ? `\n추가 힌트: ${hint}` : "",
  ]
    .filter(Boolean)
    .join("\n");

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as RandomBody;
    const enemy_type = body.enemy_type ?? "NORMAL";
    const chapter = body.chapter ?? "1";
    const hint = body.hint?.trim() ?? "";

    if (!["NORMAL", "ELITE", "BOSS"].includes(enemy_type)) {
      return Response.json({ error: "invalid enemy_type" }, { status: 400 });
    }

    const id = `RAND_${Date.now()}`;

    const values: Record<string, string> = {
      id,
      name_kr: "",
      name_en: "",
      enemy_type,
      chapter,
      pattern_set_id: "",
      phase_set_id: "",
      passive_ids: "",
      description: FREEFORM_DESCRIPTION(enemy_type, chapter, hint),
    };

    const agent = await loadAgentByName("field-monster");
    const result = await generateAndSave({
      agent,
      values,
      entityId: id, // 전용 레퍼런스 폴더는 없음 → agent 공용 ref 로 폴백됨
      transparentBackground: true,
    });

    return Response.json({ ok: true, id, enemy_type, chapter, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[generate-field-monster-random]", err);
    return Response.json({ error: message }, { status: 500 });
  }
}
