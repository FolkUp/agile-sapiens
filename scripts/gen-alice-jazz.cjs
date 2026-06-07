/**
 * Alice Jazz Illustration — Replicate generation для статьи 1 «Джаз как опен-сорс».
 *
 * Minimum-delta adaptation of scripts/gen-gs-viz.cjs.
 * Generates main illustration для Telegraph og-preview + JD-канал анонса.
 *
 * Character canon: vault/memory/alice-personal-canon.md
 *   Modern Alice (adult) — primary refs alice-night-post-music.png + alice-sochinyaj-mechty.webp
 *   Visual consistency: dark hair simply styled, contemplative, warm lamp light
 *   Color palette: bordeaux #7D4450 + ivory #FEFCF6
 *
 * Scene per Иви TZ (ЧИСТОВИК-С24 lines 197-201):
 *   Alice в jazz bar/club at evening, open Real Book (thick black music notebook) на коленях,
 *   handwritten lead sheets visible, faint code/staff-lines hint в background,
 *   warm bordeaux/ivory, soft lamp light, NOT glossy.
 *
 * Usage:
 *   REPLICATE_API_TOKEN="$(sops -d --extract '["replicate"]["api_token"]' /c/JOHNDOE_CLAUDE/vault/secrets/replicate.enc.yaml)" \
 *     node scripts/gen-alice-jazz.cjs 3
 *   # → 3 seeds в C:\Transit\alice-jazz-cycle0\alice-jazz-v{1..3}.webp ≈ $0.12
 *
 * After Андрей picks variant через Зеркальце — manual copy к
 * johndoe-channel/media/alice-jazz-main-2026-06-06.webp
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.REPLICATE_API_TOKEN;
if (!TOKEN) { console.error('REPLICATE_API_TOKEN not set'); process.exit(1); }

const OUTPUT_DIR = 'C:\\Transit\\alice-jazz-cycle0';
const DELAY_MS = 12000;
const MODEL_ENDPOINT = '/v1/models/black-forest-labs/flux-1.1-pro/predictions';

const PROMPT = `A warm cinematic painterly illustration: a contemplative young adult woman with dark hair simply styled (low bun or loosely down) sitting in a softly lit jazz bar at evening. She is the focus of the composition. Open thick black music notebook (The Real Book) resting on her knees, handwritten lead sheets visible with musical staff lines. On the wall behind her, a very subtle glow suggests faint columns of code text intermingled with musical staff lines — barely visible, atmospheric not literal. Warm bordeaux deep red and ivory cream color palette, soft incandescent lamp light, intimate quiet bar interior with hints of brass instruments suggestive but indistinct in the background bokeh. Mood: thoughtful Wong Kar-wai still about jazz musicians; not glossy not commercial not stock-photo; like a quiet moment captured between sets. Single human figure (the woman), no other clearly visible faces. Horizontal landscape composition suitable for 16:9 web banner. Painterly book-illustration sensibility, NOT photorealistic, NOT AI-glossy.`;

// Negative: prohibit text + machine aesthetic + stock-glossy. ALLOW human figure (override gs-viz base).
const NEGATIVE = `any text, any words, any letters, any captions, any title, lorem ipsum, gibberish text, fake words, watermark, typography on the image, artist signature, copyright notice, AI gloss, plastic sheen, ultra-saturated, anime, comic book, photorealistic stock photo, lens flare, generic stock illustration, glossy commercial photography, multiple human figures, group portrait, faces in background`;

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

async function generateOne(seedIdx) {
  const label = `alice-jazz-v${seedIdx}`;
  console.log(`\n[${label}] generating...`);

  const promptWithNegatives = `${PROMPT}\n\nNegative: ${NEGATIVE}.`;

  const { status, body } = await apiRequest('POST', MODEL_ENDPOINT, {
    input: {
      prompt: promptWithNegatives,
      aspect_ratio: '16:9',
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
  if (!imageUrl) throw new Error(`no output: ${JSON.stringify(result).slice(0, 200)}`);

  const dest = path.join(OUTPUT_DIR, `${label}.webp`);
  await downloadFile(imageUrl, dest);
  const size = (fs.statSync(dest).size / 1024).toFixed(1);
  console.log(`  saved → ${dest} (${size} KB)`);
  return dest;
}

async function main() {
  const seedCount = parseInt(process.argv[2] || '3');
  console.log(`gen-alice-jazz: ${seedCount} variants → ${OUTPUT_DIR}`);
  console.log(`Estimated cost: ~$${(seedCount * 0.04).toFixed(2)} (Flux 1.1 Pro $0.04/image)`);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const generated = [];
  for (let i = 1; i <= seedCount; i++) {
    try {
      const dest = await generateOne(i);
      generated.push(dest);
    } catch (e) {
      console.error(`  v${i} FAILED: ${e.message}`);
    }
    if (i < seedCount) await sleep(DELAY_MS);
  }

  console.log(`\n✓ Generated ${generated.length}/${seedCount} variants`);
  console.log(`Next step: Зеркальце для выбора через C:\\Transit\\zerkalce-alice-jazz-picks-2026-06-06.html`);
}

main().catch(e => { console.error(`FAILED: ${e.message}`); process.exit(1); });
