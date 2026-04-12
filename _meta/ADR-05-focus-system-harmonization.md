# ADR-05: Focus System Harmonization

**Date:** 2026-04-12
**Status:** Decided
**Decision-makers:** Enhanced Alice v2.0 Cartouche Autonome Level 3, Oracle Panel arbitration
**Context:** Level 3 Typography Activation, Alpha supervisor concern #3

## Context

AGILE SAPIENS typography system currently employs dual focus mechanisms:

- **Primary Focus System:** `--color-focus` (blue #2563eb) - general interactive elements
- **Academic Focus System:** `--color-accent` (бордовый) - academic layout focus-visible states

This dual approach creates maintenance complexity and potential user confusion.

## Decision

**HARMONIZE ON ACADEMIC FOCUS SYSTEM** - `--color-accent` as unified focus approach.

### Rationale

1. **Brand Consistency:** Бордовый accent color aligns with FolkUp Brand Guide v2.5 Palette D
2. **Academic Context:** Monograph content benefits from sophisticated, subdued focus states vs stark blue
3. **Typography Integration:** Academic focus system already integrated with Level 2 Visual Polish architecture
4. **User Experience:** Single focus paradigm reduces cognitive overhead for academic reading

### Implementation Strategy

```css
/* UNIFIED FOCUS SYSTEM - Academic Approach */
:root {
    /* Deprecate blue focus system */
    /* --color-focus: #2563eb; -- DEPRECATED */

    /* Unified academic focus */
    --color-focus: var(--color-accent);           /* Use academic burgundy */
    --color-focus-visible: var(--color-accent);   /* Consistent focus-visible */
    --color-focus-ring: var(--color-accent);      /* Unified focus ring */
}

/* All focus states use academic approach */
*:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
}
```

## Consequences

### Positive
- Single focus paradigm eliminates maintenance complexity
- Academic focus approach enhances reading experience sophistication
- Brand consistency maintained throughout typography system
- Level 2 Visual Polish architecture leveraged optimally

### Neutral
- Migration required for any existing blue focus implementations
- Documentation updates needed for focus system usage

### Negative
- Slight departure from conventional web focus (blue) standards
- **Mitigation:** Academic context justifies sophisticated approach

## Compliance

- **WCAG 2.1 AA:** Focus visibility maintained at 4.5:1 contrast ratio
- **Banking-level standards:** Single source of truth eliminates configuration drift
- **Level 3 Typography:** Unified focus system supports advanced interactive features

## Monitoring

- Post-implementation user testing for focus visibility
- Accessibility audit verification of 4.5:1 contrast compliance
- Browser compatibility testing across focus states

---

**Implementation Authority:** Level 3 Typography Activation Phase 1
**Review Schedule:** Post-Phase 3 hostile verification
**Rollback Protocol:** `typography-activation-rollback.ps1` restores dual system if needed