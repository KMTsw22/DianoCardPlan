"""Fix Unity .meta sprite rects to match the (new) PNG dimensions.

Old meta files had sprite rects (x,y,w,h) tuned for the *original* sliced
sprites — when we replaced the PNGs with new (smaller / differently-positioned)
images, the rects pointed to invalid regions, so Unity rendered an empty
sprite.

This rewrites each meta's sprite rect to (0, 0, full_w, full_h) so the sprite
covers the entire new image. spriteMode (2 = Multiple) and pivot/alignment are
preserved.
"""
from PIL import Image
import os
import re

ROOT = r"C:\Users\mintae\coding\DianoCard\DianoCard\DianoCard\Assets\Resources\InGame"

TARGETS = [
    "TopBar.png",
    "EndTurnButton.png",
    "Icon/HP.png",
    "Icon/Gold.png",
    "Icon/Mana.png",
    "Icon/Deck.png",
    "Icon/Relic.png",
    "Icon/Discard.png",
    "Icon/Potion_Bottle.png",
    "Icon/CardBack.png",
    "Icon/Floor.png",
]


def fix_meta(png_path: str):
    meta_path = png_path + ".meta"
    if not os.path.exists(meta_path):
        return f"NO META: {meta_path}"
    if not os.path.exists(png_path):
        return f"NO PNG:  {png_path}"

    with Image.open(png_path) as im:
        w, h = im.size

    with open(meta_path, "r", encoding="utf-8") as f:
        text = f.read()

    # Replace the first `rect: { x:..; y:..; width:..; height:.. }` block
    # under spriteSheet -> sprites -> rect.
    pattern = re.compile(
        r"(rect:\s*\n\s*serializedVersion:\s*\d+\s*\n\s*x:\s*)-?\d+"
        r"(\s*\n\s*y:\s*)-?\d+"
        r"(\s*\n\s*width:\s*)\d+"
        r"(\s*\n\s*height:\s*)\d+",
        re.MULTILINE,
    )
    new_text, n = pattern.subn(
        lambda m: f"{m.group(1)}0{m.group(2)}0{m.group(3)}{w}{m.group(4)}{h}",
        text,
        count=1,
    )
    if n == 0:
        return f"NO MATCH in {meta_path}"

    with open(meta_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(new_text)
    return f"FIXED: {os.path.relpath(meta_path, ROOT)}  -> rect=(0,0,{w},{h})"


for rel in TARGETS:
    print(fix_meta(os.path.join(ROOT, rel.replace("/", os.sep))))
