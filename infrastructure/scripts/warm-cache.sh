#!/bin/bash
# AGIL-019: Cache Warming Script
# Warms Cloudflare CDN cache after deployment or purge
#
# Usage:
#   bash infrastructure/scripts/warm-cache.sh
#   bash infrastructure/scripts/warm-cache.sh --verify

set -euo pipefail

SITE="https://sapiens.folkup.life"
VERIFY_MODE="${1:-}"

# All pages to warm (order: most important first)
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
  "/legal/ugc-moderation/"
)

echo "Cache Warming: ${SITE}"
echo "Mode: ${VERIFY_MODE:-warm}"
echo "Pages: ${#PAGES[@]}"
echo "================================"

warm_count=0
miss_count=0
error_count=0

for page in "${PAGES[@]}"; do
  url="${SITE}${page}"

  # First request: warm the cache
  response=$(curl -s -o /dev/null -w "%{http_code}|%{time_total}|%{size_download}" \
    -H "Accept: text/html" \
    -H "Accept-Encoding: gzip, br" \
    "$url")

  status=$(echo "$response" | cut -d'|' -f1)
  time=$(echo "$response" | cut -d'|' -f2)
  size=$(echo "$response" | cut -d'|' -f3)

  if [[ "$status" == "200" ]]; then
    warm_count=$((warm_count + 1))

    if [[ "$VERIFY_MODE" == "--verify" ]]; then
      # Second request: verify cache hit
      sleep 1
      cache_status=$(curl -sI "$url" | grep -i "cf-cache-status" | awk '{print $2}' | tr -d '\r')
      echo "  ${page} -> ${status} | ${time}s | ${size}B | cache: ${cache_status:-unknown}"
      if [[ "$cache_status" != "HIT" ]]; then
        miss_count=$((miss_count + 1))
      fi
    else
      echo "  ${page} -> ${status} | ${time}s | ${size}B"
    fi
  else
    error_count=$((error_count + 1))
    echo "  ${page} -> ${status} ERROR"
  fi
done

echo "================================"
echo "Warmed: ${warm_count}/${#PAGES[@]}"
if [[ "$VERIFY_MODE" == "--verify" ]]; then
  echo "Cache misses: ${miss_count} (may need second pass)"
fi
if [[ "$error_count" -gt 0 ]]; then
  echo "Errors: ${error_count} (investigate)"
  exit 1
fi
echo "Cache warming complete."
