<template>
  <header class="site-header" :class="{ stuck }">
    <div class="wrap bar">
      <a class="brand" href="#top" aria-label="JZOA — Julia Almoite, back to top">
        <img :src="logo" alt="JZOA" width="390" height="160" />
      </a>
      <nav class="links">
        <a v-for="link in links" :key="link.href" :href="link.href">{{ link.label }}</a>
      </nav>
      <div class="actions">
        <button
          class="btn icon ghost"
          type="button"
          title="Toggle dark / light (T)"
          aria-label="Toggle dark and light mode"
          @click="toggleMode"
        >
          <span aria-hidden="true">{{ mode === 'dark' ? '◐' : '◑' }}</span>
        </button>
        <a class="btn talk" href="#contact">Let's talk</a>

        <!-- ≤720px only: the links collapse into this -->
        <button
          class="btn icon ghost burger"
          :class="{ open }"
          type="button"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          :aria-label="open ? 'Close menu' : 'Open menu'"
          @click="open = !open"
        >
          <span class="bars" aria-hidden="true"><i></i><i></i></span>
        </button>
      </div>
    </div>
  </header>

  <!-- Outside <header> on purpose: the header's backdrop-filter makes it a
       containing block, which would trap a fixed-position panel inside it. -->
  <Teleport to="body">
    <div class="mobile-nav" :class="{ open }" id="mobile-nav" :inert="open ? null : true">
      <nav>
        <a
          v-for="(link, i) in links"
          :key="link.href"
          :href="link.href"
          :style="{ '--i': i }"
          @click="open = false"
        >
          <span class="idx">{{ String(i + 1).padStart(2, '0') }}</span>
          {{ link.label }}
        </a>
      </nav>
      <a class="btn solid talk-lg" href="#contact" :style="{ '--i': links.length }" @click="open = false">
        Let's talk →
      </a>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useTheme } from '../composables/useTheme'
import logo from '../assets/images/jzoa-logo.webp'

const { mode, toggleMode } = useTheme()

const links = [
  { href: '#skills', label: 'Skills' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#stack', label: 'Stack' },
  { href: '#recommendations', label: 'Praise' },
  { href: '#contact', label: 'Contact' },
]

const stuck = ref(false)
const onScroll = () => {
  stuck.value = window.scrollY > 12
}

const open = ref(false)
// The panel covers the page, so the body behind it must not scroll with it.
watch(open, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})
// Rotating past the breakpoint leaves the panel hidden but still open.
const mq = window.matchMedia('(min-width: 721px)')
const onWide = (e) => {
  if (e.matches) open.value = false
}

/* T flips the mode from anywhere, unless the user is typing or holding a
   modifier — see the hint in the footer. */
const onKeydown = (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return
  if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '')) return
  if (e.key === 'Escape' && open.value) {
    open.value = false
    return
  }
  if (e.key.toLowerCase() === 't') toggleMode()
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  mq.addEventListener('change', onWide)
  onScroll()
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  mq.removeEventListener('change', onWide)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 60;
  backdrop-filter: blur(16px);
  background: color-mix(in srgb, var(--bg) 80%, transparent);
  border-bottom: 1px solid transparent;
  transition: border-color var(--dur) var(--ease), background var(--dur) var(--ease);
}
.site-header.stuck {
  border-bottom-color: var(--border-soft);
}
.bar {
  display: flex;
  align-items: center;
  gap: 20px;
  height: 58px;
}

/* Logo — the artwork is pure greyscale on transparency, so one asset serves
   both themes: inverting it turns the white wordmark black and the light drop
   shadow into a dark one. A CSS mask would drop that shadow. */
.brand {
  display: flex;
  align-items: center;
}
.brand img {
  height: 26px;
  width: auto;
  display: block;
  transition: filter var(--dur) var(--ease), opacity 0.2s var(--ease);
}
/* No :global() here — with a leading :global(...) the scoped compiler drops the
   rest of the selector and the invert lands on <html>, negating the whole page.
   A plain ancestor selector scopes correctly: only the last compound gets the
   data-v attribute, so matching on <html> works as written. */
html[data-mode='light'] .brand img {
  filter: invert(1);
}
.brand:hover img {
  opacity: 0.7;
}

.links {
  display: flex;
  gap: 2px;
  margin-left: auto;
}
.links a {
  font-size: 0.83rem;
  color: var(--text-dim);
  padding: 6px 11px;
  border-radius: 8px;
  transition: 0.2s var(--ease);
}
.links a:hover {
  color: var(--text);
  background: var(--surface-2);
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto; /* holds the right edge once .links drops out on mobile */
}

/* Two bars that cross into an X. */
.burger {
  display: none;
}
.bars {
  display: block;
  width: 15px;
  height: 9px;
  position: relative;
}
.bars i {
  position: absolute;
  left: 0;
  width: 100%;
  height: 1.5px;
  background: currentColor;
  border-radius: 2px;
  transition: transform 0.3s var(--ease), top 0.3s var(--ease);
}
.bars i:first-child {
  top: 0;
}
.bars i:last-child {
  top: 7.5px;
}
.burger.open .bars i {
  top: 3.75px;
}
.burger.open .bars i:first-child {
  transform: rotate(45deg);
}
.burger.open .bars i:last-child {
  transform: rotate(-45deg);
}

/* ---- the panel ---- */
.mobile-nav {
  position: fixed;
  inset: 58px 0 0 0;
  z-index: 55;
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 26px;
  padding: 0 24px 58px;
  background: var(--bg);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.28s var(--ease), visibility 0.28s var(--ease);
}
.mobile-nav.open {
  opacity: 1;
  visibility: visible;
}
.mobile-nav nav {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border-soft);
}
.mobile-nav nav a {
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding: 15px 2px;
  font-family: var(--font-display);
  font-size: 1.5rem;
  letter-spacing: -0.03em;
  color: var(--text);
  border-bottom: 1px solid var(--border-soft);
}
.mobile-nav nav a .idx {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  color: var(--text-faint);
}
.mobile-nav nav a:active {
  color: var(--text-dim);
}
.mobile-nav .talk-lg {
  justify-content: center;
  padding: 12px;
  font-size: 0.9rem;
}
/* Rows fall in behind the fade, one after the next. */
.mobile-nav nav a,
.mobile-nav .talk-lg {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.32s var(--ease), transform 0.32s var(--ease);
}
.mobile-nav.open nav a,
.mobile-nav.open .talk-lg {
  opacity: 1;
  transform: none;
  transition-delay: calc(60ms + var(--i) * 40ms);
}

@media (max-width: 720px) {
  .links,
  .actions .talk {
    display: none;
  }
  .burger {
    display: inline-flex;
  }
  .mobile-nav {
    display: flex;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bars i,
  .mobile-nav,
  .mobile-nav nav a,
  .mobile-nav .talk-lg {
    transition-duration: 0.01ms;
  }
}
</style>
