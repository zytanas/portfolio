/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', '"SF Mono"', 'monospace'],
      },
      // Variable-backed palette. The theme is a six-cell matrix
      // (2 modes x 3 inks) held in CSS custom properties, so these
      // utilities re-theme themselves — no `dark:` variants anywhere.
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        card: 'var(--card)',
        'card-hi': 'var(--card-hi)',
        line: 'var(--border)',
        'line-soft': 'var(--border-soft)',
        ink: 'var(--text)',
        dim: 'var(--text-dim)',
        faint: 'var(--text-faint)',
        plate: 'var(--plate)',
      },
    },
  },
  plugins: [],
}
