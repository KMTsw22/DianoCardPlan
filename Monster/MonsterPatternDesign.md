# 몬스터 패턴 설계 문서

## 0. 목적

**World of Warcraft 레이드 보스**의 기믹 감각을 턴제 덱빌딩에 이식한다.
핵심은 "플레이어가 예고(Telegraph)를 보고 다음 턴에 대응할 수 있는가"이며,
일반 → 엘리트 → 보스로 갈수록 **기믹 개수**와 **정보량**을 계단식으로 늘린다.

WoW 레이드의 4대 매력 포인트를 목표 경험으로 삼는다.

1. **정보 해독** — 시전 바/장판/디버프를 보고 대응 카드를 고른다 (Telegraph)
2. **역할 분담** — 탱커(공룡)가 맞고, 딜러(마법)가 깎고, 힐(재생)이 수습 (Trinity)
3. **페이즈 전환의 극적 연출** — HP 임계/타이머로 패턴이 뒤집힌다 (Phase Shift)
4. **공략 있는 제압감** — 무작정이 아니라 "이 보스는 이렇게 잡는다"가 성립 (Strategy)

---

## 1. 설계 원칙

### 1.1 3대 원칙

1. **모든 행동은 선예고(Telegraph)한다.** 예외 = 피격 리액션 / 즉발 약소 공격.
2. **기믹 수는 티어에 비례한다.** 일반 1, 엘리트 2, 보스 3~4.
3. **같은 층에서 기믹을 재탕하지 않는다.** 한 층 안에 독/출혈/화상이 동시에 있으면 과부하.

### 1.2 티어별 설계 가이드

| 티어 | 기믹 수 | 페이즈 | 텔레그래프 | HP 밴드 | 설계 목표 |
|------|---------|--------|------------|---------|-----------|
| 일반(Normal) | 1 | 없음 | 1턴 | 챕터 평균 HP | 카드 플레이 루프 검증 |
| 엘리트(Elite) | 2 | 0~1 | 1~2턴 | 일반의 1.5~2배 | 덱 최적화 강제 |
| 보스(Boss) | 3~4 | 2~3 | 1~3턴 | 일반의 5~7배 | 레이드 전투 경험 |

---

## 2. WoW 레이드 기믹 → 카드게임 이식

### 2.1 WoW 기믹 매핑 테이블

| WoW 기믹 | 원본 예시 | 카드게임 구현 | 필요 시스템 |
|----------|-----------|---------------|-------------|
| Cast Bar (시전 바) | 일반 주문 | intent_icon + telegraph_turns | Intent UI |
| Telegraph (장판 예고) | 불길/균열 | `COUNTDOWN_AOE` N턴 뒤 전체 피해 | Countdown Tag |
| Enrage Timer (하드 버서크) | Patchwerk | N턴 초과 시 공격력 ×3 / 즉사기 | Turn Counter |
| Soft Enrage | 거의 모든 보스 | 턴마다 공격력 +1 누적 | Stacking Buff |
| Phase Shift (페이즈 전환) | Onyxia 3페이즈 | HP 임계값 → 패턴셋 교체 | Phase Table |
| Add Phase (쫄 소환) | Ragnaros 수하 | `SUMMON` + 본체 무적/실드 | Summon + Invuln |
| Tank Swap (탱커 교대) | 디버프 스택 보스 | 특정 공룡에 스택 N → 교체 강제 | Targeted Stack |
| Cleave / Frontal Cone | 용 브레스 | 전열 공룡 전체 피해 | Position-AOE |
| Tail Swipe (후방 공격) | Onyxia | 후열 공룡 전체 피해 | Position-AOE |
| Interrupt Window | 시전 차단 | 카운트다운 중 특정 조건 달성 시 취소 | Interrupt Flag |
| Dispel Demand | 해로운 버프 | 디버프 N턴 내 해제 못하면 폭발 | Timed Debuff |
| Mind Control | 감염된 군중 | 아군 공룡 1턴 적 편으로 전환 | MC Flag |
| Void Zone / 장판 | C'Thun 눈 광선 영역 | 필드에 지속 피해 구역 소환 | Field Hazard |
| Stack vs Spread (집결/분산) | 다수 보스 | 전열/후열 분산 시 경감 / 집결 시 경감 | Positioning Check |
| Raid Heal Check | 공헌 시험 | 회피 불가 광역 → 힐/방어 준비 강제 | Forced Damage |
| Instant Death Mechanic | Algalon 빅뱅 | 카운트다운 만료 시 전멸 | Wipe Condition |
| Power Overwhelming | Illidan 변신 | 페이즈 진입 시 보스 고정 버프 | On-Enter Effect |
| Debuff Stack | Sapphiron 한기 | 독/출혈/취약 무한 누적 주의 | Status Cap |
| Class Call (직업 차단) | Nefarian | 특정 카드 타입(마법/소환) 봉인 | Card Type Silence |
| Rescue (구출) | Sindragosa 얼음 무덤 | 쫄을 빨리 잡으면 아군 공룡 부활 | Conditional Revive |

### 2.2 기믹 라이브러리 (재사용 풀)

각 액션 ID 옆 괄호 = WoW 원형 레퍼런스.

**공격계**
- `ATTACK` — 기본 피해 (Melee Swing)
- `MULTI_ATTACK` — 분할 타격 N회 (Whirlwind)
- `AOE_ATTACK` — 아군+소환사 전체 피해 (Thunderclap / Shadow Nova)
- `PIERCE_ATTACK` — 방어도 무시 (Shattering Throw)
- `CLEAVE_FRONT` — 전열 공룡 전체 피해 (Breath of Fire)
- `CLEAVE_BACK` — 후열 공룡 전체 피해 (Tail Swipe)
- `EXECUTE` — HP 30% 이하 즉사기 (Execute)
- `CHAIN_RANDOM` — 랜덤 타겟 N회 연쇄 (C'Thun Eye Beam)

**방어/자기 보호**
- `DEFEND` — 자가 방어도 (Shield Block)
- `BARRIER` — 피해 N회 무효 (Ice Block)
- `REFLECT` — 피격 반사 (Spell Reflection / Kil'jaeden 방패)
- `INVULN_WHILE_ADD` — 쫄 생존 중 본체 무적 (Vashj 방어막)
- `ABSORB` — 일정량 흡수 실드 (Power Word: Shield)

**디버프/도트**
- `POISON` — 독 N 스택 (Poison DoT)
- `BURN` — 화상 고정 피해 (Ignite)
- `BLEED` — 출혈, 회복 감소 (Rend)
- `WEAK` — 공격력 감소 (Demoralizing Shout)
- `FRAIL` — 방어도 획득 감소 (Shatter)
- `SILENCE` — 카드 타입 봉인 (Silence / Nefarian Class Call)
- `VULNERABLE` — 받는 피해 증가 (Sunder Armor)
- `CURSE_TIMED` — N턴 뒤 폭발, 해제하면 무효 (Dispel Demand)

**유틸/군중 제어**
- `SUMMON` — 쫄 소환 (Adds)
- `HEAL` — 자가/쫄 회복 (Regenerate)
- `HEAL_FROM_ADD` — 쫄 흡수 시 회복 (Devour)
- `BUFF_SELF` — 공격력 상승 (Frenzy)
- `DRAIN` — 아군 공룡 HP 흡수 (Lifedrain)
- `HAND_BURN` — 핸드 랜덤 폐기 (Mana Burn)
- `COST_UP` — 다음 턴 카드 비용 +1 (Slow)
- `MIND_CONTROL` — 아군 1체 1턴 적 전환 (Mind Control)
- `FEAR` — 아군 1체 1턴 행동 불가 (Fear)
- `VOID_ZONE` — 필드에 지속 피해 구역 (Void Zone)

**페이즈/시간**
- `COUNTDOWN_X` — N턴 후 지정 행동 (Raid Telegraph)
- `PHASE_SHIFT` — HP 임계값 패턴셋 교체 (Phase Transition)
- `PHASE_SHIFT_TIMER` — 특정 턴 도달 시 페이즈 전환 (Time Gate)
- `ENRAGE_HARD` — N턴 초과 시 공격력 ×N / 즉사기 활성 (Berserk)
- `ENRAGE_SOFT` — 턴마다 공격력 +1 영구 (Frenzy Stacking)
- `INTERRUPT_WINDOW` — 카운트다운 중 조건 충족 시 취소 (Kick Check)

### 2.3 WoW 보스 아키타입 5종 (설계 템플릿)

보스 1체 설계 시 아래 아키타입 하나를 "주 색깔"로 고르고, 다른 아키타입 요소를 1~2개 섞는다.

| 아키타입 | 대표 보스 | 핵심 체험 | 기믹 구성 |
|----------|-----------|-----------|-----------|
| **DPS 체크형** | Patchwerk | 순수 화력 시험, 엔레이지 타이머 안에 잡기 | `ENRAGE_HARD` + 꾸준한 기본 피해 |
| **기믹 해독형** | C'Thun, Algalon | 정보 해독 실패 = 즉사 | `COUNTDOWN_X` + `INSTANT_DEATH` |
| **쫄 관리형** | Ragnaros, Vashj | 본체 딜/쫄 제거 우선순위 판단 | `SUMMON` + `INVUN_WHILE_ADD` |
| **페이즈 전환형** | Onyxia, Illidan | 국면마다 전혀 다른 싸움 | `PHASE_SHIFT` 2~3단계 + 페이즈별 고유 기믹 |
| **디버프 관리형** | Sindragosa, Jaina | 스택/타이머 관리 실패 = 파멸 | `CURSE_TIMED` + `DEBUFF_STACK` + 해제 요구 |

### 2.4 WoW 명장면 기믹 → 우리 게임 번역

"이거 WoW에서 본 그 느낌!"을 유발하는 인용 기믹들. 챕터 보스 설계 시 1~2개 차용.

| 원본 | 기믹 요약 | 카드게임 번역안 |
|------|-----------|------------------|
| **Patchwerk** (Naxx) | 6분 엔레이지 = DPS 체크 | 12턴 안에 못 잡으면 보스 공격력 ×3 |
| **Ragnaros** (MC) | 2분마다 수하 8마리 소환 + 땅속 잠수 | HP 70%/40% 도달 시 쫄 3마리 소환, 본체 2턴 무적 |
| **Onyxia** | 지상(페1) → 공중 불비(페2) → 광폭(페3) | 3페이즈: 물리 → 공중에서 턴마다 광역 → HP 40% 광폭 |
| **C'Thun** (AQ40) | 위장 눈 광선 = 한 명 → 다음 → 다음 | 랜덤 공룡 1체 피해 → 다음 턴 그 옆 공룡도 피해, 연쇄 5회 |
| **Nefarian** (BWL) | 직업 콜 = 특정 직업 봉인 | "초식 공룡 봉인" 2턴 / "마법 카드 봉인" 2턴 랜덤 |
| **Illidan** (BT) | 5페이즈, 악마 변신 후 완전 다른 보스 | HP 50% 시 변신 → 공격력·HP 리셋·새 패턴셋 |
| **Kael'thas** (TK) | 4종 무기 페이즈별 획득 | 페이즈마다 플레이어에게 임시 카드 1장 지급 (공략 카드) |
| **Algalon** (Ulduar) | "빅뱅" 3턴 카운트 = 막지 못하면 전멸 | 3턴 카운트다운, 실패 시 즉시 게임오버 (보스 HP 25% 이하에서만 시전) |
| **Yogg-Saron** (Ulduar) | 정신력(Sanity) 스택 = 스택이 쌓이면 광기 | 광기 스택 10 = 핸드 전체 셔플 + 1턴 행동 불가 |
| **Sindragosa** (ICC) | 얼음 무덤 = 아군 얼음에 갇힘, 깨야 부활 | 아군 공룡 얼음 감옥에 갇힘 → 해당 공룡 3턴 내 지정 카드로 해제, 실패 시 사망 |
| **Lich King** (ICC) | 발키르 공중 납치 → 낙사 | 쫄이 아군 공룡 1체 "납치", 2턴 내 쫄 처치 못하면 해당 공룡 사망 |
| **Kil'jaeden** (Sunwell) | 방패가 공격 반사 | 보스 2턴마다 `REFLECT` 자세, 공격하면 소환사가 피해 |
| **Lei Shen** (ToT) | 사분면 번개 구역 = 매 페이즈 다른 구역 위험 | 전열/후열 중 한쪽이 매 턴 표시되어 광역 예고 |
| **N'Zoth** (Ny'alotha) | 광기(Madness) 스택 = 시야 왜곡 | 광기 스택 5 = 적 intent 아이콘 숨김 (Unknown 표시) |
| **Denathrius** (Castle Nathria) | 핏빛 파편 = 처치한 쫄이 장판 남김 | 쫄이 죽으면 필드에 `VOID_ZONE` 2턴 생성 |

---

## 3. CSV 스키마 제안

### 3.1 `enemy.csv` (기존 수정)

기존 `ai_pattern` 단일 필드 → `pattern_set_id` 참조로 변경.

```
id, name_kr, enemy_type, chapter, hp, attack, defense,
pattern_set_id, phase_set_id, gold_min, gold_max, description, image
```

- `pattern_set_id` — `enemy_pattern.csv` 참조 (필수)
- `phase_set_id` — `enemy_phase.csv` 참조 (보스만, 없으면 NULL)

### 3.2 `enemy_pattern.csv` (신규)

행동 1개 = 한 행. 한 `pattern_set_id`에 여러 행.

```
pattern_set_id, step_order, phase, action, value, target,
telegraph_turns, intent_icon, weight, condition, description
```

| 컬럼 | 설명 | 예시 |
|------|------|------|
| pattern_set_id | 패턴셋 ID | PS_E001 |
| step_order | 결정적 순서 (순환) / 0이면 가중치 랜덤 | 1, 2, 3 또는 0 |
| phase | 어느 페이즈에 속하는지 | 1, 2, 3 |
| action | 기믹 라이브러리의 액션 ID | ATTACK, POISON, SUMMON |
| value | 수치 (피해량/스택/수량) | 10 |
| target | 대상 | SELF, SUMMONER, ALLY_FIELD, ALL |
| telegraph_turns | 예고 턴 수 (0 = 즉발) | 0, 1, 2 |
| intent_icon | UI 아이콘 키 | ICON_ATTACK, ICON_AOE |
| weight | step_order=0일 때 선택 가중치 | 30 |
| condition | 발동 조건 (옵션) | HP_BELOW_50, TURN_GT_5 |
| description | 기획 메모 | "광역 2턴 예고" |

### 3.3 `enemy_phase.csv` (신규, 엘리트/보스용)

```
phase_set_id, phase, enter_hp_ratio, pattern_set_id,
on_enter_action, on_enter_value, trigger_text
```

| 컬럼 | 설명 | 예시 |
|------|------|------|
| phase_set_id | 페이즈셋 ID | PH_E901 |
| phase | 페이즈 번호 | 1, 2, 3 |
| enter_hp_ratio | 이 페이즈로 진입하는 HP 비율 | 1.0, 0.6, 0.3 |
| pattern_set_id | 이 페이즈에서 사용할 패턴셋 | PS_E901_P2 |
| on_enter_action | 전환 시 즉시 발동 액션 | CLEAR_DEBUFF, SUMMON |
| on_enter_value | 즉시 발동 값 | - |
| trigger_text | 컷인 대사 | "석상이 깨어난다!" |

### 3.4 `intent_icon.csv` (신규 룩업)

```
icon_id, icon_image, color_hint, description_kr
```

기본 셋: ATTACK, DEFEND, AOE, DEBUFF, BUFF, SUMMON, COUNTDOWN, UNKNOWN.

---

## 4. 티어별 패턴 예시 (수직 슬라이스)

### 4.1 일반: 이끼 슬라임 (E001)

**컨셉**: 기본 공격만 반복. 기믹 1개 없음 = 튜토리얼.
**WoW 아키타입**: DPS 체크형(Patchwerk)의 초간략화. Intent UI 학습용.

```
PS_E001:
  step 1, phase 1, ATTACK, 10, SUMMONER, telegraph=1
  step 2, phase 1, ATTACK, 10, SUMMONER, telegraph=1
  (순환)
```

### 4.2 엘리트: 거대 골렘 (E101)

**컨셉**: 기믹 2개(방어도 누적 + 2턴 예고 강타).
**WoW 아키타입**: 기믹 해독형(초기 보스) — Shield Slam + Pulverize 예고형.
- 기믹 A: 2턴마다 방어도 10 자가 부여 → 플레이어가 관통/디버프로 대응
- 기믹 B: 3턴째 강타 예고 (15 피해) → 방어/회피 강요

```
PS_E101:
  step 1, phase 1, DEFEND, 10, SELF, telegraph=1, icon=DEFEND
  step 2, phase 1, ATTACK, 8, SUMMONER, telegraph=1, icon=ATTACK
  step 3, phase 1, COUNTDOWN_ATTACK, 15, SUMMONER, telegraph=2, icon=COUNTDOWN
  (순환)
```

### 4.3 보스: 이끼 수호석상 (E901)

**컨셉**: 기믹 3개 + 페이즈 2단계.
**WoW 아키타입**: 페이즈 전환형(Onyxia) × 쫄 관리형(Ragnaros) 하이브리드.
- 페이즈 1 (HP 100%~50%): 텔레그래프 학습 구간
- 페이즈 2 (HP 50%~0%): 광역 + 쫄 소환 + 가속

```
PH_E901:
  phase 1, enter_hp=1.0, pattern=PS_E901_P1, trigger="석상이 움직인다"
  phase 2, enter_hp=0.5, pattern=PS_E901_P2,
    on_enter=SUMMON(이끼 수호병 2), trigger="덩굴이 폭주한다!"

PS_E901_P1:
  step 1, ATTACK 12
  step 2, DEFEND 15
  step 3, COUNTDOWN_AOE 18, telegraph=2  ← 핵심 기믹

PS_E901_P2:
  step 1, AOE_ATTACK 10, telegraph=1
  step 2, SUMMON(이끼 덩굴 1), telegraph=1
  step 3, HAND_BURN 1 + ATTACK 8, telegraph=1
  step 4, COUNTDOWN_PIERCE 25, telegraph=2  ← 공략 핵심
```

---

## 5. Intent UI 요구사항

패턴 시스템이 의미를 가지려면 UI가 다음을 표시해야 한다.

- **현재 턴 의도**: intent_icon + value (예: ⚔️ 12)
- **카운트다운**: 남은 턴 수 뱃지 (예: ☠️ 2턴 뒤)
- **디버프 스택**: 독 4, 취약 2 등 숫자 뱃지
- **페이즈 상태**: HP 바에 페이즈 전환점 마커
- **쫄/본체 구분**: 쫄 프레임 축소, 본체는 플래그 아이콘

아트 디렉션(반투명 HUD + 심플 아이콘)과 일관성 유지.

---

## 6. 작업 순서 (제안)

1. **스키마 확정** — 본 문서 3장 리뷰, CSV 컬럼 최종 결정.
2. **일반 1체 구현** — 이끼 슬라임 + Intent UI 표시 기본형.
3. **엘리트 1체 구현** — 거대 골렘 + 카운트다운/방어도 기믹.
4. **보스 1체 구현** — 이끼 수호석상 + 페이즈 전환.
5. **수직 슬라이스 플레이 테스트** — 턴당 정보량·난이도 곡선 점검.
6. **확장** — 검증된 스키마로 챕터 2~4 몬스터 풀 작성.

---

## 7. 챕터 보스 4체 WoW-inspired 초안

기존 enemy.csv의 E901~E904에 WoW 보스 아키타입을 매핑한 초안.

### 7.1 E901 이끼 수호석상 (1챕터) — "덩굴의 Patchwerk + 작은 Onyxia"

- **아키타입**: DPS 체크 + 단순 페이즈 전환
- **역할**: 튜토리얼 보스. 기믹은 있지만 공략이 직관적.
- **핵심 기믹**:
  - P1: 2턴 카운트다운 AOE (광역 예고 학습)
  - P2 (HP 50%): 덩굴 쫄 2체 소환 + 본체 공격력 +3
- **WoW 인용**: Ragnaros 쫄 소환 경감판

### 7.2 E902 피라미드의 왕 (2챕터) — "사막의 C'Thun"

- **아키타입**: 기믹 해독형 + 디버프 관리형
- **역할**: 랜덤 연쇄 공격을 읽고 포지셔닝 강제.
- **핵심 기믹**:
  - **눈 광선**: 랜덤 공룡 → 다음 턴 인접 공룡 → 연쇄 3회 (C'Thun Eye Beam)
  - **파라오의 저주**: 2턴 타이머 디버프, 해제 카드 없으면 공룡 1체 즉사 (Dispel Demand)
  - P2 (HP 40%): 모래 폭풍 = 매 턴 핸드 1장 폐기
- **WoW 인용**: C'Thun + Sindragosa 믹스

### 7.3 E903 화산의 군주 (3챕터) — "용암의 Ragnaros"

- **아키타입**: 쫄 관리형 + 페이즈 전환
- **역할**: 본체 딜과 쫄 처리 우선순위 판단 강제.
- **핵심 기믹**:
  - P1: 화염탄 기본 공격 + 3턴마다 용암 정령 2체 소환
  - P2 (HP 60%): 용암 잠수 = 본체 2턴 무적, 그동안 쫄 3체 추가 소환
  - P3 (HP 25%): 폭주 = 매 턴 AOE 8 + 공격력 +2 누적 (Soft Enrage)
- **WoW 인용**: Ragnaros 본가 그대로 경감

### 7.4 E904 태초의 공룡왕 (4챕터 최종) — "공룡의 Lich King"

- **아키타입**: 페이즈 전환형 × 올인원
- **역할**: 게임의 모든 기믹을 종합 시험하는 최종 보스.
- **핵심 기믹**:
  - **P1 (100%~70%)**: 기본 광역 + 1턴 예고
  - **P2 (70%~40%)**: 공룡의 군주 쫄 3체 소환 + "원시의 포효"(2턴 카운트다운, 실패 시 아군 공룡 1체 사망 — Lich King 발키르 경감판)
  - **P3 (40%~10%)**: 시간의 폭주 = 매 턴 카드 비용 +1 영구 누적 + 광역 AOE 강화 (Soft Enrage)
  - **P4 (10%~0%, 하드 버서크)**: "운석" 3턴 카운트다운, 만료 시 즉시 게임오버 (Algalon Big Bang)
- **WoW 인용**: Lich King × Algalon × Nefarian(직업 봉인은 보조)

---

## 8. 작업 순서 (제안, 재정렬)

1. **스키마 확정** — 3장 CSV 컬럼 최종 결정.
2. **Intent UI 기본형 구현** — WoW Cast Bar 스타일 텔레그래프 표시.
3. **일반 1체** — 이끼 슬라임 + 1턴 예고 기본형.
4. **엘리트 1체** — 거대 골렘 + 2턴 카운트다운.
5. **보스 1체** — 이끼 수호석상 + 페이즈 전환 + 쫄 소환.
6. **수직 슬라이스 플레이 테스트** — 턴당 정보량·난이도 곡선 점검.
7. **확장** — 검증된 스키마로 E902~E904 보스 먼저(WoW 레퍼런스 인용) → 일반/엘리트 몬스터 풀.

---

## 9. 오픈 이슈 (결정 필요)

- [ ] 패턴 순서: 결정적 순환 vs 가중치 랜덤 vs 혼합 — 기본값?
- [ ] 쫄 소환 시 본체 타게팅 제한 여부 (Taunt 개념 도입? = Ragnaros식 쫄 우선 처리 강제)
- [ ] 카운트다운 실패 시 페널티 강도 (즉사? 체력 80%? — Algalon급 vs 일반 광역급)
- [ ] 엘리트에도 페이즈 도입할지 (HP 50% 한 번만)
- [ ] 디버프 스택 상한 (무한 누적 방지)
- [ ] 하드 버서크 타이머를 전 보스 공통으로 둘지, 최종 보스만 둘지
- [ ] Mind Control / Fear 같은 "플레이어 조작 빼앗기" 기믹 허용 범위 (스트레스 요인)
- [ ] 쫄 처치 시 본체 회복(Devour) / 본체 강화 같은 "쫄 방치 페널티"를 도입할지
