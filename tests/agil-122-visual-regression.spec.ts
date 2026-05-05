/**
 * AGIL-122 — Visual Regression Baselines + 1920px Content Width
 *
 * Covers pages not in agil-120 baselines:
 *   chapter-1-jules-verne, chapter-3-holmes, chapter-5-nemo, /declaration/
 *
 * H. Screenshots + overflow check at 375px and 1280px
 * I. Content width assertion at 1920px (hextra-max-page-width ≤ 1280px = 80rem)
 */

import { test, expect, Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

const BASE = process.env.PLAYWRIGHT_BASE_URL || 'https://sapiens.folkup.life';

const screenshotsDir = path.join('tests', 'screenshots');
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

async function shot(page: Page, name: string) {
  await page.screenshot({ path: path.join(screenshotsDir, `${name}.png`), fullPage: false });
}

async function loadPage(page: Page, url: string) {
  await page.goto(BASE + url, { waitUntil: 'networkidle', timeout: 30000 });
}

// ================================================================
// H. VISUAL REGRESSION BASELINES — 375px + 1280px
// ================================================================
// Pages not captured by agil-120 (which covers homepage, ch-0, drawer, footer).

const BASELINE_PAGES = [
  { key: 'ch1',         url: '/chapters/chapter-1-jules-verne/' },
  { key: 'ch3-holmes',  url: '/chapters/chapter-3-holmes/' },
  { key: 'ch5',         url: '/chapters/chapter-5-nemo/' },
  { key: 'declaration', url: '/declaration/' },
] as const;

for (const { key, url } of BASELINE_PAGES) {
  test(`H.1 375px: ${key} no horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await loadPage(page, url);
    const overflow = await page.evaluate(
      () => document.body.scrollWidth > window.innerWidth,
    );
    expect(overflow, `${key}: body must not overflow 375px viewport`).toBe(false);
    await shot(page, `${key}-375`);
  });

  test(`H.2 1280px: ${key} baseline screenshot`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await loadPage(page, url);
    const overflow = await page.evaluate(
      () => document.body.scrollWidth > window.innerWidth,
    );
    expect(overflow, `${key}: body must not overflow 1280px viewport`).toBe(false);
    await shot(page, `${key}-1280`);
  });
}

// ================================================================
// I. CONTENT WIDTH — 1920px
// ================================================================
// Hextra caps the page layout at .hextra-max-page-width (80rem = 1280px).
// At 1920px viewport the container must respect this cap — text content
// should not stretch to fill the full ultra-wide viewport.

const MAX_PAGE_PX = 1280; // hextra-max-page-width = 80rem @ 16px base

const WIDE_PAGES = [
  { key: 'ch0',        url: '/chapters/chapter-0-pilot/' },
  { key: 'ch1',        url: '/chapters/chapter-1-jules-verne/' },
  { key: 'ch3-holmes', url: '/chapters/chapter-3-holmes/' },
  { key: 'ch5',        url: '/chapters/chapter-5-nemo/' },
] as const;

for (const { key, url } of WIDE_PAGES) {
  test(`I.1 1920px: ${key} content width ≤ ${MAX_PAGE_PX}px`, async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await loadPage(page, url);
    const width = await page.evaluate(() => {
      const el = document.querySelector('.hextra-max-page-width');
      return el ? el.getBoundingClientRect().width : -1;
    });
    expect(width, '.hextra-max-page-width must be present').toBeGreaterThan(0);
    expect(width, `.hextra-max-page-width must be ≤ ${MAX_PAGE_PX}px at 1920px viewport`).toBeLessThanOrEqual(MAX_PAGE_PX);
  });
}
