# 진화 공룡 스킬 아이콘 프롬프트 (Gemini)

진화 공룡(T1+)의 시그니처 스킬 4종 — 검(ATTACK) 옆에 들어가는 작은 UI 뱃지.
`dino_skill.csv`의 `skill_name_en`을 키로 사용해 파일명과 매칭한다.

- **출력**: 1024×1024 PNG, 투명 배경
- **스타일 기준**: `Resources/InGame/HeadIcon/ATTACK.png`(붉은 단검 스티커) 톤
- **저장 경로**: `DianoCard/Assets/Resources/InGame/HeadIcon/Skill/{NAME}.png`
  - PACK_SLASH / CHARGE_RAM / APEX_ROAR / RECON_DRONE

## 공통 스타일 (모든 프롬프트 끝에 붙는 블록)

```
STYLE: Game UI sticker icon. Anime cel-shading. Bold dark crimson outline (#5A1C24, ~8px thick). Flat interior shading with deep red and bright pink gradient. Slight inner highlight on top edges. Soft drop shadow underneath the emblem. Centered single emblem, no scene, no character, no text, no border. Transparent PNG background — full alpha, NO solid color (no green screen, no white, no checkered pattern visible).

FORBIDDEN: solid background color, scene, environment, character body, text, letters, numbers, frame, border, multiple emblems, painted/airbrush style.
```

---

## 1. PACK_SLASH (연격) — C004 랩터

```
1024x1024 PNG transparent background. Game UI skill icon.

SUBJECT: Two parallel diagonal raptor claw slash marks tearing across the canvas from upper-left to lower-right, like ripped flesh wounds. Inside the slashes show deep red gradient with bright pink highlight at the top edge of each cut. Crimson blood droplets dripping from the bottom of each slash, a few falling free below.

STYLE: Game UI sticker icon. Anime cel-shading. Bold dark crimson outline (#5A1C24, ~8px thick). Flat interior shading with deep red and bright pink gradient. Slight inner highlight on top edges. Soft drop shadow underneath the emblem. Centered single emblem, no scene, no character, no text, no border. Transparent PNG background — full alpha, NO solid color.

FORBIDDEN: solid background color, scene, environment, character body, text, letters, numbers, frame, border, multiple emblems, painted/airbrush style.
```

---

## 2. CHARGE_RAM (돌진 박치기) — C005 카르노

```
1024x1024 PNG transparent background. Game UI skill icon.

SUBJECT: A single thick curved bull-style horn pointing forward to upper-right, ridged surface with cracks running along its length, deep red and pink gradient inside. Sharp golden brass-yellow impact starburst lines explosively radiating from the horn's tip — strong charging headbutt motif. Around 5-7 jagged spike rays in the burst.

STYLE: Game UI sticker icon. Anime cel-shading. Bold dark crimson outline (#5A1C24, ~8px thick). Flat interior shading with deep red and bright pink gradient on the horn, brass-yellow flat-shaded burst. Slight inner highlight on top edges. Soft drop shadow underneath the emblem. Centered single emblem, no scene, no character, no text, no border. Transparent PNG background — full alpha, NO solid color (no green screen).

FORBIDDEN: solid background color, scene, environment, character body, text, letters, numbers, frame, border, multiple emblems, painted/airbrush style.
```

---

## 3. APEX_ROAR (패왕의 포효) — C008 렉스

```
1024x1024 PNG transparent background. Game UI skill icon.

SUBJECT: A massive snarling tyrannosaurus rex head viewed from front-three-quarter angle, jaws wide open showing rows of jagged sharp white teeth, fierce eye glaring. THREE concentric crescent-shaped sonic shockwave arcs blasting outward from the open jaws (suggesting a powerful AOE roar attack). NOT a drone, NOT a disc, NOT a mecha — fleshy organic dinosaur head with reptilian scaled texture.

STYLE: Game UI sticker icon. Anime cel-shading. Bold dark crimson outline (#5A1C24, ~8px thick). Flat interior shading with deep blood red and bright pink gradient on the dinosaur head. Golden brass-yellow flat-shaded shockwave arcs. Slight inner highlight on top edges. Soft drop shadow underneath the emblem. Centered single emblem, no scene, no character body, no text, no border. Transparent PNG background — full alpha.

FORBIDDEN: solid background color, scene, environment, full body, robot, mecha, drone, text, letters, numbers, frame, border, painted/airbrush style.
```

---

## 4. RECON_DRONE (정찰 드론) — C010 콤프

```
1024x1024 PNG transparent background. Game UI skill icon.

SUBJECT: A small disc-shaped chibi reconnaissance drone hovering, with one large glowing brass-yellow scanner eye in its center, two short antenna nubs on top, and a thin rotor or stand underneath. A faint concentric radar pulse ring spreads below the drone. Deep crimson body plating with pink trim.

STYLE: Game UI sticker icon. Anime cel-shading. Bold dark crimson outline (#5A1C24, ~8px thick). Flat interior shading with deep crimson body, bright pink trim accents, glowing brass-yellow eye core. Slight inner highlight on top edges. Soft drop shadow underneath the emblem. Centered single emblem, no scene, no character, no text, no border. Transparent PNG background — full alpha.

FORBIDDEN: solid background color, scene, environment, character body, text, letters, numbers, frame, border, multiple drones, painted/airbrush style.
```

---

## 메모

- PACK_SLASH, RECON_DRONE은 codex로 1차 뽑은 결과가 OK여서 `tmp/skill_icons/`에 보관 중. 그대로 써도 되고 Gemini로 다시 뽑아도 됨.
- CHARGE_RAM은 codex가 초록 배경(투명 아님)으로 뽑아서 재생성 필요.
- APEX_ROAR도 codex가 RECON_DRONE과 너무 비슷한 디스크 형태로 뽑아서 재생성 필요.
- 최종 파일은 `DianoCard/Assets/Resources/InGame/HeadIcon/Skill/` 아래에 위 4개 이름 그대로 저장.
