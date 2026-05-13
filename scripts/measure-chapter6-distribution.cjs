#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to count words in a sentence
function countWords(text) {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

// Function to clean sentence text
function cleanSentence(text) {
    // Remove markdown formatting
    text = text.replace(/\*\*(.*?)\*\*/g, '$1'); // bold
    text = text.replace(/\*(.*?)\*/g, '$1'); // italic
    text = text.replace(/[¹²³⁴⁵⁶⁷⁸⁹⁰ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡ]+/g, ''); // footnotes
    text = text.replace(/[—–]/g, ' '); // dashes to spaces
    return text.trim();
}

// Function to analyze sentence distribution
function analyzeSentenceDistribution(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Split into sentences by sentence endings
    const sentences = content
        .split(/[.!?]+/)
        .map(s => s.trim())
        .filter(s => {
            // Skip empty, very short, headers, metadata, quotes
            if (!s || s.length < 10) return false;
            if (s.startsWith('---')) return false;
            if (s.startsWith('> ')) return false;
            if (/^[A-Za-z0-9\s:]+$/.test(s) && s.length < 30) return false; // likely header
            return true;
        });

    const extraLong = []; // 26+ words
    const long = []; // 16-25 words
    const medium = []; // 11-15 words
    const short = []; // ≤10 words

    sentences.forEach((sentence, index) => {
        const cleaned = cleanSentence(sentence);
        const wordCount = countWords(cleaned);

        if (wordCount >= 26) {
            extraLong.push({ text: sentence, words: wordCount, index });
        } else if (wordCount >= 16) {
            long.push({ text: sentence, words: wordCount, index });
        } else if (wordCount >= 11) {
            medium.push({ text: sentence, words: wordCount, index });
        } else {
            short.push({ text: sentence, words: wordCount, index });
        }
    });

    return { extraLong, long, medium, short };
}

// Main execution
const filePath = path.join(__dirname, '../content/chapters/chapter-6-jekyll-hyde.md');

try {
    const analysis = analyzeSentenceDistribution(filePath);

    console.log('=== CHAPTER 6 SENTENCE DISTRIBUTION ANALYSIS ===\n');

    const totalSentences = analysis.extraLong.length + analysis.long.length +
                          analysis.medium.length + analysis.short.length;

    console.log('CURRENT METRICS:');
    console.log(`Total sentences: ${totalSentences}`);
    console.log(`Extra-long (26+ words): ${analysis.extraLong.length} (${(analysis.extraLong.length/totalSentences*100).toFixed(1)}%)`);
    console.log(`Long (16-25 words): ${analysis.long.length} (${(analysis.long.length/totalSentences*100).toFixed(1)}%)`);
    console.log(`Medium (11-15 words): ${analysis.medium.length} (${(analysis.medium.length/totalSentences*100).toFixed(1)}%)`);
    console.log(`Short (≤10 words): ${analysis.short.length} (${(analysis.short.length/totalSentences*100).toFixed(1)}%)`);

    console.log('\nTARGET vs CURRENT:');
    console.log(`Extra-long: ${analysis.extraLong.length} → TARGET: <12 (need to reduce ${Math.max(0, analysis.extraLong.length - 12)})`);
    console.log(`Medium: ${analysis.medium.length} → TARGET: 96-108 (need to add ${Math.max(0, 96 - analysis.medium.length)})`);

    console.log('\n=== EXTRA-LONG SENTENCES TO BREAK DOWN ===\n');

    analysis.extraLong.forEach((item, index) => {
        console.log(`${index + 1}. [${item.words} words]`);
        console.log(`   ${item.text.substring(0, 100)}...`);
        console.log('');
    });

} catch (error) {
    console.error('Error analyzing file:', error.message);
    process.exit(1);
}