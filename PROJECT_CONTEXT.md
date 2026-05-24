# AGILE SAPIENS — Project Context & Status

**Version:** 1.0.7 | **Date:** 2026-05-24
**Status:** All 12 content units ≤25% mono per measurement (2026-05-21T07:36 UTC). Pre-publisher polish batch landed (PRs #81–#90). Post-batch: AGIL-186 homepage download buttons (PR #95); AGIL-187 full site audit (4 fronts) — Batch A accessibility (PR #98), Batch C EN-removal (PR #99), Batch B SEO meta/schema (PR #101); **AGIL-185 new Victorian SVG/CSS cover shipped 2026-05-24 (PR #103 — replaces the stale AI-subtitle cover; folds in AGIL-187 S5 OG card) + PR #104 hotfix (sync regenerated EPUB/PDF to `static/downloads/` — the path Hugo actually serves)**. No P0 blockers; AGIL-187 audit fronts A/B/C/cover all closed — only link-audit (in-page anchors) remains.

## Project Overview

**Domain:** sapiens.folkup.life  
**Repository:** Hugo SSG with Hextra theme  
**Structure:** 11 numbered chapters (0-10, with Chapter 6 in two parts) + 3 intermezzos = 12 content units  
**License:** CC BY 4.0 (content), MIT (code)  
**Goal:** Best Scientific Popular Book 2026

## Content Quality (mono% measurement)

- **All 12 content units ≤25% mono per fresh measurement** ✅
- **Evidence:** `mono-percentage-report.json` (2026-05-21T07:36:29 UTC)
- **Quality Gates:** 5/5 passed (`quality-gate-report.json`)
- **HTML:** all chapters HTTP 200 on production

### Chapter Performance (fresh 2026-05-21 measurement)

| Chapter | Sentences | Mono % | Status |
|---------|-----------|--------|--------|
| 0-pilot | 454 | 9.0% | ✅ EXCELLENT |
| 1-jules-verne | 246 | 8.9% | ✅ EXCELLENT |
| 2-frankenstein | 301 | 16.9% | ✅ GOOD |
| 3-holmes | 256 | 11.7% | ✅ EXCELLENT |
| 4-borges | 241 | 7.1% | ✅ EXCELLENT |
| 5-nemo | 470 | 13.6% | ✅ GOOD |
| 6-holmes-watson (part 1) | 211 | 6.6% | ✅ EXCELLENT |
| 6-jekyll-hyde (part 2) | 397 | 4.5% | ✅ EXCELLENT |
| 7-don-quixote | 518 | 9.8% | ✅ EXCELLENT |
| 8-time-machine | 286 | 4.2% | ✅ EXCELLENT |
| 9-three-scenarios | 268 | 15.7% | ✅ GOOD |
| 10-choice-engine | 324 | 9.6% | ✅ EXCELLENT |

**Best Performers:** Ch.8 time-machine (4.2%), Ch.6 jekyll-hyde (4.5%), Ch.6 holmes-watson (6.6%).  
**Standard:** ≤25% mono (12/12 compliant).

**Note on the metric:** mono% counts sentences sharing the same first ~3 words (`scripts/measure-all-chapters-mono.cjs`). Repeats from legitimate citation patterns (`"Doyle Arthur C..."`, `"The Strand Maga..."`) and motif-callbacks (`"Шесть жемчужин..."`) inflate the count without indicating stylistic monotony. The metric is a floor-compliance gate, not a voice-quality verdict.

## Technical Infrastructure

### Deployment Status
- **Hugo Build:** v0.155.2 builds 12 chapters successfully
- **Website:** sapiens.folkup.life (HTTP 200, all pages accessible)
- **VPS Scripts:** Operational with atomic switching capability
- **Development Tools:** Quality measurement tools operational

### Quality Verification System
- **measure-all-chapters-mono.cjs:** Operational
- **quality-gate-report.json:** 5/5 gates passed
- **Validators:** Level 1 compliance regex (`scripts/validate-content.js`); commit-msg vendor-name guard

## Strategic Options

### Publication-Ready Tracks
1. **HSE University Partnership** — outreach package ready (AGIL-153, ready_for_dispatch, awaits user approval gate)
2. **MIT Press Submission** — submission package ready (AGIL-154, ready_for_dispatch, awaits user approval gate)
3. **Digital Focus** — maintain Hugo-based web publication
4. **Multi-Format Publishing** — Web/EPUB/PDF pipeline already operational

### Strategic Decision Points
- **Academic Track:** HSE partnership for university adoption
- **Commercial Track:** MIT Press for traditional publishing
- **Digital Focus:** Maintain Hugo-based web publication
- **Multi-Channel:** Parallel execution of multiple strategies

## Dependencies & Blockers

**P0 Blockers:** none open  
**P1 Open:** AGIL-187 full site audit — diagnostic complete (a11y / SEO / links / 2026 standards); remediation **mostly complete** — PR #95 / #96 / #98 / #99 / #101 / #103 / #104 merged. **Batch A complete (PR #98):** site-wide landmark structure + reading-mode / cookie-banner contrast — axe-core green. **Batch C complete (PR #99):** English version removed. **Batch B complete (PR #101):** SEO meta/schema + JSON-LD double-encoding fix. **AGIL-185 + S5 complete (PR #103 + #104):** new Victorian SVG/CSS cover (1600×2400 2:3 retina, 61KB WebP); 1200×630 cover-derived OG card replaces 12KB FolkUp hexagon; EPUB+PDF regenerated, sync hotfix #104 propagated artifacts from `formats/` to the served `static/downloads/`. Pending: link-audit finish (in-page anchors)  
**P2 Open:** none in active scope (AGIL-168 + AGIL-173 closed as part of pre-publisher batch)  
**P4 Open:** AGIL-172 URL portability — Cyrillic→ASCII anchors (blocked_pending_evidence; hostile review RED — the naive `autoHeadingIDType` fix would DROP Cyrillic runes and collide same-prefix headings; reopen only if a messenger paste-test shows real breakage)  
**Dispatch-ready (user approval required to send):** AGIL-153 HSE, AGIL-154 MIT Press — book object is now publisher-grade across all three formats; their `blocked_by` lists are fully cleared.

## Pre-publisher polish batch summary (2026-05-21)

9 PRs merged: AGIL-177 (templates), AGIL-181 (about.md), AGIL-174+179 (cover everywhere), AGIL-175+176 (EPUB full content + 16 illustrations), AGIL-178 (PDF apparatus), AGIL-180 (cover hero HTML), AGIL-183 (orphan cleanup), AGIL-168+173 (typography 18px + desktop touch targets 44px), AGIL-182 (Ch.6 plate split via Replicate). Book object state:
- **Web:** cover hero on homepage; 12/12 chapter pages with appropriate plates; Ch.6 parts now visually distinct (Holmes 221B Baker Street + Jekyll/Hyde mirror scene); 16px→18px base font; landmark navs at 44px on desktop.
- **EPUB v1.0.7:** 12MB; 27 spine items (cover + title + nav + preface + 12 chapters + 3 intermezzi + afterword + 7 apparatus); 17 webp images embedded.
- **PDF v1.0.7:** 4MB; 255 pages; cover first page; full apparatus.

## Evidence Chain

**Quality Metrics:** mono-percentage-report.json (2026-05-21T07:36:29 UTC)  
**Quality Gates:** quality-gate-report.json (regenerated per validator run; 5/5 pass)  
**Website Function:** Production serving PR #104 content. PR #95 added a homepage download-buttons shortcode (EPUB/PDF links — the raw HTML had been stripped by Goldmark); PR #96 repaired the broken `/apparatus/` index (`apparatus/list.html` was still on the obsolete `hx-` prefix that PR #93 missed) and fixed a download-button size-label contrast regression; PR #98 (AGIL-187 Batch A) repaired the site-wide landmark structure (one `<main id=content>` / one `contentinfo` per page, no nested landmarks; `baseof.html` no longer double-wraps theme partials; sidebar render deduplicated via a `layouts/_partials/sidebar.html` override) and fixed reading-mode-toggle + cookie-banner contrast; PR #99 (AGIL-187 Batch C) removed the English version — RU-only build, `/en/*` → 404, no hreflang; PR #101 (AGIL-187 Batch B) rebuilt the homepage JSON-LD as a Schema.org `Book`, de-duplicated the twitter-card meta block, fixed `twitter:site` / `og:site_name` / `og:locale`, and removed a redundant `| jsonify` that Go's `html/template` double-encoded inside `<script type="application/ld+json">` (had silently broken Article + BreadcrumbList structured data site-wide — now 167/167 JSON-LD blocks parse as valid JSON); PR #103 (AGIL-185) replaced the stale `cover.webp` with a new Victorian SVG/CSS cover (1600×2400 2:3 retina, 61KB WebP — pre-fixes a layout-shift mismatch since `home.html` declared 800×1200 against the old 1200×1754 file), replaced the 12KB FolkUp-hexagon `og-image-default.png` with a 122KB cover-derived 1200×630 landscape, regenerated EPUB+PDF, and committed `scripts/gen-cover.{html,cjs}` + `scripts/gen-cover-og.html` for reproducibility (`node scripts/gen-cover.cjs` rebuilds both assets); PR #104 (hotfix) synced the regenerated EPUB/PDF from `formats/` to `static/downloads/` — the canonical path Hugo serves `/downloads/*` from (PR #103 had updated `formats/` only, so production downloads still served the OLD cover until the sync). All render-verified on production via Playwright + axe-core; downloads verified by content-length match.

## Visual content inventory

Active illustration set on production: **14 plates** in Victorian sepia engraving style.

- **Act openers (3):** Act I (agil-act-opener-I.webp, used by Ch.0 pilot), Act II (II, Ch.5 nemo), Act III (III, Ch.8 time-machine)
- **Chapter plates (9):** Ch.1 jules-verne, Ch.2 frankenstein, Ch.3 holmes, Ch.4 borges, Ch.6 part 1 holmes-watson (NEW via Replicate flux-1.1-pro 2026-05-21), Ch.6 part 2 jekyll-hyde (renamed from old shared plate), Ch.7 don-quixote, Ch.9 three-scenarios, Ch.10 choice-engine
- **Intermezzo plates (3):** intermezzo-1, intermezzo-2, intermezzo-3
- **Cover:** cover.webp (homepage hero + EPUB cover page + PDF page 1)

Note: Ch.5 + Ch.8 standalone chapter plates were removed in AGIL-183 (PR #87) because those chapters are act-openers and `chapter-plate.html` partial defers to the act-plate. The webp files had no render path on Web or EPUB.

## Next Actions

**Strategic Execution Phase:** Choose publication strategy and execute
- Option A: HSE University partnership execution
- Option B: MIT Press submission process
- Option C: Digital-first with content freeze
- Option D: Multi-channel parallel execution

**Quality Maintenance:** Monitor constitutional compliance during execution  
**Infrastructure:** Maintain current operational status

---

**Last Updated:** 2026-05-24 (post-PR-#104 sync — AGIL-185 new Victorian SVG/CSS cover + S5 OG card via PR #103 + hotfix #104 propagating regenerated EPUB/PDF to `static/downloads/`; deploy refs updated to PR #104)  
**Evidence basis:** all measurements / page counts / file sizes verified via direct probe of production or local build artifacts. Where the source is a per-script regenerated file (e.g., `quality-gate-report.json`), the script name is cited next to the claim.
