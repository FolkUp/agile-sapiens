#!/usr/bin/env node
// AGIL-187 Sub-D: Walk every plain-markdown internal link, resolve against
// the union of (current-slug, aliases-array) per file. Hostile reviewer:
// plain MD links silently 404 at runtime (vs relref shortcode build-fail).

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');

// Walk content/ for all .md files
function walkMd(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkMd(full));
    else if (entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

const files = walkMd(path.join(root, 'content'));

// Build slug → file map (resolve via Hugo conventions)
// File `content/chapters/chapter-N.md` serves at `/chapters/chapter-N/`
// File `content/legal/terms.ru.md` serves at `/legal/terms/` (under defaultContentLanguage=ru)
// File `content/section/_index.md` serves at `/section/`
const slugMap = new Map();    // canonical URL → file path
const aliasMap = new Map();   // alias URL → canonical URL

for (const file of files) {
  const rel = path.relative(path.join(root, 'content'), file).replace(/\\/g, '/');
  // Strip language extension if .ru.md (Hugo collapses to base path under ru-default)
  let urlPath = rel.replace(/\.ru\.md$/, '.md');
  // Strip _index.md to directory URL
  if (urlPath.endsWith('/_index.md') || urlPath === '_index.md') {
    urlPath = urlPath.replace(/_index\.md$/, '');
  } else {
    urlPath = urlPath.replace(/\.md$/, '/');
  }
  const url = '/' + urlPath;
  slugMap.set(url.replace(/\/+$/, '/'), file);

  // Read frontmatter for aliases
  const content = fs.readFileSync(file, 'utf8');
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (fmMatch) {
    const fm = fmMatch[1];
    const aliasMatch = fm.match(/^aliases:\s*\n((?:\s+-\s+.+\n)+)/m);
    if (aliasMatch) {
      const aliases = aliasMatch[1].split('\n')
        .map(l => l.match(/^\s+-\s+"?(\/[^"]+)"?$/))
        .filter(m => m)
        .map(m => m[1]);
      for (const a of aliases) {
        const aNorm = a.endsWith('/') ? a : a + '/';
        aliasMap.set(aNorm, url);
      }
    }
  }
}

// Extract all plain-markdown links [text](/path/) from each file
const findings = [];
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  // Match [text](/path) — internal links starting with /
  const linkRe = /\[([^\]]+)\]\((\/[^)]+)\)/g;
  let m;
  while ((m = linkRe.exec(content)) !== null) {
    const [_, text, href] = m;
    // Skip mailto, tel, fragment-only
    if (href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    // Normalize: strip query/fragment for resolution check
    const baseHref = href.split('#')[0].split('?')[0];
    const normalized = baseHref.endsWith('/') ? baseHref : baseHref + '/';

    const resolved = slugMap.has(normalized) || aliasMap.has(normalized);
    // Also accept root-level paths to static content
    const staticResolved = fs.existsSync(path.join(root, 'static', baseHref));

    if (!resolved && !staticResolved) {
      // Check if it's a fragment within current page (no path, just #)
      const isFragmentOnly = baseHref === '' && href.startsWith('#');
      if (!isFragmentOnly) {
        findings.push({
          file: path.relative(root, file).replace(/\\/g, '/'),
          link: href,
          text: text.substring(0, 50)
        });
      }
    }
  }
}

console.log(`=== INTERNAL LINK RESOLUTION AUDIT ===`);
console.log(`Total content .md files: ${files.length}`);
console.log(`Canonical URLs registered: ${slugMap.size}`);
console.log(`Aliases registered: ${aliasMap.size}`);
console.log(`Unresolved links: ${findings.length}`);
console.log('');

if (findings.length === 0) {
  console.log('✅ All internal plain-MD links resolve to canonical URLs or aliases');
} else {
  console.log('⚠️ UNRESOLVED LINKS:');
  for (const f of findings) {
    console.log(`  ${f.file}`);
    console.log(`    → ${f.link}  ("${f.text}")`);
  }
}

// Write report
fs.writeFileSync(
  path.join(root, 'internal-link-resolution-report.json'),
  JSON.stringify({
    date: new Date().toISOString(),
    canonicals: [...slugMap.keys()].sort(),
    aliases: [...aliasMap.entries()].map(([k,v]) => ({ alias: k, target: v })),
    findings
  }, null, 2)
);

process.exit(findings.length ? 1 : 0);
