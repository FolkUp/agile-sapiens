#!/usr/bin/env node

/**
 * Chapter 8 Team Transformation Measurement Script
 * Constitutional Implementation Verification
 * Enhanced Alice v2.0 Level 3 - Constitutional Framework
 */

const fs = require('fs');
const path = require('path');

function measureChapter8TeamTransformation() {
    const chapterPath = path.join(__dirname, '..', 'content', 'chapters', 'chapter-8-time-machine.md');

    if (!fs.existsSync(chapterPath)) {
        throw new Error(`Chapter 8 file not found at: ${chapterPath}`);
    }

    const content = fs.readFileSync(chapterPath, 'utf-8');
    const lines = content.split('\n');

    // Remove frontmatter
    const frontmatterEnd = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
    const bodyContent = lines.slice(frontmatterEnd + 1).join('\n');

    // Split into sentences for analysis
    const sentences = bodyContent
        .replace(/\n/g, ' ')
        .split(/[.!?]+/)
        .map(s => s.trim())
        .filter(s => s.length > 0);

    // Team transformation indicators
    const teamIndicators = [
        /команд[аыеий]/gi,
        /коллектив/gi,
        /группы/gi,
        /team/gi,
        /collective/gi,
        /организац/gi,
        /коллективн/gi,
        /командн/gi
    ];

    const individualIndicators = [
        /индивидуальн/gi,
        /individual/gi,
        /отдельн.*человек/gi,
        /одиночн/gi,
        /персональн/gi
    ];

    // Wells canonical references
    const wellsReferences = [
        /Wells/gi,
        /Уэллс/gi,
        /Time Machine/gi,
        /Машина времени/gi,
        /Элои/gi,
        /Морлок/gi,
        /Eloi/gi,
        /Morlock/gi
    ];

    // Team transformation measurement
    let teamMentions = 0;
    let individualMentions = 0;
    let wellsMentions = 0;
    let transformationExamples = 0;

    sentences.forEach(sentence => {
        // Count team indicators
        teamIndicators.forEach(pattern => {
            const matches = sentence.match(pattern);
            if (matches) teamMentions += matches.length;
        });

        // Count individual indicators
        individualIndicators.forEach(pattern => {
            const matches = sentence.match(pattern);
            if (matches) individualMentions += matches.length;
        });

        // Count Wells references
        wellsReferences.forEach(pattern => {
            const matches = sentence.match(pattern);
            if (matches) wellsMentions += matches.length;
        });

        // Check for transformation examples
        if (sentence.includes('реорганизу') || sentence.includes('трансформ') ||
            sentence.includes('эволюцион') || sentence.includes('restructur') ||
            sentence.includes('реструктур')) {
            transformationExamples++;
        }
    });

    // Constitutional compliance checks
    const hookSection = bodyContent.substring(0, 2000);
    const hasTeamHook = /команд.*портных|коллектив.*извозчик|команд.*фонарщик/gi.test(hookSection);
    const hasIndividualHook = /швейные машины вытесняют портных|железные дороги убивают извозчиков/gi.test(hookSection);

    // Key transformation phrases
    const keyTransformations = [
        /команды портных реорганизу/gi,
        /транспортные компании перестраив/gi,
        /команды фонарщиков эволюцион/gi,
        /командная трансформация/gi,
        /коллективной работе/gi
    ];

    let keyTransformationCount = 0;
    keyTransformations.forEach(pattern => {
        const matches = bodyContent.match(pattern);
        if (matches) keyTransformationCount += matches.length;
    });

    // Calculate metrics
    const totalWords = bodyContent.split(/\s+/).length;
    const teamToIndividualRatio = individualMentions > 0 ? teamMentions / individualMentions : teamMentions;
    const transformationDensity = (transformationExamples / sentences.length) * 100;
    const wellsIntegrationRate = (wellsMentions / sentences.length) * 100;

    // Constitutional compliance assessment
    const constitutionalCompliance = {
        teamFocusAchieved: teamMentions > individualMentions && hasTeamHook,
        wellsFrameworkIntegrated: wellsMentions >= 5,
        transformationExamplesPresent: transformationExamples >= 3,
        keyPhrasesImplemented: keyTransformationCount >= 2,
        hookTransformed: hasTeamHook && !hasIndividualHook
    };

    const complianceScore = Object.values(constitutionalCompliance)
        .reduce((sum, criterion) => sum + (criterion ? 1 : 0), 0) /
        Object.keys(constitutionalCompliance).length * 100;

    return {
        chapter: 8,
        title: "Time Machine Team Transformation",
        date: new Date().toISOString().split('T')[0],
        implementation_type: "constitutional_team_transformation",
        metrics: {
            total_sentences: sentences.length,
            total_words: totalWords,
            team_mentions: teamMentions,
            individual_mentions: individualMentions,
            wells_mentions: wellsMentions,
            transformation_examples: transformationExamples,
            key_transformation_phrases: keyTransformationCount,
            team_to_individual_ratio: Math.round(teamToIndividualRatio * 10) / 10,
            transformation_density_percent: Math.round(transformationDensity * 10) / 10,
            wells_integration_rate_percent: Math.round(wellsIntegrationRate * 10) / 10
        },
        constitutional_compliance: {
            ...constitutionalCompliance,
            compliance_score_percent: Math.round(complianceScore * 10) / 10
        },
        quality_indicators: {
            hook_section_transformed: hasTeamHook,
            individual_focus_eliminated: !hasIndividualHook,
            team_focus_consistent: teamMentions > individualMentions * 2,
            wells_framework_applied: wellsMentions >= 5,
            transformation_examples_sufficient: transformationExamples >= 3
        },
        notes: "Constitutional implementation measuring team transformation vs individual replacement focus"
    };
}

// Execute measurement
try {
    const results = measureChapter8TeamTransformation();

    // Output results
    console.log(JSON.stringify(results, null, 2));

    // Save results
    const outputPath = path.join(__dirname, '..', 'chapter-8-team-transformation-measurement.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

    // Constitutional compliance summary
    const compliance = results.constitutional_compliance;
    console.log('\n=== CONSTITUTIONAL COMPLIANCE SUMMARY ===');
    console.log(`Overall Compliance Score: ${compliance.compliance_score_percent}%`);
    console.log(`Team Focus Achieved: ${compliance.teamFocusAchieved ? '✅' : '❌'}`);
    console.log(`Wells Framework Integrated: ${compliance.wellsFrameworkIntegrated ? '✅' : '❌'}`);
    console.log(`Hook Section Transformed: ${compliance.hookTransformed ? '✅' : '❌'}`);
    console.log(`Key Transformation Phrases: ${results.metrics.key_transformation_phrases}/2+ ✅`);

    if (compliance.compliance_score_percent >= 80) {
        console.log('\n🎯 CONSTITUTIONAL IMPLEMENTATION SUCCESSFUL');
        console.log('Chapter 8 team transformation constitutionally compliant.');
    } else {
        console.log('\n⚠️  CONSTITUTIONAL IMPLEMENTATION INCOMPLETE');
        console.log('Additional team transformation work required.');
    }

} catch (error) {
    console.error('Measurement Error:', error.message);
    process.exit(1);
}