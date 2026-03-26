# CDN Fallback Strategy — AGILE SAPIENS

**Task:** AGIL-019
**Target:** sapiens.folkup.life
**Stack:** Hugo SSG + Cloudflare Pro
**Date:** 2026-03-26

---

## 1. Architecture Overview

```
                    ┌─────────────────────────────┐
                    │     Cloudflare Edge (CDN)    │
                    │  ┌────────┐  ┌───────────┐  │
  Visitors ──────►  │  │ WAF    │→ │ Cache     │  │ ── Cache HIT ──► Response
                    │  │ Rules  │  │ (static)  │  │
                    │  └────────┘  └─────┬─────┘  │
                    └────────────────────┼────────┘
                                         │ Cache MISS
                                         ▼
                              ┌──────────────────┐
                              │  Origin Shield   │
                              │  (Cloudflare)    │
                              └────────┬─────────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │  Origin VPS      │
                              │  (nginx + Hugo   │
                              │   static files)  │
                              └──────────────────┘
```

**Key insight:** For a static Hugo site, Cloudflare CDN should serve 99%+ of requests from cache. The origin server exists only for cache misses and purge-revalidation. The fallback strategy focuses on maximizing cache hits and gracefully handling edge cases.

---

## 2. Cache Optimization for Controversy Spikes

### 2.1 Page Rules (Cloudflare Pro)

**Rule 1: Static assets — aggressive caching**
```
URL pattern: sapiens.folkup.life/*.css
             sapiens.folkup.life/*.js
             sapiens.folkup.life/*.woff2
             sapiens.folkup.life/*.webp
             sapiens.folkup.life/*.png
             sapiens.folkup.life/*.jpg
             sapiens.folkup.life/*.svg
             sapiens.folkup.life/*.ico

Cache Level: Cache Everything
Edge Cache TTL: 1 month (2592000 seconds)
Browser Cache TTL: 1 year (31536000 seconds)
```

**Rule 2: HTML pages — balanced caching**
```
URL pattern: sapiens.folkup.life/*

Cache Level: Cache Everything
Edge Cache TTL: 4 hours (14400 seconds)
Browser Cache TTL: 1 hour (3600 seconds)
```

**Rule 3: Chapter pages — spike-optimized**
```
URL pattern: sapiens.folkup.life/chapters/*

Cache Level: Cache Everything
Edge Cache TTL: 2 hours (7200 seconds)
Browser Cache TTL: 30 minutes (1800 seconds)

Rationale: Chapters are the viral content. Shorter TTL allows
faster updates if corrections needed, while still serving from cache.
```

### 2.2 Origin Cache Headers (nginx)

```nginx
# /etc/nginx/sites-available/sapiens.folkup.life

server {
    listen 80;
    server_name sapiens.folkup.life;
    root /var/www/sapiens.folkup.life/public;
    index index.html;

    # Static assets — immutable (fingerprinted by Hugo)
    location ~* \.(css|js|woff2|woff|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Content-Type-Options "nosniff";
        access_log off;
    }

    # Images — long cache
    location ~* \.(webp|png|jpg|jpeg|gif|svg|ico)$ {
        expires 6M;
        add_header Cache-Control "public";
        add_header X-Content-Type-Options "nosniff";
        access_log off;
    }

    # HTML pages — CDN-friendly with revalidation
    location / {
        try_files $uri $uri/index.html $uri.html =404;
        expires 1h;
        add_header Cache-Control "public, must-revalidate";
        add_header X-Content-Type-Options "nosniff";
        add_header X-Frame-Options "SAMEORIGIN";
        add_header Referrer-Policy "strict-origin-when-cross-origin";
    }

    # Security headers (all responses)
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

### 2.3 Cache Warming Strategy

After deployment or purge, warm the cache before announcing content:

```bash
#!/bin/bash
# infrastructure/scripts/warm-cache.sh

SITE="https://sapiens.folkup.life"

# Critical pages to warm first
PAGES=(
    "/"
    "/chapters/"
    "/chapters/chapter-0-pilot/"
    "/chapters/chapter-1-jules-verne/"
    "/archive/"
    "/legal/privacy/"
    "/legal/terms/"
    "/legal/ai-transparency/"
    "/legal/editorial-workflow/"
)

echo "Cache warming: $SITE"
for page in "${PAGES[@]}"; do
    status=$(curl -s -o /dev/null -w "%{http_code}" "${SITE}${page}")
    echo "  ${page} → ${status}"
done
echo "Cache warming complete."
```

---

## 3. Origin Shield Configuration

### 3.1 What is Origin Shield?

Cloudflare's Tiered Cache (available on Pro) adds an intermediate cache layer between edge PoPs and the origin. Instead of every edge PoP going to origin on a cache miss, only the shield PoP does. This reduces origin load by 90%+.

### 3.2 Configuration

**Cloudflare Dashboard:**
```
Speed → Optimization → Tiered Cache
  → Enable: Smart Tiered Cache Topology (Pro feature)
```

**Via API:**
```bash
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE}/argo/tiered_caching" \
  -H "Authorization: Bearer ${CLOUDFLARE_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{"value":"on"}'
```

### 3.3 Expected Impact

| Metric | Without Shield | With Shield |
|--------|---------------|-------------|
| Origin requests (normal) | ~5% of total | < 0.5% of total |
| Origin requests (spike) | ~15% of total | < 2% of total |
| Origin bandwidth | 50-200 MB/hour | < 10 MB/hour |
| Edge-to-origin latency | Variable (per PoP) | Consistent (shield PoP) |

---

## 4. Rate Limiting Rules

### 4.1 Legitimate Traffic Protection

**Rule 1: General page rate limit**
```
Expression: (http.request.uri.path ne "/")
Threshold: 60 requests per 10 seconds per IP
Action: Challenge (JS challenge, not block)
Duration: 60 seconds

Rationale: Normal reading behavior = 1 page every 2-3 seconds max.
60 req/10s allows for asset loading while blocking scrapers.
```

**Rule 2: API/resource protection**
```
Expression: (http.request.uri.path contains "/assets/")
Threshold: 200 requests per 10 seconds per IP
Action: Challenge
Duration: 30 seconds

Rationale: Single page loads ~15 assets. Aggressive but fair.
```

**Rule 3: Chapter-specific protection (during spikes)**
```
Expression: (http.request.uri.path contains "/chapters/")
Threshold: 30 requests per 10 seconds per IP
Action: Managed Challenge
Duration: 120 seconds

Rationale: Chapter page + assets = ~20 requests. 30/10s allows
normal reading with margin, blocks automated scraping.
```

### 4.2 Anti-Abuse Rules

**Rule 4: Known bad bots**
```
Expression: (cf.client.bot) and not (cf.bot_management.verified_bot)
Action: Block

Rationale: Block unverified bots. Verified bots (Google, Bing) pass.
```

**Rule 5: Empty/malformed User-Agent**
```
Expression: (len(http.user_agent) lt 10) or (not http.user_agent contains "Mozilla")
              and not (cf.bot_management.verified_bot)
Threshold: 5 requests per 10 seconds per IP
Action: Block
Duration: 3600 seconds

Rationale: Legitimate browsers always send proper UA.
```

**Rule 6: Geographic anomaly (optional, activate during backlash)**
```
Expression: (ip.geoip.country in {"XX" "YY"})
            and (http.request.uri.path contains "/chapters/")
Threshold: 10 requests per 10 seconds per IP
Action: Managed Challenge
Duration: 300 seconds

Note: XX/YY = countries with zero expected readership that show
sudden spike. Configure dynamically based on analytics.
```

### 4.3 Rate Limiting via Cloudflare API

```bash
# Create rate limiting rule via API
curl -X POST "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE}/rate_limits" \
  -H "Authorization: Bearer ${CLOUDFLARE_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "threshold": 60,
    "period": 10,
    "match": {
      "request": {
        "url_pattern": "sapiens.folkup.life/*"
      }
    },
    "action": {
      "mode": "js_challenge",
      "timeout": 60
    },
    "description": "General rate limit - 60 req/10s per IP",
    "enabled": true
  }'
```

---

## 5. Static-Only Mode

### 5.1 What is Static-Only Mode?

For a Hugo SSG site, the entire site is already static. "Static-only mode" means:
1. Disable any non-essential dynamic elements (analytics scripts, comment widgets, etc.)
2. Serve minimal HTML + CSS only (no JS that fetches external resources)
3. Maximum cache aggressiveness (longer TTLs, no revalidation)

### 5.2 Activation Triggers

| Trigger | Threshold | Action |
|---------|----------|--------|
| Origin error rate > 5% | Automatic (Cloudflare) | Serve stale cache (Always Online) |
| Request rate > 2000/s | Manual escalation | Enable Under Attack Mode |
| Origin CPU > 90% for 5 min | Monitoring alert | Extend cache TTLs to 24h |
| Coordinated attack pattern | WAF detection | Block + challenge rules |
| Origin unreachable | Automatic (Cloudflare) | Always Online serves cached version |

### 5.3 Cloudflare "Always Online" Configuration

**Dashboard:**
```
Caching → Configuration → Always Online → ON
```

This uses the Cloudflare cache + Internet Archive as fallback when origin is down. For a static site, this is extremely effective since pages rarely change.

### 5.4 Emergency Response Playbook

**Level 1: Elevated Traffic (100-500 req/s)**
```
Actions:
  1. Monitor — watch Cloudflare Analytics
  2. Verify cache hit ratio > 95%
  3. No action needed if metrics healthy

Estimated origin load: < 25 req/s
```

**Level 2: High Traffic (500-1500 req/s)**
```
Actions:
  1. Enable Tiered Cache if not already on
  2. Extend Edge Cache TTL to 8 hours (via Page Rule)
  3. Activate chapter-specific rate limiting (Rule 3)
  4. Warm cache for all chapter pages

Estimated origin load: < 50 req/s
```

**Level 3: Critical Traffic (1500-5000 req/s)**
```
Actions:
  1. Enable "I'm Under Attack" mode (temporarily)
  2. Set Edge Cache TTL to 24 hours
  3. Disable non-essential page rules
  4. Alert team via monitoring
  5. Activate geographic rate limiting if anomalous patterns

Estimated origin load: < 100 req/s (shield absorbs most)
```

**Level 4: Emergency (> 5000 req/s or origin down)**
```
Actions:
  1. "I'm Under Attack" mode ON (if not already)
  2. Cloudflare "Always Online" serving cached content
  3. Block all non-browser traffic (WAF rule)
  4. Consider IP-based allowlisting (only known-good ranges)
  5. Origin investigation — likely not site-related at this scale

Estimated origin load: 0 (serving from cache/Always Online)
```

---

## 6. Selective Cache Purge Strategy

### 6.1 When Publishing New Content

Instead of purging all cache (current approach), use selective purge:

```bash
# Purge only the new chapter and related pages
node scripts/purge-cloudflare.js \
  "https://sapiens.folkup.life/chapters/chapter-2-new/" \
  "https://sapiens.folkup.life/chapters/" \
  "https://sapiens.folkup.life/" \
  "https://sapiens.folkup.life/sitemap.xml"
```

**Benefits:**
- Existing chapter caches remain warm (no origin load for old content)
- New chapter loads from origin once, then cached at all edges
- Homepage and index update to show new chapter

### 6.2 When Corrections Needed (During Spike)

```bash
# Purge ONLY the corrected page
node scripts/purge-cloudflare.js \
  "https://sapiens.folkup.life/chapters/chapter-1-jules-verne/"

# Immediately warm the cache
curl -s "https://sapiens.folkup.life/chapters/chapter-1-jules-verne/" > /dev/null
```

---

## 7. Monitoring & Alerting

### 7.1 Cloudflare Notifications (Dashboard → Notifications)

| Alert | Trigger | Channel |
|-------|---------|---------|
| Origin error spike | > 5 origin errors in 5 min | Email |
| DDoS attack | Automatic detection | Email |
| SSL expiration | 14 days before | Email |
| High traffic spike | > 10x normal in 5 min | Email |

### 7.2 Origin Monitoring

```bash
# Simple origin health check (cron every 5 min)
#!/bin/bash
ORIGIN_IP="your.origin.ip"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 "http://${ORIGIN_IP}")

if [ "$STATUS" != "200" ]; then
    echo "$(date): Origin health check FAILED (HTTP ${STATUS})" >> /var/log/origin-health.log
    # Send alert (email, webhook, etc.)
fi
```

---

## 8. Cost Analysis

### 8.1 Cloudflare Pro Plan

| Feature | Included | Relevance |
|---------|----------|-----------|
| CDN bandwidth | Unlimited | Critical for spikes |
| WAF rules | 20 custom rules | Sufficient for rate limiting |
| Page Rules | 20 rules | Sufficient for cache config |
| Tiered Cache | Yes (Smart topology) | Origin shield |
| Always Online | Yes | Emergency fallback |
| Analytics | Enhanced | Monitoring |
| DDoS protection | Yes (unmetered) | Emergency protection |

**Monthly cost: $20/month** — handles 500K+ without additional charges.

### 8.2 No Additional Costs for 500K

Static content on Cloudflare Pro:
- No bandwidth overage charges
- No request-based billing
- No origin compute scaling needed
- DDoS protection included

The $20/month Pro plan is the total CDN cost regardless of traffic volume.

---

## 9. Failure Mode Risk Assessment

| Failure Mode | Probability | Impact | Detection | Recovery |
|-------------|------------|--------|-----------|----------|
| CDN cache cold (post-purge) | Medium | Brief origin load spike | TTFB increase | Cache warming script |
| Origin VPS down | Low | Site served from CF cache | CF Always Online | Fix VPS, purge stale cache |
| Cloudflare outage | Very Low | Full outage (rare) | External monitoring | Wait for CF recovery (SLA) |
| DNS propagation issue | Very Low | Partial outage | Multi-region check | TTL + fallback DNS |
| TLS certificate issue | Low | HTTPS errors | SSL monitoring alert | Auto-renewal (CF manages) |
| Cache poisoning | Very Low | Serving wrong content | Content verification | Purge all + re-deploy |
| Rate limiting too aggressive | Medium | Legitimate users blocked | Error rate monitoring | Adjust thresholds |
| Rate limiting too permissive | Medium | Origin overload | Origin CPU/bandwidth | Tighten rules |
