# Infrastructure — AGILE SAPIENS

Load testing, CDN configuration, and performance baseline for 500K daily visitor capacity.

## Quick Start

```bash
# 1. Install k6
winget install k6 --source winget   # Windows
brew install k6                      # macOS

# 2. Configure Cloudflare
export CLOUDFLARE_TOKEN="your-token"
export CLOUDFLARE_ZONE="your-zone-id"
bash infrastructure/scripts/cloudflare-configure.sh apply

# 3. Run baseline test
k6 run infrastructure/scripts/k6-baseline.js

# 4. Run full suite
bash infrastructure/scripts/run-all-tests.sh
```

## Documents

| File | Purpose |
|------|---------|
| `load-testing-plan.md` | Test scenarios, methodology, success criteria |
| `cdn-fallback-strategy.md` | Cache rules, rate limiting, emergency playbook |
| `performance-baseline.md` | CWV targets, resource budgets, monitoring |

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/k6-baseline.js` | Quick 60s baseline (10 VUs) |
| `scripts/k6-gradual-ramp.js` | Scenario A: Gradual ramp to 1000 VUs |
| `scripts/k6-sustained-load.js` | Scenario C: 500K/day simulation (30 min) |
| `scripts/k6-chapter-spike.js` | Scenario D: Chapter publication spike |
| `scripts/k6-spike-test.js` | Scenario B: Viral spike (3000 VUs) |
| `scripts/k6-backlash.js` | Scenario E: Stress test (5000 VUs) |
| `scripts/cloudflare-configure.sh` | Cloudflare API configuration |
| `scripts/warm-cache.sh` | CDN cache warming after deploy |
| `scripts/run-all-tests.sh` | Run all scenarios in sequence |

## Emergency Commands

```bash
# Enable Under Attack Mode
bash infrastructure/scripts/cloudflare-configure.sh emergency-on

# Restore normal mode
bash infrastructure/scripts/cloudflare-configure.sh emergency-off

# Purge and rewarm cache
npm run purge-cache && bash infrastructure/scripts/warm-cache.sh --verify
```
