/**
 * GS-VIZ Replicate generation for «Город Солнца» visual ряд.
 *
 * Minimum-delta adaptation of scripts/gen-chapter-plate.cjs (AGIL-079 pattern).
 * Generates 3 reflexive AI-images for Иви per INSTRUKCIYA-dlya-Fridy-i-Alisy-v2.0:
 *   g1 — cover «хрустальный город» (register A, vertical 2:3)
 *   g5 — ch.5 reflexive «hallucinatory neon city» (register B, landscape 4:3)
 *   g6 — ch.6 reflexive «city defeated by pharmacy» (register B, landscape 4:3)
 *
 * Лев Q1 verified: prompts concept-level only (idea-anchors not expression-quotes from text).
 * Лев Q3: ALL 3 require AI-disclosure per EU AI Act Art. 50 (captions handled in book, not here).
 * Owner (2026-05-30) confirmed Г6 anchor = (B) line 2563 «аптека победила город».
 *
 * Usage (same pattern as gen-chapter-plate.cjs — Андрей knows):
 *   TOKEN=$(sops -d --extract '["replicate"]["api_token"]' vault/secrets/replicate.enc.yaml)
 *   export REPLICATE_API_TOKEN="$TOKEN"
 *   node scripts/gen-gs-viz.cjs all 3
 *     # → 3 slots × 3 seeds = 9 generations ≈ $0.36
 *
 *   node scripts/gen-gs-viz.cjs g1 4
 *     # → just g1 × 4 seeds ≈ $0.16
 *
 * Output: C:\Transit\gs-viz-cycle0\<slot>-v{1..N}.webp
 * After owner picks variants — manual copy to tmp/for-ivi/2026-05-30-gs-viz/images/
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.REPLICATE_API_TOKEN;
if (!TOKEN) { console.error('REPLICATE_API_TOKEN not set'); process.exit(1); }

const OUTPUT_DIR = 'C:\\Transit\\gs-viz-cycle0';
const DELAY_MS = 12000;
const MODEL_ENDPOINT = '/v1/models/black-forest-labs/flux-1.1-pro/predictions';

// Anti-phantom-text baseline (inherited from AGIL-083 lessons — same as chapter plates).
// NB: AI-disclosure text is added in book, not on image — image MUST have no embedded text.
const NEGATIVE_BASE = 'any text, any words, any letters, any captions, any title, any subtitle, lorem ipsum, gibberish text, fake words, invented words, watermark, typography on the image, artist signature, plate credit, copyright notice, small text below image';

// Style exclusions for GS-VIZ — adapted from chapter plates.
// NB: chapter plates use Victorian engraving style. GS-VIZ has DIFFERENT registers:
//   register A (Г1 cover): muted book-cover painterly, no AI-glossy
//   register B (Г5+Г6): visible machine aesthetic INTENTIONAL — synthetic glow desired
// So per-slot negative_extras override base where needed.
const NEGATIVE_REGISTER_A = 'photorealistic person, AI gloss, plastic sheen, ultra-saturated, anime, comic book, lens flare';
const NEGATIVE_REGISTER_B = 'photographic, natural lighting, organic textures, human figures, religious imagery';

const SLOTS = {
  g1: {
    name: 'Г1 — COVER «хрустальный город» (register A)',
    aspect: '2:3',
    register: 'A',
    placement: 'after title # Город Солнца (cover)',
    binding: 'Иви INSTRUKCIYA §2Б Г1, frozen 2026-05-30',
    prompt: `Symbolic crystalline architectural form rising in cold ascending light, glass and crystal structure evoking secular transcendence, vertical proportions, muted book-cover palette warm cream and charcoal with single muted ember accent, no specific landmark building, painterly atmospheric not photographic, restrained 19th-century print-illustration sensibility, 2:3 vertical book cover format.`,
    negative_extras: NEGATIVE_REGISTER_A,
  },
  g5: {
    name: 'Г5 — ch.5 reflexive «hallucinatory neon city» (register B)',
    aspect: '4:3',
    register: 'B',
    placement: 'ch.5 после фразы «Цель этой главы — собрать всю карту…»',
    binding: 'Иви INSTRUKCIYA §2Б Г5 verbatim concept; placement Иви-specified',
    prompt: `Hallucinatory neon utopian city, deliberately too perfect, visible machine aesthetic, synthetic glow, repeating impossible architectural rhythms, saturated blue-magenta, the image announces its own algorithmic origin, no human warmth.`,
    negative_extras: NEGATIVE_REGISTER_B,
  },
  g6: {
    name: 'Г6 — ch.6 reflexive «city defeated by pharmacy» (register B, pair Г5)',
    aspect: '4:3',
    register: 'B',
    placement: 'ch.6 после фразы «В этой картине аптека победила город.» (line 2563)',
    binding: 'Owner pick 2026-05-30: option B from {A line 2559 круг переносимости / B line 2563 аптека победила город / C line 2868 одна структура}',
    prompt: `Synthetic visualization of a city defeated by its pharmacy, collective architectural form dissolving into a constellation of individual pharmacological capsules, urban fabric replaced by personal chemical dots scattered across cold space, machine-rendered, deliberate algorithmic gloss, cold pastel pharmacy palette of mint and capsule white and blister-pack pink, the image rhymes with the Г5 pair but inverts it: Г5 shows utopia-as-synthetic-promise, Г6 shows defeat-of-collective-by-individual, both share visible machine origin.`,
    negative_extras: NEGATIVE_REGISTER_B,
  },
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function apiRequest(method, pathname, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.replicate.com', path: pathname, method,
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

async function generateOne(slot, slotDef, seedIdx) {
  const label = `${slot}-v${seedIdx}`;
  console.log(`\n[${label}] ${slotDef.name}`);

  // Same inline-negatives pattern as gen-chapter-plate.cjs (Flux Pro doesn't take separate negative_prompt).
  const promptWithNegatives = `${slotDef.prompt}\n\nStrictly NO text, no human figures (unless explicitly in prompt): ${NEGATIVE_BASE}. Style exclusions: ${slotDef.negative_extras}.`;

  const { status, body } = await apiRequest('POST', MODEL_ENDPOINT, {
    input: {
      prompt: promptWithNegatives,
      aspect_ratio: slotDef.aspect,
      output_format: 'webp',
      output_quality: 90,
      safety_tolerance: 5,
    },
  });

  if (status === 429) {
    const retryAfter = body.detail?.match(/(\d+)/)?.[1] || 15;
    await sleep((parseInt(retryAfter) + 2) * 1000);
    return generateOne(slot, slotDef, seedIdx);
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
  return { slot, seedIdx, filename, sizeKB };
}

async function main() {
  const arg = (process.argv[2] || 'all').toLowerCase();
  const seeds = parseInt(process.argv[3] || '3', 10);

  let slots;
  if (arg === 'all') slots = Object.keys(SLOTS);
  else if (SLOTS[arg]) slots = [arg];
  else if (arg.includes(',')) slots = arg.split(',').filter(s => SLOTS[s]);
  else { console.error(`Unknown slot: ${arg}`); console.error(`Available: ${Object.keys(SLOTS).join(', ')}, all, or comma-sep list`); process.exit(1); }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const total = slots.length * seeds;
  console.log(`GS-VIZ generation: ${slots.length} slots × ${seeds} seeds = ${total} gens`);
  console.log(`Estimated cost: $${(total * 0.04).toFixed(2)}`);

  const results = [];
  const tasks = [];
  for (const s of slots) for (let v = 1; v <= seeds; v++) tasks.push({ slot: s, v });

  for (let i = 0; i < tasks.length; i++) {
    const { slot, v } = tasks[i];
    try { results.push(await generateOne(slot, SLOTS[slot], v)); }
    catch (err) {
      console.error(`  FAIL ${slot}-v${v}: ${err.message}`);
      results.push({ slot, seedIdx: v, filename: null, error: err.message });
    }
    if (i < tasks.length - 1) { console.log(`  waiting ${DELAY_MS / 1000}s...`); await sleep(DELAY_MS); }
  }

  let ok = 0;
  for (const r of results) if (r.filename) ok++;
  console.log(`\nTotals: ${ok}/${total} OK, actual cost ≈ $${(ok * 0.04).toFixed(2)}`);
  console.log(`\nOutput in ${OUTPUT_DIR}`);
  console.log('After picking variants — manual copy to tmp/for-ivi/2026-05-30-gs-viz/images/');
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
