/**
 * AGIL-019: Load Test — Scenario B: Spike Test (Viral Moment)
 *
 * Purpose: Simulate Reddit/HN frontpage viral spike
 * Duration: ~11 minutes
 * Peak: 3000 VUs (60x normal traffic spike in 60 seconds)
 *
 * Usage:
 *   k6 run infrastructure/scripts/k6-spike-test.js
 *   k6 run --out json=results/spike-test.json infrastructure/scripts/k6-spike-test.js
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';

const cacheHitRate = new Rate('cache_hit_rate');
const ttfbTrend = new Trend('ttfb_ms');
const errorRate = new Rate('error_rate');
const originRequests = new Counter('origin_requests');
const challengeCount = new Counter('challenge_responses');

const BASE_URL = __ENV.BASE_URL || 'https://sapiens.folkup.life';

export const options = {
  stages: [
    { duration: '1m', target: 50 },      // Normal traffic
    { duration: '1m', target: 3000 },     // Viral spike (60x in 60s)
    { duration: '3m', target: 3000 },     // Peak viral sustained
    { duration: '2m', target: 500 },      // Natural decay
    { duration: '3m', target: 500 },      // Sustained interest
    { duration: '1m', target: 0 },        // Cool-down
  ],
  thresholds: {
    // Relaxed thresholds for spike — degradation expected
    http_req_duration: ['p(50)<200', 'p(95)<1000', 'p(99)<2000'],
    http_req_failed: ['rate<0.05'],  // Allow 5% error during spike
    error_rate: ['rate<0.05'],
  },
  tags: {
    testScenario: 'spike-test',
  },
};

// Viral traffic pattern: most users come for one specific page
const VIRAL_PAGES = [
  { url: '/chapters/chapter-1-jules-verne/', weight: 55, name: 'viral-chapter' },
  { url: '/', weight: 20, name: 'homepage' },
  { url: '/chapters/', weight: 10, name: 'chapters-index' },
  { url: '/chapters/chapter-0-pilot/', weight: 8, name: 'chapter-0' },
  { url: '/archive/', weight: 3, name: 'archive' },
  { url: '/legal/privacy/', weight: 2, name: 'privacy' },
  { url: '/legal/terms/', weight: 2, name: 'terms' },
];

function selectPage() {
  const rand = Math.random() * 100;
  let cumulative = 0;
  for (const page of VIRAL_PAGES) {
    cumulative += page.weight;
    if (rand <= cumulative) return page;
  }
  return VIRAL_PAGES[0];
}

export default function () {
  const page = selectPage();
  const url = `${BASE_URL}${page.url}`;

  const params = {
    headers: {
      'User-Agent': 'k6-spike-test/1.0 (AGIL-019; sapiens.folkup.life)',
      'Accept': 'text/html,application/xhtml+xml',
      'Accept-Encoding': 'gzip, br',
      'Referer': 'https://www.reddit.com/',  // Simulate referrer
    },
    tags: { page: page.name },
    redirects: 0,  // Don't follow redirects (catch 3xx from challenges)
  };

  const res = http.get(url, params);

  // Track metrics
  ttfbTrend.add(res.timings.waiting);

  const cacheStatus = res.headers['Cf-Cache-Status'] || res.headers['cf-cache-status'] || '';
  cacheHitRate.add(cacheStatus === 'HIT');

  if (cacheStatus === 'MISS' || cacheStatus === 'EXPIRED') {
    originRequests.add(1);
  }

  // Track Cloudflare challenges (403 with challenge page)
  if (res.status === 403 || res.status === 429 || res.status === 503) {
    challengeCount.add(1);
  }

  const isError = res.status >= 400 && res.status !== 403; // 403 = challenge, not error
  errorRate.add(isError);

  check(res, {
    'status is 200 or challenge': (r) => r.status === 200 || r.status === 403,
    'not server error': (r) => r.status < 500,
    'response has body': (r) => r.body && r.body.length > 0,
  });

  // Viral users read less — shorter dwell time
  sleep(Math.random() * 2 + 0.5);
}

export function handleSummary(data) {
  const summary = {
    scenario: 'spike-test',
    timestamp: new Date().toISOString(),
    metrics: {
      http_req_duration_p50: data.metrics.http_req_duration?.values?.['p(50)'],
      http_req_duration_p95: data.metrics.http_req_duration?.values?.['p(95)'],
      http_req_duration_p99: data.metrics.http_req_duration?.values?.['p(99)'],
      http_req_failed_rate: data.metrics.http_req_failed?.values?.rate,
      cache_hit_rate: data.metrics.cache_hit_rate?.values?.rate,
      ttfb_p95: data.metrics.ttfb_ms?.values?.['p(95)'],
      total_requests: data.metrics.http_reqs?.values?.count,
      origin_requests: data.metrics.origin_requests?.values?.count,
      challenge_responses: data.metrics.challenge_responses?.values?.count,
      vus_max: data.metrics.vus_max?.values?.value,
    },
    thresholds: {},
  };

  for (const [key, threshold] of Object.entries(data.metrics)) {
    if (threshold.thresholds) {
      summary.thresholds[key] = {};
      for (const [name, result] of Object.entries(threshold.thresholds)) {
        summary.thresholds[key][name] = result.ok ? 'PASS' : 'FAIL';
      }
    }
  }

  return {
    stdout: JSON.stringify(summary, null, 2) + '\n',
    'results/spike-test-summary.json': JSON.stringify(summary, null, 2),
  };
}
