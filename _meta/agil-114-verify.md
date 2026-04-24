# AGIL-114 Phase A — A7 Enhanced Verification Evidence

**Status:** TEMPLATE — to be filled during A7 execution (next session)
**Branch:** `agil-114-canonical-palette-d`
**Target merge base:** `main` @ `v1.0.0` (865fb2a)
**Head at verification time:** `{{COMMIT_SHA}}`
**Hugo version:** `{{HUGO_VERSION}}`
**Verification date:** `{{YYYY-MM-DD}}`
**Reviewer:** `{{reviewer — automated tools + manual}}`

---

## 1. Hugo build

```
hugo --gc --minify
```

Expected: 0 errors, 0 warnings.

**Result:**
- Exit code: `{{0 | fail}}`
- Pages built: `{{EN count}} EN + {{RU count}} RU`
- Duration: `{{ms}}`
- Output captured: `_meta/agil-114-hugo-build.log`

---

## 2. axe-core CLI

Command:
```
npx @axe-core/cli http://localhost:1313/ --tags wcag2aa --save {{output-json}}
```

### Test matrix (minimum 6 runs)

| URL | Theme | Viewport | axe violations | color-contrast | JSON file |
|-----|-------|----------|----------------|----------------|-----------|
| `/` (EN homepage) | light | desktop | `{{n}}` | `{{n}}` | `_meta/axe/en-home-light.json` |
| `/` (EN homepage) | dark | desktop | `{{n}}` | `{{n}}` | `_meta/axe/en-home-dark.json` |
| `/ru/chapters/01/` | light | desktop | `{{n}}` | `{{n}}` | `_meta/axe/ru-ch1-light.json` |
| `/ru/chapters/01/` | dark | desktop | `{{n}}` | `{{n}}` | `_meta/axe/ru-ch1-dark.json` |
| `/ru/chapters/03/` (shortcode-heavy: figure-ref + plate + concept-illustration) | light | desktop | `{{n}}` | `{{n}}` | `_meta/axe/ru-ch3-light.json` |
| `/ru/chapters/03/` | dark | desktop | `{{n}}` | `{{n}}` | `_meta/axe/ru-ch3-dark.json` |

**Gate:** all color-contrast = 0. Any other wcag2aa violation must match v1.0.0 closeout baseline (`_meta/closeout-axe/*.json` from AGIL-112) — no new regressions.

---

## 3. Lighthouse a11y

Command:
```
npx lighthouse http://localhost:1313/ --only-categories=accessibility --output=json --output-path=_meta/lighthouse/en-home-light.json
```

### Test matrix

| URL | Theme | a11y score (0-100) | JSON file |
|-----|-------|---------------------|-----------|
| `/` (EN homepage) | light | `{{n}}` | `_meta/lighthouse/en-home-light.json` |
| `/` (EN homepage) | dark | `{{n}}` | `_meta/lighthouse/en-home-dark.json` |
| `/ru/chapters/01/` | light | `{{n}}` | `_meta/lighthouse/ru-ch1-light.json` |
| `/ru/chapters/01/` | dark | `{{n}}` | `_meta/lighthouse/ru-ch1-dark.json` |
| `/ru/chapters/03/` | light | `{{n}}` | `_meta/lighthouse/ru-ch3-light.json` |
| `/ru/chapters/03/` | dark | `{{n}}` | `_meta/lighthouse/ru-ch3-dark.json` |

**Gate:** all scores = 100 (no regression from v1.0.0 baseline).

---

## 4. Manual dark-mode shortcode spot-check

For each shortcode listed in AGIL-116 compat-bridge scope, verify dark mode renders canonical `--folkup-*` values (not light-on-dark, not legacy-hex).

| Consumer | Test page URL | Theme | Render OK? | Screenshot | Notes |
|----------|--------------|-------|------------|------------|-------|
| `layouts/partials/typography.css` | `/ru/chapters/01/` | dark | `{{Y|N}}` | `_meta/screenshots/typography-ru-ch1-dark.png` | body text, headers |
| `layouts/shortcodes/plate.html` | `/ru/chapters/01/` | dark | `{{Y|N}}` | `_meta/screenshots/plate-ru-ch1-dark.png` | full-page plate image |
| `layouts/shortcodes/chapter-break.html` | `/ru/chapters/03/` | dark | `{{Y|N}}` | `_meta/screenshots/chapter-break-ru-ch3-dark.png` | ornament divider |
| `layouts/shortcodes/chapter-visual.html` | `/ru/chapters/03/` | dark | `{{Y|N}}` | `_meta/screenshots/chapter-visual-ru-ch3-dark.png` | inline figure with caption |
| `layouts/shortcodes/concept-illustration.html` | `/ru/chapters/03/` | dark | `{{Y|N}}` | `_meta/screenshots/concept-illustration-ru-ch3-dark.png` | diagram/concept art |
| `layouts/shortcodes/figure-ref.html` | `/ru/chapters/04/` | dark | `{{Y|N}}` | `_meta/screenshots/figure-ref-ru-ch4-dark.png` | cross-reference link |

### EN parity (separate pass)

| Consumer | EN page URL | Theme | Render OK? | Screenshot |
|----------|-------------|-------|------------|------------|
| typography.css | `/en/chapters/01/` | dark | `{{Y|N}}` | `_meta/screenshots/typography-en-ch1-dark.png` |
| plate | `/en/chapters/01/` | dark | `{{Y|N}}` | `_meta/screenshots/plate-en-ch1-dark.png` |
| chapter-break | `/en/chapters/03/` | dark | `{{Y|N}}` | `_meta/screenshots/chapter-break-en-ch3-dark.png` |
| chapter-visual | `/en/chapters/03/` | dark | `{{Y|N}}` | `_meta/screenshots/chapter-visual-en-ch3-dark.png` |
| concept-illustration | `/en/chapters/03/` | dark | `{{Y|N}}` | `_meta/screenshots/concept-illustration-en-ch3-dark.png` |
| figure-ref | `/en/chapters/04/` | dark | `{{Y|N}}` | `_meta/screenshots/figure-ref-en-ch4-dark.png` |

**Gate:** all 12 = Y. The Фонарщик brand-manager override (`--folkup-text-muted: #A3B898` sage) must be visible in muted text: footnote numbers, chapter meta, attribution lines.

---

## 5. Media-query + system-preference matrix

| Scenario | Test | Result |
|----------|------|--------|
| `prefers-color-scheme: dark` (system) | DevTools emulate | `{{OK|FAIL}}` |
| `.dark` class toggle (Hextra manual switch) | UI click | `{{OK|FAIL}}` |
| `prefers-reduced-motion: reduce` | DevTools emulate | `{{OK|FAIL}}` — no transitions on shortcodes |
| `prefers-contrast: more` | DevTools emulate | `{{OK|FAIL}}` — if supported; non-blocking |
| Print stylesheet | File → Print preview (both themes) | `{{OK|FAIL}}` — dark tokens must NOT bleed into print |
| Mobile viewport 375px | DevTools device emulation | `{{OK|FAIL}}` — shortcodes stack correctly |

**Gate:** all scenarios = OK except prefers-contrast (non-blocking if not supported).

---

## 6. Browser engine diversity

| Browser | Version | Theme test | Result |
|---------|---------|------------|--------|
| Chrome / Chromium | `{{ver}}` | dark | `{{OK|FAIL}}` |
| Firefox | `{{ver}}` | dark | `{{OK|FAIL}}` — custom property inheritance can diverge |
| Safari (if available) | `{{ver}}` | dark | `{{OK|FAIL|N/A}}` |

**Gate:** Chrome + Firefox must PASS. Safari advisory.

---

## 7. CSP + ecosystem smoke

| Check | Expected | Result |
|-------|----------|--------|
| CSP header unchanged vs v1.0.0 | no new origins in font-src / style-src | `{{OK|FAIL}}` |
| `/manifest.json` byte-identical to v1.0.0 | `diff` | `{{OK|FAIL}}` |
| `/robots.txt` unchanged | `diff` | `{{OK|FAIL}}` |
| `/sitemap.xml` page count unchanged | 136 entries | `{{OK|FAIL}}` |
| `/404.html` renders (EN + RU) | manual | `{{OK|FAIL}}` |

**Gate:** all OK. Any delta must be explainable by the CSS migration (typically none).

---

## 8. Focus-visible keyboard nav (dark mode)

- Tab through shortcode interactive elements (links within figure-ref, plate image alt).
- Verify focus ring visible against `--folkup-ivory` (`#1A1814` dark bg).
- `{{PASS|FAIL}}` — ring color `--color-focus` (a11y blue #2563eb) preserved.

---

## 9. Sign-off

- **axe gate:** `{{PASS|FAIL}}`
- **Lighthouse gate:** `{{PASS|FAIL}}`
- **Shortcode manual matrix:** `{{PASS|FAIL}}`
- **Media-query matrix:** `{{PASS|FAIL}}`
- **Browser diversity:** `{{PASS|FAIL}}`
- **CSP + ecosystem smoke:** `{{PASS|FAIL}}`
- **Focus-visible:** `{{PASS|FAIL}}`

**Overall A7 verdict:** `{{PROCEED_TO_A8 | REMEDIATE_AND_RERUN}}`

**Reviewer signature:** `{{automated tools + manual verification}}`, `{{YYYY-MM-DD}}`

---

## Appendix: A8 PR gate references this document

When creating the AGIL-114 PR, link this file as evidence:
- `gh pr create --body "...Evidence: _meta/agil-114-verify.md..."`
- `/ultrareview` or Agent-based dispatch consumes this file + full Phase A diff for verdict.
