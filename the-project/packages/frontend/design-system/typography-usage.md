# Typography Usage Guidelines

**Quick Reference for Developers**  
**Version:** v1.0.0  
**Last Updated:** July 13, 2025

## Quick Start

```tsx
import { Typography, H1, H2, Body, Small } from '@/design-system/Typography';

// Basic usage
<Typography variant="h1" weight="semibold">Page Title</Typography>

// Predefined components (recommended)
<H1>Page Title</H1>
<H2>Section Header</H2>
<Body>Content paragraph</Body>
<Small color="secondary">Helper text</Small>
```

## Common Patterns

### 1. **Page Headers**

```tsx
// Hero section
<Typography variant="hero" weight="bold" color="brand" as="h1">
  Welcome to PayMe for Web3
</Typography>

// Page title
<H1>USDT Cross-Chain Router</H1>

// Section title
<H2>Recent Transactions</H2>
```

### 2. **Content Hierarchy**

```tsx
<div className='space-y-4'>
  <H1>Main Page Title</H1>
  <Body color='secondary'>Page description or subtitle content</Body>

  <div className='mt-8'>
    <H2>Section Title</H2>
    <Body>Section content goes here with proper spacing</Body>
  </div>

  <div className='mt-6'>
    <H3>Subsection Title</H3>
    <Small color='tertiary'>Additional details or metadata</Small>
  </div>
</div>
```

### 3. **Form Elements**

```tsx
// Form labels and inputs
<div className='space-y-2'>
  <Label htmlFor='amount'>Amount to Swap</Label>
  <input id='amount' className='text-body font-medium' placeholder='0.00' />
  <Small color='secondary'>Available balance: 1,000 USDT</Small>
</div>
```

### 4. **Cards and Components**

```tsx
// Transaction card
<div className='bg-surface-card p-6 rounded-lg'>
  <H3>Swap USDT → USDC</H3>
  <div className='mt-2 space-y-1'>
    <Body>Amount: $1,000.00</Body>
    <Small color='secondary'>Transaction Hash: 0x1234...abcd</Small>
    <Micro color='tertiary'>2 minutes ago</Micro>
  </div>
</div>
```

### 5. **Buttons and Interactive Elements**

```tsx
// Button text styling
<button className="bg-brand-primary text-text-inverse px-6 py-3 rounded-lg">
  <Typography variant="body" weight="medium" color="inverse">
    Connect Wallet
  </Typography>
</button>

// Link styling
<Typography
  variant="body"
  weight="medium"
  color="brand"
  as="a"
  href="/help"
  className="hover:underline"
>
  Learn more about cross-chain swaps
</Typography>
```

### 6. **Code and Technical Content**

```tsx
// Wallet addresses and hashes
<Code>0x742d35cc5f59dbce834207e95b92d5e10e2b6e44</Code>

// Technical labels
<div className="flex items-center gap-2">
  <Small weight="medium">Network:</Small>
  <Code>Ethereum</Code>
</div>
```

### 7. **Responsive Typography**

```tsx
// Hero that scales down on mobile
<Typography
  variant="hero"
  weight="bold"
  className="text-h2 md:text-h1 lg:text-hero"
>
  Responsive Hero Text
</Typography>

// Body text that scales up on larger screens
<Typography
  variant="body"
  className="md:text-body-lg"
>
  Responsive body content
</Typography>
```

## Design System Integration

### Color Combinations

```tsx
// Primary content
<Body color="primary">Main content text</Body>

// Secondary information
<Small color="secondary">Supporting information</Small>

// Tertiary details
<Micro color="tertiary">Timestamps, captions</Micro>

// Brand highlights
<Typography variant="h2" color="brand">Special announcements</Typography>

// Status indicators
<Small color="success">Transaction confirmed</Small>
<Small color="warning">Network congestion</Small>
<Small color="error">Transaction failed</Small>
```

### Spacing and Layout

```tsx
// Consistent spacing with Tailwind
<div className="space-y-4">
  <H1>Title</H1>
  <Body>Paragraph content</Body>
  <Small>Additional details</Small>
</div>

// Custom spacing for specific layouts
<div className="space-y-6">
  <div className="space-y-2">
    <H2>Section Title</H2>
    <Body color="secondary">Section description</Body>
  </div>

  <div className="space-y-4">
    <Body>Content paragraph one</Body>
    <Body>Content paragraph two</Body>
  </div>
</div>
```

## Accessibility Best Practices

### 1. **Semantic HTML Structure**

```tsx
// Proper heading hierarchy
<main>
  <H1>Page Title</H1>
  <section>
    <H2>Section One</H2>
    <H3>Subsection</H3>
    <Body>Content</Body>
  </section>
  <section>
    <H2>Section Two</H2>
    <Body>More content</Body>
  </section>
</main>
```

### 2. **Screen Reader Support**

```tsx
// Descriptive labels
<Label htmlFor="swap-amount">
  Amount to swap (USDT)
</Label>

// Hidden content for screen readers
<Typography variant="micro" className="sr-only">
  Current balance: 1,000 USDT
</Typography>

// ARIA labels for complex content
<Typography
  variant="body"
  aria-label="Transaction fee: 0.1% of swap amount"
>
  Fee: 0.1%
</Typography>
```

### 3. **Contrast and Readability**

```tsx
// High contrast for important information
<Typography variant="h2" color="primary">
  Important Alert
</Typography>

// Appropriate contrast for secondary content
<Small color="secondary">
  Less important details
</Small>

// Ensure readability on colored backgrounds
<div className="bg-brand-primary p-4">
  <Typography variant="body" color="inverse">
    Text on colored background
  </Typography>
</div>
```

## Performance Considerations

### 1. **Font Loading Optimization**

```tsx
// The typography system handles font loading automatically
// Fonts are loaded with font-display: swap for better performance

// For critical above-the-fold content, consider preloading
<link
  rel='preload'
  href='/fonts/inter-subset.woff2'
  as='font'
  type='font/woff2'
  crossOrigin=''
/>
```

### 2. **Bundle Size Optimization**

```tsx
// Import only what you need
import { H1, Body } from '@/design-system/Typography';

// Avoid importing the entire module if only using utilities
import { typographyUtils } from '@/design-system/Typography';
```

### 3. **Responsive Loading**

```tsx
// Use appropriate text sizes to avoid layout shifts
<Typography
  variant='body'
  className='leading-relaxed'
  style={{ minHeight: '1.5rem' }} // Prevent layout shift
>
  Dynamic content
</Typography>
```

## Common Mistakes to Avoid

### ❌ Don't Do This

```tsx
// Don't skip semantic HTML structure
<div className="text-h1 font-bold">Not a real heading</div>

// Don't use arbitrary sizes
<Typography style={{ fontSize: '19px' }}>Custom size</Typography>

// Don't ignore color contrast
<Typography color="tertiary" className="bg-gray-200">
  Poor contrast
</Typography>

// Don't nest heading components incorrectly
<H1>
  <H2>Nested headings</H2>
</H1>
```

### ✅ Do This Instead

```tsx
// Use proper semantic structure
<H1>Real heading</H1>

// Use defined type scale
<Typography variant="body-lg">Larger body text</Typography>

// Ensure good contrast
<Typography color="primary" className="bg-surface-card">
  Good contrast
</Typography>

// Maintain heading hierarchy
<H1>Main Title</H1>
<H2>Section Title</H2>
<H3>Subsection Title</H3>
```

## Testing and Validation

### 1. **Visual Testing**

```tsx
// Test all variants and combinations
const variants = [
  'display',
  'hero',
  'h1',
  'h2',
  'h3',
  'body-lg',
  'body',
  'small',
  'micro',
];
const weights = ['light', 'regular', 'medium', 'semibold', 'bold', 'black'];

// Create test pages to validate typography system
<div className='p-8 space-y-8'>
  {variants.map(variant => (
    <div key={variant} className='space-y-2'>
      <Typography variant={variant}>{variant} variant example</Typography>
    </div>
  ))}
</div>;
```

### 2. **Accessibility Testing**

```tsx
// Test with screen readers
// Test keyboard navigation
// Test high contrast mode
// Test browser zoom (up to 200%)

// Automated testing with jest-axe
import { axe, toHaveNoViolations } from 'jest-axe';

test('typography components are accessible', async () => {
  const { container } = render(
    <div>
      <H1>Test Heading</H1>
      <Body>Test content</Body>
    </div>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### 3. **Performance Testing**

```bash
# Test font loading performance
npm run lighthouse:performance

# Test with slow 3G connection
npm run test:performance

# Monitor bundle size
npm run analyze:bundle
```

## Advanced Usage

### 1. **Custom Variants with TypeScript**

```tsx
// Extend typography types for custom use cases
interface CustomTypographyProps extends TypographyProps {
  gradient?: boolean;
  animated?: boolean;
}

const CustomTypography: React.FC<CustomTypographyProps> = ({
  gradient,
  animated,
  className = '',
  ...props
}) => {
  const customClasses = [
    gradient && 'bg-gradient-brand bg-clip-text text-transparent',
    animated && 'animate-pulse-brand',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Typography className={customClasses} {...props} />;
};
```

### 2. **Dynamic Typography**

```tsx
// Dynamic typography based on content type
const DynamicTypography: React.FC<{
  content: string;
  type: 'title' | 'body' | 'caption';
}> = ({ content, type }) => {
  const config = {
    title: { variant: 'h2', weight: 'semibold' },
    body: { variant: 'body', weight: 'regular' },
    caption: { variant: 'small', weight: 'regular', color: 'secondary' },
  };

  return <Typography {...config[type]}>{content}</Typography>;
};
```

### 3. **Internationalization Support**

```tsx
// Typography that adapts to different languages
const I18nTypography: React.FC<{
  children: React.ReactNode;
  locale: string;
}> = ({ children, locale, ...props }) => {
  // Adjust letter spacing for different languages
  const letterSpacing = locale === 'ja' ? 'wide' : 'normal';

  return (
    <Typography letterSpacing={letterSpacing} {...props}>
      {children}
    </Typography>
  );
};
```

---

## Quick Reference Card

### Most Used Components

- `<H1>` - Page titles
- `<H2>` - Section headers
- `<H3>` - Component headers
- `<Body>` - Main content
- `<Small>` - Secondary info
- `<Label>` - Form labels
- `<Code>` - Technical text

### Most Used Classes

- `text-h1 font-semibold` - Main headings
- `text-body font-regular` - Body content
- `text-small font-medium text-text-secondary` - Labels
- `text-micro font-regular text-text-tertiary` - Captions

### Color Usage

- `color="primary"` - Main content (90%)
- `color="secondary"` - Supporting info (8%)
- `color="tertiary"` - Fine print (2%)
- `color="brand"` - Highlights and CTAs
- `color="inverse"` - Text on dark backgrounds

Remember: **Consistency over creativity** - stick to the defined system for
better user experience and maintainability.
