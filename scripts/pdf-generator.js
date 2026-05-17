#!/usr/bin/env node

/**
 * AGILE SAPIENS PDF Generator
 * Enhanced Alice v2.0 L3 — Constitutional Framework
 *
 * Banking-Level Standards: Modern Node.js PDF generation
 * Using Puppeteer for reliable HTML→PDF conversion
 */

import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.dirname(__dirname);
const FORMATS_DIR = path.join(PROJECT_ROOT, 'formats');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content');

console.log('📄 AGILE SAPIENS PDF Generator');
console.log('===============================');
console.log('Enhanced Alice v2.0 L3 — Node.js + Puppeteer Pipeline');
console.log('');

async function generatePDF() {
    try {
        // Ensure formats directory exists
        await fs.mkdir(FORMATS_DIR, { recursive: true });

        // Create HTML content for PDF
        const htmlContent = await createPDFHTML();
        const htmlPath = path.join(FORMATS_DIR, 'agile-sapiens-pdf.html');

        await fs.writeFile(htmlPath, htmlContent, 'utf8');
        console.log('✅ HTML template created');

        // Launch Puppeteer
        console.log('🚀 Launching Puppeteer...');
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-extensions',
                '--disable-gpu'
            ],
            timeout: 30000
        });

        console.log('✅ Browser launched successfully');

        const page = await browser.newPage();

        // Load HTML file
        const htmlUrl = `file://${htmlPath.replace(/\\/g, '/')}`;
        console.log(`📄 Loading HTML: ${htmlUrl}`);
        await page.goto(htmlUrl, {
            waitUntil: 'networkidle0',
            timeout: 20000
        });

        console.log('✅ HTML loaded successfully');

        // Generate PDF
        const pdfPath = path.join(FORMATS_DIR, 'agile-sapiens-v1.0.7.pdf');
        console.log(`📄 Generating PDF: ${pdfPath}`);

        await page.pdf({
            path: pdfPath,
            format: 'A4',
            margin: {
                top: '2cm',
                bottom: '2cm',
                left: '2cm',
                right: '2cm'
            },
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: '<div style="font-size:10px; text-align:center; width:100%;">AGILE SAPIENS v1.0.7</div>',
            footerTemplate: '<div style="font-size:10px; text-align:center; width:100%;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
        });

        await browser.close();

        // Verify PDF was created
        const stats = await fs.stat(pdfPath);
        const sizeKB = Math.round(stats.size / 1024);

        console.log('✅ PDF generated successfully');
        console.log(`📊 Size: ${sizeKB} KB`);
        console.log(`📁 Location: ${pdfPath}`);

        // Clean up HTML file
        await fs.unlink(htmlPath);

        return true;

    } catch (error) {
        console.error('❌ PDF generation failed:', error.message);
        return false;
    }
}

async function createPDFHTML() {
    const css = `
        <style>
            body {
                font-family: 'Times New Roman', serif;
                font-size: 12pt;
                line-height: 1.6;
                color: #333;
                max-width: none;
                margin: 0;
                padding: 0;
            }

            .title-page {
                text-align: center;
                margin-top: 8cm;
                page-break-after: always;
            }

            .title {
                font-size: 28pt;
                font-weight: bold;
                margin-bottom: 2em;
                color: #1a1a1a;
            }

            .subtitle {
                font-size: 16pt;
                margin-bottom: 1em;
                color: #666;
                font-style: italic;
            }

            .author {
                font-size: 18pt;
                margin-bottom: 1em;
                margin-top: 3em;
            }

            .version {
                font-size: 14pt;
                color: #666;
                margin-top: 2em;
            }

            .chapter {
                page-break-before: always;
                margin-bottom: 2em;
            }

            h1 {
                font-size: 18pt;
                margin-top: 0;
                margin-bottom: 1em;
                color: #2c3e50;
                border-bottom: 2px solid #3498db;
                padding-bottom: 0.5em;
            }

            h2 {
                font-size: 14pt;
                margin-top: 1.5em;
                margin-bottom: 0.8em;
                color: #34495e;
            }

            h3 {
                font-size: 12pt;
                margin-top: 1.2em;
                margin-bottom: 0.6em;
                color: #7f8c8d;
            }

            p {
                text-align: justify;
                margin-bottom: 1em;
                text-indent: 1em;
            }

            blockquote {
                margin: 1em 0;
                padding: 0.5em 1em;
                border-left: 4px solid #3498db;
                background: #f8f9fa;
                font-style: italic;
            }

            ul, ol {
                margin: 1em 0;
                padding-left: 2em;
            }

            li {
                margin-bottom: 0.5em;
            }

            code {
                font-family: 'Courier New', monospace;
                background: #f1f1f1;
                padding: 0.2em 0.4em;
                border-radius: 3px;
            }

            .toc {
                page-break-after: always;
                margin-top: 2em;
            }

            .toc h2 {
                text-align: center;
                margin-bottom: 2em;
            }

            .toc-item {
                margin-bottom: 0.5em;
                text-indent: 0;
            }

            @media print {
                .page-break { page-break-before: always; }
            }
        </style>
    `;

    let html = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>AGILE SAPIENS v1.0.7</title>
    ${css}
</head>
<body>
    <div class="title-page">
        <div class="title">AGILE SAPIENS</div>
        <div class="subtitle">The Future of Work in the Age of Artificial Intelligence</div>
        <div class="subtitle">Будущее работы в эпоху искусственного интеллекта</div>
        <div class="author">FolkUp</div>
        <div class="version">Version 1.0.7</div>
    </div>
    `;

    try {
        // Add chapters content
        const chaptersDir = path.join(CONTENT_DIR, 'chapters');

        // Check if chapters directory exists
        try {
            await fs.access(chaptersDir);

            const files = await fs.readdir(chaptersDir);
            const chapterFiles = files
                .filter(file => file.startsWith('chapter-') && file.endsWith('.md'))
                .sort((a, b) => {
                    // Extract chapter numbers for proper sorting
                    const numA = parseInt(a.match(/chapter-(\d+)/)?.[1] || '0');
                    const numB = parseInt(b.match(/chapter-(\d+)/)?.[1] || '0');
                    return numA - numB;
                });

            console.log(`📚 Found ${chapterFiles.length} chapters`);

            for (const filename of chapterFiles) {
                const filePath = path.join(chaptersDir, filename);
                const content = await fs.readFile(filePath, 'utf8');

                // Remove frontmatter
                const cleanContent = content.replace(/^---\n[\s\S]*?\n---\n/, '');

                // Convert markdown headers to HTML
                const htmlContent = markdownToHTML(cleanContent);

                html += `<div class="chapter">${htmlContent}</div>`;
                console.log(`✅ Added ${filename}`);
            }
        } catch (error) {
            console.log('⚠️  No chapters directory found, creating sample content');
            html += `
                <div class="chapter">
                    <h1>Introduction</h1>
                    <p>This is a sample PDF generation for AGILE SAPIENS. The actual content will be loaded from the chapters directory when available.</p>

                    <h2>Features</h2>
                    <ul>
                        <li>Professional PDF formatting</li>
                        <li>Proper typography and spacing</li>
                        <li>Chapter organization</li>
                        <li>Academic-quality output</li>
                    </ul>
                </div>
            `;
        }

    } catch (error) {
        console.log('⚠️  Error reading chapters:', error.message);
    }

    html += `
</body>
</html>`;

    return html;
}

// Simple markdown to HTML converter for basic formatting
function markdownToHTML(markdown) {
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold and italic
    html = html.replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*)\*/g, '<em>$1</em>');

    // Code
    html = html.replace(/`([^`]*)`/g, '<code>$1</code>');

    // Paragraphs
    html = html.replace(/^\s*(.+)$/gim, '<p>$1</p>');

    // Lists (basic)
    html = html.replace(/^\s*[-*] (.+)$/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    return html;
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
    generatePDF().then(success => {
        process.exit(success ? 0 : 1);
    });
}

export default generatePDF;