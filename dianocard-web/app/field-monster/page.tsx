"use client";

import EntityGenerator, { EntityItem } from "../_components/EntityGenerator";
import RandomMonsterPanel from "../_components/RandomMonsterPanel";

type EnemyRow = {
  id: string;
  name_kr: string;
  enemy_type: string;
  chapter: string;
  pattern_set_id: string;
  phase_set_id: string;
  passive_ids: string;
};

export default function FieldMonsterPage() {
  return (
    <EntityGenerator
      title="맵 몬스터 생성기"
      agentName="field-monster"
      fetchListUrl="/api/enemies"
      listAccessor={(d) =>
        ((d as { enemies: EnemyRow[] }).enemies ?? []).map<EntityItem>((e) => {
          const passives = (e.passive_ids ?? "").split("|").filter(Boolean).join(", ");
          const aiLabel = passives ? `${e.pattern_set_id} · ${passives}` : e.pattern_set_id;
          return {
            id: e.id,
            primary: e.name_kr,
            secondary: `Ch${e.chapter} · ${aiLabel}`,
            tag: e.enemy_type,
            raw: e as unknown as Record<string, string>,
          };
        })
      }
      fetchPromptUrl={(id) =>
        `/api/generate-field-monster?enemyId=${encodeURIComponent(id)}`
      }
      postGenerateUrl="/api/generate-field-monster"
      postBody={(id, promptOverride) => ({ enemyId: id, promptOverride })}
      topPanel={<RandomMonsterPanel />}
    />
  );
}
