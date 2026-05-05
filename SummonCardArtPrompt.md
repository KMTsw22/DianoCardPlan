# 공룡 소환 카드 일러 프롬프트 (Master)

Gemini 이미지 생성용. SUMMON 카드 — "이 카드를 쓰면 이 공룡이 소환된다"는 느낌의 1024×1024 일러.

- **출력**: 1024×1024 PNG, 1:1 정사각, full-bleed
- **확정일**: 2026-04-30 (1챕터 육식 4종 v1)
- **참조**: `card.csv` (CARNIVORE 1챕터), `CardsReference.md`
- **공통 스타일**: ATTACK 스펠과 동일 — anime cel-shading, 다크판타지 무디 백드롭, aged brass + muted jewel tones, NEVER neon
- **REF 사용 룰**:
  - **자세·각도·카메라**: REF는 anatomy 가이드만 — 포즈는 자유롭게 변형 가능
  - **공룡 컬러**: **REF 그림에 보이는 색을 100% 그대로 사용**. 채도 조정·색 이름 추측·눈/발톱 임의 변경 금지. REF가 빨강이면 빨강, 회색이면 회색, 초록이면 초록 그대로. 다크판타지 톤이 안 맞는다 싶어도 REF 우선 — 톤 조정은 백드롭에서만 처리.
  - **환경**: 원본 환경(정글/협곡/화산/양치류)은 100% 폐기 → 무디 차콜 백드롭 + 소환 오라로 대체

각 카드의 코드블록을 통째로 복사해 Gemini에 입력하면 됩니다. **REF 첨부 필수.**

---

## HERBIVORE — Chapter 1 (4장)

육식과 시각적 차별화: 백드롭 = **earthy / cool jade-bronze** (육식 warm-ember 와 대비), 소환 오라 = **grounding earth-dust** (불꽃이 아닌 흙·뿌리 느낌).

### C001 트리케라톱스 (Triceratops) — COMMON / 1코 / 4 ATK / 20 HP / 고HP 탱커

```
1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach `Resources/Dinos/Triceratops.png` as REF 1.
- ANATOMY: species identification (Triceratops proportions, THREE horns — two long brow horns + one short nasal horn, large bony frill at back of skull, stocky four-legged build, parrot-like beak).
- POSE / ANGLE / CAMERA: may vary freely — do NOT copy the original REF pose verbatim.
- COLOR: **EXACT match to REF image — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors.** Skin, frill markings, horns, eye, beak: pixel-faithful to REF.
- DISCARD: any meadow / forest / sky / rock environment in REF.

SUBJECT (dinosaur occupies ~32% of canvas — sturdy 1-cost tank):
**Composition strategy: HEAD-ON CHARGE FRAMING.** Camera is low and slightly tilted so the dinosaur looms toward the viewer. Triceratops mid-charge with head pushed forward at the camera, frill flared wide, three horns leading the action. The HEAD + FRILL must dominate the upper half of frame; body and legs fade to the lower half. Reads as an aggressive defensive bull-rush — NOT a static side profile, NOT a peaceful grazer. Crisp cel-shaded hard shadows under the lowered head and horns, bright highlight along the frill rim and horn tips. Dust kicks up at the front feet from the charge. The dinosaur sits center-bottom with significant negative space above for backdrop and aura.

DINO COLOR (EXACT REF — no muting, no shifting):
- Skin: REF base color and pattern, pixel-faithful.
- Frill markings: REF pattern color and placement.
- Horns: REF horn color (do NOT recolor unless REF shows it).
- Eye: REF eye color, single visible.
- Beak: REF beak color.

SUMMON AURA (grounding herbivore feel — earth, NOT fire):
At the triceratops's feet: a cool muted jade-bronze halo (#1F2820 → #5A4828) seeping from a single fissured ground line. ONE solid cel-shaded earth-dust wisp rises behind the hind legs. NO sparks, NO ember, NO particle dust — only solid cel-shaded shapes. Herbivores root, not blaze.

BACKDROP (warm-earth — Triceratops's signature palette):
Warm-earth moody dark base (#1F1B16 — warm tan-charcoal, NOT pure black). Warm tan-amber glow (#3A2A1A) spreading wide behind the triceratops where the dust kicks up; cooler muted jade (#1F2A28) bleed at upper corner for contrast. Subtle vignette only at extreme corners. NO meadow, NO trees, NO sky, NO rocks.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette (Arknights / Granblue mood) — aged brass + muted jewel tones, never neon. Reads as a steadfast living wall mid-charge.

FORBIDDEN:
- Text, letters, numbers, readable language
- Sparks, ember dots, dust particles, scattered fragments
- Multiple triceratops, herd, baby
- Full environment — meadow, trees, foliage, sky horizon, ruins, terrain
- Frame, border, card UI overlay
- Painted soft-gradient, oil painting, airbrush blur
- Inventing new colors, muting saturation, or hue-shifting REF — REF colors must be pixel-faithful
- Warm fire-ember aura — herbivores use cool earthy aura
- Cute mascot vibe — must read as serious heavy tank
```

---

### C002 스테고사우루스 (Stegosaurus) — COMMON / 1코 / 5 ATK / 17 HP / 균형형

```
1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach `Resources/Dinos/Stegosaurus.png` as REF 1.
- ANATOMY: species identification (Stegosaurus proportions, double row of bony back plates [kite-shaped], spiked tail with FOUR sharp spikes [thagomizer], small head, low forelimbs and larger hindlegs giving an arched back).
- POSE / ANGLE / CAMERA: may vary freely.
- COLOR: **EXACT match to REF image — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors.** Skin, plate color, spike color, eye: pixel-faithful to REF.
- DISCARD: any meadow / forest environment in REF.

SUBJECT (dinosaur occupies ~32% of canvas — balanced 1-cost):
**Composition strategy: REAR-3/4 TAIL-SWING.** Camera is positioned behind-and-side so the dinosaur's hindquarters and tail are closer to viewer. Stegosaurus mid-tail-swing — thagomizer (4 spikes) cutting an arc toward the lower-left or lower-right corner, body angled away from camera, head turned partially back to track the swing. The TAIL SPIKES lead the frame as the action point; the dual row of back plates form a strong silhouette ridge along the body. Crisp cel-shaded hard shadows under the plates, bright highlight along the plate edges and spike tips. Reads as a balanced mid-swing striker — NOT a static side-grazer, NOT head-on. Dynamic motion lines optional behind the swinging tail.

DINO COLOR (EXACT REF — no muting, no shifting):
- Skin: REF base color, pixel-faithful.
- Back plates: REF plate color and pattern.
- Tail spikes: REF spike color.
- Belly: REF belly tone.
- Eye: REF eye color.

SUMMON AURA (grounding herbivore feel):
At the stegosaurus's feet: a cool muted jade-bronze halo (#1F2820 → #5A4828) from a fissured ground line. ONE solid cel-shaded earth-dust wisp rises behind the tail. NO sparks, NO ember.

BACKDROP (stormy jade-violet — Stegosaurus's signature palette):
Stormy jade-tinted moody dark base (#18201E — cool jade-storm undertone, NOT pure black). Cool muted jade glow (#1F3028) along the body line; muted violet-storm (#2A1F3A) bleed in the corner where the tail swings — gives a storm-cloud feel matching the dynamic motion. Subtle vignette only at extreme corners. NO foliage, NO trees, NO sky.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette — aged brass + muted jewel tones, never neon. Reads as a balanced thagomizer-armed walker mid-swing.

FORBIDDEN:
- Text, letters, numbers, readable language
- Sparks, ember dots, dust particles, scattered fragments
- Multiple stegosaurus, herd
- Full environment — meadow, trees, foliage, sky, terrain
- Frame, border, card UI overlay
- Painted soft-gradient, oil painting, airbrush blur
- Inventing new colors, muting saturation, or hue-shifting REF
- Warm fire-ember aura — herbivores use cool earthy aura
- Missing back plates or tail spikes — both must be visible
```

---

### C003 안킬로사우루스 (Ankylosaurus) — UNCOMMON / 2코 / 3 ATK / 25 HP / 탱커 (초고HP)

```
1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach `Resources/Dinos/Ankylosaurus.png` as REF 1.
- ANATOMY: species identification (Ankylosaurus proportions, low broad armored body covered in bony plates [osteoderms], heavy clubbed tail at end, short stocky legs, wide flat skull with small horns at corners).
- POSE / ANGLE / CAMERA: may vary freely.
- COLOR: **EXACT match to REF image — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors.** Skin, armor plates, tail club, eye: pixel-faithful to REF.
- DISCARD: any forest / swamp / rock environment in REF.

SUBJECT (dinosaur occupies ~35% of canvas — UNCOMMON heavy tank, slightly bigger):
**Composition strategy: WIDE LOW HORIZONTAL — ground-hugging tank.** Camera is at near-ground level, horizontal framing. Ankylosaurus crouched extremely low and wide so the body fills horizontal space; all four stocky legs visible. Tail club is mid-sideways-sweep across the lower frame (NOT vertical lift) — emphasizing the bulldozer-side-swing. The armored back plates + tail club must dominate the lower-half-and-middle band of canvas. Head is wide and low at one side. Crisp cel-shaded hard shadows under the heavy body, bright highlight along the armor ridge and club. Reads as an immovable horizontal bulldozer — NOT vertical, NOT charging, NOT head-on.

DINO COLOR (EXACT REF — no muting, no shifting):
- Skin: REF base color, pixel-faithful.
- Armor plates: REF plate color and pattern.
- Tail club: REF club color.
- Belly: REF belly tone.
- Eye: REF eye color.

SUMMON AURA (heavier than 1-cost — UNCOMMON tank):
At the anky's feet: a stronger cool jade-bronze halo (#1F2820 → #5A4828) from a wider cracked ground line. TWO cel-shaded earth-dust wisps rise on either side. NO sparks, NO ember.

BACKDROP (stone-charcoal — Ankylosaurus's signature palette, heaviest of the herbivores):
Stone-charcoal moody dark base (#1A1B18 — neutral stone-grey undertone, NOT pure black). Muted aged-moss-jade glow (#1A2A24) spreading wide and low along the horizontal body line; warm rust hint (#2A1F18) bleed at one corner for armored-iron warmth. Subtle vignette at extreme corners. NO trees, NO swamp, NO sky. Heaviest, darkest of the 4 herbivore backdrops — reflects the tank's mass.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette — aged brass + muted jewel tones, never neon. Reads as an unmovable horizontal armored fortress.

FORBIDDEN:
- Text, letters, numbers, readable language
- Sparks, ember dots, dust particles, scattered fragments
- Multiple ankylosaurs, duplicates
- Full environment — forest, swamp, rocks, sky
- Frame, border, card UI overlay
- Painted soft-gradient, oil painting, airbrush blur
- Inventing new colors, muting saturation, or hue-shifting REF
- Warm fire-ember aura — herbivores use cool earthy aura
- Missing tail club — must be clearly visible
```

---

### C011 브라키오사우루스 (Brachiosaurus) — RARE / 2코 / 3 ATK / 40 HP / 초식 아펙스

```
1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach `Resources/Dinos/Brachiosaurus.png` as REF 1.
- ANATOMY: species identification (Brachiosaurus proportions — extremely long curving neck, small head atop, towering quadruped with longer FORELIMBS than hindlegs giving an upward-tilted back, thick column legs, long tapering tail). The most massive and tallest of chapter 1 herbivores.
- POSE / ANGLE / CAMERA: may vary freely (suggestions: low-angle looking up at the towering neck, three-quarter view with head raised browsing high, full-body silhouette emphasizing scale).
- COLOR: **EXACT match to REF image — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors.** Skin, back markings, belly, eye: pixel-faithful to REF.
- DISCARD: any forest / lake / sky environment in REF.

SUBJECT (dinosaur occupies ~40% of canvas — RARE apex herbivore deserves more presence):
**Composition strategy: EXTREME LOW-ANGLE VERTICAL — sky-reaching tower.** Camera is at ground level, looking sharply UP at the dinosaur. Brachiosaurus's column legs fill the foreground bottom of canvas; the long neck curves upward as the dominant vertical axis from lower-third all the way to upper-third where the small head turns curiously to one side. The composition is markedly VERTICAL — head and neck dominate the upper-half, legs+body anchor lower. The viewer must feel small looking up. Crisp cel-shaded hard shadows under the belly and between the column legs, bright highlight along the back ridge and underside of the raised neck. Reads as a stately apex tower reaching for the sky — NOT a horizontal full-body silhouette, NOT eye-level.

DINO COLOR (EXACT REF — no muting, no shifting):
- Skin: REF base color and pattern, pixel-faithful.
- Back markings: REF pattern color and placement.
- Belly: REF belly tone exactly.
- Eye: REF eye color, single visible.
- Limbs: REF limb tone.

SUMMON AURA (apex grounded force):
At the brachio's feet: an imposing cool jade-bronze halo (#1F2820 → #5A4828) from a wide deep cracked ground line. THREE cel-shaded earth-dust wisps drift up around the column legs. A faint earthy haze drifts behind the silhouette as solid cel-shaded wisps (NEVER particles). The aura is wider and more grounded than commons — apex tier signature.

BACKDROP (twilight teal-violet — Brachiosaurus's signature palette, sky-tinted for the upward composition):
Twilight teal-tinted moody dark base (#161A22 — cool teal-violet sky-twilight undertone, NOT pure black). Cool muted teal-blue glow (#1F2838) along the upper canvas where the neck and head reach (sky-realm hint without showing actual sky); warm gold-amber (#2A2418) bleed near the column legs at the bottom, suggesting ground-anchor. Strong vertical gradient — top cooler, bottom warmer. Stronger vignette at corners than commons (RARE rarity reads through atmospheric depth). NO trees, NO lake, NO sky horizon, NO clouds, NO ground plane outside the crack.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette — aged brass + muted jewel tones, never neon. Reads as the towering apex herbivore reaching skyward mid-summon — scale and presence over aggression.

FORBIDDEN:
- Text, letters, numbers, readable language
- Sparks, ember dots, dust particles, scattered fragments
- Multiple brachiosauruses, herd
- Full environment — forest, lake, sky, sun, mountains, ground plane terrain
- Frame, border, card UI overlay
- Painted soft-gradient, oil painting, airbrush blur
- Inventing new colors, muting saturation, or hue-shifting REF — REF colors must be pixel-faithful
- Warm fire-ember aura — herbivores use cool earthy aura
- Cute baby/mascot vibe — must read as colossal stately apex
```

---

## CARNIVORE — Chapter 1 (6장)

### C004 랩터 (Raptor) — COMMON / 1코 / 7 ATK / 13 HP

```
1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach `Resources/Dinos/Raptor.png` as REF 1.
- ANATOMY: species identification (Velociraptor proportions, sickle claw on hind foot, slender frame, feather crest hints, long tail for balance).
- POSE / ANGLE / CAMERA: may vary freely — do NOT copy the side-view jungle pose verbatim.
- COLOR: **EXACT match to REF image — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors.** Skin, stripe pattern, claws, eye, teeth: pixel-faithful to REF.
- DISCARD: jungle environment, second raptor in background, blue moonlight tinting.

SUBJECT (dinosaur occupies ~30% of canvas — small, leaving room for backdrop):
A single Velociraptor in any predator-action pose (suggestions: low crouching ambush, mid-leap from upper-right, three-quarter view turning to face the viewer). Pose should feel coiled and dangerous, NOT a static profile. The dinosaur sits roughly center-left or center, with significant negative space around it for the moody backdrop and summon aura to read. Crisp cel-shaded hard shadows on the underside, bright highlight along the back ridge. Slight feather crest on head and forearms.

DINO COLOR (EXACT REF — no muting, no shifting):
- Skin/feathers: REF base color and pattern, pixel-faithful.
- Stripes: REF stripe color and placement.
- Belly: REF belly tone exactly.
- Sickle claws: REF claw color (do NOT recolor brass/bone unless REF shows it).
- Eye: REF eye color (do NOT substitute amber/gold if REF shows different).

SUMMON AURA (the moment of being called forth):
At the raptor's feet: a warm ember radial halo (#3D1A12 → #A8341C) seeping from a single hairline ground crack. Two or three solid cel-shaded ember tongues curl upward around the back legs. NO scattered sparks, NO particle dust — only solid shapes.

BACKDROP:
Warm-tinted moody dark base (#1F1418 — subtle ember-warm undertone, NOT pure black). Warm amber radial glow (#3A1A14) behind the raptor spreading wide; cooler indigo (#1F1834) bleed at upper-right corner for contrast. Subtle vignette only at extreme corners. NO foliage, NO trees, NO rocks.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette (Arknights / Granblue mood) — aged brass + muted jewel tones, never neon. Reads as a single iconic predator emerging mid-summon.

FORBIDDEN:
- Text, letters, numbers, readable language
- Sparks, ember dots, dust particles, scattered fragments
- Multiple raptors, second silhouette, pack
- Full environment — jungle, foliage, leaves, ferns, trees, vines, ruins, terrain horizon
- Frame, border, card UI overlay
- Painted soft-gradient, oil painting, airbrush blur, smooth painterly realism
- Inventing new colors, muting saturation, or hue-shifting REF — REF colors must be pixel-faithful
- Neon saturation, blown-out white core (unless REF shows it)
```

---

### C005 카르노타우루스 (Carnotaurus) — COMMON / 1코 / 8 ATK / 10 HP

```
1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach `Resources/Dinos/Carnotaurus.png` as REF 1.
- ANATOMY: species identification (Carnotaurus proportions, TWO bull-like horns above eyes, tiny vestigial arms, muscular hind legs, thick tapering tail).
- POSE / ANGLE / CAMERA: may vary freely — do NOT copy the side-view canyon pose verbatim.
- COLOR: **EXACT match to REF image — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors.** Skin, stripe pattern, horns, eye, teeth: pixel-faithful to REF.
- DISCARD: canyon walls, red sunset sky, ground rocks.

SUBJECT (dinosaur occupies ~32% of canvas — slightly larger than raptor for hitter feel):
A single Carnotaurus in any aggressive pose (suggestions: mid-charge with head down presenting horns, three-quarter front view rearing, snarling head-on close angle showing both horns prominently). The two horns must be the visual signature — angle the head so they read clearly. Mouth open in a snarl, fangs visible. Tiny vestigial arms tucked. The dinosaur sits roughly center, with significant negative space around it for backdrop and summon aura. Crisp cel-shaded hard shadows, bright highlight along upper back and horn edges.

DINO COLOR (EXACT REF — no muting, no shifting):
- Skin: REF base color, pixel-faithful.
- Stripes: REF stripe color and placement.
- Belly: REF belly tone exactly.
- Horns: REF horn color (do NOT recolor unless REF shows it).
- Eye: REF eye color, narrowed in aggression.
- Teeth: REF teeth color (typically bone-white but follow REF).

SUMMON AURA (the moment of being called forth):
At the carnotaurus's feet: a strong warm ember halo (#5A2A1A → #E66424) seeping from cracked ground beneath. ONE thicker cel-shaded ember jet curls up behind the hind legs (more intense than the raptor — this is a heavy hitter). NO sparks, NO dust particles — only solid cel-shaded shapes.

BACKDROP:
Warm-tinted moody dark base (#1F1418 — subtle blood-warm undertone, NOT pure black). Strong crimson glow (#5A2A1A) behind the carnotaurus spreading wide; cooler indigo (#1F1834) bleed at one corner for contrast. Subtle vignette only at extreme corners. NO canyon walls, NO sunset sky, NO rocks.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette — aged brass + muted jewel tones, never neon. Reads as a brutal single-strike charger emerging mid-summon.

FORBIDDEN:
- Text, letters, numbers, readable language
- Sparks, ember dots, dust particles, scattered fragments
- Multiple carnotauruses, duplicates
- Full environment — canyon, cliff walls, rocks, sky horizon, sunset, ground plane terrain
- Frame, border, card UI overlay
- Painted soft-gradient, oil painting, airbrush blur
- Inventing new colors, muting saturation, or hue-shifting REF — REF colors must be pixel-faithful
- Neon saturation, blown-out white core (unless REF shows it)
```

---

### C008 티렉스 (T-Rex) — RARE / 3코 / 15 ATK / 22 HP / AoE 공포

```
1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach `Resources/Dinos/T-Rex.png` as REF 1.
- ANATOMY: species identification (T-Rex proportions, massive head, tiny arms, thick balancing tail, powerful hind legs).
- POSE / ANGLE / CAMERA: may vary freely — do NOT copy the side-view lava cliff pose verbatim.
- COLOR: **EXACT match to REF image — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors.** Skin, scarring/back pattern, teeth, eye: pixel-faithful to REF.
- DISCARD: lava, volcano, sky, ground rocks (environment only — colors must still match REF dinosaur exactly).

SUBJECT (dinosaur occupies ~40% of canvas — RARE apex deserves more presence than commons but still leaves backdrop room):
A single Tyrannosaurus Rex in any apex-predator pose (suggestions: head-on roar with jaws wide, three-quarter view stomping forward, low-angle looking up at the towering head). The massive head and bone-white fangs must be the visual signature — make them prominent in whatever pose you choose. Tiny arms tucked, thick tail visible for balance. The dinosaur sits roughly center, with significant negative space around for the imposing dread atmosphere. Crisp cel-shaded hard shadows on the lower jaw, neck, and underside. Bright highlight along the upper skull and back ridge.

DINO COLOR (EXACT REF — no muting, no shifting, no overrides):
- Skin: REF base color, pixel-faithful.
- Back: REF scarring/stripe pattern along spine and tail.
- Belly: REF belly tone exactly.
- Teeth: REF teeth color (typically bone-white but follow REF).
- Eye: REF eye color exactly (do NOT substitute amber/ember if REF shows different).
- Inner mouth: REF inner-mouth color.

SUMMON AURA (the moment of being called forth — apex presence):
At the T-Rex's feet: a wide imposing warm ember storm halo (#5A2A1A → #E66424) seeping from a wide deep cracked ground beneath. THREE cel-shaded heavier ember jets curl upward around the legs and lower body. A faint smoky veil drifts behind the silhouette as solid cel-shaded wisps (NEVER particles). The aura is larger and more intense than carnotaurus — apex tier signature.

BACKDROP:
Warm-tinted moody dark base (#1F1418 — subtle ember-warm undertone, NOT pure black). Strong crimson radial glow (#5A2A1A) behind the T-Rex spreading wide across canvas; cooler deep indigo (#1F1834) bleed at upper corners for dread contrast. Stronger vignette at corners than basic units (RARE rarity reads through deep imposing atmosphere). NO lava, NO volcano, NO sky horizon, NO rocks.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette — aged brass + muted jewel tones, never neon. Reads as the absolute apex predator emerging mid-summon — the AoE Fear effect must feel implicit through scale and presence.

FORBIDDEN:
- Text, letters, numbers, readable language
- Sparks, ember dots, dust particles, scattered debris fragments
- Multiple T-Rexes, second silhouette
- Full environment — lava, volcano, sky horizon, cliffs, rocks, smoke clouds, terrain
- Frame, border, card UI overlay
- Painted soft-gradient, oil painting, airbrush blur
- Inventing new colors, muting saturation, or hue-shifting REF — REF colors must be pixel-faithful
- Color overrides on eye/teeth/mouth (no exceptions — sample REF directly)
- Neon saturation, blown-out white core (unless REF shows it)
```

---

### C010 콤프소그나투스 (Compsognathus) — COMMON / 0코 / 2 ATK / 5 HP / 융합 시드

```
1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach `Resources/Dinos/Compsognathus.png` as REF 1.
- ANATOMY: species identification (Compsognathus proportions, small slender frame, long thin tail, lightweight bird-like build, small clawed hands).
- POSE / ANGLE / CAMERA: may vary freely — do NOT copy the side-view fern pose verbatim.
- COLOR: **EXACT match to REF image — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors.** Skin, stripe pattern, claws, eye: pixel-faithful to REF.
- DISCARD: ferns, plants, eggshells, sunbeams, water droplets.

SUBJECT (dinosaur occupies ~25% of canvas — smallest, 0-cost humility):
A single Compsognathus in any alert-scout pose (suggestions: crouching low and watchful, three-quarter view with head tilted curious, mid-step quick stride). The dinosaur sits roughly center or off-center with substantial negative space — the small size is part of the 0-cost reading. Crisp cel-shaded hard shadow on the underside, bright highlight along the back. Sharp predator-grade alert vibe — NOT a baby, NOT cute mascot.

DINO COLOR (EXACT REF — no muting, no shifting):
- Skin: REF base color, pixel-faithful.
- Stripes: REF stripe color and placement.
- Belly: REF belly tone exactly.
- Tiny claws: REF claw color.
- Eye: REF eye color, single visible, large and curious.

SUMMON AURA (the moment of being called forth — humble 0-cost):
At the compy's feet: a small subtle warm ember halo (#3A2A14 → #7A5A20) seeping from a tiny single ground crack. ONE thin cel-shaded ember curl wraps the back legs. Minimal compared to higher-cost summons — the 0-cost humility reads through restrained aura. NO particles.

BACKDROP:
Warm-tinted moody dark base (#1F1418 — subtle amber-warm undertone, NOT pure black). Subtle warm muted glow (#2A2014) behind the compy; corners stay restrained. Minimal atmosphere reads as humble 0-cost summon. NO ferns, NO eggshells, NO sunbeams, NO forest, NO leaves.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette — aged brass + muted jewel tones, never neon. Reads as a single small clever scout emerging mid-summon — NOT a baby, NOT cute mascot, just small and sharp.

FORBIDDEN:
- Text, letters, numbers, readable language
- Sparks, glitter, particles, dust
- Multiple compys, pack, group, swarm — exactly ONE compy (this is the fusion seed; pack-form is reserved for evolved tier)
- Eggs, eggshells, hatching motif
- Full environment — ferns, plants, forest, sunbeams, leaves, water, ground texture
- Frame, border, card UI overlay
- Painted soft-gradient, oil painting, airbrush blur
- Inventing new colors, muting saturation, or hue-shifting REF — REF colors must be pixel-faithful
- Neon lime saturation, blown-out white core (unless REF shows it)
- Cute baby/mascot vibe — must read as small but predator-grade
```

---

### C012 알로사우루스 (Allosaurus) — RARE / 1코 / 11 ATK / 22 HP / 강의 광폭

```
1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach `Resources/Dinos/Allosaurus.png` as REF 1.
- ANATOMY: use REF 1 for species proportions — TWO HORN-RIDGE CRESTS above each eye (elongated bony ridges, one over each eye, the species signature), head smaller and narrower than T-Rex, THREE clawed fingers per forelimb, muscular bipedal frame, long balancing tail.
- POSE / ANGLE / CAMERA: may vary freely from REF — predatory stalk facing viewer-right, NOT full open roar.
- COLOR: **EXACT match to REF 1 — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors.** Skin, stripe pattern, horn-ridges, claws, eye, teeth: pixel-faithful to REF.
- DISCARD: any background environment in REF.

SUBJECT (dinosaur occupies ~38% of canvas — RARE):
A single Allosaurus in any predatory-stalk pose (suggestions: low body horizontal with tail counterweight behind and head lowered, three-quarter view with one forelimb raised showing three claws clearly, snarling close angle showing horn-ridges and curved teeth). The TWO horn-ridge crests above the eyes are the visual signature — angle the head to show them. Mouth slightly open showing curved blade-teeth — NOT full roar. Three clawed fingers visible on at least one forelimb.

DINO COLOR (EXACT REF — pixel-faithful, no exceptions):
- Skin / stripe banding: REF color, sample directly.
- Belly: REF belly tone.
- Horn-ridges / three-clawed fingers / hindfoot claws: REF color.
- Eye: REF eye color — heavy brow horn-ridge shadow above it.
- Teeth: REF teeth color.

SUMMON AURA (frenzy signature):
At the allosaurus's feet: a warm crimson-amber ember halo seeping from cracked ground. TWO cel-shaded ember jets curl up around hind legs. ONE blood-crimson drip cel-shaded on the lower jaw — single solid streak, NOT splatter. ONE shallow gash on the flank with faint warm glow line — self-HP-cost frenzy visual hint. NO sparks, NO particle dust — solid shapes only.

BACKDROP:
Warm-tinted moody dark base (#1A1614 — subtle warm-umber undertone, NOT pure black). Warm crimson radial glow (#5A2818) spreading wide behind the allosaurus; cooler indigo (#1F1834) bleed at one corner. Stronger vignette (RARE tier). NO river, NO water, NO jungle, NO terrain.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette — aged brass + warm crimson + sandstone jewel tones, never neon. Reads as a self-destructive frenzied apex emerging mid-summon.

FORBIDDEN:
- Text, letters, numbers, readable language
- Sparks, glitter, particles, blood splatter — only ONE solid jaw drip + ONE flank gash
- Multiple allosauruses, prey carcass, second creature
- Full environment — river, water, jungle, terrain, sky
- Frame, border, card UI overlay
- Painted soft-gradient, oil painting, airbrush blur
- Recoloring body away from REF — pixel-faithful only
- Confused with T-Rex: Allosaurus has THREE clawed fingers + horn-ridges above eyes — NOT T-Rex two-stub arms
- Confused with Carnotaurus: horn-ridges above eyes, NOT bull-horns
- Full open roar — half-open stalk only
- Neon saturation, blown-out white core
- RARE rarity glow halo, particle aura, frame color change
```

---

### C014 마준가사우루스 (Majungasaurus) — UNCOMMON / 2코 / 9 ATK / 14 HP / 동족포식 흡혈

```
1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach `Resources/Dinos/Majungasaurus.png` as REF 1.
- ANATOMY: use REF 1 for species proportions — SINGLE ROUGH DOME-BUMP centered on top of forehead (the species signature — NOT horn-ridges, NOT bull-horns), SHORT wide blunt bulldog skull with thick rough-textured snout, forelimbs TINY VESTIGIAL STUBS barely visible against the torso, deep barrel-shaped body, sturdy hindlegs, thick tapering tail.
- POSE / ANGLE / CAMERA: may vary freely from REF — solitary cannibal menace, NOT full open roar.
- COLOR: **EXACT match to REF 1 — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors.** Skin, mottling pattern, forehead boss, belly, eye, teeth: pixel-faithful to REF.
- DISCARD: any background environment in REF.

SUBJECT (dinosaur occupies ~32% of canvas — UNCOMMON):
A single Majungasaurus in any solitary-feeder pose (suggestions: head lowered with closed jaw and slow side-glance toward viewer, three-quarter view with mouth half-open showing the wide jaw depth, low-angle close-up with the forehead boss and rough snout dominating). The single forehead dome + thick bulldog snout + invisible stub arms are the visual signature. Posture reads as patient cannibal — slow, heavy, watchful — NOT a charger.

DINO COLOR (EXACT REF — pixel-faithful, no exceptions):
- Skin / mottling pattern: REF color, sample directly.
- Belly: REF belly tone.
- Forehead boss / snout surface: REF color — rougher surface texture in the cel-shading.
- Forelimb stubs: same body color, barely break the silhouette.
- Eye: REF eye color — sunken, heavy-lidded.
- Teeth: REF teeth color.

BLOOD MARKS (cannibal signature — preserve from REF, do not add or remove):
If REF shows dried blood on the jaw or mouth, replicate exactly. OLD dried blood only — dark reddish-brown, NOT bright wet red, NOT splatter.

SUMMON AURA (necrotic cannibal — NOT frenzy):
At the majungasaurus's feet: a deep crimson-near-violet halo (#3A1418 → #5A2A24) from cracked ground. ONE thick cel-shaded ember jet behind the hindleg. ONE solid blood-crimson drip on the lower jaw, one at the side of the mouth — hard streaks, NOT splatter. NO bone, NO meat, NO carcass. Reads quietly menacing — a feeder that just finished.

BACKDROP:
Warm-tinted moody dark base (#181412 — desaturated warm-charcoal with cool undertone, NOT pure black). Deep crimson glow (#3A1A1C) spreading wide behind the body; cooler bruised-violet (#1F1A2A) bleed at one corner — the cannibal-shadow signature, unique to Majungasaurus in the chapter 1 roster. Stronger vignette (UNCOMMON tier). NO swamp, NO bones, NO terrain horizon.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette — aged brass + deep crimson + bruised-violet jewel tones, never neon. Reads as a patient solitary cannibal emerging mid-summon — menace through stillness and closed-jaw dried blood.

FORBIDDEN:
- Text, letters, numbers, readable language
- Sparks, particles, splatter — only TWO solid jaw drips MAX
- Multiple majungasaurus, prey carcass, bone pile, second creature
- Full environment — swamp, forest, terrain, sky
- Frame, border, card UI overlay
- Painted soft-gradient, oil painting, airbrush blur
- Recoloring body away from REF — pixel-faithful only
- Confused with Carnotaurus: ONE forehead dome, NOT two bull-horns above eyes
- Confused with Allosaurus: bulldog skull + single dome, NOT paired horn-ridges + three-fingered arms
- Full open roar — closed or half-open feeder only
- Glowing lamp eyes — sunken half-lidded only
- Neon saturation, blown-out white core
- UNCOMMON rarity glow halo, particle aura, frame color change
```

---

## HERBIVORE — Chapter 2 (2장)

> **챕터2 톤 가이드**: 1챕터(차콜+덩굴녹+석조보라)에서 **재빛구름+보라번개+황동(식어가는 햇빛)**으로 이동. 흰구름·풀솜 톤 금지 — 폭풍·재·균열 사이로 비치는 보라빛이 광원. 익룡 라인은 천공권 ember에 미세 반응한 흔적(날개 pinion area에 보라 sheen)이 시각 시그니처. 챕터2 4종은 **REF 미작성 상태** (species art TBD) — REF가 만들어지면 v1.4 룰대로 그림색 100% 그대로 따라감. 그 전까지는 species standard depiction 기준.

### C006 프테라노돈 (Pteranodon) — UNCOMMON / 2코 / 5 ATK / 14 HP / 활공 패시브

```
1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach `Resources/Dinos/Pteranodon.png` as REF 1.
- ANATOMY: species identification (Pteranodon proportions: long sharp swept-back head crest, narrow toothless beak, wide membranous wings, slender body, hind legs for perching).
- POSE / ANGLE / CAMERA: may vary freely — graceful evasive glide, NOT predatory dive.
- COLOR: **EXACT match to REF image — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors.** Body, wing membrane, crest, eye, beak: pixel-faithful to REF. **Chapter 2 sky-realm trace** (sole additive layer): subtle muted-violet sheen at the wing pinion areas only — applied as sheen layer, does NOT recolor body.
- DISCARD: tropical-blue or saturated paradise coloring, daylight sky, cliff terrain, secondary fliers.

SUBJECT (dinosaur occupies ~32% of canvas):
A single Pteranodon in any aerial-grace pose (suggestions: mid-glide with wings fully spread tilted diagonally, three-quarter banking turn revealing wing underside, perched on unseen edge with one wing partially folded). The long swept-back head crest must read clearly as the species signature. Pose feels light and evasive. Crisp cel-shaded shadows on wing underside, bright highlight along leading wing edge and crest ridge.

DINO COLOR (EXACT REF — no muting, no shifting):
- Body: REF base color, pixel-faithful.
- Belly: REF belly tone exactly.
- Wing membrane: REF wing color and pattern.
- Wing membrane pinion area: subtle muted-violet sheen — chapter 2 sky-realm signature ONLY (this is the sole additive trace, applied as sheen layer NOT body recolor).
- Crest ridge / wing-finger bone tips: REF color.
- Eye: REF eye color.
- Beak: REF beak color (toothless).

SUMMON AURA (sky-realm signature):
At the pteranodon's level (no ground — it's airborne): a swirling violet-and-amber ember halo wrapping the lower body and tail. TWO solid cel-shaded wind ribbons curl off the wingtips in pale dust-violet — solid shapes, NOT particles. Lighter aura than ground-summon dinos because it's mid-air.

BACKDROP:
Cool-tinted moody dark base (#181A22 — subtle storm-violet undertone, NOT pure black). Cool muted-violet radial glow (#2A1F3A) behind the pteranodon spreading wide; warm aged-brass (#3A2A14) bleed at one corner for contrast. Subtle vignette only at extreme corners. NO clouds, NO sky horizon, NO terrain, NO floating debris.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette — aged brass + violet jewel tones in backdrop, never neon. Reads as small allied flier emerging mid-summon, NOT enemy wyvern.

FORBIDDEN:
- Text, letters, numbers, readable language
- Sparks, glitter, particles, scattered feathers
- Multiple pteranodons, second silhouette
- Full environment — clouds, sky horizon, terrain, ruins, architecture
- Frame, border, card UI overlay
- Painted soft-gradient, oil painting, airbrush blur
- Inventing skin colors that conflict with REF/species standard — only the pinion violet sheen is added on top
- Open mouth showing teeth (Pteranodon is toothless — closed beak only)
- Aggressive snarl pose — graceful glide only
- Neon saturation, blown-out white core
```

---

### C009 케찰코아틀루스 (Quetzalcoatlus) — RARE / 3코 / 6 ATK / 26 HP / 폭풍의 그림자

```
1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach `Resources/Dinos/Quetzalcoatlus.png` as REF 1 when available. **REF TBD** — until species art exists, generate per Quetzalcoatlus standard depiction (dark grey-brown body, pale buff underside).
- ANATOMY: species identification (Quetzalcoatlus proportions: enormous size, long stork-like neck, massive narrow beak, blade-like swept crest, weight-bearing hind limbs — this giant walks on the ground when not flying).
- POSE / ANGLE / CAMERA: may vary freely — imperious watcher, NOT screaming roar.
- COLOR: when REF exists, **EXACT match to REF image — sample REF pixels directly. Do NOT mute saturation, do NOT shift hue.** Until REF exists, use species standard sober palette. **Chapter 2 sky-realm trace**: subtle muted-violet sheen at wing pinion areas only (additive sheen layer, NOT body recolor).
- DISCARD: bright tropical coloring, daylight wetland, secondary fliers.

SUBJECT (dinosaur occupies ~40% of canvas — RARE apex):
A single Quetzalcoatlus in any imperious pose (suggestions: standing on the ground with wings half-folded into sharp V silhouette behind body, three-quarter view neck arched in observation, low-angle looking up at the towering crest). The enormous narrow beak and sweeping blade-crest must be the visual signature. Posture reads as imperious watcher. Crisp cel-shaded hard shadows on neck underside and wing folds, bright highlight along upper crest edge.

DINO COLOR (EXACT REF when available; species standard fallback. NO muting, NO hue shift):
- Body: REF/standard dark grey-brown, pixel-faithful.
- Belly / neck underside: REF/standard tone exactly.
- Wing membrane: REF/standard color + subtle muted-violet sheen at pinion areas ONLY (additive sheen layer, NOT body recolor — chapter 2 signature).
- Beak / crest leading edge: REF/standard color.
- Eye: REF/standard eye color.
- Talons / feet: REF/standard color.

SUMMON AURA (RARE storm signature):
At the creature's feet: a wider deeper violet-ember halo seeping from cracked ground beneath. THREE cel-shaded ember-violet jets curl up around legs and lower wing edges. ONE long shadow stretches forward from the silhouette in solid cel-shaded charcoal — implies the "storm shadow" debuff signature. Aura more intense than C006 — RARE-tier weight.

BACKDROP:
Cool-tinted moody dark base (#161620 — subtle violet-cool undertone for RARE weight, NOT pure black). Cool muted-violet radial glow (#2A1F3A) behind the creature spreading wide; deep crimson (#3A1822) bleed at one corner for tension contrast. Stronger vignette than commons (RARE rarity). NO clouds, NO sky, NO horizon, NO terrain detail.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette — aged brass + deep slate + violet jewel tones in backdrop, never neon. Reads as towering imperious flier emerging mid-summon. RARE feel through composition + heavier shadow weight, NOT through extra glow or particles.

FORBIDDEN:
- Text, letters, numbers, readable language
- Sparks, glitter, particles, light dots
- Multiple creatures, secondary flying creatures
- Full environment — clouds, sky, horizon, terrain, ground plane texture, architecture
- Frame, border, card UI overlay
- Painted soft-gradient, oil painting, airbrush blur
- Inventing skin colors that conflict with REF/species standard — only the pinion violet sheen is added on top
- Open mouth roar pose — closed beak watching pose only
- Glowing lamp eyes — eye is amber slit
- Neon saturation, blown-out white core
- RARE rarity glow halo, particle aura, frame color change (rarity by trim only — illustration neutral per project_card_rarity rule)
```

---

## CARNIVORE — Chapter 2 (1장)

### C013 기가노토사우루스 (Giganotosaurus) — RARE / 3코 / 12 ATK / 20 HP / 군주의 포효 / 보스보상 한정

```
1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach `Resources/Dinos/Giganotosaurus.png` as REF 1 when available. **REF TBD** — until species art exists, generate per Giganotosaurus standard depiction (dark brown-grey body with crimson wash along spine ridges, pale underside).
- ANATOMY: species identification (Giganotosaurus proportions: colossal bipedal apex larger than T-Rex, narrower head than T-Rex, pronounced spine-ridge running from neck down back forming a subtle crown silhouette — signature feature, short two-fingered forelimbs, massive jaw).
- POSE / ANGLE / CAMERA: may vary freely — sovereign-stance, NOT open roar.
- COLOR: when REF exists, **EXACT match to REF image — sample REF pixels directly. Do NOT mute saturation, do NOT shift hue.** Until REF exists, use species standard dark brown-grey palette. NO chapter 2 violet trace.
- DISCARD: volcanic backdrop, scarred-earth, defeated enemies, throne.

SUBJECT (dinosaur occupies ~42% of canvas — boss-reward weight):
A single Giganotosaurus in any sovereign-stance pose (suggestions: regal upright with chest pushed forward and head held high closed-jaw scowl, three-quarter low-angle looking up at the towering frame, head turned slightly with crown-ridge silhouette catching light). The spine-ridge crown silhouette and closed-jaw scowl must be visual signatures. Tail curves back in S-shape weight-bearing. Mouth FIRMLY CLOSED — teeth visible only at corner.

DINO COLOR (EXACT REF when available; species standard fallback. NO muting, NO hue shift):
- Skin top: REF/standard color, pixel-faithful.
- Spine ridge wash: REF/standard wash color along spine ridges and tail underside.
- Belly: REF/standard belly tone exactly.
- Spine-ridge crown: REF/standard color along dorsal ridge — the signature "tyrant crown".
- Eye: REF/standard eye color, heavy ridged brow above — unblinking.
- Teeth: REF/standard teeth color, only corner visible (closed jaw).
- Inner mouth (corner glimpse): REF/standard inner-mouth color.

SUMMON AURA (boss-reward signature, restrained):
At the giganotosaurus's feet: a deep imposing crimson-near-black ember halo seeping from a wide deep cracked ground. TWO heavier cel-shaded ember jets curl up around hind legs. ONE solid cel-shaded crimson aura silhouette traces just behind the crown spine ridge — single hard-edge shadow line, conveying "presence" not flame. The aura is darker and more contained than other RAREs — "trophy weight" reads through depth, NOT brightness.

BACKDROP:
Deepest moody dark base of all chapter 2 dinos (#141214 — faint crimson undertone for boss-reward weight, NOT pure black). Deep crimson radial glow (#2A1418) along spine ridge only spreading narrow; cooler indigo (#1F1834) bleed at upper corners for dread contrast. Strongest vignette at corners — boss-reward exclusivity reads through composition density. NO terrain, NO sky, NO trophy room, NO defeated enemies.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette — aged brass + deep crimson + dark brown-grey jewel tones, never neon. Reads as the absolute sovereign apex emerging mid-summon — sovereign weight through crown-ridge silhouette + closed-jaw scowl + S-curve tail, NOT through aggressive open-mouth roar.

FORBIDDEN:
- Text, letters, numbers, readable language
- Sparks, glitter, particles, fire breath, roar mist
- Multiple creatures, defeated enemy, throne
- Full environment — terrain, sky, throne room, trophy display, architecture
- Frame, border, card UI overlay
- Painted soft-gradient, oil painting, airbrush blur
- Inventing skin colors that conflict with REF/species standard
- Open-mouth roar pose — closed jaw scowl only (signature: closed scowl tyrant, not screaming)
- Confused with T-Rex (Giga is larger, narrower head, more pronounced spine ridge crown)
- Confused with Allosaurus (Giga has spine crown — Allo has horn ridges above eyes)
- Glowing lamp eyes — eye is cold amber slit
- Neon saturation, blown-out white core
- RARE rarity glow halo, particle aura, gold frame, gold trim — illustration must be neutral per project_card_rarity rule (rarity by trim only)
```

---

## OMNIVORE — Chapter 1 (4장)

잡식 시각 차별화: 아우라 = **amber-olive hybrid** (육식 warm-ember + 초식 jade-earth 중간), 백드롭 = 종별 고유 팔레트. 불꽃도 뿌리도 아닌 **흙에서 피어오르는 열기** 톤.

### C013 테리지노사우루스 (Therizinosaurus) — UNCOMMON / 2코 / 9 ATK / 18 HP / 슬래시 방어막

```
1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach `Resources/Dinos/Therizinosaurus.png` as REF 1.
- ANATOMY: species identification (Therizinosaurus proportions: enormous bipedal, THREE parallel sickle claws per forelimb each roughly as long as the forearm — all three forward-pointing loosely in parallel like drawn blades NOT splayed, long neck, small beaked head, deep wide torso, rough osteoderm texture on neck and shoulders).
- POSE / ANGLE / CAMERA: may vary freely — deliberate power, NOT predatory sprint.
- COLOR: **EXACT match to REF image — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors.** Body, sickle claws, underbelly, eye, beak: pixel-faithful to REF.
- DISCARD: any background environment in REF.

SUBJECT (dinosaur occupies ~35% of canvas — UNCOMMON):
**Composition strategy: RAISED CLAW BLADE FRAME.** One forelimb raised and pushed toward viewer, three sickle claws pointing forward in parallel — all three clearly visible as distinct blades. Other forelimb lower, claws still readable. Camera is three-quarter front, slightly low angle so the claws fill the mid-upper frame. Long neck arches, small beaked head tilts down behind the claw display — the creature looks at the viewer past its own weapons. Body and hindlegs anchor the lower half. Reads as a walking blade rack — deliberate, unhurried, impossibly armed.

DINO COLOR (EXACT REF — no muting, no shifting):
- Skin: REF base color, pixel-faithful.
- Sickle claws: REF claw color exactly.
- Underbelly: REF belly tone.
- Eye: REF eye color.
- Beak: REF beak color.

SUMMON AURA (omnivore hybrid — earth warmth, NOT fire):
At the therizinosaurus's feet: a warm amber-olive halo (#2A2010 → #7A5A18) seeping from a cracked ground line. ONE thick cel-shaded amber-earth wisp rises behind the hindlegs. A faint amber trace runs along the inner curve of each sickle claw — emphasizing the blades without flame. NO sparks, NO ember dots — solid cel-shaded shapes only.

BACKDROP:
Slate-cool moody dark base (#181C18 — cool grey-green undertone matching the body, NOT pure black). Cool slate-grey-green glow (#1E2A20) spreading wide behind the body; warm aged-amber (#2A2010) bleed at lower corner beneath the raised claw. Subtle vignette. NO forest, NO terrain, NO sky.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette — aged brass + cool slate-green + muted amber jewel tones, never neon. Reads as a towering armament emerging mid-summon — threat through sheer blade count, not aggression.

FORBIDDEN:
- Text, letters, numbers, readable language
- Sparks, ember fire, particles
- Claws splayed in different directions (must be parallel forward-pointing blades)
- Feathers or plumage, teeth replacing beak
- Multiple therizinosauruses, second creature
- Full environment — forest, terrain, sky, ruins
- Frame, border, card UI overlay
- Painted soft-gradient, oil painting, airbrush blur
- Inventing new colors, muting saturation, or hue-shifting REF
- Predatory crouch or sprint (deliberate slow stance only)
- Warm fire-ember aura — omnivores use amber-olive earth-warm aura
```

---

### C015 이구아노돈 (Iguanodon) — UNCOMMON / 1코 / 7 ATK / 20 HP / 균형 잡식

```
1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach `Resources/Dinos/Iguanodon.png` as REF 1.
- ANATOMY: species identification (Iguanodon proportions: large robust bipedal, CONICAL THUMB SPIKE projecting forward from thumb joint on each hand — must be clearly prominent, three clawed fingers plus the spike per hand, wide flat blunt snout NOT a duck-bill, bulky frame, long muscular hindlimbs, long counterbalancing tail, rough scale texture).
- POSE / ANGLE / CAMERA: may vary freely.
- COLOR: **EXACT match to REF image — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors.** Skin, scale patches, thumb spike, belly, eye, snout: pixel-faithful to REF.
- DISCARD: any background environment in REF.

SUBJECT (dinosaur occupies ~33% of canvas — UNCOMMON):
**Composition strategy: THUMB SPIKE PRESENTATION.** Three-quarter front view, body angled right. One forelimb raised with the conical thumb spike angled toward the viewer — deliberate and spine-straight. The spike must read as the visual signature from across the card. Wide blunt snout closed. Other forelimb lower, thumb spike readable. Robust stocky frame. Reads as a steady capable combatant — not a predator, not prey, just capable.

DINO COLOR (EXACT REF — no muting, no shifting):
- Skin: REF base color, pixel-faithful.
- Scale patches: REF pattern color and placement.
- Belly: REF belly tone.
- Thumb spike: REF spike color.
- Eye: REF eye color.
- Snout: REF snout color, wide and flat.

SUMMON AURA (omnivore — amber-olive earth-warm):
At the iguanodon's feet: a warm amber-olive halo (#2A2010 → #6A5018) from a cracked ground line. ONE solid cel-shaded earth-amber wisp curls behind the hindlegs. A faint amber trace along the tip of the raised thumb spike. NO sparks, NO pure fire ember.

BACKDROP:
Warm sage-earth moody dark base (#1C1C14 — faint warm olive undertone, NOT pure black). Warm muted amber-sage glow (#2A2818) behind the body; cooler slate (#1A1E1C) bleed at one corner. Vignette at corners. NO meadow, NO forest, NO sky, NO terrain.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette — aged brass + warm sage jewel tones, never neon. Reads as a balanced capable combatant emerging mid-summon.

FORBIDDEN:
- Text, letters, numbers, readable language
- Sparks, pure fire flame, particles
- Missing or small thumb spike — must be clearly visible and prominent
- Quadruped four-legged stance
- Duck-bill hadrosaur snout (wide flat blunt only)
- Multiple creatures
- Full environment — meadow, forest, sky, terrain
- Frame, border, card UI overlay
- Painted soft-gradient, oil painting, airbrush blur
- Inventing new colors, muting saturation, or hue-shifting REF
- Warm fire-ember aura — omnivores use amber-olive earth-warm aura
```

---

### C016 케라토사우루스 (Ceratosaurus) — UNCOMMON / 2코 / 10 ATK / 14 HP / 블리드 어택

```
1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach `Resources/Dinos/Ceratosaurus.png` as REF 1.
- ANATOMY: species identification (Ceratosaurus proportions: medium bipedal, ONE NASAL HORN at very tip of snout — flat blade shape, forward-pointing, NOT bull-horns above eyes, small brow bumps NOT flat ridges, FOUR-FINGERED forelimbs — four distinct claw fingers per hand, long laterally-flattened tail, robust jaw).
- POSE / ANGLE / CAMERA: may vary freely.
- COLOR: **EXACT match to REF image — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors.** Skin, blotch pattern, nasal horn, belly, eye, teeth: pixel-faithful to REF.
- DISCARD: any background environment in REF.

SUBJECT (dinosaur occupies ~33% of canvas — UNCOMMON):
**Composition strategy: NASAL HORN PROFILE.** True profile or slight three-quarter view putting the nasal horn as the leading point of the head silhouette. Low forward-lean body. One forelimb extended, four claws fanned. Mouth half-open showing teeth. Tail raised for balance. The nasal horn must jut forward clearly — species signature. Reads as a fast bleeder — mobile, precise, dangerous.

DINO COLOR (EXACT REF — no muting, no shifting):
- Skin: REF base color, pixel-faithful.
- Blotch pattern: REF blotch color and placement.
- Nasal horn: REF horn color.
- Belly: REF belly tone.
- Eye: REF eye color.
- Teeth: REF teeth color.
- Four claws per hand: REF claw color.

SUMMON AURA (omnivore — amber-olive with violet bleed tinge):
At the ceratosaurus's feet: a warm amber-olive halo (#261A14 → #6A4A18) from cracked ground. ONE cel-shaded amber wisp behind the hindlegs. ONE faint bruised-violet drip on the very tip of the nasal horn — one solid streak, hard shape, NOT splatter, NOT fire. The violet drip signals the bleed mechanic. NO fire jets, NO sparks.

BACKDROP:
Deep indigo-violet moody dark base (#16121E — faint violet undertone, NOT pure black). Dark violet glow (#1E1428) behind the body spreading wide; warm aged-amber (#241A0E) bleed at lower corner for omnivore warmth. Vignette at corners. NO terrain, NO forest, NO sky, NO water.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette — aged brass + deep violet + amber jewel tones, never neon. Reads as a precise mobile bleeder emerging mid-summon — nasal horn and violet drip signal the mechanic.

FORBIDDEN:
- Text, letters, numbers, readable language
- Sparks, pure fire, heavy flame
- Bull-horns above eyes (Carnotaurus), flat eye-ridge crests (Allosaurus), single dome (Majungasaurus)
- Three-fingered hands — must be FOUR clawed fingers per hand
- Nasal horn positioned above eyes instead of snout tip
- Multiple creatures
- Full environment — terrain, forest, sky, water
- Frame, border, card UI overlay
- Painted soft-gradient, oil painting, airbrush blur
- Inventing new colors, muting saturation, or hue-shifting REF
- UNCOMMON rarity glow halo, particle aura, frame color change
```

---

### C017 갈리미무스 (Gallimimus) — COMMON / 1코 / 6 ATK / 10 HP / 속도형

```
1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach `Resources/Dinos/Gallimimus.png` as REF 1.
- ANATOMY: species identification (Gallimimus proportions: large bipedal ostrich-dinosaur, LONG POWERFUL LEGS dominate the silhouette, long slender neck, FLAT TOOTHLESS BEAK — no teeth at all, three forward toes, long arms swept back in running pose, small rounded body relative to legs, long thin tail).
- POSE / ANGLE / CAMERA: may vary freely — full running stride, NOT standing.
- COLOR: **EXACT match to REF image — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors.** Skin, neck stripes, belly, eye, beak: pixel-faithful to REF.
- DISCARD: any background environment in REF.

SUBJECT (dinosaur occupies ~30% of canvas — COMMON speed unit):
**Composition strategy: FULL SPRINT DIAGONAL.** Camera low and slightly behind-side, catching the gallimimus mid-full-sprint. Body angled diagonally — one leg fully extended back, one pushing off, neck thrust forward, arms swept back. LEGS dominate the canvas, head at one corner, tail trailing at the other. Motion is the entire story. Reads as pure velocity — the fastest unit in the roster.

DINO COLOR (EXACT REF — no muting, no shifting):
- Skin: REF base color, pixel-faithful.
- Neck stripes: REF stripe color and direction.
- Belly: REF belly tone, significantly lighter.
- Arms: REF arm color.
- Eye: REF eye color — large and round.
- Beak: REF beak color, flat and toothless.

SUMMON AURA (omnivore speed — horizontal dust-amber trail, NOT upward fire):
Behind the running legs: horizontal dust-amber wisps (#2A2010 → #6A5018) — solid cel-shaded flat shapes streaking backward from each hind leg. ONE short ground crack at the back foot's push-off point. The wisps are horizontal and low, following the sprint direction. NO upward ember jets, NO vertical flame.

BACKDROP:
Warm sandy-amber moody dark base (#1E1A10 — faint sandy undertone, NOT pure black). Warm amber glow (#2A2010) behind the body along the sprint diagonal; cooler slate-indigo (#181820) at the opposite corner. The horizontal gradient emphasizes the sprint direction. Vignette at extreme corners. NO terrain, NO sky, NO ground plane.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette — aged brass + warm sandy-amber + cool slate jewel tones, never neon. Reads as the roster's fastest unit mid-sprint — velocity through diagonal composition and horizontal dust wake.

FORBIDDEN:
- Text, letters, numbers, readable language
- Sparks, vertical fire jets, upward flame
- Teeth in the jaw — toothless flat beak only, NO teeth visible
- Short legs — legs must dominate canvas
- Static standing pose — must be full running stride
- Large bulky body
- Multiple gallimimuses
- Full environment — terrain, sky, trees, ruins, ground texture
- Frame, border, card UI overlay
- Painted soft-gradient, oil painting, airbrush blur, motion blur
- Inventing new colors, muting saturation, or hue-shifting REF
- Feather rendering
```

---

## DINO CARD ART (T0) — CardArt/Dino/ 용

> **용도**: `Assets/Resources/CardArt/Dino/` 폴더. 957×616 landscape, 중립 차콜 배경. Summon 카드와 달리 백드롭·오라 없음 — 피사체만.
> **기존 완료**: Raptor / Carnotaurus / T-Rex / Compsognathus
> **미완료**: Allosaurus / Majungasaurus (아래 프롬프트로 생성)
> **REF**: `Resources/Dinos/` 인게임 스프라이트 사용 (REF 없는 scratch 방식 금지)

### C012 알로사우루스 (Allosaurus) — Dino 카드 아트
**REF: `Resources/Dinos/Allosaurus.png` 첨부**

```
1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach `Resources/Dinos/Allosaurus.png` as REF 1.
- ANATOMY: use REF 1 for species proportions — TWO HORN-RIDGE CRESTS above each eye (elongated bony ridges, the species signature), head smaller and narrower than T-Rex, THREE clawed fingers per forelimb, muscular bipedal frame, long balancing tail.
- POSE / ANGLE / CAMERA: may vary freely from REF — pick a pose that shows the species signature features best. Creature faces RIGHT.
- COLOR: **EXACT match to REF 1 — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors.**
- DISCARD: any background environment in REF.

SUBJECT (dinosaur occupies ~55–65% of canvas — Dino card, creature-focused):
Single Allosaurus in a dynamic predator pose (suggestions: low horizontal stalk with head down and tail counterweighting, three-quarter view with one forelimb raised showing three claws, snarling front-facing angle emphasizing horn-ridges). The TWO horn-ridge crests must read clearly — species signature. Mouth slightly open, NOT full roar. Three clawed fingers visible on at least one forelimb. The creature fills most of the canvas — this is a character portrait, not a dramatic scene.

DINO COLOR (EXACT REF — pixel-faithful):
Sample directly from REF 1. Do NOT mute, do NOT shift hue, do NOT add or remove any color.

BACKGROUND / ATMOSPHERE:
Moody dark backdrop — NOT flat charcoal, NOT a full scene. Layered atmospheric depth:
- Base: deep warm-umber dark base (#1A1614) — faint warmth matching the creature's reddish-brown body tone.
- Behind the creature: a contained warm crimson radial glow (#3A1C10) — low and wide, NOT a fireball or ember jet. Just enough depth to silhouette the horn-ridges and body against the dark.
- Rim light: warm amber catches the top of the horn-ridges above the eyes and along the spine — hard cel-shaded highlight edge, the defining contour of the Allosaurus silhouette.
- Corner vignette: heavy, pulling the eye inward to the creature.
- NO ground plane, NO terrain texture, NO sky, NO summoning crack or ember jets rising from below. The atmosphere comes from the glow and rim light only — a predator stepping out of darkness.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette — warm amber rim + deep crimson glow + reddish-brown body from REF, never neon. Reads as a frenzy predator portrait — threat implied through low stance and atmospheric shadow.

FORBIDDEN:
- Text, letters, numbers, readable language
- Ground crack, rising ember jet, summoning halo — this is NOT a Summon card
- Any armor, any gear, any accessories (T0 bare)
- Multiple creatures, prey carcass, second creature
- Full environment — terrain, jungle, sky, ruins, foliage, ground plane
- Frame, border, card UI overlay
- Painted soft-gradient, oil painting, airbrush blur
- Recoloring body away from REF — pixel-faithful only
- Confused with T-Rex (THREE clawed fingers + horn-ridges — NOT T-Rex two-stub arms)
- Full open roar — half-open stalk only
- Neon saturation, blown-out white core
```

---

### C014 마준가사우루스 (Majungasaurus) — Dino 카드 아트
**REF: `Resources/Dinos/Majungasaurus.png` 첨부**

```
1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach `Resources/Dinos/Majungasaurus.png` as REF 1.
- ANATOMY: use REF 1 for species proportions — SINGLE ROUGH DOME-BUMP centered on forehead (species signature), SHORT wide blunt bulldog skull with thick rough snout, forelimbs TINY VESTIGIAL STUBS barely visible, deep barrel body, stocky hindlegs, thick tail.
- POSE / ANGLE / CAMERA: may vary freely from REF — pick a pose that shows the species signature clearly. Creature faces RIGHT.
- COLOR: **EXACT match to REF 1 — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors.**
- DISCARD: any background environment in REF.

SUBJECT (dinosaur occupies ~55–65% of canvas — Dino card, creature-focused):
Single Majungasaurus in a deliberate menacing pose (suggestions: head lowered with a slow side-glance toward viewer, three-quarter view with mouth half-open showing jaw depth, close-up low angle with the forehead dome and thick snout dominating). The single forehead dome + thick bulldog snout are the visual signature. Posture reads as patient, heavy, watchful. The creature fills most of the canvas — character portrait, not a dramatic scene.

DINO COLOR (EXACT REF — pixel-faithful):
Sample directly from REF 1. Do NOT mute, do NOT shift hue, do NOT add or remove any color.

BLOOD MARKS: If REF shows dried blood on the jaw, preserve exactly. Do NOT add new blood. Do NOT remove existing. Dark dried ox-blood only — NOT bright wet red.

BACKGROUND / ATMOSPHERE:
Moody dark backdrop — NOT flat charcoal, NOT a full scene. Layered atmospheric depth:
- Base: deep warm-charcoal with faint desaturated grey-brown undertone matching the creature's body tone (#181412).
- Behind the creature: a low wide radial glow in deep crimson-near-violet (#2A1418) — the cannibal-shadow signature, very contained, NOT a fireball. Just enough to silhouette the body against darkness.
- Rim light: cold pale amber light catches the top of the forehead dome and the spine ridge — a single hard cel-shaded highlight, as if moonlight or a distant ember is the only light source.
- Corner vignette: heavy, pulling the eye inward to the creature.
- NO ground plane, NO terrain texture, NO sky, NO summoning crack or ember jet. The atmosphere is all implied through the glow and rim light — this is a character reveal, not a summoning.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette — aged brass rim + deep crimson glow + sooty grayish-brown body from REF, never neon. Reads as a brooding predator portrait — quiet menace in the dark.

FORBIDDEN:
- Text, letters, numbers, readable language
- Ground crack, ember jet, violet summoning halo — this is NOT a Summon card
- Any armor, any gear, any accessories (T0 bare)
- Bright red fresh blood — dried ox-blood from REF only
- Multiple creatures, prey carcass, bone pile, second creature
- Full environment — terrain, forest, sky, ruins, foliage, ground plane
- Frame, border, card UI overlay
- Painted soft-gradient, oil painting, airbrush blur
- Recoloring body away from REF — pixel-faithful only
- Confused with Carnotaurus: ONE dome, NOT two bull-horns above eyes
- Full open roar — closed or half-open feeder only
- Neon saturation, blown-out white core
```

---

### C018 기가노토사우루스 (Giganotosaurus) — RARE / 3코 / 11 ATK / 18 HP / ENRAGE
REF: Resources/Dinos/Giganotosaurus.png 첨부

1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach Resources/Dinos/Giganotosaurus.png as REF 1.
- ANATOMY: use REF 1 for species proportions — PROMINENT SPINE-RIDGE CROWN running from neck down the back (elongated neural spines forming a low raised ridge/crest, the species signature), head slightly narrower than T-Rex with a longer lower jaw, TWO SHORT STUB FORELIMBS like T-Rex (not three-fingered), massive powerful hindlegs, thick counterbalancing tail.
- POSE / ANGLE / CAMERA: may vary freely — sovereign-stance, closed jaw, NOT open roar.
- COLOR: EXACT match to REF 1 — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors.
- DISCARD: any background environment in REF.

SUBJECT (dinosaur occupies ~60% of canvas — RARE apex):
Single Giganotosaurus in a regal dominant pose (suggestions: regal upright with chest pushed forward and closed-jaw scowl, three-quarter low-angle looking up at the towering frame, head slightly turned with spine-ridge crown silhouette catching rim light). The spine-ridge crown and closed-jaw scowl are the visual signature. Battle scars across the body — each hit made it stronger. Tail curves in a slight S behind.

DINO COLOR (EXACT REF — pixel-faithful):
Sample directly from REF 1. Do NOT mute, do NOT shift hue.

BACKGROUND / ATMOSPHERE:
Deep crimson-dark base (#141014) — the heaviest, darkest carnivore backdrop. A wide deep crimson radial glow (#3A1018) behind the body. Rim light: warm amber-brass catches the spine-ridge crown edge and the jaw line — the most defining silhouette feature of this creature. Heavy corner vignette. NO ground plane, NO terrain, NO summoning crack.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette — aged brass rim + deep crimson glow, never neon. Reads as the sovereign apex — a creature that grows stronger the more it is struck.

FORBIDDEN:
Text, letters, numbers. Summon aura, ember jets, ground cracks. Any armor or gear. Multiple creatures. Full environment. Frame, border, card UI. Painted soft-gradient, oil painting, airbrush blur. Recoloring body away from REF. Open roar — closed-jaw scowl only. Confused with T-Rex: Giganotosaurus has the spine-ridge crown and a longer narrower lower jaw. Neon saturation.

---

### C019 트로오돈 (Troodon) — COMMON / 1코 / 5 ATK / 8 HP / AMBUSH
REF: Resources/Dinos/Troodon.png 첨부

1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach Resources/Dinos/Troodon.png as REF 1.
- ANATOMY: use REF 1 for species proportions — LARGE FORWARD-FACING EYES giving binocular vision (the species signature — eyes face forward like an owl, not sideways), small turkey-to-emu sized frame (visibly smaller than Raptor), long agile arms with three curved claws, SICKLE CLAW on hind foot (smaller than Raptor's), slender narrow snout, long balancing tail.
- POSE / ANGLE / CAMERA: may vary freely — patient lurking ambush stance. Creature faces RIGHT.
- COLOR: EXACT match to REF 1 — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors.
- DISCARD: any background environment in REF.

SUBJECT (dinosaur occupies ~45% of canvas — COMMON small unit):
Single Troodon in a still watchful ambush pose (suggestions: low crouching body with large eyes locked forward on the viewer, three-quarter side view with one raised hind sickle claw, head-on close angle with both large eyes prominent). The forward-facing eyes dominate the face — the viewer feels watched. Small body, but alert and ready.

DINO COLOR (EXACT REF — pixel-faithful):
Sample directly from REF 1. Do NOT mute, do NOT shift hue.

BACKGROUND / ATMOSPHERE:
Very dark near-black base (#101010) — almost no ambient light. A thin, narrow warm amber rim light traces the silhouette edge only — like the creature is barely visible in deep shadow. No wide glow, no large radial light. The creature emerges from darkness. Corner vignette maximum. The threat is invisible until it strikes — read through near-total darkness with just the eyes and silhouette catching light.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette — aged brass rim + near-black void, never neon. Reads as a hidden ambush predator — the large eyes the only thing you see before it's too late.

FORBIDDEN:
Text, letters, numbers. Summon aura, ember jets, ground cracks. Any armor or gear. Multiple creatures. Full environment. Frame, border, card UI. Painted soft-gradient, oil painting, airbrush blur. Recoloring body away from REF. Full roar or aggressive charge (ambush = still and watchful). Eyes sideways-facing (must be forward-facing binocular). Neon saturation.

---

### C020 바리오닉스 (Baryonyx) — UNCOMMON / 2코 / 8 ATK / 14 HP / RAMPAGE
REF: Resources/Dinos/Baryonyx.png 첨부

1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach Resources/Dinos/Baryonyx.png as REF 1.
- ANATOMY: use REF 1 for species proportions — LONG NARROW CROCODILIAN SNOUT packed with many conical teeth (fish-catching jaw, the species signature — the snout is much longer and narrower than other theropods), LARGE THUMB CLAW on each forelimb (a single oversized sickle claw on the first digit, visible and prominent), longer forelimbs than T-Rex, robust muscular frame, long counterbalancing tail.
- POSE / ANGLE / CAMERA: may vary freely — aggressive forward momentum. Creature faces RIGHT.
- COLOR: EXACT match to REF 1 — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors.
- DISCARD: any background environment in REF.

SUBJECT (dinosaur occupies ~55% of canvas — UNCOMMON):
Single Baryonyx in an aggressive forward-lean rampage pose (suggestions: body pitched low and forward like a charge, crocodilian snout angled toward the viewer with conical teeth visible, three-quarter view with one forelimb raised showing the large thumb claw clearly). The long crocodilian snout + large thumb claw are the visual signature. Reads as a relentless chain-attacker — it won't stop.

DINO COLOR (EXACT REF — pixel-faithful):
Sample directly from REF 1. Do NOT mute, do NOT shift hue.

BACKGROUND / ATMOSPHERE:
Warm dark base (#141810) — faint warm umber undertone. A warm amber-orange radial glow (#3A2010) behind the body. Rim light: warm amber catches the long snout ridge and thumb claw tips — the two signature anatomical features. Heavy corner vignette. NO ground plane, NO water, NO terrain.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette — aged brass rim + warm amber glow, never neon. Reads as a relentless chaining predator — forward momentum, long jaw, raised thumb claw.

FORBIDDEN:
Text, letters, numbers. Summon aura, ember jets, ground cracks. Any armor or gear. Multiple creatures. Full environment, water, river. Frame, border, card UI. Painted soft-gradient, oil painting, airbrush blur. Recoloring body away from REF. Short blunt snout (must be LONG and NARROW crocodilian). Neon saturation.

---

### C021 아크로칸토사우루스 (Acrocanthosaurus) — UNCOMMON / 2코 / 7 ATK / 18 HP / INTIMIDATE
REF: Resources/Dinos/Acrocanthosaurus.png 첨부

1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach Resources/Dinos/Acrocanthosaurus.png as REF 1.
- ANATOMY: use REF 1 for species proportions — HIGH NEURAL SPINE RIDGE along the back (elongated vertebrae forming a raised sail-ridge from the neck to the tail — taller and more dramatic than a normal theropod's back ridge, but lower than Spinosaurus's full sail — the species signature), large robust head, short two-to-three fingered forelimbs, heavily muscled hindlegs and torso, long tail.
- POSE / ANGLE / CAMERA: may vary freely — oppressive heavy presence. Creature faces RIGHT.
- COLOR: EXACT match to REF 1 — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors.
- DISCARD: any background environment in REF.

SUBJECT (dinosaur occupies ~60% of canvas — UNCOMMON heavy):
Single Acrocanthosaurus in an oppressive low-angle pose (suggestions: low angle looking up at the massive frame, three-quarter view with the spine-ridge sail dominating the upper silhouette, slow deliberate forward lean with the heavy head casting shadow). The spine-ridge sail is the visual signature — it must read clearly along the back silhouette. Reads as an oppressive presence that drains the enemy just by existing.

DINO COLOR (EXACT REF — pixel-faithful):
Sample directly from REF 1. Do NOT mute, do NOT shift hue.

BACKGROUND / ATMOSPHERE:
Dark warm-charcoal base (#181414). A wide deep crimson radial glow (#3A1814) spreading heavily behind the full body silhouette. Rim light: warm brass catches the spine-ridge sail line from neck to back — the most defining silhouette feature. The shadow under the massive body is deep and oppressive. Heavy corner vignette. NO ground plane, NO terrain.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette — aged brass rim + deep crimson glow, never neon. Reads as a living wall of oppression — the spine ridge and sheer mass communicate INTIMIDATE before any attack lands.

FORBIDDEN:
Text, letters, numbers. Summon aura, ember jets, ground cracks. Any armor or gear. Multiple creatures. Full environment. Frame, border, card UI. Painted soft-gradient, oil painting, airbrush blur. Recoloring body away from REF. Spine ridge missing or flat (must be clearly elevated above the back). Confused with Spinosaurus: Acrocanthosaurus spine ridge is lower and more muscular — NOT Spinosaurus's tall thin fin. Neon saturation.

---

### C022 카르카로돈토사우루스 (Carcharodontosaurus) — RARE / 3코 / 10 ATK / 16 HP / EXECUTE
REF: Resources/Dinos/Carcharodontosaurus.png 첨부

1024x1024 PNG, 1:1 square, full-bleed. Anime cel-shaded.

REFERENCE: Attach Resources/Dinos/Carcharodontosaurus.png as REF 1.
- ANATOMY: use REF 1 for species proportions — MASSIVE SERRATED BLADE TEETH (the species signature — each tooth has visible serrated edges like a shark's teeth, hence the name "shark-toothed lizard"), large skull slightly narrower than T-Rex with a longer lower jaw line, TWO SHORT STUB FORELIMBS (like T-Rex), enormous powerful hindlegs, long counterbalancing tail.
- POSE / ANGLE / CAMERA: may vary freely — cold calculated executioner stance. Creature faces RIGHT.
- COLOR: EXACT match to REF 1 — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors.
- DISCARD: any background environment in REF.

SUBJECT (dinosaur occupies ~60% of canvas — RARE apex):
Single Carcharodontosaurus in a cold precise executioner pose (suggestions: low-angle looking up at the massive frame with jaw slightly open showing serrated teeth prominently, three-quarter view with the jaw angled toward viewer so the serrated teeth fill the frame, close-up heavy scowl with teeth at the corner of the closed mouth). The SERRATED BLADE TEETH are the visual signature — they must be visible and clearly serrated. Reads as a cold precise finisher — no rage, just execution.

DINO COLOR (EXACT REF — pixel-faithful):
Sample directly from REF 1. Do NOT mute, do NOT shift hue.

BACKGROUND / ATMOSPHERE:
Cold dark base (#101418) — slightly cool undertone separating this from the warm carnivores. A contained deep crimson radial glow (#301018) behind the body — cold and precise, not explosive. Rim light: cold pale amber-white catches the jaw line and tooth edges — the serrated teeth must catch the light as the focal point. Heavy corner vignette. NO ground plane, NO terrain.

STYLE:
Anime cel-shading, crisp ink-line silhouette, hard-edge shadow blocks. Japanese dark fantasy palette — cold pale amber rim + deep crimson glow, never neon. Reads as a cold executioner — precision over rage, the serrated teeth as the last thing prey sees.

FORBIDDEN:
Text, letters, numbers. Summon aura, ember jets, ground cracks. Any armor or gear. Multiple creatures. Full environment. Frame, border, card UI. Painted soft-gradient, oil painting, airbrush blur. Recoloring body away from REF. Teeth smooth and unserrated (must be clearly blade-serrated). Confused with T-Rex: Carcharodontosaurus has serrated blade teeth + longer jaw line. Neon saturation.

---

## 변동 이력

- **v1 (2026-04-30)**: 1챕터 CARNIVORE 4종 (C004 랩터 / C005 카르노타우루스 / C008 티렉스 / C010 콤프소그나투스) 초기 작성. ATTACK 스펠과 동일한 anime cel-shading + 다크판타지 백드롭 + per-card 베이스 톤. REF 사용 룰 명시 (자세·체형 가이드만, 원본 컬러·환경 폐기).
- **v1.1 사이즈 축소 + REF 자유화 (2026-04-30)**: 공룡이 캔버스에서 차지하는 비율 대폭 축소 (랩터 60→30%, 카르노 60→32%, 티렉스 65→40%, 콤프 50→25%). REF는 **anatomy 가이드만**으로 명시 — 자세/각도/카메라 프레이밍은 자유롭게 변형 가능. 각 카드별 포즈 후보 3가지 제안 추가. 캔버스 여백이 늘어나 무디 백드롭 + 소환 오라가 더 잘 보이는 구도.
- **v1.2 종 컬러 보존 (2026-04-30)**: "공룡 컬러는 REF에 충실해야 함" 피드백 반영. 이전 "DISCARD original colors → 다크판타지 hex로 재컬러" 룰을 폐기하고 "REF 종 고유 컬러 유지 + 채도만 ~15% 낮춤" 으로 전환. 랩터=러스트 레드+크림 줄무늬, 카르노=번트 오렌지+검정 호랑이 무늬, 티렉스=딥 레드-브라운 옥스블러드, 콤프=옐로우-그린→포레스트 그린 시프트. 환경(정글/협곡/화산/양치류) 폐기 룰은 유지.
- **v2 챕터2 4종 추가 (2026-05-01)**: 챕터2 신규 공룡 4종(C006 프테라노돈 초식 / C009 케찰코아틀루스 초식 / C012 알로사우루스 육식 / C013 기가노토사우루스 육식 보스보상) 프롬프트 v1.2 양식대로 작성, **본문 섹션은 § HERBIVORE — Chapter 2 / § CARNIVORE — Chapter 2** 두 섹션에 추가됨. 익룡 2종은 cool-tinted backdrop(violet-storm) + pinion area에 미세한 보라 sheen만(body color 보존), 육식 2종은 1챕터 warm-ember 패밀리 그대로(시리즈 연속성). 별도 임시 파일 `DinoCardArtPrompt_Chapter2.md`(SpellCardArtPrompt 양식이었던 것)는 흡수 후 폐기.
- **v1.3 컬러 단순화 (2026-05-01)**: "REF 그림색 그대로 참고" 피드백 반영 — 이전 v1.2가 색 이름(rust-red / burnt-orange / oxblood / yellow-green)을 prompt에 박아서 REF 실제 색과 어긋나는 문제(특히 티렉스를 deep red-brown으로 묘사 → REF는 bright red-orange) 발생. 4종 모두 색 이름 제거 + "use the REF image's colors directly as your color guide / sample directly from REF image" 형태로 통일. 단 채도만 ~10-15% 낮추는 것은 유지. 티렉스 흰 발광 눈 → 앰버는 유일한 컬러 오버라이드로 명시.
- **v1.4 컬러 무조건 일치 (2026-05-01)**: "무조건 색을 카드 이미지에 맞히도록해" 피드백 반영. v1.3의 "~10-15% 채도 낮추기" + "티렉스 눈 앰버 오버라이드" + "주관적 색 묘사(bright red-orange / yellow-green / less neon-lime)" 모두 제거. 1챕터 4종 + 챕터2 4종 전부 **EXACT REF — sample REF pixels directly. Do NOT mute saturation. Do NOT shift hue. Do NOT invent or substitute colors** 룰로 통일. 환경 폐기 룰은 유지 (배경만 다크판타지로 교체, 공룡 컬러는 100% REF). 챕터2 익룡의 pinion 보라 sheen은 "추가 sheen 레이어"로 명시(body recolor 아님). REF 이미지 변경 = 출력 색 변경의 유일한 경로.
- **v1.5 1챕터 HERBIVORE 4종 추가 (2026-05-01)**: 1챕터 초식 4종 (C001 트리케라톱스 / C002 스테고사우루스 / C003 안킬로사우루스 / C011 브라키오사우루스) § HERBIVORE — Chapter 1 섹션으로 추가. **시각 차별화**: 육식 = warm-ember 백드롭(#1F1418) + 불꽃 오라 vs 초식 = earthy jade-bronze 백드롭(#1A1F1A) + 흙·뿌리 grounding 오라. 사이즈 트리 (트리/스테고 32% / 안키 35% / 브라키 40%). C011 브라키오는 REF 미생성 — 첫 생성 시 stone-grey + dusty olive 컬러 가이드 제공, 결과물을 REF로 등록 후 EXACT REF 룰로 전환 예정.
- **v1.6 REF 경로 정정 (2026-05-01)**: REF 첨부 경로를 `Resources/CardArt/Summon/...`(옛 painted 일러) → `Resources/Dinos/...`(필드용 투명배경 깨끗한 스프라이트, BattleUI line 899 사용처)로 일괄 교체. 13건. C011 브라키오사우루스 REF가 `Resources/Dinos/Brachiosaurus.png` 로 이미 존재함을 확인 — "REF 미생성" 경고 제거하고 다른 1챕터 4종과 동일하게 EXACT REF 룰 적용. C006 프테라노돈도 REF 존재 확인 → "REF TBD" 표기 제거. C009 케찰코아틀루스 / C012 알로사우루스 / C013 기가노토사우루스 3종은 여전히 Dinos/에 PNG 없어서 TBD 표기 유지.
- **v1.8 1챕터 CARNIVORE 풀 확장 (2026-05-03)**: "공룡 4종이 너무 적다 — 카드 빌딩 다양성 부족" 피드백 반영. C012 알로사우루스를 챕터2 → 챕터1로 이동(능력/스탯 유지, 프롬프트는 챕터1 carnivore 섹션 끝으로 이동, "NO chapter 2 violet trace" 메모는 의미 없어져 제거). C014 마준가사우루스 신규 (UNCOMMON 2코 9 ATK 14 HP, 동족포식 흡혈 패시브 — "처치 시 자신 HP +5"). 챕터2 violet bleed가 아닌 **bruised-violet 코너 bleed**를 마준가의 시그니처 백드롭으로 부여 — 챕터1 다른 카르노(랩터/카르노/티렉스/콤프/알로 = warm-ember only)와 구분되는 "necrotic 캐니벌" 톤. 챕터1 카르노 = (4장) → (6장), 챕터2 카르노 = (2장) → (1장)으로 헤더 조정. 마준가 REF 미존재 → species standard depiction 가이드(짧은 불도그 두개골 + 이마 boss + 더 짧은 vestigial arms). 진화 트리(T1/T2)는 베이스 일러 확정 후 결정.
- **v2.0 OMNIVORE 4종 + DINO T0 REF버전 추가 (2026-05-04)**: 1챕터 잡식 4종 (C013 테리지노사우루스 / C015 이구아노돈 / C016 케라토사우루스 / C017 갈리미무스) Summon 카드 프롬프트 신규 작성. 잡식 아우라 = amber-olive hybrid(육식/초식 중간), 종별 고유 백드롭 부여. DINO CARD ART T0 섹션 신설 — C012 알로사우루스 / C014 마준가사우루스 Dino T0 카드 아트 프롬프트 (REF = Dinos/ 인게임 스프라이트 사용, scratch 방식 폐기).
- **v1.7 1챕터 HERBIVORE 차별화 (2026-05-01)**: "4개 다 비슷하게 나옴 + 배경 색도 다양하게" 피드백. 4종 각자 고유 카메라 앵글·구도·배경 팔레트 부여. **C001 트리케라톱스** = head-on charge framing(low angle, frill-and-horns dominate upper half) + warm-earth backdrop(#1F1B16 / tan-amber glow). **C002 스테고사우루스** = rear-3/4 tail-swing(thagomizer arc into corner) + stormy jade-violet backdrop(#18201E / jade + violet-storm). **C003 안킬로사우루스** = wide low horizontal bulldozer(ground-level, sideways tail sweep) + stone-charcoal backdrop(#1A1B18 / aged-moss-jade + rust hint, 가장 어두움). **C011 브라키오사우루스** = extreme low-angle vertical(upward neck axis) + twilight teal-violet backdrop(#161A22 / sky-cool top + ground-warm bottom 수직 그라데이션). 손패에 4종이 동시에 있어도 한 눈에 구분 가능하도록 카메라+팔레트 모두 분리.
