/**
 * AGIL-019: Baseline Performance Measurement
 *
 * Purpose: Quick 60-second baseline with 10 VUs
 * Use before and after changes to detect regressions
 *
 * Usage:
 *   k6 run infrastructure/scripts/k6-baseline.js
 *   k6 run --out json=results/baseline.json infrastructure/scripts/k6-baseline.js
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const cacheHitRate = new Rate('cache_hit_rate');
const ttfbTrend = new Trend('ttfb_ms');

const BASE_URL = __ENV.BASE_URL || 'https://sapiens.folkup.life';

export const options = {
  vus: 10,
  duration: '60s',
  thresholds: {
    http_req_duration: ['p(50)<100', 'p(95)<300'],
    http_req_failed: ['rate<0.01'],
    cache_hit_rate: ['rate>0.90'],
    ttfb_ms: ['p(95)<100'],
  },
  tags: {
    testScenario: 'baseline',
  },
};

const PAGES = [
  '/',
  '/chapters/',
  '/chapters/chapter-0-pilot/',
  '/chapters/chapter-1-jules-verne/',
  '/archive/',
  '/legal/privacy/',
  '/legal/terms/',
  '/legal/ai-transparency/',
  '/legal/editorial-workflow/',
];

export default function () {
  const page = PAGES[Math.floor(Math.random() * PAGES.length)];
  const url = `${BASE_URL}${page}`;

  const res = http.get(url, {
    headers: {
      'User-Agent': 'k6-baseline/1.0 (AGIL-019; sapiens.folkup.life)',
      'Accept': 'text/html',
      'Accept-Encoding': 'gzip, br',
    },
    tags: { page: page },
  });

  ttfbTrend.add(res.timings.waiting);

  const cacheStatus = res.headers['Cf-Cache-Status'] || res.headers['cf-cache-status'] || '';
  cacheHitRate.add(cacheStatus === 'HIT');

  check(res, {
    'status 200': (r) => r.status === 200,
    'TTFB < 100ms': (r) => r.timings.waiting < 100,
    'cache HIT': (r) => {
      const cs = r.headers['Cf-Cache-Status'] || r.headers['cf-cache-status'];
      return cs === 'HIT';
    },
  });

  sleep(1);
}

export function handleSummary(data) {
  const summary = {
    scenario: 'baseline',
    timestamp: new Date().toISOString(),
    metrics: {
      http_req_duration_p50: data.metrics.http_req_duration?.values?.['p(50)'],
      http_req_duration_p95: data.metrics.http_req_duration?.values?.['p(95)'],
      http_req_failed_rate: data.metrics.http_req_failed?.values?.rate,
      cache_hit_rate: data.metrics.cache_hit_rate?.values?.rate,
      ttfb_p95: data.metrics.ttfb_ms?.values?.['p(95)'],
      total_requests: data.metrics.http_reqs?.values?.count,
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
    'results/baseline-summary.json': JSON.stringify(summary, null, 2),
  };
}
