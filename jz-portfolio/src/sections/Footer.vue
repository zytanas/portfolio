<template>
  <footer class="bg-dark-card border-t border-gray-800 py-12 px-6">
    <div class="container mx-auto">
      <div class="grid md:grid-cols-3 gap-8 mb-8">
        <!-- Brand -->
        <div>
          <h3 class="text-2xl font-heading font-bold gradient-text mb-4">Julia</h3>
          <p class="text-gray-400 font-body text-sm leading-relaxed">
            Frontend Developer & UI/UX Designer passionate about creating 
            beautiful and functional web experiences.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-heading font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.name">
              <a 
                :href="`#${link.id}`"
                @click.prevent="scrollToSection(link.id)"
                class="text-gray-400 hover:text-orange-400 transition-colors text-sm font-body"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h4 class="text-lg font-heading font-semibold mb-4">Stay Updated</h4>
          <p class="text-gray-400 text-sm font-body mb-4">
            Subscribe to get the latest updates about my work.
          </p>
          <form @submit.prevent="handleNewsletter" class="flex gap-2">
            <input 
              type="email"
              v-model="email"
              placeholder="Your email"
              required
              class="flex-1 bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-orange-400 focus:outline-none"
            />
            <button 
              type="submit"
              class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-gray-500 text-sm font-body">
          © {{ currentYear }} Julia. All rights reserved.
        </p>
        
        <!-- Social Links -->
        <div class="flex gap-4">
          <a 
            v-for="social in socials" 
            :key="social.name"
            :href="social.url"
            target="_blank"
            class="text-gray-400 hover:text-orange-400 transition-colors"
            :title="social.name"
          >
            <span class="text-xl">{{ social.icon }}</span>
          </a>
        </div>
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