#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function checkCitationCompleteness(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');

        // Extract content after frontmatter
        const contentAfterFrontmatter = content.replace(/^---[\s\S]*?---\n/, '');

        // Find all quotes (both block quotes and inline quotes)
        const blockQuotes = [...contentAfterFrontmatter.matchAll(/^>\s*["""»]([^"""»\n]+)["""»]/gm)];
        const inlineQuotes = [...contentAfterFrontmatter.matchAll(/["""»]([^"""»]{10,})["""»]/g)];

        // Find all citations
        const citations = [
            ...contentAfterFrontmatter.matchAll(/—\s*([А-ЯA-Z][^,\n]{5,}),?\s*["""»]?[^"""»]*["""»]?\s*\([^)]+\)/g),
            ...contentAfterFrontmatter.matchAll(/—\s*([А-ЯA-Z][^,\n]{5,})/g),
            ...contentAfterFrontmatter.matchAll(/\(([^)]{10,})\)/g)
        ];

        // Find footnote references
        const footnoteRefs = [...contentAfterFrontmatter.matchAll(/[⁰-⁹]+|¹|²|³|⁴|⁵|⁶|⁷|⁸|⁹/g)];

        // Find footnote definitions
        const footnoteDefinitions = [...contentAfterFrontmatter.matchAll(/^[⁰-⁹¹²³⁴⁵⁶⁷⁸⁹]+\s+/gm)];

        // Look for unattributed quotes (potential issues)
        const potentialUnattributed = [];
        const lines = contentAfterFrontmatter.split('\n');

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Check for quotes without attribution
            if (line.match(/^>\s*["""»]/) && !line.match(/—\s*[А-ЯA-Z]/) &&
                i + 1 < lines.length && !lines[i + 1].match(/^>\s*—/)) {
                potentialUnattributed.push({
                    line: i + 1,
                    text: line.substring(0, 60) + '...'
                });
            }
        }

        return {
            file: path.basename(filePath),
            totalQuotes: blockQuotes.length + inlineQuotes.length,
            citations: citations.length,
            footnoteRefs: footnoteRefs.length,
            footnoteDefinitions: footnoteDefinitions.length,
            potentialUnattributed: potentialUnattributed,
            citationRatio: blockQuotes.length > 0 ?
                (citations.length / blockQuotes.length * 100).toFixed(1) : 100
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

console.log('🏛️  AGILE SAPIENS — Citation Completeness Analysis');
console.log('================================================');
console.log('Target: All quotes attributed, complete footnote system');
console.log('');

let totalIssues = 0;

chapterFiles.forEach(file => {
    const filePath = path.join(chaptersDir, file);
    const result = checkCitationCompleteness(filePath);

    if (result.error) {
        console.log(`❌ ${file}: ERROR - ${result.error}`);
        totalIssues++;
    } else {
        const hasIssues = result.potentialUnattributed.length > 0;
        const status = hasIssues ? '⚠️' : '✅';
        if (hasIssues) totalIssues++;

        console.log(`${status} ${file}`);
        console.log(`   Quotes: ${result.totalQuotes} | Citations: ${result.citations} | Footnotes: ${result.footnoteRefs}/${result.footnoteDefinitions}`);

        if (result.potentialUnattributed.length > 0) {
            console.log(`   Potential unattributed quotes: ${result.potentialUnattributed.length}`);
            result.potentialUnattributed.slice(0, 2).forEach(item => {
                console.log(`     Line ${item.line}: ${item.text}`);
            });
        }
        console.log('');
    }
});

console.log('================================================');
console.log(`Citation Summary: ${chapterFiles.length - totalIssues}/${chapterFiles.length} chapters clean`);
console.log(`Status: ${totalIssues === 0 ? '✅ COMPLETE' : '⚠️ REVIEW NEEDED'}`);