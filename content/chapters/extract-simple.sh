#!/bin/bash

# AGILE SAPIENS Phase A Step 3: Content Extraction Script (Simplified)
# Purpose: Extract pure content (no YAML frontmatter) for baseline measurements
# Banking-Level Standard: 100% content preservation, zero data loss

echo "AGILE SAPIENS Content Extraction - $(date)"
echo "========================================="
echo ""

# Create extracted directory
rm -rf extracted
mkdir -p extracted

# Process each file
files=(
    "chapter-0-pilot.md"
    "chapter-1-jules-verne.md"
    "chapter-2-frankenstein.md"
    "chapter-3-holmes.md"
    "chapter-4-borges.md"
    "chapter-5-nemo.md"
    "chapter-6-jekyll-hyde.md"
    "chapter-7-don-quixote.md"
    "chapter-8-time-machine.md"
    "chapter-9-three-scenarios.md"
    "chapter-10-choice-engine.md"
    "intermezzo-1-cleaned.md"
    "intermezzo-2.md"
    "intermezzo-3.md"
)

echo "Processing ${#files[@]} files..."
echo ""

total_original=0
total_extracted=0
success_count=0

for file in "${files[@]}"; do
    if [[ -f "$file" ]]; then
        echo "Processing: $file"

        # Count original words
        orig=$(wc -w < "$file")

        # Extract content after frontmatter
        awk '/^---$/{flag=!flag;next}flag' "$file" > "extracted/$file"

        # Count extracted words
        extr=$(wc -w < "extracted/$file")

        front=$((orig - extr))

        echo "  Original: $orig | Extracted: $extr | Frontmatter: $front"

        total_original=$((total_original + orig))
        total_extracted=$((total_extracted + extr))
        success_count=$((success_count + 1))
    else
        echo "WARNING: File not found: $file"
    fi
done

echo ""
echo "Summary:"
echo "======="
echo "Files processed: $success_count"
echo "Total original words: $total_original"
echo "Total extracted words: $total_extracted"
echo "Frontmatter words removed: $((total_original - total_extracted))"

if [[ $success_count -eq ${#files[@]} ]]; then
    echo ""
    echo "✅ SUCCESS: All extractions completed"
    echo "Content-only files saved to extracted/ directory"
else
    echo ""
    echo "⚠️ WARNING: Some files missing"
fi