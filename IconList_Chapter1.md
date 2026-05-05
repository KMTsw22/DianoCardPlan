# 1챕터 아이콘 리스트

DianoCard 1챕터 한정 — 인텐트 아이콘(적 머리 위) + 상태이상 배지(대상 아래/옆).

근거 데이터:
- `DianoCard/Assets/Resources/Tables/enemy.csv` (1챕터 적 7체)
- `DianoCard/Assets/Resources/Tables/enemy_pattern.csv` (PS_E001~E103, PS_E901_P1~P3, PS_MOSS_E901, PS_STOLEN_DINO)
- `DianoCard/Assets/Resources/Tables/enemy_phase.csv` (E901 페이즈 3단)
- `DianoCardPlan/Table/card.csv` (chapter=1 카드)

스타일 가이드:
- 단색 실루엣 + 트림 색
- 잉크 차콜 베이스, 디버프=머티드 보라, 버프=에이지드 브라스
- `feedback_card_palette.md`(잉크 차콜 + 에이지드 브라스 + 머티드 주얼톤) 톤 매칭

---

## 1. 인텐트 아이콘 (적 머리 위) — 9종

다음 턴 적이 무엇을 할지 예고하는 아이콘. 카드 드래그 전 상황 판단용.

| ID | 의미 | 1챕터 발생처 | 모티프 | 색 | 비고 |
|---|---|---|---|---|---|
| `ATTACK` | 단일 공격 (데미지 N) | E001/E102/E103/E901 본체, 이끼 STRIKER | 발톱·검 | #E74C3C | 숫자 표시 |
| `MULTI_ATTACK` ⭐신규 | 분할 타격 (N×M) | PS_E004(3×2), PS_E010(2×3), PS_E011(2×2) | 발톱 3줄 | #C0392B | "N×M" 표시 |
| `DEFEND` | 자가/아군 방어도 | E002/E101, 이끼 GUARD | 방패 | #3498DB | 숫자 표시 |
| `BUFF` | 자가 강화 (공격+, 영구방어+) | PS_E005, PS_E102 격노, PS_E103, 이끼 EMPOWER, E901 BUFF_SELF | 상승 화살표 | #F1C40F | — |
| `DEBUFF` | 디버프 부여 (독/약화/취약/침묵/흡수/강탈) | PS_E003/E007/E009/E011, E901 STEAL_SUMMON, 이끼 BURN | 하강 화살표 | #9B59B6 | — |
| `SUMMON` | 쫄/이끼 소환·리필 | PS_E102, E901 REFILL_MOSS | 소환진/알 | #27AE60 | — |
| `COUNTDOWN` | N턴 후 발동 (단일강타·광역) | PS_E101 (2턴 15), E901 COUNTDOWN_AOE | 모래시계 + 숫자 | #C0392B | 남은 턴 표시 |
| `HEAL` ⭐신규 | 보스/아군 회복 | PS_MOSS_E901 HEALER (HEAL_BOSS) | 십자 + 상승 | #58D68D | 숫자 표시 |
| `UNKNOWN` | 페이즈 전환 그레이스 턴 | E901 페이즈 2/3 진입 직후 | ? | #7F8C8D | — |

### 기존 인텐트 테이블 변경사항

기존 `intent_icon.csv` 8종 기준:
- **유지**: ATTACK, DEFEND, BUFF, DEBUFF, SUMMON, COUNTDOWN, UNKNOWN (7종)
- **제외**: AOE — 1챕터의 광역은 모두 COUNTDOWN_AOE 형태로 카운트다운에 흡수
- **신규**: MULTI_ATTACK, HEAL (2종)

---

## 2. 상태이상 배지 (대상 아래/옆) — 10종

### 2-1. 디버프 (보라/녹 계열)

| ID | 효과 | 1챕터 발생처 | 모티프 | 표시 방식 |
|---|---|---|---|---|
| `POISON` | 매 턴 N 피해 (독/화상 겸용) | C136 맹독 가시, PS_E003/E007, PS_MOSS_E901 BURN | 보라 방울 + 해골 | 스택 숫자 |
| `VULNERABLE` | 받는 피해 +50% | C135 부식의 선풍, C142 태고의 비명, PS_E011 | 깨진 방패 | 턴 수 |
| `WEAK` | 주는 피해 −25% | C129 천둥 포효, PS_E009 | 부러진 검 | 턴 수 |
| `BIND` | 행동 불가 (속박/침묵 통합) | C133 속박의 덩굴, C134 봉인의 사슬, PS_E009 SILENCE | 사슬·덩굴 + 자물쇠 | 턴 수 |
| `FEAR` | 광역 공포 (행동 일부 봉쇄) | C008 티렉스 광역 공포 | 검은 안개 + 해골 | 턴 수 |
| `STOLEN` ⭐신규 | 공룡 강탈 (적 편으로 전환) | E901 P2/P3 STEAL_SUMMON | 이끼 덩굴 사슬 + 보랏빛 눈 | 정화 시 해제 |

### 2-2. 버프 (금/청 계열)

| ID | 효과 | 1챕터 발생처 | 모티프 | 표시 방식 |
|---|---|---|---|---|
| `STRENGTH` | 공격력 +N (광폭화·격노 통합) | C201 공격 강화, C203 광폭화, PS_E005/E102/E103, 이끼 EMPOWER, E901 BUFF_SELF | 상승 검·주먹 | 스택 (영구/턴 구분 색) |
| `BLOCK` | 방어도 N (한 턴 소멸) | C102/C111/C112/C114/C121/C140, PS_E002/E101, 이끼 GUARD | 방패 | 숫자 |
| `WARD` | 다음 턴까지 방어도 유지 | C104 이중 룬돔 | 푸른 결계 원 | 턴 수 |
| `ROOTED` ⭐신규 | 영구 방어도 누적 (뿌리 박기) | PS_E008/E901 ARMOR_UP | 갈라진 돌 + 뿌리 | 스택 (영구) |

---

## 3. 작업 우선순위

총 **19개** (인텐트 9 + 상태이상 10).

### P0 — 슬라임 단계 (튜토리얼) — 3개
가장 먼저 보이는 적이라 인지 진입 장벽이 낮아야 함.
- `ATTACK`
- `DEFEND`
- `POISON`

### P1 — 일반/엘리트 단계 — 10개
- 인텐트: `MULTI_ATTACK`, `DEBUFF`, `BUFF`, `SUMMON`, `COUNTDOWN`
- 상태이상: `VULNERABLE`, `WEAK`, `BIND`, `STRENGTH`, `BLOCK`

### P2 — 보스 E901 — 6개
- 인텐트: `HEAL`, `UNKNOWN`
- 상태이상: `FEAR`, `STOLEN`, `WARD`, `ROOTED`

---

## 4. 톤 / 비주얼 규칙

- **베이스**: 잉크 차콜(#1A1A1A~#2A2A2A) 실루엣
- **트림 색**: 위 표의 색상 코드 (디버프=머티드 보라/녹, 버프=에이지드 브라스/청)
- **외곽**: 1~2px 다크 림으로 배경에서 분리
- **사이즈**: 모든 아이콘 정사각 (예: 64×64), 같은 그리드 안에서 시각 무게 균형
- **금지**:
  - 원색·밝은 금(`feedback_card_palette.md` 위반)
  - 캐릭터·생물 디테일 (이건 카드 일러스트 영역, 아이콘은 추상 심볼만)
  - 그라데이션 남용 — 평면 음영 + 살짝의 텍스처만

---

## 5. 출력 권장

- **포맷**: PNG 투명 배경 (TGA·WEBP도 가능, Unity 호환 위해 PNG 우선)
- **해상도**: 128×128 마스터, 64×64로 다운스케일 사용
- **네이밍**: `intent_<id>.png` / `status_<id>.png`
  - 예: `intent_attack.png`, `status_poison.png`
- **저장 위치 제안**: `DianoCard/Assets/Resources/Icons/Intent/`, `.../Icons/Status/`
