/**
 * AGIL-083 Cycle 1 Refinement — C1 title-block only
 *
 * Refinement of C1 Pure Typography seed v2 pattern:
 * - Preserve engraved title aesthetic (Darwin/Murray 1859 plate-mark)
 * - Suppress all secondary text (Flux invents Murray/London, lorem-ipsum-like gibberish)
 * - Leave empty canvas for post-production typography overlay
 *
 * Usage: REPLICATE_API_TOKEN=xxx node scripts/gen-cover-cycle1-refine.cjs
 * Output: C:\Transit\agil-083-cycle1-refined\c1r-v{1..3}.webp + preview.html
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.REPLICATE_API_TOKEN;
if (!TOKEN) {
  console.error('REPLICATE_API_TOKEN not set');
  process.exit(1);
}

const OUTPUT_DIR = 'C:\\Transit\\agil-083-cycle1-refined';
const DELAY_MS = 12000;
const MODEL_ENDPOINT = '/v1/models/black-forest-labs/flux-1.1-pro/predictions';
const SEEDS = 3;

const REFINED_PROMPT = 'First-edition Victorian academic monograph cover, 1859 plate-mark aesthetic, pure typography on ivory laid paper, zero illustration, zero ornament, zero decoration. One element only: the large classical serif title "AGILE SAPIENS" centered in deep burgundy ink, bold, subtle expanded letterspacing, dominating the upper third. Thin hairline double-rule plate-mark border around the entire page perimeter in burgundy ink. Faint aged paper grain, plate-mark memory, austere scholarly gravitas. Monochrome palette: ivory and burgundy ink only. Generous empty negative space below the title — intentionally sparse blank area, no subtitle, no author name, no publisher name, no date, no year, no byline, no signature, no additional text whatsoever anywhere on the page. The lower two-thirds of the page is empty ivory.';

const REFINED_NEGATIVE = 'author name, publisher name, subtitle text, byline, date, year, Murray, London, Paris, edition, by, any additional text, lorem ipsum, gibberish text, fake words, invented words, signature, hand-written text, watermark, illustration, figure, engraving plate, decorative frame, filigree, flourish, amber color, green color, photograph, 3d render, neon, cyberpunk, cursive script, calligraphy, Doe, Smith';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function apiRequest(method, pathname, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.replicate.com',
      path: pathname,
      method,
      headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch (e) { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => { stream.close(); resolve(); });
      stream.on('error', reject);
    }).on('error', reject);
  });
}

async function pollPrediction(id) {
  for (let i = 0; i < 60; i++) {
    const { body } = await apiRequest('GET', `/v1/predictions/${id}`);
    if (body.status === 'succeeded') return body;
    if (body.status === 'failed' || body.status === 'canceled') {
      throw new Error(`${body.status}: ${body.error || 'unknown'}`);
    }
    await sleep(5000);
  }
  throw new Error('timed out');
}

async function generateOne(seedIdx) {
  const label = `c1r-v${seedIdx}`;
  console.log(`\n[${label}] C1 refined — title-only, no metadata`);

  const { status, body } = await apiRequest('POST', MODEL_ENDPOINT, {
    input: {
      prompt: REFINED_PROMPT,
      aspect_ratio: '2:3',
      output_format: 'webp',
      output_quality: 90,
      safety_tolerance: 5,
    },
  });

  if (status === 429) {
    const retryAfter = body.detail?.match(/(\d+)/)?.[1] || 15;
    await sleep((parseInt(retryAfter) + 2) * 1000);
    return generateOne(seedIdx);
  }
  if (status !== 201 && status !== 200) {
    throw new Error(`API ${status}: ${JSON.stringify(body).slice(0, 200)}`);
  }

  let result = body;
  if (body.status !== 'succeeded') {
    console.log(`  polling ${body.id}...`);
    result = await pollPrediction(body.id);
  }

  const imageUrl = result.output;
  if (!imageUrl) throw new Error('no output');

  const filename = `${label}.webp`;
  const dest = path.join(OUTPUT_DIR, filename);
  await downloadFile(typeof imageUrl === 'string' ? imageUrl : imageUrl[0], dest);
  const sizeKB = Math.round(fs.statSync(dest).size / 1024);
  console.log(`  saved: ${filename} (${sizeKB}KB)`);
  return { seedIdx, filename, sizeKB };
}

function buildPreview(results) {
  const cells = results.map(r => {
    if (r && r.filename) {
      return `<figure><img src="${r.filename}" alt="seed ${r.seedIdx}"><figcaption>c1r-v${r.seedIdx} (${r.sizeKB}KB)</figcaption></figure>`;
    }
    return `<figure class="missing">seed ${r.seedIdx}: FAIL</figure>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="ru"><head><meta charset="utf-8">
<title>AGIL-083 Cycle 1 Refined — C1 title-only</title>
<style>
  body { margin: 0; padding: 2rem; background: #FEFCF6; color: #2A2317; font-family: Georgia, serif; }
  h1 { color: #7D4450; font-size: 1.5rem; margin: 0 0 0.3rem; }
  .note { color: #8B7866; font-style: italic; margin-bottom: 2rem; max-width: 760px; }
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; max-width: 1200px; }
  figure { margin: 0; text-align: center; }
  img { width: 100%; max-width: 360px; height: auto; border: 1px solid #F5F1EA; border-radius: 3px; }
  figcaption { font-size: 0.85rem; color: #8B7866; margin-top: 0.4rem; }
  .missing { color: #8B7866; font-style: italic; padding: 2rem; }
  footer { margin-top: 3rem; color: #8B7866; font-size: 0.8rem; font-style: italic; }
</style>
</head><body>
  <h1>AGIL-083 Cycle 1 Refined — C1 title-only</h1>
  <p class="note">3 seed-вариации с явным запретом на invented text. Title-block только — subtitle/автор/publisher будут наложены в post-production (ImageMagick, точная типографика). Выбери нравящийся seed.</p>
  <div class="grid">${cells}</div>
  <footer>Зеркальце · Cycle 1 refinement · ${new Date().toISOString().slice(0, 16)}</footer>
</body></html>`;
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`C1 refinement: ${SEEDS} seeds, title-only prompt, no metadata`);

  const results = [];
  for (let i = 1; i <= SEEDS; i++) {
    try { results.push(await generateOne(i)); }
    catch (err) {
      console.error(`  FAIL v${i}: ${err.message}`);
      results.push({ seedIdx: i, filename: null, error: err.message });
    }
    if (i < SEEDS) { console.log(`  waiting ${DELAY_MS / 1000}s...`); await sleep(DELAY_MS); }
  }

  console.log('\n--- Results ---');
  let ok = 0;
  for (const r of results) {
    if (r.filename) { console.log(`  OK v${r.seedIdx} → ${r.filename} (${r.sizeKB}KB)`); ok++; }
    else { console.log(`  FAIL v${r.seedIdx}: ${r.error}`); }
  }
  fs.writeFileSync(path.join(OUTPUT_DIR, 'preview.html'), buildPreview(results), 'utf8');
  console.log(`\nPreview: ${path.join(OUTPUT_DIR, 'preview.html')}`);
  console.log(`Totals: ${ok} OK, cost ≈ $${(ok * 0.04).toFixed(2)}`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
