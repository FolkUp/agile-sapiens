// Simple Investigation Validator
// ORGA-093 MVP Implementation - Enhanced Alice v2.0 Level 3
// Simplified from 600+ lines to essential functionality

import fs from 'fs';

/**
 * Simple Investigation Validator
 * Basic template compliance checking without constitutional framework overhead
 */

class SimpleInvestigationValidator {
    constructor() {
        this.tierRequirements = {
            standard: {
                requiredSections: ['planning', 'execution', 'results'],
                minSources: 1,
                checklistCompletion: 0.6
            },
            premium: {
                requiredSections: ['planning', 'execution', 'results', 'evidence'],
                minSources: 2,
                checklistCompletion: 0.8
            }
        };
    }

    /**
     * Validate investigation document
     * @param {string} filePath - Path to investigation document
     * @returns {Object} Validation results
     */
    validateDocument(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const tier = this.detectTier(content);
            const analysis = this.analyzeDocument(content);
            const compliance = this.checkCompliance(analysis, tier);

            return {
                filePath,
                tier,
                isValid: compliance.passed,
                score: compliance.score,
                completedItems: analysis.completedItems,
                totalItems: analysis.totalItems,
                missingRequirements: compliance.missing,
                suggestions: this.generateSuggestions(compliance, tier)
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
     * Detect document tier based on content
     */
    detectTier(content) {
        const premiumIndicators = [
            'expert panel', 'constitutional', 'banking-level',
            'alpha verification', 'multiple sources', 'audit trail'
        ];

        const contentLower = content.toLowerCase();
        const foundIndicators = premiumIndicators.filter(indicator =>
            contentLower.includes(indicator)
        );

        return foundIndicators.length >= 2 ? 'premium' : 'standard';
    }

    /**
     * Analyze document structure and content
     */
    analyzeDocument(content) {
        // Extract sections
        const sections = this.extractSections(content);

        // Count checklist items
        const totalItems = (content.match(/- \[ \]/g) || []).length +
                          (content.match(/- \[x\]/gi) || []).length;
        const completedItems = (content.match(/- \[x\]/gi) || []).length;

        // Count sources
        const sources = this.countSources(content);

        // Check for required elements
        const hasEvidence = /evidence|source|reference/i.test(content);
        const hasFindings = /findings?|results?|conclusion/i.test(content);
        const hasRecommendations = /recommendation|next steps|action/i.test(content);

        return {
            sections,
            totalItems,
            completedItems,
            sources,
            hasEvidence,
            hasFindings,
            hasRecommendations
        };
    }

    /**
     * Extract document sections
     */
    extractSections(content) {
        const sections = [];
        const lines = content.split('\n');

        lines.forEach(line => {
            const match = line.match(/^#{1,3}\s+(.+)/);
            if (match) {
                sections.push(match[1].toLowerCase());
            }
        });

        return sections;
    }

    /**
     * Count evidence sources
     */
    countSources(content) {
        let sourceCount = 0;

        // Count various source indicators
        sourceCount += (content.match(/\*\*Source\*\*:/gi) || []).length;
        sourceCount += (content.match(/\[.*?\]\(.*?\)/g) || []).length; // Markdown links
        sourceCount += (content.match(/https?:\/\/\S+/g) || []).length; // URLs
        sourceCount += (content.match(/reference:|citation:|source:/gi) || []).length;

        return sourceCount;
    }

    /**
     * Check compliance against tier requirements
     */
    checkCompliance(analysis, tier) {
        const requirements = this.tierRequirements[tier];
        const missing = [];
        let score = 0;
        let totalChecks = 0;

        // Check required sections
        const foundSections = requirements.requiredSections.filter(section =>
            analysis.sections.some(s => s.includes(section))
        );

        if (foundSections.length < requirements.requiredSections.length) {
            const missingSections = requirements.requiredSections.filter(section =>
                !analysis.sections.some(s => s.includes(section))
            );
            missing.push(`Missing sections: ${missingSections.join(', ')}`);
        }
        score += foundSections.length / requirements.requiredSections.length * 40;
        totalChecks += 40;

        // Check sources
        if (analysis.sources < requirements.minSources) {
            missing.push(`Need ${requirements.minSources - analysis.sources} more sources`);
        }
        score += Math.min(analysis.sources / requirements.minSources, 1) * 30;
        totalChecks += 30;

        // Check checklist completion
        const completionRate = analysis.totalItems > 0 ?
            analysis.completedItems / analysis.totalItems : 1;

        if (completionRate < requirements.checklistCompletion) {
            missing.push(`Complete ${Math.ceil((requirements.checklistCompletion - completionRate) * analysis.totalItems)} more checklist items`);
        }
        score += Math.min(completionRate / requirements.checklistCompletion, 1) * 30;
        totalChecks += 30;

        return {
            passed: missing.length === 0,
            score: Math.round(score),
            missing
        };
    }

    /**
     * Generate improvement suggestions
     */
    generateSuggestions(compliance, tier) {
        const suggestions = [];

        if (!compliance.passed) {
            suggestions.push(`Document needs work to meet ${tier} tier requirements`);
            compliance.missing.forEach(issue => {
                if (issue.includes('sections')) {
                    suggestions.push('Add missing sections using template structure');
                } else if (issue.includes('sources')) {
                    suggestions.push('Add authoritative sources for evidence');
                } else if (issue.includes('checklist')) {
                    suggestions.push('Complete remaining checklist items');
                }
            });
        } else {
            suggestions.push(`✅ Document meets ${tier} tier requirements`);
            if (tier === 'standard' && compliance.score > 85) {
                suggestions.push('Consider upgrading to premium tier for enhanced quality');
            }
        }

        return suggestions;
    }
}

// CLI Interface
if (process.argv.length > 2) {
    const validator = new SimpleInvestigationValidator();
    const filePath = process.argv[2];

    const result = validator.validateDocument(filePath);

    console.log('\n=== SIMPLE INVESTIGATION VALIDATOR ===');
    console.log(`File: ${result.filePath || filePath}`);

    if (result.error) {
        console.log(`❌ Error: ${result.message}`);
        process.exit(1);
    }

    console.log(`Tier: ${result.tier.toUpperCase()}`);
    console.log(`Status: ${result.isValid ? '✅ VALID' : '⚠️  NEEDS WORK'}`);
    console.log(`Score: ${result.score}/100`);

    if (result.totalItems > 0) {
        console.log(`Checklist: ${result.completedItems}/${result.totalItems} completed (${Math.round(result.completedItems/result.totalItems*100)}%)`);
    }

    if (result.missingRequirements.length > 0) {
        console.log('\nMissing Requirements:');
        result.missingRequirements.forEach((req, i) => {
            console.log(`  ${i + 1}. ${req}`);
        });
    }

    console.log('\nSuggestions:');
    result.suggestions.forEach((suggestion, i) => {
        console.log(`  ${i + 1}. ${suggestion}`);
    });

    console.log(`\n${result.isValid ? '✅' : '❌'} Validation complete`);
    process.exit(result.isValid ? 0 : 1);
}

export default SimpleInvestigationValidator;