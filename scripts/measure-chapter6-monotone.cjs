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

    if (sentences.length === 0) return 0;

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

    console.log(`Total sentences: ${sentences.length}`);
    console.log(`Monotone sentences: ${monotoneCount}`);
    console.log(`Monotone percentage: ${percentage.toFixed(1)}%`);

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

    return percentage;
}

// Read the chapter file
const chapterPath = path.join(__dirname, '..', 'content', 'chapters', 'chapter-6-jekyll-hyde.md');
const content = fs.readFileSync(chapterPath, 'utf-8');

console.log('=== Chapter 6 Jekyll-Hyde Monotone Analysis ===');
const monotonePercentage = measureMonotone(content);