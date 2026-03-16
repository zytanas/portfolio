/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Exo 2"', 'Arial', 'sans-serif'],
        body:    ['"Exo 2"', 'Arial', 'sans-serif'],
        exo:     ['"Exo 2"', 'Arial', 'sans-serif'],
      },
      colors: {
        // ── PRIMARY ACCENT: Violet/Purple ──
        violet: {
          50:  '#F3F0FF',
          100: '#E9E3FF',
          200: '#C4B5FD',
          300: '#A78BFA',
          400: '#8B6FF7',
          500: '#7B5CFA',   // main accent
          600: '#6044E0',
          700: '#4830C6',
          800: '#3320A0',
          900: '#1E1265',
          950: '#0F0935',
        },
        // ── SECONDARY ACCENT: Teal ──
        teal: {
          50:  '#EDFAFA',
          100: '#D5F5F6',
          200: '#AFECEF',
          300: '#7EDCE2',
          400: '#5EEAD4',
          500: '#2DD4BF',   // teal accent
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
          950: '#042F2E',
        },
        // ── DARK SURFACES ──
        dark: {
          bg:      '#0A0A0F',
          bg2:     '#0F0F1A',
          surface: '#1A1A2E',
          border:  'rgba(123,92,250,0.14)',
        },
      },
      backgroundImage: {
        'gradient-hero':   'linear-gradient(180deg, #0A0A0F 0%, #0F0F1A 50%, #0A0A0F 100%)',
        'gradient-card':   'linear-gradient(135deg, #141428 0%, #1A1A35 100%)',
        'gradient-accent': 'linear-gradient(135deg, #7B5CFA 0%, #A78BFA 100%)',
      },
    },
  },
  plugins: [],
}