"""
Uniformly subsample image frames from a folder.

Usage:
    python reduce_frames.py <input_dir> [target_count]

Default target_count = 50.
Output goes to "<input_dir>_<target>f" next to the input folder.
Original filenames are preserved.
"""
from __future__ import annotations

import shutil
import sys
from pathlib import Path

IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp"}


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 1

    input_dir = Path(sys.argv[1]).resolve()
    target = int(sys.argv[2]) if len(sys.argv) >= 3 else 50

    if not input_dir.is_dir():
        print(f"입력 폴더 없음: {input_dir}")
        return 1

    files = sorted(p for p in input_dir.iterdir() if p.suffix.lower() in IMAGE_EXTS)
    n = len(files)
    if n == 0:
        print("이미지 파일이 없습니다")
        return 1

    if target >= n:
        print(f"이미 {n}장이라 추릴 필요 없음 (target={target})")
        return 0

    output_dir = input_dir.with_name(f"{input_dir.name}_{target}f")
    output_dir.mkdir(parents=True, exist_ok=True)

    # Evenly spaced indices in [0, n) — first and last frames are always included.
    picks = sorted({round(i * (n - 1) / (target - 1)) for i in range(target)})

    for idx in picks:
        src = files[idx]
        dst = output_dir / src.name
        shutil.copy2(src, dst)

    print(f"입력 {n}장 → 추출 {len(picks)}장")
    print(f"출력 폴더: {output_dir}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
