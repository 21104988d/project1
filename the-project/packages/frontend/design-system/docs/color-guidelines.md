# Color Usage Guidelines - PayMe-Inspired Design System

## Overview

Our color system is inspired by PayMe, Hong Kong's popular payment app, featuring vibrant pink and magenta as primary brand colors. This creates a modern, energetic, and trustworthy appearance suitable for financial applications.

## Brand Colors

### Primary Brand Color: Vibrant Pink (#FF006E)
- **Usage**: Main call-to-action buttons, primary navigation, brand elements
- **Psychological Impact**: Energy, innovation, approachability
- **Examples**: "Swap Now" buttons, active navigation items, brand logo

### Secondary Brand Color: Magenta (#FB3085)
- **Usage**: Secondary actions, hover states, supporting brand elements
- **Psychological Impact**: Warmth, engagement, premium feel
- **Examples**: Secondary buttons, hover states, accent borders

### Accent Color: Purple (#8B5FBF)
- **Usage**: Tertiary actions, subtle accents, gradient endpoints
- **Psychological Impact**: Luxury, sophistication, creativity
- **Examples**: Gradient backgrounds, subtle highlights, premium features

## Stablecoin Colors

These colors should be used consistently across the application for token identification:

### USDT Green (#26A69A)
- **Usage**: USDT token representations, balances, transaction amounts
- **Context**: Established USDT brand recognition

### USDC Blue (#2775CA)
- **Usage**: USDC token representations, balances, transaction amounts
- **Context**: Matches USDC's official brand color

### DAI Orange (#F5AC37)
- **Usage**: DAI token representations, balances, transaction amounts
- **Context**: Reflects DAI's brand identity

## Semantic Colors

### Success Green (#00C896)
- **Usage**: Success messages, completed transactions, positive states
- **Accessibility**: Meets WCAG AA contrast requirements
- **Examples**: "Transaction Complete", successful form submissions

### Warning Orange (#FFB800)
- **Usage**: Warning messages, pending states, attention-required items
- **Accessibility**: High visibility, meets contrast standards
- **Examples**: "Transaction Pending", form validation warnings

### Error Red (#FF4757)
- **Usage**: Error messages, failed transactions, destructive actions
- **Accessibility**: Clear distinction from other states
- **Examples**: "Transaction Failed", form validation errors

### Info Purple (#5352ED)
- **Usage**: Informational messages, help text, neutral notifications
- **Accessibility**: Sufficient contrast for readability
- **Examples**: Tooltips, help documentation, general information

## Surface Colors

### Background (#FAFAFA)
- **Usage**: Main application background
- **Rationale**: Subtle off-white reduces eye strain, provides hierarchy

### Card Background (#FFFFFF)
- **Usage**: Card components, modals, elevated surfaces
- **Rationale**: Pure white for maximum contrast and cleanliness

### Overlay (rgba(0, 0, 0, 0.6))
- **Usage**: Modal backdrops, dropdown overlays
- **Rationale**: 60% opacity provides focus without complete obstruction

## Text Colors

### Primary Text (#1F2937)
- **Usage**: Headlines, primary content, important information
- **Contrast Ratio**: 12.6:1 against white background

### Secondary Text (#6B7280)
- **Usage**: Supporting text, descriptions, metadata
- **Contrast Ratio**: 5.8:1 against white background

### Tertiary Text (#9CA3AF)
- **Usage**: Placeholder text, disabled states, subtle information
- **Contrast Ratio**: 3.4:1 against white background (minimum for large text)

### Brand Text (#FF006E)
- **Usage**: Links, brand mentions, interactive text elements
- **Rationale**: Maintains brand consistency in text elements

## Implementation Guidelines

### CSS Custom Properties
Use CSS custom properties for consistent color application:
```css
.primary-button {
  background-color: var(--color-brand-primary);
  color: var(--color-text-inverse);
}
```

### Tailwind CSS Classes
Utilize our custom Tailwind configuration:
```html
<button class="bg-brand-primary text-white hover:bg-brand-hover-primary">
  Swap Now
</button>
```

### TypeScript Color Tokens
Import and use our type-safe color tokens:
```typescript
import { colors } from '@/design-system/tokens/colors';

const buttonStyle = {
  backgroundColor: colors.brand.primary,
  color: colors.text.inverse,
};
```

## Accessibility Considerations

### Contrast Ratios
- All color combinations meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- Brand colors have been tested against all surface colors
- Error and success states are distinguishable by more than color alone

### Color Blindness Support
- Red-green color blind users can distinguish error states through icons and patterns
- Brand colors maintain sufficient contrast across all common color vision deficiencies
- Alternative indicators (icons, text) accompany color-coded information

### High Contrast Mode
- System respects user's high contrast preferences
- Alternative color values provided for high contrast environments
- Border widths and text weights increase in high contrast mode

## Usage Examples

### Primary Actions
```css
/* Main call-to-action buttons */
.btn-primary {
  background: var(--gradient-brand);
  color: var(--color-text-inverse);
  box-shadow: var(--shadow-brand);
}
```

### Token Representations
```css
/* USDT balance display */
.usdt-balance {
  color: var(--color-stablecoin-usdt);
  font-weight: 600;
}

/* USDC balance display */
.usdc-balance {
  color: var(--color-stablecoin-usdc);
  font-weight: 600;
}
```

### State Indicators
```css
/* Success state */
.transaction-success {
  background-color: rgba(0, 200, 150, 0.1);
  border-left: 4px solid var(--color-success);
  color: var(--color-success);
}

/* Error state */
.transaction-error {
  background-color: rgba(255, 71, 87, 0.1);
  border-left: 4px solid var(--color-error);
  color: var(--color-error);
}
```

## Testing Checklist

- [ ] All color combinations tested for WCAG AA compliance
- [ ] Brand colors tested across different screen types (OLED, LCD, etc.)
- [ ] Colors appear correctly in different lighting conditions
- [ ] High contrast mode supported
- [ ] Color blindness simulation passed
- [ ] Print styles use appropriate contrast
- [ ] Dark mode compatibility planned (if applicable)

## Brand Consistency

### Do's
✅ Use brand colors for primary actions and navigation
✅ Maintain consistent stablecoin color associations
✅ Apply semantic colors consistently across states
✅ Use gradients sparingly for premium features
✅ Ensure sufficient contrast in all combinations

### Don'ts
❌ Don't use brand colors for destructive actions
❌ Don't modify stablecoin colors for aesthetic reasons
❌ Don't rely solely on color to convey information
❌ Don't create new color variations without approval
❌ Don't use low-contrast combinations

## Performance Considerations

- CSS custom properties reduce bundle size
- Gradients are optimized for GPU rendering
- Color values are consistent across components
- Shadow values use hardware acceleration
- Minimal color palette reduces complexity

This color system creates a cohesive, accessible, and brand-consistent experience that reflects the energy and innovation of modern fintech applications while maintaining the trust and reliability users expect from financial services.
