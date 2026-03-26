---
title: "Editorial Workflow"
description: "AGILE SAPIENS Editorial Process and AI Transparency"
date: 2026-03-26
weight: 30
toc: true
---

# Editorial Workflow

**Document Version:** 1.0
**Last Updated:** March 26, 2026
**Compliance:** EU AI Act Article 50

## 1. Overview

This document describes the editorial process for AGILE SAPIENS monograph content, ensuring transparency, accuracy, and compliance with EU AI Act requirements.

## 2. Editorial Standards

### 2.1 Quality Framework
- **Scientific Accuracy:** All factual claims verified through multiple sources
- **Banking-Level Standards:** Zero tolerance for inaccuracies in published content
- **Voice Consistency:** "Harari meets Dilbert" archetype maintained throughout
- **Controversy Calibration:** Target 78% for optimal engagement while maintaining credibility

### 2.2 Content Categories
- **Verified:** Fully fact-checked, multiple independent sources
- **Partially Verified:** Key facts checked, some elements pending verification
- **Unverified:** Preliminary content, requires full verification before publication
- **Draft:** Work in progress, not ready for review

## 3. AI Transparency (EU AI Act Article 50)

### 3.1 AI Tool Disclosure
In compliance with EU AI Act Article 50, we disclose that automated tools are used in the content development process for:
- Research assistance and fact-checking support
- Editorial drafting and content structuring
- Style consistency and voice calibration

### 3.2 Human Oversight
**Critical Requirement:** All content published undergoes mandatory human review and approval by qualified editors.

**No Automated Publication:** No content is published without human editorial oversight and fact-verification.

## 4. Editorial Process

### 4.1 Content Creation Phase
1. **Research:** Primary and secondary source compilation
2. **Drafting:** Initial content creation with automated tool assistance
3. **Self-Review:** Author preliminary check
4. **Quality Gate 1:** Fact verification and source validation

### 4.2 Review Phase
1. **Editorial Review:** Professional editor evaluation
   - Factual accuracy verification
   - Style and voice consistency check
   - Scientific rigor assessment
   - Legal compliance verification

2. **Project Manager Review (Borges):**
   - Strategic alignment with monograph objectives
   - Controversy calibration assessment
   - Target audience appropriateness

3. **Final Approval:** Publication authorization

### 4.3 Publication Phase
1. **Metadata Completion:** Required frontmatter fields
2. **Final Verification:** Pre-publication checklist
3. **Publication:** Content goes live
4. **Post-Publication Monitoring:** Ongoing accuracy maintenance

## 5. Frontmatter Requirements

Every published article must include the following metadata:

```yaml
---
title: "Chapter Title"
description: "Brief chapter description"
date: 2026-03-26
weight: 10
status: verified              # verified | partially_verified | unverified | draft
confidence: high             # high | medium | low
reviewed_by: "Editor Name"   # REQUIRED for status: verified/partially_verified
review_date: 2026-03-26     # REQUIRED - date of editorial review
sources:                    # REQUIRED - list of sources
  - "Source 1 URL/Citation"
  - "Source 2 URL/Citation"
tags: ["AI", "Future of Work", "Automation"]
category: "analysis"
---
```

## 6. Source Verification Standards

### 6.1 Source Quality Requirements
- **Primary Sources:** Academic papers, government reports, corporate disclosures
- **Secondary Sources:** Reputable news outlets, industry analyses
- **Minimum Sources:** 2 independent sources for any factual claim
- **Source Dating:** Sources must be current within 2 years unless historical context

### 6.2 Fact-Checking Protocol
1. **Initial Verification:** All claims checked during drafting
2. **Cross-Reference:** Multiple source verification for key facts
3. **Expert Consultation:** Subject matter expert review for complex topics
4. **Update Monitoring:** Ongoing monitoring of source validity

## 7. Quality Assurance

### 7.1 Review Requirements
- **Editorial Review:** Mandatory for all published content
- **Review Documentation:** `reviewed_by` and `review_date` fields required
- **Review Standards:** Banking-level accuracy and completeness

### 7.2 Continuous Improvement
- **Feedback Integration:** Reader feedback incorporated into future updates
- **Process Refinement:** Regular workflow optimization based on outcomes
- **Training Updates:** Editorial team kept current with best practices

## 8. Legal Compliance

### 8.1 EU AI Act Compliance
- **Transparency Requirements:** Clear disclosure of AI tool usage
- **Human Oversight:** Mandatory human review and approval
- **Quality Standards:** Maintained to professional editorial standards

### 8.2 Content Licensing
- **Content License:** CC BY 4.0 - freely shareable with attribution
- **Attribution Requirements:** Proper credit and license acknowledgment required
- **Commercial Use:** Permitted under CC BY 4.0 terms

## 9. Contact Information

For editorial process inquiries:
- **Editorial Contact:** editor@folkup.app
- **Project Manager:** borges@folkup.app
- **Legal/Compliance:** legal@folkup.app

## 10. Document Updates

This workflow document is updated as needed to reflect process improvements and regulatory changes. All updates are dated and version-controlled.

**Next Review Date:** June 26, 2026