#!/usr/bin/env python3
"""Generate original 88x31 retro blinkies for GIF WORLD sidebar wall."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent / "images" / "blinkies" / "wall"
W, H = 88, 31


def frame_base(bg, border=None):
    img = Image.new("P", (W, H))
    palette = [
        0, 0, 0,
        255, 255, 255,
        192, 192, 192,
        128, 128, 128,
        64, 64, 64,
        255, 0, 0,
        0, 128, 0,
        0, 0, 255,
        255, 255, 0,
        255, 128, 200,
        0, 180, 220,
        140, 90, 40,
        255, 140, 0,
        80, 40, 120,
        40, 100, 50,
        200, 220, 255,
    ]
    while len(palette) < 768:
        palette.extend([0, 0, 0])
    img.putpalette(palette[:768])
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, W - 1, H - 1], fill=bg)
    if border:
        draw.rectangle([0, 0, W - 1, H - 1], outline=border)
        draw.rectangle([1, 1, W - 2, H - 2], outline=3)
    return img, draw


def save_gif(name, frames, duration=120):
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / name
    frames[0].save(
        path,
        save_all=True,
        append_images=frames[1:],
        duration=duration,
        loop=0,
        optimize=False,
    )
    print("wrote", path)


def blinkie_gif_world():
    frames = []
    for phase in range(4):
        img, d = frame_base(14, 1)
        d.rectangle([2, 2, 85, 28], fill=7 if phase % 2 else 8)
        d.rectangle([4, 4, 12, 27], fill=2)
        d.rectangle([5, 5, 11, 26], fill=3)
        d.text((14, 6), "GIF", fill=1)
        d.text((14, 17), "WORLD", fill=0 if phase % 2 else 1)
        d.rectangle([72, 8, 84, 22], fill=6 if phase < 2 else 5)
        d.text((74, 11), "!", fill=1)
        frames.append(img)
    save_gif("wall-gif-world.gif", frames, 180)


def blinkie_pole_online():
    frames = []
    for phase in range(6):
        img, d = frame_base(13, 1)
        d.rectangle([1, 1, 86, 29], fill=15)
        d.rectangle([2, 2, 85, 28], fill=14 if phase % 2 == 0 else 13)
        d.text((4, 4), "POLE", fill=1)
        d.text((4, 15), "ONLINE", fill=7 if phase % 3 else 1)
        dot = 5 if phase % 2 else 2
        d.ellipse([76, 10, 84, 18], fill=dot)
        d.ellipse([77, 11, 83, 17], fill=6 if phase % 2 else 2)
        frames.append(img)
    save_gif("wall-pole-online.gif", frames, 200)


def blinkie_vibes():
    frames = []
    colors = [8, 9, 10, 9]
    for i, c in enumerate(colors):
        img, d = frame_base(12, 1)
        d.rectangle([0, 0, W - 1, 8], fill=c)
        d.text((3, 10), "GOOD", fill=1)
        d.text((3, 19), "VIBES", fill=colors[(i + 1) % len(colors)])
        for x in range(58, 86, 4):
            d.rectangle([x, 12 + (i * 2) % 8, x + 2, 14 + (i * 2) % 8], fill=7)
        frames.append(img)
    save_gif("wall-good-vibes.gif", frames, 160)


def blinkie_snail_mail():
    frames = []
    for phase in range(8):
        img, d = frame_base(11, 1)
        d.rectangle([1, 1, 86, 29], fill=2)
        d.rectangle([2, 2, 85, 28], fill=3)
        sx = 4 + (phase % 4)
        d.ellipse([sx, 14, sx + 10, 24], fill=9)
        d.ellipse([sx + 6, 12, sx + 14, 18], fill=9)
        d.text((22, 6), "SNAIL", fill=0)
        d.text((22, 17), "MAIL", fill=6)
        frames.append(img)
    save_gif("wall-snail-mail.gif", frames, 140)


def blinkie_field_hugs():
    frames = []
    for phase in range(4):
        img, d = frame_base(9, 1)
        d.rectangle([2, 2, 85, 28], fill=15 if phase % 2 else 2)
        d.text((4, 5), "FREE", fill=0)
        d.text((4, 16), "HUGS", fill=5)
        d.text((52, 8), "<3", fill=8 if phase % 2 else 5)
        d.line([60, 20, 66, 14, 72, 20], fill=7, width=1)
        frames.append(img)
    save_gif("wall-free-hugs.gif", frames, 220)


def blinkie_under_field():
    frames = []
    stripes_a = [7, 8, 7, 8]
    stripes_b = [8, 7, 8, 7]
    for i in range(4):
        img, d = frame_base(0, 1)
        for y in range(2, 29):
            c = stripes_a[i] if (y // 3) % 2 == 0 else stripes_b[i]
            d.line([2, y, 85, y], fill=c)
        d.rectangle([3, 8, 84, 22], fill=0)
        d.text((6, 10), "UNDER", fill=7)
        d.text((6, 18), "FIELD", fill=1)
        frames.append(img)
    save_gif("wall-under-field.gif", frames, 200)


if __name__ == "__main__":
    blinkie_gif_world()
    blinkie_pole_online()
    blinkie_vibes()
    blinkie_snail_mail()
    blinkie_field_hugs()
    blinkie_under_field()
    print("done:", OUT)
