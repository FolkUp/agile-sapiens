#!/bin/bash
# AGILE SAPIENS Rollback Script
# Reverts separate domains back to unified sapiens.folkup.life
# ADR-07: Separate Domains Architecture - Emergency Rollback Protocol

set -euo pipefail

# Configuration
ORIGINAL_DOMAIN="sapiens.folkup.life"
ORIGINAL_CONFIG="hugo.toml"
ORIGINAL_OUTPUT="public"
BACKUP_DIR="deploy/backup-$(date +%Y%m%d-%H%M%S)"
ROLLBACK_LOG="deploy/rollback-$(date +%Y%m%d-%H%M%S).log"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${RED}[ROLLBACK] AGILE SAPIENS Emergency Rollback Initiated${NC}" | tee "$ROLLBACK_LOG"
echo "Rollback time: $(date)" | tee -a "$ROLLBACK_LOG"
echo "Target: $ORIGINAL_DOMAIN" | tee -a "$ROLLBACK_LOG"
echo "" | tee -a "$ROLLBACK_LOG"

# Confirmation prompt
echo -e "${YELLOW}[WARNING] This will revert to unified sapiens.folkup.life configuration${NC}"
echo -e "${YELLOW}[WARNING] Separate domain deployment will be disabled${NC}"
echo ""
read -p "Continue with rollback? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo -e "${BLUE}[CANCELLED] Rollback cancelled by user${NC}"
    exit 0
fi

echo -e "${YELLOW}[ROLLBACK] Starting emergency rollback procedure...${NC}" | tee -a "$ROLLBACK_LOG"

# Create backup of current state
echo -e "${YELLOW}[BACKUP] Creating backup of current deployment...${NC}" | tee -a "$ROLLBACK_LOG"
mkdir -p "$BACKUP_DIR"

# Backup current builds
if [ -d "public-en" ]; then
    cp -r "public-en" "$BACKUP_DIR/"
    echo "Backed up: public-en" | tee -a "$ROLLBACK_LOG"
fi

if [ -d "public-ru" ]; then
    cp -r "public-ru" "$BACKUP_DIR/"
    echo "Backed up: public-ru" | tee -a "$ROLLBACK_LOG"
fi

# Backup configs
if [ -f "hugo.en.toml" ]; then
    cp "hugo.en.toml" "$BACKUP_DIR/"
    echo "Backed up: hugo.en.toml" | tee -a "$ROLLBACK_LOG"
fi

if [ -f "hugo.ru.toml" ]; then
    cp "hugo.ru.toml" "$BACKUP_DIR/"
    echo "Backed up: hugo.ru.toml" | tee -a "$ROLLBACK_LOG"
fi

# Backup deployment files
if [ -d "deploy" ]; then
    cp -r "deploy" "$BACKUP_DIR/" 2>/dev/null || true
    echo "Backed up: deploy/" | tee -a "$ROLLBACK_LOG"
fi

echo -e "${GREEN}[BACKUP] Backup completed: $BACKUP_DIR${NC}" | tee -a "$ROLLBACK_LOG"

# Clean separate domain builds
echo -e "${YELLOW}[CLEANUP] Removing separate domain builds...${NC}" | tee -a "$ROLLBACK_LOG"

if [ -d "public-en" ]; then
    rm -rf "public-en"
    echo "Removed: public-en" | tee -a "$ROLLBACK_LOG"
fi

if [ -d "public-ru" ]; then
    rm -rf "public-ru"
    echo "Removed: public-ru" | tee -a "$ROLLBACK_LOG"
fi

# Clean old unified build
if [ -d "$ORIGINAL_OUTPUT" ]; then
    rm -rf "$ORIGINAL_OUTPUT"
    echo "Cleaned: $ORIGINAL_OUTPUT" | tee -a "$ROLLBACK_LOG"
fi

# Rebuild with original unified configuration
echo -e "${YELLOW}[REBUILD] Building unified site with original configuration...${NC}" | tee -a "$ROLLBACK_LOG"

if [ ! -f "$ORIGINAL_CONFIG" ]; then
    echo -e "${RED}[ERROR] Original configuration not found: $ORIGINAL_CONFIG${NC}" | tee -a "$ROLLBACK_LOG"
    exit 1
fi

START_TIME=$(date +%s)

hugo --config="$ORIGINAL_CONFIG" \
     --destination="$ORIGINAL_OUTPUT" \
     --cleanDestinationDir \
     --gc \
     --minify \
     --logLevel info \
     2>&1 | tee -a "$ROLLBACK_LOG"

BUILD_EXIT_CODE=${PIPESTATUS[0]}
END_TIME=$(date +%s)
BUILD_DURATION=$((END_TIME - START_TIME))

if [ $BUILD_EXIT_CODE -ne 0 ]; then
    echo -e "${RED}[ERROR] Rollback build failed with exit code $BUILD_EXIT_CODE${NC}" | tee -a "$ROLLBACK_LOG"
    echo -e "${RED}[ERROR] Restoring from backup...${NC}" | tee -a "$ROLLBACK_LOG"

    # Restore backup if build failed
    if [ -d "$BACKUP_DIR/public-en" ]; then
        cp -r "$BACKUP_DIR/public-en" ./
    fi
    if [ -d "$BACKUP_DIR/public-ru" ]; then
        cp -r "$BACKUP_DIR/public-ru" ./
    fi

    exit $BUILD_EXIT_CODE
fi

# Validate rollback
echo -e "${YELLOW}[VALIDATION] Validating rollback...${NC}" | tee -a "$ROLLBACK_LOG"

# Check essential files exist
ESSENTIAL_FILES=(
    "$ORIGINAL_OUTPUT/index.html"
    "$ORIGINAL_OUTPUT/chapters/index.html"
    "$ORIGINAL_OUTPUT/sitemap.xml"
)

for file in "${ESSENTIAL_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo -e "${RED}[ERROR] Essential file missing after rollback: $file${NC}" | tee -a "$ROLLBACK_LOG"
        exit 1
    fi
done

# Check build log for errors
if grep -q "ERROR" "$ROLLBACK_LOG"; then
    echo -e "${YELLOW}[WARNING] Rollback completed with warnings${NC}" | tee -a "$ROLLBACK_LOG"
fi

# Generate rollback summary
TOTAL_FILES=$(find "$ORIGINAL_OUTPUT" -type f | wc -l)
TOTAL_SIZE=$(du -sh "$ORIGINAL_OUTPUT" | cut -f1)

cat > "deploy/rollback-summary.txt" <<EOF
AGILE SAPIENS Rollback Summary
==============================
Rollback Date: $(date)
Original Domain: $ORIGINAL_DOMAIN
Original Configuration: $ORIGINAL_CONFIG
Original Output: $ORIGINAL_OUTPUT
Build Duration: ${BUILD_DURATION}s
Total Files: $TOTAL_FILES
Total Size: $TOTAL_SIZE
Backup Location: $BACKUP_DIR
Rollback Status: SUCCESS
EOF

echo -e "${GREEN}[SUCCESS] Rollback completed successfully${NC}" | tee -a "$ROLLBACK_LOG"
echo "Build duration: ${BUILD_DURATION}s" | tee -a "$ROLLBACK_LOG"
echo "Output directory: $ORIGINAL_OUTPUT" | tee -a "$ROLLBACK_LOG"
echo "Total files: $TOTAL_FILES" | tee -a "$ROLLBACK_LOG"
echo "Total size: $TOTAL_SIZE" | tee -a "$ROLLBACK_LOG"
echo "Backup saved: $BACKUP_DIR" | tee -a "$ROLLBACK_LOG"
echo "" | tee -a "$ROLLBACK_LOG"

echo -e "${GREEN}[READY] Site restored to unified configuration: $ORIGINAL_DOMAIN${NC}" | tee -a "$ROLLBACK_LOG"
echo -e "${BLUE}[NOTE] Backup of separate domains saved: $BACKUP_DIR${NC}" | tee -a "$ROLLBACK_LOG"
echo -e "${BLUE}[NOTE] Rollback summary saved: deploy/rollback-summary.txt${NC}" | tee -a "$ROLLBACK_LOG"

# Instructions for next steps
echo "" | tee -a "$ROLLBACK_LOG"
echo -e "${YELLOW}[NEXT STEPS] Manual actions required:${NC}" | tee -a "$ROLLBACK_LOG"
echo "1. Update DNS records to point back to $ORIGINAL_DOMAIN" | tee -a "$ROLLBACK_LOG"
echo "2. Verify SSL certificate for $ORIGINAL_DOMAIN" | tee -a "$ROLLBACK_LOG"
echo "3. Update nginx configuration to serve $ORIGINAL_OUTPUT" | tee -a "$ROLLBACK_LOG"
echo "4. Test site accessibility at https://$ORIGINAL_DOMAIN" | tee -a "$ROLLBACK_LOG"
echo "5. Monitor for 24h to ensure stability" | tee -a "$ROLLBACK_LOG"
echo "" | tee -a "$ROLLBACK_LOG"

echo -e "${GREEN}[COMPLETED] Emergency rollback procedure finished${NC}"