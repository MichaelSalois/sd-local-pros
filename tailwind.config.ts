import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          blue: '#007AFF',
          'blue-light': '#A8D8EA',
          'blue-hover': '#0056CC',
          'blue-bg': '#E8F4FD',
          black: '#1D1D1F',
          'gray-dark': '#6E6E73',
          'gray-mid': '#86868B',
          'gray-light': '#D2D2D7',
          'gray-bg': '#F5F5F7',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        display: ['"SF Pro Display"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        body: ['"SF Pro Text"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'hero': ['64px', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        'hero-mobile': ['40px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-mobile': ['32px', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'title': ['28px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'subtitle': ['21px', { lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['19px', { lineHeight: '1.5', fontWeight: '400' }],
        'body': ['17px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      spacing: {
        'section': '120px',
        'section-mobile': '80px',
      },
      borderRadius: {
        'card': '12px',
        'button': '980px',
        'input': '10px',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'nav': '0 1px 0 rgba(0, 0, 0, 0.08)',
        'button': '0 2px 8px rgba(0, 122, 255, 0.3)',
      },
      backdropBlur: {
        'nav': '20px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
