#!/usr/bin/env node

/**
 * AGILE SAPIENS Publishing Infrastructure Setup
 * Enhanced Alice v2.0 Level 3 - Banking-Level Standards
 *
 * Sets up publishing environment with comprehensive validation
 */

import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

class PublishingSetup {
    constructor() {
        this.spinner = ora();
        this.config = {
            wkhtmltopdf: {
                path: 'C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe',
                options: {
                    pageSize: 'A4',
                    marginTop: '2cm',
                    marginBottom: '2cm',
                    marginLeft: '2cm',
                    marginRight: '2cm',
                    encoding: 'UTF-8',
                    printMediaType: true,
                    enableIntelligentShrinking: false,
                    disableSmartShrinking: true
                }
            },
            hugo: {
                baseURL: 'http://localhost:8080',
                port: 8080
            },
            output: {
                pdfDir: path.join(rootDir, 'dist', 'pdf'),
                tempDir: path.join(rootDir, 'tmp'),
                logDir: path.join(rootDir, 'logs', 'publishing')
            }
        };
    }

    async setup() {
        console.log(chalk.blue.bold('\n🚀 AGILE SAPIENS Publishing Infrastructure Setup'));
        console.log(chalk.gray('Banking-Level Standards | Enhanced Alice v2.0 Level 3\n'));

        try {
            await this.validateSystem();
            await this.createDirectories();
            await this.validateWkhtmltopdf();
            await this.createConfig();
            await this.installDependencies();

            console.log(chalk.green.bold('\n✅ Publishing Infrastructure Setup Complete!'));
            console.log(chalk.cyan('Available commands:'));
            console.log(chalk.cyan('  npm run publish:pdf     - Generate single chapter PDF'));
            console.log(chalk.cyan('  npm run publish:book    - Generate complete book PDF'));
            console.log(chalk.cyan('  npm run publish:validate - Validate PDF quality'));
            console.log(chalk.cyan('  npm run publish:all     - Complete publishing pipeline\n'));

        } catch (error) {
            console.error(chalk.red.bold('\n❌ Setup Failed:'), error.message);
            process.exit(1);
        }
    }

    async validateSystem() {
        this.spinner.start('Validating system requirements...');

        // Check Node.js version
        const nodeVersion = process.version;
        const majorVersion = parseInt(nodeVersion.slice(1));
        if (majorVersion < 18) {
            throw new Error(`Node.js 18+ required, found ${nodeVersion}`);
        }

        // Check Hugo availability
        try {
            execSync('hugo version', { stdio: 'pipe' });
        } catch (error) {
            throw new Error('Hugo not found. Please install Hugo SSG.');
        }

        this.spinner.succeed('System requirements validated');
    }

    async createDirectories() {
        this.spinner.start('Creating directory structure...');

        const dirs = [
            this.config.output.pdfDir,
            this.config.output.tempDir,
            this.config.output.logDir
        ];

        for (const dir of dirs) {
            await fs.ensureDir(dir);
        }

        this.spinner.succeed('Directory structure created');
    }

    async validateWkhtmltopdf() {
        this.spinner.start('Validating wkhtmltopdf installation...');

        if (!await fs.pathExists(this.config.wkhtmltopdf.path)) {
            throw new Error('wkhtmltopdf not found. Expected at: ' + this.config.wkhtmltopdf.path);
        }

        try {
            execSync(`"${this.config.wkhtmltopdf.path}" --version`, { stdio: 'pipe' });
        } catch (error) {
            throw new Error('wkhtmltopdf validation failed');
        }

        this.spinner.succeed('wkhtmltopdf validated');
    }

    async createConfig() {
        this.spinner.start('Creating publishing configuration...');

        const configPath = path.join(rootDir, 'publishing.config.json');
        await fs.writeJSON(configPath, this.config, { spaces: 2 });

        this.spinner.succeed('Publishing configuration created');
    }

    async installDependencies() {
        this.spinner.start('Installing publishing dependencies...');

        try {
            execSync('npm install', {
                stdio: 'pipe',
                cwd: rootDir
            });
        } catch (error) {
            throw new Error('Failed to install dependencies: ' + error.message);
        }

        this.spinner.succeed('Dependencies installed');
    }
}

// Execute setup if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const setup = new PublishingSetup();
    setup.setup().catch(console.error);
}

export default PublishingSetup;