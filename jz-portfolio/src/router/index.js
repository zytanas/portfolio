import HomeView from '../views/HomeView.vue'

/* Routes, not a router. vite-ssg builds the router itself — once per route
   during the static build and once again in the browser — so exporting a
   pre-constructed singleton would share one history and one set of resolved
   components across every prerendered page. */
export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/selected-work',
    name: 'selected-work',
    component: () => import('../views/SelectedWorkView.vue'),
  },
  {
    path: '/recommendation',
    name: 'recommendations',
    component: () => import('../views/RecommendationsView.vue'),
  },
]

/* The header is fixed at 58px tall, so a section scrolled to its exact top sits
   underneath it. 58 + a little breathing room. */
export const HEADER_OFFSET = 72

/* Coming from an inner route (/selected-work → /#skills) the target section
   does not exist yet when scrollBehavior runs — the home view has been resolved
   but not painted. Poll a few frames for it rather than scrolling to nothing.
   ~500ms is long enough for a render and short enough that a genuinely missing
   id fails fast. */
const waitForEl = (hash) =>
  new Promise((resolve) => {
    const deadline = performance.now() + 500
    const look = () => {
      const el = document.querySelector(hash)
      if (el) return resolve(el)
      if (performance.now() > deadline) return resolve(null)
      requestAnimationFrame(look)
    }
    look()
  })

// Landing on a new route mid-scroll is disorienting; hash links (the header's
// #skills, #contact …) still win when one is present.
export async function scrollBehavior(to, from, saved) {
  if (to.hash) {
    // A malformed hash would throw out of querySelector and break navigation.
    let el = null
    try {
      el = await waitForEl(to.hash)
    } catch {
      el = null
    }
    if (el) return { el, top: HEADER_OFFSET, behavior: 'smooth' }
    return { top: 0 }
  }
  return saved || { top: 0 }
}

/* vue-router treats a click on the link you are already on as a duplicate
   navigation and skips scrollBehavior entirely, so a second click on the
   current section would do nothing. Used by the header for that case. */
export function scrollToHash(hash) {
  const el = hash && document.querySelector(hash)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  window.scrollTo({ top, behavior: 'smooth' })
}
