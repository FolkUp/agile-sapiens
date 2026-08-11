#!/bin/bash
# scripts/validate-canonical-cover-hash.sh
#
# CI-охрана assert #1 per Iskra S266 RATIFIKACIYA v1.0.24:
# assert cover.webp matches Wave 2 canonical sha256 (не заглушка).
#
# Wave 2 canonical: extracted from Frida SVG canonical portal 2026-08-10 per Iskra REVERSE S265
# (Andrey physical vскрытия v1.0.22 4-9 Aug — cover potery week found).
#
# Exit 0 = PASS, Exit 1 = FAIL с diagnostic output.
#
# Owner: Alice PM cont+7 S6SCOOP (implement deferred из cont+6 v1.0.24 rebuild pipeline)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

COVER_PATH="$PROJECT_ROOT/static/images/cover.webp"
EXPECTED_HASH="59ab198452d18426a86e6eebc7d89fd55602f928c68bc241c43fe3a571d422e7"

echo "🔍 Validating cover.webp canonical hash (Wave 2 per Iskra REVERSE S265)..."

if [[ ! -f "$COVER_PATH" ]]; then
    echo "❌ FAIL: $COVER_PATH not found"
    exit 1
fi

ACTUAL_HASH=$(sha256sum "$COVER_PATH" | cut -c1-64)

if [[ "$ACTUAL_HASH" == "$EXPECTED_HASH" ]]; then
    echo "✅ PASS: cover.webp Wave 2 canonical hash match ($ACTUAL_HASH)"
    exit 0
else
    echo "❌ FAIL: cover hash mismatch"
    echo "  Expected: $EXPECTED_HASH (Wave 2 canonical)"
    echo "  Actual:   $ACTUAL_HASH"
    echo "  File:     $COVER_PATH"
    echo ""
    echo "Recovery: extract cover.webp из Frida SVG canonical portal OR"
    echo "  restore from git commit a8253fc (D-1/D-3 fix landed 2026-08-10)."
    exit 1
fi
