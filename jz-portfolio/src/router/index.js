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

// Landing on a new route mid-scroll is disorienting; hash links (the header's
// #skills, #contact …) still win when one is present.
export function scrollBehavior(to, from, saved) {
  if (to.hash) return { el: to.hash, behavior: 'smooth' }
  return saved || { top: 0 }
}
