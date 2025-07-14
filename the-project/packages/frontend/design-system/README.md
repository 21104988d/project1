# Design System

**PayMe for Web3 Design System**  
**Version:** v1.0.0  
**Status:** ✅ Typography System Complete

A comprehensive design system built for the PayMe for Web3 cross-chain USDT
router application. This system ensures consistency, accessibility, and
excellent user experience across all interfaces.

## 🎨 Overview

Our design system is built around the **PayMe for Web3** brand philosophy:

- **Clean minimalism** with subtle depth
- **Trust through transparency** with clear visual hierarchy
- **Zero cognitive load** for users
- **Mobile-first excellence** for all device types

## 📁 Structure

```
src/design-system/
├── index.ts                 # Main export file
├── Typography.tsx           # Typography component
├── typography.types.ts      # TypeScript definitions
├── typography.md           # Complete documentation
├── typography-usage.md     # Developer usage guide
├── TypographyDemo.tsx      # Demo/testing component
└── README.md              # This file
```

## 🚀 Quick Start

### Installation

The design system is integrated into the frontend package. No additional
installation required.

### Basic Usage

```tsx
import { H1, Body, Small } from '@/design-system';

function MyComponent() {
  return (
    <div>
      <H1>Page Title</H1>
      <Body>Content paragraph</Body>
      <Small color='secondary'>Helper text</Small>
    </div>
  );
}
```

### Advanced Usage

```tsx
import { Typography, designTokens } from '@/design-system';

function CustomComponent() {
  return (
    <Typography
      variant='hero'
      weight='bold'
      color='brand'
      className='text-center'
    >
      Welcome to PayMe for Web3
    </Typography>
  );
}
```

## 📖 Components

### ✅ Typography System (Complete)

Our typography system provides consistent, accessible, and performant text
styling across the application.

#### Core Components

- `<Typography>` - Base component with full customization
- `<H1>`, `<H2>`, `<H3>` - Semantic heading components
- `<Body>`, `<BodyLarge>` - Content text components
- `<Small>`, `<Micro>` - Secondary text components
- `<Label>` - Form label component
- `<Code>` - Technical text component

#### Features

- **9-level type scale** from micro (12px) to display (72px)
- **6 font weights** from light (300) to black (900)
- **Inter font family** with optimized loading
- **Full TypeScript support** with proper type definitions
- **Accessibility compliant** with WCAG AA standards
- **Performance optimized** for Core Web Vitals

#### Type Scale

```tsx
<Typography variant="display">   {/* 72px */}
<Typography variant="hero">      {/* 56px */}
<Typography variant="h1">        {/* 36px */}
<Typography variant="h2">        {/* 30px */}
<Typography variant="h3">        {/* 24px */}
<Typography variant="body-lg">   {/* 18px */}
<Typography variant="body">      {/* 16px */}
<Typography variant="small">     {/* 14px */}
<Typography variant="micro">     {/* 12px */}
```

#### Color System

```tsx
<Typography color="primary">    {/* Main content */}
<Typography color="secondary">  {/* Supporting info */}
<Typography color="tertiary">   {/* Fine print */}
<Typography color="brand">      {/* Brand highlights */}
<Typography color="inverse">    {/* Text on dark backgrounds */}
<Typography color="success">    {/* Success states */}
<Typography color="warning">    {/* Warning states */}
<Typography color="error">      {/* Error states */}
```

### 🔄 Coming Next

#### Spacing and Layout System

- [ ] 8pt grid system implementation
- [ ] Container and breakpoint definitions
- [ ] Grid column specifications
- [ ] Layout template components

#### Border Radius and Shadows

- [ ] Border radius scale definition
- [ ] Shadow system implementation
- [ ] Elevation guidelines
- [ ] Usage documentation

## 🎯 Design Tokens

Our design system is built on a foundation of design tokens that ensure
consistency across all components.

### Typography Tokens

```typescript
const typography = {
  fontFamilies: {
    sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
  },
  fontSizes: {
    micro: '0.75rem', // 12px
    small: '0.875rem', // 14px
    body: '1rem', // 16px
    'body-lg': '1.125rem', // 18px
    h3: '1.5rem', // 24px
    h2: '1.875rem', // 30px
    h1: '2.25rem', // 36px
    hero: '3.5rem', // 56px
    display: '4.5rem', // 72px
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },
};
```

### Color Tokens

```typescript
const colors = {
  brand: {
    primary: '#FF006E', // PayMe pink
    secondary: '#FB3085', // Magenta
    accent: '#8B5FBF', // Purple
  },
  stablecoin: {
    usdt: '#26A69A', // USDT green
    usdc: '#2775CA', // USDC blue
    dai: '#F5AC37', // DAI orange
  },
  semantic: {
    success: '#00C896', // Success green
    warning: '#FFB800', // Warning yellow
    error: '#FF4757', // Error red
    info: '#5352ED', // Info blue
  },
  text: {
    primary: '#1F2937', // Main text
    secondary: '#6B7280', // Secondary text
    tertiary: '#9CA3AF', // Tertiary text
    inverse: '#FFFFFF', // Inverse text
    brand: '#FF006E', // Brand text
  },
};
```

## 🧪 Testing and Validation

### Typography Demo

View all typography components in action:

```tsx
import { TypographyDemo } from '@/design-system';

// Renders comprehensive typography showcase
<TypographyDemo />;
```

### Validation Script

Run the typography validation script:

```bash
cd packages/frontend
./validate-typography.sh
```

### Manual Testing Checklist

- [ ] All font weights load correctly
- [ ] Type scale renders consistently across browsers
- [ ] Responsive sizing works on all breakpoints
- [ ] No FOUT (Flash of Unstyled Text) on slow connections
- [ ] Screen reader compatibility
- [ ] High contrast mode support
- [ ] Browser zoom functionality (up to 200%)

## 📱 Responsive Design

Our typography system is mobile-first and responsive by default.

### Breakpoints

- **Mobile:** 320px - 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px - 1439px
- **Wide:** 1440px+

### Responsive Typography

```tsx
// Scales from h2 on mobile to hero on desktop
<Typography variant='h2' className='md:text-h1 lg:text-hero'>
  Responsive Heading
</Typography>;

// Using responsive utility
import { designSystemUtils } from '@/design-system';

const responsiveClasses = designSystemUtils.getResponsiveTypography(
  'text-h2', // mobile
  'text-h1', // tablet
  'text-hero' // desktop
);
```

## ♿ Accessibility

Our design system prioritizes accessibility and follows WCAG AA guidelines.

### Features

- **Semantic HTML structure** with proper heading hierarchy
- **High contrast ratios** for all text colors
- **Screen reader support** with descriptive labels
- **Keyboard navigation** compatibility
- **Reduced motion** support for accessibility preferences
- **Scalable text** that works with browser zoom

### Testing Tools

- Screen readers (NVDA, JAWS, VoiceOver)
- Keyboard navigation testing
- Color contrast validation
- Automated accessibility testing with jest-axe

## 🚀 Performance

Our design system is optimized for performance and Core Web Vitals.

### Font Loading Optimization

- **Preconnect** to Google Fonts for faster DNS resolution
- **font-display: swap** for immediate text rendering
- **Selective font weights** to minimize download size
- **System font fallbacks** for instant rendering

### Bundle Optimization

- **Tree-shakeable exports** for smaller bundles
- **Type-only imports** where possible
- **Optimized component structure** for better performance

### Performance Targets

- **First Contentful Paint:** < 1.5s
- **Font swap completion:** < 2.5s
- **Mobile performance:** Optimized for 3G connections
- **Bundle size:** Typography system < 50KB gzipped

## 📚 Documentation

### Complete Documentation

- [`typography.md`](./typography.md) - Complete typography system documentation
- [`typography-usage.md`](./typography-usage.md) - Developer usage guidelines
- [`typography.types.ts`](./typography.types.ts) - TypeScript type definitions

### API Reference

All components and utilities are fully documented with JSDoc comments and
TypeScript definitions.

## 🔧 Development

### Contributing

When contributing to the design system:

1. **Follow existing patterns** and conventions
2. **Update documentation** for any changes
3. **Add TypeScript types** for new components
4. **Test accessibility** with screen readers
5. **Validate performance** impact
6. **Update demo components** as needed

### Local Development

```bash
# Start development server
npm run dev

# Run validation script
./validate-typography.sh

# Build system
npm run build

# Type checking
npm run type-check
```

## 🗺️ Roadmap

### Phase 1: Design Foundation ✅

- [x] Typography system implementation
- [x] Font loading optimization
- [x] Tailwind CSS integration
- [x] TypeScript support
- [x] Documentation

### Phase 2: Visual Design Excellence (Next)

- [ ] Spacing and layout system
- [ ] Border radius and shadows
- [ ] Button component system
- [ ] Form component system
- [ ] Card and surface components

### Phase 3: Interaction Design

- [ ] Animation system
- [ ] Micro-interactions
- [ ] State management
- [ ] Gesture support

### Phase 4: Advanced Components

- [ ] Complex UI components
- [ ] Data visualization
- [ ] Navigation components
- [ ] Layout components

## 📝 Changelog

### v1.0.0 (Current)

- ✅ **Typography System Complete**
  - Inter font family integration
  - 9-level type scale implementation
  - Complete React component library
  - Full TypeScript support
  - Comprehensive documentation
  - Performance optimization
  - Accessibility compliance

---

**Next Up:** Spacing and Layout System Implementation

For questions or contributions, please refer to the project documentation or
create an issue in the repository.
