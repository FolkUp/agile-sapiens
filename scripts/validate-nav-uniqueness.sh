#!/bin/bash
# scripts/validate-nav-uniqueness.sh
#
# CI-охрана assert #3 per Iskra S266 RATIFIKACIYA v1.0.24:
# assert built EPUB has exactly 1 nav.xhtml file + exactly 1 <nav> tag inside it
# (defend против Д-2 regression where EPUB nav was rendered twice в reading flow).
#
# Д-2 fix landed v1.0.24: scripts/epub-generator.sh spine
#   <itemref idref="nav" linear="no"/>
# per Iskra GLAZA-VERDIKTY variant (а).
#
# Method: unzip EPUB, count nav.xhtml files (paths), count <nav ...> tags inside.
#
# Exit 0 = PASS, Exit 1 = FAIL с diagnostic output.
#
# Owner: Alice PM cont+7 S6SCOOP (implement deferred из cont+6 v1.0.24 rebuild pipeline)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Derive version from package.json
BOOK_VERSION="v$(sed -nE 's/.*"version":\s*"([^"]+)".*/\1/p' "$PROJECT_ROOT/package.json" | head -1)"
EPUB_PATH="$PROJECT_ROOT/formats/agile-sapiens-${BOOK_VERSION}.epub"

EXPECTED_NAV_FILES=1
EXPECTED_NAV_TAGS=1

echo "🔍 Validating EPUB nav uniqueness (Д-2 protection)..."
echo "  EPUB: $EPUB_PATH"

if [[ ! -f "$EPUB_PATH" ]]; then
    echo "❌ FAIL: $EPUB_PATH not found (build EPUB first via scripts/epub-generator.sh)"
    exit 1
fi

# Count nav.xhtml file entries (should be exactly 1)
NAV_FILES=$(unzip -l "$EPUB_PATH" 2>/dev/null | awk '{print $4}' | grep -c "nav\.xhtml$" || echo "0")

# Count <nav ...> tags inside the nav.xhtml file (should be exactly 1)
NAV_TAGS=0
if [[ $NAV_FILES -gt 0 ]]; then
    NAV_TAGS=$(unzip -p "$EPUB_PATH" OEBPS/nav.xhtml 2>/dev/null | grep -oE "<nav[[:space:]>]" | wc -l)
fi

# Check spine also for linear="no" attribute (belt-and-suspenders)
SPINE_LINEAR_NO=$(unzip -p "$EPUB_PATH" OEBPS/content.opf 2>/dev/null | grep -c 'idref="nav"[[:space:]]\+linear="no"' || echo "0")

echo "  nav.xhtml files:              $NAV_FILES (expected $EXPECTED_NAV_FILES)"
echo "  <nav> tags inside nav.xhtml:  $NAV_TAGS (expected $EXPECTED_NAV_TAGS)"
echo "  spine linear=\"no\" on nav:    $SPINE_LINEAR_NO (expected 1 for Д-2 fix)"

FAIL=0
if [[ $NAV_FILES -ne $EXPECTED_NAV_FILES ]]; then
    echo "❌ FAIL: nav.xhtml file count mismatch"
    FAIL=1
fi
if [[ $NAV_TAGS -ne $EXPECTED_NAV_TAGS ]]; then
    echo "❌ FAIL: <nav> tag count mismatch inside nav.xhtml"
    FAIL=1
fi
if [[ $SPINE_LINEAR_NO -ne 1 ]]; then
    echo "❌ FAIL: spine <itemref idref=\"nav\" linear=\"no\"/> not present — Д-2 fix regressed"
    FAIL=1
fi

if [[ $FAIL -eq 0 ]]; then
    echo "✅ PASS: EPUB nav uniqueness + Д-2 spine linear=no both intact"
    exit 0
else
    echo ""
    echo "Recovery: scripts/epub-generator.sh L414 должна содержать"
    echo "  <itemref idref=\"nav\" linear=\"no\"/>"
    echo "Rollback: git revert последний epub-generator.sh touching commit"
    exit 1
fi
