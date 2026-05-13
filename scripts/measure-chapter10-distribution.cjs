#!/usr/bin/env node

/**
 * Chapter 10 Choice Engine Sentence Distribution Analysis
 *
 * Measures sentence distribution to verify optimization progress
 * Target: Short 53.8%→30-35%, Medium 23.8%→40-45%
 */

const fs = require('fs');
const path = require('path');

function countWords(sentence) {
  return sentence.trim().split(/\s+/).filter(word => word.length > 0).length;
}

function categorizeSentence(wordCount) {
  if (wordCount <= 5) return 'sub5';
  if (wordCount <= 10) return 'short';
  if (wordCount <= 19) return 'medium';
  if (wordCount <= 30) return 'long';
  return 'extra';
}

function analyzeSentenceDistribution(content) {
  // Remove frontmatter
  const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\n/, '');

  // Split into sentences, removing empty ones
  const sentences = contentWithoutFrontmatter
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0 && !/^#+\s/.test(s)); // Remove headers

  const distribution = {
    sub5: 0,
    short: 0,
    medium: 0,
    long: 0,
    extra: 0
  };

  let totalWords = 0;

  sentences.forEach(sentence => {
    const wordCount = countWords(sentence);
    totalWords += wordCount;
    distribution[categorizeSentence(wordCount)]++;
  });

  const totalSentences = sentences.length;
  const avgWordsPerSentence = totalWords / totalSentences;

  // Calculate percentages
  const percentages = {};
  Object.keys(distribution).forEach(category => {
    percentages[category] = ((distribution[category] / totalSentences) * 100).toFixed(1);
  });

  return {
    totalSentences,
    totalWords,
    avgWordsPerSentence: avgWordsPerSentence.toFixed(2),
    distribution,
    percentages
  };
}

// Main execution
const chapterPath = path.join(process.cwd(), 'content', 'chapters', 'chapter-10-choice-engine.md');

if (!fs.existsSync(chapterPath)) {
  console.error('Chapter 10 file not found:', chapterPath);
  process.exit(1);
}

const content = fs.readFileSync(chapterPath, 'utf8');
const analysis = analyzeSentenceDistribution(content);

console.log('=== Chapter 10 Choice Engine - Sentence Distribution Analysis ===');
console.log(`Total sentences: ${analysis.totalSentences}`);
console.log(`Total words: ${analysis.totalWords}`);
console.log(`Average words per sentence: ${analysis.avgWordsPerSentence}`);
console.log('\n--- Sentence Distribution ---');
console.log(`Sub-5 words:  ${analysis.distribution.sub5.toString().padStart(3)} sentences (${analysis.percentages.sub5.padStart(5)}%)`);
console.log(`Short (≤10):  ${analysis.distribution.short.toString().padStart(3)} sentences (${analysis.percentages.short.padStart(5)}%) [TARGET: 30-35%]`);
console.log(`Medium(11-19):${analysis.distribution.medium.toString().padStart(3)} sentences (${analysis.percentages.medium.padStart(5)}%) [TARGET: 40-45%]`);
console.log(`Long (20-30): ${analysis.distribution.long.toString().padStart(3)} sentences (${analysis.percentages.long.padStart(5)}%) [TARGET: 20-25%]`);
console.log(`Extra (31+):  ${analysis.distribution.extra.toString().padStart(3)} sentences (${analysis.percentages.extra.padStart(5)}%) [TARGET: <5%]`);

console.log('\n--- Optimization Progress ---');
const currentShort = parseFloat(analysis.percentages.short);
const currentMedium = parseFloat(analysis.percentages.medium);

console.log(`Short sentences: ${currentShort}% (was 53.8% → target 30-35%)`);
console.log(`Medium sentences: ${currentMedium}% (was 23.8% → target 40-45%)`);

const shortReduction = 53.8 - currentShort;
const mediumIncrease = currentMedium - 23.8;

console.log(`\nReduction in short: ${shortReduction.toFixed(1)} percentage points`);
console.log(`Increase in medium: ${mediumIncrease.toFixed(1)} percentage points`);

// Progress assessment
const shortProgress = Math.max(0, Math.min(100, ((53.8 - currentShort) / (53.8 - 32.5)) * 100));
const mediumProgress = Math.max(0, Math.min(100, ((currentMedium - 23.8) / (42.5 - 23.8)) * 100));

console.log(`\nShort optimization progress: ${shortProgress.toFixed(1)}%`);
console.log(`Medium optimization progress: ${mediumProgress.toFixed(1)}%`);

const overallProgress = (shortProgress + mediumProgress) / 2;
console.log(`Overall progress: ${overallProgress.toFixed(1)}%`);

if (currentShort <= 35 && currentMedium >= 40) {
  console.log('\n🎯 OPTIMIZATION COMPLETE! Target distribution achieved.');
} else {
  console.log('\n📊 Optimization in progress. Continue sentence combination.');
}