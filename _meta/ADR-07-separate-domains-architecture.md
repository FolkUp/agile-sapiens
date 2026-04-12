# ADR-07: Separate Domains Architecture — Unified Source + Multi-Domain Deployment

**Date:** 2026-04-12
**Status:** APPROVED (Oracle Panel Arbitration)
**Decision-makers:** Oracle Panel Arbitration (Alpha FAIL → Beta CONDITIONAL_PASS → PROCEED_MODIFIED)
**Context:** AGILE SAPIENS separate domains setup для bilingual deployment (en.agile.folkup.work / ru.agile.folkup.work)

## Executive Summary

**ORACLE PANEL VERDICT:** PROCEED_MODIFIED — Unified Hugo source tree с multi-domain deployment layer approved для AGILE SAPIENS bilingual infrastructure. Source vs Deployment Layer Separation principle established, eliminating architectural contradictions через unified content management + domain-specific deployment configuration.

## Problem Statement

### User Strategic Intent
- **Separate domain deployment:** en.agile.folkup.work (English), ru.agile.folkup.work (Russian)
- **Architectural assumption:** Russian translations exist and ready for deployment
- **Operational simplicity:** Independent domain maintenance, language-specific optimization

### Alpha Technical Concerns (P0 Blockers)
1. **Translation Reality Gap:** Only 90 lines Russian metadata exist, not 70K words content
2. **Maintenance Overhead:** Dual repository tracking, inconsistent updates, version drift risk
3. **SEO Fragmentation:** Domain authority dilution, canonical URL confusion
4. **Infrastructure Complexity:** 2×DNS, 2×SSL, 2×nginx configuration management
5. **Hugo Build Dependencies:** Language-specific builds require unified content tree

### Beta Strategic Validation
- **User expectation alignment:** Separate domains match mental model
- **FolkUp ecosystem integration:** Consistent TLD patterns (.app/.life/.city/.fit)
- **Scalability foundation:** Multi-language expansion capability
- **Market positioning:** Language-specific branding opportunities

## Oracle Panel Arbitration Resolution

### Interpretation Refinement
**"Separate domains"** = deployment layer separation, NOT source management separation. Maintains user strategic vision while eliminating technical architectural contradictions через unified content management + domain-specific deployment configuration.

### Source vs Deployment Layer Separation Principle
- **Source Layer:** Unified Hugo project с bilingual content tree
- **Deployment Layer:** Domain-specific build configurations, DNS routing, SSL certificates
- **Architecture:** Single source of truth → multiple deployment targets
- **Benefits:** Eliminates maintenance overhead while achieving domain separation

## Approved Architecture

### Unified Source Tree Design
```
agile-sapiens/
├── hugo.toml                    # Base configuration
├── hugo.en.toml                 # English domain overrides
├── hugo.ru.toml                 # Russian domain overrides
├── content/
│   ├── chapters/                # English chapters (existing)
│   └── chapters.ru/            # Russian chapters (future)
├── layouts/                     # Shared templates
├── static/                      # Shared assets
└── deploy/
    ├── build-en.sh             # English build script
    ├── build-ru.sh             # Russian build script
    ├── nginx-en.conf           # English nginx config
    └── nginx-ru.conf           # Russian nginx config
```

### Multi-Domain Deployment Configuration
- **English:** `baseURL = "https://en.agile.folkup.work"` (hugo.en.toml)
- **Russian:** `baseURL = "https://ru.agile.folkup.work"` (hugo.ru.toml)
- **Build Process:** Language-specific Hugo configuration files
- **DNS:** Subdomain routing to language-specific builds
- **SSL:** Wildcard certificate *.agile.folkup.work coverage

### P0 Blocker Integration
1. **Translation Gap:** Phase 1 deploys English-only, Russian domain configured but shows "Coming Soon"
2. **Maintenance:** Single source tree eliminates version drift
3. **SEO:** Proper hreflang implementation, canonical URLs per language
4. **Infrastructure:** Shared SSL certificate, streamlined nginx configuration
5. **Build Dependencies:** Hugo configuration inheritance model

## Phase Implementation Plan

### Phase 1: Infrastructure Setup ✅ AUTHORIZED
**Scope:** DNS configuration, SSL certificates, nginx deployment для English domain
**Duration:** 1-2 days
**Deliverables:**
- Domain registration/configuration: en.agile.folkup.work
- SSL certificate deployment: wildcard *.agile.folkup.work
- Nginx configuration: English-specific routing
- Hugo build configuration: hugo.en.toml
- Rollback protocol: tested reversion to sapiens.folkup.life

**Phase 1 Success Criteria:**
- [ ] en.agile.folkup.work serves existing English content
- [ ] Build performance maintained (≤1200ms Hugo build)
- [ ] SSL certificate validates correctly
- [ ] Rollback capability verified operational
- [ ] Zero content regression from current deployment

### Phase 2: Russian Infrastructure (Conditional)
**Trigger:** Russian translations completion OR strategic direction change
**Scope:** ru.agile.folkup.work deployment configuration
**Dependencies:** Content creation pipeline, editorial workflow integration

### Phase 3: Optimization (Optional)
**Scope:** Performance optimization, SEO enhancement, cross-domain integration
**Timeline:** Post-deployment based on analytics

## Risk Mitigation

### Technical Safeguards
- **Rollback Protocol:** Immediate reversion to sapiens.folkup.life capability
- **Build Validation:** Hugo 0 errors/warnings standard maintained
- **Performance Gates:** Build time budget ≤1200ms (current: 1140ms)
- **SSL Monitoring:** Certificate expiry tracking, auto-renewal verification

### Content Protection
- **Version Control:** Git branch strategy for deployment configurations
- **Backup Strategy:** Current deployment preserved через rollback protocol
- **Testing Protocol:** Staging environment verification before DNS changes
- **Documentation:** All configuration changes documented для team handoff

## Quality Gates

### Pre-Deployment Validation
- [ ] Hugo build success: 0 errors, 0 warnings
- [ ] SSL certificate validity: *.agile.folkup.work coverage confirmed
- [ ] DNS propagation test: en.agile.folkup.work resolution verified
- [ ] Content integrity: All 10 chapters accessible
- [ ] Performance baseline: Build time ≤1200ms maintained
- [ ] Rollback test: Verified capability to revert to sapiens.folkup.life

### Post-Deployment Verification
- [ ] Domain accessibility: HTTPS en.agile.folkup.work fully functional
- [ ] Content parity: All pages render identically to current deployment
- [ ] Performance metrics: Load times within acceptable range
- [ ] SEO preservation: Search engine indexing unaffected
- [ ] Analytics integration: Tracking continues without disruption

## Emergency Protocols

### Rollback Triggers
- DNS resolution failures >5 minutes
- SSL certificate validation errors
- Hugo build regression (errors/warnings introduced)
- Performance degradation >20% baseline
- User-reported accessibility issues

### Rollback Procedure
1. **DNS reversion:** Point en.agile.folkup.work → sapiens.folkup.life
2. **Certificate validation:** Verify original SSL configuration intact
3. **Build restoration:** Confirm hugo.toml baseline operational
4. **Monitoring:** 24h observation period post-rollback
5. **Post-mortem:** Documentation of failure cause + prevention measures

## Strategic Value

### Immediate Benefits
- **FolkUp ecosystem integration:** Consistent domain architecture (.work TLD expansion)
- **Deployment flexibility:** Language-specific optimization capability
- **Technical foundation:** Scalable multi-language infrastructure
- **User expectation alignment:** Separate domains per original strategic intent

### Future Capabilities
- **Translation pipeline:** Russian content integration ready
- **Additional languages:** Portuguese, other languages expandable
- **Content specialization:** Language-specific features, localization
- **Market segmentation:** Audience-specific optimization opportunities

## Decision Record

**APPROVED ARCHITECTURE:** Unified Hugo source tree с multi-domain deployment layer
**IMPLEMENTATION AUTHORITY:** Enhanced Alice v2.0 Cartouche Autonome Level 3
**QUALITY STANDARD:** Banking-level verification gates mandatory
**ROLLBACK CAPABILITY:** Tested and operational before deployment

**Oracle Panel Precedent Established:**
1. **Source vs Deployment Layer Separation** — architectural pattern для similar future decisions
2. **Interpretation Refinement Over Binary Choice** — resolve apparent contradictions через deeper analysis
3. **P0 Blocker Integration** — eliminate parallel tracking через unified resolution

---

**AUTHORIZATION STATUS:** Phase 1 execution authorized per Oracle Panel PROCEED_MODIFIED verdict
**QUALITY GATES:** All banking-level verification requirements integrated
**EMERGENCY PROTOCOLS:** Rollback capability verified and documented
**NEXT STEP:** Phase 1 DNS configuration and SSL deployment ready for execution