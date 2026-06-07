<!-- precommit:allow-ai-mentions -->
---
title: КиберГонзо — Claude Design + Open Design + Steampunk Research 2026-06-07
version: 1.0
date: 2026-06-07
classification: REFERENCE — verified research для CLDESIGN epic foundation
authority: КиберГонзо OSINT methodology (16 verified sources, evidence-first)
source: V-batch parallel agent 2026-06-07, ~35 min research budget
status: COMPLETE — supplements baseline (project_claude_design_saas_2026_06_02.md, 117 lines, 13 sources)
---

# КиберГонзо: Claude Design + Open Design + Steampunk research 2026-06-07

Evidence-first verification of 4 topics для preparation к Claude Design SaaS first session.
Cross-link к baseline: `~/.claude/projects/C--JOHNDOE-CLAUDE-folkup-landing/memory/project_claude_design_saas_2026_06_02.md`.

## Topic 1 — Claude Design SaaS updates since launch

**Shared-pool change confirmed** [Source 1, PiunikaWeb May 28 2026]: Phased rollout 27-28 мая 2026. Affects Pro/Max/Team/Enterprise. Anthropic не сделал public statement at publish time. No workarounds documented. No specific quota numbers published.

**🚨 CRITICAL follow-on change June 15, 2026** [Sources 2, 3]: Anthropic splitting Agent SDK + `claude-p` usage в separate monthly credit pool sized к subscription:
- Pro $20/month credit
- Max 5x $100/month credit
- **Max 20x $200/month credit** ← Андрей's tier
- Effective **June 15, 2026** — kills «unlimited» programmatic subsidy

**Implication для FolkUp:** Если Claude Design counts as «interactive» (не Agent SDK), Андрей's Claude Design sessions still draw against main pool. **Pre-session verification needed (~June 15)** какой pool Claude Design uses.

**Other platform updates** [Source 4]:
- **Claude Opus 4.8** теперь default на Max plans
- **Dynamic workflows** on by default Max/Team
- **Self-hosted Managed Agents** sandboxes (Cloudflare/Daytona/Modal/Vercel)
- **Fast mode** $10/$50 per MTok (2.5x speed at 2x cost)

**No published changelog для Claude Design specifically** — Anthropic treats Claude Design changes как server-side rollouts.

## Topic 2 — Open Design (nexu-io) verification

**Repository:** https://github.com/nexu-io/open-design [Source 6]

| Claim (Иви Phase D) | Verified | Notes |
|---|---|---|
| v0.9.0 released 2 June 2026 | ✅ **Yes** — June 2 2026 13:04 UTC [7] | «Design for everyone» tagline |
| 142-150 ready DESIGN.md systems | ✅ **150 brand-grade systems** | 72 from VoltAgent + 70 imported + 2 hand-authored (cisco, webex) |
| ~310 contributors | ⚠️ **Unverified** — count not exposed | «Three active maintainers listed» |
| ~57k stars | ❌ **Actually 60.2k** stars [6] | Higher than claimed |
| License | ✅ **Apache-2.0** + MIT bundled templates | Permissive both layers |
| Self-hosted | ✅ **macOS + Windows desktop apps + Docker Compose** | Node 24 / pnpm 10.33 / SQLite local |
| Claude Design ZIP import | ⚠️ **Endpoint exists** `/api/import/claude-design`, workflow NOT в release notes | NEEDS hands-on verification |
| 21+ AI CLIs supported | ✅ **Confirmed** | Claude Code, Codex, Cursor, Copilot, Gemini, Kimi, Qwen etc. |
| Active maintenance | ✅ **2,037 commits / 215 issues / 112 PRs / Fellow program** | Healthy |

### Comparison: Claude Design SaaS vs Open Design (nexu-io)

| Aspect | Claude Design SaaS | Open Design (nexu-io) |
|---|---|---|
| Hosting | Anthropic cloud | Local-first / desktop app |
| Cost | Bundled с subscription | Free (Apache-2.0) |
| Quota | Shared pool (post-2026-05-28) | Unlimited (BYOK для AI) |
| Bundled DESIGN.md | 0 (you bring own) | **150** ready |
| Skills | Anthropic-controlled | **259+** skills |
| Export | ZIP/PDF/HTML/Canva | HTML/PDF/PPTX/MP4 |
| Vendor lock-in | **HIGH** (proprietary handoff) | **LOW** (open standards) |
| Model choice | Claude only | BYOK proxy (any) |
| GitHub integration | Read public repos | Native git connect |
| Multi-language UI | EN-primary | **18 locales** |

**Verdict:** Open Design = **viable Cooper-Safe escape hatch** от vendor lock-in risk. **NOT replacement** (Claude Design SaaS лучше для Anthropic-native handoff loop), но disaster-recovery option и/или parallel exploration platform.

## Topic 3 — Steampunk design system landscape

**Verification Ивиного claim «нет цельных опенсорсных стимпанк дизайн-систем»:** ✅ **CONFIRMED.**

**VoltAgent/awesome-design-md inventory** [Source 8]: 72 brand DESIGN.md examples — **ZERO steampunk/victorian/industrial/vintage themes**. Только retro-adjacent = **Dell-1996** («catalog-era enterprise web»).

**Open Design (nexu-io) 150 systems** [6] — same VoltAgent base + Cisco/Webex. Same gap.

**Niche steampunk resources found** (NONE «cohesive design systems»):
1. **lacockj/bs4-steam-theme** — Bootstrap 4 Steampunk theme, custom «corners» decorative. **Most complete found.**
2. **DavidSoleraRomero/steampunk** — content website (brass rockets, Victorian cosmic). Standalone.
3. **Chris-Jones-Gill/kwd-gt-steampunk** — Ghost blogging theme.
4. **EricNichandros/steampunk-website** — HTML/CSS/JS project template, Webpack.
5. **bypeople.com CSS Steampunk Lighting Loader** — single loader component.

**Adjacent options для TweakCN/shadcn:** TweakCN supports AI prompt-based theme generation — «steampunk brass copper aged paper» → shadcn theme. Не «cohesive system» но valid path.

**Conclusion:** Иви была права. **No drop-in steampunk DESIGN.md exists.** Если steampunk нужен для конкретного проекта — author from scratch via DESIGN.md с references к bs4-steam-theme как partial inspiration + TweakCN AI generator для quick shadcn baseline.

## Topic 4 — DESIGN.md best practices 2026

**VoltAgent format evolution** [Source 12]: 9-section schema **stabilized** к 2026-Q2:
1. Visual Theme & Atmosphere
2. Color Palette & Roles
3. Typography Rules
4. Component Stylings
5. Layout Principles
6. Depth & Elevation
7. **Do's and Don'ts** (anti-patterns lobe)
8. Responsive Behavior
9. Agent Prompt Guide

Repo size: **88k stars / 10.5k forks / 72 examples / MIT** — grew by 4 since 2026-06-02.

### Anti-patterns / homogenization defenses [Sources 13, 14]

**«AI slop» visual defaults к избегать:**
- Inter / Geist fonts (Claude default)
- Blue/indigo primary accents
- Large rounded corners (excessive)
- Gradient hero sections
- Sidebar nav resembling Shadcn boilerplate
- 50px+ padding framed как «clean»

**Authoring don'ts (cause off-brand drift):**
1. ❌ Vague color language («warm red») — use **exact hex**
2. ❌ Generic font descriptions («clean sans-serif») — name **exact fonts + sources**
3. ❌ Silence on constraints («Silence = Claude defaults»)
4. ❌ Missing negative examples (forgot к ban gradients = gets gradients)
5. ❌ Regenerating перед fixing the document

**What works:**
- Exact hex с semantic role: `--color-primary: #B84A2F /* terracotta, CTAs and links */`
- Named fonts с sources: «Primary: Instrument Serif (Google Fonts)»
- Pixel-level spacing + radius constraints
- **Explicit anti-examples**: «No blues or purples anywhere. No white backgrounds.»
- Test components перед composing layouts
- One document с changelog (avoid fork-and-drift)

**🌟 Quote ценная для FolkUp:** *«The don'ts pulled more weight than the do's across multiple AI tools.»* [13]

### Multi-language strategies для FolkUp (EN+RU+PT) [Source 15]

No DESIGN.md-specific multilingual canon found. **Industry pattern** = describe brand voice once + script-specific typography rules separately (Cyrillic fonts may need different leading, PT diacritics affect line-height).

**Recommendation:** **single `folkup-base.DESIGN.md`** с typography Rules section enumerating per-script font fallback (Pacifico/Cinzel для Latin, Playfair Display SC + EB Garamond для Cyrillic, Latin matches PT). Cross-link к Brand Guide v2.4 typography lock.

## Knowledge gaps (что НЕ found)

1. **Anthropic official changelog для Claude Design** — does not exist publicly. Changes happen via server-side rollout без announcement. **Implication:** quarterly КиберГонзо poll IS needed.
2. **Claude Design API access** — confirmed unavailable. NO programmatic interface.
3. **Open Design ZIP import workflow primary docs** — endpoint exists, docs gap. Needs hands-on test.
4. **Post-June-15 verification** which pool Claude Design draws against — only resolvable after rollout.
5. **Cohesive steampunk design system** — confirmed does not exist в open source.
6. **VoltAgent contributors exact count + license per-file** — repository overview did not expose granular numbers.

## ⭐ Critical recommendations для FolkUp

1. **(P0) Schedule first session AFTER June 15, 2026 cutoff verified** — если Claude Design moves к Agent SDK pool, $200 Max 20x credit меняет calculus. Pre-session: quick curl Settings → Usage Anthropic чтобы confirm Claude Design's pool assignment.

2. **(P1) Add CLDESIGN-011 — Disaster-recovery clone в Open Design** — install Open Design desktop app на Андрей's machine BEFORE first Claude Design session. Export `folkup-base.DESIGN.md` к **both** platforms в parallel. Если Anthropic ever degrades Claude Design (homogenization concern, shared-pool exhaustion, deprecation), Open Design = ready failover.

3. **(P1) Strengthen DESIGN.md anti-pattern section** based на 2026 best practice — explicit «No Inter, no Geist, no blue/indigo primary, no large border-radius, no 50px padding» list. Без этого Claude Design defaults будут drift к homogenized look.

4. **(P2) Multi-language DESIGN.md** — single `folkup-base.DESIGN.md` с per-script typography subsection (Latin/Cyrillic/PT). NOT 3 separate files. Avoid fork-and-drift anti-pattern.

5. **(P2) Quarterly poll** для Anthropic Claude Design changes — no official changelog exists. Sources к monitor: status.claude.com, piunikaweb.com, releasebot.io, blagodesign.com.

## Sources index (16 verified URLs, dates 2026-06-07)

1. [Claude Design merges usage limits — PiunikaWeb 2026-05-28](https://piunikaweb.com/2026/05/28/claude-design-usage-limits-with-claude-ai-and-claude-code/)
2. [Anthropic Splits Claude Subscriptions June 15 — DevToolPicks](https://devtoolpicks.com/blog/anthropic-splits-claude-subscriptions-agent-sdk-credit-june-2026)
3. [Claude API Pricing Changes Ends June 15 2026 — IT-Connect](https://www.it-connect.tech/vibe-coding-claude-unlimited-api-ends-on-june-15-2026/)
4. [Claude Updates by Anthropic June 2026 — Releasebot](https://releasebot.io/updates/anthropic/claude)
5. [Claude Status page incidents — status.claude.com](https://status.claude.com/)
6. [nexu-io/open-design GitHub repository](https://github.com/nexu-io/open-design) (60.2k stars, Apache-2.0)
7. [Open Design 0.9.0 release notes](https://github.com/nexu-io/open-design/releases/tag/open-design-v0.9.0) (released 2026-06-02 13:04 UTC)
8. [VoltAgent/awesome-design-md design-md/ directory](https://github.com/VoltAgent/awesome-design-md/tree/main/design-md)
9. [GitHub search «steampunk CSS theme»](https://github.com/lacockj/bs4-steam-theme) + DavidSoleraRomero/steampunk + Chris-Jones-Gill/kwd-gt-steampunk + EricNichandros/steampunk-website
10. [CSS Steampunk Lighting Loader — Bypeople](https://www.bypeople.com/css-animated-steampunk-lighting-loader/)
11. [TweakCN — Theme Editor для shadcn/ui](https://tweakcn.com/)
12. [VoltAgent/awesome-design-md README](https://github.com/VoltAgent/awesome-design-md) (88k stars, MIT, 72 examples)
13. [How к Avoid AI Slop When Using Claude Design — MindStudio blog](https://www.mindstudio.ai/blog/claude-design-avoid-ai-slop-design-system)
14. [Stop reinventing design system — Divya Patel Medium](https://medium.com/@divyapatel1697/stop-reinventing-your-design-system-every-project-use-design-md-instead-9485f06eeb4d)
15. [Multilingual UI Design i18n strategy — Translated/Smartling](https://translated.com/resources/multilingual-user-interface-design-ux-ui-localization-guidelines)
16. [VoltAgent/awesome-claude-design](https://github.com/VoltAgent/awesome-claude-design) (68 systems, MIT)

---

**Report compiled:** 2026-06-07 by КиберГонзо session (V-batch parallel agent #2).
**Lesson #42 verify applied:** all factual claims primary-source backed; uncertain claims flagged explicitly.
**Anti-busy-work check PASS:** research has direct actionable output для CLDESIGN epic + first-session prep.
**No secrets accessed.**
