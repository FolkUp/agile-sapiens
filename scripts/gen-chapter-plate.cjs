/**
 * AGIL-079 chapter plate generation — parameterized
 *
 * Generates one or more chapter plates per AGIL-079 brief specifications.
 * Applies anti-phantom-text negative prompt baseline learned from AGIL-083 cycle.
 *
 * Usage:
 *   REPLICATE_API_TOKEN=xxx node scripts/gen-chapter-plate.cjs <slot> [seeds]
 *     slot ∈ {ch0,ch1,...,ch10,int1,int2,int3,all,act1,act2,act3}
 *     seeds default 3
 *
 * OUTPUT_DIR is Windows-absolute (C:\Transit\...) because this is a session-local
 * work directory on Андрей's workstation. If running from another machine, change
 * OUTPUT_DIR below or pass via env override (future enhancement).
 *
 * Replicate API token: extract via sops
 *   TOKEN=$(sops -d --extract '["replicate"]["api_token"]' vault/secrets/replicate.enc.yaml)
 *   export REPLICATE_API_TOKEN="$TOKEN"
 *
 * Output: C:\Transit\agil-079-cycle0\<slot>-v{1..N}.webp
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.REPLICATE_API_TOKEN;
if (!TOKEN) { console.error('REPLICATE_API_TOKEN not set'); process.exit(1); }

const OUTPUT_DIR = 'C:\\Transit\\agil-079-cycle0';
const DELAY_MS = 12000;
const MODEL_ENDPOINT = '/v1/models/black-forest-labs/flux-1.1-pro/predictions';

// Anti-phantom baseline (learned from AGIL-083 cover disaster + ch0 pilot signature-line disaster)
const NEGATIVE_BASE = 'any text, any words, any letters, any captions, any title, any subtitle, lorem ipsum, gibberish text, fake words, invented words, invented names, invented publisher, invented author, Murray, London, Paris, byline, date, year, signature, hand-written text, watermark, typography on the plate, gravure signature, artist signature, engraver signature, plate credit, publisher credit line, copyright notice, small text below image, caption text, engraver name, printer name, lithographer name, imprint line, drawing credit, labels on maps, labels on globe, country names, place names';
const NEGATIVE_FLUX = 'photorealistic, 3D render, bright colors, cyberpunk, neon, modern digital art, glossy, airbrush, CGI, clean vector, minimalist lineart, anime, comic book, saturated colors';

// Style prefix shared across all plates (from AGIL-079 §4.2 universal rules, inherited from AGIL-083)
const STYLE_PREFIX = 'Victorian steel engraving, 19th-century academic monograph plate aesthetic, monochrome sepia ink on ivory laid paper, fine parallel hatching and crosshatching, chiaroscuro lighting from upper-left at 45 degrees, plate-mark border, Hetzel Voyages Extraordinaires 1870s style';

const PLATES = {
  ch0: {
    name: 'Plate 0 — Verne 80 days (Act I opener)',
    aspect: '2:3',
    dimension: 'vertical',
    prompt: `${STYLE_PREFIX}. A Victorian gentleman traveler in tailcoat and top hat standing beside a large ornate globe on a brass-rimmed stand, consulting an open pocket watch in his hand. Behind him through tall arched window: a steam locomotive approaching on distant rails and a grand clipper-ship silhouette on the horizon. Interior study with leather-bound books, brass instruments, and a rolled map on a heavy table. Dramatic evening light from the window casts long shadows. Allegory of circumnavigation and precise scheduling. No humans face clearly visible from front — three-quarter view. Rich detail, engraved plate aesthetic.`,
  },
  ch1: {
    name: 'Plate 1 — Verne + Hetzel (20,000 leagues / publishing)',
    aspect: '4:3',
    dimension: 'landscape',
    prompt: `${STYLE_PREFIX}. Interior of a 19th-century publisher workshop. Center: massive iron-frame printing press with ink rollers and stacks of freshly-printed leaves drying on racks. Background: workers in aprons operating the press, a foreman examining a proof sheet at a standing desk. Foreground-right: an open book on a lectern with an engraved illustration plate visible inside, showing a submarine scene (hint of Verne Nautilus). Oil lamps overhead, tall windows at back. Ink-stained wooden floor. Engraved plate aesthetic.`,
  },
  ch2: {
    name: 'Plate 2 — Shelley Frankenstein (hubris)',
    aspect: '4:3',
    dimension: 'landscape',
    prompt: `${STYLE_PREFIX}. Gothic laboratory interior at night. A lone scientist in academic robes stands at a large stone workbench, arms raised, silhouetted against an enormous window through which lightning branches across a stormy sky. On the bench: glass vessels with coiling copper tubing, an open ancient folio, scattered anatomical diagrams. Shadows dominate, light cuts in flashes. Allegory of scientific hubris. Engraved plate aesthetic.`,
  },
  ch3: {
    name: 'Plate 3 — Sherlock Holmes (investigation)',
    aspect: '4:3',
    dimension: 'landscape',
    prompt: `${STYLE_PREFIX}. Victorian study interior, foggy London evening. A detective in tweed hat and cape stands at a desk covered in scattered documents, holding a magnifying glass over a detailed map while smoke curls from a calabash pipe in an ashtray. Wall behind: cluttered with framed diagrams, a microscope on a side table, chemistry flasks, an open case-file. Gas lamp casts warm pool of light. Window shows fog-veiled street and gas-lamp silhouette. Engraved plate aesthetic.`,
  },
  ch4: {
    name: 'Plate 4 — Borges Library (infinite archives)',
    aspect: '4:3',
    dimension: 'landscape',
    prompt: `${STYLE_PREFIX}. Interior of a vast hexagonal library receding into perspective. Towering bookshelves line every wall, filled with identical leather-bound volumes. Wrought-iron spiral staircases descend between floors to infinity above and below. A lone scholar-figure stands at a central lectern reading a massive folio, dwarfed by scale. Shafts of light fall from high-up apertures. Allegory of infinite knowledge and information lottery. Piranesi-inspired architectural drama. Engraved plate aesthetic.`,
  },
  ch5: {
    name: 'Plate 5 — Verne Mysterious Island (Act II opener)',
    aspect: '2:3',
    dimension: 'vertical',
    prompt: `${STYLE_PREFIX}. Rocky volcanic island rising from turbulent sea. In foreground: castaways on a cliff overlooking wreckage, one points toward smoke rising from a mountain peak. A granite stronghold partially carved into the cliffside visible on mid-distance. Allegory of rebuilding civilization from scratch with ingenuity. Dramatic seascape with breaking waves, rock formations, sparse vegetation. Engraved plate aesthetic, Hetzel-Verne illustration tradition.`,
  },
  ch6: {
    name: 'Plate 6 — Jekyll and Hyde (duality)',
    aspect: '4:3',
    dimension: 'landscape',
    prompt: `${STYLE_PREFIX}. Victorian interior split by a tall standing mirror down the center. On the left side of the mirror: a gentleman in immaculate evening attire, composed, standing in a well-lit drawing room with fireplace and bookshelves. On the right side of the same mirror: the same figure transformed — dishevelled, hunched, in a shadowed gas-lit street with fog. Mirror as portal between two selves. Allegory of duality of nature. Engraved plate aesthetic.`,
  },
  ch7: {
    name: 'Plate 7 — Don Quixote (hopeful folly)',
    aspect: '4:3',
    dimension: 'landscape',
    prompt: `${STYLE_PREFIX}. Don Quixote on Rocinante, lance lowered, charging a line of windmills on a dry hilltop plain. Sancho Panza on his donkey in foreground-left, arm raised in warning. The windmills are massive, their arms in motion. Dust kicked up by hooves. Sky with streaming clouds. Gustave Doré tradition. Allegory of idealistic folly against systemic reality. Engraved plate aesthetic.`,
  },
  ch8: {
    name: 'Plate 8 — Wells Time Machine (Act III opener)',
    aspect: '2:3',
    dimension: 'vertical',
    prompt: `${STYLE_PREFIX}. A Victorian inventor sits in an ornate brass-and-velvet throne-like machine with levers, dials, spinning gyroscopes, and a large polished crystal at center. The apparatus rests in a study filled with books and instruments. Around the machine: swirling motion-blur as if time itself streams past — hints of dawn and dusk alternating. The inventor reaches toward a lever. Allegory of time manipulation and anticipation. Engraved plate aesthetic, Wells-era illustration style.`,
  },
  ch9: {
    name: 'Plate 9 — Vinge Singularity (event horizon, NOT crossroads)',
    aspect: '4:3',
    dimension: 'landscape',
    prompt: `${STYLE_PREFIX}. Piranesi-inspired architectural landscape. Right third: tall stone observatory tower with spiral staircase visible through arched openings, dome with astronomical instruments (telescope, astrolabe, sextant). Upper platform: lone observer figure in traveling cloak with staff, silhouette in contemplative pose, back to viewer, gazing outward. Left two-thirds: vast roiling fog-bank rolling across the horizon, out of which emerge faint ghostly contours of mountains or distant structures — suggestive but unresolved, the fog as epistemic limit. Foreground base: rocky outcrop with several paths losing themselves into the mist (minimal, not emphasized). Sky: dramatic stormy clouds with single shaft of light breaking through. Mood: solemn, contemplative, sublime, event horizon of knowledge. Engraved plate aesthetic.`,
  },
  ch10: {
    name: 'Plate 10 — Gibson Neuromancer (Victorian-aether cyberspace)',
    aspect: '4:3',
    dimension: 'landscape',
    prompt: `${STYLE_PREFIX}. Open-plan Victorian office, three desks in a row. Each desk has a brass keyboard-terminal apparatus (engraved ornament, not modern screen). Three workers in profile: left — woman with a Victorian head-mounted telegraph augmentation device, dense engraved grid of parallel lines and small data-marks floating above her head like aether; center — man without devices, hands flat on empty desk, sparse thin grid above him; right — man gesturing at rich dynamic engraved grid of parallel lines with symbols, multiple augmentation devices on head and wrists. Each grid recedes into architectural perspective as an engraved aetheric cloud. Spectral chiaroscuro. Engraved plate aesthetic.`,
  },
  int1: {
    name: 'Intermezzo 1 — Mad Tea Party (satirical)',
    aspect: '1:1',
    dimension: 'square',
    prompt: `Tenniel-inspired Victorian satirical engraving in Alice in Wonderland tradition, monochrome sepia on ivory laid paper, crosshatching. Outdoor long table in a garden with too many chairs, set with mismatched teapots and crooked cups. At the table: a Mad-Hatter figure with oversized top hat leaning forward holding a pocket-watch submerged in a teacup; a March-Hare figure with dressing gown pouring tea into another hare's ear; a sleepy Dormouse in the teapot; Alice-figure in pinafore looking quizzical. Behind them: a caricature Behemoth-cat (grinning, oversized, satirical) observing from a tree branch. Satirical tone, theatrical exaggeration, Punch-magazine caricature register. Engraved plate aesthetic.`,
  },
  int2: {
    name: 'Intermezzo 2 — Underground production (satirical)',
    aspect: '1:1',
    dimension: 'square',
    prompt: `Victorian satirical engraving, Tenniel-Punch caricature tradition, monochrome sepia on ivory laid paper, crosshatching. Subterranean workshop interior, absurd scale. A labyrinthine basement with too many doors and a spiral staircase that loops impossibly. Factory-like machinery of brass cogs and belts that clearly go nowhere — cogs drive cogs drive cogs in a closed loop. Workers in bowler hats and aprons pulling levers with serious expressions on exaggerated faces. A chief-figure in pince-nez holds a clipboard watching a dial labeled with nonsense marks. Behemoth-cat caricature peeks from a side alcove. Satirical absurd-logic of bureaucratic production. Engraved plate aesthetic.`,
  },
  int3: {
    name: 'Intermezzo 3 — Looking-glass escalation (satirical)',
    aspect: '1:1',
    dimension: 'square',
    prompt: `Victorian satirical engraving, Tenniel Through the Looking-Glass tradition, monochrome sepia on ivory laid paper, crosshatching. Theatrical interior: a grand lift or elevator with an ornate brass gate. Inside the lift: Alice-figure calmly standing, holding a teacup. The lift is ascending a vertical spiral tower so tall its top disappears into a cloud. Each floor window visible along the spiral reveals an increasingly surreal office scene — first normal, then tilted, then upside-down, then just mouths on walls shouting. Alice's expression unchanged across all floors: mild curiosity. Behemoth-cat figure lounges on the tower's exterior ledge observing with a knowing smirk. Satirical escalation of corporate vertigo. Engraved plate aesthetic.`,
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

async function generateOne(slot, plateDef, seedIdx) {
  const label = `${slot}-v${seedIdx}`;
  console.log(`\n[${label}] ${plateDef.name}`);

  // Inline negatives into prompt: Flux 1.1 Pro doesn't take separate negative_prompt param.
  // Prepend anti-phantom + anti-photo-style rejections using trailing "NO ..." clauses.
  const promptWithNegatives = `${plateDef.prompt}\n\nStrictly NO visible text anywhere on the plate: ${NEGATIVE_BASE}. Style exclusions: ${NEGATIVE_FLUX}.`;

  const { status, body } = await apiRequest('POST', MODEL_ENDPOINT, {
    input: {
      prompt: promptWithNegatives,
      aspect_ratio: plateDef.aspect,
      output_format: 'webp',
      output_quality: 90,
      safety_tolerance: 5,
    },
  });

  if (status === 429) {
    const retryAfter = body.detail?.match(/(\d+)/)?.[1] || 15;
    await sleep((parseInt(retryAfter) + 2) * 1000);
    return generateOne(slot, plateDef, seedIdx);
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
  const arg = (process.argv[2] || 'ch0').toLowerCase();
  const seeds = parseInt(process.argv[3] || '3', 10);

  let slots;
  const ACTS = {
    act1: ['ch0', 'ch1', 'ch2', 'ch3', 'ch4', 'int1'],
    act2: ['ch5', 'ch6', 'ch7', 'int2'],
    act3: ['ch8', 'ch9', 'ch10', 'int3'],
  };
  if (arg === 'all') slots = Object.keys(PLATES);
  else if (ACTS[arg]) slots = ACTS[arg];
  else if (PLATES[arg]) slots = [arg];
  else if (arg.includes(',')) slots = arg.split(',').filter(s => PLATES[s]);
  else { console.error(`Unknown slot: ${arg}`); console.error(`Available: ${Object.keys(PLATES).join(', ')}, act1|act2|act3, all, or comma-sep list`); process.exit(1); }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const total = slots.length * seeds;
  console.log(`AGIL-079 generation: ${slots.length} slots × ${seeds} seeds = ${total} gens`);

  const results = [];
  const tasks = [];
  for (const s of slots) for (let v = 1; v <= seeds; v++) tasks.push({ slot: s, v });

  for (let i = 0; i < tasks.length; i++) {
    const { slot, v } = tasks[i];
    try { results.push(await generateOne(slot, PLATES[slot], v)); }
    catch (err) {
      console.error(`  FAIL ${slot}-v${v}: ${err.message}`);
      results.push({ slot, seedIdx: v, filename: null, error: err.message });
    }
    if (i < tasks.length - 1) { console.log(`  waiting ${DELAY_MS / 1000}s...`); await sleep(DELAY_MS); }
  }

  let ok = 0;
  for (const r of results) if (r.filename) ok++;
  console.log(`\nTotals: ${ok}/${total} OK, cost ≈ $${(ok * 0.04).toFixed(2)}`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
