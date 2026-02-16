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
        body: ['Arial', 'Helvetica', 'sans-serif'],
        'exo': ['"Exo 2"', 'Arial', 'sans-serif'],
      },
      colors: {
        orange: {
          50: '#FFF3ED',
          100: '#FFE6DB',
          200: '#FFCDB8',
          300: '#FFB594',
          400: '#FF9C71',
          500: '#FF834D',
          600: '#D36B3E',
          700: '#A7532E',
          800: '#7C3B1F',
          900: '#50230F',
          950: '#3A1708',
        },
        dark: {
          bg: '#0a0a0f',
          parcard: '#1a1a2e',
          accent: '#FF6B35',
          'purple-start': '#1A0E2E',
          'purple-mid': '#2D1B4E',
          'purple-end': '#1A0E2E',
        }
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(180deg, #0D0718 0%, #1F1438 50%, #0D0718 100%)',
        'gradient-card': 'linear-gradient(180deg, #201e2e 10%, #443135 100%)',
      }
    },
  },
  plugins: [],
}