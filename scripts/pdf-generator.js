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
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.dirname(__dirname);
const FORMATS_DIR = path.join(PROJECT_ROOT, 'formats');
// T4 multi-lang parametrization (Iskra S263 ZADANIE Этап 2 pipeline prep):
// BOOK_LANG env var — default "ru" (backward compat, no path change).
// For non-ru: expects content/${BOOK_LANG}/{chapters,apparatus}/ + preface/afterword.
const BOOK_LANG = process.env.BOOK_LANG || 'ru';
const LANG_SUFFIX = BOOK_LANG === 'ru' ? '' : `-${BOOK_LANG}`;
const CONTENT_DIR = BOOK_LANG === 'ru'
    ? path.join(PROJECT_ROOT, 'content')
    : path.join(PROJECT_ROOT, 'content', BOOK_LANG);
const CHAPTERS_DIR = path.join(CONTENT_DIR, 'chapters');
const APPARATUS_DIR = path.join(CONTENT_DIR, 'apparatus');
const COVER_PATH = path.join(PROJECT_ROOT, 'static', 'images', 'cover.webp');
// Single source of truth for version: package.json (closes drift from cont S24
// — EPUB script был fixed к dynamic, PDF script остался hardcoded. Этот patch
// синхронизирует к тому же pattern.)
const PKG = JSON.parse(readFileSync(path.join(PROJECT_ROOT, 'package.json'), 'utf-8'));
// Wave C EN parametrization (Iskra TIKET S308-03 §2 п.3): per-locale version override —
// EN edition = independent v1.0.0-en release cycle (не наследует v1.0.24 RU cycle).
const BOOK_VERSION = BOOK_LANG === 'en' ? 'v1.0.0-en' : `v${PKG.version}${LANG_SUFFIX}`;
const OUTPUT_PDF = path.join(FORMATS_DIR, `agile-sapiens-${BOOK_VERSION}.pdf`);

if (BOOK_LANG !== 'ru') {
    console.log(`🌍 Multi-lang mode: BOOK_LANG=${BOOK_LANG}, CONTENT_DIR=${CONTENT_DIR}`);
    // Existence check — fail early if content/${BOOK_LANG}/chapters/ missing
    try {
        readFileSync(path.join(CHAPTERS_DIR, '.'));
    } catch (e) {
        // Directory access via readFileSync throws EISDIR on dir, ENOENT on missing
        if (e && e.code === 'ENOENT') {
            console.error(`❌ ERROR: BOOK_LANG=${BOOK_LANG} but ${CHAPTERS_DIR} does not exist.`);
            console.error(`   Expected structure: content/${BOOK_LANG}/chapters/*.md + content/${BOOK_LANG}/apparatus/*.md`);
            console.error(`   Populate directory with target-language content, then rerun.`);
            process.exit(1);
        }
        // EISDIR = OK (dir exists)
    }
}

// AGIL-178: apparatus reading order — overrides frontmatter weights to
// produce a sensible back-matter sequence regardless of how individual
// files are weighted on the Hugo site.
// Wave C EN parametrization (Iskra TIKET S308-03 §2 п.2): per-locale APPARATUS_ORDER.
// RU: 7 files с slovar-terminov + predmetnyy-ukazatel
// EN: 6 files с subject-index (заменяет предметный указатель, glossary отсутствует)
const APPARATUS_ORDER_PER_LOCALE = {
    ru: [
        'acknowledgments',
        'methodology',
        'sources',
        'slovar-terminov',
        'predmetnyy-ukazatel',
        'transparency',
        'colophon',
    ],
    en: [
        'acknowledgments',
        'methodology',
        'sources',
        'subject-index',
        'transparency',
        'colophon',
    ],
};
const APPARATUS_ORDER = APPARATUS_ORDER_PER_LOCALE[BOOK_LANG] || APPARATUS_ORDER_PER_LOCALE.ru;

// Wave C EN parametrization: UI strings + metadata per locale (mirrors epub-generator.sh case block).
const UI_STRINGS_PER_LOCALE = {
    ru: {
        subtitle: 'Литературный анализ бизнеса: как литература предсказала современный менеджмент',
        author: 'Команданте FolkUp',
        coauthor_line: 'Соавтор: Алиса (PM экосистемы FolkUp) · Редактор: Искра',
        version_label: 'Версия',
        toc_heading: 'Содержание',
        cover_alt: 'AGILE SAPIENS — Литературный анализ бизнеса',
        engraving: 'Гравюра:',
    },
    en: {
        subtitle: 'A Literary Analysis of Business: how literature foretold modern management',
        author: 'Comandante FolkUp',
        coauthor_line: 'Co-author: Alisa (PM of the FolkUp ecosystem) · Editor: Iskra',
        version_label: 'Version',
        toc_heading: 'Contents',
        cover_alt: 'AGILE SAPIENS — A Literary Analysis of Business',
        engraving: 'Engraving:',
    },
};
const UI = UI_STRINGS_PER_LOCALE[BOOK_LANG] || UI_STRINGS_PER_LOCALE.ru;

/*
 * Files in content/chapters/ that must NOT be included:
 *  (As of AGIL-190 Batch 1 2026-05-24: chapter-6-mina-harker is part 1 (weight 70)
 *  paired with chapter-6-jekyll-hyde as part 2 (weight 71). Holmes-Watson chapter
 *  was replaced — see Batch 1 reflection. No chapter currently needs exclusion.)
 * Backup / .claude directories are skipped because we only read the top level.
 */
const EXCLUDE_FILES = new Set();

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

/** Read one markdown file and produce a unit record. */
async function loadUnit(filepath, weightOverride) {
    const raw = await fs.readFile(filepath, 'utf8');
    const { frontmatter, body } = splitFrontmatter(raw);
    const filename = path.basename(filepath);
    const title =
        frontmatterField(frontmatter, 'title') ||
        (body.match(/^#\s+(.+)$/m)?.[1]) ||
        filename;
    const weightRaw = frontmatterField(frontmatter, 'weight');
    const fmWeight = weightRaw ? parseInt(weightRaw, 10) : 9999;
    const weight = weightOverride !== undefined ? weightOverride : fmWeight;
    // v1.0.24 Д-4-final fix (Iskra GLAZA-VERDIKTY «PDF нет иллюстраций»):
    // derive plate filename mirroring EPUB generator logic (AGIL-176 + AGIL-182).
    // Priority: explicit plate_override > intermezzo-N > act_opener chapter > regular chapter-N.
    const plate = derivePlate(filename, frontmatter);
    return { filename, title, weight, body, plate };
}

/** Derive plate filename for a unit — mirrors EPUB generator derive_plate() bash helper. */
function derivePlate(filename, frontmatter) {
    const basename = filename.replace(/\.md$/, '');
    const override = frontmatterField(frontmatter, 'plate_override');
    if (override) return override;
    const intermezzo = basename.match(/^intermezzo-(\d+)/);
    if (intermezzo) return `agil-intermezzo-${intermezzo[1]}-plate.webp`;
    const chapter = basename.match(/^chapter-(\d+)/);
    if (chapter) {
        const chnum = chapter[1];
        const actOpener = frontmatterField(frontmatter, 'act_opener');
        if (actOpener === 'true') {
            const actPlate = frontmatterField(frontmatter, 'act_plate');
            if (actPlate) return actPlate;
        }
        return `agil-chapter-${chnum}-plate.webp`;
    }
    return null;
}

/** Collect, parse and order every content unit (AGIL-178: includes apparatus). */
async function collectUnits() {
    const units = [];

    // Chapters + intermezzi from content/chapters/ — by frontmatter weight
    const chapterFiles = (await fs.readdir(CHAPTERS_DIR)).filter(
        (f) =>
            (f.startsWith('chapter-') || f.startsWith('intermezzo-')) &&
            f.endsWith('.md') &&
            !EXCLUDE_FILES.has(f)
    );
    for (const filename of chapterFiles) {
        units.push(await loadUnit(path.join(CHAPTERS_DIR, filename)));
    }

    // Preface (front matter) — uses its own frontmatter weight (~5)
    try {
        units.push(await loadUnit(path.join(CONTENT_DIR, 'preface.md')));
    } catch (e) {
        console.warn('preface.md not found — PDF will ship without preface');
    }

    // Afterword (back matter) — frontmatter weight ~1000, falls after chapters
    try {
        units.push(await loadUnit(path.join(CONTENT_DIR, 'afterword.md')));
    } catch (e) {
        console.warn('afterword.md not found — PDF will ship without afterword');
    }

    // Apparatus — overrides per-file weights with explicit reading order.
    // Weights 9010..9090 ensure apparatus follows afterword (1000) but
    // respects the APPARATUS_ORDER array sequence.
    for (let i = 0; i < APPARATUS_ORDER.length; i++) {
        const slug = APPARATUS_ORDER[i];
        const filepath = path.join(APPARATUS_DIR, `${slug}.md`);
        try {
            units.push(await loadUnit(filepath, 9000 + (i + 1) * 10));
        } catch (e) {
            console.warn(`apparatus/${slug}.md not found — skipping`);
        }
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

/* ---- Cover page (AGIL-179) ---- */
.cover-page {
    text-align: center;
    page-break-after: always;
    margin: 0;
    padding: 0;
}
.cover-page img {
    display: block;
    width: 100%;
    max-height: 100vh;
    margin: 0 auto;
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

/* v1.0.24 Д-4-final: chapter plate figure constraints — prevent oversized rendering.
   Puppeteer default DPR blows up webp images without max-height cap.
   Mirrors EPUB CSS constraint (main.css .chapter-plate rule). */
.chapter-plate {
    margin: 1.5em auto;
    text-align: center;
    page-break-inside: avoid;
    page-break-after: avoid;
}
.chapter-plate img {
    display: block;
    margin: 0 auto;
    max-width: 75%;
    max-height: 55vh;
    height: auto;
}
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
            // v1.0.24 Д-4-final fix: insert plate figure after title (mirrors EPUB generator).
            // Plates converted webp→jpg pre-build (Chrome PDF export не сохраняет webp compression,
            // JPG native PDF format preserves compression — 100 MB → ~15 MB reduction).
            let plateHtml = '';
            if (u.plate) {
                const jpgFilename = u.plate.replace(/\.webp$/, '.jpg');
                const jpgPath = path.join(FORMATS_DIR, 'pdf-plates-jpg', jpgFilename);
                const jpgUrl = pathToFileURL(jpgPath).href;
                plateHtml = `<figure class="chapter-plate"><img src="${jpgUrl}" alt="${UI.engraving} ${escapeHtml(u.title)}"/></figure>\n`;
            }
            return `<section class="unit">\n<h1>${escapeHtml(u.title)}</h1>\n${plateHtml}${withoutLeadH1}\n</section>`;
        })
        .join('\n');

    const coverUrl = pathToFileURL(COVER_PATH).href;
    // Iskra VIER-AUGEN-S305-03 §3 fix: parametrize html lang for EN edition.
    // WeasyPrint reads <html lang="X"> to set PDF catalog /Lang metadata.
    return `<!DOCTYPE html>
<html lang="${BOOK_LANG}">
<head>
<meta charset="UTF-8">
<title>AGILE SAPIENS ${BOOK_VERSION}</title>
<style>${CSS}</style>
</head>
<body>
<section class="cover-page">
    <img src="${coverUrl}" alt="${UI.cover_alt}"/>
</section>
<div class="title-page">
    <div class="title">AGILE SAPIENS</div>
    <div class="subtitle">${UI.subtitle}</div>
    <div class="author">${UI.author}</div>
    <div class="coauthor">${UI.coauthor_line}</div>
    <div class="version">${UI.version_label} ${BOOK_VERSION}</div>
</div>

<nav class="toc">
    <h1>${UI.toc_heading}</h1>
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

/** v1.0.24 Д-4-final: convert webp plates to jpg for PDF embedding.
 * Chrome PDF export re-encodes webp as uncompressed PNG in PDF stream (100 MB bloat).
 * Pre-converting к JPG (native PDF format, ~85% quality) preserves compression.
 */
async function prepareJpgPlates(units) {
    const jpgDir = path.join(FORMATS_DIR, 'pdf-plates-jpg');
    await fs.mkdir(jpgDir, { recursive: true });
    const chaptersDir = path.join(PROJECT_ROOT, 'static', 'images', 'chapters');
    for (const u of units) {
        if (!u.plate) continue;
        const webpPath = path.join(chaptersDir, u.plate);
        const jpgFilename = u.plate.replace(/\.webp$/, '.jpg');
        const jpgPath = path.join(jpgDir, jpgFilename);
        try {
            execFileSync('magick', [webpPath, '-quality', '85', jpgPath], { stdio: 'pipe' });
        } catch (e) {
            console.warn(`⚠️  plate conversion failed для ${u.plate}: ${e.message}`);
        }
    }
    const converted = (await fs.readdir(jpgDir)).filter(f => f.endsWith('.jpg'));
    console.log(`🎨 Plates converted webp→jpg: ${converted.length}`);
    return jpgDir;
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

    // v1.0.24 Д-4-final: prepare jpg plate versions (webp→jpg for PDF size reduction)
    const jpgDir = await prepareJpgPlates(units);

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
        // v1.0.24 fix: constrain viewport DPR to 1 — prevent Chrome PDF export
        // re-encoding embedded webp plates at 2x resolution (100MB bloat root cause).
        await page.setViewport({
            width: 794,   // A4 width at 96 DPI
            height: 1123, // A4 height at 96 DPI
            deviceScaleFactor: 1,
        });
        const htmlUrl = 'file://' + htmlPath.replace(/\\/g, '/');
        await page.goto(htmlUrl, { waitUntil: 'networkidle0', timeout: 60000 });

        console.log('Rendering PDF...');
        await page.pdf({
            path: OUTPUT_PDF,
            format: 'A4',
            margin: { top: '2cm', bottom: '2cm', left: '2.2cm', right: '2.2cm' },
            printBackground: true,
            // v1.0.24 Д-4-Chrome-headers fix (Iskra GLAZA-VERDIKTY):
            // отключить Chrome print headers/footers («AGILE SAPIENS» + «N/216»)
            // — они мешают титульной странице и не нужны для чистого PDF.
            displayHeaderFooter: false,
        });
    } finally {
        await browser.close();
    }

    await fs.unlink(htmlPath).catch(() => {});
    // v1.0.24 Д-4-final: cleanup pdf-plates-jpg temp directory
    await fs.rm(jpgDir, { recursive: true, force: true }).catch(() => {});

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
