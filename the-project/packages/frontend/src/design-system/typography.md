# Typography System Documentation

**Version:** v1.0.0  
**Last Updated:** July 13, 2025  
**Status:** ✅ Complete

## Overview

Our typography system is designed around the **PayMe for Web3** brand
philosophy: Clean, professional, and trustworthy. We use **Inter** as our
primary font family for its excellent readability, modern appearance, and
comprehensive character support.

## Core Typography Principles

### 1. **Hierarchy Through Scale**

- Clear visual hierarchy using consistent type scale
- Logical progression from hero text to micro text
- Balanced proportions for web and mobile readability

### 2. **Readability First**

- Optimized line heights for comfortable reading
- Appropriate letter spacing for each size
- High contrast ratios for accessibility

### 3. **Performance Optimized**

- Font loading with `font-display: swap`
- Preconnect to font services for faster loading
- Minimal font weight variations to reduce load time

---

## Font Families

### Primary: Inter

- **Usage:** All interface text, headings, body content
- **Weights:** 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700
  (bold), 900 (black)
- **Characteristics:** Geometric sans-serif, excellent legibility, wide language
  support
- **Fallback:** ui-sans-serif, system-ui, sans-serif

### Monospace: JetBrains Mono

- **Usage:** Code, addresses, technical identifiers, numeric data
- **Weights:** 400 (regular), 500 (medium), 600 (semibold)
- **Characteristics:** Developer-focused, excellent code readability
- **Fallback:** ui-monospace, SFMono-Regular, monospace

---

## Type Scale

### Display Text (72px)

```css
font-size: 4.5rem;
line-height: 1;
letter-spacing: -0.025em;
font-weight: 700-900;
```

**Usage:** Large marketing headlines, hero sections (desktop only)

### Hero Text (56px)

```css
font-size: 3.5rem;
line-height: 1;
letter-spacing: -0.025em;
font-weight: 600-700;
```

**Usage:** Main page headlines, primary calls-to-action

### H1 Heading (36px)

```css
font-size: 2.25rem;
line-height: 2.5rem;
letter-spacing: -0.025em;
font-weight: 600-700;
```

**Usage:** Page titles, section headers

### H2 Heading (30px)

```css
font-size: 1.875rem;
line-height: 2.25rem;
letter-spacing: -0.025em;
font-weight: 600;
```

**Usage:** Subsection headers, card titles

### H3 Heading (24px)

```css
font-size: 1.5rem;
line-height: 2rem;
letter-spacing: -0.025em;
font-weight: 500-600;
```

**Usage:** Component headers, form sections

### Large Body (18px)

```css
font-size: 1.125rem;
line-height: 1.75rem;
letter-spacing: 0.0125em;
font-weight: 400-500;
```

**Usage:** Important body text, descriptions, callouts

### Body Text (16px)

```css
font-size: 1rem;
line-height: 1.5rem;
letter-spacing: 0.0125em;
font-weight: 400;
```

**Usage:** Default body text, paragraphs, most interface text

### Small Text (14px)

```css
font-size: 0.875rem;
line-height: 1.25rem;
letter-spacing: 0.025em;
font-weight: 400-500;
```

**Usage:** Secondary information, labels, metadata

### Micro Text (12px)

```css
font-size: 0.75rem;
line-height: 1rem;
letter-spacing: 0.025em;
font-weight: 400-500;
```

**Usage:** Fine print, footnotes, timestamps, captions

---

## Font Weights

### Light (300)

- **Usage:** Large display text where reduced weight improves readability
- **Avoid:** Small text sizes, important information

### Regular (400)

- **Usage:** Default body text, paragraphs, most interface content
- **Primary weight:** Use for 90% of text content

### Medium (500)

- **Usage:** Emphasized body text, labels, slightly important content
- **Good for:** Form labels, secondary navigation

### Semibold (600)

- **Usage:** Headings, important buttons, primary navigation
- **Brand standard:** Default weight for all headings

### Bold (700)

- **Usage:** Strong emphasis, hero text, critical information
- **Use sparingly:** Only for highest priority content

### Black (900)

- **Usage:** Display headlines, logo text, maximum emphasis
- **Very selective:** Reserved for brand elements and hero content

---

## Tailwind CSS Classes

### Size Classes

```css
.text-micro     /* 12px - Micro text */
.text-small     /* 14px - Small text */
.text-body      /* 16px - Body text */
.text-body-lg   /* 18px - Large body */
.text-h3        /* 24px - H3 heading */
.text-h2        /* 30px - H2 heading */
.text-h1        /* 36px - H1 heading */
.text-hero      /* 56px - Hero text */
.text-display   /* 72px - Display text */
```

### Weight Classes

```css
.font-light     /* 300 - Light */
.font-regular   /* 400 - Regular */
.font-medium    /* 500 - Medium */
.font-semibold  /* 600 - Semibold */
.font-bold      /* 700 - Bold */
.font-black     /* 900 - Black */
```

### Font Family Classes

```css
.font-sans      /* Inter font family */
.font-mono      /* JetBrains Mono family */
```

---

## Usage Guidelines

### ✅ Do's

1. **Use Inter for all interface text**
   - Headers, body text, buttons, navigation
   - Consistent brand experience

2. **Follow the type scale**
   - Don't create custom sizes between defined scales
   - Maintains visual harmony

3. **Use appropriate weights**
   - Regular (400) for most content
   - Semibold (600) for headings
   - Medium (500) for emphasis

4. **Optimize for readability**
   - Sufficient line height for body text
   - Proper contrast ratios
   - Comfortable reading width

5. **Test on different devices**
   - Ensure legibility on mobile
   - Check performance impact

### ❌ Don'ts

1. **Don't use too many weights**
   - Stick to 3-4 weights maximum per design
   - Reduces load time and maintains consistency

2. **Don't override letter spacing arbitrarily**
   - Use defined spacing values
   - Maintains readability standards

3. **Don't use light weights for small text**
   - Poor readability on small screens
   - Accessibility concerns

4. **Don't mix multiple font families**
   - Only use Inter + JetBrains Mono
   - Maintains brand consistency

5. **Don't ignore mobile performance**
   - Heavy font loading affects mobile experience
   - Test on slow connections

---

## Responsive Typography

### Mobile-First Approach

```css
/* Base: Mobile (text-base = 16px) */
.heading-responsive {
  @apply text-h3 font-semibold;
}

/* Tablet and up */
@media (min-width: 768px) {
  .heading-responsive {
    @apply text-h2;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .heading-responsive {
    @apply text-h1;
  }
}
```

### Recommended Responsive Scales

- **Mobile:** H3 (24px) → H2 (30px) → H1 (36px)
- **Tablet:** H2 (30px) → H1 (36px) → Hero (56px)
- **Desktop:** H1 (36px) → Hero (56px) → Display (72px)

---

## Accessibility

### WCAG Compliance

- **Contrast Ratios:** All text meets WCAG AA standards
- **Font Sizes:** Minimum 14px for body text
- **Line Height:** 1.5x minimum for readability
- **Scalability:** Supports browser zoom up to 200%

### Screen Reader Support

- Semantic HTML headings (h1, h2, h3)
- Proper heading hierarchy
- Descriptive link text

---

## Performance Optimization

### Font Loading Strategy

1. **Preconnect** to Google Fonts for faster DNS resolution
2. **font-display: swap** for immediate text rendering
3. **Selective weights** to minimize download size
4. **System font fallbacks** for instant rendering

### Load Time Targets

- **First paint:** < 1.5s with system fonts
- **Font swap:** < 2.5s with web fonts
- **Mobile performance:** Optimized for 3G connections

---

## Implementation Examples

### React Component Example

```tsx
// Typography component using Tailwind classes
export const Typography = ({
  variant = 'body',
  weight = 'regular',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-sans text-text-primary';
  const variantClasses = {
    display: 'text-display font-bold',
    hero: 'text-hero font-semibold',
    h1: 'text-h1 font-semibold',
    h2: 'text-h2 font-semibold',
    h3: 'text-h3 font-medium',
    'body-lg': 'text-body-lg font-regular',
    body: 'text-body font-regular',
    small: 'text-small font-regular',
    micro: 'text-micro font-medium',
  };

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
```

### CSS Custom Properties (Alternative)

```css
:root {
  /* Type scale */
  --font-size-micro: 0.75rem;
  --font-size-small: 0.875rem;
  --font-size-body: 1rem;
  --font-size-body-lg: 1.125rem;
  --font-size-h3: 1.5rem;
  --font-size-h2: 1.875rem;
  --font-size-h1: 2.25rem;
  --font-size-hero: 3.5rem;
  --font-size-display: 4.5rem;

  /* Font weights */
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-black: 900;
}
```

---

## Testing Checklist

### Visual Testing

- [ ] All font weights load correctly
- [ ] Type scale renders consistently across browsers
- [ ] Responsive sizing works on all breakpoints
- [ ] No FOUT (Flash of Unstyled Text) on slow connections

### Performance Testing

- [ ] Font loading time < 2.5s on 3G
- [ ] No layout shift during font swap
- [ ] Graceful fallback to system fonts
- [ ] Total font file size < 200KB

### Accessibility Testing

- [ ] Screen reader compatibility
- [ ] Keyboard navigation support
- [ ] High contrast mode support
- [ ] Browser zoom functionality (up to 200%)

### Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari
- [ ] Chrome Mobile

---

## Future Considerations

### Potential Enhancements

1. **Variable fonts** for smaller file sizes
2. **Local font fallbacks** for improved performance
3. **Dynamic loading** based on user preferences
4. **Advanced OpenType features** for enhanced typography

### Maintenance

- Regular updates to Inter font versions
- Performance monitoring and optimization
- User feedback integration
- Accessibility standard updates

---

**✅ Typography System Implementation Complete**

This typography system provides a solid foundation for the PayMe for Web3
interface, ensuring consistency, readability, and performance across all devices
and browsers.
