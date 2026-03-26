# Load Testing Plan — AGILE SAPIENS 500K Capacity

**Task:** AGIL-019
**Target:** sapiens.folkup.life
**Stack:** Hugo SSG v0.155.2 + Hextra + Cloudflare CDN (Pro)
**Capacity Goal:** 500,000 unique visitors within 24 hours
**Date:** 2026-03-26

---

## 1. Test Methodology

### 1.1 Tool Selection: k6 (Grafana)

**Why k6:**
- Open source, no vendor lock-in (Apache 2.0)
- JavaScript-based scripts (aligns with project tooling)
- Built-in metrics, thresholds, and checks
- Supports distributed execution via k6 Cloud or self-hosted
- Low resource footprint for local execution
- Native Cloudflare-aware testing (honors CF headers)

**Installation:**
```bash
# macOS
brew install k6

# Windows (winget)
winget install k6 --source winget

# Docker (recommended for CI)
docker run --rm -i grafana/k6 run - <script.js
```

### 1.2 Test Environment

| Parameter | Value |
|-----------|-------|
| Target URL | `https://sapiens.folkup.life` |
| Origin | VPS behind Cloudflare proxy |
| CDN | Cloudflare Pro (orange-cloud ON) |
| Test runner | Local machine OR dedicated VPS |
| Regions | Single-region first, multi-region for spike |

**Pre-test checklist:**
- [ ] Cloudflare cache warmed (hit all pages once)
- [ ] Origin server monitoring active (CPU, RAM, bandwidth)
- [ ] Cloudflare Analytics dashboard open
- [ ] Rate limiting rules temporarily adjusted for test IPs
- [ ] Test runner IP whitelisted in Cloudflare WAF

---

## 2. Test Scenarios

### 2.1 Scenario A — Gradual Ramp (Baseline)

**Purpose:** Establish baseline performance, find saturation point.

```
Stages:
  0-2 min:   0 → 100 VUs (warm-up)
  2-5 min:   100 → 500 VUs (ramp)
  5-10 min:  500 VUs sustained
  10-15 min: 500 → 1000 VUs (push)
  15-20 min: 1000 VUs sustained
  20-22 min: 1000 → 0 VUs (cool-down)

Expected traffic: ~200 req/s at peak
```

**What we measure:**
- Response time percentiles (p50, p95, p99)
- Error rate at each stage
- Cloudflare cache hit ratio (CF-Cache-Status header)
- Time to first byte (TTFB) degradation curve

### 2.2 Scenario B — Spike Test (Viral Moment)

**Purpose:** Simulate Reddit/HN frontpage or social media viral spike.

```
Stages:
  0-1 min:   0 → 50 VUs (normal traffic)
  1-2 min:   50 → 3000 VUs (viral spike, 60x increase)
  2-5 min:   3000 VUs sustained (peak viral)
  5-7 min:   3000 → 500 VUs (natural decay)
  7-10 min:  500 VUs sustained (sustained interest)
  10-11 min: 500 → 0 VUs (cool-down)

Expected traffic: ~1500 req/s at spike peak
```

**What we measure:**
- Recovery time after spike onset
- Error rate during ramp-up phase (first 60 seconds critical)
- Cloudflare 429/503 responses
- Origin server load (should be near-zero for cached content)

### 2.3 Scenario C — Sustained Load (24-Hour Simulation)

**Purpose:** Verify 500K capacity over 24 hours (compressed to 30 min).

```
Math: 500,000 visitors / 86,400 seconds = ~5.8 req/s average
Peak multiplier: 3x during prime hours = ~17 req/s
With page depth 3.5 pages/visit = ~60 req/s peak

Stages:
  0-2 min:   0 → 200 VUs (morning ramp)
  2-10 min:  200 VUs (morning plateau)
  10-15 min: 200 → 400 VUs (afternoon peak)
  15-20 min: 400 VUs (peak sustained)
  20-25 min: 400 → 150 VUs (evening decay)
  25-30 min: 150 VUs (night traffic)

Expected traffic: ~60 req/s average, ~200 req/s peak
```

**What we measure:**
- Total requests served without error
- Cache hit ratio stability over time
- Memory/CPU trends on origin (flat = healthy)
- Any time-based degradation patterns

### 2.4 Scenario D — Chapter Publication Spike

**Purpose:** Simulate first 24 hours after new chapter publication.

```
Pattern: Newsletter notification → social shares → search indexing

Stages:
  0-1 min:   0 → 100 VUs (newsletter opens)
  1-3 min:   100 → 800 VUs (social sharing cascade)
  3-5 min:   800 → 2000 VUs (viral amplification)
  5-10 min:  2000 VUs sustained (peak interest)
  10-15 min: 2000 → 500 VUs (natural decay)
  15-20 min: 500 → 200 VUs (long tail)

Page distribution:
  - 60% → new chapter URL
  - 20% → homepage
  - 10% → previous chapters
  - 10% → legal/about pages
```

### 2.5 Scenario E — Backlash/Coordinated Traffic

**Purpose:** Simulate industry backlash with aggressive access patterns.

```
Stages:
  0-1 min:   0 → 500 VUs (organic discovery)
  1-2 min:   500 → 5000 VUs (forum/social coordinated)
  2-5 min:   5000 VUs (sustained anger-traffic)
  5-8 min:   5000 → 1000 VUs (fatigue)
  8-10 min:  1000 → 200 VUs (residual)

Behavior:
  - 40% single-page bounces (rage-clicks)
  - 30% deep reading (genuine interest from controversy)
  - 20% rapid page cycling (looking for ammunition)
  - 10% asset-heavy (downloading images for screenshots)
```

---

## 3. Success Criteria

### 3.1 Performance Thresholds

| Metric | Target | Critical Limit | Action if Exceeded |
|--------|--------|---------------|-------------------|
| p50 response time | < 100ms | < 200ms | Investigate CDN config |
| p95 response time | < 300ms | < 500ms | Review origin load |
| p99 response time | < 800ms | < 1500ms | Enable under-attack mode |
| Error rate (4xx) | < 0.1% | < 1% | Check rate limiting rules |
| Error rate (5xx) | 0% | < 0.01% | Origin health alert |
| Throughput | > 1000 req/s | > 500 req/s | CDN misconfiguration |
| TTFB (cached) | < 50ms | < 100ms | Edge caching issue |
| TTFB (uncached) | < 300ms | < 500ms | Origin performance |
| Cache hit ratio | > 95% | > 85% | Review cache rules |

### 3.2 Capacity Verification

**500K Target Calculation:**
```
500,000 visitors × 3.5 pages/visit = 1,750,000 page views
1,750,000 / 86,400 seconds = 20.25 req/s average
Peak (3x multiplier): 60.75 req/s
With assets (CSS, JS, images): ~300 req/s peak total

Required CDN capacity: 300 req/s sustained, 1500 req/s burst
Cloudflare Pro: effectively unlimited for static content
```

**Pass criteria for 500K verification:**
- All scenarios A-E complete with thresholds met
- Zero origin 5xx errors during any scenario
- Cache hit ratio > 95% across all scenarios
- No Cloudflare 429 responses to legitimate traffic patterns

### 3.3 Graceful Degradation Criteria

| Load Level | Expected Behavior |
|-----------|-------------------|
| Normal (< 100 req/s) | Full site, all features |
| Elevated (100-500 req/s) | Full site, cache priority |
| High (500-1500 req/s) | Rate limiting for abusive patterns |
| Critical (> 1500 req/s) | Static-only mode, non-essential assets deferred |
| Emergency (> 5000 req/s) | Under Attack Mode, JS challenge |

---

## 4. Monitoring During Tests

### 4.1 Cloudflare Dashboard

- **Analytics > Traffic:** requests/second, bandwidth, cache ratio
- **Analytics > Security:** blocked requests, WAF triggers
- **Analytics > Performance:** TTFB distribution by colo
- **Firewall > Events:** rate limiting triggers, challenge events

### 4.2 Origin Server

```bash
# Real-time monitoring commands (run on VPS)
htop                           # CPU/RAM
iftop -n                       # Bandwidth
tail -f /var/log/nginx/access.log | grep -c "200"  # Request rate
tail -f /var/log/nginx/error.log                     # Errors
```

### 4.3 k6 Real-Time Output

```bash
# k6 with real-time dashboard
k6 run --out dashboard script.js

# k6 with JSON output for post-analysis
k6 run --out json=results.json script.js
```

### 4.4 Post-Test Analysis

After each scenario:
1. Export k6 results to JSON
2. Screenshot Cloudflare Analytics for the test window
3. Capture origin server resource usage graphs
4. Document any anomalies or unexpected behaviors
5. Compare against success criteria table

---

## 5. Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| Cloudflare rate-limits test traffic | Medium | Test invalidated | Whitelist test IPs, coordinate with CF support |
| Origin overload during uncached test | Low | Origin downtime | Origin shield enabled, test with cache warm |
| Test triggers WAF/DDoS protection | Medium | False positives | Adjust WAF sensitivity before test, restore after |
| Neighbor VPS complaints (shared host) | Low | ISP notice | Use dedicated test window, notify host |
| Test runner bandwidth limit | Medium | Incomplete test | Use cloud-based k6 for high-VU scenarios |

### Rollback Procedures

If testing causes issues:
1. **Immediate:** Stop k6 test (Ctrl+C or kill process)
2. **If origin degraded:** Cloudflare → Enable "Under Attack Mode"
3. **If CDN issues:** Purge cache via `npm run purge-cache`
4. **Recovery verification:** Check site accessibility from 3+ locations
5. **Post-incident:** Document in test results, adjust thresholds

---

## 6. Execution Schedule

| Order | Scenario | Duration | Prerequisites |
|-------|----------|----------|--------------|
| 1 | A: Gradual Ramp | 22 min | Cache warm, monitoring active |
| 2 | Analysis pause | 15 min | Review results, adjust if needed |
| 3 | C: Sustained Load | 30 min | Baseline established from A |
| 4 | Analysis pause | 15 min | Verify sustained stability |
| 5 | D: Chapter Spike | 20 min | Sustained load validated |
| 6 | B: Spike Test | 11 min | All previous passed |
| 7 | E: Backlash | 10 min | Spike handling validated |
| 8 | Final analysis | 30 min | All scenarios complete |

**Total estimated time:** ~2.5 hours including analysis pauses.

---

## 7. Pre-Test Checklist

- [ ] k6 installed and verified on test runner
- [ ] Test scripts reviewed and dry-run completed (1 VU, 10s)
- [ ] Cloudflare cache warmed (all pages loaded)
- [ ] Origin monitoring tools active
- [ ] Cloudflare Analytics dashboard open
- [ ] Test runner IP whitelisted in Cloudflare WAF
- [ ] Rate limiting rules documented (current state)
- [ ] Team notified of test window
- [ ] Rollback procedures understood
- [ ] Results storage prepared (JSON output directory)
