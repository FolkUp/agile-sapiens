#!/bin/bash

# AGILE SAPIENS Multi-Format Publisher
# Enhanced Alice v2.0 L3 — Oracle-Protected Automation
# Banking-Level Standards: Web + ePub + PDF Pipeline

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
OUTPUT_DIR="$PROJECT_ROOT/public"
FORMATS_DIR="$PROJECT_ROOT/formats"

echo "🏛️  AGILE SAPIENS Multi-Format Publisher"
echo "========================================"
echo "Enhanced Alice v2.0 L3 Oracle-Protected Pipeline"
echo ""

# Create formats directory
mkdir -p "$FORMATS_DIR"

# Step 1: Hugo Web Build (Proven)
echo "📚 [STEP 1] Building Web Version..."
cd "$PROJECT_ROOT"
hugo --gc --minify

if [ $? -eq 0 ]; then
    echo "✅ Web build complete: $(du -sh public | cut -f1)"
else
    echo "❌ Hugo build failed"
    exit 1
fi

# Step 2: ePub Generation (Proper Multi-Chapter Structure)
echo ""
echo "📖 [STEP 2] Generating ePub..."

# Use dedicated proper ePub generator
"$SCRIPT_DIR/epub-generator.sh"

if [ $? -eq 0 ] && [ -f "$FORMATS_DIR/agile-sapiens-v1.0.7.epub" ]; then
    echo "✅ ePub generated with proper multi-chapter structure"
else
    echo "❌ ePub generation failed"
    exit 1
fi

# Step 3: PDF Generation (Node.js + Puppeteer path)
echo ""
echo "📄 [STEP 3] Generating PDF (Node.js + Puppeteer path)..."

# Check if Node.js is available
if command -v node >/dev/null 2>&1; then
    echo "Using Node.js + Puppeteer for PDF generation..."

    # Run Node.js PDF generator (full-book: reads content/chapters/, pandoc + Puppeteer)
    node "$SCRIPT_DIR/pdf-generator.js"

    if [ $? -eq 0 ] && [ -f "$FORMATS_DIR/agile-sapiens-v1.0.7.pdf" ]; then
        echo "✅ PDF generated: $(du -sh "$FORMATS_DIR/agile-sapiens-v1.0.7.pdf" | cut -f1)"
    else
        # No placeholder fallback: a fake PDF (pipeline-description page) is
        # worse than no PDF — it silently breaks academic submission. Fail loud.
        echo "❌ PDF generation failed (pdf-generator.js)"
        echo "   Refusing to emit a placeholder PDF. Investigate the generator;"
        echo "   ensure 'node', 'pandoc' and the puppeteer dependency are available."
        exit 1
    fi
else
    echo "⚠️  Node.js not available - cannot generate PDF"
    echo "   Install Node.js to enable PDF generation"
fi

# Summary
echo ""
echo "🎉 Multi-Format Publishing Complete!"
echo "===================================="
echo "📂 Output directory: $FORMATS_DIR"
echo ""
echo "Generated formats:"
ls -la "$FORMATS_DIR/" | grep -E '\.(epub|pdf)$' || echo "   No formats generated"
echo ""
echo "📊 Total size: $(du -sh "$FORMATS_DIR" | cut -f1)"
echo ""
echo "✅ Web version: $OUTPUT_DIR ($(du -sh "$OUTPUT_DIR" | cut -f1))"
echo "🌐 Production ready: https://sapiens.folkup.life"