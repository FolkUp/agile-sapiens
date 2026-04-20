#!/bin/bash
# AGIL-007: VPS Deployment Script — Banking-Level Atomic Operations
# Deploys agile-sapiens to production VPS with rollback capability

set -euo pipefail

# Configuration
SITE_NAME="agile-sapiens"
VPS_PATH="/home/deploy/sites/${SITE_NAME}"
BACKUP_DIR="/home/deploy/backups/${SITE_NAME}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

log() { echo "$(date '+%Y-%m-%d %H:%M:%S') [DEPLOY] $1"; }
error() { echo "$(date '+%Y-%m-%d %H:%M:%S') [ERROR] $1" >&2; }

log "🚀 Starting agile-sapiens deployment — Banking-Level Standards"

# Pre-deployment validation
if [ ! -d "./public" ]; then
  error "Build artifact directory ./public not found"
  exit 1
fi

# Verify VPS connectivity
log "📡 Testing VPS connectivity..."
ssh -i deployment_key -o StrictHostKeyChecking=no "${VPS_USER}@${VPS_HOST}" \
  -o ConnectTimeout=10 "echo 'VPS connection OK'" || {
  error "Failed to connect to VPS"
  exit 1
}

log "✅ VPS connectivity verified"

# Create atomic deployment structure
log "🏗️  Preparing atomic deployment..."

# Create remote directories
ssh -i deployment_key "${VPS_USER}@${VPS_HOST}" "
  mkdir -p ${VPS_PATH}/releases/${TIMESTAMP}
  mkdir -p ${BACKUP_DIR}
  mkdir -p /home/deploy/logs/${SITE_NAME}
"

# Upload new version to staging area
log "📦 Uploading site files..."
rsync -avz --delete \
  -e "ssh -i deployment_key -o StrictHostKeyChecking=no" \
  ./public/ \
  "${VPS_USER}@${VPS_HOST}:${VPS_PATH}/releases/${TIMESTAMP}/"

if [ $? -ne 0 ]; then
  error "File upload failed"
  exit 1
fi

log "✅ Upload completed: ${TIMESTAMP}"

# Backup current version (if exists)
log "💾 Creating backup of current version..."
ssh -i deployment_key "${VPS_USER}@${VPS_HOST}" "
  if [ -L ${VPS_PATH}/current ]; then
    CURRENT_TARGET=\$(readlink ${VPS_PATH}/current)
    CURRENT_VERSION=\$(basename \$CURRENT_TARGET)

    if [ -d \"\$CURRENT_TARGET\" ]; then
      echo '[REMOTE] Backing up version: '\$CURRENT_VERSION
      tar -czf ${BACKUP_DIR}/backup_\$CURRENT_VERSION.tar.gz -C \$CURRENT_TARGET .
      echo \$CURRENT_VERSION > ${BACKUP_DIR}/last_version.txt
      echo '[REMOTE] Backup completed: backup_'\$CURRENT_VERSION'.tar.gz'
    fi
  else
    echo '[REMOTE] No previous version to backup'
  fi
"

# Atomic switch — Banking-Level Transaction
log "🔄 Performing atomic switch..."
ssh -i deployment_key "${VPS_USER}@${VPS_HOST}" "
  # Remove old symlink and create new one atomically
  rm -f ${VPS_PATH}/current_new
  ln -sf ${VPS_PATH}/releases/${TIMESTAMP} ${VPS_PATH}/current_new

  # Atomic move (guaranteed on most filesystems)
  mv ${VPS_PATH}/current_new ${VPS_PATH}/current

  echo '[REMOTE] Atomic switch completed'

  # Update nginx configuration if needed
  if [ -f /etc/nginx/sites-available/${SITE_NAME} ]; then
    sudo nginx -t && sudo systemctl reload nginx
    echo '[REMOTE] Nginx configuration reloaded'
  fi

  # Log deployment
  echo '${TIMESTAMP} deployed by CI/CD' >> /home/deploy/logs/${SITE_NAME}/deploy.log
"

# Post-deployment verification
log "🔍 Post-deployment verification..."
ssh -i deployment_key "${VPS_USER}@${VPS_HOST}" "
  # Verify symlink
  if [ ! -L ${VPS_PATH}/current ]; then
    echo '[REMOTE ERROR] Symlink not created' >&2
    exit 1
  fi

  TARGET=\$(readlink ${VPS_PATH}/current)
  if [ \"\$TARGET\" != \"${VPS_PATH}/releases/${TIMESTAMP}\" ]; then
    echo '[REMOTE ERROR] Symlink points to wrong target' >&2
    exit 1
  fi

  # Verify file existence
  if [ ! -f ${VPS_PATH}/current/index.html ]; then
    echo '[REMOTE ERROR] index.html not found in deployed version' >&2
    exit 1
  fi

  echo '[REMOTE] Deployment verification: PASSED'
"

# Cleanup old releases (keep last 5)
log "🧹 Cleaning up old releases..."
ssh -i deployment_key "${VPS_USER}@${VPS_HOST}" "
  cd ${VPS_PATH}/releases
  ls -1t | tail -n +6 | xargs -r rm -rf --
  echo '[REMOTE] Old releases cleaned up (keeping last 5)'
"

# Performance and Security Verification
log "🔒 Security and performance check..."
ssh -i deployment_key "${VPS_USER}@${VPS_HOST}" "
  # Check file permissions
  find ${VPS_PATH}/current -type f -exec chmod 644 {} \\;
  find ${VPS_PATH}/current -type d -exec chmod 755 {} \\;

  # Verify no sensitive files exposed
  if find ${VPS_PATH}/current -name '*.env' -o -name '*.key' -o -name '*.pem' | grep -q .; then
    echo '[REMOTE ERROR] Sensitive files detected in deployed content' >&2
    exit 1
  fi

  echo '[REMOTE] Security check: PASSED'
"

log "🎉 Deployment completed successfully!"
log "📊 Deployment summary:"
log "   Site: ${SITE_NAME}"
log "   Version: ${TIMESTAMP}"
log "   VPS: ${VPS_HOST}"
log "   Path: ${VPS_PATH}/current -> releases/${TIMESTAMP}"
log "   Status: ✅ LIVE"

# Generate deployment report
cat > deployment-report.json << EOF
{
  "site": "${SITE_NAME}",
  "version": "${TIMESTAMP}",
  "deployed_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "vps_host": "${VPS_HOST}",
  "path": "${VPS_PATH}/current",
  "status": "success",
  "quality_gates": "all_passed",
  "banking_standards": "maintained"
}
EOF

log "📋 Deployment report: deployment-report.json"
echo "🏛️  Banking-level deployment standards: MAINTAINED"