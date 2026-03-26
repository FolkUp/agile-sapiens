/**
 * AGIL-019: Load Test — Scenario A: Gradual Ramp
 *
 * Purpose: Establish baseline performance, find saturation point
 * Duration: ~22 minutes
 * Peak: 1000 VUs
 *
 * Usage:
 *   k6 run infrastructure/scripts/k6-gradual-ramp.js
 *   k6 run --out json=results/gradual-ramp.json infrastructure/scripts/k6-gradual-ramp.js
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';

// Custom metrics
const cacheHitRate = new Rate('cache_hit_rate');
const ttfbTrend = new Trend('ttfb_ms');
const errorRate = new Rate('error_rate');
const pageLoadTrend = new Trend('page_load_ms');
const originRequests = new Counter('origin_requests');

const BASE_URL = __ENV.BASE_URL || 'https://sapiens.folkup.life';

export const options = {
  stages: [
    { duration: '2m', target: 100 },    // Warm-up
    { duration: '3m', target: 500 },     // Ramp to moderate
    { duration: '5m', target: 500 },     // Sustain moderate
    { duration: '5m', target: 1000 },    // Push to high
    { duration: '5m', target: 1000 },    // Sustain high
    { duration: '2m', target: 0 },       // Cool-down
  ],
  thresholds: {
    http_req_duration: ['p(50)<100', 'p(95)<300', 'p(99)<800'],
    http_req_failed: ['rate<0.01'],
    cache_hit_rate: ['rate>0.85'],
    error_rate: ['rate<0.01'],
    ttfb_ms: ['p(95)<100'],
  },
  tags: {
    testScenario: 'gradual-ramp',
  },
};

// Page distribution simulating real user behavior
const PAGES = [
  { url: '/', weight: 25, name: 'homepage' },
  { url: '/chapters/', weight: 15, name: 'chapters-index' },
  { url: '/chapters/chapter-0-pilot/', weight: 20, name: 'chapter-0' },
  { url: '/chapters/chapter-1-jules-verne/', weight: 25, name: 'chapter-1' },
  { url: '/archive/', weight: 5, name: 'archive' },
  { url: '/legal/privacy/', weight: 3, name: 'privacy' },
  { url: '/legal/terms/', weight: 3, name: 'terms' },
  { url: '/legal/ai-transparency/', weight: 2, name: 'ai-transparency' },
  { url: '/legal/editorial-workflow/', weight: 2, name: 'editorial' },
];

function selectPage() {
  const rand = Math.random() * 100;
  let cumulative = 0;
  for (const page of PAGES) {
    cumulative += page.weight;
    if (rand <= cumulative) return page;
  }
  return PAGES[0];
}

export default function () {
  const page = selectPage();
  const url = `${BASE_URL}${page.url}`;

  const params = {
    headers: {
      'User-Agent': 'k6-load-test/1.0 (AGIL-019; sapiens.folkup.life)',
      'Accept': 'text/html,application/xhtml+xml',
      'Accept-Encoding': 'gzip, br',
    },
    tags: { page: page.name },
  };

  const res = http.get(url, params);

  // Track TTFB
  ttfbTrend.add(res.timings.waiting);

  // Track page load time
  pageLoadTrend.add(res.timings.duration);

  // Check Cloudflare cache status
  const cacheStatus = res.headers['Cf-Cache-Status'] || res.headers['cf-cache-status'] || '';
  const isHit = cacheStatus === 'HIT';
  cacheHitRate.add(isHit);

  if (cacheStatus === 'MISS' || cacheStatus === 'EXPIRED') {
    originRequests.add(1);
  }

  // Check response
  const isError = res.status >= 400;
  errorRate.add(isError);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response body not empty': (r) => r.body && r.body.length > 0,
    'TTFB under 100ms': (r) => r.timings.waiting < 100,
    'total load under 300ms': (r) => r.timings.duration < 300,
    'has cache header': (r) => {
      const cs = r.headers['Cf-Cache-Status'] || r.headers['cf-cache-status'];
      return cs !== undefined && cs !== '';
    },
  });

  // Simulate reading time (1-5 seconds between pages)
  sleep(Math.random() * 4 + 1);
}

export function handleSummary(data) {
  const summary = {
    scenario: 'gradual-ramp',
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
      vus_max: data.metrics.vus_max?.values?.value,
    },
    thresholds: {},
  };

  // Check threshold results
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
    'results/gradual-ramp-summary.json': JSON.stringify(summary, null, 2),
  };
}
