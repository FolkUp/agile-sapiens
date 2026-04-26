/**
 * check-multi-hr.mjs
 * AGIL-126: Frontmatter-aware multi-HR scanner for agile-sapiens chapter content.
 *
 * Scans content/chapters/*.md for duplicate/redundant HR (`---`) patterns:
 *   Type A: Two or more `---` lines in body, separated only by empty lines (consecutive-hr)
 *   Type B: `---` immediately adjacent to a chapter-break or section-break shortcode
 *   Type C: `---` immediately before ## Sources / ## Источники / **Footnotes:**
 *           AND another `---` at the end of that block (double-HR wrapping sources)
 *
 * Frontmatter is safely skipped: the first `---` at line 0 opens the block,
 * and scanning begins only after the closing `---` is found.
 */

import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SHORTCODE_PATTERN = /\{\{<\s*(chapter-break|section-break)/;
const SOURCES_HEADER_PATTERN = /^(##\s+(Sources|Источники|Примечания|Источники и примечания)|^\*\*Footnotes:\*\*)/;

async function scanFile(filePath) {
  const text = await fs.readFile(filePath, 'utf-8');
  const lines = text.split('\n');
  const relPath = path.relative(ROOT, filePath).replace(/\\/g, '/');
  const findings = [];

  // --- Frontmatter skip ---
  // Hugo frontmatter: first line must be exactly '---', second delimiter closes it.
  let bodyStart = 0;
  if (lines[0] !== undefined && lines[0].trim() === '---') {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        bodyStart = i + 1; // body starts after closing ---
        break;
      }
    }
  }

  // Collect positions of all HR lines in body
  const hrPositions = [];
  for (let i = bodyStart; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      hrPositions.push(i);
    }
  }

  // --- Type A: consecutive HRs (separated only by blank lines) ---
  for (let k = 0; k < hrPositions.length - 1; k++) {
    const posA = hrPositions[k];
    const posB = hrPositions[k + 1];

    // Check that all lines between posA and posB are empty
    let onlyBlanks = true;
    for (let j = posA + 1; j < posB; j++) {
      if (lines[j].trim() !== '') {
        onlyBlanks = false;
        break;
      }
    }

    if (onlyBlanks) {
      const context = extractContext(lines, posA, posB);
      findings.push({
        file: relPath,
        line: posA + 1, // 1-indexed
        line2: posB + 1,
        type: 'A',
        description: 'consecutive-hr (only blank lines between)',
        context,
      });
    }
  }

  // --- Type B: HR adjacent to chapter-break / section-break shortcode ---
  for (const hrPos of hrPositions) {
    // Look 1-3 lines forward (skip blanks)
    let fwd = hrPos + 1;
    while (fwd < lines.length && lines[fwd].trim() === '') fwd++;
    if (fwd < lines.length && SHORTCODE_PATTERN.test(lines[fwd])) {
      const context = extractContext(lines, hrPos - 2, fwd + 1);
      findings.push({
        file: relPath,
        line: hrPos + 1,
        type: 'B',
        description: `hr-adjacent-before-shortcode (shortcode at line ${fwd + 1})`,
        context,
      });
    }

    // Look 1-3 lines backward (skip blanks)
    let bwd = hrPos - 1;
    while (bwd >= bodyStart && lines[bwd].trim() === '') bwd--;
    if (bwd >= bodyStart && SHORTCODE_PATTERN.test(lines[bwd])) {
      const context = extractContext(lines, bwd - 1, hrPos + 1);
      findings.push({
        file: relPath,
        line: hrPos + 1,
        type: 'B',
        description: `hr-adjacent-after-shortcode (shortcode at line ${bwd + 1})`,
        context,
      });
    }
  }

  // --- Type C: HR before Sources/Footnotes AND another HR after the sources block ---
  // Pattern: ... text ... \n---\n\n## Sources / **Footnotes:** ... footnotes ... \n---\n(EOF or next section)
  for (let k = 0; k < hrPositions.length - 1; k++) {
    const posA = hrPositions[k];

    // Find first non-blank line after posA
    let nextContent = posA + 1;
    while (nextContent < lines.length && lines[nextContent].trim() === '') nextContent++;

    if (nextContent < lines.length && SOURCES_HEADER_PATTERN.test(lines[nextContent])) {
      // We found an HR before a sources/footnotes block.
      // Now find the next HR after this sources block.
      // Look ahead through remaining hrPositions for one that comes after nextContent
      for (let m = k + 1; m < hrPositions.length; m++) {
        if (hrPositions[m] > nextContent) {
          const posB = hrPositions[m];
          const context = extractContext(lines, posA, posB + 1);
          findings.push({
            file: relPath,
            line: posA + 1,
            line2: posB + 1,
            type: 'C',
            description: `hr-wrapping-sources-block (opening HR at line ${posA + 1}, closing HR at line ${posB + 1}, sources header "${lines[nextContent].trim()}" at line ${nextContent + 1})`,
            context,
          });
          break; // only report the first closing HR per opening HR
        }
      }
    }
  }

  return findings;
}

function extractContext(lines, fromIdx, toIdx) {
  const start = Math.max(0, fromIdx - 1);
  const end = Math.min(lines.length - 1, toIdx + 1);
  return lines
    .slice(start, end + 1)
    .map((l, i) => `L${start + i + 1}: ${l}`)
    .join('\n');
}

async function main() {
  const pattern = path.join(ROOT, 'content/chapters/*.md').replace(/\\/g, '/');
  const files = await glob(pattern);
  files.sort();

  const allFindings = [];

  for (const file of files) {
    const findings = await scanFile(file);
    allFindings.push(...findings);
  }

  // Output JSON
  process.stdout.write(JSON.stringify(allFindings, null, 2) + '\n');

  // Summary to stderr so it doesn't pollute JSON stdout
  const typeA = allFindings.filter(f => f.type === 'A');
  const typeB = allFindings.filter(f => f.type === 'B');
  const typeC = allFindings.filter(f => f.type === 'C');

  const filesA = new Set(typeA.map(f => f.file)).size;
  const filesB = new Set(typeB.map(f => f.file)).size;
  const filesC = new Set(typeC.map(f => f.file)).size;

  process.stderr.write(`\nSCAN COMPLETE — Total findings: ${allFindings.length}\n`);
  process.stderr.write(`  Type A (consecutive-hr):       ${typeA.length} instances in ${filesA} files\n`);
  process.stderr.write(`  Type B (adjacent-shortcode):   ${typeB.length} instances in ${filesB} files\n`);
  process.stderr.write(`  Type C (hr-wrapping-sources):  ${typeC.length} instances in ${filesC} files\n`);
  process.stderr.write(`\nFrontmatter false-positives: 0 (scanner skips frontmatter block)\n`);
}

main().catch(err => {
  process.stderr.write(`ERROR: ${err.message}\n`);
  process.exit(1);
});
