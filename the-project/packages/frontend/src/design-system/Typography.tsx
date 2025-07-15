import React from 'react';
import type {
  TypographyProps,
  TypographyVariant,
  FontWeight,
  FontFamily,
  TextColor,
} from './typography.types';

/**
 * Typography Component
 *
 * A flexible typography component that implements our design system's
 * typography standards. Supports all defined variants, weights, and colors.
 *
 * @example
 * ```tsx
 * <Typography variant="h1" weight="semibold" color="brand">
 *   Welcome to PayMe for Web3
 * </Typography>
 *
 * <Typography variant="body" color="secondary">
 *   This is body text with secondary color
 * </Typography>
 *
 * <Typography variant="micro" weight="medium" as="span">
 *   Fine print text
 * </Typography>
 * ```
 */
export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  weight = 'regular',
  family = 'sans',
  color = 'primary',
  lineHeight,
  letterSpacing,
  as: Component = 'span',
  className = '',
  children,
  ...props
}) => {
  // Base classes that apply to all typography
  const baseClasses = 'font-sans';

  // Map variant to Tailwind classes
  const variantClasses: Record<TypographyVariant, string> = {
    display: 'text-display',
    hero: 'text-hero',
    h1: 'text-h1',
    h2: 'text-h2',
    h3: 'text-h3',
    'body-lg': 'text-body-lg',
    body: 'text-body',
    small: 'text-small',
    micro: 'text-micro',
  };

  // Map weight to Tailwind classes
  const weightClasses: Record<FontWeight, string> = {
    light: 'font-light',
    regular: 'font-regular',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    black: 'font-black',
  };

  // Map font family to Tailwind classes
  const familyClasses: Record<FontFamily, string> = {
    sans: 'font-sans',
    mono: 'font-mono',
  };

  // Map text color to Tailwind classes
  const colorClasses: Record<TextColor, string> = {
    primary: 'text-text-primary',
    secondary: 'text-text-secondary',
    tertiary: 'text-text-tertiary',
    inverse: 'text-text-inverse',
    brand: 'text-text-brand',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    info: 'text-info',
  };

  // Optional line height classes
  const lineHeightClasses = lineHeight
    ? {
        none: 'leading-none',
        tight: 'leading-tight',
        snug: 'leading-snug',
        normal: 'leading-normal',
        relaxed: 'leading-relaxed',
        loose: 'leading-loose',
      }[lineHeight]
    : '';

  // Optional letter spacing classes
  const letterSpacingClasses = letterSpacing
    ? {
        tighter: 'tracking-tighter',
        tight: 'tracking-tight',
        normal: 'tracking-normal',
        wide: 'tracking-wide',
        wider: 'tracking-wider',
        widest: 'tracking-widest',
      }[letterSpacing]
    : '';

  // Combine all classes
  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    weightClasses[weight],
    familyClasses[family],
    colorClasses[color],
    lineHeightClasses,
    letterSpacingClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Extract typography-specific props and pass the rest to the component
  const typographyProps = {
    variant,
    weight,
    family,
    color,
    lineHeight,
    letterSpacing,
    as: Component,
    className,
  };
  const htmlProps = Object.fromEntries(
    Object.entries(props).filter(
      ([key]) =>
        !['variant', 'weight', 'family', 'color', 'lineHeight', 'letterSpacing', 'as'].includes(key)
    )
  );

  return React.createElement(
    Component,
    {
      className: combinedClasses,
      ...htmlProps,
    },
    children
  );
};

/**
 * Predefined Typography Components
 *
 * These components provide quick access to common typography patterns
 * while maintaining consistency with the design system.
 */

export const DisplayText: React.FC<{ children: React.ReactNode; [key: string]: any }> = props => (
  <Typography variant='display' weight='bold' {...props} />
);

export const HeroText: React.FC<{ children: React.ReactNode; [key: string]: any }> = props => (
  <Typography variant='hero' weight='semibold' {...props} />
);

export const H1: React.FC<{ children: React.ReactNode; [key: string]: any }> = props => (
  <Typography variant='h1' weight='semibold' as='h1' {...props} />
);

export const H2: React.FC<{ children: React.ReactNode; [key: string]: any }> = props => (
  <Typography variant='h2' weight='semibold' as='h2' {...props} />
);

export const H3: React.FC<{ children: React.ReactNode; [key: string]: any }> = props => (
  <Typography variant='h3' weight='medium' as='h3' {...props} />
);

export const BodyLarge: React.FC<{ children: React.ReactNode; [key: string]: any }> = props => (
  <Typography variant='body-lg' weight='regular' {...props} />
);

export const Body: React.FC<{ children: React.ReactNode; [key: string]: any }> = props => (
  <Typography variant='body' weight='regular' {...props} />
);

export const Small: React.FC<{ children: React.ReactNode; [key: string]: any }> = props => (
  <Typography variant='small' weight='regular' color='secondary' {...props} />
);

export const Micro: React.FC<{ children: React.ReactNode; [key: string]: any }> = props => (
  <Typography variant='micro' weight='regular' color='tertiary' {...props} />
);

export const Label: React.FC<{ children: React.ReactNode; [key: string]: any }> = props => (
  <Typography variant='small' weight='medium' as='label' {...props} />
);

export const Code: React.FC<{ children: React.ReactNode; [key: string]: any }> = props => (
  <Typography variant='small' family='mono' as='code' {...props} />
);

/**
 * Responsive Typography Hook
 *
 * A hook that provides responsive typography variants based on screen size.
 * Useful for components that need different typography on different devices.
 */
export const useResponsiveTypography = (
  mobileVariant: TypographyVariant,
  tabletVariant?: TypographyVariant,
  desktopVariant?: TypographyVariant
) => {
  // This would typically use a media query hook
  // For now, we'll return the mobile variant as default
  // In a real implementation, you'd detect screen size
  return {
    variant: mobileVariant, // Simplified for now
    tabletVariant,
    desktopVariant,
  };
};

/**
 * Typography Utilities
 *
 * Utility functions for working with typography in the design system.
 */
export const typographyUtils = {
  /**
   * Get Tailwind classes for a typography configuration
   */
  getClasses: (config: Partial<TypographyProps>): string => {
    const {
      variant = 'body',
      weight = 'regular',
      family = 'sans',
      color = 'primary',
      lineHeight,
      letterSpacing,
    } = config;

    const classes = [
      `text-${variant}`,
      `font-${weight}`,
      `font-${family}`,
      `text-text-${color}`,
      lineHeight && `leading-${lineHeight}`,
      letterSpacing && `tracking-${letterSpacing}`,
    ];

    return classes.filter(Boolean).join(' ');
  },

  /**
   * Check if a variant is a heading
   */
  isHeading: (variant: TypographyVariant): boolean => {
    return ['display', 'hero', 'h1', 'h2', 'h3'].includes(variant);
  },

  /**
   * Get the appropriate semantic HTML element for a variant
   */
  getSemanticElement: (variant: TypographyVariant): keyof JSX.IntrinsicElements => {
    const elementMap: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
      display: 'h1',
      hero: 'h1',
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      'body-lg': 'p',
      body: 'p',
      small: 'span',
      micro: 'span',
    };

    return elementMap[variant] || 'span';
  },

  /**
   * Get contrast color for text on colored backgrounds
   */
  getContrastColor: (backgroundColor: string): TextColor => {
    // Simplified logic - in production you'd calculate actual contrast
    const darkBackgrounds = ['#FF006E', '#FB3085', '#8B5FBF', '#26A69A', '#2775CA'];
    return darkBackgrounds.includes(backgroundColor) ? 'inverse' : 'primary';
  },
};

export default Typography;
