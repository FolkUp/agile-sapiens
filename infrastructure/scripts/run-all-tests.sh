#!/bin/bash
# AGIL-019: Run All Load Tests in Sequence
# Executes all 5 scenarios with analysis pauses between them
#
# Usage:
#   bash infrastructure/scripts/run-all-tests.sh
#   bash infrastructure/scripts/run-all-tests.sh --dry-run  (1 VU, 10s each)
#   bash infrastructure/scripts/run-all-tests.sh --baseline-only

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
RESULTS_DIR="${SCRIPT_DIR}/../../results"
MODE="${1:-full}"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

mkdir -p "$RESULTS_DIR"

echo "============================================"
echo "AGIL-019: Load Testing Suite"
echo "Date: $(date)"
echo "Mode: $MODE"
echo "Results: $RESULTS_DIR"
echo "============================================"
echo ""

# Pre-flight checks
echo "Pre-flight checks..."
if ! command -v k6 &> /dev/null; then
  echo "ERROR: k6 not installed. Install: https://k6.io/docs/get-started/installation/"
  exit 1
fi
echo "  k6 version: $(k6 version 2>/dev/null || echo 'unknown')"

# Check site is accessible
site_status=$(curl -s -o /dev/null -w "%{http_code}" "https://sapiens.folkup.life/" || echo "000")
if [[ "$site_status" != "200" ]]; then
  echo "ERROR: Site not accessible (HTTP $site_status)"
  exit 1
fi
echo "  Site accessible: HTTP $site_status"
echo ""

run_test() {
  local name="$1"
  local script="$2"
  local description="$3"

  echo "============================================"
  echo "Running: $name"
  echo "  $description"
  echo "============================================"

  if [[ "$MODE" == "--dry-run" ]]; then
    k6 run --vus 1 --duration 10s \
      --out "json=${RESULTS_DIR}/${name}-${TIMESTAMP}.json" \
      "$script"
  else
    k6 run \
      --out "json=${RESULTS_DIR}/${name}-${TIMESTAMP}.json" \
      "$script"
  fi

  local exit_code=$?
  if [[ $exit_code -ne 0 ]]; then
    echo "WARNING: $name completed with threshold failures (exit code: $exit_code)"
  else
    echo "PASS: $name completed successfully"
  fi
  echo ""
}

pause_analysis() {
  local duration="${1:-15}"
  if [[ "$MODE" == "--dry-run" || "$MODE" == "--baseline-only" ]]; then
    return
  fi
  echo "--- Analysis pause: ${duration}s ---"
  echo "  Review results before continuing..."
  sleep "$duration"
  echo ""
}

# Baseline-only mode
if [[ "$MODE" == "--baseline-only" ]]; then
  run_test "baseline" "${SCRIPT_DIR}/k6-baseline.js" "Quick baseline (10 VUs, 60s)"
  echo "Baseline complete. Results in $RESULTS_DIR"
  exit 0
fi

# Full test suite
echo "Starting full test suite (~2.5 hours including pauses)"
echo ""

# 1. Baseline
run_test "baseline" "${SCRIPT_DIR}/k6-baseline.js" "Quick baseline measurement"
pause_analysis 10

# 2. Gradual Ramp
run_test "gradual-ramp" "${SCRIPT_DIR}/k6-gradual-ramp.js" "Scenario A: Gradual ramp 0→1000 VUs"
pause_analysis 15

# 3. Sustained Load
run_test "sustained-load" "${SCRIPT_DIR}/k6-sustained-load.js" "Scenario C: 500K/day sustained simulation"
pause_analysis 15

# 4. Chapter Spike
run_test "chapter-spike" "${SCRIPT_DIR}/k6-chapter-spike.js" "Scenario D: Chapter publication spike"
pause_analysis 15

# 5. Spike Test
run_test "spike-test" "${SCRIPT_DIR}/k6-spike-test.js" "Scenario B: Viral spike (3000 VUs)"
pause_analysis 15

# 6. Backlash (final, most aggressive)
run_test "backlash" "${SCRIPT_DIR}/k6-backlash.js" "Scenario E: Backlash stress test (5000 VUs)"

echo ""
echo "============================================"
echo "ALL TESTS COMPLETE"
echo "Date: $(date)"
echo "Results: $RESULTS_DIR"
echo "============================================"
echo ""
echo "Next steps:"
echo "  1. Review JSON results in $RESULTS_DIR"
echo "  2. Check Cloudflare Analytics for test window"
echo "  3. Verify origin server health"
echo "  4. Document findings in infrastructure/test-results.md"
