#!/usr/bin/env node
// AGIL-187 Sub-C: UTF-8-safe footnote parity audit
// Mandated by hostile reviewer Gap 3: shell grep -P fails on default locale,
// producing false-PASS counts. Must use Node Unicode-aware regex.
//
// For each content file:
//  1. Extract inline superscript markers ¹²³⁴⁵⁶⁷⁸⁹⁰ (supports multi-digit ¹⁰ ¹¹ etc)
//  2. Extract footnote body lines (¹/¹⁰ at start of line followed by space + text)
//  3. Assert bidirectional parity: every inline → body, every body → inline

const fs = require('fs');
const path = require('path');

const SUPERSCRIPT_DIGITS = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const SUP_TO_NORMAL = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
function supToNum(s) {
  return s.split('').map(c => SUP_TO_NORMAL[c] ?? c).join('');
}

function audit(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  const body = content.replace(/^---[\s\S]*?\n---/, '');

  // Split: footnotes section is typically the FINAL block of lines starting with ¹/²/etc
  // Inline = everything before that block
  const lines = body.split('\n');

  // Find footnote body lines (line starts with one or more superscript digits + space)
  const footnoteLineRegex = new RegExp(`^([${SUPERSCRIPT_DIGITS}]+)\\s+\\S`);
  const bodyNumbers = new Set();
  const bodyOccurrences = {};
  lines.forEach((line, idx) => {
    const m = line.match(footnoteLineRegex);
    if (m) {
      const num = supToNum(m[1]);
      bodyNumbers.add(num);
      bodyOccurrences[num] = (bodyOccurrences[num] || 0) + 1;
    }
  });

  // Find inline markers: superscript digit(s) appearing inside text (not as line-start body)
  // Strategy: collect ALL superscript runs in document, subtract body line-starts
  const allRunsRegex = new RegExp(`[${SUPERSCRIPT_DIGITS}]+`, 'g');
  const allRuns = [...body.matchAll(allRunsRegex)];
  const inlineNumbers = new Set();
  const inlineOccurrences = {};

  // Reconstruct: for each match, check if it's at start of a line (=body) or inline
  const positions = [];
  let offset = 0;
  for (const line of lines) {
    const lineMatches = [...line.matchAll(allRunsRegex)];
    for (const m of lineMatches) {
      const absPos = offset + m.index;
      const lineStartPos = offset;
      const isBodyStart = (m.index === 0 && line.match(footnoteLineRegex));
      if (!isBodyStart) {
        const num = supToNum(m[0]);
        inlineNumbers.add(num);
        inlineOccurrences[num] = (inlineOccurrences[num] || 0) + 1;
      }
    }
    offset += line.length + 1;
  }

  // Compute mismatches
  const orphanInline = [...inlineNumbers].filter(n => !bodyNumbers.has(n)).sort((a,b) => +a - +b);
  const orphanBody = [...bodyNumbers].filter(n => !inlineNumbers.has(n)).sort((a,b) => +a - +b);

  return {
    file: path.basename(filepath),
    bodyCount: bodyNumbers.size,
    inlineCount: inlineNumbers.size,
    orphanInline,   // markers with no body
    orphanBody,     // bodies with no inline ref
    bodyDuplicates: Object.entries(bodyOccurrences).filter(([k,v]) => v > 1),
    inlineDistribution: Object.entries(inlineOccurrences).sort((a,b) => +a[0] - +b[0])
  };
}

const targets = [
  'content/preface.md',
  'content/afterword.md',
  'content/chapters/chapter-0-pilot.md',
  'content/chapters/chapter-1-jules-verne.md',
  'content/chapters/chapter-2-frankenstein.md',
  'content/chapters/chapter-3-holmes.md',
  'content/chapters/chapter-4-borges.md',
  'content/chapters/chapter-5-nemo.md',
  'content/chapters/chapter-6-mina-harker.md',
  'content/chapters/chapter-6-jekyll-hyde.md',
  'content/chapters/chapter-7-don-quixote.md',
  'content/chapters/chapter-8-time-machine.md',
  'content/chapters/chapter-9-niichavo.md',
  'content/chapters/chapter-10-chuma.md',
];

const root = path.resolve(__dirname, '..');
const results = targets.map(t => audit(path.join(root, t)));

let hasOrphans = false;
console.log('=== FOOTNOTE PARITY AUDIT ===');
console.log('File                                 | Body | Inline | OrphanInline | OrphanBody | Dupes');
console.log('-'.repeat(110));
for (const r of results) {
  const flag = (r.orphanInline.length || r.orphanBody.length || r.bodyDuplicates.length) ? ' ⚠️' : '';
  if (r.orphanInline.length || r.orphanBody.length) hasOrphans = true;
  console.log(
    `${r.file.padEnd(37)}| ${String(r.bodyCount).padStart(4)} | ${String(r.inlineCount).padStart(6)} | ` +
    `${(r.orphanInline.join(',') || '-').padEnd(12)} | ${(r.orphanBody.join(',') || '-').padEnd(10)} | ` +
    `${r.bodyDuplicates.length ? r.bodyDuplicates.map(d => `${d[0]}×${d[1]}`).join(',') : '-'}${flag}`
  );
}
console.log('-'.repeat(110));
console.log(hasOrphans ? '⚠️  ORPHANS DETECTED — see above' : '✅ All footnote bodies and inline markers in parity');

// Detailed per-file report for any with orphans
const flagged = results.filter(r => r.orphanInline.length || r.orphanBody.length || r.bodyDuplicates.length);
if (flagged.length) {
  console.log('\n=== DETAILED MISMATCH REPORT ===');
  for (const r of flagged) {
    console.log(`\n${r.file}:`);
    if (r.orphanInline.length) console.log(`  Inline markers without body: ${r.orphanInline.join(', ')}`);
    if (r.orphanBody.length) console.log(`  Bodies without inline marker: ${r.orphanBody.join(', ')}`);
    if (r.bodyDuplicates.length) console.log(`  Body duplicates: ${r.bodyDuplicates.map(d => `¹${d[0]} appears ${d[1]}x`).join(', ')}`);
    console.log(`  Inline distribution: ${r.inlineDistribution.map(d => `${d[0]}:${d[1]}`).join(' ')}`);
  }
}

// Write JSON report
const reportPath = path.join(root, 'footnote-parity-report.json');
fs.writeFileSync(reportPath, JSON.stringify({
  date: new Date().toISOString(),
  results,
  totalBodies: results.reduce((s, r) => s + r.bodyCount, 0),
  totalInlineDistinct: results.reduce((s, r) => s + r.inlineCount, 0),
  filesWithOrphans: flagged.length,
}, null, 2));
console.log(`\nJSON report: ${reportPath}`);
process.exit(hasOrphans ? 1 : 0);
