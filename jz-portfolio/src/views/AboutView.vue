<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue'

/* Still the scaffold placeholder. It is not prerendered (see ssgOptions in
   vite.config.js) and not linked from anywhere, but the route resolves, so a
   crawler that finds the URL some other way is told not to index it. Remove
   this — and the route — once the page is real or gone. */
useHead({
  title: 'About — Julia Almoite',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
