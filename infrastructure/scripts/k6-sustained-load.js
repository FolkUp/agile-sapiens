/**
 * AGIL-019: Load Test — Scenario C: Sustained Load (500K/day simulation)
 *
 * Purpose: Verify 500K daily capacity compressed into 30 minutes
 * Duration: ~30 minutes
 * Peak: 400 VUs (simulating afternoon peak)
 *
 * Usage:
 *   k6 run infrastructure/scripts/k6-sustained-load.js
 *   k6 run --out json=results/sustained-load.json infrastructure/scripts/k6-sustained-load.js
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';

const cacheHitRate = new Rate('cache_hit_rate');
const ttfbTrend = new Trend('ttfb_ms');
const errorRate = new Rate('error_rate');
const originRequests = new Counter('origin_requests');

const BASE_URL = __ENV.BASE_URL || 'https://sapiens.folkup.life';

export const options = {
  stages: [
    { duration: '2m', target: 200 },     // Morning ramp
    { duration: '8m', target: 200 },      // Morning plateau
    { duration: '5m', target: 400 },      // Afternoon peak ramp
    { duration: '5m', target: 400 },      // Peak sustained
    { duration: '5m', target: 150 },      // Evening decay
    { duration: '5m', target: 150 },      // Night traffic
  ],
  thresholds: {
    http_req_duration: ['p(50)<100', 'p(95)<300', 'p(99)<800'],
    http_req_failed: ['rate<0.001'],  // Strict: <0.1% for sustained
    cache_hit_rate: ['rate>0.95'],
    error_rate: ['rate<0.001'],
    ttfb_ms: ['p(95)<100'],
  },
  tags: {
    testScenario: 'sustained-load',
  },
};

// Realistic browsing pattern — users read multiple pages
const PAGES = [
  { url: '/', weight: 20, name: 'homepage' },
  { url: '/chapters/', weight: 15, name: 'chapters-index' },
  { url: '/chapters/chapter-0-pilot/', weight: 20, name: 'chapter-0' },
  { url: '/chapters/chapter-1-jules-verne/', weight: 25, name: 'chapter-1' },
  { url: '/archive/', weight: 8, name: 'archive' },
  { url: '/legal/privacy/', weight: 4, name: 'privacy' },
  { url: '/legal/terms/', weight: 3, name: 'terms' },
  { url: '/legal/ai-transparency/', weight: 3, name: 'ai-transparency' },
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

// Simulate a user session (3-5 pages)
function userSession() {
  const pageCount = Math.floor(Math.random() * 3) + 3; // 3-5 pages

  for (let i = 0; i < pageCount; i++) {
    const page = selectPage();
    const url = `${BASE_URL}${page.url}`;

    const params = {
      headers: {
        'User-Agent': 'k6-sustained/1.0 (AGIL-019; sapiens.folkup.life)',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Encoding': 'gzip, br',
      },
      tags: { page: page.name },
    };

    const res = http.get(url, params);

    ttfbTrend.add(res.timings.waiting);

    const cacheStatus = res.headers['Cf-Cache-Status'] || res.headers['cf-cache-status'] || '';
    cacheHitRate.add(cacheStatus === 'HIT');

    if (cacheStatus === 'MISS' || cacheStatus === 'EXPIRED') {
      originRequests.add(1);
    }

    const isError = res.status >= 400;
    errorRate.add(isError);

    check(res, {
      'status is 200': (r) => r.status === 200,
      'TTFB under 100ms': (r) => r.timings.waiting < 100,
      'cache HIT': (r) => {
        const cs = r.headers['Cf-Cache-Status'] || r.headers['cf-cache-status'];
        return cs === 'HIT';
      },
    });

    // Reading time between pages (longer for chapters, shorter for index)
    if (page.name.startsWith('chapter')) {
      sleep(Math.random() * 8 + 5);  // 5-13 seconds reading
    } else {
      sleep(Math.random() * 3 + 1);  // 1-4 seconds browsing
    }
  }
}

export default function () {
  userSession();
}

export function handleSummary(data) {
  const summary = {
    scenario: 'sustained-load',
    timestamp: new Date().toISOString(),
    duration_minutes: 30,
    target_capacity: '500K visitors/day',
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
    capacity_verification: {
      note: 'Compare total_requests against target: 500K visitors * 3.5 pages = 1.75M requests/day',
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
    'results/sustained-load-summary.json': JSON.stringify(summary, null, 2),
  };
}
