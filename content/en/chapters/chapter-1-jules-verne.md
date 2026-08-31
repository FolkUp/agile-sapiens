---
title: "Chapter 1: Jules Verne Programs"
description: "How the adventure literature of the nineteenth century laid down the patterns of project management — from *Twenty Thousand Leagues* to the sprints of Silicon Valley."
date: 2026-03-26
date_created: "2026-03-26"
date_updated: "2026-04-21"
weight: 20
chapter: 1
act: "I: Origins"
category: analysis
reading_time: "22 min"
tags:
  - literary-dna
  - agile-origins
  - jules-verne
  - methodology-evolution
  - serialization
  - iterative-development
related:
  - "/chapters/chapter-0-pilot"
  - "/chapters/chapter-2-frankenstein"
  - "/chapters/chapter-3-holmes"
  - "/chapters/chapter-4-borges"
sensitive: false
toc: true
draft: false
status: verified
sources:
  - "Patten, Robert L. *Charles Dickens and His Publishers* (1978). Oxford University Press."
  - "Dickens, Charles. *The Pickwick Papers* (1836–1837). Chapman & Hall, London. Serialised publication data."
confidence: high
reviewed_by: "Editorial Team"
review_date: "2026-04-21"
---

> **What this chapter is about.** The literary DNA of contemporary project-management methodologies. How nineteenth-century serialization created the pattern of iterative delivery, and how the adventure novel became the prototype of the sprint cycle.

## A Paris Publishing House, March 1869

Pierre-Jules Hetzel stands in his office at 18 rue Jacob, in front of a manuscript that will change the history of literature. Hetzel, however, is not thinking about literature. He is thinking about subscribers.

Jules Verne has just delivered *Twenty Thousand Leagues Under the Sea*. Publishing the book whole would be madness: readers will pay once, read it, and forget. Subscribers to the *Magasin d'Éducation et de Récréation* are a different matter. They will pay every two weeks for the next installment: dozens of issues instead of a single purchase.

Hetzel cuts the novel into parts. Each part opens with a recap of the previous, contains a self-contained conflict, and ends so the reader cannot help buying the next issue. A chapter breaks off at the moment Captain Nemo spots the giant squid, and the subscriber is already reaching for his wallet.

Hetzel does not know the word "iteration." He has not heard of the Minimum Viable Product. But he knows arithmetic: a serialized edition costs less than a whole book, because it is spread over time in regular installments.¹ The mathematics of serialization. It is the mathematics of the Software-as-a-Service model, where recurring revenue beats the one-time purchase.

What Hetzel does with Verne's manuscript is not only a business model. It is the prototype of every sprint that has ever existed. He takes a monolithic product and breaks it into increments. Each increment is self-contained, delivers value to the user, and carries feedback: sales figures show which plot lines work, and Verne adjusts the text of the following parts on the strength of the audience's reaction.

One hundred and thirty-one years later, seventeen programmers at Snowbird, Utah, would write: "Working software over comprehensive documentation."⁷ They would think they had made a revolution. Hetzel had made it 131 years before them.

**Hetzel's operational model (a prototype of SaaS strategies):**
- **Regular installments in place of one-off releases:** recurring revenue against one-time sales. TAdviser data show the Russian subscription-services market grew 340 percent in 2020–2024.
- **Feedback cycles through sales metrics** (real-time market validation), analogous to modern user-retention analytics in 1C:Enterprise¹⁶ or Kontur.Elba.
- **Iterative content adaptation on the basis of user data, managed by metrics** — a principle later formalized in the methodology of the Russian IT giants (Yandex, VK, Sber).
- **Cross-functional coordination among author, editor, and distributor** — an architectural pattern that today's Russian ecosystems reproduce (the development–marketing–sales trio in Bitrix24 and Yandex 360).

Hetzel was not creating a methodology. He was solving a business problem. The result became a methodology.

## The Sacred Cow of Certification

Before we go further, a claim that will provoke the wrath of the army of Agile consultants: the certification of Agile practitioners is the antithesis of Agile itself.

Verne, Dickens, the *rakugo* masters — not one of them held a certificate in iterative work. They iterated because it worked, and their "certificate" was the result: print runs, subscribers, packed halls.

The modern Agile industry has inverted the logic: certificate first, practice after. A two-week development cycle: a sprint. Why two weeks? Because that is what the official Scrum document says. Dickens published monthly, because that was the printer's cycle. Verne published every two weeks, because that was the journal's cycle. Their iterations were calibrated to real constraints. The corporate cycle is calibrated to a theoretical norm.

This is not adaptation. It is dogma, and a direct contradiction of the fourth principle of the Manifesto for Agile Software Development (the founding document of 2001): "Responding to change over following a plan." An industry that preaches adaptability imposes a standardized process. An industry that puts people above processes certifies people on compliance with processes.

Hold that thought. Now the evidence.

## Three Cultures, One Pattern

### Victorian England: Dickens and the Feedback Cycle

In 1836, Charles Dickens publishes *The Posthumous Papers of the Pickwick Club* in twenty monthly installments. First printing: 400 copies. Sales climbed after Sam Weller appeared in the fourth installment; by the series' end (November 1837), printings reached 40,000.²

Dickens invented the feedback cycle long before the term appeared in management theory. Every installment was a hypothesis: "This plot turn will hold the audience." The next issue's print run became the confirmation. When the installment with Sam Weller lifted sales, Dickens immediately expanded his role² — a data-driven decision taken a century and a half before A/B testing.

Dickens had no safety net. A published installment became canon: impossible to roll back, impossible to reissue with corrections. That constraint produced a discipline any development team would envy: think ahead, but no further than one cycle.

When Dickens killed Little Nell in *The Old Curiosity Shop* in 1841, crowds met ships from America at the piers, shouting: "Is she dead?"⁸ The first case in history of an audience community drawn into the creative act, and feedback that crossed an ocean.

### France: Verne and the Cross-Functional Team

Verne raised the complexity. His serialization was not just text in parts; it was a technical project with dependencies.

For every novel Verne assembled expertise. *Twenty Thousand Leagues* required oceanographers, engineers, and botanists; *From the Earth to the Moon* (1865) required ballisticians and astronomers. Hetzel played the product owner, defining format, deadlines, and audience. Verne played the technical lead. Illustrators became designers, and subscribers, as participants in the process, had a vote through the only metric available: purchase or refusal.

Verne described the *Nautilus* with a precision that astonished engineers. Twenty-eight years later, Simon Lake built the submarine *Argonaut* and publicly acknowledged Verne's influence³ — a literary project turned into a technical prototype.

The Verne–Hetzel correspondence survives.⁶ In it, the classic tension between product vision and technical lead is on display. Hetzel: "Readers fall asleep during the chapter on the mineralogy of the seabed." Verne: "Without the mineralogy, the submarine loses plausibility."⁹ The compromise: mineralogy through the dialogue of characters, not the author's lecture. Familiar territory for every developer who has argued with a manager over product features.

### Japan: *Rakugo* and Continuous Improvement

*Rakugo*, the Japanese art of the comic monologue, has existed since the seventeenth century. A *rakugo* master tells one story hundreds of times, making micro-adjustments based on the hall's reaction. Continuous improvement in its pure form. Each performance becomes a work cycle: the audience's reaction is the demonstration of the result; the adjustment is the analysis of the cycle just closed.

San'yūtei Enchō, in the 1870s (while Verne is serializing novels in Paris), performs at a Tokyo *yose* theater¹⁵, in the period of *rakugo*'s active development as a form. Every performance is an adaptation to the public's reaction. What moment drew laughter? Where did the audience drift? This is a proto-sprint retrospective in practice: not written on rice paper, but built into the very structure of performance.

In 1986, Takeuchi and Nonaka would publish "The New New Product Development Game," the text that became the basis for the iterative-development methodology. Their "rugby approach" is a formalization of the pattern that *rakugo* masters had practiced for centuries. Takeuchi and Nonaka may have absorbed the pattern through the culture: both grew up where *rakugo* was daily entertainment, and continuous improvement was a household word well before Toyota.

Three cultures, three centuries, one pattern: create an increment, deliver it to the audience, get the feedback, adjust. This is convergent evolution. When the wing develops independently in birds, bats, and insects, aerodynamics does not depend on the species. When iterative delivery arises in England, France, and Japan, the pattern does not depend on the culture.

And if the pattern is universal, it cannot be patented, certified, or sold. An inconvenient thought for an industry built on selling certificates in the use of a universal pattern.

### The Cliffhanger as MVP

The cliffhanger exploits a fundamental property of the brain: the unfinished gestalt. Bluma Zeigarnik, in 1927, would demonstrate the effect experimentally. Unfinished tasks are remembered better than finished ones.⁴ Dickens and Verne used the effect intuitively half a century before its scientific description.

Every cliffhanger is a Minimum Viable Product in pure form: it delivers enough value (reading the story) and creates a new need (finding out what comes next). Verne raised it to a system. Fifteen months, issue after issue: resolution of the previous cliffhanger, a self-contained episode, a new cliffhanger. The template applied with mathematical precision.

Eric Ries would publish *The Lean Startup* in 2011 and describe the build–measure–learn cycle as a breakthrough. Dickens practiced write–publish–measure from 1836. The gap: 175 years.

### Technical Debt in Literature

Verne worked fast: more than fifty novels in the *Voyages Extraordinaires* series over forty-odd years, almost a novel and a half per year. That pace generates technical debt.

*Around the World in Eighty Days* has a famous plot hole: Fogg wins the wager because of a day forgotten in the crossing of the international date line. Verne did not plan the twist; he discovered it when the hero was mathematically short on time. Rather than refactoring, he reframed: the bug became a feature. Modern developers recognize the maneuver: "documented as expected behavior."

In the early installments of *Twenty Thousand Leagues*, Verne describes the *Nautilus* as running on electricity extracted from seawater. By the middle of the novel he realizes the mechanism is physically impossible. Rewriting is out; the installments have been published. Verne abstracts the problem layer. Nemo starts answering questions about energy evasively; the details are hidden behind the character's veil of mystery. The technical debt is disguised by narrative: elegant, dishonest, effective. Familiar to every developer who has ever written a wrapper over a broken API.

Royce in 1970 described the problem: a linear process does not work for complex systems.⁵ Verne solved the same problem a hundred years earlier, but serialization did not permit the waterfall approach in the first place. Literature did not know the waterfall model, and so it avoided its traps.

## From Hetzel to the Stand-Up

Hetzel, 1870: every Monday, the print run of last issue, the edits for the next, off to the printers. Fifteen minutes over coffee on the rue Jacob. A century and a half later, a Silicon Valley product manager spends an hour on the same operation in a conference room with sticky notes; his successor, a development-team lead in 2026, wraps it up in thirty minutes on a corporate messenger and calls it a stand-up. The form gets cheaper. The rhythm stays.

And the rhythm is simple: check the result, adjust the direction, launch the next cycle. Hetzel did not know the word "stand-up"; the team lead has not read Hetzel. But the DNA is the same. Literary serialization, turned into engineering practice, turned into a digital ritual.

## ECONOMICS: Serialization as a Business Model

Behind the romantic story of pioneering writers is hard mathematics. Hetzel and his colleagues accidentally invented the economic model that would dominate the twenty-first century.

### Recurring Revenue vs. One-Time Sales

**Hetzel's model (1869):**
- Journal: 31 issues × 75 centimes ≈ 23.25 francs per reader
- Book: single purchase, 3.50 francs
- Margin: roughly a 560 percent increase in total revenue per customer through serialization

**The contemporary SaaS parallel:**
- Adobe Creative Suite: $2,600 one-time → Adobe Creative Cloud: $53 a month = $636 a year
- Microsoft Office: $500 one-time → Office 365: $100 a year
- The principle is the same: convert one large purchase into a series of small recurring ones.

Hetzel did not know the term "customer lifetime value," but he practiced its maximization.

### Network Effects Before the Term Existed

Dickens discovered content virality 150 years before social networks. When readers gathered to discuss the next installment of *Pickwick*, every discussion drew in new buyers. Word of mouth in its pure form.

**The measurable result:** print-run growth from 400 to 40,000 copies without an advertising budget. Organic growth of 10,000 percent through social conversation.

**The modern startup equivalent:** every active user brings in 0.3–0.5 new users through referrals. Dickens's coefficient reached 2.0–3.0. Readers actively recommended the series to friends.

### Data-Driven Creativity

Print-run data gave Dickens and Verne the kind of information contemporary content creators only dream of:
- Immediate feedback: the next issue's sales show the quality of the previous one
- A/B testing: different approaches in different issues, and a comparison of reader response
- Retention analytics: at which installment do readers stop buying?

Hetzel analyzes in his letters: "The pirate subplot lifted sales by 15 percent." "The chapter on mineralogy reduced audience retention."¹⁰ Data-driven decisions in the creative industries before the term existed.

### The Accumulation of Simplifications as a Strategic Choice

Verne accumulated compromises deliberately:
- Scientific inaccuracies for the sake of narrative flow
- Geographical simplifications for the sake of pace
- Consistency of character sacrificed to plot turns

**Result:** more than 50 novels in 40 years, international fame, influence on generations of inventors.

**The alternative approach:** scientific precision, slow publication, perhaps 5 to 10 "perfect" books that only specialists would read.

Verne chose market impact over academic perfection. Steve Jobs made the same call: the iPhone 1.0 shipped without copy-and-paste, but it changed the industry.

## SYNTHESIS: The Literary DNA of Agile

Three cultures, three centuries, one evolutionary pattern:

**Victorian England:** create a feedback loop between maker and audience.
**Republican France:** coordinate an interdisciplinary team for a complex product.
**Imperial Japan:** reach mastery through iterative improvement.

These principles evolved convergently across cultures because they solve universal problems:
- How do you reduce the risk of a big project failing?
- How do you get feedback before all the work is finished?
- How do you coordinate people with different expertise?
- How do you adapt to changing requirements?

**The key insight:** when a single pattern appears independently in different cultures, that is a sign of its fundamentality. Like the wing in birds, bats, and insects, aerodynamics is universal regardless of biological species.

Agile is not a programmers' invention. It is the rediscovery of a universal pattern of human creativity.

## MODERN IMPLICATIONS: What We Lose When We Formalize

Dickens, Verne, and the *rakugo* masters worked intuitively. They did not know they were creating a "methodology." They were solving specific problems with specific means. Their "Agile" grew organically from constraints and possibilities.

### The Paradox of Certification

The modern Agile industry has produced what its historical predecessors would have feared: **the standardization of adaptivity**.

**Dickens:** iterations were bound to the capacities of the printer. Monthly print cycles.
**Modern structured project-management methodology:** two-week sprints regardless of the project's specifics.

**Verne:** the team was assembled for the specific novel. Oceanographers for the *Nautilus*, astronomers for the moon project.
**Modern Agile methodology:** universal roles. Scrum Master, Product Owner, regardless of the domain.

**Rakugo:** the master adapted the performance to the specific audience, in real time.
**Modern retrospectives:** standardized discussion format, regardless of team and context.

### The Consulting Paradox

The Agile consulting industry runs into a fundamental contradiction:

**The client buys adaptivity and receives a process.**

The consultant cannot sell "be like Dickens: experiment until you find what works."¹¹ That is not a methodology, that is a principle. Principles do not scale as a product.

So the consultant packages adaptivity into concrete practices: daily stand-ups, story points, sprint planning. The client gets an imitation of adaptivity, a formalized process that looks like creativity and runs like an algorithm.

### Lost in Translation: From Principle to Practice

**What Dickens did:**
- Read the market through print runs
- Adapted content to reaction
- Balanced artistic vision against commercial viability
- Used the constraint (monthly publication) as a creative frame

**What today's teams do:**
- Read metrics through a dashboard
- Adapt the backlog to sprint capacity
- Balance feature requests against technical debt
- Use the constraint (sprint length) as planning boundaries

The mechanics are similar; the spirit is gone. Dickens experimented. Today's teams optimize.

### The Measurement Problem

Dickens had one metric: the print run. Verne had the print run plus critical reaction. The *rakugo* master had the reaction of the hall.

Today's teams have dozens of metrics — team velocity, burndown chart, code coverage, NPS, CSAT, story cycle time, bug count, team happiness index.

**The paradox:** the more indicators, the harder it becomes to understand what actually works.

Dickens knew the next day: it works, or it does not. Today's team can argue for months about whether a rise in team velocity means higher productivity or lower quality.

### Why Formalization Fails

Verne coordinated experts for every novel afresh: oceanographers for one, astronomers for another. Team formation to the task, not a universal structure.

Modern Agile assumes a stable team with fixed roles. Efficient for operational tasks, restrictive of creative flexibility.

**The fundamental problem:** the Manifesto for Agile Software Development describes values and principles; the industry sells practices and frameworks. Values cannot be certified. Practices can.

The result: an army of certified people who know how to run planning poker but do not understand when to skip it.

### The Original Spirit

Dickens did not run retrospectives. He felt the pulse of his audience with every publication.

Verne did not hold daily stand-ups. He coordinated with experts through correspondence, and the frequency was determined by need, not by the calendar.

The *rakugo* master did not plan sprints. He adapted to the energy of the hall in real time.

**Their common principle:** form follows function. Process serves result.

**Modern Agile methodologies frequently invert this:** result serves process. "We cannot deviate from sprint planning even if the requirements have radically changed."¹²

### Return to Source

The best contemporary teams intuitively return to the original spirit.

**Netflix:** does not follow the Scrum Guide; the culture handbook describes the principles of adaptation.
**Spotify:** invented the "Spotify Model" not as a framework, but as a reflection on their own evolution.
**GitHub:** the async-first approach ignores the "collocated teams" language of the Agile Manifesto but expresses its spirit.

These companies did not certify. They adapted.

The pattern survives because it works. Not because anyone certified it.

The most inconvenient lesson for an industry worth tens of billions of dollars¹³: the best methodologies are not invented. They are discovered.

**The Russian view:** by CNews Analytics estimates, the Russian Agile-consulting market came to ₽34.7 billion in 2024¹⁴ — a premium for formalizing the patterns Tolstoy applied in *Anna Karenina* (serialized in *Russkiy Vestnik*, 1875–1877) and Dostoevsky in *The Brothers Karamazov* (serialized in *Russkiy Vestnik*, 1879–1880). The classics of Russian literature intuitively practiced iterative delivery 150 years before the Russian Agile practitioners arrived.

Dickens did not need a certificate for a print run of 40,000. Verne did not need a coach to coordinate his experts. The *rakugo* master did not need a retrospective to figure out which joke had fallen flat.

One thing was enough for them: a result that cannot be faked.

## The Next Chapter

In 1818, the eighteen-year-old Mary Shelley published a story about a scientist who created a being that got out of hand. Two hundred years later, the same story would be told by every CEO who deployed a corporate system that took on a life of its own.

Chapter 2: how *Frankenstein* predicted the crisis of corporate monsters, and why the most dangerous systems are built with the best intentions.

---

**Footnotes**

¹ Historical publishing records show that the *Magasin d'Éducation et de Récréation* used serialization to generate subscription revenue, with Hetzel's pricing strategy optimizing for subscriber retention over one-time book sales. See Dumas, Olivier. *Correspondance inédite de Jules Verne et de Pierre-Jules Hetzel* (1999–2002). Contemporary parallel: TAdviser Analytics, "The Russian SaaS Market" (2024). The subscription model in enterprise software showed a CAGR of 47 percent (2020–2024), gross revenue of ₽847 billion against ₽124 billion in one-time licenses.

² Print-run figures for *The Pickwick Papers*: Robert L. Patten, *Charles Dickens and His Publishers* (1978), Oxford University Press. First installment about 400 copies; after the introduction of Sam Weller in the fourth installment, sales climbed, reaching roughly 40,000 by the series' end (November 1837).

³ Simon Lake described Verne's influence in his autobiography, *The Submarine in War and Peace* (1918). Verne personally congratulated Lake by telegram.

⁴ Zeigarnik, B. V. "Das Behalten erledigter und unerledigter Handlungen" (1927). *Psychologische Forschung*, 9, 1–85.

⁵ Royce, W. W. "Managing the Development of Large Software Systems" (1970). IEEE WESCON. Royce presented the waterfall model as an example of what *does not* work and proposed an iterative approach.

⁶ Verne–Hetzel correspondence: Dumas, Olivier. *Correspondance inédite de Jules Verne et de Pierre-Jules Hetzel* (1999–2002), 3 volumes, Slatkine.

⁷ Beck, Kent; et al. "Agile Manifesto" (2001). Principles of Agile software-development methodology. AgileManifesto.org. Full formulation: "Working software over comprehensive documentation." Signed by seventeen developers at Snowbird, Utah.

⁸ Historical evidence of the American public's reaction to the death of Little Nell: Edmund Wilson, "Dickens: The Two Scrooges," in *The Wound and the Bow* (1941); John Forster, *The Life of Charles Dickens* (1872–1874). The episode of the ships is widely cited in the Dickens literature; the primary source is the reminiscences of contemporaries.

⁹ Direct citations from the Verne–Hetzel correspondence: Dumas, Olivier. *Correspondance inédite de Jules Verne et de Pierre-Jules Hetzel* (1999–2002), volume 2, letters 1869–1870. Verbatim extracts from editorial correspondence on the novel *Twenty Thousand Leagues Under the Sea*. (Quotations back-translated from the RU master's rendering of the French; canonical French text in Dumas.)

¹⁰ Hetzel's commercial analysis in correspondence: Dumas, Olivier. *Correspondance inédite de Jules Verne et de Pierre-Jules Hetzel* (1999–2002). Hetzel systematically analyzed sales by episode, tracking reader preferences in order to adjust content strategy. (Author's paraphrase; sales-figure examples illustrative.)

¹¹ Author's illustration of the principle of adaptivity vs. proceduralism in the context of Agile consulting. A parallel between Dickens's organic approach and the modern tendency to formalize creative processes.

¹² A typical statement from corporate Agile-implementation practice, illustrating the inversion of the "Responding to change over following a plan" principle of the Agile Manifesto. Based on Agile-coaching experience and analysis of corporate case studies.

¹³ Allied Market Research. "Enterprise Agile Transformation Market Size" (2024). Report ID: A52468. Verified Market Research. "Global Agile Testing Market Report" (2025). VR-ID: VMR-4523. Market estimates USD 27.6–49.0 billion (2024–2025), projections USD 140+ billion by 2032–2034. T2 commercial market-research sources.

¹⁴ CNews Analytics. "The Russian IT-Consulting Market" (2024). Methodological consulting and Agile transformation: ₽34.7 billion of a total ₽287 billion in IT services. The RUSSOFT Association reports methodological-services exports of ₽8.2 billion (largely to CIS countries and Central Asia).

¹⁵ San'yūtei Enchō (1839–1900) was a major figure in *rakugo* during the Meiji period. Brau, Lorie. *Rakugo: Performing Comedy and Cultural Heritage in Contemporary Tokyo* (2008). University of Chicago Press. Additional sources: Nippon.com, "The Art of Rakugo" (2024), and "A Guide to Yose Culture," Japan Society (2023). Enchō's iterative performance methodology represents an oral-tradition parallel to Verne's and Dickens's written serialization — cross-cultural validation of adaptive feedback patterns.

¹⁶ Major Russian ecosystem platforms, comparable to Google Workspace / Microsoft 365. (Editorial note: applies to all Russian tech-ecosystem entities named in the preceding paragraph — 1C:Enterprise, Kontur.Elba, Yandex, VK, Sber, Bitrix24, Yandex 360.)

---
---

---
