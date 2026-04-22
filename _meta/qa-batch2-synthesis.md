# AGIL-112 Batch 2 — Synthesis + Fix Waves plan

**Date:** 2026-04-22
**Inputs:** `_meta/qa-findings-audit-suite.md` + `_meta/qa-findings-naborshchik.md`
**Registry source of truth:** `_meta/qa-full-v1.0.0.md`

---

## Verdict summary

| Агент | Verdict | Blockers | Warnings | Comment |
|-------|---------|----------|----------|---------|
| Audit Suite | CONDITIONAL_PASS | 3 (B1 noindex, B2 nginx 404/leak, B3 status badge) | 6 | Toolchain gap: lighthouse/axe/playwright blocked by sandbox, 6/16 runtime checks deferred |
| Наборщик | CONDITIONAL_PASS | 0 | 5 (nbsp, widows/orphans, footnote bidirectional, em-dash marginal, dual CSS ratio) | "Publishable for v1.0.0" — deferrable to AGIL-113 polish |

Aggregated triage:

- **Confirmed BLOCKERS:** 2 (B1, B2)
- **Contested BLOCKER:** 1 (B3 — scope ruling needed)
- **WARNINGS deferrable:** 11 total (6 Audit + 5 Наборщик) → AGIL-113 polish / AGIL-114 CSS unification

---

## Confirmed blockers (verified on disk + live)

### B1 — noindex,nofollow site-wide (SEO launch-killer)

- **Live evidence:** `curl -s https://sapiens.folkup.life/ | grep robots` → `<meta name=robots content="noindex, nofollow">` present on homepage RU
- **Source:**
  - `hugo.toml:10 softLaunch = true`
  - `hugo.ru.toml:15 softLaunch = true`
  - `layouts/_partials/head.html:6` — `{{- if site.Params.launch.softLaunch -}} {{- $noindex = true -}}`
- **Root cause:** Residual softLaunch flag carried through Wave 1a+1b merges. Pre-documented plan exists: `_meta/BASIC-AUTH-REMOVAL-DUE-2026-05-18.md`
- **Fix complexity:** Trivial (2-line config flip, no content touched)
- **Rollback zone:** `hugo.toml` + `hugo.ru.toml` only

### B2 — nginx exposure (stock 404 + potential version leak)

- **Live evidence:** `server: nginx` header present (tokens may be off already — needs confirm via 404 body)
- **Two sub-issues:**
  - B2a: stock nginx 404 page (not branded) — needs `layouts/404.html` in agile-sapiens + `error_page 404 /404.html` in nginx
  - B2b: `nginx/1.29.8` version leak in 404 body — `server_tokens off;` in nginx config (check if already set)
- **Source of fix:**
  - B2a-Hugo: `layouts/404.html` — agile-sapiens
  - B2a-nginx + B2b: `folkup-infra/docker/nginx-sapiens.conf`
- **Rollback zone:** cross-repo (agile-sapiens + folkup-infra)

---

## Contested (scope ruling needed from Андрей)

### B3 — `status: partially_verified` renders no badge/callout

- **Fact:** chapter-5-nemo has `status: partially_verified` in frontmatter; no badge/callout rendered on live page.
- **`layouts/**/status-*.html` does NOT exist** in agile-sapiens.
- **Scope question:** `rules/encyclopedia.md §«Визуальная маркировка статусов»` applies to projects-encyclopedias. AGIL is a **published monograph**, not encyclopedia. Encyclopedia rule MAY be misapplied by Audit Suite.
- **Two interpretations:**
  - (a) **Rule applies** because `status:` field exists in frontmatter — implement status-badge.html + status-callout.html + docs/single.html override (copy pattern from retro-tech)
  - (b) **Rule does NOT apply** — monograph uses `status:` for internal verification workflow (AGIL-021/AGIL-111), not public UI signaling. Published book doesn't show "partially verified" badges — it either publishes or doesn't.
- **Наборщик read:** did NOT flag missing badge → supports interpretation (b)
- **Orchestrator's read:** **(b) more likely**, because:
  - AGIL-111 promoted 7 chapters to `verified`, ch5 stayed `partially_verified` with NIT-severity issues only (6 B1 warnings, not blocking v1.0.0)
  - A monograph flagging "partially verified" chapters to readers mid-book breaks reading flow
  - `partially_verified` is editorial tracking, not reader-facing
- **Recommendation:** Descope B3. Close out with a NOTE in registry: "AGIL monograph uses status frontmatter for internal editorial workflow; public UI does NOT render status markers (distinct from encyclopedia rule scope)."

---

## Fix Waves plan (proposed)

Each wave = independent rollback zone. Alpha+Beta to review THIS plan before execution.

### Wave 2a — noindex unlock (P0, agile-sapiens, tiny)

**Rationale:** B1 confirmed live, trivial fix, pre-documented plan. Independent from 2b/2c.

**Steps:**
1. `hugo.toml`: `softLaunch = true` → `false`
2. `hugo.ru.toml`: `softLaunch = true` → `false`
3. Local `hugo --gc --minify` — verify 0 errors/warnings
4. Grep built `public/` for `robots.*noindex` — expect 0 matches (or only on pages with explicit `noindex: true` frontmatter)
5. Commit: `fix(AGIL-112): unlock SEO indexing — flip softLaunch=false (B1)`
6. PR → CI (quality-gates + build) → admin-merge → main CI (deploy-vps + smoke-test)
7. Live verify: `curl -s https://sapiens.folkup.life/ | grep robots` — expect absent or `index, follow`
8. Registry update: `_meta/qa-full-v1.0.0.md` Timeline + `_meta/BASIC-AUTH-REMOVAL-DUE-2026-05-18.md` close-out

**Rollback:** Revert 2-line config change. Zero content impact.

### Wave 2b — branded 404 + nginx hardening (P0, cross-repo)

**Rationale:** B2a+B2b. Requires coordinated PR across agile-sapiens (Hugo 404.html) + folkup-infra (nginx config). More risky — heavier Alpha+Beta scrutiny.

**Steps (agile-sapiens part):**
1. Create `layouts/404.html` — Hugo layout using Palette D + canonical fonts, i18n-aware (RU default + /en/ EN), sitemap link, search link
2. Hugo build — verify `public/404.html` generated
3. Commit + PR + CI + merge

**Steps (folkup-infra part):**
1. `docker/nginx-sapiens.conf` → add `error_page 404 /404.html;`
2. Verify `server_tokens off;` present (add if missing)
3. Local nginx `-t` syntax check
4. Deploy via `apply-docker.sh` (reload instead of restart)
5. Live verify: `curl -s https://sapiens.folkup.life/bogus-xyz | grep -iE 'nginx|agile sapiens'` — expect branded content, no nginx version

**Rollback zones:** agile-sapiens layout isolated; folkup-infra nginx config reload-safe.

### Wave 2c — (skipped if B3 descoped per recommendation)

If B3 is confirmed to apply by Андрей:
- Copy `retro-tech/layouts/partials/status-badge.html` + `status-callout.html` + adapt `docs/single.html` override
- Add i18n strings for status labels (RU/EN)
- Test on chapter-5-nemo (partially_verified) + int1-3 (draft) + verified chapters (no callout)

Otherwise: close B3 with registry NOTE (see Contested section).

### Warnings deferred (not blocking v1.0.0)

→ `_meta/qa-findings-v1.0.0-backlog.md` (or straight to BACKLOG.yaml as AGIL-113 polish):

- W1 duplicate HSTS (AGIL-084 known — verify fix, or bundle here)
- W2 hreflang RU↔EN (critical AFTER B1 lift — otherwise search engines won't know)
- W3 secondary CSS no preload+SRI
- W5 Hugo generator version leak (remove `<meta name=generator>` in head override)
- W6 flexsearch crossorigin=anonymous
- Наб-A2 CSS layer ratio drift (covered by AGIL-114)
- Наб-A5 widows/orphans=2 → 3
- Наб-B3 nbsp regex injection pass
- Наб-C2 footnote bidirectional anchoring
- Наб-D em-dash AGIL-069 Type 1b «Bilingual-Glossed» subtype framework clarification

**Promotion to AGIL-113:** suggest creating new backlog entry for polish wave (P2, post-v1.0.0).

---

## Closeout tasks (unchanged from Oracle Plan C)

- Revert IP allowlist from nginx-agile-sapiens.conf (2 PRs: revert #8+#9 satisfy/allow/deny; keep #11 apply-docker reload fix + real_ip_from as legitimate improvements)
- Update `_meta/release-checklist-v1.0.0.md` per pre-release gate §10
- Re-run Lighthouse/axe/html-validator after Wave 2a+2b (**next session with toolchain unlocked** — see note below)

### Toolchain unlock (to discuss with Андрей)

Audit Suite reported 6/16 runtime checks deferred because sandbox blocked `lighthouse`/`axe`/`playwright`/`npx`. Next Batch 2 closeout run needs either:
- (a) sandbox permissions extended to allow npm-global CLI binaries for audit subagents, or
- (b) I run lighthouse/axe in my own Bash (my sandbox is wider — I can test)

Recommend (b) for this session — one-off orchestrator-level verification before Wave 2a/2b merges.

---

## Guardrails for execution

- **Max 2 parallel agents** — Waves 2a and 2b can be prepared in parallel (different files, independent rollback) but must NOT merge concurrently (need CI green + live verify serially per wave)
- **Build-verify-local BEFORE every commit** (AGIL-106 docker bind mount lesson)
- **Lighthouse/axe rerun AFTER each wave** (regression guard per constitutional remediation)
- **Level 1 compliance check** staged files before each commit (no AI tool names)
- **Registry update in same session** as each wave merge
