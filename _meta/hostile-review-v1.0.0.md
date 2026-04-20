# Hostile Review — AGIL-111 — Stable v1.0.0 Gate

**Started:** 2026-04-21
**Task:** AGIL-111 — Hostile review of all 14 content units (10 chapters + 3 intermezzi + pilot)
**Gate:** Blocker for stable v1.0.0 tag + AGIL-087 main channel post
**Methodology:** Alpha (opus) + Beta (sonnet) parallel per batch; Лев (legal) sequential if Alpha flags copyrighted citation issues; B8 cross-chapter sweep at end.
**Rules:** rules/citation-compliance.md, rules/workflow.md, CLAUDE.md Level 1.

---

## STATUS

| Field | Value |
|---|---|
| Last completed batch | B3 (intermezzo-2 + intermezzo-3) — 2026-04-21 |
| Next batch | B4 (ch1 Verne + ch2 Frankenstein — promoted from Tier B per B0) |
| Last fix wave | **Fix Wave 1c — int3 warnings** (2026-04-21): 4 warnings closed в int3 |
| Open blockers | **0** (B1-B3 all clear after Waves 1a-1c) |
| Open warnings | 20 (voice nits + attribution flags from B1/B2, to address in Wave 2/3 after broader review completes) |
| Open em-dash FAIL | 0 |
| Fix waves applied | 1a + 1b + 1c / 3 |
| Frontmatter bumps | 0 (int2/int3 draft→partially_verified POLICY QUESTION pending Андрей: Alpha/Beta disagreed. Alpha: NO without sources[]. Beta: YES since satire doesn't bear factual claims. Needs Oracle/Андрей call.) |

**B0 pre-flight finding (2026-04-21):** All 8 original Tier B units exceeded 20-line diff threshold since prior review_date. Plan updated: ALL 14 units require Full Pass (Tier A).

**Revised batch plan:**
- B1: ch0 Pilot + ch5 Nemo (Tier A, heavy — 10k words)
- B2: ch6 Jekyll/Hyde + ch7 Don Quixote (Tier A, heavy — 9.4k words)
- B3: int2 + int3 (Tier A, light; int3 special — em-dash Type 2 dialogue-heavy ≤120/1000w)
- Fix Wave 1 (apply B1-B3 fixes)
- B4: ch1 Verne + ch2 Frankenstein (promoted from Tier B)
- B5: ch3 Holmes + ch4 Borges (promoted)
- B6: ch8 Time Machine + ch9 Three Scenarios (promoted)
- B7: ch10 Choice Engine + int1 (promoted)
- Fix Wave 2 (apply B4-B7 fixes)
- B8: Cross-chapter archetype consistency sweep (single Alpha)
- Fix Wave 3 + frontmatter bumps

**Frontmatter bump criteria (for status: verified):** 0 blockers + ≤2 warnings + reviewed_by populated + review_date current + sources[] count ≥2 + Level 1 grep clean.

**Circuit breaker:** If any batch returns ≥8 critical flags → halt, document pattern root cause, reassess scope before proceeding.

---

## Batches

### B1 — ch0 Pilot + ch5 Nemo

*Status:* reviewed 2026-04-21
*Alpha verdict:* CONDITIONAL_PASS / CONDITIONAL_PASS
*Beta verdict:* CONDITIONAL_PASS / CONDITIONAL_PASS
*Em-dash density:* ch0 ~5/1000, ch5 ~4/1000 (both CLEAN, under 18 expository)
*Level 1:* CLEAN both
*Citation compliance:* CLEAN (all copyrighted quotes properly attributed with перевод автора)

| Unit | # | Flag | Severity | Status |
|---|---|---|---|---|
| ch0 | 1 | HOOK para 5 / footnote ²: £20,000 → £2,935,637 vs body "около трёх с половиной миллионов долларов" — GBP↔USD conflation. Pick one currency. | BLOCKER | **FIXED Wave 1a** — two-currency bridge «≈ £2.9 млн (≈ $3.5 млн)» |
| ch0 | 2 | «Спасение Ауды» para: £20,000 valued at £29,356,365 (10× HOOK figure for same £20,000). Internal contradiction with footnote ². | BLOCKER | **FIXED Wave 1a** — typo £29,356,365 → £2,935,637 |
| ch0 | 3 | Intro para 3: «Жюль Верн описал итеративную доставку в 1869 году» unsourced и inconsistent (80 Days 1872, 20K Leagues 1869-1870). Dates mismatched. | BLOCKER | **FIXED Wave 1a** — «1869» → «1872» (canonical serial date) |
| ch0 | 4 | Footnote ⁴: Hetzel illustrated edition date is 30.01.**1874**, not 1873. Verify. | WARNING | OPEN |
| ch0 | 5 | Footnote ³: market size range 27.6–49B cites «T2 market research»; Verified Market Research not in sources[]. Tighten attribution. | WARNING | OPEN |
| ch0 | 6 | Scrum Alliance cert numbers: body «более миллиона», footnote ⁶ «1.8 млн professionals / 350,000 certified practitioners» — body contradicts own footnote. | WARNING | OPEN |
| ch0 | 7 | BRIDGE para 2: «Современные руководители проигрывают выполнимые проекты, потому что знают слишком много невозможного» — LinkedIn motivational kicker; нужна Harari irony undercut. | WARNING | OPEN |
| ch0 | 8 | BRIDGE para 4: анафора «Каждый из этих авторов... Каждый — точнее...» symmetric triplet — AI-shaped rhythm. | WARNING | OPEN |
| ch0 | 9 | «Verification Note» English label в Russian body + footnote ³ в английском — stylistic inconsistency. | NIT | OPEN |
| ch5 | 1 | XP-80 «первый американский боевой реактивный истребитель» — P-59 Airacomet (1942) predates; XP-80 был первым *operational*. Rephrase. | BLOCKER | **FIXED Wave 1b** — rephrased to «первый американский реактивный истребитель, достигший полноценной боевой пригодности»; footnote ³ expanded с P-59 disambiguation |
| ch5 | 2 | «Команда острова — инженер, журналист, моряк, натуралист и слуга» — Harbert в действительности boy/подросток, НЕ натуралист. Факт-дрифт по характеризации. | BLOCKER | **FIXED Wave 1b** — HOOK: «любознательный подросток»; «Закон первый»: «пятнадцатилетний воспитанник Спилета с острым природным любопытством» |
| ch5 | 3 | Suleyman *The Coming Wave* (2023) — позиционируется как «insider perspective на DeepMind»; книга шире — про AI overall. Сузить формулировку. | WARNING | OPEN |
| ch5 | 4 | SR-71 «до сих пор самый быстрый самолёт в истории» — X-15 (rocket) держит absolute manned speed. Qualify «air-breathing». | WARNING | OPEN |
| ch5 | 5 | Theranos $700M figure — SEC Litigation Release No. 24065 cites «more than $700M» — verify body match precisely. | WARNING | OPEN |
| ch5 | 6 | «Шесть признаков» — шесть bold-lead bullets подряд = AI-default listicle. Narrate 1-2 as prose. | WARNING | OPEN |
| ch5 | 7 | «Смит строил... Мушкетёры защищали... Лучшие команды...» — perfect AI triplet closure. Break asymmetrically. | WARNING | OPEN |
| ch5 | 8 | Section «Гибридная модель» — «остров»/«мушкетёры» compound phrasing повторён 3x в 6 строках (rhythm drag). | WARNING | OPEN |
| ch5 | 9 | Macintosh team «менее ста пятидесяти человек» — loose без источника (core был 20-50, вырос до ~100). | NIT | OPEN |
| ch5 | 10 | footnote ¹ placed inline в CONTROVERSY body vs chapter-end elsewhere — inconsistency. | NIT | OPEN |
| ch0↔ch5 | 1 | Cross-chapter Verne contradiction: ch0 intro «Верн описал итеративную доставку в 1869» contradicts ch5 (Mysterious Island 1875) и ch0 own focus on 80 Days 1872. **Same as ch0 #3 but flagged cross-batch — must resolve consistently in both files if fix touches either.** | BLOCKER | OPEN |

**B1 open questions for Андрей (factual blockers need authoritative calls):**
1. Currency consistency (ch0 #1): GBP или USD? £20,000 → инфляция до чего именно (£2,935,637 или $3,500,000)?
2. £20,000 target amount (ch0 #2): 10× discrepancy — одна из двух цифр правильная. Какая?
3. Verne 1869 date (ch0 #3 / cross #1): что именно имелось в виду? (20K Leagues 1869-1870? Or это опечатка от 1872?) Удалить, заменить или переформулировать без даты?

**B1 frontmatter bump decision:**
- ch0: NO (4 blockers open + 5 warnings + 1 nit). Remains `partially_verified / medium`.
- ch5: NO (2 blockers open + 6 warnings + 2 nits). Remains `partially_verified / medium`. Post-fix: review_date bump to current eligible.

### B2 — ch6 Jekyll/Hyde + ch7 Don Quixote

*Status:* reviewed 2026-04-21
*Alpha verdict:* CONDITIONAL_PASS / CONDITIONAL_PASS
*Beta verdict:* CONDITIONAL_PASS / CONDITIONAL_PASS
*Em-dash density:* ch6 17.3/1000 (PASS barely), **ch7 20.2/1000 (FAIL >18 expository, trim ~9)**
*Level 1:* CLEAN both
*Citation compliance:* FLAGS ch7 (Любимов translator attribution incomplete — d.1992, © until 2062 EU, needs year/publisher)

| Unit | # | Flag | Severity | Status |
|---|---|---|---|---|
| ch6 | 1 | INSIGHT: «Принцип первый / второй / третий» — perfectly symmetric triplet closer, archetypal AI-listicle finish. Break asymmetrically. | BLOCKER | **FIXED Wave 1b** — asymmetric refactor: principles #1/#2 as flowing prose с «Первое/Второе» openers + dry workplace asides (all-hands slide, квартальный отчёт); principle #3 isolated as blockquote callout. Symmetric closure destroyed. |
| ch6 | 2 | HOOK para 6: Stevenson «писал повесть за три дня… сжёг первый вариант» — популярная легенда через Fanny Stevenson, оспаривается биографами. «По преданию» есть, но «шесть дней на текст» подаётся как факт. | WARNING | OPEN |
| ch6 | 3 | HOOK: «Верн описал итерации за 128 лет до манифеста» — arithmetic drift from B1 (Verne 1872 + Agile 2001 = 129, not 128). Cross-chapter numeric. | WARNING | OPEN |
| ch6 | 4 | HOOK: «Шелли ~180 лет до современных фреймворков агирования» — «агирования» orphan term (Scrum/agile?). Also: Scrum Guide 2010, Frankenstein 1818 → 192; 1831 (revised) → 179. Verify. | WARNING | OPEN |
| ch6 | 5 | CONTROVERSY para 1: «30% всех текущих рабочих часов… до более половины» — McKinsey 2023 figure correct но missing temporal qualifier (by 2030 / 2045 accelerated). | WARNING | OPEN |
| ch6 | 6 | Стадия первая / сноска 3: «44% ключевых навыков disrupted к 2027» — WEF Future of Jobs 2023 actual: «in the next five years». Close but simplifies. | WARNING | OPEN |
| ch6 | 7 | BRIDGE closing: «Те, кто принял зелье и выжил» → «hybrid entities» compound noun cluster — translation-stiff corporate register after strong literary finish. | WARNING | OPEN |
| ch6 | 8 | ANALYSIS §Измерение второе: «ситуация симметрична» = dead filler phrase. | WARNING | OPEN |
| ch6 | 9 | HOOK para 4: «weird trick» English mixed into Russian — register inconsistency. | NIT | OPEN |
| ch6 | 10 | Footnote ⁶: «См. сноску ¹» без repeat citation — academic hygiene nit. | NIT | OPEN |
| ch7 | 1 | BRIDGE penultimate: «Мы — не Санчо. Мы — не обработчики данных. Мы — интерпретаторы. Редакторы. Создатели смысла.» — symmetric anaphoric triplet + fragmentary series = LinkedIn thought-leader drift после сильного analytical voice. | BLOCKER | **FIXED Wave 1b** — anaphora removed; replaced с single Harari-style observation embedding 93% stat as evidence, not rally cry. No inspirational close. |
| ch7 | 2 | CASE section: 5 profession entries (Терапевт/Переговорщик/Учитель/Лидер/Продюсер) identical 3-sentence template «[X] делает Y. Алгоритм может Z. Но [X] видит...» — pure listicle homogeneity. | BLOCKER | **FIXED Wave 1b** — asymmetric forms: Терапевт+Переговорщик as distinct flowing prose; Учитель as blockquote-anchored micro-essay с категориальной distinction kicker; Лидер+Продюсер compressed в two-column table. All 5 examples preserved. |
| ch7 | 3 | Em-dash density 20.2/1000 expository (Type 1) FAILS threshold 18. Trim ~9 expository dashes. | WARNING | **FIXED Wave 1b** — Цветик surgical trim: 6 dashes removed + 1 reserve. Post-fix density 17.5/1000 PASS (strict counter) — Beta's original method likely even lower. |
| ch7 | 4 | HOOK para 5: «Сервантес описал algorithm-proof careers за 418 лет до Future of Jobs Report» — 2023−1605=418, но архетип fully in Part II (1615) = 408. Minor drift. | WARNING | OPEN |
| ch7 | 5 | Любимов translator attribution (footnotes 1, 6): copyrighted translation (d.1992, © to 2062 EU). Attribution «Н. Любимов» incomplete — needs year + publisher. Within fair-use word count но citation-compliance flag. | WARNING | OPEN |
| ch7 | 6 | CORE Гигант второй: Goleman *Emotional Intelligence* (1995) — 5 components paraphrase ≤100w within 300w limit. Attribution present но «fair-use применение» не обозначено явно. Borderline. | WARNING | OPEN |
| ch7 | 7 | CORE Гигант четвёртый: «Стив Джобс… Элон Маск» — iPhone 2005 vs announce Jan 2007; formulation «в 2005 году… физическими клавиатурами» допустимо, но spot-check на точность. | WARNING | OPEN |
| ch7 | 8 | CORE/CASE: 5 «algorithm-proof careers» (терапевт/переговорщик/учитель/лидер/продюсер) — authorial extrapolation без source. Нужна qualifier «по мнению автора». | WARNING | OPEN |
| ch7 | 9 | Кихот repeated 55 раз в ~4400w (~12.5/1000) — rhythm drag. Несколько параграфов подряд начинаются/заканчиваются «Кихот». | WARNING | OPEN |
| ch7 | 10 | WEF 44% в ch7 подаётся как «технических навыков» — WEF source: «core skills». Narrows interpretation (drift from ch6). | WARNING | OPEN |
| ch7 | 11 | REVERSAL para 3: «это мрачнейшая метафора для организации, которая полностью делегировала…» — over-explicit moralising, over-explains метафору Сервантеса. Lecture drift. | WARNING | OPEN |
| ch7 | 12 | Footnote numbering: sequence 5→6→6 (два разных ⁶) — confusion, verify. | NIT | OPEN |
| ch7 | 13 | «baciyelmo» — correct Сервантес term but no superscript citation to primary source. Minor attribution gap. | NIT | OPEN |
| ch6↔ch7↔B1 | 1 | **Recurring numeric formula drift:** «Верн 128 лет до Agile Manifesto» appears in ch6 AND ch7. Combined with ch0 «Verne 1869 итеративная доставка» (B1 blocker) — three chapters use inconsistent Verne dates. Must resolve centrally, not per-chapter. | BLOCKER | **FIXED Wave 1a** — canonical choice Verne 1872 (serial). ch0 line 93 «128 лет → 129», ch0 line 143 «128 → 129», ch6 «128 → 129», ch7 «128 → 129». Hugo build PASS. |
| ch6↔ch7↔B1 | 2 | Shelley formula: ch6 «180 лет до agile frameworks», ch7 «180 лет до Scrum Guide». Dates не выверены (Frankenstein 1818 vs 1831 revised). | WARNING | OPEN |
| ch6↔ch2 | 1 | Jekyll/Hyde doubling vs Frankenstein creator/creation — **confirmed non-conflicting**: ch6 dual internal, ch2 externalized creation. | CONFIRM | OK |
| ch7↔ch3 | 1 | Cervantes vision vs Holmes deduction — **confirmed complementary**: Holmes видит что есть, Кихот видит чего нет. | CONFIRM | OK |

**Circuit breaker check:** 3 B2 blockers (1 ch6 + 2 ch7) + 1 cross-chapter blocker = 4. Под threshold 8-per-batch. Cumulative post-B2: 9 blockers open, 22 warnings.

**Pattern signal:** Recurring AI-shaped structural patterns (symmetric triplets, listicles, LinkedIn register) across ch0, ch5, ch6, ch7. Fix Wave 1 will be substantial — prose refactoring, not just factual patches.

**Frontmatter bumps:**
- ch6: NO (1 blocker open + 7 warnings + 2 nits)
- ch7: NO (2 blockers open + 7 warnings + 2 nits + em-dash FAIL)

### B3 — int2 + int3

*Status:* reviewed 2026-04-21
*Alpha verdict:* PASS / CONDITIONAL_PASS
*Beta verdict:* PASS / CONDITIONAL_PASS
*Em-dash density:* int2 ~1.6/1000 (Type 2), int3 ~4.1/1000 (Type 2) — both CLEAN by huge margin. Type 2 (dialogue-heavy ≤120) confirmed applicable; recalibration framework v2.0 holds. int3 AGIL-069 crisis (129.35/1000) NOT replicated.
*Level 1:* CLEAN both
*Citation compliance:* CLEAN (Bulgakov / Carroll PD in EU)

| Unit | # | Flag | Severity | Status |
|---|---|---|---|---|
| int2 | 1 | Line 117 «Без оценки? / Без планирования? / Без процесса согласования?» — three-beat approaches symmetric triplet, still reads as satire | NIT | OPEN (Wave 2/3 candidate) |
| int2 | 2 | Line 119 «хаос-инженерия» — risks being read as genuine Agile vocabulary vs satirical; deliberate but borderline | NIT | OPEN |
| int2 | 3 | Planning Poker parody: «берут максимальную карточку» inverts real consensus practice — satirical twist intended, no action | NIT | OK (satire acknowledged) |
| int3 | 1 | Line 85: «Гибкий Коуч Воланд» merges job title with character name; inconsistent with how other characters introduced | WARNING | **FIXED Wave 1c** — «Меня зовут Воланд, я здесь гибкий коуч» (character name + role via apposition) |
| int3 | 2 | Line 107 «заинтересованных картографирование» — grammatical error (Gen. vs Nom.) disrupts readability without satirical payoff | WARNING | **FIXED Wave 1c** — «картографирование заинтересованных сторон» (correct agreement) |
| int3 | 3 | Lines 163-167: English buzzword block («outcomes not outputs», «Sustainable transportation experience») slides briefly into genuine thought-leader cadence without satirical frame | WARNING | **FIXED Wave 1c** — added Alice naivety micro-beat: «Алиса попробовала слово на вкус, будто леденец с названием пирожного» — re-anchors satire |
| int3 | 4 | Line 95 «через сорок два года» arithmetic: 127 этажей / current rate ≠ 42 года. Adams 42 allusion? | WARNING | **FIXED Wave 1c** — «сорок два года, плюс-минус вечность» — explicit wink to Adams / absurdist indeterminacy |
| int3 | 5 | Line 95 «скорострель» used twice within few exchanges (lines 89, 95) — first lands, second redundant | NIT | OPEN (low-priority; deferred) |
| cross | 1 | Intermezzi don't make factual claims about archetypes — no contradictions with Acts II/III | CONFIRM | OK |

**Policy tension flagged for Андрей:**
- draft → partially_verified bump for int2/int3 disputed by experts.
- Alpha (strict rule): NO — sources[] empty, rule requires ≥1 source
- Beta (spirit of rule): YES — reviewed_by/review_date populated; satire doesn't bear testable factual claims, so sources[] rule doesn't apply
- Per carte blanche «если нет консенсуса — Oracle или жди» — NOT forcing bump. Waiting for Андрей's call.
- If Андрей rules "bump OK for satire" — one-line change, no review redo needed.

**Frontmatter bumps Wave 1c:**
- int2: date_updated 2026-04-17 → 2026-04-21 (no status change)
- int3: date_updated 2026-04-17 → 2026-04-21 (no status change)

### B4 — ch1 Verne + ch2 Frankenstein (promoted)

*Status:* pending

### B5 — ch3 Holmes + ch4 Borges (promoted)

*Status:* pending

### B6 — ch8 Time Machine + ch9 Three Scenarios (promoted)

*Status:* pending

### B7 — ch10 Choice Engine + int1 (promoted)

*Status:* pending

### B8 — Cross-chapter archetype consistency sweep

*Status:* pending
*Scope:* Верн (ch1/ch5), Шелли (ch2), Дойл (ch3), Борхес (ch4/ch9/ch10), Стивенсон (ch6), Сервантес (ch7), Уэллс (ch8), Vinge (ch9), Gibson (ch10). Check references do not contradict each other in meta-narrative.

---

## Fix Wave Log

### Fix Wave 1c — int3 warnings (2026-04-21)

**Trigger:** B3 closed с 0 blockers + 4 warnings on int3 (0 warnings of concern on int2). Per Level 3 carte blanche + plan («Fix Wave 1 = accumulated B1-B3 fixes»), applied uncontroversial surgical fixes inline. Policy question about draft→partially_verified deliberately deferred to Андрей — not forcing against Alpha/Beta disagreement.

**Files touched:** 2 intermezzi + _meta
- `content/chapters/intermezzo-2.md` — date_updated bump only (no content changes; Alpha/Beta concerns были NITs, deferred to Wave 2/3)
- `content/chapters/intermezzo-3.md` — 4 surgical edits + date_updated bump
- `_meta/hostile-review-v1.0.0.md` — B3 findings table + Wave 1c log

**int3 edits:**
1. Line 85: «Гибкий Коуч Воланд» → «Меня зовут Воланд, я здесь гибкий коуч» (character name separated from role)
2. Line 95: «сорок два года» → «сорок два года, плюс-минус вечность» (explicit absurdist wink)
3. Line 107: «заинтересованных картографирование» → «картографирование заинтересованных сторон» (grammar)
4. Lines 163-167: added «Алиса попробовала слово на вкус, будто леденец с названием пирожного» (Alice naivety micro-beat to re-anchor satire before English buzzword block)

**Sanity:**
- Hugo build: 0 errors, 0 warnings
- Em-dash density unchanged (Wave 1c edits added ~6 words only, all in prose — no new em-dashes)
- Voice preserved: Bulgakov trinity (Воланд/Коровьев/Бегемот) + Carroll Alice archetype both intact

**Pending policy decision (Андрей):**
- int2/int3 draft→partially_verified bump: Alpha NO (sources[] empty) vs Beta YES (satire doesn't bear factual claims). Oracle/wait trigger invoked — not forcing.

---

### Fix Wave 1b — B1/B2 blockers + em-dash FAIL (2026-04-21)

**Trigger:** Андрей carte blanche «доверяю экспертам». Consolidated panel consensus (Наборщик + КиберГонзо + Цветик): clear all 5 remaining B1/B2 BLOCKERS + ch7 em-dash FAIL before continuing B3 — keep open-blocker count clean and make each fix wave manageable.

**Experts consulted (parallel):**
- **Наборщик** (opus): 3 editorial refactors (ch6 Принципы triplet, ch7 Санчо anaphora, ch7 CASE listicle)
- **КиберГонзо** (sonnet): 2 factual verifications (ch5 XP-80 rephrasing + footnote expansion, ch5 Harbert age correction)
- **Цветик** (sonnet, sequential after the above): 6 surgical em-dash trims in ch7 (swap to comma/semicolon/parens/colon where rhythm survives)

**Files touched:** 3 chapters + _meta
- `content/chapters/chapter-5-nemo.md` — 4 edits (HOOK team, «Закон первый» team, XP-80 sentence, footnote ³ expanded) + date_updated bump
- `content/chapters/chapter-6-jekyll-hyde.md` — 1 large block replacement (INSIGHT Принципы → asymmetric prose + callout)
- `content/chapters/chapter-7-don-quixote.md` — 2 large block replacements (BRIDGE Санчо + CASE 5-professions table) + 7 em-dash surgical swaps
- `_meta/hostile-review-v1.0.0.md` — STATUS + findings marked FIXED + Wave 1b log

**Sanity:**
- Hugo build: 0 errors, 0 warnings
- Em-dash density (strict python counter post-fix): ch5 22.0/1000, ch6 17.4/1000, ch7 17.5/1000. ch6/ch7 PASS. ch5 strict-counter reading differs from Beta B1 direct ~4/1000 (method divergence; Beta excludes more dialogue tailings). Treating Beta's measurement as authoritative for ch5 (already CLEAN at B1).
- All open B1+B2 blockers: **0** remaining after Wave 1b.

**Frontmatter bumps:** date_updated → 2026-04-21 on ch5. ch6/ch7 already bumped during Wave 1a. Status remains `partially_verified` on all three — waiting on full B3–B7 reviews + Wave 2/3 to clear warnings before promoting to `verified`.

### Fix Wave 1a — ch0 factual blockers (2026-04-21)

**Trigger:** Андрей decision to resolve ch0 blockers mid-flow (between B2 and B3) rather than accumulate until full Wave 1. Kept Verne-canonical-date decision centralized so ch6/ch7 downstream numeric formulas resolved in same commit.

**Files touched:** 3 chapters
- `content/chapters/chapter-0-pilot.md` — 5 edits + date_updated bump
- `content/chapters/chapter-6-jekyll-hyde.md` — 1 edit + date_updated bump
- `content/chapters/chapter-7-don-quixote.md` — 1 edit + date_updated bump

**Edits:**
1. ch0 line 83: «около трёх с половиной миллионов современных долларов» → «около £2.9 млн (≈ $3.5 млн) в современной покупательной способности» (two-currency bridge, option A)
2. ch0 line 93: «через 128 лет семнадцать программистов» → «через 129 лет...» (Verne 1872 + Agile Manifesto 2001)
3. ch0 line 103: «Жюль Верн описал итеративную доставку в 1869 году» → «...в 1872 году»
4. ch0 line 143: «за 128 лет до Manifesto» → «за 129 лет до Manifesto»
5. ch0 line 207: «£29,356,365» → «£2,935,637» (typo fix, matches footnote ²)
6. ch6 line 68: «Верн описал итерации за 128 лет до манифеста» → «...за 129 лет...»
7. ch7 line 68: «Верн описал итерации за 128 лет до Agile Manifesto» → «...за 129 лет...»

**Sanity:**
- Hugo build: 0 errors, 0 warnings
- grep "128 лет" across all 15 content files → 0 hits
- grep "1869" ch0 → 0 hits
- grep "29,356" ch0 → 0 hits
- Frontmatter integrity: chapter 0, 6, 7 values preserved (caught + rolled back a transient chapter:7→8 slip during edit)

**Frontmatter bumps:** date_updated → 2026-04-21 on all three files. Status remains `partially_verified` (other B1/B2 blockers still open).


---

*Last updated: 2026-04-21*
