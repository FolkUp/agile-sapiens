# Evidence-Based Debt Audit — AGILE SAPIENS

**Date:** 2026-05-19
**Authority:** Enhanced Alice v2.0 L3 Cartouche Autonome Operation — Phase 0 Measurement Baseline
**Classification:** P0 BLOCKING — Phase 1+ tasks gated on this audit
**Methodology:** Evidence-first, measurement-based. All claims grepped/decompressed/re-run with fresh timestamps. Hostile verification applied to own findings.

---

## Executive Summary

Phase 0 measurement replaced assumptions with measurements. Headline result:

| Area | Prior Claim | Measured Reality | Verdict |
|------|-------------|------------------|---------|
| Mono-percentage | 12/12 ≤25% compliant | 12/12 ≤25% (4.2–17.2%) | ✅ CONFIRMED |
| Quality gates | 5/5 (or "7/7") passed | 5 gates, 0 errors/0 warnings | ✅ CONFIRMED (gate count claim inflated) |
| Anglicism scope | "150+ hybrids, Ch.7/8/9 worst" | Concentration is Ch.6-holmes-watson + Ch.9, NOT Ch.7 | ❌ PHANTOM — scope misattributed |
| PDF format | "PDF v1.0.7 verified, content_present" | 3-page meta-document, ZERO book chapters | ❌ CRITICAL PHANTOM |
| EPUB format | EPUB valid | Content intact, but 2 structural bugs | ⚠️ DEFECTIVE (not phantom) |
| SEO | "sitemap, OpenGraph, Schema.org confirmed" | OG/Schema present; sitemap+site built with localhost baseURL | ⚠️ PARTIALLY PHANTOM |

**Real blocking debts: 2 (PDF, SEO build). Real non-blocking defects: 2 (EPUB structure, anglicism doc). Phantom debts retired: anglicism "150+/Ch.7-8-9" framing.**

---

## TASK 0.1 — Quality Pipeline (CONFIRMED ✅)

Fresh runs executed 2026-05-19:

- `node scripts/measure-all-chapters-mono.cjs` → `mono-percentage-report.json` regenerated, timestamp `2026-05-19T16:41:23.515Z`
- `node scripts/validate-content.js` → `quality-gate-report.json` regenerated, timestamp `2026-05-19T16:41:30.361Z`

**Mono-percentage (all 12 units, target ≤25%):**

| File | Sentences | Mono | Mono% |
|------|-----------|------|-------|
| chapter-0-pilot | 454 | 41 | 9.0% |
| chapter-1-jules-verne | 246 | 22 | 8.9% |
| chapter-2-frankenstein | 309 | 53 | 17.2% |
| chapter-3-holmes | 256 | 30 | 11.7% |
| chapter-4-borges | 241 | 17 | 7.1% |
| chapter-5-nemo | 470 | 64 | 13.6% |
| chapter-6-holmes-watson | 123 | 13 | 10.6% |
| chapter-6-jekyll-hyde | 397 | 18 | 4.5% |
| chapter-7-don-quixote | 518 | 51 | 9.8% |
| chapter-8-time-machine | 286 | 12 | 4.2% |
| chapter-9-three-scenarios | 283 | 48 | 17.0% |
| chapter-10-choice-engine | 331 | 33 | 10.0% |

**Result:** 12/12 compliant. Worst is chapter-2 (17.2%) — still well under 25%. **No mono-percentage debt exists.**

**Validation gates:** Level1, VoiceGate, Frontmatter, Sources, Brand — all `completed`, **0 errors / 0 warnings**.

**Hostile note:** `validate-content.js` runs 5 gates, not "7". PROJECT_CONTEXT.md line "quality-gate-report.json: 7/7 gates passed" is an inflated claim — the report file itself lists 5 gate keys. The "7-gate" terminology likely refers to a separate CI pipeline (QG1-QG7) and should not be conflated. Minor documentation inconsistency, non-blocking.

**Hostile note 2:** PROJECT_CONTEXT.md chapter table lists Ch.8 as "3.0%" and Ch.7 as "9.5%"; fresh measurement gives 4.2% and 9.8%. Numbers drifted (content edited since); both still compliant. PROJECT_CONTEXT.md mono table is stale, non-blocking.

---

## TASK 0.2 — Actual Anglicism Count (PHANTOM SCOPE CORRECTED ❌)

Source of claim: `content/apparatus/slovar-terminov.md` section H —
> "Выявленные гибриды: 150+ конструкций" and "Приоритет очистки: Главы 7, 8, 9 (максимальная концентрация англицизмов)"

**Measurement method:** grepped all named terms from slovar sections A–E across `content/chapters/*.md`; counted Latin-script tokens (3+ chars) per file; counted Cyrillic+Latin hybrid body-text lines (footnotes excluded).

**Findings:**

1. **Named slovar terms** (data-driven, machine learning, soft skills, Scrum Master, Product Owner, etc.): only **~31 literal occurrences** of the dictionary's explicitly-listed terms across 8 files. The "150+" count of *those specific terms* is not substantiated.

2. **BUT the real problem is larger and different in kind** than the slovar describes. The actual issue is wholesale English–Russian code-switching in body prose, not isolated dictionary terms. Latin-script token density per chapter:

   | Chapter | Latin tokens (3+ ch) | Hybrid body lines |
   |---------|---------------------|-------------------|
   | chapter-6-holmes-watson | **2358** | **164** |
   | chapter-9-three-scenarios | **2307** | **132** |
   | chapter-10-choice-engine | 1317 | 100 |
   | chapter-0-pilot | 807 | — |
   | chapter-5-nemo | 683 | — |
   | chapter-4-borges | 498 | — |
   | chapter-1-jules-verne | 473 | — |
   | chapter-2-frankenstein | 435 | — |
   | chapter-6-jekyll-hyde | 410 | — |
   | chapter-3-holmes | 395 | — |
   | chapter-8-time-machine | 380 | — |
   | **chapter-7-don-quixote** | **282 (LOWEST)** | — |

3. **The slovar's priority claim is inverted.** It names Chapters 7/8/9 as worst. Measurement shows **Chapter 7 has the LOWEST Latin density of any chapter (282 tokens)**, and Chapter 8 is near the bottom (380). The genuine concentration is **Chapter 6-holmes-watson and Chapter 9-three-scenarios** — each with ~2300 Latin tokens and 130–164 hybrid body lines.

**Sampled evidence (chapter-6-holmes-watson.md, body prose, not footnotes):**
- L62: "...первый в литературной истории архетип collaborative intelligence — партнёрство, где analytical mind (Холмс) и practical wisdom (Ватсон)..."
- L66: "Холмс занимается pattern recognition и hypothesis generation, Ватсон — practical validation и process documentation, вместе они создают quality assurance framework..."
- L72: "...Холмс — pattern recognition engine, Ватсон — context integration system, вместе — distributed decision-making framework, где каждый компонент выполняет task, для которого он биологически или профессионально optimized."

This is not a "150 hybrid terms" cleanup. It is **two chapters (6-holmes-watson, 9) saturated with untranslated English clauses**, plus a moderate tail in chapter-10. Some Latin tokens in every chapter are *legitimate* (book titles in citations, author names, accepted terms API/DevOps/GitHub) and must NOT be touched.

**Evidence-based cleanup scope:**
- **PRIORITY 1:** chapter-6-holmes-watson.md — ~164 hybrid body lines. Heaviest offender.
- **PRIORITY 2:** chapter-9-three-scenarios.md — ~132 hybrid body lines.
- **PRIORITY 3:** chapter-10-choice-engine.md — ~100 hybrid body lines.
- **NOT a priority:** chapter-7-don-quixote (lowest density — phantom claim retired).
- **Out of scope:** citation/footnote lines, author names, book titles, accepted terms.

**Verdict:** The "150+ / Ch.7-8-9" framing is PHANTOM. Real, larger debt exists but is localized to Ch.6-holmes-watson + Ch.9 (+ Ch.10 tail). `slovar-terminov.md` section H must be corrected before it misdirects cleanup work.

---

## TASK 0.3 — Formats Quality (CRITICAL PDF PHANTOM ❌ / EPUB DEFECTIVE ⚠️)

### PDF — `formats/agile-sapiens-v1.0.7.pdf` (52,054 bytes)

**Why only 52KB:** Because it contains **none of the book**. Decompressed structure:
- PDF 1.4, **3 A4 pages** (`/Count 3` on root pages node), 3 content streams, 2395 text-show operators, 6 embedded Times New Roman font objects, 8 images.
- Root cause is in the generator scripts themselves, not a dependency failure:
  - `scripts/simple-pdf-generator.sh` — embeds a **hardcoded HTML template** whose entire body is meta-commentary: "PDF Generation Dependency Resolution", "Multi-Format Publishing Pipeline", "Constitutional Framework Success". It never reads `content/chapters/`.
  - `scripts/pdf-generator-simple.js` (the script `multi-format-publisher.sh` actually invokes) — `createSimpleHTML()` likewise produces a meta-document ("Enhanced Alice v2.0 L3 PDF Generation"). Never reads `content/chapters/`.
  - `scripts/pdf-generator.js` — same pattern; `createPDFHTML()` builds a template, no chapter ingestion.

**The published PDF is a 3-page document describing the PDF pipeline, not the monograph.** A real 11-chapter / ~290,000-character monograph PDF would be ~200–400 pages. This file is shipped to readers at `public/downloads/agile-sapiens-v1.0.7.pdf`.

`format-consistency-report.json` claims for PDF — `pdf_valid: true`, `content_present: true`, `pdf_size_realistic: true`, `actual_content_present: true` — are **all phantom**. A 52KB file was rubber-stamped as a valid book.

`PDF-GENERATION-DEPENDENCY-RESOLUTION-COMPLETE-2026-05-17.md` claims success but only proves that *a* PDF can be produced — not that it contains the book.

**Verdict: P0 BLOCKING.** No PDF generator in the repo ingests chapter content. The whole PDF pipeline must be rebuilt to read `content/chapters/*.md` (or the Hugo-built HTML) before any PDF can be claimed valid.

### EPUB — `formats/agile-sapiens-v1.0.7.epub` (134,996 bytes)

**Content integrity: GOOD.** Per-chapter Cyrillic-character comparison source vs. EPUB xhtml shows ~100–102% retention (EPUB ≥ source because footnotes/markup expand). EPUB chapters are NOT truncated — earlier small byte sizes are explained by source `.md` files being citation-heavy (Latin-script + markup inflates bytes without inflating Cyrillic body text).

**Structural bugs (2):**
1. **Duplicate Frankenstein chapter.** Manifest + spine + nav include BOTH `chapter-2-frankenstein.xhtml` AND `chapter-2-frankenstein-original.xhtml` — byte-identical (10,692 bytes each). The book appears twice in the TOC as "Глава 2: Франкенштейн управляет проектом", and the duplicate is appended at the very end of the spine (after chapter-10). Reader sees Chapter 2 content again as the last "chapter."
2. **Chapter-6 numbering collision.** Both `chapter-6-holmes-watson` and `chapter-6-jekyll-hyde` are labeled "Глава 6" in nav.xhtml. (This mirrors the source repo, which has two chapter-6 files — a content-architecture question, not purely an EPUB bug, but the EPUB surfaces it as two consecutive "Глава 6" TOC entries.)

**Verdict: P1 — defective but shippable content.** Fix manifest/spine/nav to drop the `-original` duplicate; resolve the chapter-6 dual numbering (decide canonical numbering for holmes-watson vs jekyll-hyde). `epub-generator.sh` / `epub-generator-windows.sh` should be patched so the duplicate is never emitted.

---

## TASK 0.4 — SEO Verification (PARTIALLY PHANTOM ⚠️)

BACKLOG.yaml line ~73: "SEO optimization confirmed (sitemap, OpenGraph, Schema.org)".

**Measured:**

1. **`public/sitemap.xml`** — exists, 312 bytes, is a sitemap *index* pointing to:
   - `http://localhost:3000/en/sitemap.xml`
   - `http://localhost:3000/ru/sitemap.xml`
2. **`public/ru/sitemap.xml`** — exists, 26,334 bytes, **151 URLs** — all `http://localhost:3000/...` (157 localhost occurrences, 0 sapiens.folkup.life).
3. **`public/en/sitemap.xml`** — exists, 977 bytes — also localhost URLs.
4. **OpenGraph** — `public/index.html` HAS og:title, og:description, og:image, og:type, og:url (5 tags). ✅ Present.
5. **Schema.org** — `public/index.html` HAS one `application/ld+json` block with 3 `"@type"` entries. ✅ Present.
6. **Domain defect** — homepage `public/index.html`: 16 occurrences of `localhost:3000` vs 5 of `sapiens.folkup.life`. `og:url` = `http://localhost:3000/`. The JSON-LD `"url"` correctly = `https://sapiens.folkup.life` (hardcoded in template), but everything Hugo generates from baseURL is localhost.

**Root cause:** `hugo.toml` correctly sets `baseURL = "https://sapiens.folkup.life"`, but the artifacts in `public/` were built with an override `--baseURL http://localhost:3000` (dev/server build). The entire deployed site, every sitemap `<loc>`, every canonical, and `og:url` point to localhost — **search engines cannot index this; OG previews break.**

**Verdict:**
- "OpenGraph + Schema.org present" — ✅ CONFIRMED.
- "sitemap confirmed" — ⚠️ PHANTOM as deployed: sitemap exists but is unusable (localhost URLs, 0 production URLs).
- **P0/P1 BLOCKING for SEO:** rebuild `public/` with the production baseURL (`hugo --gc --minify` using `hugo.toml`, or explicit `--baseURL https://sapiens.folkup.life`) and redeploy. This is a known recurring trap in this repo (see memory: QG7 `--baseURL` rebuild fix).

---

## TASK 0.5 — Consolidated Debt Register

### BLOCKING (Phase 1 cannot claim format/SEO done until resolved)

| ID | Debt | Evidence | Action |
|----|------|----------|--------|
| D-1 | **PDF contains no book content** — 3-page meta-document | 52KB, 3 pages, generators embed hardcoded template; none read `content/chapters/` | Rebuild PDF pipeline to ingest chapters or Hugo HTML; regenerate; re-verify page count ~200+ |
| D-2 | **Built site uses localhost baseURL** — SEO/sitemap unusable | 151 localhost URLs in ru sitemap, og:url=localhost, 16 localhost refs in index.html | Rebuild `public/` with `https://sapiens.folkup.life` baseURL; redeploy |

### NON-BLOCKING DEFECTS (real, scoped, fix in normal flow)

| ID | Debt | Evidence | Action |
|----|------|----------|--------|
| D-3 | **EPUB duplicate Frankenstein chapter** | `chapter-2-frankenstein-original.xhtml` identical to `chapter-2-frankenstein.xhtml`; both in spine/nav | Remove `-original` from epub-generator + regenerate |
| D-4 | **EPUB two "Глава 6" entries** | nav.xhtml: holmes-watson + jekyll-hyde both "Глава 6" | Decide canonical numbering; fix nav labels |
| D-5 | **Anglicism cleanup — real scope** | Ch.6-holmes-watson ~164 hybrid lines, Ch.9 ~132, Ch.10 ~100 | Targeted body-prose translation of Ch.6-holmes-watson + Ch.9 (+Ch.10 tail); preserve citations/accepted terms |
| D-6 | **slovar-terminov.md section H is wrong** | Claims "150+ / Ch.7-8-9 worst"; Ch.7 is actually lowest density | Correct section H to reflect measured scope (D-5) |

### PHANTOM DEBTS RETIRED (no work needed)

| Retired claim | Why phantom |
|---------------|-------------|
| "Mono-percentage cleanup needed" | 12/12 already ≤25% (4.2–17.2%), fresh measurement confirms |
| "Anglicism priority = Chapters 7, 8, 9" | Ch.7 = lowest Latin density; Ch.8 near lowest. Misattributed. |
| "EPUB chapters truncated" | Hostile-verified false — ~100% Cyrillic retention vs source |
| "format_consistency PDF valid / content_present" | Report rubber-stamped a contentless 52KB file |
| "format-consistency 7/7 quality gates" / PROJECT_CONTEXT "7/7" | validate-content.js runs 5 gates; report lists 5 keys |

### DOCUMENTATION INCONSISTENCIES (low priority)

- PROJECT_CONTEXT.md mono table (Ch.7 9.5%, Ch.8 3.0%) is stale vs measured (9.8%, 4.2%).
- BACKLOG.yaml lines ~68–80 state "SEO optimization confirmed" and "PDF v1.0.7 verified production download" — both contradicted by D-1 and D-2; update after fixes.

---

## Hostile Verification of This Audit

Applied skepticism to own findings:

- **"PDF is empty" — could the text just be in compressed streams I missed?** Checked: decompressed all 3 content streams, 2395 text operators total, generator source code confirms hardcoded meta-template with no `content/chapters/` read. Finding holds.
- **"EPUB truncated" — initial assumption REJECTED by own measurement** (Cyrillic retention ~100%). Corrected before reporting. Demonstrates measurement over assumption.
- **"150+ anglicisms" — did I undercount by only grepping named terms?** Yes for named terms (~31), but cross-checked with Latin-token density and hybrid-line counts, which revealed a *larger* but *differently-located* problem. Both the count AND the location in the source claim are wrong; the corrected scope is evidence-backed per-chapter.
- **"localhost build" — could production deploy differ from local public/?** The `public/` dir is the build artifact; BACKLOG claims downloads tested on production. If production was deployed from this `public/`, the localhost URLs are live. Recommend verifying live `https://sapiens.folkup.life/sitemap.xml` before/after fix. Flagged as verification step in D-2.

---

## Phase 0 Gate Decision

**Phase 0: COMPLETE.** Measurement baseline established with fresh-timestamped evidence.

**Phase 1+ authorization:** Content quality (mono%) work is NOT needed. Real Phase 1 scope is:
1. D-1 PDF pipeline rebuild (BLOCKING)
2. D-2 production baseURL rebuild + redeploy (BLOCKING)
3. D-3/D-4 EPUB structural fixes
4. D-5 targeted anglicism cleanup (Ch.6-holmes-watson, Ch.9, Ch.10) — NOT Ch.7
5. D-6 correct slovar-terminov.md section H

**Evidence artifacts (fresh):** `mono-percentage-report.json` (2026-05-19T16:41:23Z), `quality-gate-report.json` (2026-05-19T16:41:30Z), `phantom-detection-report.json`, `format-consistency-report.json`, this audit.

---
*Phase 0 Measurement Baseline — Enhanced Alice v2.0 L3 Cartouche Autonome Operation*
*All findings measurement-based. Assumptions replaced with evidence. Hostile verification applied.*
