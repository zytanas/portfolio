<template>
  <header class="site-header" :class="{ stuck }">
    <div class="wrap bar">
      <!-- Home, not #top: on an inner page a bare hash went nowhere and left
           `#top` stuck in the URL. On home there is nowhere to route to, so
           the click is intercepted and turned into a scroll back up. -->
      <RouterLink
        class="brand"
        to="/"
        aria-label="JZOA — Julia Almoite, home"
        @click="onBrandClick"
      >
        <img :src="logo" alt="JZOA" width="390" height="160" />
      </RouterLink>
      <!-- Home-absolute, not a bare `#skills`: the browser resolves a relative
           hash against the current path, so on /selected-work the nav used to
           produce /selected-work#skills and go nowhere. Routing to { path: '/',
           hash } sends the visitor home first, then scrollBehavior takes it
           from there. -->
      <nav class="links">
        <RouterLink
          v-for="link in links"
          :key="link.hash"
          :to="{ path: '/', hash: link.hash }"
          aria-current-value="false"
          @click="onHashClick($event, link.hash)"
        >
          {{ link.label }}
        </RouterLink>
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
        <RouterLink
          class="btn talk"
          :to="{ path: '/', hash: '#contact' }"
          aria-current-value="false"
          @click="onHashClick($event, '#contact')"
        >
          Let's talk
        </RouterLink>

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
        <RouterLink
          v-for="(link, i) in links"
          :key="link.hash"
          :to="{ path: '/', hash: link.hash }"
          aria-current-value="false"
          :style="{ '--i': i }"
          @click="onHashClick($event, link.hash)"
        >
          <span class="idx">{{ String(i + 1).padStart(2, '0') }}</span>
          {{ link.label }}
        </RouterLink>
      </nav>
      <RouterLink
        class="btn solid talk-lg"
        :to="{ path: '/', hash: '#contact' }"
        aria-current-value="false"
        :style="{ '--i': links.length }"
        @click="onHashClick($event, '#contact')"
      >
        Let's talk →
      </RouterLink>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { scrollToHash } from '../router'
import { useTheme } from '../composables/useTheme'
import logo from '../assets/images/jzoa-logo.webp'

const { mode, toggleMode } = useTheme()
const route = useRoute()

/* Already home: RouterLink would resolve to the same route and do nothing, so
   scroll instead. Ctrl/⌘/middle-click are left alone — those open a new tab. */
const onBrandClick = (e) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
  if (route.path !== '/') return
  e.preventDefault()
  open.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
  // The hash outlives the scroll otherwise, and reloading would jump back down.
  if (window.location.hash) history.replaceState(null, '', window.location.pathname)
}

/* Closes the mobile panel, and covers the one case RouterLink will not: clicking
   the section you are already on is a duplicate navigation, which vue-router
   drops before scrollBehavior ever runs. Modified clicks are left alone so
   they still open a new tab. */
const onHashClick = (e, hash) => {
  open.value = false
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
  if (route.path === '/' && route.hash === hash) {
    e.preventDefault()
    scrollToHash(hash)
  }
}

const links = [
  { hash: '#skills', label: 'Skills' },
  { hash: '#work', label: 'Work' },
  { hash: '#experience', label: 'Experience' },
  { hash: '#stack', label: 'Stack' },
  // "Recommendations" everywhere — the section heading, the standalone page and
  // its <title> all use it, and a nav that says something else reads as a
  // different destination.
  { hash: '#recommendations', label: 'Recommendations' },
  { hash: '#contact', label: 'Contact' },
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
/* Rotating past the breakpoint leaves the panel hidden but still open.
   Created in onMounted rather than here: this setup block also runs during the
   static build, where there is no window to query. */
let mq = null
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
  mq = window.matchMedia('(min-width: 721px)')
  mq.addEventListener('change', onWide)
  onScroll()
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  mq?.removeEventListener('change', onWide)
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
  transition:
    border-color var(--dur) var(--ease),
    background var(--dur) var(--ease);
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
  height: 28px;
  width: auto;
  display: block;
  transition:
    filter var(--dur) var(--ease),
    opacity 0.2s var(--ease);
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

/* "Recommendations" is the longest label in the bar by some margin, and between
   the 720px burger breakpoint and roughly 920px the six links plus the logo and
   the actions cluster no longer clear the 1080px wrap's inner width. Tightening
   the horizontal padding buys back the ~40px needed; below 720px the links are
   gone entirely and this stops applying. */
@media (max-width: 920px) {
  .links a {
    padding-inline: 7px;
  }
  .bar {
    gap: 12px;
  }
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
  transition:
    transform 0.3s var(--ease),
    top 0.3s var(--ease);
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
  transition:
    opacity 0.28s var(--ease),
    visibility 0.28s var(--ease);
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
  transition:
    opacity 0.32s var(--ease),
    transform 0.32s var(--ease);
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
