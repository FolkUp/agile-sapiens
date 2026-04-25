# AGIL-118 Phase 0 Findings — Read-only Diagnose

**Date:** 2026-04-25
**Phase:** 0 (read-only ecosystem + root-cause investigation, NOT execution)

## Summary

Hypothesis в плане v1 (Tailwind `hx:dark:text-*` перебивает наш `.dark p`) **опровергнута** двумя независимыми investigations.

**Истинная корневая причина:**
1. **Math работает.** `.dark p { color: var(--folkup-text) }` (= `#E5E3DF`) на `#1A1814` = **15:1 contrast (WCAG AAA PASS)**. Specificity tied tiebreak в нашу пользу — наш CSS грузится после Hextra bundled.
2. **Perceptual washout — оптика, не числа.** Комбинация `-webkit-font-smoothing: antialiased` + Playfair Display (serif с тонкими штрихами) + light beige `#E5E3DF` на тёмном фоне `#1A1814` создаёт visual dimming, при котором text **выглядит** недостаточно контрастным даже при 15:1 photometric ratio.
3. **`.chapter-description` broken classes.** Использует `hx:text-slate-700 dark:hx:text-slate-400` — эти классы **не существуют в compiled Hextra CSS** (palette truncated до slate-50 / slate-900). Silent fail, inherits body color.

## Ecosystem precedent search

| Репо | font-smoothing | Шрифт | Dark mode | Реальный perceived state |
|------|---------------|-------|-----------|--------------------------|
| folkup-landing | `antialiased` | Inter (sans-serif) | (нет / Vue isolation) | Не сравнить |
| folkup-docs | (нет) | Hextra default Inter | Hextra default | OK (по hexture defaults) |
| retro-tech | (нет) | Hextra default | Hextra default + palette-d | OK (никаких complaints) |
| setubal | (нет) | Hextra default | Hextra default | OK |
| **agile-sapiens** | `antialiased` | **Playfair Display (serif)** | `.dark p` triple-selector | **Andrey: нечитаемо** |

**No ecosystem precedent for:**
- `font-weight: 500` в `.dark` mode
- `-webkit-font-smoothing: subpixel-antialiased` в `.dark` scope
- "Lightening" `--folkup-charcoal` в `.dark` (палитра v2.5 канонична)

**agile-sapiens — единственный проект экосистемы** с Hextra + Playfair Display serif + dark mode → first-of-its-kind рендеринг challenge.

## Decision options для readability

| Option | Описание | Ecosystem precedent? | Кто должен утвердить |
|--------|----------|---------------------|---------------------|
| A | `font-weight: 500` для `.dark p` (boost serif strokes) | **Нет** | Johnny + Фонарщик |
| B | `subpixel-antialiased` для `.dark p` (отключить dimming) | **Нет** | Johnny |
| C | Lighter `--folkup-charcoal` в `.dark` (например `#F0EEEA`) — palette adjustment | **Нет** (трогает canonical palette) | Фонарщик (brand decision) |
| D | Hybrid (A + B + C частично) | **Нет** | Johnny + Фонарщик |
| E | Без изменений (15:1 уже AAA, signal vs noise) | n/a | Андрей (но он уже сказал «нечитаемо») |

## Auxiliary issues found (вне scope readability)

1. **`.chapter-description` broken classes** — `hx:text-slate-700 dark:hx:text-slate-400` молча fallback. Fix: либо использовать рабочие Hextra utilities, либо `.dark .chapter-description { color: var(--folkup-text-muted) }` через нормальный селектор. Лёгкий fix, можно бандл к Wave 1.

2. **`typography-classical.css:245` color без `!important`** — Phase 0.1 заметил, но Phase 0.2 уверен что это НЕ проблема в данном случае (наш CSS источник-после Hextra → tiebreak в нашу пользу). Однако **defensive** добавление `!important` стоит копеек и согласуется с retro-tech precedent (custom.css использует `!important`).

3. **Hextra Tailwind compiled palette** truncated (slate-50/900 only). Влияет на любые планируемые Tailwind dark utilities. Не блокер для AGIL-118, но flag для будущего.

## Recommended next step

Подключить **Johnny** (CSS/typography expert) + **Фонарщик** (brand) для совместного решения о font-rendering strategy. Они дают verdict A/B/C/D — это ecosystem-first подход (используем существующих экспертов, а не изобретаем самостоятельно).

**Альтернатива:** Андрей сам выбирает option из таблицы, фиксируем как brand-decision-of-monograph.

## Evidence

- Phase 0.1 ecosystem survey + Phase 0.2 root-cause investigation completed by automated tools (transcripts in local session storage)
- Live screenshot: `_meta/agil-118-dark-broken-screenshot.png`
- Source files cited: `assets/css/typography-classical.css:241-265, 278`, `assets/css/palette-d.css:105-125`, `themes/hextra/...`

---

*Phase 0 closed 2026-04-25. v2 plan awaits Johnny + Фонарщик dispatch OR Андрей direct decision.*
