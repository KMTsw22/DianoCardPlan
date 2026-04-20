"use client";

import EntityGenerator, { EntityItem } from "../_components/EntityGenerator";

type CardRow = {
  id: string;
  name_kr: string;
  name_en: string;
  card_type: string;
  sub_type: string;
  rarity: string;
};

export default function CardArtPage() {
  return (
    <EntityGenerator
      title="카드 아트 생성기"
      agentName="card-art"
      fetchListUrl="/api/cards"
      listAccessor={(d) =>
        ((d as { cards: CardRow[] }).cards ?? []).map<EntityItem>((c) => ({
          id: c.id,
          primary: c.name_kr,
          secondary: `${c.card_type} / ${c.sub_type}`,
          tag: c.rarity,
          raw: c as unknown as Record<string, string>,
        }))
      }
      fetchPromptUrl={(id) => `/api/generate-card?cardId=${encodeURIComponent(id)}`}
      postGenerateUrl="/api/generate-card"
      postBody={(id, promptOverride) => ({ cardId: id, promptOverride })}
    />
  );
}
