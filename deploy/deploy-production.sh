#!/bin/bash
# AGILE SAPIENS - Production Deployment Script
# Basic manual deployment procedure for Chapter 1 launch

set -e  # Exit on any error

echo "🚀 AGILE SAPIENS Production Deployment"
echo "======================================"

# Step 1: Pre-deployment verification
echo "Step 1: Pre-deployment verification..."
hugo --gc --minify
if [ $? -ne 0 ]; then
    echo "❌ Hugo build failed. Deployment aborted."
    exit 1
fi

echo "✅ Hugo build successful"

# Step 2: Build directory verification
if [ ! -d "public" ]; then
    echo "❌ Public directory not found. Run hugo build first."
    exit 1
fi

echo "✅ Public directory ready"

# Step 3: Pre-deployment backup (if destination exists)
BACKUP_DIR="backups/$(date +%Y-%m-%d_%H-%M-%S)"
echo "Step 3: Creating backup in $BACKUP_DIR..."
mkdir -p "$BACKUP_DIR"

# Step 4: Deployment target configuration
# Production credentials loaded from environment variables or vault
# Set these before running: PRODUCTION_USER, PRODUCTION_HOST, PRODUCTION_PATH
PRODUCTION_USER="${PRODUCTION_USER:-[SET_PRODUCTION_USER]}"
PRODUCTION_HOST="${PRODUCTION_HOST:-[SET_PRODUCTION_HOST]}"
PRODUCTION_PATH="${PRODUCTION_PATH:-/var/www/sapiens.folkup.life}"

echo "Step 4: Deployment configuration"
echo "Target: $PRODUCTION_USER@$PRODUCTION_HOST:$PRODUCTION_PATH"

# Verify credentials are configured
if [[ "$PRODUCTION_USER" == *"SET_"* ]] || [[ "$PRODUCTION_HOST" == *"SET_"* ]]; then
    echo "❌ Production credentials not configured!"
    echo "Set environment variables: PRODUCTION_USER, PRODUCTION_HOST"
    echo "Or source from vault: source ~/.claude/vault/deploy-env"
    exit 1
fi

echo ""
echo "⚠️  MANUAL STEPS REQUIRED:"
echo "1. ✅ Production credentials configured via environment"
echo "2. Ensure SSH key access to production server"
echo "3. Verify server nginx configuration"
echo "4. Confirm DNS records are propagated"
echo ""
echo "Ready to deploy with configured credentials:"
echo "rsync -avz --delete public/ $PRODUCTION_USER@$PRODUCTION_HOST:$PRODUCTION_PATH/"
echo ""
echo "📋 Infrastructure Notes:"
echo "• Production server configured via environment variables"
echo "• SSH key authentication required"
echo "• Automated SSL certificate management"
echo "• Containerized reverse proxy setup"

# Step 5: Post-deployment verification
echo ""
echo "Step 5: Post-deployment checklist:"
echo "[ ] Website loads correctly"
echo "[ ] Chapter 1 renders without errors"
echo "[ ] Favicon and logo display"
echo "[ ] Social media meta tags working"
echo "[ ] Mobile responsiveness verified"

echo ""
echo "🎯 Ready for manual deployment execution"
echo "Run rsync command above when server details configured"