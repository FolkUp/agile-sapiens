#!/usr/bin/env node
/*
 * WCAG 2.1 AA contrast math for AGIL-114 A7 dark-mode verification.
 *
 * Why this exists: Hextra dark mode is `.dark` class-toggled (not media-query),
 * so headless axe/Lighthouse runs without Playwright priming the class cannot
 * verify dark-scope contrast. This script computes WCAG contrast ratios
 * directly from the canonical palette-d.css + typography-classical.css .dark
 * block + A5+ Фонарщик brand-manager HYBRID override.
 *
 * Gates: text ≥ 4.5:1 (WCAG AA normal), UI ≥ 3:1 (WCAG AA UI/large text).
 */

'use strict';

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function relLum([r, g, b]) {
  const srgb = [r, g, b].map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function ratio(fg, bg) {
  const l1 = relLum(hexToRgb(fg));
  const l2 = relLum(hexToRgb(bg));
  const [a, b] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (a + 0.05) / (b + 0.05);
}

// Canonical Palette D dark scope — values read directly from
// assets/css/palette-d.css lines 105-165 (.dark block).
// A5+ override from assets/css/typography-classical.css lines 202-213
// (monograph-specific sage-tinted muted text).
const DARK = {
  bg: '#1A1814',              // --folkup-ivory in .dark (body bg)
  surface: '#242018',         // --folkup-surface in .dark (cards, panels)
  titles: '#E5E3DF',          // --folkup-text / --text-titles in .dark (h1-h6)
  body: '#E5E3DF',            // --folkup-text in .dark (p, li)
  textMutedSage: '#A3B898',   // A5+ Фонарщик HYBRID override (monograph .dark only)
  textMutedCanonical: '#A8A19C', // palette-d.css canonical --folkup-text-muted (ecosystem; overridden in monograph)
  amber: '#F4C870',           // --folkup-amber in .dark (highlight, blockquote accent)
  bordeauxLink: '#B8818F',    // --folkup-bordeaux in .dark (--text-link)
  bordeauxLinkHover: '#C69AAB', // --folkup-bordeaux-light in .dark (--text-link-hover)
  border: '#3A342C',          // --folkup-border in .dark (UI separator)
  focus: '#2563eb',           // --color-focus a11y blue (unchanged by palette — kept AGIL-101)
  folkloreMarker: '#D4B871',  // --marker-folklore-color in .dark
};

const pairs = [
  // Text contrast — WCAG AA ≥ 4.5:1 normal
  { fg: DARK.titles, bg: DARK.bg, label: 'titles (h1-h6) — --text-titles on body bg', threshold: 4.5, role: 'text' },
  { fg: DARK.body, bg: DARK.bg, label: 'body (p, li) — --folkup-text on body bg', threshold: 4.5, role: 'text' },
  { fg: DARK.textMutedSage, bg: DARK.bg, label: '**A5+ OVERRIDE** sage muted (footnotes, meta, captions) on body bg', threshold: 4.5, role: 'text (brand-critical)' },
  { fg: DARK.textMutedCanonical, bg: DARK.bg, label: 'canonical muted #A8A19C (ecosystem default, overridden in monograph)', threshold: 4.5, role: 'text (reference)' },
  { fg: DARK.bordeauxLink, bg: DARK.bg, label: 'link color — .dark --folkup-bordeaux (#B8818F) on body bg', threshold: 4.5, role: 'text (link)' },
  { fg: DARK.bordeauxLinkHover, bg: DARK.bg, label: 'link hover — .dark --folkup-bordeaux-light on body bg', threshold: 4.5, role: 'text (link hover)' },
  { fg: DARK.amber, bg: DARK.bg, label: 'amber highlight — .dark --folkup-amber on body bg', threshold: 4.5, role: 'text (decorative accent)' },
  { fg: DARK.folkloreMarker, bg: DARK.bg, label: 'folklore-marker color on body bg', threshold: 4.5, role: 'text (marker)' },

  // Surface contrast
  { fg: DARK.body, bg: DARK.surface, label: 'body text on --folkup-surface (cards #242018)', threshold: 4.5, role: 'text' },
  { fg: DARK.textMutedSage, bg: DARK.surface, label: 'sage muted on --folkup-surface', threshold: 4.5, role: 'text' },

  // UI contrast — WCAG AA ≥ 3:1
  { fg: DARK.focus, bg: DARK.bg, label: 'focus ring (a11y blue #2563eb) on body bg', threshold: 3.0, role: 'UI' },
  { fg: DARK.border, bg: DARK.bg, label: '--folkup-border #3A342C on body bg (UI separator)', threshold: 3.0, role: 'UI' },
  { fg: DARK.textMutedSage, bg: DARK.bg, label: 'muted sage as UI separator (typography-classical --color-border-dark cascades)', threshold: 3.0, role: 'UI' },
];

let allPass = true;
const results = [];
for (const p of pairs) {
  const r = ratio(p.fg, p.bg);
  const pass = r >= p.threshold;
  if (!pass) allPass = false;
  results.push({
    label: p.label,
    fg: p.fg,
    bg: p.bg,
    ratio: Math.round(r * 100) / 100,
    threshold: p.threshold,
    role: p.role,
    verdict: pass ? 'PASS' : 'FAIL',
  });
}

console.log('# AGIL-114 A7 — Dark-mode WCAG contrast math');
console.log('');
console.log('| fg | bg | ratio | threshold | role | verdict | label |');
console.log('|---|---|---|---|---|---|---|');
for (const r of results) {
  console.log(`| \`${r.fg}\` | \`${r.bg}\` | ${r.ratio.toFixed(2)}:1 | ${r.threshold.toFixed(1)}:1 | ${r.role} | **${r.verdict}** | ${r.label} |`);
}
console.log('');
console.log(`## Overall: **${allPass ? 'PASS' : 'FAIL'}** (${results.filter((x) => x.verdict === 'PASS').length}/${results.length})`);

process.exit(allPass ? 0 : 1);
