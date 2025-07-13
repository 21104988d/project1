/**
 * Design Tokens - Color System
 * Inspired by PayMe Hong Kong payment app
 * Version: 1.0.0
 */

export const colors = {
  // Primary Brand Colors (PayMe-inspired)
  brand: {
    primary: '#FF006E', // Vibrant pink - main brand color
    secondary: '#FB3085', // Secondary magenta - supporting brand color
    accent: '#8B5FBF', // Accent purple - tertiary brand color
  },

  // Stablecoin-specific Colors
  stablecoin: {
    usdt: '#26A69A', // USDT green
    usdc: '#2775CA', // USDC blue
    dai: '#F5AC37', // DAI orange
  },

  // Semantic Colors
  semantic: {
    success: '#00C896', // Bright success green
    warning: '#FFB800', // Attention orange
    error: '#FF4757', // Error red
    info: '#5352ED', // Info purple
  },

  // Surface Colors
  surface: {
    background: '#FAFAFA', // Light gray background
    card: '#FFFFFF', // Pure white cards
    overlay: 'rgba(0, 0, 0, 0.6)', // Dark overlay with transparency
  },

  // Border Colors
  border: {
    default: '#E5E7EB', // Light gray border
    focus: '#FF006E', // Brand primary for focus states
    error: '#FF4757', // Error red for validation
  },

  // Text Colors
  text: {
    primary: '#1F2937', // Dark gray for primary text
    secondary: '#6B7280', // Medium gray for secondary text
    tertiary: '#9CA3AF', // Light gray for tertiary text
    inverse: '#FFFFFF', // White text for dark backgrounds
    brand: '#FF006E', // Brand color for links and highlights
  },

  // Gradient Colors (PayMe-style)
  gradient: {
    primary: 'linear-gradient(135deg, #FF006E 0%, #FB3085 50%, #8B5FBF 100%)',
    card: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)',
    overlay: 'linear-gradient(180deg, rgba(255, 0, 110, 0.9) 0%, rgba(139, 95, 191, 0.9) 100%)',
  },

  // Interactive States
  interactive: {
    hover: {
      primary: '#E6005F', // Darker pink for hover
      secondary: '#E82D7A', // Darker magenta for hover
      accent: '#7A54AB', // Darker purple for hover
    },
    active: {
      primary: '#CC005A', // Even darker pink for active
      secondary: '#D42670', // Even darker magenta for active
      accent: '#6B4996', // Even darker purple for active
    },
    disabled: {
      background: '#F3F4F6', // Light gray for disabled backgrounds
      text: '#D1D5DB', // Lighter gray for disabled text
    },
  },

  // Shadow Colors
  shadow: {
    subtle: 'rgba(0, 0, 0, 0.05)',
    card: 'rgba(0, 0, 0, 0.1)',
    modal: 'rgba(0, 0, 0, 0.25)',
    brand: 'rgba(255, 0, 110, 0.2)', // Brand shadow with primary color
  },
} as const;

// Type definitions for TypeScript
export type ColorToken = typeof colors;
export type BrandColor = keyof typeof colors.brand;
export type StablecoinColor = keyof typeof colors.stablecoin;
export type SemanticColor = keyof typeof colors.semantic;

// Utility functions for color manipulation
export const getColorWithOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba with specified opacity
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const getBrandGradient = (direction = '135deg') => {
  return `linear-gradient(${direction}, ${colors.brand.primary} 0%, ${colors.brand.secondary} 50%, ${colors.brand.accent} 100%)`;
};

// CSS Custom Properties for global usage
export const cssVariables = {
  '--color-brand-primary': colors.brand.primary,
  '--color-brand-secondary': colors.brand.secondary,
  '--color-brand-accent': colors.brand.accent,
  '--color-success': colors.semantic.success,
  '--color-warning': colors.semantic.warning,
  '--color-error': colors.semantic.error,
  '--color-info': colors.semantic.info,
  '--color-background': colors.surface.background,
  '--color-card': colors.surface.card,
  '--color-text-primary': colors.text.primary,
  '--color-text-secondary': colors.text.secondary,
  '--color-border': colors.border.default,
  '--gradient-brand': colors.gradient.primary,
} as const;
