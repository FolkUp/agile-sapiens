/**
 * AGIL-083 Cycle 0 cover generation — Variant C (Typographic Frontispiece)
 * 5 sub-variants × 3 generations = 15 previews for HTML-picker
 *
 * Usage:
 *   REPLICATE_API_TOKEN=xxx node scripts/gen-cover-cycle0.cjs [variant|all]
 *   variant ∈ {c1,c2,c3,c4,c5}
 *
 * Source of prompts: C:\Transit\agil-083-variant-c-subvariants.md sections 3.9/4.9/5.9/6.9/7.9
 *
 * Output: C:\Transit\agil-083-cycle0-previews\{c1..c5}-v{1..3}.webp
 *         C:\Transit\agil-083-cycle0-previews\preview.html (grid 5x3)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.REPLICATE_API_TOKEN;
if (!TOKEN) {
  console.error('Error: REPLICATE_API_TOKEN not set. Extract via sops and run via bash:');
  console.error('  export REPLICATE_API_TOKEN=$(sops -d --extract \'["api_token"]\' vault/secrets/replicate.enc.yaml)');
  process.exit(1);
}

const OUTPUT_DIR = 'C:\\Transit\\agil-083-cycle0-previews';
const DELAY_MS = 12000; // 12s between API calls per Flux 1.1 Pro rate-limit empirical
const MODEL_ENDPOINT = '/v1/models/black-forest-labs/flux-1.1-pro/predictions';
const GENERATIONS_PER_VARIANT = 3;

const VARIANTS = {
  c1: {
    name: 'Pure Typography (Darwin/Murray)',
    prompt: 'First-edition Victorian academic monograph cover, 1859 John Murray London aesthetic, pure typography on ivory laid paper, zero illustration, zero ornament. Large classical serif title "AGILE SAPIENS" centered in deep burgundy ink, subtle expanded letterspacing. Thin hairline rule beneath. Two-line italic subtitle in dark chocolate ink. Small capitals publisher line at bottom. Generous white margins. Faint aged paper grain, plate-mark memory, austere scholarly gravitas. Monochrome palette: ivory, burgundy, chocolate ink only. No border, no vignette, no decoration whatsoever.',
    negative: 'border, vignette, ornament, illustration, figure, engraving plate, decorative frame, filigree, flourish, amber color, green color, photograph, 3d render, neon, cyberpunk',
  },
  c2: {
    name: 'Emblematic Medallion (pocket-watch)',
    prompt: 'Late-Victorian academic monograph cover, ivory laid paper, strict typographic hierarchy with one centered engraved medallion. Top: large classical serif title "AGILE SAPIENS" in deep burgundy, thin hairline rule below, two-line italic subtitle in chocolate. Center: circular steel-engraved emblem (~50mm diameter) showing an open pocket-watch with exposed clockwork gears and upward-pointing hands, fine parallel hatching and crosshatching, delicate thin bordeaux frame ring, engraving aesthetic of 18th-century frontispiece vignette. Subtle tiny amber highlight on the watch face center. Bottom: small italic Latin motto, then author line and publisher line in small capitals. Restrained palette ivory / burgundy / chocolate with one amber touch. Bookplate-elegant, scholarly, monochrome engraving feel.',
    negative: 'full illustration, scenic landscape, human figure, portrait, modern icon, flat vector logo, gradient, shadow blur, photograph, 3d render, neon, cyberpunk, saturated colors',
  },
  c3: {
    name: 'Decorative Border (Murray 1880s)',
    prompt: 'Victorian decorative monograph title page, ivory laid paper within elaborate engraved border. Border 6-8mm wide all around: double hairline bordeaux rule enclosing botanical ornament (oak leaves, fern fronds, acanthus) in fine steel engraving, four tiny corner medallions (hourglass top-left, open book top-right, quill bottom-left, cogwheel bottom-right), two amber fleurons centered on top and bottom edges. Inside the frame: centered typography only. Top: large classical serif title "AGILE SAPIENS" in deep burgundy with thin hairline rule below, two-line italic subtitle in chocolate ink. Open negative space in middle. Bottom: small italic author line and small-caps publisher line. John Murray 1880s aesthetic with light Kelmscott echo, restrained not maximalist, monochrome engraving with bordeaux and chocolate ink and sparse amber accent.',
    negative: 'photographic frame, digital vector border, art nouveau heavy curves, Celtic knot, Mucha, baroque heavy ornament, gold foil, glitter, saturated colors, 3d render',
  },
  c4: {
    name: 'Marbled Paper (antiquarian)',
    prompt: 'Antiquarian monograph cover, 19th-century library binding aesthetic. Full-bleed background: authentic Turkish ebru marbled paper texture, stone pattern, muted palette of ivory base with subtle swirls in burgundy (hex 7D4450, low opacity), amber (hex E8AD4A, low opacity), and thin chocolate veining. Centered rectangular ivory inset panel (approximately 60% width, 70% height) with thin double plate-mark border in burgundy floating above the marbled background. Inside the panel: large classical serif title "AGILE SAPIENS" in deep burgundy, hairline rule, two-line italic subtitle in chocolate, author line, small engraved publisher signet at bottom, "FolkUp MMXXVI" in small capitals. Rare-books-room warmth, restrained antiquarian elegance, zero photographic gloss, engraving-aesthetic typography.',
    negative: 'oil paint swirls, psychedelic, tie-dye, rainbow colors, saturated marbling, modern abstract art, acrylic pour, alcohol ink, fluid art, neon marble, 3d render, photograph',
  },
  c5: {
    name: 'Minimal Abstract (private press)',
    prompt: 'Private-press minimalist book cover, Doves Press and Ashendene Press aesthetic 1900s, ivory paper, extremely restrained typography. Two thin hairline horizontal bordeaux rules (upper third and lower third) spanning the width. Four microscopic typographic corner marks (small filled lozenges, chocolate ink, 3-4mm) at the four corners. Small italic classifier line upper, italic author line above title. Large classical serif title "AGILE SAPIENS" in deep burgundy, centered, expanded letterspacing, no rule underneath. Two-line italic subtitle in chocolate ink below title. Generous negative space. Small capitals publisher line at bottom center between corner marks. Zero botanical ornament, zero figure, zero border frame, zero illustration. Pure typographic quiet elegance, modern-classic restraint.',
    negative: 'botanical ornament, leaf, flourish, vignette, heavy border, illustration, figure, medallion, emblem, marbled texture, amber color dominance, ornate frame, fleuron wreath, 3d render, photograph',
  },
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function apiRequest(method, pathname, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.replicate.com',
      path: pathname,
      method,
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
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
  const maxAttempts = 60; // 5 min max
  for (let i = 0; i < maxAttempts; i++) {
    const { body } = await apiRequest('GET', `/v1/predictions/${id}`);
    if (body.status === 'succeeded') return body;
    if (body.status === 'failed' || body.status === 'canceled') {
      throw new Error(`Prediction ${id} ${body.status}: ${body.error || 'unknown'}`);
    }
    await sleep(5000);
  }
  throw new Error(`Prediction ${id} timed out`);
}

async function generateOne(variantKey, variantDef, generationIdx) {
  const label = `${variantKey}-v${generationIdx}`;
  console.log(`\n[${label}] ${variantDef.name}`);

  const { status, body } = await apiRequest('POST', MODEL_ENDPOINT, {
    input: {
      prompt: variantDef.prompt,
      aspect_ratio: '2:3',
      output_format: 'webp',
      output_quality: 90,
      safety_tolerance: 5,
    },
  });

  if (status === 429) {
    const retryAfter = body.detail?.match(/(\d+)/)?.[1] || 15;
    console.log(`  Rate limited. Waiting ${retryAfter}s...`);
    await sleep((parseInt(retryAfter) + 2) * 1000);
    return generateOne(variantKey, variantDef, generationIdx);
  }

  if (status !== 201 && status !== 200) {
    throw new Error(`API error ${status}: ${JSON.stringify(body).slice(0, 200)}`);
  }

  let result = body;
  if (body.status !== 'succeeded') {
    console.log(`  Prediction ${body.id} — polling...`);
    result = await pollPrediction(body.id);
  }

  const imageUrl = result.output;
  if (!imageUrl) throw new Error(`No output for ${label}`);

  const filename = `${label}.webp`;
  const dest = path.join(OUTPUT_DIR, filename);
  await downloadFile(typeof imageUrl === 'string' ? imageUrl : imageUrl[0], dest);

  const stats = fs.statSync(dest);
  const sizeKB = Math.round(stats.size / 1024);
  console.log(`  Saved: ${filename} (${sizeKB}KB)`);

  return { variantKey, variantDef, generationIdx, filename, sizeKB };
}

function buildPreviewHtml(results) {
  const cells = Object.keys(VARIANTS).map(key => {
    const variantResults = results.filter(r => r && r.variantKey === key);
    const name = VARIANTS[key].name;
    const row = `
      <tr>
        <th class="vlabel"><span class="vcode">${key.toUpperCase()}</span><br><span class="vname">${name}</span></th>
        ${[1, 2, 3].map(v => {
          const r = variantResults.find(x => x.generationIdx === v);
          if (r && r.filename) {
            return `<td><figure><img src="${r.filename}" alt="${key}-v${v}"><figcaption>seed v${v}</figcaption></figure></td>`;
          }
          return `<td class="missing">—</td>`;
        }).join('')}
      </tr>`;
    return row;
  }).join('');

  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<title>AGIL-083 Cycle 0 — Variant C picker (5 sub-variants × 3 seeds)</title>
<style>
  :root {
    --bordo: #7D4450;
    --amber: #E8AD4A;
    --ivory: #FEFCF6;
    --chocolate: #2A2317;
    --cream: #F5F1EA;
    --cappuccino: #8B7866;
  }
  body { margin: 0; font-family: Georgia, serif; background: var(--ivory); color: var(--chocolate); padding: 2rem; }
  h1 { color: var(--bordo); font-size: 1.6rem; margin: 0 0 0.3rem; }
  .subtitle { color: var(--cappuccino); font-style: italic; margin-bottom: 2rem; }
  table { border-collapse: collapse; width: 100%; max-width: 1400px; margin: 0 auto; }
  th, td { padding: 1rem; vertical-align: top; border-bottom: 1px solid var(--cream); }
  .vlabel { text-align: left; width: 180px; border-right: 1px solid var(--cream); }
  .vcode { font-size: 1.4rem; color: var(--bordo); font-weight: 700; }
  .vname { font-size: 0.95rem; color: var(--chocolate); font-style: italic; }
  figure { margin: 0; }
  img { width: 100%; max-width: 280px; height: auto; border: 1px solid var(--cream); border-radius: 3px; display: block; }
  figcaption { font-size: 0.8rem; color: var(--cappuccino); margin-top: 0.3rem; text-align: center; }
  .missing { color: var(--cappuccino); text-align: center; font-style: italic; }
  footer { text-align: center; color: var(--cappuccino); margin-top: 3rem; font-size: 0.85rem; font-style: italic; }
</style>
</head>
<body>
  <h1>AGIL-083 Cycle 0 — Variant C «Typographic Frontispiece»</h1>
  <p class="subtitle">5 под-концептов × 3 seed-вариации. Выбери нравящийся вариант и seed — Cycle 1 финализирует.</p>
  <table>${cells}</table>
  <footer>Зеркальце · сгенерировано ${new Date().toISOString().slice(0, 16)} · «Андрею от оркестра»</footer>
</body>
</html>`;
}

async function main() {
  const arg = (process.argv[2] || 'all').toLowerCase();
  let keysToGenerate;

  if (arg === 'all') {
    keysToGenerate = Object.keys(VARIANTS);
  } else if (VARIANTS[arg]) {
    keysToGenerate = [arg];
  } else {
    console.error(`Unknown variant: ${arg}`);
    console.error(`Available: ${Object.keys(VARIANTS).join(', ')}, all`);
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const total = keysToGenerate.length * GENERATIONS_PER_VARIANT;
  console.log(`AGIL-083 Cycle 0 — ${total} generations planned`);
  console.log(`Variants: ${keysToGenerate.join(', ')}`);
  console.log(`Output: ${OUTPUT_DIR}`);

  const results = [];
  const tasks = [];
  for (const key of keysToGenerate) {
    for (let v = 1; v <= GENERATIONS_PER_VARIANT; v++) {
      tasks.push({ key, v });
    }
  }

  for (let i = 0; i < tasks.length; i++) {
    const { key, v } = tasks[i];
    try {
      const r = await generateOne(key, VARIANTS[key], v);
      results.push(r);
    } catch (err) {
      console.error(`  FAILED ${key}-v${v}: ${err.message}`);
      results.push({ variantKey: key, variantDef: VARIANTS[key], generationIdx: v, filename: null, error: err.message });
    }
    if (i < tasks.length - 1) {
      console.log(`  Waiting ${DELAY_MS / 1000}s (rate limit)...`);
      await sleep(DELAY_MS);
    }
  }

  console.log('\n--- Results ---');
  let ok = 0, fail = 0;
  for (const r of results) {
    if (r.filename) { console.log(`  OK: ${r.variantKey}-v${r.generationIdx} → ${r.filename} (${r.sizeKB}KB)`); ok++; }
    else { console.log(`  FAIL: ${r.variantKey}-v${r.generationIdx} — ${r.error}`); fail++; }
  }

  const previewPath = path.join(OUTPUT_DIR, 'preview.html');
  fs.writeFileSync(previewPath, buildPreviewHtml(results), 'utf8');
  console.log(`\nPreview: ${previewPath}`);
  console.log(`Totals: ${ok} OK, ${fail} FAIL, cost ≈ $${(ok * 0.04).toFixed(2)}`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
