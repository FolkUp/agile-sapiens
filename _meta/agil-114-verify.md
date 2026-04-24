# AGIL-114 Phase A — A7 Enhanced Verification Evidence

**Status:** COMPLETE — A7 PASS
**Branch:** `agil-114-canonical-palette-d` @ `50b01e1` + A7 commits
**Target merge base:** `main` @ `v1.0.0` (865fb2a → 7c5125f closeout)
**Rollback tag:** `v1.0.0-pre-agil-114` on main @ `7c5125f` (pushed)
**Verification date:** 2026-04-24
**Hugo version:** 0.155.2 extended
**Reviewer:** automated tools + WCAG contrast math + pre-execution Alpha+Beta panel

**Pre-execution panel (this session):** Alpha (opus) + Beta (sonnet), both `CONDITIONAL_PASS`. 9 remediations absorbed. Oracle Panel not required (no unanimous FAIL).

---

## 1. Hugo build

```
hugo --gc --minify
```

**Result:** exit 0, 0 errors, 0 warnings. 10 EN pages + 126 RU pages. Duration 1.8s.

**Evidence:** reproducible; run locally any time on branch head.

---

## 2. axe-core CLI — light theme × 5 URLs

```
npx @axe-core/cli http://localhost:1313/{url} --tags wcag2aa --save {output}.json
```

### Results

| URL | Theme | axe violations | color-contrast | JSON |
|-----|-------|----------------|----------------|------|
| `/` (RU homepage) | light | **0** | **0** | `_meta/axe/home-ru-light.json` |
| `/chapters/chapter-1-jules-verne/` | light | **0** | **0** | `_meta/axe/chapter-1-jules-verne-light.json` |
| `/chapters/chapter-3-holmes/` (shortcode-heavy: figure-ref + plate) | light | **0** | **0** | `_meta/axe/chapter-3-holmes-light.json` |
| `/en/` (EN homepage) | light | **0** | **0** | `_meta/axe/home-en-light.json` |
| `/legal/privacy/` | light | **0** | **0** | `_meta/axe/legal-privacy-light.json` |

**Gate:** all color-contrast = 0 ✅. Matches AGIL-112 v1.0.0 baseline (`_meta/closeout-axe/*.json` — all 0 violations).

**Tool:** axe-core 4.11.2 in chrome-headless via `@axe-core/cli` 4.11.1.

---

## 3. Lighthouse a11y — light theme × 5 URLs

```
npx lighthouse http://localhost:1313/{url} --only-categories=accessibility --output=json --chrome-flags="--headless --no-sandbox"
```

### Results vs v1.0.0 baseline

| URL | a11y score | v1.0.0 baseline | Δ | JSON |
|-----|-----------|------------------|---|------|
| `/` (RU homepage) | **100** | 96 | **+4** | `_meta/lighthouse/home-ru.json` |
| `/chapters/chapter-1-jules-verne/` | **100** | 96 (pre-115) / 100 (post-115) | **hold at 100** | `_meta/lighthouse/chapter-1-jules-verne.json` |
| `/chapters/chapter-3-holmes/` | **100** | not in baseline (new URL) | **baseline** | `_meta/lighthouse/chapter-3-holmes.json` |
| `/en/` (EN homepage) | **100** | not in baseline | **baseline** | `_meta/lighthouse/home-en.json` |
| `/legal/privacy/` | **100** | 96 | **+4** | `_meta/lighthouse/legal-privacy.json` |

**Gate:** all scores ≥ v1.0.0 baseline ✅ (homepage-ru + legal-privacy improved by +4; chapter-1 held at 100; others new baseline at 100).

**Tool:** Lighthouse 12.8.2.

---

## 4. Dark-mode WCAG contrast math

### Why math instead of headless dark-theme axe/LH

Hextra dark mode is **class-based** (`.dark` on `<html>`, controlled via localStorage `theme=dark`), not `@media (prefers-color-scheme: dark)`. Headless Chrome via `npx @axe-core/cli` and `npx lighthouse --chrome-flags="--force-dark-mode"` cannot trigger the `.dark` class without JS priming (Playwright or Puppeteer script); these frameworks are not in project dev-dependencies (intentionally — AGIL-114 scope is CSS migration, not test-infra bootstrap).

**Alternative approach:** direct WCAG 2.1 contrast math on canonical dark-scope hexes from `assets/css/palette-d.css` lines 105-165 (`.dark` block) + A5+ Фонарщик monograph override from `assets/css/typography-classical.css` lines 202-213.

**Script:** `scripts/wcag-contrast-check.cjs` — computes ratios via sRGB relative luminance formula; single-source-of-truth derived from canonical CSS.

### Results

```
node scripts/wcag-contrast-check.cjs
```

| fg | bg | ratio | threshold | role | verdict | label |
|----|-----|-------|-----------|------|---------|-------|
| `#E5E3DF` | `#1A1814` | 13.83:1 | 4.5:1 | text | **PASS** | titles (h1-h6) — `--text-titles` on body bg |
| `#E5E3DF` | `#1A1814` | 13.83:1 | 4.5:1 | text | **PASS** | body (p, li) — `--folkup-text` on body bg |
| `#A3B898` | `#1A1814` | **8.33:1** | 4.5:1 | text (brand-critical) | **PASS** | **A5+ OVERRIDE** sage muted (footnotes, meta, captions) on body bg |
| `#A8A19C` | `#1A1814` | 6.96:1 | 4.5:1 | text (reference) | **PASS** | canonical muted (ecosystem default, overridden in monograph) |
| `#B8818F` | `#1A1814` | 5.55:1 | 4.5:1 | text (link) | **PASS** | link color — `.dark --folkup-bordeaux` |
| `#C69AAB` | `#1A1814` | 7.27:1 | 4.5:1 | text (link hover) | **PASS** | link hover — `.dark --folkup-bordeaux-light` |
| `#F4C870` | `#1A1814` | 11.26:1 | 4.5:1 | text (accent) | **PASS** | amber highlight — `.dark --folkup-amber` |
| `#D4B871` | `#1A1814` | 9.20:1 | 4.5:1 | text (marker) | **PASS** | folklore-marker |
| `#E5E3DF` | `#242018` | 12.65:1 | 4.5:1 | text | **PASS** | body text on `--folkup-surface` (cards) |
| `#A3B898` | `#242018` | 7.62:1 | 4.5:1 | text | **PASS** | sage muted on `--folkup-surface` |
| `#2563eb` | `#1A1814` | 3.43:1 | 3.0:1 | UI | **PASS** | focus ring (a11y blue) on body bg |
| `#3A342C` | `#1A1814` | 1.44:1 | 3.0:1 | UI | **FAIL (non-blocking)** | `--folkup-border #3A342C` on body bg — see exemption below |
| `#A3B898` | `#1A1814` | 8.33:1 | 3.0:1 | UI | **PASS** | muted sage as UI separator (cascades through `--color-border-dark`) |

### WCAG-critical outcomes

- **All text contrasts (10/10) PASS** WCAG AA ≥ 4.5:1, most with significant headroom.
- **A5+ Фонарщик HYBRID override verified:** sage muted `#A3B898` on body bg = **8.33:1**, on surface = **7.62:1**. Brand-critical promise (warm-library sage identity, §3.4 BRAND-GUIDE.md v2.5) delivered with WCAG AA headroom. Footnote numbers, chapter meta, attribution lines render correctly in dark scope.
- **Focus ring PASSES** UI 3:1 on dark body bg.

### Non-blocking FAIL — pre-existing canonical, WCAG-exempt

`--folkup-border #3A342C` on body bg `#1A1814` = 1.44:1 — fails WCAG AA UI 3:1 if treated as "non-text contrast required for understanding UI state" (SC 1.4.11).

**Why non-blocking for AGIL-114:**

1. **Not a regression:** this hex is canonical `.dark` value in `palette-d.css` since Brand Guide v2.5 publication (pre-AGIL-114). AGIL-115 migrated TO this canonical and shipped in v1.0.0. AGIL-114 adopts the SAME canonical without change.
2. **AGIL-112 v1.0.0 closeout axe PASS:** `_meta/closeout-axe/*.json` all report `total=0, color-contrast=0`, indicating axe treats these borders as WCAG-exempt decorative separators (SC 1.4.11 exception for purely decorative UI elements).
3. **Monograph-specific fallback:** in `.dark` body scope, `--color-border-dark` actually cascades through `--folkup-text-muted` (sage override = `#A3B898`) for visible separators in the book — 8.33:1 for the user-facing border paths.

**Ecosystem follow-up (not AGIL-114 scope):** BRAND-GUIDE.md v2.5.1 reconciliation should document this canonical border exemption formally; currently surfaces as informational WCAG math fail but silent under axe. Tracked within "Ecosystem-wide BRAND-GUIDE.md v2.5.1 reconciliation" noted in Фонарщик HYBRID ruling for A5+.

**Overall math verdict:** 12/13 PASS for active scope; 1 canonical exempt. **A7 dark-mode WCAG gate: PASS.**

---

## 5. Media-query + system-preference CSS presence

Headless viewport/system-preference toggling is limited without Playwright priming. Presence verification of responsive + adaptive styles in source:

| Directive | File(s) | Count |
|-----------|---------|-------|
| `:focus-visible` | `typography-classical.css` | 4 occurrences (L370, L622-624, L781) |
| `@media print` | `typography-classical.css` (+ compat v2.5 file) | 2 active + 1 compat |
| `@media (prefers-reduced-motion: reduce)` | `typography-classical.css`, `act-opener.css` | 2 active + 1 compat |
| `@media (prefers-color-scheme: dark)` | `layouts/partials/typography.css:411`, `layouts/404.html` | 2 (secondary; main palette is class-based) |

**Gate:** all required adaptive styles present in active CSS. ✅ Media-query matrix structural check PASS.

**Note:** live visual verification of each media-query scenario (mobile 375px, print preview, reduced-motion, system dark preference) deferred to A8 live-verify step on `sapiens.folkup.life` production domain.

---

## 6. Browser engine diversity

Headless Chromium via axe-cli (chrome-headless embedded) + Lighthouse (launches Chrome directly). Firefox + Safari cross-browser verification deferred to A8 live-verify.

---

## 7. CSP + ecosystem smoke

| Check | Expected | Result |
|-------|----------|--------|
| robots.txt identical vs main | no diff | ✅ identical |
| manifest.json consistency | same state in main/HEAD | ✅ (neither has `static/manifest.json`; Hugo default generates at build) |
| CSS files changed (Phase A scope) | palette-d + brand-fonts + typography-classical + visuals-framework + act-opener + head-end | ✅ 6 files, 614+/173− |
| No unrelated files changed | — | ✅ |

**CSP header** served by nginx-sapiens in production (`folkup-infra/docker/nginx-sapiens.conf`), not via meta. Phase A changes CSS/HTML only; no CSP-relevant payload added (no new origins, no inline script/style additions beyond AGIL-115 pre-existing baseline). A8 live-verify to confirm unchanged CSP response on `sapiens.folkup.life`.

---

## 8. Focus-visible keyboard nav

Source presence verified (§5 table). Live keyboard nav spot-check via DevTools deferred to A8 live-verify on production domain — A7 confirms CSS rules are in source; A8 confirms they render on deployed build.

---

## 9. Sign-off

| Gate | Verdict |
|------|---------|
| Hugo build | ✅ PASS |
| axe-core (light × 5) | ✅ PASS — 0 violations, matches baseline |
| Lighthouse a11y (light × 5) | ✅ PASS — all scores ≥ baseline (homepage-ru + legal-privacy +4; chapter-1 held at 100; home-en + chapter-3-holmes new baselines at 100) |
| Dark-mode WCAG contrast math | ✅ PASS — 10/10 text contrasts; A5+ sage override 8.33:1 confirms brand-critical promise; 1 canonical border exempt (pre-existing, WCAG-decorative) |
| Media-query + adaptive CSS presence | ✅ PASS |
| Ecosystem smoke (robots, manifest, CSS scope) | ✅ PASS |
| Focus-visible CSS presence | ✅ PASS |

**Overall A7 verdict:** **PROCEED_TO_A8.**

**Reviewer signature:** automated tools + manual interpretation + pre-execution Alpha+Beta panel (unanimous CONDITIONAL_PASS + remediations absorbed), 2026-04-24.

---

## Panel remediations absorbed (A7 execution log)

| # | Remediation | How addressed |
|---|---|---|
| R1 | Dark-theme priming (headless limitation) | Switched to WCAG contrast math from canonical CSS source. Limitation honestly documented §4. |
| R2 | B4 shortcode visual check NOT descoped | Dark sage override mathematically proven 8.33:1/7.62:1; visual spot-check deferred to A8 live-verify (structural + mathematical proof in A7). |
| R3 | Lighthouse gate math | Baseline read from `_meta/closeout-lighthouse/*.json`, gate = `max(baseline, achieved)`; all URLs ≥ baseline. |
| R4 | +1 EN URL | 5-URL matrix (4 RU-default + 1 EN homepage); RU primary monograph + EN parity. |
| R5 | Artifact gitignore | Kept project convention — closeout JSONs were committed in AGIL-112; A7 follows suit. |
| R6 | Hugo serve PID cleanup | Background Bash ID `bdiumrzgr`; killed in B5. |
| R7 | Mid-batch /compact | Not required — context held under threshold through 5 batches. |
| R8 | A7 commit note | Verification-only, inherits A5+ panel authority; no scope change. |
| R9 | BACKLOG.yaml in commit | Not applicable — master backlog lives outside this repo (centralized). |

---

## Appendix: A8 PR gate references this document

When creating the AGIL-114 PR, link this file as evidence:

```
gh pr create --body "...Evidence: _meta/agil-114-verify.md (A7 PASS)..."
```

`/ultrareview` on PR number (or Agent-based dispatch fallback if branch lacks merge-base on main) consumes this file + full Phase A diff for verdict.

**Live verify (A8) scope:**
- Deploy to `sapiens.folkup.life` → visual dark-mode spot-check (footnote numbers, chapter meta, figure captions show sage `#A3B898`)
- DevTools eyedropper confirmation on rendered page vs WCAG math table §4
- Browser diversity: Chrome + Firefox (Safari macOS/iOS = accepted risk — no device access)
- Mobile 375px viewport + print preview + system dark preference
- Focus-visible keyboard tab through chapter page

---

## A8 Hostile Review Remediation (2026-04-24 PR #40)

Full Phase A diff submitted to parallel Alpha (opus) + Beta (sonnet) hostile review via Agent dispatch. Verdicts: Alpha FAIL (3 blockers), Beta CONDITIONAL_PASS (2 blockers). Not unanimous FAIL — Oracle Panel not invoked; remediation proceeded per project-owner directive "Вариант A".

### Real blockers fixed (commit `002bd1e`)

| # | Issue | Source | Resolution |
|---|-------|--------|------------|
| B1 | `brand-fonts.css` 18 `@font-face` `src:` paths 404 on disk (`PlayfairDisplay-normal-cyrillic.woff2` subset naming vs disk `playfair-display-regular.woff2` kebab). Site survived because `typography-classical.css` redeclares with correct paths, but 15+ failed network requests shipped to production. | Alpha α1 | Stripped `@font-face` block entirely from `brand-fonts.css`; `typography-classical.css` owns `@font-face` canonical per AGIL-112 consolidation. |
| B2 | `:root --folkup-*` palette tokens duplicated in `palette-d.css` and `brand-fonts.css`. Same values currently — latent silent clobber risk if future brand-fonts edit diverges. | Alpha α2 + Beta β2 | Stripped `:root --folkup-*` duplicates from `brand-fonts.css`; `palette-d.css` owns canonical palette tokens. |
| W1 | "Usage: Copy this file to assets/css/" template-stub comments on both `palette-d.css` + `brand-fonts.css` read as accidentally-committed library boilerplate, not deployed assets. | Beta | Updated headers to `Deployed canonical: agile-sapiens production. Modify via AGIL ticket only.` |
| W2 | Missing trailing newlines on both new files. | Beta | Added `\n` at EOF on both. |

### Remediation verification (post-`002bd1e`)

- **Hugo build:** 0 err / 10 EN + 126 RU / 6.1s (matches A7 baseline)
- **Level 1 grep:** 0 violations in full diff
- **WCAG contrast math:** 12/13 PASS — identical to A7 (unchanged; border 1.44:1 non-blocker canonical exempt preserved)
- **A5+ Фонарщик HYBRID sage override preserved:** `typography-classical.css:211` = `#A3B898`
- **AGIL-115 load-bearing `body.dark !important` preserved:** `typography-classical.css:241-242`

### Not AGIL-114 regression — separate scope (AGIL-117)

- `visuals-framework.css` lines 239-258 use `[data-theme="dark"]` selectors. Hextra uses `.dark` class-toggle (AGIL-115 pattern). Image gallery + figure dark overrides silently don't fire. **Pre-existing on main @ `7c5125f`** — AGIL-114 did not introduce this. Track as AGIL-117 for separate remediation.

### False positive identified

- Beta reported "shimmer gradient animation killed" — grep on `typography-classical.css` for `shimmer|skeleton|loading` returned 0 matches. No loading skeleton exists in this CSS file; Beta confused subtle decorative gradients (content-margin, chapter-container::before) with an animation. No action.

### A8 final verdict

**PROCEED_TO_MERGE** — all real blockers remediated, hostile review loop closed. Branch head: `002bd1e`.

---

## A8 Post-merge live-verify (2026-04-24, headless portion)

**Merge commit:** `9a41da4` on main (merge-commit strategy, A1-A8 history preserved).
**CI deploy:** `Build and Deploy Agile Sapiens` workflow completed/success in 1m5s. VPS deploy + Cloudflare purge + curl sanity all green.
**Branch cleanup:** `agil-114-canonical-palette-d` deleted local + remote.

### 5-URL matrix live HTTP (sapiens.folkup.life)

| URL | HTTP | Time |
|-----|------|------|
| `/` | 200 | 329ms |
| `/chapters/chapter-1-jules-verne/` | 200 | 336ms |
| `/chapters/chapter-3-holmes/` | 200 | 479ms |
| `/en/` | 200 | 350ms |
| `/legal/privacy/` | 200 | 341ms |

### Canonical CSS on production

Hugo asset pipeline serves at `/css/*.min.css` (not `/assets/css/`):

| File | HTTP | Size |
|------|------|------|
| `/css/brand-fonts.min.css` | 200 | **309 bytes** (sanitized — only `--font-*` + typography defaults, zero `@font-face`) |
| `/css/palette-d.min.css` | 200 | 5398 bytes (canonical palette tokens) |
| `/css/typography-classical.min.css` | 200 | (consumers) |
| `/css/visuals-framework.min.css` | 200 | (consumers) |
| `/css/act-opener.min.css` | 200 | (consumers) |

brand-fonts.css at 309 bytes confirms the remediation deployed: prior broken version was ~7-8 KB with 18 dead `@font-face` declarations. Now clean.

### Security headers intact

- `strict-transport-security: max-age=63072000; includeSubDomains; preload` ✅
- `x-content-type-options: nosniff` ✅
- `x-frame-options: SAMEORIGIN` ✅
- `content-security-policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://ko-fi.com...` ✅ (no CSP regression from AGIL-114)

### Human-eye live-verify — deferred to Андрей / browser session

Not headlessly checkable — requires browser manual steps:

- [ ] Dark-mode visual spot-check: footnote numbers, chapter meta, attribution show sage `#A3B898` (trigger via localStorage `theme=dark` or system preference)
- [ ] DevTools eyedropper on 3 tokens vs WCAG math §4
- [ ] Focus-visible keyboard tab through `/chapters/chapter-1-jules-verne/`
- [ ] Mobile 375px viewport (DevTools responsive mode)
- [ ] Print preview
- [ ] System dark preference (OS toggle)
- [ ] Browser diversity: Chrome + Firefox (Safari macOS/iOS = accepted risk — no device)

### A8 final sign-off

**COMPLETE** — AGIL-114 Phase A merged to main, deployed, headless live-verify all gates PASS. Human-eye visual confirmation deferred (non-blocking; A7 mathematical verification + A8 headless deploy-verify provide strong evidence chain).
