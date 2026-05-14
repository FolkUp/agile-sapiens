#!/bin/bash
# AGIL-007: Local Deployment Setup Validation — Banking-Level Standards
# Validates local environment for VPS deployment capability

set -euo pipefail

log() { echo "$(date '+%Y-%m-%d %H:%M:%S') [VALIDATE] $1"; }
error() { echo "$(date '+%Y-%m-%d %H:%M:%S') [ERROR] $1" >&2; }
success() { echo "$(date '+%Y-%m-%d %H:%M:%S') [SUCCESS] $1"; }

echo "=== AGILE SAPIENS Local Deployment Validation ==="
echo "Banking-Level Infrastructure Gap Resolution"
echo ""

VALIDATION_ERRORS=0

# Function to track validation failures
validation_error() {
    error "$1"
    VALIDATION_ERRORS=$((VALIDATION_ERRORS + 1))
}

# Check environment variables
log "🔍 Validating environment variables..."
if [[ -z "${VPS_HOST:-}" ]]; then
    validation_error "VPS_HOST environment variable not set"
    echo "   Fix: export VPS_HOST='your-vps-hostname.com'"
else
    log "VPS_HOST configured: $VPS_HOST"
fi

if [[ -z "${VPS_USER:-}" ]]; then
    validation_error "VPS_USER environment variable not set"
    echo "   Fix: export VPS_USER='deploy'"
else
    log "VPS_USER configured: $VPS_USER"
fi

if [[ -z "${VPS_PATH:-}" ]]; then
    log "VPS_PATH not set, using default: /home/deploy/sites/agile-sapiens"
    export VPS_PATH="/home/deploy/sites/agile-sapiens"
else
    log "VPS_PATH configured: $VPS_PATH"
fi

# Check deployment key
log "🔍 Validating deployment key..."
if [[ ! -f "./deployment_key" ]]; then
    validation_error "deployment_key file not found in current directory"
    echo "   Fix options:"
    echo "   1. Create symlink: ln -sf ~/.ssh/agile_sapiens_deploy ./deployment_key"
    echo "   2. Copy key: cp ~/.ssh/your_key ./deployment_key"
    echo "   3. Ensure SSH key exists and is accessible"
else
    log "deployment_key found"

    if [[ ! -r "./deployment_key" ]]; then
        validation_error "deployment_key not readable"
        echo "   Fix: chmod 600 ./deployment_key"
    else
        # Check key permissions
        KEY_PERMS=$(stat -c "%a" "./deployment_key" 2>/dev/null || stat -f "%OLp" "./deployment_key" 2>/dev/null || echo "unknown")
        if [[ "$KEY_PERMS" != "600" ]]; then
            log "⚠️  deployment_key permissions: $KEY_PERMS (should be 600)"
            chmod 600 ./deployment_key
            log "Fixed deployment_key permissions to 600"
        fi
        log "deployment_key permissions: OK"
    fi
fi

# Check required tools
log "🔍 Validating required tools..."

# Hugo check
if ! command -v hugo &> /dev/null; then
    validation_error "Hugo not installed or not in PATH"
    echo "   Fix: Install Hugo Extended v0.155.2"
else
    HUGO_VERSION=$(hugo version 2>/dev/null | head -1 || echo "unknown")
    log "Hugo installed: $HUGO_VERSION"

    if ! echo "$HUGO_VERSION" | grep -q "extended"; then
        validation_error "Hugo Extended required (current: $HUGO_VERSION)"
        echo "   Fix: Install Hugo Extended version"
    fi
fi

# SSH check
if ! command -v ssh &> /dev/null; then
    validation_error "SSH not installed or not in PATH"
    echo "   Fix: Install OpenSSH client"
else
    log "SSH available: $(ssh -V 2>&1 | head -1)"
fi

# rsync check
if ! command -v rsync &> /dev/null; then
    validation_error "rsync not installed or not in PATH"
    echo "   Fix: Install rsync"
else
    log "rsync available: $(rsync --version | head -1)"
fi

# Node.js check (for CDN purge)
if command -v node &> /dev/null; then
    log "Node.js available: $(node --version) (for CDN purge script)"
else
    log "⚠️  Node.js not found - CDN purge will be skipped"
fi

# Test VPS connectivity (only if environment is configured)
if [[ "$VALIDATION_ERRORS" -eq 0 ]]; then
    log "🔍 Testing VPS connectivity..."

    if ssh -i deployment_key -o ConnectTimeout=10 -o StrictHostKeyChecking=no -o BatchMode=yes "$VPS_USER@$VPS_HOST" "echo 'VPS connection OK'" 2>/dev/null; then
        success "VPS connection successful"

        # Test VPS directory structure
        log "🔍 Validating VPS directory structure..."
        ssh -i deployment_key "$VPS_USER@$VPS_HOST" "
            mkdir -p $VPS_PATH/releases
            mkdir -p /home/deploy/backups/agile-sapiens
            mkdir -p /home/deploy/logs/agile-sapiens
            echo 'VPS directory structure ready'
        " && log "VPS directory structure: OK"

    else
        validation_error "VPS connection failed"
        echo "   Checks:"
        echo "   1. SSH key installed on VPS: ssh-copy-id -i deployment_key $VPS_USER@$VPS_HOST"
        echo "   2. VPS accessible: telnet $VPS_HOST 22"
        echo "   3. User exists: ssh $VPS_USER@$VPS_HOST whoami"
        echo "   4. Key permissions: chmod 600 deployment_key"
    fi
else
    log "⚠️  Skipping VPS connectivity test due to configuration errors"
fi

# Test Hugo build capability
log "🔍 Testing Hugo build capability..."
if hugo --gc --minify --quiet 2>/dev/null; then
    success "Hugo build successful"
    log "Build output: $(du -h public 2>/dev/null | cut -f1 || echo 'unknown') in public/"
else
    validation_error "Hugo build failed"
    echo "   Debug: Run 'hugo --gc --minify --verbose' to see detailed errors"
    echo "   Common issues: content errors, theme problems, missing dependencies"
fi

# Check deployment script
log "🔍 Validating deployment scripts..."
if [[ ! -f "./scripts/deploy-to-vps.sh" ]]; then
    validation_error "deploy-to-vps.sh script not found"
    echo "   Expected: ./scripts/deploy-to-vps.sh"
else
    if [[ ! -x "./scripts/deploy-to-vps.sh" ]]; then
        log "Making deploy-to-vps.sh executable"
        chmod +x "./scripts/deploy-to-vps.sh"
    fi
    log "deployment script: OK"
fi

# Optional: Check CDN configuration
if [[ -n "${CLOUDFLARE_TOKEN:-}" ]] && [[ -f "./scripts/purge-cloudflare.js" ]]; then
    log "CDN purge configured: Cloudflare"
else
    log "⚠️  CDN purge not configured (optional)"
fi

# Summary
echo ""
echo "=== VALIDATION SUMMARY ==="
if [[ "$VALIDATION_ERRORS" -eq 0 ]]; then
    success "🎉 Local deployment setup validation: ALL PASSED"
    echo ""
    echo "✅ Environment: Configured"
    echo "✅ SSH Access: Verified"
    echo "✅ Build Tools: Ready"
    echo "✅ VPS Connection: Successful"
    echo "✅ Hugo Build: Working"
    echo "✅ Scripts: Executable"
    echo ""
    echo "🚀 Ready for local VPS deployment:"
    echo "   bash scripts/deploy-to-vps.sh"
    echo ""
    echo "🔧 Or run complete deployment:"
    echo "   bash deploy/deploy-local-complete.sh"
    echo ""
    echo "🏛️  Banking-level standards: MAINTAINED"
else
    error "❌ Validation failed with $VALIDATION_ERRORS errors"
    echo ""
    echo "🛠️  Fix the errors above before attempting deployment"
    echo "📚 See: deploy/local-deployment-setup.md for detailed setup instructions"
    echo ""
    exit 1
fi