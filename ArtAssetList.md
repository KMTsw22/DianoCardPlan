# DianoCard 아트 에셋 리스트 — 1챕터

**아트 디렉션**: 일본 다크판타지 일러스트 (아크나이츠/그랑블루 톤, 셀쉐이딩), UI만 반투명 바 + 심플 아이콘
**원칙**: "같은 톤, 다른 그림" — 챕터 내 바리에이션은 팔레트/라이팅 통일, 그림체는 캐릭터 레퍼런스에 고정
**스타일 앵커**: CH002(금발 공룡 사냥꾼 일러스트)를 레퍼런스로 모든 배경·캐릭터 통일

---

## 배경 에셋 (1챕터 테마: 고대 숲/폐허)

### 최소 목표 (MVP, 총 7장)

| # | 용도 | 파일명(안) | 비고 |
|---|---|---|---|
| 1 | 맵 씬 (노드 트리) | `bg_chapter1_map.png` | 풀 블리드, 노드가 얹힐 공간 고려 |
| 2 | 일반 전투 A | `bg_chapter1_battle_ruins.png` | 덩굴 폐허 |
| 3 | 일반 전투 B | `bg_chapter1_battle_stairs.png` | 돌계단 폐허 |
| 4 | 일반 전투 C | `bg_chapter1_battle_forest.png` | 이끼 숲/공터 |
| 5 | 엘리트 전투 | `bg_chapter1_elite.png` | 더 어둡고 웅장한 톤 |
| 6 | 휴식 (타운) | `bg_chapter1_rest.png` | 모닥불 공터 |
| 7 | 보스 (E901 폐허군주) | `bg_chapter1_boss.png` | 폐허 왕좌의 방, 4코너 청록 도깨비불(망령 기사 wisp) |

### 권장 확장 (총 10장)

- `bg_chapter1_shop.png` — 상점 (천막/상인)
- `bg_chapter1_event.png` — 이벤트 공용
- `bg_chapter1_battle_D.png` — 일반 전투 4번째 바리에이션

### 해상도 / 스펙

- **기준 해상도**: 1920×1080 (16:9)
- **안전 영역**: 상단 80px / 하단 200px은 UI에 가려짐 (캐릭터·적 배치는 중앙 ±400px 내)
- **포맷**: PNG (알파 불필요), sRGB
- **Unity import**: Sprite (2D), 1:1 pixels per unit, Compression: High Quality

---

## 노드 아이콘 (챕터 공용)

| # | 타입 | 파일명(안) | 크기 |
|---|---|---|---|
| 1 | 일반 전투 | `node_battle.png` | 128×128 |
| 2 | 엘리트 전투 | `node_elite.png` | 128×128 |
| 3 | 상점 | `node_shop.png` | 128×128 |
| 4 | 휴식 | `node_rest.png` | 128×128 |
| 5 | 이벤트 | `node_event.png` | 128×128 |
| 6 | 보스 | `node_boss.png` | 192×192 (시각적 강조) |
| 7 | 시작점 | `node_start.png` | 128×128 |

- **상태 베리언트**: `_locked` (dim/회색), `_current` (하이라이트), `_cleared` (체크 마크)
- 또는 단일 아이콘 + Unity에서 Color/Material 조절

---

## 캐릭터 스프라이트

### CH001 초식 조련사 / CH002 육식 사냥꾼

| 상태 | 프레임 수(안) | 용도 |
|---|---|---|
| Idle | 4~6 | 전투 대기 (루프) |
| Attack | 3~4 | 카드 사용 시 (미구현) |
| Hurt | 2 | 피격 시 잠깐 |
| Victory | 1 | 전투 종료 |

- **크기**: 400~500px 세로 (1080 기준)
- **피벗**: 발 기준(0.5, 0)
- **포트레이트**: 별도 `portrait_ch001.png`, `portrait_ch002.png` (256×256, HUD·선택 화면용)

---

## 공룡 스프라이트 (필드 표시용)

각 공룡 Idle 루프 + 선택 시 하이라이트만 있으면 MVP 충족.

| ID | 이름 | 프레임(안) |
|---|---|---|
| C001 | 트리케라톱스 | Idle 4 |
| C002 | 스테고사우루스 | Idle 4 |
| C003 | 안킬로사우루스 | Idle 4 |
| C004 랩터 | T0/T1/T2 각 Idle 4 | 티어별 외형 차이 필요 |
| C005 카르노 | T0/T1/T2 각 Idle 4 | 동상 |
| C010 콤프소 | T0/T1/T2 각 Idle 4 | 동상 |

- 카드 일러스트는 별도 (`card_C001.png` 등) — 이미 Table에 파일명 지정됨

---

## UI 에셋

### HUD 바

- `hud_top_bar.png` — 상단 반투명 검정 바 (HP/골드/유물/층수)
- `hud_bottom_bar.png` — 하단 반투명 바 (손패 영역 뒤)
- `hud_energy_orb.png` — 마나 구슬 (3/3 표시)
- `hud_end_turn_btn.png` — 턴 종료 버튼 (일반/호버/비활성 3종)

### 카드 프레임 (타입별 컬러)

| 타입 | 컬러 | 파일 |
|---|---|---|
| SUMMON (공룡 소환) | 녹색/갈색 (자연) | `card_frame_summon.png` |
| MAGIC (마법) | 붉은색 | `card_frame_magic.png` |
| BUFF (버프) | 노랑/황금 | `card_frame_buff.png` |
| UTILITY (유틸) | 청록 | `card_frame_utility.png` |
| FUSION (융합의 각인) | 보라 | `card_frame_fusion.png` |
| 오염 카드 | 어두운 회색 | `card_frame_curse.png` |

### 기타

- `intent_attack.png` / `intent_defend.png` / `intent_buff.png` / `intent_debuff.png` / `intent_countdown.png`
- `buff_icon_provoke.png` (도발) / `buff_icon_regen.png` (재생) 등 상태이상 아이콘
- `target_arrow.png` — 카드 드래그 시 타겟 화살표

---

## 우선순위 (제작 순서)

| 순위 | 항목 | 이유 |
|---|---|---|
| 1 | 노드 아이콘 7종 + 맵 배경 1장 | 맵 씬 완성, 게임 흐름 확인 |
| 2 | 전투 배경 3장 (A/B/C) + 엘리트 1장 | 전투씬 반복감 해소 |
| 3 | 보스 배경 + 휴식 배경 | 챕터 완주 가능 |
| 4 | HUD 바 + 카드 프레임 | 폴리싱 (현재 텍스트 폴백) |
| 5 | 캐릭터·공룡 스프라이트 폴리싱 | 임시 에셋 대체 |

---

## 제작 메모

- 챕터 2/3는 **같은 구조 복제**, 테마만 교체 (예: 챕터2 = 얼음 동굴, 챕터3 = 용암 화산)
- 노드 아이콘·HUD·카드 프레임은 **전 챕터 공용** (챕터당 새로 만들 필요 없음)
- 배경은 레이어 분리(원경/중경/전경) 하지 말고 **1장으로 플랫하게** — 관리 부담 최소화
