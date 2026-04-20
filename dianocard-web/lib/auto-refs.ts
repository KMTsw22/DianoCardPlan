import fs from "node:fs/promises";
import path from "node:path";
import { readCardById, readCharacterById, readEnemyById } from "./csv";
import { RefImage } from "./gemini";

/**
 * 자동 레퍼런스 (Auto-ref)
 * ------------------------------------------
 * 엔티티 전용 폴더(references/{agent}/{id}/)가 비어있을 때,
 * sub_type / card_type / enemy_type 기반으로 **기존 프로젝트 이미지**를
 * 스타일 앵커로 자동 첨부한다.
 *
 * 원칙
 * - 같은 서브타입 카드가 이미 아트를 가지고 있으면 그 PNG를 임시 레퍼런스로 사용 → 신규 카드가 같은 톤으로 나옴
 * - 적은 같은 챕터·타입으로 구성
 * - 사용자는 언제든 엔티티 폴더에 파일을 넣어 이 자동 선택을 override 가능
 */

// 프로젝트 루트 기준 Unity 리소스 CardArt 경로
const UNITY_CARDART_DIR = path.join(
  process.cwd(),
  "..",
  "..",
  "DianoCard",
  "DianoCard",
  "Assets",
  "Resources",
  "CardArt",
);

// 카드 타입별 CardArt 서브 폴더
const CARDART_SUBDIR: Record<string, string> = {
  SUMMON: "Summon",
  MAGIC: "Spell",
  BUFF: "Utility",
  UTILITY: "Utility",
  RITUAL: "Utility",
};

/**
 * sub_type → 이미 아트가 있는 이웃 카드 ID 목록.
 * 이 목록에 없는 서브타입은 card_type 기반 기본값으로 폴백.
 */
const SUBTYPE_NEIGHBORS: Record<string, string[]> = {
  // 마법 계열
  ATTACK: ["C101", "C103"],           // 공격 마법 / 화염구
  DEFENSE: ["C102", "C104"],          // 방어 마법 / 수호 결계
  PURIFY: ["C202", "C104"],           // 정화 — 힐·방어 느낌(금빛 톤)
  // 버프 계열
  ATTACK_BUFF: ["C201", "C203"],      // 공격 강화 / 광폭화
  HEAL: ["C202", "C205"],             // 전체 힐 / 재생
  TAUNT: ["C203", "C206"],            // 도발 — 광폭화·함성과 같은 붉은 오라 톤
  SPECIAL: ["C206", "C204"],          // 분노의 함성 / 광역 공격
  // 유틸
  DRAW: ["C302", "C303"],             // 드로우·발굴
  SACRIFICE: ["C301"],                // 제물 의식
  STATUS: ["C301"],                   // 잡초 — 희생의 음울한 톤이 가장 비슷
  // 공룡
  HERBIVORE: ["C001", "C002", "C003"], // 트리·스테고·안킬로
  CARNIVORE: ["C004", "C005", "C010"], // 랩터·카르노·콤프소
};

const CARDTYPE_DEFAULTS: Record<string, string[]> = {
  SUMMON: ["C001"],
  MAGIC: ["C101"],
  BUFF: ["C201"],
  UTILITY: ["C302"],
  RITUAL: ["C301"],
};

const IMG_EXT_MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

async function loadCardArtByImageName(
  cardType: string,
  imageFile: string,
): Promise<RefImage | null> {
  if (!imageFile) return null;
  const subdir = CARDART_SUBDIR[cardType];
  if (!subdir) return null;

  const filePath = path.join(UNITY_CARDART_DIR, subdir, imageFile);
  try {
    const buf = await fs.readFile(filePath);
    const ext = path.extname(imageFile).toLowerCase();
    return {
      base64: buf.toString("base64"),
      mimeType: IMG_EXT_MIME[ext] ?? "image/png",
    };
  } catch {
    // 서브 폴더가 아닌 다른 곳에 있을 수도 있어 전 서브폴더를 폴리시
    for (const candidate of Object.values(CARDART_SUBDIR)) {
      if (candidate === subdir) continue;
      const p = path.join(UNITY_CARDART_DIR, candidate, imageFile);
      try {
        const buf = await fs.readFile(p);
        const ext = path.extname(imageFile).toLowerCase();
        return {
          base64: buf.toString("base64"),
          mimeType: IMG_EXT_MIME[ext] ?? "image/png",
        };
      } catch {
        /* ignore */
      }
    }
    return null;
  }
}

export type AutoNeighborMeta = {
  /** 이웃 엔티티 ID (예: "C202") */
  id: string;
  /** 원본 이미지 파일명 (예: "HealAll.png") — 썸네일 URL 빌드에 사용 */
  file: string;
  /** card | enemy — 썸네일 경로 결정용 */
  kind: "card" | "enemy";
};

export type AutoRefInfo = {
  /** 사용된 이웃 메타 목록 (UI 썸네일 표시용) */
  neighbors: AutoNeighborMeta[];
  /** 실제 로드 성공한 레퍼런스 (에셋 없는 카드는 제외됨) */
  refs: RefImage[];
  /** 호환 필드 — 기존 UI 코드 대비 */
  neighborIds: string[];
};

/**
 * 카드용 자동 레퍼런스 계산.
 * 자기 자신은 제외, 이미지 파일 존재하는 이웃만 포함.
 */
export async function autoRefsForCard(cardId: string): Promise<AutoRefInfo> {
  const card = await readCardById(cardId);
  if (!card) return { neighbors: [], refs: [], neighborIds: [] };

  const subNeighbors = SUBTYPE_NEIGHBORS[card.sub_type] ?? [];
  const typeDefaults = CARDTYPE_DEFAULTS[card.card_type] ?? [];
  const candidateIds = Array.from(new Set([...subNeighbors, ...typeDefaults])).filter(
    (id) => id !== cardId,
  );

  const neighbors: AutoNeighborMeta[] = [];
  const refs: RefImage[] = [];
  for (const id of candidateIds) {
    const c = await readCardById(id);
    if (!c || !c.image) continue;
    const ref = await loadCardArtByImageName(c.card_type, c.image);
    if (ref) {
      neighbors.push({ id, file: c.image, kind: "card" });
      refs.push(ref);
    }
    // 너무 많이 붙이면 비용/일관성이 떨어짐 — 최대 2장까지만
    if (refs.length >= 2) break;
  }

  return { neighbors, refs, neighborIds: neighbors.map((n) => n.id) };
}

/**
 * 몬스터용 자동 레퍼런스 — 같은 챕터 + 같은 enemy_type 우선, 없으면 같은 챕터 아무거나.
 * 이미지 파일은 Resources/Monsters/ 하위에 있음.
 */
const UNITY_MONSTERS_DIR = path.join(
  process.cwd(),
  "..",
  "..",
  "DianoCard",
  "DianoCard",
  "Assets",
  "Resources",
  "Monsters",
);

async function loadMonsterImage(imageFile: string): Promise<RefImage | null> {
  if (!imageFile) return null;
  const filePath = path.join(UNITY_MONSTERS_DIR, imageFile);
  try {
    const buf = await fs.readFile(filePath);
    const ext = path.extname(imageFile).toLowerCase();
    return {
      base64: buf.toString("base64"),
      mimeType: IMG_EXT_MIME[ext] ?? "image/png",
    };
  } catch {
    return null;
  }
}

export async function autoRefsForEnemy(enemyId: string): Promise<AutoRefInfo> {
  const target = await readEnemyById(enemyId);
  if (!target) return { neighbors: [], refs: [], neighborIds: [] };

  const { readEnemies } = await import("./csv");
  const all = await readEnemies();
  const sameChapterSameType = all.filter(
    (e) => e.id !== enemyId && e.chapter === target.chapter && e.enemy_type === target.enemy_type,
  );
  const sameChapter = all.filter(
    (e) => e.id !== enemyId && e.chapter === target.chapter,
  );
  const candidates = [...sameChapterSameType, ...sameChapter];

  const seen = new Set<string>();
  const neighbors: AutoNeighborMeta[] = [];
  const refs: RefImage[] = [];
  for (const c of candidates) {
    if (seen.has(c.id)) continue;
    seen.add(c.id);
    if (!c.image) continue;
    const ref = await loadMonsterImage(c.image);
    if (ref) {
      neighbors.push({ id: c.id, file: c.image, kind: "enemy" });
      refs.push(ref);
    }
    if (refs.length >= 2) break;
  }
  return { neighbors, refs, neighborIds: neighbors.map((n) => n.id) };
}

/**
 * 캐릭터용 자동 레퍼런스 — Unity 프로젝트의 Character_infield/Char_*.png 를 자동 첨부.
 */
const UNITY_CHAR_DIR = path.join(
  process.cwd(),
  "..",
  "..",
  "DianoCard",
  "DianoCard",
  "Assets",
  "Resources",
  "Character_infield",
);

export async function autoRefsForCharacter(characterId: string): Promise<AutoRefInfo> {
  const target = await readCharacterById(characterId);
  if (!target) return { neighbors: [], refs: [], neighborIds: [] };

  // field_portrait 컬럼 값 (예: "Char_Archaeologist_Field") 을 사용해 .png 로드
  const basename = target.field_portrait || target.card_portrait;
  if (!basename) return { neighbors: [], refs: [], neighborIds: [] };

  const fileName = basename.endsWith(".png") ? basename : `${basename}.png`;
  const filePath = path.join(UNITY_CHAR_DIR, fileName);
  try {
    const buf = await fs.readFile(filePath);
    const ext = path.extname(fileName).toLowerCase();
    const ref: RefImage = {
      base64: buf.toString("base64"),
      mimeType: IMG_EXT_MIME[ext] ?? "image/png",
    };
    return {
      neighbors: [{ id: characterId, file: fileName, kind: "card" }], // kind=card는 kind 구분용으론 부족 — UI에서 character 썸네일 경로 처리 필요시 확장
      refs: [ref],
      neighborIds: [characterId],
    };
  } catch {
    return { neighbors: [], refs: [], neighborIds: [] };
  }
}

/**
 * agent 이름 + entityId → 자동 레퍼런스 계산.
 * card-art / card-effect / field-summon → 카드 기준
 * field-monster → 적 기준
 * character → Unity Character_infield 이미지
 * 그 외 에이전트는 빈 결과 반환.
 */
export async function autoRefsFor(
  agentName: string,
  entityId: string,
): Promise<AutoRefInfo> {
  const empty: AutoRefInfo = { neighbors: [], refs: [], neighborIds: [] };
  if (!entityId) return empty;
  if (agentName === "card-art" || agentName === "card-effect" || agentName === "field-summon") {
    return autoRefsForCard(entityId);
  }
  if (agentName === "field-monster") {
    return autoRefsForEnemy(entityId);
  }
  if (agentName === "character") {
    return autoRefsForCharacter(entityId);
  }
  return empty;
}
