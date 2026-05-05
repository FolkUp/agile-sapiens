# GNRL-290 Simple Integration Test
# Enhanced Alice v2.0 Level 3 Constitutional Framework Verification

param(
    [ValidateSet("smoke", "integration", "full")]
    [string]$TestSuite = "smoke"
)

Write-Host "=== GNRL-290 Integration Test Suite ===" -ForegroundColor Cyan
Write-Host "Test Suite: $TestSuite" -ForegroundColor Yellow
Write-Host ""

$TestResults = @{
    Passed = 0
    Failed = 0
    Details = @()
}

function Assert-Test {
    param(
        [string]$TestName,
        [bool]$Condition,
        [string]$Message = ""
    )

    if ($Condition) {
        Write-Host "   PASS: $TestName" -ForegroundColor Green
        $TestResults.Passed++
        $TestResults.Details += @{ Test = $TestName; Result = "PASS"; Message = $Message }
    } else {
        Write-Host "   FAIL: $TestName" -ForegroundColor Red
        if ($Message) { Write-Host "      $Message" -ForegroundColor Gray }
        $TestResults.Failed++
        $TestResults.Details += @{ Test = $TestName; Result = "FAIL"; Message = $Message }
    }
}

# Test 1: Core Files Exist
Write-Host "1. Core Files Test..." -ForegroundColor Blue

$CoreFiles = @(
    "scripts\gnrl-290-simple.ps1",
    "scripts\constitutional-hooks-simple.ps1",
    "BACKLOG.yaml"
)

foreach ($file in $CoreFiles) {
    Assert-Test "File exists: $file" (Test-Path $file)
}

# Test 2: System Execution
Write-Host ""
Write-Host "2. System Execution Test..." -ForegroundColor Blue

try {
    $Result = & "scripts\gnrl-290-simple.ps1" -Mode "validate" 2>&1
    $SystemWorking = ($Result -match "VERIFICATION COMPLETE").Count -gt 0
    Assert-Test "GNRL-290 system execution" $SystemWorking "System should complete verification"
} catch {
    Assert-Test "GNRL-290 system execution" $false "Fatal execution error: $_"
}

# Test 3: Constitutional Hooks
Write-Host ""
Write-Host "3. Constitutional Hooks Test..." -ForegroundColor Blue

try {
    $HookResult = & "scripts\constitutional-hooks-simple.ps1" -Hook "status" 2>&1
    $HooksWorking = ($HookResult -match "Constitutional Framework").Count -gt 0
    Assert-Test "Constitutional hooks execution" $HooksWorking "Hooks should report status"
} catch {
    Assert-Test "Constitutional hooks execution" $false "Hook execution error: $_"
}

# Test 4: BACKLOG Structure
Write-Host ""
Write-Host "4. BACKLOG Structure Test..." -ForegroundColor Blue

if (Test-Path "BACKLOG.yaml") {
    $BacklogContent = Get-Content "BACKLOG.yaml" -Raw

    $HasConstitutional = $BacklogContent -match "constitutional_review"
    Assert-Test "BACKLOG constitutional structure" $HasConstitutional

    $HasGNRL290 = $BacklogContent -match "GNRL-290"
    Assert-Test "GNRL-290 task documented" $HasGNRL290

    $HasEvidence = $BacklogContent -match "evidence:"
    Assert-Test "Evidence structure present" $HasEvidence
} else {
    Assert-Test "BACKLOG file exists" $false "BACKLOG.yaml not found"
}

# Test 5: Integration Test
if ($TestSuite -in @("integration", "full")) {
    Write-Host ""
    Write-Host "5. Phantom Detection Test..." -ForegroundColor Blue

    # Create test BACKLOG with phantom completion
    $PhantomBacklog = @"
tasks:
  - id: "TEST-PHANTOM"
    status: "done"
    description: "Constitutional enforcement hooks installed - performance 247ms"
"@

    $TestFile = "BACKLOG-test-phantom.yaml"
    $PhantomBacklog | Out-File $TestFile -Encoding UTF8

    try {
        $PhantomResult = & "scripts\gnrl-290-simple.ps1" -BacklogPath $TestFile -Mode "validate" 2>&1
        $PhantomDetected = $PhantomResult -match "PHANTOM|FABRICATED"
        Assert-Test "Phantom completion detection" $PhantomDetected "Should detect GNRL-281 patterns"
    } finally {
        if (Test-Path $TestFile) { Remove-Item $TestFile }
    }
}

# Test Results Summary
Write-Host ""
Write-Host "=== Test Results ===" -ForegroundColor Cyan
Write-Host "Passed: $($TestResults.Passed)" -ForegroundColor Green
Write-Host "Failed: $($TestResults.Failed)" -ForegroundColor Red

$SuccessRate = if ($TestResults.Passed + $TestResults.Failed -gt 0) {
    [math]::Round(($TestResults.Passed / ($TestResults.Passed + $TestResults.Failed)) * 100, 1)
} else { 100 }

$OverallSuccess = $TestResults.Failed -eq 0

Write-Host "Success Rate: $SuccessRate%" -ForegroundColor $(if ($SuccessRate -ge 90) { 'Green' } else { 'Yellow' })
Write-Host "Overall Result: $(if ($OverallSuccess) { 'PASS' } else { 'FAIL' })" -ForegroundColor $(if ($OverallSuccess) { 'Green' } else { 'Red' })

if ($TestResults.Failed -gt 0) {
    Write-Host ""
    Write-Host "Failed Tests:" -ForegroundColor Red
    $TestResults.Details | Where-Object { $_.Result -eq "FAIL" } | ForEach-Object {
        Write-Host "   - $($_.Test): $($_.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "GNRL-290 Constitutional Framework Test Complete" -ForegroundColor Magenta

if (-not $OverallSuccess) {
    exit 1
}