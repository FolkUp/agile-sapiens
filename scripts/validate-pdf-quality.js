#!/usr/bin/env node

/**
 * AGILE SAPIENS PDF Quality Validator
 * Enhanced Alice v2.0 Level 3 - Banking-Level Standards
 *
 * Validates PDF quality with comprehensive metrics
 */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

class PDFQualityValidator {
    constructor() {
        this.spinner = ora();
        this.qualityGates = {
            minFileSize: 100000, // 100KB minimum
            maxFileSize: 100000000, // 100MB maximum
            minPages: 1,
            maxPages: 1000
        };
    }

    async validate(pdfPath = null) {
        console.log(chalk.blue.bold('\n🔍 AGILE SAPIENS PDF Quality Validator'));
        console.log(chalk.gray('Banking-Level Standards | Enhanced Alice v2.0 Level 3\n'));

        try {
            const pdfDir = path.join(rootDir, 'dist', 'pdf');
            const pdfFiles = pdfPath
                ? [pdfPath]
                : await this.findPDFFiles(pdfDir);

            if (pdfFiles.length === 0) {
                throw new Error('No PDF files found to validate');
            }

            const results = [];
            for (const file of pdfFiles) {
                const result = await this.validateSinglePDF(file);
                results.push(result);
            }

            this.displayResults(results);

            const allPassed = results.every(r => r.quality.passed);
            if (allPassed) {
                console.log(chalk.green.bold('\n✅ All PDFs passed quality validation!'));
            } else {
                console.log(chalk.red.bold('\n❌ Some PDFs failed quality validation'));
                process.exit(1);
            }

            return results;

        } catch (error) {
            console.error(chalk.red.bold('\n❌ Validation Failed:'), error.message);
            process.exit(1);
        }
    }

    async findPDFFiles(dir) {
        if (!await fs.pathExists(dir)) {
            return [];
        }

        const files = await fs.readdir(dir);
        return files
            .filter(file => file.endsWith('.pdf'))
            .map(file => path.join(dir, file));
    }

    async validateSinglePDF(pdfPath) {
        this.spinner.start(`Validating ${path.basename(pdfPath)}...`);

        const quality = {
            file: path.basename(pdfPath),
            path: pdfPath,
            passed: false,
            issues: [],
            metrics: {}
        };

        try {
            // File existence check
            if (!await fs.pathExists(pdfPath)) {
                quality.issues.push('File does not exist');
                return quality;
            }

            // File size checks
            const stats = await fs.stat(pdfPath);
            quality.metrics.fileSize = stats.size;
            quality.metrics.fileSizeFormatted = this.formatFileSize(stats.size);

            if (stats.size < this.qualityGates.minFileSize) {
                quality.issues.push(`File too small: ${quality.metrics.fileSizeFormatted} (min: ${this.formatFileSize(this.qualityGates.minFileSize)})`);
            }

            if (stats.size > this.qualityGates.maxFileSize) {
                quality.issues.push(`File too large: ${quality.metrics.fileSizeFormatted} (max: ${this.formatFileSize(this.qualityGates.maxFileSize)})`);
            }

            // PDF structure validation (basic)
            const buffer = await fs.readFile(pdfPath);
            const pdfSignature = buffer.subarray(0, 4).toString();

            if (pdfSignature !== '%PDF') {
                quality.issues.push('Invalid PDF file signature');
            }

            // Count pages (simple estimation based on /Page occurrences)
            const contentStr = buffer.toString('binary');
            const pageMatches = contentStr.match(/\/Type\s*\/Page[^s]/g);
            quality.metrics.estimatedPages = pageMatches ? pageMatches.length : 'Unknown';

            // Quality score calculation
            let score = 10;
            score -= quality.issues.length * 2;
            if (stats.size < 150000) score -= 1; // Prefer substantial content
            if (score < 0) score = 0;

            quality.metrics.qualityScore = score;
            quality.passed = quality.issues.length === 0 && score >= 7;

            this.spinner.succeed(`Validated ${quality.file} - Score: ${score}/10`);

        } catch (error) {
            quality.issues.push(`Validation error: ${error.message}`);
            this.spinner.fail(`Failed to validate ${quality.file}`);
        }

        return { quality };
    }

    displayResults(results) {
        console.log(chalk.cyan('\n📊 Quality Validation Report:\n'));

        for (const { quality } of results) {
            const status = quality.passed ? chalk.green('✅ PASS') : chalk.red('❌ FAIL');
            console.log(`${status} ${quality.file}`);

            if (quality.metrics.fileSizeFormatted) {
                console.log(chalk.gray(`   Size: ${quality.metrics.fileSizeFormatted}`));
            }

            if (quality.metrics.estimatedPages && quality.metrics.estimatedPages !== 'Unknown') {
                console.log(chalk.gray(`   Pages: ~${quality.metrics.estimatedPages}`));
            }

            if (quality.metrics.qualityScore !== undefined) {
                console.log(chalk.gray(`   Score: ${quality.metrics.qualityScore}/10`));
            }

            if (quality.issues.length > 0) {
                for (const issue of quality.issues) {
                    console.log(chalk.red(`   ⚠️  ${issue}`));
                }
            }

            console.log('');
        }
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
    const pdfPath = args.length > 0 ? args[0] : null;

    const validator = new PDFQualityValidator();
    validator.validate(pdfPath).catch(console.error);
}

export default PDFQualityValidator;