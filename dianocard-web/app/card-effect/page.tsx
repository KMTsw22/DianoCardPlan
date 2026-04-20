"use client";

import EntityGenerator, { EntityItem } from "../_components/EntityGenerator";

type CardRow = {
  id: string;
  name_kr: string;
  card_type: string;
  sub_type: string;
  rarity: string;
};

export default function CardEffectPage() {
  return (
    <EntityGenerator
      title="카드 사용 이펙트 생성기"
      agentName="card-effect"
      fetchListUrl="/api/cards"
      listAccessor={(d) =>
        ((d as { cards: CardRow[] }).cards ?? [])
          .filter((c) => c.card_type !== "SUMMON")
          .map<EntityItem>((c) => ({
            id: c.id,
            primary: c.name_kr,
            secondary: `${c.card_type} / ${c.sub_type}`,
            tag: c.rarity,
            raw: c as unknown as Record<string, string>,
          }))
      }
      fetchPromptUrl={(id) =>
        `/api/generate-card-effect?cardId=${encodeURIComponent(id)}`
      }
      postGenerateUrl="/api/generate-card-effect"
      postBody={(id, promptOverride) => ({ cardId: id, promptOverride })}
    />
  );
}
