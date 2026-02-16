<template>
  <div class="relative min-h-screen bg-gradient-dark">
    <!-- Background Image Overlay -->
    <div class="fixed inset-0 z-0 opacity-10">
      <img
        src="/src/assets/images/bg.png"
        alt="Background Pattern"
        class="object-cover w-full h-full"
      />
    </div>

    <!-- Content -->
    <div class="relative z-10">
      <Navbar />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style scoped></style>
