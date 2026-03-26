#!/usr/bin/env node

/**
 * GDPR Compliance Validator for AGILE SAPIENS
 * Banking-level verification of cookie consent and privacy infrastructure
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const publicDir = './public';
let errors = 0;
let warnings = 0;

// GDPR Compliance Rules (EU banking standards)
const GDPR_RULES = {
  // Essential legal documents
  REQUIRED_LEGAL_PAGES: [
    '/legal/privacy/',
    '/legal/cookies/',
    '/legal/terms/',
    '/legal/ai-transparency/'
  ],

  // Cookie consent implementation
  REQUIRED_CONSENT_ELEMENTS: [
    'cookie-banner',
    'cookie-accept',
    'cookie-reject',
    'cookie-settings'
  ],

  // Prohibited tracking without consent
  BLOCKED_WITHOUT_CONSENT: [
    'google-analytics',
    'gtag',
    'facebook-pixel',
    'hotjar',
    'mixpanel'
  ],

  // Required meta elements
  REQUIRED_META: [
    'privacy-policy',
    'cookie-policy'
  ]
};

function log(level, message, file = '') {
  const prefix = file ? `[${file}] ` : '';
  console.log(`${level}: ${prefix}${message}`);

  if (level === 'ERROR') errors++;
  if (level === 'WARN') warnings++;
}

function readFileIfExists(filePath) {
  try {
    return readFileSync(filePath, 'utf8');
  } catch (e) {
    return null;
  }
}

function validateLegalPages() {
  console.log('\n🔍 Validating Legal Pages...');

  for (const page of GDPR_RULES.REQUIRED_LEGAL_PAGES) {
    const filePath = join(publicDir, page, 'index.html');
    const content = readFileIfExists(filePath);

    if (!content) {
      log('ERROR', `Required legal page missing: ${page}`, filePath);
      continue;
    }

    // Validate page content
    if (page === '/legal/privacy/') {
      validatePrivacyPolicy(content, page);
    } else if (page === '/legal/cookies/') {
      validateCookiePolicy(content, page);
    }

    log('OK', `Legal page exists: ${page}`);
  }
}

function validatePrivacyPolicy(content, page) {
  const requiredSections = [
    'GDPR',
    'cookie',
    'consent',
    'privacy@folkup.app',
    'Comissão Nacional de Proteção de Dados',
    'legitimate interest'
  ];

  for (const section of requiredSections) {
    if (!content.toLowerCase().includes(section.toLowerCase())) {
      log('ERROR', `Privacy Policy missing required content: "${section}"`, page);
    }
  }
}

function validateCookiePolicy(content, page) {
  const requiredElements = [
    'essential cookies',
    'consent',
    'Ko-fi',
    'GDPR',
    'browser settings',
    'withdraw consent'
  ];

  for (const element of requiredElements) {
    if (!content.toLowerCase().includes(element.toLowerCase())) {
      log('ERROR', `Cookie Policy missing required content: "${element}"`, page);
    }
  }
}

function validateCookieConsent() {
  console.log('\n🍪 Validating Cookie Consent Implementation...');

  // Check if cookie consent is properly implemented
  const indexPath = join(publicDir, 'index.html');
  const indexContent = readFileIfExists(indexPath);

  if (!indexContent) {
    log('ERROR', 'Homepage not found for consent validation');
    return;
  }

  for (const element of GDPR_RULES.REQUIRED_CONSENT_ELEMENTS) {
    if (!indexContent.includes(element)) {
      log('ERROR', `Cookie consent element missing: ${element}`, 'index.html');
    }
  }

  // Check for consent-gated tracking
  for (const tracker of GDPR_RULES.BLOCKED_WITHOUT_CONSENT) {
    if (indexContent.includes(tracker) && !indexContent.includes('cookieConsentGiven')) {
      log('ERROR', `Tracking code "${tracker}" not properly gated by consent`, 'index.html');
    }
  }

  log('OK', 'Cookie consent implementation found');
}

function validateKofiConsent() {
  console.log('\n☕ Validating Ko-fi GDPR Compliance...');

  const indexPath = join(publicDir, 'index.html');
  const indexContent = readFileIfExists(indexPath);

  if (!indexContent) return;

  // Ko-fi should be consent-gated
  if (indexContent.includes('ko-fi.com')) {
    if (!indexContent.includes('kofi-blocked') || !indexContent.includes('kofi-consent')) {
      log('ERROR', 'Ko-fi widget not properly consent-gated');
    } else {
      log('OK', 'Ko-fi widget properly consent-gated');
    }
  }
}

function validateRobotsTxt() {
  console.log('\n🤖 Validating robots.txt...');

  const robotsPath = join(publicDir, 'robots.txt');
  const robotsContent = readFileIfExists(robotsPath);

  if (!robotsContent) {
    log('ERROR', 'robots.txt missing');
    return;
  }

  // Check required elements
  const required = [
    'User-agent: *',
    'Allow: /legal/',
    'Sitemap: https://sapiens.folkup.life/sitemap.xml'
  ];

  for (const rule of required) {
    if (!robotsContent.includes(rule)) {
      log('ERROR', `robots.txt missing required rule: "${rule}"`);
    }
  }

  log('OK', 'robots.txt properly configured');
}

function validateFooterLinks() {
  console.log('\n🔗 Validating Footer Legal Links...');

  const indexPath = join(publicDir, 'index.html');
  const indexContent = readFileIfExists(indexPath);

  if (!indexContent) return;

  const requiredLinks = [
    '/legal/privacy/',
    '/legal/cookies/',
    '/legal/terms/',
    '/legal/ai-transparency/'
  ];

  for (const link of requiredLinks) {
    if (!indexContent.includes(link)) {
      log('ERROR', `Footer missing required legal link: ${link}`, 'index.html');
    }
  }

  log('OK', 'Footer legal links present');
}

function validateSitemap() {
  console.log('\n🗺️ Validating Sitemap...');

  const sitemapPath = join(publicDir, 'sitemap.xml');
  const sitemapContent = readFileIfExists(sitemapPath);

  if (!sitemapContent) {
    log('WARN', 'sitemap.xml not found (Hugo should generate this)');
    return;
  }

  // Check that legal pages are in sitemap
  for (const page of GDPR_RULES.REQUIRED_LEGAL_PAGES) {
    const fullUrl = `https://sapiens.folkup.life${page}`;
    if (!sitemapContent.includes(fullUrl)) {
      log('WARN', `Legal page not in sitemap: ${page}`);
    }
  }

  log('OK', 'Sitemap includes legal pages');
}

function validateLevel1Compliance(dir = publicDir) {
  console.log('\n🚫 Validating Level 1 AI Compliance...');

  const files = readdirSync(dir);
  const prohibitedTerms = [
    'claude',
    'anthropic',
    'openai',
    'chatgpt',
    'gemini',
    'copilot',
    'ai-generated',
    'generated by ai'
  ];

  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      validateLevel1Compliance(filePath);
      continue;
    }

    if (!file.endsWith('.html')) continue;

    const content = readFileIfExists(filePath).toLowerCase();
    if (!content) continue;

    for (const term of prohibitedTerms) {
      if (content.includes(term)) {
        log('ERROR', `Level 1 violation: "${term}" found in public content`, filePath);
      }
    }
  }
}

function runGDPRAudit() {
  console.log('🏛️ GDPR BANKING-LEVEL COMPLIANCE AUDIT');
  console.log('=====================================');

  validateLegalPages();
  validateCookieConsent();
  validateKofiConsent();
  validateRobotsTxt();
  validateFooterLinks();
  validateSitemap();
  validateLevel1Compliance();

  console.log('\n📊 AUDIT RESULTS');
  console.log('================');
  console.log(`❌ Errors: ${errors}`);
  console.log(`⚠️  Warnings: ${warnings}`);

  if (errors === 0) {
    console.log('\n✅ GDPR COMPLIANCE: PASS');
    console.log('Banking-level standards achieved.');
    process.exit(0);
  } else {
    console.log('\n❌ GDPR COMPLIANCE: FAIL');
    console.log(`${errors} critical issues must be resolved before publication.`);
    process.exit(1);
  }
}

// Run audit
runGDPRAudit();