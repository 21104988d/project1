import type { Config } from 'tailwindcss';

const config: Config = {
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
        // Stablecoin colors
        stablecoin: {
          usdt: '#26A69A',
          usdc: '#2775CA',
          dai: '#F5AC37',
        },
        // Semantic colors
        success: '#00C896',
        warning: '#FFB800',
        error: '#FF4757',
        info: '#5352ED',
        // Surface colors
        surface: {
          background: '#FAFAFA',
          card: '#FFFFFF',
        },
        // Text colors
        text: {
          primary: '#1F2937',
          secondary: '#6B7280',
          tertiary: '#9CA3AF',
          inverse: '#FFFFFF',
          brand: '#FF006E',
        },
        // Border colors
        border: {
          DEFAULT: '#E5E7EB',
          focus: '#FF006E',
          error: '#FF4757',
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #FF006E 0%, #FB3085 50%, #8B5FBF 100%)',
        'gradient-card': 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)',
        'gradient-overlay':
          'linear-gradient(180deg, rgba(255, 0, 110, 0.9) 0%, rgba(139, 95, 191, 0.9) 100%)',
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        modal: '0 20px 25px -5px rgba(0, 0, 0, 0.25)',
        brand: '0 4px 14px 0 rgba(255, 0, 110, 0.2)',
        'brand-lg': '0 10px 40px 0 rgba(255, 0, 110, 0.2)',
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
      // Typography system
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Micro text (12px)
        micro: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
        // Small text (14px)
        small: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
        // Body text (16px)
        body: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.0125em' }],
        // Large body text (18px)
        'body-lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0.0125em' }],
        // H3 heading (24px)
        h3: ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.025em' }],
        // H2 heading (30px)
        h2: ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }],
        // H1 heading (36px)
        h1: ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.025em' }],
        // Hero text (56px)
        hero: ['3.5rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
        // Display text (72px)
        display: ['4.5rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        black: '900',
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      lineHeight: {
        none: '1',
        tight: '1.1',
        snug: '1.2',
        normal: '1.5',
        relaxed: '1.75',
        loose: '2',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
