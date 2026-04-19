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
| [chapter_map.csv](chapter_map.csv) | 챕터 맵 (노드 배치 및 분기) | id |
| [map_gen_rule.csv](map_gen_rule.csv) | 맵 생성 알고리즘 규칙 (Slay the Spire 방식) | id |

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

## chapter_map.csv

각 챕터의 노드 배치와 분기 연결을 정의. node.csv의 `node_type` 을 참조.

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | string | 노드 고유 ID (`M{챕터}_F{층}_{열}`) |
| chapter | string | 소속 챕터 (chapter.csv 참조) |
| floor | int | 층 번호 (0=시작, 1~13=컨텐츠, 14=휴식, 15=보스) |
| col | int | 열 위치 (1~3, UI 배치용) |
| node_type | enum | node.csv 의 node_type 참조 |
| next_nodes | string | 다음 층 연결 노드 ID 목록 (콤마 구분, 1~3개) |

### 1챕터 맵 구조
- 0층: START 1노드 (3갈래)
- 1~13층: 각 층 2~3노드. 2갈래/3갈래 분기 혼합
- 14층: TOWN 1노드 (보스 직전 휴식)
- 15층: BOSS 1노드
- 3갈래 분기: 0층 시작, 2층 중앙, 6층 중앙, 10층 중앙
- 보장 노드: 4층/9층/12층 엘리트, 7층 보물, 14층 마을

---

## map_gen_rule.csv

Slay the Spire 스타일 맵 생성 알고리즘의 규칙을 key-value 형태로 정의.
`chapter_map.csv` 는 하드코딩된 초기 맵이고, 향후 절차적 생성 시 이 규칙을 참조.

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | string | 규칙 ID (R001~) |
| rule_category | enum | PATH / FIXED_FLOOR / GUARANTEE_FLOOR / MIN_FLOOR / NO_PARENT_SAME / NO_SAME_FLOOR / BRANCH / WEIGHT / VALIDATION |
| rule_key | string | 카테고리 내부 세부 키 (층 번호, 노드 타입 등) |
| value | string | 규칙 값 (숫자/enum/TRUE·FALSE/콤마구분 리스트) |
| description | string | 규칙 설명 |

### rule_category 설명

| 카테고리 | 목적 |
|----------|------|
| PATH | 맵 경로 생성 방식 (경로 개수, 교차 금지, UI 열 범위) |
| FIXED_FLOOR | 특정 층에 고정 배치되는 노드 타입 (1층 전투, 7층 보물, 14층 휴식, 15층 보스) |
| GUARANTEE_FLOOR | 해당 층의 여러 노드 중 최소 1개는 지정 타입 보장 (엘리트 분산) |
| MIN_FLOOR | 노드 타입별 최소 등장 층 (초반 밸런싱) |
| NO_PARENT_SAME | 부모-자식 연결 시 같은 타입 연속 금지 |
| NO_SAME_FLOOR | 같은 층 내 같은 타입 중복 금지 |
| BRANCH | 분기 규칙 (3갈래 발생 층, 연결 노드 개수 범위) |
| WEIGHT | 타입별 랜덤 가중치 출처 (`node.csv`) |
| VALIDATION | 하드코딩 맵 검수용 총 개수 체크 |

### 참고
- 현재는 1챕터 기준 규칙. 챕터별로 다르게 할 경우 `chapter_id` 컬럼 추가 고려.
- 랜덤 가중치 자체는 `node.csv` 의 `weight` 에 분리되어 있음. 본 테이블은 "배치 제약"만 담당.

---

## 데이터 로딩 참고

CSV는 콤마(,) 구분자를 사용합니다. `normal_enemy_pool` 같이 내부에 콤마가 필요한 필드는 `"E001,E002,E003"` 처럼 더블쿼트로 감쌌습니다.

파싱 시 RFC 4180 준수 CSV 파서 사용을 권장합니다.
