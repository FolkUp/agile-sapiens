# AGILE SAPIENS Quality Gate Verification Script
# ADR-03-05 Banking-Level Standards Check
# Usage: .\scripts\quality-gate-check.ps1 [level] [url]

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("1", "2", "3", "baseline")]
    [string]$Level,

    [string]$Url = "http://localhost:1315",

    [switch]$Detailed
)

# Load metrics from YAML (simplified PowerShell parsing)
$MetricsFile = "_meta\quality-gates-metrics.yaml"
if (-not (Test-Path $MetricsFile)) {
    Write-Error "Metrics file not found: $MetricsFile"
    exit 1
}

Write-Host "=== AGILE SAPIENS Quality Gate Check ===" -ForegroundColor Cyan
Write-Host "Level: $Level | URL: $Url" -ForegroundColor Yellow
Write-Host ""

# 1. Build Performance Check
Write-Host "1. Build Performance..." -ForegroundColor Green
$BuildStart = Get-Date
hugo --gc --minify --quiet
$BuildEnd = Get-Date
$BuildTime = ($BuildEnd - $BuildStart).TotalSeconds

Write-Host "   Build Time: $([math]::Round($BuildTime, 2))s" -ForegroundColor White

# Thresholds by level
$BuildThresholds = @{
    "baseline" = 6.8
    "1" = 8.0
    "2" = 9.0
    "3" = 10.0
}

if ($BuildTime -le $BuildThresholds[$Level]) {
    Write-Host "   ✅ Build Performance PASS" -ForegroundColor Green
    $BuildPass = $true
} else {
    Write-Host "   ❌ Build Performance FAIL (>${$BuildThresholds[$Level]}s)" -ForegroundColor Red
    $BuildPass = $false
}

# 2. Lighthouse Performance Check
Write-Host "`n2. Lighthouse Performance..." -ForegroundColor Green
try {
    $LighthouseResult = lighthouse $Url --output json --quiet | ConvertFrom-Json
    $PerfScore = [math]::Round($LighthouseResult.categories.performance.score * 100)
    $A11yScore = [math]::Round($LighthouseResult.categories.accessibility.score * 100)

    Write-Host "   Performance Score: $PerfScore/100" -ForegroundColor White
    Write-Host "   Accessibility Score: $A11yScore/100" -ForegroundColor White

    # Level thresholds
    $PerfThresholds = @{
        "baseline" = 85
        "1" = 90
        "2" = 92
        "3" = 88
    }

    if ($PerfScore -ge $PerfThresholds[$Level] -and $A11yScore -ge 95) {
        Write-Host "   ✅ Lighthouse PASS" -ForegroundColor Green
        $LighthousePass = $true
    } else {
        Write-Host "   ❌ Lighthouse FAIL (Performance: ${$PerfThresholds[$Level]}+, A11y: 95+)" -ForegroundColor Red
        $LighthousePass = $false
    }
} catch {
    Write-Host "   ⚠️ Lighthouse test failed - server not available" -ForegroundColor Yellow
    $LighthousePass = $false
}

# 3. Accessibility Check (axe-core)
Write-Host "`n3. Accessibility Violations..." -ForegroundColor Green
try {
    $AxeResult = axe $Url --format json | ConvertFrom-Json
    $Violations = $AxeResult.violations.Count

    Write-Host "   Violations Found: $Violations" -ForegroundColor White

    if ($Violations -eq 0) {
        Write-Host "   ✅ Accessibility PASS (Zero violations)" -ForegroundColor Green
        $AccessibilityPass = $true
    } else {
        Write-Host "   ❌ Accessibility FAIL ($Violations violations found)" -ForegroundColor Red
        $AccessibilityPass = $false

        if ($Detailed) {
            Write-Host "   Violation Details:" -ForegroundColor Yellow
            foreach ($violation in $AxeResult.violations) {
                Write-Host "   - $($violation.id): $($violation.description)" -ForegroundColor Gray
            }
        }
    }
} catch {
    Write-Host "   ⚠️ Axe-core test failed - server not available" -ForegroundColor Yellow
    $AccessibilityPass = $false
}

# 4. Summary
Write-Host "`n=== QUALITY GATE SUMMARY ===" -ForegroundColor Cyan
Write-Host "Build Performance: $(if($BuildPass){'✅ PASS'}else{'❌ FAIL'})" -ForegroundColor $(if($BuildPass){'Green'}else{'Red'})
Write-Host "Lighthouse Check: $(if($LighthousePass){'✅ PASS'}else{'❌ FAIL'})" -ForegroundColor $(if($LighthousePass){'Green'}else{'Red'})
Write-Host "Accessibility: $(if($AccessibilityPass){'✅ PASS'}else{'❌ FAIL'})" -ForegroundColor $(if($AccessibilityPass){'Green'}else{'Red'})

$OverallPass = $BuildPass -and $LighthousePass -and $AccessibilityPass

Write-Host "`nOverall Level $Level Quality Gate: $(if($OverallPass){'✅ PASS'}else{'❌ FAIL'})" -ForegroundColor $(if($OverallPass){'Green'}else{'Red'})

# Return exit code for CI integration
if (-not $OverallPass) {
    exit 1
}

Write-Host "`n🎉 Level $Level enhancement approved for deployment!" -ForegroundColor Green