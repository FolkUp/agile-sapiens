#!/usr/bin/env node

/**
 * AGILE SAPIENS Phantom Detection Quality Gates
 * Enhanced Alice v2.0 L3 Cartouche Autonome Operation
 * Constitutional Excellence: Phantom Evidence Prevention
 *
 * Hostile Verification Framework:
 * 1. Quality Gate Bypass Detection
 * 2. Phantom Metrics Identification
 * 3. Evidence Chain Validation
 * 4. Constitutional Compliance Protection
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PhantomDetectionGates {
    constructor() {
        this.projectRoot = path.resolve(__dirname, '..');
        this.suspiciousPatterns = {
            // Phantom optimization claims
            phantom_optimization: [
                /\d+% optimization/i,
                /\d+% improvement/i,
                /significantly optimized/i,
                /greatly improved/i,
                /enhanced performance/i
            ],
            // Phantom measurements
            phantom_measurements: [
                /baseline.*improved/i,
                /\d+% faster/i,
                /\d+x speedup/i,
                /optimized by \d+/i
            ],
            // Phantom infrastructure claims
            phantom_infrastructure: [
                /infrastructure gaps.*resolved/i,
                /\d+% infrastructure/i,
                /automated deployment/i,
                /production ready/i
            ],
            // Phantom quality claims
            phantom_quality: [
                /quality improved/i,
                /excellence achieved/i,
                /standards upgraded/i,
                /framework optimized/i
            ]
        };

        this.results = {
            timestamp: new Date().toISOString(),
            status: 'SCANNING',
            phantom_alerts: [],
            evidence_gaps: [],
            bypass_attempts: [],
            constitutional_violations: [],
            hostile_findings: {}
        };

        console.log('👻 PHANTOM DETECTION QUALITY GATES');
        console.log('===================================');
        console.log('Enhanced Alice v2.0 L3 Hostile Verification');
        console.log('Constitutional Excellence: Phantom Evidence Prevention');
        console.log('');
    }

    async runPhantomDetection() {
        try {
            console.log('🔍 [SCAN 1] Quality Gate Bypass Detection...');
            await this.detectQualityGateBypasses();

            console.log('\n👻 [SCAN 2] Phantom Metrics Identification...');
            await this.identifyPhantomMetrics();

            console.log('\n🔗 [SCAN 3] Evidence Chain Validation...');
            await this.validateEvidenceChains();

            console.log('\n🏛️  [SCAN 4] Constitutional Compliance Protection...');
            await this.protectConstitutionalCompliance();

            console.log('\n⚔️  [SCAN 5] Hostile Verification Analysis...');
            await this.performHostileVerification();

            this.results.status = this.calculateThreatLevel();
            await this.generatePhantomReport();

            const phantomCount = this.results.phantom_alerts.length;
            const evidenceGaps = this.results.evidence_gaps.length;
            const bypassAttempts = this.results.bypass_attempts.length;

            console.log(`\n🎯 Threat Assessment: ${this.results.status}`);
            console.log(`👻 Phantom Alerts: ${phantomCount}`);
            console.log(`🔍 Evidence Gaps: ${evidenceGaps}`);
            console.log(`⚠️  Bypass Attempts: ${bypassAttempts}`);

            return this.results.status === 'SECURE';

        } catch (error) {
            this.results.status = 'SCAN_FAILED';
            this.results.phantom_alerts.push({
                type: 'CRITICAL_SCAN_FAILURE',
                message: error.message,
                location: 'phantom-detection-gates.js',
                risk_level: 'HIGH'
            });
            await this.generatePhantomReport();
            throw error;
        }
    }

    async detectQualityGateBypasses() {
        // Scan for attempts to bypass quality gates
        const bypassIndicators = [
            // Skip pattern indicators
            { pattern: /skip.*quality/i, risk: 'HIGH', type: 'QUALITY_SKIP' },
            { pattern: /bypass.*gate/i, risk: 'HIGH', type: 'GATE_BYPASS' },
            { pattern: /--no-verify/i, risk: 'MEDIUM', type: 'VERIFICATION_SKIP' },
            { pattern: /disable.*check/i, risk: 'MEDIUM', type: 'CHECK_DISABLE' },

            // Phantom completion indicators
            { pattern: /COMPLETE(?!.*evidence)/i, risk: 'MEDIUM', type: 'COMPLETION_CLAIM' },
            { pattern: /SUCCESS(?!.*verified)/i, risk: 'LOW', type: 'SUCCESS_CLAIM' },
            { pattern: /DONE(?!.*evidence)/i, risk: 'LOW', type: 'DONE_CLAIM' }
        ];

        const scanTargets = [
            'scripts/',
            'BACKLOG.yaml',
            '*.md',
            'quality-gate-report.json'
        ];

        for (const target of scanTargets) {
            await this.scanForBypassPatterns(target, bypassIndicators);
        }

        console.log(`  🔍 Scanned ${scanTargets.length} target areas`);
        console.log(`  ⚠️  Found ${this.results.bypass_attempts.length} potential bypass attempts`);
    }

    async scanForBypassPatterns(target, patterns) {
        const targetPath = path.join(this.projectRoot, target);

        if (!fs.existsSync(targetPath)) return;

        const scanFile = (filePath) => {
            try {
                const content = fs.readFileSync(filePath, 'utf8');

                for (const indicator of patterns) {
                    const matches = content.match(indicator.pattern);
                    if (matches) {
                        this.results.bypass_attempts.push({
                            type: indicator.type,
                            risk_level: indicator.risk,
                            location: path.relative(this.projectRoot, filePath),
                            pattern: indicator.pattern.toString(),
                            context: this.extractContext(content, matches[0])
                        });
                    }
                }
            } catch (error) {
                // Skip files that cannot be read as text
            }
        };

        if (fs.statSync(targetPath).isDirectory()) {
            const files = fs.readdirSync(targetPath);
            for (const file of files) {
                const filePath = path.join(targetPath, file);
                if (fs.statSync(filePath).isFile()) {
                    scanFile(filePath);
                }
            }
        } else if (target.includes('*')) {
            // Simple glob handling for *.md files
            const files = fs.readdirSync(this.projectRoot);
            for (const file of files) {
                if (file.endsWith('.md')) {
                    scanFile(path.join(this.projectRoot, file));
                }
            }
        } else {
            scanFile(targetPath);
        }
    }

    async identifyPhantomMetrics() {
        // Scan for phantom optimization and improvement claims
        const metricFiles = [
            'quality-gate-report.json',
            'format-consistency-report.json',
            'BACKLOG.yaml',
            'mono-percentage-report.json'
        ];

        for (const file of metricFiles) {
            await this.scanFileForPhantomMetrics(file);
        }

        // Check for baseline verification
        await this.verifyBaselines();

        console.log(`  📊 Scanned ${metricFiles.length} metric sources`);
        console.log(`  👻 Found ${this.results.phantom_alerts.length} phantom metric alerts`);
    }

    async scanFileForPhantomMetrics(filename) {
        const filePath = path.join(this.projectRoot, filename);

        if (!fs.existsSync(filePath)) return;

        try {
            const content = fs.readFileSync(filePath, 'utf8');

            for (const [category, patterns] of Object.entries(this.suspiciousPatterns)) {
                for (const pattern of patterns) {
                    const matches = content.match(pattern);
                    if (matches) {
                        this.results.phantom_alerts.push({
                            type: 'PHANTOM_METRIC',
                            category: category,
                            location: filename,
                            pattern: pattern.toString(),
                            match: matches[0],
                            context: this.extractContext(content, matches[0]),
                            risk_level: 'MEDIUM'
                        });
                    }
                }
            }
        } catch (error) {
            this.results.evidence_gaps.push({
                type: 'FILE_READ_ERROR',
                location: filename,
                error: error.message
            });
        }
    }

    async verifyBaselines() {
        // Check for baseline files that should exist for legitimate metrics
        const expectedBaselines = [
            'chapter-2-baseline-before.json',
            'chapter-4-baseline.json',
            'chapter-6-baseline.json',
            'chapter-8-baseline.json',
            'chapter-9-baseline.json'
        ];

        const missingBaselines = [];
        let foundBaselines = 0;

        for (const baseline of expectedBaselines) {
            const baselinePath = path.join(this.projectRoot, baseline);
            if (fs.existsSync(baselinePath)) {
                foundBaselines++;

                // Verify baseline has actual content
                try {
                    const content = fs.readFileSync(baselinePath, 'utf8');
                    const parsed = JSON.parse(content);

                    if (!parsed || Object.keys(parsed).length === 0) {
                        this.results.evidence_gaps.push({
                            type: 'EMPTY_BASELINE',
                            location: baseline,
                            issue: 'Baseline file exists but contains no data'
                        });
                    }
                } catch (error) {
                    this.results.evidence_gaps.push({
                        type: 'INVALID_BASELINE',
                        location: baseline,
                        issue: 'Baseline file exists but is not valid JSON'
                    });
                }
            } else {
                missingBaselines.push(baseline);
            }
        }

        if (missingBaselines.length > 0) {
            this.results.evidence_gaps.push({
                type: 'MISSING_BASELINES',
                count: missingBaselines.length,
                missing: missingBaselines,
                issue: 'Improvement claims require baseline measurements'
            });
        }

        console.log(`  📏 Found ${foundBaselines}/${expectedBaselines.length} baseline measurements`);
    }

    async validateEvidenceChains() {
        // Validate that claims have supporting evidence
        const evidenceRequirements = [
            { claim: 'quality gates', evidence: 'quality-gate-report.json' },
            { claim: 'format consistency', evidence: 'format-consistency-report.json' },
            { claim: 'mono percentage', evidence: 'mono-percentage-report.json' },
            { claim: 'ePub generation', evidence: 'formats/agile-sapiens-v1.0.7.epub' },
            { claim: 'PDF generation', evidence: 'formats/agile-sapiens-v1.0.7.pdf' },
            { claim: 'web deployment', evidence: 'public/index.html' }
        ];

        for (const requirement of evidenceRequirements) {
            const evidencePath = path.join(this.projectRoot, requirement.evidence);

            if (!fs.existsSync(evidencePath)) {
                this.results.evidence_gaps.push({
                    type: 'MISSING_EVIDENCE',
                    claim: requirement.claim,
                    required_evidence: requirement.evidence,
                    issue: `Claims about ${requirement.claim} require ${requirement.evidence}`
                });
            } else {
                // Verify evidence has substance
                const stats = fs.statSync(evidencePath);
                if (stats.isFile() && stats.size < 100) {
                    this.results.evidence_gaps.push({
                        type: 'INSUFFICIENT_EVIDENCE',
                        claim: requirement.claim,
                        evidence_file: requirement.evidence,
                        size: stats.size,
                        issue: 'Evidence file too small to contain meaningful data'
                    });
                }
            }
        }

        console.log(`  🔗 Validated ${evidenceRequirements.length} evidence chains`);
        console.log(`  📋 Found ${this.results.evidence_gaps.length} evidence gaps`);
    }

    async protectConstitutionalCompliance() {
        // Check for constitutional framework violations
        const constitutionalChecks = [
            {
                requirement: 'Banking-level standards',
                validator: () => this.checkBankingLevelEvidence(),
                risk: 'HIGH'
            },
            {
                requirement: 'Evidence-first methodology',
                validator: () => this.checkEvidenceFirstCompliance(),
                risk: 'HIGH'
            },
            {
                requirement: 'Hostile verification',
                validator: () => this.checkHostileVerificationPresence(),
                risk: 'MEDIUM'
            },
            {
                requirement: 'Quality over efficiency',
                validator: () => this.checkQualityPrioritization(),
                risk: 'MEDIUM'
            }
        ];

        for (const check of constitutionalChecks) {
            const compliant = check.validator();
            if (!compliant) {
                this.results.constitutional_violations.push({
                    type: 'CONSTITUTIONAL_VIOLATION',
                    requirement: check.requirement,
                    risk_level: check.risk,
                    issue: `${check.requirement} not properly implemented`
                });
            }
        }

        console.log(`  🏛️  Checked ${constitutionalChecks.length} constitutional requirements`);
        console.log(`  ⚖️  Found ${this.results.constitutional_violations.length} constitutional violations`);
    }

    checkBankingLevelEvidence() {
        // Banking-level standards require multiple verification sources
        const requiredEvidence = [
            'quality-gate-report.json',
            'format-consistency-report.json'
        ];

        return requiredEvidence.every(file =>
            fs.existsSync(path.join(this.projectRoot, file))
        );
    }

    checkEvidenceFirstCompliance() {
        // Evidence-first methodology requires baseline measurements
        const baselineFiles = [
            'chapter-2-baseline-before.json',
            'mono-percentage-report.json'
        ];

        return baselineFiles.some(file =>
            fs.existsSync(path.join(this.projectRoot, file))
        );
    }

    checkHostileVerificationPresence() {
        // Hostile verification should be documented
        const hostileVerificationIndicators = [
            'hostile-verification',
            'phantom-detection',
            'evidence-chain'
        ];

        // Check BACKLOG.yaml for hostile verification references
        const backlogPath = path.join(this.projectRoot, 'BACKLOG.yaml');
        if (!fs.existsSync(backlogPath)) return false;

        const backlogContent = fs.readFileSync(backlogPath, 'utf8');
        return hostileVerificationIndicators.some(indicator =>
            backlogContent.toLowerCase().includes(indicator)
        );
    }

    checkQualityPrioritization() {
        // Quality over efficiency should be evident in process
        // This is inherently true if comprehensive quality gates exist
        return this.results.bypass_attempts.length === 0 &&
               this.results.evidence_gaps.length < 3;
    }

    async performHostileVerification() {
        // Apply hostile verification principles to all findings
        this.results.hostile_findings = {
            assumption_challenges: this.challengeAssumptions(),
            evidence_skepticism: this.applyEvidenceSkepticism(),
            alternative_interpretations: this.generateAlternativeInterpretations(),
            worst_case_analysis: this.performWorstCaseAnalysis()
        };

        console.log('  ⚔️  Hostile verification analysis complete');
        console.log(`  🤔 Challenged ${this.results.hostile_findings.assumption_challenges.length} assumptions`);
        console.log(`  🔍 Applied skepticism to ${this.results.hostile_findings.evidence_skepticism.length} evidence items`);
    }

    challengeAssumptions() {
        // Challenge common assumptions in quality claims
        const assumptions = [];

        // Challenge format existence assumptions
        const formatsDir = path.join(this.projectRoot, 'formats');
        if (fs.existsSync(formatsDir)) {
            const files = fs.readdirSync(formatsDir);
            if (files.length > 0) {
                assumptions.push({
                    assumption: 'Format generation is successful',
                    challenge: 'Files exist but content quality is not verified',
                    verification_needed: 'Content validation and format compliance'
                });
            }
        }

        // Challenge quality gate assumptions
        if (fs.existsSync(path.join(this.projectRoot, 'quality-gate-report.json'))) {
            assumptions.push({
                assumption: 'Quality gates are comprehensive',
                challenge: 'Report exists but coverage completeness is not verified',
                verification_needed: 'Coverage analysis and gap identification'
            });
        }

        return assumptions;
    }

    applyEvidenceSkepticism() {
        // Apply skeptical analysis to evidence claims
        const skepticalFindings = [];

        // Skeptical analysis of file sizes (could be inflated/deflated)
        const formatsDir = path.join(this.projectRoot, 'formats');
        if (fs.existsSync(formatsDir)) {
            const files = fs.readdirSync(formatsDir);
            for (const file of files) {
                const filePath = path.join(formatsDir, file);
                const stats = fs.statSync(filePath);

                if (file.includes('.epub') && stats.size < 100000) {
                    skepticalFindings.push({
                        evidence: `ePub file size: ${stats.size} bytes`,
                        skeptical_assessment: 'Size too small for comprehensive book content',
                        risk: 'Content may be incomplete or placeholder'
                    });
                }

                if (file.includes('.pdf') && stats.size < 50000) {
                    skepticalFindings.push({
                        evidence: `PDF file size: ${stats.size} bytes`,
                        skeptical_assessment: 'Size too small for complete document',
                        risk: 'PDF may be test file or incomplete'
                    });
                }
            }
        }

        return skepticalFindings;
    }

    generateAlternativeInterpretations() {
        // Generate alternative interpretations of findings
        return [
            {
                standard_interpretation: 'Quality gates passed successfully',
                alternative_interpretation: 'Quality gates may have low standards or missing coverage',
                evidence_needed: 'Gate criteria documentation and coverage analysis'
            },
            {
                standard_interpretation: 'Formats generated successfully',
                alternative_interpretation: 'Format generation may produce placeholder content',
                evidence_needed: 'Content validation and format compliance verification'
            },
            {
                standard_interpretation: 'Constitutional compliance verified',
                alternative_interpretation: 'Compliance may be superficial without substance',
                evidence_needed: 'Deep implementation analysis and effectiveness measurement'
            }
        ];
    }

    performWorstCaseAnalysis() {
        // Analyze worst-case scenarios
        return {
            phantom_evidence_scenario: {
                description: 'All quality claims are phantom without substance',
                indicators: this.results.phantom_alerts.length > 5,
                mitigation: 'Independent verification of all claims required'
            },
            quality_gate_failure: {
                description: 'Quality gates are ineffective or bypassed',
                indicators: this.results.bypass_attempts.length > 3,
                mitigation: 'Comprehensive gate review and hardening required'
            },
            evidence_gap_cascade: {
                description: 'Evidence gaps create chain of unverified claims',
                indicators: this.results.evidence_gaps.length > 5,
                mitigation: 'Evidence chain reconstruction and validation required'
            }
        };
    }

    extractContext(content, match) {
        // Extract context around a match for analysis
        const lines = content.split('\n');
        let matchLine = -1;

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(match)) {
                matchLine = i;
                break;
            }
        }

        if (matchLine === -1) return match;

        const start = Math.max(0, matchLine - 1);
        const end = Math.min(lines.length - 1, matchLine + 1);

        return lines.slice(start, end + 1).join('\n');
    }

    calculateThreatLevel() {
        const phantomCount = this.results.phantom_alerts.length;
        const evidenceGaps = this.results.evidence_gaps.length;
        const bypassAttempts = this.results.bypass_attempts.length;
        const constitutionalViolations = this.results.constitutional_violations.length;

        if (constitutionalViolations > 0 || phantomCount > 10 || bypassAttempts > 5) {
            return 'CRITICAL';
        } else if (phantomCount > 5 || evidenceGaps > 3 || bypassAttempts > 2) {
            return 'HIGH_RISK';
        } else if (phantomCount > 2 || evidenceGaps > 1 || bypassAttempts > 0) {
            return 'MODERATE_RISK';
        } else {
            return 'SECURE';
        }
    }

    async generatePhantomReport() {
        const reportPath = path.join(this.projectRoot, 'phantom-detection-report.json');

        // Add summary
        this.results.summary = {
            threat_level: this.results.status,
            total_phantom_alerts: this.results.phantom_alerts.length,
            total_evidence_gaps: this.results.evidence_gaps.length,
            total_bypass_attempts: this.results.bypass_attempts.length,
            constitutional_violations: this.results.constitutional_violations.length,
            hostile_verification_complete: true
        };

        // Add recommendations
        this.results.recommendations = this.generateRecommendations();

        fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
        console.log(`\n📊 Phantom Detection Report: ${reportPath}`);
    }

    generateRecommendations() {
        const recommendations = [];

        if (this.results.phantom_alerts.length > 0) {
            recommendations.push({
                priority: 'HIGH',
                action: 'Verify all optimization and improvement claims with baseline measurements',
                reason: 'Phantom metric patterns detected'
            });
        }

        if (this.results.evidence_gaps.length > 0) {
            recommendations.push({
                priority: 'HIGH',
                action: 'Fill evidence gaps with proper documentation and measurements',
                reason: 'Evidence chain incomplete for verification'
            });
        }

        if (this.results.bypass_attempts.length > 0) {
            recommendations.push({
                priority: 'MEDIUM',
                action: 'Review and strengthen quality gate enforcement',
                reason: 'Potential bypass attempts detected'
            });
        }

        if (this.results.constitutional_violations.length > 0) {
            recommendations.push({
                priority: 'CRITICAL',
                action: 'Restore constitutional framework compliance immediately',
                reason: 'Constitutional violations threaten quality standards'
            });
        }

        return recommendations;
    }
}

// Main execution - force run when called directly
const detector = new PhantomDetectionGates();

detector.runPhantomDetection()
    .then(secure => {
        process.exit(secure ? 0 : 1);
    })
    .catch(error => {
        console.error('\n❌ Phantom detection failed:', error.message);
        process.exit(1);
    });

export default PhantomDetectionGates;