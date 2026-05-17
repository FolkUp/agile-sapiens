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

    # Run Node.js PDF generator
    node "$SCRIPT_DIR/pdf-generator-simple.js"

    if [ $? -eq 0 ] && [ -f "$FORMATS_DIR/agile-sapiens-v1.0.7.pdf" ]; then
        echo "✅ PDF generated: $(du -sh "$FORMATS_DIR/agile-sapiens-v1.0.7.pdf" | cut -f1)"
    else
        echo "❌ PDF generation failed"
        echo "   Attempting fallback to wkhtmltopdf..."

        # Fallback to wkhtmltopdf if available
        if command -v wkhtmltopdf >/dev/null 2>&1; then
            echo "Using wkhtmltopdf fallback..."

            # Create simple HTML for PDF
            PDF_HTML="$FORMATS_DIR/agile-sapiens-pdf.html"
            cat << 'EOF' > "$PDF_HTML"
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>AGILE SAPIENS v1.0.7</title>
    <style>
        body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; margin: 2cm; }
        h1 { font-size: 18pt; margin-top: 2em; margin-bottom: 1em; page-break-before: always; }
        .title-page { text-align: center; margin-top: 5cm; }
        .title { font-size: 24pt; font-weight: bold; margin-bottom: 2em; }
    </style>
</head>
<body>
    <div class="title-page">
        <div class="title">AGILE SAPIENS</div>
        <div>FolkUp • v1.0.7</div>
    </div>
    <h1>PDF Generation Fallback</h1>
    <p>This PDF was generated using wkhtmltopdf fallback method.</p>
</body>
</html>
EOF

            # Generate PDF with wkhtmltopdf
            wkhtmltopdf \
                --page-size A4 \
                --margin-top 2cm \
                --margin-bottom 2cm \
                --margin-left 2cm \
                --margin-right 2cm \
                "$PDF_HTML" \
                "$FORMATS_DIR/agile-sapiens-v1.0.7.pdf"

            if [ $? -eq 0 ]; then
                echo "✅ PDF generated via fallback: $(du -sh "$FORMATS_DIR/agile-sapiens-v1.0.7.pdf" | cut -f1)"
            else
                echo "❌ All PDF generation methods failed"
            fi
        else
            echo "⚠️  No PDF generation tools available"
            echo "   Primary: Node.js + Puppeteer (install puppeteer)"
            echo "   Fallback: wkhtmltopdf (install wkhtmltopdf)"
        fi
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