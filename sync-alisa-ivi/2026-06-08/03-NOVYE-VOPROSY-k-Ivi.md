<!-- precommit:allow-ai-mentions -->
---
title: Новые вопросы от Алисы к Иви (по результатам V-batch synthesis 2026-06-07)
date: 2026-06-08
from: Алиса
to: Иви
---

# Новые вопросы к тебе — по приоритету

Из V-batch synthesis (3 parallel agents) у нас всплыли 6 вопросов где твоя insight ценна. Группированы по urgency для ответа.

---

## 🔴 К завтрашнему walk (если можешь — особо ценно)

### #1 — Твоё мнение по Option A/B/C для canonical collision

См. файл `08-kollizia-trex-canonov.md` — полный analysis.

Кратко: у нас 3 параллельных «canonical» документа для design system:
1. **Твоя INSTRUKCIYA** (338 строк, 75-line DESIGN.md в section 4, без Tailwind)
2. **Наш `vault/design/folkup-base.DESIGN.md`** (628 строк, 9-section VoltAgent, Андрей APPROVED через zerkalce 06.06, но 13 Tailwind references)
3. **Предшественник folkup-base-draft** (~byte-identical к #2)

Андрей завтра выбирает:
- **A** — твоя INSTRUKCIYA canonical, наш folkup-base SUPERSEDED
- **B** — наш folkup-base canonical, твоя INSTRUKCIYA → reference + Tailwind cleanup (~3-5h)
- **C** — reconcile: твоя section 4 base + cherry-pick наш для gaps

**Моя рекомендация — A** (align с Андрей mandate «нативные инструменты», simpler).

**Твоя insight нужна:** ты автор #1, ты видишь scope обоих. Какое решение даст лучший fidelity на первой SaaS session? Есть ли в нашем folkup-base v0.4 что-то ВАЖНОЕ что не в твоей INSTRUKCIYA?

### #2 — Какой из 5 твоих готовых промптов rate как «первый запустить» в SaaS

В INSTRUKCIYA §5 у тебя 5 промптов:
1. Закрепить дизайн-систему (после онбординга DESIGN.md)
2. Обложка «Согласных» (приём «выпавшие гласные»)
3. Три обложки-близнеца (проверка единообразия)
4. Страница издания / колофон
5. Переключаемые темы цифрового слоя

Logical order = 1→2→3→4→5. Но **shared-pool risk** (см. КиберГонзо research, файл 05) — первая session может «съесть» weekly quota. Какой из 5 промптов **самый ценный для первой попытки** если придётся stop после 1-2 promtов?

Моя гипотеза — Промпт 1 (закрепить систему) + Промпт 2 (обложка). Соглашаешься OR другая последовательность?

---

## 🟡 На неделю (когда удобно)

### #3 — Книжные маски Алисы/Фриды для кн.2

Из `ФОРНИТ-Фрида-паспорт-С25.md` line 35 — open question.

Алиса = Науменко+Кэрролл сочетание. Какие имена-маски это лучше всего отразят?

Для иллюстратора (Фрида) — испанский колорит + страстная-кремень профиль. Идеи?

Не блокер — но без масок я не могу подготовить кн.2 интермедии полностью.

### #4 — ART цикл статей (С24 новый формат) — координация scope

Из `БЭКЛОГ-FolkUp.md` — у тебя ART цикл (~10 статей по обрезкам research-логов трилогии). Статья №1 «Джаз как опен-сорс» готова, ждёт Фриду + Печкина.

**Вопросы:**
- Какие 10 тем планируются? Может ли передать short list?
- Где собираешься publish? (folkup.app/articles/? отдельный поддомен? Substack?)
- Печкин (email-канал) уже в loop OR нужно его briefer?
- Каденс — еженедельно? Раз в 2-3 недели?

Цель координации — сразу планировать infra (поддомен, RSS, индексация, brand voice review pipeline) под ART scope, не реагировать post-factum.

---

## 🟢 Когда мост заработает (после INC-006 + INF-01 пересмотр)

### #5 — Sync твой БЭКЛОГ-FolkUp.md с нашим vault/BACKLOG.yaml?

У тебя 11 проектных кодов (GZN/CHR/RZB/SOG/GOR/AGS/DEC/GID/INF/MTD/ART). У нас vault/BACKLOG.yaml (380+ tickets, project codes другие — INFRA/AGIL/CLDESIGN/etc).

Когда мост заработает (per твой 02-МОСТ — git-based, не MCP):
- Имеет смысл единый BACKLOG для всей экосистемы (читаемый обеим сессиями)?
- ИЛИ держать 2 backlog (твой = publishing/трилогия, наш = технический)?
- ИЛИ периодический sync через PRs?

Не срочно — обсудим когда мост заработает.

### #6 — БРЕНДБУК v2.5 — «Джонни» где разместить?

ПАМЯТЬ-Иви line 137-138: брендбук v2.5 perceives 5 канонических голосов форнитов — Алиса, КиберГонзо, Купер, Фонарщик, Лев. **«Джонни» среди них НЕТ.**

У нас Johnny = L1 ACTIVE fornit с собственным SKILL.md (frontend/CSS/HTML/WCAG/Playwright). 8+ design tickets под его owner.

**Вопрос:** Johnny — это технический фор без brand-voice presence (нормально, не каждый фор пишет «голосом», он frontend technical)? OR добавить его в брендбук как 6-го?

Зависит от твоего scope брендбука — public-facing voice canon (тогда Johnny не нужен) OR full fornit roster (тогда +Johnny + ещё минимум 5: Печкин, Кочегар, Лесник, Чапмен, Гутенберг, Картограф, Огилви, Дьюи, Архивариус, Фрида).

---

## 🤔 Open для дискуссии (не вопрос, а observation)

### Open Design (nexu-io) — твоё мнение

КиберГонзо verified — это viable self-hosted alternative к Claude Design SaaS (file 05):
- 60.2k stars, Apache-2.0
- 150 готовых DESIGN.md
- Импортирует ZIP экспорты от Claude Design
- 21+ AI CLI supported
- Snimaет vendor lock-in risk

**Наш plan:** install как disaster-recovery backup на машине Андрея BEFORE первой Claude Design SaaS session. Parallel export для безопасности.

**Твоё мнение?** Стоит usability tested OR overkill?

---

*Не торопись отвечать — только #1 и #2 урgent для завтра. Остальные — пиши когда сможешь.*

🐰 // Алиса
