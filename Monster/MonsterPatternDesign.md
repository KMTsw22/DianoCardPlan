# 몬스터 패턴 설계 문서 (MVP 채택판)

## 0. 목적

**World of Warcraft 레이드 보스**의 기믹 감각을 턴제 덱빌딩에 이식한다.
일반 → 엘리트 → 보스로 갈수록 **기믹 개수**와 **정보량**을 계단식으로 늘린다.

WoW 레이드의 4대 매력 포인트를 목표 경험으로 삼는다.

1. **정보 해독** — 텔레그래프를 보고 대응 카드를 고른다
2. **역할 분담** — 탱커(공룡)가 맞고, 딜러(마법)가 깎고, 힐(재생)이 수습
3. **페이즈 전환의 극적 연출** — HP 임계/타이머로 패턴이 뒤집힌다
4. **공략 있는 제압감** — 무작정이 아니라 "이 보스는 이렇게 잡는다"가 성립

본 문서는 기존 카드/몬스터 CSV 구조에 **MVP로 바로 구현 가능한 것만** 담는다.
전제 시스템이 필요한 고급 기믹은 10장에 2차 개발 대기 목록으로 따로 정리한다.

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
| 보스(Boss) | 3~4 | 2~3 (최대) | 1~3턴 | 일반의 5~7배 | 레이드 전투 경험 |

---

## 2. 채택 기믹 라이브러리

MVP에 구현할 액션들. 각 ID 옆 괄호 = WoW 원형.

### 2.1 공격계

- `ATTACK` — 기본 피해 (Melee Swing)
- `MULTI_ATTACK` — 분할 타격 N회, 방어도 여러 번 깎음 (Whirlwind)
- `AOE_ATTACK` — 아군+소환사 전체 피해 (Thunderclap)
- `PIERCE_ATTACK` — 방어도 무시 (Shattering Throw)
- `CLEAVE_FRONT` — 전열 공룡 전체 피해 (Breath of Fire)
- `CLEAVE_BACK` — 후열 공룡 전체 피해 (Tail Swipe)
- `CHAIN_RANDOM` — 랜덤 타겟 N회 연쇄 (C'Thun Eye Beam)
- `EXECUTE` — 저체력(예: HP 30% 이하) 대상 큰 피해 (Execute)

### 2.2 방어/자기 보호

- `DEFEND` — 자가 방어도 (Shield Block)
- `BARRIER` — 다음 N회 피해 무효 (Ice Block)
- `REFLECT` — 피격 시 피해 반사 (Spell Reflection)
- `ABSORB` — 일정량 흡수 실드 (Power Word: Shield)

### 2.3 디버프/도트

- `POISON` — 독 N 스택 (기존 시스템)
- `BURN` — 화상, 매 턴 고정 피해 (Ignite)
- `BLEED` — 출혈, 회복량 감소 (Rend)
- `WEAK` — 공격력 감소 (Demoralizing Shout)
- `FRAIL` — 방어도 획득 감소 (Shatter)
- `VULNERABLE` — 받는 피해 증가 (Sunder Armor)
- `SILENCE` — 특정 카드 타입 봉인 (Class Call / Nefarian)

### 2.4 유틸/군중 제어

- `SUMMON` — 쫄 소환 (Adds)
- `HEAL_SELF` — 자가 회복 (Regenerate)
- `BUFF_SELF` — 자가 공격력 상승 (Frenzy)
- `DRAIN` — 아군 공룡 HP 흡수 (Lifedrain)
- `HAND_BURN` — 플레이어 핸드 랜덤 폐기 (Mana Burn)
- `COST_UP` — 다음 턴 카드 비용 +1 (Slow)
- `FEAR` — 아군 공룡 1체 1턴 행동 불가 (Fear)
- `MIND_CONTROL` — 아군 공룡 1체 1턴 적 편으로 전환 (Mind Control)

### 2.5 페이즈/시간

- `COUNTDOWN_X` — N턴 후 지정 행동 발동 (Raid Telegraph)
- `PHASE_SHIFT` — HP 임계 시 패턴셋 교체 (Phase Transition)
- `PHASE_SHIFT_TIMER` — 특정 턴 도달 시 페이즈 전환 (Time Gate)
- `ENRAGE_SOFT` — 턴마다 공격력 +1 누적 영구 (Frenzy Stacking)
- `ENRAGE_HARD` — N턴 초과 시 공격력 ×N (Berserk Timer)
- `INVULN_WHILE_ADD` — 쫄 생존 중 본체 무적 (Vashj 방어막)
- `DAMAGE_WINDOW` — 특정 조건 충족 시 본체 N턴간 피격 가능 윈도우 열림 (C'Thun 위장 입). 평소엔 본체 100% 저항/무적, 윈도우 중엔 받는 피해 ×2. 조건 예시: "촉수 N체 처치", "약점 부위 N회 타격". 윈도우 종료 시 다시 무적 복귀

---

## 3. WoW 보스 아키타입 5종 (설계 템플릿)

보스 1체 설계 시 주 아키타입 1개 + 보조 요소 1~2개 조합.

| 아키타입 | 대표 보스 | 핵심 체험 | 기믹 구성 |
|----------|-----------|-----------|-----------|
| **DPS 체크형** | Patchwerk | 화력 시험, 엔레이지 전에 잡기 | `ENRAGE_HARD` + 꾸준한 기본 피해 |
| **기믹 해독형** | C'Thun | 정보 해독 실패 = 큰 피해 | `COUNTDOWN_X` + `CHAIN_RANDOM` |
| **쫄 관리형** | Ragnaros, Vashj | 본체 딜/쫄 처리 우선순위 판단 | `SUMMON` + `INVULN_WHILE_ADD` |
| **페이즈 전환형** | Onyxia, Illidan | 국면마다 다른 싸움 | `PHASE_SHIFT` 2~3단계 + 페이즈별 고유 기믹 |
| **디버프 관리형** | Sapphiron | 스택 관리 실패 = 파멸 | `VULNERABLE`/`BLEED` 스택 + 해소 카드 요구 |

---

## 4. WoW 명장면 기믹 — 채택분 번역

MVP에 쓸 수 있는 인용 기믹만 추림.

| 원본 | 기믹 요약 | 카드게임 번역안 |
|------|-----------|------------------|
| **Patchwerk** (Naxx) | 6분 엔레이지 = DPS 체크 | 12턴 안에 못 잡으면 보스 공격력 ×3 (`ENRAGE_HARD`) |
| **Ragnaros** (MC) | 쫄 소환 + 땅속 잠수 | HP 임계 도달 시 쫄 3체 소환, 본체 2턴 무적 (`INVULN_WHILE_ADD`) |
| **Onyxia** | 지상 → 공중 → 광폭 3페이즈 | 2페이즈로 축소: 물리 → HP 40% 광폭 광역 (`PHASE_SHIFT`) |
| **C'Thun** (AQ40) | 위장 눈 광선 연쇄 | 랜덤 공룡 1체 → 다음 턴 인접 공룡 → 연쇄 (`CHAIN_RANDOM`) |
| **Nefarian** (BWL) | 직업 콜 = 직업 봉인 | "초식 공룡 봉인" 2턴 / "마법 카드 봉인" 2턴 (`SILENCE`) |
| **Illidan** (BT) | 변신하며 완전 다른 보스 | HP 50% 시 공격력·HP·패턴셋 교체 (강화된 `PHASE_SHIFT`) |
| **Kael'thas** (TK) | 4종 무기 페이즈별 획득 | 페이즈 진입 시 플레이어에게 임시 카드 1장 지급(공략 카드) |
| **Kil'jaeden** (Sunwell) | 방패 = 공격 반사 | 2턴마다 `REFLECT` 자세 진입, 공격 시 소환사에게 반사 |

---

## 5. CSV 스키마 제안

### 5.1 `enemy.csv` (기존 수정)

기존 `ai_pattern` 단일 필드 → `pattern_set_id` 참조로 변경.

```
id, name_kr, enemy_type, chapter, hp, attack, defense,
pattern_set_id, phase_set_id, gold_min, gold_max, description, image
```

- `pattern_set_id` — `enemy_pattern.csv` 참조 (필수)
- `phase_set_id` — `enemy_phase.csv` 참조 (보스만, 없으면 NULL)

### 5.2 `enemy_pattern.csv` (신규)

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
| action | 2장 라이브러리 액션 ID | ATTACK, POISON, SUMMON |
| value | 수치 (피해량/스택/수량) | 10 |
| target | 대상 | SELF, SUMMONER, ALLY_FIELD, ALL, RANDOM |
| telegraph_turns | 예고 턴 수 (0 = 즉발) | 0, 1, 2 |
| intent_icon | UI 아이콘 키 | ICON_ATTACK, ICON_AOE |
| weight | step_order=0일 때 선택 가중치 | 30 |
| condition | 발동 조건 (옵션) | HP_BELOW_50, TURN_GT_5 |
| description | 기획 메모 | "광역 2턴 예고" |

### 5.3 `enemy_phase.csv` (신규, 엘리트/보스용)

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

### 5.4 `intent_icon.csv` (신규 룩업)

```
icon_id, icon_image, color_hint, description_kr
```

기본 셋: ATTACK, DEFEND, AOE, DEBUFF, BUFF, SUMMON, COUNTDOWN, UNKNOWN.

---

## 6. 수직 슬라이스 예시 (일반/엘리트/보스 각 1체)

### 6.1 일반 몬스터 풀

**가이드**: 챕터당 3체 = 총 12체. 1기믹 원칙 (E001만 예외=0기믹 튜토리얼).
**의도**: 같은 챕터 안에서도 1기믹 종류를 다르게 펴서 **카드 학습 트랙**을 만든다.

| ID | 챕터 | 이름 | 1기믹 컨셉 | 학습 강요 카드 |
|----|------|------|------------|----------------|
| E001 | 1 | 이끼 슬라임 | **0기믹** (Intent UI 학습 전용) | 기본 ATTACK |
| E002 | 1 | 바위 슬라임 | `DEFEND` 자가 누적 (방어도 8) | 관통/디버프 |
| E003 | 1 | 독 슬라임 | `POISON` 2 부여 | 회복/방어 |
| E004 | 2 | 모래 전갈 | `BLEED` 출혈 (회복 감소) | 출혈 해소·고화력 단발 |
| E005 | 2 | 미라 졸병 | `COUNTDOWN_X` 1턴 예고 강타 12 | 대형 방어/회피 |
| E006 | 2 | 사막 도적 | `HAND_BURN` 1 (핸드 압박) | 드로우 |
| E007 | 3 | 화염 박쥐 | `BURN` 화상 부여 | 회복/정화 |
| E008 | 3 | 용암 새끼 | `BUFF_SELF` +2 누적 (조기 처치 압박) | 단발 고화력 |
| E009 | 3 | 재의 사냥꾼 | `MULTI_ATTACK` 2회 (방어도 갉기) | 두꺼운 방어/실드 |
| E010 | 4 | 시간 정령 | `COST_UP` 1회 (다음 턴 비용 +1) | 저비용 효율 카드 |
| E011 | 4 | 태초 도마뱀 | `WEAK` 약화 부여 (공격력 -2) | 비공격 유틸 |
| E012 | 4 | 균열 정찰자 | `CHAIN_RANDOM` 약공 5×2 | 전열/분산 보호 |

**대표 예시 1 — E001 이끼 슬라임 (튜토리얼 전용)**

```
PS_E001:
  step 1, phase 1, ATTACK, 10, SUMMONER, telegraph=1
  step 2, phase 1, ATTACK, 10, SUMMONER, telegraph=1
  (순환)
```

**대표 예시 2 — E003 독 슬라임 (1기믹: POISON)**

```
PS_E003:
  step 1, phase 1, ATTACK, 6, SUMMONER, telegraph=1, icon=ATTACK
  step 2, phase 1, POISON, 2, SUMMONER, telegraph=1, icon=DEBUFF
  (순환)
```

**대표 예시 3 — E005 미라 졸병 (1기믹: COUNTDOWN_X)**

```
PS_E005:
  step 1, phase 1, ATTACK, 6, SUMMONER, telegraph=1, icon=ATTACK
  step 2, phase 1, COUNTDOWN_ATTACK, 12, SUMMONER, telegraph=1, icon=COUNTDOWN  ← 1턴 예고
  step 3, phase 1, ATTACK, 6, SUMMONER, telegraph=1, icon=ATTACK
  (순환)
```

### 6.2 엘리트 몬스터 풀

**가이드**: 챕터당 2체 = 총 8체. 2기믹 원칙. 각 엘리트 = **보스 아키타입의 미니 버전**.
**의도**: "엘리트는 보스 예고편" — 같은 챕터 보스가 쓸 기믹 중 1~2개를 미리 학습시킨다.

| ID | 챕터 | 이름 | 미니 아키타입 | 기믹 A | 기믹 B | 보스 예고 |
|----|------|------|---------------|--------|--------|-----------|
| E101 | 1 | 거대 골렘 | 기믹 해독 미니 | `DEFEND` 10 자가 | 3턴째 `COUNTDOWN_ATTACK` 15 | E901 카운트다운 학습 |
| E102 | 1 | 이끼 모태 | 쫄 관리 미니 | 2턴마다 `SUMMON` 덩굴쫄 1체 | 쫄 생존 시 본체 `BUFF_SELF` +2 | E901 P2 쫄 소환 학습 |
| E201 | 2 | 사막 마법사 | 디버프 관리 미니 | `SILENCE` 1턴 (마법 봉인) | `VULNERABLE` 2스택 | E902 파라오의 저주 |
| E202 | 2 | 모래 거인 | DPS 체크 미니 | `ENRAGE_SOFT` (턴마다 +1) | 5턴째 자가 `BUFF_SELF` +5 | E904 엔레이지 학습 |
| E301 | 3 | 용암 도살자 | 포지셔닝 미니 | `CLEAVE_FRONT` 12 | 2턴마다 `REFLECT` 자세 | E903 쫄 포함 광역 학습 |
| E302 | 3 | 정령 군주 | 흡수형 미니 | `DRAIN` 6 (아군 HP 흡수 → 자가 회복) | `BURN` 부여 2 | E903 무적/회복 학습 |
| E401 | 4 | 시간 도둑 | 핸드 압박 미니 | `COST_UP` 누적 영구 | 3턴마다 `HAND_BURN` 1 | E904 P3 학습 |
| E402 | 4 | 차원 변종 | 페이즈 미니 | HP 50% 시 `PHASE_SHIFT` 1회 | 페이즈 후 `AOE_ATTACK` 8 | E904 페이즈 전환 학습 |

**대표 예시 — E101 거대 골렘 (기믹 해독 미니)**

```
PS_E101:
  step 1, phase 1, DEFEND, 10, SELF, telegraph=1, icon=DEFEND
  step 2, phase 1, ATTACK, 8, SUMMONER, telegraph=1, icon=ATTACK
  step 3, phase 1, COUNTDOWN_ATTACK, 15, SUMMONER, telegraph=2, icon=COUNTDOWN
  (순환)
```

**대표 예시 — E102 이끼 모태 (쫄 관리 미니, E901 예고)**

```
PS_E102:
  step 1, phase 1, ATTACK, 6, SUMMONER, telegraph=1, icon=ATTACK
  step 2, phase 1, SUMMON, 1, FIELD, telegraph=1, icon=SUMMON   ← 덩굴쫄 1체
  step 3, phase 1, BUFF_SELF, 2, SELF, telegraph=1, icon=BUFF, condition=ADD_ALIVE
  (순환)
```

**대표 예시 — E402 차원 변종 (페이즈 미니, E904 예고)**

```
PH_E402:
  phase 1, enter_hp=1.0, pattern=PS_E402_P1
  phase 2, enter_hp=0.5, pattern=PS_E402_P2, on_enter=AOE_ATTACK 6, trigger="형상이 일그러진다"

PS_E402_P1:
  step 1, ATTACK 9, telegraph=1
  step 2, DEFEND 6, telegraph=1

PS_E402_P2:
  step 1, AOE_ATTACK 8, telegraph=1
  step 2, ATTACK 12, telegraph=1
```

### 6.3 보스: 이끼 수호석상 (E901)

**컨셉**: 기믹 3개 + 페이즈 2단계.
**WoW 아키타입**: 페이즈 전환형(Onyxia 축소) × 쫄 관리형(Ragnaros) 하이브리드.
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
  step 3, COUNTDOWN_AOE 18, telegraph=2   ← 핵심 기믹

PS_E901_P2:
  step 1, AOE_ATTACK 10, telegraph=1
  step 2, SUMMON(이끼 덩굴 1), telegraph=1
  step 3, HAND_BURN 1 + ATTACK 8, telegraph=1
  step 4, COUNTDOWN_PIERCE 25, telegraph=2  ← 공략 핵심
```

---

## 7. Intent UI 요구사항

패턴 시스템이 의미를 가지려면 UI가 다음을 표시해야 한다.

- **현재 턴 의도**: intent_icon + value (예: ⚔️ 12)
- **카운트다운**: 남은 턴 수 뱃지 (예: ☠️ 2턴 뒤)
- **디버프 스택**: 독 4, 취약 2 등 숫자 뱃지
- **페이즈 상태**: HP 바에 페이즈 전환점 마커
- **쫄/본체 구분**: 쫄 프레임 축소, 본체는 플래그 아이콘

아트 디렉션(반투명 HUD + 심플 아이콘)과 일관성 유지.

---

## 8. 챕터 보스 4체 WoW-inspired 초안

기존 enemy.csv의 E901~E904에 WoW 보스 아키타입을 매핑한 초안.
**전제 시스템 필요 기믹은 MVP 채택 기믹으로 대체된 버전.**

### 8.0 보스 설계 4대 원칙

1. **시그니처 메커니즘**: 보스마다 그 보스에서만 발동되는 고유 규칙·UI 1개 이상.
2. **공략 다양성**: 같은 덱으로 4체 다 공략 못 하게. 보스마다 강요하는 카드 타입이 달라야.
3. **1챕터는 턴 유동성**: 카운트다운/페이즈 전환을 짧게/예고 길게. 플레이어가 페이즈 진입 타이밍을 어느 정도 조절 가능해야.

### 8.1 E901 이끼 수호석상 (1챕터) — "덩굴의 Patchwerk + 작은 Onyxia"

- **아키타입**: DPS 체크 + 단순 페이즈 전환
- **역할**: 튜토리얼 보스. **턴 유동성 강조** — 빡빡한 카운트다운 없음, 플레이어가 "지금 P2 진입해도 되겠다" 판단 가능.
- **턴 유동성 설계**:
  - P1 카운트다운은 **3턴**(짧지 않음) → 정비 턴 보장
  - P2 진입 직후 **1턴 그레이스**: 본체가 "각성 중" 상태로 행동 안 함, 그 사이 쫄 1체 정리 가능
  - 쫄 소환은 1체씩만 (한 번에 폭주 X)
- **핵심 기믹**:
  - P1: `COUNTDOWN_AOE` 12 (3턴 예고) — 광역 예고 학습
  - P2 (HP 50%): 덩굴 쫄 1체 소환 + 본체 `BUFF_SELF` +3
- **시그니처 — 덩굴 결박**: P2 진입 시 플레이어 FIELD 슬롯 **1칸**을 4턴간 덩굴로 잠금(소환 불가). 잠긴 슬롯 위 덩굴 오버레이 표시. → "어떤 슬롯을 비워둘지" 사전 판단 압박. (단순 1칸이라 학습 부담 낮음)
- **WoW 인용**: Ragnaros 쫄 소환 경감판 + Patchwerk의 명확함

### 8.2 E902 피라미드의 왕 (2챕터) — "사막의 C'Thun"

- **아키타입**: 기믹 해독형 + **DAMAGE_WINDOW 구조 (C'Thun 위장 입)**
- **역할**: 본체는 평소 무적, **촉수(쫄)를 처치해야 본체 딜 윈도우가 열린다.** 1챕터와 완전 다른 공략 흐름.
- **핵심 기믹 (재설계)**:
  - **본체 무적 + 약점 촉수 3체 동시 소환** (전투 시작 시): 모래 촉수 3체. 본체는 모든 피해 100% 저항.
  - **눈 광선** (`CHAIN_RANDOM`): 매 턴 랜덤 공룡 → 다음 턴 인접 공룡 → 연쇄 3회 (촉수가 시전)
  - **파라오의 저주** (`SILENCE`): 본체가 2턴마다 마법 카드 1턴 봉인
- **시그니처 — 위장 입 (DAMAGE_WINDOW)**:
  - 촉수 3체 모두 처치 → **본체 3턴간 피격 가능 윈도우** 개방, 받는 피해 ×2
  - UI: 본체 옆에 "촉수 3/3" 카운터, 0/3 도달 시 본체 입이 열리는 컷인
  - 윈도우 종료 시 본체가 촉수 3체 재소환 → 사이클 반복
- **WoW 인용**: C'Thun (AQ40) 위장 입 구조 그대로 + Nefarian Class Call

### 8.3 E903 화산의 군주 (3챕터) — "용암의 Ragnaros (선택권 강조)"

- **아키타입**: 쫄 관리형 + 페이즈 전환 + **플레이어 선택권**
- **역할**: 본체 딜 vs 쫄 처리 우선순위. 라그나로스의 "용암 잠수" 시간을 플레이어가 단축 가능.
- **핵심 기믹**:
  - P1: 화염탄 ATTACK 10 + 3턴마다 용암 정령 1체 소환
  - P2 (HP 60%): **용암 잠수 = 본체 `INVULN_WHILE_ADD` + 쫄 3체 소환**
  - P3 (HP 25%): 폭주 = 매 턴 `AOE_ATTACK` 8 + `ENRAGE_SOFT` +2
- **시그니처 — 잠수 시간 단축**:
  - 용암 잠수는 기본 **3턴**. 플레이어가 그 사이 쫄 3체 모두 처치 시 **즉시 본체 부상** (잠수 시간 0턴).
  - 쫄 일부만 잡으면 잠수 1턴씩 단축. 다 방치 시 3턴 + 본체 `BUFF_SELF` +5 (페널티)
  - UI: 본체 옆 "잠수 N턴" 카운트다운, 쫄 처치할 때마다 즉시 깎임
  - **선택지**: 빨리 일으켜서 P3 진입 vs P2에서 정비
- **WoW 인용**: Ragnaros 본가 + 잠수 시간이 플레이어 액션에 반응

### 8.4 E904 태초의 공룡왕 (4챕터 최종) — "공룡의 Yogg-Saron × Illidan"

- **아키타입**: 페이즈 전환형 × **고대신류 다단계 공략**
- **역할**: 모든 기믹 종합 + 보스의 정신 공간으로 들어가는 연출.
- **핵심 기믹 (4페이즈)**:
  - **P1 (100%~70%)**: 기본 광역 + 1턴 예고. 학습 구간.
  - **P2 (70%~40%)**: 공룡의 군주 쫄 3체 소환 + 쫄이 아군 공룡 1체에 `FEAR`. **DAMAGE_WINDOW 구조 — 쫄 3체 다 잡으면 본체 2턴 피격 가능**.
  - **P3 (40%~10%)**: 시간의 폭주. `COST_UP` 영구 누적 + 매 턴 작은 AOE.
  - **P4 (10%~0%, 하드 버서크)**: `ENRAGE_HARD` 공격력 ×3 + 매 턴 `COUNTDOWN_AOE` 15.
- **시그니처 — 시간 역행 (P3 진입 시 1회)**:
  - 플레이어 묘지 카드 전체를 덱으로 셔플(부활) + 본체도 HP 30% 회복
  - 양날의 칼 — 자원 회복이지만 전투 길어짐. 솔로 클리어가 더 어려워짐.
  - 컷인: "시간이 거꾸로 흐른다…"
- **시그니처 2 — 정신 공간 (P4 진입 시)**:
  - 배경 전환 + 본체 HP 게이지 옆에 "광기 게이지" 추가. P4 동안 매 턴 광기 +1, 5에 도달하면 즉시 게임오버.
  - 광기는 본체에 피해 줄 때마다 -1. → 풀 어택 강요.
- **WoW 인용**: Yogg-Saron 광기 게이지 + Illidan 변신 + Patchwerk 엔레이지

---

## 9. 작업 순서

1. **스키마 확정** — 5장 CSV 컬럼 최종 결정.
2. **Intent UI 기본형 구현** — WoW Cast Bar 스타일 텔레그래프 표시.
3. **일반 1체** — 이끼 슬라임 + 1턴 예고 기본형.
4. **엘리트 1체** — 거대 골렘 + 2턴 카운트다운.
5. **보스 1체** — 이끼 수호석상 + 페이즈 전환 + 쫄 소환.
6. **수직 슬라이스 플레이 테스트** — 턴당 정보량·난이도 곡선 점검.
7. **확장** — 검증된 스키마로 E902~E904 보스 → 일반/엘리트 몬스터 풀.

---

## 10. 전제 시스템 필요 — 2차 개발 대기 목록

**MVP에는 넣지 않지만**, 나중에 이 시스템들이 들어오면 풀 수 있는 기믹들.
각 항목은 _필요한 신규 시스템 → 잠기는 기믹 → 우선순위_ 순으로 정리.

### 10.1 해제(Dispel) 카드 / Cleanse 시스템

- **필요 시스템**:
  - 카드 풀에 "정화" 타입 신설 (디버프 제거 카드)
  - 디버프에 `dispellable` 플래그 추가
  - 해제 시 폭발 이펙트 / 사운드
- **잠긴 기믹**:
  - `CURSE_TIMED` — N턴 뒤 폭발하는 타이머 저주 (Sindragosa Mystic Buffet 경감형)
  - Dispel Demand 전반 (해제 강제 기믹)
- **우선순위**: **중** — 카드 풀 확장과 함께 자연스럽게 가능.
- **MVP 대체**: `SILENCE` + `VULNERABLE` 조합으로 유사 체험 제공 (E902 파라오의 저주).

### 10.2 부활 / 임시 사망 / 구출(Rescue) 시스템

- **필요 시스템**:
  - 공룡 "봉인/얼어붙음" 상태 (HP 0 아니지만 행동 불가)
  - N턴 내 조건 충족 시 해제 / 미달성 시 진짜 사망
  - 부활 슬롯 / 사망 카드 영역
- **잠긴 기믹**:
  - Sindragosa 얼음 무덤 (아군 구출 미션)
  - Lich King 발키르 납치
  - "쫄 처치 시 아군 부활" 보상 기믹
- **우선순위**: **하** — 시스템 복잡도 크고, 없어도 긴장감은 FEAR로 대체 가능.
- **MVP 대체**: `FEAR`로 1턴 행동 불가 (E904 P2에서 사용 중).

### 10.3 즉사 연출 / 인스턴트 데스 카운트다운

- **필요 시스템**:
  - 카운트다운 UI (크게 표시되는 위협 뱃지)
  - 실패 시 즉시 게임오버 연출 + 특수 사망 로그
- **잠긴 기믹**:
  - Algalon 빅뱅 (막지 못하면 전멸)
  - Yogg-Saron 광기 극대화 패배 조건
- **우선순위**: **하** — 최종 보스 임팩트용. `ENRAGE_HARD`로 기능적으로 대체 가능.
- **MVP 대체**: 하드 버서크로 공격력 ×3 (E904 P4).

### 10.4 필드 장판(Void Zone) / 지속 피해 구역

- **필요 시스템**:
  - FIELD에 "위험 슬롯" 개념 추가 (공룡과는 다른 레이어)
  - 매 턴 피해 틱 로직
  - 장판 지속 시간 / 중첩 규칙
- **잠긴 기믹**:
  - Ragnaros 용암 장판
  - Denathrius 핏빛 파편 (쫄 처치 시 장판 생성)
  - 환경 위험 연출 전반
- **우선순위**: **중** — 시각적 임팩트가 커서 있으면 좋지만 MVP엔 과잉.
- **MVP 대체**: `AOE_ATTACK` + `COUNTDOWN_X` 조합.

### 10.5 탱커 어그로 / Tank Swap 시스템

- **필요 시스템**:
  - 공룡별 Taunt 스탯 / 어그로 우선순위
  - 특정 공룡에게 디버프 전가 규칙
  - 대상 지정 UI (적이 누구를 보는가)
- **잠긴 기믹**:
  - Tank Swap (디버프 스택 → 탱커 교대)
  - Cleave/Tail Swipe의 진짜 포지셔닝 체감
- **우선순위**: **하** — 복잡도 대비 체감이 크지 않음. 공룡 게임 전체 설계 방향 결정 후 판단.
- **MVP 대체**: 타겟이 `SUMMONER`/`ALLY_FIELD`/`RANDOM` 중 고정 지정.

### 10.6 Interrupt Window (시전 중 취소)

- **필요 시스템**:
  - 카운트다운 중 특정 카드/조건으로 취소 가능 플래그
  - 인터럽트 전용 카드 1~2종 신설
- **잠긴 기믹**:
  - Kick/Counterspell식 취소 플레이
  - 시전 방해 우선순위 판단
- **우선순위**: **하** — 턴제에선 체감이 약함. 덱빌딩 테마에 필수 아님.
- **MVP 대체**: 없음 (제거). 취소 대신 방어/회피로 대응.

---

## 11. 오픈 이슈 (결정 필요)

- [ ] 패턴 순서: 결정적 순환 vs 가중치 랜덤 vs 혼합 — 기본값?
- [ ] 쫄 소환 시 본체 타게팅 제한 여부 (없으면 쫄 방치 플레이 가능)
- [ ] 카운트다운 실패 시 페널티 강도 (AOE 20? 30?)
- [ ] 엘리트에도 페이즈 도입할지 (HP 50% 한 번만)
- [ ] 디버프 스택 상한 (무한 누적 방지)
- [ ] `ENRAGE_HARD` 타이머를 전 보스 공통으로 둘지, 최종 보스만 둘지
- [ ] `MIND_CONTROL` 허용 범위 (플레이어 스트레스 요인 — 1턴 1체 제한 적정?)
- [ ] `INVULN_WHILE_ADD` 쫄 방치 시 본체 회복/강화 페널티 추가 여부
- [ ] `DAMAGE_WINDOW` 윈도우 중 받는 피해 배율 (×2 적정? ×3?)

> 메타 진행(테크트리)은 별도 문서 `TechTreeDesign_MVP.md`에서 관리.
- 페이즈 중 한 번이라도 공룡 소환하면 즉시 무효화 vs 기여도 비율 판정
