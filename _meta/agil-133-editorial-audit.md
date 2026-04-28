# AGIL-133 Editorial Polish — Evidence-First Audit

**Project:** AGILE SAPIENS monograph
**Task:** AGIL-133 — Editorial Excellence Polish (recovery + evidence establishment)
**Author of audit:** Editorial audit recovery pass (Expert Panel under Constitutional framework)
**Date:** 2026-04-28
**Branch:** `editorial-polish-wave2`
**Methodology:** evidence-first, reproducible, no phantom metrics
**Constitutional gate:** Pre-execution Alpha+Beta CONDITIONAL_PASS — remediation = this document.

---

## 0. Executive Summary

This audit **recovers** AGIL-133 onto an evidence-first footing after the prior
session marked AGIL-129/130/131/132 as `COMPLETE` in `SESSION_CONTEXT.md` without
artefact deliverables, baseline data files, or commit pointers. Per
`rules/context-consolidation.md` §2 (close-the-loop with verification), a
"COMPLETED" marker without evidence is anti-pattern.

**What is recovered:**

1. **Reproducible measurement infrastructure** under `scripts/editorial/` (two
   scripts; output JSONs in `_meta/`).
2. **Baseline metrics** for all 14 chapter files (3,479 sentences, 38,146 prose
   words excluding footnotes & frontmatter).
3. **Citation-compliance audit** per `rules/citation-compliance.md`.
4. **AGIL-132 verification status:** UNVERIFIED — claim of "Chapter 1 РБК/Ведомости
   authority enhancement" has **no commit evidence** in current branch tip.
5. **Harari/Gladwell benchmark assessment** — appropriateness review.

**What is NOT in this document:**

- Editorial improvements (those belong to AGIL-133 Phase 1, gated by Tier 1/2/3
  per `EDITORIAL_PROTOCOL.md`).
- Sub-agent reports labelled "complete" without artefacts (those are recorded
  here as `unverified`).

---

## 1. State of prior work (evidence-first re-grounding)

### 1.1. Tasks claimed `COMPLETE` in `.claude/SESSION_CONTEXT.md`

| Task | Status claimed | Artefact found in repo | Verdict |
|------|---------------|------------------------|---------|
| AGIL-129 baseline audit | ✅ COMPLETE | None (no `_meta/baseline-audit-2026-04-27.md` despite BACKLOG promise; only narrative in `SESSION_CONTEXT.md`) | UNVERIFIED |
| AGIL-130 integration assessment | ✅ COMPLETE | None | UNVERIFIED |
| AGIL-131 gap analysis | ✅ COMPLETE | None (BACKLOG specifies Harari/Gladwell deliverable; not on disk) | UNVERIFIED |
| AGIL-132 Russian authority | ✅ COMPLETE — "commit pending" | **No commit** in `editorial-polish-wave2` referencing AGIL-132 | UNVERIFIED |
| AGIL-133 Phase 0 (foundation) | claimed COMPLETE | Commit `26bcd11` exists with `EDITORIAL_PROTOCOL.md`, `EDITORIAL_RUBRIC.md`, `CHAPTER1_BASELINE.md` | VERIFIED — Phase 0 only |

**Constitutional rule applied** (`rules/context-consolidation.md` §2 close-the-loop):
> Anti-pattern: flip to `done` only because text says "✅ COMPLETED". Marker in
> text ≠ truth. Evidence verified in filesystem or git history.

The four tasks above remain **`in_progress` or `todo`** until reproducible
artefacts land in `_meta/` and/or git. This document does not flip them.

### 1.2. AGIL-132 voice consistency — concrete check

`SESSION_CONTEXT.md` lines 53–54 claim:
> "Chapter 1 enhanced with РБК/Ведомости authority patterns / Evidence: commit
> pending — Operations Model + Market conclusion enhanced"

Probe:
- `git log` on `editorial-polish-wave2` branch shows last content edit at commit
  `a75219a AGIL-127: Structural apparatus restructure complete` (no AGIL-132
  reference).
- `chapter-1-jules-verne.md` does contain "Operations Model" and "Market"
  sections, but the same is true of pre-AGIL-132 baseline; no diff evidence
  showing the enhancement.
- `CHAPTER1_BASELINE.md` was created **2026-04-28** (Phase 0 of AGIL-133), itself
  describing chapter as "Published (post-AGIL-132 Russian authority enhancement)"
  — circular self-reference.

**Verdict:** AGIL-132 cannot be marked `done`. Recommended action: keep `todo` /
`in_progress`, or schedule a dedicated voice-pattern audit pass.

---

## 2. Reproducible methodology

Two scripts created under `scripts/editorial/`. Both are CRLF-tolerant, exit
status 0, no external dependencies (pure Node.js).

### 2.1. `scripts/editorial/sentence-metrics.cjs`

**Purpose:** rhythm, length distribution, monotone-cluster, flow-disruption
detection — per `EDITORIAL_RUBRIC.md` §"Sentence Variance Metrics".

**Algorithm** (full notes in script header):
1. Strip Hugo frontmatter (`---` … `---`).
2. Strip footnote block (last `\n---` if followed by `¹²³…` glyphs).
3. Clean prose: remove fenced code, inline code, headings, blockquote markers,
   list markers, emphasis (`** __ * _`), footnote-glyph references, HTML.
4. Split into sentences on `.?!…` + whitespace + capital, OR paragraph break.
   Drop sentences <3 words.
5. Tokenise via `\p{L}+` Unicode regex.
6. Bucket per Rubric: short 5-12, medium 13-22, long 23-35, extra 36+.
7. Detect monotone runs (≥3 consecutive sentences spanning ≤3 words).
8. Detect flow disruptions (adjacent |Δ| > 15 words).

**Reproducibility:** run `node scripts/editorial/sentence-metrics.cjs --json out.json`.

**Limitations** (documented in script):
- Heuristic sentence-boundary detection; ~3-5% miscount on dialogue.
- Lists & code stripped → metrics describe prose only.
- Russian/English mixed text both supported via `\p{L}+`.

### 2.2. `scripts/editorial/citation-compliance.cjs`

**Purpose:** flag inline quotations missing footnote anchors, footnotes missing
translator attribution, and authors needing copyright caution per
`rules/citation-compliance.md`.

**Algorithm** (full notes in script header):
1. Find blockquotes (`>` lines) and inline `«…»` quotations of ≥5 prose words.
2. For each inline quote, scan next 200 chars for footnote glyph (`¹²³…`).
3. Parse footnotes (final `\n---` block); flag those without translator
   attribution words ("перевод", "translator", "переводчик", "перевёл/-а/-и").
4. Detect authors. Public-domain set: Verne, Shelley, Doyle, Stevenson, Wells,
   Cervantes (all dead >70y in EU). Copyrighted set: Borges (d.1986; PD EU 2057),
   Brooks (d.2022), Conway, Gibson, Vinge (d.2024).

**Limitations:**
- Many `«…»` markers are paraphrase or term-naming, not direct quotation. The
  script intentionally over-flags to surface them for triage; manual review needed.
- Footnote-glyph proximity heuristic (200 chars) can miss long-tail attributions.

---

## 3. Baseline measurements (raw evidence)

JSON files committed alongside this audit:
- `_meta/agil-133-sentence-metrics.json`
- `_meta/agil-133-citation-compliance.json`

### 3.1. Sentence variance — per chapter

| File | Sent | Words | Avg | Short% | Med% | Long% | Extra% | Mono% | Disrupt |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| chapter-0-pilot | 377 | 3,760 | 9.97 | 54.6 | 25.7 | 2.7 | 0.3 | 35.8 | 27 |
| chapter-1-jules-verne | 244 | 3,065 | 12.56 | 52.5 | 24.6 | 7.8 | 2.9 | 27.5 | 33 |
| chapter-2-frankenstein | 284 | 2,814 | 9.91 | 54.9 | 21.5 | 4.9 | 0.7 | 26.4 | 27 |
| chapter-3-holmes | 257 | 2,661 | 10.35 | 52.9 | 25.7 | 5.1 | 0.0 | 30.7 | 17 |
| chapter-4-borges | 205 | 2,480 | 12.10 | 43.9 | 30.7 | 5.9 | 2.9 | 15.6 | 34 |
| chapter-5-nemo | 398 | 4,388 | 11.03 | 47.5 | 28.6 | 6.8 | 0.5 | 30.2 | 40 |
| chapter-6-jekyll-hyde | 470 | 4,741 | 10.09 | 52.8 | 23.4 | 4.3 | 0.9 | 37.0 | 36 |
| chapter-7-don-quixote | 397 | 4,214 | 10.61 | 50.1 | 25.9 | 5.5 | 0.8 | 30.2 | 45 |
| chapter-8-time-machine | 146 | 2,193 | 15.02 | 37.7 | 47.9 | 10.3 | 2.1 | 15.1 | 19 |
| chapter-9-three-scenarios | 150 | 2,480 | 16.53 | 45.3 | 26.0 | 10.7 | 8.7 | 14.0 | 33 |
| chapter-10-choice-engine | 283 | 3,140 | 11.10 | 63.3 | 25.1 | 3.9 | 0.7 | 35.3 | 21 |
| intermezzo-1 | 86 | 631 | 7.34 | 54.7 | 15.1 | 0.0 | 0.0 | 46.5 | 0 |
| intermezzo-2 | 73 | 644 | 8.82 | 58.9 | 17.8 | 4.1 | 0.0 | 27.4 | 6 |
| intermezzo-3 | 109 | 935 | 8.58 | 64.2 | 18.3 | 0.9 | 0.0 | 45.0 | 1 |
| **TOTAL** | **3,479** | **38,146** | **10.96** | | | | | | |

**Rubric targets** (`EDITORIAL_RUBRIC.md` §1): Short 30-35% / Medium 40-45% /
Long 20-25% / Extra <5%.

**Observations** (descriptive, not yet prescriptive):

1. **Short-sentence dominance:** every chapter except chapter-8 (37.7%),
   chapter-9 (45.3%), and chapter-4 (43.9%) exceeds the 35% upper bound for
   short sentences, by a wide margin in chapter-10 (63.3%) and the intermezzos.
2. **Long-sentence deficit:** every chapter undershoots the 20-25% Long band
   (best is chapter-9 at 10.7%). Rhythm tilts towards punchy short prose.
3. **Monotone clustering:** chapter-6 (37.0%), chapter-0 (35.8%), chapter-10
   (35.3%), intermezzo-1 (46.5%), intermezzo-3 (45.0%) — these show the largest
   share of sentences in monotone runs. Concrete editorial targets.
4. **Flow disruptions:** chapter-7 (45), chapter-5 (40), chapter-6 (36), chapter-9
   (33), chapter-1 (33), chapter-4 (34) — these indicate either deliberate tonal
   shifts (acceptable in satirical voice) or genuine jarring transitions
   (editorial review required).
5. **Intermezzos** are not directly comparable to chapters: they are
   Carroll/Bulgakov-flavoured short sketches; their short-dominant rhythm is
   stylistic, not a defect.

**Caveat on Rubric targets:** the 30-35/40-45/20-25 distribution comes from a
"Harari-inspired" rubric drafted in `EDITORIAL_RUBRIC.md` Phase 0C. It is **not
an empirical Harari measurement** — neither the `Sapiens` text nor a Gladwell
corpus has been measured with this script. Treat the targets as aspirational
heuristics until validated against a real benchmark corpus (see §6).

### 3.2. Citation compliance — per chapter

| File | Quotations | Inline w/o footnote | Footnotes | Footnotes w/o translator | Authors |
|---|--:|--:|--:|--:|---|
| chapter-0-pilot | 17 | 5 | 17 | 14 | Verne, Shelley, Doyle |
| chapter-1-jules-verne | 12 | 10 | 6 | 6 | Verne, Shelley |
| chapter-2-frankenstein | 21 | 14 | 13 | 13 | Verne, Shelley, **Brooks** |
| chapter-3-holmes | 18 | 5 | 15 | 10 | Doyle, **Brooks**, **Conway** |
| chapter-4-borges | 25 | 12 | 16 | 14 | **Borges** |
| chapter-5-nemo | 9 | 4 | (TBC) | (TBC) | Verne, Stevenson, **Brooks**, **Conway** |
| chapter-6-jekyll-hyde | 21 | 13 | (TBC) | (TBC) | Stevenson |
| chapter-7-don-quixote | 11 | 7 | (TBC) | (TBC) | Shelley, Cervantes |
| chapter-8-time-machine | 11 | 9 | (TBC) | (TBC) | Wells, **Gibson** |
| chapter-9-three-scenarios | 6 | 4 | (TBC) | (TBC) | Wells, **Gibson**, **Vinge** |
| chapter-10-choice-engine | 6 | 2 | 4 | 2 | Wells, **Gibson** |

**Bold** = copyrighted-status author (length & permission caution per
`rules/citation-compliance.md`).

(TBC values for chapters 5-9 not in initial console output but present in the
JSON evidence file.)

**Observations:**

1. **Inline quotes without nearby footnote ref:** the script over-flags by
   design — many `«…»` markers are stylistic emphasis or paraphrase, not direct
   quotations. **Manual triage required** for each flagged line. Concrete cases
   warranting attention:
   - chapter-1 L8 «Двадцать тысяч лье под водой» — book title, not quotation;
     no footnote needed.
   - chapter-2 L133 «Мы дали вам жизнь, дальше — сами» — paraphrase Mary Shelley
     theme; no direct-quote footnote needed but should be marked as paraphrase.
   - chapter-7 L78 «Судьба руководит нами как нельзя лучше... перебить их всех
     до единого» — direct Cervantes quote; chapter has Любимов attribution at
     footnote 1, this specific line should anchor to its own footnote.
2. **Mary Shelley direct quotation absent from chapter-2:** chapter-2 references
   the *theme* of Frankenstein extensively but contains no direct quotation from
   the 1818 novel. This is **acceptable** (paraphrase + theme analysis), but
   means the "translator attribution" gate does not apply to absent quotations.
   The 13/13 footnotes-without-translator metric is therefore a false positive
   for this chapter — its footnotes are government audit reports, not literary
   translations.
3. **Copyrighted-author caution required:**
   - **Borges** (chapter-4): d. 1986 → EU PD 2057. Existing footnote
     correctly notes "перевод автора" attribution. Length caps (300 words prose)
     apply if any direct quotation is added. Current state: APPEARS COMPLIANT.
   - **Brooks** (chapter-3, chapter-5, chapter-2 mention): d. 2022 → copyrighted
     until 2092. Chapter-5 footnote 12 has direct English quotation with «перевод
     автора» — COMPLIANT. Other Brooks references in chapter-2 are paraphrase.
   - **Gibson** (chapter-10, chapter-8, chapter-9): living author. Chapter-10 L2
     direct English epigraph (15 words from *Neuromancer* opening): **must verify
     fair-dealing scope**. Chapter-10 footnote 3 has full attribution + "перевод
     автора" — APPEARS COMPLIANT, but a 15-word epigraph from a copyrighted
     work is in the borderline-acceptable range; legal review (Лев / `/legal-
     compliance`) advised.
   - **Vinge** (chapter-9): d. 2024. Direct quotation L4 (27 words) with full
     translator attribution at L27 — APPEARS COMPLIANT.
   - **Conway** (1968 paper): explicitly attributed in chapters 3, 5; technical-
     paper short quotation, fair-use scope — COMPLIANT.

### 3.3. Citation compliance — concrete recommendations

| # | Chapter | Action | Severity |
|---|---------|--------|---------|
| C1 | chapter-1 | Audit all 10 inline-without-footnote flagged lines; mark each as paraphrase, term-marker, or add footnote | P2 |
| C2 | chapter-2 | Consider adding ≥1 direct Shelley (1818) quotation + translator attribution to substantiate "Мэри Шелли написала первый разбор полётов" claim. Optional but improves scholarly anchor. | P3 |
| C3 | chapter-7 | L78 Cervantes direct quote needs its own footnote anchor (currently relies on global Любимов attribution at fn 1) | P2 |
| C4 | chapter-10 | Лев / `/legal-compliance` review for *Neuromancer* opening epigraph (15 words, living author) | P1 |
| C5 | chapter-9 | Лев review for Vinge 1993 quote (27 words, recently deceased — copyrighted to 2095) | P2 |
| C6 | all | Manual triage of script-flagged inline quotes (over-flagged by design) | P3 |

---

## 4. Voice consistency check — AGIL-132 follow-through

**Claim under test:** Chapter 1 was enhanced with "РБК/Ведомости authority
patterns" per AGIL-132.

**Verifiable signals available:**

1. Sentence-rhythm metrics for chapter-1: avg 12.56 words, Long band 7.8% — among
   the highest Long-band values in the book. Consistent with deliberate authority-
   prose injection (longer, evidence-laden sentences). **Weak positive evidence.**
2. Citation density in chapter-1: 6 footnotes for 3,065 prose words (~1 per 510
   words). Lower than chapter-2 (13 fn / 2,814 words) or chapter-3 (15 fn / 2,661
   words). For "РБК/Ведомости authority" we would expect denser citation. **Weak
   negative evidence.**
3. Git history: no AGIL-132 commit. **Strong negative evidence.**

**Audit verdict on AGIL-132:** UNVERIFIED. Recommend keeping task `todo` and
defining concrete completion criteria:
- ≥1 commit titled `AGIL-132: …` on `editorial-polish-wave2` or `main`
- Diff visibly demonstrates Russian-business-context authority injection
- Rhythm metrics (script above) re-run pre/post showing Long-band increase

---

## 5. Harari/Gladwell benchmark — appropriateness

**Question (per Expert Panel synthesis):** Are Harari/Gladwell appropriate
benchmarks for a Russian academic-business monograph?

### 5.1. Genre alignment

- **Harari (`Sapiens`):** Hebrew/English popular science, big-history synthesis,
  semi-academic register, Western publisher (Harvill Secker / HarperCollins). Genre
  match: **partial** — AGILE SAPIENS is narrower (Agile + literary archetypes), more
  satirical, and Russian-language-first.
- **Gladwell (`Outliers`, `The Tipping Point`):** US journalism-style narrative
  non-fiction, anecdote-rich, light citation. Genre match: **weak** — Gladwell's
  signature is single-thread storytelling around one person/case; AGILE SAPIENS is
  multi-thread (per chapter: 1 literary archetype × N corporate cases).

### 5.2. Voice / tonal alignment

The repo's recurring voice marker is **"Harari meets Dilbert"** (BACKLOG history
shows this phrase in 5+ task notes since AGIL-022). This is closer to:
- Harari (synthesis + accessible voice) ✓
- Adams' *Dilbert* / Carroll / Bulgakov (satirical, absurdist) ✓
- Russian academic-business monograph (Козлов, Панов, Тарасов): **not Gladwell**.

### 5.3. Recommended benchmarks (alongside or in place of Gladwell)

- **Harari** — keep, especially for sentence rhythm and structural argument scope.
- **Замяткин / Курпатов / Жикаренцев** — Russian-language popular-academic
  reference (style — direct address to reader, bold thesis statements, sparing
  metaphor).
- **Книга НГУ серий "Бизнес-литература"** (e.g. Тарасов, Адизес-в-русском-переводе)
  — for citation density and academic-business hybrid register.
- **Bulgakov / Carroll** — for the intermezzo voice (already explicit in the
  repo's voice protocol; intermezzos are NOT Harari/Gladwell domain).
- **Drop pure Gladwell** as a benchmark; retain only the *engagement-hook density*
  idea, which is genre-portable.

### 5.4. Rubric refinement (AGIL-133 Phase 1 input)

Recommended adjustments to `EDITORIAL_RUBRIC.md`:
1. Sentence-variance targets validated against an actual Harari Russian-translation
   sample (300-500 sentences) before applying as hard targets. Until then,
   treat as advisory.
2. Metaphor density target (1 per 2-3 paragraphs) is Gladwell-flavoured; for a
   satirical-academic Russian monograph 1 per 4-5 paragraphs is more realistic
   — over-density = forced, breaks scholarly tone.
3. Engagement-hook density (25%) — keep, but redefine "hook" for Russian
   academic register (rhetorical question + provocative thesis are native;
   "Imagine if…" is calque-translation and reads as AI-pattern).
4. Add explicit **AI-pattern guard** as a rubric layer per
   `MEMORY.md feedback_ai_patterns_strict` (em-dash mishmash, symmetry,
   bilingual contamination — known drifts in this corpus).

---

## 6. Constitutional & process notes

### 6.1. Pre-execution Alpha+Beta — partial deficit

The Expert Panel synthesis cited unanimous CONDITIONAL_PASS for AGIL-134 and
identified blockers for AGIL-133. This audit is **the remediation deliverable**
for AGIL-133, not the editorial-edits work itself. Editorial edits (Tier 1/2/3)
must still go through Alpha+Beta per `EDITORIAL_PROTOCOL.md`.

### 6.2. Phantom-completion guard

Per `MEMORY.md feedback_phantom_completion_deployment`, all task completions
require functional verification. For AGIL-133 the verifications are:
- Reproducible script artefacts in `scripts/editorial/` (this PASSES).
- JSON output files in `_meta/` (this PASSES).
- This audit document with traceable evidence pointers (this PASSES).
- Editorial improvements with before/after diff: **NOT YET** — AGIL-133 Phase 1
  scope, future work.

AGIL-133 status after this audit: stays `todo` for Phase 1 (improvements);
Phase 0 (foundation) verified by commit `26bcd11` plus this recovery pass.

### 6.3. Documentation hygiene (`rules/context-consolidation.md` §5)

This document carries `Date: 2026-04-28` in the frontmatter-equivalent header
(§"Date" line above). It will need `date_updated` if revised.

---

## 7. Recommendations — what AGIL-133 Phase 1 should actually deliver

In priority order (P1 → P3):

### P1 — Editorial improvements with measurable before/after

For each of the 5 highest-monotone chapters (ch-6, ch-0, ch-10, intermezzo-1,
intermezzo-3) **except intermezzos** (which are stylistically short by design):

- **chapter-6** (37.0% monotone, 470 sentences): break ≥40 monotone runs by
  introducing 1 long sentence (23-35 words) per run.
- **chapter-0** (35.8% monotone, 377 sentences): same protocol, target ≥30 runs.
- **chapter-10** (35.3% monotone, 283 sentences): same protocol, target ≥25 runs.

Verification: re-run `sentence-metrics.cjs`; commit before/after JSON; aim for
monotone% reduction ≥25% per Rubric §"Quantified Improvement Targets".

### P1 — Citation compliance triage

Action items C1, C3, C4 from §3.3. C4 (Gibson epigraph legal review) is the
only true legal-risk item; rest are scholarly hygiene.

### P2 — AGIL-132 re-do or close-with-evidence

Either:
- Reproduce the AGIL-132 enhancement properly (commit + diff), OR
- Mark AGIL-132 obsolete with `obsoleted_by` pointer and re-scope to AGIL-133
  per `rules/context-consolidation.md` §3.

### P2 — Rubric calibration against real benchmark corpus

Run `sentence-metrics.cjs` against a Russian Harari translation sample (e.g.
300-500 sentences from `Sapiens` ru) to validate the 30-35/40-45/20-25 targets
empirically. Until then, treat current targets as advisory.

### P3 — Drop Gladwell from benchmarks (see §5)

Update `EDITORIAL_RUBRIC.md` to reflect Harari-only + Russian-academic-business
references.

---

## 8. Deliverable inventory (this pass)

| Path | Created | Purpose |
|------|---------|---------|
| `scripts/editorial/sentence-metrics.cjs` | new | Reproducible sentence-variance metric (no deps) |
| `scripts/editorial/citation-compliance.cjs` | new | Reproducible citation-compliance check |
| `_meta/agil-133-sentence-metrics.json` | new | Baseline JSON evidence (timestamped) |
| `_meta/agil-133-citation-compliance.json` | new | Baseline JSON evidence (timestamped) |
| `_meta/agil-133-editorial-audit.md` | new | This document |

All artefacts are **idempotent**: running scripts again will reproduce identical
JSON (modulo `generated` timestamp). Methodology is documented in script
headers; a third party can re-run and verify all numbers in this audit.

---

## 9. Open questions for Андрей

1. **AGIL-129/130/131/132 status:** confirm — should these be rescoped, marked
   obsolete with pointer to AGIL-133, or retried? Current state: `todo` claim in
   BACKLOG vs `COMPLETE` claim in SESSION_CONTEXT — drift.
2. **Gladwell benchmark drop:** approval to update `EDITORIAL_RUBRIC.md`?
3. **Real Harari corpus sampling:** do you have a digital copy of `Sapiens` ru
   for benchmark validation, or should this be deferred?
4. **Phase 1 scope sign-off:** approve P1 monotone-cluster reduction protocol on
   ch-0, ch-6, ch-10 as the next concrete editorial pass?

---

*Generated: 2026-04-28*
*Methodology source: `rules/context-consolidation.md`, `rules/citation-compliance.md`, `EDITORIAL_RUBRIC.md`, `EDITORIAL_PROTOCOL.md`*
*Reproducibility: all numbers above traceable via `node scripts/editorial/*.cjs`*
*Date_updated: 2026-04-28*
