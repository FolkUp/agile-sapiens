# Simple Investigation Validator

**ORGA-093 MVP Implementation** — Simplified template compliance validation

## Usage

```bash
node simple-investigation-validator.js <path-to-investigation.md>
```

## Features

### Automatic Tier Detection
- **Standard Tier**: Basic investigations with minimal requirements
- **Premium Tier**: Complex investigations requiring constitutional framework

### Quality Assessment
- **Checklist Completion**: Tracks completed vs. total checklist items
- **Section Coverage**: Validates required document sections present  
- **Source Requirements**: Ensures minimum evidence sources included
- **Compliance Scoring**: 0-100 score based on tier requirements

### Requirements by Tier

#### Standard Tier Requirements
- Required sections: planning, execution, results
- Minimum sources: 1 authoritative source
- Checklist completion: 60%

#### Premium Tier Requirements  
- Required sections: planning, execution, results, evidence
- Minimum sources: 2 authoritative sources
- Checklist completion: 80%

## Example Output

```
=== SIMPLE INVESTIGATION VALIDATOR ===
File: my-investigation.md
Tier: STANDARD
Status: ✅ VALID
Score: 85/100
Checklist: 8/10 completed (80%)

Suggestions:
  1. ✅ Document meets standard tier requirements
  2. Complete remaining 2 checklist items for full compliance
```

## Integration with Investigation Templates

### Compatible Templates
- `../templates/standard-investigation-template.md`
- `../templates/premium-investigation-template.md`

### Template Usage Flow
1. Copy appropriate template for your investigation tier
2. Fill out investigation content and check completed items
3. Run validator to verify compliance before submission
4. Address any missing requirements identified

## Architecture

### Simplified Design Principles
- **Essential Functionality Only**: No constitutional framework overhead
- **User-Friendly**: Clear feedback and actionable suggestions  
- **Template Agnostic**: Works with any markdown investigation document
- **Lightweight**: Single file, minimal dependencies

### Tier Detection Logic
Premium tier indicators: `expert panel`, `constitutional`, `banking-level`, `alpha verification`, `multiple sources`, `audit trail`

Standard tier: Default when premium indicators not found

---

**Authority**: Enhanced Alice v2.0 Level 3 MVP Implementation  
**Replaces**: Complex template-compliance-validator.js (600+ lines)  
**Philosophy**: Simple tools users actually use > sophisticated systems they avoid