# Performance Baseline — AGILE SAPIENS

**Task:** AGIL-019
**Target:** sapiens.folkup.life
**Stack:** Hugo SSG v0.155.2 + Hextra + Cloudflare CDN (Pro)
**Date:** 2026-03-26

---

## 1. Current Site Profile

### 1.1 Content Inventory

| Content Type | Count | Notes |
|-------------|-------|-------|
| Chapter pages | 2 | Chapter 0 (pilot), Chapter 1 |
| Index pages | 4 | Home, chapters, archive, docs |
| Legal pages | 4 | Privacy, terms, AI transparency, editorial workflow, UGC moderation |
| Total pages | ~11 | Expected to grow to 25+ chapters |

### 1.2 Technology Profile

| Component | Version/Type | Performance Impact |
|-----------|-------------|-------------------|
| Hugo SSG | v0.155.2 | Pre-built static HTML (zero server processing) |
| Theme | Hextra | Modern, optimized for docs/reading |
| Images | WebP format | ~30-50% smaller than JPEG |
| Lazy loading | Implemented | Reduces initial page weight |
| CSS/JS | Hugo bundled | Minified in production build |
| CDN | Cloudflare Pro | Edge caching, Brotli compression |

---

## 2. Core Web Vitals Targets

### 2.1 Google CWV Thresholds

| Metric | Good | Needs Improvement | Poor | Our Target |
|--------|------|-------------------|------|-----------|
| **LCP** (Largest Contentful Paint) | < 2.5s | 2.5-4.0s | > 4.0s | **< 1.5s** |
| **INP** (Interaction to Next Paint) | < 200ms | 200-500ms | > 500ms | **< 100ms** |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 0.1-0.25 | > 0.25 | **< 0.05** |

### 2.2 Extended Performance Targets

| Metric | Target | Rationale |
|--------|--------|-----------|
| **TTFB** (Time to First Byte) | < 50ms (cached) | Cloudflare edge should serve instantly |
| **FCP** (First Contentful Paint) | < 1.0s | Static HTML renders fast |
| **Speed Index** | < 1.5s | Minimal JS, no client-side rendering |
| **Total Blocking Time** | < 50ms | Near-zero JS execution |
| **Page weight (HTML)** | < 50 KB | Hugo generates clean HTML |
| **Page weight (total)** | < 300 KB | CSS + fonts + minimal images |
| **Requests per page** | < 20 | Consolidated assets |

### 2.3 Why These Targets Are Achievable

Hugo SSG with Hextra generates purely static HTML. There is:
- No server-side rendering delay
- No JavaScript framework hydration
- No API calls for content
- No database queries
- Minimal JS (theme interactivity only)

This puts AGILE SAPIENS in the top tier of web performance by default. The CDN layer should make response times virtually instantaneous for cached content.

---

## 3. Resource Loading Benchmarks

### 3.1 Critical Rendering Path

```
1. HTML document         (~15-30 KB gzipped)
   └─ 2. CSS bundle     (~10-20 KB gzipped)
   └─ 3. Fonts          (~30-50 KB per font, WOFF2)
   └─ 4. Hero image     (if present, WebP, lazy-loaded)
   └─ 5. JS bundle      (~5-15 KB gzipped, deferred)
```

**Target critical path time:** < 800ms on 4G connection

### 3.2 Asset Size Budget

| Asset Category | Budget | Measurement |
|---------------|--------|-------------|
| HTML (per page) | < 50 KB | Uncompressed |
| CSS (total) | < 80 KB | Uncompressed (< 15 KB gzipped) |
| JavaScript (total) | < 50 KB | Uncompressed (< 12 KB gzipped) |
| Fonts | < 150 KB | WOFF2, subset if possible |
| Images (per page) | < 200 KB | WebP, lazy-loaded below fold |
| **Total page budget** | **< 500 KB** | First load, no cache |

### 3.3 Compression Targets

| Format | Expected Ratio | Notes |
|--------|---------------|-------|
| HTML (Brotli) | 5-8x | Cloudflare auto-Brotli |
| CSS (Brotli) | 5-7x | Hugo minification + Brotli |
| JS (Brotli) | 4-6x | Already minified by Hugo |
| WOFF2 | Pre-compressed | No further compression needed |
| WebP | N/A | Already optimized format |

---

## 4. Caching Effectiveness Metrics

### 4.1 Cache Hit Ratio Targets

| Content Type | Target Hit Ratio | TTL Strategy |
|-------------|-----------------|-------------|
| Static assets (CSS/JS/fonts) | > 99% | 1 year (immutable, fingerprinted) |
| Images | > 98% | 6 months |
| HTML pages (established) | > 95% | 4 hours edge, 1 hour browser |
| HTML pages (new chapter) | > 80% (first hour) | 2 hours edge, 30 min browser |
| Overall site | > 95% | Weighted average |

### 4.2 Cache Warm-Up Timeline

After a full cache purge:

| Time | Expected Cache Hit Ratio | Notes |
|------|------------------------|-------|
| T+0 min | 0% | All requests go to origin |
| T+5 min | 40-60% | Major pages cached at popular PoPs |
| T+15 min | 70-80% | Most PoPs have homepage + chapters |
| T+1 hour | 90%+ | Long-tail PoPs filling |
| T+4 hours | 95%+ | Full steady-state |

### 4.3 Bandwidth Savings

| Scenario | Without CDN | With CDN (95% hit) | Savings |
|----------|------------|-------------------|---------|
| 10K visitors/day | ~15 GB | ~750 MB origin | 95% |
| 100K visitors/day | ~150 GB | ~7.5 GB origin | 95% |
| 500K visitors/day | ~750 GB | ~37.5 GB origin | 95% |

Origin server requirement: < 40 GB/day bandwidth even at 500K visitors.

---

## 5. Performance Measurement Tools

### 5.1 Automated Checks (Repeatable)

| Tool | What it Measures | How to Run |
|------|-----------------|-----------|
| **Lighthouse** (Chrome DevTools) | CWV, Performance score, Accessibility | DevTools > Lighthouse > Run |
| **PageSpeed Insights** | CWV (lab + field), Opportunities | pagespeed.web.dev |
| **WebPageTest** | Waterfall, TTFB, multi-location | webpagetest.org |
| **GTmetrix** | Performance grades, recommendations | gtmetrix.com |
| **k6** (load testing) | Throughput, response times, errors | `k6 run script.js` |

### 5.2 Baseline Measurement Protocol

**Step 1: Lab measurements (pre-traffic)**
```bash
# Run from 3 different locations/tools:
# 1. Lighthouse (local Chrome, Incognito, throttled 4G)
# 2. PageSpeed Insights (Google servers)
# 3. WebPageTest (Virginia, Cable connection)

# Record for each page:
# - LCP, INP, CLS, TTFB, FCP, Speed Index
# - Total page weight (bytes)
# - Number of requests
# - Cache status (CF-Cache-Status header)
```

**Step 2: API-based measurement**
```bash
# Check Cloudflare cache status for key pages
for url in \
  "https://sapiens.folkup.life/" \
  "https://sapiens.folkup.life/chapters/" \
  "https://sapiens.folkup.life/chapters/chapter-0-pilot/" \
  "https://sapiens.folkup.life/chapters/chapter-1-jules-verne/"; do
    echo "=== $url ==="
    curl -sI "$url" | grep -E "(cf-cache-status|age|cache-control|content-length|content-encoding)"
done
```

**Step 3: Load test baseline (k6)**
```bash
k6 run --duration 60s --vus 10 infrastructure/scripts/k6-baseline.js
```

### 5.3 Continuous Monitoring

| What | Tool | Frequency |
|------|------|-----------|
| Uptime | Cloudflare (built-in) | Every 1 min |
| CWV (field data) | Google Search Console | Weekly |
| Performance regression | Lighthouse CI (optional) | Per deploy |
| Cache effectiveness | Cloudflare Analytics | Daily review |

---

## 6. Performance Budget Enforcement

### 6.1 Build-Time Checks

```bash
# Add to npm run quality-gates
# Check that Hugo build output doesn't exceed size budgets

#!/bin/bash
MAX_HTML_SIZE=51200   # 50 KB
MAX_TOTAL_PAGE=512000 # 500 KB

for html in public/**/*.html; do
    size=$(wc -c < "$html")
    if [ "$size" -gt "$MAX_HTML_SIZE" ]; then
        echo "WARNING: $html exceeds HTML budget (${size} bytes > ${MAX_HTML_SIZE})"
    fi
done
```

### 6.2 Regression Prevention

Before each deployment:
1. Run `hugo --gc --minify` and check output sizes
2. Compare against baseline (stored in `_meta/performance-baseline.json`)
3. Flag any page exceeding 500 KB total weight
4. Flag any new unoptimized images (non-WebP, > 100 KB)

---

## 7. Scaling Projections

### 7.1 Traffic Growth Model

| Phase | Timeframe | Visitors/Day | Peak req/s | CDN Handles? |
|-------|-----------|-------------|-----------|-------------|
| Launch | Week 1 | 500-2,000 | 5 | Trivially |
| Chapter releases | Month 1-3 | 2,000-10,000 | 50 | Easily |
| Social traction | Month 3-6 | 10,000-50,000 | 200 | Comfortably |
| Viral moment | Any time | 50,000-500,000 | 1,500 | Yes (with CDN fallback strategy) |
| Sustained growth | Month 6+ | 20,000-100,000 | 400 | Standard operation |

### 7.2 What Scales and What Doesn't

**Scales infinitely (CDN-handled):**
- Page views (static HTML from cache)
- Asset delivery (CSS, JS, images, fonts)
- Geographic distribution (Cloudflare 300+ PoPs)

**Scales with attention:**
- New content publication (cache warming needed)
- Search indexing (sitemaps, structured data)
- RSS/feed delivery (cacheable but needs fresh content)

**Does not scale automatically:**
- User-generated content (if ever implemented — needs backend)
- Real-time analytics (relies on third-party service)
- Email notifications (separate system)

### 7.3 When to Upgrade Beyond Current Architecture

| Trigger | Current Solution | Upgrade Path |
|---------|-----------------|-------------|
| > 1M visitors/day sustained | Cloudflare Pro | Cloudflare Business (custom WAF rules) |
| Real-time features needed | N/A (static) | Add API layer (Workers/Functions) |
| Multi-language launch | Hugo i18n | Already supported, just more pages |
| E-commerce integration | N/A | Separate service (Stripe/Shopify) |
| Community features | N/A | Separate app (Discourse, etc.) |

---

## 8. Baseline Recording Template

Use this template after each measurement session:

```json
{
  "date": "YYYY-MM-DD",
  "tool": "lighthouse|psi|webpagetest|k6",
  "url": "https://sapiens.folkup.life/...",
  "metrics": {
    "lcp_ms": 0,
    "inp_ms": 0,
    "cls": 0.0,
    "ttfb_ms": 0,
    "fcp_ms": 0,
    "speed_index_ms": 0,
    "total_blocking_time_ms": 0,
    "page_weight_bytes": 0,
    "requests_count": 0,
    "lighthouse_performance_score": 0,
    "cf_cache_status": "HIT|MISS|DYNAMIC"
  },
  "notes": ""
}
```

Store results in `_meta/performance-baseline.json` (array of measurements over time).
