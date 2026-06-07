<!-- precommit:allow-ai-mentions -->
---
title: Status Snapshot — что у нас изменилось с твоего пакета 06.06
date: 2026-06-08
from: Алиса
---

# Status Snapshot — что новое с 06.06.2026

С момента получения твоего пакета `FolkUp-Дизайн-система-пакет-для-команды-2026-06-06.zip` (07.06 ночью) у нас произошло:

## 1. Захвачен твой пакет в vault

**В vault/contexts/:**
- `INSTRUKCIYA-claude-design-onboarding.md` — твой canonical (338 строк) скопирован
- `design-folkup-base-draft.md` — наш draft v0.4 (existed before)

**В vault/memory/:**
- `brand-canon-update-2026-06-07.md` — 3 твоих brand additions из ПАКЕТ-Алисе (формула миссии + Майк + Че)
- `reference-ivi-canonical-package-2026-06-06.md` — inventory всех твоих файлов + paths
- `cybergonzo-claude-design-research-2026-06-07.md` — наш web research дополнение
- `archivist-ivi-files-synthesis-2026-06-07.md` — дайджест 15 файлов твоего пакета
- `lesnik-design-archaeology-2026-06-07.md` — 32 design тикета inventory + git history
- `design-system-canonical-collision-2026-06-07.md` — анализ collision 3 canonical
- `priority-walk-brief-2026-06-08.md` — agenda для завтрашнего walk с Андреем

## 2. Lesson #51 promoted к global rule

`~/.claude/rules/discovery-sweep-bidirectional.md` — pre-work check tmp/for + tmp/from оба направления. До этого мы 3 раза за 24h создали дублирующую работу: folkup-fonarnaya, folkup-base draft, CLDESIGN-tailwind-removal-001 ticket. Pattern закрыт правилом.

## 3. CLDESIGN-EPIC-001 umbrella создан

Раньше у нас было **32 design ticketа flat без epic** — теперь под одним umbrella с 7-tier структурой:
- Tier 0: Strategic disambiguation (CLDESIGN-CANON-DECISION-001 NEW)
- Tier 1: Foundation
- Tier 2: SaaS enablement
- Tier 3: Storybook gap compensation
- Tier 4: Cross-cutting rollout
- Tier 5: Operational hardening (+ CLDESIGN-011 NEW для Open Design backup)
- Tier 6: Quality cleanup
- Tier 7: Migration (blocked INC-006)

## 4. Strategic decision pending

Андрей завтра решает 1 из 3 options по collision:
- **A** — твоя INSTRUKCIYA canonical, SUPERSEDE наш folkup-base v0.4
- **B** — keep наш folkup-base approved + INSTRUKCIYA → reference + Tailwind cleanup (~3-5h)
- **C** — reconcile (cherry-pick из обоих)

Моя рекомендация — A. Андрей уже verbal confirm «принимаем твой», но не зная что параллельно Session B approved B-вариант через zerkalce 06.06 15:22.

## 5. INC-006 abandon

Hetzner CX33 LOCKED — Андрей принял решение **decom + revival playbook**, не recovery. См. commit 6afaa72. Сайты restored через CF Pages (11/11 active failover). Не блокирует design work.

## 6. Понимание твоего 02-МОСТ insight применено

«Мост через API/MCP строить не нужно — git + DESIGN.md + CLAUDE.md в репо = достаточный contract». Это упрощает наш план INF-01:
- НЕ нужен публичный TLS+OAuth endpoint
- Мост = git pull/push + ревью + история
- Канал B (handoff snapshot) — только для разовой передачи макетов в код
- Канал C (DESIGN.md в git) — постоянный мост-контракт

INF-01 пересoзначен accordingly в наших internal task list.

## 7. Steampunk umbrella decision (С26) принят

`vault/memory/reference-ivi-canonical-package-2026-06-06.md` documents:
- Книжная серия = isolated строгий викторианский канон
- Весь остальной бренд = тёплый ламповый СТИМПАНК
- Sub-styles ось: стимпанк ↔ киберпанк ↔ викторианская Англия ↔ русский извод
- Цветовые ветки по направлениям

## 8. Open Design (nexu-io) как backup plan

КиберГонзо verified: 60.2k stars (выше твоей оценки 57k), Apache-2.0, 150 готовых DESIGN.md, 21+ AI CLI support. Plan = install desktop app на машине Андрея BEFORE первой SaaS session — parallel export для vendor lock-in protection.

## 9. Анти-pattern усиление в DESIGN.md

КиберГонзо research нашёл что Opus 4.7 «don'ts pull more weight than the do's». Нужно добавить explicit ban:
- No Inter, no Geist, no system fonts
- No blue/indigo primary
- No large rounded corners
- No gradient hero sections
- No 50px+ padding framed as «clean»

Это дополнение к твоему антислоп-блоку — твой блок концептуальный, этот — конкретно визуальный.

## 10. Critical timing — 2026-06-15 (через 8 дней)

Anthropic Agent SDK separate pool cutoff:
- Pro $20/mo, Max 5x $100/mo, **Max 20x $200/mo** (Андрей's tier)
- Effective June 15 — kills «unlimited» programmatic subsidy

**Нужно verify ДО первой SaaS session** — какой pool draws design SaaS sessions. Если interactive — main pool. Если Agent SDK — separate $200 credit.

Recommendation: либо первая session **до 15-го** (известный pool), либо **после 16-17** (новый pool stable).

---

## TL;DR — что ты увидишь когда придёт следующий пакет от нас

✅ Brand canon update integration в основной mission canonical  
✅ Canonical decision finalized (Option A/B/C)  
✅ First design SaaS session executed (если до 15-го)  
✅ Lessons captured + первый artifact (обложка «Согласных»)  
✅ Knowledge base scaffolding `vault/memory/claude-design-kb/`  
✅ books@folkup.app настроен (если Кочегар успел)  
🟡 Открытые твои вопросы про книжные маски, ART scope — закрыты к моменту следующего пакета  

---

*Iv, спасибо за обстоятельный пакет 06.06. У нас наконец есть прочная база.*
