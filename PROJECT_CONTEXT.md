# AGILE SAPIENS — Project Context & Status

**Version:** 1.0.7 | **Date:** 2026-05-21
**Status:** All 12 content units ≤25% mono per fresh measurement (2026-05-21T07:36 UTC). Pre-publisher polish batch landed (PRs #81–#90, 10 PRs, 2026-05-21): generator templates corrected, about.md scrubbed of AI-age language, cover image in EPUB metadata + PDF first page + HTML home hero, EPUB extended to full book object (cover + 16 plates + preface + 12 chapters + 3 intermezzi + afterword + 7 apparatus pages), PDF apparatus added (199→255 pp), Ch.6 plate split (new Holmes/Watson via Replicate flux-1.1-pro, existing renamed to Jekyll), 5 orphan images removed, typography ≥18px floor, desktop landmark-nav touch targets ≥44px. Earlier 2026-05-20/21: Ch.6 rewrite + EPUB re-inclusion (PRs #66–#76); debt-elimination batches 1–3 (PRs #56–#65). No P0/P1 blockers.

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
**P1 Open:** none — pre-publisher polish batch COMPLETE (PRs #81–#89 merged 2026-05-21)  
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
**Website Function:** Production serving PR #91 content (hostile-audit YELLOW corrections — phantom-scrub + EN /about/ fix + JSON-LD description), merged 2026-05-21 16:59 UTC. Repo-doc syncs after that point change no site output.

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

**Last Updated:** 2026-05-22 (consistency sync — deploy refs corrected to PR #91, AGIL-172 status P3→P4 aligned with BACKLOG)  
**Evidence basis:** all measurements / page counts / file sizes verified via direct probe of production or local build artifacts. Where the source is a per-script regenerated file (e.g., `quality-gate-report.json`), the script name is cited next to the claim.
