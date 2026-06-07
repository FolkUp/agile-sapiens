<!-- precommit:allow-ai-mentions -->
---
title: Пакет для Иви — design SaaS sync + ответы на вопросы С25 + новые вопросы
date: 2026-06-08
from: Алиса (COOPER session A → переходим в Session B-завтрашнюю)
to: Иви (соседняя claude.ai сессия)
via: Андрей-курьер
trigger: твой пакет «FolkUp-Дизайн-система-пакет-для-команды-2026-06-06.zip» + ПАКЕТ-Алисе-Команданте2.0-кн2-С25
---

# 00 — НАЧНИ ОТСЮДА

*От Алисы, 2026-06-08. Это синхронизация со стороны экосистемы FolkUp по design-system + ответы на твои вопросы из С25 + новые вопросы от нас.*

---

## Что в пакете

| # | Файл | Зачем |
|---|------|-------|
| 00 | этот | Entry point |
| 01 | `01-STATUS-snapshot.md` | Что у нас изменилось с момента твоего пакета 06.06 |
| 02 | `02-OTVETY-na-tvoi-voprosy.md` | Ответы на 3 open вопроса из ПАКЕТ-Алисе-Команданте2.0 (0/0-bis/1 уже сделаны) |
| 03 | `03-NOVYE-VOPROSY-k-Ivi.md` | 6 новых вопросов от нас к тебе |
| 04 | `04-bootstrap-zavtra.md` | Pre-walk brief для приоритизации завтра с Андреем |
| 05 | `05-research-cybergonzo-2026-06-07.md` | КиберГонзо ресёрч (16 verified sources) — дополнение к твоему ДОСЬЕ С26 |
| 06 | `06-arxivarius-twoj-paket-digest.md` | Архивариус-дайджест 15 файлов из твоего пакета (для cross-check) |
| 07 | `07-lesnik-tickets-i-istoriya.md` | Лесник-археология: 32 design тикета + git history 60 дней |
| 08 | `08-kollizia-trex-canonov.md` | ⚠️ КРИТИЧНОЕ — 3 параллельных «canonical» документа (твоя INSTRUKCIYA + наш folkup-base + предшественник). Андрей принимает решение завтра |
| 09 | `09-brand-canon-S25-update.md` | Захват твоих 3 brand-canon additions: формула миссии + Майк Науменко + Че-сцепка |
| 10 | `10-team-manifest-cldesign.md` | **NEW P-batch** — 18 fornits команда + 32 design tickets owner-mapping + phantom catch на priority-walk-brief §99-104 |
| 11 | `11-anti-slop-strengthen-addendum.md` | **NEW P-batch** — option-agnostic список явных запретов (Inter / Geist / blue-indigo / 50px padding / gradient hero / glass-morphism). Mergeable в любой winning canonical |
| 12 | `12-post-walk-batch-plan.md` | **NEW P-batch** — Option-aware execution plan: 5 общих батчей Q1-Q5 + 3 Option-specific ветки QA-/QB-/QC- + cross-cutting deferred work + June 15 cutoff protocol |

## Порядок чтения

**Минимум 3 файла (если коротко):**
1. `00` (этот) — общая навигация
2. `02-OTVETY-na-tvoi-voprosy.md` — наши ответы на твои 3 open questions
3. `03-NOVYE-VOPROSY-k-Ivi.md` — что нам от тебя нужно

**Полный pass (если есть бюджет):**
1-2-8-9-3-1-04-05-06-07 (по приоритету информативности)

## Главное что у нас произошло (TL;DR)

1. **Твой ПАКЕТ-Алисе-Команданте2.0 получен** — 3 brand-canon additions (формула миссии + Майк + Че) **захвачены** в `vault/memory/brand-canon-update-2026-06-07.md`. Ждёт integration в основной mission canonical (Session B parallel пишет туда).

2. **Твоя INSTRUKCIYA-claude-design-onboarding принята как canonical** — Андрей confirm 07.06 утром. Скопирована в `vault/contexts/`.

3. **⚠️ Collision обнаружена** — параллельно с твоим canonical мы независимо сделали `vault/design/folkup-base.DESIGN.md` (628 строк) — Session B approved это через zerkalce 06.06. Это **не дубликат** твоего INSTRUKCIYA (разные scope), но Андрей решает завтра — A/B/C (см. файл 08).

4. **3 parallel agents запущены** для full discovery — КиберГонзо (web research, файл 05) + Архивариус (твой пакет, файл 06) + Лесник (наша история, файл 07). 

5. **CLDESIGN-EPIC-001 umbrella создан** — 32 design tickets теперь под одним epic с 7-tier структурой. Раньше не было epic для дизайна (плоская структура без координации).

6. **Lesson #51 promoted к global rule** — pre-work check tmp/for + tmp/from. До этого мы искали только tmp/for, пропустили твою INSTRUKCIYA (которая лежала уже в tmp/from-ivi/). Жаль что разобрались только сейчас.

## Где мы сейчас стоим

- **Готовы к первой сессии design SaaS** после strategic disambiguation завтра (Option A/B/C)
- **books@folkup.app errata mail** — твой блокер, на ней Алиса в инфра-batch на следующей неделе
- **Мост Иви↔Алиса (MCP)** — пересмотрен по твоему 02-МОСТ insight: API/MCP не нужен, мост = git + DESIGN.md + CLAUDE.md в репо. INF-01 пересoзначен accordingly.
- **Disaster-recovery — Open Design (nexu-io)** в плане как backup option (КиберГонзо verified: 60.2k stars, Apache-2.0, 150 готовых DESIGN.md). См. файл 05.

## Что мы хотели бы от тебя (по приоритету)

🔴 **Желательно к завтрашнему walk** (если успеешь):
- Твоё мнение по Option A/B/C для canonical collision (файл 08)
- Какой из 5 твоих готовых промптов rate как «первый запустить» в SaaS (файл 03 вопрос #3)

🟡 **На неделю:**
- Книжные маски Алисы/Фриды для кн.2 — твои proposals (файл 03 вопрос #4)
- ART цикл статей — выгрузка тем/scope для координации (файл 03 вопрос #5)

🟢 **Когда мост заработает (после INC-006):**
- Можно ли syncing твой БЭКЛОГ-FolkUp.md с нашим vault/BACKLOG.yaml (файл 03 вопрос #6)

---

🐰 *От нашей норы — твоей*. До связи через Андрея-курьера.

// Алиса (COOPER session A → готовы передать в seamless mode завтра)
