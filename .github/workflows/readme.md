# AGIL-007: CI/CD Pipeline Documentation

## Banking-Level Quality Gates Architecture

### Pipeline Overview

The agile-sapiens CI/CD pipeline implements **6 critical quality gates** with zero-tolerance for failures:

```
Quality Gates → Build → Deploy → Verify
     ↓           ↓        ↓        ↓
  PASS/FAIL   Artifact   VPS   Health Check
     ↓           ↓        ↓        ↓
  Block       Upload   Atomic   Rollback
```

### Quality Gate Enforcement

1. **Hugo Build Validation** — Zero errors tolerance
2. **Level 1 Compliance** — No AI tool mentions (GDPR/EU AI Act)
3. **Voice Gate** — AI writing pattern detection
4. **Schema Validation** — Complete frontmatter compliance
5. **Source Verification** — Banking-level fact checking
6. **Brand Consistency** — FolkUp Brand Guide v2.5

### Deployment Strategy

- **Atomic Operations** — All-or-nothing deployment
- **Rollback Capability** — Immediate revert on failure
- **Health Checks** — Post-deploy verification
- **CDN Purge** — Automatic cache invalidation

### Security Features

- **Sensitive File Detection** — Pre-deployment scan
- **Permission Hardening** — 644/755 enforcement
- **Backup Creation** — Automated versioning
- **Audit Trail** — Complete deployment logging

### Usage

```bash
# Manual validation
npm run validate

# Individual gate testing
npm run validate:level1
npm run validate:voice
npm run validate:schema

# Full pipeline (automated in CI)
git push origin main
```

### Secrets Configuration

Required GitHub Secrets:
- `VPS_HOST` — Production server hostname
- `VPS_USER` — Deployment user
- `VPS_DEPLOY_KEY` — SSH private key
- `CLOUDFLARE_TOKEN` — CDN purge token
- `CLOUDFLARE_ZONE` — Zone identifier

Banking-level standards: **MAINTAINED**