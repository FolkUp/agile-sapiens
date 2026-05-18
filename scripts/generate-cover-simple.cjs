#!/usr/bin/env node
/**
 * Simple cover generator without ImageMagick dependency
 */

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const MODEL_OWNER = "black-forest-labs";
const MODEL_NAME = "flux-1.1-pro";
const OUTPUT_DIR = "static/images";

const COVER_PROMPT = `Elegant academic book cover in Victorian engraving style, sepia monochromatic palette.

Central title "AGILE SAPIENS" in bold serif typography, classical academic formatting. Below in smaller elegant script: "Литературный бизнес-анализ" and "How Literature Predicted Modern Management".

Victorian decorative border with crosshatched engraving details. Background features subtle literary symbols: quill pens, ancient books, scrolls, classical architectural elements. Professional academic aesthetic, reminiscent of 19th-century scholarly publications.

Style: Detailed crosshatching, Victorian book illustration, sepia tones, academic gravitas, classical typography, literary sophistication.`;

async function generateVariant3() {
    const seed = Math.floor(Math.random() * 1000000);
    const outputFile = path.join(OUTPUT_DIR, `agile-sapiens-cover-literary-v3.png`);

    const payload = {
        input: {
            prompt: COVER_PROMPT,
            aspect_ratio: "9:16",
            seed: seed,
            prompt_upsampling: false,
            safety_tolerance: 5,
            output_format: "png",
            output_quality: 100
        }
    };

    console.log('Generating variant 3...');

    const createResponse = await fetch(`https://api.replicate.com/v1/models/${MODEL_OWNER}/${MODEL_NAME}/predictions`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    const prediction = await createResponse.json();
    console.log(`  Prediction: ${prediction.id} (seed: ${seed})`);

    // Poll for completion
    let status = 'starting';
    let pollCount = 0;

    while (status === 'starting' || status === 'processing') {
        await new Promise(resolve => setTimeout(resolve, 5000));
        pollCount++;

        const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
            headers: { 'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}` }
        });

        const result = await statusResponse.json();
        status = result.status;
        console.log(`  Status: ${status} (poll ${pollCount})`);

        if (status === 'succeeded' && result.output) {
            const imageUrl = typeof result.output === 'string' ? result.output : result.output[0];
            const imageResponse = await fetch(imageUrl);
            const imageBuffer = await imageResponse.buffer();

            fs.writeFileSync(outputFile, imageBuffer);
            const fileSize = Math.round(fs.statSync(outputFile).size / 1024);
            console.log(`  Saved: ${outputFile} (${fileSize}KB)`);
            break;
        }

        if (pollCount >= 20) break; // Timeout after 100 seconds
    }
}

generateVariant3().catch(console.error);