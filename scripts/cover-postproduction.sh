#!/bin/bash
# AGIL-083 Cycle 1 post-production
# Takes refined C1 seed (title-only engraving) → overlays precise typography → outputs deliverables
#
# Usage: bash scripts/cover-postproduction.sh <seed_number>
#   seed_number ∈ {1, 2, 3} — which c1r-vN.webp to finalize
#
# Outputs:
#   C:/Transit/agil-083-final/cover.webp        (web, 1200×1800, q90)
#   C:/Transit/agil-083-final/cover-og.jpg      (OG image, 1200×630 center crop)
#   C:/Transit/agil-083-final/cover-master.png  (print master, 3000×4500)
#   C:/Transit/agil-083-final/cover-preview.png (quick screen preview, 800×1200)

set -euo pipefail

SEED="${1:-2}"
if [[ ! "$SEED" =~ ^[1-3]$ ]]; then
  echo "Usage: $0 <1|2|3>"
  exit 1
fi

SRC="C:/Transit/agil-083-cycle1-refined/c1r-v${SEED}.webp"
OUT_DIR="C:/Transit/agil-083-final"

if [[ ! -f "$SRC" ]]; then
  echo "Source not found: $SRC"
  exit 1
fi

mkdir -p "$OUT_DIR"

# Paths are relative to repo root (run script via `bash scripts/cover-postproduction.sh`).
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FONT_DIR="${REPO_ROOT}/public/fonts"
FONT_PLAYFAIR_ITALIC="${FONT_DIR}/playfair-display/playfair-display-italic.ttf"
FONT_PLAYFAIR_REG="${FONT_DIR}/playfair-display/playfair-display-regular.ttf"
FONT_SOURCE_REG="${FONT_DIR}/source-sans-3/source-sans-3-regular.ttf"

# Palette D
BORDO="#7D4450"
CHOCOLATE="#2A2317"
CAPPUCCINO="#8B7866"
IVORY="#FEFCF6"

echo "[1/5] Upscale source to master 3000×4500..."
# Source is 1024x1536 → upscale to 3000x4500 via Lanczos (quality filter)
magick "$SRC" \
  -filter Lanczos \
  -resize 3000x4500 \
  -colorspace sRGB \
  -depth 8 \
  "$OUT_DIR/_master-raw.png"

echo "[2/5] Overlay typography (subtitle, author, publisher)..."
# Master is 3000×4500. c1r-v3 title occupies ~880-1320 (upper third).
# Layout guide (from top, px):
#   880-1320   : title "AGILE SAPIENS." (from Flux, engraved)
#   1650-2050  : subtitle (2 lines, Playfair Italic, chocolate) — tight gap under title
#   2350-2510  : author line (Playfair Regular, cappuccino)
#   4100-4200  : publisher line (Source Sans, small caps)

# Safe zones (avoid Flux border collision):
#   Border inner edge: ~y=280 top, ~y=4270 bottom, ~x=230 left, ~x=2770 right
#   Safe content zone: y∈[400..4000], x∈[400..2600] → width 2200
# Label widths reduced 2400→2200 for 400px margin to vertical borders.
# Publisher raised 4080→3770 for 180px clear gap above bottom border.

magick "$OUT_DIR/_master-raw.png" \
  \( -size 2200x400 \
     -background none \
     -fill "$CHOCOLATE" \
     -font "$FONT_PLAYFAIR_ITALIC" \
     -pointsize 88 \
     -gravity center \
     -kerning 3 \
     label:"Будущее работы\nв эпоху искусственного интеллекта" \
  \) -gravity north -geometry +0+1650 -composite \
  \( -size 2200x160 \
     -background none \
     -fill "$CHOCOLATE" \
     -font "$FONT_PLAYFAIR_REG" \
     -pointsize 76 \
     -gravity center \
     -kerning 4 \
     label:"Команданте FolkUp" \
  \) -gravity north -geometry +0+2350 -composite \
  \( -size 2200x100 \
     -background none \
     -fill "$CHOCOLATE" \
     -font "$FONT_SOURCE_REG" \
     -pointsize 50 \
     -gravity center \
     -kerning 12 \
     label:"FOLKUP  ECOSYSTEM  ·  MMXXVI" \
  \) -gravity north -geometry +0+3770 -composite \
  -strip \
  "$OUT_DIR/cover-master.png"

echo "[3/5] Web cover (1200×1800 WebP q90)..."
magick "$OUT_DIR/cover-master.png" \
  -filter Lanczos \
  -resize 1200x1800 \
  -strip \
  -quality 90 \
  "$OUT_DIR/cover.webp"

echo "[4/5] OG image (1200×630, crop from master to include title + subtitle)..."
# Master is 3000×4500. Title at y=880-1320, subtitle y=1650-2050, author y=2350-2510.
# To include title + subtitle in 1.905:1 aspect: crop 3000×1575 from y=700.
magick "$OUT_DIR/cover-master.png" \
  -crop 3000x1575+0+700 \
  +repage \
  -filter Lanczos \
  -resize 1200x630 \
  -strip \
  -quality 88 \
  -colorspace sRGB \
  "$OUT_DIR/cover-og.jpg"

echo "[5/5] Preview (800×1200 PNG for quick view)..."
magick "$OUT_DIR/cover-master.png" \
  -filter Lanczos \
  -resize 800x1200 \
  -strip \
  "$OUT_DIR/cover-preview.png"

# Cleanup intermediate
rm -f "$OUT_DIR/_master-raw.png"

echo ""
echo "=== AGIL-083 Cycle 1 Finalization Complete ==="
echo "Source seed: c1r-v${SEED}"
echo "Deliverables in: $OUT_DIR"
ls -lh "$OUT_DIR"/cover* 2>&1
