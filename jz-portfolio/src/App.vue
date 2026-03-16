<template>
  <div class="relative min-h-screen ">

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
