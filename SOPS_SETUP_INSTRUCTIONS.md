# SOPS Infrastructure Setup Instructions

## Current Status: ❌ MISSING INFRASTRUCTURE
- ✅ SOPS binary installed at `%TEMP%\sops.exe`
- ❌ Vault file `vault/secrets/replicate.enc.yaml` not found
- ❌ Age encryption keys not configured
- ❌ REPLICATE_API_TOKEN not accessible

## Immediate Solutions (Choose One)

### Solution 1: Manual Environment Variable (FASTEST) ⚡
```powershell
# Set token directly (replace with actual token)
$env:REPLICATE_API_TOKEN = "your_actual_replicate_token_here"

# Test the cover generation
node scripts/generate-cover-flux-literary.cjs --dry-run
```

### Solution 2: Create Local Config File (INTERMEDIATE) 📁
```powershell
# Create local config directory
New-Item -Path "vault/secrets" -ItemType Directory -Force

# Create unencrypted config (for development only)
@"
replicate:
  api_token: "your_actual_replicate_token_here"
"@ | Out-File -FilePath "vault/secrets/replicate.yaml" -Encoding UTF8

# Use direct YAML parsing in scripts instead of SOPS
```

### Solution 3: Complete SOPS Setup (INFRASTRUCTURE) 🔧
```powershell
# 1. Install age for encryption
$ageUrl = "https://github.com/FiloSottile/age/releases/download/v1.1.1/age-v1.1.1-windows-amd64.zip"
$tempDir = $env:TEMP
Invoke-WebRequest -Uri $ageUrl -OutFile "$tempDir\age.zip"
Expand-Archive "$tempDir\age.zip" -DestinationPath "$tempDir\age"

# 2. Generate age key
& "$tempDir\age\age\age-keygen.exe" -o "$env:USERPROFILE\.age\keys.txt"

# 3. Create SOPS config
@"
creation_rules:
  - path_regex: vault/secrets/.*\.enc\.yaml$
    age: >-
      age1your_generated_public_key_here
"@ | Out-File -FilePath ".sops.yaml" -Encoding UTF8

# 4. Create encrypted vault
@"
replicate:
  api_token: your_actual_replicate_token_here
"@ | Out-File -FilePath "vault/secrets/replicate.yaml" -Encoding UTF8

# 5. Encrypt with SOPS
& "$tempDir\sops.exe" -e -i vault/secrets/replicate.yaml
Move-Item vault/secrets/replicate.yaml vault/secrets/replicate.enc.yaml
```

## Current System Diagnostics

### ✅ Working Components
- Windows 11 Home (Build 26100)
- PowerShell 5.1
- Node.js 22.11.0
- NPM available
- SOPS 3.8.1 installed
- GitHub connectivity

### ❌ Missing Components
- Age encryption binary
- Age keys
- SOPS configuration (.sops.yaml)
- Encrypted vault file
- Package managers (winget, choco, scoop)

## Recommended Action Plan

**For immediate cover generation:**
1. Use Solution 1 - set environment variable directly
2. Keep token secure and don't commit to git
3. Run cover generation script

**For permanent infrastructure:**
1. Set up proper age encryption
2. Create encrypted vault in separate infrastructure repository
3. Configure CI/CD secrets properly

## Security Notes
- Never commit unencrypted tokens to git
- Use separate infrastructure repository for encrypted secrets
- Consider using GitHub Secrets for CI/CD workflows
- Rotate tokens periodically

## Next Steps
1. Get actual Replicate API token from account
2. Choose solution approach based on needs
3. Test cover generation with `--dry-run` first
4. Generate cover variants for publication