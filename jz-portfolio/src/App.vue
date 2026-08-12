<template>
  <Preloader />
  <DotGrid />
  <SiteHeader />
  <router-view />
</template>

<script setup>
import { nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import DotGrid from './components/DotGrid.vue'
import Preloader from './components/Preloader.vue'
import SiteHeader from './components/SiteHeader.vue'
import Reveal from './reveal'

/* The engine is started once, here, rather than per view — it keeps a single
   observer for the whole document. onMounted is also the SSR guard: it never
   runs during vite-ssg's build pass, so the prerendered HTML is untouched. */
onMounted(() => Reveal.init())

/* Every navigation swaps the whole <router-view> subtree, so the observer has
   to be pointed at the new elements. nextTick waits for the incoming view to
   render; the views that build their lists asynchronously call refresh() again
   themselves once their data is on the page. */
const route = useRoute()
watch(
  () => route.fullPath,
  () => nextTick(() => Reveal.refresh()),
)
</script>
