/**
 * v-reveal — adds the class `in` the first time an element scrolls into view,
 * then stops watching it. Pairs with the `.reveal` / `.reveal-hero` rules in
 * main.css; `prefers-reduced-motion` neutralises those, so nothing here needs
 * a motion check.
 *
 * Fails open: without IntersectionObserver the class is added immediately, so
 * content is never left invisible.
 *
 * NOTE: useIntersectionObserver() registers its observer inside onMounted(),
 * which needs an active component instance. Directive hooks run without one,
 * so the observation is wired up directly here — one shared observer for the
 * whole page rather than one per element.
 */
let observer = null

function getObserver() {
  if (observer) return observer
  if (typeof IntersectionObserver === 'undefined') return null
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('in')
        observer.unobserve(entry.target)
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
  )
  return observer
}

export const reveal = {
  mounted(el, binding) {
    // v-reveal.now — for content that starts in view (the hero), so it plays
    // on load instead of waiting for a scroll that may never happen.
    if (binding.modifiers.now) {
      requestAnimationFrame(() => el.classList.add('in'))
      return
    }
    const io = getObserver()
    if (!io) {
      el.classList.add('in')
      return
    }
    io.observe(el)
  },
  unmounted(el) {
    if (observer) observer.unobserve(el)
  },
}
