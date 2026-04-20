import fs from "node:fs/promises";
import path from "node:path";
import Papa from "papaparse";

export type CardRow = {
  id: string;
  name_kr: string;
  name_en: string;
  card_type: string;
  sub_type: string;
  rarity: string;
  cost: string;
  attack: string;
  hp: string;
  value: string;
  target: string;
  description: string;
  image: string;
  chapter: string;
};

/**
 * 새 스키마 — 2026-04 이후 Unity Resources/Tables/enemy.csv 구조.
 * - ai_pattern 컬럼 제거됨. 대신 pattern_set_id / phase_set_id (enemy_pattern·enemy_phase.csv 참조).
 * - passive_ids 추가 — "|" 구분자 (enemy_passive.csv 참조).
 */
export type EnemyRow = {
  id: string;
  name_kr: string;
  name_en: string;
  enemy_type: string;
  chapter: string;
  hp: string;
  attack: string;
  defense: string;
  pattern_set_id: string;
  phase_set_id: string;
  gold_min: string;
  gold_max: string;
  description: string;
  image: string;
  passive_ids: string;
};

export type PassiveRow = {
  id: string;
  name_kr: string;
  name_en: string;
  description: string;
  icon: string;
};

export type CharacterRow = {
  id: string;
  name_kr: string;
  name_en: string;
  max_hp: string;
  start_gold: string;
  description: string;
  passive_name: string;
  passive_description: string;
  card_portrait: string;
  field_portrait: string;
  unlocked: string;
};

/**
 * 실제 런타임 CSV는 Unity 프로젝트의 Resources/Tables/에 있음.
 * 과거엔 `DianoCardPlan/Table/` 카피본을 읽었지만, 그 쪽은 동기화 안 돼서 오래된 스냅샷이었음.
 * 이제 단일 source-of-truth로 Unity 측 CSV를 직접 읽는다.
 *
 * 경로 해석 (web cwd = DianoCardPlan/dianocard-web):
 *   ../..            → 프로젝트 루트 (DianoCard/)
 *   /DianoCard/.../Tables  → Unity 리소스 경로
 */
const TABLE_DIR = path.join(
  process.cwd(),
  "..",
  "..",
  "DianoCard",
  "DianoCard",
  "Assets",
  "Resources",
  "Tables",
);

async function readCsv<T>(file: string): Promise<T[]> {
  const raw = await fs.readFile(path.join(TABLE_DIR, file), "utf8");
  const parsed = Papa.parse<T>(raw, { header: true, skipEmptyLines: true });
  return parsed.data.filter((r) => (r as unknown as { id?: string }).id);
}

export async function readCards(): Promise<CardRow[]> {
  return readCsv<CardRow>("card.csv");
}

export async function readCardById(id: string): Promise<CardRow | null> {
  const cards = await readCards();
  return cards.find((c) => c.id === id) ?? null;
}

export async function readEnemies(): Promise<EnemyRow[]> {
  return readCsv<EnemyRow>("enemy.csv");
}

export async function readEnemyById(id: string): Promise<EnemyRow | null> {
  const enemies = await readEnemies();
  return enemies.find((e) => e.id === id) ?? null;
}

export async function readPassives(): Promise<PassiveRow[]> {
  return readCsv<PassiveRow>("enemy_passive.csv");
}

export async function readPassiveById(id: string): Promise<PassiveRow | null> {
  const passives = await readPassives();
  return passives.find((p) => p.id === id) ?? null;
}

export async function readCharacters(): Promise<CharacterRow[]> {
  return readCsv<CharacterRow>("character.csv");
}

export async function readCharacterById(id: string): Promise<CharacterRow | null> {
  const chars = await readCharacters();
  return chars.find((c) => c.id === id) ?? null;
}
