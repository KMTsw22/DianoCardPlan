"""Replace Unity InGame assets with Photoroom versions, preserving .meta sidecars.

Mapping (Photoroom file -> Unity Resources/InGame slot):
  HUD bar  1777443764211  -> InGame/TopBar.png
  END TURN 1777437177684  -> InGame/EndTurnButton.png
  Heart    1777443128959  -> InGame/Icon/HP.png
  Coin     1777444187794  -> InGame/Icon/Gold.png
  Energy*  1777436922396  -> InGame/Icon/Mana.png       (4-pt energy crystal)
  Deck     1777437084072  -> InGame/Icon/Deck.png       (card stack)
  Spellbk  1777441183178  -> InGame/Icon/Relic.png
  Orb      1777442038353  -> InGame/Icon/Discard.png    (purple orb, differs from Deck)
  Bottle   1777442128358  -> InGame/Icon/Potion_Bottle.png
  Frame    1777439085860  -> InGame/Icon/CardBack.png
  Shield*  1777444634637  -> InGame/Icon/Shield.png     (silver 4-pt — from MVP root)
  D-orn    1777442766455  -> (skip; decorative letter D, no slot)

Existing slots without a Photoroom match are left untouched:
  Icon/Attack.png, Icon/Floor.png, Icon/Potion_Flask.png,
  Icon/ShieldGreen.png, Icon/Turn.png
"""
from PIL import Image
import os
import shutil

MVP = r"C:\Users\mintae\coding\DianoCard\DianoCardPlan\MVP"
UP = os.path.join(MVP, "UP_YJ")
INGAME = r"C:\Users\mintae\coding\DianoCard\DianoCard\DianoCard\Assets\Resources\InGame"
ICON = os.path.join(INGAME, "Icon")

MAPPING = [
    # (source_path, target_path)
    (os.path.join(UP, "gemini-1777443764211-0-Photoroom.png"), os.path.join(INGAME, "TopBar.png")),
    (os.path.join(UP, "gemini-1777437177684-0-Photoroom.png"), os.path.join(INGAME, "EndTurnButton.png")),
    (os.path.join(UP, "gemini-1777443128959-0-Photoroom.png"), os.path.join(ICON, "HP.png")),
    (os.path.join(UP, "gemini-1777444187794-0-Photoroom.png"), os.path.join(ICON, "Gold.png")),
    (os.path.join(UP, "gemini-1777436922396-0-Photoroom.png"), os.path.join(ICON, "Mana.png")),
    (os.path.join(UP, "gemini-1777437084072-0-Photoroom.png"), os.path.join(ICON, "Deck.png")),
    (os.path.join(UP, "gemini-1777441183178-0-Photoroom.png"), os.path.join(ICON, "Relic.png")),
    (os.path.join(UP, "gemini-1777442038353-0-Photoroom.png"), os.path.join(ICON, "Discard.png")),
    (os.path.join(UP, "gemini-1777442128358-0-Photoroom.png"), os.path.join(ICON, "Potion_Bottle.png")),
    (os.path.join(UP, "gemini-1777439085860-0-Photoroom.png"), os.path.join(ICON, "CardBack.png")),
    (os.path.join(MVP, "gemini-1777444634637-0-Photoroom.png"), os.path.join(ICON, "Shield.png")),
]


def tight_crop_save(src: str, dst: str):
    """Tight-crop transparent borders, then save to dst (overwriting)."""
    import numpy as np
    im = Image.open(src).convert("RGBA")
    a = np.array(im)
    mask = a[:, :, 3] > 16
    if mask.any():
        rows = np.where(mask.any(axis=1))[0]
        cols = np.where(mask.any(axis=0))[0]
        # 8px padding so anti-aliased edges aren't clipped
        pad = 8
        l = max(0, cols.min() - pad)
        t = max(0, rows.min() - pad)
        r = min(im.size[0], cols.max() + 1 + pad)
        b = min(im.size[1], rows.max() + 1 + pad)
        im = im.crop((l, t, r, b))
    im.save(dst, "PNG")


for src, dst in MAPPING:
    if not os.path.exists(src):
        print(f"MISSING src: {src}")
        continue
    if os.path.exists(dst):
        print(f"OVERWRITE: {os.path.relpath(dst, INGAME)}  <- {os.path.basename(src)}")
    else:
        print(f"NEW:       {os.path.relpath(dst, INGAME)}  <- {os.path.basename(src)}")
    tight_crop_save(src, dst)

print("\nDone.")
