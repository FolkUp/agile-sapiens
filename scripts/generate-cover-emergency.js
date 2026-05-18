#!/usr/bin/env node
/**
 * generate-cover-emergency.js — Emergency cover generation without SOPS infrastructure
 *
 * Usage:
 *   node scripts/generate-cover-emergency.js your_replicate_token_here
 *   node scripts/generate-cover-emergency.js --dry-run
 *
 * © 2026 FolkUp Ecosystem — Emergency Infrastructure Workaround
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// Configuration (same as main script)
const MODEL_OWNER = "black-forest-labs";
const MODEL_NAME = "flux-1.1-pro";
const OUTPUT_DIR = "static/images";
const ASPECT_RATIO = "9:16";
const SAFETY_TOLERANCE = 5;
const PROMPT_UPSAMPLING = false;

const COVER_PROMPT = `Elegant academic book cover in Victorian engraving style, sepia monochromatic palette.

Central title "AGILE SAPIENS" in bold serif typography, classical academic formatting. Below in smaller elegant script: "Литературный бизнес-анализ" and "How Literature Predicted Modern Management".

Victorian decorative border with crosshatched engraving details. Background features subtle literary symbols: quill pens, ancient books, scrolls, classical architectural elements. Professional academic aesthetic, reminiscent of 19th-century scholarly publications.

Style: Detailed crosshatching, Victorian book illustration, sepia tones, academic gravitas, classical typography, literary sophistication.`;

// Arguments parsing
const args = process.argv.slice(2);
let variants = 3;
let dryRun = false;
let manualToken = null;

for (let i = 0; i < args.length; i++) {
    if (args[i] === '--variants' && args[i + 1]) {
        variants = parseInt(args[i + 1]);
        i++;
    } else if (args[i] === '--dry-run') {
        dryRun = true;
    } else if (args[i] === '--help') {
        console.log(`
🚨 Emergency Cover Generator (No SOPS Required) 🚨

Usage: node scripts/generate-cover-emergency.js [TOKEN] [OPTIONS]

Arguments:
  TOKEN            Replicate API token (or use env var)

Options:
  --variants N     Generate N variants (default: 3)
  --dry-run        Show prompt without calling API
  --help           Show this help

Examples:
  node scripts/generate-cover-emergency.js r8_1234567890abcdef --variants 5
  node scripts/generate-cover-emergency.js --dry-run

  # PowerShell with environment variable:
  $env:REPLICATE_API_TOKEN = "r8_1234567890abcdef"
  node scripts/generate-cover-emergency.js --variants 3

Get your Replicate token at: https://replicate.com/account/api-tokens
        `);
        process.exit(0);
    } else if (!args[i].startsWith('--')) {
        manualToken = args[i];
    }
}

// Token resolution
const apiToken = manualToken || process.env.REPLICATE_API_TOKEN;

if (dryRun) {
    console.log('🔍 DRY RUN MODE - Prompt Preview:');
    console.log('=' .repeat(50));
    console.log(COVER_PROMPT);
    console.log('=' .repeat(50));
    console.log(`📋 Configuration:
- Model: ${MODEL_OWNER}/${MODEL_NAME}
- Variants: ${variants}
- Aspect Ratio: ${ASPECT_RATIO}
- Output Directory: ${OUTPUT_DIR}
- Safety Tolerance: ${SAFETY_TOLERANCE}
- Prompt Upsampling: ${PROMPT_UPSAMPLING}`);

    if (apiToken) {
        console.log('✅ API Token: Available (length:', apiToken.length, 'chars)');
        console.log('🔑 Token preview:', apiToken.substring(0, 8) + '...');
    } else {
        console.log('❌ API Token: Missing');
        console.log('\n🛠️  Solutions:');
        console.log('1. Get token from: https://replicate.com/account/api-tokens');
        console.log('2. Run: node scripts/generate-cover-emergency.js YOUR_TOKEN');
        console.log('3. Or set: $env:REPLICATE_API_TOKEN = "YOUR_TOKEN"');
    }
    process.exit(0);
}

// Validation for real run
if (!apiToken) {
    console.error(`
❌ Error: No Replicate API token provided

🛠️  IMMEDIATE SOLUTIONS:

1. 🔑 Get your token:
   - Visit: https://replicate.com/account/api-tokens
   - Create new token or copy existing one

2. 💾 Set token and run:
   PowerShell:
     $env:REPLICATE_API_TOKEN = "r8_your_actual_token_here"
     node scripts/generate-cover-emergency.js

   Or pass directly:
     node scripts/generate-cover-emergency.js r8_your_actual_token_here

3. 🧪 Test first:
     node scripts/generate-cover-emergency.js --dry-run

4. 📖 Full infrastructure setup:
     type SOPS_SETUP_INSTRUCTIONS.md
    `);
    process.exit(1);
}

// Ensure output directory exists
const outputPath = path.resolve(OUTPUT_DIR);
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
    console.log(`📁 Created output directory: ${outputPath}`);
}

// API call function
async function generateCover(variantNumber) {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
    const outputFile = path.join(OUTPUT_DIR, `agile-sapiens-cover-literary-v${variantNumber}-${timestamp}.png`);

    console.log(`🎨 Generating variant ${variantNumber}/${variants}...`);

    const requestBody = {
        model: `${MODEL_OWNER}/${MODEL_NAME}`,
        input: {
            prompt: COVER_PROMPT,
            aspect_ratio: ASPECT_RATIO,
            safety_tolerance: SAFETY_TOLERANCE,
            prompt_upsampling: PROMPT_UPSAMPLING
        }
    };

    try {
        // Start prediction
        const response = await fetch('https://api.replicate.com/v1/predictions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const error = await response.text();
            console.error(`❌ API Error (${response.status}):`, error);
            return null;
        }

        const prediction = await response.json();
        console.log(`📡 Prediction started: ${prediction.id}`);

        // Poll for completion
        let completed = false;
        let attempts = 0;
        const maxAttempts = 60; // 5 minutes max

        while (!completed && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds

            const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
                headers: { 'Authorization': `Bearer ${apiToken}` }
            });

            const status = await statusResponse.json();
            console.log(`📊 Status: ${status.status} (attempt ${++attempts}/${maxAttempts})`);

            if (status.status === 'succeeded') {
                if (status.output && status.output.length > 0) {
                    const imageUrl = status.output[0];
                    console.log(`📥 Downloading: ${imageUrl}`);

                    // Download image
                    const imageResponse = await fetch(imageUrl);
                    const arrayBuffer = await imageResponse.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);

                    fs.writeFileSync(outputFile, buffer);
                    console.log(`✅ Saved: ${outputFile}`);
                    return outputFile;
                } else {
                    console.error('❌ No output in successful prediction');
                    return null;
                }
            } else if (status.status === 'failed') {
                console.error(`❌ Prediction failed:`, status.error);
                return null;
            }
            // Continue polling for 'starting' or 'processing' status
        }

        console.error(`⏰ Timeout waiting for prediction ${prediction.id}`);
        return null;

    } catch (error) {
        console.error(`❌ Error generating variant ${variantNumber}:`, error.message);
        return null;
    }
}

// Main execution
console.log(`🚀 EMERGENCY Cover Generation for AGILE SAPIENS
📖 Theme: Literary business analysis (Victorian engraving style)
🎨 Variants: ${variants}
🤖 Model: ${MODEL_OWNER}/${MODEL_NAME}
📁 Output: ${OUTPUT_DIR}

🚨 Using emergency workaround (no SOPS infrastructure required)
`);

const results = [];
for (let i = 1; i <= variants; i++) {
    const result = await generateCover(i);
    if (result) {
        results.push(result);
    }

    // Add delay between requests to be respectful to API
    if (i < variants) {
        console.log('⏱️  Waiting 2 seconds before next variant...');
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

console.log(`\n🎯 Generation Complete!`);
console.log(`✅ Successfully generated: ${results.length}/${variants} variants`);

if (results.length > 0) {
    console.log('\n📋 Generated cover files:');
    results.forEach(file => console.log(`   📸 ${file}`));

    console.log('\n🎨 Next steps:');
    console.log('1. Review generated covers');
    console.log('2. Select best variant for publication');
    console.log('3. Add to git: git add static/images/agile-sapiens-cover-*');
    console.log('4. Set up SOPS infrastructure (see SOPS_SETUP_INSTRUCTIONS.md)');
} else {
    console.log('\n❌ No covers generated successfully');
    console.log('💡 Check your Replicate API token and try again');
}

if (results.length < variants) {
    console.log(`\n⚠️  ${variants - results.length} variants failed. Check errors above.`);
}