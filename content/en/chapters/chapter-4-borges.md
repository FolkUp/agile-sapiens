---
title: "Chapter 4: Borges Counts Story Points"
description: "How measurements meant to make teams more agile turn into a lottery — from the Spotify Model to the OKR theater, from velocity gaming to the retrospective ritual."
date: 2026-03-28
date_created: "2026-03-28"
date_updated: "2026-04-29"
weight: 50
chapter: 4
act: "I: Origins"
category: "analysis"
tags:
  - "borges"
  - "measurement-paradox"
  - "agile-metrics"
  - "spotify-model"
  - "safe-framework"
  - "okr-cargo-cult"
  - "velocity-gaming"
  - "goodharts-law"
  - "organizational-theater"
related:
  - "/chapters/chapter-0-pilot"
  - "/chapters/chapter-1-jules-verne"
  - "/chapters/chapter-2-frankenstein"
  - "/chapters/chapter-3-holmes"
  - "/chapters/chapter-5-nemo"
  - "/chapters/chapter-6-mina-harker"
  - "/chapters/chapter-6-jekyll-hyde"
  - "/chapters/chapter-7-don-quixote"
sensitive: false
toc: true
draft: false
status: verified
sources:
  - "Borges, Jorge Luis. «La lotería en Babilonia» (1941). In *Ficciones* (1944). Editorial Sur, Buenos Aires."
  - "Goodhart, Charles A.E. «Problems of Monetary Management: The U.K. Experience.» *Papers in Monetary Economics*, Reserve Bank of Australia, 1975."
confidence: high
reviewed_by: "Editorial Team"
review_date: "2026-04-21"
---

> **What this chapter does.** The paradox of Agile measurement. How metrics meant to increase agility become a lottery — a system so complex that no one remembers why it started. From the Spotify Model to SAFe, from OKR theater to velocity gaming — an anatomy of the measurement madness.

## Meeting Room 7, Sprint Planning

The product manager for mobile banking looks at the story-points board and understands: the system has devoured the team.

It started simply. Two years ago velocity helped with planning — thirty-five points per sprint, steady, predictable. Now four diagrams hang on the wall: velocity by team, story-point inflation, capacity planning, burndown by epic. Planning eats eight hours out of the sprint. Thirty-two are left for development.

"What about five points?" a junior developer asks.
"No, it's definitely eight," the senior answers. "Remember that API task last sprint?"
"Which one exactly?"
"Well… the complex one."

The product manager shuffles the planning-poker cards and thinks about Jorge Luis Borges.

Borges, 1941: in the story "The Lottery in Babylon," a society is drawn into a game that comes to swallow all of its aspects.¹ It began simply — cash prizes. Then fines. Then offices, sentences, marriages. Every drawing spawned offshoots — secondary lotteries, lotteries to determine the rules of other lotteries, lotteries to void the results.

By the end of the story the boundary has evaporated — the system, first conceived as chance inside an order, *became* the order. The instrument had finally defeated its own purpose.

The Borgesian narrator confesses that he does not know how many stories the lottery has, or which story is accessible to him. The ignorance is not a lapse of memory. It is a symptom of a system that has outgrown the understanding of its own participants.

He knows the feeling — he does not remember why the team started counting story points. He remembers only that it is now mandatory: for reporting, for forecasting, for KPIs. Seventy years before the appearance of SAFe, Borges described corporate methodology more precisely than any contemporary consultant.

---

Holmes (Ch.3) gave us a method — seven signs of a project's illness. But he works with evidence and does not put the principled question: *what if the instrument of observation itself distorts what is observed?*

Borges puts the question directly. He shows Babylon not as chaos but as *an order that has grown into chaos* — where the lottery is no longer chance but a measurement that has fully lost its connection to what is measured.

The chapter asks a concrete question: how did the Agile metrics — velocity, story points, OKRs, burndown charts — instruments of agility — turn into a Babylonian lottery? A system where teams spend more hours servicing it than creating a product?

Thesis: **a measurement meant to increase agility inevitably reduces it, as soon as it becomes the goal.**

Charles Goodhart (1975) formulated the law: any observed statistical regularity tends to collapse once pressure is placed upon it for management purposes.² Twenty-two years later Marilyn Strathern minted the same thought into a short formula that has since been cited in place of Goodhart's: "When a measure becomes a target, it ceases to be a good measure."³ She showed that this concerns not only economics but education, health care, and administration.

Borges, thirty-four years before Goodhart, showed the same mechanic — he simply called it a lottery.

## The Lottery of Metrics

### Velocity: The First Drawing

The team lead of a fintech startup remembers how it all began. Summer 2022 — a team of five, velocity 30 points — pure arithmetic as an internal calibration tool. If the sprint is 30 points, three features take three sprints. Simple.

The problem: the lottery in Babylon does not stay simple, and velocity — does not stay internal.

**Fall 2022 — the first mutation.** The head of development sees the dashboard: Frontend team, 40 points. Backend team, 25. The logic is airtight — Frontend is more efficient. The team lead tries to explain: "We're comparing Celsius with Fahrenheit and declaring America the hotter one." The head of development nods and asks Backend to "pull up the numbers."

**Winter 2023 — the second mutation.** Velocity becomes part of the department's KPI. The team lead watches the team begin to game the system. The task "Integration with the bank API" (3 points) turns into "Set up the test environment" (2 points) + "Write the API client" (2 points) + "Handle the errors" (1 point). Velocity climbs from 30 to 45. The volume of work does not change.

"Excellent trajectory," says the head of development at the review.
"We haven't accelerated anything," the team lead answers.
"The numbers say otherwise."

Story-point inflation is a standard problem, documented at Scrum.org, Age of Product, LinearB, and elsewhere.⁴ The team lead had read about it on the blogs — encountering it personally is a different experience.

Borges caught the mechanic: "as the lottery expanded, every free act was included in its sphere."¹ Velocity had grown out of being a tool and into being a sphere that absorbed every act of the team. A technical decision had become a political act.

### Story Points: A Language That Has Lost Its Meaning

"And what does five points mean?" a new developer asks at his first planning.
"Well, more than three, less than eight," the team lead answers.
"And what does eight mean?"
"A complex task. Remember the database migration last sprint?"
"I wasn't working here yet."

Borges in "The Library of Babel" described an infinite library containing all possible books — every combination of letters. And so the library is useless: when everything exists, finding the specific thing is impossible.⁵

Story points are the same Babylonian library. A system that, by meaning everything, means nothing.

On the wall of the meeting room hangs a "Definition of Done." No "Definition of Points." What is five points? For frontend — a day. For backend — a week. For QA — "depends on how many bugs we find." The Fibonacci numbers (1, 2, 3, 5, 8, 13) are chosen not for their thirteenth-century relation to complexity estimation, but for non-linearity — a reflection of uncertainty. Medieval mathematics used to measure what does not yield to measurement.

Every other Wednesday — two hours on planning poker. Seven adults show cards with numbers — a children's game — to estimate a task no one has begun. One shows 5, another 8, a third 3. A "discussion" begins. Each explains his figure through a metaphor from a past experience the others do not remember.

"I put 8, because it's like that OAuth task…"
"Which one exactly?"
"Well, the complex one."

Borges anticipated the absurdity — the true cost of that absurdity is measured in team hours. The team lead's arithmetic: 7 people × 2 hours × 26 sprints = 364 hours a year on card divination. Two months of development — spent estimating development.

## The Spotify Model: The Model That Does Not Work Even at Spotify

The HR director of a major bank flies to Stockholm to study the "legendary model." 2019 — a delegation, a budget that would later have to be justified. The goal: to implement the Spotify Model back home.

On the plane she rereads the Kniberg–Ivarsson document: Squads, Tribes, Chapters, Guilds.⁶ The transformation plan is already drawn — HR has designed the new org chart, IT has commissioned an office redesign for the "tribal" model, top management is awaiting the result.

First day at Spotify. The guide — not Kniberg, he left three years ago — walks the office:
"This zone was for Tribe A, but there are mixed teams here now."
"And the Chapter Lead from the presentation?"
"Ah, that role has transformed. We have a different structure now."

She rereads the first paragraph of the document: "This article is only a snapshot of our current way of working… by the time you read this, things have already changed."⁶ A warning everybody ignores.

In the hotel that evening she opens the analysis by Jeremiah Lee — a former PM at Spotify. The document describes an idealized state Spotify had not reached even at the moment of publication. The squads themselves were reorganizing, tribes shifting, guilds losing activity.⁷ Kniberg himself, for ten years after publication, kept reminding people: it is a snapshot, not a blueprint.

The most painful discovery — Spotify silently used the document as a recruiting tool while the internal reality had long since differed.⁸ She understands: they are copying the advertising brochure.

Here is the Babylonian lottery in action — a snapshot of one company becomes canon for thousands of others, the context evaporates, and only the structure without the understanding remains.

Conway (Ch.3): the organization reproduces its structure in the product. The "Spotify Model" is an attempt at the inverse — copy the structure and get somebody else's product. This is a fundamental error. The Spotify structure reflected Spotify's culture, the Swedish market, particular people, a particular moment. To copy the structure without the culture is like copying the restaurant and expecting the food to taste the same.

## SAFe: The State Religion

If the "Spotify Model" was a naive lottery, SAFe is its logical evolution — the lottery that has obtained official state status.

SAFe 6.0 — four configurations (Essential, Large Solution, Portfolio, Full), dozens of roles and ceremonies.⁹ The "Big Picture" resembles the subway map of a ghost city. Everything connected, everything labeled — and meaningless without context.

The scaling paradox — the methodology of simplicity and self-organization inevitably produces layers of management.¹⁰

Borges on SAFe: "the lottery obeys the Company; of the Company's inner workings only conjecture is heard"¹ — replace "the Company" with "Scaled Agile, Inc." and you get the portrait of thousands of organizations implementing a commercial framework. Borges further calls the lottery "an interpolation of chance into the order of the world."

The question — does SAFe create authentic value, or does it mark chaos under the label of "managed complexity"?

Nokia (Ch.2) lost the smartphone market out of fear, and simultaneously (2008–2010) was rolling out a large-scale Agile transformation. Laanti, Salo, and Abrahamsson (2011) described how the transformation was perceived by employees themselves — a broadly positive response.¹¹ The market-share collapse of those same years is documented in Ch.2 (Vuori, Huy, 2016). This is not causation — but the coincidence undermines the promise that "Agile at scale saves."

## OKRs: The Cargo Cult

The CPO of an e-commerce company sits over the quarterly OKRs and feels like a Melanesian shaman building a straw airplane.

Q1 2024. The CPO reads John Doerr's manual: OKRs are a tool of focus (Intel, Google).¹² Precisely a *tool*, not a religion. But what happens at the company more resembles a cargo cult.

**January — the quarterly ceremony.** The CPO writes into the Confluence template:
- O1: "Become the leader in the fashion e-commerce segment."
- KR1: "Increase market share to 15%."
- KR2: "Raise NPS to 75."

The text is beautiful, ambitious, entirely disconnected from reality. The CPO knows the document will be opened in March (review) and June (the next planning). Between the two — ordinary work on ordinary tasks.

**February — the cascade.** The chain of transformations — "leadership in fashion" → "improve conversion" → "optimize the catalog" → "refactor the search" → JIRA ticket 15247 "Fix the price sort." The developer looks at the ticket and wonders — what does a bug fix have to do with market leadership?

"This is a strategically important task," the CPO explains.
"But it's a routine bug…"
"Everything is connected to the OKR."

**March — the assessment.** The CPO gives himself 0.4 out of 1.0. By Doerr's rule a good result is 0.7, and 1.0 means insufficient ambition.¹² The paradox — "success = partial failure." How to explain to the general director that 40 percent completion of the goal is normal?

"We have execution problems," the general director says.
"No, this is deliberately loaded ambition…"
"Sounds like an excuse for failure."

Wodtke (2016): OKRs work in cultures that accept failure.¹³ Most corporations do not have that culture — and in such an environment OKRs turn into a lottery with penalties.

Borges warned: some — with a stubbornness worthy of a better cause — think the lottery does not exist at all.

## Retrospective Theater

The scrum master of a game-development studio arranges stickers and thinks of the theater of the absurd. Friday, 4 p.m., meeting room "Mario." The seventh retrospective in a row with the same ending.

A retrospective in theory is an analysis of successes and failures. The reflection Hetzel and Verne (1870, Ch.1) knew as a conversation over dinner about the print run. In practice — a theater with an unchanging repertoire.

**Act I — the sticker liturgy.** The scrum master draws three columns on the flip chart: 🟢 / 🟡 / 🔴. The team obediently fills them in.
- A green sticker from the senior: "Good work on the inventory system."
- A red sticker from a developer: "Too many meetings."
- The yellow column is empty (as always).

"Why does nobody write neutral moments?" a new hire asks.
"And what is there to write?" the senior shrugs. "What went normally went normally."

**Act II — the reading.** The developer reads her red sticker.
"Again, too many meetings. Planning, grooming, stand-ups, retrospectives…"
Nods of understanding. The same sticker was there in September, October, November, December.
"And which meetings specifically are excess?" the scrum master clarifies.
"Well… various ones. Overall, a lot."

**Act III — action items as lottery.** The scrum master writes on the board: "Reduce the number of meetings." Owner — unassigned. Deadline — undefined. Success criterion — blurry.
"Agreed, we will plan our time more effectively," the scrum master resumes.

Two weeks later at the new retrospective the familiar red sticker appears again: "Too many meetings." The scrum master looks at her notes — the action item from the previous retro has been forgotten by everyone, including herself.

So the retrospective becomes a ritual instead of a reflection — not final, but endless. Nothing bears responsibility, forming a closed loop: stickers → action items → new retrospectives → fresh stickers. The lottery Borges described was also arranged so that it never was the last.

Weinberg (Ch.3) notes — when developers lose contact with users, they begin to design the system for themselves. In the same way, retrospectives that have stopped changing anything are conducted for self-consolation.

## Against Measurements

**Most metrics of agile methods cause more harm than good.**

Muller, 2018: performance metrics inevitably lead to manipulation of the indicators — hospitals begin refusing serious patients, schools expel weak students, the police reclassify crimes.¹⁴

Donald Campbell in 1979 formulated the law later named after him: the more widely a quantitative indicator is used for social decisions, the more it is subject to pressure that distorts the very process it was meant to measure.¹⁵ Velocity gaming, story-point inflation, and OKR cascading — the law in action.

If Holmes (Ch.3) saw in measurement the symptoms of illness, Borges goes further — the instruments of observation themselves become the illness.

DORA (Google Cloud, 2023) avoids velocity, story points, and OKRs, proposing four outcome metrics instead¹⁶ — deployment frequency, lead time (from commit to production), time to recover from failure, and the percentage of failed changes. All four are tied to objective reality — the system is either deployed or not — and gaming is difficult.

DORA works precisely because it excludes side measurements, cascading, and ceremonies, leaving four objective, unambiguous numbers. Brooks (Ch.3) would approve of such simplification — the n(n − 1)/2 channels of communication reduced to four indicators.

## The Pattern of the Lottery: Instrument → Institution

Borges describes a universal pattern of degradation through four phases with imperceptible transitions.

**Phase 1: A useful tool.** Velocity helps, story points simplify, OKRs focus — while it works, everything is valuable. But then comes institutionalization — "we use velocity" turns into "everyone is obliged to report on velocity"; "we need a retrospective" turns into "every two weeks." The useful becomes the obligatory.

**Phase 2: The metric becomes the target.** Velocity turns into a KPI, OKRs into the basis of assessment, the retrospective into reporting. Goodhart's law confirms itself — the instruments begin to optimize themselves.

**Phase 3: The lottery.** The metric system becomes so complex that no one remembers why it started. Hours are spent on estimation, grooming, planning poker, alignment of goals, building diagrams — and under the sticker 🔴 the familiar "too many meetings" appears again.

Borges does not deny the lottery — he only reminds us that we know about its inner mechanics exactly as much as about any other large system laid on top of our lives. Applied to the corporate reality, that description turns out to be exact.

## From Measurement to Practice

The product manager finishes another sprint planning at 7:15 p.m. The team leaves for home. On the board the numbers remain — 42 story points, planned velocity 38, confidence level 0.7.

He switches off the projector and thinks about Borges. The first act is complete — Verne showed creation, Shelley the price of forgetting, Holmes diagnostics, Borges how **the apparatus of observation itself becomes the illness**. When the measurement-as-goal destroys what is being measured.

Beyond the window the competitors' offices have gone dark. Somewhere out there are teams that write code instead of estimating code. That solve users' problems instead of optimizing metrics. That did not drown in their own lottery.

The team lead from the fintech in the next building thinks the same thought, locking the meeting room after the retrospective. The HR director flies home from Stockholm understanding: they were copying the instruction manual for an airplane that no longer exists. The CPO finishes the OKRs for the next quarter and knows — it is theater, but the theater has to be played.

The trap — velocity turns into the optimization of velocity, OKRs into a ritual, story points into a philosophical dispute. The result — a Babylonian lottery, where the instrument devours the goal.

The exit exists — teams that measure without submitting to measurement. That apply processes without deifying them.

---

*To be continued. In the next chapter:* a captain who conducted not a single interview by regulation — and assembled the best crew of the world ocean. A submarine against an aircraft carrier worth two trillion. Selection by capacity against selection by conformity. And an organization that needs no Company. The lottery stays in Babylon. The Nautilus goes deep.

---

**Footnotes:**

¹ Borges, Jorge Luis. "La lotería en Babilonia" (1941). In *Ficciones* (1944). Editorial Sur, Buenos Aires. English tradition knows the title as "The Lottery in Babylon." The canonical English translation by Andrew Hurley (Penguin *Collected Fictions*, 1998) is under copyright; quotations here are the translator's own rendering from the Spanish original as inflected by the RU master (v1.0.15). **Series-wide Borges rule** (Andrey visa S233, 2026-07-29): canonical restore of copyrighted contemporary translations is forbidden; author's rendering with hedge applies uniformly to all books of the trilogy — see companion Bolik DE §7 for the German mirror of this principle.

² Goodhart, Charles A.E. "Problems of Monetary Management: The U.K. Experience." *Papers in Monetary Economics*, Reserve Bank of Australia, 1975. Canonical English text used directly. Standard formulation ("Goodhart's Law"): "Any observed statistical regularity will tend to collapse once pressure is placed upon it for control purposes."

³ Strathern, Marilyn. "'Improving Ratings': Audit in the British University System." *European Review*, Vol. 5, No. 3 (1997), pp. 305–321. Canonical English text used directly: "When a measure becomes a target, it ceases to be a good measure."

⁴ Digital.ai. "17th Annual State of Agile Report" (2023). Canonical English text used directly. 36 percent of Agile teams are evaluated by velocity — a structural incentive for gaming. Practical analysis of velocity gaming: Levison, Mark. "Misuse of Velocity in Agile Projects." AgilePainRelief.com. Note: EN v0.4 fixes RU-master year discrepancy (v1.0.15 had "(2024)"; 17th report was published 2023) per Iskra DOPFIX-3 pt 5 (C19 карт-бланш).

⁵ Borges, Jorge Luis. "La biblioteca de Babel" (1941). In *Ficciones* (1944). English tradition knows the title as "The Library of Babel." Per series-wide Borges rule (see fn.¹), citation only; no canonical restore.

⁶ Kniberg, Henrik, and Anders Ivarsson. "Scaling Agile @ Spotify with Tribes, Squads, Chapters & Guilds." Spotify Labs whitepaper, October 2012. Canonical English text used directly. The snapshot-not-blueprint caveat appears in the opening of the whitepaper.

⁷ Lee, Jeremiah. "Failed #SquadGoals — Spotify Doesn't Use 'the Spotify Model' and Neither Should You." jeremiahlee.com, April 2020. Lee is a former PM at Spotify.

⁸ Kniberg, Henrik. Author's ongoing public reminders across the years: the 2012 whitepaper is a snapshot of a specific moment, not a blueprint. Most known sources: Kniberg's interview at Agile Amsterdam 2015; the crisp.se blog; repeated presentations 2016–2020. Primary sources for the caveat in the body are the whitepaper itself (⁶) and Kniberg's interviews at major Agile conferences.

⁹ Scaled Agile, Inc. SAFe 6.0 Framework. scaledagileframework.com (official framework site).

¹⁰ Rigby, Darrell K.; Jeff Sutherland; and Andy Noble. "Agile at Scale." *Harvard Business Review*, May–June 2018. Canonical English text used directly.

¹¹ Laanti, Marko; Outi Salo; and Pekka Abrahamsson. "Agile Methods Rapidly Replacing Traditional Methods at Nokia: A Survey of Opinions on Agile Transformation." *Information and Software Technology*, Vol. 53, Issue 3 (2011), pp. 276–290. Canonical English text used directly.

¹² Doerr, John. *Measure What Matters* (2018). Portfolio / Penguin. Canonical English text used directly.

¹³ Wodtke, Christina. *Radical Focus* (2016). Cucina Media. Canonical English text used directly.

¹⁴ Muller, Jerry Z. *The Tyranny of Metrics* (2018). Princeton University Press. Canonical English text used directly.

¹⁵ Campbell, Donald T. "Assessing the Impact of Planned Social Change." *Evaluation and Program Planning*, Vol. 2, No. 1 (1979), pp. 67–90. Canonical English text used directly.

¹⁶ Accelerate: State of DevOps Report. Google Cloud / DORA, 2023. Canonical English text used directly.

---

---
---

---
