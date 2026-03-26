/**
 * AGIL-019: Load Test — Scenario E: Backlash/Coordinated Traffic
 *
 * Purpose: Simulate certification industry backlash with aggressive patterns
 * Duration: ~10 minutes
 * Peak: 5000 VUs (stress test upper boundary)
 *
 * Usage:
 *   k6 run infrastructure/scripts/k6-backlash.js
 *   k6 run --out json=results/backlash.json infrastructure/scripts/k6-backlash.js
 *
 * WARNING: This is a stress test. Ensure test IPs are whitelisted.
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';

const cacheHitRate = new Rate('cache_hit_rate');
const ttfbTrend = new Trend('ttfb_ms');
const errorRate = new Rate('error_rate');
const challengeCount = new Counter('challenge_responses');
const originRequests = new Counter('origin_requests');

const BASE_URL = __ENV.BASE_URL || 'https://sapiens.folkup.life';

export const options = {
  stages: [
    { duration: '1m', target: 500 },     // Organic discovery
    { duration: '1m', target: 5000 },     // Coordinated spike
    { duration: '3m', target: 5000 },     // Sustained backlash
    { duration: '3m', target: 1000 },     // Fatigue
    { duration: '2m', target: 200 },      // Residual
  ],
  thresholds: {
    // Very relaxed — this is a stress test
    http_req_duration: ['p(50)<500', 'p(95)<3000'],
    http_req_failed: ['rate<0.10'],  // Up to 10% acceptable under extreme load
  },
  tags: {
    testScenario: 'backlash',
  },
};

// Backlash behavior profiles
const BEHAVIORS = [
  {
    name: 'rage-click',
    weight: 40,
    pages: ['/chapters/chapter-1-jules-verne/'],
    dwellTime: () => Math.random() * 1 + 0.3,  // Quick bounce
  },
  {
    name: 'deep-reader',
    weight: 30,
    pages: [
      '/chapters/chapter-1-jules-verne/',
      '/chapters/chapter-0-pilot/',
      '/chapters/',
      '/',
    ],
    dwellTime: () => Math.random() * 5 + 3,  // Genuine reading
  },
  {
    name: 'ammo-hunter',
    weight: 20,
    pages: [
      '/chapters/chapter-1-jules-verne/',
      '/chapters/chapter-0-pilot/',
      '/legal/ai-transparency/',
      '/legal/editorial-workflow/',
      '/archive/',
    ],
    dwellTime: () => Math.random() * 2 + 0.5,  // Rapid page cycling
  },
  {
    name: 'screenshotter',
    weight: 10,
    pages: ['/chapters/chapter-1-jules-verne/'],
    dwellTime: () => Math.random() * 8 + 3,  // Slow, capturing content
  },
];

function selectBehavior() {
  const rand = Math.random() * 100;
  let cumulative = 0;
  for (const behavior of BEHAVIORS) {
    cumulative += behavior.weight;
    if (rand <= cumulative) return behavior;
  }
  return BEHAVIORS[0];
}

export default function () {
  const behavior = selectBehavior();
  const pages = behavior.pages;

  // Each behavior visits 1-N pages
  const pageCount = behavior.name === 'rage-click' ? 1 : pages.length;

  for (let i = 0; i < pageCount; i++) {
    const pagePath = pages[i % pages.length];
    const url = `${BASE_URL}${pagePath}`;

    const params = {
      headers: {
        'User-Agent': 'k6-backlash/1.0 (AGIL-019; sapiens.folkup.life)',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Encoding': 'gzip, br',
      },
      tags: {
        page: pagePath.replace(/\//g, '-').replace(/^-|-$/g, '') || 'homepage',
        behavior: behavior.name,
      },
      redirects: 0,
    };

    const res = http.get(url, params);

    ttfbTrend.add(res.timings.waiting);

    const cacheStatus = res.headers['Cf-Cache-Status'] || res.headers['cf-cache-status'] || '';
    cacheHitRate.add(cacheStatus === 'HIT');

    if (cacheStatus === 'MISS' || cacheStatus === 'EXPIRED') {
      originRequests.add(1);
    }

    if (res.status === 403 || res.status === 429 || res.status === 503) {
      challengeCount.add(1);
    }

    const isError = res.status >= 500;
    errorRate.add(isError);

    check(res, {
      'not server error': (r) => r.status < 500,
      'response has body': (r) => r.body && r.body.length > 0,
    });

    sleep(behavior.dwellTime());
  }
}

export function handleSummary(data) {
  const summary = {
    scenario: 'backlash-stress-test',
    timestamp: new Date().toISOString(),
    warning: 'Stress test — relaxed thresholds, measures resilience not performance',
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
    'results/backlash-summary.json': JSON.stringify(summary, null, 2),
  };
}
