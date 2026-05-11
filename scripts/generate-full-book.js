#!/usr/bin/env node

/**
 * AGILE SAPIENS Full Book PDF Generator
 * Enhanced Alice v2.0 Level 3 - Banking-Level Standards
 *
 * Wrapper for complete book generation
 */

import PDFGenerator from './generate-pdf.js';
import chalk from 'chalk';

async function generateFullBook() {
    console.log(chalk.blue.bold('📖 Generating Complete AGILE SAPIENS Book PDF'));

    const generator = new PDFGenerator({ book: true });
    await generator.generate();
}

// Execute if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    generateFullBook().catch(error => {
        console.error(chalk.red.bold('\n❌ Book Generation Failed:'), error.message);
        process.exit(1);
    });
}