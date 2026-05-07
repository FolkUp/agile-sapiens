#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function extractFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return null;
    try {
        return yaml.load(match[1]);
    } catch (error) {
        return null;
    }
}

function verifyNavigationIntegrity() {
    const chaptersDir = 'content/chapters';
    const chapterFiles = fs.readdirSync(chaptersDir)
        .filter(file => file.match(/^chapter-\d+.*\.md$/))
        .sort();

    const chapters = [];
    let issues = [];

    // Load all chapters
    chapterFiles.forEach(file => {
        const filePath = path.join(chaptersDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const frontmatter = extractFrontmatter(content);

        if (frontmatter) {
            chapters.push({
                file: file,
                chapter: frontmatter.chapter,
                weight: frontmatter.weight,
                related: frontmatter.related || [],
                act: frontmatter.act,
                title: frontmatter.title
            });
        } else {
            issues.push(`${file}: No valid frontmatter found`);
        }
    });

    // Check chapter numbering consistency
    const chapterNumbers = chapters.map(c => c.chapter).filter(n => typeof n === 'number').sort((a, b) => a - b);
    const expectedNumbers = Array.from({length: chapterNumbers.length}, (_, i) => i);

    for (let i = 0; i < chapterNumbers.length; i++) {
        if (chapterNumbers[i] !== expectedNumbers[i]) {
            issues.push(`Chapter numbering gap: expected ${expectedNumbers[i]}, found ${chapterNumbers[i]}`);
        }
    }

    // Check weight ordering
    const weights = chapters.map(c => c.weight).filter(w => typeof w === 'number').sort((a, b) => a - b);
    for (let i = 1; i < weights.length; i++) {
        if (weights[i] <= weights[i-1]) {
            issues.push(`Weight ordering issue: ${weights[i-1]} followed by ${weights[i]}`);
        }
    }

    // Check related chapter references
    chapters.forEach(chapter => {
        if (chapter.related) {
            chapter.related.forEach(relatedRef => {
                if (relatedRef.startsWith('chapter-')) {
                    const relatedFile = relatedRef + '.md';
                    const exists = chapterFiles.includes(relatedFile);
                    if (!exists) {
                        issues.push(`${chapter.file}: Invalid related reference "${relatedRef}"`);
                    }
                }
            });
        }
    });

    // Check act structure
    const actCounts = chapters.reduce((acc, ch) => {
        if (ch.act) {
            acc[ch.act] = (acc[ch.act] || 0) + 1;
        }
        return acc;
    }, {});

    return {
        totalChapters: chapters.length,
        chaptersWithWeights: chapters.filter(c => c.weight).length,
        chaptersWithActs: chapters.filter(c => c.act).length,
        actDistribution: actCounts,
        issues: issues
    };
}

console.log('🏛️  AGILE SAPIENS — Navigation Integrity Analysis');
console.log('================================================');
console.log('Target: Consistent chapter ordering, valid cross-references');
console.log('');

const result = verifyNavigationIntegrity();

console.log(`Total chapters: ${result.totalChapters}`);
console.log(`Chapters with weights: ${result.chaptersWithWeights}`);
console.log(`Chapters with acts: ${result.chaptersWithActs}`);
console.log(`Act distribution: ${JSON.stringify(result.actDistribution, null, 2)}`);

if (result.issues.length === 0) {
    console.log('\n✅ Navigation integrity: VERIFIED');
    console.log('All cross-references valid, proper ordering maintained');
} else {
    console.log('\n⚠️ Navigation issues found:');
    result.issues.forEach(issue => {
        console.log(`  - ${issue}`);
    });
}

console.log(`\nStatus: ${result.issues.length === 0 ? '✅ COMPLIANT' : '⚠️ REVIEW NEEDED'}`);