#!/bin/bash
# REVP-002 Pandoc Pipeline for Hugo→PDF→ePub conversion
# Timestamp: $(date -u +"%Y-%m-%d %H:%M:%S UTC")

echo "REVP-002 Pandoc Pipeline Starting..."

# Configuration
INPUT_HTML="public-chapter1-poc/chapters/chapter-1-jules-verne/index.html"
OUTPUT_DIR="revp-002-outputs"
CHAPTER_NAME="chapter-1-jules-verne"

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "Step 1: Extract clean HTML content for Pandoc"
# Create a cleaned version for Pandoc processing
pandoc \
    "$INPUT_HTML" \
    --from html \
    --to html \
    --standalone \
    --output "$OUTPUT_DIR/${CHAPTER_NAME}-clean.html" \
    --metadata title="Глава 1: Жюль Верн программирует"

echo "Step 2: Convert to PDF with academic formatting"
pandoc \
    "$INPUT_HTML" \
    --from html \
    --to pdf \
    --pdf-engine=wkhtmltopdf \
    --output "$OUTPUT_DIR/${CHAPTER_NAME}.pdf" \
    --metadata title="Глава 1: Жюль Верн программирует" \
    --metadata author="AGILE Sapiens" \
    --variable margin-top=2cm \
    --variable margin-bottom=2cm \
    --variable margin-left=2cm \
    --variable margin-right=2cm \
    --variable papersize=a4 \
    --variable fontsize=12pt

echo "Step 3: Convert to ePub format"
pandoc \
    "$INPUT_HTML" \
    --from html \
    --to epub \
    --output "$OUTPUT_DIR/${CHAPTER_NAME}.epub" \
    --metadata title="Глава 1: Жюль Верн программирует" \
    --metadata author="AGILE Sapiens" \
    --metadata lang=ru \
    --epub-metadata="$OUTPUT_DIR/metadata.xml"

echo "Step 4: Generate conversion report"
cat > "$OUTPUT_DIR/conversion-report.md" << EOF
# REVP-002 Pandoc Pipeline Report
**Date**: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
**Source**: Hugo-generated HTML
**Target Formats**: PDF, ePub, Clean HTML

## Input Analysis
- Source file: $INPUT_HTML
- File size: $(stat -c%s "$INPUT_HTML" 2>/dev/null || echo "N/A") bytes
- Chapter: Глава 1: Жюль Верн программирует

## Output Files Generated
EOF

# List output files with sizes
echo "## Output Files" >> "$OUTPUT_DIR/conversion-report.md"
for file in "$OUTPUT_DIR"/*; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        filesize=$(stat -c%s "$file" 2>/dev/null || echo "N/A")
        echo "- **$filename**: $filesize bytes" >> "$OUTPUT_DIR/conversion-report.md"
    fi
done

echo "Pipeline complete! Check $OUTPUT_DIR/ for results."
echo "Files generated:"
ls -la "$OUTPUT_DIR/"