# Setup Replicate API for Cover Generation
# Quick setup script for AGILE SAPIENS cover generation

Write-Host "🚀 AGILE SAPIENS Cover Generation Setup" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green

# Check if token is already set
if ($env:REPLICATE_API_TOKEN) {
    Write-Host "✅ REPLICATE_API_TOKEN is already set" -ForegroundColor Green
    $tokenPreview = $env:REPLICATE_API_TOKEN.Substring(0,[Math]::Min(8, $env:REPLICATE_API_TOKEN.Length)) + "..."
    Write-Host "🔑 Token preview: $tokenPreview" -ForegroundColor Yellow
} else {
    Write-Host "❌ REPLICATE_API_TOKEN not found" -ForegroundColor Red
    Write-Host ""
    Write-Host "📋 TO GET YOUR TOKEN:" -ForegroundColor Cyan
    Write-Host "1. Visit: https://replicate.com/account/api-tokens" -ForegroundColor White
    Write-Host "2. Log in or create account" -ForegroundColor White
    Write-Host "3. Create new token or copy existing one" -ForegroundColor White
    Write-Host ""
    Write-Host "💾 TO SET YOUR TOKEN:" -ForegroundColor Cyan
    Write-Host "PowerShell command: `$env:REPLICATE_API_TOKEN = `"r8_your_actual_token_here`"" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter after setting your token to continue"
}

# Verify setup
Write-Host ""
Write-Host "🔍 Checking setup..." -ForegroundColor Yellow

$checks = @()

# Check Node.js
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
        $checks += $true
    } else {
        Write-Host "❌ Node.js not found" -ForegroundColor Red
        $checks += $false
    }
} catch {
    Write-Host "❌ Node.js not found" -ForegroundColor Red
    $checks += $false
}

# Check emergency script
if (Test-Path "scripts/generate-cover-emergency.js") {
    Write-Host "✅ Emergency generator script available" -ForegroundColor Green
    $checks += $true
} else {
    Write-Host "❌ Emergency generator script missing" -ForegroundColor Red
    $checks += $false
}

# Check output directory
if (Test-Path "static/images") {
    Write-Host "✅ Output directory exists: static/images" -ForegroundColor Green
} else {
    try {
        New-Item -Path "static/images" -ItemType Directory -Force | Out-Null
        Write-Host "✅ Created output directory: static/images" -ForegroundColor Green
    } catch {
        Write-Host "❌ Could not create output directory" -ForegroundColor Red
        $checks += $false
    }
}
$checks += $true

# Check dependencies
try {
    $nodeModulesCheck = Test-Path "node_modules/node-fetch"
    if ($nodeModulesCheck) {
        Write-Host "✅ node-fetch dependency available" -ForegroundColor Green
        $checks += $true
    } else {
        Write-Host "⚠️  Installing node-fetch..." -ForegroundColor Yellow
        npm install node-fetch | Out-Null
        Write-Host "✅ node-fetch installed" -ForegroundColor Green
        $checks += $true
    }
} catch {
    Write-Host "❌ Could not install node-fetch" -ForegroundColor Red
    $checks += $false
}

# Final status
Write-Host ""
if ($checks -notcontains $false) {
    Write-Host "🎉 SETUP COMPLETE!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎨 READY TO GENERATE COVERS:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Test first:" -ForegroundColor White
    Write-Host "  node scripts/generate-cover-emergency.js --dry-run" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Generate 3 variants:" -ForegroundColor White
    Write-Host "  node scripts/generate-cover-emergency.js --variants 3" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Generate single cover:" -ForegroundColor White
    Write-Host "  node scripts/generate-cover-emergency.js --variants 1" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📁 Covers will be saved to: static/images/" -ForegroundColor Green
    Write-Host ""

    if (-not $env:REPLICATE_API_TOKEN) {
        Write-Host "⚠️  Don't forget to set your REPLICATE_API_TOKEN!" -ForegroundColor Yellow
        Write-Host "PowerShell: `$env:REPLICATE_API_TOKEN = `"r8_your_token_here`"" -ForegroundColor Yellow
        Write-Host ""
    }

} else {
    Write-Host "❌ Setup incomplete. Please fix the issues above." -ForegroundColor Red
}

Write-Host "📖 For full infrastructure setup, see: SOPS_SETUP_INSTRUCTIONS.md" -ForegroundColor Cyan