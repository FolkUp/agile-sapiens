# AGILE SAPIENS Visual Enhancement Pipeline — PLAN v1.0

**Date:** 2026-03-27 (post-compaction, картбланш authorized)
**Status:** PLANNING
**Authorization:** Андрей картбланш, "мировой уровень, чтобы комар носа не подточил"

---

## MISSION OBJECTIVE

Трансформировать банковского уровня контент (Chapters 0-1-2) в визуально выдающуюся монографию мирового класса через:
- **Johnny + Frontend Team** — CSS/HTML/WCAG enhancement
- **Replicate Integration** — AI-generated визуальные ассеты
- **Art Direction** — визуальная концепция, brand integration
- **Creative Team** — художники + креейторы + фронтендеры

**Baseline:** Hugo + Hextra theme + custom layouts (готов, Hugo build PASS)

---

## PLAN ARCHITECTURE

### PHASE 1: Visual Audit & Foundation (Johnny Lead) [90min]
**Johnny** — полный CSS/HTML/WCAG аудит current state
- **Current state analysis:** Hextra theme + layouts/_default + _partials + chapters
- **Brand Guide v2.5 gap analysis:** палитра D, шрифты Inter, spacing, dark mode
- **WCAG 2.1 AA audit:** contrast, focus states, touch targets, accessibility
- **Mobile-first review:** responsive breakpoints, mobile UX
- **Technical debt identification:** CSS optimization opportunities
- **Enhancement roadmap:** приоритизированный список улучшений

### PHASE 2: Art Direction & Visual Concept [120min]
**Art Director + Visual Assets Expert** — концепция мирового уровня
- **Visual identity analysis:** current vs desired (избежать AI-генерик)
- **Chapter-specific mood:** Chapter 0 (intro), Chapter 1 (Verne success), Chapter 2 (Frankenstein horror)
- **Hero images concept:** 1200x630px OG images для каждой главы
- **Illustration strategy:** in-text визуальные элементы, диаграммы, callouts
- **Typography enhancement:** heading hierarchy, читаемость, визуальная иерархия
- **Color psychology:** палитра D extension для emotion mapping

### PHASE 3: Replicate Assets Generation [60min]
**Replicate Integration Expert** — AI-generated визуальные ассеты
- **Hero images generation:** FLUX Dev для 3 chapter hero images (1200x630px)
- **Prompt engineering:** gothic+industrial стиль, избежать AI-fingerprints
- **Brand consistency:** FolkUp палитра D integration в prompts
- **Quality control:** A/B варианты, quality filtering
- **Format optimization:** WebP + fallbacks, responsive variants
- **Integration:** Hugo static/images/ + frontmatter integration

### PHASE 4: Frontend Implementation [180min]
**Frontend Team + Johnny** — техническая реализация
- **CSS framework enhancement:** brand-consistent компоненты
- **Layout customization:** chapter-specific layouts, visual hierarchy
- **Asset integration:** hero images + responsive variants
- **Typography system:** Inter font optimization, reading experience
- **Dark mode enhancement:** consistent experience across themes
- **Animation system:** subtle transitions, loading states, scroll indicators
- **Performance optimization:** lazy loading, critical CSS, mobile optimization

### PHASE 5: Quality Gate & Deployment [45min]
**Cross-team verification** — финальная верификация
- **Hugo build validation:** 0 errors, 0 warnings, all assets loading
- **WCAG 2.1 AA final test:** accessibility compliance check
- **Brand consistency review:** visual coherence с Brand Guide v2.5
- **Multi-device testing:** desktop, tablet, mobile experience
- **Performance audit:** loading times, mobile scores
- **Git operations:** commit + push visual enhancement

---

## EXPERT ASSIGNMENTS

| Phase | Lead Expert | Supporting Experts | Deliverable |
|-------|------------|-------------------|-------------|
| **P1** | Johnny | - | Visual audit report + enhancement roadmap |
| **P2** | Art Director | Visual Assets Expert | Visual concept + art direction guide |
| **P3** | Replicate Expert | Art Director | 3 hero images + visual assets |
| **P4** | Johnny | Frontend Team | Enhanced layouts + CSS + integration |
| **P5** | Johnny | All experts | Quality verification + deployment |

---

## SUCCESS METRICS

| Metric | Target | Validation Method |
|--------|--------|------------------|
| **Visual Impact** | "мировой уровень" качество | Art Director approval |
| **WCAG 2.1 AA** | 100% compliance | Johnny validation |
| **Brand Integration** | Full Brand Guide v2.5 | Фонарщик verification |
| **Performance** | Mobile-first, fast loading | Technical metrics |
| **Hugo Build** | 0 errors, 0 warnings | Build validation |

---

## RISK MITIGATION

- **Context management:** batches по 2 эксперта максимум
- **Quality preservation:** Alpha+Beta hostile verification перед execution
- **Asset licensing:** Replicate-generated ассеты = commercial safe
- **Fallback strategy:** если Replicate недоступен → placeholder system
- **Hugo compatibility:** все изменения совместимы с Hextra theme

---

**PLAN v1.0 STATUS:** Ready for Alpha+Beta hostile verification