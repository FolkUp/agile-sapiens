# AGILE SAPIENS Typography Fonts — Brand Guide v2.5 Local Hosting

**Created:** 2026-04-16
**Purpose:** GDPR-compliant self-hosted fonts for Brand Guide v2.5 typography system
**Status:** Production-ready architecture, fonts need installation

## Font Requirements

### 1. Pacifico (Brand/Logo Font)
**Purpose:** Warm hand-lettered script for branding
**Files needed:**
- `pacifico/pacifico-regular.woff2`
- `pacifico/pacifico-regular.woff`

**Source:** [Google Fonts - Pacifico](https://fonts.google.com/specimen/Pacifico)
**Download:** Use `google-webfonts-helper.herokuapp.com` for WOFF2/WOFF files

### 2. Playfair Display (Headings)
**Purpose:** Classical serif for chapter titles and headings
**Files needed:**
- `playfair-display/playfair-display-regular.woff2`
- `playfair-display/playfair-display-regular.woff`
- `playfair-display/playfair-display-bold.woff2`
- `playfair-display/playfair-display-bold.woff`
- `playfair-display/playfair-display-italic.woff2`
- `playfair-display/playfair-display-italic.woff`

**Source:** [Google Fonts - Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
**Weights:** 400 (regular), 700 (bold), 400i (italic)

### 3. Source Sans 3 (Body Text)
**Purpose:** Clean modern sans-serif for readable body text
**Files needed:**
- `source-sans-3/source-sans-3-regular.woff2`
- `source-sans-3/source-sans-3-regular.woff`
- `source-sans-3/source-sans-3-bold.woff2`
- `source-sans-3/source-sans-3-bold.woff`
- `source-sans-3/source-sans-3-italic.woff2`
- `source-sans-3/source-sans-3-italic.woff`

**Source:** [Google Fonts - Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3)
**Weights:** 400 (regular), 700 (bold), 400i (italic)

## Installation Instructions

### Option 1: Google Webfonts Helper (Recommended)
1. Visit `google-webfonts-helper.herokuapp.com`
2. Search for each font (Pacifico, Playfair Display, Source Sans 3)
3. Select required weights (400, 700, 400italic)
4. Choose "Modern Browsers" (WOFF2 + WOFF)
5. Download ZIP and extract to appropriate subdirectories

### Option 2: Manual Download
1. Download from Google Fonts using browser developer tools
2. Convert TTF to WOFF2/WOFF using `fonttools` or online converters
3. Place in appropriate directories

## Font Performance Optimization

### WOFF2 Priority
- WOFF2 format loads first (95%+ browser support, ~30% better compression)
- WOFF format as fallback for older browsers
- No TTF/OTF files needed for web deployment

### Font Display Strategy
- `font-display: swap` used for optimal loading experience
- System font fallbacks prevent FOIT (Flash of Invisible Text)
- Progressive enhancement approach

## Integration with Hugo

### 1. CSS Integration
Typography system is defined in `layouts/partials/typography.css` and ready for Hugo asset pipeline:

```hugo
{{ $typography := resources.Get "css/typography.css" }}
{{ $typography := $typography | resources.Minify | resources.Fingerprint }}
<link rel="stylesheet" href="{{ $typography.Permalink }}">
```

### 2. Template Integration
Add to your layout's `<head>` section in `layouts/_default/baseof.html`:

```html
{{ partial "typography.css" . }}
```

### 3. Content Classes
Use typography classes in your content:

```html
<h1 class="chapter-title">Chapter 1: Introduction</h1>
<p class="lead">Leading paragraph with enhanced typography</p>
<div class="book-meta">AGILE SAPIENS — Scientific Popular Book 2026</div>
```

## GDPR Compliance

### Local Hosting Benefits
- ✅ No external requests to Google Fonts CDN
- ✅ No user tracking or data collection
- ✅ Full control over font loading performance
- ✅ EU data protection compliance
- ✅ Works offline and in restricted environments

### CSP (Content Security Policy)
Updated font-src directive:
```
font-src 'self' data:;
```

No external font domains needed.

## Fallback Strategy

### System Font Fallbacks
Each font family includes comprehensive fallbacks:

```css
--font-brand: 'Pacifico', cursive;
--font-heading: 'Playfair Display', 'Times New Roman', serif;
--font-body: 'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
```

### Graceful Degradation
If custom fonts fail to load:
- Brand text → system cursive fonts
- Headings → Times New Roman (universally available)
- Body text → system sans-serif stack (optimal on each platform)

## Typography Features

### Brand Guide v2.5 Compliance
- ✅ 1.25 Major Third type scale
- ✅ Palette D color integration (#7D4450, #839E75, #E8AD4A)
- ✅ Responsive fluid typography with clamp()
- ✅ WCAG 2.1 AA contrast ratios (4.5:1 minimum)

### Advanced Features
- OpenType feature support (ligatures, kerning, old-style numerals)
- Print optimization with point-based sizing
- Dark mode support with inverted color scheme
- High contrast mode compatibility
- Reduced motion accessibility support

## File Size Optimization

### Expected Font Sizes
- **Pacifico:** ~45KB (WOFF2), ~60KB (WOFF)
- **Playfair Display:** ~180KB total (3 weights × 2 formats)
- **Source Sans 3:** ~240KB total (3 weights × 2 formats)
- **Total:** ~465KB for complete typography system

### Loading Strategy
Fonts load progressively:
1. Critical text renders with system fonts (immediate)
2. Custom fonts enhance typography when loaded (smooth transition)
3. No layout shifts due to proper font-display strategy

## Testing

### Verification Checklist
- [ ] All font files present in correct directories
- [ ] Hugo build succeeds with 0 errors/warnings
- [ ] Typography displays correctly across all chapter layouts
- [ ] System font fallbacks work when custom fonts disabled
- [ ] Print styles render properly
- [ ] Dark mode colors invert correctly
- [ ] Mobile responsive scaling functions properly

### Performance Testing
- Run Lighthouse audit to verify font loading performance
- Test offline functionality (fonts should work without internet)
- Verify CSP compliance (no blocked font requests)

---

**Next Step:** Download and install font files, then test integration with Hugo build system.