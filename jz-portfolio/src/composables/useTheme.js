import { ref, watch } from 'vue'

const KEY = 'julia.theme.v2'

/* Paper colour per cell of the theme matrix — mirrors --bg in main.css and
   feeds <meta name="theme-color">, so the browser chrome matches the page. */
const PAPER = {
  neutral: { dark: '#0a0a0a', light: '#fbfbfa' },
  warm: { dark: '#0b0a08', light: '#faf7f2' },
  cool: { dark: '#08090b', light: '#f8fafb' },
}

const root = document.documentElement

/* Module-scoped, deliberately: every component that calls useTheme() shares
   this one instance instead of getting its own disconnected refs. */
const mode = ref(root.dataset.mode === 'light' ? 'light' : 'dark')
const ink = ref(PAPER[root.dataset.ink] ? root.dataset.ink : 'neutral')

function apply(persist) {
  root.dataset.mode = mode.value
  root.dataset.ink = ink.value
  const meta = document.querySelector('meta[name=theme-color]')
  if (meta) meta.setAttribute('content', PAPER[ink.value][mode.value])
  if (persist) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ mode: mode.value, ink: ink.value }))
    } catch (e) {
      /* private mode — the theme still works, it just will not stick */
    }
  }
}

// The blocking script in index.html already put the right values on <html>,
// so the first pass only reconciles; nothing is written back on load.
apply(false)
watch([mode, ink], () => apply(true))

export function useTheme() {
  const toggleMode = () => {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
  }
  const setInk = (next) => {
    if (PAPER[next]) ink.value = next
  }
  return { mode, ink, toggleMode, setInk }
}
