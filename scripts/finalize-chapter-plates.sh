#!/bin/bash
# AGIL-079 Cycle 0 finalization — apply Андрей picks, upscale 2×, EXIF strip, place in static/images/chapters/
#
# Usage: bash scripts/finalize-chapter-plates.sh
#   Picks are hardcoded below (from 2026-04-20 picker session).
#
# PATHS:
#   SRC — session-local work directory (default: C:\Transit\agil-079-cycle0-cleaned
#         on original workstation). Override via env: SRC=/path/to/cleaned
#   DST — resolved relative to repo root. Run from anywhere, paths resolve correctly.
#
# Output: agile-sapiens/static/images/chapters/*.webp

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="${SRC:-/c/Transit/agil-079-cycle0-cleaned}"
DST="${REPO_ROOT}/static/images/chapters"
mkdir -p "$DST"

# Picks from 2026-04-20 picker session (14 slots, zero rerolls)
declare -a PICKS=(
  "ch0-v2:agil-act-opener-I.webp"
  "ch5-v3:agil-act-opener-II.webp"
  "ch8-v3:agil-act-opener-III.webp"
  "ch1-v1:agil-chapter-1-plate.webp"
  "ch2-v1:agil-chapter-2-plate.webp"
  "ch3-v2:agil-chapter-3-plate.webp"
  "ch4-v3:agil-chapter-4-plate.webp"
  "ch6-v2:agil-chapter-6-plate.webp"
  "ch7-v2:agil-chapter-7-plate.webp"
  "ch9-v3:agil-chapter-9-plate.webp"
  "ch10-v3:agil-chapter-10-plate.webp"
  "int1-v1:agil-intermezzo-1-plate.webp"
  "int2-v1:agil-intermezzo-2-plate.webp"
  "int3-v3:agil-intermezzo-3-plate.webp"
)

echo "Finalizing 14 chapter plates..."
OK=0
for entry in "${PICKS[@]}"; do
  key="${entry%%:*}"
  target="${entry##*:}"
  src="$SRC/${key}.webp"
  dst="$DST/${target}"
  if [[ ! -f "$src" ]]; then
    echo "  SKIP missing source: $src"
    continue
  fi
  magick "$src" \
    -filter Lanczos \
    -resize 200% \
    -strip \
    -quality 90 \
    "$dst"
  SIZE=$(stat -c '%s' "$dst" 2>/dev/null || wc -c < "$dst")
  KB=$(( SIZE / 1024 ))
  echo "  OK: $key → $target (${KB}KB)"
  OK=$((OK + 1))
done

echo ""
echo "=== AGIL-079 finalization complete ==="
echo "Placed: $OK / 14 in $DST"
ls -la "$DST" 2>&1
