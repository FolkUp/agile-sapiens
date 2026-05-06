// Template Compliance Validation System
// ORGA-093 Phase 1.3 - Quality Framework Implementation
// Enhanced Alice v2.0 Level 3 Cartouche Autonome Operation

import fs from 'fs';
import path from 'path';

/**
 * Template Compliance Validation System
 * Validates investigation documents against Premium and Standard tier requirements
 * Provides automatic tier transition recommendations
 * Integrates with existing editorial automation infrastructure
 */

class TemplateComplianceValidator {
    constructor() {
        this.constitutionalTriggers = [
            'security', 'vulnerability', 'threat', 'breach',
            'infrastructure', 'p0', 'critical', 'emergency',
            'constitutional', 'banking-level', 'multi-expert'
        ];

        this.qualityMetrics = {
            premium: {
                minSources: 2,
                expertPanelRequired: true,
                alphaBaseBetaRequired: true,
                auditTrailRequired: true,
                constitutionalCompliance: true
            },
            standard: {
                minSources: 1,
                expertPanelRequired: false,
                alphaBaseBetaRequired: false,
                auditTrailRequired: false,
                constitutionalCompliance: false
            }
        };
    }

    /**
     * Validates investigation document against template compliance
     * @param {string} filePath - Path to investigation document
     * @param {string} expectedTier - 'premium' or 'standard'
     * @returns {Object} Validation results and recommendations
     */
    async validateDocument(filePath, expectedTier = null) {
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const analysis = this.analyzeDocument(content);
            const tierAssessment = this.assessRequiredTier(content, analysis);
            const compliance = this.checkTemplateCompliance(analysis, tierAssessment.requiredTier);
            const qualityGates = await this.runQualityGates(content, tierAssessment.requiredTier);

            return {
                filePath,
                analysis,
                tierAssessment,
                compliance,
                qualityGates,
                recommendations: this.generateRecommendations(analysis, tierAssessment, compliance),
                escalationRequired: tierAssessment.escalationRequired,
                overallStatus: this.calculateOverallStatus(compliance, qualityGates)
            };
        } catch (error) {
            return {
                error: true,
                message: `Validation failed: ${error.message}`,
                filePath
            };
        }
    }

    /**
     * Analyzes document structure and content
     */
    analyzeDocument(content) {
        const lines = content.split('\n');
        const sections = this.identifySections(lines);

        return {
            hasTitle: this.hasValidTitle(lines),
            hasAuthority: this.hasAuthorityStatement(content),
            hasTierDeclaration: this.hasTierDeclaration(content),
            sections,
            sourceCount: this.countSources(content),
            hasEvidence: this.hasEvidenceSection(content),
            hasExpertPanel: this.hasExpertPanelSection(content),
            hasAuditTrail: this.hasAuditTrailSection(content),
            hasConstitutionalAssessment: this.hasConstitutionalAssessment(content),
            hasAlphaBeta: this.hasAlphaBetaProtocol(content),
            wordCount: content.split(/\s+/).length,
            checklistItems: this.countChecklistItems(content),
            completedItems: this.countCompletedItems(content)
        };
    }

    /**
     * Assesses which tier level is required based on content analysis
     */
    assessRequiredTier(content, analysis) {
        const contentLower = content.toLowerCase();
        let escalationTriggers = [];
        let constitutionalTriggers = [];

        // Check for constitutional framework triggers
        this.constitutionalTriggers.forEach(trigger => {
            if (contentLower.includes(trigger)) {
                constitutionalTriggers.push(trigger);
            }
        });

        // Check for priority level indicators
        const priorityPatterns = [
            { pattern: /p0|priority.*0|critical|emergency/i, level: 'P0' },
            { pattern: /p1|priority.*1|high.*priority/i, level: 'P1' }
        ];

        const priorityLevel = priorityPatterns.find(p => p.pattern.test(content))?.level || 'P2+';

        // Check for multi-expert requirements
        const multiExpertIndicators = [
            'multi-expert', 'expert panel', 'coordination', 'consensus',
            'conflict resolution', 'disagreement', 'multiple domains'
        ];

        const hasMultiExpert = multiExpertIndicators.some(indicator =>
            contentLower.includes(indicator)
        );

        // Determine required tier
        const requiresPremium = constitutionalTriggers.length > 0 ||
                               priorityLevel === 'P0' ||
                               priorityLevel === 'P1' ||
                               hasMultiExpert;

        if (requiresPremium) {
            escalationTriggers = [
                ...constitutionalTriggers.map(t => `Constitutional trigger: ${t}`),
                ...(priorityLevel === 'P0' ? ['Critical priority level (P0)'] : []),
                ...(priorityLevel === 'P1' ? ['High priority level (P1)'] : []),
                ...(hasMultiExpert ? ['Multi-expert coordination required'] : [])
            ];
        }

        return {
            requiredTier: requiresPremium ? 'premium' : 'standard',
            escalationRequired: requiresPremium,
            escalationTriggers,
            priorityLevel,
            constitutionalTriggersFound: constitutionalTriggers,
            riskAssessment: this.assessRisk(content, analysis)
        };
    }

    /**
     * Checks compliance with template requirements
     */
    checkTemplateCompliance(analysis, requiredTier) {
        const requirements = this.qualityMetrics[requiredTier];

        const compliance = {
            tier: requiredTier,
            structuralCompliance: {
                hasValidStructure: analysis.hasTitle && analysis.hasAuthority,
                hasTierDeclaration: analysis.hasTierDeclaration,
                hasRequiredSections: this.validateRequiredSections(analysis.sections, requiredTier),
                score: 0
            },
            contentCompliance: {
                sufficientSources: analysis.sourceCount >= requirements.minSources,
                expertPanelCompliance: requirements.expertPanelRequired ? analysis.hasExpertPanel : true,
                evidenceDocumentation: requirements.auditTrailRequired ? analysis.hasAuditTrail : analysis.hasEvidence,
                constitutionalCompliance: requirements.constitutionalCompliance ? analysis.hasConstitutionalAssessment : true,
                alphaBetaCompliance: requirements.alphaBaseBetaRequired ? analysis.hasAlphaBeta : true,
                score: 0
            },
            qualityCompliance: {
                checklistCompleteness: analysis.checklistItems > 0 ? (analysis.completedItems / analysis.checklistItems) : 0,
                documentLength: this.assessDocumentLength(analysis.wordCount, requiredTier),
                professionalStandard: true, // Will be validated by quality gates
                score: 0
            }
        };

        // Calculate scores
        compliance.structuralCompliance.score = this.calculateStructuralScore(compliance.structuralCompliance);
        compliance.contentCompliance.score = this.calculateContentScore(compliance.contentCompliance);
        compliance.qualityCompliance.score = this.calculateQualityScore(compliance.qualityCompliance);

        compliance.overallScore = (
            compliance.structuralCompliance.score * 0.3 +
            compliance.contentCompliance.score * 0.5 +
            compliance.qualityCompliance.score * 0.2
        );

        return compliance;
    }

    /**
     * Runs quality gates using existing editorial automation
     */
    async runQualityGates(content, requiredTier) {
        const results = {
            sentenceMetrics: null,
            citationCompliance: null,
            voiceConsistency: null,
            constitutionalFramework: null
        };

        try {
            // Integration with sentence-metrics.cjs (if available)
            if (fs.existsSync('./sentence-metrics.cjs')) {
                results.sentenceMetrics = await this.runSentenceMetrics(content);
            }

            // Integration with citation-compliance.cjs (if available)
            if (fs.existsSync('./citation-compliance.cjs')) {
                results.citationCompliance = await this.runCitationCompliance(content);
            }

            // Voice consistency validation
            results.voiceConsistency = this.validateVoiceConsistency(content, requiredTier);

            // Constitutional framework validation (for premium tier)
            if (requiredTier === 'premium') {
                results.constitutionalFramework = this.validateConstitutionalFramework(content);
            }

        } catch (error) {
            results.error = `Quality gates execution failed: ${error.message}`;
        }

        return results;
    }

    /**
     * Validates voice consistency against McKinsey/HBR standards
     */
    validateVoiceConsistency(content, requiredTier) {
        const voiceMarkers = {
            professionalAuthority: [
                'evidence indicates', 'analysis shows', 'findings demonstrate',
                'research confirms', 'assessment reveals'
            ],
            strategicClarity: [
                'recommendation', 'next steps', 'action items',
                'priority', 'timeline', 'responsible party'
            ],
            analyticalRigor: [
                'validated by', 'confirmed through', 'supported by evidence',
                'cross-referenced', 'independently verified'
            ],
            executiveCommunication: [
                'executive summary', 'key findings', 'critical insights',
                'strategic implications', 'business impact'
            ]
        };

        const contentLower = content.toLowerCase();
        const voiceScore = {};

        Object.entries(voiceMarkers).forEach(([category, markers]) => {
            const foundMarkers = markers.filter(marker => contentLower.includes(marker));
            voiceScore[category] = {
                found: foundMarkers.length,
                total: markers.length,
                score: foundMarkers.length / markers.length,
                examples: foundMarkers
            };
        });

        const overallVoiceScore = Object.values(voiceScore)
            .reduce((sum, cat) => sum + cat.score, 0) / Object.keys(voiceScore).length;

        return {
            overallScore: overallVoiceScore,
            categoryScores: voiceScore,
            meetsStandard: overallVoiceScore >= (requiredTier === 'premium' ? 0.7 : 0.5),
            recommendations: this.generateVoiceRecommendations(voiceScore, requiredTier)
        };
    }

    /**
     * Validates constitutional framework compliance (Premium tier)
     */
    validateConstitutionalFramework(content) {
        const frameworkElements = [
            'alpha verification',
            'beta verification',
            'evidence-first methodology',
            'banking-level standards',
            'expert panel',
            'audit trail',
            'rollback procedures'
        ];

        const contentLower = content.toLowerCase();
        const foundElements = frameworkElements.filter(element =>
            contentLower.includes(element)
        );

        return {
            requiredElements: frameworkElements,
            foundElements,
            missingElements: frameworkElements.filter(el => !foundElements.includes(el)),
            complianceScore: foundElements.length / frameworkElements.length,
            isCompliant: foundElements.length >= Math.ceil(frameworkElements.length * 0.8)
        };
    }

    /**
     * Generates actionable recommendations
     */
    generateRecommendations(analysis, tierAssessment, compliance) {
        const recommendations = {
            immediate: [],
            structural: [],
            quality: [],
            escalation: []
        };

        // Tier escalation recommendations
        if (tierAssessment.escalationRequired && tierAssessment.requiredTier === 'premium') {
            recommendations.escalation.push({
                action: 'Upgrade to Premium Tier Template',
                reason: tierAssessment.escalationTriggers.join(', '),
                priority: 'P0',
                effort: 'High'
            });
        }

        // Structural improvements
        if (compliance.structuralCompliance.score < 0.8) {
            if (!analysis.hasTitle) {
                recommendations.structural.push({
                    action: 'Add proper investigation title with tier designation',
                    priority: 'P1',
                    effort: 'Low'
                });
            }
            if (!analysis.hasAuthority) {
                recommendations.structural.push({
                    action: 'Add authority statement with Enhanced Alice v2.0 Level 3',
                    priority: 'P1',
                    effort: 'Low'
                });
            }
        }

        // Content compliance improvements
        if (compliance.contentCompliance.score < 0.8) {
            const requirements = this.qualityMetrics[tierAssessment.requiredTier];

            if (analysis.sourceCount < requirements.minSources) {
                recommendations.immediate.push({
                    action: `Add ${requirements.minSources - analysis.sourceCount} additional authoritative source(s)`,
                    priority: 'P1',
                    effort: 'Medium'
                });
            }

            if (requirements.expertPanelRequired && !analysis.hasExpertPanel) {
                recommendations.immediate.push({
                    action: 'Add expert panel coordination section',
                    priority: 'P0',
                    effort: 'High'
                });
            }
        }

        // Quality improvements
        if (compliance.qualityCompliance.score < 0.7) {
            recommendations.quality.push({
                action: 'Complete remaining checklist items',
                priority: 'P2',
                effort: 'Medium'
            });
        }

        return recommendations;
    }

    // Helper methods for document analysis
    identifySections(lines) {
        const sections = [];
        lines.forEach((line, index) => {
            if (line.match(/^#{1,6}\s+/)) {
                sections.push({
                    level: (line.match(/^#+/) || [''])[0].length,
                    title: line.replace(/^#+\s*/, ''),
                    lineNumber: index + 1
                });
            }
        });
        return sections;
    }

    hasValidTitle(lines) {
        return lines.some(line => line.match(/^#\s+.*Investigation.*Template/i));
    }

    hasAuthorityStatement(content) {
        return content.includes('Enhanced Alice v2.0 Level 3') ||
               content.includes('Authority:');
    }

    hasTierDeclaration(content) {
        return content.includes('Tier:') ||
               content.includes('Premium') ||
               content.includes('Standard');
    }

    countSources(content) {
        const sourcePatterns = [
            /\*\*Source\*\*:/gi,
            /\[.*?\]\(.*?\)/g,  // Markdown links
            /https?:\/\/\S+/g,   // URLs
            /doi:\s*\S+/gi      // DOI references
        ];

        let sourceCount = 0;
        sourcePatterns.forEach(pattern => {
            const matches = content.match(pattern) || [];
            sourceCount += matches.length;
        });

        return sourceCount;
    }

    hasEvidenceSection(content) {
        return /evidence|findings|documentation/i.test(content);
    }

    hasExpertPanelSection(content) {
        return /expert.*panel|multi.*expert|expert.*coordination/i.test(content);
    }

    hasAuditTrailSection(content) {
        return /audit.*trail|investigation.*log|documentation.*archive/i.test(content);
    }

    hasConstitutionalAssessment(content) {
        return /constitutional.*assessment|constitutional.*framework|banking.*level/i.test(content);
    }

    hasAlphaBetaProtocol(content) {
        return /alpha.*verification|beta.*verification|hostile.*review/i.test(content);
    }

    countChecklistItems(content) {
        return (content.match(/- \[ \]/g) || []).length;
    }

    countCompletedItems(content) {
        return (content.match(/- \[x\]/gi) || []).length;
    }

    assessRisk(content, analysis) {
        const riskIndicators = ['critical', 'security', 'vulnerability', 'failure', 'breach'];
        const contentLower = content.toLowerCase();
        const foundIndicators = riskIndicators.filter(indicator =>
            contentLower.includes(indicator)
        );

        if (foundIndicators.length >= 3) return 'HIGH';
        if (foundIndicators.length >= 1) return 'MEDIUM';
        return 'LOW';
    }

    validateRequiredSections(sections, tier) {
        const requiredSections = {
            standard: ['setup', 'planning', 'execution', 'results'],
            premium: ['constitutional', 'alpha', 'beta', 'delivery', 'audit']
        };

        const required = requiredSections[tier] || requiredSections.standard;
        const sectionTitles = sections.map(s => s.title.toLowerCase());

        return required.every(req =>
            sectionTitles.some(title => title.includes(req))
        );
    }

    assessDocumentLength(wordCount, tier) {
        const minWords = tier === 'premium' ? 1500 : 800;
        const maxWords = tier === 'premium' ? 5000 : 2500;

        if (wordCount < minWords) return 'TOO_SHORT';
        if (wordCount > maxWords) return 'TOO_LONG';
        return 'APPROPRIATE';
    }

    calculateStructuralScore(structural) {
        const weights = { hasValidStructure: 0.4, hasTierDeclaration: 0.3, hasRequiredSections: 0.3 };
        return Object.entries(weights).reduce((score, [key, weight]) =>
            score + (structural[key] ? weight : 0), 0
        );
    }

    calculateContentScore(content) {
        const weights = {
            sufficientSources: 0.25,
            expertPanelCompliance: 0.25,
            evidenceDocumentation: 0.25,
            constitutionalCompliance: 0.15,
            alphaBetaCompliance: 0.1
        };
        return Object.entries(weights).reduce((score, [key, weight]) =>
            score + (content[key] ? weight : 0), 0
        );
    }

    calculateQualityScore(quality) {
        const weights = { checklistCompleteness: 0.4, documentLength: 0.3, professionalStandard: 0.3 };
        return weights.checklistCompleteness * quality.checklistCompleteness +
               (quality.documentLength === 'APPROPRIATE' ? weights.documentLength : 0) +
               (quality.professionalStandard ? weights.professionalStandard : 0);
    }

    calculateOverallStatus(compliance, qualityGates) {
        if (compliance.overallScore >= 0.9) return 'EXCELLENT';
        if (compliance.overallScore >= 0.8) return 'GOOD';
        if (compliance.overallScore >= 0.7) return 'ACCEPTABLE';
        return 'NEEDS_IMPROVEMENT';
    }

    generateVoiceRecommendations(voiceScore, tier) {
        const recommendations = [];
        const threshold = tier === 'premium' ? 0.7 : 0.5;

        Object.entries(voiceScore).forEach(([category, data]) => {
            if (data.score < threshold) {
                recommendations.push(`Improve ${category}: add more ${category.replace(/([A-Z])/g, ' $1').toLowerCase()} markers`);
            }
        });

        return recommendations;
    }

    // Placeholder methods for existing tool integration
    async runSentenceMetrics(content) {
        // Integration point for existing sentence-metrics.cjs
        return { available: false, message: 'sentence-metrics.cjs integration pending' };
    }

    async runCitationCompliance(content) {
        // Integration point for existing citation-compliance.cjs
        return { available: false, message: 'citation-compliance.cjs integration pending' };
    }
}

// CLI Interface
if (process.argv.length > 2) {
    const validator = new TemplateComplianceValidator();
    const filePath = process.argv[2];
    const expectedTier = process.argv[3] || null;

    validator.validateDocument(filePath, expectedTier).then(result => {
        console.log('\n=== TEMPLATE COMPLIANCE VALIDATION RESULTS ===');
        console.log(`Date: ${new Date().toISOString().split('T')[0]}`);
        console.log(`File: ${result.filePath}`);

        if (result.error) {
            console.log(`❌ Error: ${result.message}`);
            return;
        }

        console.log(`\nTier Assessment: ${result.tierAssessment.requiredTier.toUpperCase()}`);
        if (result.escalationRequired) {
            console.log(`⚠️  Escalation Required: ${result.tierAssessment.escalationTriggers.join(', ')}`);
        }

        console.log(`\nCompliance Score: ${(result.compliance.overallScore * 100).toFixed(1)}%`);
        console.log(`Overall Status: ${result.overallStatus}`);

        console.log('\nCompliance Breakdown:');
        console.log(`  Structural: ${(result.compliance.structuralCompliance.score * 100).toFixed(1)}%`);
        console.log(`  Content: ${(result.compliance.contentCompliance.score * 100).toFixed(1)}%`);
        console.log(`  Quality: ${(result.compliance.qualityCompliance.score * 100).toFixed(1)}%`);

        if (result.recommendations.immediate.length > 0) {
            console.log('\nImmediate Actions Required:');
            result.recommendations.immediate.forEach((rec, i) => {
                console.log(`  ${i + 1}. ${rec.action} (${rec.priority})`);
            });
        }

        if (result.recommendations.escalation.length > 0) {
            console.log('\nEscalation Required:');
            result.recommendations.escalation.forEach((rec, i) => {
                console.log(`  ${i + 1}. ${rec.action} - ${rec.reason}`);
            });
        }

        console.log(`\n✅ Validation complete - Status: ${result.overallStatus}`);
    }).catch(error => {
        console.error('❌ Validation failed:', error.message);
    });
}

export default TemplateComplianceValidator;