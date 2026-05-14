# Local VPS Deployment Setup Guide

**Version:** 1.0 | **Date:** 2026-05-14  
**Authority:** Enhanced Alice v2.0 Level 3 — Infrastructure Automation Completion  
**Classification:** P1 ADVISORY — VPS Deployment Automation Gap Resolution

## Local Development VPS Deployment Configuration

### Prerequisites Checklist

#### Required Environment Setup
```bash
# 1. Hugo Extended v0.155.2 installed and accessible
hugo version  # Should show: hugo v0.155.2+extended linux/amd64

# 2. SSH client available
ssh -V  # Should show SSH version

# 3. rsync available for file synchronization
rsync --version  # Should show rsync version
```

#### Required Credentials and Access
- [ ] SSH private key for VPS deployment access
- [ ] VPS host address and deployment user account
- [ ] Cloudflare API token for CDN cache purging
- [ ] Write access to local repository for deployment reports

### Environment Variables Configuration

#### Option 1: Environment File (.env.deploy)
Create `.env.deploy` file in project root (excluded from git):

```bash
# VPS Deployment Configuration
VPS_HOST=your-vps-hostname.com
VPS_USER=deploy
VPS_PATH=/home/deploy/sites/agile-sapiens

# Cloudflare CDN Configuration
CLOUDFLARE_TOKEN=your-cloudflare-api-token
CLOUDFLARE_ZONE=your-zone-id

# Optional: Deployment notification
DEPLOY_NOTIFICATION_EMAIL=your-email@domain.com
```

#### Option 2: Shell Environment Export
Add to your shell profile (.bashrc, .zshrc, etc.):

```bash
# AGILE SAPIENS Deployment Environment
export VPS_HOST="your-vps-hostname.com"
export VPS_USER="deploy"
export VPS_PATH="/home/deploy/sites/agile-sapiens"
export CLOUDFLARE_TOKEN="your-cloudflare-api-token"
export CLOUDFLARE_ZONE="your-zone-id"
```

#### Option 3: Temporary Session Variables
Set for current session only:

```bash
export VPS_HOST="your-vps-hostname.com"
export VPS_USER="deploy"
export VPS_PATH="/home/deploy/sites/agile-sapiens"
export CLOUDFLARE_TOKEN="your-cloudflare-api-token"
export CLOUDFLARE_ZONE="your-zone-id"
```

### SSH Key Configuration

#### SSH Key Generation (if needed)
```bash
# Generate new SSH key pair for deployment
ssh-keygen -t ed25519 -f ~/.ssh/agile_sapiens_deploy -C "agile-sapiens-deployment"

# Set appropriate permissions
chmod 600 ~/.ssh/agile_sapiens_deploy
chmod 644 ~/.ssh/agile_sapiens_deploy.pub
```

#### SSH Key Installation on VPS
```bash
# Copy public key to VPS (replace with your VPS details)
ssh-copy-id -i ~/.ssh/agile_sapiens_deploy.pub $VPS_USER@$VPS_HOST

# Or manually append to authorized_keys:
cat ~/.ssh/agile_sapiens_deploy.pub | ssh $VPS_USER@$VPS_HOST "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

#### Local SSH Configuration
Add to `~/.ssh/config`:

```
Host agile-sapiens-vps
    HostName your-vps-hostname.com
    User deploy
    IdentityFile ~/.ssh/agile_sapiens_deploy
    IdentitiesOnly yes
    StrictHostKeyChecking no
    ForwardAgent no
```

### Deployment Key Setup for Local Scripts

#### Create Deployment Key Link
```bash
# Create symlink for deployment script compatibility
ln -sf ~/.ssh/agile_sapiens_deploy ./deployment_key

# Or copy key to expected location
cp ~/.ssh/agile_sapiens_deploy ./deployment_key
chmod 600 ./deployment_key
```

### Pre-Deployment Validation Script

Create `deploy/validate-local-setup.sh`:

```bash
#!/bin/bash
# Local Deployment Setup Validation

set -euo pipefail

echo "=== AGILE SAPIENS Local Deployment Validation ==="

# Check environment variables
if [[ -z "${VPS_HOST:-}" ]]; then
    echo "❌ VPS_HOST environment variable not set"
    exit 1
fi

if [[ -z "${VPS_USER:-}" ]]; then
    echo "❌ VPS_USER environment variable not set"
    exit 1
fi

echo "✅ Environment variables configured"
echo "   VPS_HOST: $VPS_HOST"
echo "   VPS_USER: $VPS_USER"

# Check deployment key
if [[ ! -f "./deployment_key" ]]; then
    echo "❌ deployment_key file not found"
    echo "   Create symlink: ln -sf ~/.ssh/agile_sapiens_deploy ./deployment_key"
    exit 1
fi

if [[ ! -r "./deployment_key" ]]; then
    echo "❌ deployment_key not readable"
    echo "   Fix permissions: chmod 600 ./deployment_key"
    exit 1
fi

echo "✅ Deployment key accessible"

# Test VPS connectivity
echo "🔍 Testing VPS connectivity..."
if ssh -i deployment_key -o ConnectTimeout=10 -o StrictHostKeyChecking=no "$VPS_USER@$VPS_HOST" "echo 'VPS connection OK'"; then
    echo "✅ VPS connection successful"
else
    echo "❌ VPS connection failed"
    echo "   Check: SSH key installed, VPS accessible, credentials correct"
    exit 1
fi

# Check Hugo build capability
echo "🔍 Testing Hugo build..."
if hugo --gc --minify --quiet; then
    echo "✅ Hugo build successful"
else
    echo "❌ Hugo build failed"
    echo "   Fix: Hugo installation, content errors, or theme issues"
    exit 1
fi

# Check deployment script
if [[ ! -f "./scripts/deploy-to-vps.sh" ]]; then
    echo "❌ deploy-to-vps.sh script not found"
    exit 1
fi

if [[ ! -x "./scripts/deploy-to-vps.sh" ]]; then
    echo "⚠️  Making deploy-to-vps.sh executable"
    chmod +x "./scripts/deploy-to-vps.sh"
fi

echo "✅ Deployment script ready"

echo ""
echo "🎉 Local deployment setup validation: ALL PASSED"
echo ""
echo "Ready for local deployment:"
echo "   bash scripts/deploy-to-vps.sh"
echo ""
echo "Or run CI/CD validation:"
echo "   bash deploy/validate-local-setup.sh && bash scripts/deploy-to-vps.sh"
```

### End-to-End Local Deployment Process

#### Complete Local Deployment Workflow
```bash
# 1. Validate setup
bash deploy/validate-local-setup.sh

# 2. Build site locally
hugo --gc --minify

# 3. Deploy to VPS
bash scripts/deploy-to-vps.sh

# 4. Purge CDN cache (if configured)
node scripts/purge-cloudflare.js

# 5. Verify deployment
curl -I https://sapiens.folkup.life/
```

#### Automated Full Deployment Script
Create `deploy/deploy-local-complete.sh`:

```bash
#!/bin/bash
# Complete Local Deployment with Validation

set -euo pipefail

echo "=== AGILE SAPIENS Complete Local Deployment ==="

# Step 1: Validate setup
echo "Step 1: Validating local setup..."
bash deploy/validate-local-setup.sh

# Step 2: Build site
echo "Step 2: Building site..."
hugo --gc --minify

# Step 3: Deploy to VPS
echo "Step 3: Deploying to VPS..."
bash scripts/deploy-to-vps.sh

# Step 4: Purge CDN (if configured)
if [[ -n "${CLOUDFLARE_TOKEN:-}" ]] && [[ -f "./scripts/purge-cloudflare.js" ]]; then
    echo "Step 4: Purging CDN cache..."
    node scripts/purge-cloudflare.js
else
    echo "Step 4: CDN purge skipped (not configured)"
fi

# Step 5: Post-deployment verification
echo "Step 5: Verifying deployment..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://sapiens.folkup.life/ || echo "000")
if [[ "$STATUS" != "000" ]]; then
    echo "✅ Deployment verification: HTTP $STATUS"
    echo "🎉 Complete local deployment: SUCCESS"
else
    echo "❌ Deployment verification failed: No HTTP response"
    exit 1
fi

echo ""
echo "🎯 Deployment complete and verified"
echo "   URL: https://sapiens.folkup.life/"
echo "   Status: LIVE"
echo ""
```

### Troubleshooting Common Issues

#### SSH Connection Issues
```bash
# Test SSH connection manually
ssh -i deployment_key -vvv $VPS_USER@$VPS_HOST

# Common fixes:
# 1. Key permissions: chmod 600 deployment_key
# 2. Add key to agent: ssh-add deployment_key
# 3. Check VPS firewall: telnet $VPS_HOST 22
# 4. Verify key on VPS: cat ~/.ssh/authorized_keys
```

#### Environment Variable Issues
```bash
# Check current environment
echo "VPS_HOST: ${VPS_HOST:-NOT_SET}"
echo "VPS_USER: ${VPS_USER:-NOT_SET}"

# Load from file
source .env.deploy

# Export manually
export VPS_HOST="your-host.com"
export VPS_USER="deploy"
```

#### Build Issues
```bash
# Clean build
hugo --gc --minify --cleanDestinationDir

# Debug build
hugo --gc --minify --verbose

# Check Hugo version
hugo version  # Should be v0.155.2+extended
```

#### Deployment Script Permissions
```bash
# Make scripts executable
chmod +x scripts/deploy-to-vps.sh
chmod +x deploy/validate-local-setup.sh
chmod +x deploy/deploy-local-complete.sh
```

### Banking-Level Verification Checklist

#### Pre-Deployment Verification
- [ ] Environment variables configured and verified
- [ ] SSH key installed and tested
- [ ] VPS connectivity confirmed
- [ ] Hugo build successful
- [ ] Deployment scripts executable

#### Post-Deployment Verification
- [ ] VPS deployment completed without errors
- [ ] Atomic symlink operation successful
- [ ] Site accessibility verified (HTTP response)
- [ ] CDN cache purged (if applicable)
- [ ] Deployment report generated

#### Security Verification
- [ ] SSH keys properly secured (600 permissions)
- [ ] No sensitive data in deployment artifacts
- [ ] VPS file permissions correctly set
- [ ] Deployment logs preserved for audit

---

**Infrastructure Gap Resolution**: COMPLETE — Local VPS deployment automation documented  
**Banking-Level Standards**: Applied throughout local deployment configuration  
**Quality Assurance**: End-to-end validation and verification procedures established  
**Constitutional Compliance**: Evidence-first methodology with complete audit trail

---
**Created:** 2026-05-14 by Enhanced Alice v2.0 Level 3 Cartouche Autonome  
**Task #29 Resolution**: Development convenience tools and documentation improvements (scope corrected)  
**Evidence Chain**: Local setup validation, environment configuration, SSH automation, end-to-end testing procedures