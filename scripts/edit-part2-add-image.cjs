/**
 * Edit Part 2 of jazz article to add chiaroscuro cover image.
 *
 * Usage:
 *   TG_TG="..." PART1_URL="..." node scripts/edit-part2-add-image.cjs
 */
const https = require('https');
const fs = require('fs');

const TG_TG = process.env.TG_TG;
const PART1_URL = process.env.PART1_URL;
if (!TG_TG || !PART1_URL) { console.error('TG_TG and PART1_URL required'); process.exit(1); }

const ARTICLE_PATH = 'C:\\Users\\ankle\\Downloads\\inbox-2026-06-06\\s24-jazz-1\\СТАТЬЯ-1-джаз-как-опен-сорс-ЧИСТОВИК-С24.md';
const PART2_COVER_URL = 'https://folkup.app/media/articles/2026-06-06-jazz-as-opensource/alice-jazz-chiaroscuro-part2.webp';
const YOUTUBE_URL = 'https://youtu.be/E5LDMqJx8Cw';
const PART2_PATH = 'Dzhaz-kak-open-sors--chast-2-06-06';
const SPLIT_AT_LINE = 124;

// Reuse parser from main script
const mainScript = fs.readFileSync('scripts/publish-jazz-article.cjs', 'utf8');
const parseInlineMatch = mainScript.match(/function parseInline\([\s\S]+?\n\}/);
const markdownToNodesMatch = mainScript.match(/function markdownToNodes\([\s\S]+?return nodes;\s+\}/);
eval(parseInlineMatch[0]);
eval(markdownToNodesMatch[0]);

function buildPart2() {
  const md = fs.readFileSync(ARTICLE_PATH, 'utf8');
  const lines = md.split('\n');
  const mdPart = lines.slice(SPLIT_AT_LINE).join('\n');
  const bodyNodes = markdownToNodes(mdPart);
  return [
    { tag: 'figure', children: [{ tag: 'img', attrs: { src: PART2_COVER_URL } }] },
    { tag: 'p', children: [
      { tag: 'em', children: [
        '← Начало в 1-й части: ',
        { tag: 'a', attrs: { href: PART1_URL }, children: ['читать сначала'] }
      ]}
    ]},
    { tag: 'p', children: [
      { tag: 'em', children: [
        '🎷 Послушать: ',
        { tag: 'a', attrs: { href: YOUTUBE_URL }, children: [YOUTUBE_URL] }
      ]}
    ]},
    { tag: 'hr' },
    ...bodyNodes
  ];
}

function telegraphPost(method, params) {
  return new Promise((resolve, reject) => {
    const body = Object.entries(params).map(([k, v]) => {
      const val = typeof v === 'string' ? v : JSON.stringify(v);
      return `${encodeURIComponent(k)}=${encodeURIComponent(val)}`;
    }).join('&');
    const req = https.request({
      hostname: 'api.telegra.ph', path: `/${method}`, method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) },
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch (e) { reject(e); } });
    });
    req.on('error', reject);
    req.write(body); req.end();
  });
}

(async () => {
  const content = buildPart2();
  const json = JSON.stringify(content);
  console.log(`Part 2 with image: ${content.length} nodes, ${Buffer.byteLength(json)} bytes`);
  const result = await telegraphPost('editPage', {
    access_token: TG_TG,
    path: PART2_PATH,
    title: 'Джаз как опен-сорс — часть 2',
    author_name: 'Команданте FolkUp',
    author_url: 'https://folkup.app',
    content: content,
    return_content: false,
  });
  if (result.ok) console.log('✓ Updated:', result.result.url);
  else console.error('FAIL:', JSON.stringify(result));
})();
