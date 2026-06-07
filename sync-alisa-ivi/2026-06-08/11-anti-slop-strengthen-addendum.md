<!-- precommit:allow-ai-mentions -->
---
title: Design Anti-Slop Strengthen Addendum — explicit bans list (option-agnostic)
version: 1.0
date: 2026-06-07
classification: P2 OPERATIONAL — addendum mergeable в любой canonical post-walk
authority: Алиса (COOPER session A, P-batch P3 per Андрей carte blanche)
status: ACTIVE — awaiting Option A/B/C decision затем merge в winning canonical
trigger: КиберГонзо V-batch research recommendation #3 (P1) — «explicit anti-pattern list делает разницу»
method: Synthesized из 4 sources (MindStudio anti-slop blog + Divya Patel medium + Огилви internal scan + Иви INSTRUKCIYA antislop block)
---

# Design Anti-Slop Strengthen Addendum

Cross-canonical addendum — **готов к merge в любой winning version (Ивин INSTRUKCIYA OR Session B folkup-base OR reconciled).** Не trogает ни один из 3 canonical документов (Lesson #34 + Lesson #51 + collision pending).

---

## 0. Why this addendum

КиберГонзо V-batch research 2026-06-07 (16 verified sources) сформулировал критическую цитату:

> «The don'ts pulled more weight than the do's across multiple AI tools.»
> — MindStudio blog «How to Avoid AI Slop When Using Claude Design» 2026

**Current state в 3 canonicals:**

| Canonical | Anti-slop section | Сила |
|-----------|-------------------|------|
| Ивин INSTRUKCIYA §4 DESIGN.md draft lines 175-180 | «затёртые шрифты Inter/Roboto/Arial/системные + фиолетовые градиенты + предсказуемые макеты» | **базовая 3-bullet** |
| Session B folkup-base v0.4 §X (Огилви panel-reviewed) | (panel-reviewed но без extended list) | **panel-validated baseline** |
| Reconciled (если Option C) | merged | пока nonexistent |

**Gap:** ни одна не содержит explicit fonts/colors/spacing bans которые КиберГонзо verified — generic AI-default visual слов выйдет если не запретить явно.

---

## 1. ⭐ Recommended extended antislop block

Для merge в whichever canonical (Section 4 DESIGN.md draft в INSTRUKCIYA, OR §Антислоп в folkup-base v0.4):

```markdown
## Антислоп (соблюдать всегда — explicit bans)

НИКОГДА не использовать generic-AI-эстетику. Список явных запретов:

### Шрифты
- ❌ **Inter** (default Claude generated — homogenization risk)
- ❌ **Geist** (next Claude default после Inter)
- ❌ **Roboto** (Google default)
- ❌ **Arial** / **Helvetica** (system fallbacks)
- ❌ Все ОС системные sans без явной brand-motivation
- ✅ ИСПОЛЬЗОВАТЬ ТОЛЬКО: Playfair Display (заголовки/обложки/КАПИТЕЛЬ), Source Sans 3 (веб),
  Pacifico (только лого), [при печати — выбранная антиква в Claude Design SaaS, D6 долг]

### Цвета
- ❌ Blue/indigo primary accents (Claude default)
- ❌ Purple/violet (generic-AI palette)
- ❌ Фиолетовые градиенты на белом/тёмном
- ❌ Rainbow gradients / iridescent hero
- ❌ Pure white #FFFFFF backgrounds (homogenized SaaS look)
- ✅ ИСПОЛЬЗОВАТЬ ТОЛЬКО: Palette D (bordeaux #7D4450 main, sage #839E75, amber #E8AD4A,
  ivory #FEFCF6 background, charcoal #2A2825 text). Печатные обложки — ОДИН цвет bordeaux на ivory.

### Spacing / layout
- ❌ Large rounded corners (border-radius >12px без semantic reason)
- ❌ 50px+ padding framed как «clean» (excessive whitespace = AI tell)
- ❌ Excessive shadow stacks (3+ layered drop-shadows)
- ❌ Gradient hero sections с CTA button по центру
- ✅ ИСПОЛЬЗОВАТЬ: tight typographic grid, semantic spacing tokens (--space-{xs,sm,md,lg}),
  rectilinear borders без excessive radius, single subtle shadow если depth needed.

### Navigation patterns
- ❌ Sidebar nav resembling Shadcn boilerplate
- ❌ Card-grid hero с identical 3-column tiles
- ❌ «Hero → Features → Pricing → Footer» SaaS-template skeleton
- ✅ Каждая страница — purpose-driven layout, не template-copy.

### Component patterns
- ❌ Glass-morphism (blurred translucent overlays — datedAI-trend)
- ❌ Neumorphism (extruded soft 3D buttons)
- ❌ Lottie animation на каждой interaction
- ❌ Skeleton loaders как primary loading UX
- ✅ Solid components с clear hierarchy. Loading = explicit text «Загрузка…».

### Печать (книжная серия)
- ❌ Цифровые градиенты в обложке
- ❌ Photo backgrounds для cover (только графика / typography)
- ❌ Glossy finish hint в visual mock-up
- ✅ Single-color print canon (bordeaux на ivory), типографский картуш, antiqua KAПИТЕЛЬ с точкой
```

---

## 2. Authoring don'ts (process-level, для авторов DESIGN.md)

Per КиберГонзо research [Source 14 — Divya Patel «Stop reinventing your design system»]:

1. ❌ **Vague color language** («warm red», «modern blue») → use **exact hex** with semantic role: `--color-primary: #7D4450 /* bordeaux, brand mark */`
2. ❌ **Generic font descriptions** («clean sans-serif», «elegant serif») → name **exact fonts + sources**: «Primary: Playfair Display (Google Fonts variable axis OPS), KAПИТЕЛЬ enabled»
3. ❌ **Silence on constraints** → silence = Claude defaults = AI-slop drift. Если что-то ban — write it.
4. ❌ **Missing negative examples** → forgot к ban gradients = get gradients. Always include don'ts.
5. ❌ **Regenerating перед fixing the document** → if output drifts, fix DESIGN.md spec first, не «promt-engineer» around it.
6. ❌ **Fork-and-drift** → single source of truth с changelog, не parallel versions для разных consumers.

---

## 3. What works (positive patterns)

Per same research [Sources 12, 14] — что **delivers cohesion**:

1. ✅ Exact hex с semantic role в comment
2. ✅ Named fonts с sources («Playfair Display (Google Fonts)»)
3. ✅ Pixel-level spacing + radius constraints («--space-md: 16px»)
4. ✅ **Explicit anti-examples** в каждом subsection («No blues anywhere»)
5. ✅ Test components перед composing layouts (DESIGN.md → single component generation → review → потом page)
6. ✅ One document с changelog (avoid fork-and-drift, see Lesson #51 collision)

---

## 4. Merge instructions (post-walk Option-aware)

### If Option A (Ивин INSTRUKCIYA canonical)

Merge §1 расширенный antislop block в `vault/contexts/INSTRUKCIYA-claude-design-onboarding.md` Section 4 DESIGN.md draft, заменив current lines 175-180. Размер increase: 75 lines → ~120 lines (Ивин base + extended bans). Acceptable per «don'ts pull more weight» principle.

### If Option B (Session B folkup-base v0.4 canonical)

Merge §1 расширенный antislop block в `vault/design/folkup-base.DESIGN.md` §Антислоп section (combined с existing Огилви panel verdict). Size increase modest (628 lines → ~660 lines). Tailwind removal first per CLDESIGN-tailwind-removal-001 (P0 blocker), затем this merge.

### If Option C (reconcile)

Use this addendum AS-IS as starting point §Антислоп в reconciled canonical. Cherry-pick §1 + §2 + §3 verbatim, add lineage credit к Ивин INSTRUKCIYA + Огилви + КиберГонзо + MindStudio + Divya Patel.

### If pre-merge testing wanted

Run первая Claude Design SaaS session с current shorter antislop, observe output. Если output shows blue accents OR Inter font OR generic SaaS skeleton — merge §1 immediately. Если output cohesive с FolkUp canon — defer merge as optional.

---

## 5. Cross-references

- КиберГонзо source: `vault/memory/cybergonzo-claude-design-research-2026-06-07.md` Topic 4 «DESIGN.md best practices 2026» lines 89-130
- Original Ивин antislop: `vault/contexts/INSTRUKCIYA-claude-design-onboarding.md` lines 175-180
- Session B folkup-base anti-slop: `vault/design/folkup-base.DESIGN.md` §Антислоп (panel-reviewed)
- Collision decision tree: `vault/memory/design-system-canonical-collision-2026-06-07.md`
- Team manifest: `vault/memory/team-cldesign-2026-06-07.md` (Огилви + Фрида + Фонарщик/Visual owners)

---

**Compiled:** 2026-06-07 by Алиса (COOPER session A, P-batch P3 per Андрей carte blanche).
**Method:** Cross-canonical addendum — option-agnostic, mergeable post-walk into winning version. NOT touching any of 3 canonicals (Lesson #34 + #51 + pending collision).
**Anti-busy-work §1 PASS 4/4:** strengthens any future DESIGN.md / KB seed / addresses verified research gap / 30-day applicable / reviewer value «explicit don'ts beat vague do's, per verified MindStudio quote».
