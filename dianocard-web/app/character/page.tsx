"use client";

import EntityGenerator, { EntityItem } from "../_components/EntityGenerator";

type CharacterRow = {
  id: string;
  name_kr: string;
  name_en: string;
  description: string;
  passive_name: string;
};

export default function CharacterPage() {
  return (
    <EntityGenerator
      title="플레이어 캐릭터 생성기"
      agentName="character"
      fetchListUrl="/api/characters"
      listAccessor={(d) =>
        ((d as { characters: CharacterRow[] }).characters ?? []).map<EntityItem>((c) => ({
          id: c.id,
          primary: c.name_kr,
          secondary: c.passive_name ? `${c.passive_name} — ${c.description.slice(0, 40)}` : c.description.slice(0, 60),
          tag: c.name_en,
          raw: c as unknown as Record<string, string>,
        }))
      }
      fetchPromptUrl={(id) =>
        `/api/generate-character?characterId=${encodeURIComponent(id)}`
      }
      postGenerateUrl="/api/generate-character"
      postBody={(id, promptOverride) => ({ characterId: id, promptOverride })}
    />
  );
}
