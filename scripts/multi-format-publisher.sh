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

# Step 3: PDF Generation (Simple HTML→PDF path, no LaTeX)
echo ""
echo "📄 [STEP 3] Generating PDF (HTML→PDF path)..."

# Check if wkhtmltopdf is available (Oracle-approved simple path)
if command -v wkhtmltopdf >/dev/null 2>&1; then
    echo "Using wkhtmltopdf for PDF generation..."

    # Create consolidated HTML for PDF
    PDF_HTML="$FORMATS_DIR/agile-sapiens-pdf.html"
    cat << 'EOF' > "$PDF_HTML"
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>AGILE SAPIENS</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            font-size: 12pt;
            line-height: 1.6;
            margin: 2cm;
        }
        h1 {
            font-size: 18pt;
            margin-top: 2em;
            margin-bottom: 1em;
            page-break-before: always;
        }
        h2 {
            font-size: 14pt;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
        }
        p {
            text-align: justify;
            margin-bottom: 1em;
        }
        .title-page {
            text-align: center;
            margin-top: 5cm;
        }
        .title {
            font-size: 24pt;
            font-weight: bold;
            margin-bottom: 2em;
        }
        .author {
            font-size: 16pt;
            margin-bottom: 1em;
        }
        .version {
            font-size: 12pt;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="title-page">
        <div class="title">AGILE SAPIENS</div>
        <div class="author">FolkUp</div>
        <div class="version">v1.0.7</div>
    </div>
EOF

    # Add chapter content in numerical order
    for chapter in $(find content/chapters -name "chapter-*.md" | sort -V); do
        if [ -f "$chapter" ]; then
            echo "Adding $(basename "$chapter") to PDF..."
            # Convert markdown to HTML and append
            echo "<div>" >> "$PDF_HTML"
            pandoc "$chapter" \
                --from markdown \
                --to html >> "$PDF_HTML"
            echo "</div>" >> "$PDF_HTML"
        fi
    done

    echo "</body></html>" >> "$PDF_HTML"

    # Generate PDF
    wkhtmltopdf \
        --page-size A4 \
        --margin-top 2cm \
        --margin-bottom 2cm \
        --margin-left 2cm \
        --margin-right 2cm \
        --enable-local-file-access \
        "$PDF_HTML" \
        "$FORMATS_DIR/agile-sapiens-v1.0.7.pdf"

    if [ $? -eq 0 ]; then
        echo "✅ PDF generated: $(du -sh "$FORMATS_DIR/agile-sapiens-v1.0.7.pdf" | cut -f1)"
    else
        echo "❌ PDF generation failed"
    fi
else
    echo "⚠️  wkhtmltopdf not available - skipping PDF generation"
    echo "   Install: sudo apt-get install wkhtmltopdf"
    echo "   Alternative: Use Pandoc with LaTeX (more complex setup)"
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