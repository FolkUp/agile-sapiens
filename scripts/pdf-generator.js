#!/usr/bin/env node

/**
 * AGILE SAPIENS PDF Generator
 * Enhanced Alice v2.0 L3 — Constitutional Framework
 *
 * Banking-Level Standards: full-book PDF generation.
 *
 * Reads every content unit from content/chapters/*.md, converts markdown to
 * HTML with pandoc (matching the proven ePub pipeline), assembles a single
 * print-ready document with a generated table of contents, and renders it to
 * PDF with Puppeteer.
 *
 * Reading order is derived from each file's frontmatter `weight` so the book
 * is assembled exactly as the Hugo site presents it. Draft duplicates and
 * backup files are excluded explicitly.
 */

import puppeteer from 'puppeteer';
import { execFileSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.dirname(__dirname);
const FORMATS_DIR = path.join(PROJECT_ROOT, 'formats');
const CHAPTERS_DIR = path.join(PROJECT_ROOT, 'content', 'chapters');
const BOOK_VERSION = 'v1.0.7';
const OUTPUT_PDF = path.join(FORMATS_DIR, `agile-sapiens-${BOOK_VERSION}.pdf`);

/*
 * Files in content/chapters/ that must NOT be included:
 *  - chapter-6-holmes-watson.md  → status: draft; chapter-6-jekyll-hyde is the
 *    canonical, verified Chapter 6 (both carry weight 70).
 * Backup / .claude directories are skipped because we only read the top level.
 */
const EXCLUDE_FILES = new Set(['chapter-6-holmes-watson.md']);

console.log('AGILE SAPIENS PDF Generator');
console.log('===========================');
console.log('Enhanced Alice v2.0 L3 — full-book Node.js + pandoc + Puppeteer pipeline');
console.log('');

/** Extract a single scalar field from YAML frontmatter. */
function frontmatterField(frontmatter, field) {
    const re = new RegExp(`^${field}:\\s*"?([^"\\n]+)"?\\s*$`, 'm');
    const m = frontmatter.match(re);
    return m ? m[1].trim() : null;
}

/** Split a markdown file into { frontmatter, body }. */
function splitFrontmatter(raw) {
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (m) return { frontmatter: m[1], body: m[2] };
    return { frontmatter: '', body: raw };
}

/** Convert markdown body to an HTML fragment via pandoc. */
function markdownToHtml(markdown) {
    return execFileSync(
        'pandoc',
        ['--from', 'markdown', '--to', 'html', '--wrap=preserve'],
        { input: markdown, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
    );
}

/** Collect, parse and order every content unit. */
async function collectUnits() {
    const files = await fs.readdir(CHAPTERS_DIR);
    const candidates = files.filter(
        (f) =>
            (f.startsWith('chapter-') || f.startsWith('intermezzo-')) &&
            f.endsWith('.md') &&
            !EXCLUDE_FILES.has(f)
    );

    const units = [];
    for (const filename of candidates) {
        const raw = await fs.readFile(path.join(CHAPTERS_DIR, filename), 'utf8');
        const { frontmatter, body } = splitFrontmatter(raw);

        const title =
            frontmatterField(frontmatter, 'title') ||
            (body.match(/^#\s+(.+)$/m)?.[1]) ||
            filename;

        const weightRaw = frontmatterField(frontmatter, 'weight');
        const weight = weightRaw ? parseInt(weightRaw, 10) : 9999;

        units.push({ filename, title, weight, body });
    }

    units.sort((a, b) => a.weight - b.weight || a.filename.localeCompare(b.filename));
    return units;
}

/** Print-ready CSS — academic typography suitable for submission. */
const CSS = `
:root { --ink: #1a1a1a; --muted: #555; --accent: #2c3e50; }

body {
    font-family: 'Times New Roman', 'Liberation Serif', serif;
    font-size: 11.5pt;
    line-height: 1.55;
    color: var(--ink);
    margin: 0;
    padding: 0;
    hyphens: auto;
}

/* ---- Title page ---- */
.title-page {
    text-align: center;
    page-break-after: always;
    padding-top: 7cm;
}
.title-page .title {
    font-size: 34pt;
    font-weight: bold;
    letter-spacing: 0.04em;
    margin-bottom: 0.6em;
}
.title-page .subtitle {
    font-size: 15pt;
    font-style: italic;
    color: var(--muted);
    margin-bottom: 0.3em;
}
.title-page .author {
    font-size: 16pt;
    margin-top: 3.5em;
}
.title-page .version {
    font-size: 12pt;
    color: var(--muted);
    margin-top: 0.8em;
}

/* ---- Table of contents ---- */
.toc {
    page-break-after: always;
}
.toc h1 {
    text-align: center;
    border: none;
    font-size: 22pt;
    margin-bottom: 1.4em;
}
.toc ol {
    list-style: none;
    padding-left: 0;
    counter-reset: toc;
}
.toc li {
    margin-bottom: 0.55em;
    font-size: 12pt;
}

/* ---- Chapters ---- */
.unit {
    page-break-before: always;
}
.unit h1 {
    font-size: 20pt;
    color: var(--accent);
    border-bottom: 2px solid var(--accent);
    padding-bottom: 0.35em;
    margin-top: 0;
    margin-bottom: 1.1em;
}
h2 { font-size: 14.5pt; color: var(--accent); margin-top: 1.6em; margin-bottom: 0.6em; }
h3 { font-size: 12.5pt; color: #34495e; margin-top: 1.2em; margin-bottom: 0.5em; }
h4 { font-size: 11.5pt; font-style: italic; margin-top: 1em; margin-bottom: 0.4em; }

p {
    text-align: justify;
    margin: 0 0 0.7em 0;
    text-indent: 1.4em;
}
/* first paragraph after a heading is not indented */
h1 + p, h2 + p, h3 + p, h4 + p, blockquote + p { text-indent: 0; }

blockquote {
    margin: 1em 1.4em;
    padding: 0.4em 1em;
    border-left: 3px solid #bbb;
    font-style: italic;
    color: #333;
}
blockquote p { text-indent: 0; }

ul, ol { margin: 0.6em 0; padding-left: 1.9em; }
li { margin-bottom: 0.3em; text-align: justify; }

code {
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
    background: #f2f2f2;
    padding: 0.1em 0.3em;
    border-radius: 2px;
}
pre {
    background: #f6f6f6;
    border: 1px solid #ddd;
    padding: 0.8em;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    font-size: 0.85em;
}
pre code { background: none; padding: 0; }

table {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;
    font-size: 0.9em;
}
th, td { border: 1px solid #ccc; padding: 0.4em 0.6em; text-align: left; }
th { background: #f0f0f0; }

img { max-width: 100%; height: auto; }
hr { border: none; border-top: 1px solid #ccc; margin: 1.4em 0; }

a { color: var(--ink); text-decoration: none; }
`;

/** Build the full HTML document. */
function buildHtml(units) {
    const tocItems = units
        .map((u, i) => `<li>${i + 1}. ${escapeHtml(u.title)}</li>`)
        .join('\n');

    const body = units
        .map((u) => {
            const inner = markdownToHtml(u.body);
            // The frontmatter title is the authoritative heading. Strip a
            // leading H1 from the body to avoid a duplicated chapter title.
            const withoutLeadH1 = inner.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>/i, '');
            return `<section class="unit">\n<h1>${escapeHtml(u.title)}</h1>\n${withoutLeadH1}\n</section>`;
        })
        .join('\n');

    return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>AGILE SAPIENS ${BOOK_VERSION}</title>
<style>${CSS}</style>
</head>
<body>
<div class="title-page">
    <div class="title">AGILE SAPIENS</div>
    <div class="subtitle">The Future of Work in the Age of Artificial Intelligence</div>
    <div class="subtitle">Будущее работы в эпоху искусственного интеллекта</div>
    <div class="author">FolkUp</div>
    <div class="version">Версия ${BOOK_VERSION}</div>
</div>

<nav class="toc">
    <h1>Содержание</h1>
    <ol>
${tocItems}
    </ol>
</nav>

${body}
</body>
</html>`;
}

function escapeHtml(s) {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

async function generatePDF() {
    await fs.mkdir(FORMATS_DIR, { recursive: true });

    const units = await collectUnits();
    console.log(`Found ${units.length} content units (reading order by frontmatter weight):`);
    units.forEach((u, i) =>
        console.log(`  ${String(i + 1).padStart(2)}. [w${u.weight}] ${u.filename} — ${u.title}`)
    );
    console.log('');

    if (units.length < 14) {
        console.warn(
            `WARNING: expected 14 units (11 chapters + 3 intermezzos), found ${units.length}.`
        );
    }

    console.log('Converting markdown -> HTML via pandoc and assembling document...');
    const html = buildHtml(units);
    const htmlPath = path.join(FORMATS_DIR, 'agile-sapiens-pdf.html');
    await fs.writeFile(htmlPath, html, 'utf8');
    console.log(`Assembled HTML: ${Math.round(html.length / 1024)} KB`);

    console.log('Launching Puppeteer...');
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        timeout: 60000,
    });

    try {
        const page = await browser.newPage();
        const htmlUrl = 'file://' + htmlPath.replace(/\\/g, '/');
        await page.goto(htmlUrl, { waitUntil: 'networkidle0', timeout: 60000 });

        console.log('Rendering PDF...');
        await page.pdf({
            path: OUTPUT_PDF,
            format: 'A4',
            margin: { top: '2cm', bottom: '2cm', left: '2.2cm', right: '2.2cm' },
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate:
                '<div style="font-size:8pt;color:#888;width:100%;text-align:center;">AGILE SAPIENS</div>',
            footerTemplate:
                '<div style="font-size:8pt;color:#888;width:100%;text-align:center;">' +
                '<span class="pageNumber"></span> / <span class="totalPages"></span></div>',
        });
    } finally {
        await browser.close();
    }

    await fs.unlink(htmlPath).catch(() => {});

    const stats = await fs.stat(OUTPUT_PDF);
    console.log('');
    console.log('PDF generated successfully');
    console.log(`  Location: ${OUTPUT_PDF}`);
    console.log(`  Size: ${Math.round(stats.size / 1024)} KB`);
    return true;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
    generatePDF()
        .then((ok) => process.exit(ok ? 0 : 1))
        .catch((err) => {
            console.error('PDF generation failed:', err);
            process.exit(1);
        });
}

export default generatePDF;
