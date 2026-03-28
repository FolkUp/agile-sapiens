# AGILE SAPIENS Visual System Guide

## Overview

The visual foundation infrastructure provides Hugo shortcodes and CSS framework for classical academic book design. All components are WCAG 2.1 AA compliant with traditional book aesthetics.

## Hugo Shortcodes

### 1. Chapter Visual (`chapter-visual`)

Hero images for chapter openings with classical academic proportions.

**Parameters:**
- `src` (required): Image path
- `alt` (required): Alt text for accessibility
- `caption` (optional): Figure caption
- `chapter` (optional): Chapter number for academic referencing
- `position` (optional): `center` | `left` | `right` (default: `center`)
- `width` (optional): CSS width value (default: `100%`)
- `lazy` (optional): Enable lazy loading (default: `true`)

**Example:**
```hugo
{{< chapter-visual
    src="/images/chapter-04-hero.webp"
    alt="Borges contemplating infinite libraries"
    caption="The paradox of measurement in infinite organizational structures"
    chapter="4"
    position="center"
    width="80%"
>}}
```

**Features:**
- WebP image support with fallback
- Loading placeholders with shimmer effect
- Responsive design with mobile optimization
- Academic figure numbering
- Classical typography integration

### 2. Concept Illustration (`concept-illustration`)

In-text diagrams and illustrations that integrate with body text.

**Parameters:**
- `src` (required): Image path
- `alt` (required): Alt text
- `caption` (optional): Figure caption
- `figure` (optional): Figure number (e.g., "4.1")
- `size` (optional): `small` | `medium` | `large` | `full` (default: `medium`)
- `align` (optional): `center` | `left` | `right` (default: `center`)
- `float` (optional): `left` | `right` for text wrapping
- `lazy` (optional): Enable lazy loading (default: `true`)

**Example:**
```hugo
{{< concept-illustration
    src="/images/spotify-model-diagram.webp"
    alt="Spotify Model organizational structure"
    caption="The theoretical Spotify Model vs. implementation reality"
    figure="4.2"
    size="large"
    align="center"
>}}
```

**Features:**
- Multiple size variants for different use cases
- Text-wrapping float options
- Academic figure referencing
- Responsive stacking on mobile
- Classical border and shadow styling

### 3. Figure Reference (`figure-ref`)

Academic cross-references to figures with proper linking.

**Modern Parameters:**
- `id` (required): Target element ID
- `number` (optional): Figure number
- `text` (optional): Custom reference text
- `type` (optional): `figure` | `table` | `chart` | `diagram` | `equation` (default: `figure`)
- `chapter` (optional): Chapter number for hierarchical numbering
- `page` (optional): Page reference for print versions

**Legacy Format (backward compatible):**
- First parameter: Figure number
- Second parameter: Custom text

**Examples:**
```hugo
Modern format:
{{< figure-ref id="figure-4-2" number="4.2" type="figure" chapter="4" >}}

Legacy format (still supported):
{{< figure-ref "4.2" "диаграмма Spotify" >}}
```

**Features:**
- Smooth scrolling to target
- Focus highlighting for accessibility
- Print-optimized styling
- Multiple reference types
- Hover and focus states

## CSS Framework Classes

### Academic Figure Container

```html
<figure class="academic-figure figure--primary" data-chapter="4" data-number="3" id="figure-4-3">
  <img src="/images/example.webp" alt="Description">
  <figcaption class="figure-caption">
    <span class="figure-caption__number">Figure 4.3</span>
    <span class="figure-caption__title">Main Title</span>
    <span class="figure-caption__description">Detailed description text.</span>
    <span class="figure-caption__source">Source: Citation</span>
  </figcaption>
</figure>
```

### Image Gallery System

```html
<div class="image-gallery image-gallery--two-column">
  <div class="image-gallery__item">
    <img src="/images/gallery-1.webp" alt="First item">
    <div class="image-gallery__caption">Caption text</div>
  </div>
  <div class="image-gallery__item">
    <img src="/images/gallery-2.webp" alt="Second item">
    <div class="image-gallery__caption">Caption text</div>
  </div>
</div>
```

### Utility Classes

**Aspect Ratios:**
- `figure--portrait` (3:4)
- `figure--landscape` (4:3)
- `figure--golden` (1.618:1)
- `figure--square` (1:1)
- `figure--wide` (16:9)

**Emphasis Levels:**
- `figure--primary`: Primary emphasis with border and background
- `figure--secondary`: Secondary emphasis with border
- `figure--tertiary`: Minimal styling

**Spacing:**
- `figure-spacing--tight` (1rem)
- `figure-spacing--normal` (1.5rem)
- `figure-spacing--loose` (3rem)

**Width:**
- `figure-width--narrow` (60%)
- `figure-width--normal` (80%)
- `figure-width--wide` (100%)

**Alignment:**
- `figure-align--left`
- `figure-align--center`
- `figure-align--right`

## Integration with Chapter 4

### Recommended Usage for Borges Chapter

1. **Chapter Hero Image:**
```hugo
{{< chapter-visual
    src="/images/borges-library-babel.webp"
    alt="Infinite library representing organizational complexity"
    caption="\"The universe (which others call the Library) is composed of an indefinite, perhaps infinite number of hexagonal galleries.\" — Jorge Luis Borges"
    chapter="4"
    position="center"
    width="85%"
>}}
```

2. **Spotify Model Diagram:**
```hugo
{{< concept-illustration
    src="/images/spotify-tribes-squads.webp"
    alt="Spotify organizational model diagram showing tribes, squads, chapters, and guilds"
    caption="The Spotify Model as originally described vs. implementation reality"
    figure="4.1"
    size="large"
    align="center"
>}}
```

3. **OKR Theater Illustration:**
```hugo
{{< concept-illustration
    src="/images/okr-theater-diagram.webp"
    alt="OKR cascade showing disconnect between objectives and reality"
    caption="OKR cascading in practice: from vision to checkbox theater"
    figure="4.2"
    size="medium"
    float="right"
>}}
```

4. **Cross-References in Text:**
```hugo
As shown in {{< figure-ref id="spotify-tribes-squads" number="4.1" type="figure" chapter="4" >}}, the theoretical model assumes perfect information flow.

The disconnect becomes apparent when examining {{< figure-ref id="okr-theater-diagram" number="4.2" type="figure" chapter="4" >}}.
```

## Performance Considerations

- All images should be provided in WebP format with JPG/PNG fallbacks
- Use `loading="lazy"` for images below the fold
- Optimize image dimensions for actual display sizes
- Consider using Hugo's image processing for automatic resizing

## Accessibility Features

- WCAG 2.1 AA compliant color contrast (4.5:1 minimum)
- Keyboard navigation support with visible focus indicators
- Screen reader optimized with proper ARIA labels and roles
- Reduced motion support for users who prefer less animation
- High contrast mode support
- Minimum 44×44px touch targets for mobile devices

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Graceful degradation for older browsers
- Mobile responsive from 320px viewport width
- Print styles optimized for traditional book layout

## File Structure

```
layouts/shortcodes/
├── chapter-visual.html      # Chapter hero images
├── concept-illustration.html # In-text diagrams
└── figure-ref.html         # Academic cross-references

assets/css/
├── typography-classical.css # Base typography system
└── visuals-framework.css   # Visual components and utilities

layouts/partials/custom/
└── head-end.html          # CSS integration point
```

## Development Guidelines

1. **Classical Proportions**: Follow traditional book design ratios
2. **Academic Hierarchy**: Maintain proper figure numbering and referencing
3. **WCAG Compliance**: Test all interactive elements for accessibility
4. **Performance**: Optimize images and use modern formats (WebP)
5. **Mobile First**: Design for mobile, enhance for desktop
6. **Print Ready**: Ensure components work in print/PDF output

## Troubleshooting

**Common Issues:**

1. **Images not loading**: Check WebP fallback paths
2. **Build errors**: Validate Hugo shortcode syntax
3. **CSS not applying**: Verify head-end.html includes both CSS files
4. **Mobile layout broken**: Check grid responsiveness
5. **Accessibility warnings**: Validate alt text and ARIA labels

**Testing Checklist:**

- [ ] Hugo build passes without errors (`hugo --gc --minify`)
- [ ] Images load properly in both WebP and fallback formats
- [ ] Figure references link correctly to target elements
- [ ] Mobile layout stacks properly on small screens
- [ ] Keyboard navigation works for all interactive elements
- [ ] Print styles render correctly
- [ ] Dark mode maintains proper contrast ratios