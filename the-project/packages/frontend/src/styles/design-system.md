# Design System Documentation

## 1. Spacing and Layout System

### 8pt Grid System

Our design system is based on an 8pt grid system with 4px as the base unit:

```css
/* Base Units */
4px   - 1 unit  (space-1)
8px   - 2 units (space-2)
12px  - 3 units (space-3)
16px  - 4 units (space-4)
24px  - 6 units (space-6)
32px  - 8 units (space-8)
48px  - 12 units (space-12)
64px  - 16 units (space-16)
```

### Container Widths

```css
Mobile:     320px (max-w-mobile)
Tablet:     768px (max-w-tablet)
Desktop:    1200px (max-w-desktop)
Wide:       1440px (max-w-wide)
Ultra:      1600px (max-w-ultra)
```

### Grid System

```css
Mobile:     4 columns  (grid-cols-mobile)
Tablet:     8 columns  (grid-cols-tablet)
Desktop:    12 columns (grid-cols-desktop)
```

### Responsive Gutters

```css
Mobile:     16px (gap-mobile)
Tablet:     24px (gap-tablet)
Desktop:    32px (gap-desktop)
```

## 2. Border Radius and Shadows

### Border Radius Scale

```css
None:       0      (rounded-none)
XS:         4px    (rounded-xs)
Small:      8px    (rounded-sm)
Medium:     12px   (rounded-md)
Large:      16px   (rounded-lg)
XL:         24px   (rounded-xl)
Full:       50%    (rounded-full)
```

### Shadow System

```css
None:       No shadow (shadow-none)
Subtle:     Light shadow for slight elevation (shadow-subtle)
Card:       Standard card shadow (shadow-card)
Modal:      Modal/overlay shadow (shadow-modal)
High:       High elevation shadow (shadow-high)
Brand:      Brand-colored shadow (shadow-brand)
Brand Large: Large brand shadow (shadow-brand-lg)
```

## 3. Usage Guidelines

### Spacing Guidelines

- Use consistent spacing multiples of 4px
- Prefer larger spacing for better readability
- Use 16px as minimum touch target size
- Use 24px for comfortable mobile spacing
- Use 32px for desktop section spacing

### Layout Templates

#### Single Column Layout

```jsx
<div className='max-w-desktop mx-auto px-4 sm:px-6 lg:px-8'>
  <div className='space-y-8'>{/* Content */}</div>
</div>
```

#### Two Column Layout (60/40 split)

```jsx
<div className='max-w-wide mx-auto px-4 sm:px-6 lg:px-8'>
  <div className='grid grid-cols-1 lg:grid-cols-12 gap-desktop'>
    <div className='lg:col-span-7'>{/* Main content */}</div>
    <div className='lg:col-span-5'>{/* Sidebar */}</div>
  </div>
</div>
```

#### Three Column Layout (25/50/25 split)

```jsx
<div className='max-w-ultra mx-auto px-4 sm:px-6 lg:px-8'>
  <div className='grid grid-cols-1 lg:grid-cols-12 gap-desktop'>
    <div className='lg:col-span-3'>{/* Left sidebar */}</div>
    <div className='lg:col-span-6'>{/* Main content */}</div>
    <div className='lg:col-span-3'>{/* Right sidebar */}</div>
  </div>
</div>
```

#### Dashboard Grid Layout

```jsx
<div className='max-w-ultra mx-auto px-4 sm:px-6 lg:px-8'>
  <div className='grid grid-cols-mobile sm:grid-cols-tablet lg:grid-cols-desktop gap-tablet lg:gap-desktop'>
    {/* Widgets */}
  </div>
</div>
```

### Card System Guidelines

#### Base Card

```jsx
<div className='bg-surface-card rounded-lg shadow-card p-6'>
  {/* Card content */}
</div>
```

#### Interactive Card

```jsx
<div className='bg-surface-card rounded-lg shadow-card hover:shadow-modal transition-shadow duration-200 p-6 cursor-pointer transform hover:-translate-y-1'>
  {/* Interactive card content */}
</div>
```

#### Elevated Card

```jsx
<div className='bg-surface-card rounded-lg shadow-high p-6'>
  {/* Important content */}
</div>
```

#### Brand Card

```jsx
<div className='bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg shadow-brand-lg p-6 text-white'>
  {/* Brand-styled content */}
</div>
```

### Depth and Elevation Guidelines

1. **Base Level (0dp)**: Page background
2. **Card Level (2dp)**: Cards, buttons at rest (`shadow-subtle`)
3. **Raised Level (4dp)**: Cards on hover, active buttons (`shadow-card`)
4. **Overlay Level (8dp)**: Dropdowns, tooltips (`shadow-modal`)
5. **Modal Level (16dp)**: Modals, dialogs (`shadow-high`)
6. **Brand Level**: Special brand elements (`shadow-brand`)

## 4. Animation Guidelines

### Timing Functions

- **Ease-out**: For elements entering (300ms)
- **Ease-in**: For elements exiting (200ms)
- **Ease-in-out**: For state changes (250ms)

### Duration Guidelines

- **Fast**: 150ms - Small state changes
- **Medium**: 250ms - Standard transitions
- **Slow**: 300ms - Complex animations
- **Extra Slow**: 500ms+ - Special effects only

### Animation Classes

```css
animate-fade-in      - Fade in effect
animate-slide-up     - Slide up entrance
animate-scale-in     - Scale entrance
animate-pulse-brand  - Brand pulsing effect
```
