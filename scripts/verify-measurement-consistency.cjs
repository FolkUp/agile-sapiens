#!/usr/bin/env node

/**
 * Constitutional Measurement Verification Tool
 * Purpose: Establish single source of truth for monotone measurements
 * Authority: Banking-level standards for metric consistency
 * Date: 2026-05-14
 */

const fs = require('fs');
const path = require('path');

// Load both measurement methodologies
function loadSpecializedMeasurement(chapterNum) {
    const scriptPath = path.join(__dirname, `measure-chapter${chapterNum}-monotone.cjs`);
    if (!fs.existsSync(scriptPath)) {
        return null;
    }

    // Execute the specialized script and capture output
    const { execSync } = require('child_process');
    try {
        const output = execSync(`node "${scriptPath}"`, {
            encoding: 'utf-8',
            cwd: __dirname
        });

        // Parse the monotone percentage from output
        const match = output.match(/Monotone percentage:\s*([\d.]+)%/);
        return match ? parseFloat(match[1]) : null;
    } catch (error) {
        console.error(`Error running specialized measurement for chapter ${chapterNum}:`, error.message);
        return null;
    }
}

function loadUnifiedMeasurement() {
    const metricsPath = path.join(__dirname, '..', 'current-metrics.json');
    if (!fs.existsSync(metricsPath)) {
        return {};
    }

    const metrics = JSON.parse(fs.readFileSync(metricsPath, 'utf-8'));
    const results = {};

    metrics.results.forEach(result => {
        const match = result.file.match(/chapter-(\d+)/);
        if (match) {
            const chapterNum = parseInt(match[1]);
            results[chapterNum] = result.monotone_pct;
        }
    });

    return results;
}

function verifyMeasurementConsistency() {
    console.log('=== Constitutional Measurement Verification ===');
    console.log('Banking-Level Standards: Measurement Consistency Validation\n');

    const unifiedResults = loadUnifiedMeasurement();
    const chapters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let inconsistenciesFound = 0;
    let maxDiscrepancy = 0;
    const discrepancies = [];

    console.log('Chapter | Specialized | Unified | Discrepancy | Status');
    console.log('--------|-------------|---------|-------------|--------');

    chapters.forEach(chapterNum => {
        const specialized = loadSpecializedMeasurement(chapterNum);
        const unified = unifiedResults[chapterNum];

        if (specialized !== null && unified !== null) {
            const discrepancy = Math.abs(specialized - unified);
            const status = discrepancy > 1.0 ? 'VIOLATION' : 'OK';

            if (discrepancy > 1.0) {
                inconsistenciesFound++;
                discrepancies.push({
                    chapter: chapterNum,
                    specialized,
                    unified,
                    discrepancy
                });
            }

            maxDiscrepancy = Math.max(maxDiscrepancy, discrepancy);

            console.log(`   ${chapterNum.toString().padStart(2)}   |    ${specialized.toFixed(1).padStart(5)}    |  ${unified.toFixed(1).padStart(5)}  |    ${discrepancy.toFixed(1).padStart(5)}    | ${status}`);
        } else if (unified !== null) {
            console.log(`   ${chapterNum.toString().padStart(2)}   |      N/A    |  ${unified.toFixed(1).padStart(5)}  |     N/A     | UNIFIED_ONLY`);
        }
    });

    console.log('');
    console.log('=== Constitutional Compliance Assessment ===');

    if (inconsistenciesFound === 0) {
        console.log('✅ CONSTITUTIONAL COMPLIANCE: All measurements within banking-level tolerance (<1.0%)');
        console.log(`   Maximum discrepancy: ${maxDiscrepancy.toFixed(1)}%`);
    } else {
        console.log(`❌ CONSTITUTIONAL VIOLATION: ${inconsistenciesFound} measurement inconsistencies detected`);
        console.log(`   Maximum discrepancy: ${maxDiscrepancy.toFixed(1)}% (exceeds banking-level tolerance)`);
        console.log('');
        console.log('=== Critical Inconsistencies ===');
        discrepancies
            .sort((a, b) => b.discrepancy - a.discrepancy)
            .forEach(d => {
                console.log(`Chapter ${d.chapter}: ${d.discrepancy.toFixed(1)}% discrepancy`);
                console.log(`  Specialized tool: ${d.specialized.toFixed(1)}%`);
                console.log(`  Unified tool: ${d.unified.toFixed(1)}%`);
                console.log(`  Impact: ${((d.discrepancy / d.specialized) * 100).toFixed(1)}% measurement variance`);
                console.log('');
            });
    }

    console.log('=== Recommendations ===');
    if (inconsistenciesFound > 0) {
        console.log('1. IMMEDIATE: Establish single source of truth for monotone measurement');
        console.log('2. URGENT: Reconcile measurement methodologies or choose authoritative tool');
        console.log('3. QUALITY GATE: Require measurement consistency before strategic decisions');
        console.log('4. CONSTITUTIONAL: Apply banking-level standards to all metrics');
    } else {
        console.log('✅ Measurement infrastructure meets constitutional framework requirements');
        console.log('✅ Banking-level standards maintained across measurement tools');
    }

    return {
        inconsistenciesFound,
        maxDiscrepancy,
        discrepancies,
        compliant: inconsistenciesFound === 0
    };
}

// Execute verification
const results = verifyMeasurementConsistency();

// Exit with appropriate code for CI/CD integration
process.exit(results.compliant ? 0 : 1);