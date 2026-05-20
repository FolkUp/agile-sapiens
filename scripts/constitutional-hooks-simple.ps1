# Constitutional Enforcement Hooks - Simplified
# Enhanced Alice v2.0 Level 3 Constitutional Framework
# Banking-Level Standards Enforcement

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("pre-commit", "pre-push", "install", "status")]
    [string]$Hook
)

Write-Host "=== Constitutional Enforcement Hook ===" -ForegroundColor Magenta
Write-Host "Hook: $Hook" -ForegroundColor Yellow
Write-Host ""

function Test-ConstitutionalCompliance {
    param([string]$CommitMessage, [array]$ChangedFiles)

    $Violations = @()

    # Detect performance claims without measurements
    if ($CommitMessage -match "\d+ms" -and $CommitMessage -match "performance") {
        $MeasurementFiles = Get-ChildItem "_meta\*performance*" -ErrorAction SilentlyContinue
        if ($MeasurementFiles.Count -eq 0) {
            $Violations += "FABRICATED_PERFORMANCE_METRICS"
        }
    }

    # Detect infrastructure claims without files
    if ($CommitMessage -match "infrastructure.*deployed" -or $CommitMessage -match "hooks.*installed") {
        $InfraFiles = $ChangedFiles | Where-Object { $_ -match "scripts|\.github|hooks" }
        if ($InfraFiles.Count -eq 0) {
            $Violations += "PHANTOM_INFRASTRUCTURE_CLAIM"
        }
    }

    # Detect security claims without evidence
    if ($CommitMessage -match "security.*complete" -or $CommitMessage -match "vulnerability.*fixed") {
        $SecurityFiles = Get-ChildItem "_meta\*security*", "scripts\*security*" -ErrorAction SilentlyContinue
        if ($SecurityFiles.Count -eq 0) {
            $Violations += "SECURITY_NO_EVIDENCE"
        }
    }

    return @{
        Violations = $Violations
        Compliant = $Violations.Count -eq 0
    }
}

# Cooper P1 hardening 2026-05-20 — shared secret-scan function.
# Previously scan lived only in the pre-push branch; now also runs pre-commit
# so a secret cannot land in local history before being caught at push time.
# Extended pattern set: AKIA (AWS), sk_live_/sk_test_ (Stripe), gh[ousr]_
# variants (GitHub OAuth/server/user/refresh), AGE-SECRET-KEY-1 (age).
function Test-SecretsInChangedFiles {
    param([array]$ChangedFiles)

    $SecretPatterns = @(
        @{ Pattern = "(?i)(password\s*[=:]\s*)['\`"][^'\`"]{8,}['\`"]"; Description = "Password assignment" }
        @{ Pattern = "(?i)(api[_-]?key\s*[=:]\s*)['\`"][A-Za-z0-9/+]{20,}['\`"]"; Description = "API key" }
        @{ Pattern = "(?i)(secret[_-]?key\s*[=:]\s*)['\`"][A-Za-z0-9/+]{20,}['\`"]"; Description = "Secret key" }
        @{ Pattern = "(?i)(token\s*[=:]\s*)['\`"][A-Za-z0-9._-]{20,}['\`"]"; Description = "Access token" }
        @{ Pattern = "-----BEGIN [A-Z ]+-----"; Description = "Private key (PEM format)" }
        @{ Pattern = "sk-[A-Za-z0-9]{20,}"; Description = "Anthropic API key" }
        @{ Pattern = "xox[baprs]-[A-Za-z0-9-]+"; Description = "Slack token" }
        @{ Pattern = "ghp_[A-Za-z0-9]{36}"; Description = "GitHub personal access token" }
        @{ Pattern = "(?i)(database[_-]?url\s*[=:]\s*)['\`"][^'\`"]*password[^'\`"]*['\`"]"; Description = "Database connection string with password" }
        # Added 2026-05-20 (Cooper P1 hardening)
        @{ Pattern = "AKIA[0-9A-Z]{16}"; Description = "AWS Access Key ID" }
        @{ Pattern = "sk_(live|test)_[A-Za-z0-9]{24,}"; Description = "Stripe API key" }
        @{ Pattern = "gh[ousr]_[A-Za-z0-9]{36,}"; Description = "GitHub OAuth/server/user/refresh token" }
        @{ Pattern = "AGE-SECRET-KEY-1[0-9A-Z]{55,}"; Description = "age secret key" }
    )

    $SecretsFound = @()
    foreach ($file in $ChangedFiles) {
        if (Test-Path $file -ErrorAction SilentlyContinue) {
            $content = Get-Content $file -Raw -ErrorAction SilentlyContinue
            if ($content) {
                foreach ($sp in $SecretPatterns) {
                    if ($content -match $sp.Pattern) {
                        $SecretsFound += @{
                            File = $file
                            Type = $sp.Description
                            Pattern = $sp.Pattern
                        }
                    }
                }
            }
        }
    }
    return $SecretsFound
}

switch ($Hook) {
    "install" {
        Write-Host "Installing constitutional enforcement hooks..." -ForegroundColor Green

        $GitHooksDir = ".git\hooks"
        if (-not (Test-Path $GitHooksDir)) {
            Write-Host "   Git hooks directory not found" -ForegroundColor Red
            exit 1
        }

        # Install pre-commit hook
        $PreCommitHook = @"
#!/bin/sh
echo "Constitutional Framework: Pre-commit verification..."
powershell.exe -ExecutionPolicy Bypass -File "scripts\constitutional-hooks-simple.ps1" -Hook "pre-commit"
"@

        $PreCommitHook | Out-File "$GitHooksDir\pre-commit" -Encoding ASCII
        Write-Host "   Pre-commit hook installed" -ForegroundColor Green

        # Install pre-push hook
        $PrePushHook = @"
#!/bin/sh
echo "Constitutional Framework: Pre-push verification..."
powershell.exe -ExecutionPolicy Bypass -File "scripts\constitutional-hooks-simple.ps1" -Hook "pre-push"
"@

        $PrePushHook | Out-File "$GitHooksDir\pre-push" -Encoding ASCII
        Write-Host "   Pre-push hook installed" -ForegroundColor Green

        Write-Host "   Constitutional enforcement hooks active" -ForegroundColor Magenta
    }

    "pre-commit" {
        Write-Host "Pre-commit constitutional verification..." -ForegroundColor Blue

        # Get staged files — only Added/Modified (skip Deleted) so that
        # `git rm --cached <binary>` commits do not re-scan a working-tree
        # file that is no longer being added to history.
        $StagedFiles = (git diff --cached --name-only --diff-filter=AM) -split "`n" | Where-Object { $_.Trim() -ne "" }

        if ($StagedFiles.Count -eq 0) {
            Write-Host "   No staged files - skipping verification" -ForegroundColor Gray
            exit 0
        }

        # STEP 1: SECRET SCANNING (Cooper P1 hardening 2026-05-20)
        # Catch secrets before they land in local history, not only at push.
        Write-Host "   Secret scanning verification..." -ForegroundColor Cyan
        $SecretsFound = Test-SecretsInChangedFiles -ChangedFiles $StagedFiles
        if ($SecretsFound.Count -gt 0) {
            Write-Host ""
            Write-Host "SECURITY VIOLATION: SECRETS DETECTED (pre-commit)" -ForegroundColor Red -BackgroundColor Yellow
            foreach ($s in $SecretsFound) {
                Write-Host "   - $($s.File): $($s.Type)" -ForegroundColor Red
            }
            Write-Host ""
            Write-Host "Remediation:" -ForegroundColor Yellow
            Write-Host "   1. Unstage the file: git restore --staged <file>" -ForegroundColor White
            Write-Host "   2. Remove the secret value and replace with env-var reference" -ForegroundColor White
            Write-Host "   3. Confirm pattern is also blocked by .gitignore for future" -ForegroundColor White
            if (-not (Test-Path "_meta")) {
                New-Item -ItemType Directory "_meta" -Force | Out-Null
            }
            $sv = @{
                Timestamp = (Get-Date).ToString()
                Hook = "pre-commit"
                ViolationType = "SECRETS_DETECTED"
                Secrets = $SecretsFound
            }
            $sv | ConvertTo-Json | Out-File "_meta\security-violation-$(Get-Date -Format 'yyyyMMdd-HHmmss').json" -Encoding UTF8
            exit 1
        }
        Write-Host "   Secret scan clean" -ForegroundColor Green

        # Get commit message if available
        $CommitMessage = ""
        if (Test-Path ".git\COMMIT_EDITMSG") {
            $CommitMessage = Get-Content ".git\COMMIT_EDITMSG" -Raw -ErrorAction SilentlyContinue
        }

        # Perform constitutional compliance check
        $ComplianceResult = Test-ConstitutionalCompliance -CommitMessage $CommitMessage -ChangedFiles $StagedFiles

        if (-not $ComplianceResult.Compliant) {
            Write-Host ""
            Write-Host "CONSTITUTIONAL FRAMEWORK VIOLATION DETECTED" -ForegroundColor Red -BackgroundColor Yellow
            Write-Host "Violations:" -ForegroundColor Red
            foreach ($violation in $ComplianceResult.Violations) {
                Write-Host "   - $violation" -ForegroundColor Red
            }

            Write-Host ""
            Write-Host "Remediation required:" -ForegroundColor Yellow
            Write-Host "   1. Provide evidence files for claimed deliverables" -ForegroundColor White
            Write-Host "   2. Include measurements for performance claims" -ForegroundColor White
            Write-Host "   3. Deploy infrastructure files for deployment claims" -ForegroundColor White
            Write-Host ""

            # Log violation
            $ViolationData = @{
                Timestamp = (Get-Date).ToString()
                Hook = "pre-commit"
                Violations = $ComplianceResult.Violations
                CommitMessage = $CommitMessage
                StagedFiles = $StagedFiles
            }

            if (-not (Test-Path "_meta")) {
                New-Item -ItemType Directory "_meta" -Force | Out-Null
            }

            $ViolationFile = "_meta\violation-$(Get-Date -Format 'yyyyMMdd-HHmmss').json"
            $ViolationData | ConvertTo-Json | Out-File $ViolationFile -Encoding UTF8

            exit 1
        }

        Write-Host "   Constitutional framework compliance verified" -ForegroundColor Green
    }

    "pre-push" {
        Write-Host "Pre-push constitutional verification..." -ForegroundColor Blue

        # Get commits being pushed
        $LocalCommits = git log origin/main..HEAD --oneline 2>$null
        if (-not $LocalCommits) {
            Write-Host "   No new commits to push" -ForegroundColor Gray
            exit 0
        }

        # STEP 1: SECRET SCANNING (Banking-Level Security)
        # Cooper P1 hardening 2026-05-20 — uses shared Test-SecretsInChangedFiles
        # with extended pattern set (AKIA, Stripe, gh[ousr]_, age). Same scan
        # now also runs at pre-commit time (see above).
        Write-Host "   Secret scanning verification..." -ForegroundColor Cyan

        # Only Added/Modified files — Deleted paths in the push range can
        # still exist in the working tree (e.g. `git rm --cached <binary>`)
        # and produce false positives when scanned as raw content.
        $ChangedFiles = git diff --name-only --diff-filter=AM origin/main..HEAD 2>$null
        $SecretsFound = Test-SecretsInChangedFiles -ChangedFiles $ChangedFiles

        if ($SecretsFound.Count -gt 0) {
            Write-Host ""
            Write-Host "SECURITY VIOLATION: SECRETS DETECTED" -ForegroundColor Red -BackgroundColor Yellow
            Write-Host "Banking-level security standards violated:" -ForegroundColor Red
            foreach ($secret in $SecretsFound) {
                Write-Host "   - $($secret.File): $($secret.Type)" -ForegroundColor Red
            }
            Write-Host ""
            Write-Host "Remediation required:" -ForegroundColor Yellow
            Write-Host "   1. Remove secrets from source files" -ForegroundColor White
            Write-Host "   2. Move secrets to environment variables" -ForegroundColor White
            Write-Host "   3. Add secret patterns to .gitignore" -ForegroundColor White
            Write-Host "   4. Consider using .env files (ignored by git)" -ForegroundColor White
            Write-Host ""

            # Log security violation
            $SecurityViolation = @{
                Timestamp = (Get-Date).ToString()
                Hook = "pre-push"
                ViolationType = "SECRETS_DETECTED"
                Secrets = $SecretsFound
            }

            if (-not (Test-Path "_meta")) {
                New-Item -ItemType Directory "_meta" -Force | Out-Null
            }

            $ViolationFile = "_meta\security-violation-$(Get-Date -Format 'yyyyMMdd-HHmmss').json"
            $SecurityViolation | ConvertTo-Json -Depth 3 | Out-File $ViolationFile -Encoding UTF8

            exit 1
        }

        Write-Host "   Secret scanning passed - no secrets detected" -ForegroundColor Green

        # STEP 2: Check for constitutional changes
        $ConstitutionalCommits = $LocalCommits | Where-Object { $_ -match "constitutional|framework|banking.*level" }
        if ($ConstitutionalCommits) {
            Write-Host "   Constitutional framework changes detected" -ForegroundColor Magenta

            # Run quality gates if available
            if (Test-Path "scripts\quality-gate-check.ps1") {
                try {
                    & "scripts\quality-gate-check.ps1" -Level "baseline"
                    if ($LASTEXITCODE -ne 0) {
                        Write-Host "Quality gates failed - push blocked" -ForegroundColor Red
                        exit 1
                    }
                    Write-Host "Quality gates passed" -ForegroundColor Green
                } catch {
                    Write-Host "Quality gates warning: $_" -ForegroundColor Yellow
                }
            }
        }

        Write-Host "   Pre-push verification complete" -ForegroundColor Green
    }

    "status" {
        Write-Host "Constitutional Enforcement Status..." -ForegroundColor Blue

        # Check hook installation
        $HooksInstalled = @()
        if (Test-Path ".git\hooks\pre-commit") { $HooksInstalled += "pre-commit" }
        if (Test-Path ".git\hooks\pre-push") { $HooksInstalled += "pre-push" }

        Write-Host "   Hooks installed: $($HooksInstalled -join ', ')" -ForegroundColor White

        # Check infrastructure
        $Infrastructure = @()
        if (Test-Path "scripts\quality-gate-check.ps1") { $Infrastructure += "quality-gates" }
        if (Test-Path "scripts\gnrl-290-simple.ps1") { $Infrastructure += "state-verification" }
        if (Test-Path "_meta\quality-gates-metrics.yaml") { $Infrastructure += "metrics" }

        Write-Host "   Infrastructure: $($Infrastructure -join ', ')" -ForegroundColor White

        # Check violations
        $ViolationFiles = Get-ChildItem "_meta\violation-*" -ErrorAction SilentlyContinue
        Write-Host "   Recent violations: $($ViolationFiles.Count)" -ForegroundColor $(if ($ViolationFiles.Count -gt 0) { 'Yellow' } else { 'Green' })

        Write-Host ""
        if ($HooksInstalled.Count -eq 2 -and $Infrastructure.Count -ge 2) {
            Write-Host "Constitutional Framework: FULLY OPERATIONAL" -ForegroundColor Green
        } else {
            Write-Host "Constitutional Framework: PARTIAL DEPLOYMENT" -ForegroundColor Yellow
        }
    }
}

Write-Host ""
Write-Host "Enhanced Alice v2.0 Constitutional Framework Hook Complete" -ForegroundColor Magenta