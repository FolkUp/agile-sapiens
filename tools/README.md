# tools/ — local development utilities (NOT tracked in git)

This directory holds local development binaries used by contributors on their own machines. Binaries are intentionally **not tracked in git** to keep clone weight low and to avoid distributing third-party executables through the repo.

## sops.exe

[SOPS (Secrets OPerationS)](https://github.com/getsops/sops) is required for editing the encrypted vault files under `vault/*.enc.yaml`. The binary used to be checked in (~22 MB); as of SEC-002 (2026-05-20) it is untracked.

### Install on Windows

Pick one of the following:

```powershell
# winget (recommended)
winget install Mozilla.SOPS

# Chocolatey
choco install sops

# Manual: download the latest sops-vX.Y.Z.windows-amd64.exe
#   https://github.com/getsops/sops/releases
# Rename it to sops.exe and place in this tools/ directory.
```

### Version pinning

For reproducibility, pin to a specific release and verify the SHA256 against the checksums published on the [releases page](https://github.com/getsops/sops/releases).

For reference: the binary previously tracked in this repo had SHA256 `fe1f6299294b47ceda565e1091e843ee3f3db58764901d4298eb00558189e25f`.

### Usage

See `vault/` for encrypted files and `.sops.yaml` (if present in your local checkout) for key configuration. Typical edit flow:

```powershell
.\tools\sops.exe vault\<name>.enc.yaml
```
