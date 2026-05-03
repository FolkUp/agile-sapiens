// Chapter 2 Editorial Polish - Pre-intervention Baseline
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
    const baseline = analyzeText(content);

    console.log('\n=== CHAPTER 2 PRE-INTERVENTION BASELINE ===');
    console.log(`Date: ${new Date().toISOString().split('T')[0]}`);
    console.log(`Target: Reduce monotone from ${baseline.monotone}% to 22-23%`);
    console.log('');
    console.log(`Sentences: ${baseline.sentences}`);
    console.log(`Words: ${baseline.words}`);
    console.log(`Avg Length: ${baseline.avgLength} w/s`);
    console.log(`Monotone: ${baseline.monotone}% (short ≤12 words)`);
    console.log('');
    console.log('Length Distribution:');
    console.log(`  Very Short (≤6): ${baseline.distribution.veryShort}`);
    console.log(`  Short (7-12): ${baseline.distribution.short}`);
    console.log(`  Medium (13-20): ${baseline.distribution.medium}`);
    console.log(`  Long (21-30): ${baseline.distribution.long}`);
    console.log(`  Very Long (>30): ${baseline.distribution.veryLong}`);

    // Save baseline as JSON for commit evidence
    const baselineRecord = {
        chapter: 2,
        phase: 'before_polish',
        timestamp: new Date().toISOString(),
        baseline,
        target: { monotone: '22-23%', improvement: '-3.5 to -4.5pp' }
    };

    fs.writeFileSync('./chapter-2-baseline-before.json',
                    JSON.stringify(baselineRecord, null, 2));

    console.log('\nBaseline saved to: chapter-2-baseline-before.json');

} catch (error) {
    console.error('Error analyzing Chapter 2:', error.message);
}