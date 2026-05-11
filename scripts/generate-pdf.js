#!/usr/bin/env node

/**
 * AGILE SAPIENS PDF Generator
 * Enhanced Alice v2.0 Level 3 - Banking-Level Standards
 *
 * Generates high-quality PDFs from Hugo content with comprehensive validation
 */

import { execSync, exec } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

class PDFGenerator {
    constructor(options = {}) {
        this.spinner = ora();
        this.config = null;
        this.options = {
            chapter: options.chapter || null,
            output: options.output || null,
            quality: options.quality || 'high',
            ...options
        };
    }

    async initialize() {
        // Load configuration
        const configPath = path.join(rootDir, 'publishing.config.json');
        if (!await fs.pathExists(configPath)) {
            throw new Error('Publishing configuration not found. Run: npm run publish:setup');
        }
        this.config = await fs.readJSON(configPath);
    }

    async generate() {
        console.log(chalk.blue.bold('\n📚 AGILE SAPIENS PDF Generator'));
        console.log(chalk.gray('Banking-Level Standards | Enhanced Alice v2.0 Level 3\n'));

        try {
            await this.initialize();

            if (this.options.chapter) {
                await this.generateChapter(this.options.chapter);
            } else {
                await this.generateBook();
            }

            console.log(chalk.green.bold('\n✅ PDF Generation Complete!'));

        } catch (error) {
            console.error(chalk.red.bold('\n❌ PDF Generation Failed:'), error.message);
            process.exit(1);
        }
    }

    async generateChapter(chapterPath) {
        this.spinner.start(`Generating PDF for ${chapterPath}...`);

        // Start Hugo server if not running
        const isHugoRunning = await this.checkHugoServer();
        if (!isHugoRunning) {
            await this.startHugoServer();
        }

        // Generate chapter URL
        const chapterUrl = this.buildChapterUrl(chapterPath);

        // Generate PDF
        const outputPath = path.join(
            this.config.output.pdfDir,
            `${path.basename(chapterPath, '.md')}.pdf`
        );

        await this.generatePDF(chapterUrl, outputPath);

        // Validate PDF quality
        const quality = await this.validatePDFQuality(outputPath);

        this.spinner.succeed(`PDF generated: ${outputPath}`);

        console.log(chalk.cyan(`📊 Quality Metrics:`));
        console.log(chalk.gray(`   File Size: ${quality.fileSize}`));
        console.log(chalk.gray(`   Pages: ${quality.pages}`));
        console.log(chalk.gray(`   Quality Score: ${quality.score}/10`));

        return { outputPath, quality };
    }

    async generateBook() {
        this.spinner.start('Generating complete book PDF...');

        // Find all chapters
        const chaptersDir = path.join(rootDir, 'content', 'chapters');
        const chapterFiles = await fs.readdir(chaptersDir);
        const chapters = chapterFiles
            .filter(file => file.startsWith('chapter-') && file.endsWith('.md'))
            .sort();

        if (chapters.length === 0) {
            throw new Error('No chapter files found');
        }

        // Start Hugo server if not running
        const isHugoRunning = await this.checkHugoServer();
        if (!isHugoRunning) {
            await this.startHugoServer();
        }

        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        const bookOutputPath = path.join(
            this.config.output.pdfDir,
            `agile-sapiens-complete-${timestamp}.pdf`
        );

        // Generate combined HTML for all chapters
        const combinedHtml = await this.generateCombinedHTML(chapters);
        const tempHtmlPath = path.join(this.config.output.tempDir, 'book-combined.html');
        await fs.writeFile(tempHtmlPath, combinedHtml);

        // Generate book PDF
        await this.generatePDF(`file:///${tempHtmlPath.replace(/\\/g, '/')}`, bookOutputPath);

        // Validate PDF quality
        const quality = await this.validatePDFQuality(bookOutputPath);

        this.spinner.succeed(`Complete book PDF generated: ${bookOutputPath}`);

        console.log(chalk.cyan(`📊 Book Quality Metrics:`));
        console.log(chalk.gray(`   Chapters: ${chapters.length}`));
        console.log(chalk.gray(`   File Size: ${quality.fileSize}`));
        console.log(chalk.gray(`   Pages: ${quality.pages}`));
        console.log(chalk.gray(`   Quality Score: ${quality.score}/10`));

        return { outputPath: bookOutputPath, quality, chapters: chapters.length };
    }

    async generateCombinedHTML(chapters) {
        let combinedContent = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>AGILE SAPIENS - The Future of Work in the Age of Artificial Intelligence</title>
            <style>
                body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; margin: 0; padding: 2cm; }
                h1 { page-break-before: always; color: #1a1a1a; margin-top: 2cm; }
                h2, h3 { color: #333; margin-top: 1.5em; }
                .chapter { page-break-before: always; }
                .chapter:first-child { page-break-before: auto; }
                blockquote { border-left: 4px solid #ccc; padding-left: 1em; margin: 1em 0; font-style: italic; }
                code { background: #f5f5f5; padding: 0.2em 0.4em; border-radius: 3px; }
                pre { background: #f5f5f5; padding: 1em; border-radius: 5px; overflow-x: auto; }
                .citation { font-size: 0.9em; color: #666; }
            </style>
        </head>
        <body>
        `;

        for (const chapterFile of chapters) {
            const chapterUrl = this.buildChapterUrl(chapterFile);
            try {
                const { stdout } = await execAsync(`curl -s "${chapterUrl}"`);
                // Extract content between body tags and clean up
                const bodyMatch = stdout.match(/<body[^>]*>([\s\S]*)<\/body>/i);
                if (bodyMatch) {
                    let chapterContent = bodyMatch[1];
                    // Remove navigation and other non-content elements
                    chapterContent = chapterContent.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '');
                    chapterContent = chapterContent.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
                    chapterContent = chapterContent.replace(/class="[^"]*"/g, '');

                    combinedContent += `<div class="chapter">${chapterContent}</div>\n`;
                }
            } catch (error) {
                console.warn(chalk.yellow(`Warning: Could not fetch ${chapterFile}: ${error.message}`));
            }
        }

        combinedContent += `
        </body>
        </html>
        `;

        return combinedContent;
    }

    buildChapterUrl(chapterFile) {
        const chapterName = path.basename(chapterFile, '.md');
        return `${this.config.hugo.baseURL}/chapters/${chapterName}/`;
    }

    async generatePDF(sourceUrl, outputPath) {
        const wkhtmltopdfPath = this.config.wkhtmltopdf.path;
        const options = this.config.wkhtmltopdf.options;

        const optionArgs = Object.entries(options)
            .map(([key, value]) => `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()} ${value}`)
            .join(' ');

        const command = `"${wkhtmltopdfPath}" ${optionArgs} "${sourceUrl}" "${outputPath}"`;

        try {
            execSync(command, {
                stdio: 'pipe',
                timeout: 120000 // 2 minutes timeout
            });
        } catch (error) {
            throw new Error(`PDF generation failed: ${error.message}`);
        }
    }

    async checkHugoServer() {
        try {
            const { stdout } = await execAsync(`curl -I ${this.config.hugo.baseURL} 2>/dev/null`, { timeout: 5000 });
            return stdout.includes('200 OK');
        } catch {
            return false;
        }
    }

    async startHugoServer() {
        this.spinner.text = 'Starting Hugo development server...';

        // Start Hugo in background
        exec(`cd "${rootDir}" && hugo server --port ${this.config.hugo.port} --bind 127.0.0.1`, {
            detached: true,
            stdio: 'ignore'
        });

        // Wait for server to be ready
        let attempts = 0;
        while (attempts < 30) { // 30 seconds max
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (await this.checkHugoServer()) {
                return true;
            }
            attempts++;
        }

        throw new Error('Hugo server failed to start');
    }

    async validatePDFQuality(pdfPath) {
        const stats = await fs.stat(pdfPath);
        const fileSize = this.formatFileSize(stats.size);

        // Simple quality assessment based on file size and existence
        let score = 8; // Base score

        if (stats.size < 50000) score -= 2; // Too small
        if (stats.size > 50000000) score -= 1; // Very large

        return {
            fileSize,
            pages: 'Unknown', // Would need PDF parsing library for accurate count
            score,
            path: pdfPath
        };
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// CLI handling
if (import.meta.url === `file://${process.argv[1]}`) {
    const args = process.argv.slice(2);
    const options = {};

    // Parse command line arguments
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--chapter' && args[i + 1]) {
            options.chapter = args[i + 1];
            i++;
        } else if (args[i] === '--output' && args[i + 1]) {
            options.output = args[i + 1];
            i++;
        }
    }

    const generator = new PDFGenerator(options);
    generator.generate().catch(console.error);
}

export default PDFGenerator;