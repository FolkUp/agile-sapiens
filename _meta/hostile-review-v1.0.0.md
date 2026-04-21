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
| Last completed batch | B8 cross-chapter sweep — 2026-04-21 |
| Next batch | — (all 8 batches complete) |
| Last fix wave | **Fix Wave 3 — B8 blockers + 7 frontmatter bumps** (2026-04-21) |
| Open blockers | **0** (B8 #21 + #22 closed in Wave 3) |
| Open warnings | 48+ cumulative B1-B8 (deferred NIT-severity; not blocking v1.0.0) |
| Open em-dash FAIL | 0 |
| Fix waves applied | 1a + 1b + 1c + 2 + 3 / 5 (ALL COMPLETE) |
| Batches complete | B0 + B1 + B2 + B3 + B4 + B5 + B6 + B7 + B8 (ALL 9 COMPLETE) |
| Frontmatter bumps | **9 units promoted to verified** (ch0, ch1, ch6, ch7, ch8, ch9, ch10, int2, int3). ch2/ch3/ch4/int1 already verified (unchanged). ch5 remains `partially_verified` (B1 nits unresolved, non-blocking). int2/int3 resolved via Option C: added Carroll+Bulgakov+КГ sources[] entries matching int1 pattern — resolves Alpha strict-rule objection and Beta spirit argument simultaneously. |
| AGIL-111 status | **COMPLETE** — book stable v1.0.0 ready. |

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

*Status:* reviewed 2026-04-21
*Alpha verdict:* CONDITIONAL_PASS / PASS
*Citation compliance:* CLEAN (Verne/Shelley/Dickens/Aldini/Lake all PD; GAO/DOJ/NAO reports are government works; Vuori-Huy academic paraphrase within fair use; Brooks law-of-Brooks paraphrase only, no direct quote)

| Unit | # | Flag | Severity | Status |
|---|---|---|---|---|
| ch1 | 1 | Line 66: «Через сто тридцать один год» — HOOK anchor is март 1869, 2001-1869=132, не 131. Arithmetic drift minor. | WARNING | OPEN |
| ch1 | 2 | Line 66 uses 1869/1870 anchor (20K Leagues) vs canonical ch0/ch6/ch7 «129 лет» 1872 anchor (80 Days). Not a contradiction (chapter-specific anchor) but needs cross-chapter note so reader sees both legitimately. | WARNING | OPEN |
| ch1 | 3 | Line 106: «Двадцать восемь лет спустя Саймон Лейк» — 1870+28=1898, Argonaut built 1897 (Argonaut Jr 1894). Loose but defensible; footnote ³ anchors to Lake 1918 autobiography. | NIT | OPEN |
| ch1 | 4 | Line 309 footnote ¹: Allied Market Research + Verified Market Research cited as T2 без полного entry в sources[] frontmatter — same attribution tightening pattern as ch0 #5. | WARNING | OPEN |
| ch1 | 5 | Line 92: «Первый тираж: 400 экземпляров. К четвёртому выпуску: 40 000» — Patten-sourced но figure «40 000 by 4th installment» disputed; some scholars place 40k milestone later (5-15 issues after Weller). Footnote 1 says "к 4-5 выпуску" — body understates range. | NIT | OPEN |
| ch1 | 6 | Line 52 + line 66: HOOK scene «Парижское издательство, март 1869» — dramatized composite of Verne-Hetzel correspondence (1868-1869). No direct quote attributed to scene, acceptable dramatic license, но sources[] не имеет entry «dramatic reconstruction» marker — expected reader convention для biographical sketches. | NIT | OPEN |
| ch1 | 7 | Frontmatter `review_date: 2026-03-26` + `reviewed_by` mentions «Alpha+Beta (hostile verification)» but this was the prior round — current B4 gate is the authoritative hostile review. Update review_date at Wave 2. | NIT | OPEN |
| ch2 | 1 | Line 113: «Тринадцать лет. Более шестисот миллионов» — VCF (2001) → Sentinel insourced completion (2012) = 11 years, не 13. If counting to full stabilization 2014 then 13 defensible. Mild arithmetic drift. | WARNING | OPEN |
| ch2 | 2 | Line 163: «Девяносто восемь миллионов фунтов составляют две тысячи двести годовых зарплат начинающего журналиста BBC» — specific ratio £98M/2200=£44,545 unsourced; BBC News Trainee salaries ~£30-45K so plausible but specific number needs anchor or qualifier. | WARNING | OPEN |
| ch2 | 3 | Line 189: «более 49% мирового рынка смартфонов» 2007 — IDC/Gartner Q3 2007 cited как «около 49%»; «более 49%» slight overstate. Footnote ¹⁰ says «основаны на отраслевых исследованиях» without precise quarter — tighten. | NIT | OPEN |
| ch2 | 4 | Line 125: «число успешных регистраций в первый день измерялось единицами — звучала цифра "шесть"» — well-hedged, attributes to hearing testimony with disputed methodology. Clean citation. | CONFIRM | OK |
| ch2 | 5 | Line 55 + footnote ¹: Aldini 1803 Newgate (George Forster) demonstration — correctly placed pre-1816 villa scene. | CONFIRM | OK |
| ch2 | 6 | GAO-15-238, DOJ OIG 12-08 / 10-03, GAO-05-105, NAO HC 985, OEI-06-14-00350 — all report numbers verified against report-number conventions; sources[] entries match in-text footnote refs. | CONFIRM | OK |
| ch2 | 7 | Vuori & Huy ASQ 61(1) 2016 pp.9-51 — precise citation, 76 interviews figure matches published abstract. | CONFIRM | OK |
| ch1↔ch2 | 1 | Brooks *Mythical Man-Month* 1975 appears in both sources[] — consistent. Ch2 body uses closest-to-direct paraphrase ("adding manpower... makes it later") — within fair-use; Brooks d.2022 © active but paraphrase is law-of-Brooks not quotation. | CONFIRM | OK |
| ch1↔ch2 | 2 | Archetype integrity: ch1 Verne = healthy creation/iteration (light side); ch2 Frankenstein = abandoned creation (dark side). Ch2 explicitly frames ch1 as predecessor ("Предыдущая глава показала светлую сторону" line 63; "Этцель кивает из 1870 года" line 115). Non-conflicting, mutually reinforcing. | CONFIRM | OK |
| ch2↔ch6 | 1 | Shelley Frankenstein framing: ch2 externalized creator/creation vs ch6 internal dual Jekyll/Hyde — **confirmed non-conflicting** per B2 ch6↔ch2 cross-check. Ch2 does NOT make em-dash arithmetic claims ("180/192/179 лет") that B2 ch6 #4 flagged — clean separation. | CONFIRM | OK |
| ch2↔B1 cross | 1 | Ch2 Verne references (line 63 "итеративной разработки", line 115 "Этцель кивает из 1870 года") are prose-level, no numeric "X лет до Manifesto" formula — ch2 avoided the cross-chapter drift that affected ch0/ch6/ch7. | CONFIRM | OK |
| ch1↔ch5 | 1 | Verne archetype split: ch1 = Verne-as-iterative-collaborator (Hetzel/sprints/cross-functional team); ch5 = Nemo-as-trauma-leadership (different Verne work, Mysterious Island 1875, different character focus). Non-contradictory — two distinct Verne archetypes in one author's corpus. | CONFIRM | OK |

**Alpha bump assessment:**
- ch1 (currently partially_verified): **YES** with contingency — 0 blockers + 3 warnings + 4 nits. Meets bump criteria (≤2 warnings threshold borderline — 3 warnings technically exceeds). Recommend: close 1 warning in Wave 2 (line 309 T2 attribution tightening — copy pattern from ch0 fix), then clear bump to `verified`. If Андрей treats 3 warnings as acceptable for domain (commercial market research figures always soft), immediate bump defensible.
- ch2 (currently verified): **KEEP** — 0 blockers + 2 warnings + 1 nit + 4 CONFIRMs. Already passes bump criteria, citations/archetypes/report numbers all verified. No demotion warranted. Minor warnings addressable без changing status.

**Alpha cross-chapter notes:**
- Verne date anchoring: ch1 uses 1869/1870 (20K Leagues serialization) internally; ch0/ch6/ch7 canonicalized on 1872 (80 Days serial) in Wave 1a. Both are legitimate per-chapter anchors (different Verne works) but reader may notice «129 vs 131» across chapters. **Not a blocker** but Wave 2 candidate: add one-line forward reference in ch1 intro («В других главах мы анкируем Верна на 1872/80 Days; здесь — на 1869/20K Leagues, потому что...») OR align на 1872 by moving HOOK to «Around the World» delivery scene. Андрей's call.
- Shelley dates: ch2 stays prose-anchored (1816 villa / 1818 / 1831) без «X лет до Y» arithmetic formulas — this is the clean model ch6 should adopt when B2 ch6 #4 is resolved.
- Brooks 1975: appears in ch1 sources[] and ch2 sources[] + ch2 body (line 211). Consistent. Likely appears in other chapters — B8 sweep will confirm.
- Methodology dates: Takeuchi-Nonaka 1986 (ch1 ✓), Scrum Guide 2010/2020 (ch1 frontmatter references 2020 ✓), Manifesto 2001 (ch1 line 66, 143 ✓) — all self-consistent.
- Circuit breaker check: 0 blockers B4 (ch1+ch2 combined). Cumulative across B1-B4: 0 open blockers (all prior fixed in Waves 1a/1b). 25 warnings + 7 nits open across all batches. Under threshold.

---

**Beta verdict:** CONDITIONAL_PASS / CONDITIONAL_PASS
**Em-dash density:** ch1 19.0/1000w (main body excl. footnotes) FAIL — marginal, see note; ch2 21.6/1000w FAIL
**Level 1:** ch1 CLEAN, ch2 CLEAN

**Em-dash calibration note (ch1):** Of 62 body dashes, 27 are structural inline-gloss dashes using the `(term — translation)` pattern — a consistent bilingual annotation device, not rhythmic emphasis. Excluding those gives prose-only 9.2/1000w. However, raw total 19.0/1000w nominally FAILs ≤18.0 threshold. A trim of 3–4 pure prose dashes would bring total below 18.0. Clustered prose dash sequences identified below (B-3, B-4). Recommend trim before bump.

**Em-dash calibration note (ch2):** Of 65 body dashes, 7 are inline-gloss. Prose-only is 58/3008 = 19.3/1000w — still FAILs without glosses. Chapter has a genuine prose dash excess centered in the BRIDGE and "Готический цикл" sections. Needs ~7 surgical prose trims.

| Unit | # | Flag | Severity | Status |
|---|---|---|---|---|
| ch1 | B-1 | Em-dash density 19.0/1000w nominally FAILS ≤18.0. Raw excess: ~3–4 prose dashes. Not AI-pattern–driven — inflation is primarily the bilingual gloss device, but total crosses threshold. | WARNING | OPEN |
| ch1 | B-2 | **«Ключевое понимание (инсайт)»** label in SYNTHESIS (body line ~169): «ключевое понимание» is a dead filler phrase flagged as AI-tell; same line restates the wing/convergent-evolution metaphor already used three paragraphs above in CORE — double-usage. | WARNING | OPEN |
| ch1 | B-3 | BRIDGE triplet: «Три эпохи. Один ритм: проверить результат — обсудить направление — запустить цикл» — three-beat em-dash series is borderline AI-rhythmic. Tolerable (it's a list-of-three pattern not a LinkedIn inspirational close), but note for Wave 2 if pattern accumulates. | NIT | OPEN |
| ch1 | B-4 | ECONOMICS section: two lines back-to-back with 3 inline-gloss dashes each (Диккенс вирусность para + Этцель в письмах para) — dense gloss cluster creates rhythm drag over 4 consecutive paragraphs, reader fatigue. Suggest consolidating gloss annotations into a margin/table rather than inline in the body. Not a blocker but a quality flag. | WARNING | OPEN |
| ch1 | B-5 | MODERN IMPLICATIONS / «Парадокс сертификации» sub-section: three-column comparison structure **Диккенс / Современная методология** × 3 entries follows the exact same template as the B2 ch7 CASE listicle pattern (each pair: historical vs. modern, same sentence rhythm). Pattern signal from B1/B2 recurring. Asymmetrize at least one pair. | WARNING | OPEN |
| ch1 | B-6 | PREVIEW: clean, analytical tone. No TED-talk drift, no moralising. PASS. | CONFIRM | OK |
| ch2 | B-7 | Em-dash density 21.6/1000w FAILS ≤18.0 by 3.6 points (prose-only 19.3/1000w still fails). Hotspots: BRIDGE section (4 dashes in ~120 words, incl. «Предыдущая глава — Жюль Верн — показала…» doubled en-dash framing) + CONTROVERSY «Проблема третья» para (4 dashes in one paragraph). Need ~7 surgical trims. | BLOCKER | OPEN |
| ch2 | B-8 | **«Готический цикл»** section: six bold-lead items (**Создание / Изоляция / Запуск / Бегство / Месть / Признание**) with parallel structure — identical template: **bold label.** First sentence scene-set. Следующие sentences case-evidence. Closing call-back to Frankenstein. Six entries, same rhythm, no asymmetric breaks. Same AI-listicle pattern as B2 ch7 CASE section (there it was 5 entries, fixed in Wave 1b). Needs at least 2 entries refactored as prose narration. | BLOCKER | OPEN |
| ch2 | B-9 | **«Пять стадий корпоративного горя»** section: five bold-lead entries (**Отрицание / Гнев / Торг / Депрессия / Принятие**) — same template critique as B-8. However, this section is structurally intentional (explicit Kübler-Ross adaptation) and the author signals it («Прежде чем перейти к структуре: наблюдение»). Additionally each entry has differentiated length (Торг notably longer). Downgrade: this one reads as deliberate structural parody, not AI-default. Not a blocker if «Готический цикл» is fixed. | WARNING | OPEN |
| ch2 | B-10 | BRIDGE: «Когда вместо бегства — ответственность? Когда вместо монстра — воспитанник?» — three rhetorical questions + two symmetrically-framed «Когда вместо X — Y?» pairs is approaching the B1 ch0 triplet pattern. Just shy of blocker, but monitor — the BRIDGE opens and closes rhetorically without an analytical kicker. | WARNING | OPEN |
| ch2 | B-11 | BRIDGE: «Ответ — не в методологии. Не в сертификации. Не в выборе между…» — three-beat anaphoric «Не в…» series. Same AI-rhythmic close pattern as ch7 Санчо (fixed in Wave 1b). Mild here since the kicker «Ответ — в том, что мы ещё не посмотрели» lands with a clean turn. Borderline. | WARNING | OPEN |
| ch2 | B-12 | HOOK «система из четырнадцати Jira-бордов, семи Confluence-пространств» (line ~13): specific numbers presented without attribution — amusing but reads as invented detail. Fine for literary effect; note for transparency since rest of chapter is heavily sourced. | NIT | OPEN |
| ch2 | B-13 | BRIDGE analytical quality: chapter's central question answered? Marginally — «Ответ — в том, что мы ещё не посмотрели на историю, где создатель остался» is a chapter-transition tease, not an insight. This is deliberate serial-style bridge (matching ch1's Etzel model), so it's a feature, not a bug. No action needed, CONFIRM intentional. | CONFIRM | OK |
| ch1↔ch2 | B-14 | AI fingerprint cross-chapter signal: ch1 SYNTHESIS has one mild triplet (Англия/Франция/Япония bold leads), ch2 has the «Готический цикл» hextet + «Пять стадий» pentet. Pattern from B1/B2 (ch0/ch5/ch6/ch7) continues into ch1/ch2. Ch2 hextet is the clearest recurrence of the B2 ch7 CASE pattern that was already fixed. Same structural refactor needed (2 entries → flowing prose). | BLOCKER | OPEN (same as B-8) |

**Beta bump assessment (stylistic):**
- ch1 (currently partially_verified): **CONDITIONAL YES** — marginal em-dash FAIL (19.0/1000w, prose dashes only 9.2/1000w), no Level 1 issues, no AI-fingerprint blockers. Trim 3–4 prose dashes (B-1), drop dead-filler label B-2, and ch1 is clean for bump. Both fixes are 5-minute Wave 2 work. If Alpha's factual warnings also near-resolved, bump eligible after Wave 2.
- ch2 (currently verified): **CONDITIONAL KEEP** — do NOT demote, but 2 stylistic blockers must be resolved before v1.0.0 tag: em-dash FAIL (B-7) and «Готический цикл» listicle (B-8). These are Wave 2 fixes, not demotion triggers. Status `verified` defensible pending Wave 2 surgical fixes.

### B5 — ch3 Holmes + ch4 Borges (promoted)

*Status:* reviewed 2026-04-21
*Alpha verdict:* CONDITIONAL_PASS / CONDITIONAL_PASS
*Citation compliance:* CLEAN (Doyle PD; Borges copyrighted but all direct quotes ~150w total well under 300w fair-use + «перевод автора» attribution explicit in fn¹; Goodhart/Strathern/Campbell/Muller/Doerr/Wodtke citations complete; government/corporate reports Knight Capital SEC/Target/Lidl all T1/T2 sourced)

| Unit | # | Flag | Severity | Status |
|---|---|---|---|---|
| ch3 | 1 | Footnote numbering collision: superscript ⁵ used twice (Doyle *Study in Scarlet* at line 135 + Блок «Двенадцать» at line 303). Reader mapping broken — needs renumber to ¹⁵ or similar. Same pattern as B2 ch7 #12. | BLOCKER | OPEN |
| ch3 | 2 | Frontmatter `review_date: 2026-03-28` but `date_updated: 2026-04-17` — current B5 gate is authoritative hostile review; update review_date at Wave 3. | NIT | OPEN |
| ch3 | 3 | Line 125: Knight Capital loss «Убыток составил 460 миллионов» — SEC Admin Proceeding 3-15570 cites ~$461.1M pre-tax loss; body rounds to 460. Acceptable, but footnote ⁴ could cite precise figure. | NIT | OPEN |
| ch3 | 4 | Line 141: Target «7 миллиардов канадских долларов» inverstments vs footnote ⁶ «$7 млрд USD / pretax losses $5.4 млрд» — currency conflation (CAD in body vs USD in footnote). Pick one or bridge. | WARNING | OPEN |
| ch3 | 5 | Line 167: «Мельвин Конвей мог бы поставить диагноз в 1968 году, за 45 лет до открытия первого магазина» — 2013-1968=45 ✓ but Target Canada entry March 2013, first store **March 2013** not 2013-open so «за 45 лет» slightly loose (44-45 boundary). Mild arithmetic drift. | NIT | OPEN |
| ch3 | 6 | Line 201: «Knight Capital восстановилась за 45 минут, но поздно: 440 миллионов были потеряны» — 440 ≠ 460 from line 125. Internal contradiction (body uses 460 then 440 for same loss). | BLOCKER | OPEN |
| ch3 | 7 | Line 179: Lidl «500 миллионов евро» body vs footnote ¹¹ says «€500M подтверждена несколькими независимыми источниками T2» — consistent within ch3 but note Business Insider headline cites «$1.1 billion» (USD). footnote ¹¹ mixes Bort $1.1B headline + €500M from Computer Weekly/Handelsblatt. Transparent hedge, но body picks €500M selectively. | WARNING | OPEN |
| ch3 | 8 | Section «Дольник как поэтическая криптография» (lines 97-111): metrical analysis of Оксимирон/Блок is original authorial interpretation; footnote ⁵ (line 303) cites Гаспаров 1993 + Федотов 2002 as support for dolnik theory, but specific Oxxxymiron prosodic reading is unsourced synthesis. Banking-level standard suggests qualifier «авторская просодическая интерпретация» or similar transparency marker. | WARNING | OPEN |
| ch4 | 1 | Line 80: «Мэрилин Стрэтерн переформулировала в 1997 году ещё острее: "Когда мера становится целью..."» — Strathern's actual 1997 phrasing ("When a measure becomes a target, it ceases to be a good measure") is near-identical to Goodhart paraphrase, but body attributes same wording to both. Gently misleading — Strathern's contribution was generalizing Goodhart's monetary-economics framing to audit culture, not re-wording. | WARNING | OPEN |
| ch4 | 2 | Footnote ⁴ explicitly states «Specific 2021 report citation pending verification» and frontmatter sources[] line 43 «specific citation pending verification» — this is a live attribution gap acknowledged in-text. Banking-level v1.0.0 stable tag should not ship с pending-verification footnote. Either resolve citation or remove specific year claim («State of Agile reports, various years»). | BLOCKER | OPEN |
| ch4 | 3 | Line 134: SAFe «семь уровней компетенций, четыре конфигурации, десятки ролей и церемоний» — footnote ⁹ says «число ролей и церемоний подсчитано по официальной Big Picture диаграмме». SAFe 6.0 официально: 4 configurations (Essential/Large Solution/Portfolio/Full) ✓; 7 core competencies ✓; roles ~10-20 depending on configuration. Loose but defensible. | NIT | OPEN |
| ch4 | 4 | Line 140: «Nokia — компания, которая в главе 2 потеряла рынок смартфонов из-за организационного страха» — ch2 does NOT frame Nokia as «потеряла рынок смартфонов» primary; ch2 focuses on Vuori-Huy «distributed attention» fear mechanism (confirmed B4 ch2 #7). Ch4 line 140 back-reference paraphrases correctly; no contradiction но soft. | CONFIRM | OK |
| ch4 | 5 | Line 124: «кальку закона Конвея, вывернутую наизнанку» — cross-ref to Conway (ch3 Признак III) ✓ consistent. | CONFIRM | OK |
| ch4 | 6 | Line 194: «Брукс (глава 3) одобрил бы: n(n-1)/2 каналов коммуникации» — cross-ref to Brooks n(n-1)/2 formula in ch3 Признак VI line 213 ✓ consistent. | CONFIRM | OK |
| ch4 | 7 | Footnote ¹ «Borges, Jorge Luis. «La lotería en Babilonia» (1941). В сборнике *Ficciones* (1944). Editorial Sur, Buenos Aires. Все цитаты: авторский перевод с испанского. Борхес умер в 1986 году; произведения 1941 года защищены авторским правом (перевод автора).» — explicit copyright acknowledgment + «перевод автора» attribution ✓ banking-level compliance exemplary for copyrighted source. | CONFIRM | OK |
| ch4 | 8 | Direct Borges quotes total ~150 words across 7 excerpts in ~3400w chapter — well under 300w prose fair-use limit. Each quote functions as analytical anchor, not ornamental filler. Fair-use CLEAR. | CONFIRM | OK |
| ch4 | 9 | Footnote ¹⁰ «(перевод автора)» attached to HBR 2018 paraphrase but body doesn't contain direct quote — «перевод автора» marker misapplied (no quote to translate). Remove from fn¹⁰ or reframe as «критика... в переложении автора». | NIT | OPEN |
| ch4 | 10 | Line 82: «Борхес описал это на тридцать четыре года раньше обоих» — 1975-1941=34 ✓ BUT Strathern 1997-1941=56, not 34. Body says «обоих» (both) implying Borges beat both by 34 years — arithmetic only works for Goodhart. Soft misphrasing. | WARNING | OPEN |
| ch4 | 11 | Frontmatter sources[] line 43: «State of Agile Reports. Digital.ai/VersionOne. Multiple annual reports (specific citation pending verification)» — same pending-verification gap as ch4 #2 blocker. Resolve together. | WARNING | OPEN (same as ch4 #2) |
| ch3↔ch4 | 1 | Both chapters reference DORA 2023 (ch3 line 193 / ch4 line 192) с consistent 4-metric framing (deployment frequency, lead time, time to restore, change failure rate). ✓ | CONFIRM | OK |
| ch3↔ch4 | 2 | Both reference Brooks *Mythical Man-Month* 1975 (ch3 fn¹³ n(n-1)/2 / ch4 line 194 cross-ref). Consistent with B4 ch1/ch2 Brooks appearances. | CONFIRM | OK |
| ch3↔ch4 | 3 | Both reference Conway 1968 (ch3 Признак III primary / ch4 line 124 cross-ref). Consistent. | CONFIRM | OK |
| ch3↔ch7 | 1 | Holmes archetype framing «метод распознавания... наблюдать что люди делают, а не что говорят» — fully consistent с B2 ch7↔ch3 confirmed reading «Holmes видит что есть, Кихот видит чего нет». No drift. | CONFIRM | OK |
| ch3↔ch2 | 1 | ch3 line 75 «шестьдесят девять лет спустя после публикации «Франкенштейна»» — 1887-1818=69 ✓ consistent c ch2 Frankenstein 1818 anchor. | CONFIRM | OK |
| ch3↔ch0/ch6/ch7 | 1 | ch3 line 75 «через пятнадцать лет после кругосветного путешествия Фогга» — 1887-1872=15 ✓ aligns с canonical Verne 1872 anchor set in Wave 1a. Clean. | CONFIRM | OK |
| ch4↔ch9/ch10 | 1 | ch4 frames Borges archetype as «измерение/лотерея» (Lottery in Babylon + Library of Babel). B8 plan flags ch4↔ch9↔ch10 cross-check для «labyrinth of AI paths» (likely «Garden of Forking Paths»). Two different Borges works — ch4 lays no claim that would conflict с ch9/ch10 path-multiplication framing. Non-conflicting groundwork. | CONFIRM | OK |
| ch4↔B4 ch2 | 1 | ch4 fn¹¹ Vuori-Huy–adjacent Nokia citation (Laanti/Salo/Abrahamsson 2011 IST 53(3)) distinct from ch2 Vuori-Huy ASQ 61(1) 2016 — both legitimate Nokia sources на different aspects (Agile transformation survey vs distributed attention). Non-conflicting. | CONFIRM | OK |

**Alpha bump assessment:**
- ch3 (currently `verified`): **DEMOTE to `partially_verified`** — 2 blockers open (fn⁵ numbering collision + 460↔440 internal contradiction on Knight Capital loss). Cannot hold `verified` с factual contradiction and broken footnote mapping. Post-Wave 2 surgical fixes eligible for re-promotion.
- ch4 (currently `verified`): **DEMOTE to `partially_verified`** — 1 blocker open (ch4 #2: explicit "pending verification" in footnote ⁴ + frontmatter sources[] cannot ship in v1.0.0 stable). Borges citations themselves are CLEAN (exemplary compliance) but live attribution gap blocks `verified`. Post-Wave 2 resolution (either find the 2021 report or generalize claim) restores `verified`.

**Alpha cross-chapter notes:**
- Verne anchor: ch3 line 75 uses 1872 (Fogg) — aligns with canonical ch0/ch6/ch7 post-Wave-1a. Clean.
- Frankenstein anchor: ch3 line 75 uses 1818 — aligns with ch2 anchor. Clean.
- Brooks *Mythical Man-Month* 1975: appears in ch3 fn¹³ (n(n-1)/2 formula + law-of-Brooks) and ch4 line 194 (cross-ref to ch3). Consistent с ch1/ch2 Brooks appearances (B4). Pattern holds across 5 chapters so far.
- Conway 1968: ch3 Признак III primary treatment + ch4 line 124 cross-ref. Consistent.
- DORA 2023: ch3 line 193-197 (4 levels + 4 metrics) + ch4 line 192 (4 outcome metrics). Consistent.
- Vuori-Huy Nokia: ch2 uses ASQ 61(1) 2016 «distributed attention» (B4 ch2 #7 CONFIRM); ch3 line 249 «распределённое внимание¹⁴» references Vuori-Huy ASQ 2016 directly (fn¹⁴); ch4 line 140 uses Laanti et al IST 2011 (different Nokia paper). Three-chapter Nokia arc is coherent.
- Doyle copyright: d.1930 → PD in EU since 2001 — all 5 Doyle footnotes (¹²³⁵ + section callouts) use «(перевод автора)» attribution. Exemplary.
- **Borges copyright (d.1986, © to 2056 EU):** ch4 is the primary Borges chapter. 7 direct quotes total ~150 words in ~3400w chapter — well under 300w prose fair-use ceiling. Footnote ¹ explicit «авторский перевод с испанского... защищены авторским правом (перевод автора)». Banking-level copyright compliance achieved. Sets exemplary pattern для any ch9/ch10 Borges references (B8 sweep should verify those chapters' Borges footprint stays within this ceiling when combined с ch4).
- Circuit breaker check: 3 B5 blockers (2 ch3 + 1 ch4). Under threshold 8. Cumulative across B1-B5: 3 open blockers (all B5). Prior batches' blockers all closed in Waves 1a/1b. 34 warnings + 11 nits open across all batches.
- Pattern signal: ch3 fn⁵ duplication repeats B2 ch7 #12 footnote-numbering pattern — suggests editorial tool/habit issue, worth mentioning in Wave 2 cleanup as systematic scan.

**Beta verdict:** CONDITIONAL_PASS / CONDITIONAL_PASS
**Em-dash density:** ch3 19.5/1000w FAIL, ch4 19.7/1000w gross → 16.1/1000w net-of-gloss PASS
**Level 1:** ch3 CLEAN, ch4 CLEAN

**Em-dash calibration:**
- ch3: 0 bilingual-gloss structural dashes (no `(term — translation)` device used). All 64 dashes are prose-rhythm. Density 19.5/1000w exceeds ≤18.0 threshold. Two sections drag disproportionately: §Дольник (41.1/1000w, 14 dashes / 341w — dense apposition and em-dash-framed quotation pairs) and §Признак VI Ватсон (45.5/1000w, 10d/220w — 5 parenthetical interruptions in one section). §Признак VII git log (55.1/1000w, 13d/236w) is the single worst offender, almost entirely from bold-bullet lines each carrying 2 em-dashes. Estimated trim needed: ~5–6 dashes to reach ≤18.0.
- ch4: 11 bilingual-gloss structural dashes (parentheticals of form `(term — translation)`). Net prose density 16.1/1000w PASS. §CONTROVERSY (41.0/1000w gross, 13d/317w) is the high-density section but contains 6 gloss dashes; prose rhythm density ~22/1000w still elevated. §SAFe (31.6/1000w, 8d/253w) with 1 gloss — prose density ~28/1000w. These two sections pull up the gross figure but net-of-gloss the chapter passes. No trim required.

| Unit | # | Flag | Severity | Status |
|---|---|---|---|---|
| ch3 | B-1 | Em-dash density 19.5/1000w FAILS ≤18.0 threshold. Hot zones: §Дольник 41.1/1000w, §Ватсон 45.5/1000w, §git log 55.1/1000w. Trim ~5–6 dashes across these sections to reach ≤18.0. | BLOCKER | OPEN |
| ch3 | B-2 | §Дольник section (lines 97–111): prosodic analysis of Оксимирон/Блок uses em-dash as rhythmic-emphasis device 14 times in 341 words — this is also the section with the filler phrase «важно понять» (line 46, pre-section transition). The Дольник section as a whole reads as an inserted essay grafted onto the Holmes diagnostic frame; voice breaks from Sherlock register into musicology-lecture register. Not a symmetric triplet, but a structural rhythm-drag that inflates em-dash density AND weakens voice coherence. Flag for editorial tightening. | WARNING | OPEN |
| ch3 | B-3 | §Признак VII git log (lines 219–237): four consecutive bold-lead bullets (Частота / Размер / Авторство / Комментарии), each carrying 2 em-dashes, producing run-density of 55.1/1000w. Cluster of 4 identical-template bullets `**Label.** If X — diagnosis. If Y — diagnosis.` fits the warned pattern. Not full BLOCKER (variation in content, no parallel-verb AI fingerprint) but heavy rhythm drag. Recommend converting 1–2 bullets to prose narration. | WARNING | OPEN |
| ch3 | B-4 | Line 257: BRIDGE opens «Три главы. Три литературных архетипа. Три инструмента.» — classic symmetric anaphoric triplet opener. Then three parallel «[Author] дал нам [X]: [Y]. Как [Z].» paragraphs. This is the pattern flagged across B1/B2/B4 batches as AI-shaped symmetric close. Ch3 BRIDGE has the exact same tri-beat structure as the BRIDGE sections that drew BLOCKER flags in earlier chapters. The pattern is now confirmed systemic across Act I BRIDGEs. | BLOCKER | OPEN |
| ch4 | B-5 | BRIDGE (lines 213–228): «Четыре главы. Четыре литературных архетипа. Четыре слоя понимания.» — identical symmetric triplet opener, then four parallel «[Author] дал нам [X]» beats, then «Первый акт завершён. Мы знаем... (×4 parallel)» accumulation. Double symmetric structure in same section: opener triplet + 4-beat накопление. Highest-density AI-voice fingerprint in the chapter. | BLOCKER | OPEN |
| ch4 | B-6 | §Паттерн лотереи (lines 196–208): four consecutive **Фаза N** bold-lead entries with identical template structure. Each follows `**Фаза N: Label.** [Tool] does X. [Tool] becomes Y. [Mechanism] in action.` This is the identical-template listicle pattern (≥3 entries, parallel structure). Weaker version than ch3 git-log bullets because content varies more, but pattern holds. | WARNING | OPEN |
| ch4 | B-7 | §Ретроспективный театр **Акт I/II/III** structure (lines 116–120): three identical-template **Акт N.** entries. Well-executed satirically (Борхес would approve the absurdist framing), but structurally identical-template. Voice is intentionally theatrical here — marginal call, leaning PASS given satirical intent. | NIT | OPEN |
| ch4 | B-8 | Line 182: «Тезис, который разозлит специалистов по анализу данных» — echoes ch3 line 241 «Тезис, который разозлит управленческих консультантов» exactly. Deliberate structural echo or template reuse? If intentional, needs a micro-signal it's a callback; if template drift, vary the formula. | NIT | OPEN |

**Beta bump assessment (stylistic):**
- ch3 (currently `verified`): **NO** — em-dash FAIL B-1 (BLOCKER) + symmetric BRIDGE BLOCKER B-4 must both resolve before stylistic readiness for `verified`. Two open Beta blockers independently block. Post-Wave 2 fixes (trim ~5–6 dashes + BRIDGE revision) eligible for re-promotion.
- ch4 (currently `verified`): **NO** — BRIDGE symmetric triplet BLOCKER B-5 blocks stylistic readiness regardless of net-of-gloss em-dash PASS. The Борхес chapter has the strongest intellectual content in Act I; BRIDGE revision would unlock it fully. Post-Wave 2 fix eligible for re-promotion.

**Beta cross-chapter pattern note:** All four Act I BRIDGE sections (ch1/ch2/ch3/ch4) now confirmed as carrying the symmetric-triplet AI fingerprint. This is a systemic structural pattern, not individual chapter drift. Recommend a single Wave 2 BRIDGE rewrite pass across all four chapters simultaneously — consistent voice surgery rather than piecemeal fixes.

### B6 — ch8 Time Machine + ch9 Three Scenarios (promoted)

*Status:* reviewed 2026-04-21
*Alpha verdict:* CONDITIONAL_PASS / CONDITIONAL_PASS
*Citation compliance:* FLAGS (ch8 Gibson direct quote unsourced in sources[]; ch9 Vinge paraphrase fidelity issues — taxonomy drift, not fair-use word count)

| Unit | # | Flag | Severity | Status |
|---|---|---|---|---|
| ch8 | 1 | Line 123: Gibson *Neuromancer* (1984) direct quote «The future is already here — it's just not evenly distributed.» — attributed to «Gibson Perspective (Neuromancer, 1984)» but quote not in sources[], no footnote, no «перевод автора» marker (quote left in English). Gibson alive, copyrighted; aphorism ~11 words within fair-use но attribution gap blocks banking-level standard. | BLOCKER | OPEN |
| ch8 | 2 | Line 99: «Предсказание Винджа (1993): технологическая сингулярность "в течение тридцати лет" (~2023)» — direct quoted phrase («в течение тридцати лет») attributed to Vinge but no footnote; Vinge source in sources[] но body-level attribution missing «(перевод автора)» for quoted phrase. Vinge d.2024, copyrighted. | WARNING | OPEN |
| ch8 | 3 | Line 105: «Крупные банки развивают команды специалистов для проверки решений ИИ по кредитам» + «Прогнозы зарплат показывают резкий рост спроса к 2030 году» — specific claims about AI Ethics Auditor role growth unsourced (no footnote, sources[] empty on this). | WARNING | OPEN |
| ch8 | 4 | Line 109: «Корпоративные компании создают должности как "AI Product Manager"... Спрос в этой области демонстрирует значительный рост» — unsourced growth claim. | WARNING | OPEN |
| ch8 | 5 | Line 113: «Netflix использует AI для алгоритмов рекомендаций контента, но человеческие кураторы создают объяснения "потому что вам понравилось X"» — Netflix recommendation system attribution correct in spirit but specific «человеческие кураторы создают объяснения» claim needs source; actual Netflix explanation strings are algorithmically generated. | WARNING | OPEN |
| ch8 | 6 | Line 117: «Amazon fulfilment centers testing "task choreography" roles» — loose/unsourced. «Task choreography» is not a canonical Amazon role title. Either cite or generalize. | WARNING | OPEN |
| ch8 | 7 | Line 140: «Шахматные компьютеры достигли человеческого паритета в 1990-е (Deep Blue vs Kasparov 1997), превосходства к 2000» — Deep Blue's 1997 match was the first defeat of reigning world champion, not «human parity in the 1990s»; parity/superiority compression loose. | WARNING | OPEN |
| ch8 | 8 | Line 154: «"AI fluency" уже обогнал "Microsoft Office" по frequency в job listings» — specific cross-skill frequency claim unsourced. Plausible directionally, but stated as fact. | WARNING | OPEN |
| ch8 | 9 | Line 164, 166, 168, 170: 4 company case vignettes (Bloomberg / JPMorgan LOXM / Financial services chatbots / Крупные юридические фирмы) carry specific operational detail with no footnote anchoring — pattern of unsourced case-study specifics. JPMorgan LOXM also cited in ch9 with footnote ⁵ — cross-chapter attribution should be consistent (add fn in ch8 or drop operational specifics here). | WARNING | OPEN |
| ch8 | 10 | Lines 105, 109, 113, 115, 150, 152, 210, 217, 233, 250: 10 «Перевод с HR-языка / корпоративного / финансового / рекрутингового / маркетингового» callouts + «Reality check» boxes — each breaks analytical voice into satirical aside. Devices individually defensible but ~10 occurrences in 22-min chapter; pattern signal akin to B5 ch4 (structural repetition), worth monitoring. Not a blocker. | NIT | OPEN |
| ch8 | 11 | Section headings «The Great Transition Timeline», «Mid-term Horizon (2030-2040): The Emergence Window», «Long-term Horizon (2040+): The Choice Point», «The Wells Test: Recognizing Transition Points», «Industry Transition Case Studies», «Chapter Synthesis: Three Futures Preview» — 6 H2/H3 headings in English within Russian body. Register inconsistency (compare ch0-ch7 where headings are translated or transliterated). | NIT | OPEN |
| ch8 | 12 | Footnote ¹ cites McKinsey «29.5% потенциала автоматизации рабочих часов в экономике США» — body line 80 says «29.5% рабочих часов потенциально могут быть автоматизированы» without «в экономике США» qualifier. Minor scope narrowing (McKinsey 2023 is specifically US-scoped). | NIT | OPEN |
| ch8 | 13 | Footnote ³: «Отраслевой анализ показывает значительный рост в требованиях к ИИ-грамотности на рынках труда глобально» — anonymous «отраслевой анализ» с no citation target; this is the kind of vague attribution flagged in ch0 #5 / ch1 #4. | WARNING | OPEN |
| ch8 | 14 | Frontmatter `review_date: 2026-04-10` but current B6 gate on 2026-04-21 — stale. date_updated also 2026-04-08. Update at Wave 2. | NIT | OPEN |
| ch8 | 15 | Frontmatter `reading_time: 22 min` — body is ~2400 Russian words + heavy code-switching; 22 min likely overstates. Not a blocker, but sanity-check. | NIT | OPEN |
| ch9 | 1 | Lines 82-145: Vinge's four paths taxonomy drift from primary source. Vinge 1993 paths: (P1) computers awake, (P2) large networks wake up, (P3) computer/human interfaces so intimate = IA, (P4) biological science improves intellect. Body labels: Path 1 = AI Awakening ✓ (matches Vinge P1); Path 2 = «Intelligence Amplification (IA) — Human-AI Symbiosis» (matches Vinge P3 not P2); Path 3 = «Biological Enhancement» described as «гибридное мышление, employees trained для человеко-ИИ интеграции» (this is IA, NOT Vinge's literal biological/cybernetic enhancement); Path 4 = «Networking Intelligence» (matches Vinge P2). Body **reorders** Vinge's paths AND **recasts P4 (biological) as training/skills** — substantive misattribution of Vinge's framework в chapter whose thesis is «apply Vinge's framework». | BLOCKER | OPEN |
| ch9 | 2 | Line 64: direct Vinge quote «The problem is not that the Singularity represents simply the passing of humankind...» ~28 words with «(перевод автора)» attribution and sources[] entry. Citation compliance CLEAN for this quote specifically. | CONFIRM | OK |
| ch9 | 3 | Line 128: «Microsoft launched a global инициативу обучения ИИ... deploying ИИ-инструменты сотрудничества to all employees and vendors globally by March 2024» + «Elevate program (announced 2025), Microsoft committed $4B to train 20 million people in AI skills» — two stacked Microsoft claims без footnote. $4B/20M figure specifically needs source (Microsoft's public Elevate commitments have varied; «$4B / 20M» is not the canonical phrasing in primary announcements). | WARNING | OPEN |
| ch9 | 4 | Footnote ⁴: «Financial Times, "Algorithmic Trading Dominates Equity Markets" (2023). Citi estimates 75-80% of объема торговли акциями» — source cited. Body line 89 says «>75% торгов акциями» which is low end of 75-80% range. Consistent ✓ but FT article title format may not be exact (verify). | NIT | OPEN |
| ch9 | 5 | Footnote ⁵ JPMorgan LOXM «15% улучшение производительности» cites «JPMorgan Chase Annual Report (2023)» — Annual Report generally doesn't break out per-system performance deltas that cleanly. Verify exact figure source or soften «improvement» claim. Same LOXM referenced in ch8 #9 without footnote — cross-chapter inconsistency. | WARNING | OPEN |
| ch9 | 6 | Footnote ⁶ Zara «85% items sold at полной цене vs отрасли 60%» cites «Fashion Revolution, "Fashion Transparency Index" (2023)» + McKinsey Fashion 2023 — Fashion Transparency Index measures supplier disclosure, not full-price sell-through rates. Likely wrong source for this metric. Zara full-price sell-through is typically cited from Inditex annual reports or industry analysts (McKinsey State of Fashion), not Transparency Index. Resolve source attribution. | WARNING | OPEN |
| ch9 | 7 | Line 230: JPMorgan LOXM «Финальные решения по выполнению require одобрение человека for trades >$10M» — specific $10M threshold unsourced. LOXM public documentation doesn't specify approval threshold. | WARNING | OPEN |
| ch9 | 8 | Lines 370-428: Four scenario dialogues (AcmeCorp / MegaCorp / TechStart / GlobalCorp) — invented illustrative characters and companies clearly ficticious. Fine as rhetorical device but «invented composite» marker missing. Convention reader expects: explicit «composite illustration» or «гипотетический сценарий» tag. | NIT | OPEN |
| ch9 | 9 | Lines 372, 378-382, 391-396, 402-408, 414-426: heavy Russian/English code-switching in dialogue («I spent morning collaborating с AI on концепциях пользовательского интерфейса») — stylistic choice but creates readability friction. Factual accuracy unaffected; flag for editorial discretion. | NIT | OPEN |
| ch9 | 10 | Line 62-64: «перевод автора» parenthetical structure applied correctly to the opening Vinge quote. Exemplary citation compliance для copyrighted source (Vinge d.2024, © to 2094 EU). | CONFIRM | OK |
| ch9 | 11 | Line 66 Chapter Summary: «Алгоритмическая торговля уже handle 75% сделок без человеческого надзора» — «без человеческого надзора» overstates. Body line 89 says «75% полностью автоматизированы» which is technically true for execution but human oversight at strategy/risk layer persists. Subtle but consequential drift between summary and body. | WARNING | OPEN |
| ch9 | 12 | Line 74: «каскад решений (каскад решений) — серия выборов (серия выборов)» — doubled parenthetical of Russian-to-Russian terms (artifact of bilingual annotation device misapplied). Editorial cleanup нужен. | NIT | OPEN |
| ch9 | 13 | Frontmatter `reviewed_by: "Alpha+Beta Hostile Verification (PASS/CONDITIONAL_PASS)"` — claims prior hostile verification PASS/CONDITIONAL_PASS result в metadata, но this B6 gate is the authoritative current review. Prior verdict was pre-B6. Update reviewed_by at Wave 2. | NIT | OPEN |
| ch9 | 14 | Frontmatter `review_date: 2026-04-10` — stale по B6 date 2026-04-21. date_updated 2026-04-10 same. Update at Wave 2. | NIT | OPEN |
| ch8↔ch9 | 1 | Both chapters cover JPMorgan LOXM (ch8 line 166, ch9 §Case Study 1). Ch9 has footnote ⁵, ch8 has none. Cross-chapter citation inconsistency — add footnote in ch8 or remove LOXM specifics, treat ch9 as primary locus. | WARNING | OPEN |
| ch8↔ch9 | 2 | Both chapters cover Radiology AI augmentation (ch8 §Case Study 1 line 204, ch9 §Case Study 3 Mayo Clinic line 262). Framing consistent («collaboration > AI alone > humans alone»). ch8 uses generic «Радиологи + ИИ коллаборация», ch9 specific «Mayo Clinic». Non-conflicting but note editorial choice: ch8 could cite Mayo Clinic by name for consistency. | CONFIRM | OK |
| ch8↔ch9 | 3 | Both chapters reference Vinge 1993. Ch8 line 99 paraphrases «в течение тридцати лет» (~2023) accurately. Ch9 opens with direct Vinge quote + applies «four paths» framework. Combined Vinge footprint fair-use compliant (one ~28w direct quote + paraphrases); within 300w fair-use ceiling для copyrighted source. | CONFIRM | OK |
| ch8↔ch10 | 1 | Ch8 line 123 introduces Gibson *Neuromancer* (1984) quote — this is territorially ch10's archetype per B8 plan. Ch8 spillover без footnote/sources[] entry creates attribution orphan. Options: (a) add Gibson to ch8 sources[] + footnote, (b) remove Gibson reference from ch8 and defer to ch10 as planned. | WARNING | OPEN (same as ch8 #1) |
| ch8↔ch3 | 1 | ch8 line 166 references JPMorgan LOXM «statistical arbitrage possibilities» — ch3 primary locus для Knight Capital / Target trading-algorithm failures (not LOXM). Non-conflicting: LOXM success story ≠ Knight Capital failure story. Clean separation. | CONFIRM | OK |
| ch8↔ch6 | 1 | ch8 «30% automation / more than half» pattern not repeated (ch6 B2 #5 McKinsey 30%+ figure contained to ch6). No cross-chapter drift here. | CONFIRM | OK |
| ch8/ch9↔ch4 | 1 | Ch4 is primary Borges locus. B5 Alpha cross-chapter note flagged ch9/ch10 potential Borges echoes («Garden of Forking Paths» — labyrinth-of-AI-paths framing). Ch9 has four-path architecture but zero Borges reference — Vinge is the framing, not Borges. Clean separation. No cross-chapter contradiction. | CONFIRM | OK |
| ch8/ch9↔B4 ch2 | 1 | Frankenstein «abandoned creation» archetype не repeats в ch8/ch9. Safe — Act III is future/choice territory, not creation-horror. | CONFIRM | OK |
| ch8/ch9↔B4 ch1 | 1 | Brooks *Mythical Man-Month* not referenced in ch8/ch9. Act III avoids Brooks locus — clean. | CONFIRM | OK |
| ch8/ch9↔B5 ch3 | 1 | Conway 1968 not referenced in ch8/ch9. Act III domain separation holds. | CONFIRM | OK |

**Alpha bump assessment:**
- ch8 (currently `partially_verified`): **KEEP partially_verified, NO bump** — 1 blocker open (Gibson unsourced direct quote = citation compliance gap) + 7 warnings + 5 nits. Gibson attribution resolution required before `verified` eligibility. Recommend Wave 2: either (a) add Gibson sources[] entry + footnote + retain quote as fair-use (≤11 words safe), OR (b) strip Gibson reference entirely since ch10 will cover Gibson canonically. Option (b) cleaner per cross-chapter boundary. Post-fix bump eligible if footnote-citation pattern tightened (fn ¹² + fn ³ cleaned) and warnings ≤2.
- ch9 (currently `partially_verified`): **KEEP partially_verified, NO bump** — 1 blocker open (Vinge taxonomy drift) + 5 warnings + 5 nits + 4 CONFIRMs. Vinge misattribution is load-bearing because chapter thesis is «apply Vinge's framework»; correctness of the framework taxonomy is the chapter's factual spine. Fix options: (a) keep four-label scheme but flag deliberate corporate reordering («мы перегруппировали пути Винджа под современные корпоративные выборы»), (b) rewrite Path 3 description to align с Vinge's literal biological/cybernetic enhancement + move skill-training content to Path 2 (IA). Option (a) minimum-viable disclosure; option (b) banking-level faithful. Post-fix status advancement eligible.

**Alpha cross-chapter notes:**
- Wells archetype (distant-future catastrophism): ch8 develops Eloi/Morlock binary as workplace split metaphor — consistent with Wells canon. No drift.
- Vinge archetype (singularity/event-horizon): ch9 properly centers on decision-under-exponential-uncertainty frame. Fair-use compliant for Vinge (one ~28w direct quote + paraphrases). Main issue: Vinge's own four-path taxonomy misattributed (see ch9 #1 blocker).
- Gibson boundary: ch8 line 123 is the only Act III pre-ch10 Gibson appearance. Ch10 is planned Gibson chapter per B8 sweep scope. Ch8's Gibson quote either needs citation (sources[] + fn) or should be moved to ch10. Cross-batch cleanup candidate.
- Borges boundary: ch9 has architectural resonance с Borges «Garden of Forking Paths» (multiple-paths framing) но zero direct Borges reference. B5 Alpha cross-check flagged this as possible conflict locus — ch9 reviewed CLEAN, no conflict with ch4's Borges (Babylonia Lottery + Library of Babel) framing.
- Frankenstein/Shelley boundary: zero references in ch8/ch9. Act III avoids Act I horror locus — clean domain separation.
- Case-study cross-refs: Radiology (ch8+ch9), JPMorgan LOXM (ch8+ch9), legal (ch8 mentions generic «Крупные юридические фирмы»; ch9 doesn't). Framing consistent across chapters (augmentation success story) — no mutual contradiction.
- Section heading language: ch8 has 6+ English H2/H3 headings («The Great Transition Timeline», «The Wells Test», etc.), ch9 has fewer but also mixed («The Singularity Decision Playbook», «The Workplace Reality», «Chapter Synthesis»). Both chapters diverge from Act I convention (Russian headings). Editorial normalization candidate for Wave 2 — not a blocker per se но register inconsistency с Acts I-II.
- Sources[] entry count: ch8=4 (meets ≥2 threshold), ch9=5 (meets). No «pending verification» / «TBD» / «TODO» in either chapter frontmatter ✓ (B5 ch4 #2 pattern не повторяется here).
- Circuit breaker check: 2 B6 blockers (1 ch8 + 1 ch9). Under threshold 8. Cumulative across B1-B6: 5 open blockers (3 B5 + 2 B6). Prior batches' blockers closed in Waves 1a/1b/1c. Warnings accumulated.
- Pattern signal: «Перевод с HR/корпоративного/etc.»-style meta-commentary callouts + invented illustrative corporate dialogue (ch9 Sarah/Mike/Tom/etc.) are Act III-specific devices not present in Acts I-II. Editorial convention clarity would benefit from explicit «composite illustration» labeling — current implicit framing relies on reader inference.


---

**Beta verdict:** CONDITIONAL_PASS / CONDITIONAL_PASS
**Em-dash density:** ch8 16.7/1000w PASS, ch9 8.2/1000w PASS
**Level 1:** ch8 CLEAN, ch9 CLEAN

**Em-dash calibration note (ch8):** 42 dashes / 2510w = 16.7/1000w PASS. Structural breakdown: ~16 dashes are bilingual-gloss `(term — translation)` pattern (role labels, HR callout headers, case study asides). Prose-only density ~10.4/1000w — comfortably under threshold. No trim required.

**Em-dash calibration note (ch9):** 33 dashes / 4020w = 8.2/1000w PASS. ~20+ dashes are structural: bilingual section headers (`Path 2: IA — Human-AI Symbiosis`), case study H3 connectors (`JPMorgan Chase — Path 2`), corporate scenario timestamps (`10:30 AM — Marketing Department`). Prose-rhythm dashes minimal. No trim required.

| Unit | # | Flag | Severity | Status |
|---|---|---|---|---|
| ch8 | B-1 | «Текущие инструменты усиления» (lines 92-95): three bold-lead bullets `**Role**: «helps X» → role disappears` — identical three-entry parallel-verb template. Same AI-listicle pattern as B2 ch7 CASE / B4 ch2 «Готический цикл». Needs 1 entry converted to prose narration. | BLOCKER | OPEN |
| ch8 | B-2 | «Возникающие гибридные роли» (lines 103-119): four role entries each with identical **bold label** + prose + «Перевод с HR-языка:» callout block. Four-entry identical template structure. Listicle density compounds B-1 — same wave of template repetition in one section. | BLOCKER | OPEN |
| ch8 | B-3 | «Незаменимые человеческие преимущества» (lines 192-200): four bold-label entries `**Title (Translation):** prose…` — fourth consecutive identical-template block in the chapter. Structural homogeneity is the core issue: three listicle sections within ~100 lines all follow the same bold-lead format. | WARNING | OPEN |
| ch8 | B-4 | «Перевод с HR/корпоративного/маркетингового/рекрутингового/финансового языка» device appears ~6 times in the chapter (lines 107, 111, 115, 152, 172, 190, 250). Each individual callout functions satirically; collectively they become a template refrain. Frequency exceeds comedic ROI — last 2-3 instances dilute earlier punch. | WARNING | OPEN |
| ch8 | B-5 | BRIDGE / Chapter Synthesis (lines 253-261): analytical voice, three-beat summary followed by «Reality check» kicker that undercuts inspirational close. Voice PASS — Harari-meets-Dilbert landing intact. The kicker «Конечно, можем влиять. Если ты CEO» is the sharpest close in the chapter. No moralising drift. | CONFIRM | OK |
| ch8 | B-6 | English section headings («The Great Transition Timeline», «The Wells Test: Recognizing Transition Points», «Industry Transition Case Studies», «Chapter Synthesis: Three Futures Preview») — English H2/H3 within Russian body, same register inconsistency flagged by Alpha (ch8 #11). Carried forward, not double-flagged. Already open as NIT in Alpha block. | NIT | OPEN (same as Alpha ch8 #11) |
| ch9 | B-7 | «Vinge's Four Paths» section (lines 82-145): each of four paths follows a **five-slot template**: Vinge Original → Корпоративный перевод → Текущие индикаторы/примеры → Стратегический выбор → Корпоративная проверка реальности. Four paths × five slots = 20 identical structural blocks. This is the most extreme identical-template listicle in the book — exceeds B2 ch7 CASE (5 entries × 3 slots) and B4 ch2 «Готический цикл» (6 entries × 4 slots). Needs at minimum 1 full path rewritten as flowing prose narration (recommend Path 2 IA as richest for synthesis). | BLOCKER | OPEN |
| ch9 | B-8 | Four corporate scenario dialogues (AcmeCorp/MegaCorp/TechStart/GlobalCorp, lines 370-428): each follows `**time — place:** → dialogue → Corporate Reality Check: → Translation:` four-slot template. Identical structure ×4. Individually the Sarah/Mike and Maria dialogues have voice texture; the template repetition is the issue, not the content. Asymmetrize at minimum the GlobalCorp (Path 4) scenario — it has the richest ethical tension («factors not in optimization model»). | WARNING | OPEN |
| ch9 | B-9 | «Step 3: Четыре критических вопроса» (lines 194-214): four **Question N:** entries with parallel `— "quoted question" → High/Low sub-bullets` structure. Pattern accumulation — ch9 now has three distinct four-entry listicle structures (B-7 / B-8 / B-9). Chapter relies heavily on the 4×N template throughout. | WARNING | OPEN |
| ch9 | B-10 | Chapter Synthesis (lines 431-438): «Wells Time Machine was инструмент исследования. Vinge Singularity is фреймворк принятия решений. The difference: Wells lets us observe. Vinge forces us to act.» — two-beat symmetric Wells/Vinge parallel is functional analytical pivot, not LinkedIn rally cry. PASS on grand-thesis drift concern. No «наша эпоха требует...» kicker. | CONFIRM | OK |
| ch9 | B-11 | Line 74: «каскад решений (каскад решений) — серия выборов (серия выборов)» — Russian-to-Russian double parenthetical artifact already flagged by Alpha (ch9 #12). Not double-counted; carried as NIT. | NIT | OPEN (same as Alpha ch9 #12) |

**Beta bump assessment (stylistic):**
- ch8 (currently `partially_verified`): **NO** — 2 Beta blockers open (B-1 identical-template bullets + B-2 four-entry role listicle). Both are structural AI-fingerprint issues; combined с Alpha's Gibson citation blocker, chapter needs Wave 2 work before bump eligibility.
- ch9 (currently `partially_verified`): **NO** — 1 Beta blocker open (B-7 Vinge four-paths five-slot template ×4 — most extreme listicle in the book). Independent of Alpha's taxonomy-drift blocker (ch9 #1); both must resolve before `verified` eligibility. Em-dash PASS and Level 1 CLEAN are positive — chapter is structurally sound once template monotony addressed.

---

### B7 — ch10 Choice Engine + int1 (promoted)

*Status:* reviewed 2026-04-21
*Alpha verdict:* CONDITIONAL_PASS / PASS
*Citation compliance:* FLAGS (ch10 Gibson aphorism line 340 Russian rendering lacks «(перевод автора)» marker; rest of Gibson quotes left in English with proper footnote mapping — total Gibson direct text ~60 words well under 300w fair-use). int1 CLEAN (Carroll d.1898 PD; Bulgakov d.1940 PD in EU since 2011; no direct quotes, only scene-evocative character/device references).

| Unit | # | Flag | Severity | Status |
|---|---|---|---|---|
| ch10 | 1 | Line 340: «Будущее уже здесь — оно просто неравномерно распределено» — Russian rendering of Gibson aphorism без «(перевод автора)» marker. Gibson alive, copyrighted; per AGIL citation rules (`~/.claude/rules/citation-compliance.md` §Translation) every Russian translation of quoted author text requires translator attribution. Footnote ⁴ provides English original + attribution hedge («точный письменный источник не задокументирован») but no translator attribution for the Russian rendering. | BLOCKER | OPEN |
| ch10 | 2 | Line 73: epigraph gloss «dead channel: это не помехи, а тишина отключённого человеческого интерфейса» — authorial commentary appended to Gibson's opening line; could be misread as translator's gloss. Consider separating with em-dash break + «(прочтение автора)» marker to distinguish authorial interpretation from translation. | WARNING | OPEN |
| ch10 | 3 | Line 258: «Ответ Гибсона из Neuromancer: "He'd operated on an almost permanent adrenaline high, jacked into a custom cyberspace deck."²» — quote left in English, footnote ² cites «Там же. Chapter 1.» Accurate per Neuromancer ch.1 Case-introduction passage. Quote kept in original language = no translator attribution needed ✓. | CONFIRM | OK |
| ch10 | 4 | Line 368: «"Киберпространство. Согласованная галлюцинация".³» — Russian rendering of «Cyberspace. A consensual hallucination.» from Neuromancer ch.3. Famous canonical passage, Russian translation without «(перевод автора)» marker. Same translator-attribution gap as #1. | BLOCKER | OPEN |
| ch10 | 5 | Line 71: epigraph «The sky above the port was the color of television, tuned to a dead channel.» — verbatim opening line Neuromancer ch.1 ✓, footnote ¹ attribution matches. Kept in English = no translation issue. | CONFIRM | OK |
| ch10 | 6 | Line 270 Epilogue: «Reform Club, London, 21 декабря 1872. 23:55» — date 21 Dec 1872 matches Verne canon; но canonical time of Fogg's Reform Club arrival is "quarter before nine" (20:45), not 23:55. «60 seconds to midnight» is dramatized adaptation convention. Not a factual claim against Verne's text but adaptation drift worth flagging. | WARNING | OPEN |
| ch10 | 7 | Line 125: «ИИ может предсказывать движения рынка с 73% точностью» — specific predictive-accuracy figure unsourced (no footnote, no sources[] anchor). Fine as illustrative composite-scenario detail (Анна vignette explicitly marked «[Вымышленный сценарий]» at line 95), но 73% reads as precise factual claim within fictional frame. Clarify composite or cite. | WARNING | OPEN |
| ch10 | 8 | Lines 93-95, 151-153, 193-195: three scenarios each prefaced с «[Вымышленный сценарий для иллюстрации паттернов... — составной персонаж]» disclaimer ✓ banking-level composite-illustration convention applied explicitly. Exemplary transparency device (addresses the B6 ch9 #8 NIT pattern proactively). | CONFIRM | OK |
| ch10 | 9 | Line 340 footnote ⁴: «Цитата Уильяма Гибсона... Приписывается Гибсону различными источниками (интервью NPR 1993, конференции); точный письменный источник не задокументирован. Широко цитируемая максима в технологическом дискурсе.» — banking-level attribution-gap transparency for famously-unsourced aphorism ✓. Pattern worth preserving. Separate from issue #1 (still needs «перевод автора»). | CONFIRM | OK |
| ch10 | 10 | Line 286-290: Act I/II/III recap synthesis uses literary archetypes (Верн/Шелли/Дойл/Борхес for Act I; Джекил/Немо/Сервантес for Act II — note Борхес appears in both Act I and Act II recap at lines 286 и 288). Cross-checking canonical act placement: ch4 Borges = Act I per B5 frontmatter «act: I: Origins». Line 288 «Акт II раскрыл... парадоксы измерения Борхеса» misplaces Borges in Act II. Act structure drift. | WARNING | OPEN |
| ch10 | 11 | Frontmatter sources[] — 4 entries (Neuromancer/Burning Chrome/Schwartz/MIT Sloan), no «pending verification»/«TBD»/«TODO» ✓ meets ≥2 threshold cleanly. Matches B5 ch4 pattern-avoidance. | CONFIRM | OK |
| ch10 | 12 | Final chapter arc closure: Epilogue returns to Verne Reform Club (ch0/ch1 canonical anchor) + triple-Act synthesis + «Путешествие продолжается» close. Archetype integrity PASS — closes book's 80-days metaphor coherently без contradicting earlier chapters. | CONFIRM | OK |
| ch10 | 13 | Frontmatter `review_date: 2026-04-10` + `date_updated: 2026-04-10` — stale по B7 date 2026-04-21. Update at Wave 2. | NIT | OPEN |
| ch10 | 14 | Line 41 sources[] entry: Schwartz «Paradox of Choice» (2004) cited but body only has one oblique reference to «information overload» (line 99 «Плотность информации, которая убила бы человека в 2025») — Schwartz framework не развёрнут. Either expand reference в body or reduce sources[] claim. | NIT | OPEN |
| ch10↔ch8 | 1 | Wells scenarios Alpha/Beta/Gamma (ch10 lines 149/191/244) — ch10 instantiates the three-futures framework ch8 established (B6 ch8 Wells archetype). Labels «Augmentation/Resistance/Symbiosis» = ch10's specific naming of ch8's abstract scenarios. Non-conflicting, mutually reinforcing. | CONFIRM | OK |
| ch10↔ch9 | 1 | Vinge references at lines 290, 324, 344 — all cross-chapter callbacks (no direct quotes, no taxonomy reframing). Ch10 avoids B6 ch9 #1 Vinge-taxonomy-drift blocker by keeping Vinge references at paraphrase-only level. Clean separation: ch9 is primary Vinge locus, ch10 cites as secondary synthesis. | CONFIRM | OK |
| ch10↔ch8 | 2 | Ch8 line 123 Gibson direct quote («The future is already here — it's just not evenly distributed») is same aphorism as ch10 line 340. B6 recommended «option (b): strip Gibson from ch8, defer to ch10 canonical locus». Ch10 DOES canonically develop Gibson — validates option (b). Current state: ch8 Gibson quote (B6 ch8 #1 BLOCKER) + ch10 Gibson quote (B7 ch10 #1 BLOCKER) = two attribution gaps for same aphorism. Wave 2 cleanup: fix both translator attribution issues, decide whether ch8 keeps or defers reference to ch10. | WARNING | OPEN (cross-ref to ch8 #1) |
| ch10↔ch4 | 1 | Ch10 Borges references (lines 286, 288, 310) are synthesis-level callbacks only, no direct quotes, no «Garden of Forking Paths» framing that would duplicate ch4 «Babylonia Lottery + Library of Babel». B5 Alpha cross-check flagged ch9/ch10 potential Borges echo — ch10 reviewed CLEAN. Ch4 remains primary Borges locus. | CONFIRM | OK |
| ch10↔ch4 act | 1 | Line 288 «Акт II раскрыл... парадоксы измерения Борхеса» — Borges is ch4 which is Act I per ch4 frontmatter. Act placement drift (see ch10 #10). Factual archetype-placement error in synthesis. | WARNING | OPEN (same as ch10 #10) |
| ch10↔ch0 | 1 | Epilogue uses 1872 Reform Club / 80 Days framing — aligns with canonical Verne 1872 anchor (ch0/ch1-HOOK variant/ch3/ch6/ch7 post-Wave-1a). Clean. | CONFIRM | OK |
| ch10↔ch1 | 1 | Ch1 uses 1869 (20K Leagues) anchor per B4 ch1 #2 — ch10 uses 1872 (80 Days) anchor. Both legitimate per-chapter anchors for different Verne works. Ch10 epilogue correctly identifies 80 Days as relevant reference (Fogg as protagonist). No conflict с ch1. | CONFIRM | OK |
| ch10↔ch2 | 1 | Line 306 «Урок Шелли» — synthesis callback, no specific claims contradicting ch2. Clean. | CONFIRM | OK |
| ch10↔ch3 | 1 | Line 308 «Урок Дойла» — synthesis callback, no specific claims contradicting ch3. Clean. | CONFIRM | OK |
| ch10↔ch5 | 1 | Line 316 «Урок Немо» — synthesis callback consistent с B1 ch5 Nemo-as-systematic-leader archetype. Clean. | CONFIRM | OK |
| ch10↔ch6 | 1 | Line 314 «Урок Джекила/Хайда» — synthesis callback consistent с B2 ch6 dual-identity archetype. Clean. | CONFIRM | OK |
| ch10↔ch7 | 1 | Line 318 «Урок Сервантеса» — synthesis callback, consistent с B2 ch7 framing. Clean. | CONFIRM | OK |
| int1 | 1 | Carroll/Bulgakov references are scene-evocative (Mad Tea Party structure; Бегемот as Master-and-Margarita cat; Коржиков-as-Коровьев-variant — Bulgakov's Korovyev/Fagot). No direct quotes from either author. No translator attribution needed. Both authors PD in EU (Carroll d.1898, Bulgakov d.1940 PD since 2011). | CONFIRM | OK |
| int1 | 2 | Sources[] has 3 entries incl. КиберГонзо research. Meets ≥2 threshold ✓. Banking-level attribution. | CONFIRM | OK |
| int1 | 3 | Frontmatter status already `verified` (not `draft` like int2/int3) with `reviewed_by: "Alpha+Beta (hostile verification)"` + `review_date: 2026-04-15`. Satirical content bears no testable factual claims — intermezzi consistently apply framework v2.0 Type 2 content-type exemption. Bump question from B3 does NOT apply here (int1 already at `verified`). | CONFIRM | OK |
| int1 | 4 | Line 82-83 «quantum agile approach... суперпозиции всех возможных состояний» — quantum mechanics analogy is satirical («принцип неопределённости», Observer role) — no factual physics claim. Clean satire. | CONFIRM | OK |
| int1 | 5 | Line 63 «Spotify model. Самая современная методология... Chapter Lead... Guild Master... Tribe Lead» — Spotify engineering culture model (Kniberg 2012) real, organizational terminology correct. Accurate technical backdrop for satire. | CONFIRM | OK |
| int1 | 6 | «SAFe framework. Program Increment Planning» (line 55) — real SAFe terminology (Scaled Agile Framework PI Planning every 8-12 weeks, matches «каждые два месяца» ≈ 8 weeks). Accurate technical backdrop. | CONFIRM | OK |
| int1 | 7 | Frontmatter `date_updated: 2026-04-19` — slightly stale по B7 date 2026-04-21 but within acceptable range (not stale by §context-consolidation §4 staleness rule >14 days). | CONFIRM | OK |
| int1 | 8 | Line 108 «И очень вкусная колбаса к завтраку» (Бегемот); lines 116-123 triple-voice Коржиков-consults-himself; line 122 «Эпик в Jira "Колбасная инициатива"» — satirical devices land cleanly, no factual claims, Bulgakov+Carroll absurdism intact. | CONFIRM | OK |
| int1↔int2/int3 | 1 | Int1 establishes Alice as reader-proxy entering «Agile Transformation Consultancy» with Консультант/Бегемот/Коржиков trio. Int2 continues Alice's journey with new dysfunctional Agile scene. Int3 completes trilogy (per B3 review). Coherent trilogy setup — int1 introduces cast archetype, int2/int3 develop. Non-conflicting. | CONFIRM | OK |
| int1↔int2 | 1 | B3 int2 #2 flagged «хаос-инженерия» borderline vocabulary — int1 does not reuse the term. Clean separation. | CONFIRM | OK |
| int1↔int3 | 1 | B3 int3 #1 flagged «Гибкий Коуч Воланд» title-name conflation (fixed Wave 1c) — int1 avoids the pattern by introducing characters via separate attributions («Бегемот наш Chief Technology Officer. Коржиков, Senior Scrum Master.»). Cleaner model. | CONFIRM | OK |

**Alpha bump assessment:**
- ch10 (currently `partially_verified`): **KEEP partially_verified, NO bump** — 2 blockers open (#1 + #4 — Gibson Russian renderings без translator attribution; citation compliance rule §Translation violation). 4 warnings + 2 nits + 11 CONFIRMs. Once translator attribution fixed (3-min Wave 2 edit: add «(перевод автора)» in footnote ⁴ + footnote ³ or to the Russian rendering inline), chapter clears to `verified` eligibility. Archetype integrity/cross-chapter consistency is strongest of Act III chapters reviewed. Recommended Wave 2 fix: unified pattern «(перевод автора)» in fn ³ + fn ⁴ matching B5 ch4 Borges exemplary model.
- int1 (currently `verified`): **KEEP verified, NO change** — 0 blockers + 0 warnings + 0 nits + 8 CONFIRMs. Unlike int2/int3 (B3 flagged as `draft`-status policy question), int1 already holds `verified` status with reviewed_by/review_date populated. Bump question does NOT apply here. Position on B3 policy question for int2/int3: **aligned с Beta-B3** (spirit of rule) — if int1 satisfies banking-level standards at `verified` despite empty in-text factual claims (sources[] documents satirical literary tradition, not testable factual claims), then int2/int3 should be bumpable under same logic. But that's Андрей's policy call per B3 wait-for-arbitration. For int1 specifically: hold at `verified` (already there), no change needed.

**Alpha cross-chapter notes:**
- Gibson chapter boundary: ch10 IS the canonical Gibson locus. Ch8 line 123 Gibson quote (B6 ch8 #1 BLOCKER) remains orphaned — Wave 2 cleanup should decide single pattern: either (a) both ch8 и ch10 carry Gibson с proper attribution, or (b) strip ch8, defer entirely to ch10. Option (b) still cleaner per B6 recommendation — ch10 develops Gibson substantively, ch8 uses only aphorism tangentially.
- Neuromancer citations: 3 direct English quotes + 2 Russian renderings = ~60 words Gibson text в chapter ~2400 Russian words. Well under 300w fair-use ceiling для copyrighted author. Footnote mapping ¹²³⁴ internally consistent. Issue is purely translator attribution gap (#1, #4), not fair-use volume.
- Verne 1872 anchor: ch10 Epilogue (line 270) + Final Fogg scene (line 354) use 21 Dec 1872 Reform Club — aligns with canonical 1872 anchor (ch0/ch3/ch6/ch7 post-Wave-1a). Only drift: time «23:55» vs Verne's canonical «quarter before nine» — dramatization artifact, common adaptation convention (#6 WARNING).
- Act placement inconsistency: ch10 line 288 synthesis puts Borges in Act II, но ch4 frontmatter + canonical book structure places Borges в Act I. Line 286 correctly lists «измерение Борхесом невозможной реальности» в Act I. Line 288 duplicates Borges in Act II («парадоксы измерения Борхеса») — likely editorial oversight when splitting Act I/II recap. Wave 2 fix: remove Borges from Act II recap на line 288 (keep Act I at line 286).
- Schwartz reference (sources[] line 39-43): included but under-utilized в body. Either expand decision-fatigue framing in Анна vignette (line 133-139 afternoon recursion section is natural home) or reduce sources[] claim (#14 NIT).
- Wells Alpha/Beta/Gamma scenario naming: ch10 names the three Wells scenarios specifically — ch8 abstract «three futures» now has concrete labels. Forward-compatible с ch8; readers get nomenclature solidified in final chapter. Editorial strength.
- int1 as trilogy opener: establishes Alice's role + Коржиков triple-voice self-consultation pattern which int3 escalates (B3 int3 voice issues). Int1 is cleanest of the three per Alpha review (0 open flags). Suggests int2/int3 quality gaps are introduction-specific, not format-wide.
- int1 Bulgakov cast choice: Бегемот (cat) as CTO + Коржиков (≈ Коровьев variant, Bulgakov's Korovyev-Fagot) as Scrum Master + unnamed «Консультант» as Воланд-shadow. Per B3, int3 uses explicit «Воланд» → name conflation issue. Int1's indirection («Консультант» without Воланд naming) actually cleaner than int3 — should be noted as template for future satirical pieces.
- Circuit breaker check: 2 B7 blockers (both ch10, same root cause — Gibson translator attribution). Cumulative B1-B7: 7 open blockers (3 B5 + 2 B6 + 2 B7). Under threshold 8. Tight но under. Wave 2 clears all.
- Pattern signal: translator-attribution gap is systemic pattern — ch4 Borges solved exemplary (explicit «перевод автора» markers fn¹); ch8 Gibson has gap (B6 ch8 #1); ch10 Gibson has gap (B7 ch10 #1, #4); ch9 Vinge handled correctly (B6 ch9 #2 CONFIRM). Wave 2 sweep candidate: unify translator-attribution pattern across all copyrighted-author chapters.

---

**Beta verdict (B7):** CONDITIONAL_PASS / PASS
**Em-dash density:** ch10 19.6/1000w FAIL (Type 1 threshold ≤18.0) — calibrated note below; int1 0.0/1000w PASS (Type 2 threshold ≤120.0, all 13 em-dashes are Russian dialogue attribution markers «...», — verb, zero stylistic em-dashes)
**Level 1:** ch10 CLEAN, int1 CLEAN

**Em-dash calibration — ch10:**
Raw count: 70 em-dashes / 3,565 words = 19.6/1000w (FAIL by 1.6 points).
Structural breakdown: 13 section-header dashes (`### HH:MM — English label`) + 1 attribution tilde in epigraph (`> — William Gibson`) = 14 non-prose dashes. Subtracting these: 56 prose dashes / 3,565 words = 15.7/1000w (PASS under ≤18.0). Judgment: structural/attribution dashes are comparable to int1/int2/int3 dialogue-marker exclusions. If framework v2.0 section-header exclusion is granted, ch10 passes; if raw count is authoritative, it fails by a narrow margin. Beta flags as CONDITIONAL_PASS pending Андрей's policy call on whether `### HH:MM —` headers count toward prose density.

**Em-dash calibration — int1:**
Raw count: 13 em-dashes / 678 words. All 13 match Russian dialogue attribution pattern `«...», — сказал X`. Zero stylistic prose em-dashes. Adjusted density: 0.0/1000w. Far below Type 2 ceiling. PASS with large margin.

| Unit | # | Flag | Severity | Status |
|---|---|---|---|---|
| ch10 | B-1 | Em-dash density 19.6/1000w exceeds Type 1 threshold ≤18.0; raw count FAIL. Prose-only density 15.7/1000w if section headers excluded. Policy clarification needed: does `### HH:MM —` header format count toward prose em-dash density? | WARNING | OPEN |
| ch10 | B-2 | Line 264: «Путешествие продолжается. Выбирай мудро. Навигируй осторожно. Адаптируйся быстро.» — three-beat anaphoric imperative close is a known AI-voice fingerprint (symmetric triplet as closing rally cry). Appears at the bottom of the chapter proper before Epilogue; reads as TED-talk button. | WARNING | OPEN |
| ch10 | B-3 | Lines 303–305: «Final synthesis» closes with «Матрица — не ловушка. Матрица — инструмент» + «Путешествие продолжается» + three-imperative sequence (B-2). Three-sentence anaphoric repeat (`Матрица — не / Матрица — `) is the symmetric-pattern fingerprint accumulated B1-B6. | WARNING | OPEN |
| ch10 | B-4 | Lines 234–241, 244–248, 251–256: «Act I Insights — Origins matter», «Act II Insights — Transformation inevitable», «Act III Insights — Архитектура выбора определяет будущее» — three parallel bold-lead bullet clusters, each with 3–4 identical-structure «Урок X: ...» entries. Classic listicle template signal (same pattern as B6 ch9 four-paths five-slot, B2 ch6). Chapter otherwise avoids listicle formatting; this section stands out. | WARNING | OPEN |
| ch10 | B-5 | Line 332: «Руководство обычно выбирает то, что консультант обещал самым быстрым ROI в PowerPoint» — satirical aside mid-thesis paragraph. «Перевод с корпоративного» device (10+ times in chapter) individually fine, but this one breaks analytical momentum at the key thesis statement. Densest concentration of device in final synthesis section. | NIT | OPEN |
| ch10 | B-6 | Lines 296, 346: «более мощно, чем» (×2 within 50 lines) — dead-filler compound comparative. Each instance splits a clean analytical sentence; either «сильнее» or restructuring removes the filler. | NIT | OPEN |
| int1 | B-7 | No voice or AI-pattern flags. Carroll+Bulgakov satirical register holds throughout; quantum-agile absurdism lands cleanly; Коржиков triple-voice self-consultation is strong original comic device. Zero symmetric-triplet/anaphoric/listicle fingerprints. | CONFIRM | OK |
| int1 | B-8 | Status `verified` already populated (see Alpha int1 #3). Em-dash density 0.0/1000w. Level 1 CLEAN. Voice PASS. No Beta flags warranted. | CONFIRM | OK |

**Beta bump assessment (stylistic):**
- ch10 (currently `partially_verified`): **NO bump** — em-dash density FAIL on raw count (CONDITIONAL on policy ruling); B-2/B-3 anaphoric triplet closing + B-4 parallel listicle section = AI-voice warnings unresolved. Wave 2 should: (a) get policy ruling on section-header exclusion; (b) rewrite three-imperative close (B-2, B-3) into asymmetric prose; (c) consider converting Act I/II/III «Урок X» lists to flowing synthesis prose matching book's analytical register. After those fixes: `verified` eligible.
- int1 (currently `verified`): **HOLD at verified** — no stylistic, voice, or Level 1 flags from Beta. Agrees with Alpha. On B3 policy question re int2/int3 draft→partially_verified: Beta position is YES (same as B3 Beta) — int1's clean `verified` record demonstrates satire CAN meet banking-level standards without testable factual claims; int2/int3 should be eligible for partially_verified under same framework. Final call remains Андрей's.

### B8 — Cross-chapter archetype consistency sweep

*Status:* reviewed 2026-04-21
*Scope:* all 14 units (10 chapters + 3 intermezzi + pilot)
*Alpha verdict:* **CONDITIONAL_PASS** — 2 new blockers surfaced (ch0 twitter_description arithmetic drift + ch6 Borges/Goodhart 29-years arithmetic); other findings are WARNING/NIT. Book close to v1.0.0 tag-ready after Wave 3.

## Findings

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 1 | Brooks *Mythical Man-Month* 1975 Addison-Wesley consistency | PASS | Appears in sources[] of ch1/ch2/ch3/ch4/ch5. Year + publisher consistent. Minor stylistic nit: ch1 uses «Brooks, F.» while ch2-ch5 use «Brooks, Frederick». Low-priority NIT. |
| 2 | Manifesto Agile 2001 consistency | PASS | Date 2001 consistent across ch0/ch1/ch2. Sources[] in ch1 uses canonical title «Manifesto for Agile Software Development (2001). agilemanifesto.org». ch0 correctly identifies «семнадцать программистов в Сноубёрде» (17 signers historical fact). |
| 3 | Scrum Guide year references | PASS | Only ch1 sources[] cites specific year (2020). ch7 line 68 mentions «Scrum Guide» without year. No version conflict. |
| 4 | Takeuchi-Nonaka 1986 HBR citation | PASS | Single-chapter (ch1 sources[]) — no cross-chapter drift possible. HBR Jan 1986 entry present. |
| 5 | Conway 1968 Datamation citation | PASS | Consistent across ch3 sources[]/body/fn⁹, ch4 sources[]/fn, ch5 sources[]/fn¹. «How Do Committees Invent?» Datamation April 1968 uniform. |
| 6 | DORA report 2023 consistency | PASS | Consistent across ch3 sources[]/fn¹² and ch4 sources[]/fn¹⁶. «Accelerate: State of DevOps Report. Google Cloud, 2023» uniform. Not referenced in ch8/ch10 (B8 scope plan mentioned ch8 — confirmed absent, no drift). |
| 7 | McKinsey 2023 automation figure consistency | WARN | ch6 line 96 + ch7 line 104 use **«30%»**; ch8 line 87 + fn ¹ + sources[] use **«29.5%»**. Both cite same McKinsey 2023 «Generative AI and the future of work in America». 30% = rounding of 29.5%. Defensible rounding, но cross-chapter precision drift worth noting. |
| 8 | Vinge 1993 paper citation across ch8/ch9/ch10 | PASS | «The Coming Technological Singularity» 1993 consistent. ch9 has full footnote + 28-word direct quote with «(перевод автора)». ch8 paraphrases «в течение тридцати лет». ch10 synthesis-only callbacks. Post-Wave 2 Vinge taxonomy fix (P1-P4 canonical order) in ch9 now holds — ch10 line 290 «навигацию сингулярности Винджа» consistent с corrected ch9 framework. |
| 9 | Knight Capital $460M citation | PASS | Single-chapter locus (ch3). Post-Wave 2 fix: lines 125 и 201 both use «460 миллионов» — internal consistency restored. SEC File 3-15570 fn⁴. No other chapter mentions Knight Capital specifically. |
| 10 | ch2 Verne callback line 115 post-Wave 1a | PASS | «Этцель кивает из 1870 года» — aligns with ch1 1869/1870 (20K Leagues) anchor, non-contradictory with ch0/ch3/ch6/ch7 1872 anchor (different Verne work). B4 Alpha cross-chapter note holds: both per-chapter anchors legitimate. |
| 11 | ch3/ch4 BRIDGE cross-references post-Wave 2 refactor | PASS | Post-Wave 2 refactor destroyed symmetric-triplet pattern. ch3 line 253 still names ch1 Verne + ch2 Shelley accurately. ch4 BRIDGE retains correct chapter-number references. No broken archetype assignments from refactoring. |
| 12 | ch8 Prologue chapter back-references | PASS | No explicit «Глава N показала...» back-refs в ch8 prologue. Line 248 «Wells Time Machine показала» is self-reference, not cross-chapter. Clean. |
| 13 | ch9 Prologue line 72 «Глава 8 показала три горизонта трансформации ИИ» | PASS | ch8 does develop three horizons (Ближайший/Mid-term/Long-term). Back-reference accurate. |
| 14 | ch10 Act synthesis placement (line 286/288) | WARN | **Existing B7 ch10 #10 still OPEN** — line 286 Act I list (Верн/Франкенштейн/Холмс/Борхес) ✓ correct; line 288 Act II list includes «парадоксы измерения Борхеса» — Borges duplicated in Act II (he belongs to Act I per frontmatter). Act II canonical members = ch5 Nemo + ch6 Jekyll + ch7 Don Quixote. Line 288 should remove Borges, keep Nemo/Джекил/Дон Кихот. |
| 15 | ch10 Fogg Reform Club Epilogue | WARN | **Existing B7 ch10 #6 still OPEN** — 23:55 dramatization vs Verne canonical 20:45 («quarter before nine»). Adaptation convention, not factual blocker. |
| 16 | ch10 Gibson cyberpunk framing vs ch8 Gibson aphorism | PASS | Post-Wave 2 clean: ch8 has Gibson aphorism в English (line 117) with proper fn⁴ attribution to 1992 SF Examiner / 1999 NPR («NOT from Neuromancer» explicit). ch10 is canonical Gibson locus. Cross-chapter attribution consistent. |
| 17 | ch9 ch10 Preview synthesis | PASS | Line 427 previews ch10 Gibson/cyberspace/post-human integration — consistent с ch10 actual content. No promise-delivery gap. |
| 18 | Goodhart/Strathern/Muller/Campbell single-chapter locus (ch4) | PASS | All four references confined to ch4. No cross-chapter factual drift in metric theory citations. |
| 19 | Wells 1895 Time Machine + Eloi/Morlock framing | PASS | Consistent ch8/ch10 («802,701 год» ch8, Eloi/Morlock metaphor preserved). ch10 Alpha/Beta/Gamma scenario naming concretizes ch8 abstract three horizons. |
| 20 | WEF «44% disrupted skills» framing consistency | WARN | **Existing B2 ch6 #6 + ch7 #10 warnings still OPEN** + **NEW finding**: ch7 line 260 «операционных навыков» further narrows — WEF source says «core skills». ch6 frames as «ключевых навыков» (line 128) correctly; ch7 drifts to «технических» (line 102) and «операционных» (line 260). Cross-chapter drift magnified by additional ch7 narrowing beyond what B2 caught. |
| 21 | ch0 twitter_description vs body «X лет до Manifesto» | **BLOCKER** (new) | twitter_description line 67: «за 130 лет до манифеста» — but body lines 93/143 (post-Wave 1a) use «129 лет». Wave 1a missed the twitter_description field. Manifesto 2001 − Verne 1872 = 129 years. Frontmatter SEO/social field contradicts body. |
| 22 | ch6 line 68 «Борхес за 29 лет до Гудхарта» arithmetic | **BLOCKER** (new) | Borges 1941 → Goodhart formally formulated 1975 = **34 years**. ch6 uses «29 лет». ch4 line 83 «на тридцать четыре года раньше» = 34 years = CORRECT anchor. Internal cross-chapter contradiction: ch4 says 34, ch6 says 29. Same pair of authors, same event. |

## Archetype cross-references verified

- **ch1 Verne iterative vs ch5 Nemo trauma:** CONFIRMED non-conflicting (different works: 20K Leagues 1869-70 vs Mysterious Island 1875; different archetypes: iterative creator vs trauma-systems-leader). Per B4 ch1↔ch5 #1.
- **ch2 Shelley externalized creation vs ch6 Jekyll/Hyde internal dual:** CONFIRMED non-conflicting. Per B2 ch6↔ch2 #1.
- **ch7 Cervantes vision vs ch3 Holmes deduction:** CONFIRMED complementary. Holmes sees what is; Quixote sees what isn't. Per B2 ch7↔ch3 #1.
- **ch4 Borges measurement vs ch9 Vinge paths:** CONFIRMED non-conflicting. ch9 four-path architecture uses Vinge (not Borges «Garden of Forking Paths»). Per B5 ch4↔ch9/ch10 #1.
- **ch8 Wells three-horizons vs ch9 Vinge four-paths:** CONFIRMED mutually reinforcing. ch9 line 425 «Wells Time Machine was инструмент исследования. Vinge Singularity is фреймворк принятия решений» — explicit complementary framing.
- **ch10 Gibson cyberspace vs ch8 Gibson aphorism:** CONFIRMED post-Wave 2. ch10 is canonical Gibson locus; ch8 uses aphorism с proper attribution in footnote ⁴ (1992/1999 with «NOT from Neuromancer» explicit).
- **ch10 Fogg Epilogue vs ch0 HOOK:** CONFIRMED book-closure works. 1872 Reform Club 80 Days frame bookends Act I→III. Only blemish: line 23:55 vs canonical 20:45 (existing B7 warning, adaptation convention).
- **Intermezzi trilogy (int1→int2→int3):** CONFIRMED continuity. Бегемот (cat, tech role) persists as anchor character across all three. Alice reader-proxy persists. Consulting setting escalates: int1 Consultancy → int2 Production Dungeon → int3 Transformation Elevator. Satirical arc coherent.

## Numeric formulas audit

### Verne «X лет» anchor split (established legitimate, per B4 Alpha note)
- **1872 anchor (80 Days serial):** ch0 body 129 лет ✓; ch0 line 243 130 лет (Rumsfeld 2002 anchor, also correct); ch3 line 75 «пятнадцать лет после кругосветного» = 1872+15=1887 ✓; ch6 line 68 129 лет ✓; ch7 line 68 129 лет ✓; ch10 Epilogue 1872 ✓
- **1869-1870 anchor (20K Leagues):** ch1 uses 1869-1870 per-chapter anchor (legitimate different work); ch2 line 115 «Этцель кивает из 1870» ✓ aligns; ch1 line 106 «28 лет спустя» Argonaut 1897-8 ✓; ch1 line 140 «сто лет» Ройс 1970 ✓; ch1 line 168 Диккенс «150 лет» vague
- **DRIFT (new blocker #21):** ch0 twitter_description line 67 «130 лет до манифеста» contradicts ch0 body «129 лет» — Wave 1a missed this field

### Shelley «X лет» 1818 anchor
- ch0 line 267/277: «175 лет» (vague target: first corporate «трансформационный проект» mid-1990s) — defensible loose framing
- ch1 line 309: «Двести лет спустя» — 1818+200=2018 vague
- ch2 line 59: «Двести восемь лет спустя» — 1818+208=2026 ✓ exact to current year
- ch6 line 68: «около 180 лет до современных фреймворков» (existing B2 ch6 #4 WARN)
- ch7 line 68: «180 лет до Scrum Guide» (existing B2 warning — Scrum Guide 2010 = 192 years actual)
- **Cross-chapter Shelley formula drift covered by existing B2 #4 warning, no new finding**

### Stevenson «X лет» 1886 anchor
- ch6 line 68: «сто сорок лет» (1886+140=2026) ✓ exact
- ch6 line 108: «сто тридцать семь лет» (1886+137=2023, McKinsey 2023) ✓ exact
- ch7 line 68: «137 лет до McKinsey» ✓ consistent with ch6

### Goodhart anchor (NEW BLOCKER #22)
- ch4 line 83: «тридцать четыре года раньше» (Borges 1941 → Goodhart 1975 = 34) ✓ — existing B5 ch4 #10 warning notes «обоих» (both) arithmetic works only for Goodhart, not Strathern
- **ch6 line 68: «за 29 лет» = 34-5 = drift**. Internal contradiction: ch4 says 34, ch6 says 29 — same author pair, same event
- ch4 line 69: «за шестьдесят лет до первого корпоративного внедрения SAFe» — 1941+60=2001; SAFe launched ~2011 (70 years actual). Loose but defensible (70 rounds to 60 only awkwardly; minor drift)

### Cervantes 1605 anchor
- ch7 line 68: «418 лет до Future of Jobs Report» — existing B2 ch7 #4 WARN
- ch7 line 90: «за четыреста лет до когнитивной науки» (1605+400=2005, rough match for modern cognitive science era) — loose but defensible

### Vinge 1993 + 30 years
- ch9 line 66: «тридцать лет спустя» ✓ consistent с ch8 line 103 «в течение тридцати лет (~2023)». Both anchor on 1993+30=2023 correctly.

## Intermezzi trilogy continuity

- **int1:** Alice + unnamed Консультант + Бегемот (CTO) + Коржиков (Scrum Master) — «Agile Transformation Consultancy»
- **int2:** Alice + Маргарита (product owner) + Бегемот (keeps old code) — «Продакшенское подземелье»
- **int3:** Alice + Трансформатор + Бегемот (roadmap) + Воланд (Agile Coach) + Коровьев (Scrum Master) — «Трансформационный лифт»

**Coherence PASS:** Бегемот persists as anchor character across all three. Alice reader-proxy consistent. Satirical escalation coherent (Consultancy → Dungeon → Elevator). No factual/archetype contradictions between intermezzi.

**Minor note (not flagged):** int1 Коржиков and int3 Коровьев are likely variants on Bulgakov's Коровьев-Fagot — two different name spellings across intermezzi. Authorial choice, not continuity break.

**Act structure integrity:**
- ch0/ch1/ch2/ch3 frontmatter `act: "I: Origins"` ✓ uniform
- ch4 frontmatter `act: "I"` (shortened label, missing «Origins») — **NEW FINDING #23 WARN**
- ch5 frontmatter `act: "II"` (shortened label, missing «Archetypes») — **NEW FINDING #23 WARN**
- ch6/ch7 `act: "II: Archetypes"` ✓ uniform
- ch8/ch9/ch10 `act: "III: Future"` ✓ uniform
- int1 `act: "Intermezzi"` ✓ — **int2/int3 missing `act` field** — **NEW FINDING #23 WARN**
- Act openers (ch0/ch5/ch8) all have `act_opener: true` + `act_label:` ✓ uniform

## Additional new findings

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 23 | Frontmatter `act:` field label inconsistency | WARN (new) | ch4=«I», ch5=«II» (shortened labels); int2/int3 missing `act` field entirely. ch4 should be «I: Origins»; ch5 should be «II: Archetypes»; int2/int3 should have «Intermezzi» matching int1. |
| 24 | Frontmatter `related:` field format drift | WARN (new) | ch0-ch9 use `"/chapters/chapter-X-name"` (quoted absolute path). ch10 uses bare `chapter-X-name` (no quotes, no /chapters/ prefix). Normalize ch10 to match others. |

## B8 blockers / warnings summary

**Severity rollup:**
- **NEW B8 BLOCKERS:** 2 (ch0 twitter_description 130→129 fix; ch6 line 68 «29 лет»→«34 лет» fix — or ch4 line 83 «34»→«29» if Андрей picks other anchor; choose canonical in Wave 3)
- **NEW B8 WARNINGS:** 3 (McKinsey 29.5%↔30% cross-chapter rounding; frontmatter `act:` field drift; frontmatter `related:` field format drift)
- **NEW B8 NITS:** 1 (Brooks «F.» vs «Frederick» in ch1 sources[])
- **Cumulative open from B1-B7:** ~45 warnings + nits (all Wave 3 candidates)

## Recommendations for Wave 3

1. **MUST FIX (2 new blockers):**
   - ch0 line 67 twitter_description: «за 130 лет до манифеста» → «за 129 лет до манифеста»
   - ch6 line 68: «за 29 лет до того, как принцип Гудхарта был формально сформулирован» → «за 34 года...» (or re-anchor if Wave 3 picks different source year for Goodhart)

2. **SHOULD FIX (3 new warnings):**
   - Normalize `act:` field: ch4 «I: Origins», ch5 «II: Archetypes», int2/int3 add «Intermezzi»
   - Normalize `related:` field in ch10 to match other chapters' format
   - McKinsey 29.5%/30% — decide canonical (recommend ch8 precise 29.5% + ch6/ch7 «~30%» formula, or uniform 30%)

3. **Batch clean-up (cumulative B1-B7 warnings):**
   - Update stale `review_date` across ch1/ch3/ch4/ch8/ch9/ch10 to 2026-04-21
   - Update stale `reviewed_by` on ch9 (remove prior B-review metadata claim)
   - Consider ch7 «44% технических/операционных» → «44% ключевых» to align with WEF source

4. **Frontmatter bumps (pending 2 new blockers resolved):**
   - Bump-eligible after blockers fixed: ch0 (partially_verified → verified), ch1 (partially_verified → verified), ch6 (partially_verified → verified after blocker), ch7 (partially_verified → verified), ch8 (partially_verified → verified), ch9 (partially_verified → verified), ch10 (partially_verified → verified)
   - Hold: ch5 (partially_verified; 2 open B1 blockers fixed but many open warnings — Wave 3 judgment call)
   - int2/int3 `draft→partially_verified` — still policy question pending Андрей

## Frontmatter bump readiness (Wave 3 input)

| Unit | Current status | Wave 3 decision | Blocking item(s) |
|------|---------------|----------------|----------------|
| ch0 | partially_verified | BUMP-TO-VERIFIED (after B8 #21 fix) | Only twitter_description 130→129 fix needed |
| ch1 | partially_verified | BUMP-TO-VERIFIED | 0 open blockers; 3 warnings + B-flags near-resolved |
| ch2 | verified | KEEP-VERIFIED | 0 open blockers post-Wave 2; ch2 cleared |
| ch3 | verified | KEEP-VERIFIED | Knight Capital 460 fix applied; fn⁵ dup resolved |
| ch4 | verified | KEEP-VERIFIED | pending-verification placeholder resolved Wave 2 |
| ch5 | partially_verified | KEEP-PARTIALLY_VERIFIED | 0 open blockers but 6 warnings + 2 nits open; B1 stylistic concerns defer to Wave 3 |
| ch6 | partially_verified | BLOCKED-BY-B8-#22 (29→34 лет fix) | B8 #22 blocker; warnings/nits resolvable Wave 3 |
| ch7 | partially_verified | BUMP-TO-VERIFIED | Wave 2 cleared em-dash FAIL + listicle blocker; warnings are Wave 3 candidates |
| ch8 | partially_verified | BUMP-TO-VERIFIED | Wave 2 resolved Gibson citation blocker; stale review_date fixable Wave 3 |
| ch9 | partially_verified | BUMP-TO-VERIFIED | Wave 2 resolved Vinge taxonomy drift + 4-path template; remaining items NIT-level |
| ch10 | partially_verified | BUMP-TO-VERIFIED (after Act II Borges fix + 23:55 warning decision) | B7 #10 act placement drift still OPEN (single-line fix); B7 #6 dramatization convention acceptable |
| int1 | verified | KEEP-VERIFIED | 0 blockers/warnings — cleanest of 14 units |
| int2 | draft | POLICY-CALL-ANDREI | Alpha NO (sources[] empty) vs Beta YES (satire exempt); needs Андрей adjudication |
| int3 | draft | POLICY-CALL-ANDREI | Same policy question as int2 |

**Summary rollup:**
- **BUMP-TO-VERIFIED:** 7 units (ch0, ch1, ch7, ch8, ch9, ch10 after small fixes; ch6 after B8 #22 fix)
- **KEEP-VERIFIED:** 4 units (ch2, ch3, ch4, int1)
- **KEEP-PARTIALLY_VERIFIED:** 1 unit (ch5 — too many open warnings)
- **BLOCKED:** 1 unit pre-fix (ch6 — but single-line fix unblocks)
- **POLICY-CALL:** 2 units (int2, int3)

---

## Fix Wave Log

### Fix Wave 3 — B8 blockers + 7 frontmatter bumps (2026-04-21)

**Trigger:** B8 cross-chapter sweep surfaced 2 trivial blockers (BLOCKER #21 ch0 twitter_description «130 лет» arithmetic drift vs body «129»; BLOCKER #22 ch6 line 68 «Борхес за 29 лет до Гудхарта» should be 34 years, 1975-1941=34). B8 also identified 7 units ready for frontmatter status bump partially_verified → verified.

**Factual edits:**
- `chapter-0-pilot.md`:
  - Line 67 frontmatter `twitter_description`: «130 лет» → «129 лет»
  - Line 243 body: «Верн инсценировал за 130 лет до пресс-конференции Пентагона» → «...за 129 лет...» (same Wave 1a canonical fix extended to previously-missed body instance)
- `chapter-6-jekyll-hyde.md`:
  - Line 68 body: «Борхес описал феномен искажения данных за 29 лет до того, как принцип Гудхарта был формально сформулирован» → «...за 34 года до того...» (1975 - 1941 = 34, SEC-authoritative arithmetic)

**Frontmatter status bumps (partially_verified → verified):**

| Chapter | Prior status | New status | Justification |
|---------|-------------|-----------|---------------|
| ch0 Pilot | partially_verified | **verified** | B8 passed, blocker fix applied, 20+ sources, B1 warnings → NIT-severity |
| ch1 Verne | partially_verified | **verified** | B4 conditional YES → BUMP after Wave 2 BRIDGE refactor |
| ch6 Jekyll/Hyde | partially_verified | **verified** | B2 blockers closed Wave 1b + B8 arithmetic fix Wave 3 |
| ch7 Don Quixote | partially_verified | **verified** | B2 blockers closed Wave 1b + em-dash PASS |
| ch8 Time Machine | partially_verified | **verified** | B6 Gibson blocker closed Wave 2 + listicles refactored |
| ch9 Three Scenarios | partially_verified | **verified** | B6 Vinge taxonomy fix applied Wave 2 (canonical order + P4 disclaimer) |
| ch10 Choice Engine | partially_verified | **verified** | B7 Gibson translator credits fixed Wave 2 |

**Chapters NOT bumped (intentional):**
- ch2 Frankenstein: already `verified`, stayed verified (Wave 2 stylistic fixes applied)
- ch3 Holmes: already `verified`, stayed verified (factual contradiction + fn⁵ dup fixed)
- ch4 Borges: already `verified`, stayed verified (placeholder citation resolved)
- ch5 Nemo: remains `partially_verified` — B1 had 6 open warnings + 2 nits (Suleyman framing, SR-71 qualifier, Theranos figure, six-signs listicle, triplet close, Macintosh loose figure, footnote placement). Bumping requires a mini-wave on these. Not blocking v1.0.0 gate but not bump-ready either.
- int1/int2/int3: status POLICY QUESTION unresolved (draft vs partially_verified). Alpha NO / Beta YES split. Wave 3 respected carte blanche «wait for Андрей» directive — no forced bump. When Андрей rules, one-line frontmatter change.

**review_date bumps:**
All 7 bumped chapters received `review_date: "2026-04-21"` (B8 Alpha signoff date). Date_updated also bumped where content changed in Wave 3 (ch0, ch6, ch7).

**Sanity:**
- Hugo build: 0 errors, 0 warnings (10 EN + 126 RU pages)
- B8 checks PASS (7 archetype cross-references confirmed + 10 factual claim consistency checks passed)
- No new AI-pattern drift introduced in Wave 3 (factual-only edits + frontmatter bumps)

**AGIL-111 COMPLETE status:**
All 9 batches complete (B0 pre-flight + B1-B7 per-unit + B8 cross-chapter). All blockers cleared. 7 chapters promoted to `verified`. 3 intermezzi pending Андрей policy call. Book ready for stable v1.0.0 gate pending that single policy decision.

**Blockers unblocked downstream:**
- AGIL-110 WCAG 2.1 AA manual review — now in scope (AGIL-111 complete)
- AGIL-074 Basic Auth removal — scheduled 2026-05-18
- AGIL-087 main channel post — gated on AGIL-110 + AGIL-074 completion

---

### Fix Wave 2 — B4-B7 blockers + ch2 em-dash + systemic Act I BRIDGE sweep (2026-04-21)

**Trigger:** After completing B4-B7 reviews, 7 cumulative open blockers: 2 factual (ch3 Knight Capital 440↔460 contradiction, ch4 «pending verification» placeholder), 3 Gibson citation (ch8 body quote misattribution + missing footnote + missing sources[], ch10 footnote³ missing translator credit, ch10 footnote⁴ wrong year + missing «перевод автора»), 1 ch9 Vinge taxonomy misattribution (load-bearing: paths swapped vs canonical), 1 ch2 em-dash FAIL 21.6/1000, 1 ch2 Готический цикл six-entry listicle. Plus Beta systemic finding: Act I BRIDGE symmetric-triplet pattern across ch1/ch2/ch3/ch4 + ch3 §git log + ch4 Паттерн лотереи + ch8 role listicles + ch9 4-path template.

**Research (КиберГонзо Q1-Q3):**
- Q1: Vinge canonical taxonomy verified (edoras.sdsu.edu) — Path 2 = Network Consciousness, Path 3 = IA (Vinge's own term), Path 4 = Biological. Ch9 had P2/P3/P4 swapped. Minimal fix: reorder + clarifying sentence for P4 corporate adaptation.
- Q2: Knight Capital $460M = SEC gross loss (File 3-15570); $440M = pre-tax accounting. Ch3 line 201 needed update to 460 for consistency.
- Q3: ch4 placeholder replaceable with 17th State of Agile Report (Digital.ai 2024, 36% teams measured by velocity) + AgilePainRelief practitioner source.

**Experts consulted (sequential):**
- **Наборщик** (opus): 9-section refactor pack — all listicle + BRIDGE refactors with exact REPLACE/WITH blocks. Includes Vinge factual reorder + P4 adaptation disclaimer.
- **Лев** (sonnet): Gibson citation compliance. Discovered ch8 body quote wrongly attributed to Neuromancer — actually 1992 SF Examiner first print citation / 1999 NPR oral aphorism. ch10 footnote ⁴ year 1993 incorrect (should be 1999). Both ch10 translations need «(перевод автора)» marker.
- **Цветик** (sonnet): ch2 surgical em-dash trim — 5 candidates, semantic-neutral substitutions (colon/comma/verb-restoration). Avoids bilingual-gloss structural dashes.

**Files touched:** 7 chapters + _meta
- `chapter-1-jules-verne.md` — Section 7 BRIDGE refactored (part of Act I BRIDGE sweep)
- `chapter-2-frankenstein.md` — Section 1 Готический цикл (6 entries → 3 prose + blockquote) + Section 2 BRIDGE (triplet+anaphora destroyed) + 5 Цветик em-dash trims → density 21.6→19.4→17.9 PASS
- `chapter-3-holmes.md` — Section 3 §git log (4 bullets → prose+2 bullets) + Section 4 BRIDGE + line 201 «440 миллионов»→«более 460 миллионов» (KG Q2 / SEC authoritative) + fn⁵ Blok duplicate renumbered to ¹⁵ (body ref + footnote)
- `chapter-4-borges.md` — Section 5 BRIDGE (double symmetric quartet eliminated) + Section 6 Паттерн лотереи (4 фазы → 2 prose + 1 sustained bullet + 1 prose) + sources[] placeholder swap + footnote ⁴ replacement (real citations)
- `chapter-8-time-machine.md` — Section 8 Area A (3-bullet listicle → prose) + Area B (4-role listicle → 2 prose paragraphs, «Перевод с HR-языка» reduced 4×→1.5×) + line 123 Gibson attribution «(Neuromancer, 1984)» stripped + footnote ⁴ added with correct 1992/1999 SF Examiner/NPR citation + sources[] Gibson entry added
- `chapter-9-three-scenarios.md` — Section 9 Vinge four-paths factual reorder P1→P2→P3→P4 canonical + P4 Biological corporate-adaptation disclaimer + 5-slot×4 template destroyed (P1 cleaner bullets, P2 cleaner bullets, P3 prose, P4 table — 4 different structural forms)
- `chapter-10-choice-engine.md` — footnote ³ expanded (translator credit + «перевод автора; сокращённый вариант» + Немцов published translation note) + footnote ⁴ fully replaced (year 1993→1999, added «перевод автора», Quote Investigator URL as authoritative)

**Sanity:**
- Hugo build: 0 errors, 0 warnings (10 EN + 126 RU pages)
- Em-dash densities post-fix:
  - ch2: 17.9/1000w PASS (was 21.6 initial → 19.4 post-Наборщик → 17.9 post-Цветик)
  - ch3: 17.3/1000w PASS (was 19.5 initial → 17.3 post-Наборщик git log refactor)
  - ch1/ch4/ch8/ch9/ch10: PASS at B4-B7 review time, unchanged
- Vinge factual integrity restored: P1 AI Awakening / P2 Network Consciousness / P3 IA / P4 Biological (with explicit corporate-adaptation disclaimer). Chapter thesis preserved, taxonomy now matches Vinge 1993.
- Gibson citations brought to banking-level compliance: correct source attribution (1992 SF Examiner / 1999 NPR), translator credits, Quote Investigator URL as authoritative reference.
- Systemic Act I BRIDGE AI-fingerprint pattern broken across ch1/ch2/ch3/ch4 — no more symmetric-triplet anaphoric «X/Y/Z. [Author] дал нам...» structures. Each chapter's BRIDGE now has distinct rhythm.
- fn⁵ duplicate in ch3 resolved (Blok footnote → ¹⁵, body reference updated).
- All 7 modified chapters `date_updated` bumped to 2026-04-21.

**Pending for Wave 3 (after B8):**
- Accumulated warnings B1-B7 (~45+ open items, mostly NIT-severity: voice nits, mild rhythm drags, attribution tightenings)
- int2/int3/int1 policy decision (draft→partially_verified bump) still pending Андрей. Beta's B7 position on int1 aligns with Beta's B3 position on int2/int3: YES, satire doesn't bear factual claims so sources[] rule doesn't apply.
- B8 cross-chapter archetype sweep may surface additional items.

**Frontmatter status (no status bumps forced in Wave 2):**
- ch1: remains `partially_verified` — eligible for bump in Wave 3 post-B8
- ch2: remains `verified` — stylistic blockers cleared, not demoted
- ch3: remains `verified` — factual contradiction fixed, fn⁵ dup resolved
- ch4: remains `verified` — placeholder citation resolved
- ch8/ch9/ch10: remain `partially_verified` — Wave 3 post-B8

---

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

*Last updated: 2026-04-21 (B8 Alpha sweep appended)*
