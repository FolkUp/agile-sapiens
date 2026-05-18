#!/usr/bin/env node
/**
 * generate-cover-flux-literary.cjs — Generate AGILE SAPIENS cover via Replicate Flux 1.1 Pro
 * Corrects subtitle from AI theme to literary business analysis
 *
 * Usage: node scripts/generate-cover-flux-literary.cjs --variants 3
 *
 * Requirements:
 *   - REPLICATE_API_TOKEN env var (or extract from vault)
 *   - Based on existing tarot-hub procedure
 *
 * © 2026 FolkUp Ecosystem — Enhanced Alice v2.0 Level 3 Implementation
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const MODEL_OWNER = "black-forest-labs";
const MODEL_NAME = "flux-1.1-pro";
const OUTPUT_DIR = "static/images";
const ASPECT_RATIO = "9:16";  // Book cover format
const SAFETY_TOLERANCE = 5;   // Permissive for academic content
const PROMPT_UPSAMPLING = false;  // Use our prompt as-is

// Enhanced prompt for literary business analysis theme
const COVER_PROMPT = `Elegant academic book cover in Victorian engraving style, sepia monochromatic palette.

Central title "AGILE SAPIENS" in bold serif typography, classical academic formatting. Below in smaller elegant script: "Литературный бизнес-анализ" and "How Literature Predicted Modern Management".

Victorian decorative border with crosshatched engraving details. Background features subtle literary symbols: quill pens, ancient books, scrolls, classical architectural elements. Professional academic aesthetic, reminiscent of 19th-century scholarly publications.

Style: Detailed crosshatching, Victorian book illustration, sepia tones, academic gravitas, classical typography, literary sophistication.`;

// Arguments parsing
const args = process.argv.slice(2);
let variants = 3;
let dryRun = false;

for (let i = 0; i < args.length; i++) {
    if (args[i] === '--variants' && args[i + 1]) {
        variants = parseInt(args[i + 1]);
        i++;
    } else if (args[i] === '--dry-run') {
        dryRun = true;
    } else if (args[i] === '--help') {
        console.log(`
Usage: node scripts/generate-cover-flux-literary.cjs [OPTIONS]

Options:
  --variants N     Generate N variants (default: 3)
  --dry-run        Show prompt without calling API
  --help           Show this help

Environment:
  REPLICATE_API_TOKEN  Required API token

Examples:
  node scripts/generate-cover-flux-literary.cjs --variants 5
  node scripts/generate-cover-flux-literary.cjs --dry-run
        `);
        process.exit(0);
    }
}

// Validation
if (!dryRun && !process.env.REPLICATE_API_TOKEN) {
    console.error(`
Error: REPLICATE_API_TOKEN environment variable not set

Get token via SOPS (if available):
  export REPLICATE_API_TOKEN=$(sops -d --extract '["replicate"]["api_token"]' vault/secrets/replicate.enc.yaml)

Or set manually:
  export REPLICATE_API_TOKEN=your_token_here
    `);
    process.exit(1);
}

console.log('=== AGILE SAPIENS Cover Generation ===');
console.log(`Theme: Literary Business Analysis`);
console.log(`Model: ${MODEL_OWNER}/${MODEL_NAME}`);
console.log(`Aspect: ${ASPECT_RATIO}`);
console.log(`Variants: ${variants}`);
console.log('');

if (dryRun) {
    console.log('--- DRY RUN: Prompt Preview ---');
    console.log(COVER_PROMPT);
    console.log('--- END ---');
    process.exit(0);
}

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateVariant(variantNumber) {
    console.log(`Generating variant ${variantNumber}/${variants}...`);

    const outputFile = path.join(OUTPUT_DIR, `agile-sapiens-cover-literary-v${variantNumber}.webp`);

    // Skip if file exists (idempotent)
    if (fs.existsSync(outputFile)) {
        console.log(`  SKIP (exists): ${outputFile}`);
        return;
    }

    const seed = Math.floor(Math.random() * 1000000);

    // Replicate API payload for Flux 1.1 Pro
    const payload = {
        input: {
            prompt: COVER_PROMPT,
            aspect_ratio: ASPECT_RATIO,
            seed: seed,
            prompt_upsampling: PROMPT_UPSAMPLING,
            safety_tolerance: SAFETY_TOLERANCE,
            output_format: "png",
            output_quality: 100
        }
    };

    try {
        // Create prediction
        const createResponse = await fetch('https://api.replicate.com/v1/models/' + MODEL_OWNER + '/' + MODEL_NAME + '/predictions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        const prediction = await createResponse.json();

        if (!prediction.id) {
            console.error(`  Error creating prediction: ${prediction.detail || prediction.error || 'unknown'}`);
            return;
        }

        console.log(`  Prediction: ${prediction.id} (seed: ${seed})`);

        // Poll for completion
        let status = prediction.status || 'starting';
        let pollCount = 0;
        const maxPolls = 60; // 5 minutes max

        while (status === 'starting' || status === 'processing') {
            await new Promise(resolve => setTimeout(resolve, 5000)); // 5 second intervals
            pollCount++;

            if (pollCount >= maxPolls) {
                console.log(`  Timeout after ${maxPolls * 5}s`);
                break;
            }

            const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
                headers: {
                    'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}`,
                }
            });

            const result = await statusResponse.json();
            status = result.status;
            console.log(`  Status: ${status} (poll ${pollCount})`);

            if (status === 'succeeded' && result.output) {
                // Download image
                const imageUrl = typeof result.output === 'string' ? result.output : result.output[0];

                const imageResponse = await fetch(imageUrl);
                const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

                // Convert to WebP using ImageMagick (if available) or save as PNG
                const tempFile = outputFile.replace('.webp', '-temp.png');
                fs.writeFileSync(tempFile, imageBuffer);

                // Try WebP conversion
                try {
                    const magick = spawn('magick', [tempFile, '-quality', '85', outputFile]);
                    magick.on('close', (code) => {
                        if (code === 0) {
                            fs.unlinkSync(tempFile); // Remove temp PNG
                            const fileSize = Math.round(fs.statSync(outputFile).size / 1024);
                            console.log(`  Saved: ${outputFile} (${fileSize}KB)`);
                        } else {
                            // Fallback: rename PNG to final name
                            fs.renameSync(tempFile, outputFile.replace('.webp', '.png'));
                            console.log(`  Saved: ${outputFile.replace('.webp', '.png')} (PNG fallback)`);
                        }
                    });
                } catch (e) {
                    // ImageMagick not available, keep as PNG
                    fs.renameSync(tempFile, outputFile.replace('.webp', '.png'));
                    console.log(`  Saved: ${outputFile.replace('.webp', '.png')} (PNG)`);
                }

                // Log success
                const logEntry = {
                    timestamp: new Date().toISOString(),
                    variant: variantNumber,
                    model: `${MODEL_OWNER}/${MODEL_NAME}`,
                    seed: seed,
                    prediction_id: prediction.id,
                    output_file: path.basename(outputFile),
                    theme: 'literary-business-analysis'
                };

                const logFile = path.join(OUTPUT_DIR, 'cover-generation-log.jsonl');
                fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');

                break;
            } else if (status === 'failed' || status === 'canceled') {
                console.error(`  Failed: ${result.error || status}`);
                break;
            }
        }

    } catch (error) {
        console.error(`  Error: ${error.message}`);
    }
}

// Generate all variants
async function main() {
    for (let i = 1; i <= variants; i++) {
        await generateVariant(i);

        // Brief pause between variants to avoid rate limiting
        if (i < variants) {
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    console.log('\nGeneration complete!');
    console.log('Next steps:');
    console.log('1. Review generated covers in static/images/');
    console.log('2. Select best variant for final cover.webp');
    console.log('3. Update Зеркальце for style comparison');
}

// Add fetch polyfill for Node.js if needed
if (typeof fetch === 'undefined') {
    const fetch = require('node-fetch');
    global.fetch = fetch;
    global.Response = fetch.Response;
}

main().catch(console.error);