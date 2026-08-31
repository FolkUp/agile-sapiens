---
title: "Chapter 2: Frankenstein Manages a Project"
description: "How the novel by an eighteen-year-old Mary Shelley became the most precise post-mortem of corporate failure: from FBI Sentinel to Healthcare.gov."
date: 2026-03-27
date_created: "2026-03-27"
date_updated: "2026-05-13"
weight: 30
chapter: 2
act: "I: Origins"
category: analysis
reading_time: "25 min"
tags:
  - mary-shelley
  - frankenstein
  - project-failure
  - corporate-prometheus
  - technology-hubris
related:
  - "/chapters/chapter-0-pilot"
  - "/chapters/chapter-1-jules-verne"
  - "/chapters/chapter-3-holmes"
  - "/chapters/chapter-4-borges"
sensitive: false
toc: true
draft: false
status: verified
sources:
  - "Aldini, Giovanni. *An Account of the Late Improvements in Galvanism* (1804). London. Public demonstrations of galvanism, 1803."
  - "GAO-05-105. 'FBI Trilogy Project,' February 2005. Government Accountability Office. Total VCF budget approximately 170 million dollars."
confidence: high
reviewed_by: "Editorial Team"
review_date: "2026-05-13"
---

> **What this chapter is about.** The dark side of creation. How the pattern "brilliant idea → flight from the consequences" runs like a red thread from Mary Shelley's novel to the largest failures of digital transformation. Why the most dangerous systems are built with the best of intentions, and what happens when the creator walks away.

## Villa Diodati, 16 June 1816

Rain has not let up in three weeks. Over Europe hangs the ash of Tambora, a volcano on the other side of the planet that pumped so much sulfur into the stratosphere that summer was canceled for good. Historians will call 1816 "the year without a summer," but the eighteen-year-old Mary Godwin — not yet Shelley — sits by the fire at the Villa Diodati and listens to Byron and Percy argue about galvanism with the appetite of scientists ready to rewrite the laws of nature.

Can electricity revive dead tissue? The question already has an ominous answer in the London demonstrations of Giovanni Aldini: the limbs of executed criminals jerked, jaws fell open.¹ Spectators fainted in horror. The dead did not rise, but the boundaries of the possible had shifted for good.

Byron proposes a wager: each will write a horror story on this cursed villa where the rain has washed summer off the map. Percy and Polidori will compose their stories and abandon them within days; Byron too will step back. But the eighteen-year-old Mary will produce a novel that will outlive all of them and become a prophetic text for an age not yet born.

Two hundred and eight years later, that novel describes every second corporate crisis more precisely than McKinsey describes its own recommendations. Only the ingredients have changed. The structure has stayed the same.

For galvanism, substitute digital transformation. For dead tissue, inherited processes. For the electrical charge, the "Big Bang launch."¹⁵ For the creature wandering the Arctic in search of its maker, we get a system of fourteen Jira boards, seven Confluence spaces, and three mutually exclusive definitions of "done." A monster no one dares to switch off, because no one fully understands how it is put together.

---

The previous chapter showed the bright side of creation. How Verne and Hetzel invented the prototype of iterative development through increments, feedback cycles, and data-driven decisions, producing a literature capable of giving life to a pattern that would transform an entire industry.

*Frankenstein* is the dark side of the same coin. A story of what happens when the creator refuses to take responsibility for how his creation lives and develops after being launched into production.

If Chapter 1 was about the birth of a project, Chapter 2 is about what happens when the parent walks away and leaves the offspring to fate.

## The Anatomy of Flight

*Frankenstein; or, The Modern Prometheus* is the story of a scientist who created an intelligent being, was horrified by the result, and fled the laboratory. Not because the creature was evil by nature. Because Victor Frankenstein had thought through neither an operational model nor a support strategy for what would happen after the launch.

Read the novel closely. Victor works on the project for two years in total isolation, consulting no colleagues, discussing no ethical consequences, laying out no operational plan for supporting the result. He is obsessed with the technical question alone: *can* life be created? The question of whether it *should* is put off for later. The question of what to do with the result afterward is not asked at all.

At the critical moment of launch, a catastrophe of perception occurs. The creature opens a dull yellow eye, breathes with difficulty, its limbs convulsing. And Victor, instead of triumph, is seized with horror. Shelley's canonical passage: "I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs. […] the beauty of the dream vanished, and breathless horror and disgust filled my heart."¹⁴ He commits the act that will define the whole subsequent tragedy. He runs.

He literally runs out of the laboratory and goes to bed, as if the problem will solve itself.

This is not gothic. It is an operational protocol every corporate employee will recognize at first glance:

1. **The visionary** sells a revolutionary idea to the board of directors.
2. **The team** works in isolation for two years without user feedback.
3. **The launch:** the system looks nothing at all like the handsome slide deck.
4. **The visionary** is promoted to a "strategic role" (an elegant way to run away and go to bed).
5. **The creation** starts living a life of its own, unpredictable.

Mary Shelley did not write a gothic scare-piece. She wrote the first detailed post-mortem in literary history of a failed launch of a complex system.

And, as in every quality post-mortem, the main conclusion is not "we accidentally created a monster." It is something far worse: **we knew we were creating a monster, and consciously did not stop**.

To stop would have meant admitting the truth to investors and team. The original idea was not merely bad; it was catastrophically incomplete at the level of architecture.

Victor Frankenstein is a brilliant student with a sharp mind and deep knowledge. His fundamental problem is not a lack of intellect. He catastrophically confuses *the technical capacity* to create something with *the readiness* to bear responsibility for the consequences.

The gap between "I can do this" and "I have to support it" is Arctic. Projects, careers, and, as the novel shows, human lives die in that gap.

Consider now three documented histories from corporate practice. All of them are real, all of them have been meticulously documented by government auditors, and all of them are perfect repetitions of the gothic plot invented by an eighteen-year-old girl at the fireside of a cursed villa on Lake Geneva.

## FBI Sentinel: A $451 Million Monster

In 2001, Robert Mueller became director of the FBI a week before September 11, and the investigation of the attacks laid bare a technological nightmare that could no longer be ignored. Agents were working with paper files as if it were the 1950s; information did not circulate between departments because of incompatible systems; the central case-management platform, Automated Case Support, had been written on 1980s technology and was falling apart before everyone's eyes.²

Mueller — a man of military discipline and strategic thinking — did exactly what every corporate visionary does at the moment of crisis. He announced a grand project of full digital transformation. The Virtual Case File system was to become the digital brain of the FBI, a revolutionary case-management platform. Budget: 170 million dollars. Primary contractor: Science Applications International Corporation (SAIC). Deadline: an ambitious three years.

The result, after three years and 170 million spent, was frighteningly simple. Absolutely nothing functional. Virtual Case File was written off entirely as unworkable, Congress demanded detailed explanations and public hearings, and the FBI stone-faced announced that it was starting the process over.

The new project was given the name Sentinel. The new budget grew to 451 million dollars, the new deadline was set for 2009, the new contractor was Lockheed Martin, and the architectural pattern of failure remained absolutely the same. Victor Frankenstein returns triumphantly to his laboratory with an even bigger budget and even grander plans for resurrecting the dead.

By 2010, the Sentinel project had spent 405 of its 451 million and had proudly delivered only two of the four promised phases. Lockheed Martin ceremoniously handed over a system that agents flatly refused to use, for a simple reason: it worked more slowly than their familiar paper files.³

The Inspector General of the Department of Justice published a dry bureaucratic audit with classic formulations: the project suffered from "a lack of a disciplined approach to requirements management, inadequate quality control, and weak coordination among participants."⁴ Translated from bureaucratic into gothic, this means a simple and terrifying truth: the creator methodically sewed a technical being from disparate borrowed limbs, ran a heavy current of government money through it, and was horrified when the monster stirred in a way that had nowhere appeared in the elegant architectural drawings.

Only in 2012 did the FBI finally do what should have been done in 2001: take the project away from the outside contractor, radically shrink the team to forty people, switch to iterative development with two-week cycles, and complete all the remaining work in one year, spending under 30 million dollars.⁴

The tally: thirteen years of torment, more than six hundred million spent, two totally failed projects. In the end, the solution that actually worked — a small internal team, short iterations, no grand plan at all — cost less than the annual budget of the original Virtual Case File.

Hetzel nods sagely from 1870. Increments, constant feedback, continual calibration by results. Mary Shelley nods sadly from an even more distant 1818, with a simple and vital truth: do not abandon what you have created.

But the most striking detail of this story lies not in the scale of the failure. It lies in the nature of the solution that finally worked. When Chad Fulgham took over the internal Sentinel team, he did not hire more programmers; he removed extra people. He did not write a more detailed specification; he abandoned plans altogether in favor of two-week iterations. He did not purchase more expensive technology; he made maximum use of what the FBI already had.

A team of forty in one year did what hundreds of specialists had not been able to do in twelve years of dramatic struggle. It happened not because the new team was smarter or more talented than its predecessors, but because they made a fundamentally different decision: they stayed in the laboratory and took responsibility for the result.

## Healthcare.gov: The Launch Heard Round the World

On 1 October 2013, the Obama administration launched Healthcare.gov with great ceremony. It was the federal medical-insurance portal, the central technological element of the revolutionary Affordable Care Act, the system meant to let millions of Americans easily choose and buy an insurance plan.

In the first hours after launch, the site did not merely slow. It fell over entirely under the load of millions of users. Of the millions of desperate attempts to register in the first days, literally a handful succeeded. According to testimony presented at the dramatic hearings of the House Committee on Energy and Commerce, the number of successful registrations on the first day was measured in single digits. The incredible figure "six people in the entire country" was heard,⁵ though the exact counting methodology would later be disputed.

A thorough investigation by the House committee established a striking fact. The grand project was simultaneously managed by "55 different contractors without a single coordinating systems integrator,"⁶ while the Centers for Medicare & Medicaid Services (CMS) heroically tried to fill the incompatible roles of client, project manager, and systems integrator, without a shred of experience in the last of these and without the necessary resources.

Victor Frankenstein in his gothic laboratory at least worked in proud solitude and bore personal responsibility for the result. Healthcare.gov had 55 pairs of hardworking hands scattered across different contractors and not a single coordinating head that saw the whole picture.

In its detailed 2015 report, the GAO documented three critical architectural errors: "key technical requirements continued to change fundamentally right up to the final weeks before the ceremonial launch, full-scale load testing of the system under actual user load was never performed, and the final decision to launch on October 1 was made exclusively on political grounds,"⁷ ignoring the technical recommendations entirely.

It is crucial here not to slide into political polemic; that goes far beyond our analysis and distracts from the main lesson. What matters is the architectural structure of the failure, which turns out to be gothic to the point of gooseflesh. The same vaulted corridors of Frankenstein's castle, only paneled in modern drywall and lit by LED panels:

**Visionary** (legislative initiative) → **Grand design** (a single portal for the whole country) → **Team in isolation** (55 contractors without coordination) → **Launch to schedule** (a political deadline) → **Flight** (no one was personally responsible for the system's actually working).

Mary Shelley could have written this plot without changing a line of the novel's structure. Victor assembles a being from disparate parts taken from different sources. Each part is functional on its own. Together, a monster. And the creator does not stay to teach it to walk.

Healthcare.gov was eventually fixed, but it took two months of intensive work by a special "surge team" of the best experts drawn from Google, Oracle, and Red Hat, along with a complete rebuild of the system's architecture from scratch. The bitter irony of the situation was that the people who successfully fixed Healthcare.gov worked exactly on the principles described in the first chapter of this book: a small focused team, short iterative cycles, daily feedback from users. A methodology the old Hetzel would have approved without hesitation.

But the technical fix to Healthcare.gov cost not only budget dollars and human effort. It cost irrecoverable public trust: a currency that cannot be refactored or optimized away. Therein lies, perhaps, the most important lesson of the *Frankenstein* novel for the corporate world. Technical problems are almost always technically solvable given enough resources and expertise. Reputational damage is not. Frankenstein's creature could, in theory, have been taught, raised, guided in a constructive direction — but only until it killed William, Justine, and Clerval, after which the point of no return had been definitively crossed. Not because the monster had become fundamentally incorrigible, but exclusively because Victor had waited too long, had put off taking responsibility.

## BBC Digital Media Initiative: The Silent Monster

Not all of Frankenstein's monsters put on loud theatrical performances with the wrecking of furniture and public scandal. Some prefer to devour resources quietly and methodically in the corporate basement, growing slowly in the dark until somebody happens to look in with a flashlight.

In 2008, the BBC launched the Digital Media Initiative (DMI), a system that was to modernize content production and management. A fully digital workflow, from filming to broadcast. Budget: £98 million.⁸

The project was initially given to Siemens IT Solutions. In 2009, the BBC terminated the contract and decided to build the system in-house. A familiar decision. The FBI would do the same with Sentinel three years later, and there it would work. But the FBI shrank the team and switched to iterations. The BBC did not.

Instead, the BBC continued building the monolith. The internal team inherited the grand design and did not dare revise it.

The UK National Audit Office published a report in January 2014. The conclusions were devastating: "At the point of closure the DMI had not delivered any of its stated outcomes."⁸

Zero. Ninety-eight million pounds. Zero result.

The NAO established that the project suffered from "insufficient oversight by the BBC's leadership, a lack of clarity in roles and responsibilities, and weak risk management."⁸ The report noted that the BBC's leadership was "not receiving adequate information about the status of the project,"⁹ and that technical problems were systematically understated in reporting.

### The Monster No One Saw

DMI represents the purest and clinically most precise case of Frankenstein syndrome in contemporary corporate practice. Here there was not even a dramatic catastrophic launch with public scandal. The monster did not break loose to smash the city. It died quietly and unnoticed in the basement, having methodically eaten its entire budget along the way. Nor did the creators flee the laboratory in panic. They simply stopped looking in, hoping the problem would somehow solve itself.

Ninety-eight million pounds equals two thousand two hundred entry-level BBC journalists' annual salaries. Or the budget of several *Doctor Who* seasons. Or, to translate into Mary Shelley's language, enough electricity to bring a whole cemetery back to life, not just one monster.

Mary Shelley described this too. There is a moment in the novel that is often missed: Victor does not merely run from the creature. He actively avoids information about it. Does not ask. Does not look. Hopes the problem will disappear on its own. The BBC did the same. Its leadership did not want to know the real status of the project, because knowing obliges you to act.

## Frankenstein as Methodology

Now a thesis that will infuriate the consultants who implement Agile methods: the implementation of Agile methods in large organizations is an attempt to revive dead tissue with galvanism.

The formulation is provocative. Take it apart.

The classic implementation of Agile is built on seductively simple logic. You take an existing organization with an established hierarchy, formal processes, and a conservative culture, and you "transform" it into a flexible, adaptive, cross-functional structure through a series of magical rituals. You hire an army of outside coaches, run inspirational trainings, ceremoniously rename managers as Scrum Masters, and solemnly introduce sacred ceremonies with pretty names.

Three problems.

**Problem one: the electric shock does not create life.** Aldini made dead limbs jerk. Spectators took it for revival. The body twitched, but did not live. The organization that has gone through a "transformation" twitches. It holds stand-ups, fills in boards, attends retrospectives. But if the culture has not changed, this is galvanism: the appearance of motion without life.

**Problem two: the creator ceremoniously flees after the ceremony.** The consulting firm runs a large-scale implementation over six to twelve months, receives thanks and a check, and then elegantly disappears from the horizon. The organization is left alone with shining new processes that no employee understands deeply enough to adapt to real working conditions. Victor Frankenstein in a corporate suit, taking his ceremonial leave of the laboratory with the words: "We have given your company a new life. Develop it from here yourselves."

**Problem three: the monster takes revenge.** Frankenstein's creature is not born evil. It becomes destructive from abandonment. Zombie processes — procedures formally observed but drained of content — appear not because Agile methods are bad. They appear because the creators walked away. Stand-ups turn into reports to the boss. Retrospectives turn into a formality. Sprints turn into rigidly planned two-week cascades. The monster is alive, but it is not the life the creator had in mind.

The creature in Shelley's novel learns to speak by reading Milton, Plutarch, and Goethe, in secret, eavesdropping through the wall of a hut. Zombie processes learn to speak by eavesdropping on real Agile through the wall of the conference room: they pick up the words ("sprint," "backlog," "velocity") without understanding the meaning. The result is the same. A being speaking a human language, not understood by people. And not understanding itself.

## Nokia: When the Creator Refuses to See the Monster

The Nokia story presents a fundamentally different type of corporate monster. Here the destructive force was not a specific failed project, but the collective refusal of an organization to see the changing reality and admit inconvenient facts.

In 2007, Nokia controlled more than 50 percent of the world smartphone market (about 51 percent in Q4 2007).¹⁰ By 2013, less than 3 percent.¹⁰ Vuori and Huy of INSEAD published a detailed analysis in *Administrative Science Quarterly*, based on 76 interviews with Nokia managers. Their conclusion: organizational fear paralyzed Nokia's ability to respond to the iPhone threat.¹¹

Not a lack of technology. Not a shortage of resources. Fear.

Middle managers knew about the problems with Symbian, the operating system that could not compete with iOS. But they were afraid to bring bad news to the leadership. The leadership, in turn, transmitted optimism, without a full picture. Information was filtered at every level of the hierarchy. Each level saw its own version of the creature, and no version matched reality.¹¹

This is not Victor fleeing from the laboratory. This is Victor standing in front of the creature and persuading himself he sees an angel.

Vuori and Huy described a mechanism they called "distributed attention"¹¹: when an organization is so large that no single person sees the full picture, responsibility dissolves. Each person is responsible for a fragment; no one is responsible for the whole. Frankenstein's monster had at least one creator to whom it could put the question: "Why did you make me?"²⁸ Nokia was an organism with no single author, and there was no one of whom the question could be asked.

Nokia did not miss the smartphone revolution out of stupidity. It missed the revolution because the structure of the organization made truth impossible. The monster stood in the room, and everyone agreed not to notice it.

## The Arctic of Technical Debt

Where do abandoned projects go? In Mary Shelley's novel, to the Arctic. Frankenstein's creature flees to the North Pole, into the emptiness where there are no people. Victor pursues it and dies in the ice.

The Arctic of technical debt: the space into which systems retreat that have been given up on but cannot be switched off.

Every corporation older than ten years has its own Arctic. COBOL systems in banks, written by people who have long since retired. ERP configurations no one understands in full. Internal tools written by an intern in 2009 that became critical infrastructure.

Created with the best of intentions. Abandoned by their creators. Wandering through the icy waste of corporate infrastructure, hated and irreplaceable. Frankenstein's creatures in the most precise sense.

Frederick Brooks in *The Mythical Man-Month* described a law that might hang over the entrance to Victor's laboratory: "Adding manpower to a late software project makes it later."¹² A monster-project does not become docile from the number of people set upon it. It becomes more complex and more dangerous.

According to industry research (Standish Group, CHAOS Report 2018), projects that delayed key decisions ("decision latency") have half the success rate.¹³ Flight from a decision is not a neutral act. It is an act of destruction stretched out in time.

Victor could have saved both himself and the creature, if he had stayed. Not fled. Not put it off. Not "delegated" to another team. Stayed and taken responsibility for what he had made.

Each of this chapter's examples — FBI, Healthcare.gov, BBC, Nokia — repeats one pattern: flight from responsibility for what has been created. And every time the solution comes the same way: someone stops fleeing and starts sorting it out.

There is a bitter irony in the fact that an industry preaching "fail fast, learn fast"²⁶ is panic-stricken about admitting failures. Fail fast — so long as it is an A/B test of a button on the landing page. When it is a half-billion-dollar system: fail quietly, blame the vendor, restructure the leadership.²⁷ Mary Shelley was more honest: in her novel Victor pays for his flight with his life. The corporate Victor pays for it with a transfer to another department and stock options.

## The Five Stages of Corporate Grief

Before moving on to the structure, an observation you will not find in the auditors' reports, but which is known to everyone who has lived through a major project failure.

When the corporate monster at last begins openly to break the furniture and shatter the shop windows, any afflicted organization inevitably passes through the five classic stages of grief, which can be observed with chronometric precision.

**Denial of reality.** *The system works perfectly, the users just have not been trained enough on the new procedures.*¹⁵ Nokia said with a straight face: "Symbian remains a competitive platform."¹⁶ The Healthcare.gov administration insisted: "These are temporary scaling problems that will resolve themselves."¹⁷ Victor Frankenstein convinced himself: "The creature has gone far off into the mountains; it will never come back."¹⁸

**Anger.** *It's the contractor's fault, the vendor's fault, the previous team's fault.*¹⁹ FBI: "SAIC failed on Virtual Case File."²⁰ BBC: "Siemens did not handle DMI."²¹ Victor: "This being is a monster, not I."²²

**Bargaining with reality.** *If we just add another 200 million to the budget, or hire one more systems integrator, or run one more global transformation, then everything will magically fall into place.*²³ This is the most expensive stage of all, on which organizations are ready to pay any amount rather than admit a fundamental architectural error. The FBI bargained with fate for thirteen years; the BBC stretched this stage over six.

**Depression.** *The project is dead, the money is spent, nothing works.*²⁴ In this stage, leaders are usually changed, restructurings are announced, post-mortems are written. A useful stage — as long as you do not get stuck in it.

**Acceptance.** *We built the wrong thing. Now we have to work with what we have.*²⁵ The only productive stage. The FBI reached it in 2012. Healthcare.gov, in two months. The BBC never (the project was closed).

Victor Frankenstein reaches acceptance too late. In the ice, dying. He tells his story to Captain Walton not as an apology, but as a warning. A post-mortem in the literal sense.

## The Gothic Cycle: From Creation to Recognition

Mary Shelley — again: she was eighteen — described a universal cycle of self-destruction that the corporate world rediscovers with maniacal precision every decade, as if reading the score of a tragedy. The cycle invariably begins with genuinely honest inspiration and noble motives. Victor Frankenstein wants to defeat death; Director Mueller wants to protect the country from terrorism; the architects of Healthcare.gov want to give medical insurance to millions of Americans; the leadership of the BBC wants to revolutionize television production. In every case the problem is absolutely real, the solution seems technically feasible, and the ambition is morally impeccable.

Then inevitably comes the fatal stage of isolation. The creator begins to work in complete separation from those whom the creation will directly affect. Victor does not consult family and colleagues. The FBI hands the project over to an outside contractor without deep participation by agents. Healthcare.gov is built without comprehensive testing with real users. The BBC gradually stops informing its own leadership of the real state of the project. Only two stages, but already here, in this deceptively quiet part of the gothic novel, the fate of the monster is definitively sealed.

Inevitably comes the moment of truth: the ceremonial launch into production. Frankenstein's creature slowly opens yellow eyes; the corporate system formally enters the production environment to the drumroll of press releases; and the result catastrophically fails to match the elegant expectations. Every time, without a single exception.

> And it is here that the creator breaks. Victor goes to bed. The contractor delivers "phase 1" and switches to another contract. The consultants close the "transformation project" and leave. The executive moves to a "strategic role." Flight never looks like flight. It is always dressed up as a promotion.

A creation abandoned to its fate inevitably becomes a destructive force. Not out of innate malice or defects in architecture, but exclusively out of abandonment and the absence of care. Zombie processes, legacy systems requiring support, methodically devouring resources, epic failures systematically destroying user trust — all these monsters take revenge not because they were originally built as monsters, but exclusively because their creators fled at the critical moment and left them without support.

The only way out is what Mary Shelley calls recognition, and what the auditors call "taking responsibility after the first losses." The FBI took Sentinel back from Lockheed Martin. Healthcare.gov was rebuilt by a rapid-response team. Recognition does not guarantee salvation — Victor dies in the ice — but without it, nothing can be repaired.

The cycle is not a metaphor. It is the operational model of failure.

## From Monster to Child

Mary Shelley in her gothic novel posed a fundamental question of the modern age: what happens when the creator of a technology abandons its creation to fate? But this dark question has a bright mirror twin, and that is what should lead us further through the labyrinth of corporate reality: what happens in those rare cases when the creator takes responsibility and stays with the creation?

The previous chapter on Jules Verne showed us the exemplary case of healthy creation: iterations, continual feedback, mutual adaptation — when creator and creation evolve organically together, as a single system. *Frankenstein* demonstrated the tragic consequences of a catastrophic break in this living connection. What remains is to examine the third, most difficult position. Not the moment of creation, not the drama of the break, but the long-term responsible stewardship of a project. This is not a technical manual, not an administrative certificate, not a philosophical choice between waterfall development and Agile. It is a literary archetype in which the creator consciously does not run from the consequences but patiently learns to live and work with what he has made.

For that, we must leave the laboratory and go to Baker Street.

---

**Footnotes**

¹ Giovanni Aldini conducted public demonstrations of galvanism in London in 1803 on the body of the executed George Forster. Documented in *An Account of the Late Improvements in Galvanism* (Aldini, 1804).

² Virtual Case File: GAO-05-105, "FBI Trilogy Project," February 2005. The total VCF budget was approximately $170 million; the project was written off entirely in April 2005.

³ Status of Sentinel: DOJ OIG Audit Report 10-03, October 2009. At this point Sentinel had spent $405 million of the planned $451 million and had delivered only 2 of 4 phases.

⁴ DOJ OIG Audit Report 12-08, November 2011. "The FBI's Sentinel Information Technology Project." The report documents both the problems of the project under Lockheed Martin's management and the successful completion of the project by the FBI's internal team using an Agile approach. (Quotations back-translated from the RU master's rendering of the report; canonical English text in the DOJ OIG report itself.)

⁵ Testimony before Congress, October 2013. Figures on the number of successful first-day registrations were cited in hearings of the House Committee on Energy and Commerce.

⁶ US House Committee on Energy and Commerce, Majority Staff Report, "Behind the Curtain of the Healthcare.gov Rollout," September 2016. (Quotation back-translated from the RU master; canonical English text in the report.)

⁷ GAO-15-238, "Healthcare.gov: CMS Has Taken Steps to Address Problems, but Needs to Further Implement Systems Development Best Practices," March 2015. (Quotation back-translated from the RU master; canonical English text in the report.)

⁸ UK National Audit Office, HC 985, "The BBC's Digital Media Initiative," January 2014. Total project cost estimated at £98.4 million; "the BBC has not achieved value for money."

⁹ UK National Audit Office, Briefing for the Public Accounts Committee, "Managing the BBC's Digital Media Initiative," Session 2013–14.

¹⁰ Nokia market-share data based on industry research (IDC, Gartner, 2007–2013). Nokia Corporation's annual reports confirm the downward trend.

¹¹ Vuori, T. O., & Huy, Q. N. "Distributed Attention and Shared Emotions in the Innovation Process: How Nokia Lost the Smartphone Battle." *Administrative Science Quarterly*, Vol. 61, Issue 1, 2016, pp. 9–51. The study is based on 76 interviews with top and middle managers at Nokia.

¹² Brooks, Frederick P. *The Mythical Man-Month: Essays on Software Engineering* (1975). Addison-Wesley. "Adding manpower to a late software project makes it later" — Brooks's law.

¹³ Standish Group, CHAOS Report 2018. Decision Latency Theory: correlation between the speed of decision-making and project success.

¹⁴ Shelley, Mary. *Frankenstein; or, The Modern Prometheus* (1818). Chapter 5. The moment of the creature's awakening: "It was on a dreary night of November, that I beheld the accomplishment of my toils. […] by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs. […] the beauty of the dream vanished, and breathless horror and disgust filled my heart." The famous line "It's alive!" is from James Whale's 1931 film, not from Shelley's novel.

¹⁵ Typical statement of corporate representatives in the denial phase: a generalization from pattern. (Author's illustration.)

¹⁶ Nokia Corporation. Official statements, 2007–2010: a generalization of corporate communication. (Author's illustration.)

¹⁷ CMS/Healthcare.gov. Official statements, October 2013: a generalization of crisis communication. (Author's illustration.)

¹⁸ Shelley, Mary. *Frankenstein; or, The Modern Prometheus* (1818). Victor's thoughts after his flight. (Author's rendering.)

¹⁹ Typical formulation of corporate blame-shifting. (Author's illustration.)

²⁰ FBI. Official position on the Virtual Case File failure. (Author's summary.)

²¹ BBC. Official position on DMI. (Author's summary.)

²² Shelley, Mary. *Frankenstein; or, The Modern Prometheus* (1818). Victor's attitude toward the creation. (Author's rendering.)

²³ Typical formulation of corporate bargaining in the crisis phase. (Author's illustration.)

²⁴ The depression stage in the corporate cycle of grief. (Author's illustration.)

²⁵ The acceptance stage in the corporate cycle of grief. (Author's illustration.)

²⁶ Eric Ries. *The Lean Startup* (2011). Principle of fast learning through failure.

²⁷ Author's observation — a corporate anti-pattern in the case of major failures. (Author's illustration.)

²⁸ Shelley, Mary. *Frankenstein; or, The Modern Prometheus* (1818). The creature's question to the creator. (Author's rendering.)

---
---

---
