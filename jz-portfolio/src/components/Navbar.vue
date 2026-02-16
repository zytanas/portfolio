<template>
  <nav class="fixed top-0 left-0 right-0 z-50 py-3 bg-dark-bg/20 backdrop-blur-md">
    <div class="max-w-4xl mx-auto px-4">
      <div class="bg-[#A6A6A6]/20 rounded-full px-4 md:px-12 py-3 shadow-lg">
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center justify-center gap-24">
          <!-- Left Navigation -->
          <div class="flex items-center gap-12">
            <a 
              href="#home" 
              @click.prevent="scrollToSection('hero')"
              class="text-white hover:text-purple-400 transition-colors"
            >
              Home
            </a>
            <a 
              href="#about" 
              @click.prevent="scrollToSection('about')"
              class="text-white hover:text-purple-400 transition-colors"
            >
              About
            </a>
          </div>

          <!-- Center Logo -->
          <div class="flex-shrink-0">
            <a href="#" @click.prevent="scrollToSection('hero')" class="block">
              <img src="/src/assets/images/j-logo.png" alt="Logo" class="h-12 w-auto" />
            </a>
          </div>

          <!-- Right Navigation -->
          <div class="flex items-center gap-12">
            <a 
              href="#projects" 
              @click.prevent="scrollToSection('projects')"
              class="text-white hover:text-purple-400 transition-colors"
            >
              Projects
            </a>
            <a 
              href="#contact" 
              @click.prevent="scrollToSection('contact')"
              class="text-white hover:text-purple-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="md:hidden">
          <div class="flex items-center justify-between">
            <!-- Mobile Logo -->
            <a href="#" @click.prevent="scrollToSection('hero')" class="block">
              <img src="/src/assets/images/j-logo.png" alt="Logo" class="h-10 w-auto" />
            </a>

            <!-- Hamburger Button -->
            <button 
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="text-white p-2 hover:text-purple-400 transition-colors"
              aria-label="Toggle menu"
            >
              <svg 
                class="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  v-if="!mobileMenuOpen"
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path 
                  v-else
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Mobile Menu Dropdown -->
          <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 transform scale-95"
            enter-to-class="opacity-100 transform scale-100"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 transform scale-100"
            leave-to-class="opacity-0 transform scale-95"
          >
            <div v-if="mobileMenuOpen" class="mt-4 pt-4 border-t border-white/20">
              <div class="flex flex-col items-center gap-4">
                <a 
                  href="#home" 
                  @click.prevent="scrollToSection('hero'); mobileMenuOpen = false"
                  class="text-white hover:text-purple-400 transition-colors w-full text-center py-2"
                >
                  Home
                </a>
                <a 
                  href="#about" 
                  @click.prevent="scrollToSection('about'); mobileMenuOpen = false"
                  class="text-white hover:text-purple-400 transition-colors w-full text-center py-2"
                >
                  About
                </a>
                <a 
                  href="#projects" 
                  @click.prevent="scrollToSection('projects'); mobileMenuOpen = false"
                  class="text-white hover:text-purple-400 transition-colors w-full text-center py-2"
                >
                  Projects
                </a>
                <a 
                  href="#contact" 
                  @click.prevent="scrollToSection('contact'); mobileMenuOpen = false"
                  class="text-white hover:text-purple-400 transition-colors w-full text-center py-2"
                >
                  Contact
                </a>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    const navHeight = 100 // Height of the fixed navbar
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - navHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}
</script>

<style scoped>
/* Smooth transitions for mobile menu */
</style>