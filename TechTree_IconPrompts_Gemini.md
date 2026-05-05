# DianoCard TechTree — Gemini Icon Generation Prompts

## 핵심 원칙: 계열 일관성 전략

같은 브랜치 아이콘이 따로 놀지 않도록 **앵커 이미지 방식** 사용:

1. 각 브랜치의 **Anchor(첫 번째 아이콘)를 먼저 생성**
2. 그 결과물을 Gemini 대화에 이미지로 첨부
3. 나머지 아이콘은 "**이 이미지와 완전히 동일한 스타일로**" 명시하고 생성

> Gemini에서 이미지 첨부: 대화창에 생성된 앵커 이미지를 드래그해서 올린 뒤 프롬프트 입력

---

## 출력 사양 (모든 아이콘 공통)

- 크기: **256×256 px**
- 배경: **완전 투명 (transparent PNG)**
- 헥사곤 프레임 없음 — 심볼만
- 텍스트 없음

---

## 전체 공통 베이스 프롬프트 (모든 프롬프트 맨 앞에 붙임)

```
Single game UI skill icon, flat vector style with subtle anime cel-shading,
bold clean silhouette, centered on pure transparent background,
thin bright rim light on edges, soft inner glow, no hexagon frame,
no text, no border, symbol only, 256x256, transparent PNG,
dark fantasy game aesthetic, line weight consistent 3-4px strokes
```

---

## ROOT 노드

**파일명:** `icon_root.png`  
**생성 순서:** 가장 먼저 생성 (다른 노드의 기준점)

### 프롬프트

```
[공통 베이스 프롬프트]

Central origin crystal: upright amethyst gem shard, symmetrical faceted shape,
deep purple #9B59B6 body, bright violet #D4A0FF inner light radiating outward,
soft white #FFFFFF hot core at center, mystical arcane glow aura,
color palette strictly: purple #9B59B6, violet #D4A0FF, white #FFFFFF
no other colors
```

---

## 공격 브랜치 (Attack / Right)

**계열 색상:** 심홍 `#C04040` / 주황 `#E8622A` / 골든 `#FFD700`  
**생성 순서:** A1 → A2 → A3 → A4 (A1 생성 후 반드시 참조 이미지로 사용)

---

### A1 — 야성의 손톱 【ANCHOR — 먼저 생성】

**파일명:** `icon_attack_claw.png`

```
[공통 베이스 프롬프트]

Three sharp predator claws slashing diagonally lower-left to upper-right,
bold talon silhouette, slight motion trail lines behind each claw,
claw base is dark crimson #8B1A1A, claw tips glow warm orange #FF6B35,
thin bright yellow-white #FFE4B5 rim highlight on each claw edge,
soft crimson #C04040 outer glow halo,
color palette strictly: crimson #C04040, dark red #8B1A1A, orange #FF6B35, warm white #FFE4B5
no other colors, transparent background
```

---

### A2 — 화염각

**파일명:** `icon_attack_flame.png`

> **생성 전:** A1(야성의 손톱) 이미지를 Gemini 대화에 첨부

```
[공통 베이스 프롬프트]

IMPORTANT: Generate in the EXACT SAME art style, line weight, glow treatment,
and color palette as the reference image attached (icon_attack_claw).
Same stroke width (~3-4px), same glow radius, same cel-shading approach.

Icon subject: A curved dinosaur horn/tusk, slightly upward-pointing,
flames wrapping and rising from the tip, fire particles trailing upward,
horn base dark crimson #8B1A1A, flame gradient from orange #FF6B35 to bright #FFE4B5 at tip,
soft crimson #C04040 outer glow halo,
color palette strictly: same as reference — crimson #C04040, dark red #8B1A1A, orange #FF6B35, warm white #FFE4B5
```

---

### A3 — 살의

**파일명:** `icon_attack_critical.png`

> **생성 전:** A1(야성의 손톱) 이미지를 Gemini 대화에 첨부

```
[공통 베이스 프롬프트]

IMPORTANT: Generate in the EXACT SAME art style, line weight, glow treatment,
and color palette as the reference image attached (icon_attack_claw).

Icon subject: A thin stiletto dagger pointing upward, 4-pointed starburst
critical hit marker glowing at the blade tip,
dagger body dark crimson #8B1A1A, starburst bright yellow-gold #FFD700 with white #FFFFFF hot center,
soft crimson #C04040 outer glow halo on dagger,
color palette strictly: same as reference + gold #FFD700 only for starburst accent
```

---

### A4★ — 광폭 (캡스톤)

**파일명:** `icon_attack_berserk.png`

> **생성 전:** A1(야성의 손톱) 이미지를 Gemini 대화에 첨부

```
[공통 베이스 프롬프트]

IMPORTANT: Generate in the EXACT SAME art style, line weight, and color palette
as the reference image attached (icon_attack_claw).
DIFFERENCE: Capstone tier — glow radius 1.5x larger, more intense bloom effect.

Icon subject: Two heavy battle axes crossed at center (X shape),
jagged power lines bursting outward from the crossing point like an explosion,
axes body dark crimson #8B1A1A with orange #FF6B35 blade highlights,
burst lines bright yellow-orange #FFD700, large crimson #C04040 outer bloom glow,
color palette strictly: same as reference + gold #FFD700 burst lines
```

---

## 방어 브랜치 (Defense / Left)

**계열 색상:** 강철 청색 `#4070C0` / 청록 `#00CFFF` / 은색 `#C0C8D0`  
**생성 순서:** D1 → D2 → D3 → D4 (D1 생성 후 반드시 참조 이미지로 사용)

---

### D1 — 단단한 가죽 【ANCHOR — 먼저 생성】

**파일명:** `icon_defense_hide.png`

```
[공통 베이스 프롬프트]

A single large hexagonal armor scale or thick plate,
diamond-pattern reptilian texture embossed on surface,
plate body deep steel blue #2A4F8A, surface texture mid-blue #4070C0,
thin bright cyan #00CFFF rim highlight on plate edges,
soft blue #4070C0 outer glow halo,
color palette strictly: steel blue #4070C0, deep navy #2A4F8A, cyan #00CFFF, silver #C0C8D0
no other colors, transparent background
```

---

### D2 — 굳건함

**파일명:** `icon_defense_shield.png`

> **생성 전:** D1(단단한 가죽) 이미지를 Gemini 대화에 첨부

```
[공통 베이스 프롬프트]

IMPORTANT: Generate in the EXACT SAME art style, line weight, glow treatment,
and color palette as the reference image attached (icon_defense_hide).

Icon subject: A classic kite shield facing forward, bold upward chevron
embossed on the shield face, shield body deep navy #2A4F8A,
shield face mid-blue #4070C0, chevron bright cyan #00CFFF,
thin silver #C0C8D0 rim highlight on shield edge,
color palette strictly: same as reference
```

---

### D3 — 조롱

**파일명:** `icon_defense_taunt.png`

> **생성 전:** D1(단단한 가죽) 이미지를 Gemini 대화에 첨부

```
[공통 베이스 프롬프트]

IMPORTANT: Generate in the EXACT SAME art style, line weight, glow treatment,
and color palette as the reference image attached (icon_defense_hide).

Icon subject: A bold exclamation mark inside a jagged spiky speech bubble,
challenge/taunt symbol, bubble outline spiky and aggressive,
bubble body deep navy #2A4F8A, bubble outline #4070C0,
exclamation mark bright cyan #00CFFF with white #FFFFFF hot center,
color palette strictly: same as reference
```

---

### D4★ — 불사 (캡스톤)

**파일명:** `icon_defense_revive.png`

> **생성 전:** D1(단단한 가죽) 이미지를 Gemini 대화에 첨부

```
[공통 베이스 프롬프트]

IMPORTANT: Generate in the EXACT SAME art style, line weight, and color palette
as the reference image attached (icon_defense_hide).
DIFFERENCE: Capstone tier — glow radius 1.5x larger, more intense bloom effect.

Icon subject: A heart at the bottom with a stylized phoenix rising above it,
phoenix wings spread upward forming a protective arc,
heart body bright cyan #00CFFF with white #FFFFFF inner glow,
phoenix silhouette mid-blue #4070C0 with cyan #00CFFF flame tips,
large blue #4070C0 outer bloom glow,
color palette strictly: same as reference
```

---

## 공룡 브랜치 (Dinosaur / Up)

**계열 색상:** 호박 금색 `#C09030` / 황금 `#FFD700` / 따뜻한 흰색 `#FFFACD`  
**생성 순서:** N1 → N2 → N3 → N4 (N1 생성 후 반드시 참조 이미지로 사용)

---

### N1 — 원시의 각성 【ANCHOR — 먼저 생성】

**파일명:** `icon_dino_summon.png`

```
[공통 베이스 프롬프트]

A bold three-toed theropod dinosaur footprint (bird-like, three forward toes),
glowing summoning circle or star beneath the footprint,
footprint body dark amber #8B6914, footprint fill mid-amber #C09030,
thin bright gold #FFD700 rim highlight on footprint edges,
soft amber #C09030 outer glow halo, warm golden summoning light below,
color palette strictly: amber #C09030, dark amber #8B6914, gold #FFD700, warm cream #FFFACD
no other colors, transparent background
```

---

### N2 — 진화 가속

**파일명:** `icon_dino_evolve.png`

> **생성 전:** N1(원시의 각성) 이미지를 Gemini 대화에 첨부

```
[공통 베이스 프롬프트]

IMPORTANT: Generate in the EXACT SAME art style, line weight, glow treatment,
and color palette as the reference image attached (icon_dino_summon).

Icon subject: A double helix DNA strand, top of the helix transforms
into a bold upward arrow, evolution and transformation symbol,
helix strands dark amber #8B6914 with mid-amber #C09030 highlights,
arrow tip bright gold #FFD700 with warm cream #FFFACD glow,
soft amber #C09030 outer glow halo,
color palette strictly: same as reference
```

---

### N3 — 야수의 유대

**파일명:** `icon_dino_bond.png`

> **생성 전:** N1(원시의 각성) 이미지를 Gemini 대화에 첨부

```
[공통 베이스 프롬프트]

IMPORTANT: Generate in the EXACT SAME art style, line weight, glow treatment,
and color palette as the reference image attached (icon_dino_summon).

Icon subject: Two theropod dinosaur footprints side by side (one slightly larger,
one slightly smaller), connected by a glowing arc or chain link between them,
pack bond symbol, footprints dark amber #8B6914 with #C09030 fill,
connecting arc bright gold #FFD700, warm amber glow between the two prints,
color palette strictly: same as reference
```

---

### N4★ — 정점의 군주 (캡스톤)

**파일명:** `icon_dino_apex.png`

> **생성 전:** N1(원시의 각성) 이미지를 Gemini 대화에 첨부

```
[공통 베이스 프롬프트]

IMPORTANT: Generate in the EXACT SAME art style, line weight, and color palette
as the reference image attached (icon_dino_summon).
DIFFERENCE: Capstone tier — glow radius 1.5x larger, more intense bloom effect.

Icon subject: A jagged royal crown where each crown point is a sharp dinosaur fang,
apex predator royalty symbol, crown base has reptilian scale texture,
crown body dark amber #8B6914, scale texture mid-amber #C09030,
fang tips bright gold #FFD700 with warm cream #FFFACD gleam,
large amber #C09030 outer bloom glow,
color palette strictly: same as reference
```

---

## 유틸 브랜치 (Utility / Down)

**계열 색상:** 비전 보라 `#8040C0` / 밝은 라벤더 `#BF7FFF` / 흰보라 `#E8CCFF`  
**생성 순서:** U1 → U2 → U3 → U4 (U1 생성 후 반드시 참조 이미지로 사용)

---

### U1 — 맑은 정신 【ANCHOR — 먼저 생성】

**파일명:** `icon_util_draw.png`

```
[공통 베이스 프롬프트]

Three playing cards fanned out in a spread, face-down backs visible,
slight sparkle or glint above the top card, hand draw and clarity symbol,
card backs deep purple #5020A0, card body mid-purple #8040C0,
thin bright lavender #BF7FFF rim highlight on each card edge,
soft purple #8040C0 outer glow halo, sparkle white-purple #E8CCFF,
color palette strictly: deep purple #5020A0, purple #8040C0, lavender #BF7FFF, light #E8CCFF
no other colors, transparent background
```

---

### U2 — 풍요

**파일명:** `icon_util_mana.png`

> **생성 전:** U1(맑은 정신) 이미지를 Gemini 대화에 첨부

```
[공통 베이스 프롬프트]

IMPORTANT: Generate in the EXACT SAME art style, line weight, glow treatment,
and color palette as the reference image attached (icon_util_draw).

Icon subject: A floating spherical magic orb, smooth surface with inner glow,
three small energy tendrils or sparks spiraling around it,
orb body deep purple #5020A0, orb surface mid-purple #8040C0,
bright lavender #BF7FFF inner glow ring, hot white-purple #E8CCFF core,
soft purple #8040C0 outer glow halo,
color palette strictly: same as reference
```

---

### U3 — 상인의 감각

**파일명:** `icon_util_gold.png`

> **생성 전:** U1(맑은 정신) 이미지를 Gemini 대화에 첨부

```
[공통 베이스 프롬프트]

IMPORTANT: Generate in the EXACT SAME art style, line weight, glow treatment,
and color palette as the reference image attached (icon_util_draw).

Icon subject: A coin with a small price tag ribbon attached to it,
merchant intuition symbol, coin has simple embossed scale or leaf design,
coin body deep purple #5020A0 tinted, coin face mid-purple #8040C0,
price tag ribbon bright lavender #BF7FFF, coin rim highlight #E8CCFF,
soft purple outer glow, subtle gold #FFD700 ONLY on coin rim edge as accent,
color palette strictly: same as reference, minimal gold accent only on coin rim
```

---

### U4★ — 시작의 축복 (캡스톤)

**파일명:** `icon_util_relic.png`

> **생성 전:** U1(맑은 정신) 이미지를 Gemini 대화에 첨부

```
[공통 베이스 프롬프트]

IMPORTANT: Generate in the EXACT SAME art style, line weight, and color palette
as the reference image attached (icon_util_draw).
DIFFERENCE: Capstone tier — glow radius 1.5x larger, more intense bloom effect.

Icon subject: An ornate treasure chest partially open, magical light beams
streaming upward from the open interior, blessing and relic symbol,
chest body deep purple #5020A0, chest surface mid-purple #8040C0,
light beams bright lavender #BF7FFF fading to white-purple #E8CCFF,
metal fittings subtle gold #FFD700, large purple #8040C0 outer bloom glow,
color palette strictly: same as reference, minimal gold accent on metal fittings only
```

---

## 생성 워크플로우 요약

```
1. ROOT 생성 (독립)

2. 공격 브랜치:
   A1 생성 → A1 이미지 첨부 → A2 생성 → A1 이미지 첨부 → A3 생성 → A1 이미지 첨부 → A4 생성

3. 방어 브랜치:
   D1 생성 → D1 이미지 첨부 → D2 생성 → D1 이미지 첨부 → D3 생성 → D1 이미지 첨부 → D4 생성

4. 공룡 브랜치:
   N1 생성 → N1 이미지 첨부 → N2 생성 → N1 이미지 첨부 → N3 생성 → N1 이미지 첨부 → N4 생성

5. 유틸 브랜치:
   U1 생성 → U1 이미지 첨부 → U2 생성 → U1 이미지 첨부 → U3 생성 → U1 이미지 첨부 → U4 생성
```

---

## Unity 적용

**import 설정:**
- Texture Type: `Sprite (2D and UI)`
- Alpha Source: `Input Texture Alpha`
- Max Size: `256`

**Locked 상태 처리 (별도 에셋 불필요):**
```csharp
// 노드 상태별 아이콘 컬러 — 그레이스케일 에셋 필요없음
Image iconImg = nodeObj.GetComponent<Image>();
if (state.IsMaxed(node))
    iconImg.color = Color.white;                             // 풀 컬러
else if (state.CanRankUp(node))
    iconImg.color = new Color(1f, 1f, 1f, 0.65f);          // 약간 dim
else
    iconImg.color = new Color(0.25f, 0.25f, 0.25f, 0.5f); // Locked 흑백
```
