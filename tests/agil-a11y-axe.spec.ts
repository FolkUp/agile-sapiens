/**
 * AGIL-a11y-axe — WCAG 2.1 AA lightweight regression scan (cont +13)
 *
 * Runs axe-core на 4 canonical pages. Fails на 'critical' или 'serious' violations.
 * Per Q-C policy cont +13: a11y каждый батч.
 * B7 (cont +14 dedicated) covers full WCAG 2.1 AA depth (ARIA landmarks, keyboard
 * nav, contrast full audit, screen reader UX, alt text semantic depth).
 *
 * Threshold: 0 critical + 0 serious blocking. Moderate + minor tracked но not blocking.
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const BASE = process.env.PLAYWRIGHT_BASE_URL || 'https://sapiens.folkup.life';

const PAGES = [
  { key: 'home',       url: '/' },
  { key: 'ch-0',       url: '/chapters/chapter-0-pilot/' },
  { key: 'ch-1',       url: '/chapters/chapter-1-jules-verne/' },
  { key: 'colophon',   url: '/apparatus/colophon/' },
];

for (const { key, url } of PAGES) {
  test(`a11y ${key} (${url}) — WCAG 2.1 AA critical+serious`, async ({ page }) => {
    await page.goto(BASE + url, { waitUntil: 'domcontentloaded', timeout: 30000 });

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const critical = results.violations.filter(v => v.impact === 'critical');
    const serious = results.violations.filter(v => v.impact === 'serious');
    const moderate = results.violations.filter(v => v.impact === 'moderate');
    const minor = results.violations.filter(v => v.impact === 'minor');

    // Log summary always
    console.log(`[a11y ${key}] critical=${critical.length} serious=${serious.length} moderate=${moderate.length} minor=${minor.length}`);

    if (critical.length > 0 || serious.length > 0) {
      console.error(`❌ a11y violations blocking on ${key}:`);
      [...critical, ...serious].forEach(v => {
        console.error(`  [${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} node(s))`);
        v.nodes.slice(0, 3).forEach(n => {
          console.error(`    target: ${n.target.join(', ')}`);
        });
      });
    }

    expect(critical.length, `Critical WCAG violations on ${key}`).toBe(0);
    expect(serious.length, `Serious WCAG violations on ${key}`).toBe(0);
  });
}
