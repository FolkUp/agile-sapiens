# AGIL-112 — Full QA site v1.0.0 (registry)

**Status:** READY TO TAG v1.0.0 · Stage: All Fix Waves merged, closeout complete, AGIL-115 dark-mode fix merged & verified, /ultrareview complete, PR #38 pre-tag remediation merged — all 10 pre-release sections PASS (2026-04-22)

## Timeline
- 2026-04-21 — B0 auth bypass complete (folkup-infra PRs #8-12), Constitutional Alpha+Beta PASS с remediation
- 2026-04-22 — Batch 1 round 2 complete (Johnny + Фонарщик + Oracle review)
- 2026-04-22 — Wave 1a merged (PR #33 admin-override, Plan C Oracle path): canonical fonts в classical.css, brand-guide-v2.5.css off load path. Live verified: Source Sans 3 + Playfair Display resolve, 7 woff2 200 OK, no EB Garamond/Crimson Pro refs. CI deploy-vps + smoke-test PASS on main.
- 2026-04-22 — Wave 1b merged (PR #34 admin-override): cookie-consent WCAG 2.5.5 — .cookie-btn min-height:44px + min-width:44px desktop, 48px mobile, :focus-visible amber outline, padding/font-size bumps. CI PASS (1m8s). Live verified: min-height:44px + :focus-visible + mobile min-height:48px present on sapiens.folkup.life. Merge commit 5ca377f.
- 2026-04-22 — Batch 2 dispatched: Audit Suite (E2E sampling) + Наборщик (UI+RU typography). Audit Suite returned CONDITIONAL_PASS (3 BLOCKERS: B1 noindex site-wide, B2 nginx 404/version leak, B3 status badge misscope). Наборщик returned CONDITIONAL_PASS (0 blockers, 5 warnings — publishable for v1.0.0, defer to AGIL-113 polish). Registries: `_meta/qa-findings-audit-suite.md` + `_meta/qa-findings-naborshchik.md`. Toolchain gap: lighthouse/axe/playwright sandbox-blocked (6/16 runtime checks deferred).
- 2026-04-22 — Synthesis: `_meta/qa-batch2-synthesis.md`. Fix Waves plan hostile-reviewed by Alpha (opus) + Beta (sonnet), both CONDITIONAL_PASS с remediations. B3 descoped (encyclopedia rule N/A for monograph). Refined sequence: Wave 2a (SEO trio) → Wave 2b-prereq (folkup-infra closeout) → Wave 2b (branded 404 + nginx harden).
- 2026-04-22 — Wave 2a merged (PR #35 admin-override, commit 83fb6f3): `hugo.toml` softLaunch=false + disableHugoGeneratorInject=true; `layouts/_partials/head.html` hreflang via .AllTranslations + x-default. CI quality-gates + build + deploy-vps + smoke-test PASS. Live verified: `index, follow` on RU+EN homepage, 3 hreflang links RU/EN/x-default, generator meta absent, robots.txt permissive + sitemap exposed. `hugo.ru.toml` kept softLaunch=true (staging domain `ru.agile.folkup.work`). CI smoke-test regression guards (curl noindex/hreflang/generator checks) deferred to follow-up PR — OAuth workflow scope refresh required; patch saved `_meta/wave2a-smoketest-guard.patch`.
- 2026-04-22 — Wave 2b-prereq merged (folkup-infra PR #13 admin-override, commit 1d06502): removed `satisfy any; allow 2.207.72.42; deny all; auth_basic + auth_basic_user_file + limit_req_zone auth_limit` blocks from `docker/nginx-agile-sapiens.conf`. Kept `set_real_ip_from` + security headers. First apply run returned "No changes" — discovered root-cause bug in `apply-docker.sh` (only diffed compose.yml, skipped sidecar). Filed fix as folkup-infra PR #14 (commit f4864d7): extended diff check to cover `nginx-<stack>*`, `htpasswd-<stack>*`, `<stack>-*.conf` sidecars. Re-triggered apply after fix merge: "Sidecar changed: nginx-agile-sapiens.conf" → copy → nginx reload → healthy (1/1). Live verified via codetabs proxy (non-allowlisted IP): 48 KB homepage served, `index, follow` + hreflang present. Site now truly public for search engines. Root-cause fix replaces prior nudge-commit pattern used in AGIL-112 #10/#12.
- 2026-04-22 — Wave 2b merged (agile-sapiens PR #36 `2b1c8e2` + folkup-infra PR #15 `9415240`, both admin-override): branded 404 page layout + nginx error_page routing + server_tokens off.
  - agile-sapiens: `layouts/404.html` — Palette D + Playfair Display (self-hosted) + Source Sans 3 (self-hosted) + i18n via .Site.Language.Lang (RU default, EN for /en/), dark mode via prefers-color-scheme, WCAG 2.5.5 44x44 CTAs + :focus-visible amber. `<meta robots=noindex, nofollow>`. Self-contained inline CSS. Hugo generates public/404.html (3.2 KB) + public/en/404.html (3.1 KB).
  - folkup-infra: `server_tokens off;` hides nginx version. `error_page 404 /404.html;` at server level (RU default). `location = /404.html { internal; }` + `location = /en/404.html { internal; }` — internal-only. `location /en/ { error_page 404 /en/404.html; try_files ... }` — EN subtree localized 404.
  - Live verified all 5 checks: RU unknown path → branded RU 404 (HTTP 404, 3252 B), EN unknown path → branded EN 404 (HTTP 404, 3096 B), direct /404.html → 404 (internal-only, was 200), homepage still 200, zero `nginx/<ver>` body leak.
  - B2 (stock nginx 404 + version leak) closed. B1 + B2 both resolved. B3 descoped.
  - W1 HSTS dedup deferred to AGIL-113 — requires nginx-proxy global `HSTS` env override affecting all FolkUp vhosts.
- 2026-04-22 — Closeout artifacts captured: Lighthouse 3 pages (`_meta/closeout-lighthouse/*.json`) desktop preset scores perf 0.95-1.00 / a11y 0.96 / bp 0.96-1.00 / seo 1.00. axe 3 pages (`_meta/closeout-axe/*.json`) — **304 color-contrast violations in dark mode detected** (Hextra dark bg #111 + Palette D light-mode text). §7 WCAG AA gate FAIL. Filed AGIL-113 (polish), AGIL-114 (CSS canonical migration), AGIL-115 (dark mode WCAG P1 blocker). Андрей chose Path A (fix before tag).
- 2026-04-22 — AGIL-115 merged (agile-sapiens PR #37 admin-override, commit pending pull): `assets/css/typography-classical.css` extended dark-mode token selector from `[data-theme="dark"]` to `[data-theme="dark"], html.dark, .dark` + added explicit `html.dark body` / `.dark body` rule forcing `background-color: var(--color-bg-primary) !important` (canonical #1A1816) and `color: var(--color-text-primary)` (rgba(240,236,232) 14.8:1). Text inheritance via main/article/p/li in .dark scope. Root cause: Hextra uses `.dark` class (Tailwind) while our tokens were scoped only to `[data-theme="dark"]` attribute. Post-fix axe re-run: **color-contrast violations 304 → 0** across all 3 pages. Lighthouse a11y chapter-1: 0.96 → 1.00. Light mode unaffected. §7 WCAG AA gate: FAIL → PASS. v1.0.0 unblocked.
- 2026-04-22 — /ultrareview completed (Agent-based approximation, Opus security + Sonnet quality). Security: CONDITIONAL_PASS, 0 blockers, 4 warnings → AGIL-113 (CSP nonce migration, webflow.com CSP entry, sidecar allowlist, Permissions-Policy extension). Quality: CONDITIONAL_PASS, 3 blockers identified + remediated in PR #38 `ff4c855`: M1 EN 404 CTA dead-loop (/en/chapters/ → /chapters/), M2 og:description + og:type malformed on all pages due to Hugo 0.155 template quirk with Hextra's multi-line content="{{ with .Description }}..." (new `layouts/partials/opengraph.html` override with flat single-line expressions + frontmatter og_* params), M3 x-default hreflang split (fixed to always emit defaultContentLanguage=ru permalink — hardcoded "ru" since site.DefaultContentLanguage not exposed in this Hugo+Hextra combo). Post-merge live verify: all 3 fixes reflected, release checklist §10 FINAL → PASS. All 10 pre-release sections green. Ready for `git tag -a v1.0.0`.

## Next
- **Pre-tag `/ultrareview`** (agile-sapiens main) — parallel multi-agent pre-release review per rules/pre-release-verification.md §10. Expected: ALL PASS (§7 now green post-AGIL-115).
- **Tag v1.0.0** after /ultrareview green — `git tag -a v1.0.0 -m "Release v1.0.0"` + push.
- **Follow-up PR** (agile-sapiens): apply `_meta/wave2a-smoketest-guard.patch` (CI smoke-test regression guards for noindex/hreflang/generator). Requires OAuth workflow scope refresh (`gh auth refresh -s workflow`).
- **AGIL-113** (backlog P2): polish wave — Наборщик warnings (nbsp regex pass, widows/orphans=3, footnote bidirectional, em-dash Type 1b) + Audit Suite warnings (W3 CSS preload/SRI, W4 transient 503, W6 flexsearch crossorigin, twitter-card dedup, quality-gates HUGO_ENVIRONMENT alignment) + aria-hidden-focus + region landmark fixes.
- **AGIL-114** (backlog P2): full canonical migration — drop-in palette-d.css + brand-fonts.css + rewrite visuals-framework.css. Delete typography-brand-guide-v2.5.css (on disk but off load path).
- **W1 HSTS dedup**: requires nginx-proxy global `HSTS` env override (affects all FolkUp vhosts). Separate infra task.

## Canonical visual reference — FolkUp Storybook (corrected)

**Source of truth:**
- `C:\JOHNDOE_CLAUDE\folkup-docs\BRAND-GUIDE.md` v2.5 (text spec — Palette D, type scale 1.25, spacing 4px, dark palette)
- `C:\JOHNDOE_CLAUDE\folkup-docs\presentation\folkup-brand-2026.html` (reveal.js applied showcase, 975 строк, 500 CSS)
- `C:\JOHNDOE_CLAUDE\folkup-docs\BRAND-DNA.md` (голос/тон)
- Planned: `tokens.css` (канонический источник указан в BRAND-GUIDE, но физически не извлечён — живёт в .md)

**Canonical tokens (Palette D «Библиотека во дворе»):**
- Primary: `#7D4450` мягкий бордо (заголовки, кнопки, header)
- Secondary: `#839E75` приглушённый шалфей (sidebar, теги)
- Accent: `#E8AD4A` тёплый янтарь (свет фонаря, CTA, hover)
- Background: `#FEFCF6` слоновая кость · Surface: `#F0EDE8`
- Text: `#2A2725` мягкий уголь · Text muted: `#6B6560` тёплый серый

**Dark palette (canonical, WCAG AA):**
- Base: `#1A1816` (тёплый charcoal, не cold black)
- Surface: `#242220` · Border: `#3A3634`
- Text: rgba(225,220,215,1) (12.5:1) · Titles: rgba(240,236,232,1) (14.8:1)
- Primary dark: rgba(200,140,130,1) (7:1) · Sage dark: #A3B898 (5.5:1)

**Typography (canonical):**
- Logo: Pacifico (hand-lettered script)
- Headings: Playfair Display (classical serif)
- Body: **Source Sans 3** (canonical, NOT Inter)
- All self-hosted GDPR-compliant

**Type scale 1.25 Major Third:** --text-xs 0.64rem → --text-4xl 3.052rem
**Spacing 4px base:** --space-1..24 + aliases --sp-N

**AGIL compliance status (rapid check):**
- Primary `#7D4450` — ✓ matches canonical
- Secondary `#839E75` — ✓ matches canonical
- Accent `#E8AD4A` — ✓ matches canonical
- Background `#FEFCF6` — ✓ matches canonical
- Body font Source Sans 3 — ✓ matches canonical
- Heading Playfair Display — ✓ matches canonical
- Dark mode active — ✓ per canonical Palette D dark

**Declaration context:**
`folkup.app/declaration/ru/` is a **deviation instance**, not canonical:
- Uses darker bordo `#5E2F3A` (vs canonical `#7D4450`)
- Uses Inter body font (vs canonical Source Sans 3)
- Light-only (no dark mode)
→ Manifesto-specific variant, NOT the reference for book. Round-1 Фонарщик report (PARTIAL verdict, 4 BLOCKERS) was based on false premise "Declaration = canonical" и отменён.

**Round 2 (in progress):**
Фонарщик + Johnny re-briefed with correct canonical (Storybook BRAND-GUIDE.md v2.5 + presentation HTML).


**Started:** 2026-04-21
**Authority:** Level 3 Cartouche Autonome (user-granted)
**Source of truth:** this file

---

## Constitutional Alpha+Beta gate (PASSED with remediation)

Both supervisors returned **CONDITIONAL_PASS**. Convergent blockers resolved, unique findings folded into scope.

### Remediation applied

| Category | Fix |
|----------|-----|
| Auth strategy | IP allowlist for 2.207.72.42 on nginx-agile-sapiens.conf (folkup-infra PR #8). `real_ip_from` added for XFF trust (PR #9). `apply-docker.sh` nginx reload fix (PR #11). Two nudge PRs to force sidecar re-copy (#10, #12). |
| Expert overlap | Johnny = a11y mechanics + visual/structural + spacing + keyboard/SR/contrast. Наборщик = purely typographic metrics (ch, line-height, widows/orphans) + RU-specific (ё/е, «ёлочки», неразрывные пробелы, AGIL-069 em-dash density re-check). Footnote typography → Наборщик. Footnote a11y → Johnny. |
| EN sample (fixed) | homepage + ch1 (Verne, footnotes structure) + ch5 (partially_verified, single open unit) + /en/legal/privacy + /en/legal/terms |
| Added coverage | zoom 200% reflow (WCAG 1.4.10), text-spacing (1.4.12), Hextra quirks (search Ctrl+K, TOC highlight, status badges, callouts), mobile landscape 667×375/844×390, print stylesheet, JS animations reduced-motion (sidebar/mobile menu/ToC), dark palette D override check, cookie reject-all deep gate, RU hyphenation lang=ru inheritance |
| B0 tool order | link-check + W3C HTML validator FIRST (cheap). Lighthouse/axe AFTER (only on valid HTML) |
| Fix waves | Lighthouse/axe rerun after EACH wave (not only final) — regression guard |
| Audit Suite E2E | sampling: homepage + 3 chapters + 1 intermezzo + legal + 404 + i18n switcher (not all 126 RU pages) |
| Closeout | revert IP allowlist (2 PRs: revert #8+#9 satisfy any / allow / deny; keep real_ip_from + apply-docker reload fix as legitimate improvements). Update `_meta/release-checklist-v1.0.0.md`. |

---

## B0 Discovery (in progress)

### Baseline state confirmed

- **Hugo build:** PASS — 10 EN + 126 RU pages, 0 warnings, 1790ms
- **Live reachability:** 401 before allowlist → 200 after (homepage RU)
- **Server:** nginx/1.29.8 (origin, no CDN in front)
- **Security headers present:** HSTS × 2 (AGIL-084 confirmed double), X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, CSP

### Site structure (from sitemap)

```
/ (homepage)
/about/
/archive/
/docs/
/chapters/
  ├── chapter-0-pilot/
  ├── chapter-1-jules-verne/
  ├── chapter-2-frankenstein/
  ├── chapter-3-holmes/
  ├── chapter-4-borges/
  ├── chapter-5-nemo/
  ├── chapter-6-jekyll-hyde/
  ├── chapter-7-don-quixote/
  ├── chapter-8-time-machine/
  ├── chapter-9-three-scenarios/
  ├── chapter-10-choice-engine/
  ├── intermezzo-1/
  ├── intermezzo-2/
  └── intermezzo-3/
/legal/
  ├── ai-transparency/
  ├── privacy/
  ├── cookies/
  ├── terms/
  ├── editorial-workflow/
  └── ugc-moderation/
/en/ (EN sample: homepage + ch1 + ch5 + privacy + terms)
```

### QA tools availability confirmed

- `lighthouse` — available (npm global, C:\Users\ankle\AppData\Roaming\npm\lighthouse)
- `axe` — available (same location)
- `npx` 10.9.0 — available
- `node` — available (/c/Program Files/nodejs/node)

### folkup-infra PR stack (AGIL-112 auth bypass)

| PR | Branch | Outcome |
|----|--------|---------|
| #8 | agil-112/qa-ip-allowlist | satisfy any + allow 2.207.72.42 + deny all |
| #9 | agil-112/qa-real-ip | set_real_ip_from for XFF trust |
| #10 | agil-112/nudge-apply | compose comment to force sidecar re-copy |
| #11 | fix/apply-docker-nginx-reload | apply-docker.sh: nginx -s reload after sidecar copy (permanent improvement) |
| #12 | agil-112/nudge-2 | second compose nudge after #11 |

---

## Next steps (fresh context)

**Immediate (B0 continue):**
1. `lighthouse` баселайн на 5 страниц (homepage, ch1, ch5, /legal/privacy, /en/) → JSON в `_meta/qa-baseline/`
2. `axe` a11y scan на те же 5 → JSON
3. `html-validator` на sitemap → summary
4. link-check (internal relref) → report

**После B0 → Batch 1 (Johnny + Фонарщик параллельно).**

**Closeout reminders:**
- Revert IP allowlist from nginx-agile-sapiens.conf (2 PRs: satisfy/allow/deny blocks + comment markers)
- KEEP `set_real_ip_from` (useful anyway) and apply-docker reload fix (actual bug fix)
- Update `_meta/release-checklist-v1.0.0.md` per pre-release gate §10

---

*Stage tracking for seamless session continuity.*
