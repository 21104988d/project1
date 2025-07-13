/**
 * Typography System Type Definitions
 *
 * This file provides TypeScript types for the typography system,
 * ensuring type safety when using typography components and utilities.
 */

import React from 'react';

// Font family types
export type FontFamily = 'sans' | 'mono';

// Font weight types based on Inter font weights
export type FontWeight =
  | 'light' // 300
  | 'regular' // 400
  | 'medium' // 500
  | 'semibold' // 600
  | 'bold' // 700
  | 'black'; // 900

// Typography variant types based on our type scale
export type TypographyVariant =
  | 'display' // 72px - Large marketing headlines
  | 'hero' // 56px - Main page headlines
  | 'h1' // 36px - Page titles
  | 'h2' // 30px - Section headers
  | 'h3' // 24px - Component headers
  | 'body-lg' // 18px - Important body text
  | 'body' // 16px - Default body text
  | 'small' // 14px - Secondary information
  | 'micro'; // 12px - Fine print

// Line height types
export type LineHeight =
  | 'none' // 1
  | 'tight' // 1.1
  | 'snug' // 1.2
  | 'normal' // 1.5
  | 'relaxed' // 1.75
  | 'loose'; // 2

// Letter spacing types
export type LetterSpacing =
  | 'tighter' // -0.05em
  | 'tight' // -0.025em
  | 'normal' // 0
  | 'wide' // 0.025em
  | 'wider' // 0.05em
  | 'widest'; // 0.1em

// Text color types based on our design system
export type TextColor =
  | 'primary' // Main text color
  | 'secondary' // Secondary text color
  | 'tertiary' // Tertiary text color
  | 'inverse' // White text for dark backgrounds
  | 'brand' // Brand color text
  | 'success' // Success state text
  | 'warning' // Warning state text
  | 'error' // Error state text
  | 'info'; // Info state text

// Typography configuration interface
export interface TypographyConfig {
  variant: TypographyVariant;
  weight?: FontWeight;
  family?: FontFamily;
  color?: TextColor;
  lineHeight?: LineHeight;
  letterSpacing?: LetterSpacing;
  className?: string;
}

// Predefined typography styles for common use cases
export interface TypographyStyles {
  // Display styles
  displayBold: TypographyConfig;
  displayRegular: TypographyConfig;

  // Hero styles
  heroSemibold: TypographyConfig;
  heroBold: TypographyConfig;

  // Heading styles
  h1Semibold: TypographyConfig;
  h1Bold: TypographyConfig;
  h2Semibold: TypographyConfig;
  h2Medium: TypographyConfig;
  h3Medium: TypographyConfig;
  h3Semibold: TypographyConfig;

  // Body styles
  bodyLargeRegular: TypographyConfig;
  bodyLargeMedium: TypographyConfig;
  bodyRegular: TypographyConfig;
  bodyMedium: TypographyConfig;

  // Small text styles
  smallRegular: TypographyConfig;
  smallMedium: TypographyConfig;
  microRegular: TypographyConfig;
  microMedium: TypographyConfig;

  // Specialized styles
  buttonText: TypographyConfig;
  labelText: TypographyConfig;
  captionText: TypographyConfig;
  codeText: TypographyConfig;
}

// Typography component props interface
export interface TypographyProps {
  variant?: TypographyVariant;
  weight?: FontWeight;
  family?: FontFamily;
  color?: TextColor;
  lineHeight?: LineHeight;
  letterSpacing?: LetterSpacing;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
  // Allow any additional HTML attributes
  [key: string]: any;
}

// Responsive typography configuration
export interface ResponsiveTypography {
  mobile: TypographyVariant;
  tablet?: TypographyVariant;
  desktop?: TypographyVariant;
  wide?: TypographyVariant;
}

// Font loading status
export type FontLoadingStatus = 'loading' | 'loaded' | 'error';

// Font metrics for precise layout calculations
export interface FontMetrics {
  ascent: number;
  descent: number;
  lineGap: number;
  capHeight: number;
  xHeight: number;
  unitsPerEm: number;
}

// Typography theme configuration
export interface TypographyTheme {
  fontFamilies: Record<FontFamily, string[]>;
  fontWeights: Record<FontWeight, number>;
  fontSizes: Record<
    TypographyVariant,
    {
      fontSize: string;
      lineHeight: string;
      letterSpacing: string;
    }
  >;
  textColors: Record<TextColor, string>;
  lineHeights: Record<LineHeight, number>;
  letterSpacings: Record<LetterSpacing, string>;
}

// Utility type for Tailwind CSS classes
export type TailwindTypographyClass =
  | `text-${TypographyVariant}`
  | `font-${FontWeight}`
  | `font-${FontFamily}`
  | `text-${TextColor}`
  | `leading-${LineHeight}`
  | `tracking-${LetterSpacing}`;

// Export default typography styles configuration
export const defaultTypographyStyles: TypographyStyles = {
  // Display styles
  displayBold: {
    variant: 'display',
    weight: 'bold',
    family: 'sans',
    color: 'primary',
    lineHeight: 'none',
    letterSpacing: 'tight',
  },
  displayRegular: {
    variant: 'display',
    weight: 'regular',
    family: 'sans',
    color: 'primary',
    lineHeight: 'none',
    letterSpacing: 'tight',
  },

  // Hero styles
  heroSemibold: {
    variant: 'hero',
    weight: 'semibold',
    family: 'sans',
    color: 'primary',
    lineHeight: 'none',
    letterSpacing: 'tight',
  },
  heroBold: {
    variant: 'hero',
    weight: 'bold',
    family: 'sans',
    color: 'primary',
    lineHeight: 'none',
    letterSpacing: 'tight',
  },

  // Heading styles
  h1Semibold: {
    variant: 'h1',
    weight: 'semibold',
    family: 'sans',
    color: 'primary',
    lineHeight: 'tight',
    letterSpacing: 'tight',
  },
  h1Bold: {
    variant: 'h1',
    weight: 'bold',
    family: 'sans',
    color: 'primary',
    lineHeight: 'tight',
    letterSpacing: 'tight',
  },
  h2Semibold: {
    variant: 'h2',
    weight: 'semibold',
    family: 'sans',
    color: 'primary',
    lineHeight: 'snug',
    letterSpacing: 'tight',
  },
  h2Medium: {
    variant: 'h2',
    weight: 'medium',
    family: 'sans',
    color: 'primary',
    lineHeight: 'snug',
    letterSpacing: 'tight',
  },
  h3Medium: {
    variant: 'h3',
    weight: 'medium',
    family: 'sans',
    color: 'primary',
    lineHeight: 'snug',
    letterSpacing: 'tight',
  },
  h3Semibold: {
    variant: 'h3',
    weight: 'semibold',
    family: 'sans',
    color: 'primary',
    lineHeight: 'snug',
    letterSpacing: 'tight',
  },

  // Body styles
  bodyLargeRegular: {
    variant: 'body-lg',
    weight: 'regular',
    family: 'sans',
    color: 'primary',
    lineHeight: 'relaxed',
    letterSpacing: 'wide',
  },
  bodyLargeMedium: {
    variant: 'body-lg',
    weight: 'medium',
    family: 'sans',
    color: 'primary',
    lineHeight: 'relaxed',
    letterSpacing: 'wide',
  },
  bodyRegular: {
    variant: 'body',
    weight: 'regular',
    family: 'sans',
    color: 'primary',
    lineHeight: 'normal',
    letterSpacing: 'wide',
  },
  bodyMedium: {
    variant: 'body',
    weight: 'medium',
    family: 'sans',
    color: 'primary',
    lineHeight: 'normal',
    letterSpacing: 'wide',
  },

  // Small text styles
  smallRegular: {
    variant: 'small',
    weight: 'regular',
    family: 'sans',
    color: 'secondary',
    lineHeight: 'normal',
    letterSpacing: 'wide',
  },
  smallMedium: {
    variant: 'small',
    weight: 'medium',
    family: 'sans',
    color: 'primary',
    lineHeight: 'normal',
    letterSpacing: 'wide',
  },
  microRegular: {
    variant: 'micro',
    weight: 'regular',
    family: 'sans',
    color: 'tertiary',
    lineHeight: 'tight',
    letterSpacing: 'wide',
  },
  microMedium: {
    variant: 'micro',
    weight: 'medium',
    family: 'sans',
    color: 'secondary',
    lineHeight: 'tight',
    letterSpacing: 'wide',
  },

  // Specialized styles
  buttonText: {
    variant: 'body',
    weight: 'medium',
    family: 'sans',
    color: 'inverse',
    lineHeight: 'normal',
    letterSpacing: 'wide',
  },
  labelText: {
    variant: 'small',
    weight: 'medium',
    family: 'sans',
    color: 'primary',
    lineHeight: 'normal',
    letterSpacing: 'wide',
  },
  captionText: {
    variant: 'micro',
    weight: 'regular',
    family: 'sans',
    color: 'tertiary',
    lineHeight: 'tight',
    letterSpacing: 'wide',
  },
  codeText: {
    variant: 'small',
    weight: 'regular',
    family: 'mono',
    color: 'primary',
    lineHeight: 'normal',
    letterSpacing: 'normal',
  },
};

// Responsive typography presets
export const responsiveTypographyPresets = {
  heroResponsive: {
    mobile: 'h2' as TypographyVariant,
    tablet: 'h1' as TypographyVariant,
    desktop: 'hero' as TypographyVariant,
  },
  headingResponsive: {
    mobile: 'h3' as TypographyVariant,
    tablet: 'h2' as TypographyVariant,
    desktop: 'h1' as TypographyVariant,
  },
  subheadingResponsive: {
    mobile: 'body-lg' as TypographyVariant,
    tablet: 'h3' as TypographyVariant,
    desktop: 'h2' as TypographyVariant,
  },
  bodyResponsive: {
    mobile: 'body' as TypographyVariant,
    tablet: 'body' as TypographyVariant,
    desktop: 'body-lg' as TypographyVariant,
  },
} as const;
