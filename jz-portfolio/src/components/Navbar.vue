<template>
  <nav class="fixed top-0 left-0 right-0 z-50 py-3">
    <div class="max-w-5xl px-4 mx-auto">
      <div class="px-4 py-3 nav-pill md:px-12">

        <!-- Desktop Navigation -->
        <div class="items-center justify-center hidden gap-24 md:flex">

          <!-- Left Navigation -->
          <div class="flex items-center gap-8">
            <a
              href="#home"
              @click.prevent="scrollToSection('hero')"
              :class="['nav-link font-heading', activeSection === 'hero' ? 'nav-link--active' : '']"
            >Home</a>
            <a
              href="#projects"
              @click.prevent="scrollToSection('projects')"
              :class="['nav-link font-heading', activeSection === 'projects' ? 'nav-link--active' : '']"
            >Work</a>
          </div>

          <!-- Center Logo -->
          <div class="flex-shrink-0">
            <a href="#" @click.prevent="scrollToSection('hero')" class="block">
              <img src="/src/assets/images/jz-circle.webp" alt="Logo" class="w-auto h-12" />
            </a>
          </div>

          <!-- Right Navigation -->
          <div class="flex items-center gap-8">
            <a
              href="#process"
              @click.prevent="scrollToSection('process')"
              :class="['nav-link font-heading', activeSection === 'process' ? 'nav-link--active' : '']"
            >Process</a>
            <a
              href="#about"
              @click.prevent="scrollToSection('about')"
              :class="['nav-link font-heading', activeSection === 'about' ? 'nav-link--active' : '']"
            >About</a>
            <a
              href="#contact"
              @click.prevent="scrollToSection('contact')"
              class="nav-cta font-heading"
            >Let's Talk →</a>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="md:hidden">
          <div class="flex items-center justify-between">
            <a href="#" @click.prevent="scrollToSection('hero')" class="nav-logo-wrap">
              <img src="/src/assets/images/jz-circle.webp" alt="Logo" class="w-auto h-12" />
            </a>
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="mobile-menu-btn"
              aria-label="Toggle menu"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Mobile Dropdown -->
          <div v-if="mobileMenuOpen" class="mobile-menu">
            <template v-for="item in navItems" :key="item.id">
              <a
                v-if="item.id !== 'contact'"
                :href="`#${item.id}`"
                @click.prevent="scrollToSection(item.id); mobileMenuOpen = false"
                :class="['mobile-nav-item font-heading', activeSection === item.id ? 'mobile-nav-item--active' : '']"
              >{{ item.label }}</a>
            </template>
            <!-- Contact as CTA -->
            <a
              href="#contact"
              @click.prevent="scrollToSection('contact'); mobileMenuOpen = false"
              class="mobile-nav-cta font-heading"
            >Let's Talk →</a>
          </div>
        </div>

      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const mobileMenuOpen = ref(false)
const activeSection = ref('hero')

const navItems = [
  { id: 'hero',     label: 'Home' },
  { id: 'projects', label: 'Work' },
  { id: 'process',  label: 'Process' },
  { id: 'about',    label: 'About' },
  { id: 'contact',  label: 'Contact' },
]

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 100
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }
}

const updateActiveSection = () => {
  const sections = ['hero', 'projects', 'process', 'about', 'contact']
  const scrollPosition = window.scrollY + 150
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
  updateActiveSection()
})
onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
})
</script>

<style scoped>
/* ── PILL CONTAINER ── */
.nav-pill {
  background: rgba(10, 10, 15, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(123, 92, 250, 0.14);
  border-radius: 1rem; /* rounded-2xl for mobile */
  box-shadow: 0 0 0 1px rgba(123, 92, 250, 0.06), 0 8px 32px rgba(0, 0, 0, 0.4);
  transition: border-color 0.3s;
}
.nav-pill:hover {
  border-color: rgba(123, 92, 250, 0.22);
}
@media (min-width: 768px) {
  .nav-pill {
    border-radius: 9999px; /* rounded-full for desktop */
  }
}

/* ── LOGO ── */
.nav-logo-wrap { text-decoration: none; }
.nav-logo-text {
  font-size: 1.25rem;
  font-weight: 800;
  color: #F0EDF8;
  letter-spacing: -0.04em;
}
.nav-logo-dot { color: #A78BFA; }

/* ── NAV LINKS ── */
.nav-link {
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgb(240, 237, 248);
  text-decoration: none;
  transition: color 0.2s;
  position: relative;
  padding-bottom: 2px;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 0; height: 1px;
  background: #A78BFA;
  transition: width 0.25s ease;
}
.nav-link:hover { color: #C4B5FD; }
.nav-link:hover::after { width: 100%; }
.nav-link--active {
  color: #A78BFA;
}
.nav-link--active::after { width: 100%; }

/* ── CTA BUTTON ── */
.nav-cta {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: #fff;
  text-decoration: none;
  padding: 0.45rem 1.1rem;
  background: #7B5CFA;
  border-radius: 9999px;
  border: 1px solid rgba(167, 139, 250, 0.3);
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
}
.nav-cta:hover {
  background: #A78BFA;
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(123, 92, 250, 0.35);
}

/* ── MOBILE BUTTON ── */
.mobile-menu-btn {
  color: rgb(240, 237, 248);
  background: transparent;
  border: none;
  padding: 0.25rem;
  transition: color 0.2s;
  cursor: pointer;
}
.mobile-menu-btn:hover { color: #A78BFA; }

/* ── MOBILE MENU ── */
.mobile-menu {
  padding-top: 1.25rem;
  margin-top: 1.25rem;
  border-top: 1px solid rgba(123, 92, 250, 0.12);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-bottom: 0.5rem;
}
.mobile-nav-item {
  display: block;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgb(240, 237, 248);
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}
.mobile-nav-item:hover {
  background: rgba(123, 92, 250, 0.1);
  color: #C4B5FD;
}
.mobile-nav-item--active {
  background: rgba(123, 92, 250, 0.12);
  color: #A78BFA;
}

/* ── MOBILE CTA ── */
.mobile-nav-cta {
  display: block;
  margin-top: 0.5rem;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #fff;
  text-decoration: none;
  background: #7B5CFA;
  border: 1px solid rgba(167, 139, 250, 0.3);
  text-align: center;
  transition: background 0.2s;
}
.mobile-nav-cta:hover { background: #A78BFA; }
</style>