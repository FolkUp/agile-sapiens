/**
 * Publish статья 1 «Джаз как опен-сорс» к Telegraph + return URL.
 *
 * Per Posthorn protocol (Cartouche L3 cont #14 EXT-3):
 *   1. Read article markdown
 *   2. Convert к Telegraph nodes JSON
 *   3. POST /createPage с cover URL + YouTube link
 *   4. Save URL к canonical staging
 *
 * Usage:
 *   TG_TG="$(sops -d --extract '["telegraph"]["access_token"]' .../telegraph.enc.yaml)" \
 *     node scripts/publish-jazz-article.cjs
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const TG_TG = process.env.TG_TG;
if (!TG_TG) { console.error('TG_TG env var required (Telegraph access_token)'); process.exit(1); }

const ARTICLE_PATH = 'C:\\Users\\ankle\\Downloads\\inbox-2026-06-06\\s24-jazz-1\\СТАТЬЯ-1-джаз-как-опен-сорс-ЧИСТОВИК-С24.md';
const COVER_URL = 'https://folkup.app/media/articles/2026-06-06-jazz-as-opensource/alice-jazz-hopper-main.webp';
const PART2_COVER_URL = 'https://folkup.app/media/articles/2026-06-06-jazz-as-opensource/alice-jazz-chiaroscuro-part2.webp';
const YOUTUBE_URL = 'https://youtu.be/E5LDMqJx8Cw';
const OUTPUT_META = 'C:\\Transit\\jazz-article-telegraph-meta.json';

// --- Markdown → Telegraph nodes parser ---

function parseInline(text) {
  // Parse **bold**, *italic*, [link](url), inline code — optimized to keep text in single strings
  const result = [];
  let i = 0;
  let textBuf = '';
  const flush = () => { if (textBuf) { result.push(textBuf); textBuf = ''; } };

  while (i < text.length) {
    if (text.startsWith('**', i)) {
      const end = text.indexOf('**', i + 2);
      if (end !== -1) {
        flush();
        result.push({ tag: 'strong', children: parseInline(text.slice(i + 2, end)) });
        i = end + 2; continue;
      }
    }
    if (text[i] === '*' && text[i+1] !== ' ' && text[i+1] !== '*') {
      const end = text.indexOf('*', i + 1);
      if (end !== -1 && text[end-1] !== ' ') {
        flush();
        result.push({ tag: 'em', children: parseInline(text.slice(i + 1, end)) });
        i = end + 1; continue;
      }
    }
    if (text[i] === '[') {
      const closeBracket = text.indexOf(']', i);
      if (closeBracket !== -1 && text[closeBracket + 1] === '(') {
        const closeParen = text.indexOf(')', closeBracket);
        if (closeParen !== -1) {
          flush();
          const linkText = text.slice(i + 1, closeBracket);
          const linkUrl = text.slice(closeBracket + 2, closeParen);
          result.push({ tag: 'a', attrs: { href: linkUrl }, children: parseInline(linkText) });
          i = closeParen + 1; continue;
        }
      }
    }
    if (text[i] === '`') {
      const end = text.indexOf('`', i + 1);
      if (end !== -1) {
        flush();
        result.push({ tag: 'code', children: [text.slice(i + 1, end)] });
        i = end + 1; continue;
      }
    }
    textBuf += text[i]; i++;
  }
  flush();
  return result;
}

function markdownToNodes(md) {
  const nodes = [];
  const lines = md.split('\n');
  let i = 0;

  // Helper to parse blockquote (voice overlay pattern: > **Name:** ...)
  function parseBlockquote(line) {
    const content = line.replace(/^>\s?/, '');
    return { tag: 'blockquote', children: parseInline(content) };
  }

  while (i < lines.length) {
    const line = lines[i];

    // Skip first 2 title lines (title + subtitle handled separately in Telegraph)
    if (i === 0 && line.startsWith('# ')) { i++; continue; }
    if (i <= 3 && line.startsWith('### ')) { i++; continue; }

    // Skip pre-body headers
    if (line.startsWith('**Команданте FolkUp** ·') || line.startsWith('`[ГЛАВНАЯ ИЛЛЮСТРАЦИЯ')) { i++; continue; }
    // Skip HTML comment block (TZ Фриде) and EVERYTHING after to save space
    if (line.startsWith('<!--')) break;
    // Stop processing at license footer — keep license but skip TZ comment afterward
    if (line.includes('© Команданте FolkUp')) {
      nodes.push({ tag: 'p', children: [{ tag: 'em', children: parseInline(line.replace(/^\*|\*$/g, '')) }] });
      i++;
      // Skip any remaining lines (comment block follows)
      break;
    }

    // hr
    if (line.match(/^---+$/)) {
      nodes.push({ tag: 'hr' });
      i++; continue;
    }

    // h2 → h3
    if (line.startsWith('## ')) {
      nodes.push({ tag: 'h3', children: parseInline(line.slice(3)) });
      i++; continue;
    }

    // h3 → h4
    if (line.startsWith('### ')) {
      nodes.push({ tag: 'h4', children: parseInline(line.slice(4)) });
      i++; continue;
    }

    // blockquote — possibly multi-line voice overlay
    if (line.startsWith('>')) {
      const block = [parseBlockquote(line)];
      i++;
      while (i < lines.length && lines[i].startsWith('>')) {
        block.push(parseBlockquote(lines[i]));
        i++;
      }
      // Combine multi-line blockquote into single
      if (block.length === 1) {
        nodes.push(block[0]);
      } else {
        nodes.push({
          tag: 'blockquote',
          children: block.flatMap((bq, idx) => idx === 0 ? bq.children : ['\n', ...bq.children])
        });
      }
      continue;
    }

    // empty line
    if (line.trim() === '') { i++; continue; }

    // paragraph (possibly multi-line)
    const para = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== '' && !lines[i].startsWith('#') && !lines[i].startsWith('>') && !lines[i].match(/^---+$/)) {
      para.push(lines[i]);
      i++;
    }
    nodes.push({ tag: 'p', children: parseInline(para.join(' ')) });
  }
  return nodes;
}

// --- Build Telegraph content ---
// Split at line 124 (after «Обмен репликами», before «Разворот: кто платит за общее»)

const SPLIT_AT_LINE = 124;

function buildContent(part) {
  const md = fs.readFileSync(ARTICLE_PATH, 'utf8');
  const lines = md.split('\n');

  let mdPart, prefix, suffix;
  if (part === 1) {
    mdPart = lines.slice(0, SPLIT_AT_LINE).join('\n');
    prefix = [
      { tag: 'figure', children: [{ tag: 'img', attrs: { src: COVER_URL } }] },
      { tag: 'p', children: [
        { tag: 'em', children: [
          '🎷 Послушать пока читаете: ',
          { tag: 'a', attrs: { href: YOUTUBE_URL }, children: [YOUTUBE_URL] }
        ]}
      ]},
      { tag: 'hr' },
    ];
    suffix = [
      { tag: 'hr' },
      { tag: 'p', children: [
        { tag: 'strong', children: ['Продолжение во 2-й части → '] },
        { tag: 'a', attrs: { href: process.env.PART2_URL || '#' }, children: ['читать дальше'] }
      ]}
    ];
  } else {
    mdPart = lines.slice(SPLIT_AT_LINE).join('\n');
    prefix = [
      { tag: 'figure', children: [{ tag: 'img', attrs: { src: PART2_COVER_URL } }] },
      { tag: 'p', children: [
        { tag: 'em', children: [
          '← Начало в 1-й части: ',
          { tag: 'a', attrs: { href: process.env.PART1_URL || '#' }, children: ['читать сначала'] }
        ]}
      ]},
      { tag: 'p', children: [
        { tag: 'em', children: [
          '🎷 Послушать: ',
          { tag: 'a', attrs: { href: YOUTUBE_URL }, children: [YOUTUBE_URL] }
        ]}
      ]},
      { tag: 'hr' },
    ];
    suffix = [];
  }

  const bodyNodes = markdownToNodes(mdPart);
  return [...prefix, ...bodyNodes, ...suffix];
}

// --- Telegraph API ---

function telegraphPost(method, params) {
  return new Promise((resolve, reject) => {
    const body = Object.entries(params).map(([k, v]) => {
      const val = typeof v === 'string' ? v : JSON.stringify(v);
      return `${encodeURIComponent(k)}=${encodeURIComponent(val)}`;
    }).join('&');

    const req = https.request({
      hostname: 'api.telegra.ph', path: `/${method}`, method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`parse: ${data.slice(0, 300)}`)); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function publishPart(part, title) {
  const content = buildContent(part);
  const json = JSON.stringify(content);
  console.log(`Part ${part}: ${content.length} nodes, JSON ${Buffer.byteLength(json, 'utf8')} bytes`);

  const result = await telegraphPost('createPage', {
    access_token: TG_TG,
    title: title,
    author_name: 'Команданте FolkUp',
    author_url: 'https://folkup.app',
    content: content,
    return_content: false,
  });

  if (!result.ok) {
    throw new Error(`Part ${part} Telegraph error: ${JSON.stringify(result).slice(0, 500)}`);
  }
  return result.result;
}

async function editPart(part, title, pathSlug) {
  // editPage to inject cross-link с другой части URL
  const content = buildContent(part);

  const result = await telegraphPost('editPage', {
    access_token: TG_TG,
    path: pathSlug,
    title: title,
    author_name: 'Команданте FolkUp',
    author_url: 'https://folkup.app',
    content: content,
    return_content: false,
  });

  if (!result.ok) {
    throw new Error(`Edit part ${part} error: ${JSON.stringify(result).slice(0, 500)}`);
  }
  return result.result;
}

async function main() {
  console.log('Publishing Part 2 first (no Part1 URL needed yet)…');
  const part2 = await publishPart(2, 'Джаз как опен-сорс — часть 2');
  console.log(`✓ Part 2: ${part2.url}`);

  console.log('\nPublishing Part 1 with Part2 URL link…');
  process.env.PART2_URL = part2.url;
  const part1 = await publishPart(1, 'Джаз как опен-сорс');
  console.log(`✓ Part 1: ${part1.url}`);

  console.log('\nEditing Part 2 to add back-link к Part 1…');
  process.env.PART1_URL = part1.url;
  await editPart(2, 'Джаз как опен-сорс — часть 2', part2.path);
  console.log('✓ Part 2 cross-link updated');

  // Save metadata
  const meta = {
    title: part1.title,
    part1_url: part1.url,
    part2_url: part2.url,
    cover_url: COVER_URL,
    youtube_url: YOUTUBE_URL,
    created: new Date().toISOString(),
    article_source: ARTICLE_PATH,
  };
  fs.writeFileSync(OUTPUT_META, JSON.stringify(meta, null, 2));
  console.log(`\n✓ Meta saved → ${OUTPUT_META}`);
  console.log(`\n📰 Main URL (для cliffhanger в TG): ${part1.url}`);
}

main().catch(e => { console.error(`FAILED: ${e.message}`); process.exit(1); });
