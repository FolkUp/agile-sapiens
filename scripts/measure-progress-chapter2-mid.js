// Chapter 2 Editorial Polish - Mid-intervention Progress Check
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
    const current = analyzeText(content);

    // Load baseline for comparison
    const baselineData = JSON.parse(fs.readFileSync('./chapter-2-baseline-before.json', 'utf-8'));
    const baseline = baselineData.baseline;

    console.log('\n=== CHAPTER 2 MID-POLISH PROGRESS ===');
    console.log(`Date: ${new Date().toISOString().split('T')[0]}`);
    console.log('');
    console.log('BASELINE vs CURRENT:');
    console.log(`Sentences: ${baseline.sentences} → ${current.sentences} (${current.sentences - baseline.sentences > 0 ? '+' : ''}${current.sentences - baseline.sentences})`);
    console.log(`Words: ${baseline.words} → ${current.words} (${current.words - baseline.words > 0 ? '+' : ''}${current.words - baseline.words})`);
    console.log(`Avg Length: ${baseline.avgLength} → ${current.avgLength} w/s (${current.avgLength - baseline.avgLength > 0 ? '+' : ''}${(current.avgLength - baseline.avgLength).toFixed(2)})`);
    console.log(`Monotone: ${baseline.monotone}% → ${current.monotone}% (${current.monotone - baseline.monotone > 0 ? '+' : ''}${(current.monotone - baseline.monotone).toFixed(1)}pp)`);
    console.log('');
    console.log('PROGRESS TO TARGET:');
    console.log(`Target Monotone: 22-23%`);
    console.log(`Current: ${current.monotone}%`);
    console.log(`Remaining: ${(current.monotone - 23).toFixed(1)}pp to reach target`);
    console.log('');
    console.log('Length Distribution (current):');
    console.log(`  Very Short (≤6): ${current.distribution.veryShort}`);
    console.log(`  Short (7-12): ${current.distribution.short}`);
    console.log(`  Medium (13-20): ${current.distribution.medium}`);
    console.log(`  Long (21-30): ${current.distribution.long}`);
    console.log(`  Very Long (>30): ${current.distribution.veryLong}`);

    // Save progress record
    const progressRecord = {
        chapter: 2,
        phase: 'mid_polish',
        timestamp: new Date().toISOString(),
        baseline,
        current,
        target: { monotone: '22-23%' },
        progress: {
            monotoneReduction: baseline.monotone - current.monotone,
            wordIncrease: current.words - baseline.words,
            avgLengthIncrease: current.avgLength - baseline.avgLength
        }
    };

    fs.writeFileSync('./chapter-2-progress-mid.json',
                    JSON.stringify(progressRecord, null, 2));

    console.log('\nProgress saved to: chapter-2-progress-mid.json');

} catch (error) {
    console.error('Error analyzing Chapter 2 progress:', error.message);
}