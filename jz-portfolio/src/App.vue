<template>
  <DotGrid />
  <SiteHeader />
  <router-view />
</template>

<script setup>
import DotGrid from './components/DotGrid.vue'
import SiteHeader from './components/SiteHeader.vue'
</script>
