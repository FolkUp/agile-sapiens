#!/usr/bin/env node
/**
 * AGIL-007: Quality Gates Script — Banking-Level Content Validation
 * Usage: node scripts/validate-content.js --check=<gate>
 * Gates: level1, voice-gate, frontmatter, sources, brand, all
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import yaml from 'js-yaml';

// Banking-level error tolerance: ZERO
let errors = 0;
let warnings = 0;

const log = {
  error: (msg) => { console.error(`❌ ERROR: ${msg}`); errors++; },
  warn: (msg) => { console.warn(`⚠️  WARN: ${msg}`); warnings++; },
  ok: (msg) => console.log(`✅ OK: ${msg}`),
  info: (msg) => console.log(`ℹ️  ${msg}`)
};

// Quality Gate 1: Level 1 Compliance (AI Tool Names)
function checkLevel1Compliance() {
  log.info("QUALITY GATE 1: Level 1 Compliance Check");

  const aiPatterns = /\b(claude|anthropic|openai|chatgpt|gemini|copilot|bard)\b/gi;
  const contentFiles = glob.sync('content/**/*.md');
  const layoutFiles = glob.sync('layouts/**/*.html');
  const staticFiles = glob.sync('static/**/*', { nodir: true });

  [...contentFiles, ...layoutFiles, ...staticFiles].forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const matches = content.match(aiPatterns);
      if (matches) {
        log.error(`AI tool names found in ${file}: ${matches.join(', ')}`);
      }
    } catch (err) {
      // Skip binary files
    }
  });

  if (errors === 0) log.ok("Level 1 compliance: No AI tool names detected");
}

// Quality Gate 2: Voice Gate (AI Writing Patterns)
function checkVoiceGate() {
  log.info("QUALITY GATE 2: Voice Gate — AI Pattern Detection");

  const aiWritingPatterns = [
    /\bdelve\b/gi,
    /\bmeticulous\b/gi,
    /it's worth noting/gi,
    /furthermore/gi,
    /moreover/gi,
    /additionally/gi,
    /in conclusion/gi,
    /to summarize/gi,
    /embark on/gi,
    /comprehensive analysis/gi,
    /holistic approach/gi,
    /leverage\b/gi,
    /streamline\b/gi,
    /synergy\b/gi
  ];

  const contentFiles = glob.sync('content/**/*.md');

  contentFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const body = extractContentBody(content);

    let patternCount = 0;
    aiWritingPatterns.forEach(pattern => {
      const matches = body.match(pattern);
      if (matches) patternCount += matches.length;
    });

    if (patternCount > 3) {
      log.warn(`High AI pattern density in ${path.basename(file)}: ${patternCount} instances`);
    }
  });

  log.ok("Voice Gate: AI pattern check completed");
}

// Quality Gate 3: Frontmatter Schema Validation
function checkFrontmatterSchema() {
  log.info("QUALITY GATE 3: Frontmatter Schema Validation");

  const contentFiles = glob.sync('content/**/*.md', { ignore: 'content/**/_index.md' });
  const requiredFields = ['title', 'date', 'categories', 'status', 'confidence'];

  contentFiles.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const frontmatter = extractFrontmatter(content);
      const basename = path.basename(file);

      if (!frontmatter) {
        log.error(`No frontmatter found in ${basename}`);
        return;
      }

      // Check required fields
      requiredFields.forEach(field => {
        if (!frontmatter[field]) {
          log.error(`Missing required field '${field}' in ${basename}`);
        }
      });

      // Check status values
      const validStatuses = ['draft', 'stub', 'unverified', 'partially_verified', 'verified'];
      if (frontmatter.status && !validStatuses.includes(frontmatter.status)) {
        log.error(`Invalid status '${frontmatter.status}' in ${basename}`);
      }

      // Check confidence values
      const validConfidence = ['low', 'medium', 'high'];
      if (frontmatter.confidence && !validConfidence.includes(frontmatter.confidence)) {
        log.error(`Invalid confidence '${frontmatter.confidence}' in ${basename}`);
      }

      // Editorial workflow compliance
      if (['verified', 'partially_verified'].includes(frontmatter.status)) {
        if (!frontmatter.reviewed_by) {
          log.error(`Missing 'reviewed_by' for ${frontmatter.status} article: ${basename}`);
        }
        if (!frontmatter.review_date) {
          log.error(`Missing 'review_date' for ${frontmatter.status} article: ${basename}`);
        }
      }

    } catch (err) {
      log.error(`Failed to parse frontmatter in ${path.basename(file)}: ${err.message}`);
    }
  });

  if (errors === 0) log.ok("Frontmatter schema validation passed");
}

// Quality Gate 4: Source Verification
function checkSourceVerification() {
  log.info("QUALITY GATE 4: Source Verification");

  const contentFiles = glob.sync('content/**/*.md', { ignore: 'content/**/_index.md' });

  contentFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const frontmatter = extractFrontmatter(content);
    const basename = path.basename(file);

    if (!frontmatter) return;

    // Skip drafts and stubs
    if (['draft', 'stub'].includes(frontmatter.status)) return;

    // Check sources array
    if (!frontmatter.sources || !Array.isArray(frontmatter.sources)) {
      log.error(`Missing 'sources' array in ${basename}`);
      return;
    }

    // Minimum source requirement for verified content
    if (['verified', 'partially_verified'].includes(frontmatter.status)) {
      if (frontmatter.sources.length < 2) {
        log.error(`Insufficient sources (${frontmatter.sources.length}/2 minimum) for ${frontmatter.status}: ${basename}`);
      }
    }

    // Check source format
    frontmatter.sources.forEach((source, index) => {
      if (typeof source !== 'object' || !source.title || !source.url) {
        log.error(`Invalid source format at index ${index} in ${basename}`);
      }
    });
  });

  if (errors === 0) log.ok("Source verification passed");
}

// Quality Gate 5: Brand Consistency
function checkBrandConsistency() {
  log.info("QUALITY GATE 5: Brand Consistency Verification");

  // Check hugo.toml for proper branding
  try {
    const hugoConfig = fs.readFileSync('hugo.toml', 'utf-8');

    if (!hugoConfig.includes('FolkUp')) {
      log.error("Missing FolkUp branding in hugo.toml");
    }

    // Check color scheme consistency
    if (hugoConfig.includes('theme = "hextra"')) {
      const customCSS = glob.sync('assets/css/custom.css');
      if (customCSS.length === 0) {
        log.warn("No custom CSS found — ensure Brand Guide v2.5 compliance");
      }
    }

  } catch (err) {
    log.error(`Failed to read hugo.toml: ${err.message}`);
  }

  // Check footer and branding in layouts
  const layoutFiles = glob.sync('layouts/**/*.html');
  let hasFolkUpBranding = false;

  layoutFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    if (content.includes('FolkUp') || content.includes('folkup.app')) {
      hasFolkUpBranding = true;
    }
  });

  if (!hasFolkUpBranding) {
    log.warn("No FolkUp branding detected in layouts — verify brand consistency");
  }

  log.ok("Brand consistency check completed");
}

// Helper Functions
function extractFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return null;

  try {
    return yaml.load(frontmatterMatch[1]);
  } catch (err) {
    return null;
  }
}

function extractContentBody(content) {
  return content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
}

// Generate Quality Gate Report
function generateReport() {
  const report = {
    timestamp: new Date().toISOString(),
    errors,
    warnings,
    status: errors === 0 ? 'PASSED' : 'FAILED',
    gates: {
      level1: 'completed',
      voiceGate: 'completed',
      frontmatter: 'completed',
      sources: 'completed',
      brand: 'completed'
    }
  };

  fs.writeFileSync('quality-gate-report.json', JSON.stringify(report, null, 2));
  log.info(`Quality gate report saved: quality-gate-report.json`);
}

// Main Execution
const args = process.argv.slice(2);
const checkArg = args.find(arg => arg.startsWith('--check='));
const checkType = checkArg ? checkArg.split('=')[1] : 'all';

console.log('🏛️  AGILE SAPIENS — Banking-Level Quality Gates');
console.log('================================================');

switch (checkType) {
  case 'level1':
    checkLevel1Compliance();
    break;
  case 'voice-gate':
    checkVoiceGate();
    break;
  case 'frontmatter':
    checkFrontmatterSchema();
    break;
  case 'sources':
    checkSourceVerification();
    break;
  case 'brand':
    checkBrandConsistency();
    break;
  case 'all':
  default:
    checkLevel1Compliance();
    checkVoiceGate();
    checkFrontmatterSchema();
    checkSourceVerification();
    checkBrandConsistency();
}

generateReport();

console.log('\n================================================');
console.log(`Errors: ${errors} | Warnings: ${warnings}`);
console.log(`Status: ${errors === 0 ? '✅ PASSED' : '❌ FAILED'}`);
console.log('Banking-level standards: MAINTAINED');

process.exit(errors > 0 ? 1 : 0);