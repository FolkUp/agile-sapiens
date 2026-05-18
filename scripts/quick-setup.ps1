# Quick Setup for Replicate Cover Generation
# Simple version without emojis for PowerShell compatibility

Write-Host "AGILE SAPIENS Cover Generation Setup" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green

# Check current token status
if ($env:REPLICATE_API_TOKEN) {
    $tokenLength = $env:REPLICATE_API_TOKEN.Length
    $preview = $env:REPLICATE_API_TOKEN.Substring(0, [Math]::Min(8, $tokenLength)) + "..."
    Write-Host "[OK] REPLICATE_API_TOKEN is set (${tokenLength} chars, preview: ${preview})" -ForegroundColor Green
} else {
    Write-Host "[MISSING] REPLICATE_API_TOKEN not found" -ForegroundColor Red
    Write-Host ""
    Write-Host "TO GET YOUR TOKEN:" -ForegroundColor Cyan
    Write-Host "1. Visit: https://replicate.com/account/api-tokens"
    Write-Host "2. Create or copy your API token"
    Write-Host ""
    Write-Host "TO SET YOUR TOKEN:" -ForegroundColor Yellow
    Write-Host "`$env:REPLICATE_API_TOKEN = `"your_actual_token_here`""
    Write-Host ""
    Read-Host "Press Enter after setting token to continue"
}

Write-Host ""
Write-Host "Checking system requirements..." -ForegroundColor Yellow

$allGood = $true

# Check Node.js
try {
    $nodeVer = & node --version 2>$null
    Write-Host "[OK] Node.js version: $nodeVer" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Node.js not found" -ForegroundColor Red
    $allGood = $false
}

# Check script exists
if (Test-Path "scripts/generate-cover-emergency.js") {
    Write-Host "[OK] Emergency cover generator script found" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Emergency script missing" -ForegroundColor Red
    $allGood = $false
}

# Ensure output directory
if (-not (Test-Path "static/images")) {
    try {
        New-Item -Path "static/images" -ItemType Directory -Force | Out-Null
        Write-Host "[CREATED] Output directory: static/images" -ForegroundColor Green
    } catch {
        Write-Host "[ERROR] Cannot create output directory" -ForegroundColor Red
        $allGood = $false
    }
} else {
    Write-Host "[OK] Output directory exists: static/images" -ForegroundColor Green
}

Write-Host ""
if ($allGood) {
    Write-Host "SETUP COMPLETE - Ready to generate covers!" -ForegroundColor Green
    Write-Host ""
    Write-Host "COMMANDS TO USE:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Test (dry run):"
    Write-Host "  node scripts/generate-cover-emergency.js --dry-run" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Generate covers:"
    Write-Host "  node scripts/generate-cover-emergency.js --variants 3" -ForegroundColor Yellow
    Write-Host ""
    if (-not $env:REPLICATE_API_TOKEN) {
        Write-Host "REMINDER: Set your token first!" -ForegroundColor Red
        Write-Host "`$env:REPLICATE_API_TOKEN = `"your_token_here`"" -ForegroundColor Yellow
    }
} else {
    Write-Host "SETUP INCOMPLETE - Fix errors above first" -ForegroundColor Red
}

Write-Host ""
Write-Host "See INFRASTRUCTURE_DIAGNOSIS_REPORT.md for detailed info" -ForegroundColor Cyan