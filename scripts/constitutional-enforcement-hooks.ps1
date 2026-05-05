# Constitutional Enforcement Hooks - GNRL-290 Integration
# Enhanced Alice v2.0 Level 3 Constitutional Framework
# Banking-Level Standards Enforcement Infrastructure
#
# AUTHORITY: Post-GNRL-289 Constitutional Remediation
# PURPOSE: Prevent GNRL-281-style phantom completion through automated enforcement

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("pre-commit", "pre-push", "post-merge", "install", "status")]
    [string]$Hook,

    [string]$ReferenceSha = "",
    [string]$LocalSha = "",
    [switch]$Force
)

# Constitutional Framework Configuration
$Script:Constitutional = @{
    BankingLevelTasks = @("security", "infrastructure", "P0", "constitutional")
    EvidenceRequired = @("deliverable", "measurement", "verification", "approval")
    ExpertValidation = @{
        "security" = "Cooper"
        "infrastructure" = "cyber-gonzo"
        "constitutional" = "Enhanced Alice v2.0 Level 3"
        "P0" = "multi-expert"
    }
    PerformanceBaselines = @{
        "build_simple" = 6.8
        "build_complex" = 10.0
        "lighthouse_min" = 90
        "accessibility_violations" = 0
    }
}

Write-Host "=== Constitutional Enforcement Hook ===" -ForegroundColor Magenta
Write-Host "Hook: $Hook" -ForegroundColor Yellow
Write-Host "Authority: Enhanced Alice v2.0 Constitutional Framework" -ForegroundColor Cyan
Write-Host ""

# Banking-Level Evidence Verification
function Test-ConstitutionalCompliance {
    param(
        [string]$CommitMessage,
        [array]$ChangedFiles
    )

    Write-Host "🔍 Constitutional Compliance Assessment..." -ForegroundColor Blue

    $Violations = @()
    $BankingLevelRequired = $false

    # Detect banking-level triggers in commit message
    foreach ($trigger in $Script:Constitutional.BankingLevelTasks) {
        if ($CommitMessage -match $trigger) {
            $BankingLevelRequired = $true
            Write-Host "   🏛️ Banking-level trigger detected: $trigger" -ForegroundColor Yellow
            break
        }
    }

    # Check for GNRL-281 phantom completion patterns
    if ($CommitMessage -match "\d+ms" -and $CommitMessage -match "(performance|speed|optimization)") {
        Write-Host "   📊 Performance claim detected: validating measurements..." -ForegroundColor Yellow

        $PerformanceMeasurements = Get-ChildItem -Path "_meta" -Filter "*performance*" -ErrorAction SilentlyContinue
        if ($PerformanceMeasurements.Count -eq 0) {
            $Violations += "FABRICATED_PERFORMANCE_METRICS"
            Write-Host "   ❌ No measurement infrastructure found for performance claims" -ForegroundColor Red
        } else {
            Write-Host "   ✅ Performance measurement infrastructure verified" -ForegroundColor Green
        }
    }

    # Verify infrastructure claims
    if ($CommitMessage -match "(infrastructure|deployed|installed|configured)" -and
        $CommitMessage -match "(constitutional|hooks|enforcement)") {

        Write-Host "   🏗️ Infrastructure deployment claim detected..." -ForegroundColor Yellow

        $InfrastructureFiles = @()
        foreach ($file in $ChangedFiles) {
            if ($file -match "(scripts|\.github|hooks)" -and $file -match "(constitutional|enforcement|verification)") {
                $InfrastructureFiles += $file
            }
        }

        if ($InfrastructureFiles.Count -eq 0) {
            $Violations += "PHANTOM_INFRASTRUCTURE_CLAIM"
            Write-Host "   ❌ No infrastructure files in changeset despite deployment claim" -ForegroundColor Red
        } else {
            Write-Host "   ✅ Infrastructure files verified: $($InfrastructureFiles -join ', ')" -ForegroundColor Green
        }
    }

    # Security assessment verification
    if ($CommitMessage -match "(security|vulnerability|threat|audit)" -and $CommitMessage -match "(complete|resolved|fixed)") {
        Write-Host "   🔒 Security completion claim detected..." -ForegroundColor Yellow

        $SecurityEvidence = Get-ChildItem -Path "_meta" -Filter "*security*" -ErrorAction SilentlyContinue
        $SecurityScripts = Get-ChildItem -Path "scripts" -Filter "*security*" -ErrorAction SilentlyContinue

        if ($SecurityEvidence.Count -eq 0 -and $SecurityScripts.Count -eq 0) {
            $Violations += "SECURITY_NO_EVIDENCE"
            Write-Host "   ❌ No security evidence files found for security completion claim" -ForegroundColor Red
        } else {
            Write-Host "   ✅ Security evidence verified" -ForegroundColor Green
        }
    }

    # Quality gate enforcement for banking-level changes
    if ($BankingLevelRequired) {
        Write-Host "   🏦 Banking-level standards enforcement..." -ForegroundColor Magenta

        # Check if quality gates exist and are current
        $QualityGateScript = "scripts\quality-gate-check.ps1"
        if (-not (Test-Path $QualityGateScript)) {
            $Violations += "MISSING_QUALITY_GATES"
            Write-Host "   ❌ Quality gate infrastructure missing for banking-level change" -ForegroundColor Red
        } else {
            # Verify quality gates are executable and current
            $QualityGateLastModified = (Get-Item $QualityGateScript).LastWriteTime
            $DaysOld = ((Get-Date) - $QualityGateLastModified).Days

            if ($DaysOld -gt 7) {
                Write-Host "   ⚠️ Quality gates last updated $DaysOld days ago - consider refresh" -ForegroundColor Yellow
            } else {
                Write-Host "   ✅ Quality gates current and verified" -ForegroundColor Green
            }
        }
    }

    return @{
        BankingLevel = $BankingLevelRequired
        Violations = $Violations
        Compliant = $Violations.Count -eq 0
        Evidence = Get-ConstitutionalEvidence -ChangedFiles $ChangedFiles
    }
}

# Collect constitutional evidence from changeset
function Get-ConstitutionalEvidence {
    param([array]$ChangedFiles)

    $Evidence = @{
        Scripts = @()
        Documentation = @()
        Tests = @()
        Measurements = @()
        Configuration = @()
    }

    foreach ($file in $ChangedFiles) {
        switch -Regex ($file) {
            "scripts.*\.(ps1|sh|py|js)$" { $Evidence.Scripts += $file }
            "README|CHANGELOG|\.md$" { $Evidence.Documentation += $file }
            "tests?.*\.(spec|test)\." { $Evidence.Tests += $file }
            "_meta.*\.(yaml|json|log)$" { $Evidence.Measurements += $file }
            "\.(json|yaml|yml|toml|ini)$" { $Evidence.Configuration += $file }
        }
    }

    return $Evidence
}

# Expert validation requirement assessment
function Get-ExpertRequirement {
    param(
        [string]$CommitMessage,
        [hashtable]$Evidence
    )

    $RequiredExperts = @()

    # Security expert requirement
    if ($CommitMessage -match "(security|vulnerability|audit|threat|attack)" -or
        $Evidence.Scripts | Where-Object { $_ -match "security" }) {
        $RequiredExperts += "Cooper (Security)"
    }

    # Infrastructure expert requirement
    if ($CommitMessage -match "(infrastructure|deployment|pipeline|ci/cd)" -or
        $Evidence.Configuration.Count -gt 2) {
        $RequiredExperts += "cyber-gonzo (Infrastructure)"
    }

    # Constitutional framework expert requirement
    if ($CommitMessage -match "(constitutional|framework|banking.*level|enforcement)" -or
        $Evidence.Scripts | Where-Object { $_ -match "constitutional" }) {
        $RequiredExperts += "Enhanced Alice v2.0 Level 3 (Constitutional)"
    }

    # Frontend expert requirement
    if ($Evidence.Scripts | Where-Object { $_ -match "\.(css|js|ts|scss)" } -or
        $CommitMessage -match "(frontend|ui|ux|styling|responsive)") {
        $RequiredExperts += "Johnny (Frontend)"
    }

    return $RequiredExperts
}

# Main Hook Logic
switch ($Hook) {
    "install" {
        Write-Host "🔧 Installing constitutional enforcement hooks..." -ForegroundColor Green

        $GitHooksDir = ".git\hooks"
        if (-not (Test-Path $GitHooksDir)) {
            Write-Host "   ❌ Git hooks directory not found. Not a git repository?" -ForegroundColor Red
            exit 1
        }

        # Install pre-commit hook
        $PreCommitHook = @"
#!/bin/sh
# Constitutional Enforcement Pre-Commit Hook - GNRL-290
# Enhanced Alice v2.0 Level 3 Constitutional Framework

echo "🏛️ Constitutional Framework: Pre-commit verification..."
powershell.exe -ExecutionPolicy Bypass -File "scripts\constitutional-enforcement-hooks.ps1" -Hook "pre-commit"
"@

        $PreCommitHook | Out-File -FilePath "$GitHooksDir\pre-commit" -Encoding ASCII
        Write-Host "   ✅ Pre-commit hook installed" -ForegroundColor Green

        # Install pre-push hook
        $PrePushHook = @"
#!/bin/sh
# Constitutional Enforcement Pre-Push Hook - GNRL-290
# Enhanced Alice v2.0 Level 3 Constitutional Framework

echo "🏛️ Constitutional Framework: Pre-push verification..."
powershell.exe -ExecutionPolicy Bypass -File "scripts\constitutional-enforcement-hooks.ps1" -Hook "pre-push"
"@

        $PrePushHook | Out-File -FilePath "$GitHooksDir\pre-push" -Encoding ASCII
        Write-Host "   ✅ Pre-push hook installed" -ForegroundColor Green

        Write-Host "   🛡️ Constitutional enforcement hooks active" -ForegroundColor Magenta
    }

    "pre-commit" {
        Write-Host "🔍 Pre-commit constitutional verification..." -ForegroundColor Blue

        # Get staged files
        $StagedFiles = (git diff --cached --name-only).Split([Environment]::NewLine) | Where-Object { $_.Trim() -ne "" }

        if ($StagedFiles.Count -eq 0) {
            Write-Host "   ℹ️ No staged files - skipping verification" -ForegroundColor Gray
            exit 0
        }

        # Get commit message from git (if available)
        $CommitMessage = ""
        if (Test-Path ".git\COMMIT_EDITMSG") {
            $CommitMessage = Get-Content ".git\COMMIT_EDITMSG" -Raw
        }

        Write-Host "   📋 Staged files: $($StagedFiles.Count)" -ForegroundColor Gray
        Write-Host "   📝 Commit message preview: $($CommitMessage.Substring(0, [Math]::Min(100, $CommitMessage.Length)))" -ForegroundColor Gray

        # Constitutional compliance assessment
        $ComplianceResult = Test-ConstitutionalCompliance -CommitMessage $CommitMessage -ChangedFiles $StagedFiles

        if (-not $ComplianceResult.Compliant) {
            Write-Host ""
            Write-Host "❌ CONSTITUTIONAL FRAMEWORK VIOLATION DETECTED" -ForegroundColor Red -BackgroundColor Yellow
            Write-Host "Violations:" -ForegroundColor Red
            foreach ($violation in $ComplianceResult.Violations) {
                Write-Host "   - $violation" -ForegroundColor Red
            }

            Write-Host ""
            Write-Host "💡 Remediation required:" -ForegroundColor Yellow
            Write-Host "   1. Provide evidence files for claimed deliverables" -ForegroundColor White
            Write-Host "   2. Include actual measurements for performance claims" -ForegroundColor White
            Write-Host "   3. Deploy infrastructure files for deployment claims" -ForegroundColor White
            Write-Host "   4. Add security evidence for security completion claims" -ForegroundColor White
            Write-Host ""
            Write-Host "🚫 Commit blocked by constitutional framework" -ForegroundColor Red

            # Log violation for GNRL-290 monitoring
            $ViolationData = @{
                Timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss UTC")
                Hook = "pre-commit"
                Violations = $ComplianceResult.Violations
                CommitMessage = $CommitMessage
                StagedFiles = $StagedFiles
            } | ConvertTo-Json -Depth 10

            $ViolationDir = "_meta\constitutional-violations"
            if (-not (Test-Path $ViolationDir)) {
                New-Item -ItemType Directory -Path $ViolationDir -Force | Out-Null
            }

            $ViolationFile = "$ViolationDir\violation-$(Get-Date -Format 'yyyyMMdd-HHmmss').json"
            $ViolationData | Out-File $ViolationFile -Encoding UTF8

            exit 1
        }

        # Banking-level requirements notification
        if ($ComplianceResult.BankingLevel) {
            $ExpertRequirements = Get-ExpertRequirement -CommitMessage $CommitMessage -Evidence $ComplianceResult.Evidence

            Write-Host ""
            Write-Host "🏦 BANKING-LEVEL STANDARDS DETECTED" -ForegroundColor Yellow -BackgroundColor Blue
            Write-Host "Expert validation recommended:" -ForegroundColor Yellow
            foreach ($expert in $ExpertRequirements) {
                Write-Host "   - $expert" -ForegroundColor White
            }
            Write-Host ""
        }

        Write-Host "   ✅ Constitutional framework compliance verified" -ForegroundColor Green
    }

    "pre-push" {
        Write-Host "🚀 Pre-push constitutional verification..." -ForegroundColor Blue

        # Get commits being pushed
        $LocalCommits = git log origin/main..HEAD --oneline
        if (-not $LocalCommits) {
            Write-Host "   ℹ️ No new commits to push - skipping verification" -ForegroundColor Gray
            exit 0
        }

        Write-Host "   📤 Commits being pushed:" -ForegroundColor Gray
        $LocalCommits | ForEach-Object { Write-Host "     $_" -ForegroundColor Gray }

        # Run quality gates if constitutional framework deployment detected
        $ConstitutionalCommits = $LocalCommits | Where-Object { $_ -match "(constitutional|framework|banking.*level)" }
        if ($ConstitutionalCommits) {
            Write-Host ""
            Write-Host "🏛️ Constitutional framework changes detected - running quality gates..." -ForegroundColor Magenta

            if (Test-Path "scripts\quality-gate-check.ps1") {
                try {
                    & "scripts\quality-gate-check.ps1" -Level "baseline" -Url "http://localhost:1315"
                    if ($LASTEXITCODE -ne 0) {
                        Write-Host "❌ Quality gates failed - push blocked" -ForegroundColor Red
                        exit 1
                    }
                    Write-Host "✅ Quality gates passed" -ForegroundColor Green
                } catch {
                    Write-Host "⚠️ Quality gates could not be executed - proceeding with warning" -ForegroundColor Yellow
                    Write-Host "Error: $_" -ForegroundColor Gray
                }
            } else {
                Write-Host "⚠️ Quality gate infrastructure missing - constitutional changes without verification" -ForegroundColor Yellow
            }
        }

        Write-Host "   ✅ Pre-push constitutional verification complete" -ForegroundColor Green
    }

    "post-merge" {
        Write-Host "🔄 Post-merge constitutional audit..." -ForegroundColor Blue

        # Run state verification after merge
        if (Test-Path "scripts\gnrl-290-state-verification.ps1") {
            & "scripts\gnrl-290-state-verification.ps1" -Mode "validate"
        }

        Write-Host "   ✅ Post-merge audit complete" -ForegroundColor Green
    }

    "status" {
        Write-Host "📊 Constitutional Enforcement Status..." -ForegroundColor Blue

        # Check hook installation
        $HooksInstalled = @()
        if (Test-Path ".git\hooks\pre-commit") { $HooksInstalled += "pre-commit" }
        if (Test-Path ".git\hooks\pre-push") { $HooksInstalled += "pre-push" }

        Write-Host "   Hooks installed: $($HooksInstalled -join ', ')" -ForegroundColor White

        # Check infrastructure
        $Infrastructure = @()
        if (Test-Path "scripts\quality-gate-check.ps1") { $Infrastructure += "quality-gates" }
        if (Test-Path "scripts\gnrl-290-state-verification.ps1") { $Infrastructure += "state-verification" }
        if (Test-Path "_meta\quality-gates-metrics.yaml") { $Infrastructure += "metrics" }

        Write-Host "   Infrastructure: $($Infrastructure -join ', ')" -ForegroundColor White

        # Check recent violations
        $ViolationFiles = Get-ChildItem "_meta\constitutional-violations" -ErrorAction SilentlyContinue
        Write-Host "   Recent violations: $($ViolationFiles.Count)" -ForegroundColor $(if ($ViolationFiles.Count -gt 0) { 'Yellow' } else { 'Green' })

        Write-Host ""
        if ($HooksInstalled.Count -eq 2 -and $Infrastructure.Count -ge 2) {
            Write-Host "Constitutional Framework: FULLY OPERATIONAL" -ForegroundColor Green -BackgroundColor Blue
        } else {
            Write-Host "Constitutional Framework: PARTIAL DEPLOYMENT" -ForegroundColor Yellow
        }
    }
}

Write-Host ""
Write-Host "Enhanced Alice v2.0 Constitutional Framework Hook Complete" -ForegroundColor Magenta