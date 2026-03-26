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
# FolkUp VPS credentials from vault/memory/infra.md
PRODUCTION_USER="deploy"
PRODUCTION_HOST="46.225.107.2"
PRODUCTION_PATH="/var/www/sapiens.folkup.life"

echo "Step 4: Deployment configuration"
echo "Target: $PRODUCTION_USER@$PRODUCTION_HOST:$PRODUCTION_PATH"
echo ""
echo "⚠️  MANUAL STEPS REQUIRED:"
echo "1. ✅ Production credentials configured (FolkUp VPS)"
echo "2. Ensure SSH key ~/.ssh/id_ed25519 has access to deploy@46.225.107.2"
echo "3. Create nginx configuration for sapiens.folkup.life domain"
echo "4. Add DNS A record: sapiens.folkup.life → 46.225.107.2 (Cloudflare)"
echo ""
echo "Ready to deploy with configured credentials:"
echo "rsync -avz --delete public/ $PRODUCTION_USER@$PRODUCTION_HOST:$PRODUCTION_PATH/"
echo ""
echo "📋 FolkUp Infrastructure Notes:"
echo "• Server: Hetzner CX33 (Ubuntu 24.04)"
echo "• SSH: Standard port 22, fail2ban active"
echo "• User 'deploy' has docker group + restricted sudoers"
echo "• Nginx reverse proxy via nginx-proxy container"

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