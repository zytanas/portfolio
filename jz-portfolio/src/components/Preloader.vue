<template>
  <div
    v-if="visible"
    id="jz-preloader"
    class="preloader"
    :class="{ 'is-leaving': leaving, 'is-static': reduced }"
    @pointerdown="skip"
  >
    <p class="sr-only" role="status">Loading portfolio</p>

    <!-- Fixed-size stage. Both images sit at inset 0 / width 100%, so they
         cannot drift relative to each other — the reveal is one glyph
         lighting up, never two offset copies. -->
    <div class="stage" aria-hidden="true">
      <img :src="logo" class="glyph glyph--dim" width="390" height="160" alt="" decoding="sync" />
      <img :src="logo" class="glyph glyph--lit" width="390" height="160" alt="" decoding="sync" />
      <span v-if="!reduced" class="scan"></span>
    </div>

    <p class="caption" aria-hidden="true">loading · colors are hiding in the case studies</p>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import logo from '../assets/images/jzoa-logo.webp'

const props = defineProps({
  /* Swap `driver` to 'local' and give `ttlMs` a value to get once-per-day
     instead of once-per-session. Both are read only inside onMounted, so
     neither touches the prerender pass. Changing either of these also means
     updating the matching check in index.html's blocking script. */
  storageKey: { type: String, default: 'jz.preloader.v1' },
  driver: { type: String, default: 'session' }, // 'session' | 'local'
  ttlMs: { type: Number, default: 0 }, // 0 = no expiry; e.g. 864e5 for a day

  /* The sweep lands at ~1290ms (bar 150+1100, clip edge 190+1100, caption
     700+520). 1750 clears that with a beat of settle on the finished glyph,
     so a fast load never cuts the reveal mid-print. */
  minMs: { type: Number, default: 1750 },
  capMs: { type: Number, default: 2500 },
  exitMs: { type: Number, default: 450 },
})

const emit = defineEmits(['done'])

/* Starts true so vite-ssg writes the overlay into every prerendered page.
   The site is therefore never visible before the loader — there is no
   frame in which the page paints bare. */
const visible = ref(true)
const leaving = ref(false)
const reduced = ref(false)

let timers = []
let scrollLock = null
let dismissed = false
let startedAt = 0

const store = () => {
  try {
    return props.driver === 'local' ? window.localStorage : window.sessionStorage
  } catch {
    return null // Safari private mode, embedded webviews
  }
}

function alreadyPlayed() {
  const s = store()
  if (!s) return false
  const raw = s.getItem(props.storageKey)
  if (!raw) return false
  if (!props.ttlMs) return true
  const at = Number(raw)
  return Number.isFinite(at) && Date.now() - at < props.ttlMs
}

function markPlayed() {
  const s = store()
  if (s) s.setItem(props.storageKey, String(Date.now()))
}

function after(ms, fn) {
  timers.push(setTimeout(fn, ms))
}

function clearTimers() {
  timers.forEach(clearTimeout)
  timers = []
}

function lockScroll() {
  scrollLock = document.body.style.overflow
  document.body.style.overflow = 'hidden'
}

function releaseScroll() {
  if (scrollLock !== null) document.body.style.overflow = scrollLock
  scrollLock = null
}

function detach() {
  clearTimers()
  window.removeEventListener('load', onLoad)
  window.removeEventListener('keydown', skip)
}

function teardown() {
  visible.value = false
  releaseScroll()
  document.getElementById('app')?.removeAttribute('aria-busy')

  /* Focus lands on the view's own landmark. Every view here renders its own
     <main>, so this is the first one in the document — point it at your skip
     link target instead if you add one. */
  const main = document.querySelector('main')
  if (main) {
    main.setAttribute('tabindex', '-1')
    main.focus({ preventScroll: true })
  }
  emit('done')
}

function dismiss() {
  if (dismissed) return
  dismissed = true
  detach()
  markPlayed()

  /* Reduced motion has transitions globally disabled by main.css, so waiting
     on a fade that cannot run would just stall the page. */
  if (reduced.value) return teardown()

  leaving.value = true
  after(props.exitMs, teardown)
}

function skip() {
  if (!leaving.value) dismiss()
}

function onLoad() {
  const held = performance.now() - startedAt
  after(Math.max(0, props.minMs - held), dismiss)
}

onMounted(() => {
  if (alreadyPlayed()) {
    visible.value = false
    emit('done')
    return
  }

  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  startedAt = performance.now()

  lockScroll()
  document.getElementById('app')?.setAttribute('aria-busy', 'true')

  window.addEventListener('keydown', skip)

  if (reduced.value) {
    /* A beat on the static glyph, then straight out. No sweep. */
    after(700, dismiss)
    return
  }

  if (document.readyState === 'complete') onLoad()
  else window.addEventListener('load', onLoad, { once: true })

  /* The hard ceiling. A stalled font or image never holds the visitor. */
  after(props.capMs, dismiss)
})

onBeforeUnmount(() => {
  detach()
  releaseScroll()
  document.getElementById('app')?.removeAttribute('aria-busy')
})
</script>

<style scoped>
.preloader {
  /* Not in the ramp — nearest tokens are --plate and --text-faint. */
  --scan-ink: #e8e6df;
  --caption-ink: #75736e;
  --sweep: cubic-bezier(0.6, 0, 0.4, 1);
  --logo-w: 390px;
  --logo-h: 160px;

  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 26px;
  padding-inline: 24px;
  /* Falls back to the spec's black if --bg has not resolved yet. */
  background: var(--bg, #0a0a0a);
  opacity: 1;
  transition: opacity 450ms ease;
}

.preloader.is-leaving {
  opacity: 0;
  pointer-events: none;
}

.stage {
  position: relative;
  width: var(--logo-w);
  height: var(--logo-h);
}

.glyph {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  /* Fallback first, then the real thing — order matters. */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: pixelated;
}

.glyph--dim {
  filter: brightness(0.22);
}

.glyph--lit {
  clip-path: inset(0 100% 0 0);
  animation: glyph-print 1100ms var(--sweep) 190ms forwards;
}

.scan {
  position: absolute;
  top: -8px;
  bottom: -8px;
  left: 0;
  width: 2px;
  background: var(--scan-ink);
  box-shadow:
    0 0 6px rgba(232, 230, 223, 0.85),
    0 0 22px rgba(232, 230, 223, 0.4);
  transform: translateX(-2px);
  opacity: 0;
  animation: scan-sweep 1100ms var(--sweep) 150ms forwards;
}

.caption {
  /* letter-spacing hangs off the last glyph too, so the text sits half a
     space left of true centre. The negative right margin eats exactly that
     trailing gap and puts the visible ink back on the axis. */
  margin: 0 -0.24em 0 0;
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 1.6;
  letter-spacing: 0.24em;
  text-transform: lowercase;
  text-align: center;
  text-wrap: balance;
  color: var(--caption-ink);
  opacity: 0;
  animation: caption-in 520ms ease 700ms forwards;
}

/* The lit layer's clip edge starts 40ms behind the bar, so pixels light up
   just after it crosses them rather than under it. */
@keyframes glyph-print {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

@keyframes scan-sweep {
  0% {
    transform: translateX(-2px);
    opacity: 0;
  }
  8% {
    opacity: 1;
  }
  88% {
    opacity: 1;
  }
  100% {
    transform: translateX(var(--logo-w));
    opacity: 0;
  }
}

@keyframes caption-in {
  to {
    opacity: 1;
  }
}

/* Half scale, still a whole multiple, so the pixel grid stays aligned. */
@media (max-width: 479px) {
  .preloader {
    --logo-w: 195px;
    --logo-h: 80px;
    gap: 20px;
  }
}

/* One line wherever it fits; below this the string is too long for the
   viewport, so tracking tightens and it breaks into two balanced lines —
   narrow enough that even a 300px screen never reaches a third. */
@media (max-width: 599px) {
  .caption {
    margin-right: -0.16em;
    font-size: 10px;
    letter-spacing: 0.16em;
  }
}

/* No sweep, no print — the glyph is simply there at full brightness. */
.preloader.is-static .glyph--dim {
  display: none;
}
.preloader.is-static .glyph--lit {
  clip-path: none;
  animation: none;
}
.preloader.is-static .caption {
  opacity: 1;
  animation: none;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
</style>
