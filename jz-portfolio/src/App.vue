<template>
  <div class="min-h-screen bg-gradient-dark">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>

<style scoped>
</style>