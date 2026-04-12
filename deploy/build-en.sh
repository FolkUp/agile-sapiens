#!/bin/bash
# AGILE SAPIENS English Domain Build Script
# Domain: en.agile.folkup.work
# ADR-07: Separate Domains Architecture - Phase 1

set -euo pipefail

# Configuration
DOMAIN="en.agile.folkup.work"
CONFIG_FILE="hugo.en.toml"
OUTPUT_DIR="public-en"
BUILD_LOG="deploy/build-en.log"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}[AGILE SAPIENS] Building English domain: ${DOMAIN}${NC}"
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

# Check content directory
if [ ! -d "content/chapters" ]; then
    echo -e "${RED}[ERROR] Content directory not found: content/chapters${NC}"
    exit 1
fi

echo -e "${GREEN}[VALIDATION] Pre-build checks passed${NC}"

# Clean previous build
if [ -d "$OUTPUT_DIR" ]; then
    echo -e "${YELLOW}[CLEANUP] Removing previous build: $OUTPUT_DIR${NC}"
    rm -rf "$OUTPUT_DIR"
fi

# Build with English configuration
echo -e "${YELLOW}[BUILD] Running Hugo with English configuration...${NC}"
START_TIME=$(date +%s)

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
ESSENTIAL_FILES=(
    "index.html"
    "chapters/index.html"
    "sitemap.xml"
)

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

echo -e "${GREEN}[SUCCESS] English domain build completed${NC}"
echo "Build duration: ${BUILD_DURATION}s"
echo "Output directory: $OUTPUT_DIR"
echo "Total files: $TOTAL_FILES"
echo "Total size: $TOTAL_SIZE"
echo "Domain: $DOMAIN"
echo "End time: $(date)"

# Generate deployment summary
cat > "deploy/build-en-summary.txt" <<EOF
AGILE SAPIENS English Build Summary
===================================
Build Date: $(date)
Domain: $DOMAIN
Configuration: $CONFIG_FILE
Output Directory: $OUTPUT_DIR
Build Duration: ${BUILD_DURATION}s
Total Files: $TOTAL_FILES
Total Size: $TOTAL_SIZE
Build Status: SUCCESS
EOF

echo -e "${GREEN}[INFO] Build summary saved to: deploy/build-en-summary.txt${NC}"
echo -e "${GREEN}[READY] English domain ready for deployment to: $DOMAIN${NC}"