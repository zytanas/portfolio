/**
 * REVEAL ENGINE — behaviour
 *
 * One IntersectionObserver for the whole document. It adds `.is-revealed` when
 * an element enters the viewport and *removes* it again when the element
 * leaves, so the animation re-triggers every time that element is scrolled
 * back into view rather than playing once and freezing. `data-reveal-once`
 * opts a single element out of that; `setRetrigger(false)` opts the whole page
 * out at runtime.
 *
 * Markup contract:
 *   data-reveal="up|down|left|right|scale|clip"  the element itself animates
 *   data-reveal-once                             play once, then stop watching
 *   data-reveal-stagger[="<wrap>"]               children animate in sequence
 *
 * A stagger container is not animated itself. Its direct children are: each one
 * is given `data-reveal="up"` if it does not already declare a variant, plus a
 * `--reveal-i` index the stylesheet turns into an animation-delay. Children are
 * observed individually, so a row already on screen plays on load while the
 * rest wait for the scroll. The index wraps (default every 8 items, or the
 * attribute's value — pass the column count for a grid) so the delay never
 * grows past a single row's worth however long the list is.
 *
 * Fails open twice over: without IntersectionObserver everything is revealed
 * immediately, and prefers-reduced-motion is handled in the stylesheet, so no
 * motion check is needed here.
 *
 * SSR-safe: every entry point returns early when there is no document, which is
 * what vite-ssg's build pass sees.
 */

const DEFAULT_VARIANT = 'up'
const DEFAULT_STAGGER_WRAP = 8

// Matches the old v-reveal thresholds: a sliver of the element is enough, and
// the negative bottom margin holds the reveal until it is properly on screen
// rather than firing against the very edge of the fold.
const OBSERVER_OPTIONS = { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }

let observer = null
let scope = null
let retrigger = true

function canObserve() {
  return typeof IntersectionObserver !== 'undefined'
}

function isOnce(el) {
  return !retrigger || el.hasAttribute('data-reveal-once')
}

/* Two marks for one state, deliberately. `.is-revealed` is the class the
   stylesheet's contract is written around, but Vue's patchClass assigns
   `el.className` wholesale, so it drops any class added from outside the
   renderer as soon as a `:class` binding on that element changes — opening a
   project row would otherwise make the row itself vanish mid-animation. The
   `data-revealed` attribute is not part of any vnode, so the renderer never
   touches it, and that is what the CSS keys off. */
function mark(el, on) {
  el.classList[on ? 'add' : 'remove']('is-revealed')
  if (on) el.setAttribute('data-revealed', '')
  else el.removeAttribute('data-revealed')
}

function onIntersect(entries) {
  entries.forEach((entry) => {
    const el = entry.target
    if (entry.isIntersecting) {
      mark(el, true)
      // Nothing left to watch for: this element is never going to be hidden
      // again, so stop paying for it.
      if (isOnce(el)) observer.unobserve(el)
      return
    }
    // Off screen — reset it so the next entry replays the animation. Doing this
    // only on a real exit (not on a partial scroll) keeps it from flickering at
    // the fold, because the threshold has to be crossed in full first.
    if (!isOnce(el)) mark(el, false)
  })
}

/* Stamps the sequence index onto a container's children and gives any child
   without an explicit variant the default one, so `data-reveal-stagger` alone
   is enough to animate a list. */
function prepareStagger(container) {
  const wrap = Number(container.dataset.revealStagger) || DEFAULT_STAGGER_WRAP
  Array.from(container.children).forEach((child, i) => {
    if (!child.hasAttribute('data-reveal')) child.setAttribute('data-reveal', DEFAULT_VARIANT)
    child.style.setProperty('--reveal-i', String(i % wrap))
  })
}

function collect(root) {
  root.querySelectorAll('[data-reveal-stagger]').forEach(prepareStagger)
  // After prepareStagger, not before: it is what turns staggered children into
  // reveal targets in the first place.
  const targets = Array.from(root.querySelectorAll('[data-reveal]'))
  // querySelectorAll only looks downwards, so a root that is itself a target
  // would otherwise be skipped.
  if (root.nodeType === 1 && root.hasAttribute('data-reveal')) targets.unshift(root)
  return targets
}

function revealAll(targets) {
  targets.forEach((el) => mark(el, true))
}

/* Rebuilds the observation set from scratch. Disconnecting first is what keeps
   this idempotent and leak-free: re-observing an element that is already
   revealed and still on screen fires the callback with isIntersecting true and
   re-adds a class it already has, which is a no-op, while elements that
   disappeared with the last route are dropped instead of pinned in memory by
   the observer. */
function scan() {
  const targets = collect(scope)
  if (!canObserve()) {
    revealAll(targets)
    return
  }
  if (observer) observer.disconnect()
  else observer = new IntersectionObserver(onIntersect, OBSERVER_OPTIONS)
  targets.forEach((el) => observer.observe(el))
}

/**
 * Start the engine. Call once, on app mount.
 * @param {ParentNode} [root] subtree to scan; defaults to the whole document.
 */
export function init(root) {
  if (typeof document === 'undefined') return
  scope = root || document
  scan()
}

/**
 * Re-scan for elements that were not in the DOM at init — after a route change,
 * or after an async list has rendered. Safe to call as often as you like.
 */
export function refresh() {
  if (typeof document === 'undefined') return
  if (!scope) return init()
  scan()
}

/**
 * Turn re-triggering on or off for the whole page. With it off, every element
 * behaves as though it carried `data-reveal-once`.
 * @param {boolean} value
 */
export function setRetrigger(value) {
  retrigger = Boolean(value)
}

export const Reveal = { init, refresh, setRetrigger }
export default Reveal
