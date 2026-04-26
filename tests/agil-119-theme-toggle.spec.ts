/**
 * AGIL-119 Theme Toggle — Production Verification
 * Target: https://sapiens.folkup.life/
 * Verifies: visibility, functional behaviour, persistence, no duplicates, keyboard nav, contrast screenshots
 */

import { test, expect, Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

const BASE = 'https://sapiens.folkup.life';

const PAGES = [
  { name: 'homepage-ru', url: '/' },
  { name: 'homepage-en', url: '/en/' },
  { name: 'chapter-pilot', url: '/chapters/chapter-0-pilot/' },
  { name: 'legal-privacy', url: '/legal/privacy/' },
];

const BREAKPOINTS = [
  { label: 'mobile-S', width: 375, height: 812 },
  { label: 'tablet', width: 768, height: 1024 },
  { label: 'laptop', width: 1024, height: 768 },
  { label: 'desktop-xl', width: 1440, height: 900 },
];

const TOGGLE_SELECTOR = '.folkup-theme-toggle';
const LIGHT_BTN = '[data-folkup-theme="light"]';
const DARK_BTN = '[data-folkup-theme="dark"]';

// Helper: wait for page to settle after navigation
async function loadPage(page: Page, url: string) {
  await page.goto(BASE + url, { waitUntil: 'networkidle' });
}

// Helper: get toggle inside nav (excludes any accidental duplicates outside nav)
async function getToggleInNav(page: Page) {
  return page.locator(`nav ${TOGGLE_SELECTOR}`).first();
}

// ============================================================
// A. Visibility — toggle present on each page × each breakpoint
// ============================================================
for (const pg of PAGES) {
  for (const bp of BREAKPOINTS) {
    test(`A. visibility | ${pg.name} | ${bp.label} (${bp.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await loadPage(page, pg.url);

      const toggle = page.locator(`nav ${TOGGLE_SELECTOR}`).first();
      await expect(toggle).toBeVisible({ timeout: 8000 });

      // On mobile <400px: labels hidden, icons visible
      if (bp.width < 400) {
        const labels = toggle.locator('span');
        const count = await labels.count();
        for (let i = 0; i < count; i++) {
          await expect(labels.nth(i)).toBeHidden();
        }
      }
    });
  }
}

// ============================================================
// B. Functional behaviour — click light / click dark
// ============================================================
test('B. click light → html.light, not html.dark, aria-checked synced, localStorage', async ({ page }) => {
  await loadPage(page, '/');
  const toggle = await getToggleInNav(page);

  // First set to dark to have a known baseline
  await toggle.locator(DARK_BTN).click();
  await page.waitForTimeout(200);

  // Now click light
  await toggle.locator(LIGHT_BTN).click();
  await page.waitForTimeout(200);

  const hasDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  const hasLight = await page.evaluate(() => document.documentElement.classList.contains('light'));
  expect(hasDark).toBe(false);
  expect(hasLight).toBe(true);

  const lightAriaChecked = await toggle.locator(LIGHT_BTN).getAttribute('aria-checked');
  const darkAriaChecked = await toggle.locator(DARK_BTN).getAttribute('aria-checked');
  expect(lightAriaChecked).toBe('true');
  expect(darkAriaChecked).toBe('false');

  const lightTabindex = await toggle.locator(LIGHT_BTN).getAttribute('tabindex');
  const darkTabindex = await toggle.locator(DARK_BTN).getAttribute('tabindex');
  expect(lightTabindex).toBe('0');
  expect(darkTabindex).toBe('-1');

  const stored = await page.evaluate(() => localStorage.getItem('color-theme'));
  expect(stored).toBe('light');
});

test('B. click dark → html.dark, not html.light, aria-checked synced, localStorage', async ({ page }) => {
  await loadPage(page, '/');
  const toggle = await getToggleInNav(page);

  // First set to light baseline
  await toggle.locator(LIGHT_BTN).click();
  await page.waitForTimeout(200);

  // Now click dark
  await toggle.locator(DARK_BTN).click();
  await page.waitForTimeout(200);

  const hasDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  expect(hasDark).toBe(true);

  const darkAriaChecked = await toggle.locator(DARK_BTN).getAttribute('aria-checked');
  const lightAriaChecked = await toggle.locator(LIGHT_BTN).getAttribute('aria-checked');
  expect(darkAriaChecked).toBe('true');
  expect(lightAriaChecked).toBe('false');

  const stored = await page.evaluate(() => localStorage.getItem('color-theme'));
  expect(stored).toBe('dark');
});

// ============================================================
// C. Persistence — reload preserves theme
// ============================================================
test('C. persistence: light → reload → still light', async ({ page }) => {
  await loadPage(page, '/');
  const toggle = await getToggleInNav(page);

  await toggle.locator(LIGHT_BTN).click();
  await page.waitForTimeout(200);

  await page.reload({ waitUntil: 'networkidle' });

  const hasDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  const hasLight = await page.evaluate(() => document.documentElement.classList.contains('light'));
  expect(hasDark).toBe(false);
  expect(hasLight).toBe(true);
});

test('C. persistence: dark → reload → still dark', async ({ page }) => {
  await loadPage(page, '/');
  const toggle = await getToggleInNav(page);

  await toggle.locator(DARK_BTN).click();
  await page.waitForTimeout(200);

  await page.reload({ waitUntil: 'networkidle' });

  const hasDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  expect(hasDark).toBe(true);
});

test('C. migration: localStorage="system" → reload → becomes dark', async ({ page }) => {
  // Pre-set legacy value before navigating
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.setItem('color-theme', 'system'));

  await page.reload({ waitUntil: 'networkidle' });

  const stored = await page.evaluate(() => localStorage.getItem('color-theme'));
  const hasDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));

  // Migration script should have converted "system" → "dark"
  expect(stored).toBe('dark');
  expect(hasDark).toBe(true);
});

// ============================================================
// D. Single toggle — no duplicates
// ============================================================
for (const pg of [PAGES[0], PAGES[1]]) { // homepage RU + EN
  test(`D. no duplicates on ${pg.name}`, async ({ page }) => {
    await loadPage(page, pg.url);
    const count = await page.locator(TOGGLE_SELECTOR).count();
    expect(count).toBe(1);
  });
}

// ============================================================
// E. Keyboard navigation — ArrowRight / ArrowLeft
// ============================================================
test('E. keyboard: focus active btn → ArrowRight → switches theme', async ({ page }) => {
  await loadPage(page, '/');
  const toggle = await getToggleInNav(page);

  // Set to light first so we know current state
  await toggle.locator(LIGHT_BTN).click();
  await page.waitForTimeout(200);

  // Focus the active (light) button and press ArrowRight
  await toggle.locator(LIGHT_BTN).focus();
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(200);

  const hasDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  expect(hasDark).toBe(true);
});

test('E. keyboard: focus dark btn → ArrowLeft → switches to light', async ({ page }) => {
  await loadPage(page, '/');
  const toggle = await getToggleInNav(page);

  // Set to dark first
  await toggle.locator(DARK_BTN).click();
  await page.waitForTimeout(200);

  await toggle.locator(DARK_BTN).focus();
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(200);

  const hasLight = await page.evaluate(() => document.documentElement.classList.contains('light'));
  expect(hasLight).toBe(true);
});

// ============================================================
// F. Contrast screenshots (light + dark mode)
// ============================================================
test('F. screenshot: homepage dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await loadPage(page, '/');
  const toggle = await getToggleInNav(page);

  await toggle.locator(DARK_BTN).click();
  await page.waitForTimeout(300);

  const screenshotsDir = path.join('tests', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

  await page.screenshot({ path: path.join(screenshotsDir, 'homepage-dark.png'), fullPage: false });
});

test('F. screenshot: homepage light mode', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await loadPage(page, '/');
  const toggle = await getToggleInNav(page);

  await toggle.locator(LIGHT_BTN).click();
  await page.waitForTimeout(300);

  const screenshotsDir = path.join('tests', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

  await page.screenshot({ path: path.join(screenshotsDir, 'homepage-light.png'), fullPage: false });
});

test('F. screenshot: toggle closeup dark', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await loadPage(page, '/');
  const toggle = await getToggleInNav(page);

  await toggle.locator(DARK_BTN).click();
  await page.waitForTimeout(300);

  const screenshotsDir = path.join('tests', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

  await toggle.screenshot({ path: path.join(screenshotsDir, 'toggle-dark.png') });
});

test('F. screenshot: toggle closeup light', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await loadPage(page, '/');
  const toggle = await getToggleInNav(page);

  await toggle.locator(LIGHT_BTN).click();
  await page.waitForTimeout(300);

  const screenshotsDir = path.join('tests', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

  await toggle.screenshot({ path: path.join(screenshotsDir, 'toggle-light.png') });
});
