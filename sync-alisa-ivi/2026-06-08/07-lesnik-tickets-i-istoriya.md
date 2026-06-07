<!-- precommit:allow-ai-mentions -->
---
title: Лесник — Design system archaeology 2026-06-07
version: 1.0
date: 2026-06-07
classification: REFERENCE — exhaustive design tickets inventory + git history + Session B analysis
authority: Лесник (V-batch parallel agent #3) — PM coordination methodology
source: V-batch 2026-06-07, ~30 min agent budget
status: COMPLETE — foundation для CLDESIGN-EPIC-001 umbrella structure
---

# Лесник: design system archaeology 2026-06-07

3-task archaeological deep dive: git history + BACKLOG inventory + memory archaeology + Session B vault/design/ critical analysis.

---

## Task A — Git history summary (60 days, 2026-04-01 → 06-07)

| Repo | Design commits | Notable |
|------|----------------|---------|
| **vault** | 17 | Session B's `2199e80` (canonical ship 06-06), CLDESIGN draft progression v0.1→v0.4, e3055a3 (С26 Ивин канон), `5ed029f` PRE-EVIDENCE template, `e237b78` (35 epic tickets filing) |
| **folkup-landing** | 3 | `882bbd1` DSGN-003 v2.5 drift fix, `83e6a58` B1.5 font swap, `72c6f15` B1 Cinzel+EB Garamond |
| **folkup-docs** | 32+ | AGIL-114 canonical palette D rollout, AGIL-118+121 typography, AGIL-119 theme toggle, AGIL-150 LBA brand correction, AGIL-168+173 18px floor + 44px touch targets, AGIL-190 de-AI chapters |
| **ecosystem-dashboard** | 8 | DSHB-016 Tailwind-to-tokens migration, DSHB-046 self-host fonts, brand polish waves |
| **agile-sapiens** | 1 | `f89469f` BACKLOG cont #13 ADD-13 С19+С20 Иви cycle |
| **lucerna** | 2 | `1d2a27c` Brand Guide v2.5 integration, `74ee75c` SIL OFL font compliance |
| **tarot-hub** | 2 | Brand Guide v2.5 mystical palette deployment |
| **setubal/aquarium/padel/quest** | 1-3 each | All Brand Guide v2.5 ROLLOUT — Pacifico/Playfair, Palette D |
| **folkup-infra** | 3 | `c26f821` squashed brand subtree integration, AGIL-112 branded error pages |

### Shipped (done)
- **Brand Guide v2.4 → v2.5 rollout** across all 8 encyclopedia/site repos
- **`vault/design/folkup-base.DESIGN.md`** (Session B 2026-06-06, 628 lines, Андрей APPROVED via zerkalce)
- **AGIL-114** canonical palette D tokens + WCAG dark mode (agile-sapiens, hextra theme)
- **DSGN-003** Brand Guide drift remediation
- **BRAND-002** cross-site Brand Guide audit
- **Storybook gap analysis** — 50% coverage = Playwright (112/112) compensates

### In-progress
- **CLDESIGN-001** approved 06-06, ship done, но Tailwind issue
- **Brand canon update С25** (recent — vault/memory/brand-canon-update-2026-06-07.md)
- **Ивин INSTRUKCIYA** package integration (С19+С20 cycle ongoing)

### Abandoned / superseded
- Tailwind v4 utility-class approach для new design system (Андрей mandate 2026-06-06)
- `vault/contexts/design-folkup-base-draft.md` (Фрида predecessor draft) — byte-identical к Session B ship
- DPLT-related design work — paused при denpilot decommission 2026-05-26
- `typography-brand-guide-v2.5.css` deleted (AGIL-114 A6)

---

## Task B — BACKLOG design tickets inventory

**Total design-related tickets: 32 across 9 families** (из 377+ total в BACKLOG)

### CLDESIGN family (16 tickets)

| ID | Title | Pri | Status | Owner |
|----|-------|-----|--------|-------|
| CLDESIGN-001 | Author canonical folkup-base.DESIGN.md | P0 | **approved** | Фрида + Фонарщик + Андрей |
| CLDESIGN-002 | Enable Claude Design в admin settings | P1 | pending | Андрей (~30min) |
| CLDESIGN-003 | Bootstrap folkup-base в Claude Design | P1 | pending | Андрей (~1h) |
| CLDESIGN-004 | Playwright visual regression baseline | P1 | pending | Johnny |
| CLDESIGN-005 | design.folkup.app DESIGN.md publication endpoint | P2 | pending | (TBD) |
| CLDESIGN-006 | Per-encyclopedia DESIGN.md overlays | P2 | pending | (TBD) |
| CLDESIGN-007 | Vue 3 + Vite + Tailwind v4 handoff loop validation | P1 | pending | Johnny |
| CLDESIGN-008 | Vendor-lock-in protection (export-and-commit) | P1 | pending | Кочегар |
| CLDESIGN-009 | Usage-pool monitoring rule | P1 | pending | Алиса |
| CLDESIGN-010 | $50 extra-usage credit buffer | P2 | **deferred** | Андрей |
| CLDESIGN-cyr-lh-001 | Cyrillic LH + hyphens в main.css | P2 | pending | Johnny |
| CLDESIGN-cyr-locl-001 | EB Garamond Cyrillic locl GSUB verification | P3 | pending | Johnny |
| CLDESIGN-tokens-001 | `--text-*/--space-*/--shadow-*` в @theme | P2 | **deferred** | Johnny |
| CLDESIGN-tokens-002 | Hero scale 49→61px (1.414 Tritone) | P2 | **deferred** | Фонарщик+Андрей |
| CLDESIGN-MIGRATE-DESIGN-MD | Migrate vault/design/ → folkup-infra/design/ | P2 | pending (blocked INC-006) | Алиса + Кочегар |
| **CLDESIGN-tailwind-removal-001** | ⚠️ Tailwind removal blocker для first SaaS session | **P0** | **open** | Фрида + Фонарщик |

### DSGN family (4 tickets)
| ID | Title | Pri | Status |
|----|-------|-----|--------|
| DSGN-001 | Private folkup-brand-system repo (rule-of-3 conditional) | P3 | deferred |
| DSGN-002 | Cyrillic fallback + palette-d tokens canon | P2 | pending |
| DSGN-003 | Brand Guide v2.4 vs v2.5 drift resolution | P2 | **done** |
| DSGN-004 | DSGN canon Source Sans 3 vs LAND-003 contradiction | P3 | pending |

### BRAND family (3 tickets)
| ID | Title | Pri | Status |
|----|-------|-----|--------|
| BRAND-001 | Brand-rule в PR template / pre-commit (Фонарщик gate) | P2 | pending |
| BRAND-002 | Cross-site Brand Guide version audit | P3 | **done** |
| BRAND-003 | Retroactive Фонарщик/Voice review L1 fornit voice formulas | P3 | pending |

### FRIDA family (5 tickets)
| ID | Title | Pri | Status |
|----|-------|-----|--------|
| FRIDA-001 | Trilogy book glyphs (AGIL/CWV/COS) — 3 distinctive icons | P1 | pending |
| FRIDA-002 | Pacifico subset trim Q10 | P3 | pending |
| FRIDA-003 | Declaration Guide font stack unification | P3 | pending |
| FRIDA-004 | New Gertruda WebP variants | P3 | pending |
| FRIDA-005 | Section 2 archive prompt maintenance | P3 | pending |

### Misc related (4 tickets)
| ID | Title | Pri | Status |
|----|-------|-----|--------|
| FONT-BOLD-001 | True bold Cinzel/EB Garamond woff2 | P2 | **deferred** |
| LLMS-COMPRESS-001 | llms.txt 48→≤30 lines | P3 | pending |
| AQUA-TYPO-001 | Aquarium Brand Guide v2.5 fonts ship | P2 | pending |
| ENCY-COSMETIC-BUNDLE-2026-06-06 | Cosmetic bundle | P3 | open |

### Existing design epics
**NONE.** No CLDESIGN-EPIC / DSGN-EPIC / BRAND-EPIC umbrella ticket exists. Precedent для других доменов: BRCO-EPIC-001 (10× sub-tickets), SGB-MAYA-002 (compliance epic). Design system NEVER было оформлено umbrella structure'ом.

### Status distribution (32 design tickets)
- approved: 1 (CLDESIGN-001)
- pending: 17
- done: 3 (DSGN-003, BRAND-002, implicit)
- deferred: 5 (CLDESIGN-010, tokens-001/002, FONT-BOLD-001, DSGN-001)
- open: 2 (⚠️ CLDESIGN-tailwind-removal-001 = P0)
- blocked: 1 (CLDESIGN-MIGRATE → INC-006)

### Owner distribution
- **Фрида**: 5 tickets
- **Фонарщик**: 5 tickets approval-side
- **Johnny**: 8 tickets
- **Андрей**: 4 tickets needing direct action
- **Кочегар**: 3 tickets
- **Алиса**: 4 tickets
- **TBD**: 3 tickets без owner

### Critical blockers chain
```
INC-006 (VPS lock)
  ↓ blocks
CLDESIGN-MIGRATE-DESIGN-MD-2026-06-06 (vault/design/ → folkup-infra/design/)

CLDESIGN-tailwind-removal-001 (P0 OPEN)
  ↓ blocks
CLDESIGN-003 (Bootstrap в Claude Design)
  ↓ blocks
CLDESIGN-004/007 (validation work)

CLDESIGN-001 (approved BUT contains 13 Tailwind refs)
  ↓ semantically blocked by
CLDESIGN-tailwind-removal-001
```

---

## Task C — Memory archaeology findings

### Prior design decisions (chronological)
| Date | Event |
|------|-------|
| 2026-04-17 | Claude Design launches (Anthropic Labs research-preview) |
| 2026-04-30 → 05-15 | Brand Guide v2.5 ROLLOUT across 8 repos |
| 2026-05-20 | AGIL-114 canonical palette D consumed by classical.css |
| **2026-05-27** | **Иви creates `INSTRUKCIYA-claude-design-onboarding.md` v18** (independent canonical) |
| 2026-05-27/28 | Anthropic shared-pool change (Claude Design + Claude Code теперь делят weekly quota) |
| 2026-05-31 | Иви updates v22, v23 INSTRUKCIYA |
| 2026-06-02 | CLDESIGN epic filed (35 tickets, `e237b78`) — Андрей scope-approval |
| 2026-06-02 | Brand-rule extension к 4-fornit panel (Фонарщик+Фрида+Johnny+Наборщик) |
| 2026-06-02 → 06-06 | Фрида draft folkup-base v0.1→v0.4 (4 panel reviews) |
| 2026-06-04 | Иви v23 final canonical в zip пакет |
| **2026-06-06 15:22** | **Session B ships v0.4 к `vault/design/`, Андрей APPROVED via zerkalce** (commit `2199e80`) |
| 2026-06-06 ночь | Андрей передаёт Ивин ПАКЕТ через Telegram (16 файлов + ДОСЬЕ) |
| 2026-06-06 evening | CLDESIGN-tailwind-removal-001 P0 filed (Андрей mandate «нативные инструменты») |
| 2026-06-07 утро | T-batch discovery: Алиса finds Ивин canonical, Андрей confirms «принимаем» |
| 2026-06-07 | V-batch discovery: Session A finds Session B уже approved alternative — **collision documented** |

### Lessons learned
- **Lesson #42**: Panel pre-review verdicts MUST verify primary-source via grep
- **Lesson #51**: Discovery sweep обоих directions (tmp/for + tmp/from)
- **Brand-rule expansion** (2026-06-02): 4-panel pre-review (Фонарщик+Фрида+Johnny+Наборщик)
- **Storybook gap analysis**: ~50% coverage compensated by Playwright (already 112/112)
- **DESIGN.md key insight**: Explicit 9-section → ≥75% on-brand vs inferred 50-75%

---

## ⭐ CRITICAL: Session B's vault/design/ analysis

**Files:** 1 file — `vault/design/folkup-base.DESIGN.md` (48,246 bytes, 628 lines)

**Commit:** `2199e80` 2026-06-06 15:22 «design: ship canonical folkup-base design system to vault/design/» batch B-19-A (Cartouche L3 cont +18)

**Frontmatter status:** `version: 0.4 — APPROVED`
**Approval mechanism:** zerkalce HTML single-select picker «выбрал approve»
**Authors:** Фрида + Фонарщик + Андрей supreme override
**Panel reviews:** 4× PROCEED_WITH_NITS (Огилви + Johnny + Наборщик + Дьюи)

**Relationship к existing artifacts:**
- **Duplicate of** `vault/contexts/design-folkup-base-draft.md` — verified byte-identical via `diff -q`
- **NOT a duplicate** of Ивиной `INSTRUKCIYA-claude-design-onboarding.md` (338 lines, different scope/structure)
- **CONFLICT с** Андрей mandate 2026-06-06 «нативные инструменты» — contains 13 explicit Tailwind references

**Critical insight:** Session B's ship is NOT duplicate того что мы сейчас собираемся делать с Ивиной INSTRUKCIYA. Это **complementary** — Session B = naш own crafted folkup-base DESIGN.md (628 lines, 9 sections per VoltAgent, Andrей-approved); Иви INSTRUKCIYA = canonical ONBOARDING document. Сам collision documented в `design-system-canonical-collision-2026-06-07.md`.

---

## Recommendations для epic structure

**Предлагаю: создать `CLDESIGN-EPIC-001` umbrella ticket** объединяющий все 32 design tickets (precedent — BRCO-EPIC-001, SGB-MAYA-002).

```
CLDESIGN-EPIC-001 — Claude Design SaaS integration + FolkUp design system canonicalization
├── Tier 0: Strategic disambiguation (DAY 0, before any execution)
│   └── CLDESIGN-CANON-DECISION-001 (NEW) — Андрей strategic choice Option A/B/C
├── Tier 1: Foundation (CLDESIGN-001 + tailwind-removal-001 conditional)
├── Tier 2: SaaS enablement (CLDESIGN-002 + 003)
├── Tier 3: Storybook gap compensation (CLDESIGN-004 + 005)
├── Tier 4: Cross-cutting rollout (CLDESIGN-006 + 007)
├── Tier 5: Operational hardening (CLDESIGN-008 + 009 + 010 deferred)
├── Tier 6: Quality cleanup (cyr-lh-001, cyr-locl-001, tokens-001/002, FONT-BOLD-001)
└── Tier 7: Migration (CLDESIGN-MIGRATE-DESIGN-MD, blocked INC-006)

Related epics:
- BRAND-EPIC-001 (BRAND-001/003 — Фонарщик domain)
- FRIDA-EPIC-001 (FRIDA-001..005 — illustration domain)
- DSGN-EPIC-001 (DSGN-001/002/004 — foundational tokens)
```

**Reasoning:** flat 32-ticket structure обозримо но без epic structure нет visible dependency chain, нет single owner для priority walk, нет clear «закрытие» story.

---

## Open questions для tomorrow priority walk

1. **STRATEGIC** (collision): какой из 3 options Андрей выбирает — A (Иви canonical), B (Session B), C (reconcile)?
2. **Tailwind P0**: если Option B chosen — кто и когда делает CLDESIGN-tailwind-removal-001 (3-5h)?
3. **Epic structure**: создавать ли CLDESIGN-EPIC-001 umbrella, или продолжать flat?
4. **Owner gaps**: 3 tickets без owner. Назначить Johnny / Фрида / Алиса / Архивариус?
5. **CLDESIGN-002/003 sequencing**: оба требуют Андрей time (~30min + ~1h) — в каком порядке?
6. **Shared-pool concern**: когда планировать первую SaaS session чтобы не блокировать Claude Code?
7. **INC-006 unblock**: миграция vault/design/ → folkup-infra/design/ — критично OR можно жить с vault?
8. **Per-encyclopedia overlays**: CLDESIGN-006 — какие конкретно encyclopedia priority (setubal? padel? lucerna?)?

---

**Status:** Archaeology complete. Vault/design/ collision документирован. 32 design tickets inventoried. NO existing epic structure. Critical P0 blocker CLDESIGN-tailwind-removal-001 OPEN. Recommendation для Андрея: Option A + create CLDESIGN-EPIC-001 umbrella + назначить владельцев для 3 orphan tickets.

**Key files referenced:**
- `vault/design/folkup-base.DESIGN.md` (628 lines, APPROVED)
- `vault/contexts/INSTRUKCIYA-claude-design-onboarding.md` (Иви canonical, 338 lines)
- `vault/contexts/design-folkup-base-draft.md` (Фрида predecessor)
- `vault/memory/design-system-canonical-collision-2026-06-07.md` (strategic decision tree)
- `vault/BACKLOG.yaml` (377+ tickets, 32 design-related)
- `~/.claude/projects/.../folkup-landing/memory/project_claude_design_saas_2026_06_02.md` (verified facts baseline)
- Session B commit: `2199e80` (canonical ship 2026-06-06)
- `vault/memory/brand-canon-update-2026-06-07.md` (С25 additions)
