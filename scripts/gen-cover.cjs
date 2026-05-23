#!/usr/bin/env node
/**
 * AGIL-185 cover + OG regenerator.
 *
 * Renders the SVG/CSS cover (scripts/gen-cover.html → 1600×2400) and OG card
 * (scripts/gen-cover-og.html → 1200×630) via local Playwright (chromium),
 * converts the cover PNG to WebP via ImageMagick, and writes the results to:
 *   static/images/cover.webp           (book cover — homepage hero, EPUB, PDF)
 *   static/assets/og-image-default.png (social-card default OG image)
 *
 * Requirements:
 *   - Node + node_modules/playwright (already in repo)
 *   - `magick` (ImageMagick 7+) on PATH for PNG → WebP conversion
 *
 * Re-render workflow:
 *   1. Edit scripts/gen-cover.html or scripts/gen-cover-og.html
 *   2. node scripts/gen-cover.cjs
 *   3. git diff static/images/cover.webp static/assets/og-image-default.png
 *
 * Provenance note: web fonts (Cinzel, EB Garamond) load from Google Fonts CDN
 * at render time. If network is unavailable, vendor the fonts locally and
 * adjust the HTML <link> accordingly.
 */

const path = require('path');
const fs = require('fs');
const os = require('os');
const { execFileSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SCRIPTS_DIR  = __dirname;
const { chromium } = require(path.join(PROJECT_ROOT, 'node_modules', 'playwright'));

// Use a session-scoped tmp dir for intermediate PNGs.
const TMP_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'agil-185-'));
console.log(`Intermediate PNGs: ${TMP_DIR}`);

const JOBS = [
    {
        name: 'Cover (1600×2400)',
        html:    path.join(SCRIPTS_DIR, 'gen-cover.html'),
        png:     path.join(TMP_DIR,     'cover.png'),
        webp:    path.join(PROJECT_ROOT, 'static', 'images', 'cover.webp'),
        width: 1600, height: 2400, selector: '.cover',
    },
    {
        name: 'OG card (1200×630)',
        html:    path.join(SCRIPTS_DIR, 'gen-cover-og.html'),
        png:     path.join(PROJECT_ROOT, 'static', 'assets', 'og-image-default.png'),
        webp:    null,
        width: 1200, height: 630, selector: '.og',
    },
];

(async () => {
    console.log('Launching chromium...');
    const browser = await chromium.launch({ headless: true });
    try {
        for (const j of JOBS) {
            console.log(`\n--- ${j.name} ---`);
            const ctx = await browser.newContext({
                viewport: { width: j.width, height: j.height },
                deviceScaleFactor: 1,
            });
            const page = await ctx.newPage();
            const fileUrl = 'file:///' + j.html.replace(/\\/g, '/');
            console.log(`  loading: ${fileUrl}`);
            await page.goto(fileUrl, { waitUntil: 'networkidle', timeout: 30000 });
            await page.waitForFunction(
                () => document.fonts && document.fonts.status === 'loaded',
                null,
                { timeout: 15000 }
            ).catch(() => {});
            await page.waitForTimeout(500);
            const el = await page.$(j.selector);
            if (!el) { throw new Error(`${j.selector} not found in ${j.html}`); }
            await el.screenshot({ path: j.png, type: 'png' });
            const pngStats = fs.statSync(j.png);
            console.log(`  PNG: ${j.png}  (${(pngStats.size / 1024).toFixed(1)} KB)`);

            if (j.webp) {
                // PNG → WebP via ImageMagick (q=88 visually transparent; method=6 best compression)
                execFileSync('magick', [
                    j.png,
                    '-quality', '88',
                    '-define', 'webp:method=6',
                    j.webp,
                ], { stdio: 'inherit' });
                const webpStats = fs.statSync(j.webp);
                console.log(`  WebP: ${j.webp}  (${(webpStats.size / 1024).toFixed(1)} KB)`);
            }
            await ctx.close();
        }
    } finally {
        await browser.close();
    }
    console.log('\nDone. Next: review static/images/cover.webp and static/assets/og-image-default.png in git diff.');
})().catch((e) => { console.error(e); process.exit(1); });
