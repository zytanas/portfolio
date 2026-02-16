<template>
  <footer class="px-6 py-12 border-t border-gray-500">
    <div class="container mx-auto">
      <div class="flex flex-col items-center justify-center">
        <img src="/src/assets/images/j-logo.png" alt="Logo" class="w-20 h-20 mb-4" />
        <p>&copy; {{ currentYear }} Julia Almoite. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'

const email = ref('')
const currentYear = computed(() => new Date().getFullYear())

const quickLinks = [
  { id: 'hero', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'projects', name: 'Projects' },
  { id: 'contact', name: 'Contact' }
]

const socials = [
  { name: 'GitHub', icon: '💻', url: 'https://github.com' },
  { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
  { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
  { name: 'Dribbble', icon: '🎨', url: 'https://dribbble.com' }
]

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    const navHeight = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - navHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

const handleNewsletter = () => {
  alert(`Thank you for subscribing with ${email.value}!`)
  email.value = ''
}
</script>