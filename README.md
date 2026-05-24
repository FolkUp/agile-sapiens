# AGILE SAPIENS

**Version:** 1.0.7 | **Date:** 2026-05-24  
**Literary Business Analysis — How Literature Predicted Modern Management**

> **AGIL-190 Theme Correction Phase 2 in progress** (kickoff 2026-05-24): the 2026-05-19 "Literary Theme Correction" (AGIL-170) cleaned the book frame (homepage, about, cover, EPUB/PDF templates) but the chapter bodies 6-10 + afterword retained the AI overlay (16-125 ИИ mentions per chapter; Ch.0-5 were always Agile-faithful). Multi-session campaign. **Batches 1 + 2 SHIPPED 2026-05-24**:
> - **Batch 1** (PR #107, prod cfc3015): Ch.6/p1 REPLACED — Holmes-Watson archetype → Stoker / Мина Харкер / Crew of Light (Victorian distributed-knowledge-base team in pure Agile-frame: фонограф, питмановская стенография, Remington typewriter, телеграф; new chapter 203 lines; new Replicate plate; 0 ИИ mentions; HOOK→CONTROVERSY→CORE 4-laws→Тёмная сторона→RESOLUTION); slug rename + cross-refs swept; explicit weight fix `70/71` to keep Hugo display order.
> - **Batch 2** (PR #110, prod bea669d): Ch.6/p2 REWRITTEN — Jekyll-Hyde retargeted from "intelligence amplification" to **корпоративный дуализм** (espoused theory vs theory-in-use). Sources replaced (McKinsey/WEF/LinkedIn/Burton → Argyris & Schön 1974/1978/1996, Argyris 1985/1990, Goffman 1959, Schein 1985, Westrum 2004, Bateson 1972, Ильф & Петров 1931, Balfour 1901). New chapter 269 lines (down from 455), 14 footnotes, 0 ИИ mentions. Three archetypes: Jekyll (espoused), Hyde (enacted), **Лэньон (свидетель разрыва — сгорающий сеньор)**. CORE 4 stages rebuilt via Argyris double-loop framework. Russian voice: Корейко из «Золотого телёнка» как русский Джекил-Хайд без зелья и лаборатории. Cross-refs swept across `chapters/_index`, `apparatus/sources.md`, `apparatus/predmetnyy-ukazatel.md` (drops 6 AI-themed entries + adds 30+ corporate-dualism entries; **6а/6б convention swapped to intuitive mapping — часть 1 (Mina) = 6а, часть 2 (Jekyll) = 6б**), `preface.md` Act II, `apparatus/slovar-terminov.md`.
> - **EPUB 11.29 MB + PDF 3.90 MB** regenerated and synced to `static/downloads/` (SHA256 byte-match formats↔static↔prod verified).
> 
> Remaining: Ch.7 cleanup (Cervantes — team mythmaking, drop algorithm overlay), Ch.8 cleanup (Wells — labor-transformation, drop AI overlay), Ch.9 REPLACE author (Vinge → Стругацкие НИИЧАВО), Ch.10 REPLACE author (Gibson → Камю «Чума»), afterword REWRITE (synthesis + 11-archetype toolkit). Each chapter = separate session with hostile-review plan + result.

> **Status:** Pre-publisher polish batch COMPLETE (PRs #81–#89, 9 PRs). Book now ships as a real publishable object across Web / EPUB / PDF: cover everywhere, full apparatus, all 16 illustrations in EPUB, Ch.6 plates correctly split between Holmes/Watson and Jekyll/Hyde, typography ≥18px floor, desktop touch targets ≥44px on landmark nav.
> **Post-batch corrections:** PR #90 (README + PROJECT_CONTEXT docs sync) · PR #91 (hostile-audit YELLOW corrections — phantom-scrub of self-referential docs, EN `/about/` 404 fix, JSON-LD description) · PR #93 (repaired broken `_default`/`apparatus` layout templates — preface/afterword/about/legal/apparatus pages had collapsed to an unstyled nav block — and stripped leaked internal "Verification Note" meta-text from preface/afterword/chapters) · PR #95 (homepage EPUB/PDF download buttons — a shortcode replacing raw HTML that Goldmark had stripped) · PR #96 (repaired the broken `/apparatus/` index — `apparatus/list.html` was still on the obsolete `hx-` prefix that PR #93 missed — plus a download-button contrast fix) · PR #98 (AGIL-187 Batch A — accessibility: site-wide landmark-structure repair removing the duplicate `<main>`/`contentinfo` and nested landmarks, sidebar render deduplicated; plus reading-mode-toggle and cookie-banner contrast fixes) · PR #99 (AGIL-187 Batch C — removed the never-built English version: dropped the `[languages.en]` config, the language switcher and EN content; the site is now honestly RU-only) · PR #101 (AGIL-187 Batch B — SEO: homepage JSON-LD Organization→Book schema, de-duplicated twitter-card meta, and twitter:site / og:site_name / og:locale fixes; also fixed a pre-existing JSON-LD double-encoding bug that had broken Article/BreadcrumbList structured data site-wide) · PR #103 (AGIL-185 — new Victorian SVG/CSS cover replacing the stale 2026-04-20 cover that carried the OLD pre-theme-correction AI subtitle; cover-derived 1200×630 OG card replaces the 12KB generic FolkUp hexagon, folds in S5 of AGIL-187; EPUB + PDF regenerated; `scripts/gen-cover.{html,cjs}` + `scripts/gen-cover-og.html` committed for reproducibility — `node scripts/gen-cover.cjs` rebuilds both assets) · PR #104 (hotfix — sync regenerated EPUB/PDF from `formats/` to `static/downloads/`, the path Hugo serves `/downloads/*` from; PR #103 had updated `formats/` but the downloadable artifacts still carried the OLD cover until this sync). Production serves PR #104 content.
> **Latest 2026-05-21 (afternoon):** AGIL-177 generator subtitle+author refresh · AGIL-181 about.md AI-age cleanup · AGIL-174+179 cover in EPUB metadata + PDF first page · AGIL-175+176 EPUB ships full book (preface + 3 intermezzi + afterword + 7 apparatus pages + 17 webp illustrations; spine 13→27 items) · AGIL-178 PDF apparatus (199→255 pages) · AGIL-180 cover hero on homepage RU+EN · AGIL-183 5 orphan images removed (~3.1MB reclaimed) · AGIL-168 base font fluid clamp 16px→18px floor · AGIL-173 desktop landmark-nav targets ≥44px · AGIL-182 Ch.6 plate split (new Holmes/Watson plate via Replicate flux-1.1-pro; Jekyll-themed plate kept for Part 2).
> **Earlier 2026-05-21 (morning):** AGIL-167 narrow-scope WCAG closures (PRs #78 #79); PR #77 mono-table sync (Ch.6 part 1 = 6.6%).
> **Earlier 2026-05-20/21:** Ch.6 holmes-watson full rewrite + EPUB re-inclusion + post-rewrite hostile-audit cleanup (PRs #66–#76, 11 PRs total). HOOK → CONTROVERSY → CORE (4 named laws) → RESOLUTION in Ch.5 nemo voice baseline. File compressed 514 → 208 lines (60%). Status: draft → verified. EPUB and PDF regenerated with both Ch.6 parts labeled «часть 1: Холмс и Ватсон» / «часть 2: Доктор Джекил». Production hostile-verified: EPUB 126,059 bytes, PDF 2,639,293 bytes.
> **Earlier 2026-05-20:** Debt-elimination batches 1-3 deployed (PRs #56–#65). PDF/EPUB/baseURL fixed (batch 1), EPUB structure + SEC-001 cooper hardening + slovar Section H (batch 2), then SEC-002 cooper P2 hygiene + slovar rename to «Глоссарий замен» + Ch.11 archive verification + D-5 Ch-9 anglicism cleanup + D-7 subject index skeleton (248 entries) + phantom meta-doc removal from Ch-9 + Ch-10 tail surgical cleanup (batch 3). Hostile-verified on production.
> **Goal:** Best Scientific Popular Book 2026  
> **Voice:** "Literary Business Analysis" — Academic methodology with practical insights
> **Structure:** 11 chapters (0-10, with Chapter 6 in two parts) + 3 intermezzos, 3 acts (Origins → Present → Future)

## About

AGILE SAPIENS explores how classical literature intuitively described principles that modern management later commercialized as revolutionary methodologies. Combining rigorous literary analysis with engaging corporate irony, this monograph bridges the gap between timeless wisdom and contemporary business practices.

### Editorial Architecture

- **Act I: Origins** (Chapters 0-3) — How we got here
- **Act II: Present** (Chapters 4-7) — Current transformations  
- **Act III: Future** (Chapters 8-10) — What comes next

### Publication Strategy

**INFRASTRUCTURE STATUS 2026-05-15**: Hugo-based deployment operational

- **BUILD STATUS:** Static build generates 12 content units (Ch.0–10, with Ch.6 in two parts) successfully
- **DEPLOYMENT STATUS:** VPS scripts operational
- **QUALITY STATUS:** 12/12 content units ≤25% mono per fresh measurement
- **EVIDENCE:** mono-percentage-report.json (2026-05-21T07:36:29.511Z)
- **QUALITY GATES:** 5/5 passed (quality-gate-report.json)

## Development

- **Editorial Team:** Борхес (literary architecture) + Наборщик (technical editorial)
- **Research Verification:** КиберГонзо (citation integrity + source validation)
- **Technical Implementation:** Johnny (frontend + Hugo configuration)

## Current Status — Content Freeze Preparation

### Content Quality Assessment (AGIL-200 Complete)

**Seven-Gate Quality Framework Implemented:**
- ✅ Gate 7 (Technical): Hugo builds successfully 
- ✅ Gate 2 (Citation Integrity): CONDITIONAL CLEARANCE — КиберГонзо audit complete (2-3 days to finalization)
- ⚠️ Gates 1,3,4,5,6: Require expert validation

### Editorial Humanization Status

**Chapters 1-5: EXCELLENT** ✅ (Historical work by Борхес + Наборщик)
- Editorial humanization complete (AGIL-133/140/145)
- AI-pattern elimination successful
- "Харари meets Dilbert" voice established
- Mono% ≤25% achieved

**All Content Units (fresh 2026-05-21 measurement):** 12/12 ≤25% mono ✅
- Best performers: Ch.8 time-machine 4.2%, Ch.6 jekyll-hyde 4.5%, Ch.6 holmes-watson 6.6%
- Lowest performers (still compliant): Ch.2 frankenstein 16.9%, Ch.9 three-scenarios 15.7%
- Full table in PROJECT_CONTEXT.md
- **Caveat:** mono% counts shared sentence-starts; legitimate citation and motif repeats (`"Doyle Arthur C..."`, `"Шесть жемчужин..."`) contribute to the count. Compliance gate, not a voice verdict.

### Strategic Execution Phase

**Repository:** Hugo SSG with Hextra theme  
**Domain:** sapiens.folkup.life  
**License:** CC BY 4.0 (content), MIT (code)

### Visual content

Book ships with 14 active illustrations across Web / EPUB / PDF: 3 act-opener plates (Acts I/II/III), 9 chapter plates (Ch.1, 2, 3, 4, 6 part 1 "Mina Harker / Crew of Light" (new in AGIL-190 Batch 1, 2026-05-24), 6 part 2 "Jekyll/Hyde", 7, 9, 10), 3 intermezzo plates, plus the cover. Act-opener chapters (0, 5, 8) use the act-plate as their chapter visual. All in Victorian sepia engraving style. Deprecated AGIL-182 Holmes/Watson plate archived externally and removed from active dir when Ch.6/p1 was replaced.

## Status

Last measurement: mono-percentage-report.json 2026-05-21T07:36 UTC — 12/12 content units ≤25% per the script's first-three-words counter (compliance gate, not a voice verdict).  
Last production deploy: PR #110 (AGIL-190 Batch 2 — Ch.6/p2 Jekyll rewritten around corporate dualism), merged 2026-05-24, prod-verified — `/chapters/chapter-6-jekyll-hyde/` HTTP 200 (content-length 114717, fresh body 0 AI mentions), `/chapters/chapter-6-mina-harker/` HTTP 200 (Batch 1 stable, content-length 97181), `/apparatus/predmetnyy-ukazatel/` shows new corporate-dualism entries with 6а/6б intuitive mapping (Стокер→6а, Аргирис→6б), downloads content-length 11289419 / 3899575 byte-match local. Earlier same day: PR #106 (AGIL-190 Batch 0 frame cleanup), PR #104 (AGIL-185 hotfix), PR #103 (AGIL-185 cover). Earlier 2026-05-22: PR #101 (AGIL-187 Batch B SEO meta/schema with site-wide JSON-LD double-encoding bug fix), PR #98 (Batch A accessibility — landmarks + contrast), PR #99 (Batch C — EN-removal). AGIL-187 audit fronts done: accessibility (A), EN-removal (C), SEO (B), new cover + S5 OG (via AGIL-185); deferred behind AGIL-190 campaign: link-audit finish (in-page anchors), AGIL-188 author attribution, AGIL-166 reading-mode follow-up, consolidated dead-code cleanup.  
Quality gates: 5/5 passed per quality-gate-report.json.  
EPUB v1.0.7: 11.29 MB (cover + 16 plates + preface + 12 chapters + 3 intermezzi + afterword + 7 apparatus pages, 27 spine items) — regenerated 2026-05-24 with PR #110 (AGIL-190 Batch 2 Jekyll rewrite).  
PDF v1.0.7: 3.90 MB (same content structure as EPUB minus chapter-body plates) — regenerated 2026-05-24 with PR #110.

---

**© 2026 FolkUp Ecosystem**
Scientific Popular Monograph Project