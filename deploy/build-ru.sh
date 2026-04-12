#!/bin/bash
# AGILE SAPIENS Russian Domain Build Script
# Domain: ru.agile.folkup.work
# ADR-07: Separate Domains Architecture - Phase 2 (Future)

set -euo pipefail

# Configuration
DOMAIN="ru.agile.folkup.work"
CONFIG_FILE="hugo.ru.toml"
OUTPUT_DIR="public-ru"
BUILD_LOG="deploy/build-ru.log"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}[AGILE SAPIENS] Building Russian domain: ${DOMAIN}${NC}"
echo "Start time: $(date)"

# Pre-build validation
echo -e "${YELLOW}[VALIDATION] Pre-build checks...${NC}"

# Check Hugo configuration exists
if [ ! -f "$CONFIG_FILE" ]; then
    echo -e "${RED}[ERROR] Hugo configuration not found: $CONFIG_FILE${NC}"
    exit 1
fi

# Check Hugo binary
if ! command -v hugo &> /dev/null; then
    echo -e "${RED}[ERROR] Hugo not found in PATH${NC}"
    exit 1
fi

# Check for Russian content
RUSSIAN_CONTENT=false
if [ -d "content/chapters.ru" ] && [ "$(ls -A content/chapters.ru 2>/dev/null)" ]; then
    RUSSIAN_CONTENT=true
    echo -e "${GREEN}[INFO] Russian content directory found: content/chapters.ru${NC}"
else
    echo -e "${YELLOW}[INFO] Russian content not yet available - building coming soon page${NC}"
fi

echo -e "${GREEN}[VALIDATION] Pre-build checks passed${NC}"

# Clean previous build
if [ -d "$OUTPUT_DIR" ]; then
    echo -e "${YELLOW}[CLEANUP] Removing previous build: $OUTPUT_DIR${NC}"
    rm -rf "$OUTPUT_DIR"
fi

# Build strategy based on content availability
if [ "$RUSSIAN_CONTENT" = true ]; then
    echo -e "${YELLOW}[BUILD] Building full Russian site with translations...${NC}"
    BUILD_TYPE="full"
else
    echo -e "${YELLOW}[BUILD] Building coming soon page for Russian domain...${NC}"
    BUILD_TYPE="coming_soon"

    # Create minimal Russian content structure for coming soon
    mkdir -p "content-temp-ru"
    cat > "content-temp-ru/_index.md" <<EOF
---
title: "AGILE SAPIENS"
description: "Научно-популярная монография о будущем работы в эпоху ИИ"
type: "page"
layout: "coming-soon"
---

# AGILE SAPIENS

Русская версия находится в разработке.

Скоро здесь появится полный перевод научно-популярной монографии о будущем работы в эпоху искусственного интеллекта.

[Читать английскую версию →](https://en.agile.folkup.work/)
EOF
fi

# Build with Russian configuration
START_TIME=$(date +%s)

if [ "$BUILD_TYPE" = "coming_soon" ]; then
    # Temporarily modify config to use temp content
    cp "$CONFIG_FILE" "${CONFIG_FILE}.backup"
    sed 's/contentDir = "content"/contentDir = "content-temp-ru"/' "$CONFIG_FILE" > "${CONFIG_FILE}.temp"
    CONFIG_FILE="${CONFIG_FILE}.temp"
fi

hugo --config="$CONFIG_FILE" \
     --destination="$OUTPUT_DIR" \
     --cleanDestinationDir \
     --gc \
     --minify \
     --logLevel info \
     2>&1 | tee "$BUILD_LOG"

BUILD_EXIT_CODE=${PIPESTATUS[0]}
END_TIME=$(date +%s)
BUILD_DURATION=$((END_TIME - START_TIME))

# Cleanup temporary files
if [ "$BUILD_TYPE" = "coming_soon" ]; then
    rm -rf "content-temp-ru"
    mv "${CONFIG_FILE%.temp}.backup" "${CONFIG_FILE%.temp}"
    rm -f "$CONFIG_FILE"
    CONFIG_FILE="${CONFIG_FILE%.temp}"
fi

# Validate build success
if [ $BUILD_EXIT_CODE -ne 0 ]; then
    echo -e "${RED}[ERROR] Hugo build failed with exit code $BUILD_EXIT_CODE${NC}"
    echo -e "${RED}[ERROR] Check build log: $BUILD_LOG${NC}"
    exit $BUILD_EXIT_CODE
fi

# Post-build validation
echo -e "${YELLOW}[VALIDATION] Post-build checks...${NC}"

# Check output directory created
if [ ! -d "$OUTPUT_DIR" ]; then
    echo -e "${RED}[ERROR] Output directory not created: $OUTPUT_DIR${NC}"
    exit 1
fi

# Check essential files exist
ESSENTIAL_FILES=("index.html" "sitemap.xml")
if [ "$BUILD_TYPE" = "full" ]; then
    ESSENTIAL_FILES+=("chapters/index.html")
fi

for file in "${ESSENTIAL_FILES[@]}"; do
    if [ ! -f "$OUTPUT_DIR/$file" ]; then
        echo -e "${RED}[ERROR] Essential file missing: $file${NC}"
        exit 1
    fi
done

# Check for Hugo build errors in log
if grep -q "ERROR\|WARN" "$BUILD_LOG"; then
    echo -e "${YELLOW}[WARNING] Build log contains warnings/errors:${NC}"
    grep "ERROR\|WARN" "$BUILD_LOG" | head -5
fi

# Build statistics
TOTAL_FILES=$(find "$OUTPUT_DIR" -type f | wc -l)
TOTAL_SIZE=$(du -sh "$OUTPUT_DIR" | cut -f1)

if [ "$BUILD_TYPE" = "coming_soon" ]; then
    echo -e "${BLUE}[SUCCESS] Russian coming soon page built${NC}"
else
    echo -e "${GREEN}[SUCCESS] Russian domain build completed${NC}"
fi

echo "Build duration: ${BUILD_DURATION}s"
echo "Output directory: $OUTPUT_DIR"
echo "Total files: $TOTAL_FILES"
echo "Total size: $TOTAL_SIZE"
echo "Domain: $DOMAIN"
echo "Build type: $BUILD_TYPE"
echo "End time: $(date)"

# Generate deployment summary
cat > "deploy/build-ru-summary.txt" <<EOF
AGILE SAPIENS Russian Build Summary
===================================
Build Date: $(date)
Domain: $DOMAIN
Configuration: $CONFIG_FILE
Output Directory: $OUTPUT_DIR
Build Duration: ${BUILD_DURATION}s
Total Files: $TOTAL_FILES
Total Size: $TOTAL_SIZE
Build Type: $BUILD_TYPE
Russian Content Available: $RUSSIAN_CONTENT
Build Status: SUCCESS
EOF

echo -e "${GREEN}[INFO] Build summary saved to: deploy/build-ru-summary.txt${NC}"

if [ "$BUILD_TYPE" = "coming_soon" ]; then
    echo -e "${BLUE}[READY] Russian coming soon page ready for deployment to: $DOMAIN${NC}"
    echo -e "${YELLOW}[NOTE] Full Russian content pending translation completion${NC}"
else
    echo -e "${GREEN}[READY] Russian domain ready for deployment to: $DOMAIN${NC}"
fi