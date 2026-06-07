/**
 * Alice Jazz Illustration v2 — flux-2-max image conditioning.
 *
 * Upgrade from gen-alice-jazz.cjs (flux-1.1-pro text-only).
 * Uses 3 canonical Alice refs as input_images for character consistency.
 *
 * Refs (Canon A — bra-voice adult + child anchor):
 *   1. alice-night-post-music.png (Canon A primary — adult viniл вертушка)
 *   2. alice-sochinyaj-mechty.webp (Canon A primary — adult блокнот парк)
 *   3. alice-night-track-v8-wm.jpg (Canon A child — pioneer-era + Rooney Mara face anchor)
 *
 * Multi-style generation: 8 different style approaches для jazz article main illustration.
 * Андрей mandate: «не скупись, сгенерируй много разных» + сохранить visual сходство с Alice.
 *
 * Usage:
 *   REPLICATE_API_TOKEN="$(sops -d --extract '["replicate"]["api_token"]' /c/JOHNDOE_CLAUDE/vault/secrets/replicate.enc.yaml)" \
 *     node scripts/gen-alice-jazz-flux2.cjs
 *
 * Cost: ~$0.16/generation (1MP output + 3 × 1MP input refs). 8 styles ≈ $1.28.
 * Output: C:\Transit\alice-jazz-flux2-cycle0\alice-jazz-{style}-v1.webp
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.REPLICATE_API_TOKEN;
if (!TOKEN) { console.error('REPLICATE_API_TOKEN not set'); process.exit(1); }

const OUTPUT_DIR = 'C:\\Transit\\alice-jazz-flux2-cycle0';
const DELAY_MS = 15000;
const MODEL_ENDPOINT = '/v1/models/black-forest-labs/flux-2-max/predictions';
const UPLOAD_ENDPOINT = '/v1/files';

const REFS = [
  { label: 'Canon A adult — vinyl player', path: 'C:\\JOHNDOE_CLAUDE\\vault\\forniti-gallery\\alisa\\jd-channel\\alice-night-post-music.png' },
  { label: 'Canon A adult — sparks notebook', path: 'C:\\JOHNDOE_CLAUDE\\vault\\forniti-gallery\\alisa\\jd-channel\\alice-sochinyaj-mechty.webp' },
  { label: 'Canon A child — pioneer lantern', path: 'C:\\JOHNDOE_CLAUDE\\vault\\forniti-gallery\\alisa\\jd-channel\\alice-night-track-v8-wm.jpg' },
];

// Base description (stable character anchor)
const ALICE_DESC = 'A young adult woman with Rooney Mara facial features and a Rooney Mara-type face, dark hair simply styled, contemplative thoughtful expression, calm presence';

// 8 style variations
const STYLES = [
  {
    name: 'cinematic-wong-kar-wai',
    prompt: `${ALICE_DESC}, sitting alone in a softly lit jazz bar at evening, holding an open thick black music notebook (The Real Book) with handwritten lead sheets visible. On the warm bordeaux wall behind her, a barely perceptible glow suggests faint columns of code text and musical staff lines intermingled. Warm bordeaux and ivory color palette, soft incandescent lamp light, intimate quiet bar interior with hints of brass instruments suggestive in the bokeh background. Cinematic Wong Kar-wai still atmosphere — thoughtful jazz musicians film, melancholic and intimate. Horizontal landscape composition.`,
  },
  {
    name: 'painterly-hopper-urban',
    prompt: `${ALICE_DESC}, alone at a small table in a quiet jazz bar at night, open music notebook (Real Book) on her lap. Warm interior light against deep shadow, single brass instrument silhouette in foreground. Painterly Edward Hopper style — urban loneliness, oil painting brushstrokes, geometric architectural framing, warm yellow lamp light against deep blue night through window. Subtle hint of code text on wall barely visible. Horizontal landscape format. Bordeaux and ivory palette with deep cobalt accents.`,
  },
  {
    name: 'art-deco-poster',
    prompt: `${ALICE_DESC}, stylized in 1920s art deco jazz poster aesthetic, holding an open music notebook. Bold geometric composition, strong angular shapes, golden Art Deco ornamental frames, sunburst patterns suggesting jazz era glamour. Limited color palette: deep bordeaux, ivory, brass gold. Behind her, abstract music staff lines integrated with subtle code symbols as decorative pattern. Vintage poster illustration, flat shapes with gold leaf accents, Cassandre-influenced design. Horizontal landscape banner.`,
  },
  {
    name: 'watercolor-loose-sketch',
    prompt: `${ALICE_DESC}, sketched in loose watercolor and ink wash, open music notebook on lap. Soft warm bordeaux wash for the bar interior, ivory paper showing through, loose brush strokes, unfinished edges suggesting jazz improvisation. Faint pencil lines of code text and music staves in the background — barely there sketches. Atmospheric watercolor, gentle pigment bleeds, traditional book illustration aesthetic. Horizontal landscape, like a contemporary jazz book interior illustration.`,
  },
  {
    name: 'chiaroscuro-oil-caravaggio',
    prompt: `${ALICE_DESC}, dramatically lit by single warm overhead light, holding open music notebook glowing from below the page. Deep velvet black surrounding shadows, only her face and hands and notebook strongly illuminated. Caravaggio chiaroscuro oil painting technique, dramatic single light source, baroque intensity. Faint glimpse of code text on wall illuminated by reflected light. Rich bordeaux deep tones, classic museum oil painting aesthetic. Horizontal composition, intimate spotlight feel.`,
  },
  {
    name: 'comic-sin-city-stylized',
    prompt: `${ALICE_DESC} in graphic novel comic illustration style, dramatic high contrast black and white with single accent of bordeaux red on her scarf or notebook spine. Holding open music notebook. Strong silhouettes, white negative space, bold ink lines, machine-precision contour. Background: jazz bar reduced to graphic shapes with hints of code text in white against black. Sin City + Mike Mignola aesthetic. Horizontal landscape panel. Hair pulled back tightly.`,
  },
  {
    name: 'pastel-impressionist',
    prompt: `${ALICE_DESC}, soft pastel impressionist painting style, holding open music notebook. Warm bordeaux wall behind her, golden lamp light catching on her hair and the notebook page. Loose pastel strokes, Mary Cassatt or Berthe Morisot aesthetic, intimate domestic warmth. Subtle hint of code and music staff lines integrated into wallpaper pattern behind her. Soft focus, gentle color transitions, ivory cream highlights. Horizontal landscape, contemplative quiet mood.`,
  },
  {
    name: 'vintage-book-engraving',
    prompt: `${ALICE_DESC}, illustrated as 19th-century book engraving plate. Cross-hatching and stipple technique, ivory page with rich bordeaux ink. Sitting with open music notebook in a jazz bar interior. Behind her on wallpaper, ornate Victorian pattern subtly integrating music staff lines and code text symbols. Print illustration aesthetic, antique book plate style, William Morris influenced ornamental border. Horizontal landscape format. Restrained painterly classical book illustration.`,
  },
];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function apiRequest(method, pathname, body = null, contentType = 'application/json') {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.replicate.com', path: pathname, method,
      headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': contentType },
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch (e) { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(typeof body === 'string' ? body : JSON.stringify(body));
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
  const label = `alice-jazz-${style.name}`;
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
  console.log(`gen-alice-jazz-flux2: ${STYLES.length} styles × flux-2-max → ${OUTPUT_DIR}`);
  console.log(`Estimated cost: ~$${(STYLES.length * 0.16).toFixed(2)} (1MP output + 3MP input × $0.07/$0.09 per gen)`);

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

  console.log(`\n✓ Generated ${generated.length}/${STYLES.length} styles`);
  console.log(`Next: Зеркальце для выбора → C:\\Transit\\zerkalce-alice-jazz-flux2-2026-06-06.html`);
}

main().catch(e => { console.error(`FAILED: ${e.message}`); process.exit(1); });
