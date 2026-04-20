# 몬스터 패턴 설계 — 1챕터 MVP

> 1챕터(이끼 숲) 한정 빌드용 슬림 문서. 전체 설계/타 챕터는 [MonsterPatternDesign.md](MonsterPatternDesign.md) 참고.

## 0. 목표

- **수직 슬라이스 1챕터**: 일반 3체 + 엘리트 2체 + 보스 1체로 풀 게임 루프 검증
- **WoW 레이드 감각 도입**: Intent UI(텔레그래프) + 페이즈 전환 + 쫄 관리 학습
- **카드 학습 트랙**: 같은 챕터 안에서 다른 1기믹을 펴서 카드 사용법을 단계 학습시킴

---

## 1. 설계 원칙 (1챕터 적용)

1. **모든 행동은 선예고(Telegraph)** — 1턴 전 Intent 표시. 예외: 피격 리액션.
2. **티어별 기믹 수**: 일반 1 / 엘리트 2 / 보스 3 (페이즈 2)
3. **턴 유동성 (1챕터 보스 핵심)** — 카운트다운은 짧지 않게, 페이즈 진입에 그레이스 턴 보장
4. **1기믹 다양화** — E001(0기믹 튜토리얼) → E002(방어) → E003(독)으로 학습 트랙

---

## 2. 1챕터 액션 셋 (10개)

| Action | 설명 | 사용 몬스터 |
|--------|------|-------------|
| `ATTACK` | 단일 대상 피해 | 전 몬스터 |
| `MULTI_ATTACK` | 분할 타격 N회 (방어도 갉기) | E004, E010 |
| `DEFEND` | 자가 방어도 | E002, E101, E103 |
| `POISON` | 독 N 스택 | E003, E007 |
| `WEAK` | 공격력 -2 (N턴) | E009 |
| `DRAIN` | 소환사 HP 흡수 → 자가 회복 | E006 |
| `SUMMON` | 쫄 1체 소환 | E008, E102, E901 |
| `BUFF_SELF` | 자가 공격력 +N (조건부 누적 가능) | E005, E009, E102, E103, E901 |
| `COUNTDOWN_ATTACK` | N턴 후 강타 발동 | E101 |
| `COUNTDOWN_AOE` | N턴 후 광역 발동 | E901 |

> `BLEED`/`BURN`/`DAMAGE_WINDOW`/`ENRAGE_HARD`/`SILENCE` 등은 **2챕터 이후**.

---

## 3. Intent UI 요구사항

- **현재 턴 의도**: intent_icon + value (예: ⚔️ 10)
- **카운트다운 뱃지**: 남은 턴 수 (예: ☠️ 2턴 뒤)
- **디버프 스택**: 독 N 숫자 뱃지
- **HP 바 페이즈 마커**: 보스 50% 위치에 마커
- **쫄/본체 구분**: 쫄 프레임 축소

---

## 4. CSV 스키마

### 4.1 `enemy.csv`

```
id, name_kr, enemy_type, chapter, hp, attack, defense,
pattern_set_id, phase_set_id, gold_min, gold_max, description, image
```

- `pattern_set_id` 필수
- `phase_set_id` 보스만 (E901), 나머진 NULL

### 4.2 `enemy_pattern.csv`

```
pattern_set_id, step_order, phase, action, value, target,
telegraph_turns, intent_icon, weight, condition, description
```

- `step_order` ≥ 1: 결정적 순환 / 0: 가중치 랜덤
- `target`: SELF / SUMMONER / ALLY_FIELD / ALL / RANDOM / FIELD

### 4.3 `enemy_phase.csv` (보스 전용)

```
phase_set_id, phase, enter_hp_ratio, pattern_set_id,
on_enter_action, on_enter_value, trigger_text
```

### 4.4 `intent_icon.csv`

기본 셋: ATTACK, DEFEND, AOE, DEBUFF, BUFF, SUMMON, COUNTDOWN.

---

## 5. 1챕터 라인업

### 5.1 일반 (10체) — STS Act 1 패리티

**의도**: 같은 챕터 안에서도 1기믹 종류를 펴서 카드 학습 트랙을 만든다.
**조우 풀 분리** (STS 방식): E001~E003은 "쉬움 풀"(첫 3 조우), E004~E010은 "어려움 풀".

| ID | 이름 | 1기믹 | HP | 학습 강요 카드 | 풀 |
|----|------|-------|----|----------------|----|
| E001 | 이끼 슬라임 | 0기믹 (Intent UI 학습) | 낮음 | 기본 ATTACK | 쉬움 |
| E002 | 바위 슬라임 | `DEFEND` 자가 누적 | 중간 | 관통/디버프 | 쉬움 |
| E003 | 독 슬라임 | `POISON` 부여 | 중간 | 회복/방어 | 쉬움 |
| E004 | 가시 덩굴 | `MULTI_ATTACK` 3×2 (방어도 갉기) | 중간 | 두꺼운 단발 실드 | 어려움 |
| E005 | 발광 버섯 | `BUFF_SELF` +2 매 턴 누적 (조기 처치 압박) | 낮음 | 단발 고화력 | 어려움 |
| E006 | 이끼 거머리 | `DRAIN` 4 (소환사 HP 흡수→자가 회복) | 중간 | 회복/실드 | 어려움 |
| E007 | 늪지 두꺼비 | `POISON` + `ATTACK` 멀티스텝 | 중간 | 정화/회복 콤보 | 어려움 |
| E008 | 뿌리 정령 | `SUMMON` 약쫄 1체 + 약공 | 중간 | 광역 처리 | 어려움 |
| E009 | 짖는 늑대 | `WEAK` 부여 + `ATTACK` | 낮음 | 비공격 유틸/회피 | 어려움 |
| E010 | 어둠 박쥐 | `MULTI_ATTACK` 2×3 (작은 타격 자주) | 낮음 | 다중 실드/회피 | 어려움 |

**E001 이끼 슬라임 (쉬움)**
```
PS_E001:
  step 1, phase 1, ATTACK, 10, SUMMONER, telegraph=1
  step 2, phase 1, ATTACK, 10, SUMMONER, telegraph=1
  (순환)
```

**E002 바위 슬라임 (쉬움)**
```
PS_E002:
  step 1, phase 1, DEFEND, 8, SELF, telegraph=1, icon=DEFEND
  step 2, phase 1, ATTACK, 8, SUMMONER, telegraph=1, icon=ATTACK
  (순환)
```

**E003 독 슬라임 (쉬움)**
```
PS_E003:
  step 1, phase 1, ATTACK, 6, SUMMONER, telegraph=1, icon=ATTACK
  step 2, phase 1, POISON, 2, SUMMONER, telegraph=1, icon=DEBUFF
  (순환)
```

**E004 가시 덩굴 (어려움)**
```
PS_E004:
  step 1, phase 1, MULTI_ATTACK, 3, SUMMONER, telegraph=1, icon=ATTACK, count=2   ← 3×2
  step 2, phase 1, ATTACK, 7, SUMMONER, telegraph=1, icon=ATTACK
  (순환)
```

**E005 발광 버섯 (어려움)**
```
PS_E005:
  step 1, phase 1, BUFF_SELF, 2, SELF, telegraph=1, icon=BUFF   ← 매 턴 누적
  step 2, phase 1, ATTACK, 5, SUMMONER, telegraph=1, icon=ATTACK   ← 시작은 약하지만 점점 강해짐
  (순환)
```

**E006 이끼 거머리 (어려움)**
```
PS_E006:
  step 1, phase 1, ATTACK, 5, SUMMONER, telegraph=1, icon=ATTACK
  step 2, phase 1, DRAIN, 4, SUMMONER, telegraph=1, icon=DEBUFF   ← HP 4 흡수
  (순환)
```

**E007 늪지 두꺼비 (어려움)**
```
PS_E007:
  step 1, phase 1, POISON, 1, SUMMONER, telegraph=1, icon=DEBUFF
  step 2, phase 1, ATTACK, 5, SUMMONER, telegraph=1, icon=ATTACK
  step 3, phase 1, ATTACK, 5, SUMMONER, telegraph=1, icon=ATTACK
  (순환)
```

**E008 뿌리 정령 (어려움)**
```
PS_E008:
  step 1, phase 1, SUMMON, 1, FIELD, telegraph=1, icon=SUMMON   ← 작은 뿌리 1체
  step 2, phase 1, ATTACK, 4, SUMMONER, telegraph=1, icon=ATTACK
  step 3, phase 1, ATTACK, 4, SUMMONER, telegraph=1, icon=ATTACK
  (순환, SUMMON은 쫄 사망 시에만 재시전 — condition=ADD_DEAD)
```

**E009 짖는 늑대 (어려움)**
```
PS_E009:
  step 1, phase 1, WEAK, 1, SUMMONER, telegraph=1, icon=DEBUFF   ← 1턴 약화
  step 2, phase 1, ATTACK, 6, SUMMONER, telegraph=1, icon=ATTACK
  (순환)
```

**E010 어둠 박쥐 (어려움)**
```
PS_E010:
  step 1, phase 1, MULTI_ATTACK, 2, SUMMONER, telegraph=1, icon=ATTACK, count=3   ← 2×3
  step 2, phase 1, DEFEND, 4, SELF, telegraph=1, icon=DEFEND
  (순환)
```

### 5.2 엘리트 (3체) — STS Act 1 패리티

E101/E102는 **E901 보스의 미니 버전**(보스 예고편). E103은 별개의 도전 결.

| ID | 이름 | 미니 아키타입 | 기믹 A | 기믹 B | 의도 |
|----|------|---------------|--------|--------|------|
| E101 | 거대 골렘 | 기믹 해독 미니 | `DEFEND` 10 자가 | 3턴째 `COUNTDOWN_ATTACK` 15 | E901 카운트다운 학습 |
| E102 | 이끼 모태 | 쫄 관리 미니 | 2턴마다 `SUMMON` 1체 | 쫄 생존 시 본체 `BUFF_SELF` +2 | E901 P2 쫄 소환 학습 |
| E103 | 이끼 쌍둥이 | 다중 본체 (Sentries형) | 2체 동시, 같은 패턴 | 1체 사망 시 다른 1체 `BUFF_SELF` +4 영구 | "동시 처치" 우선순위 학습 |

**E101 거대 골렘**
```
PS_E101:
  step 1, phase 1, DEFEND, 10, SELF, telegraph=1, icon=DEFEND
  step 2, phase 1, ATTACK, 8, SUMMONER, telegraph=1, icon=ATTACK
  step 3, phase 1, COUNTDOWN_ATTACK, 15, SUMMONER, telegraph=2, icon=COUNTDOWN
  (순환)
```

**E102 이끼 모태**
```
PS_E102:
  step 1, phase 1, ATTACK, 6, SUMMONER, telegraph=1, icon=ATTACK
  step 2, phase 1, SUMMON, 1, FIELD, telegraph=1, icon=SUMMON   ← 덩굴쫄 1체
  step 3, phase 1, BUFF_SELF, 2, SELF, telegraph=1, icon=BUFF, condition=ADD_ALIVE
  (순환)
```

**E103 이끼 쌍둥이** — 2체(E103a / E103b) 동시 등장, 각 HP는 단일 엘리트의 절반
```
PS_E103 (양쪽 동일):
  step 1, phase 1, ATTACK, 6, SUMMONER, telegraph=1, icon=ATTACK
  step 2, phase 1, DEFEND, 4, SELF, telegraph=1, icon=DEFEND
  (순환)

ON_DEATH 트리거 (E103a/E103b 어느 쪽이든 사망 시):
  생존한 다른 1체에 BUFF_SELF +4 영구 (격노)
  → "둘을 비슷한 HP로 맞추고 같은 턴에 마무리"가 최적해
```

> ON_DEATH 트리거는 `enemy_pattern.csv`의 `condition` 필드로 표현 (`condition=ON_PARTNER_DEATH`).

### 5.3 보스: E901 이끼 수호석상

> ⚠ **최신 설계는 [MonsterPatternSummary_MVP.md § E901](MonsterPatternSummary_MVP.md#e901-이끼-수호석상) 참조.**
> 아래 내용은 초안(2페이즈 단순형)이며 현재 Summary 문서의 3페이즈 설계(이끼 쌍 보호막 → 공룡 강탈 → 거대화)가 권위적 스펙. CSV/구현은 Summary 기준으로 맞출 것.

**컨셉**: 1챕터 튜토리얼 보스. **턴 유동성 강조** — 빡빡한 카운트다운 없음.

**턴 유동성 설계**
- P1 카운트다운은 **3턴**(짧지 않음) → 정비 턴 보장
- P2 진입 직후 **1턴 그레이스**: 본체가 "각성 중" 상태로 행동 안 함, 그 사이 쫄 1체 정리 가능
- 쫄 소환은 1체씩 (한 번에 폭주 X)

**핵심 기믹**
- P1 (HP 100~50%): `COUNTDOWN_AOE` 12 (3턴 예고) — 광역 예고 학습
- P2 (HP 50~0%): 덩굴 쫄 1체 소환 + 본체 `BUFF_SELF` +3

**시그니처 — 덩굴 결박**
- P2 진입 시 플레이어 FIELD 슬롯 **1칸**을 4턴간 덩굴로 잠금 (소환 불가)
- 잠긴 슬롯 위 덩굴 오버레이 표시
- "어떤 슬롯을 비워둘지" 사전 판단 압박. 단순 1칸이라 학습 부담 낮음

**패턴 정의**
```
PH_E901:
  phase 1, enter_hp=1.0, pattern=PS_E901_P1, trigger="석상이 움직인다"
  phase 2, enter_hp=0.5, pattern=PS_E901_P2,
    on_enter=LOCK_SLOT(1, 4) + GRACE_TURN(1) + SUMMON(덩굴쫄 1),
    trigger="덩굴이 폭주한다!"

PS_E901_P1:
  step 1, ATTACK 10, telegraph=1, icon=ATTACK
  step 2, DEFEND 12, telegraph=1, icon=DEFEND
  step 3, COUNTDOWN_AOE 12, telegraph=3, icon=COUNTDOWN   ← 핵심 기믹 (3턴 예고)
  step 4, ATTACK 10, telegraph=1, icon=ATTACK
  (순환)

PS_E901_P2:
  step 1, ATTACK 12, telegraph=1, icon=ATTACK
  step 2, SUMMON 1, FIELD, telegraph=1, icon=SUMMON   ← 덩굴쫄
  step 3, BUFF_SELF 3, SELF, telegraph=1, icon=BUFF
  step 4, COUNTDOWN_AOE 15, telegraph=2, icon=COUNTDOWN
  (순환)
```

---

## 6. 메타 진행 (테크트리)

메타 진행은 별도 문서 [`TechTreeDesign_MVP.md`](TechTreeDesign_MVP.md) 참고.

---

## 7. 작업 순서

### 7.1 인프라 (선행)
1. **CSV 스키마 확정** — 4장 컬럼 최종 결정
2. **Intent UI 기본형** — 텔레그래프 표시, 카운트다운 뱃지, 디버프 스택, 페이즈 마커
3. **조우 풀 분리 로직** — 쉬움 풀(첫 3 조우) / 어려움 풀 (STS 방식)

### 7.2 쉬움 풀 일반 (Intent UI 검증)
4. **E001 이끼 슬라임** — 0기믹 + Intent UI 동작 검증
5. **E002 바위 슬라임** — DEFEND 액션
6. **E003 독 슬라임** — POISON 액션

### 7.3 어려움 풀 일반 (액션 라이브러리 확장)
7. **E004 가시 덩굴** — MULTI_ATTACK 액션 신규
8. **E005 발광 버섯** — BUFF_SELF 누적
9. **E006 이끼 거머리** — DRAIN 액션 신규
10. **E007 늪지 두꺼비** — POISON+ATTACK 멀티스텝 패턴
11. **E008 뿌리 정령** — SUMMON + 조건부 재시전
12. **E009 짖는 늑대** — WEAK 액션 신규
13. **E010 어둠 박쥐** — MULTI_ATTACK 변형

### 7.4 엘리트 (보스 예고편)
14. **E101 거대 골렘** — 카운트다운 + 자가 방어
15. **E102 이끼 모태** — 쫄 소환 + 조건부 BUFF
16. **E103 이끼 쌍둥이** — 다중 본체 + ON_PARTNER_DEATH 트리거

### 7.5 보스
17. **E901 이끼 수호석상** — 페이즈 전환 + 덩굴 결박 시그니처(LOCK_SLOT) + 그레이스 턴

### 7.6 검증
18. **수직 슬라이스 플레이 테스트** — 턴당 정보량/난이도 곡선/조우 분포 점검

---

## 8. 1챕터 오픈 이슈

- [ ] E901 P2 그레이스 턴 길이 (1턴? 2턴?)
- [ ] 덩굴 결박 4턴 적정성 — P2 길이 대비 너무 길면 답답함
- [ ] 쫄 소환 시 본체 타게팅 제한 여부
- [ ] 카운트다운 실패 시 페널티 강도 (현재 AOE 12, 더 세야 하나?)
- [ ] 패턴 순서 기본값: 결정적 순환 vs 가중치 랜덤
