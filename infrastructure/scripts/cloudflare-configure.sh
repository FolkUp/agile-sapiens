#!/bin/bash
# AGIL-019: Cloudflare Configuration Script
# Configures CDN, caching, rate limiting, and security for 500K capacity
#
# Prerequisites:
#   export CLOUDFLARE_TOKEN="your-api-token"
#   export CLOUDFLARE_ZONE="your-zone-id"
#
# Usage:
#   bash infrastructure/scripts/cloudflare-configure.sh [apply|status|emergency-on|emergency-off]

set -euo pipefail

# Validate environment
if [[ -z "${CLOUDFLARE_TOKEN:-}" || -z "${CLOUDFLARE_ZONE:-}" ]]; then
  echo "ERROR: CLOUDFLARE_TOKEN and CLOUDFLARE_ZONE must be set"
  echo "  export CLOUDFLARE_TOKEN='your-api-token'"
  echo "  export CLOUDFLARE_ZONE='your-zone-id'"
  exit 1
fi

CF_API="https://api.cloudflare.com/client/v4"
ZONE="${CLOUDFLARE_ZONE}"
AUTH_HEADER="Authorization: Bearer ${CLOUDFLARE_TOKEN}"

# Helper: Cloudflare API call
cf_api() {
  local method="$1"
  local path="$2"
  local data="${3:-}"

  if [[ -n "$data" ]]; then
    curl -s -X "$method" "${CF_API}${path}" \
      -H "$AUTH_HEADER" \
      -H "Content-Type: application/json" \
      --data "$data"
  else
    curl -s -X "$method" "${CF_API}${path}" \
      -H "$AUTH_HEADER" \
      -H "Content-Type: application/json"
  fi
}

# Helper: Check API response
check_response() {
  local response="$1"
  local context="$2"
  local success
  success=$(echo "$response" | python3 -c "import sys,json; print(json.load(sys.stdin).get('success', False))" 2>/dev/null || echo "false")
  if [[ "$success" == "True" || "$success" == "true" ]]; then
    echo "  OK: $context"
  else
    echo "  WARN: $context — check response:"
    echo "$response" | python3 -c "import sys,json; d=json.load(sys.stdin); [print(f'    {e[\"message\"]}') for e in d.get('errors',[])]" 2>/dev/null || echo "  $response"
  fi
}

# ─────────────────────────────────────────
# STATUS: Show current configuration
# ─────────────────────────────────────────
cmd_status() {
  echo "=== Cloudflare Status: Zone ${ZONE} ==="
  echo ""

  # Zone details
  echo "--- Zone Info ---"
  cf_api GET "/zones/${ZONE}" | python3 -c "
import sys, json
d = json.load(sys.stdin)['result']
print(f\"  Name: {d['name']}\")
print(f\"  Status: {d['status']}\")
print(f\"  Plan: {d['plan']['name']}\")
" 2>/dev/null || echo "  (failed to fetch zone info)"

  # Cache settings
  echo ""
  echo "--- Cache Settings ---"
  local cache_level
  cache_level=$(cf_api GET "/zones/${ZONE}/settings/cache_level" | python3 -c "import sys,json; print(json.load(sys.stdin)['result']['value'])" 2>/dev/null || echo "unknown")
  echo "  Cache Level: $cache_level"

  local browser_ttl
  browser_ttl=$(cf_api GET "/zones/${ZONE}/settings/browser_cache_ttl" | python3 -c "import sys,json; print(json.load(sys.stdin)['result']['value'])" 2>/dev/null || echo "unknown")
  echo "  Browser Cache TTL: ${browser_ttl}s"

  local always_online
  always_online=$(cf_api GET "/zones/${ZONE}/settings/always_online" | python3 -c "import sys,json; print(json.load(sys.stdin)['result']['value'])" 2>/dev/null || echo "unknown")
  echo "  Always Online: $always_online"

  # Security
  echo ""
  echo "--- Security ---"
  local security_level
  security_level=$(cf_api GET "/zones/${ZONE}/settings/security_level" | python3 -c "import sys,json; print(json.load(sys.stdin)['result']['value'])" 2>/dev/null || echo "unknown")
  echo "  Security Level: $security_level"

  local challenge_ttl
  challenge_ttl=$(cf_api GET "/zones/${ZONE}/settings/challenge_ttl" | python3 -c "import sys,json; print(json.load(sys.stdin)['result']['value'])" 2>/dev/null || echo "unknown")
  echo "  Challenge TTL: ${challenge_ttl}s"

  echo ""
  echo "=== Status check complete ==="
}

# ─────────────────────────────────────────
# APPLY: Configure optimal settings
# ─────────────────────────────────────────
cmd_apply() {
  echo "=== Applying Cloudflare Configuration ==="
  echo "Zone: ${ZONE}"
  echo ""

  # 1. Enable Always Online (emergency fallback)
  echo "1. Enabling Always Online..."
  local r1
  r1=$(cf_api PATCH "/zones/${ZONE}/settings/always_online" '{"value":"on"}')
  check_response "$r1" "Always Online"

  # 2. Set cache level to aggressive
  echo "2. Setting cache level to aggressive..."
  local r2
  r2=$(cf_api PATCH "/zones/${ZONE}/settings/cache_level" '{"value":"aggressive"}')
  check_response "$r2" "Cache Level"

  # 3. Set browser cache TTL to respect origin headers
  echo "3. Setting browser cache TTL (respect existing headers)..."
  local r3
  r3=$(cf_api PATCH "/zones/${ZONE}/settings/browser_cache_ttl" '{"value":0}')
  check_response "$r3" "Browser Cache TTL"

  # 4. Enable Brotli compression
  echo "4. Enabling Brotli compression..."
  local r4
  r4=$(cf_api PATCH "/zones/${ZONE}/settings/brotli" '{"value":"on"}')
  check_response "$r4" "Brotli"

  # 5. Set security level to medium (balanced)
  echo "5. Setting security level to medium..."
  local r5
  r5=$(cf_api PATCH "/zones/${ZONE}/settings/security_level" '{"value":"medium"}')
  check_response "$r5" "Security Level"

  # 6. Enable Early Hints (103)
  echo "6. Enabling Early Hints..."
  local r6
  r6=$(cf_api PATCH "/zones/${ZONE}/settings/early_hints" '{"value":"on"}')
  check_response "$r6" "Early Hints"

  # 7. Enable HTTP/2 and HTTP/3
  echo "7. Enabling HTTP/2..."
  local r7
  r7=$(cf_api PATCH "/zones/${ZONE}/settings/http2" '{"value":"on"}')
  check_response "$r7" "HTTP/2"

  echo "8. Enabling HTTP/3..."
  local r8
  r8=$(cf_api PATCH "/zones/${ZONE}/settings/http3" '{"value":"on"}')
  check_response "$r8" "HTTP/3"

  # 8. Set minimum TLS version to 1.2
  echo "9. Setting min TLS 1.2..."
  local r9
  r9=$(cf_api PATCH "/zones/${ZONE}/settings/min_tls_version" '{"value":"1.2"}')
  check_response "$r9" "Min TLS 1.2"

  # 9. Enable HSTS
  echo "10. Enabling HSTS..."
  local r10
  r10=$(cf_api PATCH "/zones/${ZONE}/settings/security_header" '{
    "value": {
      "strict_transport_security": {
        "enabled": true,
        "max_age": 31536000,
        "include_subdomains": true,
        "preload": true,
        "nosniff": true
      }
    }
  }')
  check_response "$r10" "HSTS"

  # 10. Enable Auto Minify (CSS, HTML, JS)
  echo "11. Enabling auto-minify..."
  local r11
  r11=$(cf_api PATCH "/zones/${ZONE}/settings/minify" '{
    "value": {
      "css": "on",
      "html": "on",
      "js": "on"
    }
  }')
  check_response "$r11" "Auto Minify"

  echo ""
  echo "=== Configuration applied ==="
  echo ""
  echo "Next steps:"
  echo "  1. Verify with: bash $0 status"
  echo "  2. Warm cache: bash infrastructure/scripts/warm-cache.sh"
  echo "  3. Run baseline: k6 run infrastructure/scripts/k6-baseline.js"
}

# ─────────────────────────────────────────
# EMERGENCY ON: Under Attack Mode
# ─────────────────────────────────────────
cmd_emergency_on() {
  echo "=== EMERGENCY: Enabling Under Attack Mode ==="
  echo "WARNING: This will show a JS challenge to ALL visitors for ~5 seconds"
  echo ""

  local r1
  r1=$(cf_api PATCH "/zones/${ZONE}/settings/security_level" '{"value":"under_attack"}')
  check_response "$r1" "Under Attack Mode ON"

  # Also extend cache TTL
  echo "Extending browser cache TTL to 4 hours..."
  local r2
  r2=$(cf_api PATCH "/zones/${ZONE}/settings/browser_cache_ttl" '{"value":14400}')
  check_response "$r2" "Browser Cache TTL 4h"

  echo ""
  echo "EMERGENCY MODE ACTIVE"
  echo "  - All visitors get JS challenge"
  echo "  - Cache TTL extended to 4 hours"
  echo "  - To disable: bash $0 emergency-off"
}

# ─────────────────────────────────────────
# EMERGENCY OFF: Restore normal mode
# ─────────────────────────────────────────
cmd_emergency_off() {
  echo "=== Disabling Emergency Mode ==="

  local r1
  r1=$(cf_api PATCH "/zones/${ZONE}/settings/security_level" '{"value":"medium"}')
  check_response "$r1" "Security Level restored to medium"

  local r2
  r2=$(cf_api PATCH "/zones/${ZONE}/settings/browser_cache_ttl" '{"value":0}')
  check_response "$r2" "Browser Cache TTL restored to respect headers"

  echo ""
  echo "Normal mode restored."
}

# ─────────────────────────────────────────
# Main
# ─────────────────────────────────────────
case "${1:-help}" in
  status)
    cmd_status
    ;;
  apply)
    cmd_apply
    ;;
  emergency-on)
    cmd_emergency_on
    ;;
  emergency-off)
    cmd_emergency_off
    ;;
  help|*)
    echo "Cloudflare Configuration — AGILE SAPIENS"
    echo ""
    echo "Usage: $0 <command>"
    echo ""
    echo "Commands:"
    echo "  status         Show current Cloudflare configuration"
    echo "  apply          Apply optimal settings for 500K capacity"
    echo "  emergency-on   Enable Under Attack Mode (emergency)"
    echo "  emergency-off  Restore normal mode after emergency"
    echo ""
    echo "Environment:"
    echo "  CLOUDFLARE_TOKEN  API token with zone:edit permissions"
    echo "  CLOUDFLARE_ZONE   Zone ID for sapiens.folkup.life"
    ;;
esac
