<template>
  <footer class="relative px-6 pt-12 pb-8 overflow-hidden footer-border">

    <div class="container relative z-10 mx-auto">

      <!-- ── MAIN FOOTER ROW ── -->
      <div class="grid gap-10 mb-10 md:grid-cols-3">

        <!-- Brand -->
        <div class="flex flex-col items-start gap-4">
          <img
            src="/src/assets/images/jz-circle.png"
            alt="Julia Zyrene Logo"
            class="object-contain w-auto h-20"
          />
          <p class="text-sm leading-relaxed text-white font-body ">
            UI/UX Designer & Frontend Developer crafting intentional digital experiences.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <div class="w-1.5 h-1.5 rounded-full bg-[#FF6668]"></div>
            <span class="footer-label">Quick Links</span>
          </div>
          <nav class="flex flex-col gap-2">
            <button
              v-for="link in quickLinks"
              :key="link.id"
              @click="scrollToSection(link.id)"
              class="text-left footer-link w-fit"
            >
              <span class="footer-link-arrow">→</span> {{ link.name }}
            </button>
          </nav>
        </div>

        <!-- Contact Snapshot -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <div class="w-1.5 h-1.5 rounded-full bg-[#FF6668]"></div>
            <span class="footer-label">Contact</span>
          </div>
          <div class="flex flex-col gap-3">
            <a href="mailto:juliazyrene23@gmail.com" class="flex items-center gap-2 footer-link">
              <Mail class="w-3.5 h-3.5 text-[#FF6668] flex-shrink-0" />
              juliazyrene23@gmail.com
            </a>
            <a href="tel:09565595721" class="flex items-center gap-2 footer-link">
              <Phone class="w-3.5 h-3.5 text-[#FF6668] flex-shrink-0" />
              09565595721
            </a>
            <p class="flex items-center gap-2 cursor-default footer-link hover:text-white/50">
              <MapPin class="w-3.5 h-3.5 text-[#FF6668] flex-shrink-0" />
              Baguio City, Philippines
            </p>
          </div>
          <!-- Socials -->
          <div class="flex gap-2 mt-1">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              target="_blank"
              :title="social.name"
              class="social-btn group"
            >
              <component :is="social.icon" class="w-3.5 h-3.5 text-white group-hover:text-white transition-colors duration-200" />
            </a>
          </div>
        </div>

      </div>

      <!-- ── DIVIDER ── -->
      <div class="h-px bg-[#FF6668]/15 mb-6"></div>

      <!-- ── BOTTOM ROW ── -->
      <div class="flex flex-col items-center justify-between gap-3 md:flex-row">
        <p class="font-mono text-xs text-white">
          &copy; {{ currentYear }} Julia Almoite. All rights reserved.
        </p>
        <p class="font-mono text-xs text-white">
          Designed & built with <span class="text-[#FF6668]/60">☕</span> in Baguio City
        </p>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Linkedin, Github, Mail, Phone, MapPin } from 'lucide-vue-next'

const currentYear = computed(() => new Date().getFullYear())

const quickLinks = [
  { id: 'hero', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'projects', name: 'Projects' },
  { id: 'contact', name: 'Contact' },
]

const socials = [
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/almoitejuliazyrene/' },
  { name: 'GitHub', icon: Github, url: 'https://github.com/zytanas' },
]

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    const navHeight = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - navHeight
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.footer-border {
  border-top: 1px solid rgba(255, 102, 104, 0.18);
}

.footer-label {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgb(250, 250, 250);
}

.footer-link {
  font-size: 13px;
  color: rgb(255, 255, 255);
  font-family: inherit;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: color 0.2s ease;
  text-decoration: none;
}

.footer-link:hover {
  color: #FF6668;
}

.footer-link-arrow {
  color: #FF6668;
  opacity: 0;
  margin-right: 2px;
  display: inline-block;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.footer-link:hover .footer-link-arrow {
  opacity: 1;
  transform: translateX(2px);
}

.social-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 102, 104, 0.08);
  border: 1px solid rgba(255, 102, 104, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  text-decoration: none;
}

.social-btn:hover {
  background: #FF6668;
  border-color: #FF6668;
  transform: translateY(-2px);
}
</style>