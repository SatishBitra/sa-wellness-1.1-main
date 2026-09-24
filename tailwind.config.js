/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          primary: '#F8F7F2',
          secondary: '#F1F0E9',
          white: '#FFFFFF',
        },
        ink: {
          DEFAULT: '#17201B',
          secondary: '#5F6962',
          muted: '#8A938C',
        },
        brand: {
          primary: '#5D735F',
          deep: '#314A3A',
          light: '#7B9180',
        },
        accent: {
          warm: '#B99668',
          light: '#D4BC9A',
        },
        border: {
          subtle: '#DCE0D9',
          DEFAULT: '#E2E4DE',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'eyebrow': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.14em', fontWeight: '500' }],
      },
      borderRadius: {
        'xl2': '18px',
        'hero': '24px',
        'editorial': '28px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '38': '9.5rem',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(1.04)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'rise': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fade-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in': 'scale-in 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'rise': 'rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
    },
  },
  plugins: [],
};
