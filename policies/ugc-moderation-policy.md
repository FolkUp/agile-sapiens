---
title: "UGC Moderation Policy"
description: "Comprehensive User-Generated Content Moderation Policy for AGILE SAPIENS"
date: 2026-03-26
date_updated: 2026-03-26
version: "1.0.0"
status: "active"
legal_risk: "high"
reviewed_by: "editorial-board"
review_date: 2026-03-26
compliance:
  - "GDPR"
  - "EU AI Act Art. 50"
  - "ePrivacy Directive"
  - "DSA (Digital Services Act)"
toc: true
weight: 10
---

# UGC Moderation Policy

**Document Version:** 1.0.0
**Effective Date:** March 26, 2026
**Last Updated:** March 26, 2026
**Document Owner:** FolkUp Ecosystem — AGILE SAPIENS Editorial Board
**Contact:** legal@folkup.app
**Review Cycle:** Quarterly (next review: June 26, 2026)

---

## 1. Purpose and Scope

### 1.1 Purpose

This policy establishes the framework for moderating all User-Generated Content (UGC) associated with the AGILE SAPIENS monograph. Given the project's intentional controversy calibration (78% controversy target by design), this policy provides banking-level safeguards to ensure that:

- Controversial content remains within legal and ethical boundaries
- Community discourse is productive, evidence-based, and respectful
- Legal risks are identified, assessed, and mitigated before publication
- Every moderation decision is documented with rationale and audit trail
- GDPR, DSA, and EU AI Act compliance is maintained at all times

### 1.2 Scope

This policy applies to:

- **Comments** on chapters and articles (when comment system is enabled)
- **Discussion forums** associated with the monograph
- **Social media replies and mentions** on FolkUp channels
- **Reader submissions** (corrections, counter-arguments, case studies)
- **Email correspondence** published with consent
- **Guest contributions** and external expert responses

### 1.3 Exclusions

This policy does NOT apply to:

- Editorial content authored by the AGILE SAPIENS team (governed by [Editorial Workflow](/legal/editorial-workflow/))
- Internal team communications
- Private correspondence not intended for publication

---

## 2. Content Classification System

### 2.1 Controversy Levels

All UGC is classified into three controversy levels upon receipt:

| Level | Label | Description | Examples | Response SLA |
|-------|-------|-------------|----------|-------------|
| **L1** | Low | Constructive feedback, corrections, additional sources | "Your source on X is outdated, here's a newer study" | 48 hours |
| **L2** | Medium | Disagreement with thesis, industry defense, emotional reactions | "Scrum works for my team, your criticism is unfair" | 24 hours |
| **L3** | High | Personal attacks, legal threats, organizational responses, defamation claims | PMI/Scrum Alliance official responses, cease-and-desist threats | 4 hours |

### 2.2 Legal Risk Categories

Independent of controversy level, each UGC item receives a legal risk assessment:

| Risk | Criteria | Required Action |
|------|----------|-----------------|
| **Negligible** | No legal implications. Factual, constructive. | Standard moderation |
| **Low** | Mild criticism of public organizations. No personal data. | Moderator review |
| **Medium** | Names individuals, quotes internal documents, or makes unverified claims about organizations | Senior moderator review + documentation |
| **High** | Legal threats, defamation allegations, GDPR data subject requests, copyright claims | Escalation to Legal within 4 hours |
| **Critical** | Court orders, injunctions, regulatory inquiries | Immediate escalation to Legal + management. Content quarantined. |

### 2.3 Classification Decision Tree

```
UGC Received
    |
    v
Contains personal data? ─── YES ──> GDPR assessment (Section 8)
    |                                      |
    NO                                     v
    |                              Legal Risk = Medium+
    v
Contains legal threat? ─── YES ──> Legal Risk = High (Section 6.3)
    |
    NO
    |
    v
Names specific individuals? ─── YES ──> Medium risk + naming protocol (Section 5.4)
    |
    NO
    |
    v
Defends certification bodies? ─── YES ──> L2 Controversy (expected, handle per Section 4.2)
    |
    NO
    |
    v
Constructive contribution? ─── YES ──> L1, standard processing
    |
    NO (hostile, off-topic, spam)
    |
    v
Apply rejection criteria (Section 3.2)
```

---

## 3. Content Standards

### 3.1 Acceptable Content

UGC is welcome when it:

- Provides evidence-based counter-arguments to monograph claims
- Offers additional sources, corrections, or context
- Shares real-world experience (anonymized if involving third parties)
- Engages constructively with the "78% controversy" thesis
- Respects other community members, even in strong disagreement
- Complies with applicable law

### 3.2 Rejection Criteria (Mandatory Removal)

Content is rejected and removed when it contains:

| Category | Description | Legal Basis |
|----------|-------------|-------------|
| **Illegal content** | Incitement to violence, hate speech, child exploitation material | National law, DSA Art. 16 |
| **Defamation** | False statements of fact presented as truth about identifiable persons | Civil law (defamation) |
| **Personal data without consent** | Publishing private information of individuals (doxxing) | GDPR Art. 6 |
| **Copyright infringement** | Reproducing copyrighted material beyond fair use/quotation | Copyright Directive |
| **Spam / commercial** | Unsolicited advertising, SEO manipulation | Terms of Use |
| **Impersonation** | Falsely claiming to represent an organization or individual | Terms of Use |
| **Harassment** | Targeted, repeated hostile behavior toward individuals | Terms of Use, DSA |

### 3.3 Grey Zone Content (Requires Judgment)

The following types require moderator judgment and must be documented:

- **Strong but fair criticism** of certification bodies (PMI, Scrum Alliance, SAFe, etc.) — Generally ALLOWED if factual
- **Anecdotal evidence** contradicting monograph claims — ALLOWED with "individual experience" framing
- **Industry insider information** without public sources — ALLOWED only if anonymized and flagged as unverified
- **Satire and parody** — ALLOWED if clearly identifiable as such
- **Emotional responses** — ALLOWED unless they cross into harassment

---

## 4. Pre-Publication Gates

### 4.1 Gate System Overview

All UGC passes through mandatory gates before publication. No exceptions.

```
Gate 0: Automated Filters (instant)
    |
    v
Gate 1: Content Classification (< 1 hour)
    |
    v
Gate 2: Moderator Review (SLA per classification)
    |
    v
Gate 3: Legal Review (if Medium+ risk)
    |
    v
Gate 4: Editorial Board (if High+ risk or L3 controversy)
    |
    v
PUBLISH or REJECT (with documented rationale)
```

### 4.2 Gate 0 — Automated Filters

**Purpose:** Block obvious spam and illegal content before human review.

Automated checks include:
- Spam detection (link density, keyword patterns, duplicate content)
- Profanity filter (configurable severity levels)
- Known bad actor list (IP/email blocklist)
- Rate limiting (max 5 submissions per user per hour)
- Content length limits (min 20 characters, max 5000 characters)

**False positive handling:** All auto-blocked content is queued for human review within 24 hours. Users receive: "Your comment is awaiting moderation."

### 4.3 Gate 1 — Content Classification

**Who:** Moderator (any level)
**SLA:** Within 1 hour of Gate 0 pass
**Action:** Assign controversy level (L1/L2/L3) and legal risk (Negligible through Critical)

**Documentation required:**
- Classification rationale (free text, min 1 sentence)
- Timestamp
- Moderator ID

### 4.4 Gate 2 — Moderator Review

**Who:** Based on classification level

| Classification | Reviewer | Authority |
|---------------|----------|-----------|
| L1 + Negligible/Low risk | Junior Moderator | Approve/Reject |
| L2 + Low/Medium risk | Senior Moderator | Approve/Reject/Escalate |
| L2 + High risk | Senior Moderator + Legal flag | Must escalate to Gate 3 |
| L3 (any risk) | Senior Moderator | Must escalate to Gate 4 |

**Review checklist (mandatory for every item):**

- [ ] Content complies with Section 3 standards
- [ ] No personal data without consent (GDPR)
- [ ] No unverified factual claims presented as truth
- [ ] Controversy level correctly assigned
- [ ] Legal risk correctly assessed
- [ ] If naming organizations: claims are verifiable
- [ ] If naming individuals: naming protocol applied (Section 5.4)
- [ ] Response template selected (if applicable)

### 4.5 Gate 3 — Legal Review

**Trigger:** Legal risk = Medium or higher
**Who:** Legal advisor (internal or external counsel)
**SLA:** 48 hours for Medium, 24 hours for High, 4 hours for Critical
**Authority:** Approve, Reject, Request modification, Quarantine

**Legal review considers:**
- Jurisdictional analysis (EU/US/other)
- Defamation risk (truth defense, public interest, fair comment)
- GDPR implications (data subject rights, legitimate interest)
- Copyright/trademark issues
- Potential for regulatory action

### 4.6 Gate 4 — Editorial Board Review

**Trigger:** L3 controversy, or any content that could impact project reputation
**Who:** AGILE SAPIENS Editorial Board (minimum 2 members)
**SLA:** 72 hours
**Authority:** Final decision — Approve, Reject, Modify, Respond publicly

**Board decision factors:**
- Alignment with monograph editorial mission
- Strategic impact on community discourse
- Precedent-setting implications
- Risk-benefit analysis of publication vs. suppression

---

## 5. Review Workflows

### 5.1 Standard Flow (L1, Low Risk)

```
User submits UGC
  -> Auto-filter (Gate 0)
  -> Classification (Gate 1)
  -> Junior Moderator approves/rejects (Gate 2)
  -> Published with timestamp
  -> Logged in moderation audit trail
```

**Target turnaround:** 48 hours

### 5.2 Elevated Flow (L2, Medium Risk)

```
User submits UGC
  -> Auto-filter (Gate 0)
  -> Classification (Gate 1)
  -> Senior Moderator reviews (Gate 2)
  -> If legal risk Medium+: Legal Review (Gate 3)
  -> Published/Rejected with documented rationale
  -> Logged in moderation audit trail
  -> If pattern detected: update moderation guidelines
```

**Target turnaround:** 24-72 hours

### 5.3 Critical Flow (L3, High/Critical Risk)

```
User submits UGC
  -> Auto-filter (Gate 0)
  -> Classification (Gate 1) — escalation flag set
  -> Senior Moderator initial assessment (Gate 2)
  -> Legal Review (Gate 3)
  -> Editorial Board (Gate 4)
  -> Decision + response strategy
  -> Published/Rejected/Quarantined
  -> Full incident report filed
  -> Crisis response activated if needed (Section 9)
```

**Target turnaround:** 4-72 hours (initial response within 4 hours)

### 5.4 Naming Protocol

When UGC names specific individuals:

1. **Public figures in professional capacity** (e.g., Ken Schwaber, Jeff Sutherland as Scrum creators) — ALLOWED if factual claims only
2. **Public figures in personal capacity** — REJECTED unless overwhelming public interest
3. **Private individuals** — REJECTED. Request anonymization from submitter
4. **Organizational representatives** (e.g., "PMI's CEO stated...") — ALLOWED if attributed to public statements only

**Triple test for naming (all must pass):**
- Public interest justification
- Proportionality (is naming necessary for the point?)
- Professional capacity (not personal life)

---

## 6. Escalation Matrix

### 6.1 Authority Levels

| Level | Role | Decision Scope | Escalation Trigger |
|-------|------|---------------|-------------------|
| **A1** | Junior Moderator | L1 + Negligible/Low risk | Cannot decide -> A2 |
| **A2** | Senior Moderator | L2 + up to Medium risk | Legal flag or L3 -> A3 |
| **A3** | Legal Advisor | Legal risk assessment, compliance | Board-level impact -> A4 |
| **A4** | Editorial Board | Final authority on all content | External legal action -> A5 |
| **A5** | FolkUp Management + External Counsel | Legal proceedings, regulatory | N/A (top level) |

### 6.2 Escalation SLAs

| From | To | Maximum Time | Method |
|------|----|-------------|--------|
| A1 -> A2 | 4 hours | Internal ticket + email |
| A2 -> A3 | 2 hours | Legal channel (encrypted) |
| A3 -> A4 | 4 hours | Board notification + meeting |
| A4 -> A5 | 1 hour | Emergency protocol |

### 6.3 Specific Escalation Scenarios

#### Scenario: Certification Body Official Response
**Expected:** PMI, Scrum Alliance, SAFe Institute may issue official responses to anti-certification content.
**Classification:** L3, Medium-High legal risk
**Protocol:**
1. Do NOT publish immediately
2. Escalate to A3 (Legal) within 2 hours
3. Verify sender authenticity
4. Legal assessment of response content
5. Editorial Board decides: publish, publish with editorial note, or reject with private response
6. If published: add editorial framing ("Official response from [Organization]")

#### Scenario: Cease-and-Desist Letter
**Classification:** L3, Critical legal risk
**Protocol:**
1. Quarantine all related UGC immediately
2. Escalate to A5 within 1 hour
3. Do NOT respond to sender without legal counsel
4. Document everything — timestamps, communications, content states
5. Preserve evidence (screenshots, server logs, email headers)
6. Legal counsel drafts response within 72 hours

#### Scenario: GDPR Data Subject Request (via UGC)
**Classification:** Legal risk depends on scope
**Protocol:**
1. Acknowledge within 24 hours (GDPR: 30-day response deadline)
2. Identify all UGC containing the data subject's personal data
3. Assess: deletion, anonymization, or legitimate interest basis for retention
4. Legal review if scope is broad or contested
5. Execute and document within 30 days

#### Scenario: Viral Controversy
**Classification:** L3, variable legal risk
**Protocol:**
1. Monitor mentions (social media, press) — increase frequency to every 2 hours
2. Do NOT engage in real-time social media debates
3. Editorial Board convenes within 4 hours
4. Prepare official statement if needed (dual approval: management + legal)
5. Activate crisis response (Section 9)

---

## 7. Documentation Standards

### 7.1 Audit Trail Requirements

Every moderation action must be logged with:

| Field | Required | Description |
|-------|----------|-------------|
| `action_id` | Yes | Unique identifier |
| `timestamp` | Yes | ISO 8601 format |
| `ugc_id` | Yes | Reference to the UGC item |
| `moderator_id` | Yes | Who performed the action |
| `action_type` | Yes | classify / approve / reject / escalate / quarantine / modify / delete |
| `controversy_level` | Yes | L1 / L2 / L3 |
| `legal_risk` | Yes | negligible / low / medium / high / critical |
| `rationale` | Yes | Free text explaining the decision (min 1 sentence) |
| `gate` | Yes | Which gate (0-4) the action occurred at |
| `evidence_refs` | If applicable | Links to supporting documents, screenshots, etc. |
| `previous_action_id` | If applicable | For escalations, link to previous action |

### 7.2 Evidence Preservation

For L2+ controversy or Medium+ legal risk:

- **Original content:** Preserved verbatim, even if later modified or deleted
- **Metadata:** Submission timestamp, IP (hashed for GDPR), user agent, referrer
- **Communication chain:** All internal discussions about the item
- **Decision documents:** Legal opinions, board minutes
- **Retention period:** 5 years from last action (aligned with statute of limitations)

### 7.3 Reporting

| Report | Frequency | Audience | Content |
|--------|-----------|----------|---------|
| Moderation summary | Weekly | Editorial Board | Volume, classification distribution, response times |
| Legal risk report | Monthly | Legal + Management | Open risks, trends, recommendations |
| Incident report | Per incident | Stakeholders per escalation level | Full incident timeline and resolution |
| Compliance audit | Quarterly | Management + Legal | GDPR/DSA compliance, policy effectiveness |

### 7.4 Record Format

Moderation logs are stored as structured data (JSON/YAML) in a system that supports:

- Immutable audit entries (append-only)
- Full-text search across rationale fields
- Export capability for legal proceedings
- Retention policy enforcement (auto-archive after 5 years)

---

## 8. GDPR Compliance for UGC

### 8.1 Legal Basis for Processing

UGC personal data is processed under:

- **Art. 6(1)(b):** Performance of contract (Terms of Use acceptance)
- **Art. 6(1)(f):** Legitimate interest (community discourse, moderation)

### 8.2 Data Subject Rights

Users who submit UGC retain all GDPR rights:

| Right | Implementation | SLA |
|-------|---------------|-----|
| **Access** (Art. 15) | Export user's UGC history + moderation decisions | 30 days |
| **Rectification** (Art. 16) | Edit UGC if factually incorrect | 30 days |
| **Erasure** (Art. 17) | Delete UGC unless legal retention obligation | 30 days |
| **Restriction** (Art. 18) | Quarantine UGC pending dispute resolution | 72 hours |
| **Data Portability** (Art. 20) | Export UGC in machine-readable format | 30 days |
| **Objection** (Art. 21) | Reassess legitimate interest; delete if objection upheld | 30 days |

### 8.3 Data Minimization

- Collect only: display name, email (for notifications), UGC content
- IP addresses: hashed, retained 90 days for abuse prevention only
- No profiling, no behavioral tracking of commenters
- Cookie consent required before any UGC system loads (ePrivacy)

### 8.4 Cross-Border Considerations

- UGC system hosted in EU (or with EU-adequate safeguards)
- No transfer of UGC personal data outside EEA without GDPR-compliant mechanisms
- If using third-party comment system: DPA (Data Processing Agreement) required

---

## 9. Crisis Response Plan

### 9.1 Crisis Definition

A crisis is declared when any of the following occur:

- Legal action initiated against AGILE SAPIENS or FolkUp
- Media coverage of UGC controversy (mainstream or major industry press)
- Coordinated campaign targeting the monograph (organized brigading)
- Regulatory inquiry from data protection authority
- Significant reputational damage to FolkUp brand

### 9.2 Crisis Response Team

| Role | Responsibility | Activation |
|------|---------------|------------|
| **Crisis Lead** | Overall coordination, decision authority | Automatic on crisis declaration |
| **Legal Counsel** | Legal assessment, external communications review | Automatic |
| **Communications** | Public statements, media responses | On demand |
| **Technical** | Content quarantine, system hardening, evidence preservation | On demand |
| **Editorial Board** | Content strategy, editorial responses | Within 4 hours |

### 9.3 Crisis Response Protocol

**Hour 0-4 (Containment):**
1. Quarantine all disputed content (do not delete — preserve evidence)
2. Activate crisis response team
3. Initial legal assessment
4. Prepare holding statement: "We are aware of [issue] and are reviewing it carefully."
5. Increase monitoring frequency

**Hour 4-24 (Assessment):**
1. Full legal risk assessment
2. Map all affected content and stakeholders
3. Identify scope (single item, category, systemic)
4. Draft response options for Editorial Board
5. External counsel engaged if legal risk is High+

**Hour 24-72 (Response):**
1. Editorial Board approves response strategy
2. Management approves public communications (dual approval)
3. Execute response: publish statement, modify content, or stand firm with documentation
4. Update all affected UGC moderation records
5. Notify affected users if their content is impacted

**Post-Crisis (Day 3-14):**
1. Full incident report
2. Policy review: identify gaps that led to crisis
3. Update this policy if needed
4. Team debrief
5. Monitor for recurrence

### 9.4 Anti-Certification Specific Scenarios

Given the monograph's anti-certification stance, the following specific scenarios are anticipated:

| Scenario | Likelihood | Prepared Response |
|----------|-----------|-------------------|
| PMI issues public rebuttal | High | Welcome discourse; publish with editorial framing |
| Scrum Alliance members organize negative campaign | Medium | Moderation queue handles; do not engage individually |
| Industry thought leader criticizes monograph publicly | High | Engage professionally; invite guest contribution |
| Certification holder files defamation claim | Low | Legal counsel; truth defense preparation |
| Media covers controversy | Medium | Prepared statement emphasizing evidence-based approach |
| Social media pile-on | Medium | Do not engage in real-time; prepare measured response |

---

## 10. AGILE SAPIENS Specific Provisions

### 10.1 Anti-Certification Content Protocol

The monograph deliberately challenges certification industry practices. UGC defending certifications is **expected and welcome** when it:

- Provides evidence-based counter-arguments
- Shares positive certification experiences with context
- Cites specific studies or data supporting certification value
- Represents legitimate industry perspective

**Moderation bias check:** Moderators must NOT suppress pro-certification UGC simply because it disagrees with the monograph thesis. Intellectual honesty requires publishing strong counter-arguments.

### 10.2 Organization Criticism Standards

When UGC criticizes specific organizations (PMI, Scrum Alliance, SAFe Institute, ICAgile, etc.):

- **Factual claims must be verifiable** — unverified claims are flagged or rejected
- **Opinion vs. fact clearly distinguished** — "PMI is a scam" (opinion, allowed with framing) vs. "PMI falsified data" (factual claim, requires evidence)
- **Public information only** — no leaked internal documents, no whistleblower content without legal review
- **Attribution required** — claims must reference public sources

### 10.3 Historical Claims Verification

The monograph's historical claims about Agile origins, Waterfall misconceptions, etc. may be challenged. Protocol:

1. Claims against monograph facts: route to editorial team for verification
2. If challenger provides superior evidence: acknowledge and update monograph (intellectual integrity)
3. If challenge is based on common misconceptions: respond with sources (educational opportunity)
4. Banking-level standard: every historical claim in the monograph must withstand hostile fact-checking

### 10.4 EU AI Act Compliance

- UGC moderation decisions made with assistance of automated tools must be disclosed
- Users must be informed when automated filters affect their submissions
- Human review must be available for any automated decision
- Transparency statement in UGC guidelines references editorial workflow

---

## 11. Moderator Guidelines

### 11.1 Moderator Training Requirements

| Level | Training | Certification |
|-------|----------|---------------|
| Junior Moderator | Policy review + 20 supervised decisions | Senior Moderator sign-off |
| Senior Moderator | Junior requirements + legal basics + escalation drills | Editorial Board sign-off |
| Legal Reviewer | Law degree or paralegal + GDPR training | External verification |

### 11.2 Moderator Code of Conduct

- **Impartiality:** Moderators must not let personal views on certification/Agile influence decisions
- **Consistency:** Similar content receives similar treatment (reference precedent log)
- **Transparency:** Rejection reasons are always communicated to users
- **Timeliness:** SLAs are binding, not aspirational
- **Confidentiality:** Moderation deliberations are not disclosed publicly
- **Conflict of interest:** Moderators with ties to certification bodies must recuse

### 11.3 Moderator Burnout Prevention

Given the controversy-heavy content environment:

- Rotation: No moderator handles L3 content exclusively
- Debrief: Weekly 15-minute check-in for moderators handling High+ risk items
- Escalation without stigma: Any moderator can escalate if uncomfortable with a decision
- Workload limit: Max 50 moderation decisions per moderator per day

---

## 12. Technical Implementation

### 12.1 Comment System Requirements

The UGC system must support:

- **Moderation queue:** All content pre-moderated (no auto-publish)
- **Classification tags:** L1/L2/L3 and legal risk fields
- **Audit log:** Immutable, exportable, searchable
- **User management:** Block, mute, warn capabilities
- **GDPR tools:** Export, delete, anonymize per user
- **Webhook integration:** Notifications for escalation triggers
- **Rate limiting:** Configurable per-user and global limits

### 12.2 Recommended Architecture

```
User submits UGC
    |
    v
[API Gateway — rate limiting, authentication]
    |
    v
[Automated Filter Service — spam, profanity, blocklist]
    |
    v
[Moderation Queue — classification, assignment, SLA tracking]
    |
    v
[Review Interface — moderator dashboard with checklists]
    |
    v
[Publication Service — approved content rendered on site]
    |
    v
[Audit Log — immutable record of all actions]
```

### 12.3 Data Retention Schedule

| Data Type | Retention Period | Legal Basis |
|-----------|-----------------|-------------|
| Published UGC | Indefinite (or until user requests deletion) | Legitimate interest |
| Rejected UGC | 1 year from rejection | Dispute resolution |
| Moderation logs | 5 years | Legal compliance, audit |
| IP hashes | 90 days | Abuse prevention |
| User accounts | Until deletion request + 30 days | Contract performance |
| Crisis evidence | 7 years | Statute of limitations |

---

## 13. Policy Governance

### 13.1 Review Schedule

- **Quarterly review:** Policy effectiveness, metrics, incident trends
- **Annual audit:** Full legal compliance review by external counsel
- **Ad-hoc review:** After any crisis or significant incident

### 13.2 Amendment Process

1. Proposed change documented with rationale
2. Legal review of proposed change
3. Editorial Board approval
4. User notification of material changes (14-day advance notice)
5. Updated version published with changelog

### 13.3 Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-26 | Editorial Board | Initial policy |

---

## 14. Definitions

| Term | Definition |
|------|-----------|
| **UGC** | User-Generated Content — any content submitted by users, including comments, corrections, responses, and contributions |
| **Moderation** | The process of reviewing, classifying, and deciding on UGC publication |
| **Quarantine** | Temporarily hiding content pending review without deletion |
| **Escalation** | Routing a moderation decision to a higher authority level |
| **Banking-level standard** | Every decision documented, auditable, defensible in legal proceedings |
| **Controversy calibration** | The monograph's deliberate design to maintain ~78% controversial-to-establishment engagement |
| **DSA** | Digital Services Act (EU Regulation 2022/2065) |
| **GDPR** | General Data Protection Regulation (EU Regulation 2016/679) |

---

## 15. Contact and Reporting

- **General moderation inquiries:** moderation@folkup.app
- **Legal issues / GDPR requests:** legal@folkup.app
- **Crisis hotline:** See internal crisis response contact list (not published)
- **Policy questions:** info@folkup.app

---

*This policy is part of the AGILE SAPIENS governance framework and should be read in conjunction with the [Terms of Use](/legal/terms/), [Privacy Policy](/legal/privacy/), [Editorial Workflow](/legal/editorial-workflow/), and [AI Transparency Statement](/legal/ai-transparency/).*
