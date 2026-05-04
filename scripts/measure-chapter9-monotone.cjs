const fs = require('fs');
const path = require('path');

function measureMonotone(text) {
    // Remove frontmatter
    const content = text.replace(/^---[\s\S]*?---/, '');

    // Split into sentences, filter out short ones and headers
    const sentences = content
        .split(/[.!?]+/)
        .filter(s => s.trim().length > 30)
        .filter(s => !s.trim().startsWith('#'))
        .filter(s => !s.trim().startsWith('>'))
        .filter(s => !s.trim().startsWith('¹'))
        .filter(s => !s.trim().startsWith('²'))
        .filter(s => !s.trim().startsWith('³'))
        .filter(s => !s.trim().startsWith('⁴'))
        .filter(s => !s.trim().startsWith('⁵'))
        .filter(s => !s.trim().startsWith('⁶'))
        .map(s => s.trim());

    if (sentences.length === 0) return { percentage: 0, metrics: {} };

    // Count sentences starting with same patterns
    let monotoneCount = 0;
    const startPatterns = {};

    sentences.forEach(sentence => {
        // Get first few words (normalize for comparison)
        const normalized = sentence
            .toLowerCase()
            .replace(/[«»""]/g, '"')
            .replace(/[—–]/g, '-')
            .replace(/\s+/g, ' ')
            .trim();

        const words = normalized.split(' ').slice(0, 3).join(' ');

        if (words.length > 0) {
            startPatterns[words] = (startPatterns[words] || 0) + 1;
        }
    });

    // Count repeated patterns (2 or more occurrences)
    for (const [pattern, count] of Object.entries(startPatterns)) {
        if (count >= 2) {
            monotoneCount += count;
        }
    }

    const percentage = (monotoneCount / sentences.length * 100);

    // Additional Chapter 9 metrics per Alpha recommendations
    const bilingualParentheticals = (content.match(/\([^)]*[а-яёА-ЯЁ][^)]*\)/g) || []).length;
    const duplicatePatterns = (content.match(/([а-яёА-ЯЁ\s]+)\s*\(\1\)/g) || []).length;
    const citationMarkers = (content.match(/[¹²³⁴⁵⁶⁷⁸⁹]/g) || []).length;
    const wordCount = content.split(/\s+/).filter(w => w.trim().length > 0).length;

    console.log(`Total sentences: ${sentences.length}`);
    console.log(`Monotone sentences: ${monotoneCount}`);
    console.log(`Monotone percentage: ${percentage.toFixed(1)}%`);
    console.log(`Word count: ${wordCount}`);
    console.log(`Bilingual parentheticals: ${bilingualParentheticals}`);
    console.log(`Russian duplicate patterns: ${duplicatePatterns}`);
    console.log(`Citation markers: ${citationMarkers}`);

    // Show top repeated patterns for debugging
    const sortedPatterns = Object.entries(startPatterns)
        .filter(([pattern, count]) => count >= 2)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10);

    if (sortedPatterns.length > 0) {
        console.log('\nTop repeated sentence starts:');
        sortedPatterns.forEach(([pattern, count]) => {
            console.log(`  "${pattern}..." x${count}`);
        });
    }

    return {
        percentage,
        metrics: {
            totalSentences: sentences.length,
            monotoneSentences: monotoneCount,
            wordCount,
            bilingualParentheticals,
            duplicatePatterns,
            citationMarkers
        }
    };
}

// Read the chapter file
const chapterPath = path.join(__dirname, '..', 'content', 'chapters', 'chapter-9-three-scenarios.md');
const content = fs.readFileSync(chapterPath, 'utf-8');

console.log('=== Chapter 9 Three Scenarios Analysis ===');
const result = measureMonotone(content);

// Save baseline metrics
const baselineData = {
    chapter: 9,
    title: "Three Scenarios",
    date: new Date().toISOString().split('T')[0],
    monotone_percentage: parseFloat(result.percentage.toFixed(1)),
    total_sentences: result.metrics.totalSentences,
    word_count: result.metrics.wordCount,
    bilingual_parentheticals: result.metrics.bilingualParentheticals,
    duplicate_patterns: result.metrics.duplicatePatterns,
    citation_markers: result.metrics.citationMarkers,
    measurement_type: "baseline",
    notes: "Vinge scenario framework baseline - strategic content with bilingual parenthetical pollution identified"
};

const baselinePath = path.join(__dirname, '..', 'chapter-9-baseline.json');
fs.writeFileSync(baselinePath, JSON.stringify(baselineData, null, 2));
console.log(`\nBaseline saved to: ${baselinePath}`);