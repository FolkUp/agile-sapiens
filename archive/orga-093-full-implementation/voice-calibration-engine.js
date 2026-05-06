// Voice Calibration Engine - McKinsey/HBR Standards
// ORGA-093 Phase 2.1 - Voice Consistency Automation
// Enhanced Alice v2.0 Level 3 Cartouche Autonome Operation

import fs from 'fs';

/**
 * Voice Calibration Engine
 * Real-time analysis and calibration suggestions for "McKinsey meets Harvard Business Review" voice standard
 * Provides actionable recommendations for professional, authoritative, and strategic communication
 */

class VoiceCalibrationEngine {
    constructor() {
        this.voiceStandards = this.initializeVoiceStandards();
        this.calibrationPatterns = this.initializeCalibrationPatterns();
        this.suggestionTemplates = this.initializeSuggestionTemplates();
    }

    /**
     * Initialize McKinsey/HBR voice standards framework
     */
    initializeVoiceStandards() {
        return {
            professionalAuthority: {
                weight: 0.3,
                description: "Evidence-backed statements with authoritative language",
                requiredElements: [
                    'evidence-based assertions',
                    'authoritative sourcing',
                    'confident recommendations',
                    'expert positioning'
                ],
                positiveMarkers: [
                    'evidence indicates', 'analysis shows', 'findings demonstrate',
                    'research confirms', 'assessment reveals', 'data suggests',
                    'investigation found', 'results indicate', 'studies show',
                    'proven approach', 'validated methodology', 'established practice'
                ],
                negativeMarkers: [
                    'i think', 'maybe', 'probably', 'might be',
                    'seems like', 'appears to', 'could be', 'possibly'
                ]
            },
            strategicClarity: {
                weight: 0.25,
                description: "Clear problem definition and actionable solutions",
                requiredElements: [
                    'clear problem statement',
                    'structured recommendations',
                    'defined action items',
                    'strategic priorities'
                ],
                positiveMarkers: [
                    'recommendation', 'next steps', 'action items', 'strategic priority',
                    'implementation plan', 'timeline', 'responsible party', 'deliverable',
                    'objective', 'goal', 'outcome', 'success criteria',
                    'key initiative', 'critical path', 'milestone'
                ],
                negativeMarkers: [
                    'we should probably', 'it would be nice', 'when we get around to',
                    'eventually', 'at some point', 'maybe we could'
                ]
            },
            analyticalRigor: {
                weight: 0.25,
                description: "Data-driven approach with multiple validation points",
                requiredElements: [
                    'multiple data sources',
                    'quantified metrics',
                    'comparative analysis',
                    'validation methods'
                ],
                positiveMarkers: [
                    'validated by', 'confirmed through', 'supported by evidence',
                    'cross-referenced', 'independently verified', 'measured against',
                    'benchmarked', 'quantified', 'metrics indicate', 'data shows',
                    'analysis of', 'comparison with', 'statistical significance'
                ],
                negativeMarkers: [
                    'trust me', 'obviously', 'everyone knows', 'it is clear',
                    'common sense', 'no need to verify'
                ]
            },
            executiveCommunication: {
                weight: 0.2,
                description: "Executive-level framing with business impact focus",
                requiredElements: [
                    'executive summary',
                    'business impact',
                    'strategic implications',
                    'stakeholder considerations'
                ],
                positiveMarkers: [
                    'executive summary', 'key findings', 'critical insights',
                    'strategic implications', 'business impact', 'organizational effect',
                    'stakeholder value', 'competitive advantage', 'market position',
                    'operational excellence', 'risk mitigation', 'growth opportunity'
                ],
                negativeMarkers: [
                    'technical details', 'implementation specifics', 'code changes',
                    'under the hood', 'nitty-gritty'
                ]
            }
        };
    }

    /**
     * Initialize calibration pattern detection
     */
    initializeCalibrationPatterns() {
        return {
            sentenceStructure: {
                tooLong: /[.!?][^.!?]{150,}/g,  // Sentences over 150 chars
                tooShort: /[.!?]\s*[A-Z][^.!?]{1,20}[.!?]/g,  // Very short sentences
                runOnSentences: /,\s*[^,]{50,},\s*[^,]{50,}/g
            },
            weakLanguage: {
                hedging: /\b(maybe|perhaps|possibly|might|could|seems|appears|probably)\b/gi,
                filler: /\b(basically|actually|literally|kind of|sort of|you know)\b/gi,
                uncertainty: /\b(i think|i believe|i feel|in my opinion|it seems)\b/gi
            },
            strongLanguage: {
                action: /\b(implement|execute|deliver|achieve|establish|develop|create)\b/gi,
                authority: /\b(demonstrates|indicates|confirms|validates|establishes|proves)\b/gi,
                strategic: /\b(strategic|critical|essential|fundamental|key|priority)\b/gi
            },
            executiveLanguage: {
                impact: /\b(impact|effect|influence|consequence|result|outcome)\b/gi,
                value: /\b(value|benefit|advantage|opportunity|efficiency|optimization)\b/gi,
                business: /\b(business|organizational|operational|strategic|competitive)\b/gi
            }
        };
    }

    /**
     * Initialize suggestion templates for calibration recommendations
     */
    initializeSuggestionTemplates() {
        return {
            professionalAuthority: {
                weakEvidence: {
                    template: "Replace '{original}' with evidence-based language like '{suggestion}'",
                    suggestions: [
                        { from: 'i think', to: 'analysis indicates' },
                        { from: 'maybe', to: 'evidence suggests' },
                        { from: 'probably', to: 'findings demonstrate' },
                        { from: 'seems like', to: 'assessment reveals' }
                    ]
                },
                strengthenAssertions: {
                    template: "Strengthen assertion by adding: '{suggestion}'",
                    suggestions: [
                        'Based on comprehensive analysis,',
                        'Evidence from multiple sources confirms',
                        'Independent validation demonstrates',
                        'Rigorous assessment indicates'
                    ]
                }
            },
            strategicClarity: {
                vagueRecommendations: {
                    template: "Make recommendation more specific: '{original}' → '{suggestion}'",
                    suggestions: [
                        { from: 'should improve', to: 'implement targeted improvements by [date] with [specific metrics]' },
                        { from: 'need to fix', to: 'execute remediation plan addressing [specific issues] within [timeline]' },
                        { from: 'would be better', to: 'strategic priority requires [specific action] to achieve [measurable outcome]' }
                    ]
                },
                addActionability: {
                    template: "Add concrete action items: {suggestion}",
                    suggestions: [
                        'Next Steps: [Specific action] by [date] with [responsible party]',
                        'Implementation Timeline: Phase 1 [actions], Phase 2 [actions]',
                        'Success Criteria: Achieve [metric] through [method] by [deadline]'
                    ]
                }
            },
            analyticalRigor: {
                addValidation: {
                    template: "Strengthen with validation: '{suggestion}'",
                    suggestions: [
                        'Cross-validated against [comparative standard]',
                        'Independently verified through [method]',
                        'Supported by evidence from [multiple sources]',
                        'Confirmed by [quantitative measure]'
                    ]
                },
                quantifyResults: {
                    template: "Add quantification: '{suggestion}'",
                    suggestions: [
                        'Measured improvement of [X]% in [metric]',
                        'Baseline comparison shows [specific delta]',
                        'Statistical analysis indicates [confidence level]',
                        'Benchmarked against [industry standard] with [result]'
                    ]
                }
            },
            executiveCommunication: {
                addBusinessContext: {
                    template: "Frame business impact: '{suggestion}'",
                    suggestions: [
                        'Strategic impact on [business objective]',
                        'Organizational benefit through [specific value]',
                        'Competitive advantage via [differentiation]',
                        'Risk mitigation for [specific threat]'
                    ]
                },
                executiveSummary: {
                    template: "Add executive framing: '{suggestion}'",
                    suggestions: [
                        'Key Finding: [Primary insight with business relevance]',
                        'Strategic Recommendation: [Action with organizational impact]',
                        'Critical Success Factor: [Essential element for achievement]',
                        'Business Case: [Value proposition with measurable benefit]'
                    ]
                }
            }
        };
    }

    /**
     * Main calibration analysis method
     * @param {string} content - Text to analyze and calibrate
     * @param {string} tier - 'premium' or 'standard' for different calibration levels
     * @returns {Object} Calibration analysis and suggestions
     */
    calibrateVoice(content, tier = 'standard') {
        const analysis = this.analyzeVoiceProfile(content);
        const violations = this.detectVoiceViolations(content);
        const suggestions = this.generateCalibrationSuggestions(content, analysis, violations, tier);
        const score = this.calculateVoiceScore(analysis, tier);

        return {
            overallScore: score.overall,
            tierCompliance: score.tierCompliance,
            voiceProfile: analysis,
            violations: violations,
            suggestions: suggestions,
            calibrationSummary: this.generateCalibrationSummary(score, suggestions, tier),
            realTimeFeedback: this.generateRealTimeFeedback(violations, suggestions)
        };
    }

    /**
     * Analyze voice profile against McKinsey/HBR standards
     */
    analyzeVoiceProfile(content) {
        const profile = {};

        Object.entries(this.voiceStandards).forEach(([dimension, standard]) => {
            const positiveMatches = this.countMatches(content, standard.positiveMarkers);
            const negativeMatches = this.countMatches(content, standard.negativeMarkers);

            const sentences = content.split(/[.!?]+/).length;
            const positiveScore = positiveMatches / Math.max(sentences, 1);
            const negativeScore = negativeMatches / Math.max(sentences, 1);

            profile[dimension] = {
                positiveScore,
                negativeScore,
                netScore: Math.max(0, positiveScore - (negativeScore * 2)), // Negative markers weighted heavier
                markerCount: {
                    positive: positiveMatches,
                    negative: negativeMatches
                },
                examples: {
                    positive: this.findExamples(content, standard.positiveMarkers, 3),
                    negative: this.findExamples(content, standard.negativeMarkers, 3)
                }
            };
        });

        return profile;
    }

    /**
     * Detect specific voice violations with context
     */
    detectVoiceViolations(content) {
        const violations = {};

        Object.entries(this.calibrationPatterns).forEach(([category, patterns]) => {
            violations[category] = {};

            Object.entries(patterns).forEach(([type, pattern]) => {
                const matches = content.match(pattern) || [];
                violations[category][type] = {
                    count: matches.length,
                    examples: matches.slice(0, 5), // First 5 examples
                    severity: this.assessViolationSeverity(matches.length, content.length)
                };
            });
        });

        return violations;
    }

    /**
     * Generate specific calibration suggestions
     */
    generateCalibrationSuggestions(content, analysis, violations, tier) {
        const suggestions = {
            immediate: [],      // Critical fixes for tier compliance
            recommended: [],    // Quality improvements
            strategic: []       // Advanced voice refinements
        };

        const thresholds = tier === 'premium' ? { immediate: 0.6, recommended: 0.8 } : { immediate: 0.4, recommended: 0.6 };

        // Analyze each voice dimension
        Object.entries(analysis).forEach(([dimension, data]) => {
            const templates = this.suggestionTemplates[dimension];

            if (data.netScore < thresholds.immediate) {
                suggestions.immediate.push({
                    dimension,
                    type: 'CRITICAL',
                    issue: `${dimension} score (${(data.netScore * 100).toFixed(1)}%) below tier minimum`,
                    suggestion: this.generateSpecificSuggestion(dimension, data, templates, 'critical'),
                    priority: 'P1'
                });
            } else if (data.netScore < thresholds.recommended) {
                suggestions.recommended.push({
                    dimension,
                    type: 'IMPROVEMENT',
                    issue: `${dimension} can be strengthened`,
                    suggestion: this.generateSpecificSuggestion(dimension, data, templates, 'improvement'),
                    priority: 'P2'
                });
            }
        });

        // Add violation-specific suggestions
        this.addViolationSuggestions(violations, suggestions);

        // Add strategic suggestions for high-performing content
        if (tier === 'premium') {
            this.addStrategicSuggestions(analysis, suggestions);
        }

        return suggestions;
    }

    /**
     * Generate specific contextual suggestions
     */
    generateSpecificSuggestion(dimension, data, templates, level) {
        const suggestions = [];

        // Address negative markers first
        if (data.negativeScore > 0 && templates) {
            data.examples.negative.forEach(example => {
                Object.values(templates).forEach(template => {
                    if (template.suggestions) {
                        const matchingSuggestion = template.suggestions.find(s =>
                            example.toLowerCase().includes(s.from)
                        );
                        if (matchingSuggestion) {
                            suggestions.push(template.template
                                .replace('{original}', example)
                                .replace('{suggestion}', matchingSuggestion.to)
                            );
                        }
                    }
                });
            });
        }

        // Add dimension-specific suggestions
        if (templates && level === 'critical') {
            Object.values(templates).forEach(template => {
                if (template.suggestions && typeof template.suggestions[0] === 'string') {
                    suggestions.push(template.template.replace('{suggestion}',
                        template.suggestions[Math.floor(Math.random() * template.suggestions.length)]
                    ));
                }
            });
        }

        return suggestions.slice(0, 3); // Max 3 suggestions per dimension
    }

    /**
     * Add violation-specific suggestions
     */
    addViolationSuggestions(violations, suggestions) {
        // Sentence structure violations
        if (violations.sentenceStructure) {
            if (violations.sentenceStructure.tooLong.count > 0) {
                suggestions.immediate.push({
                    type: 'STRUCTURE',
                    issue: `${violations.sentenceStructure.tooLong.count} overly long sentences detected`,
                    suggestion: 'Break long sentences (>150 characters) into 2-3 shorter, clearer statements',
                    priority: 'P1'
                });
            }

            if (violations.sentenceStructure.runOnSentences.count > 0) {
                suggestions.recommended.push({
                    type: 'STRUCTURE',
                    issue: 'Run-on sentences reduce clarity',
                    suggestion: 'Simplify complex sentences by using periods instead of commas',
                    priority: 'P2'
                });
            }
        }

        // Weak language violations
        if (violations.weakLanguage) {
            ['hedging', 'filler', 'uncertainty'].forEach(type => {
                if (violations.weakLanguage[type].count > 0) {
                    suggestions.immediate.push({
                        type: 'LANGUAGE',
                        issue: `${violations.weakLanguage[type].count} instances of ${type} language`,
                        suggestion: `Replace ${type} words with confident, authoritative language`,
                        priority: 'P1',
                        examples: violations.weakLanguage[type].examples.slice(0, 3)
                    });
                }
            });
        }
    }

    /**
     * Add strategic suggestions for advanced voice refinement
     */
    addStrategicSuggestions(analysis, suggestions) {
        // Look for opportunities to elevate voice to executive level
        const executiveScore = analysis.executiveCommunication.netScore;
        const strategicScore = analysis.strategicClarity.netScore;

        if (executiveScore > 0.7 && strategicScore > 0.7) {
            suggestions.strategic.push({
                type: 'EXECUTIVE_ENHANCEMENT',
                issue: 'Strong foundation for executive-level communication',
                suggestion: 'Consider adding quantified business impact metrics and competitive positioning',
                priority: 'P3'
            });
        }

        if (analysis.analyticalRigor.netScore > 0.8) {
            suggestions.strategic.push({
                type: 'THOUGHT_LEADERSHIP',
                issue: 'High analytical rigor detected',
                suggestion: 'Elevate to thought leadership by adding industry implications and future trends',
                priority: 'P3'
            });
        }
    }

    /**
     * Calculate voice score with tier-specific requirements
     */
    calculateVoiceScore(analysis, tier) {
        const weights = Object.fromEntries(
            Object.entries(this.voiceStandards).map(([key, standard]) => [key, standard.weight])
        );

        const dimensionScores = Object.fromEntries(
            Object.entries(analysis).map(([key, data]) => [key, data.netScore])
        );

        const overall = Object.entries(weights).reduce((sum, [dimension, weight]) => {
            return sum + (dimensionScores[dimension] || 0) * weight;
        }, 0);

        const thresholds = tier === 'premium' ?
            { excellent: 0.8, good: 0.6, acceptable: 0.4 } :
            { excellent: 0.7, good: 0.5, acceptable: 0.3 };

        let tierCompliance;
        if (overall >= thresholds.excellent) tierCompliance = 'EXCEEDS';
        else if (overall >= thresholds.good) tierCompliance = 'MEETS';
        else if (overall >= thresholds.acceptable) tierCompliance = 'APPROACHING';
        else tierCompliance = 'BELOW';

        return {
            overall,
            dimensionScores,
            tierCompliance,
            tier,
            recommendations: this.getScoreBasedRecommendations(overall, tier, dimensionScores)
        };
    }

    /**
     * Generate calibration summary for quick review
     */
    generateCalibrationSummary(score, suggestions, tier) {
        const critical = suggestions.immediate.length;
        const recommended = suggestions.recommended.length;

        return {
            overallAssessment: `Voice calibration: ${score.tierCompliance} ${tier} tier standards (${(score.overall * 100).toFixed(1)}%)`,
            urgentActions: critical,
            improvementOpportunities: recommended,
            readiness: critical === 0 ? 'READY' : 'NEEDS_ATTENTION',
            nextSteps: critical > 0 ?
                `Address ${critical} critical voice issues before publication` :
                `Consider ${recommended} improvement opportunities for enhanced impact`
        };
    }

    /**
     * Generate real-time feedback for interactive calibration
     */
    generateRealTimeFeedback(violations, suggestions) {
        const feedback = [];

        // Immediate feedback for critical issues
        suggestions.immediate.forEach(suggestion => {
            feedback.push({
                type: 'warning',
                message: suggestion.suggestion,
                context: suggestion.issue,
                urgency: 'high'
            });
        });

        // Positive reinforcement for good practices
        feedback.push({
            type: 'info',
            message: 'Voice calibration analysis complete. Review suggestions for McKinsey/HBR alignment.',
            urgency: 'normal'
        });

        return feedback;
    }

    // Utility methods
    countMatches(content, markers) {
        const contentLower = content.toLowerCase();
        return markers.reduce((count, marker) => {
            const regex = new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            return count + (contentLower.match(regex) || []).length;
        }, 0);
    }

    findExamples(content, markers, limit = 3) {
        const examples = [];
        const sentences = content.split(/[.!?]+/);

        markers.forEach(marker => {
            const regex = new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
            sentences.forEach(sentence => {
                if (regex.test(sentence.trim()) && examples.length < limit) {
                    examples.push(sentence.trim());
                }
            });
        });

        return examples.slice(0, limit);
    }

    assessViolationSeverity(count, contentLength) {
        const ratio = count / (contentLength / 1000); // Per 1000 characters
        if (ratio > 0.1) return 'HIGH';
        if (ratio > 0.05) return 'MEDIUM';
        return 'LOW';
    }

    getScoreBasedRecommendations(score, tier, dimensionScores) {
        const recommendations = [];

        if (score < (tier === 'premium' ? 0.6 : 0.4)) {
            recommendations.push('Focus on evidence-based language and authoritative positioning');
        }

        const weakestDimension = Object.entries(dimensionScores)
            .sort(([,a], [,b]) => a - b)[0];

        if (weakestDimension) {
            recommendations.push(`Prioritize improvement in ${weakestDimension[0].replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        }

        return recommendations;
    }
}

// CLI Interface
if (process.argv.length > 2) {
    const engine = new VoiceCalibrationEngine();
    const filePath = process.argv[2];
    const tier = process.argv[3] || 'standard';

    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const calibration = engine.calibrateVoice(content, tier);

        console.log('\n=== VOICE CALIBRATION ENGINE RESULTS ===');
        console.log(`Date: ${new Date().toISOString().split('T')[0]}`);
        console.log(`File: ${filePath}`);
        console.log(`Tier: ${tier.toUpperCase()}`);

        console.log(`\nOverall Score: ${(calibration.overallScore * 100).toFixed(1)}%`);
        console.log(`Tier Compliance: ${calibration.tierCompliance}`);
        console.log(`Readiness: ${calibration.calibrationSummary.readiness}`);

        console.log('\nVoice Profile:');
        Object.entries(calibration.voiceProfile).forEach(([dimension, data]) => {
            console.log(`  ${dimension}: ${(data.netScore * 100).toFixed(1)}% (${data.markerCount.positive}+ / ${data.markerCount.negative}-)`);
        });

        if (calibration.suggestions.immediate.length > 0) {
            console.log('\nCritical Voice Adjustments Required:');
            calibration.suggestions.immediate.forEach((suggestion, i) => {
                console.log(`  ${i + 1}. ${suggestion.issue}`);
                console.log(`     → ${suggestion.suggestion}`);
            });
        }

        if (calibration.suggestions.recommended.length > 0) {
            console.log('\nRecommended Voice Improvements:');
            calibration.suggestions.recommended.forEach((suggestion, i) => {
                console.log(`  ${i + 1}. ${suggestion.suggestion}`);
            });
        }

        console.log(`\n${calibration.calibrationSummary.nextSteps}`);
        console.log(`\n✅ Voice calibration complete - ${calibration.calibrationSummary.overallAssessment}`);

    } catch (error) {
        console.error('❌ Voice calibration failed:', error.message);
    }
}

export default VoiceCalibrationEngine;