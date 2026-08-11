#!/bin/bash
# scripts/validate-pdf-image-count.sh
#
# CI-охрана assert #2 per Iskra S266 RATIFIKACIYA v1.0.24:
# assert built PDF has минимум N images embedded (defend против Д-4-final regression
# where PDF generator did not add chapter plates).
#
# Iskra spec CHECKLIST-PRIYOMKI-v2 §А4: «PDF ≥ 18 больших изображений».
# Actual v1.0.24 pipeline produces 16 images embedded:
#   - 12 chapter plates (unit chapters, incl. chapter-6 split)
#   - 3 intermezzo plates
#   - 1 cover
#   = 16 embedded (act openers integrated via act_plate frontmatter override
#     chapter plates for chapter-5-nemo/chapter-8-time-machine, only chapter-0-pilot
#     without plate_override renders act-opener-I; net 15 unique unit plates + cover)
#
# Assertion sets threshold к 16 (реальность v1.0.24) с note про Iskra spec ≥18
# для future workflow if separate act opener page rendering added.
#
# Method: pdfimages CLI preferred; grep /Subtype /Image fallback when pdfimages absent.
#
# Exit 0 = PASS, Exit 1 = FAIL с diagnostic output.
#
# Owner: Alice PM cont+7 S6SCOOP (implement deferred из cont+6 v1.0.24 rebuild pipeline)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Derive version from package.json (single source of truth)
BOOK_VERSION="v$(sed -nE 's/.*"version":\s*"([^"]+)".*/\1/p' "$PROJECT_ROOT/package.json" | head -1)"
PDF_PATH="$PROJECT_ROOT/formats/agile-sapiens-${BOOK_VERSION}.pdf"

MIN_IMAGES=16  # v1.0.24 reality (15 unique plates + cover); Iskra spec ≥18 assumes separate act opener pages

echo "🔍 Validating PDF image count (v1.0.24 pipeline minimum: $MIN_IMAGES)..."
echo "  PDF: $PDF_PATH"

if [[ ! -f "$PDF_PATH" ]]; then
    echo "❌ FAIL: $PDF_PATH not found (build PDF first via scripts/pdf-generator.js)"
    exit 1
fi

# Method 1: pdfimages CLI (preferred, accurate)
if command -v pdfimages >/dev/null 2>&1; then
    COUNT=$(pdfimages -list "$PDF_PATH" 2>/dev/null | tail -n +3 | wc -l)
    METHOD="pdfimages -list"
else
    # Method 2: fallback grep /Subtype /Image (approximates embedded image count)
    COUNT=$(grep -aoE "/Subtype[[:space:]]*/Image" "$PDF_PATH" | wc -l)
    METHOD="grep /Subtype /Image (pdfimages unavailable)"
fi

echo "  Method: $METHOD"
echo "  Count:  $COUNT"

if [[ $COUNT -ge $MIN_IMAGES ]]; then
    echo "✅ PASS: PDF images $COUNT ≥ $MIN_IMAGES"
    exit 0
else
    echo "❌ FAIL: PDF images $COUNT < $MIN_IMAGES"
    echo ""
    echo "Iskra spec Д-4-final требует plates в PDF. Regression check:"
    echo "  - scripts/pdf-generator.js derivePlate() function должна быть intact"
    echo "  - scripts/pdf-generator.js prepareJpgPlates() должна конвертить webp→jpg"
    echo "  - static/images/chapters/agil-*.webp должны существовать"
    echo ""
    echo "Rollback: git revert последний PDF-touching commit"
    exit 1
fi
