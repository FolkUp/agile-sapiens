# AGIL-127 Phase 2: Design Doc — Apparatus Restructure

**Date:** 2026-04-26
**Phase:** 2 of 3 (Design — implementation-ready specification)
**Pattern:** Hybrid (Pattern E) + Separate apparatus page (Pattern C elements) — per Phase 1 КиберГонзо research recommendation
**Reference research:** `_meta/agil-127-research-apparatus-separation.md`
**Compliance authority:** Лев APPROVED-WITH-CONSTRAINTS (C1, C2, C3 mandatory)
**Project:** AGILE SAPIENS (`sapiens.folkup.life`) — bilingual Hugo + Hextra monograph
**Repo:** `C:/JOHNDOE_CLAUDE/agile-sapiens`

---

## 0. Executive Summary

This design doc specifies a Hugo restructure that separates editorial apparatus (status badges, confidence callouts, AI Transparency banners, methodology references, aggregated sources) from chapter narrative content. Standard Ebooks digital colophon model applied: chapters render as clean reading view; full apparatus lives at `/apparatus/` with cross-linked aggregated metadata (colophon, methodology, transparency, sources).

The restructure preserves:

- Numbered footnote citations inline in chapters (per `~/.claude/rules/citation-compliance.md`)
- Per-chapter `sources[]` machine-readable frontmatter array (for Phase 3 aggregation tooling and citation traceability per Lev C3)
- Site-wide footer link to AI Transparency (per Lev C1, EU AI Act Art. 50 compliance, deadline 2026-08-02)
- HTTP 301 redirect from legacy `/legal/ai-transparency/` to `/apparatus/transparency/` (per Lev C2)

The restructure removes from chapter render view:

- Status badge (verified / partially_verified) — currently absent in chapter layout but pre-emptive removal of any future badge shortcode
- Confidence callout box (info box before content)
- "Verification Note" prose block (currently rendered as blockquote in body — see chapter-1-jules-verne.md line 50)
- AI Transparency banner per-chapter footer disclaimer (if any)
- Visible methodology references inline in prose

---

## 1. `/apparatus/` Hugo Section Structure

### 1.1 Content type

Standard Hugo `section` (regular section, **not** taxonomy). Apparatus pages are static curated documents with bilingual variants. Aggregation pages (`sources`, `colophon`) use Hugo template logic at build time to pull from `site.Sections.Where` and `range .Site.Pages` over `chapters` section.

Rationale: `taxonomy` would force tag-style URL structure (`/apparatus/sources/jules-verne/`) which is not the desired information architecture. Regular section gives clean URLs (`/apparatus/sources/`) with full layout control.

### 1.2 File structure under `content/apparatus/`

```
content/apparatus/
├── _index.md                 # RU landing (default language) — apparatus overview
├── _index.en.md              # EN landing
├── colophon.md               # RU — about this edition: editorial board, version, license
├── colophon.en.md            # EN
├── methodology.md            # RU — research/editorial workflow
├── methodology.en.md         # EN
├── transparency.md           # RU — EU AI Act Art. 50 statement (migrated from /legal/)
├── transparency.en.md        # EN
├── sources.md                # RU — aggregated sources, per-chapter grouping
├── sources.en.md             # EN
├── bibliography.md           # RU — extended bibliography (optional, see §1.5)
├── bibliography.en.md        # EN (optional)
├── acknowledgments.md        # RU — credits & thanks
└── acknowledgments.en.md     # EN
```

### 1.3 Frontmatter for apparatus pages

```yaml
---
title: "Технический аппарат"          # RU; EN: "Editorial Apparatus"
description: "Editorial apparatus, sources, and transparency for AGILE SAPIENS"
weight: 10                              # _index = 10, colophon = 20, methodology = 30, transparency = 40, sources = 50, bibliography = 60, acknowledgments = 70
type: apparatus
layout: list                            # for _index; "single" for sub-pages
date_created: "2026-04-26"
date_updated: "2026-04-26"
status: verified
toc: true
draft: false
---
```

`type: apparatus` — explicit type forces Hugo to use `layouts/apparatus/` over default `layouts/_default/`. Allows distinct visual treatment without Hextra theme override conflicts.

### 1.4 Layouts

Two new layout files:

```
layouts/apparatus/
├── list.html        # /apparatus/ landing — overview of all sections + nav cards
└── single.html      # /apparatus/colophon/, /apparatus/sources/, etc.
```

**`layouts/apparatus/list.html`** (skeleton; ~80 lines):

- `{{ define "main" }}` block matching `chapters/single.html` structure
- `<header>` with apparatus title, description (no chapter-plate, no act-opener — those are chapter-specific)
- `<nav class="apparatus-index">` with cards for each sub-section (colophon, methodology, transparency, sources, bibliography, acknowledgments)
- Hextra breadcrumb partial reused: `{{ partial "breadcrumb.html" (dict "page" . "enable" true) }}`
- Reuses `content-enhanced classical-typography` wrapper for `.Content` rendering
- Footer pager partial reused

**`layouts/apparatus/single.html`** (skeleton; ~60 lines):

- Identical wrapper to `chapters/single.html` BUT WITHOUT:
  - `partial "custom/act-opener.html"` (no act for apparatus)
  - `partial "custom/chapter-plate.html"` (no engraving plate)
  - `chapter-conclusion` ornament block
- Includes `breadcrumb` + plain `<header>` + `.Content` + `pager`
- For `/apparatus/sources/` and `/apparatus/colophon/`: includes Hugo template logic for aggregation (see §1.6)

### 1.5 Bibliography vs Sources distinction

Decision: **`/apparatus/sources/` is the canonical aggregated bibliography**. No separate `/apparatus/bibliography/` page in Phase 3 v1.0.

Rationale: AGILE SAPIENS uses literary citations (Verne, Shelley, Conan Doyle — public domain) plus management/engineering scholarship (Brooks, Schwaber, Takeuchi, etc.). Single aggregation page with per-chapter grouping satisfies both academic credibility and Lev C3 (per-chapter source attribution preserved).

`bibliography.md` file remains in §1.2 file structure as optional Phase 3.5 enhancement (e.g., extended scholarly references that don't appear inline in chapter prose). Skipped for Phase 3 v1.0 unless Андрей requests.

### 1.6 Aggregation templates

**`/apparatus/sources/`** template logic (in `layouts/apparatus/single.html` with `{{ if eq .File.LogicalName "sources.md" }}`):

```go-html-template
{{ $chapters := where .Site.Pages "Section" "chapters" }}
{{ $chapters = where $chapters "Params.draft" "ne" true }}
{{ $sortedChapters := sort $chapters "Params.weight" "asc" }}

<div class="apparatus-sources-aggregation">
  {{ range $sortedChapters }}
    {{ if .Params.sources }}
      <section class="apparatus-source-group" id="{{ .File.BaseFileName }}">
        <h2>
          <a href="{{ .RelPermalink }}">{{ .Title }}</a>
          <span class="apparatus-meta">
            {{ if .Params.reviewed_by }}
              · {{ T "apparatus_reviewed_by" }}: {{ .Params.reviewed_by }}
            {{ end }}
            {{ if .Params.review_date }}
              · {{ T "apparatus_review_date" }}: {{ .Params.review_date }}
            {{ end }}
          </span>
        </h2>
        <ol class="apparatus-source-list">
          {{ range .Params.sources }}
            <li>{{ . }}</li>
          {{ end }}
        </ol>
      </section>
    {{ end }}
  {{ end }}
</div>
```

This satisfies Lev C3: each citation traceable to chapter slug + chapter URL anchor.

**`/apparatus/colophon/`** template logic similar, but pulls `reviewed_by`, `review_date`, `status`, `confidence` per chapter into a colophon table (see §2.4 for which fields aggregate where).

---

## 2. Chapter Frontmatter Migration Spec

### 2.1 Current chapter frontmatter (baseline from `chapter-1-jules-verne.md`)

```yaml
title: "..."
description: "..."
date: 2026-03-26
date_created: "..."
date_updated: "..."
weight: N
chapter: 1
act: "I: Origins"
category: analysis
status: verified | partially_verified
confidence: high | medium | low
authors: ["..."]
reading_time: "..."
reviewed_by: "..."
review_date: "..."
sources: [...]            # array of strings
tags: [...]
related: [...]
sensitive: false
toc: true
draft: false
```

### 2.2 Field disposition matrix

| Field | Action | Rationale |
|-------|--------|-----------|
| `title` | KEEP — rendered | Required for chapter heading |
| `description` | KEEP — rendered | Subtitle prose, narrative-relevant |
| `date`, `date_created`, `date_updated` | KEEP — metadata only (NOT rendered) | Schema integrity, validate-content.js dependency |
| `weight`, `chapter`, `act` | KEEP — used by layout (act-opener, chapter-plate) | Visual structure |
| `category` | KEEP — metadata only | validate-content.js dependency |
| `status` | KEEP in frontmatter (machine-readable) — REMOVE rendering | Migrates to `/apparatus/colophon/` aggregation; chapter view stays clean per Phase 1 recommendation |
| `confidence` | KEEP in frontmatter — REMOVE rendering (callout) | Same as `status`; aggregated in colophon |
| `authors` | KEEP — metadata only | Author attribution at apparatus level |
| `reading_time` | KEEP — rendered (low intrusion) | Reader UX, not editorial metadata |
| `reviewed_by`, `review_date` | KEEP in frontmatter — already non-rendering — VERIFY nothing reintroduces inline render | Aggregated in `/apparatus/colophon/` per Lev policy (apparatus-only visualization) |
| `sources` | **KEEP** in frontmatter — REMOVE any inline render — aggregated in `/apparatus/sources/` per Lev C3 | Per-chapter traceability preserved; aggregation page renders cross-chapter |
| `tags`, `related` | KEEP | Existing related-pages logic |
| `sensitive` | KEEP | Hextra/encyclopedia `sensitive: true` notice |
| `toc` | KEEP | Reader UX |
| `draft` | KEEP | Hugo build control |

### 2.3 Frontmatter render audit

Currently rendered (visible in HTML):

- `title`, `description` → `chapter-header` block
- `weight`, `chapter`, `act` → `chapter-plate.html` and `act-opener.html` (visual treatment)
- `reading_time` → may be displayed via theme (verify in Phase 3)

Currently NOT rendered (metadata only — leave as-is):

- `status`, `confidence`, `reviewed_by`, `review_date`, `sources`, `tags` (related uses tags but doesn't display), `category`, `authors`, `date_*`

**Critical finding from chapter-1-jules-verne.md line 50:** there is a literal blockquote in the markdown body:

```markdown
> **Verification Note:** This chapter has undergone comprehensive fact verification with T1 and T2 sources. As part of our banking-level editorial standards, all factual claims have been verified and sourced.
```

This is **markdown-level content**, not frontmatter render. Phase 3 must remove this blockquote from each chapter file (manual edit, ~14 chapters × 1 occurrence each = audit + sed-grade replacement). This is the apparatus content currently leaking into narrative.

### 2.4 Apparatus aggregation field map

| Apparatus page | Pulled from chapter frontmatter |
|----------------|--------------------------------|
| `/apparatus/colophon/` | `title`, `weight`, `reviewed_by`, `review_date`, `status`, `confidence`, `authors`, `date_created`, `date_updated` (per-chapter row in colophon table) |
| `/apparatus/sources/` | `title`, `weight`, `sources[]`, `reviewed_by`, `review_date` (per Lev C3) |
| `/apparatus/methodology/` | Static prose; no chapter aggregation |
| `/apparatus/transparency/` | Static prose; migrated from `/legal/ai-transparency/` |

### 2.5 Layout shortcodes/partials to remove or audit

Layout files to inspect for status/confidence/transparency render:

- `layouts/chapters/single.html` — currently clean per inspection (no status badge, no confidence callout, no AI banner). Confirm Phase 3.
- `layouts/chapters/list.html` — verify no status badge in chapter list cards.
- `layouts/_partials/custom/`, `layouts/partials/custom/` — check for `status-badge.html`, `status-callout.html`, `ai-transparency-banner.html`. **Currently absent** based on `ls layouts/partials/custom/` (only act-opener, chapter-plate, footer, kofi/cookie consent, schema, twitter-card). No removal needed for those; pre-emptive design ensures none are added.
- `layouts/shortcodes/` — chapter-break, chapter-visual, concept-illustration, figure-ref, plate, typography-showcase. None render apparatus metadata. No removal needed.

**Action:** Phase 3 audit confirms no apparatus-render partials/shortcodes exist; no removal required. The work is markdown body cleanup (§2.3 blockquote) plus adding new apparatus layouts/content.

---

## 3. Reading Flow Specifications

### 3.1 Apparatus discoverability map

| Surface | Apparatus link presence | Mandate |
|---------|------------------------|---------|
| Site-wide footer | "Apparatus" / "Технический аппарат" link | NEW — Phase 3 add |
| Site-wide footer | "AI Transparency" link (target: `/apparatus/transparency/` after migration) | EXISTING — update href, keep visible (Lev C1) |
| Site-wide footer | Privacy / Terms / Cookies | EXISTING — preserve |
| Homepage | "About" / "Methodology" link (one of: nav, body CTA) | NEW — add link to `/apparatus/methodology/` |
| Chapter `<header>` | Numbered footnote citations inline | EXISTING — preserve |
| Chapter body | Status badge, confidence callout, AI banner, methodology refs | NONE (already absent or to be removed per §2.3) |
| `/apparatus/_index/` | Cards linking to colophon, methodology, transparency, sources | NEW — Phase 3 add |

### 3.2 Reader-facing chapter view (after restructure)

What the reader sees on `/chapters/chapter-1-jules-verne/`:

- Breadcrumb (Hextra default)
- Act opener + chapter plate (engraved visual — keep, narrative element)
- `<h1>` chapter title
- `<p class="chapter-description">` subtitle
- Section break ornament
- Content body (narrative prose + inline images + figures + footnote superscripts)
- Footnotes section at bottom of body (current Hugo footnote rendering — `[^1]` style)
- Chapter conclusion ornament
- Pager (prev / next chapter)
- Site footer (with Apparatus link, AI Transparency link, Privacy / Terms / Cookies, Ko-fi)

What the reader does NOT see in chapter view:

- Status badge near title
- Confidence callout box before content
- "Verification Note" blockquote (REMOVED in Phase 3 per §2.3)
- AI Transparency banner per-chapter
- Methodology references inline in prose
- `reviewed_by` / `review_date` displayed
- `sources` array displayed (only inline footnote citations remain)

### 3.3 Researcher-facing apparatus view

For a researcher / reviewer / Lev compliance audit:

1. Footer "Apparatus" link → `/apparatus/`
2. `/apparatus/` lists 5 sub-sections with brief descriptions
3. `/apparatus/colophon/` shows full editorial board, per-chapter `reviewed_by`/`review_date`/`status`/`confidence` table, edition version, license
4. `/apparatus/sources/` shows per-chapter source aggregation (chapter title link → chapter URL, full source list ordered, reviewed_by attribution)
5. `/apparatus/methodology/` shows research methodology, fact-verification process, banking-level standards
6. `/apparatus/transparency/` shows full AI Transparency Statement (EU AI Act Art. 50)

---

## 4. Hugo Implementation Plan (Phase 3 numbered steps)

> **Scope boundary:** This section is the executable plan. Phase 3 starts ONLY after Андрей review of this design doc. Do NOT begin migration during Phase 2.

### Step 1 — Create apparatus content section

Files to create:

```
content/apparatus/_index.md             # RU landing (default lang)
content/apparatus/_index.en.md
content/apparatus/colophon.md
content/apparatus/colophon.en.md
content/apparatus/methodology.md
content/apparatus/methodology.en.md
content/apparatus/transparency.md       # MIGRATED prose from /legal/ai-transparency.ru.md
content/apparatus/transparency.en.md    # MIGRATED prose from /legal/ai-transparency.md
content/apparatus/sources.md
content/apparatus/sources.en.md
content/apparatus/acknowledgments.md
content/apparatus/acknowledgments.en.md
```

Frontmatter per §1.3 spec. `transparency.{md,en.md}` body = verbatim copy from `content/legal/ai-transparency*.md` (preserve all compliance prose).

### Step 2 — Migrate `/legal/ai-transparency/` → `/apparatus/transparency/` with HTTP 301 redirect

**Two redirect strategies considered (per §5 Risk Register):**

**Strategy A — Hugo aliases** (preferred for static-only deployment):

In `content/apparatus/transparency.md` and `transparency.en.md`:

```yaml
---
title: "AI Transparency Statement"
aliases:
  - /legal/ai-transparency/
  - /legal/ai-transparency
---
```

Hugo generates HTML redirect pages at `/legal/ai-transparency/index.html` with `<meta http-equiv="refresh" content="0; url=/apparatus/transparency/">`. **Limitation:** meta-refresh is HTTP 200 with client-side redirect, not true HTTP 301. Search engines treat it as 301-equivalent but compliance auditors may flag.

**Strategy B — Cloudflare Pages `_redirects` file** (preferred for true 301):

Create `static/_redirects`:

```
/legal/ai-transparency        /apparatus/transparency        301
/legal/ai-transparency/       /apparatus/transparency/       301
```

Cloudflare Pages reads `_redirects` and serves true HTTP 301. Verifiable via `curl -I`.

**Decision:** Use **Strategy B** (Cloudflare Pages `_redirects`) for compliance. Hugo aliases as belt+braces fallback (both file types coexist, no conflict).

Delete original `content/legal/ai-transparency.md` and `content/legal/ai-transparency.en.md` AFTER `_redirects` deployed and curl-verified (Phase 3 step 10 test plan).

### Step 3 — Update `layouts/partials/custom/footer.html`

Modify footer (currently 24 lines) to add Apparatus link and update AI Transparency href:

```html
<nav aria-label="Editorial apparatus">
  <p style="margin: 0 0 0.3rem; font-size: 0.75rem;">
    <a href="/apparatus/" style="color: inherit; font-weight: 600;">{{ T "footer_apparatus" }}</a>
  </p>
</nav>
<nav aria-label="Legal information">
  <p style="margin: 0 0 0.3rem; font-size: 0.75rem;">
    <a href="/legal/privacy/" style="color: inherit;">{{ T "footer_privacy" }}</a> &middot;
    <a href="/legal/terms/" style="color: inherit;">{{ T "footer_terms" }}</a> &middot;
    <a href="/legal/cookies/" style="color: inherit;">{{ T "footer_cookies" }}</a> &middot;
    <a href="/apparatus/transparency/" style="color: inherit;">{{ T "footer_ai_transparency" }}</a>
  </p>
</nav>
```

`T "footer_apparatus"`, `T "footer_ai_transparency"` translation keys added in Step 8.

**Lev C1 satisfied:** AI Transparency link remains visible on every page; target moved to `/apparatus/transparency/` (legal target also valid per Lev's wording, but apparatus target chosen for IA consistency).

### Step 4 — Audit chapter layouts for status badge / confidence callout / AI banner

Files to audit:

- `layouts/chapters/single.html` (47 lines — already inspected in Phase 2 prep, clean)
- `layouts/chapters/list.html` (verify clean)
- `layouts/_partials/custom/*.html` (no apparatus-render partials present)
- `layouts/partials/custom/*.html` (act-opener, chapter-plate, kofi-consent, cookie-consent, footer, schema, head-end, twitter-card — all unrelated to apparatus)

**Expected outcome:** zero deletions needed in layouts. Action: document audit result in `_meta/agil-127-phase3-execution-log.md`.

### Step 5 — Remove "Verification Note" blockquote from chapter markdown bodies

Per §2.3, manually audit and remove the literal blockquote pattern:

```markdown
> **Verification Note:** This chapter has undergone comprehensive fact verification with T1 and T2 sources. As part of our banking-level editorial standards, all factual claims have been verified and sourced.
```

Affected files (estimate, Phase 3 verifies via grep): up to 14 chapter files (`chapter-0-pilot.md`, `chapter-1` through `chapter-10`, plus 3 intermezzi).

Replacement: empty (delete the blockquote and any surrounding blank lines that would create double blank lines).

### Step 6 — Implement aggregated `/apparatus/sources/` template

Add Hugo template logic per §1.6 to `layouts/apparatus/single.html` (conditional on `.File.LogicalName == "sources.md"`).

Verify per-chapter grouping renders correctly (Phase 3 test): each chapter in `weight` order, source list complete, chapter title links to chapter, `reviewed_by` and `review_date` shown.

Translation keys for table headers: `apparatus_chapter`, `apparatus_sources`, `apparatus_reviewed_by`, `apparatus_review_date` (added Step 8).

### Step 7 — Implement aggregated `/apparatus/colophon/` template

Add Hugo template logic to `layouts/apparatus/single.html` (conditional on `.File.LogicalName == "colophon.md"`). Renders editorial board prose (from colophon.md body) plus per-chapter table:

| Chapter | Status | Confidence | Reviewed by | Review date |
|---------|--------|-----------|-------------|-------------|

Pulls from chapter frontmatter via `range (where .Site.Pages "Section" "chapters")`.

### Step 8 — i18n updates

Add translation keys to `i18n/ru.yaml` and `i18n/en.yaml`:

```yaml
# ru.yaml
- id: footer_apparatus
  translation: "Технический аппарат"
- id: footer_ai_transparency
  translation: "AI Transparency"
- id: footer_privacy
  translation: "Privacy Policy"
- id: footer_terms
  translation: "Terms"
- id: footer_cookies
  translation: "Cookies"
- id: apparatus_chapter
  translation: "Глава"
- id: apparatus_sources
  translation: "Источники"
- id: apparatus_reviewed_by
  translation: "Рецензент"
- id: apparatus_review_date
  translation: "Дата ревью"
- id: apparatus_status
  translation: "Статус"
- id: apparatus_confidence
  translation: "Достоверность"

# en.yaml — equivalent
- id: footer_apparatus
  translation: "Apparatus"
- id: footer_ai_transparency
  translation: "AI Transparency"
- id: apparatus_chapter
  translation: "Chapter"
- id: apparatus_sources
  translation: "Sources"
- id: apparatus_reviewed_by
  translation: "Reviewed by"
- id: apparatus_review_date
  translation: "Review date"
- id: apparatus_status
  translation: "Status"
- id: apparatus_confidence
  translation: "Confidence"
```

### Step 9 — `validate-content.js` schema update

Add `/apparatus/` section to validation:

- Frontmatter required for apparatus pages: `title`, `weight`, `type: apparatus`, `date_created`, `date_updated`, `status`, `draft`
- No required `sources[]` (apparatus pages prose-only OR aggregated)
- No required `confidence`, `reviewed_by`, `review_date` for apparatus pages (apparatus is itself the review)

Update `glob.sync('content/**/*.md')` patterns:

```js
const apparatusFiles = glob.sync('content/apparatus/**/*.md');
const chapterFiles = glob.sync('content/chapters/**/*.md');
const legalFiles = glob.sync('content/legal/**/*.md');
```

Add `validateApparatusFrontmatter(file)` function with apparatus-specific schema. Run alongside `validateChapterFrontmatter`.

### Step 10 — Test plan

**Build verification:**

```bash
hugo --gc --minify
# Expected: 0 errors, 0 warnings
```

**Redirect verification (per Lev C2):**

```bash
curl -I https://sapiens.folkup.life/legal/ai-transparency/
# Expected: HTTP/2 301
# Expected: location: /apparatus/transparency/

curl -I https://sapiens.folkup.life/apparatus/transparency/
# Expected: HTTP/2 200
```

**Footer link visibility (per Lev C1):**

Manual visual check on 4 page types:

- Homepage `/` (RU) and `/en/`
- Chapter page `/chapters/chapter-1-jules-verne/` (RU) and `/en/chapters/chapter-1-jules-verne/`
- Legal page `/legal/privacy/` (RU) and `/en/legal/privacy/`
- Declaration page (if exists) — fallback: any `/about/` page

Confirm in each: footer contains visible "Apparatus" link AND visible "AI Transparency" link.

**Chapter cleanliness:**

Open `/chapters/chapter-1-jules-verne/` in browser. Verify ABSENT:

- Status badge near title
- Confidence callout box
- "Verification Note" blockquote
- AI Transparency banner per-chapter

**Apparatus aggregation correctness (per Lev C3):**

Open `/apparatus/sources/`. Verify:

- Each chapter listed in weight order
- Chapter title is clickable link → chapter URL
- All sources from chapter frontmatter rendered as `<ol><li>` list
- `reviewed_by` and `review_date` rendered next to chapter heading

**Playwright regression:**

Existing Playwright tests (4 page types per AGIL-119): home / chapter / legal / declaration. Run as-is — should PASS with footer link addition (link added, not removed). Add NEW tests for apparatus pages: `apparatus-index`, `apparatus-transparency`, `apparatus-sources`, `apparatus-colophon` — verify render, h1 present, footer present, no console errors.

**axe-core:**

```bash
npx @axe-core/cli http://localhost:1313/apparatus/ \
  http://localhost:1313/apparatus/colophon/ \
  http://localhost:1313/apparatus/sources/ \
  http://localhost:1313/apparatus/methodology/ \
  http://localhost:1313/apparatus/transparency/
# Expected: 0 violations on each
```

**Lighthouse:**

Performance / Accessibility / SEO ≥ 90 on each apparatus page (RU + EN).

**WCAG 2.1 AA contrast:**

Run `scripts/wcag-contrast-check.cjs` — all apparatus tokens (`var(--folkup-*)`) reuse existing brand canonical (no new tokens introduced). Expected PASS, identical to chapter pages.

---

## 5. Risk Register

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R1 | Hugo aliases (meta-refresh) insufficient for true HTTP 301 — compliance auditor flag | Medium | Medium | Use Cloudflare Pages `_redirects` file (Strategy B in Step 2). Hugo aliases as belt+braces fallback. Verify via `curl -I` in test plan. |
| R2 | `validate-content.js` script breaks on new apparatus content type | High if schema changes silently | Medium | Step 9 explicitly updates validator. Run validator before each commit. Pre-commit hook integration. |
| R3 | i18n drift — RU complete, EN translation lag (apparatus prose authored in RU first) | High | Medium | Author RU prose first; translate EN within same PR. Use translation memory consistent with chapter EN translations (literary tone preserved). Engage translator (Андрей) for EN approval. |
| R4 | WCAG / accessibility regression on new apparatus pages | Low (reuses canonical tokens) | Medium | Apparatus pages reuse `var(--folkup-*)` per AGIL-114/115 canonical. Run axe-core + Lighthouse + WCAG math (`wcag-contrast-check.cjs`) per test plan Step 10. |
| R5 | Brand inconsistency — apparatus pages drift from monograph aesthetic | Low | Low | Apparatus layouts (`layouts/apparatus/`) explicitly reuse `content-enhanced classical-typography content-hierarchy hx:content` wrapper from chapter layout. Same `assets/css/typography-classical.css`. No new brand decisions. |
| R6 | Frontmatter schema change orphans existing scripts (chapter-plates-postprocess.sh, etc.) | Low | Low | Field disposition matrix (§2.2) preserves ALL existing chapter frontmatter fields. No removal — only `status`/`confidence` rendering removed (which currently isn't rendering). Scripts unaffected. |
| R7 | Per-chapter source attribution lost in aggregation (Lev C3 violation) | Low (aggregation template explicit) | High (compliance fail) | §1.6 aggregation template uses chapter-by-chapter grouping with chapter title link + reviewed_by. Verified in test plan via manual inspection. |
| R8 | EU AI Act compliance lapse during migration window — `/legal/ai-transparency/` unreachable before `/apparatus/transparency/` live | Medium (if redirect not atomic) | High (Tier 1 compliance) | Atomic deployment: create new apparatus page first, deploy, verify `/apparatus/transparency/` 200, THEN deploy `_redirects` file with 301, THEN delete legacy `/legal/ai-transparency.md`. Order matters. |
| R9 | Existing Playwright tests fail on footer markup change | Low | Low | Footer change is additive (link added, not removed). Existing tests check for presence of legal links; new link doesn't break them. Add new apparatus tests separately. |
| R10 | Cloudflare cache holds legacy URL → reader sees stale 200 on `/legal/ai-transparency/` | Medium | Low | Run `scripts/purge-cloudflare.js` after deployment per existing CI/CD pattern. Verify 301 via uncached `curl -H "Cache-Control: no-cache"`. |
| R11 | Author/translator capacity bottleneck for 6 new apparatus pages × 2 languages = 12 docs | Medium | Medium (timeline) | Phase 3 effort estimate (§7) accounts for content authoring. methodology/colophon prose can be ~300-500 words each (concise). transparency.md migrated verbatim (zero new prose). |
| R12 | Markdown blockquote removal (Step 5) introduces unintended diff in 14 chapters — git history bloat / review difficulty | Low | Low | Single semantic change per file, well-defined pattern. Use single PR titled "AGIL-127 Phase 3 Step 5: remove Verification Note blockquote from chapter narratives" with grep evidence in PR body. |

**Risk consolidation:** R1, R8, R10 are all about migration atomicity → bundled in deployment runbook (Phase 3). R2, R6 are validator concerns → bundled in Step 9. R3 is i18n → bundled in Step 8 + author capacity (R11).

---

## 6. Acceptance Criteria for Phase 3 (migration execution)

Phase 3 is COMPLETE when ALL of the following PASS:

### Build & validation

- [ ] `hugo --gc --minify` = 0 errors, 0 warnings on `main`
- [ ] `node scripts/validate-content.js --check=all` = 0 errors
- [ ] `node scripts/validate-content.js --check=frontmatter` covers apparatus pages (Step 9 verified)

### Apparatus pages rendered

- [ ] `/apparatus/` (RU) renders with cards/links to colophon, methodology, transparency, sources
- [ ] `/en/apparatus/` (EN) renders mirror
- [ ] `/apparatus/colophon/` (RU + EN) renders editorial board + per-chapter table
- [ ] `/apparatus/methodology/` (RU + EN) renders methodology prose
- [ ] `/apparatus/transparency/` (RU + EN) renders AI Transparency Statement (verbatim from migrated `/legal/`)
- [ ] `/apparatus/sources/` (RU + EN) renders per-chapter aggregated sources with chapter title links

### Redirects (Lev C2)

- [ ] `curl -I https://sapiens.folkup.life/legal/ai-transparency/` returns HTTP 301 with Location: `/apparatus/transparency/`
- [ ] `curl -I https://sapiens.folkup.life/legal/ai-transparency` (no trailing slash) returns HTTP 301
- [ ] `curl -I https://sapiens.folkup.life/en/legal/ai-transparency/` returns HTTP 301 to `/en/apparatus/transparency/`
- [ ] Final destination returns HTTP 200

### Footer (Lev C1)

- [ ] Footer "Apparatus" link visible on homepage, chapter, legal, declaration pages (RU + EN, 8 pages × 2 = manual check)
- [ ] Footer "AI Transparency" link visible on same 8 pages, target = `/apparatus/transparency/` (or `/en/apparatus/transparency/` for EN)
- [ ] Footer Privacy / Terms / Cookies links preserved

### Chapter narrative cleanliness

- [ ] No status badge in any chapter HTML (visual inspection 14 chapters × 2 lang = 28 pages — spot-check 4)
- [ ] No confidence callout box in chapter HTML (same scope)
- [ ] No "Verification Note" blockquote in chapter HTML (`grep -rL "Verification Note" content/chapters/` returns ALL chapters; `grep -rl` returns NONE)
- [ ] No AI Transparency banner per-chapter (visual inspection)
- [ ] Numbered footnote citations preserved (sample chapter-1-jules-verne — footnote `¹` superscript present, footnote at body bottom rendered)

### Source attribution preserved (Lev C3)

- [ ] `/apparatus/sources/` renders each chapter source list under chapter title heading
- [ ] Chapter title is clickable `<a>` linking to chapter URL
- [ ] `reviewed_by` and `review_date` shown next to each chapter group
- [ ] Source order matches chapter frontmatter array order

### Accessibility & performance

- [ ] axe-core: 0 violations on 5 apparatus pages × 2 lang = 10 audits
- [ ] Lighthouse: a11y / performance / SEO ≥ 90 on apparatus pages
- [ ] WCAG 2.1 AA contrast PASS via `scripts/wcag-contrast-check.cjs` (no new tokens introduced)
- [ ] Touch targets ≥ 44×44px on apparatus nav cards (manual inspection or axe touch-target rule)
- [ ] Focus visible on apparatus links/cards (keyboard nav check)

### Tests

- [ ] Existing Playwright 4-page-type test suite PASS (no regression)
- [ ] New Playwright tests added for apparatus pages: `apparatus-index`, `apparatus-transparency`, `apparatus-sources`, `apparatus-colophon` — each verifies HTTP 200, h1 present, footer present, no console errors
- [ ] Cloudflare cache purged post-deploy

### Compliance evidence

- [ ] `_meta/agil-127-phase3-execution-log.md` created with: deployment timestamp, curl evidence (redirect 301 verified), Lighthouse scores, axe results, screenshots of footer on 4 page types, Playwright test results
- [ ] BACKLOG entry AGIL-127 updated with `status: done`, `date_completed`, `evidence: <commit-sha>`

### Banking-level final review

- [ ] Andrey approval (заказчик)
- [ ] Brand-manager approval (Фонарщик via `/brand` skill)
- [ ] Lev sign-off (compliance) — verify C1, C2, C3 met

---

## 7. Phase 3 Scope Estimate (effort hours)

| Sub-task | Hours (low) | Hours (high) | Notes |
|----------|------------|-------------|-------|
| Hugo section structure + 2 layouts (`list.html`, `single.html`) | 3 | 5 | Straightforward; reuses chapter wrapper patterns |
| Aggregation templates (sources + colophon Hugo logic) | 4 | 7 | Hugo template iteration, weight ordering, conditional render — moderate |
| Content authoring: `_index.{ru,en}` (overview, ~200 words each) | 1 | 2 | RU primary, EN translate |
| Content authoring: `colophon.{ru,en}` (~400 words each) | 2 | 3 | Editorial board, license, edition; RU + EN |
| Content authoring: `methodology.{ru,en}` (~500 words each) | 3 | 4 | Banking-level methodology, fact-verification process; RU + EN |
| Content migration: `transparency.{ru,en}` (verbatim from /legal/) | 0.5 | 1 | Copy + frontmatter adjust |
| Content authoring: `acknowledgments.{ru,en}` (~150 words each) | 0.5 | 1 | Credits |
| `sources.{ru,en}` body prose (~150 words each — intro to aggregation) | 0.5 | 1 | Prose intro; aggregation rendered by template |
| Footer update + i18n keys (Step 3 + Step 8) | 1 | 2 | Edit footer.html, add 12+ translation keys × 2 lang |
| Cloudflare `_redirects` + Hugo aliases (Step 2) | 1 | 2 | `_redirects` file creation, alias frontmatter, deployment runbook |
| `validate-content.js` schema update (Step 9) | 2 | 3 | New `validateApparatusFrontmatter` function, integration |
| Markdown body cleanup — remove Verification Note blockquote (Step 5) | 1 | 2 | 14 chapters × find/remove + git diff review |
| Playwright tests new (4 apparatus pages) | 2 | 3 | Test scaffolding, basic assertions |
| axe-core + Lighthouse runs | 1 | 2 | 10 page audits |
| WCAG math + manual visual checks | 1 | 2 | 8 page footer checks + chapter cleanliness |
| Deployment + curl verification + Cloudflare purge | 1 | 2 | Atomic deployment per R8 |
| Documentation: `_meta/agil-127-phase3-execution-log.md` | 1 | 2 | Evidence collection |
| **Total Phase 3** | **24.5** | **44** | **~25-44 hours** |

**Effort range: 25-44 hours total Phase 3.** Mid-point estimate: **~32 hours** (~1 week of focused work).

Risk-adjusted (apply +20% buffer for i18n iteration, brand review feedback, deploy-runbook surprises): **30-50 hours**.

---

## 8. Reference Materials

- Phase 1 research: `_meta/agil-127-research-apparatus-separation.md` (KAQ Pattern E + Pattern C recommendation)
- Citation compliance: `~/.claude/rules/citation-compliance.md` (footnotes mandatory)
- Encyclopedia frontmatter schema: `~/.claude/rules/encyclopedia.md`
- Publication compliance: `~/.claude/rules/publication-compliance.md`
- AGIL-114/115 brand canonical: `_meta/agil-114-plan.md`, `_meta/agil-114-verify.md`
- AGIL-119 navbar architecture: `feedback_hextra_navbar_architecture` (MEMORY.md)
- Existing chapter layout: `layouts/chapters/single.html`
- Existing footer: `layouts/partials/custom/footer.html`
- Existing validator: `scripts/validate-content.js`
- Existing legal page (transparency source): `content/legal/ai-transparency.md`, `content/legal/ai-transparency.en.md`

### External references (Standard Ebooks digital colophon model)

- Standard Ebooks colophon pattern: `standardebooks.org/ebooks/jules-verne/around-the-world-in-eighty-days` (landing = full apparatus, `/text/` = clean read)
- Project Gutenberg apparatus separation: `gutenberg.org/ebooks/103`

---

## 9. Open Questions for Andrey Review

1. **Bibliography vs Sources separation** (§1.5): Phase 3 v1.0 ships `/apparatus/sources/` only (aggregated bibliography). Should `/apparatus/bibliography/` be a Phase 3.5 enhancement, or skipped entirely?

2. **Acknowledgments page scope** (§1.2): Should acknowledgments page list contributors (literary references, beta readers, hostile reviewers) or remain minimal (FolkUp brand + license attribution only)?

3. **Methodology content authoring** (§7 estimate): Should methodology page be authored by Andrey (заказчик), or drafted internally and reviewed?

4. **Edition versioning in colophon** (§1.4): Should colophon include an explicit edition version number (e.g., "Edition 1.0, April 2026"), and if so, what update cadence? (After AGIL-112 v1.0.0 tag, future tags increment; pre-v1.0 was v0.x.)

5. **Translator attribution for EN apparatus pages** (Risk R3): Andrey self-translates, or engage external translator? If external — name attribution in colophon?

6. **Deployment window** (§5 R8): Phase 3 deployment must be atomic to avoid `/legal/ai-transparency/` unreachable window. Schedule maintenance window, or Cloudflare staged rollout?

7. **Chapter "Verification Note" blockquote removal** (§2.3): Is the planned wholesale removal acceptable, or should some chapters keep an editorial note in narrative voice (rewritten, less compliance-y, more academic)?

---

*Phase 2 design doc complete. Awaiting Andrey review before Phase 3 execution.*
*Author: Specialized Suite (academic UX) per `/specialized-suite` skill.*
*Last updated: 2026-04-26.*
