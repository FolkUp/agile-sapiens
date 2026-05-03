// Chapter 2 Editorial Polish - Final Results
// AGIL-133 Phase 2 - Sequential Editorial Excellence

import fs from 'fs';

function analyzeText(text) {
    // Remove frontmatter and footnotes section for sentence analysis
    const lines = text.split('\n');
    let contentStart = 0;
    let contentEnd = lines.length;

    // Find content boundaries
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] === '---' && contentStart === 0) {
            let j = i + 1;
            while (j < lines.length && lines[j] !== '---') j++;
            if (j < lines.length) contentStart = j + 1;
        }
        if (lines[i].startsWith('**Footnotes:**')) {
            contentEnd = i;
            break;
        }
    }

    const content = lines.slice(contentStart, contentEnd).join(' ');

    // Extract sentences (handling ellipses and abbreviations)
    const sentences = content
        .replace(/\s+/g, ' ')
        .replace(/([.!?]+)\s*([А-ЯA-Z])/g, '$1|$2')
        .split('|')
        .filter(s => s.trim().length > 5)
        .map(s => s.trim());

    // Analyze sentence patterns
    const analysis = {
        totalSentences: sentences.length,
        totalWords: content.split(/\s+/).filter(w => w.length > 0).length,
        sentenceLengths: sentences.map(s => s.split(/\s+/).length),
        avgWordsPerSentence: 0
    };

    analysis.avgWordsPerSentence =
        analysis.totalWords / analysis.totalSentences;

    // Categorize sentences by length (monotone detection)
    const lengthCategories = {
        veryShort: analysis.sentenceLengths.filter(l => l <= 6).length,
        short: analysis.sentenceLengths.filter(l => l >= 7 && l <= 12).length,
        medium: analysis.sentenceLengths.filter(l => l >= 13 && l <= 20).length,
        long: analysis.sentenceLengths.filter(l => l >= 21 && l <= 30).length,
        veryLong: analysis.sentenceLengths.filter(l => l > 30).length
    };

    // Calculate monotone percentage (dominance of short sentences)
    const monotoneScore = (lengthCategories.veryShort + lengthCategories.short) /
                         analysis.totalSentences * 100;

    return {
        sentences: analysis.totalSentences,
        words: analysis.totalWords,
        avgLength: Math.round(analysis.avgWordsPerSentence * 100) / 100,
        monotone: Math.round(monotoneScore * 10) / 10,
        distribution: lengthCategories
    };
}

try {
    const filePath = 'C:/JOHNDOE_CLAUDE/agile-sapiens/content/chapters/chapter-2-frankenstein.md';
    const content = fs.readFileSync(filePath, 'utf-8');
    const final = analyzeText(content);

    // Load baseline for comparison
    const baselineData = JSON.parse(fs.readFileSync('./chapter-2-baseline-before.json', 'utf-8'));
    const baseline = baselineData.baseline;

    console.log('\n=== CHAPTER 2 EDITORIAL POLISH COMPLETE ===');
    console.log(`Date: ${new Date().toISOString().split('T')[0]}`);
    console.log('');
    console.log('TRANSFORMATION RESULTS:');
    console.log(`Sentences: ${baseline.sentences} → ${final.sentences} (${final.sentences - baseline.sentences > 0 ? '+' : ''}${final.sentences - baseline.sentences})`);
    console.log(`Words: ${baseline.words} → ${final.words} (${final.words - baseline.words > 0 ? '+' : ''}${final.words - baseline.words})`);
    console.log(`Avg Length: ${baseline.avgLength} → ${final.avgLength} w/s (${final.avgLength - baseline.avgLength > 0 ? '+' : ''}${(final.avgLength - baseline.avgLength).toFixed(2)})`);
    console.log(`Monotone: ${baseline.monotone}% → ${final.monotone}% (${final.monotone - baseline.monotone > 0 ? '+' : ''}${(final.monotone - baseline.monotone).toFixed(1)}pp)`);
    console.log('');
    console.log('TARGET ACHIEVEMENT:');
    console.log(`Target Monotone Range: 22-23%`);
    console.log(`Final Result: ${final.monotone}%`);
    console.log(`Status: ${final.monotone >= 22 && final.monotone <= 23 ? '✅ TARGET ACHIEVED' : final.monotone < 30 ? '🔄 SIGNIFICANT PROGRESS' : '❌ NEEDS MORE WORK'}`);
    console.log(`Improvement: ${(baseline.monotone - final.monotone).toFixed(1)} percentage points`);
    console.log('');
    console.log('DISTRIBUTION ANALYSIS:');
    console.log('Before → After:');
    console.log(`  Very Short (≤6): ${baseline.distribution.veryShort} → ${final.distribution.veryShort} (${final.distribution.veryShort - baseline.distribution.veryShort > 0 ? '+' : ''}${final.distribution.veryShort - baseline.distribution.veryShort})`);
    console.log(`  Short (7-12): ${baseline.distribution.short} → ${final.distribution.short} (${final.distribution.short - baseline.distribution.short > 0 ? '+' : ''}${final.distribution.short - baseline.distribution.short})`);
    console.log(`  Medium (13-20): ${baseline.distribution.medium} → ${final.distribution.medium} (${final.distribution.medium - baseline.distribution.medium > 0 ? '+' : ''}${final.distribution.medium - baseline.distribution.medium})`);
    console.log(`  Long (21-30): ${baseline.distribution.long} → ${final.distribution.long} (${final.distribution.long - baseline.distribution.long > 0 ? '+' : ''}${final.distribution.long - baseline.distribution.long})`);
    console.log(`  Very Long (>30): ${baseline.distribution.veryLong} → ${final.distribution.veryLong} (${final.distribution.veryLong - baseline.distribution.veryLong > 0 ? '+' : ''}${final.distribution.veryLong - baseline.distribution.veryLong})`);

    // Quality metrics
    const qualityScore = {
        monotoneImprovement: baseline.monotone - final.monotone,
        avgLengthIncrease: final.avgLength - baseline.avgLength,
        wordEnrichment: ((final.words - baseline.words) / baseline.words) * 100
    };

    console.log('');
    console.log('QUALITY METRICS:');
    console.log(`Monotone Reduction: ${qualityScore.monotoneImprovement.toFixed(1)}pp`);
    console.log(`Avg Length Increase: +${qualityScore.avgLengthIncrease.toFixed(2)} words/sentence`);
    console.log(`Content Enrichment: +${qualityScore.wordEnrichment.toFixed(1)}%`);

    // Save final results
    const finalResults = {
        chapter: 2,
        phase: 'final_polish',
        timestamp: new Date().toISOString(),
        baseline,
        final,
        target: { monotone: '22-23%' },
        achievement: {
            targetMet: final.monotone >= 22 && final.monotone <= 23,
            improvement: baseline.monotone - final.monotone,
            qualityScore
        }
    };

    fs.writeFileSync('./chapter-2-final-results.json',
                    JSON.stringify(finalResults, null, 2));

    console.log('\nFinal results saved to: chapter-2-final-results.json');

} catch (error) {
    console.error('Error analyzing Chapter 2 final results:', error.message);
}