#!/usr/bin/env node
/**
 * AGIL-133 Editorial Audit: Sentence variance metrics.
 *
 * Methodology (reproducible, evidence-first):
 *   1. Read every chapter file in content/chapters/ (excluding _index.md).
 *   2. Strip Hugo frontmatter (--- ... ---) and footnote block (last `---`-delimited
 *      section if present after main body).
 *   3. Strip blockquote markers, list markers, headings markers; keep prose.
 *   4. Strip Markdown emphasis (** __), inline code (`...`), reference markers (¹²³…).
 *   5. Split into sentences on `.?!…` followed by whitespace+capital OR end-of-paragraph.
 *      Drop sentences <3 words (likely artefacts: footnote refs, single-word emphasis).
 *   6. Tokenise into words via /\p{L}+/u to count.
 *   7. Bucket per Editorial Rubric (rules/EDITORIAL_RUBRIC.md):
 *        Short:      5–12 words
 *        Medium:     13–22 words
 *        Long:       23–35 words
 *        Extra-long: 36+ words
 *      Sub-5 sentences are reported separately (rubric-out-of-band).
 *   8. Detect monotone clusters: ≥3 consecutive sentences whose word-counts span ≤3.
 *   9. Detect flow disruptions: adjacent sentence delta >15 words.
 *  10. Output per-chapter JSON + aggregated console summary.
 *
 * Limitations (documented honestly):
 *   - Russian punctuation '«»' inside sentences treated as transparent.
 *   - Lists are stripped, so prose-only metrics — bullet lists not counted.
 *   - "Sentence" boundary heuristic; ~3-5% miscount expected on dialogue.
 *   - This is descriptive, not prescriptive: targets per Rubric are aspirational.
 *
 * Usage:
 *   node scripts/editorial/sentence-metrics.cjs               # all chapters
 *   node scripts/editorial/sentence-metrics.cjs chapter-1     # single chapter
 *   node scripts/editorial/sentence-metrics.cjs --json out.json
 */

const fs = require('fs');
const path = require('path');

const CHAPTERS_DIR = path.join(__dirname, '..', '..', 'content', 'chapters');

function normaliseLineEndings(text) {
  return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

function stripFrontmatter(text) {
  if (!text.startsWith('---')) return text;
  const end = text.indexOf('\n---', 3);
  if (end === -1) return text;
  return text.slice(end + 4);
}

function stripFootnoteBlock(text) {
  // Footnote convention in this corpus: a final `---` separator before
  // numbered references (¹², ², ³, ...). We keep the body before it.
  // CRLF-tolerant: rely on `\n---` (newline normalised before this call).
  const lastSep = text.lastIndexOf('\n---');
  if (lastSep === -1) return text;
  const tail = text.slice(lastSep);
  // Heuristic: tail contains footnote-numeral-glyphs.
  if (/[¹²³⁴⁵⁶⁷⁸⁹⁰]+\s/.test(tail)) {
    return text.slice(0, lastSep);
  }
  return text;
}

function cleanProse(text) {
  return text
    // Remove Hugo shortcodes {{< ... >}} and {{% ... %}}
    .replace(/\{\{[<%][\s\S]*?[>%]\}\}/g, ' ')
    // Remove fenced code blocks
    .replace(/```[\s\S]*?```/g, ' ')
    // Remove inline code
    .replace(/`[^`]*`/g, ' ')
    // Remove headings (# ...) but keep the heading text as a fragment? — drop entirely.
    .replace(/^#{1,6}\s+.*$/gm, ' ')
    // Remove blockquote markers but keep text
    .replace(/^\s*>\s?/gm, '')
    // Remove list markers
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    // Remove emphasis markers
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove footnote reference glyphs (¹²³…) and superscript digits
    .replace(/[¹²³⁴⁵⁶⁷⁸⁹⁰]+/g, ' ')
    // Remove HTML tags
    .replace(/<[^>]+>/g, ' ')
    // Collapse whitespace
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n');
}

function splitSentences(text) {
  // Replace newlines that don't end a sentence with spaces; preserve paragraph breaks.
  const paragraphs = text.split(/\n{2,}/).map(p => p.replace(/\n/g, ' ').trim()).filter(Boolean);
  const sentences = [];
  for (const p of paragraphs) {
    // Split on sentence-final punctuation followed by space + capital letter
    // OR end-of-paragraph.
    const parts = p
      .split(/(?<=[.!?…])\s+(?=[A-ZА-ЯЁ«"„])/u)
      .map(s => s.trim())
      .filter(Boolean);
    for (const s of parts) sentences.push(s);
  }
  return sentences;
}

function countWords(s) {
  const m = s.match(/\p{L}+/gu);
  return m ? m.length : 0;
}

function bucketSentence(wc) {
  if (wc < 5) return 'sub5';
  if (wc <= 12) return 'short';
  if (wc <= 22) return 'medium';
  if (wc <= 35) return 'long';
  return 'extra';
}

function analyseChapter(filepath) {
  const raw = normaliseLineEndings(fs.readFileSync(filepath, 'utf8'));
  const body = stripFootnoteBlock(stripFrontmatter(raw));
  const prose = cleanProse(body);
  const sentences = splitSentences(prose).filter(s => countWords(s) >= 3);

  const buckets = { sub5: 0, short: 0, medium: 0, long: 0, extra: 0 };
  const wordCounts = [];
  for (const s of sentences) {
    const wc = countWords(s);
    wordCounts.push(wc);
    buckets[bucketSentence(wc)]++;
  }

  // Monotone clusters: window of 3+ consecutive sentences with span ≤3 words.
  let monotoneRuns = 0;
  let monotoneSentences = 0;
  let i = 0;
  while (i < wordCounts.length - 2) {
    let j = i + 1;
    let mn = wordCounts[i], mx = wordCounts[i];
    while (j < wordCounts.length) {
      mn = Math.min(mn, wordCounts[j]);
      mx = Math.max(mx, wordCounts[j]);
      if (mx - mn > 3) break;
      j++;
    }
    const runLen = j - i;
    if (runLen >= 3) {
      monotoneRuns++;
      monotoneSentences += runLen;
      i = j;
    } else {
      i++;
    }
  }

  // Flow disruptions: adjacent delta > 15 words.
  let flowDisruptions = 0;
  for (let k = 1; k < wordCounts.length; k++) {
    if (Math.abs(wordCounts[k] - wordCounts[k - 1]) > 15) flowDisruptions++;
  }

  const total = sentences.length;
  const totalWords = wordCounts.reduce((a, b) => a + b, 0);

  return {
    file: path.basename(filepath),
    sentences_total: total,
    words_total: totalWords,
    avg_sentence_words: total ? +(totalWords / total).toFixed(2) : 0,
    distribution_count: { ...buckets },
    distribution_pct: {
      sub5: total ? +(buckets.sub5 * 100 / total).toFixed(1) : 0,
      short: total ? +(buckets.short * 100 / total).toFixed(1) : 0,
      medium: total ? +(buckets.medium * 100 / total).toFixed(1) : 0,
      long: total ? +(buckets.long * 100 / total).toFixed(1) : 0,
      extra: total ? +(buckets.extra * 100 / total).toFixed(1) : 0,
    },
    rubric_target_pct: { short: '30-35', medium: '40-45', long: '20-25', extra: '<5' },
    monotone_runs: monotoneRuns,
    monotone_sentences: monotoneSentences,
    monotone_pct: total ? +(monotoneSentences * 100 / total).toFixed(1) : 0,
    flow_disruptions: flowDisruptions,
  };
}

function main() {
  const args = process.argv.slice(2);
  const jsonIdx = args.indexOf('--json');
  let jsonOut = null;
  if (jsonIdx !== -1) {
    jsonOut = args[jsonIdx + 1];
    args.splice(jsonIdx, 2);
  }

  const filter = args[0]; // optional substring filter

  const allFiles = fs.readdirSync(CHAPTERS_DIR)
    .filter(f => f.endsWith('.md') && f !== '_index.md')
    .sort();

  const targets = filter ? allFiles.filter(f => f.includes(filter)) : allFiles;
  const results = targets.map(f => analyseChapter(path.join(CHAPTERS_DIR, f)));

  // Console summary
  console.log('='.repeat(78));
  console.log('AGIL-133 Editorial Audit | Sentence Variance Metrics');
  console.log('Generated:', new Date().toISOString());
  console.log('Methodology: scripts/editorial/sentence-metrics.cjs (see file header)');
  console.log('='.repeat(78));
  console.log();
  console.log('File'.padEnd(32) + 'Sent  Words   Avg   S%   M%   L%   X%  Mono% Disrupt');
  console.log('-'.repeat(78));
  for (const r of results) {
    const d = r.distribution_pct;
    console.log(
      r.file.padEnd(32) +
      String(r.sentences_total).padStart(4) + ' ' +
      String(r.words_total).padStart(6) + ' ' +
      String(r.avg_sentence_words).padStart(5) + ' ' +
      String(d.short).padStart(4) + ' ' +
      String(d.medium).padStart(4) + ' ' +
      String(d.long).padStart(4) + ' ' +
      String(d.extra).padStart(4) + ' ' +
      String(r.monotone_pct).padStart(5) + ' ' +
      String(r.flow_disruptions).padStart(4)
    );
  }
  console.log('-'.repeat(78));
  const totSent = results.reduce((s, r) => s + r.sentences_total, 0);
  const totWords = results.reduce((s, r) => s + r.words_total, 0);
  console.log(`TOTAL  sentences=${totSent}  words=${totWords}  avg=${(totWords/totSent).toFixed(2)} words/sentence`);
  console.log();
  console.log('Rubric target distribution: short 30-35% | medium 40-45% | long 20-25% | extra <5%');
  console.log('Mono% = % of sentences belonging to runs ≥3 with word-span ≤3.');
  console.log('Disrupt = count of adjacent sentence pairs with |delta| > 15 words.');

  if (jsonOut) {
    fs.writeFileSync(jsonOut, JSON.stringify({
      generated: new Date().toISOString(),
      methodology: 'scripts/editorial/sentence-metrics.cjs',
      rubric_source: '.claude/EDITORIAL_RUBRIC.md',
      results,
      totals: { sentences: totSent, words: totWords, avg_words_per_sentence: +(totWords/totSent).toFixed(2) },
    }, null, 2));
    console.log(`\nJSON written: ${jsonOut}`);
  }
}

main();
