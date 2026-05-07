#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function checkHumanizationPattern(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const contentAfterFrontmatter = content.replace(/^---[\s\S]*?---\n/, '');

        // Look for biographical/character opening patterns
        const lines = contentAfterFrontmatter.split('\n');
        let foundHumanization = false;
        let humanizationType = null;
        let humanizationLine = null;

        // Check first 50 lines for humanization patterns
        for (let i = 0; i < Math.min(lines.length, 50); i++) {
            const line = lines[i].trim();

            // Pattern 1: HOOK sections
            if (line.match(/## HOOK:/)) {
                foundHumanization = true;
                humanizationType = 'HOOK Section';
                humanizationLine = line.substring(0, 80) + '...';
                break;
            }

            // Pattern 2: Character descriptions with names/roles in Russian
            if (line.match(/[А-Я][а-я]+\s+[А-Я][а-я]+.*?(директор|менеджер|специалист|эксперт|консультант|генеральный|технический|финансовый|банк)/i)) {
                foundHumanization = true;
                humanizationType = 'Character Introduction';
                humanizationLine = line.substring(0, 80) + '...';
                break;
            }

            // Pattern 3: Corporate scenario descriptions
            if ((line.match(/совет директоров|переговорная|офис|компания|корпорация|банк|этаж|башня/i) &&
                 line.length > 30) ||
                line.match(/понедельник|вторник|среда|четверг|пятница|утром|днем|вечером.*?(офис|здание|переговорная)/i)) {
                foundHumanization = true;
                humanizationType = 'Corporate Setting';
                humanizationLine = line.substring(0, 80) + '...';
                break;
            }

            // Pattern 4: Dialogue or corporate narrative
            if (line.match(/^—\s+.*|говорит.*|отвечает.*|спрашивает.*|понимает:/) && line.length > 20) {
                foundHumanization = true;
                humanizationType = 'Human Dialogue/Narrative';
                humanizationLine = line.substring(0, 80) + '...';
                break;
            }

            // Pattern 5: Character thoughts/actions
            if (line.match(/смотрит на|думает|понимает|решает|выбирает|стоит перед выбором/) && line.length > 30) {
                foundHumanization = true;
                humanizationType = 'Character Actions/Thoughts';
                humanizationLine = line.substring(0, 80) + '...';
                break;
            }
        }

        return {
            file: path.basename(filePath),
            hasHumanization: foundHumanization,
            type: humanizationType,
            example: humanizationLine
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

console.log('🏛️  AGILE SAPIENS — Humanization Pattern Analysis');
console.log('================================================');
console.log('Target: Biographical/corporate character openings consistent');
console.log('');

let compliantChapters = 0;
let totalChapters = 0;

chapterFiles.forEach(file => {
    const filePath = path.join(chaptersDir, file);
    const result = checkHumanizationPattern(filePath);

    if (result.error) {
        console.log(`❌ ${file}: ERROR - ${result.error}`);
    } else {
        totalChapters++;
        const status = result.hasHumanization ? '✅' : '⚠️';
        if (result.hasHumanization) compliantChapters++;

        console.log(`${status} ${file}`);
        console.log(`   Pattern: ${result.type || 'None detected'}`);
        if (result.example) {
            console.log(`   Example: ${result.example}`);
        }
        console.log('');
    }
});

console.log('================================================');
console.log(`Humanization Summary: ${compliantChapters}/${totalChapters} chapters with human elements`);
console.log(`Status: ${compliantChapters >= totalChapters * 0.8 ? '✅ CONSISTENT' : '⚠️ REVIEW NEEDED'}`);