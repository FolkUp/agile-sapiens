# AGIL-126: Multi-HR Scanner — Findings Report

**Date:** 2026-04-26  
**Scanner:** `scripts/check-multi-hr.mjs`  
**Scope:** `content/chapters/*.md` (15 files: 11 chapters + 3 intermezzos + `_index.md`)  
**Frontmatter false-positives:** 0 (scanner skips frontmatter block)

---

## Summary

| Category | Instances | Files affected |
|----------|-----------|----------------|
| **Type A** — consecutive-hr (only blanks between two `---`) | 0 | 0 |
| **Type B** — `---` adjacent to chapter-break / section-break shortcode | 0 | 0 |
| **Type C** — `---` wrapping sources/footnotes block (HR before + HR after) | 6 | 6 |
| **Total** | **6** | **6** |

> Note: No `chapter-break` or `section-break` shortcodes exist in any chapter body — Type B is structurally N/A for this project.

---

## Type A — Consecutive HR (0 instances)

No instances found. All `---` lines in chapter bodies are separated by substantive content.

---

## Type B — HR Adjacent to Shortcode (0 instances)

No `{{< chapter-break >}}` or `{{< section-break >}}` shortcodes found in chapter body content. Type B is N/A for this project.

---

## Type C — HR Wrapping Sources Block (6 instances, 6 files)

Pattern: `---` immediately before a Footnotes/Sources header, AND another `---` after the final footnote. This creates a double-HR visual: the closing `---` of the footnotes block renders as a redundant `<hr>` that immediately precedes the next chapter's content or EOF.

### C-1: `content/chapters/chapter-0-pilot.md`

**Lines:** L279 (opening) + L317 (closing)  
**Sources header:** `**Footnotes:**` at L281

```
L277: В следующей главе: как Мэри Шелли интуитивно описала динамику брошенных
      проектов — за 175 лет до первого «трансформационного проекта»...
L278: 
L279: ---              ← opening HR (before footnotes)
L280: 
L281: **Footnotes:**
L282: 
L283: ¹ Жюль Верн. «Вокруг света за восемьдесят дней» (1872/1873). Hetzel, Париж...
...  [footnotes ¹–¹⁷]
L315: ¹⁷ SpaceX Falcon 1 launch history: Flight 1 (March 24, 2006)...
L316: 
L317: ---              ← closing HR (after last footnote)
L318: 
```

---

### C-2: `content/chapters/chapter-3-holmes.md`

**Lines:** L259 (opening) + L293 (closing)  
**Sources header:** `**Footnotes:**` at L261

```
L257: Следующий акт задаёт другой вопрос. Не «как мы сюда попали?»,
      а «как отсюда выбраться?»...
L258: 
L259: ---              ← opening HR (before footnotes)
L260: 
L261: **Footnotes:**
L262: 
L263: ¹ Arthur Conan Doyle. «A Scandal in Bohemia» (1891)...
...  [footnotes ¹–¹⁵]
L291: ¹⁵ Блок, Александр. «Двенадцать» (1918)...
L292: 
L293: ---              ← closing HR (after last footnote)
L294: 
```

---

### C-3: `content/chapters/chapter-4-borges.md`

**Lines:** L219 (opening) + L255 (closing)  
**Sources header:** `**Footnotes:**` at L221

```
L217: Выход есть. Есть команды, которые измеряют, но не подчиняются
      измерениям; пользуются процессами, но не поклоняются им...
L218: 
L219: ---              ← opening HR (before footnotes)
L220: 
L221: **Footnotes:**
L222: 
L223: ¹ Borges, Jorge Luis. «La lotería en Babilonia» (1941)...
...  [footnotes ¹–¹⁶]
L253: ¹⁶ Accelerate: State of DevOps Report. Google Cloud / DORA, 2023...
L254: 
L255: ---              ← closing HR (after last footnote)
L256: 
```

---

### C-4: `content/chapters/chapter-5-nemo.md`

**Lines:** L331 (opening) + L375 (closing)  
**Sources header:** `**Footnotes:**` at L333

```
L329: Глава 6: как корпоративный дуализм — разрыв между декларируемой
      и реальной культурой — убивает организации изнутри...
L330: 
L331: ---              ← opening HR (before footnotes)
L332: 
L333: **Footnotes:**
L334: 
L335: ¹ Conway, Melvin. «How Do Committees Invent?»...
...  [footnotes ¹–²⁰]
L373: ²⁰ US Securities and Exchange Commission. Litigation Release No. 24065...
L374: 
L375: ---              ← closing HR (after last footnote)
L376: 
```

---

### C-5: `content/chapters/chapter-8-time-machine.md`

**Lines:** L256 (opening) + L268 (closing)  
**Sources header:** `## Источники и примечания` at L258

```
L254: **Reality check:** Конечно, можем влиять. Если ты CEO крупной
      корпорации или head of AI policy...
L255: 
L256: ---              ← opening HR (before sources)
L257: 
L258: ## Источники и примечания
L259: 
L260: ¹ McKinsey Global Institute, "Generative AI and the Future of Work..."
...  [footnotes ¹–⁴]
L266: ⁴ William Gibson. Устный афоризм: «The future is already here...»
L267: 
L268: ---              ← closing HR (after last footnote)
L269: 
```

---

### C-6: `content/chapters/chapter-9-three-scenarios.md`

**Lines:** L429 (opening) + L445 (closing)  
**Sources header:** `## Источники и примечания` at L431

```
L427: **Chapter 10 Preview:** If Vinge shows how to choose, Gibson shows
      how to live with consequences...
L428: 
L429: ---              ← opening HR (before sources)
L430: 
L431: ## Источники и примечания
L432: 
L433: ¹ Vernor Vinge, "The Coming Technological Singularity..." (1993)...
...  [footnotes ¹–⁶]
L443: ⁶ Fashion Revolution, "Fashion Transparency Index" (2023)...
L444: 
L445: ---              ← closing HR (after last footnote)
L446: 
```

---

## Chapters with clean single-HR pattern (no findings)

The following chapters use exactly one `---` before the sources/footnotes block and no closing `---` — this is the standard pattern. **No action needed:**

| File | Single HR position |
|------|--------------------|
| `chapter-1-jules-verne.md` | L313 (before **Footnotes:**) |
| `chapter-2-frankenstein.md` | L259 (before **Footnotes:**) |
| `chapter-6-jekyll-hyde.md` | L319 (before **Footnotes:**) |
| `chapter-7-don-quixote.md` | L298 (before **Footnotes:**) |
| `chapter-10-choice-engine.md` | L378 (before ## Источники и примечания) |
| `intermezzo-1.md` | L124 |
| `intermezzo-2.md` | L146 |
| `intermezzo-3.md` | L194 |

Note: `chapter-10-choice-engine.md` has additional HRs at L266, L298, L328, L350 — these are intentional section separators within the chapter body, not duplicates.

---

## Recommended cleanup action (Наборщик task)

For each Type C finding: **remove the closing `---`** after the last footnote.

Rationale: the opening `---` already provides the visual HR separator between chapter body and sources block. The closing `---` after the last footnote creates a redundant `<hr>` with no semantic value, inconsistent with the pattern used in 8 other chapters.

**Files requiring cleanup:** 6 files (C-1 through C-6)  
**Effort:** single-line deletion per file, trivial diff  
**Risk:** zero — Hugo renders `---` as `<hr>`, removal only affects visual output (eliminates extra `<hr>`)

---

*Generated: 2026-04-26 · AGIL-126 · Scanner: scripts/check-multi-hr.mjs*
