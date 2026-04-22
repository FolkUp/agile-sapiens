# AGIL-112 Closeout — Lighthouse + axe runtime report

**Date:** 2026-04-22
**Toolchain:** lighthouse 12.8.2, axe-core 4.11.1, node 22.11.0, headless Chrome (system default)
**Environment:** orchestrator main Bash (wider sandbox than Batch 2 sub-agents)
**Registry:** `_meta/qa-full-v1.0.0.md`

## Pages audited

1. `https://sapiens.folkup.life/` — homepage RU
2. `https://sapiens.folkup.life/chapters/chapter-1-jules-verne/` — chapter (most content-heavy)
3. `https://sapiens.folkup.life/legal/privacy/` — legal

Artifacts: `_meta/closeout-lighthouse/*.json` + `_meta/closeout-axe/*.json`

## Lighthouse scores (desktop preset)

| Page | Perf | A11y | Best Practices | SEO |
|------|------|------|----------------|-----|
| Homepage RU | 1.00 | 0.96 | 1.00 | 1.00 |
| Chapter 1 | 0.95 | 0.96 | 0.96 | 1.00 |
| Legal privacy | 1.00 | 0.96 | 1.00 | 1.00 |

All above 0.95 on every axis. SEO = 1.00 on every page (Wave 2a unlock + hreflang effective).

## Axe violations (headless Chrome, dark-mode rendering triggered)

| Page | serious | moderate | Total |
|------|---------|----------|-------|
| Homepage RU | 2 rules (24 nodes) | 1 rule (1 node) | 25 |
| Chapter 1 | 1 rule (187 nodes) | 1 rule (1 node) | 188 |
| Legal privacy | 2 rules (95 nodes) | 1 rule (1 node) | 96 |

### Violation breakdown

1. **`color-contrast` — CRITICAL (dark-mode regression, pre-existing)**
   - Nodes: 23 (home) + 187 (chapter-1) + 94 (privacy) = **304 nodes**
   - **Root cause:** Hextra theme dark-mode (background `#111111`) applied, but Palette D CSS variables do NOT cascade dark-mode values. Light-mode text colors (`#2a2725`, `#4a453f`, `#7d4450`) appear on Hextra dark bg → 1.05–2.53:1 contrast (WCAG requires 4.5:1 body, 3:1 large text)
   - Example fails: `#2a2725` on `#111111` = 1.27:1 (body) / 1.27:1 (heading); `#7d4450` on `#111111` = 2.53:1
   - Light mode (`prefers-color-scheme: light`) is unaffected — all Palette D combos in light mode pass AA
   - Canonical Palette D dark values EXIST in BRAND-GUIDE v2.5 §4 (base `#1A1816`, text `rgba(225,220,215,1)` 12.5:1, primary dark `rgba(200,140,130,1)` 7:1) but are NOT wired into live CSS
   - Scope: **AGIL-114 CSS canonical migration** (already in backlog P2) or new AGIL-115

2. **`aria-hidden-focus` — serious (minor)**
   - Nodes: 1 per page (homepage + privacy)
   - Element with `aria-hidden="true"` contains a focusable descendant. Screen-reader + keyboard-nav conflict.
   - Scope: AGIL-113 polish

3. **`region` — moderate**
   - Nodes: 1 per page
   - Page has content outside `<main>` / `<nav>` / `<header>` / `<footer>` landmarks. Hextra focus-skip target.
   - Scope: AGIL-113 polish

## Interpretation

**SEO + Best Practices + Perf: production-ready** for v1.0.0.

**A11y in LIGHT mode: production-ready** (Lighthouse 0.96, no contrast failures in Palette D light combos).

**A11y in DARK mode: NOT production-ready.** 304 contrast violations due to Palette D dark values not being wired to Hextra dark-mode toggle. Users with `prefers-color-scheme: dark` or who click the dark-mode toggle see unreadable text on dark background.

## v1.0.0 gate recommendation

Per `rules/pre-release-verification.md` §7 — WCAG 2.1 AA requires contrast ≥4.5:1 body / ≥3:1 large. **FAIL in dark mode.**

**Three paths:**

### Path A — Fix before v1.0.0 (defer tag)

- Implement canonical Palette D dark values in CSS (AGIL-114 scope)
- Estimated effort: 2-4 hours (palette-d.css drop-in + Hextra dark override)
- Re-test axe in dark mode → expect 0 color-contrast violations
- Then tag v1.0.0
- **Cost:** extends AGIL-112 by one full wave

### Path B — Disable dark mode toggle for v1.0.0

- `hugo.toml` → `[params.theme] default = "light"` + `displayToggle = false`
- Dark mode unreachable by users → contrast violations inert
- Tag v1.0.0 immediately
- File AGIL-115 "Reactivate dark mode with canonical Palette D" (unblocked by AGIL-114)
- **Cost:** users lose dark mode until AGIL-114+ ships. Honest trade.

### Path C — Tag v1.0.0 with known limitation

- Document in release notes: "Dark mode partially supported; best viewed in light mode. Dark-mode contrast improvements in v1.1."
- Tag v1.0.0 as-is
- **Cost:** ships with WCAG AA failure in dark mode. Conflicts with banking-level standard and pre-release gate §7.

**Orchestrator recommendation: Path B.** Fastest ship, no WCAG lie in effect, users get clean light-mode experience, dark mode returns properly in v1.1 (AGIL-114 + AGIL-115). Path A acceptable if Андрей wants dark mode at launch; Path C not recommended (violates banking-level).

## Other closeout items

- **Follow-up PR (smoke-test regression guard)** — patch at `_meta/wave2a-smoketest-guard.patch` (29 lines). Ready to push once `gh auth refresh -s workflow` is run.
- **W1 HSTS dedup** — requires nginx-proxy global `HSTS` env override affecting all FolkUp vhosts. Out of AGIL-112 scope. File as infra task.
- **Release checklist** — to be updated with these findings per §7 + §9 + §10.
