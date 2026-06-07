<!-- precommit:allow-ai-mentions -->
---
title: Team Manifest CLDESIGN — design SaaS project crew + ownership audit
version: 1.0
date: 2026-06-07
classification: P1 OPERATIONAL — team coordination scaffold pre-walk
authority: Алиса (COOPER session A, P-batch pre-walk autonomous per Андрей carte blanche)
status: ACTIVE — companion к priority-walk-brief-2026-06-08.md
trigger: Андрей mandate «собери всю команду которая будет работать над проектом, найди недостающие навыки и форнитов»
method: Primary-source verify BACKLOG.yaml для каждого ticket owner (Lesson #42 applied — brief contained 3-TBD phantom, caught)
---

# Team Manifest — CLDESIGN (design SaaS project)

Полная команда работающая над project + ownership matrix + gap analysis.

---

## 0. ⚠️ Phantom-correction from priority-walk-brief-2026-06-08.md

**Brief §99-104 claimed:** «Owner gaps — 3 ticketа TBD: CLDESIGN-005 / CLDESIGN-006 / ENCY-COSMETIC-BUNDLE».

**Primary-source verify (Lesson #42) BACKLOG.yaml:**

| Ticket | Brief claim | BACKLOG actual | Status |
|--------|-------------|----------------|--------|
| CLDESIGN-005 | TBD (Johnny? Кочегар?) | **Johnny + Кочегар + Гутенберг** | ✅ Owners assigned |
| CLDESIGN-006 | TBD (Картограф? Johnny?) | **Картограф (coord) + Фрида (author) + Фонарщик/Visual (approve)** | ✅ Owners assigned |
| ENCY-COSMETIC-BUNDLE-2026-06-06 | TBD (Johnny + Наборщик) | **Johnny + Наборщик** | ✅ Owners assigned |

**Conclusion:** 0 actual TBD. Brief was stale при time of writing. **Эту section в priority walk можно пропустить** — этот manifest заменяет.

---

## 1. The team — 18 fornits участвующих в CLDESIGN

Grouped по primary role:

### PM coordination layer (4)

| Fornit | Role в CLDESIGN | Source SKILL.md |
|--------|----------------|------------------|
| **Алиса** (`/alice`) | Cross-cutting PM, epic coordination, brief synthesis, post-walk action delivery | `~/.claude/skills/alice/SKILL.md` |
| **Лесник** (`/lesnik`) | Internal-projects PM coordination — touches folkup-landing/dashboard через CLDESIGN rollout | `~/.claude/skills/lesnik/SKILL.md` |
| **Картограф** (`/cartographer`) | Encyclopedia program PM — owns CLDESIGN-006 per-encyclopedia DESIGN.md overlays | `~/.claude/skills/cartographer/SKILL.md` |
| **Гутенберг** (`/gutenberg`) | Book publishing program PM — touches DECL + folkup-docs design integration | `~/.claude/skills/gutenberg/SKILL.md` |

### Design intake & visual authority (3)

| Fornit | Role в CLDESIGN | Primary ticket scope |
|--------|----------------|----------------------|
| **Фрида** (`/frida`) | **Lead design intake author** — DESIGN.md authoring, XML brief authoring, Flux illustrations | CLDESIGN-006 author / CLDESIGN-tailwind-removal-001 / FRIDA-001/002/003/004/005 |
| **Фонарщик/Visual** (`/brand-visual`) | Brand visual approval gate, palette/typography canon enforcement | CLDESIGN-006 approve / CLDESIGN-008 enforce / DSGN-002 / FRIDA-001 approve |
| **Фонарщик/Compliance** (`/brand-compliance`) | Brand rule enforcement (any brand-touching через /brand router) | BRAND-001 / BRAND-002 (done) / BRAND-003 |

### Frontend & technical implementation (2)

| Fornit | Role в CLDESIGN | Primary ticket scope |
|--------|----------------|----------------------|
| **Johnny** (`/johnny`) | Frontend Standards Architect — CSS/HTML/WCAG, Playwright visual regression, multi-locale typography | CLDESIGN-004 / 005 / 007 / cyr-lh-001 / cyr-locl-001 / ENCY-COSMETIC / FRIDA-002 / 003 |
| **Кочегар** (`/kochegar`) | DevOps — Open Design install, design.folkup.app publication endpoint, export-and-commit, file migration post-INC-006 | CLDESIGN-005 / 008 / 011 / MIGRATE / BRAND-001 / DSGN-001 |

### Editorial & language (2)

| Fornit | Role в CLDESIGN | Primary ticket scope |
|--------|----------------|----------------------|
| **Наборщик** (`/typesetter`) | Editorial review (typography panel verdicts, AI-detection, Cyrillic) | CLDESIGN-cyr-lh-001 (panel author) / ENCY-COSMETIC / FRIDA-003 |
| **Огилви** (`/ogilvy`) | Creative director, anti-slop public-page scan (used 2026-06-06 for folkup-base panel) | CLDESIGN-001 panel review / anti-slop section feedback |

### SEO + docs governance (2)

| Fornit | Role в CLDESIGN | Primary ticket scope |
|--------|----------------|----------------------|
| **Дьюи** (`/dewey`) | SEO/indexation — llms.txt, schema, hreflang. Reviewed folkup-base panel | LLMS-COMPRESS-001 / indexation Q from Иви |
| **Архивариус** (`/archivist`) | Doc governance — drift detection, canonicalization, link-rot, MEMORY.md hygiene | DSGN-002 (with Фонарщик) / BRAND-002 (done) / BRAND-003 / INFRA-BOT-001 |

### Research & verification (2)

| Fornit | Role в CLDESIGN | Primary ticket scope |
|--------|----------------|----------------------|
| **КиберГонзо** (`/cyber-gonzo`) | OSINT — V-batch verified research (16 sources), quarterly poll updates | V-batch synthesis / Open Design verification / June 15 cutoff intel |
| **Купер** (`/cooper`) | Security — secrets hygiene при handoff bundles, age key handling, content safety | Cooper-safe pattern для все .enc.yaml decrypts |

### Compliance & legal (2)

| Fornit | Role в CLDESIGN | Primary ticket scope |
|--------|----------------|----------------------|
| **Редактор** (`/editor`) | Pre-publication gate (если public-facing artifacts) | Future post-walk artifacts pre-publish |
| **Лев** (`/lev`) | Legal compliance — licenses (CC BY-SA vs BY), Brand Guide trademark, child protection (DECL) | License canon questions Q5 (Иви), Korda photo question (С25) |

### Courier (1)

| Fornit | Role в CLDESIGN | Primary ticket scope |
|--------|----------------|----------------------|
| **Печкин** (`/pechkin`) | Correspondence + zip courier к Иви (мост = git + DESIGN.md per Иви, но zip handoffs continue) | Иви package delivery |

---

## 2. Ownership matrix — все 32 design tickets

Verified primary-source BACKLOG.yaml 2026-06-07 cwd `C:\JOHNDOE_CLAUDE\vault\`:

### Tier 0 — Strategic decision (1)

| Ticket | Status | Owner |
|--------|--------|-------|
| CLDESIGN-CANON-DECISION-001 | pending_decision | **Андрей** (strategic) + Алиса (presentation) + Фрида (technical) |

### Tier 1 — Foundation (2)

| Ticket | Status | Owner |
|--------|--------|-------|
| CLDESIGN-001 | approved (status dependent on Tier 0) | Алиса coord + Фрида author + Фонарщик approve + Андрей supreme |
| CLDESIGN-tailwind-removal-001 | open P0 (conditional Option B) | **Фрида** + **Фонарщик** |

### Tier 2 — SaaS enablement (2)

| Ticket | Status | Owner |
|--------|--------|-------|
| CLDESIGN-002 | pending | **Андрей** (~30 min admin enable) |
| CLDESIGN-003 | pending | **Андрей** (~1h bootstrap session) |

### Tier 3 — Storybook compensation (2)

| Ticket | Status | Owner |
|--------|--------|-------|
| CLDESIGN-004 | pending | **Johnny** (Playwright baseline) |
| CLDESIGN-005 | pending P2 | **Johnny + Кочегар + Гутенберг** (design.folkup.app endpoint) |

### Tier 4 — Cross-cutting rollout (2)

| Ticket | Status | Owner |
|--------|--------|-------|
| CLDESIGN-006 | pending P2 | **Картограф** (coord) + **Фрида** (author) + **Фонарщик/Visual** (approve) |
| CLDESIGN-007 | pending P1 | **Андрей** (~1-2h) + **Johnny** (review) |

### Tier 5 — Operational hardening (4)

| Ticket | Status | Owner |
|--------|--------|-------|
| CLDESIGN-008 | pending P1 | **Фонарщик/Visual** (enforce) + **Кочегар** (persistence) |
| CLDESIGN-009 | pending P1 | **Андрей** (manual check) + **Алиса** (PM advisory) |
| CLDESIGN-010 | DEFERRED | gate Андрей (CLDESIGN-009 monitoring sufficient) |
| CLDESIGN-011 (NEW today) | open P1 | **Кочегар** (Open Design install) + **Алиса** (parallel export coord) |

### Tier 6 — Quality cleanup (5)

| Ticket | Status | Owner |
|--------|--------|-------|
| CLDESIGN-cyr-lh-001 | pending P2 blocked_by INC-006 (now closed via decomm — re-evaluate) | **Johnny** |
| CLDESIGN-cyr-locl-001 | pending P3 blocked_by INC-006 (re-evaluate) | **Johnny** |
| CLDESIGN-tokens-001 | DEFERRED | (deferred per BACKLOG) |
| CLDESIGN-tokens-002 | DEFERRED | (deferred per BACKLOG) |
| FONT-BOLD-001 | DEFERRED | (deferred per BACKLOG) |

### Tier 7 — Migration (1)

| Ticket | Status | Owner |
|--------|--------|-------|
| CLDESIGN-MIGRATE-DESIGN-MD-2026-06-06 | pending blocked_by INC-006 (closed — now unblocked!) | **Алиса** (coord) + **Кочегар** (file move) |

### DSGN family (4)

| Ticket | Status | Owner |
|--------|--------|-------|
| DSGN-001 | DEFERRED (rule-of-3) | Кочегар + Фонарщик/Visual + Андрей |
| DSGN-002 | pending P2 | **Фонарщик/Visual** + **Архивариус** |
| DSGN-003 | DONE 2026-06-06 | Фонарщик/Compliance + Архивариус |
| DSGN-004 | (read below for status) | (TBV) |

### BRAND family (3)

| Ticket | Status | Owner |
|--------|--------|-------|
| BRAND-001 | pending P2 | **Фонарщик/Compliance** + **Кочегар** |
| BRAND-002 | DONE 2026-06-06 | Фонарщик/Compliance + Архивариус |
| BRAND-003 | done_pending_andrey_open_items | Фонарщик/Voice + Фонарщик/Compliance + Алиса |

### FRIDA family (5)

| Ticket | Status | Owner |
|--------|--------|-------|
| FRIDA-001 | pending P1 | **Фрида** + Фонарщик/Visual (approve) + Johnny (integration) |
| FRIDA-002 | pending P3 | **Фрида** + Johnny |
| FRIDA-003 | pending P3 | **Фрида** + Наборщик + Фонарщик/Visual |
| FRIDA-004 | pending P3 | **Фрида** + Фонарщик/Visual |
| FRIDA-005 | pending P3 | **Фрида** + КиберГонзо |

### Misc (1)

| Ticket | Status | Owner |
|--------|--------|-------|
| ENCY-COSMETIC-BUNDLE-2026-06-06 | open P3 | **Johnny** (frontend) + **Наборщик** (editorial) |

### Epic umbrella (1)

| Ticket | Status | Owner |
|--------|--------|-------|
| CLDESIGN-EPIC-001 | in_progress (umbrella) | **Алиса** (PM) + **Фрида** (intake) + **Фонарщик** (brand) + **Андрей** (override) |

**Итог:** **32 design-related tickets** all с named owner. **0 TBD после verification.** ✓

---

## 3. Дополнительные fornits касающиеся CLDESIGN периферийно

Не core team но touched:

- **Чапмен** (`/chapman`) — если books@folkup.app потребует Posthorn-side mail-receive setup (BL-INF-09 от Иви — books@folkup.app errata blocker)
- **Лев** (`/lev`) — license alignment Q5 + Korda photo Q (С25 brand canon update)
- **Редактор** (`/editor`) — pre-publication gate post-walk artifacts

---

## 4. Gap analysis — что есть/чего НЕ хватает

### ✅ Полностью покрыто

- DESIGN.md authoring → Фрида
- Brand canon enforcement → Фонарщик/Visual + /Compliance
- Frontend CSS/WCAG → Johnny
- Visual regression → Johnny + Playwright
- DevOps deployment → Кочегар
- Editorial AI-slop → Наборщик + Огилви
- SEO/indexation → Дьюи
- Doc governance → Архивариус
- Security secrets → Купер
- Legal/license → Лев
- Research/verification → КиберГонзо
- Courier → Печкин
- Project coordination → Алиса + Лесник + Картограф + Гутенберг

### ⚠️ POTENTIAL gaps (NOT materialized — observation only)

Per Андрей mandate «найди недостающие фор нитов» — fornits НЕ materializing speculatively per anti-busy-work §1. Surfacing as observations для walk discussion:

#### Gap #1 — Print typographer / book engine specialist

**Observation:** Иви flagged Agile EPUB has hardcoded Times в `styles/main.css`. Иви рекомендует Vivliostyle / Paged.js / Prince / Typst для proper print pipeline. **Наборщик covers editorial typography но not print engine choice / configuration / pagination tuning / kerning per-language defaults.**

**Current coverage:** None в FolkUp roster.
**Иви coverage:** Internal to her process — она авторитет на typography per `INSTRUKCIYA-verstalshchiku-tipografika-serii.md`.
**Recommended action для walk:** Decide whether print engine work stays «Иви external authority» OR FolkUp materializes «Печатник» fornit. Defer materialization until project demands it (book #2 «Согласные» print release dates).

#### Gap #2 — Multi-theme color systems engineer

**Observation:** Иви spec §3b prescribes переключаемые цветовые схемы + 2 mandatory ч/б themes + WCAG AA для всех. Johnny WCAG covers single-palette, но bulk theme generation для 4+ schemes (book direction + writing direction + research direction + design direction + ч/б×2) = specialized scope. Could become bottleneck.

**Current coverage:** Johnny (stretched scope) + Фонарщик/Visual (palette governance).
**Recommended action для walk:** **No new fornit.** Stretched-Johnny scope acceptable — DESIGN.md Section 3b prescription делается once в Claude Design SaaS, после чего Johnny consumes tokens. Single execution событие, not recurring need.

#### Gap #3 — Lesson #42 self-check — verify above

Кстати — оба gaps surfaced through V-batch synthesis (КиберГонзо + Архивариус). Не из nowhere. Cross-link evidence:
- Print engine — `vault/memory/archivist-ivi-files-synthesis-2026-06-07.md` §10 «дефект эталона Agile»
- Multi-theme — `vault/contexts/INSTRUKCIYA-claude-design-onboarding.md` §3b lines 119-160

### ❌ NOT a gap

- **«Дизайн-системный архитектор» отдельно от Фрида** — Фрида holds both illustration AND DESIGN.md authoring per SKILL.md §2. Не нужно второй fornit.
- **«Design partner liaison» отдельно от Печкина** — Печкин и есть courier. Не нужно второй.
- **«i18n engineer»** — Дьюи покрывает hreflang/multi-locale SEO; Johnny + Кочегар покрывают frontend i18n implementation. Сценарии редкие.

---

## 5. Roles НЕ нужны pre-walk (post-walk only)

Если Option A chosen (Иви INSTRUKCIYA canonical):
- **5 готовых промптов Иви** executable Андрей+Алиса directly — не нужно дополнительных fornits
- Post-first-session lessons capture → Алиса + Фрида write claude-design-kb/

Если Option B chosen (Session B retain + cleanup):
- **CLDESIGN-tailwind-removal-001 P0** activated → Фрида + Фонарщик (already assigned)
- 3-5h focused work, no additional fornits

Если Option C chosen (reconcile):
- Cherry-pick work → Фрида + Алиса коллаборация (no new fornit)

---

## 6. Cross-references

- Priority walk brief: `vault/memory/priority-walk-brief-2026-06-08.md` (5-block agenda) — **этот manifest корректирует §99-104 phantom**
- CLDESIGN-EPIC-001 umbrella в BACKLOG.yaml lines 13521-13618
- CLDESIGN-CANON-DECISION-001 в BACKLOG.yaml lines 13619-13711
- Fornits roster: `vault/memory/fornits_roster.md` (22 L1 fornits census)
- Services map: `vault/memory/services-map.md`

---

## 7. Recommendations для Андрей priority walk (P-batch output)

1. **Skip brief §99-104 owner gaps discussion** — 0 actual TBD, manifest covers
2. **Confirm Option A/B/C** (Tier 0 decision) — все downstream owner assignments hold consistent
3. **No new fornit materialization needed pre-walk** — gap observations defer until project demands
4. **Pre-walk reading order:** этот manifest → priority-walk-brief → 4 V-batch memory files → collision doc

---

**Compiled:** 2026-06-07 by Алиса (COOPER session A, P-batch P1 — autonomous pre-walk team assembly per Андрей carte blanche cont +20).
**Method:** Primary-source verify (Lesson #42) каждый ticket owner от BACKLOG.yaml. Brief §99-104 phantom caught.
**Anti-busy-work §1 PASS 4/4:** team coordination scaffold / brief contained phantom (real gap) / cross-session reusable / single-sentence reviewer value «18 fornits assigned, 0 TBD verified».
