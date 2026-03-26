/**
 * AGIL-019: Load Test — Scenario D: Chapter Publication Spike
 *
 * Purpose: Simulate first 24 hours after new chapter publication
 * Pattern: Newsletter → social shares → viral amplification → decay
 * Duration: ~20 minutes
 * Peak: 2000 VUs
 *
 * Usage:
 *   k6 run infrastructure/scripts/k6-chapter-spike.js
 *   k6 run --out json=results/chapter-spike.json infrastructure/scripts/k6-chapter-spike.js
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';

const cacheHitRate = new Rate('cache_hit_rate');
const ttfbTrend = new Trend('ttfb_ms');
const errorRate = new Rate('error_rate');
const originRequests = new Counter('origin_requests');

const BASE_URL = __ENV.BASE_URL || 'https://sapiens.folkup.life';
// The new chapter URL — update for each test
const NEW_CHAPTER = __ENV.NEW_CHAPTER || '/chapters/chapter-1-jules-verne/';

export const options = {
  stages: [
    { duration: '1m', target: 100 },     // Newsletter opens
    { duration: '2m', target: 800 },      // Social sharing cascade
    { duration: '2m', target: 2000 },     // Viral amplification
    { duration: '5m', target: 2000 },     // Peak interest sustained
    { duration: '5m', target: 500 },      // Natural decay
    { duration: '5m', target: 200 },      // Long tail
  ],
  thresholds: {
    http_req_duration: ['p(50)<150', 'p(95)<500', 'p(99)<1500'],
    http_req_failed: ['rate<0.02'],
    cache_hit_rate: ['rate>0.90'],
    error_rate: ['rate<0.02'],
  },
  tags: {
    testScenario: 'chapter-spike',
  },
};

// Chapter publication traffic: 60% goes to new chapter
const PAGES = [
  { url: NEW_CHAPTER, weight: 60, name: 'new-chapter' },
  { url: '/', weight: 20, name: 'homepage' },
  { url: '/chapters/', weight: 10, name: 'chapters-index' },
  { url: '/chapters/chapter-0-pilot/', weight: 5, name: 'previous-chapter' },
  { url: '/legal/privacy/', weight: 2, name: 'privacy' },
  { url: '/archive/', weight: 3, name: 'archive' },
];

// Simulate different referrer sources
const REFERRERS = [
  'https://mail.google.com/',       // Newsletter
  'https://www.linkedin.com/',      // Professional sharing
  'https://twitter.com/',           // Social
  'https://www.reddit.com/',        // Reddit
  '',                               // Direct
  'https://news.ycombinator.com/',  // HN
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
  const referrer = REFERRERS[Math.floor(Math.random() * REFERRERS.length)];

  const params = {
    headers: {
      'User-Agent': 'k6-chapter-spike/1.0 (AGIL-019; sapiens.folkup.life)',
      'Accept': 'text/html,application/xhtml+xml',
      'Accept-Encoding': 'gzip, br',
      'Referer': referrer,
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
    'response not empty': (r) => r.body && r.body.length > 0,
    'TTFB under 200ms': (r) => r.timings.waiting < 200,
  });

  // Mixed dwell times: newsletter readers read longer, social users bounce faster
  if (referrer.includes('mail')) {
    sleep(Math.random() * 10 + 5);   // 5-15s: email readers engage deeply
  } else if (referrer.includes('reddit') || referrer.includes('ycombinator')) {
    sleep(Math.random() * 5 + 2);    // 2-7s: tech readers moderate engagement
  } else {
    sleep(Math.random() * 3 + 1);    // 1-4s: social browsers
  }
}

export function handleSummary(data) {
  const summary = {
    scenario: 'chapter-spike',
    timestamp: new Date().toISOString(),
    new_chapter_url: NEW_CHAPTER,
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
    'results/chapter-spike-summary.json': JSON.stringify(summary, null, 2),
  };
}
