<template>
  <nav class="fixed top-0 left-0 right-0 z-50 py-3 ">
    <div class="max-w-4xl px-4 mx-auto">
      <div :class="['bg-[#A6A6A6]/20 backdrop-blur-md px-4 md:px-12 py-3 shadow-lg transition-all duration-300', mobileMenuOpen ? 'rounded-3xl' : 'rounded-full']">
        <!-- Desktop Navigation -->
        <div class="items-center justify-center hidden gap-24 md:flex">
          <!-- Left Navigation -->
          <div class="flex items-center gap-12">
            <a 
              href="#home" 
              @click.prevent="scrollToSection('hero')"
              :class="['transition-colors', activeSection === 'hero' ? 'text-red-400 ' : 'text-white hover:text-red-400']"
            >
              Home
            </a>
            <a 
              href="#about" 
              @click.prevent="scrollToSection('about')"
              :class="['transition-colors', activeSection === 'about' ? 'text-red-400' : 'text-white hover:text-red-400']"
            >
              About
            </a>
          </div>

          <!-- Center Logo -->
          <div class="flex-shrink-0">
            <a href="#" @click.prevent="scrollToSection('hero')" class="block">
              <img src="/src/assets/images/jz-circle.png" alt="Logo" class="w-auto h-12" />
            </a>
          </div>

          <!-- Right Navigation -->
          <div class="flex items-center gap-12">
            <a 
              href="#projects" 
              @click.prevent="scrollToSection('projects')"
              :class="['transition-colors', activeSection === 'projects' ? 'text-red-400 ' : 'text-white hover:text-red-400']"
            >
              Projects
            </a>
            <a 
              href="#contact" 
              @click.prevent="scrollToSection('contact')"
              :class="['transition-colors', activeSection === 'contact' ? 'text-red-400 ' : 'text-white hover:text-red-400']"
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
              <img src="/src/assets/images/jz-circle.png" alt="Logo" class="w-auto h-10" />
            </a>

            <!-- Hamburger Button -->
            <button 
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="p-2 text-white transition-colors hover:text-red-400"
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
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform -translate-y-4 opacity-0"
            enter-to-class="transform translate-y-0 opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="transform translate-y-0 opacity-100"
            leave-to-class="transform -translate-y-4 opacity-0"
          >
            <div v-if="mobileMenuOpen" class="pt-6 mt-6 border-t border-white/10">
              <div class="flex flex-col items-start gap-2 pb-2">
                <a 
                  href="#home" 
                  @click.prevent="scrollToSection('hero'); mobileMenuOpen = false"
                  class="relative w-full px-6 py-4 overflow-hidden transition-all duration-300 group rounded-xl hover:scale-105"
                >
                  <div :class="['absolute inset-0 transition-all duration-300 bg-gradient-to-r', activeSection === 'hero' ? 'from-red-500/30 to-blue-600/30' : 'from-red-500/0 to-blue-600/0 group-hover:from-red-500/20 group-hover:to-blue-600/20']"></div>
                  <span :class="['relative text-lg font-semibold transition-colors', activeSection === 'hero' ? 'text-red-400' : 'text-white group-hover:text-red-400']">Home</span>
                </a>
                <a 
                  href="#about" 
                  @click.prevent="scrollToSection('about'); mobileMenuOpen = false"
                  class="relative w-full px-6 py-4 overflow-hidden transition-all duration-300 group rounded-xl hover:scale-105"
                >
                  <div :class="['absolute inset-0 transition-all duration-300 bg-gradient-to-r', activeSection === 'about' ? 'from-red-500/30 to-blue-600/30' : 'from-red-500/0 to-blue-600/0 group-hover:from-red-500/20 group-hover:to-blue-600/20']"></div>
                  <span :class="['relative text-lg font-semibold transition-colors', activeSection === 'about' ? 'text-red-400' : 'text-white group-hover:text-red-400']">About</span>
                </a>
                <a 
                  href="#projects" 
                  @click.prevent="scrollToSection('projects'); mobileMenuOpen = false"
                  class="relative w-full px-6 py-4 overflow-hidden transition-all duration-300 group rounded-xl hover:scale-105"
                >
                  <div :class="['absolute inset-0 transition-all duration-300 bg-gradient-to-r', activeSection === 'projects' ? 'from-red-500/30 to-blue-600/30' : 'from-red-500/0 to-blue-600/0 group-hover:from-red-500/20 group-hover:to-blue-600/20']"></div>
                  <span :class="['relative text-lg font-semibold transition-colors', activeSection === 'projects' ? 'text-red-400' : 'text-white group-hover:text-red-400']">Projects</span>
                </a>
                <a 
                  href="#contact" 
                  @click.prevent="scrollToSection('contact'); mobileMenuOpen = false"
                  class="relative w-full px-6 py-4 overflow-hidden transition-all duration-300 group rounded-xl hover:scale-105"
                >
                  <div :class="['absolute inset-0 transition-all duration-300 bg-gradient-to-r', activeSection === 'contact' ? 'from-red-500/30 to-blue-600/30' : 'from-red-500/0 to-blue-600/0 group-hover:from-red-500/20 group-hover:to-blue-600/20']"></div>
                  <span :class="['relative text-lg font-semibold transition-colors', activeSection === 'contact' ? 'text-red-400' : 'text-white group-hover:text-red-400']">Contact</span>
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
import { ref, onMounted, onUnmounted } from 'vue'

const mobileMenuOpen = ref(false)
const activeSection = ref('hero')

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

const updateActiveSection = () => {
  const sections = ['hero', 'about', 'projects', 'contact']
  const scrollPosition = window.scrollY + 150 // Offset for better detection

  for (const sectionId of sections) {
    const element = document.getElementById(sectionId)
    if (element) {
      const { offsetTop, offsetHeight } = element
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = sectionId
        break
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateActiveSection)
  updateActiveSection() // Set initial active section
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
})
</script>

<style scoped>
/* Smooth transitions for mobile menu */
</style>