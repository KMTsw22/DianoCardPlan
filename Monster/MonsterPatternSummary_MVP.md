# 1챕터 MVP 몬스터 패턴 요약

> 상세 설계는 [MonsterPatternDesign_MVP.md](MonsterPatternDesign_MVP.md) 참고.

---

## 일반 몬스터 (쉬움 풀)

### E001 이끼 슬라임
**한줄 요약**: 매 턴 10 피해만 반복하는 튜토리얼용 몬스터. Intent UI(다음 턴 행동 예고) 읽는 법을 학습시키는 0기믹.
**행동 흐름**: 때린다 → 때린다 → 때린다 (무한 반복)
```
PS_E001:
  step 1, phase 1, ATTACK, 10, SUMMONER, telegraph=1
  step 2, phase 1, ATTACK, 10, SUMMONER, telegraph=1
  (순환)
```

### E002 바위 슬라임
**한줄 요약**: 한 턴은 단단한 껍질로 방어, 다음 턴은 묵직하게 한 방. 방어도를 깎지 못하면 때린 만큼 손해.
**행동 흐름**: 방어 쌓기(8) → 공격(8) → 방어 쌓기 → 공격 (번갈아)
**학습 강요**: 관통/디버프 카드의 가치를 알려줌.
```
PS_E002:
  step 1, phase 1, DEFEND, 8, SELF, telegraph=1, icon=DEFEND
  step 2, phase 1, ATTACK, 8, SUMMONER, telegraph=1, icon=ATTACK
  (순환)
```

### E003 독 슬라임
**한줄 요약**: 직접 피해는 약하지만 독을 누적시켜 장기전에서 무너뜨림. 빠르게 처치하거나 디버프 정화가 필요.
**행동 흐름**: 공격(6) → 독 부여(2 스택) → 공격 → 독 부여 (번갈아)
**학습 강요**: 회복·방어·정화의 필요성.
```
PS_E003:
  step 1, phase 1, ATTACK, 6, SUMMONER, telegraph=1, icon=ATTACK
  step 2, phase 1, POISON, 2, SUMMONER, telegraph=1, icon=DEBUFF
  (순환)
```

---

## 일반 몬스터 (어려움 풀)

### E004 가시 덩굴
**한줄 요약**: 3 피해를 2번 꽂아넣는 분할타(3×2)로 얇은 실드를 순식간에 갉아먹음. 단발 고방어일수록 불리.
**행동 흐름**: 분할타(3×2=총6) → 단일 공격(7) → 다시 분할타 (번갈아)
**학습 강요**: 두꺼운 단발 실드 1장보다, 멀티히트를 감안한 방어 구성.
```
PS_E004:
  step 1, phase 1, MULTI_ATTACK, 3, SUMMONER, telegraph=1, icon=ATTACK, count=2   ← 3×2
  step 2, phase 1, ATTACK, 7, SUMMONER, telegraph=1, icon=ATTACK
  (순환)
```

### E005 발광 버섯
**한줄 요약**: 매 턴 자기 공격력 +2씩 영구 누적. HP는 낮지만 내버려두면 감당 안 되는 딜러가 됨 — 조기 처치 압박.
**행동 흐름**: 공격력 +2 버프 → 공격(5, 다음엔 7, 그 다음엔 9…) 반복
**학습 강요**: 단발 고화력으로 빨리 끝내는 플레이.
```
PS_E005:
  step 1, phase 1, BUFF_SELF, 2, SELF, telegraph=1, icon=BUFF   ← 매 턴 누적
  step 2, phase 1, ATTACK, 5, SUMMONER, telegraph=1, icon=ATTACK   ← 시작은 약하지만 점점 강해짐
  (순환)
```

### E006 이끼 거머리
**한줄 요약**: 피해를 주면서 HP 4씩 빨아먹어 자가 회복. 오래 끌면 결국 체력 소모전에서 짐.
**행동 흐름**: 공격(5) → HP 흡수(4) → 공격 → 흡수 (번갈아)
**학습 강요**: 회복·실드로 흡수량을 상쇄하거나 빠르게 처치.
```
PS_E006:
  step 1, phase 1, ATTACK, 5, SUMMONER, telegraph=1, icon=ATTACK
  step 2, phase 1, DRAIN, 4, SUMMONER, telegraph=1, icon=DEBUFF   ← HP 4 흡수
  (순환)
```

### E007 늪지 두꺼비
**한줄 요약**: 독을 먼저 깔고 연속 공격 2번. 독 상태에서 맞으면 체감 피해가 훅 커짐 — 정화·회복 타이밍 시험.
**행동 흐름**: 독 부여(1) → 공격(5) → 공격(5) → 반복
**학습 강요**: 정화+회복 콤보의 가치.
```
PS_E007:
  step 1, phase 1, POISON, 1, SUMMONER, telegraph=1, icon=DEBUFF
  step 2, phase 1, ATTACK, 5, SUMMONER, telegraph=1, icon=ATTACK
  step 3, phase 1, ATTACK, 5, SUMMONER, telegraph=1, icon=ATTACK
  (순환)
```

### E008 뿌리 정령
**한줄 요약**: 쫄(작은 뿌리) 1체를 깔고 본체는 뒤에서 쏘는 소환형. 쫄이 죽어야만 다시 소환 → 광역기로 한 번에 쓸고 본체에 집중.
**행동 흐름**: 쫄 소환(1체) → 공격(4) → 공격(4) → (쫄이 살아있으면 바로 공격 루프, 죽으면 다시 소환)
**학습 강요**: 광역 처리 카드의 가치.
```
PS_E008:
  step 1, phase 1, SUMMON, 1, FIELD, telegraph=1, icon=SUMMON   ← 작은 뿌리 1체
  step 2, phase 1, ATTACK, 4, SUMMONER, telegraph=1, icon=ATTACK
  step 3, phase 1, ATTACK, 4, SUMMONER, telegraph=1, icon=ATTACK
  (순환, SUMMON은 쫄 사망 시에만 재시전 — condition=ADD_DEAD)
```

### E009 짖는 늑대
**한줄 요약**: 울부짖어 플레이어 공격력을 1턴간 -2로 꺾은 뒤 물어뜯음. 무작정 때리는 덱이 가장 괴롭고, 비공격 유틸/회피 덱은 편함.
**행동 흐름**: WEAK(약화 1턴) → 공격(6) → 다시 WEAK → 공격 (번갈아)
**학습 강요**: 공격 외 대안(유틸/회피).
```
PS_E009:
  step 1, phase 1, WEAK, 1, SUMMONER, telegraph=1, icon=DEBUFF   ← 1턴 약화
  step 2, phase 1, ATTACK, 6, SUMMONER, telegraph=1, icon=ATTACK
  (순환)
```

### E010 어둠 박쥐
**한줄 요약**: 2 피해를 3번 꽂는 잔타(2×3) + 자가 방어. 작은 히트를 여러 번 흘리므로 실드 스택형에 강함, 다중 실드/회피에 약함.
**행동 흐름**: 분할타(2×3=총6) → 자가 방어(4) → 다시 분할타 (번갈아)
**학습 강요**: 잔타 대응(다중 실드·회피).
```
PS_E010:
  step 1, phase 1, MULTI_ATTACK, 2, SUMMONER, telegraph=1, icon=ATTACK, count=3   ← 2×3
  step 2, phase 1, DEFEND, 4, SELF, telegraph=1, icon=DEFEND
  (순환)
```

---

## 엘리트

### E101 거대 골렘
**한줄 요약**: 방어 쌓기 + 기본 공격을 반복하다가, 3턴째 "3턴 뒤 15 피해" 카운트다운을 예고하는 보스 카운트다운의 미니 버전.
**행동 흐름**: 방어(10) → 공격(8) → 카운트다운 공격(15, 2턴 뒤 발동) → 반복
**의도**: E901 보스의 COUNTDOWN_AOE 대응 연습.
```
PS_E101:
  step 1, phase 1, DEFEND, 10, SELF, telegraph=1, icon=DEFEND
  step 2, phase 1, ATTACK, 8, SUMMONER, telegraph=1, icon=ATTACK
  step 3, phase 1, COUNTDOWN_ATTACK, 15, SUMMONER, telegraph=2, icon=COUNTDOWN
  (순환)
```

### E102 이끼 모태
**한줄 요약**: 2턴마다 쫄을 하나씩 깔고, 쫄이 살아있으면 본체가 점점 강해짐(+2 누적). 쫄 관리가 곧 DPS 통제 — 보스 P2의 미니 버전.
**행동 흐름**: 공격(6) → 쫄 소환(덩굴 1체) → 쫄 생존 시 본체 공격력 +2 → 반복
**의도**: E901 P2 쫄 소환 학습.
```
PS_E102:
  step 1, phase 1, ATTACK, 6, SUMMONER, telegraph=1, icon=ATTACK
  step 2, phase 1, SUMMON, 1, FIELD, telegraph=1, icon=SUMMON   ← 덩굴쫄 1체
  step 3, phase 1, BUFF_SELF, 2, SELF, telegraph=1, icon=BUFF, condition=ADD_ALIVE
  (순환)
```

### E103 이끼 쌍둥이
**한줄 요약**: 똑같이 생긴 2체가 동시에 등장. 한쪽을 먼저 죽이면 남은 쪽이 영구 +4 격노 → "둘을 비슷한 HP로 깎아 같은 턴에 마무리"가 정답인 우선순위 퍼즐.
**행동 흐름**: 양쪽 모두 공격(6) → 방어(4) 반복. 한 쪽이 먼저 죽으면 나머지가 격노.
**의도**: 타깃 우선순위·동시 처치 학습.
```
PS_E103 (양쪽 동일):
  step 1, phase 1, ATTACK, 6, SUMMONER, telegraph=1, icon=ATTACK
  step 2, phase 1, DEFEND, 4, SELF, telegraph=1, icon=DEFEND
  (순환)

ON_DEATH 트리거 (E103a/E103b 어느 쪽이든 사망 시):
  생존한 다른 1체에 BUFF_SELF +4 영구 (격노)
  → condition=ON_PARTNER_DEATH
```

---

## 보스

### E901 이끼 수호석상
**한줄 요약**: 이끼 보호막(P1) → 이끼 공격 가담 + 공룡 강탈(P2) → 이끼 흡수 거대화(P3) 로 이어지는 3페이즈 보스. 각 페이즈마다 압박 축이 바뀌어 플레이어는 **광역 처리(P1) → 광역+정화(P2) → DPS 체크(P3)** 순으로 요구되는 덱 운용이 달라진다.

**핵심 룰**
- **이끼 보호막 (P1/P2)**: 이끼가 필드에 1체라도 남아있으면 본체 타겟 불가. 본체는 플레이어를 공격할 수 있지만, 플레이어는 본체를 때리지 못함 → 이끼부터 치워야 함. P3에서 이끼가 흡수돼 사라지면 보호막 해제.
- **이끼 리필**: 본체가 주기적으로 죽은 이끼 수만큼 재소환 (쌍 유지, 각 타입 1체씩 최대 2체). P3부터는 리필 중단.
- **이끼 쫄 2종** (역할 분담):
  - **M_HEX 저주 이끼** — HP 7. P1은 자가 `BUFF_SELF +1` 누적(딜 불발), P2는 플레이어에 `WEAK 1` 부여.
  - **M_FANG 독니 이끼** — HP 5. P1은 IDLE (방벽), P2는 `ATTACK 8` 고화력 직타.
  - "약화 쌓이는 디버퍼 먼저 칠까, 고딜 어택커 먼저 칠까" — 매 턴 우선순위 판단.
- **공룡 강탈 (P2/P3)**: 본체가 플레이어 필드의 공룡 1체를 빼앗아 적 편으로 돌림 (HP·공격 보존, 최소 5 공격). **정화(`C107`) 카드로 되돌릴 수 있음** — 정화는 빼앗긴 공룡 전원 필드 복귀 + 플레이어 독/약화 해제.
- **거대화 (P3 전용)**: 살아있던 이끼 전원 즉사 + 본체 **ATK +10 고정, 매 턴 방어도 +8 고정**(영구 장갑 — 매 턴 시작 시 자동 리프레시), 보호막 해제, **이중 행동(턴당 2회 액션)** 활성화.

**페이즈 구성**

| 페이즈 | HP 구간 | 이끼 | 본체 행동 | 포인트 |
|--------|---------|------|-----------|--------|
| **P1 수호** | 100~70% | M_HEX + M_FANG 쌍 (HEX만 자가버프, FANG IDLE), 3턴 주기 리필 | 리필 → 카운트다운(3턴 예고) → 자가 버프 | 이끼 보호 기믹 학습 |
| **P2 분노** | 70~30% | HEX: `WEAK 1`/턴, FANG: `ATTACK 8`/턴. 2턴 주기 쌍 리필 | 리필 → 공룡 강탈 → 카운트다운(2턴 예고) → 직타 | 광역·단일·정화 동시 압박 |
| **P3 거대화** | 30~0% | 전원 흡수돼 사라짐, 리필 없음 | **이중 행동**: 강타·카운트다운·강탈을 턴당 2개씩 | 마지막 DPS 체크 |

**페이즈별 흐름**

- **P1 수호 (HP 100~70%)**: 석상이 진입 즉시 M_HEX + M_FANG 쌍을 세움. FANG은 방벽 역할(IDLE), HEX는 자가 버프 누적(방치하면 P2 진입 후 더 무서워짐). 본체는 `COUNTDOWN_AOE 20`(3턴 예고) — 이끼 쌍을 치워야 본체 딜 윈도우 열림.
- **P2 분노 (HP 70~30%)**: "석상이 분노한다!" 트리거. 이끼 역할 각성 — HEX가 매 턴 플레이어에 `WEAK 1`, FANG이 `ATTACK 8` 직타(총 8/턴 + 약화 누적). 쌍 리필 주기 단축(3턴→2턴), 본체가 **공룡 강탈** 시작 → 필드 공룡이 적 편으로 합류. 카운트다운 예고도 2턴으로 짧아져 대응 여유 축소.
- **P3 거대화 (HP 30~0%)**: "이끼가 모여 석상과 하나가 된다!" — 남은 이끼 전원 흡수, 본체가 ATK 대폭 상승 + HP 회복 + 보호막 해제. **턴당 2회 행동**으로 직타·카운트다운·강탈을 빠르게 찍어내는 마무리 페이즈. 이끼 필터가 없으니 본체는 항상 타격 가능 — 순수한 딜/탱/힐 밸런스 승부.

**패턴 정의**
```
PH_E901:
  phase 1, enter_hp=1.0, pattern=PS_E901_P1,
    on_enter=SUMMON_MOSS_PAIR + SET_PROTECTED:1,
    trigger="석상이 이끼로 자신을 감싼다"
  phase 2, enter_hp=0.7, pattern=PS_E901_P2,
    on_enter=REFILL_MOSS_PAIR + SET_MOSS_AGGRESSIVE:1 + GRACE_TURN:1,
    trigger="석상이 분노한다 — 이끼가 깨어난다!"
  phase 3, enter_hp=0.3, pattern=PS_E901_P3,
    on_enter=ABSORB_MOSS:1 + ENABLE_DUAL_ACTION:1 + GRACE_TURN:1,
    trigger="이끼가 모여 석상과 하나가 된다 — 거대화!"

-- 이끼 쫄 타입 2종 (항상 쌍으로 등장/리필, 죽은 쪽만 채움):
   · M_HEX (저주 이끼):   HP 7 / 방어 0 / P1 SELF `BUFF_SELF 1` 누적 / P2 플레이어에 `WEAK 1` 부여 (누적)
   · M_FANG (독니 이끼): HP 5 / 방어 0 / P1 IDLE (방벽) / P2 `ATTACK 8` 고화력 직타
   → 우선 처치 선택 (어택커 먼저? 디버퍼 먼저?)이 매 턴 판단 포인트.
-- SUMMON_MOSS_PAIR / REFILL_MOSS_PAIR: 각각 1체씩 최대 유지, 죽은 쪽만 재소환.
-- P3 ABSORB_MOSS: 살아있는 이끼 전원 즉사 + 본체 ATK +10 / extraBlockPerTurn +8 (매 턴 자동 방어도 8 리프레시), 보호막 OFF.
-- P3 ENABLE_DUAL_ACTION: 본체가 1턴에 2회 행동 (RollIntent→Execute 루프가 2번).

PS_E901_P1  (3스텝 순환, 이끼 쌍 유지, 리필 주기 3턴)
  step 1, REFILL_MOSS_PAIR,  FIELD,      telegraph=1, icon=SUMMON
  step 2, COUNTDOWN_AOE 20,  ALL,        telegraph=3, icon=COUNTDOWN
  step 3, BUFF_SELF 3,       SELF,       telegraph=1, icon=BUFF

PS_E901_P2  (4스텝 순환, 이끼 쌍 유지, 공격화)
  step 1, REFILL_MOSS_PAIR,  FIELD,      telegraph=1, icon=SUMMON
  step 2, STEAL_SUMMON 1,    ALLY_FIELD, telegraph=1, icon=DEBUFF    ← ⚠ 공룡 강탈
  step 3, COUNTDOWN_AOE 25,  ALL,        telegraph=2, icon=COUNTDOWN
  step 4, ATTACK 18,         SUMMONER,   telegraph=1, icon=ATTACK

PS_E901_P3  (4스텝 순환, 이끼 없음, 턴당 2회 행동)
  step 1, ATTACK 22,         SUMMONER,   telegraph=1, icon=ATTACK    ← 강화 직타
  step 2, COUNTDOWN_AOE 30,  ALL,        telegraph=2, icon=COUNTDOWN
  step 3, STEAL_SUMMON 1,    ALLY_FIELD, telegraph=1, icon=DEBUFF    ← 강탈 지속
  step 4, ATTACK 22,         SUMMONER,   telegraph=1, icon=ATTACK
  (dual action으로 1턴에 2스텝씩 진행 → 사실상 2턴에 4스텝 = P2보다 2배 템포)

  ※ 정화(C107)는 P3에서도 유효 — 빼앗긴 공룡 전원 회수.
```

**플레이어 체감 타임라인 요약**
- *P1*: 이끼 리필→광역 예고→버프 반복. 여유 있는 튜토리얼 템포.
- *P2*: 리필→강탈→광역→직타. 이끼도 때리고 광역도 막고 정화도 써야 함. 바빠짐.
- *P3*: 강타+광역이 한 턴에 동시 날아오고, 틈틈이 강탈. 이끼 보호막은 없지만 본체 공격력이 크게 올라 바로 때려야 살아남음.
