#!/usr/bin/env node

// AGIL-133 Phase 2 Chapter 4 Baseline Measurement (Fixed Version)
// Monotone sentence analysis for "Борхес считает story points"

const fs = require('fs');
const path = require('path');

function analyzeChapter4() {
    const chapterPath = path.join(__dirname, '..', 'content', 'chapters', 'chapter-4-borges.md');

    if (!fs.existsSync(chapterPath)) {
        console.error('Chapter 4 file not found:', chapterPath);
        process.exit(1);
    }

    const content = fs.readFileSync(chapterPath, 'utf-8');

    // Extract content after frontmatter (find second ---)
    const firstDash = content.indexOf('---');
    const secondDash = content.indexOf('---', firstDash + 3);

    if (secondDash === -1) {
        console.error('Invalid frontmatter format');
        process.exit(1);
    }

    const bodyContent = content.substring(secondDash + 3).trim();

    // Remove footnotes section for analysis
    const footnoteStart = bodyContent.indexOf('**Footnotes:**');
    const analysisContent = footnoteStart > 0
        ? bodyContent.substring(0, footnoteStart).trim()
        : bodyContent;

    console.log(`Debug: Analysis content length: ${analysisContent.length} chars`);

    // Clean content for sentence splitting
    const cleanedContent = analysisContent
        .replace(/\n+/g, ' ')                    // Replace newlines with spaces
        .replace(/\s+/g, ' ')                    // Normalize whitespace
        .replace(/^>.*$/gm, '')                  // Remove quotes/blockquotes
        .replace(/^#+.*$/gm, '')                 // Remove headers
        .replace(/^\*\*.*\*\*$/gm, '')          // Remove bold headers
        .replace(/^---+$/gm, '')                 // Remove dividers
        .trim();

    // Split into sentences
    const sentences = cleanedContent
        .split(/[.!?]+(?=\s+[А-ЯA-Z]|\s*$)/)    // Split on sentence endings before capitals or end
        .map(s => s.trim())
        .filter(s => s.length > 15 && !s.match(/^[^а-яёa-z]*$/i)); // Filter short and non-text

    // Count words in each sentence
    const sentenceLengths = sentences.map(s => {
        const words = s.split(/\s+/).filter(w => w.length > 0);
        return words.length;
    });

    // Total words count
    const totalWords = cleanedContent.split(/\s+/).filter(w => w.length > 0).length;

    // Count short sentences (≤8 words = monotone)
    const shortSentences = sentenceLengths.filter(len => len <= 8);
    const monotonePercentage = ((shortSentences.length / sentences.length) * 100).toFixed(1);

    // Calculate statistics
    const avgLength = (sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length).toFixed(1);
    const maxLength = Math.max(...sentenceLengths);
    const minLength = Math.min(...sentenceLengths);

    const results = {
        chapter: "Chapter 4: Борхес считает story points",
        timestamp: new Date().toISOString(),
        metrics: {
            totalSentences: sentences.length,
            totalWords: totalWords,
            monotoneSentences: shortSentences.length,
            monotonePercentage: parseFloat(monotonePercentage),
            avgSentenceLength: parseFloat(avgLength),
            minSentenceLength: minLength,
            maxSentenceLength: maxLength
        },
        target: {
            monotoneTarget: 20.0,
            targetDescription: "<20% monotone (consistent with Ch3 baseline)"
        },
        segmentation: {
            batchSize: Math.ceil(sentences.length / 3),
            batch1: `Sentences 1-${Math.ceil(sentences.length / 3)}`,
            batch2: `Sentences ${Math.ceil(sentences.length / 3) + 1}-${Math.ceil(sentences.length * 2 / 3)}`,
            batch3: `Sentences ${Math.ceil(sentences.length * 2 / 3) + 1}-${sentences.length}`
        }
    };

    console.log('\n=== AGIL-133 Chapter 4 Baseline Measurement ===');
    console.log(`Title: ${results.chapter}`);
    console.log(`Total sentences: ${results.metrics.totalSentences}`);
    console.log(`Total words: ${results.metrics.totalWords}`);
    console.log(`Monotone sentences (≤8 words): ${results.metrics.monotoneSentences}`);
    console.log(`Monotone percentage: ${results.metrics.monotonePercentage}%`);
    console.log(`Average sentence length: ${results.metrics.avgSentenceLength} words`);
    console.log(`Sentence length range: ${results.metrics.minSentenceLength}-${results.metrics.maxSentenceLength} words`);
    console.log(`\nTarget: ${results.target.targetDescription}`);
    console.log(`Current vs Target: ${results.metrics.monotonePercentage}% vs <${results.target.monotoneTarget}%`);
    console.log(`\nSegmentation for 3 batches:`);
    console.log(`- Batch 1: ${results.segmentation.batch1}`);
    console.log(`- Batch 2: ${results.segmentation.batch2}`);
    console.log(`- Batch 3: ${results.segmentation.batch3}`);

    if (results.metrics.monotonePercentage <= results.target.monotoneTarget) {
        console.log('\n✅ Already meeting target - light polish approach recommended');
    } else {
        console.log('\n🎯 Reduction needed for target achievement');
    }

    // Save results
    const outputPath = path.join(__dirname, '..', 'chapter-4-baseline-fixed.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`\nResults saved to: ${outputPath}`);

    return results;
}

if (require.main === module) {
    analyzeChapter4();
}

module.exports = { analyzeChapter4 };