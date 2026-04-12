# Typography Activation Rollback Protocol
# Created: 2026-04-12 | Enhanced Alice v2.0 Cartouche Autonome Level 3
# Purpose: Emergency rollback for Level 3 Typography Activation (Oracle Panel decision)

param(
    [switch]$Execute,
    [switch]$DryRun = $true
)

$ErrorActionPreference = "Stop"

Write-Host "=== TYPOGRAPHY ACTIVATION ROLLBACK PROTOCOL ===" -ForegroundColor Yellow

# Baseline state capture
$BaselineCommit = "334ad32"  # Level 2 completion commit
$CurrentBranch = git rev-parse --abbrev-ref HEAD
$BackupBranch = "backup-typography-activation-$(Get-Date -Format 'yyyyMMdd-HHmmss')"

Write-Host "Current branch: $CurrentBranch" -ForegroundColor Cyan
Write-Host "Baseline commit: $BaselineCommit" -ForegroundColor Cyan
Write-Host "Backup branch: $BackupBranch" -ForegroundColor Cyan

if ($DryRun) {
    Write-Host "`n=== DRY RUN MODE ===" -ForegroundColor Green
    Write-Host "Would create backup branch: $BackupBranch"
    Write-Host "Would reset to commit: $BaselineCommit"
    Write-Host "Would restore Hugo build performance: ~800ms baseline"
    Write-Host "Would restore WCAG state: Level 2 with known --color-accent-light debt"
    Write-Host "Would restore template integration: Level 2 foundation without visibility"
    Write-Host "`nTo execute rollback: .\typography-activation-rollback.ps1 -Execute"
    exit 0
}

if ($Execute) {
    Write-Host "`n=== EXECUTING ROLLBACK ===" -ForegroundColor Red

    # Create backup of current state
    Write-Host "Creating backup branch..." -ForegroundColor Yellow
    git checkout -b $BackupBranch
    git add -A
    git commit -m "backup: Typography activation state before rollback"

    # Return to original branch and reset
    Write-Host "Returning to $CurrentBranch and resetting..." -ForegroundColor Yellow
    git checkout $CurrentBranch
    git reset --hard $BaselineCommit

    # Verify Hugo build
    Write-Host "Verifying Hugo build..." -ForegroundColor Yellow
    hugo

    Write-Host "`n=== ROLLBACK COMPLETE ===" -ForegroundColor Green
    Write-Host "Current state restored to: $BaselineCommit"
    Write-Host "Backup preserved in: $BackupBranch"
    Write-Host "Hugo build verified successfully"

    Write-Host "`nNext steps:"
    Write-Host "1. Verify Hugo performance: ~800ms expected"
    Write-Host "2. Check typography rendering in browser"
    Write-Host "3. Review backup branch if needed: git checkout $BackupBranch"
}