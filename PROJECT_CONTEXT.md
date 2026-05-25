# AGILE SAPIENS — Project Context & Status

**Version:** 1.0.7 | **Date:** 2026-05-25
**Status:** AGIL-190 Theme Correction Phase 2 — Batches 1 + 2 + 3 SHIPPED (PR #107 Mina 2026-05-24 + PR #110 Jekyll corporate-dualism rewrite 2026-05-24 + PR #112 Don Quixote team-mythology rewrite 2026-05-25). Pre-publisher polish batch landed (PRs #81–#90). Post-batch: AGIL-186 homepage download buttons (PR #95); AGIL-187 full site audit (4 fronts) — Batch A accessibility (PR #98), Batch C EN-removal (PR #99), Batch B SEO meta/schema (PR #101); AGIL-185 new Victorian SVG/CSS cover (PR #103 + PR #104 hotfix).

**AGIL-190 Theme Correction Phase 2 kickoff (2026-05-24):** discovery — book is in a half-corrected state. The 2026-05-19 AGIL-170 "Literary Theme Correction" cleaned the SHELL (homepage `_index.ru.md`, about, cover subtitle, EPUB/PDF templates) but the chapter BODIES retained the AI overlay. Distribution of «ИИ»/AI mentions per chapter: Ch.0=2, Ch.1=1, Ch.2=0, Ch.3=2, Ch.4=0, Ch.5=1 (faithful to Literary Business Analysis frame) → Ch.6/p1=16, Ch.6/p2=42, Ch.7=41, Ch.8=63, Ch.9=125, Ch.10=79 (sharp boundary, AI-saturated tail). User-architected campaign (decisions 2026-05-24): Ch.6/p1 REPLACE archetype (Holmes-Watson → Stoker / Мина Харкер / Crew of Light — Victorian distributed-knowledge-base team, Agile-frame, no AI), Ch.6/p2 cleanup (Stevenson Jekyll-Hyde — corporate dualism without "intelligence amplification" overlay), Ch.7 cleanup (Cervantes Don Quixote — team mythmaking without algorithm overlay), Ch.8 cleanup (Wells Time Machine — labor-transformation horizons without AI overlay), Ch.9 REPLACE author (Vinge → Стругацкие «Понедельник начинается в субботу» — НИИЧАВО as ideal Agile team), Ch.10 REPLACE author (Gibson → Камю «Чума» — sustained crisis ops, доктор Рие), afterword REWRITE (synthesis "От Фогга до Рие" + 11-archetype practical toolkit, drop Enhancement/Amplification/Transformation AI taxonomy). Each chapter = separate session with hostile-review of plan + hostile-review of result. Editorial estimate ~45-60 hours over multiple sessions.

**Sequencing impact:** AGIL-187 link-audit, AGIL-188 author attribution, AGIL-166 reading-mode follow-up, dead-code cleanup — all deferred behind AGIL-190 because their scope intersects (link-audit must re-run after chapter renames; author attribution must wait until final author canonical name; etc.).

**AGIL-190 Batch 0** shipped 2026-05-24 (PR #106): frame-cleanup `chapters/_index.md` description+keywords+body de-AI'd as visible campaign kickoff.

**AGIL-190 Batch 1** shipped 2026-05-24 (PR #107, prod cfc3015): Ch.6/p1 archetype replaced — Holmes-Watson partnership → Stoker / Мина Харкер / Crew of Light. New chapter `chapter-6-mina-harker.md` (203 lines), zero ИИ mentions, full Agile-frame (фонограф + питмановская стенография + Remington typewriter + телеграф as distributed-team apparatus). Slug rename + comprehensive cross-refs sweep across `chapters/_index`, Ch.4/5/7 `related:`, `preface.md` Act II, `apparatus/sources.md` (new "Глава 6, часть 1" section with 12 entries), `apparatus/predmetnyy-ukazatel.md` (Holmes/Doyle/Sherlock Holmes dropped; new Мина Харкер / Стокер / Команда Света / Дракула entries — under Batch 2 convention update these are tagged Глава 6а), `apparatus/slovar-terminov.md`. Explicit weight `70/71` on Ch.6 parts to preserve Hugo display order (without this, alpha tie-break `jekyll < mina` would flip part 1 ↔ part 2). New Replicate plate (`agil-chapter-6-mina-plate.webp`, seed v2 of 3, 7% bottom-crop, 1152×834, 248KB). Deprecated `agil-chapter-6-holmes-plate.webp` archived externally. EPUB+PDF regenerated and synced to `static/downloads/`.

**AGIL-190 Batch 3** shipped 2026-05-25 (PR #112): Ch.7 Don Quixote fully rewritten around командную мифологию / sensemaking. Replaced AI overlay (algorithm-proof careers, WEF Future of Jobs 2023, McKinsey Generative AI 2023, LinkedIn Workplace Learning 2023, intelligence amplification, "algorithm sees correlation / team sees causation" framing) with Karl Weick sensemaking framework. New chapter `chapter-7-don-quixote.md` (218 lines, down from 422, −48%), 14 footnotes, 0 ИИ mentions. Structure: HOOK Cervantes 1605 windmill scene → CONTROVERSY (Weick 1995 sensemaking: orgs are systems for collective meaning-making, not org charts and KPIs) → CORE **Четыре закона командной мифологии** (учредительный миф via Schein 1985 founding-leader hypothesis; дуэт визионера-прагматика as Quixote-Sancho not Sancho-as-skeptic; приключение как нарратив via Campbell 1949 monomyth; столкновение мифа с реальностью via Mann Gulch Weick 1993 + Argyris double-loop carry-over) → INTERLUDE Mambrino's helmet / baciyelmo as Cervantes' coined word for collective sensemaking → ANALYSIS **Три модуса**: генеративный (Patagonia/SpaceX/Toyota) / защитный (Theranos/WeWork — myth used to obscure reality) / примиряющий (Sancho as myth-to-action translator, not myth-killer) → CASE Russian voice **Бендер-Воробьянинов из «12 стульев» Ильф/Петров 1928** as canonical Russian Quixote-Sancho duo; финал: Воробьянинов перерезает Бендеру горло во сне, потом обнаруживает что миф пустой (двенадцатый стул уже разобран дворником клуба железнодорожников) — Sancho-kills-Quixote AND myth-collapses pattern → REVERSAL Quixote's death scene Part II Ch.LXXIV as separation-from-myth death (modern parallels: Apple post-Jobs, Volvo post-Ford, WeWork post-Neumann) → INSIGHT command mythology as load-bearing structure not decoration → BRIDGE to Act III. Replacement sources: Weick 1995, Weick 1993 (ASQ), Campbell 1949 (Bollingen), Schein 1985 carry-over from Batch 2, Argyris-Schön 1978 carry-over via cross-relref, Goleman 1995 repurposed (EI as primiryayushchiy-modus tool not anti-AI), Ильф-Петров 1928 first time. Modern case-study refs: Chouinard 2005, Carreyrou 2018, Wiedeman 2020. Cross-refs swept across `chapters/_index` (subtitle replaced), `apparatus/sources.md` (Ch.7 section completely rebuilt with 11 numbered entries vs 5 old), `apparatus/predmetnyy-ukazatel.md` (~20 algorithm-themed Ch.7 entries dropped: автоматизация рутинных задач, бюрократия как болезнь, гемба, гибкая методология, заинтересованные стороны, иерархия команд, кайдзен, карта, картирование, организационная адаптация, парадокс автоматизации, пока-ёкэ, UX, продуктовый менеджер, разработка непрерывная, структурное мышление, технический директор, тройная связка V-S-E, эволюция командных практик, Agile, API, CI/CD, collective intelligence, DevOps, distributed cognition, Hutchins; ~30 new entries added: 4 new authors Вейк/Гоулман/Кэмпбелл-Джозеф/Шуинар + 4 new characters Бендер/Воробьянинов/Кихано/Кихот-как-визионер/Хоумс-Элизабет + 14 new concepts командная мифология/учредительный миф/3 модуса/дуэт визионера-прагматика/мономиф/sensemaking/baciyelmo/Mann Gulch/шлем Мамбрина/эмоциональный интеллект/etc.), `preface.md` Act II (Quixote line rewritten), `apparatus/slovar-terminov.md` (drops `algorithm-proof career` neologism since term no longer in book; Section H scope updated: remaining 8/9/10 in AGIL-190 hexagon). Two minor hostile-post-review fixes: «Шайн»→«Шейн» (consistency with Batch 2 transliteration of Edgar Schein); «Чуинар»→«Шуинар» (Russian Wikipedia standard for Yvon Chouinard, French «Chou»→«Шу»). EPUB 11,301,794 bytes + PDF 3,823,700 bytes regenerated and synced to `static/downloads/` (SHA256 byte-match formats↔static verified). No new plate; no slug rename.

**AGIL-190 Batch 2** shipped 2026-05-24 (PR #110, prod bea669d): Ch.6/p2 Jekyll-Hyde fully rewritten around корпоративный дуализм. Replaced AI overlay (intelligence amplification, algorithm aversion, McKinsey/WEF/LinkedIn/Burton) with espoused-theory-vs-theory-in-use framework: Jekyll = декларируемые ценности, Hyde = реальная операционная культура, Лэньон = свидетель разрыва (сгорающий сеньор, новый третий архетип из hostile pre-review). New chapter `chapter-6-jekyll-hyde.md` (269 lines, down from 455), 14 footnotes, 0 ИИ mentions. Structure: HOOK Bournemouth 1886 → Lanyon Ch.9 Narrative retold → CONTROVERSY (Argyris & Schön 1974) → Goffman front-stage/back-stage as sociological bridge → Three archetypes → CORE 4 stages rebuilt via Argyris double-loop framework (single-loop success → defensive routines → undiscussables → deutero-learning failure) → INTERLUDE (Jekyll's diary as mission statement) → 3 dimensions ANALYSIS (speed/ritual/role) → Russian voice **Корейко из «Золотого телёнка» (Ильф & Петров 1931)** as Russian Jekyll-Hyde without potion → REVERSAL (cynicism as diagnostic signal + Westrum 2004 typology) → CASE (anatomy of morning of Hyde) → INSIGHT (name the undiscussable) → BRIDGE to Don Quixote. Replacement sources: Argyris & Schön 1974/1978/1996, Argyris 1985/1990, Goffman 1959, Schein 1985, Westrum 2004, Bateson 1972, Ильф & Петров 1931, Balfour 1901. Cross-refs swept across `chapters/_index`, `apparatus/sources.md` (новая «часть 2» section with 12 entries), `apparatus/predmetnyy-ukazatel.md` (drops 6 AI-themed entries — verification ИИ, ИИ, симбиоз с ИИ, ML, prompt engineering, Тьюринг 6а — and adds 30+ corporate-dualism concepts: Argyris/Goffman/Schein/Westrum entries, double-loop learning, defensive routines, undiscussables, espoused theory, theory-in-use, front/back stage, корпоративный дуализм, Корейко, Лэньон), `preface.md` Act II, `apparatus/slovar-terminov.md` section H. **6а/6б convention swap (intuitive mapping)**: post-batch hostile review caught that previous convention had Jekyll=6а (часть 2) and Mina=6б (часть 1) — backward relative to part numbering. Three-step swap globally inverted: now часть 1 (Mina) = 6а, часть 2 (Jekyll) = 6б. EPUB 11,289,419 bytes + PDF 3,899,575 bytes regenerated and synced to `static/downloads/` (SHA256 byte-match formats↔static↔prod verified). No new plate (Jekyll plate stays); no slug rename.

No P0 blockers; AGIL-190 is the active P1 (multi-session campaign, 5 batches remaining: Ch.8 cleanup, Ch.9 replace Vinge→Стругацкие, Ch.10 replace Gibson→Камю, afterword rewrite, final cross-refs sweep + mono% remeasure for Ch.6/p1+p2 and Ch.7).

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
| 6-mina-harker (part 1) | — | — pending remeasure after AGIL-190 Batch 1 rewrite | new chapter |
| 6-jekyll-hyde (part 2) | — | — pending remeasure after AGIL-190 Batch 2 rewrite | rewritten chapter |
| 7-don-quixote | — | — pending remeasure after AGIL-190 Batch 3 rewrite | rewritten chapter |
| 8-time-machine | 286 | 4.2% | ✅ EXCELLENT |
| 9-three-scenarios | 268 | 15.7% | ✅ GOOD |
| 10-choice-engine | 324 | 9.6% | ✅ EXCELLENT |

**Best Performers (from 2026-05-21 measurement, before AGIL-190 Batch 1):** Ch.8 time-machine (4.2%), Ch.6 jekyll-hyde (4.5%). Ch.6/p1 replaced 2026-05-24 — mono% pending fresh measurement.  
**Standard:** ≤25% mono (11/12 compliant by current measurement; Ch.6/p1 mina-harker pending).

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

**Last Updated:** 2026-05-25 (PR #112 — AGIL-190 Batch 3 Don Quixote rewritten around командную мифологию / sensemaking — Weick, Campbell, Schein founding myth + Бендер-Воробьянинов Russian voice; 218 lines; 0 ИИ; 2 minor hostile-review fixes Шайн→Шейн and Чуинар→Шуинар applied pre-merge)  
**Evidence basis:** all measurements / page counts / file sizes verified via direct probe of production or local build artifacts. Where the source is a per-script regenerated file (e.g., `quality-gate-report.json`), the script name is cited next to the claim.
