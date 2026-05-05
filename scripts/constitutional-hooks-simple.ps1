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

        # Get staged files
        $StagedFiles = (git diff --cached --name-only) -split "`n" | Where-Object { $_.Trim() -ne "" }

        if ($StagedFiles.Count -eq 0) {
            Write-Host "   No staged files - skipping verification" -ForegroundColor Gray
            exit 0
        }

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

        # Check for constitutional changes
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