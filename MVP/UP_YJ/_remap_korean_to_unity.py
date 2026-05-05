"""Korean-labeled originals (placed in Resources/InGame/Icon/) -> proper Unity slots.

User labels make the mapping definitive — overrides previous guesses.

  맨위쪽 패널.png  -> InGame/TopBar.png            (top HUD bar; up one level)
  엔드턴.png        -> InGame/EndTurnButton.png     (END TURN; up one level)
  체력.png          -> InGame/Icon/HP.png
  돈.png            -> InGame/Icon/Gold.png
  마나코스트.png    -> InGame/Icon/Mana.png
  덱.png            -> InGame/Icon/Deck.png
  유물.png          -> InGame/Icon/Relic.png
  버려진카드.png    -> InGame/Icon/Discard.png
  포션.png          -> InGame/Icon/Potion_Bottle.png
  카드들.png        -> InGame/Icon/CardBack.png
  계단.png          -> InGame/Icon/Floor.png

Delete the Korean source after successful copy. Preserve all .meta sidecars.
"""
import os
import shutil

INGAME = r"C:\Users\mintae\coding\DianoCard\DianoCard\DianoCard\Assets\Resources\InGame"
ICON = os.path.join(INGAME, "Icon")

MAPPING = [
    ("맨위쪽 패널.png", os.path.join(INGAME, "TopBar.png")),
    ("엔드턴.png",        os.path.join(INGAME, "EndTurnButton.png")),
    ("체력.png",          os.path.join(ICON, "HP.png")),
    ("돈.png",            os.path.join(ICON, "Gold.png")),
    ("마나코스트.png",    os.path.join(ICON, "Mana.png")),
    ("덱.png",            os.path.join(ICON, "Deck.png")),
    ("유물.png",          os.path.join(ICON, "Relic.png")),
    ("버려진카드.png",    os.path.join(ICON, "Discard.png")),
    ("포션.png",          os.path.join(ICON, "Potion_Bottle.png")),
    ("카드들.png",        os.path.join(ICON, "CardBack.png")),
    ("계단.png",          os.path.join(ICON, "Floor.png")),
]

for kr_name, dst in MAPPING:
    src = os.path.join(ICON, kr_name)
    if not os.path.exists(src):
        print(f"MISSING: {kr_name}")
        continue
    rel = os.path.relpath(dst, INGAME)
    if os.path.exists(dst):
        print(f"OVERWRITE: {rel}  <- {kr_name}")
    else:
        print(f"NEW:       {rel}  <- {kr_name}")
    shutil.copyfile(src, dst)
    os.remove(src)

# Final sanity check — list any leftover Korean files
print("\nLeftover non-ASCII files in Icon/:")
for f in sorted(os.listdir(ICON)):
    if any(ord(c) > 127 for c in f):
        print("  ", f)
print("\nDone.")
