<!-- precommit:allow-ai-mentions -->
---
title: Design System Canonical Collision — 3 параллельные authoritative versions
version: 1.0
date: 2026-06-07
classification: P0 INVESTIGATION — Critical disclosure для Андрей priority walk завтра
status: ACTIVE — awaiting Андрей strategic disambiguation
authority: Алиса (COOPER session A, V-batch discovery)
trigger: Session B commit 2199e80 «ship canonical folkup-base design system» обнаружен post-T-batch
---

# Critical Finding — 3 параллельных canonical документа для одной задачи

## Контекст

В рамках T-batch (2026-06-07 утром) обнаружено что Иви прислала canonical
`INSTRUKCIYA-claude-design-onboarding.md` ещё 27.05.2026. Андрей confirmed
«идём по Ивиному canonical». Но **post-confirmation discovery**: Session B 24
часа назад APPROVED НАШУ собственную версию folkup-base через
zerkalce single-select picker (приближённо к моменту когда я создавала свою
дублирующую T-batch работу).

## 3 candidates

### #1 — vault/design/folkup-base.DESIGN.md (Session B ship, **ANDREY FORMALLY APPROVED**)

- **Author trail:** Фрида (наш fornit) draft → Session B ship → **Андрей FORMAL APPROVAL** 2026-06-06 15:22 via zerkalce picker «выбрал approve»
- **Verified frontmatter:** `version: 0.4 — APPROVED`, `status: APPROVED 2026-06-06 by Андрей via zerkalce cont +18`
- **Approval mechanism:** zerkalce HTML single-select picker «выбрал approve»
- **Approval artifact:** `C:/Transit/zerkalce-cldesign-001-approve-2026-06-06.html`
- **Conflict с T-batch chat:** Андрей 2026-06-07 в нашем чате сказал «Да. Я очень хочу научиться новому инструменту... принимаем ее [Ивиный canonical]» — это AFTER формального approval. Возможные интерпретации:
  1. Cont gap — Андрей не помнил что approved через zerkalce 24h ago, когда увидел Ивин canonical
  2. Conscious switch — Андрей awareness обоих + предпочёл Ивин (но не explicit это)
  3. Partial info approval — approved на основании Фриды draft не зная про Ивин canonical, теперь needs disambiguate
- **Status:** CLDESIGN-001 status `pending_andrey_final` → `approved` (committed 2199e80)
- **Size:** 628 lines, 9-section VoltAgent format
- **Panel reviews:** 4× PROCEED_WITH_NITS (Огилви + Johnny + Наборщик + Дьюи)
- **Frontmatter status:** APPROVED
- **Known issue:** содержит 13 critical Tailwind references (Фрида T-batch audit) — противоречит Андрей mandate 2026-06-06 «фреймворки придумали те кто не умеет пользоваться нативными инструментами»
- **Migration target:** `folkup-infra/design/folkup-base.DESIGN.md` (blocked by INC-006)

### #2 — vault/contexts/INSTRUKCIYA-claude-design-onboarding.md (Иви, canonical)

- **Author:** Иви (publishing PM трилогии, соседняя claude.ai сессия)
- **Versions:** v18 (27.05) → v22 (31.05) → v23 (04.06)
- **Delivered:** part of «FolkUp-Дизайн-система-пакет-для-команды-2026-06-06.zip» (06.07.2026 00:39 UTC)
- **Size:** 338 lines
- **Structure:**
  - Section 1 — главный принцип онбординга
  - Section 2 — пошаговый онбординг
  - Section 3 — рекомендации по опциям
  - Section 3b — переключаемые цветовые схемы
  - **Section 4 — ⭐ ЧЕРНОВИК DESIGN.md (75 lines, ZERO Tailwind references)**
  - **Section 5 — ⭐ 5 готовых промптов**
  - Section 6 — мост к Иви для доводки
  - Section 7 — 4 открытых вопроса к Андрею
- **Frontmatter status:** RECOMMENDED + READY-TO-USE
- **Andrey acknowledged:** 2026-06-07 in chat «Да. Я очень хочу научиться новому инструменту... принимаем ее»
- **Conflict resolution:** Андрей confirmed canonical path PRIOR к knowing про Session B approval #1

### #3 — vault/contexts/design-folkup-base-draft.md (Фрида, predecessor)

- **Same content** как #1 (Session B сделала diff -q byte-identical copy)
- **Status:** DRAFT round 4 — superseded by #1 shipping
- **No frontmatter SUPERSEDED marker yet** (моя попытка edit прервана user)

## Almost certain timeline

| Date | Event |
|------|-------|
| 2026-05-27 | Иви v18 INSTRUKCIYA created (canonical onboarding) |
| 2026-05-28 — 06-04 | Иви updates v22, v23 — sent via Telegram + Андрей courier |
| 2026-06-02 ~ 06-06 | Фрида в наших sessions creates folkup-base draft v0.1 → v0.4 (independent от Иви) |
| 2026-06-06 15:22 | Session B approve folkup-base v0.4 → ship к vault/design/ (commit 2199e80) |
| 2026-06-06 ночь | Андрей передаёт Ивин ПАКЕТ через Telegram (16 файлов) + ДОСЬЕ |
| 2026-06-07 утро | T-batch discovery: я нашла Ивин canonical, Андрей confirmed «принимаем» |
| 2026-06-07 после | V-batch discovery: Session B already approved alternative #1 |

## Гипотеза почему это произошло

Сессии работали в **параллели изолированно** про дизайн-систему:
- Session B + Фрида: built up own version через 4 panel reviews (Огилви/Johnny/Наборщик/Дьюи), assumed это canonical, shipped
- Иви: built canonical через свои v18→v23 sessions, sent через Андрей-courier
- Андрей: получил оба, но Ивин пакет — последним

Lesson #51 (just promoted): discovery sweep ОБА directions (tmp/for + tmp/from). Если бы Session B проверила tmp/from-ivi/ ПЕРЕД approval — нашла бы Ивин canonical и paused. Третья occurrence Lesson #51 в течение 24 часов.

## Что нужно решить (для Андрей priority walk завтра)

**Strategic decision tree:**

### Option A — Принять Ивин INSTRUKCIYA как canonical, SUPERSEDE Session B approval

- Закрыть CLDESIGN-001 как obsolete (approval superseded by partner canonical discovery)
- Mark vault/design/folkup-base.DESIGN.md как SUPERSEDED
- Use Иви's section 4 DESIGN.md draft + section 5 prompts для onboarding
- Что получаем: aligned with Андрей mandate «нативный CSS», simpler artifact (75 vs 628 lines), Ивин workflow

### Option B — Принять Session B approval, INSTRUKCIYA — reference only

- Keep vault/design/folkup-base.DESIGN.md approved canonical
- BUT Tailwind cleanup (CLDESIGN-tailwind-removal-001) становится критичным blocker
- Иви reference используется select for prompts (section 5) и операционные procedures
- Что получаем: panel-reviewed артефакт (4× PROCEED_WITH_NITS), но 628 lines complexity + 13 Tailwind refs к remove

### Option C — Reconcile (cherry-pick из обоих)

- Базис = Ивин section 4 (75 lines, без Tailwind)
- Cherry-pick из folkup-base v0.4 что НЕ покрыто Ивиной + НЕ Tailwind-bound
- Создать v0.5 с lineage credit обоим authors (Иви + Фрида)
- Что получаем: best-of-both, но дополнительная работа (~3-5 hours focused merge)

## Моя рекомендация (для priority walk)

**Option A.** Reasoning:
1. Андрей УЖЕ confirmed «принимаем Ивин canonical» хронологически после approval Session B (но не зная про approval)
2. Ивин path align c Андрей mandate vanilla CSS
3. Ивин simplicity favorable для first SaaS session learning
4. Session B's 628 lines work не пропадёт — может cherry-pick if gaps found post-first-session
5. Lesson #51 promotion имеет precedent — better honor partner-delivered canonical чем internal dispute resolution

Но это **strategic decision Андрей** — disclosure mandatory transparently.

## Cross-references

- `vault/contexts/INSTRUKCIYA-claude-design-onboarding.md` (Иви canonical)
- `vault/design/folkup-base.DESIGN.md` (Session B approved)
- `vault/contexts/design-folkup-base-draft.md` (Фрида predecessor draft)
- `vault/memory/brand-canon-update-2026-06-07.md` (С25 brand additions)
- `vault/memory/reference-ivi-canonical-package-2026-06-06.md` (inventory)
- `~/.claude/rules/discovery-sweep-bidirectional.md` (Lesson #51 promoted)
- Session B commit `2199e80` (approval ship)
- Session A T-batch chat discovery 2026-06-07

---

**Created:** 2026-06-07 by Алиса (COOPER session A, V-batch parallel discovery, agents продолжают работу в фоне)
**Re-verify trigger:** Андрей priority walk decision OR new canonical claim discovered
