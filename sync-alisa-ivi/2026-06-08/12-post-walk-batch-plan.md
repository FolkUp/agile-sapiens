<!-- precommit:allow-ai-mentions -->
---
title: Post-Walk Batch Plan — CLDESIGN execution sequence после Андрей strategic decision
version: 1.0
date: 2026-06-07
classification: PLAN — depends on Andrey Option A/B/C choice at priority walk 2026-06-08
authority: Алиса (COOPER session A, P-batch P3) — synthesis от V/W/P-batch findings
status: READY — executable upon Option choice confirmation
companion: priority-walk-brief-2026-06-08.md + team-cldesign-2026-06-07.md + design-anti-slop-strengthen-addendum-2026-06-07.md
duration_estimate: 7-14 working days depending on Option
---

# Post-Walk Batch Plan — CLDESIGN Execution Sequence

После того как Андрей выбирает Option A / B / C на priority walk 2026-06-08, эта memo — executable roadmap. Каждый Option имеет свой path. Common batches универсальны.

---

## 0. Common batches (любой Option) — executable immediately post-walk

### Batch Q1 (post-walk Day 0, ~1 час) — Decision propagation

**Owner:** Алиса

**Tasks:**
1. Update `vault/memory/design-system-canonical-collision-2026-06-07.md` frontmatter: `status: RESOLVED — Option [X] chosen by Андрей 2026-06-08`
2. Update `CLDESIGN-CANON-DECISION-001` BACKLOG entry: status `pending_decision` → `done`, populate `closing_evidence` с decision text + path к chosen canonical
3. Update `CLDESIGN-EPIC-001` frontmatter: Tier 0 complete, unblocks Tier 1+
4. Propagate status changes к all dependent tickets per chosen Option (см. §1-3 below)

**Враг pre-plan:** small mechanical update, no plans ≥3 steps requiring formal verification. Manual hostile check OK.

**Output:** Decision propagated через 5+ ticket statuses + 1 memory frontmatter.

---

### Batch Q2 (post-walk Day 0, ~30 min) — Brand canon С25 integration

**Owner:** Алиса

**Tasks:**
1. Read latest `vault/memory/folkup-mission-canonical.md` (Session B M-state может быть changed)
2. Per `vault/memory/brand-canon-update-2026-06-07.md` v1.1 — integrate 3 С25 additions:
   - Mission formula «докопаться до сути и первоисточника, верифицировать его и вытащить за забор» (rooted в `KANON-SERII-folkup.md` L40 NOT ПАКЕТ-С25 — verified post-Враг)
   - Майк Науменко culture lineage (verbatim Иви text)
   - Сцепка кн.2 «Чужими руками» ↔ Команданте 2.0 (диагноз/лекарство)
3. After merge — frontmatter brand-canon-update v1.1 + add note «INTEGRATED YYYY-MM-DD в folkup-mission-canonical.md commit SHA»
4. Lesson #34 check — verify не touching Session B's `M` state на main file

**Враг pre-plan:** medium risk (cross-session collision), Lesson #51 sweep `tmp/from-ivi/` ОБЯЗАН пред merge. Manual hostile pre-check sufficient.

**Output:** 3 С25 additions live в canonical mission manifest.

---

### Batch Q3 (post-walk Day 0-1, ~2 часов) — Knowledge base scaffolding

**Owner:** Алиса (coord) + Фрида (DESIGN.md author content) + КиберГонзо (research seeds)

**Tasks:**
1. Create `vault/memory/claude-design-kb/` directory
2. Initial structure:
   ```
   claude-design-kb/
   ├── README.md (purpose + structure + curator: Алиса)
   ├── canonical-pointer.md (points к winning canonical post-Option choice)
   ├── workflow.md (5-step Иви + Архивариус synthesis: setup → bootstrap → prompt → handoff → ship)
   ├── prompts/ (5 готовых Ивиных + future iterations)
   │   ├── 01-fix-design-system.md
   │   ├── 02-soglasnye-cover.md
   │   ├── 03-triple-covers-parity.md
   │   ├── 04-edition-page-colophon.md
   │   └── 05-color-themes-switching.md
   ├── disaster-recovery.md (Open Design install steps + parallel export procedure — CLDESIGN-011 deliverable)
   ├── anti-slop-bans.md (copy из design-anti-slop-strengthen-addendum-2026-06-07.md)
   ├── lessons/ (post-session learning capture)
   │   └── (initially empty — populated after first SaaS session)
   └── kb-changelog.md
   ```
3. Migrate 5 Ивиных prompts из INSTRUKCIYA Section 5 verbatim
4. Cross-link каждого file к sources

**Враг pre-plan:** new artifact creation, Lesson #51 sweep — verified no existing `claude-design-kb/` directory. PASS.

**Output:** Structured KB ready для post-first-session population.

---

### Batch Q4 (post-walk Day 1, ~15 min — Андрей или Алиса) — Frida SKILL.md update

**Owner:** Фрида (self-update) OR Алиса (proxy if Фрида не invoked separately)

**Tasks:**
1. Read current `~/.claude/skills/frida/SKILL.md`
2. Add Section 2 pointer к `vault/memory/claude-design-kb/` as canonical KB
3. Add reference к winning canonical (Option A/B/C dependent path)
4. Update frontmatter `last_updated: 2026-06-08`

**Враг pre-plan:** trivial pointer update, manual check sufficient.

**Output:** Фрида SKILL.md aware where canonical DESIGN.md lives.

---

### Batch Q5 (post-walk Day 1, ~30 min) — Иви courier package

**Owner:** Алиса (draft) + Печкин (delivery)

**Tasks:**
1. Create `agile-sapiens/tmp/for-ivi/2026-06-08-decision-response/`
2. Files inside:
   - `00-RESHENIE.md` — Андрей's Option choice explained
   - `01-OTVETY-on-otkrytye-voprosy.md` — answers к 12 open questions (Иви had 4 + her recent 8)
   - `02-SLEDUYUSHCHIY-SHAG.md` — что мы делаем, что ждём от неё
3. Zip к `C:\Users\ankle\Downloads\FolkUp-Iv-decision-2026-06-08.zip`
4. Печкин delivery brief

**Враг pre-plan:** Lesson #51 sweep ОБЯЗАН — check `tmp/from-ivi/` для new packets от Иви, avoid responding к stale state.

**Output:** Package ready для Андрей-courier upload в Telegram (per TRG-011 BLOCKED bot automation).

---

## 1. ⭐ Option A path — Ивин INSTRUKCIYA canonical (RECOMMENDED per Алиса)

**Trigger:** Андрей chooses Option A at walk.

### Batch QA-1 (Day 1, ~30 min) — Folkup-base v0.4 SUPERSEDE

**Owner:** Алиса (mark) + Лесник (cross-ref hygiene)

**Tasks:**
1. Update `vault/design/folkup-base.DESIGN.md` frontmatter: `status: SUPERSEDED 2026-06-08 by Иви INSTRUKCIYA per Андрей Option A choice`
2. Update `CLDESIGN-001` BACKLOG entry: status `approved` → `superseded`, add closing note
3. Cross-link к INSTRUKCIYA in superseded frontmatter
4. NOTE: file NOT deleted (preservation per agile-change-discipline rollback path)

### Batch QA-2 (Day 1, ~30 min) — Close obsolete tickets

**Owner:** Алиса

**Tasks:**
1. Close `CLDESIGN-tailwind-removal-001` (P0) — irrelevant if Option A (no Tailwind в Ивин canonical)
2. Close `CLDESIGN-MIGRATE-DESIGN-MD-2026-06-06` — irrelevant (vault/design/ deprecated as canonical home)
3. Update closing_evidence на оба — «Option A chosen 2026-06-08, ticket scope obsolete»

### Batch QA-3 (Day 2-3, Андрей ~1h SaaS session) — Bootstrap first session

**Owner:** Андрей (executor) + Алиса (PM)

**Tasks per Иви INSTRUKCIYA §2:**
1. Андрей logs in claude.ai/design
2. Organization → Design systems → Onboarding flow
3. Upload Иви Section 4 DESIGN.md draft (or full INSTRUKCIYA как context)
4. Reference brand repo + sapiens.folkup.life как live examples
5. Run Prompt 1 (fix design system, INSTRUKCIYA §5)
6. Verify hex / fonts / cover canon confirmed
7. Алиса receives handoff bundle

### Batch QA-4 (Day 3-4) — Ship first artifact

**Owner:** Андрей + Алиса + Фрида

**Tasks:**
1. Run Prompt 2 (Согласные cover) per INSTRUKCIYA §5
2. Generate cover artifact
3. Handoff к Claude Code
4. Алиса/Фрида review + ship к `agile-sapiens/static/cover/` или подобное location
5. Test print preview 200px miniature

### Batch QA-5 (Day 4-5) — Lessons capture

**Owner:** Алиса + Фрида + КиберГонзо

**Tasks:**
1. Populate `vault/memory/claude-design-kb/lessons/2026-06-XX-first-session.md`
2. Capture: pool consumption, output quality, antislop drift observation, handoff fidelity, Иви workflow adherence
3. Update kb-changelog.md
4. Если drift к generic AI defaults observed → merge `design-anti-slop-strengthen-addendum` §1 в INSTRUKCIYA Section 4

### Batch QA-6 (Day 5-7) — Retrospective + ART article #1 unblock

**Owner:** Алиса + Гутенберг (publish path)

**Tasks:**
1. Алиса retrospective memo
2. Determine if ART article #1 «Джаз как опен-сорс» (Иви waiting на Фрида + Печкин) can ship через standardized pipeline
3. Brief Иви через next courier package

---

## 2. Option B path — Session B folkup-base v0.4 canonical

**Trigger:** Андрей chooses Option B at walk.

### Batch QB-1 (Day 1-2, ~3-5h) — Tailwind removal P0

**Owner:** Фрида + Фонарщик/Visual

**Tasks per CLDESIGN-tailwind-removal-001:**
1. Read v0.4 line-by-line, identify 13 critical Tailwind references
2. Section 2.6 «Token naming for Tailwind v4 @theme» → replace с native CSS custom properties syntax
3. Section 3.3 typography utility table → replace с semantic CSS classes
4. Section 5.3 grid + spacing utilities → replace с native CSS Grid + spacing tokens
5. Section 6.1 shadow utilities → replace с custom box-shadow values
6. Author updated v0.5 в vault/design/folkup-base.DESIGN.md
7. Pre-commit Фрида/Фонарщик/Visual approval cycle

### Batch QB-2 (Day 2, ~30 min) — Integrate Ивин prompts as reference

**Owner:** Алиса

**Tasks:**
1. Add §10 «Prompt library reference» к v0.5
2. Cross-link к Ивин INSTRUKCIYA §5 (5 готовых промптов)
3. INSTRUKCIYA остаётся «reference», v0.5 — «primary spec»

### Batch QB-3 (Day 3) — Migration к folkup-infra

**Owner:** Алиса (coord) + Кочегар (file move)

**Tasks per CLDESIGN-MIGRATE-DESIGN-MD-2026-06-06:**
1. git mv `vault/design/folkup-base.DESIGN.md` → `folkup-infra/design/folkup-base.DESIGN.md`
2. Update frontmatter — drop temporary-location note
3. Grep ecosystem refs к old path → update к canonical
4. Close MIGRATE ticket

### Batches QB-4 / QB-5 / QB-6 (same as QA-3/4/5 but using v0.5 instead of Ивин Section 4)

---

## 3. Option C path — Reconcile (cherry-pick)

**Trigger:** Андрей chooses Option C at walk.

### Batch QC-1 (Day 1-3, ~3-5h focused merge) — Reconciled v0.5 author

**Owner:** Фрида (technical) + Алиса (cherry-pick coord)

**Tasks:**
1. Базис = Ивин Section 4 DESIGN.md draft (75 lines, zero Tailwind)
2. Cherry-pick из Session B v0.4 что НЕ покрыто Ивиной + НЕ Tailwind-bound:
   - Огилви panel-validated antislop verdicts
   - Johnny WCAG verification depth
   - Наборщик Cyrillic typography rules (§3.5)
   - Дьюи SEO consideration (llms.txt brevity)
3. Author reconciled v0.5
4. Lineage credit в frontmatter: «authors: Иви v18-v23 (canonical base) + Фрида v0.4 (panel-reviewed details cherry-picked) + Алиса (reconciliation)»
5. Pre-commit Фонарщик/Visual + Андрей approval

### Batches QC-2 / QC-3 / QC-4 / QC-5 (same Q3-Q5 + bootstrap session как Option A/B)

---

## 4. Cross-cutting deferred work (после first session — common)

### CLDESIGN-006 — Per-encyclopedia overlays

**Trigger:** First session + at least 1 encyclopedia needs divergent style.
**Owner:** Картограф (coord) + Фрида (author) + Фонарщик/Visual (approve).
**Schedule:** Week 2+.

### CLDESIGN-004 — Playwright visual regression baseline

**Trigger:** v0.5 (Option B/C) OR Ивин INSTRUKCIYA Section 4 (Option A) shipped.
**Owner:** Johnny.
**Schedule:** Week 2.

### CLDESIGN-005 — design.folkup.app publication endpoint

**Trigger:** DESIGN.md stable в production for month.
**Owner:** Johnny + Кочегар + Гутенберг.
**Schedule:** Week 4-6.

### CLDESIGN-007 — Vue 3 + Vite + Tailwind v4 handoff loop validation

**Trigger:** Андрей has ~1-2h focused session.
**Owner:** Андрей + Johnny review.
**Schedule:** Week 2-3.

### CLDESIGN-008 — Vendor-lock-in protection export-and-commit

**Trigger:** First Claude Design SaaS artifact for production.
**Owner:** Фонарщик/Visual + Кочегар.
**Schedule:** Week 2.

### CLDESIGN-009 — Usage-pool monitoring rule

**Trigger:** Post-June-15 verification which pool Claude Design draws.
**Owner:** Андрей + Алиса.
**Schedule:** 2026-06-15+.

### CLDESIGN-011 — Open Design disaster-recovery clone

**Trigger:** Андрей confirms Open Design install pre-first-SaaS-session (recommended P1).
**Owner:** Кочегар (install) + Алиса (parallel export).
**Schedule:** Before Day 2.

### CLDESIGN-cyr-lh-001 + cyr-locl-001 — Cyrillic production gaps

**Trigger:** INC-006 closed (now closed via E1 abandon path 2026-06-07). Re-evaluate.
**Owner:** Johnny.
**Schedule:** Week 2-3.

### books@folkup.app errata mail (Иви BL-INF-09)

**Trigger:** Before first book release (Согласные / Город Солнца).
**Owner:** Чапмен (Posthorn coord) + Кочегар (mail receive setup).
**Schedule:** Week 3-4.

---

## 5. June 15 cutoff verification (critical milestone)

**Date:** 2026-06-15 (8 days from now per priority walk brief).

**Pre-cutoff checklist (~June 13-14):**
1. Verify Claude Design SaaS pool assignment via Settings → Usage Anthropic
2. Document «Claude Design uses [main pool / Agent SDK separate pool]» в kb-changelog.md
3. If Agent SDK pool → recalibrate session scheduling против $200/mo Max 20x credit
4. Update CLDESIGN-009 closing_evidence с verification finding

**Post-cutoff verification (~June 16-17):**
1. Run small Claude Design experiment session
2. Observe credit consumption
3. Confirm prior assumption или adjust

---

## 6. Knowledge gaps to fill post-first-session

Per КиберГонзо research §«Knowledge gaps»:

1. Anthropic official changelog для Claude Design — quarterly КиберГонзо poll (calendar reminder needed)
2. Open Design ZIP import workflow primary docs — hands-on test during CLDESIGN-011
3. Post-June-15 pool assignment — resolved via §5 above

---

## 7. Walking summary card (для Андрей comprehension)

| Option | First-session ETA | Total Week 1 effort | Risk |
|--------|-------------------|---------------------|------|
| **A — Ивин canonical** | Day 2-3 (Андрей ~1h) | ~6h total (Q1-Q5 + QA-1/2 + QA-3) | LOW (Ивин tested workflow) |
| **B — Session B + Tailwind cleanup** | Day 4-5 | ~12-14h total (Q1-Q5 + QB-1 3-5h + QB-2/3 + QB-4) | MEDIUM (Tailwind work risk) |
| **C — Reconcile** | Day 4-5 | ~12-14h total (Q1-Q5 + QC-1 3-5h + QC-2-5) | MEDIUM-HIGH (design by committee risk) |

**Алиса recommendation:** Option A — fastest path к first session learning, preserves both work-streams' value (Session B's panel work can cherry-pick later if gaps found).

---

## 8. Cross-references

- Priority walk brief: `vault/memory/priority-walk-brief-2026-06-08.md`
- Team manifest: `vault/memory/team-cldesign-2026-06-07.md`
- Anti-slop addendum: `vault/memory/design-anti-slop-strengthen-addendum-2026-06-07.md`
- Collision doc: `vault/memory/design-system-canonical-collision-2026-06-07.md`
- Brand canon update: `vault/memory/brand-canon-update-2026-06-07.md`
- Иви canonical inventory: `vault/memory/reference-ivi-canonical-package-2026-06-06.md`
- BACKLOG: CLDESIGN-EPIC-001 + CLDESIGN-CANON-DECISION-001 + all 32 tickets

---

**Compiled:** 2026-06-07 by Алиса (COOPER session A, P-batch P3 final deliverable).
**Method:** Option-aware sequence — common batches (Q1-Q5) executable any Option; QA-/QB-/QC- branches activate by decision.
**Anti-busy-work §1 PASS 4/4:** Андрей gets decision-day-zero executable plan / V/W/X/P-batch synthesis surfaced / cross-session execution roadmap / single-sentence reviewer value «walk → Q1-Q5 common + Option-specific batches activate».
