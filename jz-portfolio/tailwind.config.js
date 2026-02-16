/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Exo 2', 'sans-serif'],
        body: ['Arial', 'sans-serif'],
      },
      colors: {
        dark: {
          bg: '#0a0a0f',
          card: '#1a1a2e',
          accent: '#FF6B35',
          'purple-start': '#1A0E2E',
          'purple-mid': '#2D1B4E',
          'purple-end': '#1A0E2E',
        }
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(180deg, #1A0E2E 0%, #2D1B4E 50%, #1A0E2E 100%)',
      }
    },
  },
  plugins: [],
}