/**
 * Design System Index
 *
 * Central export point for all design system components and utilities.
 * This file provides a clean API for importing design system elements.
 */

// Typography System
export {
  Typography,
  DisplayText,
  HeroText,
  H1,
  H2,
  H3,
  BodyLarge,
  Body,
  Small,
  Micro,
  Label,
  Code,
  useResponsiveTypography,
  typographyUtils,
} from './Typography';

export type {
  TypographyProps,
  TypographyVariant,
  FontWeight,
  FontFamily,
  TextColor,
  LineHeight,
  LetterSpacing,
  TypographyConfig,
  TypographyStyles,
  ResponsiveTypography,
  FontLoadingStatus,
  FontMetrics,
  TypographyTheme,
  TailwindTypographyClass,
} from './typography.types';

// Demo Components (useful for development and testing)
export { default as TypographyDemo } from './TypographyDemo';

// Re-export commonly used design system values
export const designTokens = {
  typography: {
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
    lineHeights: {
      none: 1,
      tight: 1.1,
      snug: 1.2,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },
    letterSpacings: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  colors: {
    brand: {
      primary: '#FF006E',
      secondary: '#FB3085',
      accent: '#8B5FBF',
    },
    stablecoin: {
      usdt: '#26A69A',
      usdc: '#2775CA',
      dai: '#F5AC37',
    },
    semantic: {
      success: '#00C896',
      warning: '#FFB800',
      error: '#FF4757',
      info: '#5352ED',
    },
    surface: {
      background: '#FAFAFA',
      card: '#FFFFFF',
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
      tertiary: '#9CA3AF',
      inverse: '#FFFFFF',
      brand: '#FF006E',
    },
  },
} as const;

// Utility functions for common design system tasks
export const designSystemUtils = {
  /**
   * Get responsive typography classes for Tailwind
   */
  getResponsiveTypography: (mobile: string, tablet?: string, desktop?: string) => {
    const classes = [mobile];
    if (tablet) classes.push(`md:${tablet}`);
    if (desktop) classes.push(`lg:${desktop}`);
    return classes.join(' ');
  },

  /**
   * Combine design system classes with custom classes
   */
  combineClasses: (...classes: (string | undefined | false)[]) => {
    return classes.filter(Boolean).join(' ');
  },

  /**
   * Get semantic color for a given background
   */
  getTextColorForBackground: (backgroundColor: string) => {
    const darkColors = ['#FF006E', '#FB3085', '#8B5FBF', '#26A69A', '#2775CA'];
    return darkColors.includes(backgroundColor) ? 'text-text-inverse' : 'text-text-primary';
  },
} as const;
