import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  ],
  // Landing on a new route mid-scroll is disorienting; hash links (the header's
  // #skills, #contact …) still win when one is present.
  scrollBehavior(to, from, saved) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return saved || { top: 0 }
  },
})

export default router
