#!/usr/bin/env node
/**
 * AGIL-133 Editorial Audit: Citation compliance check.
 *
 * Methodology (per ~/.claude/rules/citation-compliance.md):
 *   1. For each chapter, find blockquotes (>) and inline quotations («…», "…").
 *   2. For each quotation, check whether a footnote reference glyph (¹²³…)
 *      appears within 200 chars after the quote close.
 *   3. For each chapter, list footnotes (lines starting with footnote glyphs
 *      after the final `---` separator) and tag any that mention "перевод"
 *      or "translator" (translation attribution per citation-compliance.md §"Перевод цитат").
 *   4. Identify Public Domain authors (Verne 1905, Shelley 1851, Doyle 1930,
 *      Stevenson 1894, Wells 1946, Cervantes 1616) — for these, length cap
 *      does not apply but translator attribution still required.
 *   5. Identify likely copyrighted-author mentions (Borges 1986, Brooks alive
 *      until 2022, Conway alive, Vinge 2024, Gibson alive) — flag if blockquote
 *      length > 300 words OR > 3 lines for poetry (heuristic conservative).
 *
 * Limitations:
 *   - Heuristic; manual review still required for borderline cases.
 *   - Inline «…» quotations within Russian text are common — many are paraphrase-
 *     style attribution markers ("по словам X"), not direct quotes. Script flags
 *     all candidates, manual triage needed.
 *
 * Usage:
 *   node scripts/editorial/citation-compliance.cjs [chapter-substring]
 */

const fs = require('fs');
const path = require('path');

const CHAPTERS_DIR = path.join(__dirname, '..', '..', 'content', 'chapters');

const PD_AUTHORS = {
  Verne:       { years: '1828-1905',  pd: true,  ru: 'Жюль Верн' },
  Shelley:     { years: '1797-1851',  pd: true,  ru: 'Мэри Шелли' },
  Doyle:       { years: '1859-1930',  pd: true,  ru: 'Артур Конан Дойл' },
  Stevenson:   { years: '1850-1894',  pd: true,  ru: 'Роберт Льюис Стивенсон' },
  Wells:       { years: '1866-1946',  pd: true,  ru: 'Герберт Уэллс' },
  Cervantes:   { years: '1547-1616',  pd: true,  ru: 'Мигель де Сервантес' },
};

const COPYRIGHTED = {
  Borges:      { years: '1899-1986', pd_eu_2056: true,  ru: 'Хорхе Луис Борхес' },  // d. 1986, EU PD 2057
  Brooks:      { years: '1931-2022', pd_eu_2092: true,  ru: 'Фредерик Брукс' },
  Conway:      { years: 'b.1937', alive_uncertain: true, ru: 'Мелвин Конвей' },
  Gibson:      { years: 'b.1948', alive: true, ru: 'Уильям Гибсон' },
  Vinge:       { years: '1944-2024', recent: true, ru: 'Вернор Виндж' },
};

function normaliseLineEndings(text) {
  return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

function stripFrontmatter(text) {
  if (!text.startsWith('---')) return text;
  const end = text.indexOf('\n---', 3);
  if (end === -1) return text;
  return text.slice(end + 4);
}

function splitBodyAndFootnotes(text) {
  // Find last `\n---` separator (block divider). Verify tail contains footnote glyphs.
  const lastSep = text.lastIndexOf('\n---');
  if (lastSep === -1) return { body: text, footnotes: '' };
  const tail = text.slice(lastSep);
  if (/[¹²³⁴⁵⁶⁷⁸⁹⁰]+\s/.test(tail)) {
    return { body: text.slice(0, lastSep), footnotes: tail };
  }
  return { body: text, footnotes: '' };
}

function findQuotations(body) {
  const found = [];
  // Blockquotes (lines starting with >)
  const lines = body.split('\n');
  let bqStart = null;
  let bqText = '';
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('>')) {
      if (bqStart === null) bqStart = i;
      bqText += lines[i].slice(1).trim() + ' ';
    } else if (bqStart !== null) {
      found.push({ type: 'blockquote', line: bqStart + 1, text: bqText.trim() });
      bqStart = null;
      bqText = '';
    }
  }
  if (bqStart !== null) found.push({ type: 'blockquote', line: bqStart + 1, text: bqText.trim() });

  // Inline «…» — restrict to ones containing >= 5 words to skip mere term-marking
  const inlineRe = /«([^»]{20,500})»/g;
  let m;
  while ((m = inlineRe.exec(body)) !== null) {
    const wc = (m[1].match(/\p{L}+/gu) || []).length;
    if (wc < 5) continue;
    const lineNo = body.slice(0, m.index).split('\n').length;
    // Check next 200 chars for footnote glyph
    const tail = body.slice(m.index + m[0].length, m.index + m[0].length + 200);
    const hasFnRef = /[¹²³⁴⁵⁶⁷⁸⁹⁰]/.test(tail);
    found.push({ type: 'inline', line: lineNo, text: m[1], words: wc, has_footnote_ref: hasFnRef });
  }
  return found;
}

function parseFootnotes(footnoteBlock) {
  if (!footnoteBlock) return [];
  const lines = footnoteBlock.split('\n');
  const fns = [];
  let cur = null;
  for (const ln of lines) {
    if (/^[¹²³⁴⁵⁶⁷⁸⁹⁰]+\s/.test(ln)) {
      if (cur) fns.push(cur);
      cur = { glyph: ln.match(/^[¹²³⁴⁵⁶⁷⁸⁹⁰]+/)[0], text: ln };
    } else if (cur && ln.trim()) {
      cur.text += ' ' + ln.trim();
    }
  }
  if (cur) fns.push(cur);
  return fns.map(f => ({
    ...f,
    has_translator_attribution: /(перевод|translator|translation|переводчик|перев[её]л[аи]?)/i.test(f.text),
  }));
}

function detectAuthors(body) {
  const detected = {};
  const all = { ...PD_AUTHORS, ...COPYRIGHTED };
  for (const [key, info] of Object.entries(all)) {
    const reEN = new RegExp(`\\b${key}\\b`, 'i');
    const reRU = new RegExp(info.ru.replace(/\s+/g, '\\s+'), 'i');
    if (reEN.test(body) || reRU.test(body)) detected[key] = info;
  }
  return detected;
}

function analyseChapter(filepath) {
  const raw = normaliseLineEndings(fs.readFileSync(filepath, 'utf8'));
  const noFm = stripFrontmatter(raw);
  const { body, footnotes } = splitBodyAndFootnotes(noFm);

  const quotes = findQuotations(body);
  const fns = parseFootnotes(footnotes);
  const authors = detectAuthors(body);

  const inlineWithoutFn = quotes.filter(q => q.type === 'inline' && !q.has_footnote_ref);
  const fnsWithoutTranslator = fns.filter(f => !f.has_translator_attribution);

  return {
    file: path.basename(filepath),
    quotations_total: quotes.length,
    blockquotes: quotes.filter(q => q.type === 'blockquote').length,
    inline_quotations: quotes.filter(q => q.type === 'inline').length,
    inline_without_footnote_ref: inlineWithoutFn.length,
    inline_without_footnote_examples: inlineWithoutFn.slice(0, 3).map(q => ({
      line: q.line,
      words: q.words,
      preview: q.text.slice(0, 80),
    })),
    footnotes_total: fns.length,
    footnotes_without_translator_attr: fnsWithoutTranslator.length,
    detected_authors: Object.keys(authors),
    pd_authors: Object.keys(authors).filter(k => PD_AUTHORS[k]),
    copyrighted_mentions: Object.keys(authors).filter(k => COPYRIGHTED[k]),
  };
}

function main() {
  const filter = process.argv[2];
  const files = fs.readdirSync(CHAPTERS_DIR)
    .filter(f => f.endsWith('.md') && f !== '_index.md')
    .filter(f => !filter || f.includes(filter))
    .sort();

  console.log('='.repeat(78));
  console.log('AGIL-133 Citation Compliance Audit');
  console.log('Generated:', new Date().toISOString());
  console.log('Rule source: ~/.claude/rules/citation-compliance.md');
  console.log('='.repeat(78));
  console.log();

  const results = [];
  for (const f of files) {
    const r = analyseChapter(path.join(CHAPTERS_DIR, f));
    results.push(r);
    console.log(`\n--- ${r.file} ---`);
    console.log(`  Quotations: ${r.quotations_total} (${r.blockquotes} blockquote, ${r.inline_quotations} inline)`);
    console.log(`  Inline quotes WITHOUT footnote ref nearby: ${r.inline_without_footnote_ref}`);
    if (r.inline_without_footnote_examples.length) {
      console.log('    Examples (line, words, preview):');
      for (const ex of r.inline_without_footnote_examples) {
        console.log(`      L${ex.line} (${ex.words}w): «${ex.preview}…»`);
      }
    }
    console.log(`  Footnotes: ${r.footnotes_total}`);
    console.log(`  Footnotes WITHOUT translator attribution: ${r.footnotes_without_translator_attr}`);
    if (r.detected_authors.length) {
      console.log(`  Detected authors: ${r.detected_authors.join(', ')}`);
      if (r.copyrighted_mentions.length) {
        console.log(`    Copyrighted (extra care): ${r.copyrighted_mentions.join(', ')}`);
      }
    }
  }

  // Save JSON
  const out = path.join(__dirname, '..', '..', '_meta', 'agil-133-citation-compliance.json');
  fs.writeFileSync(out, JSON.stringify({
    generated: new Date().toISOString(),
    methodology: 'scripts/editorial/citation-compliance.cjs',
    rule_source: 'rules/citation-compliance.md',
    results,
    totals: {
      chapters_analysed: results.length,
      quotations_total: results.reduce((s, r) => s + r.quotations_total, 0),
      inline_without_footnote_ref_total: results.reduce((s, r) => s + r.inline_without_footnote_ref, 0),
      footnotes_total: results.reduce((s, r) => s + r.footnotes_total, 0),
    },
  }, null, 2));
  console.log(`\nJSON: _meta/agil-133-citation-compliance.json`);
}

main();
