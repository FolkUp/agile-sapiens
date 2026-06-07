/**
 * Alice Digital — flux-2-max Canon B (цифровая Алиса).
 *
 * Per Андрей mandate cont #14 EXT-3 — «стили steampunk, cyberpunk, Гигер + что-нибудь современное.
 * В картинках раскрывается цифровая часть Алисы».
 *
 * Canon B reference (comic-prototype/artist-brief/reference/character-bible.md):
 *   - Hair ALWAYS pulled back tightly, NEVER loose
 *   - Machine-precision single line contour, vector-like, NOT hand-drawn
 *   - Perfect bilateral symmetry
 *   - "Красивая, но что-то не так" uncanny valley
 *   - Spot color: Sage #839E75
 *
 * Refs (mix Canon A faces + Canon B style language):
 *   1. alice-night-post-music.png
 *   2. alice-sochinyaj-mechty.webp
 *   3. alice-night-track-v8-wm.jpg (Rooney Mara face anchor)
 *
 * Usage:
 *   REPLICATE_API_TOKEN="$(sops -d --extract '["replicate"]["api_token"]' /c/JOHNDOE_CLAUDE/vault/secrets/replicate.enc.yaml)" \
 *     node scripts/gen-alice-digital-flux2.cjs
 *
 * Cost: ~$0.16/generation × 4 = $0.64.
 * Output: C:\Transit\alice-digital-cycle0\
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.REPLICATE_API_TOKEN;
if (!TOKEN) { console.error('REPLICATE_API_TOKEN not set'); process.exit(1); }

const OUTPUT_DIR = 'C:\\Transit\\alice-digital-cycle0';
const DELAY_MS = 15000;
const MODEL_ENDPOINT = '/v1/models/black-forest-labs/flux-2-max/predictions';
const UPLOAD_ENDPOINT = '/v1/files';

const REFS = [
  { label: 'face anchor — night-post', path: 'C:\\JOHNDOE_CLAUDE\\vault\\forniti-gallery\\alisa\\jd-channel\\alice-night-post-music.png' },
  { label: 'face anchor — sochinyaj', path: 'C:\\JOHNDOE_CLAUDE\\vault\\forniti-gallery\\alisa\\jd-channel\\alice-sochinyaj-mechty.webp' },
  { label: 'Mara anchor — pioneer v8', path: 'C:\\JOHNDOE_CLAUDE\\vault\\forniti-gallery\\alisa\\jd-channel\\alice-night-track-v8-wm.jpg' },
];

// Canon B emphasis (digital Alice — cybernetic uncanny)
const CANON_B_ANCHOR = 'A young woman with Rooney Mara facial features and Rooney Mara-type face, dark hair pulled back tightly into a sleek precise bun never loose or flowing, perfect bilateral facial symmetry, machine-precision clean contour like vector graphics not hand-drawn, beautiful but with subtle uncanny valley quality something not quite human-natural, calm clinical precision';

const STYLES = [
  {
    name: 'steampunk-brass-clockwork',
    prompt: `${CANON_B_ANCHOR}. Steampunk Victorian aesthetic — sitting at a brass and mahogany jazz bar table holding an open music notebook bound in tooled leather. Around her: ornate brass clockwork mechanisms ticking, copper steam pipes along walls, gas-lamp warm amber lighting, exposed cogs and gauges. Subtle clockwork accent in her ear or wrist (slight mechanical augmentation barely visible). Music staves on parchment-aged wall mixing with intricate engineering schematics. Atmospheric Jules Verne aesthetic + The Difference Engine. Warm sepia bordeaux brass amber palette. Sage #839E75 accent on her scarf or jewelry. Horizontal landscape format.`,
  },
  {
    name: 'cyberpunk-blade-runner-noir',
    prompt: `${CANON_B_ANCHOR}. Cyberpunk Blade Runner aesthetic — sitting in a smoky neon-lit jazz lounge of the future, holding glowing translucent music notebook with holographic lead sheets projecting upward from the page. Behind her: massive neon signage in Japanese kanji and English, rain streaks on tall glass windows, holographic data streams floating in air, dark wet city beyond. Cool teal blue and magenta neon mixing with warm bordeaux interior. Subtle cybernetic implant glowing soft at her temple. Music staves morphing into code text in holographic projections. Ghost in the Shell + Blade Runner 2049 mood. Sage #839E75 spot accent. Horizontal cinematic landscape.`,
  },
  {
    name: 'giger-biomechanical',
    prompt: `${CANON_B_ANCHOR}. HR Giger biomechanical aesthetic — sitting in a dark organic-mechanical jazz space, holding open music notebook that appears partially biomechanical with vein-like patterns and bone-textured edges. Behind her: dark biomech walls with skeletal-machine fusion architecture, twisted brass instruments that resemble biomechanical creatures with organic curves, bone-white highlights against deep black-mahogany. Cold biomechanical precision. Subtle exoskeletal hint at her shoulders. Music staves carved into bone-textured surfaces. Necronom IV aesthetic + Alien biomechanical world. Cold bone-white blacks with bordeaux flesh tones and sage #839E75 surgical-precision spot accent. Horizontal landscape.`,
  },
  {
    name: 'modern-digital-editorial',
    prompt: `${CANON_B_ANCHOR}. Modern digital editorial illustration style — clean vector-art aesthetic with subtle gradients, sitting in a minimalist futuristic jazz lounge. Holding sleek tablet-like music notebook with subtle UI elements glowing softly. Behind her: clean geometric architecture, holographic music staff lines as elegant overlays, abstract code patterns as decorative wall design. Flat editorial illustration style of contemporary New York Times tech features or Wired magazine covers — clean lines, restrained palette of deep bordeaux + ivory + soft cyan accent + sage #839E75 spot color. Modern sophisticated, slightly futuristic but timeless. Horizontal landscape format for editorial cover.`,
  },
];

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

function uploadFile(filePath) {
  return new Promise((resolve, reject) => {
    const filename = path.basename(filePath);
    const fileContent = fs.readFileSync(filePath);
    const boundary = `--${Date.now()}${Math.random().toString(16).slice(2)}`;
    const contentType = filename.endsWith('.png') ? 'image/png'
                       : filename.endsWith('.webp') ? 'image/webp'
                       : 'image/jpeg';
    const head = Buffer.from(
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="content"; filename="${filename}"\r\n` +
      `Content-Type: ${contentType}\r\n\r\n`
    );
    const tail = Buffer.from(`\r\n--${boundary}--\r\n`);
    const body = Buffer.concat([head, fileContent, tail]);
    const req = https.request({
      hostname: 'api.replicate.com', path: UPLOAD_ENDPOINT, method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length,
      },
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode !== 201 && res.statusCode !== 200) {
            return reject(new Error(`upload ${res.statusCode}: ${data.slice(0, 200)}`));
          }
          resolve(parsed.urls.get);
        } catch (e) { reject(new Error(`upload parse: ${data.slice(0, 200)}`)); }
      });
    });
    req.on('error', reject);
    req.write(body);
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
  for (let i = 0; i < 90; i++) {
    const { body } = await apiRequest('GET', `/v1/predictions/${id}`);
    if (body.status === 'succeeded') return body;
    if (body.status === 'failed' || body.status === 'canceled') {
      throw new Error(`${body.status}: ${body.error || 'unknown'}`);
    }
    await sleep(5000);
  }
  throw new Error('timed out');
}

async function generateOne(style, refUrls) {
  const label = `alice-digital-${style.name}`;
  console.log(`\n[${label}] generating...`);
  const { status, body } = await apiRequest('POST', MODEL_ENDPOINT, {
    input: {
      prompt: style.prompt,
      input_images: refUrls,
      aspect_ratio: '16:9',
      resolution: '1 MP',
      output_format: 'webp',
      output_quality: 90,
    },
  });
  if (status === 429) {
    const retryAfter = body.detail?.match(/(\d+)/)?.[1] || 15;
    await sleep((parseInt(retryAfter) + 2) * 1000);
    return generateOne(style, refUrls);
  }
  if (status !== 201 && status !== 200) {
    throw new Error(`API ${status}: ${JSON.stringify(body).slice(0, 300)}`);
  }
  let result = body;
  if (body.status !== 'succeeded') {
    console.log(`  polling ${body.id}...`);
    result = await pollPrediction(body.id);
  }
  const imageUrl = Array.isArray(result.output) ? result.output[0] : result.output;
  if (!imageUrl) throw new Error(`no output: ${JSON.stringify(result).slice(0, 200)}`);
  const dest = path.join(OUTPUT_DIR, `${label}.webp`);
  await downloadFile(imageUrl, dest);
  const size = (fs.statSync(dest).size / 1024).toFixed(1);
  console.log(`  saved → ${dest} (${size} KB)`);
  return dest;
}

async function main() {
  console.log(`gen-alice-digital-flux2: ${STYLES.length} digital styles × flux-2-max → ${OUTPUT_DIR}`);
  console.log(`Estimated cost: ~$${(STYLES.length * 0.16).toFixed(2)}`);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`\nUploading 3 canonical refs...`);
  const refUrls = [];
  for (const ref of REFS) {
    const url = await uploadFile(ref.path);
    console.log(`  ${ref.label}: ${url.slice(-30)}`);
    refUrls.push(url);
  }
  console.log(`✓ Refs uploaded\n`);
  const generated = [];
  for (let i = 0; i < STYLES.length; i++) {
    try {
      const dest = await generateOne(STYLES[i], refUrls);
      generated.push({ style: STYLES[i].name, path: dest });
    } catch (e) {
      console.error(`  ${STYLES[i].name} FAILED: ${e.message}`);
    }
    if (i < STYLES.length - 1) await sleep(DELAY_MS);
  }
  console.log(`\n✓ Generated ${generated.length}/${STYLES.length} digital styles`);
}

main().catch(e => { console.error(`FAILED: ${e.message}`); process.exit(1); });
