# 인게임 공룡 스프라이트 프롬프트 — 맵/전투 필드 등장용

작성일: 2026-05-03 (기존 스프라이트 색조·스타일 직접 분석 후 재작성)
대상: 챕터1 전체 공룡 (초식 4종 + 육식 6종 + 잡식 4종 = 14종)
포맷: **오른쪽 향함, 투명/흰 배경 (사이즈 자유)**
용도: `Assets/Resources/Dinos/` 저장

> ⚠️ 진화 갑옷(T1/T2) → [CarnivoreEvolutionPrompt.md](CarnivoreEvolutionPrompt.md)
> 카드 일러(1024×1024, 배경 있음) → [SummonCardArtPrompt.md](SummonCardArtPrompt.md)

---

## 공통 스타일 규칙

기존 스프라이트(Raptor/Carnotaurus/T-Rex/Compsognathus/Triceratops 등)에서 추출한 실제 스타일:

```
STYLE: TCG / RPG game creature illustration — bold weighted ink outlines (thicker at
       silhouette edges, thinner inside), semi-flat color fills with hard shadow zones,
       scale/skin texture rendered as line-art detail inside the shapes.
       NOT photorealistic. NOT anime soft-shading. NOT painterly oil.
       Closest reference: classic TCG monster card art (dense illustration, game-ready).

LINE ART: Heavy black ink contour line at the outer silhouette. Interior detail lines
          for scales, wrinkles, muscle creases — thinner than silhouette. Clear, readable.

SHADING: Hard shadow blocks (2–3 tonal values per area). Shadow color is a darker,
         slightly desaturated version of the base color. No smooth gradients.
         Small highlight areas on raised scales, brow, and claw tips only.

COLOR: Rich and saturated — dark jewel tones. Each species has a distinct signature
       palette (see per-species below). Do NOT mute to grey. Do NOT add unspecified colors.

BACKGROUND: Fully transparent PNG, OR flat clean white (#FFFFFF). No colored backdrop,
            no vignette, no environment, no ground shadow.

FORMAT: Full body visible head-to-tail.
        Creature faces RIGHT. Occupies ~60–75% of canvas height.
        Single creature only. No text, no UI, no frame.
```

---

## 🌿 초식 — Chapter 1 (4종)

### C001 트리케라톱스 (Triceratops) — COMMON / 1코 / 4 ATK / 20 HP
> 현재 스프라이트: ✅ `Triceratops.png` 존재

```
TCG game creature illustration. Bold ink outline. Semi-flat with hard shadow zones.
Transparent or white background. Creature faces RIGHT.

Subject: Triceratops — large quadruped herbivore facing right, low aggressive head posture.

ANATOMY:
Three forward-pointing horns (two long brow horns + one shorter nasal horn). Wide bony frill
behind the head — the frill has a slightly reddish-brown flush. Stocky barrel body, four
column legs, short tail. Large and heavy — reads as a front-line wall.

COLOR PALETTE (match existing sprite tone):
- Body skin: warm medium brown (#7A5530) with darker brown (#3D2510) stripe banding on
  flanks and back. Scale texture in line art.
- Frill: deeper warm reddish-brown (#8B3A1A), slightly more saturated than body.
  Subtle vein pattern drawn as thin inner lines.
- Horns: dirty off-white to pale horn-grey (#C8B878). Tips darker.
- Underbelly/legs: lighter sandy-tan (#A07848).
- Eye: small amber-gold, set inside a heavy brow socket.
- Claws: dark horn-grey (#3A3020).

POSE: Facing right. Head lowered slightly, horns angled forward — defensive charge stance.
Body weight forward. Reads as immovable front-line defender.

FORBIDDEN: bipedal stance, missing frill, missing horns, soft gradient shading,
painterly texture, photorealistic skin, background environment, multiple creatures.
```

---

### C002 스테고사우루스 (Stegosaurus) — COMMON / 1코 / 5 ATK / 17 HP
> 현재 스프라이트: ✅ `Stegosaurus.png` 존재

```
TCG game creature illustration. Bold ink outline. Semi-flat with hard shadow zones.
Transparent or white background. Creature faces RIGHT.

Subject: Stegosaurus — large quadruped herbivore facing right.

ANATOMY:
Two alternating rows of large upright bony plates along the full spine — tall leaf-shaped,
not uniform, slightly irregular in size. Short forelimbs, longer hindlimbs (hips higher
than shoulder). Four spiked tail tips (thagomizer). Small narrow head, tiny teeth.

COLOR PALETTE (match existing sprite tone):
- Body skin: dark forest green (#2A3D1A) with darker olive-black (#1A2A10) stripe banding
  across flanks. Rough scale texture in line art.
- Dorsal plates: warm beige to pale sandy-tan (#C8A860) — lighter than body, same
  line-art texture. Hard shadow on back half of each plate.
- Tail spikes: dark horn-grey (#3A3020) with lighter tip.
- Underbelly: slightly lighter muted green-grey (#485A38).
- Eye: small dark amber.

POSE: Facing right. Walking stance — one front leg slightly forward. Plates prominent
in silhouette. Tail level with the ground or slightly raised. Reads as steady tank.

FORBIDDEN: bipedal stance, plates replaced with spines, thagomizer missing,
soft gradient, photorealism, background, multiple creatures.
```

---

### C003 안킬로사우루스 (Ankylosaurus) — UNCOMMON / 2코 / 3 ATK / 25 HP
> 현재 스프라이트: ✅ `Ankylosaurus.png` 존재

```
TCG game creature illustration. Bold ink outline. Semi-flat with hard shadow zones.
Transparent or white background. Creature faces RIGHT.

Subject: Ankylosaurus — heavily armored quadruped facing right.

ANATOMY:
Entire dorsal surface tiled with large rounded osteoderms (bony plates and knobs fused to
skin) — draw each osteoderm as a distinct outlined shape. Wide squat low-slung body, very
close to the ground. LARGE round bony club at the tail tip. Short beaked skull,
two small horn nubs near the back of the skull.

COLOR PALETTE (match existing sprite tone):
- Dorsal armor / osteoderms: warm rust-orange to terracotta (#8B4A1A) — the dominant
  color. Each plate has a hard shadow on its lower half. Raised edges slightly lighter.
- Legs and underbelly: muted blue-grey (#4A5060) — contrasts with the rust top armor.
- Tail club: same rust-orange, heavier shadow to read as solid mass.
- Beak / skull: dark brownish-grey (#3A3020).
- Eye: small pale amber, deep-set in armored skull.
- Small side spikes along flanks: same rust-orange, sharp tips.

POSE: Facing right. Very low ground-hugging stance. Club tail visible in silhouette.
Reads as an immovable living fortress.

FORBIDDEN: bipedal stance, club missing, plates replaced with smooth skin,
upright posture, soft gradient, photorealism, background, multiple creatures.
```

---

### C011 브라키오사우루스 (Brachiosaurus) — RARE / 2코 / 3 ATK / 40 HP
> 현재 스프라이트: ✅ `Brachiosaurus.png` 존재

```
TCG game creature illustration. Bold ink outline. Semi-flat with hard shadow zones.
Transparent or white background. Creature faces RIGHT.

Subject: Brachiosaurus — enormous long-necked sauropod, body facing right.

ANATOMY:
Very long neck extending upward from sloped shoulders (~45–60° angle). Forelimbs LONGER
than hindlimbs — back slopes downward from shoulder to hips. Small head at neck tip.
Column-like legs, round barrel torso. Tapering tail behind.
Must read as the LARGEST creature in the roster by a clear margin.

COLOR PALETTE (match existing sprite tone):
- Body: muted teal-grey to slate blue (#4A6870) — desaturated cool tone, the dominant
  color across the entire body. Not green, not blue — the grey-teal between them.
- Circular/oval spot pattern subtly drawn across the body in slightly darker teal (#364E55).
  Spots are large, loosely spaced, rendered as filled shapes with thin inner lines.
- Underbelly/underside of neck: slightly lighter cool grey-tan (#6A8080).
- Eye: tiny, dark amber. High on the skull.
- Claws: dark grey.

POSE: Facing right. Standing tall — full body visible. Neck gently curved upward.
Camera pulled back — head near top of canvas, tail near bottom-right.
Reads as a colossal living fortress.

The long neck should fill the vertical space — head near the top of the canvas.

FORBIDDEN: bipedal stance, neck too short, similar size to smaller dinosaurs,
soft gradient, photorealism, background, multiple creatures.
```

---

## 🦖 육식 — Chapter 1 (6종)

### C004 랩터 (Raptor) — COMMON / 1코 / 7 ATK / 13 HP
> 현재 스프라이트: ✅ `Raptor.png` 존재

```
TCG game creature illustration. Bold ink outline. Semi-flat with hard shadow zones.
Transparent or white background. Creature faces RIGHT.

Subject: Velociraptor — lean bipedal predator facing right.

ANATOMY:
Lean and agile. Lightweight build — fast and predatory.
Large sickle claw on each hind foot (raised off ground). Three curved clawed fingers
per forelimb. Small spiky dorsal ridge along the back of the neck and spine.
Long narrow skull, rows of recurved blade teeth. Long stiff balancing tail.

COLOR PALETTE (match existing sprite — deep crimson):
- Body: deep crimson-red (#7A1010 to #8B1A1A) — rich dark red, NOT orange-red.
  The base color is very saturated and dark.
- Stripe banding: near-black (#1A0808) thick stripes running diagonally across flanks,
  back, and tail. 5–7 bold stripes visible from this angle.
- Underbelly/throat: lighter dusty red-pink (#C07060).
- Dorsal spikes along neck/back: same crimson body color, slightly darker tips.
- Sickle claws: dark grey-brown (#3A2010).
- Eye: vivid orange-red amber (#C04010) — predatory and alert.
- Teeth: cream-ivory.

POSE: Facing right. Low horizontal aggressive forward lean. One hind sickle claw
slightly raised. Mouth slightly open showing teeth. Reads as fast and lethal.

FORBIDDEN: upright standing display, sickle claw missing, dorsal spikes missing,
orange or brown body (must be deep crimson-red), soft gradient, photorealism,
background, multiple raptors.
```

---

### C005 카르노타우루스 (Carnotaurus) — COMMON / 1코 / 8 ATK / 10 HP
> 현재 스프라이트: ✅ `Carnotaurus.png` 존재

```
TCG game creature illustration. Bold ink outline. Semi-flat with hard shadow zones.
Transparent or white background. Creature faces RIGHT.

Subject: Carnotaurus — medium-large bipedal carnivore facing right.

ANATOMY:
TWO SHORT BULL-LIKE HORNS above the eyes — stubby and forward-angled, the signature.
Distinctly short blunt snout. Very small vestigial forelimbs (barely visible stubs
at the chest). Powerfully muscled hindlegs and hips. Long tail. Heavy jaw.

COLOR PALETTE (match existing sprite — warm brown):
- Body: warm medium brown (#7A5020) — earthy, slightly orange-tinted brown.
- Stripe banding: darker brown-black (#3A2008) diagonal stripes across flanks and back.
  Heavier/wider stripes than Raptor.
- Underbelly/lower jaw: lighter sandy-buff tan (#C09850).
- Horns: same warm brown as body, slightly darker at the base, tips darker grey.
- Knobby osteoderms/bumps on the skull between and around the horns — draw as small
  raised oval shapes in the line art.
- Eye: amber-gold (#C07820) — set just below the horn base.
- Teeth: cream-ivory, visible in open jaw.
- Forelimb stubs: same body color, barely protrude from chest.

POSE: Facing right. Aggressive forward lean, mouth open. Bull horns prominent in
profile silhouette. Short snout clearly visible — distinguishes from T-Rex shape.
Reads as a brutal charging attacker.

FORBIDDEN: long snout, horn-ridges instead of bull horns, large visible forelimbs,
soft gradient, photorealism, background, multiple creatures.
```

---

### C008 티렉스 (Tyrannosaurus Rex) — RARE / 3코 / 15 ATK / 22 HP
> 현재 스프라이트: ✅ `T-Rex.png` 존재

```
TCG game creature illustration. Bold ink outline. Semi-flat with hard shadow zones.
Transparent or white background. Creature faces RIGHT.

Subject: Tyrannosaurus Rex — massive bipedal apex predator facing right.

ANATOMY:
Enormous wide skull filled with very large conical teeth. TWO TINY STUB FORELIMBS —
almost comically small, barely extend from the chest. Massive powerful hindlegs.
Heavy counterbalancing tail. Largest body in the carnivore roster.

COLOR PALETTE (match existing sprite — near-black with crack patterns):
- Body: near-black charcoal (#1A1A1A to #252520) — very dark, barely any brown tint.
  This is the dominant darkness of the creature.
- CRACK / VEIN PATTERN: irregular jagged crack lines in light grey-white (#C0C0B0)
  spread across the entire body — shoulders, flanks, legs, tail. These are the most
  distinctive feature of this design. Render as sharp branching crack-like lines,
  like stress fractures in stone or dark lightning. High contrast against the black body.
- Mouth interior: vivid red-pink (#C03030) — strongly saturated, visible from profile.
- Teeth: bright cream-white, very prominent.
- Eye: pale cold amber-gold (#C09010), single point of warm color in an otherwise dark face.
- Claws: dark grey, slightly lighter than body.

POSE: Facing right. Upright with slight forward lean. Mouth wide open — full roar
(EXCEPTION to the half-open rule — T-Rex reads as apex through open-jaw roar).
Reads as unstoppable apex. The most imposing silhouette in the roster.

FORBIDDEN: brown or grey body (must be near-BLACK), crack patterns missing,
three-fingered forelimbs (must be TWO tiny stubs), horn-ridges, soft gradient,
photorealism, background, multiple creatures.
```

---

### C010 콤프소그나투스 (Compsognathus) — COMMON / 0코 / 2 ATK / 5 HP
> 현재 스프라이트: ✅ `Compsognathus.png` 존재

```
TCG game creature illustration. Bold ink outline. Semi-flat with hard shadow zones.
Transparent or white background. Creature faces RIGHT.

Subject: Compsognathus — very small bipedal carnivore facing right.

ANATOMY:
Roughly chicken-to-turkey sized — visibly tiny compared to all other roster dinosaurs.
Long thin neck. Small narrow head. Two small three-fingered forelimbs. Long thin legs.
Long thin balancing tail. Delicate overall silhouette. NOT a scaled-down T-Rex shape.

COLOR PALETTE (match existing sprite — olive green with yellow spots):
- Body: dark olive-green (#4A5820) — muted, slightly grey-green.
- Spot pattern: scattered warm yellow-gold (#C8A020) oval spots/patches distributed
  across the upper flanks, back, and base of neck. 6–10 visible spots from this angle.
  Each spot outlined with a thin inner ink line.
- Underbelly/lower neck: lighter yellow-grey (#909050).
- Eye: vivid amber-gold (#C07810) — disproportionately bright and sharp for its size,
  which emphasizes the predatory alertness.
- Claws: dark grey.
- Teeth: very small, barely visible.

POSE: Facing right. Alert upright stance, slight forward lean. One leg mid-step.
NOT cute, NOT mascot — reads as sharp and predatory despite the small size.

Body is small and compact — the gear and attitude carry the threat, not body mass.
The small size IS the visual read — do not make it look larger than it is.

FORBIDDEN: oversized body, cute or mascot expression, yellow body (spots only, body
is olive green), soft gradient, photorealism, background, multiple compys.
```

---

### C012 알로사우루스 (Allosaurus) — RARE / 1코 / 11 ATK / 22 HP
> 현재 스프라이트: ❌ `Allosaurus.png` 없음 → **이 프롬프트로 신규 생성**

```
TCG game creature illustration. Bold ink outline. Semi-flat with hard shadow zones.
Transparent or white background. Creature faces RIGHT.
Generate from scratch — NO reference image exists.

Subject: Allosaurus — large bipedal carnivore facing right.

ANATOMY (must be distinguishable from T-Rex and Carnotaurus):
TWO HORN-RIDGE CRESTS above each eye — low elongated bony ridges running above each
eye socket forward toward the snout tip. NOT rounded dome (Majungasaurus).
NOT bull-horns (Carnotaurus). These are flat ridge protrusions, one over each eye.
Head smaller and narrower than T-Rex — longer blade-like snout.
THREE clearly separate clawed fingers per forelimb — longer than T-Rex stubs,
shorter than Raptor. Muscular bipedal frame, long counterbalancing tail.

COLOR PALETTE:
Design to sit between Raptor (deep crimson) and Carnotaurus (warm brown) — a
warm reddish-brown mid-tone:
- Body: warm burnt-sienna reddish-brown (#7A3818) — darker than Carnotaurus,
  more brown-red than pure red of Raptor.
- Stripe banding: darker chocolate-brown (#3A1808) along spine and flanks —
  similar stripe style to Raptor but less contrast (body base is less saturated).
- Underbelly/throat: lighter ochre-cream (#C09050).
- Horn-ridge crests above eyes: same body color with slightly raised texture
  in the line art — draw as a flat elongated ridge above each eye.
- Three-clawed forelimbs: same body reddish-brown. Claws dark grey.
- Eye: amber-gold (#C07820), with the horn-ridge visible as a brow overhang above it.
- Teeth: cream-ivory, curved blade shape.

POSE: Facing right. Low predatory stalk — body angled forward, head slightly lowered,
one forelimb raised showing three claws clearly. Mouth half-open. Reads as a stalking
frenzy predator — aggressive but controlled, contrasting T-Rex's open-roar dominance.

FORBIDDEN: rounded skull dome (Majungasaurus), bull-horns (Carnotaurus), T-Rex two-stub
arms, Raptor crimson-red body, full open roar, soft gradient, photorealism,
background, multiple creatures.
```

---

### C014 마준가사우루스 (Majungasaurus) — UNCOMMON / 2코 / 9 ATK / 14 HP
> 현재 스프라이트: ❌ `Majungasaurus.png` 없음 → **이 프롬프트로 신규 생성**

```
TCG game creature illustration. Bold ink outline. Semi-flat with hard shadow zones.
Transparent or white background. Creature faces RIGHT.
Generate from scratch — NO reference image exists.

Subject: Majungasaurus — medium bipedal carnivore facing right.
Design intent: compact, coiled, menacing. NOT dopey or brutish.
The short snout should read as POWERFUL and predatory, like a battering ram.

ANATOMY:
SINGLE RAISED DOME on top of the skull — a smooth rounded bony protrusion sitting
centered on the forehead. NOT paired ridges (Allosaurus), NOT bull-horns (Carnotaurus).
Make the dome read as a distinctive weapon, not a deformity — heavily textured,
like a battle-worn knuckle.
Short, WIDE, deep jaw — thick and powerful, not goofy. The jaw depth should feel
massive relative to head length. Wide gape showing large teeth.
Thick muscular neck, wider than the head — rear-heavy skull silhouette.
Forelimbs: tiny stubs, completely pressed flush to the chest — make them nearly
invisible by angling the body so the chest faces slightly away.
Stocky compact body — every muscle group visible through the line art.
Powerful hindlegs with large claws. Medium counterbalancing tail.

COLOR PALETTE (cool-toned, distinct from all warm carnivores):
- Body: deep slate-teal (#1E3035) — a cool dark blue-green, low brightness but
  clearly teal-tinted, NOT muddy grey-brown. Cool and sleek.
- Scale patterning: slightly darker teal-black (#0E1E22) irregular blotch patterning
  across the back and flanks — like a crocodilian ambush pattern.
  NOT stripe banding — irregular camouflage-style blotches.
- Underbelly/throat: lighter cool grey-green (#4A6060) — subtle, not too light.
- Skull dome: SAME teal but slightly more saturated and rougher line-art texture —
  heavily grooved surface, like a battle-scarred boulder. This is the focal point.
- Eye: VIVID cold yellow-amber (#D4A010) — narrow, heavy-lidded, intense.
  The bright eye contrasts sharply against the dark cool body. Reads as sharp, not dumb.
- Teeth: cream-ivory. Lower teeth slightly visible even with jaw closed.
- Claws: dark grey, large.

POSE: Facing right. Head LOWERED and pushed forward — bull-charge ready stance.
The dome is the leading point of the head silhouette. Body coiled, weight on hindlegs.
Jaw slightly open in a wide, deep bite-ready gape — showing the full jaw depth.
NOT an open roar, NOT a neutral stand. Reads as explosive power about to be released.
The compact body and low head make it read as COILED DANGER, not awkward.

FORBIDDEN: horn-ridges above eyes, bull-horns, blood marks of any kind, long forelimbs,
dopey or neutral expression, upright standing display pose, warm brown or grey body
(must be cool teal-dark), open full roar, soft gradient, photorealism,
background, multiple creatures.
```

---

### C018 기가노토사우루스 (Giganotosaurus) — CARNIVORE / RARE / 3코 / 11 ATK / 18 HP
> 현재 스프라이트: ❌ `Giganotosaurus.png` 없음 → **이 프롬프트로 신규 생성**

```
TCG game creature illustration. Bold ink outline. Semi-flat with hard shadow zones.
Transparent or white background. Creature faces RIGHT.
Generate from scratch — NO reference image exists.

Subject: Giganotosaurus — the largest land predator, bipedal, facing right.

ANATOMY:
ELONGATED BLADE-LIKE SKULL — this is the single defining feature. The skull is
NOTICEABLY longer and narrower than T-Rex. The snout extends far forward, flat on
top like a blade, with the jaw hinge set far back behind the eye. Serrated teeth line
the full jaw. Arms visibly larger than T-Rex's tiny stubs — three-clawed, held low.
Neck thick and muscular. Massive deep chest and torso. Powerful hindlegs.
Long heavy counterbalancing tail — full body length clearly the largest on the roster.

COLOR PALETTE (deep dark crimson — blood apex predator):
- Body: deep dark crimson-red (#3A0808) — dark red, clearly red-tinted. NOT black.
  Lit areas show vivid deep red; shadow zones go near-black crimson.
- Scale pattern: slightly darker blood-red (#220404) large blotch markings across
  flanks and back — barely visible but adds texture depth.
- Underbelly/throat: dark grey-red (#2E1010) — slightly lighter than body.
- Teeth: cream-ivory — long, serrated, multiple rows visible in the open jaw.
- Eye: cold pale yellow (#D8D050) — sharp and cold contrast against the dark red face.
- Claws: pale bone-grey tips against dark horn base.

POSE: Facing right. Full body head-to-tail visible. Body angled at 30°, head
thrust forward and low — the LONG SKULL dominates the right side of the canvas.
Jaws open wide, revealing the full serrated tooth row. One arm extended with claws
forward. Tail extended left for counterbalance. Reads as an unstoppable force.

FORBIDDEN: T-Rex short rounded snout (must be long blade-like), stub arms,
black body (must be clearly dark red), upright neutral stance,
soft gradient, photorealism, background, multiple creatures.
```

---

### C019 트로오돈 (Troodon) — CARNIVORE / COMMON / 1코 / 5 ATK / 8 HP
> 현재 스프라이트: ❌ `Troodon.png` 없음 → **이 프롬프트로 신규 생성**

```
TCG game creature illustration. Bold ink outline. Semi-flat with hard shadow zones.
Transparent or white background. Creature faces RIGHT.
Generate from scratch — NO reference image exists.

Subject: Troodon — small deadly bipedal predator facing right.

ANATOMY:
TWO ENORMOUS FORWARD-FACING EYES — each eye takes up roughly 1/4 of the skull width.
Perfectly round, set at the front of a narrow wedge-shaped skull for binocular vision.
The eyes are the SINGLE most iconic feature — they must read as unnaturally large.
Lean, lightweight body — clearly the smallest carnivore after Compsognathus.
Long slender arms with three sharp curved claws. Long powerful hindlegs built for
speed. Very long whip-thin tail. Narrow pointed snout, small needle teeth.

COLOR PALETTE (dark olive-shadow — ambush predator):
- Body: dark muted olive-brown (#2E2C0C) — earthy, like shadow in dense foliage.
- Scale texture: darker charcoal-olive (#1A1A06) mottled dapple pattern — camouflage.
- Underbelly: slightly warmer sandy-olive (#4A4418).
- THE EYES: vivid burning amber-gold (#E8C010) with hard black shadow ring — the
  brightest elements in the entire illustration. Pupils: vertical black slit.
  Eyes glow with sharp hard highlight dots in the line art.
- Teeth: cream, small, needle-like.
- Claws: dark grey, curved, three per hand.

POSE: Facing right. Full body head-to-tail visible. Mid-sprint stride — one leg
extended back, one pushing off. Body leaned forward at 45°. Head turned slightly
toward the viewer, BOTH EYES directly readable. Claws spread. Tail straight back.
Reads as a ghost that kills before you see it.

FORBIDDEN: small or normal-sized eyes (must be huge, dominant), feathers,
bulky body, slow standing pose, warm red or brown body,
soft gradient, photorealism, background, multiple creatures.
```

---

### C020 바리오닉스 (Baryonyx) — CARNIVORE / UNCOMMON / 2코 / 8 ATK / 14 HP
> 현재 스프라이트: ❌ `Baryonyx.png` 없음 → **이 프롬프트로 신규 생성**

```
TCG game creature illustration. Bold ink outline. Semi-flat with hard shadow zones.
Transparent or white background. Creature faces RIGHT.
Generate from scratch — NO reference image exists.

Subject: Baryonyx — medium-large bipedal carnivore with a dramatically long snout.

ANATOMY:
EXTREME CROCODILIAN SNOUT — the snout alone equals the length of the rest of the
skull plus the neck combined. Narrow, flat on top, tapering to a pointed tip.
Interlocking conical teeth along the full jaw length — rounded and peg-like,
NOT serrated triangles. Several larger teeth at the snout tip, clearly visible.
ONE ENORMOUS THUMB CLAW per forelimb — a single massive sickle-shaped claw that
is 2–3× larger than the other two fingers. This claw must be clearly dominant in
the illustration. Lean torso, not bulky. Sturdy hindlegs. Long tail.

COLOR PALETTE (dark iron-blue — deep river predator):
- Body: dark cool slate-blue (#1A2438) — deep and cold, like river stone.
- Scale banding: darker near-black blue (#0C1220) razor-thin horizontal stripes
  running along the flanks — like current lines in water.
- Underbelly/lower jaw: slightly lighter cool grey-blue (#2E3E52).
- THUMB CLAW: pale clean bone-white (#D8D0B0) — the single brightest element.
  Wide ink outline, hard shadow on inner curve. Must stand out.
- Eye: vivid electric teal (#10D0A0) — like deep water.
- Teeth: cream, peg-shaped, running the full snout length.

POSE: Facing right. Full body head-to-tail visible. Body leaning forward, weight
on hindlegs. The LONG SNOUT juts out to the right, dominating the canvas.
Near forelimb raised with the HUGE THUMB CLAW extended forward as if about to strike.
Tail extended left for balance. Reads as a precision hunter mid-strike.

FORBIDDEN: short or wide snout (must be extremely long and narrow), missing or
small thumb claw (must be enormous), T-Rex proportions, warm body color,
serrated teeth (must be conical pegs), soft gradient, photorealism,
background, multiple creatures.
```

---

### C021 아크로칸토사우루스 (Acrocanthosaurus) — CARNIVORE / UNCOMMON / 2코 / 7 ATK / 18 HP
> 현재 스프라이트: ❌ `Acrocanthosaurus.png` 없음 → **이 프롬프트로 신규 생성**

```
TCG game creature illustration. Bold ink outline. Semi-flat with hard shadow zones.
Transparent or white background. Creature faces RIGHT.
Generate from scratch — NO reference image exists.

Subject: Acrocanthosaurus — massive bipedal carnivore with a raised muscular dorsal hump.

ANATOMY:
RAISED DORSAL HUMP — a thick continuous muscle-and-bone ridge running from the back
of the skull to mid-tail. It looks like a bison's hump but elongated across the full
back. The ridge is THICK and FLESHY — not a fin, not spines — a dense raised mound
of muscle and bone that makes the back profile clearly higher than a T-Rex.
The silhouette from the side shows a distinct "mountain ridge" along the top.
Large visible forelimbs — much bigger than T-Rex's stubs, clearly three-clawed
and forward-reaching. Wide heavy jaw, medium snout. Deep powerful chest. Thick legs.

COLOR PALETTE (dark volcanic rust with gold dorsal hump):
- Body: very dark rust-brown (#3A1206) — deep and warm, like dried lava.
- Scale banding: darker charcoal-brown (#1A0804) heavy blotch pattern on flanks.
- DORSAL HUMP: vivid amber-gold (#C88010) — the raised ridge is a DIFFERENT COLOR
  from the body. The gold hump runs the full back length, clearly visible against
  the dark body. Hard shadow on underside of hump, bright highlight on top edge.
- Underbelly: dark burnt sienna (#4A2010).
- Eye: vivid white-gold (#E0C840) — cold contrast against dark face.
- Teeth: cream-ivory.
- Claws: dark horn-grey, large, three per hand.

POSE: Facing right. Full body head-to-tail visible. Side profile clearly shows
the GOLDEN DORSAL HUMP rising above the dark body like a mountain range.
Body weight low and forward, jaw open wide. Large arms extended with claws spread.
Tail low and extended right. Reads as a siege weapon made of flesh.

FORBIDDEN: Spinosaurus fin or sail (must be a thick fleshy hump, not a sail),
T-Rex tiny stub arms (arms must be large and visible), smooth flat back (must
have raised dorsal hump), cool-toned body, soft gradient, photorealism,
background, multiple creatures.
```

---

### C022 카르카로돈토사우루스 (Carcharodontosaurus) — CARNIVORE / RARE / 3코 / 10 ATK / 16 HP
> 현재 스프라이트: ❌ `Carcharodontosaurus.png` 없음 → **이 프롬프트로 신규 생성**

```
TCG game creature illustration. Bold ink outline. Semi-flat with hard shadow zones.
Transparent or white background. Creature faces RIGHT.
Generate from scratch — NO reference image exists.

Subject: Carcharodontosaurus — enormous bipedal carnivore with massive shark-toothed jaws.

ANATOMY:
MASSIVE SHARK-TOOTH JAW — this is the entire identity. The jaw is WIDE, DEEP, and
fills with enormous triangular blade-teeth, each tooth wide-based, triangular,
and serrated on BOTH edges like a great white shark's tooth. Multiple teeth rows
partially visible. The jaw is wider at the base than T-Rex's — opens to nearly
90 degrees. Skull broad and flat on top, wider than T-Rex but slightly shorter.
Heavy muscled neck supporting the massive skull. Powerful deep chest. Arms short
but three-clawed, visible. Wide-stance thick hindlegs. Long heavy tail.

COLOR PALETTE (bleached bone-tan — desert executioner):
- Body: warm pale khaki-tan (#A09060) — like sun-bleached bone. The LIGHTEST
  carnivore in the roster — the pale body makes the dark patterns and white teeth
  read with maximum contrast.
- Scale pattern: dark charcoal-brown (#3A2A10) heavy irregular blotches across the
  entire body — like a monitor lizard. Dense, high-contrast against pale base.
- Underbelly: lighter cream-sand (#C0B080).
- TEETH: pure stark white (#F8F4E0) — the single brightest element in the
  illustration. Each tooth individually outlined, large and blade-like.
  The white teeth MUST dominate the illustration visually.
- Eye: vivid blood red (#C00000) — small, cold, intense against the pale face.
- Claws: dark grey-black.

POSE: Facing right. Full body head-to-tail visible. Body weight low and forward,
45° lean. JAWS OPEN WIDE — the massive white-toothed jaw fills the right side of
the canvas. Head turned slightly toward viewer to show jaw depth and width.
Near arm raised with claws forward. Tail low and extended. Reads as an executioner
mid-strike.

FORBIDDEN: small or normal teeth (must be enormous triangular blade-teeth), dark
body (must be pale khaki-tan), T-Rex jaw shape (must be wider/deeper), narrow jaw,
soft gradient, photorealism, background, multiple creatures.
```

---

## 🌿🦖 잡식 — Chapter 1 (4종)

### C013 테리지노사우루스 (Therizinosaurus) — OMNIVORE / UNCOMMON / 2코 / 9 ATK / 18 HP
> 현재 스프라이트: ❌ `Therizinosaurus.png` 없음 → **이 프롬프트로 신규 생성**

```
TCG game creature illustration. Bold ink outline. Semi-flat with hard shadow zones.
Transparent or white background. Creature faces RIGHT.
Generate from scratch — NO reference image exists.

Subject: Therizinosaurus — enormous bipedal dinosaur facing right.

ANATOMY:
THREE SICKLE CLAWS on each forelimb — each claw roughly as long as the forearm,
curving forward. All three claws point in roughly the SAME forward direction —
loosely parallel like three blades, NOT splayed wide. Think weapon, not rake.
Long neck, small beaked head (no visible teeth). Deep wide torso, stocky hindlegs.
Short tail. Large, heavy, clearly bipedal. Rough pebbly scale texture across the body —
small raised osteoderms along neck and shoulder, rendered as individual outlined shapes.

COLOR PALETTE (cool dark green — distinct from Stegosaurus warm forest green):
- Body: deep cool grey-green (#253A28) — dark, low-saturation, like weathered stone.
- Scale/osteoderm texture: slightly darker (#162018) outlined shapes on neck, shoulders,
  upper back. Hard shadow on the lower edge of each raised scale.
- THREE SICKLE CLAWS: pale bone-grey (#C8C0A0) fading to dark horn-grey (#3A3020) at tips.
  Wide ink outline on each claw. Hard shadow on the inside curve of each.
- Underbelly/inner legs: slightly lighter grey-green (#384A3A).
- Beak: dark brownish-grey (#3A2A10), hooked tip, small.
- Eye: vivid warm amber (#C07820) — heavy-lidded, forward-facing.
- Hindfoot claws: dark horn-grey, three per foot, sturdy.

POSE: Facing right. Body slightly forward-leaning, weight on hindlegs. One forelimb
raised, one forelimb lower — both arms in side profile. Three claws on each hand
point forward-right in parallel, like drawn blades ready to slash. NOT splayed.
Head raised, beak closed, neck arched. Full body visible.
Reads as powerful and deliberate, not awkward.

FORBIDDEN: feathers or plumage of any kind, teeth in place of beak, claws splayed
in different directions (must be parallel), claws extending past the snout in length,
T-Rex two-stub arms, predatory crouch, warm brown body, soft gradient, photorealism,
background, multiple creatures.
```

---

### C015 이구아노돈 (Iguanodon) — OMNIVORE / UNCOMMON / 1코 / 7 ATK / 20 HP
> 현재 스프라이트: ❌ `Iguanodon.png` 없음 → **이 프롬프트로 신규 생성**

```
TCG game creature illustration. Bold ink outline. Semi-flat with hard shadow zones.
Transparent or white background. Creature faces RIGHT.
Generate from scratch — NO reference image exists.

Subject: Iguanodon — large bipedal dinosaur facing right.

ANATOMY:
CONICAL THUMB SPIKE on each hand — a single rigid bony spike projecting forward from
the thumb joint, as long as one finger. Three clawed fingers per hand PLUS this spike.
The spike must be clearly visible and prominent. Bulky robust body, heavier than Raptor.
Wide flat blunt snout (not a narrow predator jaw, not an extreme duck-bill). Medium neck.
Long muscular hindlimbs, medium forelimbs. Long counterbalancing tail. Bipedal stance.
Rough scale texture across body rendered as line-art detail — no smooth skin.

COLOR PALETTE (warm olive-green — distinct from all other dinosaurs):
- Body: warm sage-green (#5A7030) — earthy olive. NOT yellow-green, NOT lime.
- Scale banding: slightly darker olive-brown (#3A4A18) irregular patches on back and flanks.
- Underbelly/lower jaw: lighter sandy-sage (#909858).
- THUMB SPIKE: pale ivory-bone (#D4C890), darker tip (#5A4818). Hard highlight on upper edge.
- Eye: warm amber (#B07020).
- Snout: dark brownish-grey (#3A2A10), wide and flat in profile.
- Foot claws: dark horn-grey, three per foot.

POSE: Facing right. Bipedal, body slightly forward-leaning. One forelimb raised —
thumb spike of that hand angled forward, clearly visible in silhouette. Mouth closed.

FORBIDDEN: quadruped four-legged stance, missing or small thumb spike, horned frill,
duck-bill hadrosaur snout, soft gradient, photorealism, background, multiple creatures.
```

---

### C016 케라토사우루스 (Ceratosaurus) — OMNIVORE / UNCOMMON / 2코 / 10 ATK / 14 HP
> 현재 스프라이트: ❌ `Ceratosaurus.png` 없음 → **이 프롬프트로 신규 생성**

```
TCG game creature illustration. Bold ink outline. Semi-flat with hard shadow zones.
Transparent or white background. Creature faces RIGHT.
Generate from scratch — NO reference image exists.

Subject: Ceratosaurus — medium bipedal dinosaur facing right.

ANATOMY:
ONE NASAL HORN at the very tip of the snout — short, flat blade shape, forward-pointing.
NOT bull-horns above the eyes (that is Carnotaurus). NOT a rounded dome. Snout-tip only.
Small brow bumps above each eye — slight rounded knobs, NOT flat ridges (Allosaurus).
FOUR-FINGERED forelimbs — draw four distinct claw fingers per hand. This is the key
anatomical difference from other bipedal carnivores. Medium frame, pronounced jaw with
visible teeth. Long laterally-flattened tail. Robust hindlegs. Scale texture in line art.

COLOR PALETTE (deep indigo-purple — distinct from all other roster dinosaurs):
- Body: deep dark indigo-purple (#2A1838) — very dark, purple-tinted, NOT grey-black.
- Scale banding: irregular dark blotch pattern (#1A0E28) across flanks and back —
  like crocodile camouflage markings. Each blotch outlined with thin inner lines.
- Nasal horn: pale dirty-bone (#C8C040), hard shadow on lower edge.
- Underbelly: dark muted purple-grey (#3A2848).
- Eye: vivid amber-gold (#C09010) — sharp contrast against the dark face.
- Teeth: cream-ivory.
- Claws: dark grey, four per hand clearly drawn.

POSE: Facing right. Low forward lean, body angled. Mouth open showing teeth.
One forelimb extended, four claws spread. Tail raised for balance.

FORBIDDEN: bull-horns above eyes (Carnotaurus), flat eye-ridge crests (Allosaurus),
single nasal dome (Majungasaurus), three-fingered hands (must be FOUR), warm brown or
red body (must be indigo-purple), soft gradient, photorealism, background, multiple creatures.
```

---

### C017 갈리미무스 (Gallimimus) — OMNIVORE / COMMON / 1코 / 6 ATK / 10 HP
> 현재 스프라이트: ❌ `Gallimimus.png` 없음 → **이 프롬프트로 신규 생성**

```
TCG game creature illustration. Bold ink outline. Semi-flat with hard shadow zones.
Transparent or white background. Creature faces RIGHT.
Generate from scratch — NO reference image exists.

Subject: Gallimimus — large bipedal ostrich-dinosaur facing right.

ANATOMY:
LONG POWERFUL LEGS — the most prominent feature. Thighs thick and muscular, lower
legs long and slender. Digitigrade stance (runs on toes). Three forward toes with
small curved claws.
LONG SLENDER NECK — roughly as long as the torso. Small flat toothless beak
(no teeth at all — toothless jaw distinguishes this silhouette from all other bipeds).
Large eyes on either side of the flat narrow skull.
LONG ARMS with three small fingers — longer than typical theropod arms, swept back
in running pose. Small rounded body relative to legs and neck.
Long thin tail for balance.

COLOR PALETTE (warm sandy-ochre — distinct from all other roster dinosaurs):
- Body: warm sandy-ochre (#C8A050) — a bright warm tan, clearly different from
  the cool or dark tones of other dinosaurs. Think desert-running bird coloring.
- Darker stripe banding: warm dark brown (#6A4010) across the neck and upper back —
  thin stripes following the muscle direction. 4–6 stripes visible.
- Underbelly/inner legs: lighter cream-sand (#E0C870) — significantly lighter than body.
- Arms and shoulder area: slightly darker warm brown than body (#8A6020).
- Eye: large and round, VIVID bright orange (#D06010) — the most prominent eye in
  the roster, forward-facing. The large eye reads as alert and fast-reacting.
- Beak: dark brownish-grey (#3A2A10), flat and toothless. No teeth visible at all.
- Toe claws: dark grey, three per foot, slender.

POSE: Facing right. Full running stride — one leg extended back, one pushing off the
ground, neck angled forward, arms swept back. Legs dominate the canvas.
Reads as pure velocity.

FORBIDDEN: teeth in the jaw (toothless beak only), short legs (legs must dominate),
large bulky body, static standing pose (must be running stride), dark cool body color
(must be warm sandy-ochre), feathers (no feather rendering), soft gradient,
photorealism, background, multiple creatures.
```

---

## 작업 현황

| ID | 이름 | 종류 | 스프라이트 | 상태 |
|---|---|---|---|---|
| C001 | 트리케라톱스 | 초식 | ✅ Triceratops.png | 완료 |
| C002 | 스테고사우루스 | 초식 | ✅ Stegosaurus.png | 완료 |
| C003 | 안킬로사우루스 | 초식 | ✅ Ankylosaurus.png | 완료 |
| C011 | 브라키오사우루스 | 초식 | ✅ Brachiosaurus.png | 완료 |
| C004 | 랩터 | 육식 | ✅ Raptor.png | 완료 |
| C005 | 카르노타우루스 | 육식 | ✅ Carnotaurus.png | 완료 |
| C008 | 티렉스 | 육식 | ✅ T-Rex.png | 완료 |
| C010 | 콤프소그나투스 | 육식 | ✅ Compsognathus.png | 완료 |
| C012 | 알로사우루스 | 육식 | ❌ 없음 | **🔴 생성 필요** |
| C014 | 마준가사우루스 | 육식 | ❌ 없음 | **🔴 생성 필요** |
| C013 | 테리지노사우루스 | 잡식 | ❌ 없음 | **🔴 생성 필요** |
| C015 | 이구아노돈 | 잡식 | ❌ 없음 | **🔴 생성 필요** |
| C016 | 케라토사우루스 | 잡식 | ❌ 없음 | **🔴 생성 필요** |
| C017 | 갈리미무스 | 잡식 | ❌ 없음 | **🔴 생성 필요** |
