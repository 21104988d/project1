/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#FF006E',
          secondary: '#FB3085',
          accent: '#8B5FBF',
          'hover-primary': '#E6005F',
          'hover-secondary': '#E82D7A',
          'hover-accent': '#7A54AB',
          'active-primary': '#CC005A',
          'active-secondary': '#D42670',
          'active-accent': '#6B4996',
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
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      // 8pt Grid Spacing System (4px base unit)
      spacing: {
        0.5: '2px', // 0.5 * 4px
        1: '4px', // 1 * 4px
        2: '8px', // 2 * 4px
        3: '12px', // 3 * 4px
        4: '16px', // 4 * 4px
        6: '24px', // 6 * 4px
        8: '32px', // 8 * 4px
        12: '48px', // 12 * 4px
        16: '64px', // 16 * 4px
        20: '80px', // 20 * 4px
        24: '96px', // 24 * 4px
        32: '128px', // 32 * 4px
      },
      // Container System
      maxWidth: {
        mobile: '320px', // Mobile container
        tablet: '768px', // Tablet container
        desktop: '1200px', // Desktop container
        wide: '1440px', // Wide desktop container
        ultra: '1600px', // Ultra-wide container
      },
      // Grid System
      gridTemplateColumns: {
        mobile: 'repeat(4, 1fr)', // 4 columns mobile
        tablet: 'repeat(8, 1fr)', // 8 columns tablet
        desktop: 'repeat(12, 1fr)', // 12 columns desktop
      },
      // Responsive Gutters
      gap: {
        mobile: '16px', // Mobile gutter
        tablet: '24px', // Tablet gutter
        desktop: '32px', // Desktop gutter
      },
      // Border Radius Scale
      borderRadius: {
        none: '0',
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        full: '50%',
      },
      // Shadow System
      boxShadow: {
        none: 'none',
        subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        modal: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        high: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        brand: '0 4px 14px 0 rgba(255, 0, 110, 0.25)',
        'brand-lg': '0 8px 25px 0 rgba(255, 0, 110, 0.3)',
      },
      // Animation and Transitions
      animation: {
        'fade-in': 'fadeIn 300ms ease-out',
        'slide-up': 'slideUp 300ms ease-out',
        'scale-in': 'scaleIn 250ms ease-out',
        'pulse-brand': 'pulseBrand 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseBrand: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
