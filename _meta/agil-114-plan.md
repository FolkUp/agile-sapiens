# AGIL-114 — Canonical Palette D CSS Migration — Execution Plan

**Date created:** 2026-04-22 (post-v1.0.0 session)
**Status:** Phase A in progress (A1-A3 to be committed this session, A4-A8 handed off)
**Branch:** `agil-114-canonical-palette-d`
**Authority:** Level 3 Cartouche Autonome (Андрей carte blanche, consolidated expert panel decides order)

---

## 1. Alpha+Beta verdict synthesis

Both supervisors returned **CONDITIONAL_PASS** with complementary angles.

### Alpha (opus, architecture) — key findings

1. **Token mismatch** (BLOCKER): AGIL-115 surgical fix hardcodes values that differ from canonical `palette-d.css` dark tokens. Blind remap = silent contrast drift = risk regressing axe 304→0 gain.
2. **Tailwind specificity** (WARNING R2): `:root {--folkup-*}` alone does NOT defeat Hextra's Tailwind `bg-dark` / `text-black` class utilities. The `.dark body !important` override is the load-bearing mechanism. Must preserve.
3. **Axe gate command missing**: plan said "axe must stay 0" but no explicit command. Add `npx @axe-core/cli http://localhost:1313 --tags wcag2aa`.
4. **Defer v2.5 deletion 48h post-merge** (cheap insurance).
5. **B-phase bundling warning**: recommend split AGIL-113 into 3 sub-PRs (CSS / Hextra-a11y / Content). Applies in next session.

### Beta (sonnet, UX) — key findings

1. **nbsp regex exclusions** (BLOCKER B-content): unguarded regex on 14 chapters will corrupt code fences, inline code, URLs, quoted strings. Must add negative lookahead / sed exclusions BEFORE applying. Scoped to Phase B, not Phase A.
2. **Axe insufficient alone** — add Lighthouse a11y (baseline 1.00) + manual eyeball.
3. **Simultaneous 3-file rewrite** = hard to bisect visual regressions. Recommend side-by-side both modes in Hugo serve.
4. **Hextra upstream issues** (aria-hidden-focus, region landmark) — file GitHub issue + BACKLOG entry revisit on next Hextra bump.
5. **Admin self-merge post-v1.0.0** — AGIL-114 scope warrants 1 reviewer approval. (Policy decision — flag for Андрей, proceed with admin-merge consistent with AGIL-112 pattern absent contrary instruction.)

### Unanimous

- **Order confirmed**: AGIL-114 → AGIL-113 (CSS + content are orthogonal dirs, no merge conflict).
- Proceed with remediations absorbed.

---

## 2. Token reconciliation table

Dark mode tokens — AGIL-115 hardcoded vs canonical `palette-d.css` `.dark`:

| Purpose | AGIL-115 (current, in typography-classical.css:190-245) | Canonical `palette-d.css` `.dark` | Delta | WCAG math |
|---------|----------------------------------------------------------|-----------------------------------|-------|-----------|
| bg-primary (dark body) | `#1A1816` | `--folkup-ivory` = `#1A1814` | 2 hex units warmer | Both ≈ L 0.004 |
| text titles | `rgba(240, 236, 232, 1)` = `#F0ECE8` | `--folkup-charcoal` = `#E5E3DF` (229, 227, 223) | ~11 RGB lighter in 115 | 115 = 14.8:1 claimed; canonical ≈ 13.2:1 |
| text body (secondary) | `rgba(225, 220, 215, 1)` = `#E1DCD7` | `--folkup-text` = `#E5E3DF` (229, 227, 223) | canonical slightly lighter | 115 = 12.5:1 claimed; canonical ≈ 13.2:1 |
| text muted | `#A3B898` (SAGE green) | `--folkup-text-muted` = `#A8A19C` (neutral warm) | completely different hue | 115 sage vs canonical neutral |
| accent (primary/link) | `rgba(200, 140, 130, 1)` = `#C88C82` | `--folkup-bordeaux` = `#B8818F` | different hue | Both ≥ 7:1 acceptable |
| bg-secondary (surface) | `#242220` | `--folkup-surface` = `#242018` | 8 LSB hex diff | minor |

**Both palettes meet WCAG AA (≥ 4.5:1 body, ≥ 3:1 large text).** Canonical is the Brand Guide v2.5 specification; AGIL-115 was surgical ad-hoc fix. Correct tech-debt direction is migrating to canonical.

**Decision: migrate to canonical with belt+braces.**

---

## 3. Belt+braces strategy (Alpha A5 remediation)

The load-bearing mechanism for beating Hextra Tailwind `bg-dark` is the `!important` rule on `body`:

```css
html.dark body,
.dark body,
[data-theme="dark"] body {
  background-color: var(--color-bg-primary) !important;
  color: var(--color-text-primary);
}
```

**Preserved intact** in post-migration CSS. Only the TOKEN VALUES change:

```css
/* Post-migration (AGIL-114) */
html.dark body,
.dark body,
[data-theme="dark"] body {
  background-color: var(--folkup-ivory) !important;  /* canonical #1A1814 */
  color: var(--folkup-charcoal);                      /* canonical #E5E3DF */
}
```

This is a token rename, not a rewrite. The mechanism stays identical. The tokens now come from canonical `palette-d.css` `.dark` scope.

Verification must confirm the 3 canonical values still meet WCAG AA (math above says yes, but axe + lighthouse empirically confirm).

---

## 4. Execution checklist (matching TaskList #41-48)

### Phase A — THIS SESSION (committed on branch, not pushed)

- [x] **A1** (Task #41): Write this plan doc
- [ ] **A2** (Task #42): Copy `palette-d.css` + `brand-fonts.css` from `_brand-guide-templates/` → `assets/css/`
- [ ] **A3** (Task #43): Update `layouts/partials/custom/head-end.html` — load brand-fonts.css + palette-d.css FIRST, then typography-classical + visuals-framework + act-opener
- [ ] **STOP + handoff** for next session

### Phase A — NEXT SESSION

- [ ] **A4** (Task #44): Rewrite `typography-classical.css`:
  - Delete compat layer `:root` definitions that `palette-d.css` now provides
  - Replace `--color-primary` → `--folkup-bordeaux`, `--color-accent` → `--folkup-amber`, `--color-bg-primary` → `--folkup-ivory`, `--color-text-primary` → `--folkup-charcoal`, `--color-text-secondary` → `--folkup-text`, `--color-text-muted` → `--folkup-text-muted`, `--color-border` → `--folkup-border`, etc (build full map from initial read)
  - **PRESERVE** `.dark body !important` block verbatim (lines ~220-247), only swap token values to canonical
  - Keep AGIL-115 comment trail for audit
- [ ] **A5** (Task #45): Rewrite `visuals-framework.css` + `act-opener.css` with same token rename
- [ ] **A6** (Task #46): `typography-brand-guide-v2.5.css` deletion DEFERRED — keep off-load-path 48h post-merge
- [ ] **A7** (Task #47): Enhanced verification:
  - `hugo --gc --minify` = 0 errors, 0 warnings
  - `hugo server` locally
  - `npx @axe-core/cli http://localhost:1313 --tags wcag2aa` — MUST 0 color-contrast violations (regression guard for AGIL-115)
  - Local Lighthouse a11y — MUST ≥ 1.00 on chapter-1 (baseline post-AGIL-115)
  - Manual side-by-side light+dark in browser — titles, body, primary accent readable
  - DevTools font 404 check
- [ ] **A8** (Task #48): Branch → commit → push → gh pr create → **Alpha+Beta on the diff** (not plan — real code review) → admin-merge → live deploy → live `curl` + axe against sapiens.folkup.life → update BACKLOG AGIL-114 → done + commit SHA

### Phase B — FUTURE SESSION (split into 3 sub-PRs per Alpha scope recommendation)

- **B-CSS sub-PR**: widows/orphans=3 CSS bump, twitter-card duplicate dedup
- **B-Hextra-a11y sub-PR**: aria-hidden-focus (1 node/page), region landmark (1 node/page), W3 preload+SRI, W6 flexsearch crossorigin + file upstream Hextra GitHub issue
- **B-Content sub-PR**: nbsp regex with exclusions (fenced code, inline code, URLs, quotes), footnote bidirectional anchoring, em-dash Type 1b framework clarification in `memory/em-dash-metric-framework.md` (doc-only, zero-threshold-delta confirmed)
- **DEFERRED within B**: W4 transient 503 probe (investigate if recurrent), quality-gates HUGO_ENVIRONMENT alignment (blocked on `gh auth refresh -s workflow`)

### Phase C — FLAG FOR АНДРЕЙ (no autonomous execution)

1. **AGIL-084 Double HSTS dedup** — cross-cutting nginx-proxy env override affects ALL FolkUp vhosts. Preload downgrade is one-way risk (8-12 weeks HSTS preload list recovery).
2. **Workflow-scoped follow-ups** — `wave2a-smoketest-guard.patch` + HUGO_ENVIRONMENT alignment in quality-gates job. Blocked on `gh auth refresh -s workflow` in Андрей's terminal.
3. **Branch protection tightening** post-v1.0.0 — per Beta U6 recommendation. Currently admin self-merge pattern from AGIL-112 (8 PRs). Policy decision.
4. **Hextra upstream GH issue** — file for aria-hidden-focus + region landmark + decide local fix vs upstream wait.

---

## 5. Rollback plan

Per `_brand-guide-templates/per-theme-integration.md` §Rollback Procedures:

```bash
# From repo root
git checkout main                              # Return to v1.0.0 state
git branch -D agil-114-canonical-palette-d    # Discard branch
hugo --gc --minify                             # Verify clean build
```

If Phase A partial commits on branch but build broken:
```bash
git reset --hard HEAD~N    # Undo N commits on branch
# OR
git checkout main          # Abandon branch entirely
```

Live site stays on v1.0.0 (`865fb2a`) until PR admin-merge. Phase A work is isolated on branch until explicit merge decision.

---

## 6. Session continuity

**This session state:**
- Branch `agil-114-canonical-palette-d` created from main (`7c5125f`)
- A1 plan doc (this file) written
- A2-A3 to be executed and committed on branch this session
- A4-A8 handed off for next session

**Next session resume:**
```bash
# From repo root
git checkout agil-114-canonical-palette-d
# Read _meta/agil-114-plan.md (this file) — full context
# Start at A4 (typography-classical.css rewrite)
```

Task IDs #44-48 remain open and trackable.

---

*Effort revision: original backlog estimate 2-4h. After hostile-review scope analysis + 2057-line rewrite surface + enhanced verification: revised 4-6h realistic. Quality > speed per global FolkUp standards.*
