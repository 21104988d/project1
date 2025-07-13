/** @type {import('tailwindcss').Config} */

// PayMe-inspired color system (embedded for simplicity)
const colors = {
  brand: {
    primary: '#FF006E',
    secondary: '#FB3085', 
    accent: '#8B5FBF',
    hover: {
      primary: '#E6005F',
      secondary: '#E82D7A',
      accent: '#7A54AB',
    },
    active: {
      primary: '#CC005A',
      secondary: '#D42670',
      accent: '#6B4996',
    },
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
  border: {
    default: '#E5E7EB',
    focus: '#FF006E',
    error: '#FF4757',
  },
  shadow: {
    brand: 'rgba(255, 0, 110, 0.2)',
  },
  gradient: {
    primary: 'linear-gradient(135deg, #FF006E 0%, #FB3085 50%, #8B5FBF 100%)',
    card: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)',
    overlay: 'linear-gradient(180deg, rgba(255, 0, 110, 0.9) 0%, rgba(139, 95, 191, 0.9) 100%)',
  },
};

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/design-system/**/*.{js,ts,jsx,tsx,mdx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        // PayMe-inspired brand colors
        brand: {
          primary: colors.brand.primary,
          secondary: colors.brand.secondary,
          accent: colors.brand.accent,
          hover: {
            primary: colors.brand.hover.primary,
            secondary: colors.brand.hover.secondary,
            accent: colors.brand.hover.accent,
          },
          active: {
            primary: colors.brand.active.primary,
            secondary: colors.brand.active.secondary,
            accent: colors.brand.active.accent,
          },
        },
        // Stablecoin colors
        stablecoin: {
          usdt: colors.stablecoin.usdt,
          usdc: colors.stablecoin.usdc,
          dai: colors.stablecoin.dai,
        },
        // Semantic colors
        success: colors.semantic.success,
        warning: colors.semantic.warning,
        error: colors.semantic.error,
        info: colors.semantic.info,
        // Surface colors
        surface: {
          background: colors.surface.background,
          card: colors.surface.card,
        },
        // Text colors
        text: {
          primary: colors.text.primary,
          secondary: colors.text.secondary,
          tertiary: colors.text.tertiary,
          inverse: colors.text.inverse,
          brand: colors.text.brand,
        },
        // Border colors
        border: {
          DEFAULT: colors.border.default,
          focus: colors.border.focus,
          error: colors.border.error,
        },
      },
      backgroundImage: {
        'gradient-brand': colors.gradient.primary,
        'gradient-card': colors.gradient.card,
        'gradient-overlay': colors.gradient.overlay,
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'modal': '0 20px 25px -5px rgba(0, 0, 0, 0.25)',
        'brand': `0 4px 14px 0 ${colors.shadow.brand}`,
        'brand-lg': `0 10px 40px 0 ${colors.shadow.brand}`,
      },
      animation: {
        'pulse-brand': 'pulse-brand 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
      },
      keyframes: {
        'pulse-brand': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.05)',
          },
        },
        'gradient-shift': {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
      },
    },
  },
  plugins: [
    // Comment out plugins that might not be installed
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
};
