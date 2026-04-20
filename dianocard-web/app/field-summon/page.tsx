"use client";

import EntityGenerator, { EntityItem } from "../_components/EntityGenerator";

type CardRow = {
  id: string;
  name_kr: string;
  card_type: string;
  sub_type: string;
  rarity: string;
};

export default function FieldSummonPage() {
  return (
    <EntityGenerator
      title="맵 소환수 생성기"
      agentName="field-summon"
      fetchListUrl="/api/cards"
      listAccessor={(d) =>
        ((d as { cards: CardRow[] }).cards ?? [])
          .filter((c) => c.card_type === "SUMMON")
          .map<EntityItem>((c) => ({
            id: c.id,
            primary: c.name_kr,
            secondary: c.sub_type,
            tag: c.rarity,
            raw: c as unknown as Record<string, string>,
          }))
      }
      fetchPromptUrl={(id) =>
        `/api/generate-field-summon?cardId=${encodeURIComponent(id)}`
      }
      postGenerateUrl="/api/generate-field-summon"
      postBody={(id, promptOverride) => ({ cardId: id, promptOverride })}
    />
  );
}
