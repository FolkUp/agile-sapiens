#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function measureMonoPercentage(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');

        // Extract content after frontmatter
        const contentAfterFrontmatter = content.replace(/^---[\s\S]*?---\n/, '');

        // Split into sentences - more sophisticated approach
        const sentences = contentAfterFrontmatter
            .split(/[.!?]+/)
            .filter(s => s.trim().length > 20)
            .map(s => s.trim());

        // Get first 15 characters of each sentence for comparison
        const sentenceStarts = sentences.map(s =>
            s.toLowerCase()
             .replace(/[^\w\sа-я]/g, ' ')  // Remove punctuation
             .replace(/\s+/g, ' ')         // Normalize whitespace
             .substring(0, 15)
             .trim()
        ).filter(s => s.length > 5);

        // Count occurrences
        const counts = {};
        sentenceStarts.forEach(start => {
            counts[start] = (counts[start] || 0) + 1;
        });

        // Calculate monotone sentences (repeated patterns)
        const monotoneCounts = Object.values(counts).filter(count => count > 1);
        const totalMonotone = monotoneCounts.reduce((sum, count) => sum + count, 0);
        const monoPercentage = sentences.length > 0 ?
            (totalMonotone / sentences.length * 100) : 0;

        return {
            file: path.basename(filePath),
            totalSentences: sentences.length,
            monotoneSentences: totalMonotone,
            monoPercentage: parseFloat(monoPercentage.toFixed(1)),
            repeatedPatterns: Object.entries(counts)
                .filter(([_, count]) => count > 1)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([pattern, count]) => `"${pattern}..." x${count}`)
        };
    } catch (error) {
        return {
            file: path.basename(filePath),
            error: error.message
        };
    }
}

const chaptersDir = 'content/chapters';
const chapterFiles = fs.readdirSync(chaptersDir)
    .filter(file => file.match(/^chapter-\d+.*\.md$/))
    .sort();

console.log('🏛️  AGILE SAPIENS — Comprehensive Mono% Analysis');
console.log('================================================');
console.log('Target: All chapters ≤25% mono percentage');
console.log('');

let totalCompliant = 0;
let totalChapters = 0;
const results = [];

chapterFiles.forEach(file => {
    const filePath = path.join(chaptersDir, file);
    const result = measureMonoPercentage(filePath);
    results.push(result);

    if (result.error) {
        console.log(`❌ ${file}: ERROR - ${result.error}`);
    } else {
        totalChapters++;
        const status = result.monoPercentage <= 25 ? '✅' : '❌';
        if (result.monoPercentage <= 25) totalCompliant++;

        console.log(`${status} ${file}`);
        console.log(`   Sentences: ${result.totalSentences} | Mono: ${result.monotoneSentences} | Mono%: ${result.monoPercentage}%`);

        if (result.repeatedPatterns.length > 0) {
            console.log(`   Top patterns: ${result.repeatedPatterns.slice(0, 3).join(', ')}`);
        }
        console.log('');
    }
});

console.log('================================================');
console.log(`Compliance Summary: ${totalCompliant}/${totalChapters} chapters ≤25%`);
console.log(`Overall Status: ${totalCompliant === totalChapters ? '✅ COMPLIANT' : '❌ NON-COMPLIANT'}`);

// Save detailed results
const reportPath = 'mono-percentage-report.json';
fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    target: '≤25%',
    compliantChapters: totalCompliant,
    totalChapters: totalChapters,
    overallCompliant: totalCompliant === totalChapters,
    results: results
}, null, 2));

console.log(`Report saved: ${reportPath}`);