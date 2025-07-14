/**
 * Spacing and Layout System Configuration
 * Part of PayMe Design System
 * Implements 8pt grid system with responsive breakpoints
 */

import type { SpacingSystemConfig } from './spacing.types';

export const spacingConfig: SpacingSystemConfig = {
  spacing: {
    base: 8, // 8px base unit
    scale: {
      none: 0, // 0px
      xs: 4, // 4px (0.5 * base)
      sm: 8, // 8px (1 * base)
      md: 16, // 16px (2 * base)
      lg: 24, // 24px (3 * base)
      xl: 32, // 32px (4 * base)
      '2xl': 48, // 48px (6 * base)
      '3xl': 64, // 64px (8 * base)
    },
  },

  breakpoints: {
    values: {
      mobile: 320, // Mobile phones
      tablet: 768, // Tablets
      desktop: 1024, // Desktop screens
      wide: 1440, // Wide desktop screens
    },

    containers: {
      mobile: 320, // Full width on mobile
      tablet: 768, // 768px max on tablet
      desktop: 1200, // 1200px max on desktop
      wide: 1440, // 1440px max on wide screens
    },

    columns: {
      mobile: 4, // 4 columns on mobile
      tablet: 8, // 8 columns on tablet
      desktop: 12, // 12 columns on desktop
      wide: 12, // 12 columns on wide screens
    },

    gutters: {
      mobile: 16, // 16px gutters on mobile
      tablet: 24, // 24px gutters on tablet
      desktop: 32, // 32px gutters on desktop
      wide: 32, // 32px gutters on wide screens
    },
  },

  layouts: {
    templates: {
      single: {
        name: 'Single Column',
        description: 'Full-width single column layout for focused content',
        columns: ['100%'],
        useCase: 'Landing pages, forms, articles',
      },

      'two-column': {
        name: 'Two Column (60/40)',
        description: 'Main content with sidebar layout',
        columns: ['60%', '40%'],
        useCase: 'Dashboard with sidebar, content with navigation',
      },

      'three-column': {
        name: 'Three Column (25/50/25)',
        description: 'Balanced three-column layout',
        columns: ['25%', '50%', '25%'],
        useCase: 'Complex interfaces, admin panels',
      },

      dashboard: {
        name: 'Dashboard Grid',
        description: 'Flexible grid layout for multiple widgets',
        columns: ['flexible'],
        useCase: 'Analytics dashboards, widget-based interfaces',
      },
    },
  },
};

// Utility functions for working with spacing
export const getSpacing = (scale: keyof typeof spacingConfig.spacing.scale): number => {
  return spacingConfig.spacing.scale[scale];
};

export const getSpacingRem = (scale: keyof typeof spacingConfig.spacing.scale): string => {
  return `${spacingConfig.spacing.scale[scale] / 16}rem`;
};

export const getBreakpoint = (
  breakpoint: keyof typeof spacingConfig.breakpoints.values
): number => {
  return spacingConfig.breakpoints.values[breakpoint];
};

export const getContainer = (size: keyof typeof spacingConfig.breakpoints.containers): number => {
  return spacingConfig.breakpoints.containers[size];
};

export const getGutter = (breakpoint: keyof typeof spacingConfig.breakpoints.gutters): number => {
  return spacingConfig.breakpoints.gutters[breakpoint];
};

// CSS Custom Properties for runtime use
export const spacingCSSVars = {
  '--spacing-none': '0px',
  '--spacing-xs': '4px',
  '--spacing-sm': '8px',
  '--spacing-md': '16px',
  '--spacing-lg': '24px',
  '--spacing-xl': '32px',
  '--spacing-2xl': '48px',
  '--spacing-3xl': '64px',

  '--container-mobile': '320px',
  '--container-tablet': '768px',
  '--container-desktop': '1200px',
  '--container-wide': '1440px',

  '--gutter-mobile': '16px',
  '--gutter-tablet': '24px',
  '--gutter-desktop': '32px',
  '--gutter-wide': '32px',
};
