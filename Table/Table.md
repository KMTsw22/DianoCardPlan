# DianoCard 데이터 테이블

Slay the Spire 스타일 덱빌딩 로그라이크 게임의 데이터 테이블입니다.
모든 파일은 UTF-8 CSV 형식으로 작성되어 있습니다.

## 파일 목록

| 파일 | 설명 | Key |
|------|------|-----|
| [card.csv](card.csv) | 카드 마스터 데이터 (공룡/마법/버프) | id |
| [enemy.csv](enemy.csv) | 적 데이터 (일반/엘리트/보스) | id |
| [potion.csv](potion.csv) | 물약 데이터 | id |
| [relic.csv](relic.csv) | 유물(패시브) 데이터 | id |
| [chapter.csv](chapter.csv) | 챕터 설정 | id |
| [event.csv](event.csv) | 이벤트 노드 데이터 | id |
| [node.csv](node.csv) | 노드 타입 및 가중치 | id |

---

## card.csv

플레이어가 사용하는 모든 카드의 마스터 데이터.

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | string | 카드 고유 ID (C001~) |
| name_kr / name_en | string | 카드 이름 |
| card_type | enum | SUMMON / MAGIC / BUFF / RITUAL / UTILITY |
| sub_type | enum | HERBIVORE / CARNIVORE / ATTACK / DEFENSE / HEAL / DRAW / SACRIFICE 등 |
| rarity | enum | COMMON / UNCOMMON / RARE |
| cost | int | 마나 소모량 |
| attack | int | 공룡 공격력 (소환 카드) |
| hp | int | 공룡 체력 (소환 카드) |
| value | int | 마법/버프의 효과 수치 (데미지, 방어도 등) |
| target | enum | SELF / ENEMY / ALL_ENEMY / ALLY / ALL_ALLY / FIELD / RANDOM |
| description | string | 효과 설명 |
| image | string | 이미지 파일명 |
| chapter | int | 등장 시작 챕터 |

### ID 규칙
- C0xx : 공룡 소환 카드
- C1xx : 마법 카드
- C2xx : 버프 카드
- C3xx : 의식/유틸 카드

---

## enemy.csv

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | string | 적 고유 ID (E001~) |
| name_kr / name_en | string | 적 이름 |
| enemy_type | enum | NORMAL / ELITE / BOSS |
| chapter | int | 등장 챕터 |
| hp | int | 체력 |
| attack | int | 공격력 |
| defense | int | 기본 방어도 |
| ai_pattern | enum | ATTACK / DEFEND_ATTACK / DEBUFF_ATTACK / POISON_ATTACK / BURN_ATTACK / SUMMON_ATTACK / FLY_ATTACK / PHASE_ATTACK |
| gold_min / gold_max | int | 드랍 골드 범위 |

### ID 규칙
- E0xx : 1챕터 일반
- E1xx : 엘리트 (챕터 공용)
- E2xx : 2챕터 일반
- E3xx : 3챕터 일반
- E4xx : 4챕터 일반
- E9xx : 챕터 보스

---

## potion.csv

1회성 소모 아이템.

| 컬럼 | 설명 |
|------|------|
| potion_type | ATTACK / DEFENSE / UTILITY |
| rarity | COMMON / UNCOMMON / RARE |
| target | SELF / ENEMY / ALL_ENEMY / ALL_ALLY |
| value | 효과 수치 |
| price | 상점 판매가 |
| buyable | 상점 구매 가능 여부 (COMMON만 TRUE) |

---

## relic.csv

전투에 지속적인 효과를 주는 패시브 아이템.

| 컬럼 | 설명 |
|------|------|
| rarity | COMMON / UNCOMMON / RARE / SHOP |
| source | START / ELITE / BOSS / SHOP / EVENT (획득 경로) |
| trigger | PASSIVE / BATTLE_START / TURN_START / BATTLE_END / SUMMON / KILL / HP_LOW / NODE_ENTER |
| effect_type | MAX_HP / DRAW / MANA / DEFENSE / ATTACK / HEAL / BURN / GOLD / CARD / SACRIFICE_COST / POTION_SLOT / ATTACK_BUFF |
| value | 효과 수치 |

---

## chapter.csv

챕터별 진행 규칙.

| 컬럼 | 설명 |
|------|------|
| mana | 해당 챕터 기본 마나 |
| node_count | 총 노드 수 (시작/보스 포함) |
| normal_count | 일반 전투 노드 개수 |
| elite_count | 엘리트 전투 노드 개수 |
| shop_count | 상인 노드 개수 |
| town_count | 마을 노드 개수 |
| event_count | 이벤트 노드 개수 |
| boss_id | 보스 ID (enemy.csv 참조) |
| normal_enemy_pool | 일반 전투에서 등장하는 적 ID (콤마 구분) |
| elite_enemy_pool | 엘리트 전투에서 등장하는 적 ID (콤마 구분) |

---

## event.csv

이벤트 노드에서 선택 가능한 상황. 최대 3개 선택지.

| 컬럼 | 설명 |
|------|------|
| choiceN_text | 선택지 텍스트 |
| choiceN_effect | 효과 타입 (GAIN_GOLD, LOSE_HP, GAIN_RELIC, UPGRADE_CARD, REMOVE_CARD 등) |
| choiceN_value | 효과 수치 |

비어있는 choice3_* 는 선택지 2개인 이벤트.

---

## node.csv

맵 생성 시 참조하는 노드 타입 가중치.

| 컬럼 | 설명 |
|------|------|
| node_type | NORMAL_BATTLE / ELITE_BATTLE / SHOP / TOWN / EVENT / TREASURE / UNKNOWN / BOSS / START |
| weight | 랜덤 배치 가중치 |
| min_floor / max_floor | 등장 가능한 층 범위 (1~13, 0=시작, 15=보스) |

---

## 데이터 로딩 참고

CSV는 콤마(,) 구분자를 사용합니다. `normal_enemy_pool` 같이 내부에 콤마가 필요한 필드는 `"E001,E002,E003"` 처럼 더블쿼트로 감쌌습니다.

파싱 시 RFC 4180 준수 CSV 파서 사용을 권장합니다.
