# 유물 / 포션 아이콘 프롬프트 (Gemini Studio)

DianoCard 인벤토리·HUD에 표시되는 유물 21종 + 포션 16종 (총 37개) 개별 아이콘 프롬프트.

- **출력**: 1024×1024 PNG, 투명 배경
- **스타일 기준**: `Resources/InGame/HeadIcon/ATTACK.png`(붉은 단검 스티커) 톤 + 일본 다크판타지 셀셰이딩
- **저장 경로**:
  - 유물: `DianoCard/Assets/Resources/InGame/RelicArt/{ID}.png` (예: `R001.png`)
  - 포션: `DianoCard/Assets/Resources/InGame/PotionArt/{ID}.png` (예: `P001.png`)
- **데이터 소스**: `DianoCard/Assets/Resources/Tables/relic.csv`, `potion.csv`

## 공통 스타일 가이드 (참고용 — 각 프롬프트에 인라인 포함됨)

- **STYLE** — Japanese manga / JRPG anime illustration style (Granblue Fantasy + Arknights + Honkai Star Rail aesthetic). Anime cel-shading, bold ink outlines (#1A1814, 7-9px), flat hard-edged shading. NO painted/oil/airbrush/soft gradients, NO western comic, NO Disney/Pixar, NO American cartoon, NO 3D render, NO photorealism, NO watercolor.
- **PALETTE** — ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) = Japanese dark fantasy.
- **RARITY TRIM**:
  - COMMON  → weathered copper bronze rim glow (#B07E4F)
  - UNCOMMON → cool antique silver rim glow (#C8CDD0)
  - RARE    → warm aged gold rim glow (#D4A845)
  - SHOP/EVENT → muted oxblood ruby rim glow (#8E3A3A)
- **OUTPUT** — Opaque PNG, solid dark charcoal background (#1A1814), NO transparent areas. Single centered emblem, NO scene/text/numbers/border/multiple objects, NO circular border, NO circle frame, NO panel/plate background, NO halo ring around emblem.

---

# 🏺 유물 (Relic) — 21개 (R013 결번)

## ⚙️ Passive 계열

### 1. R001 고대의 뼈 (Ancient Bone) — COMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A single ancient weathered dinosaur rib bone, ivory cream color with hairline cracks and chipped edges, slight earth-stained patina, lying horizontally with a slight curve. Carved tribal rune symbol burned into the center bone surface. Faint copper-bronze rim glow around the bone silhouette.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (#1A1814, ~8px thick). Flat hard interior shading — ivory with cool gray shadows, dark stained crack lines. Soft drop shadow underneath. Single emblem centered. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: weathered copper bronze (#B07E4F) rim glow — COMMON.

FORBIDDEN: solid background, circular border, circle frame, panel background, scene, full skeleton, text, numbers, multiple bones, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 2. R004 약초꾼의 가방 (Herbalist Bag) — COMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A small leather satchel with brass buckles and stitching, slightly open at the top revealing one tiny green-glass potion vial peeking out. Two herb sprigs (sage/mint) tied with twine on the side. Worn leather texture with cel-shaded creases.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (#1A1814, ~8px thick). Flat hard interior — warm tanned brown leather, brass buckles, muted green herbs. Soft drop shadow. Single bag centered. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: weathered copper bronze (#B07E4F) rim glow — COMMON.

FORBIDDEN: solid background, circular border, circle frame, panel background, scene, character holding, multiple bags, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 3. R005 가죽 장갑 (Leather Gloves) — COMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A pair of weathered fingerless leather gauntlets crossed at an X angle, brass studded knuckles, frayed edges, deep oxblood and umber leather. One faint claw scratch mark across the front gauntlet.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — oxblood leather with darker shadows, brass stud highlights. Soft drop shadow. Centered emblem. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: weathered copper bronze (#B07E4F) rim glow — COMMON.

FORBIDDEN: solid background, circular border, circle frame, panel background, hands inside, full body, scene, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 4. R011 공룡의 심장 (Dino Heart) — RARE

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A preserved fossilized dinosaur heart suspended inside a thick glass cylinder vial sealed with brass caps. The petrified heart is deep oxblood-crimson with stone-like cracked surface, glowing amber veins pulsing inside the cracks. Brass mounting brackets top and bottom.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — translucent glass with sharp highlights, oxblood heart with amber emissive cracks (treat glow as solid shape). Soft drop shadow. Centered. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: warm aged gold (#D4A845) rim glow — RARE.

FORBIDDEN: solid background, circular border, circle frame, panel background, anatomically realistic heart, blood splatter, scene, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 5. R014 왕의 왕관 (King's Crown) — RARE

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: An ornate aged-brass crown with five jagged points modeled after T-Rex teeth. Central front spike is the largest and bears a single sapphire-blue gem. Hairline cracks along the brass band, gothic scrollwork engraved into the metal.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~9px). Flat hard shading — aged brass body with darker shadow plates, polished sapphire highlight. Soft drop shadow. Centered, slight three-quarter view. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: warm aged gold (#D4A845) rim glow — RARE.

FORBIDDEN: solid background, circular border, circle frame, panel background, head wearing crown, multiple gems, jewels falling, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 6. R021 균열의 인장 (Rift Seal) — RARE

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A circular brass seal medallion split by a jagged vertical crack. The crack glows with violet-sapphire emissive energy leaking outward. Engraved fusion rune (two interlocking circles) on each half. The split halves slightly offset, hovering as if frozen mid-break.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — aged brass with engraved rune shadows, solid emissive violet-sapphire crack glow (NOT airbrush). Soft drop shadow. Centered. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: warm aged gold (#D4A845) rim glow — RARE.

FORBIDDEN: solid background, circular border, circle frame, panel background, magic circle full scene, particles everywhere, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 7. R022 타락한 성유물 (Tainted Relic) — RARE (저주)

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A corrupted ankh-shaped holy relic in tarnished blackened brass with a tear-shaped oxblood gem at the cross center. Twisting shadow tendrils crawl up its body like dark vines. One side bears a hairline crack with sickly violet light leaking through.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — blackened brass with violet rim shadow, oxblood gem highlight, solid violet emissive crack. Dark drop shadow. Centered. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: warm aged gold (#D4A845) rim glow but tinted with desaturated violet — RARE CURSED.

FORBIDDEN: solid background, circular border, circle frame, panel background, multiple tendrils filling canvas, scene, text, painted/airbrush, photorealism, western cartoon, Disney/Pixar style, 3D render.

---

## 🔔 BATTLE_START 트리거

### 8. R002 화석 펜던트 (Fossil Pendant) — COMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A teardrop amber pendant hanging from a thin braided leather cord, with a small fossilized leaf and tiny insect silhouette suspended inside the amber. Brass capped top with hanging loop.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — translucent amber with sharp inner highlight, dark fossil silhouette inside, brass cap. Soft drop shadow. Centered with cord arched naturally. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: weathered copper bronze (#B07E4F) rim glow — COMMON.

FORBIDDEN: solid background, circular border, circle frame, panel background, neck wearing it, multiple pendants, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 9. R003 호박 보석 (Amber Gem) — COMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A polished hexagonal-cut amber gemstone with a glowing inner core. Faceted crystal surface catching anime-style sharp highlights. Faint mana-blue spark suspended at the very center of the gem (mana motif).

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~7px). Flat hard shading — translucent amber-orange body with crisp sapphire mana spark inside (solid emissive shape, not glow). Soft drop shadow. Centered. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: weathered copper bronze (#B07E4F) rim glow — COMMON.

FORBIDDEN: solid background, circular border, circle frame, panel background, raw uncut crystal, multiple gems, scene, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 10. R008 비늘 망토 (Scale Cloak) — UNCOMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A folded reptile-scale cloak draped over a brass shoulder clasp, overlapping deep teal scales catching highlights, frayed leather inner lining. Brass clasp shaped like a stylized dinosaur claw.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — deep teal scales with darker shadow gaps, sharp anime highlights on every other scale, oxblood leather lining, brass clasp. Soft drop shadow. Centered. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: cool antique silver (#C8CDD0) rim glow — UNCOMMON.

FORBIDDEN: solid background, circular border, circle frame, panel background, full body wearing cloak, scene, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 11. R010 화산재 (Volcanic Ash) — UNCOMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A small obsidian-black volcanic rock chunk with glowing molten orange-red ember veins running through deep cracks. Tiny flecks of ash and embers floating around it. Jagged rough silhouette.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — pure black obsidian body, solid emissive ember-orange cracks (NOT airbrush glow). Sharp anime highlights. Tiny solid ember dots floating. Soft drop shadow. Centered. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: cool antique silver (#C8CDD0) rim glow — UNCOMMON.

FORBIDDEN: solid background, circular border, circle frame, panel background, full volcano scene, smoke filling canvas, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 12. R015 영원의 모래시계 (Eternal Hourglass) — RARE

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: An ornate brass hourglass with sapphire-blue glass bulbs, sand frozen mid-flow at the narrow waist. Sapphire crystal cap on top. Engraved gothic scrollwork on the brass frame. The falling sand stream is solid emissive blue (time motif).

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — aged brass frame with darker shadow plates, translucent sapphire glass with crisp highlights, solid emissive sand stream. Soft drop shadow. Centered. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: warm aged gold (#D4A845) rim glow — RARE.

FORBIDDEN: solid background, circular border, circle frame, panel background, scene, multiple hourglasses, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 13. R018 어린 무리 (Young Pack) — COMMON (CARN 전용)

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A leather wristband totem with three small dinosaur footprints burned into the leather + a tiny cluster of three baby raptor claw charms hanging from brass rings. Tribal-stitched edges.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — tanned leather with charcoal burned prints, brass rings with highlights, ivory claw charms. Soft drop shadow. Centered. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: weathered copper bronze (#B07E4F) rim glow — COMMON. Subtle deep teal accent (CARN archetype).

FORBIDDEN: solid background, circular border, circle frame, panel background, dinosaur creatures themselves, full arm, scene, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

---

## ⏱️ TURN_START 트리거

### 14. R006 골격 방패 (Bone Shield) — UNCOMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A round shield made of overlapping curved dinosaur ribs and a central skull boss (T-Rex skull), brass rivets pinning the bones together at intersections. Worn battle scratches across the surface.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — ivory-cream bones with cool gray shadow gaps, brass rivets with highlights, dark hollow eye sockets on skull boss. Soft drop shadow. Centered, slight 3/4 view. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: cool antique silver (#C8CDD0) rim glow — UNCOMMON.

FORBIDDEN: solid background, circular border, circle frame, panel background, hand holding shield, multiple shields, scene, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

---

## 🎯 KILL / SUMMON 트리거

### 15. R007 발톱 목걸이 (Claw Necklace) — UNCOMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A primal necklace of three curved raptor claws threaded onto a braided leather cord, the largest claw at center. Tiny brass spacer beads between claws. Cord arches naturally as if hanging.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — ivory claws with darker tip cracks, leather brown cord, brass bead highlights. Soft drop shadow. Centered. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: cool antique silver (#C8CDD0) rim glow — UNCOMMON.

FORBIDDEN: solid background, circular border, circle frame, panel background, neck wearing it, multiple necklaces, scene, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 16. R009 티라노의 이빨 (Tyrant Tooth) — UNCOMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A single massive serrated T-Rex tooth, ivory white with a deep oxblood blood-stained tip, fine serration jagged along both edges. Cracked enamel near the root, a thin gold band wrapped around the root as a trophy mounting.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~9px). Flat hard shading — ivory body with cool gray shadow side, deep oxblood blood tip, brass-gold band highlight. Soft drop shadow. Centered diagonal. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: cool antique silver (#C8CDD0) rim glow — UNCOMMON.

FORBIDDEN: solid background, circular border, circle frame, panel background, full skull, multiple teeth, scene, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 17. R019 사냥꾼 본능 (Hunter Instinct) — COMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A small ivory fang charm hanging from a leather cord, with a single amber predator-eye gem set into the fang base. The gem has a vertical slit pupil silhouette inside (predator eye motif).

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~7px). Flat hard shading — ivory fang with cool gray shadow, leather cord, amber gem with sharp slit pupil highlight. Soft drop shadow. Centered. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: weathered copper bronze (#B07E4F) rim glow — COMMON.

FORBIDDEN: solid background, circular border, circle frame, panel background, full predator face, multiple charms, scene, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

---

## 💥 HP 임계치 트리거

### 18. R016 광폭의 부적 (Rage Amulet) — RARE

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A flame-shaped amulet pendant, brass frame containing an oxblood-red gem core. Stylized aggressive flame curls on either side of the gem. Subtle ember glow leaking from the gem's facets. Hung from a small chain link at the top.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — aged brass frame with darker shadow, oxblood gem with sharp anime highlight, solid emissive ember orange flecks (not airbrush). Soft drop shadow. Centered. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: warm aged gold (#D4A845) rim glow — RARE.

FORBIDDEN: solid background, circular border, circle frame, panel background, full chain wearing it, scene, fire engulfing canvas, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 19. R020 분노의 핏줄 (Rage Vein) — UNCOMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A small glass vial sealed with brass cap, filled with pulsing oxblood-red liquid that has dark crimson vein patterns swirling inside (organic biological vibe). A faint ember spark suspended in the center of the liquid. Brass label band with a single jagged rune.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — translucent glass with crisp highlight, oxblood liquid with darker vein silhouettes, brass cap and label. Soft drop shadow. Centered. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: cool antique silver (#C8CDD0) rim glow — UNCOMMON.

FORBIDDEN: solid background, circular border, circle frame, panel background, blood splatter, multiple vials, scene, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

---

## 🗺️ 기타

### 20. R012 태초의 알 (Primal Egg) — RARE

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A large ovoid dinosaur egg, deep teal mottled shell with darker spots, a fresh jagged crack splitting the upper portion. Solid emissive amber-orange light leaks from inside the crack (something about to hatch). A small claw silhouette hint visible inside the crack opening.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~9px). Flat hard shading — deep teal egg with darker shadow side, sharp anime highlight on top curve, solid emissive amber crack (NOT airbrush glow). Soft drop shadow. Centered, slight 3/4 angle. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: warm aged gold (#D4A845) rim glow — RARE.

FORBIDDEN: solid background, circular border, circle frame, panel background, baby dinosaur fully visible, nest, scene, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 21. R017 고고학자의 일지 (Archaeologist Log) — SHOP

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A weathered leather-bound journal with brass corner caps, slightly open showing yellowed parchment pages with hand-drawn dinosaur sketches and runes. A red ribbon bookmark trailing out the bottom. Brass clasp on the side.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — tanned brown leather cover with darker shadow, yellowed pages, ink dinosaur sketches as solid black silhouettes, brass corners and clasp. Soft drop shadow. Centered, slight 3/4 angle. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: muted oxblood ruby (#8E3A3A) rim glow — SHOP.

FORBIDDEN: solid background, circular border, circle frame, panel background, hands holding it, full library scene, readable text on pages, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

---

# 🧪 포션 (Potion) — 16개

> 포션 공통 — 모든 포션 베이스: 일관된 둥근 바닥 유리병에 코르크 마개, 브래스 라벨 밴드. 액체 색만 다름.
> **ORIENTATION**: 플라스크는 항상 **완전히 수직으로 세워진 상태** — 기울어짐/회전 절대 금지.
> **BACKGROUND**: 짙은 차콜(#1A1814) 불투명 배경 — 투명/알파 채널 금지. 원형 테두리/패널 금지.

## 🗡️ ATTACK 계열

### 22. P001 공격 물약 (Attack Potion) — COMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A round-bottom glass flask filled with deep oxblood-red liquid, swirling inside as if angry. Inside the liquid is a sharp downward-pointing triangle silhouette (blade tip motif). Cork stopper at top with a brass band label.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — translucent glass with crisp anime highlight, oxblood liquid with darker swirl shadows, dark blade silhouette inside, brown cork, brass band. Soft drop shadow. Centered upright, perfectly vertical — NOT tilted or angled. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas, NO alpha channel. Consistent round-bottom glass flask shape with cork stopper and brass label band.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: weathered copper bronze (#B07E4F) rim glow — COMMON.

FORBIDDEN: solid background, scene, multiple flasks, liquid splash, tilted flask, angled bottle, circular border, circle frame, circular halo ring, panel background, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 23. P002 상급 공격 물약 (Greater Attack Potion) — UNCOMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A round-bottom glass flask filled with deep crimson-red liquid with three sharp downward triangle silhouettes (multi-blade / AOE motif) suspended inside. Cork stopper, brass band label with three notch marks. A thin silver ring around the flask neck (UNCOMMON tier marker).

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — translucent glass, crimson liquid, dark blade silhouettes, cork, brass + silver bands. Soft drop shadow. Centered upright, perfectly vertical — NOT tilted or angled. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas, NO alpha channel. Consistent round-bottom flask shape.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: cool antique silver (#C8CDD0) rim glow — UNCOMMON.

FORBIDDEN: solid background, scene, splash, tilted flask, angled bottle, circular border, circle frame, circular halo ring, panel background, text, painted/airbrush, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 24. P003 최상급 공격 물약 (Supreme Attack Potion) — RARE

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: An ornate round-bottom glass flask with bright crimson liquid pulsing inside. A solid emissive jagged blade-shaped energy core suspended at the center of the liquid (concentrated power motif). Cork stopper, brass band label with golden filigree, golden ring around the neck.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~9px). Flat hard shading — translucent glass, crimson liquid, solid emissive blade core (NOT airbrush), brass + gold bands with anime highlights. Soft drop shadow. Centered upright, perfectly vertical — NOT tilted or angled. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas, NO alpha channel. Consistent round-bottom flask shape.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: warm aged gold (#D4A845) rim glow — RARE.

FORBIDDEN: solid background, scene, splash, tilted flask, angled bottle, circular border, circle frame, circular halo ring, panel background, text, painted/airbrush, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 25. P014 빙결 물약 (Freeze Potion) — UNCOMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A round-bottom glass flask filled with icy pale-blue liquid, frost crystal clusters suspended inside the liquid. A thin layer of frost building up on the outside of the glass. Cork stopper with frost rim, brass band label, silver ring around the neck.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — translucent glass with frost overlay (solid white shapes, NOT airbrush), pale icy blue liquid, sharp anime crystal highlights, cork + brass + silver. Soft drop shadow. Centered upright, perfectly vertical — NOT tilted or angled. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas, NO alpha channel. Consistent round-bottom flask shape.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: cool antique silver (#C8CDD0) rim glow — UNCOMMON.

FORBIDDEN: solid background, scene, ice covering whole canvas, snowflake field, tilted flask, angled bottle, circular border, circle frame, circular halo ring, panel background, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

---

## 🛡️ DEFENSE 계열

### 26. P004 방어 물약 (Defense Potion) — COMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A round-bottom glass flask filled with deep sapphire-blue liquid. Inside the liquid is a sharp shield silhouette (round shield outline). Cork stopper, brass band label.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — translucent glass, sapphire liquid with darker shadow, dark shield silhouette inside, cork, brass band. Soft drop shadow. Centered upright, perfectly vertical — NOT tilted or angled. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas, NO alpha channel. Consistent round-bottom flask shape.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: weathered copper bronze (#B07E4F) rim glow — COMMON.

FORBIDDEN: solid background, scene, splash, tilted flask, angled bottle, circular border, circle frame, circular halo ring, panel background, text, painted/airbrush, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 27. P005 상급 방어 물약 (Greater Defense Potion) — UNCOMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A round-bottom glass flask with deep sapphire-blue liquid, two overlapping shield silhouettes inside (layered defense motif). Cork stopper, brass band, silver ring around the neck.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — translucent glass, sapphire liquid, dark shield silhouettes, cork + brass + silver. Soft drop shadow. Centered upright, perfectly vertical — NOT tilted or angled. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas, NO alpha channel. Consistent round-bottom flask shape.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: cool antique silver (#C8CDD0) rim glow — UNCOMMON.

FORBIDDEN: solid background, scene, splash, tilted flask, angled bottle, circular border, circle frame, circular halo ring, panel background, text, painted/airbrush, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 28. P006 최상급 방어 물약 (Supreme Defense Potion) — RARE

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: An ornate round-bottom glass flask with bright sapphire-blue liquid. A solid emissive shield-shaped energy core suspended at the center (fortress motif). Cork stopper, brass band with gold filigree, gold ring around the neck.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~9px). Flat hard shading — translucent glass, sapphire liquid, solid emissive shield core, brass + gold bands. Soft drop shadow. Centered upright, perfectly vertical — NOT tilted or angled. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas, NO alpha channel. Consistent round-bottom flask shape.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: warm aged gold (#D4A845) rim glow — RARE.

FORBIDDEN: solid background, scene, splash, tilted flask, angled bottle, circular border, circle frame, circular halo ring, panel background, text, painted/airbrush, western cartoon, Disney/Pixar style, photorealism, 3D render.

---

## 🔧 UTILITY 계열

### 29. P007 드로우 물약 (Draw Potion) — COMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A round-bottom glass flask with shimmering pale-silver liquid. Three thin rectangular card silhouettes suspended inside the liquid in a fanned arrangement. Cork stopper, brass band label.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — translucent glass, silver-pale liquid with cool tints, dark card silhouettes, cork, brass band. Soft drop shadow. Centered upright, perfectly vertical — NOT tilted or angled. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas, NO alpha channel. Consistent round-bottom flask shape.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: weathered copper bronze (#B07E4F) rim glow — COMMON.

FORBIDDEN: solid background, scene, real cards, tilted flask, angled bottle, circular border, circle frame, circular halo ring, panel background, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 30. P008 마나 물약 (Mana Potion) — UNCOMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A round-bottom glass flask filled with vivid violet-purple liquid. Inside the liquid is a small solid emissive sapphire-blue mana spark / crystal core suspended at the center. Cork stopper, brass band, silver ring around the neck.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — translucent glass, violet liquid with darker shadow, solid emissive sapphire core (NOT airbrush), cork + brass + silver. Soft drop shadow. Centered upright, perfectly vertical — NOT tilted or angled. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas, NO alpha channel. Consistent round-bottom flask shape.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: cool antique silver (#C8CDD0) rim glow — UNCOMMON.

FORBIDDEN: solid background, scene, magic particles filling canvas, tilted flask, angled bottle, circular border, circle frame, circular halo ring, panel background, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 31. P009 축복 물약 (Blessing Potion) — RARE

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: An ornate round-bottom glass flask filled with shimmering golden liquid. A solid emissive radiant cross / ankh-like sigil suspended at the center of the liquid. Tiny floating golden specks. Cork stopper, brass band with gold filigree, gold ring around the neck.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~9px). Flat hard shading — translucent glass, golden liquid, solid emissive holy sigil (NOT airbrush), brass + gold bands. Soft drop shadow. Centered upright, perfectly vertical — NOT tilted or angled. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas, NO alpha channel. Consistent round-bottom flask shape.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: warm aged gold (#D4A845) rim glow — RARE.

FORBIDDEN: solid background, scene, religious imagery overload, halo filling canvas, tilted flask, angled bottle, circular border, circle frame, circular halo ring, panel background, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 32. P010 회복 물약 (Heal Potion) — COMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A round-bottom glass flask filled with vibrant emerald-green liquid. Inside the liquid is a simple white plus / cross silhouette suspended at the center (heal motif). Cork stopper, brass band label.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — translucent glass, vibrant emerald liquid with darker shadow, clean white cross silhouette, cork, brass band. Soft drop shadow. Centered upright, perfectly vertical — NOT tilted or angled. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas, NO alpha channel. Consistent round-bottom flask shape.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: weathered copper bronze (#B07E4F) rim glow — COMMON.

FORBIDDEN: solid background, scene, splash, leaves spilling out, tilted flask, angled bottle, circular border, circle frame, circular halo ring, panel background, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 33. P011 소환 물약 (Summon Potion) — COMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A round-bottom glass flask filled with iridescent teal-and-amber swirling liquid. Inside the liquid is a small dark dinosaur footprint silhouette (3 toes) suspended at the center. Cork stopper, brass band label.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — translucent glass, swirled teal-amber liquid (two color zones, hard-edged separation, NOT blended), dark footprint silhouette, cork, brass band. Soft drop shadow. Centered upright, perfectly vertical — NOT tilted or angled. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas, NO alpha channel. Consistent round-bottom flask shape.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: weathered copper bronze (#B07E4F) rim glow — COMMON.

FORBIDDEN: solid background, scene, dinosaur creature inside, tilted flask, angled bottle, circular border, circle frame, circular halo ring, panel background, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 34. P012 정화 물약 (Cleanse Potion) — COMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A round-bottom glass flask filled with crystal-clear pale-aqua liquid. Tiny solid white sparkle / star shapes suspended inside (purification motif). Cork stopper, brass band label.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — translucent glass, pale aqua liquid with crisp anime highlight, solid white spark shapes (4-point stars, NOT airbrush dots), cork, brass band. Soft drop shadow. Centered upright, perfectly vertical — NOT tilted or angled. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas, NO alpha channel. Consistent round-bottom flask shape.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: weathered copper bronze (#B07E4F) rim glow — COMMON.

FORBIDDEN: solid background, scene, splash, sparkles filling whole canvas, tilted flask, angled bottle, circular border, circle frame, circular halo ring, panel background, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 35. P013 강화 물약 (Empower Potion) — UNCOMMON

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A round-bottom glass flask filled with intense orange liquid with a solid emissive upward-pointing arrow shape suspended inside. Faint ember sparks rising near the cork. Cork stopper, brass band, silver ring around the neck.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~8px). Flat hard shading — translucent glass, intense orange liquid, solid emissive up-arrow (NOT airbrush), tiny solid ember dots, cork + brass + silver. Soft drop shadow. Centered upright, perfectly vertical — NOT tilted or angled. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas, NO alpha channel. Consistent round-bottom flask shape.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: cool antique silver (#C8CDD0) rim glow — UNCOMMON.

FORBIDDEN: solid background, scene, fire engulfing canvas, tilted flask, angled bottle, circular border, circle frame, circular halo ring, panel background, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 36. P015 각성 물약 (Awaken Potion) — RARE

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: An ornate round-bottom glass flask filled with prismatic / iridescent liquid (deep teal at bottom transitioning to violet at top, hard-edged anime gradient — NOT smooth). A small solid emissive sapphire mana-armor mecha-fragment shape suspended at the center (evolution / mecha tier motif). Cork stopper, brass band with gold filigree, gold ring around the neck.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~9px). Flat hard shading — translucent glass, two-tone liquid with sharp boundary, solid emissive mecha sigil (NOT airbrush), brass + gold bands. Soft drop shadow. Centered upright, perfectly vertical — NOT tilted or angled. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas, NO alpha channel. Consistent round-bottom flask shape.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: warm aged gold (#D4A845) rim glow — RARE.

FORBIDDEN: solid background, scene, full mecha visible, tilted flask, angled bottle, circular border, circle frame, circular halo ring, panel background, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

### 37. P016 균열 물약 (Rift Potion) — RARE

1024x1024 PNG, solid dark charcoal background (#1A1814). Game UI inventory sticker icon.

SUBJECT: A round-bottom glass flask cracked vertically down its body but still holding violet-sapphire liquid. Solid emissive purple-blue rift energy leaks from the crack outward. Cork stopper, brass band, gold ring around the neck. The crack glows from inside.

STYLE: Japanese manga / JRPG anime illustration style — Granblue Fantasy + Arknights + Honkai Star Rail aesthetic. Anime cel-shading with bold ink outlines and flat hard-edged shading. NO painted, NO oil, NO airbrush, NO soft gradients, NO western comic style, NO Disney/Pixar style, NO American cartoon, NO 3D render, NO photorealism. Game UI inventory sticker icon. Bold ink charcoal outline (~9px). Flat hard shading — translucent cracked glass, violet-sapphire liquid, solid emissive rift glow (NOT airbrush), brass + gold bands. Soft drop shadow. Centered upright, perfectly vertical — NOT tilted or angled. Opaque PNG — solid dark charcoal background (#1A1814), NO transparent areas, NO alpha channel. Consistent round-bottom flask shape.

PALETTE: ink charcoal base + aged brass/copper + muted jewel tones (deep teal, amber, oxblood, sapphire) — Japanese dark fantasy.

RARITY: warm aged gold (#D4A845) rim glow — RARE.

FORBIDDEN: solid background, scene, energy filling whole canvas, multiple flasks, tilted flask, angled bottle, circular border, circle frame, circular halo ring, panel background, text, painted/airbrush style, western cartoon, Disney/Pixar style, photorealism, 3D render.

---

# 📋 작업 우선순위 / 체크리스트

## P0 — 가장 자주 보이는 것 (먼저 뽑기) — 6개
시작 유물 + 상점 기본 포션 5종.

- [ ] R001 고대의 뼈
- [ ] P001 공격 물약
- [ ] P004 방어 물약
- [ ] P007 드로우 물약
- [ ] P010 회복 물약
- [ ] P011 소환 물약

## P1 — 일반 등급 + 자주 등장 — 12개
- [ ] R002 화석 펜던트
- [ ] R003 호박 보석
- [ ] R004 약초꾼의 가방
- [ ] R005 가죽 장갑
- [ ] R018 어린 무리
- [ ] R019 사냥꾼 본능
- [ ] P012 정화 물약
- [ ] R006 골격 방패
- [ ] R007 발톱 목걸이
- [ ] R008 비늘 망토
- [ ] R009 티라노의 이빨
- [ ] R010 화산재

## P2 — UNCOMMON 포션 + 트리거 유물 — 8개
- [ ] R020 분노의 핏줄
- [ ] R017 고고학자의 일지
- [ ] P002 상급 공격 물약
- [ ] P005 상급 방어 물약
- [ ] P008 마나 물약
- [ ] P013 강화 물약
- [ ] P014 빙결 물약

## P3 — RARE / 보스 보상 — 12개
- [ ] R011 공룡의 심장
- [ ] R012 태초의 알
- [ ] R014 왕의 왕관
- [ ] R015 영원의 모래시계
- [ ] R016 광폭의 부적
- [ ] R021 균열의 인장
- [ ] R022 타락한 성유물
- [ ] P003 최상급 공격 물약
- [ ] P006 최상급 방어 물약
- [ ] P009 축복 물약
- [ ] P015 각성 물약
- [ ] P016 균열 물약

---

# 🛠️ 사용 워크플로우

1. Gemini Studio 새 채팅 열기
2. 위 프롬프트 블록 하나 복사 → 붙여넣기 → 실행
3. 결과물 다운로드 → 파일명을 ID에 맞춰 변경 (예: `R001.png`)
4. `DianoCard/Assets/Resources/InGame/RelicArt/` (or `PotionArt/`) 폴더에 저장
5. 위 체크박스에 체크
6. 모두 끝나면 효과 핸들러 구현 단계로 넘어감

## 톤 일관성 팁
- 결과물 톤이 너무 painted/oil 느낌이면 `"FLAT anime cel-shading, NO painted texture, NO airbrush, hard-edged shadows ONLY"` 강조 추가
- 배경이 투명 안 되고 회색/체크무늬로 나오면 `"true transparent PNG, full alpha, NO background fill at all"` 추가
- 등급 트림 글로우가 약하면 `"strong visible rim glow around the silhouette, ~15-20px wide"` 강조

## 메모
- R013은 ID 비어있어 의도적으로 스킵 (다음 추가분으로 보존)
- R017은 SHOP 등급 그대로 처리 (희귀도 컬럼 정리는 효과 적용 단계에서)
- 포션 16종 모두 **동일 플라스크 형태**로 그려야 인벤토리 정렬 시 일관됨
