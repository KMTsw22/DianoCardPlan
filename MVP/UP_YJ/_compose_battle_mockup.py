"""Compose a battle-screen mockup using the Photoroom (transparent) assets in UP_YJ,
following the layout of gemini-image-1777433014440-0.png."""
from PIL import Image, ImageDraw, ImageFont
import numpy as np
import os

ROOT = r"C:\Users\mintae\coding\DianoCard\DianoCardPlan\MVP"
UP = os.path.join(ROOT, "UP_YJ")
BG = os.path.join(ROOT, "Background_YJ", "Background1.png")
CHAR = os.path.join(ROOT, "Character_YJ", "gemini-1776631348502-0-Photoroom.png")
MON = os.path.join(ROOT, "Monster_YJ", "ChatGPT Image 2026년 4월 22일 오후 09_36_07-Photoroom.png")
CARDS = [os.path.join(ROOT, "Card_YJ", f"Card{i}-Photoroom.png") for i in (1, 2, 3, 4)]

HUD_BAR = os.path.join(UP, "gemini-1777443764211-0-Photoroom.png")
HEART = os.path.join(UP, "gemini-1777443128959-0-Photoroom.png")
COIN = os.path.join(UP, "gemini-1777444187794-0-Photoroom.png")
GEM_ORB = os.path.join(UP, "gemini-1777442038353-0-Photoroom.png")
SPELLBOOK = os.path.join(UP, "gemini-1777441183178-0-Photoroom.png")
CARD_STACK = os.path.join(UP, "gemini-1777437084072-0-Photoroom.png")
ENERGY_STAR = os.path.join(UP, "gemini-1777436922396-0-Photoroom.png")
END_TURN = os.path.join(UP, "gemini-1777437177684-0-Photoroom.png")

W, H = 1376, 768
canvas = Image.open(BG).convert("RGBA").resize((W, H))
# darken background slightly so UI pops
overlay = Image.new("RGBA", (W, H), (0, 0, 0, 70))
canvas = Image.alpha_composite(canvas, overlay)


def tight_crop(im: Image.Image, alpha_thresh: int = 64) -> Image.Image:
    a = np.array(im)
    if a.shape[2] < 4:
        return im
    mask = a[:, :, 3] > alpha_thresh
    if not mask.any():
        return im
    rows = np.where(mask.any(axis=1))[0]
    cols = np.where(mask.any(axis=0))[0]
    return im.crop((cols.min(), rows.min(), cols.max() + 1, rows.max() + 1))


def fit(im: Image.Image, max_w: int, max_h: int) -> Image.Image:
    w, h = im.size
    s = min(max_w / w, max_h / h)
    return im.resize((max(1, int(w * s)), max(1, int(h * s))), Image.LANCZOS)


def paste_centered(canvas: Image.Image, im: Image.Image, cx: int, cy: int):
    w, h = im.size
    canvas.alpha_composite(im, (cx - w // 2, cy - h // 2))


# === Top HUD bar ===
hud = tight_crop(Image.open(HUD_BAR).convert("RGBA"))
hud = fit(hud, W, 180)
canvas.alpha_composite(hud, ((W - hud.size[0]) // 2, 0))

# Load font (fallback to default)
def load_font(size: int):
    candidates = [
        r"C:\Windows\Fonts\seguibl.ttf",
        r"C:\Windows\Fonts\segoeuib.ttf",
        r"C:\Windows\Fonts\arialbd.ttf",
        r"C:\Windows\Fonts\arial.ttf",
    ]
    for p in candidates:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()

draw = ImageDraw.Draw(canvas)
NUM_FONT = load_font(28)
NUM_FONT_S = load_font(22)


def hud_slot(canvas: Image.Image, icon_path: str, cx: int, cy: int, icon_h: int, label: str):
    icon = tight_crop(Image.open(icon_path).convert("RGBA"))
    icon = fit(icon, icon_h * 2, icon_h)
    paste_centered(canvas, icon, cx, cy)
    # number to the right of icon
    bbox = ImageDraw.Draw(canvas).textbbox((0, 0), label, font=NUM_FONT)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = cx + icon.size[0] // 2 + 8
    ty = cy - th // 2 - 4
    # text shadow
    ImageDraw.Draw(canvas).text((tx + 2, ty + 2), label, font=NUM_FONT, fill=(0, 0, 0, 220))
    ImageDraw.Draw(canvas).text((tx, ty), label, font=NUM_FONT, fill=(245, 235, 210, 255))


HUD_Y = 78  # vertical center of icons inside the bar
# Left cluster
hud_slot(canvas, HEART, 90, HUD_Y, 70, "70/70")
hud_slot(canvas, COIN, 290, HUD_Y, 60, "0")
hud_slot(canvas, GEM_ORB, 460, HUD_Y, 64, "0/3")
# Right cluster (avoid central medallion at ~688)
hud_slot(canvas, SPELLBOOK, 950, HUD_Y, 64, "10")
hud_slot(canvas, CARD_STACK, 1170, HUD_Y, 70, "0/14")

# === Character (left) ===
char = Image.open(CHAR).convert("RGBA")
char = fit(char, 380, 460)
paste_centered(canvas, char, 230, 420)

# === Monster (right) ===
mon = Image.open(MON).convert("RGBA")
mon = fit(mon, 360, 320)
paste_centered(canvas, mon, 1080, 430)

# Monster name plate
name_font = load_font(20)
name_text = "Spotted Mushroom"
nb = draw.textbbox((0, 0), name_text, font=name_font)
nw = nb[2] - nb[0]
nh = nb[3] - nb[1]
plate_x, plate_y = 1090 - nw // 2 - 10, 270
plate = Image.new("RGBA", (nw + 20, nh + 12), (10, 10, 18, 200))
canvas.alpha_composite(plate, (plate_x, plate_y))
draw.text((plate_x + 10, plate_y + 4), name_text, font=name_font, fill=(230, 220, 200, 255))

# === Bottom: cards in hand ===
card_imgs = [tight_crop(Image.open(p).convert("RGBA")) for p in CARDS]
# fit each to ~190x250 (roughly card aspect ratio)
card_imgs = [fit(c, 200, 280) for c in card_imgs]
# arrange centered with slight overlap
center_x = W // 2
spacing = 175
total_w = spacing * (len(card_imgs) - 1)
start_x = center_x - total_w // 2
for i, c in enumerate(card_imgs):
    cx = start_x + i * spacing
    cy = H - 130
    # subtle drop shadow under card
    sh = Image.new("RGBA", c.size, (0, 0, 0, 0))
    paste_centered(canvas, c, cx, cy)

# === Bottom-left: Energy "3/3" ===
energy = tight_crop(Image.open(ENERGY_STAR).convert("RGBA"))
energy = fit(energy, 220, 220)
paste_centered(canvas, energy, 110, H - 110)
ef = load_font(46)
et = "3/3"
eb = draw.textbbox((0, 0), et, font=ef)
ew = eb[2] - eb[0]
eh = eb[3] - eb[1]
draw.text((110 - ew // 2 + 2, H - 110 - eh // 2 + 2), et, font=ef, fill=(0, 0, 0, 220))
draw.text((110 - ew // 2, H - 110 - eh // 2), et, font=ef, fill=(240, 230, 200, 255))

# === Bottom-right: END TURN ===
end_turn = tight_crop(Image.open(END_TURN).convert("RGBA"))
end_turn = fit(end_turn, 280, 140)
paste_centered(canvas, end_turn, W - 160, H - 110)

# Save
out = os.path.join(UP, "battle_mockup_photoroom.png")
canvas.convert("RGB").save(out, "PNG")
print("saved:", out, canvas.size)
