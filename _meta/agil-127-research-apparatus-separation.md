# AGIL-127 Phase 1: Research — Apparatus Separation in Long-Form Web Publishing

**Date:** 2026-04-26  
**Task:** Comparative analysis of editorial apparatus placement across 10 reference sites  
**Scope:** UX patterns for separating narrative content from editorial/technical metadata  
**Access status:** 7 of 10 sites successfully verified (3 blocked: Aeon/Psyche 429, MIT Press Reader 403)

---

## Comparative Table

| # | Сайт | URL пример | Sources где | Methodology где | Transparency где | Reviewers где | Reading flow (1-5) | Pattern name |
|---|------|------------|-------------|-----------------|------------------|---------------|--------------------|--------------|
| 1 | **Stanford Encyclopedia of Philosophy** | plato.stanford.edu/entries/popper/ | Конец статьи (Primary + Secondary Literature разделы) | Отдельный блок "Academic Tools" в верхней навигации | "Author and Citation Info" отдельная ссылка + дата публикации в хедере статьи | Нет per-article reviewer, только author | **2/5** — дата + автор видны, но не мешают | **Footer-collected + Date Header** |
| 2 | **The Public Domain Review** | publicdomainreview.org/essay/magic-by-return-of-post/ | Три зоны: Notes (numbered footnotes) → Public Domain Works → Further Reading — всё после narrative | Нет отдельной methodology страницы | Нет AI disclosure | Author bio + credentials в конце статьи | **2/5** — footnote цифры в тексте минимальны, apparatus внизу | **Footer-collected (clustered)** |
| 3 | **Aeon / Psyche Magazine** | aeon.co/essays/ | Нет формальных footnotes — источники встроены в прозу как implicit references, Further Reading в конце | Нет отдельной methodology страницы | Нет transparency | Author bio под заголовком, краткая | **1/5** — apparatus практически невидим | **Inline-prose (zero formal apparatus)** |
| 4 | **The Atavist Magazine** | theatavist.com | Нет footnotes, нет bibliography — narrative-only | Нет | Нет | Нет | **1/5** — полная narrative чистота | **Inline-only (zero apparatus)** |
| 5 | **Project Gutenberg** | gutenberg.org/ebooks/103 | Apparatus на landing/catalog странице, отдельной от reading content. Reading URL ≠ metadata URL | Landing page: metadata, download links | Нет | Нет | **1/5 во время чтения** (apparatus на отдельной странице) | **Separate apparatus page** |
| 6 | **Standard Ebooks** | standardebooks.org/ebooks/jules-verne/around-the-world-in-eighty-days | Sources, History (changelog), Details, Improve — все на landing page; reading content = /text/ отдельный URL | История изданий + GitHub changelog на landing | CC0 licensing, источники транскрипции | Нет | **1/5 во время чтения** | **Separate apparatus page + landing hub** |
| 7 | **MIT Press Reader** | thereader.mitpress.mit.edu | Footnotes из книги иногда присутствуют в конце excerpts; Sources не отдельно | Book attribution в byline (автор + книга) | Нет | Нет (editorial board на отдельном About) | **2/5** — book info заметен в byline | **Excerpt model (book attribution byline)** |
| 8 | **JSTOR Daily** | daily.jstor.org/the-golden-age-of-the-american-soapbox/ | Resources section в конце (4 JSTOR ссылки с полными citations) + inline hyperlinks | Нет отдельной methodology | Нет AI disclosure | Нет | **3/5** — inline hyperlinks умеренно заметны | **Footer-collected + inline hyperlinks** |
| 9 | **Cambridge Open Engage** | cambridge.org/engage/coe | На полноценных preprints: abstract, full text, References section внизу, версионирование | License info + revision history | Нет AI disclosure | Peer review status badge в metadata | **3/5** — academic metadata заметен | **Academic metadata header + footer references** |
| 10 | **Substack (Astral Codex Ten / Slow Boring)** | astralcodexten.com/p/ | Только inline hyperlinks, ноль formal bibliography | Нет | Нет | Нет | **1/5** — минимум apparatus | **Inline-only (conversational)** |

*Примечание по доступности: Aeon (rows 3) — 429 rate limit, данные по known design; Atavist (row 4) — ECONNREFUSED, данные по known design; MIT Press Reader (row 7) — 403, данные по known design. Остальные 7 сайтов — прямая верификация.*

---

## Ключевые паттерны

### Pattern A — «Inline-only» (Atavist, Substack, Aeon)
Apparatus полностью отсутствует или растворён в прозе как неформальные гиперссылки. Читатель не видит никаких технических индикаторов во время чтения. Нет footnotes, нет bibliography, нет editorial metadata. Максимальная narrative чистота.  
**Trade-off:** нулевая academic credibility, нулевой compliance trace.

### Pattern B — «Footer-collected» (PDR, JSTOR Daily, Stanford SEP)
Весь apparatus собран в кластер после narrative: Notes → Sources/Bibliography → Further Reading → Author Bio. Во время чтения — только числовые суперскрипты (2/5 intrusion). Читатель может игнорировать footnote-числа и дочитать до конца, потом изучить apparatus.  
**Trade-off:** требует скролла вниз, но apparatus доступен без отдельной навигации.

### Pattern C — «Separate apparatus page» (Project Gutenberg, Standard Ebooks)
Apparatus живёт на отдельном URL (landing/catalog page), reading content на своём URL (/text/). Читатель переключается намеренно. Colophon = отдельная страница книги.  
**Trade-off:** требует navigation awareness, но reading experience полностью чистый.

### Pattern D — «Sidebar live» (Academic journals, Wikipedia)
Apparatus параллельно с content в sticky sidebar или floating TOC. Высокая intrusion (4/5), но постоянная accessibility. Характерен для reference works (Wikipedia, SEP частично).  
**Trade-off:** academic completeness vs narrative immersion — плохой баланс для literary monograph.

### Pattern E — «Hybrid» (Stanford SEP, JSTOR Daily)
Комбинация: дата + автор в хедере (видимо, non-intrusive), footnotes в тексте (числа), footer-cluster для bibliography, separate Academic Tools page. Позволяет разным аудиториям (casual reader vs scholar) работать на своём уровне без конфликта.

---

## Ключевое наблюдение: Colophon как книжная традиция

**Standard Ebooks** реализует самый чистый colophon-паттерн в цифровой среде:
- Landing page = полный аппарат (Sources, History, Details, Licensing, Credits)
- `/text/` URL = чистое чтение без apparatus
- Colophon внутри книги (в EPUB/HTML) = единственное место для editorial credits

Это прямая цифровая аналогия print colophon — последняя страница книги с издательскими данными, которую читатель видит только если специально перелистнул в конец.

---

## Recommendation для AGILE SAPIENS

### Рекомендуемый паттерн: **Pattern E (Hybrid) + Pattern C элементы**

AGILE SAPIENS — bilingual academic monograph с literary narrative. Это гибрид двух аудиторий: (1) читатели, которым нужен чистый нарратив, (2) исследователи/рецензенты, которым нужен полный editorial apparatus для EU AI Act compliance и academic credibility.

**Конкретная реализация:**

**Что остаётся в главах (минимальный apparatus):**
- Inline citation footnotes с цифрами — только для литературных цитат (Конан Дойл, Верн, Шелли). Числа в тексте не мешают reading flow, expanded notes — в конце главы. Это требование citation-compliance.md, нарушить нельзя.
- Никаких status badges рядом с заголовком главы.
- Никаких confidence callouts перед контентом.
- Никаких AI Transparency banner'ов внутри chapter.

**Что выносится в `/apparatus/` (отдельный раздел):**
- `/apparatus/colophon/` — editorial workflow, reviewed_by, review dates, версионирование издания
- `/apparatus/methodology/` — о методологии монографии, подходе к верификации фактов
- `/apparatus/transparency/` — EU AI Act Art. 50 statement (обязательно для compliance, но не должно быть в каждой главе)
- `/apparatus/sources/` — агрегированный bibliography всей монографии (по главам)
- Status и confidence — только в `/apparatus/` metadata, не в reading view

**Что остаётся в site-level footer (но не в chapter prose):**
- Минимальная ссылка на AI Transparency Statement (один текстовый link в footer всего сайта — не banner в главе)
- Copyright notice

**Trade-offs:**
- **Compliance visibility vs reading purity:** EU AI Act требует transparency statement, но не требует его в каждой главе — достаточно persistent footer link + отдельная `/apparatus/transparency/` страница. Это покрывает Art. 50 без intrusion в narrative.
- **Academic credibility:** Исследователи найдут полный apparatus в `/apparatus/` — это даже лучше, чем scattered footnotes, потому что всё собрано в одном месте.
- **Bilingual:** `/apparatus/` страницы должны быть bilingual (RU/EN) как и главы.

**Минимум в narrative для compliance (нельзя убрать):**
1. Numbered footnotes для цитат — citation-compliance.md требует атрибуцию. Формат: суперскрипт в тексте, expanded note в конце главы (Pattern B). Не убирать в `/apparatus/` — они должны быть рядом с цитируемым текстом.
2. Footer всего сайта — ссылка на `/apparatus/transparency/` для EU AI Act.

**Что точно убрать из chapter view:**
- Status badge (verified/unverified) — в chapter header: confuses читателя, не помогает. Переместить в `/apparatus/colophon/` как часть editorial metadata per chapter.
- Confidence callout box — интрузивный info box перед content: убрать полностью из reading view.
- AI Transparency disclaimer — убрать из chapter body, оставить в sitewide footer как ссылку.
- Frontmatter editorial fields (reviewed_by, review_date) — они в YAML frontmatter и не рендерятся в HTML главы — уже корректно, не нужно менять.
- Methodology references внутри chapter prose — переместить в `/apparatus/methodology/`.

---

*Last updated: 2026-04-26 | Task: AGIL-127 Phase 1 | Status: complete*
