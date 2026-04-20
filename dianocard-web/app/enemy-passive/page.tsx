"use client";

import EntityGenerator, { EntityItem } from "../_components/EntityGenerator";

type PassiveRow = {
  id: string;
  name_kr: string;
  name_en: string;
  description: string;
};

export default function EnemyPassivePage() {
  return (
    <EntityGenerator
      title="몬스터 패시브 아이콘 생성기"
      agentName="enemy-passive"
      fetchListUrl="/api/passives"
      listAccessor={(d) =>
        ((d as { passives: PassiveRow[] }).passives ?? []).map<EntityItem>((p) => ({
          id: p.id,
          primary: p.name_kr,
          secondary: p.description,
          tag: p.name_en,
          raw: p as unknown as Record<string, string>,
        }))
      }
      fetchPromptUrl={(id) =>
        `/api/generate-enemy-passive?passiveId=${encodeURIComponent(id)}`
      }
      postGenerateUrl="/api/generate-enemy-passive"
      postBody={(id, promptOverride) => ({ passiveId: id, promptOverride })}
    />
  );
}
