# AGILE SAPIENS — Project Context & Status

**Version:** 1.0.7 | **Date:** 2026-05-21 | **Enhanced Alice v2.0 Level 3**
**Status:** All 12 content units ≤25% mono per fresh measurement (2026-05-21T07:36 UTC). 11 PRs of the 2026-05-20/21 batch deployed (#66–#76): Ch.6 holmes-watson full structural rewrite + EPUB re-inclusion + post-rewrite hostile-audit cleanup. Earlier 2026-05-20 batch (#56–#65) closed D-1 PDF, D-2 baseURL, D-3/D-4 EPUB structure, D-5 Ch-9/Ch-10 tail sweeps + phantom meta-doc removal, D-6 slovar Section H, D-7 subject index (248 entries), SEC-001/002 hardening, slovar rename, Ch.11 archive verification. No P0/P1 blockers open.

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
**P3 Open:** AGIL-172 URL portability — Cyrillic→ASCII anchors (planning, deferred per hostile review F4: UX wart, not WCAG fail)  
**Dispatch-ready (user approval required to send):** AGIL-153 HSE, AGIL-154 MIT Press — book object is now publisher-grade across all three formats; their `blocked_by` lists are fully cleared.

## Pre-publisher polish batch summary (2026-05-21)

9 PRs merged: AGIL-177 (templates), AGIL-181 (about.md), AGIL-174+179 (cover everywhere), AGIL-175+176 (EPUB full content + 16 illustrations), AGIL-178 (PDF apparatus), AGIL-180 (cover hero HTML), AGIL-183 (orphan cleanup), AGIL-168+173 (typography 18px + desktop touch targets 44px), AGIL-182 (Ch.6 plate split via Replicate). Book object state:
- **Web:** cover hero on homepage; 12/12 chapter pages with appropriate plates; Ch.6 parts now visually distinct (Holmes 221B Baker Street + Jekyll/Hyde mirror scene); 16px→18px base font; landmark navs at 44px on desktop.
- **EPUB v1.0.7:** 12MB; 27 spine items (cover + title + nav + preface + 12 chapters + 3 intermezzi + afterword + 7 apparatus); 17 webp images embedded.
- **PDF v1.0.7:** 4MB; 255 pages; cover first page; full apparatus.

## Evidence Chain

**Quality Metrics:** mono-percentage-report.json (2026-05-21T07:36:29.511Z)  
**Quality Gates:** quality-gate-report.json (2026-05-15T20:09:17.945Z)  
**Website Function:** Verified 2026-05-20 23:09 GMT (production fresh after PR #76)

## Visual Content Achievement ✅

**Visual Content Completion:** COMPLETED — All illustrations operational (AGIL-169 ✅)
- Chapter 5: agil-chapter-5-plate.webp (248.6KB) — Captain Nemo's engineering workshop ✅
- Chapter 8: agil-chapter-8-plate.webp (440.1KB) — H.G. Wells Time Machine laboratory ✅
- **Visual Ecosystem Status:** 100% complete — 16 illustrations deployed

## Next Actions

**Strategic Execution Phase:** Choose publication strategy and execute
- Option A: HSE University partnership execution
- Option B: MIT Press submission process
- Option C: Digital-first with content freeze
- Option D: Multi-channel parallel execution

**Quality Maintenance:** Monitor constitutional compliance during execution  
**Infrastructure:** Maintain current operational status

---

**Document Authority:** Enhanced Alice v2.0 Level 3 Cartouche Autonome Operation  
**Last Updated:** 2026-05-21 by Alice (post Ch.6 rewrite mono re-measurement)  
**Evidence-First Compliance:** All claims verified with primary sources
