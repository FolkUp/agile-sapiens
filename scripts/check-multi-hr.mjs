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
 * Code fences (``` ``` ```) are tracked — `---` inside fences is not treated as HR.
 *
 * Usage:
 *   node scripts/check-multi-hr.mjs [--fail-on-findings] [--help]
 *   node scripts/check-multi-hr.mjs --fail-on-findings   # exit 1 if any findings
 */

import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SHORTCODE_PATTERN = /\{\{<\s*(chapter-break|section-break)/;
const SOURCES_HEADER_PATTERN = /^(##\s+(Sources|Bibliography|Источники|Литература|Примечания|Источники и примечания|Sources and Notes)|\*\*Footnotes:\*\*)/;

async function scanFile(filePath) {
  let text;
  try {
    text = await fs.readFile(filePath, 'utf-8');
  } catch (err) {
    process.stderr.write(`WARN: could not read ${filePath}: ${err.message}\n`);
    return [];
  }

  const lines = text.split('\n');
  const relPath = path.relative(ROOT, filePath).replace(/\\/g, '/');
  const findings = [];

  // --- Frontmatter skip ---
  let bodyStart = 0;
  if (lines[0] !== undefined && lines[0].trim() === '---') {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        bodyStart = i + 1;
        break;
      }
    }
  }

  // Collect positions of all HR lines in body, skipping lines inside code fences
  const hrPositions = [];
  let inFence = false;
  for (let i = bodyStart; i < lines.length; i++) {
    if (lines[i].trimStart().startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (!inFence && lines[i].trim() === '---') {
      hrPositions.push(i);
    }
  }

  // --- Type A: consecutive HRs (separated only by blank lines) ---
  for (let k = 0; k < hrPositions.length - 1; k++) {
    const posA = hrPositions[k];
    const posB = hrPositions[k + 1];

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
        line: posA + 1,
        line2: posB + 1,
        type: 'A',
        description: 'consecutive-hr (only blank lines between)',
        context,
      });
    }
  }

  // --- Type B: HR adjacent to chapter-break / section-break shortcode ---
  for (const hrPos of hrPositions) {
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
  for (let k = 0; k < hrPositions.length - 1; k++) {
    const posA = hrPositions[k];

    let nextContent = posA + 1;
    while (nextContent < lines.length && lines[nextContent].trim() === '') nextContent++;

    if (nextContent < lines.length && SOURCES_HEADER_PATTERN.test(lines[nextContent])) {
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
          break;
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
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    process.stdout.write(
      'Usage: node scripts/check-multi-hr.mjs [--fail-on-findings] [--help]\n\n' +
      'Scans content/chapters/*.md for redundant HR patterns (Types A, B, C).\n' +
      'Outputs JSON findings to stdout; summary to stderr.\n\n' +
      'Options:\n' +
      '  --fail-on-findings   Exit with code 1 if any findings are found (for CI)\n' +
      '  --help, -h           Show this help message\n'
    );
    process.exit(0);
  }

  const failOnFindings = args.includes('--fail-on-findings');

  const pattern = path.join(ROOT, 'content/chapters/*.md').replace(/\\/g, '/');
  const files = await glob(pattern);
  files.sort();

  if (files.length === 0) {
    process.stderr.write(`WARN: no .md files found in content/chapters/ — check path: ${pattern}\n`);
  }

  const allFindings = [];

  for (const file of files) {
    const findings = await scanFile(file);
    allFindings.push(...findings);
  }

  process.stdout.write(JSON.stringify(allFindings, null, 2) + '\n');

  const typeA = allFindings.filter(f => f.type === 'A');
  const typeB = allFindings.filter(f => f.type === 'B');
  const typeC = allFindings.filter(f => f.type === 'C');

  const filesA = new Set(typeA.map(f => f.file)).size;
  const filesB = new Set(typeB.map(f => f.file)).size;
  const filesC = new Set(typeC.map(f => f.file)).size;

  process.stderr.write(`\nSCAN COMPLETE — ${files.length} file(s) scanned, ${allFindings.length} finding(s) total\n`);
  process.stderr.write(`  Type A (consecutive-hr):       ${typeA.length} instances in ${filesA} files\n`);
  process.stderr.write(`  Type B (adjacent-shortcode):   ${typeB.length} instances in ${filesB} files\n`);
  process.stderr.write(`  Type C (hr-wrapping-sources):  ${typeC.length} instances in ${filesC} files\n`);
  process.stderr.write(`  Frontmatter: skipped (scanner begins after closing --- of Hugo frontmatter)\n`);
  process.stderr.write(`  Code fences: skipped (--- inside \`\`\` blocks not treated as HR)\n`);

  if (failOnFindings && allFindings.length > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  process.stderr.write(`ERROR: ${err.message}\n`);
  process.exit(1);
});
