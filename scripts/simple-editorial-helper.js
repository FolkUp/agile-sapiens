// Simple Editorial Helper
// ORGA-093 MVP Implementation - Enhanced Alice v2.0 Level 3
// Simplified from 698-line editorial-review-automation.js to essential functionality

import fs from 'fs';

/**
 * Simple Editorial Helper
 * Basic editorial quality checks without constitutional framework overhead
 */
class SimpleEditorialHelper {
    constructor() {
        this.qualityChecks = {
            readability: {
                maxSentenceLength: 25,
                maxParagraphLength: 5,
                targetReadingLevel: 'professional'
            },
            structure: {
                requiredSections: ['introduction', 'main', 'conclusion'],
                minWordCount: 100,
                maxWordCount: 5000
            },
            style: {
                formalityLevel: 'professional',
                voiceConsistency: true,
                toneAppropriate: true
            }
        };
    }

    /**
     * Analyze document for editorial quality
     * @param {string} filePath - Path to document
     * @returns {Object} Analysis results
     */
    analyzeDocument(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const analysis = this.performAnalysis(content);
            const suggestions = this.generateSuggestions(analysis);

            return {
                filePath,
                wordCount: analysis.wordCount,
                sentenceCount: analysis.sentenceCount,
                paragraphCount: analysis.paragraphCount,
                readabilityScore: analysis.readabilityScore,
                structureScore: analysis.structureScore,
                overallScore: analysis.overallScore,
                issues: analysis.issues,
                suggestions
            };

        } catch (error) {
            return {
                error: true,
                message: error.message,
                filePath
            };
        }
    }

    /**
     * Perform basic document analysis
     */
    performAnalysis(content) {
        const words = this.countWords(content);
        const sentences = this.countSentences(content);
        const paragraphs = this.countParagraphs(content);
        const longSentences = this.findLongSentences(content);
        const longParagraphs = this.findLongParagraphs(content);
        const structureIssues = this.checkStructure(content);

        const readabilityScore = this.calculateReadabilityScore(longSentences, sentences);
        const structureScore = this.calculateStructureScore(structureIssues, words);
        const overallScore = Math.round((readabilityScore + structureScore) / 2);

        const issues = [
            ...longSentences.map(s => `Long sentence (${s.length} words): "${s.text.substring(0, 50)}..."`),
            ...longParagraphs.map(p => `Long paragraph (${p.sentences} sentences)`),
            ...structureIssues
        ];

        return {
            wordCount: words,
            sentenceCount: sentences,
            paragraphCount: paragraphs,
            readabilityScore,
            structureScore,
            overallScore,
            issues
        };
    }

    /**
     * Count words in content
     */
    countWords(content) {
        return content.trim().split(/\s+/).filter(word => word.length > 0).length;
    }

    /**
     * Count sentences in content
     */
    countSentences(content) {
        return (content.match(/[.!?]+/g) || []).length;
    }

    /**
     * Count paragraphs in content
     */
    countParagraphs(content) {
        return content.split(/\n\s*\n/).filter(para => para.trim().length > 0).length;
    }

    /**
     * Find sentences longer than threshold
     */
    findLongSentences(content) {
        const sentences = content.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
        return sentences
            .map(sentence => ({
                text: sentence,
                length: sentence.split(/\s+/).length
            }))
            .filter(s => s.length > this.qualityChecks.readability.maxSentenceLength);
    }

    /**
     * Find paragraphs with too many sentences
     */
    findLongParagraphs(content) {
        const paragraphs = content.split(/\n\s*\n/).filter(para => para.trim().length > 0);
        return paragraphs
            .map(para => ({
                text: para,
                sentences: (para.match(/[.!?]+/g) || []).length
            }))
            .filter(p => p.sentences > this.qualityChecks.readability.maxParagraphLength);
    }

    /**
     * Check document structure
     */
    checkStructure(content) {
        const issues = [];
        const wordCount = this.countWords(content);

        // Check word count
        if (wordCount < this.qualityChecks.structure.minWordCount) {
            issues.push(`Document too short (${wordCount} words, minimum ${this.qualityChecks.structure.minWordCount})`);
        }
        if (wordCount > this.qualityChecks.structure.maxWordCount) {
            issues.push(`Document too long (${wordCount} words, maximum ${this.qualityChecks.structure.maxWordCount})`);
        }

        // Check for basic structure elements
        const hasIntroduction = /^#.*introduction|^##.*introduction/mi.test(content);
        const hasConclusion = /conclusion|summary|wrap.up/mi.test(content);

        if (!hasIntroduction) {
            issues.push('Missing clear introduction section');
        }
        if (!hasConclusion) {
            issues.push('Missing conclusion or summary section');
        }

        return issues;
    }

    /**
     * Calculate readability score
     */
    calculateReadabilityScore(longSentences, totalSentences) {
        if (totalSentences === 0) return 0;
        const readabilityRatio = 1 - (longSentences.length / totalSentences);
        return Math.round(readabilityRatio * 100);
    }

    /**
     * Calculate structure score
     */
    calculateStructureScore(structureIssues, wordCount) {
        let score = 100;
        score -= structureIssues.length * 20; // -20 points per structure issue
        return Math.max(0, score);
    }

    /**
     * Generate improvement suggestions
     */
    generateSuggestions(analysis) {
        const suggestions = [];

        if (analysis.readabilityScore < 70) {
            suggestions.push('Break down long sentences for better readability');
            suggestions.push('Aim for 15-20 words per sentence maximum');
        }

        if (analysis.structureScore < 80) {
            suggestions.push('Improve document structure with clear sections');
            suggestions.push('Add introduction and conclusion sections');
        }

        if (analysis.overallScore >= 80) {
            suggestions.push('✅ Document meets basic editorial standards');
        } else if (analysis.overallScore >= 60) {
            suggestions.push('Document needs minor editorial improvements');
        } else {
            suggestions.push('Document requires significant editorial revision');
        }

        return suggestions;
    }
}

// CLI Interface
if (process.argv.length > 2) {
    const helper = new SimpleEditorialHelper();
    const filePath = process.argv[2];

    const result = helper.analyzeDocument(filePath);

    console.log('\n=== SIMPLE EDITORIAL HELPER ===');
    console.log(`File: ${result.filePath || filePath}`);

    if (result.error) {
        console.log(`❌ Error: ${result.message}`);
        process.exit(1);
    }

    console.log(`Word count: ${result.wordCount}`);
    console.log(`Sentences: ${result.sentenceCount}`);
    console.log(`Paragraphs: ${result.paragraphCount}`);
    console.log(`Overall score: ${result.overallScore}/100`);

    if (result.issues.length > 0) {
        console.log('\nIssues Found:');
        result.issues.forEach((issue, i) => {
            console.log(`  ${i + 1}. ${issue}`);
        });
    }

    console.log('\nSuggestions:');
    result.suggestions.forEach((suggestion, i) => {
        console.log(`  ${i + 1}. ${suggestion}`);
    });

    console.log(`\n${result.overallScore >= 80 ? '✅' : '📝'} Analysis complete`);
    process.exit(0);
}

export default SimpleEditorialHelper;