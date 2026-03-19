<template>
  <section id="projects" class="relative px-6 py-24 overflow-hidden perf-optimize">
    <!-- Floating Code Symbols -->
    <FloatingCodeSymbols />

    <div class="ambient-glow glow-tl" />
    <div class="ambient-glow glow-br" />

    <div class="container relative z-10 max-w-6xl mx-auto">
      <!-- ── SECTION HEADER ── -->
      <div class="flex items-end justify-between pb-8 mb-16 section-header-border">
        <div>
          <p class="section-eyebrow">// selected work</p>
          <h2 class="section-title font-heading">
            Work That<br /><span class="title-accent">Ships.</span>
          </h2>
          <p class="section-subtitle font-body">
            Client engagements &amp; personal builds — each one designed and developed by me, end to
            end.
          </p>
        </div>
        <div class="hidden text-right md:block">
          <div class="project-count-bg font-heading">0{{ allProjects.length }}</div>
          <p class="mt-1 font-mono text-xs tracking-widest uppercase count-label">total projects</p>
        </div>
      </div>

      <!-- CLIENT WORK SECTION -->
      <div class="mb-24">
        <ClientWorkSection :projects="allClientProjects" @open-modal="openModal" />
      </div>

      <!-- PERSONAL PROJECTS SECTION -->
      <div>
        <PersonalProjectsSection :projects="allPersonalProjects" @open-modal="openModal" />
      </div>
    </div>

    <!-- MODAL -->
    <ProjectModal :is-open="isModalOpen" :project="selectedProject" @close="closeModal" />
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import ClientWorkSection from '@/components/ClientWorkSection.vue'
import PersonalProjectsSection from '@/components/PersonalProjectsSection.vue'
import ProjectModal from '@/components/ProjectModal.vue'
import FloatingCodeSymbols from '@/components/FloatingCodeSymbols.vue'
import cozyImage from '@/assets/images/cozy.webp'
import vibeTeams from '@/assets/images/vibeteams.webp'
import synerpark from '@/assets/images/synerpark.webp'
import msb from '@/assets/images/msb.webp'
import prestige from '@/assets/images/prestige.webp'
import thirsty from '@/assets/images/thirsty.webp'
import coreproc from '@/assets/images/coreproc.webp'
import portfolio from '@/assets/images/portfolio.webp'

const isModalOpen = ref(false)
const selectedProject = ref(null)

const openModal = (project) => {
  selectedProject.value = project
  isModalOpen.value = true
}
const closeModal = () => {
  isModalOpen.value = false
  selectedProject.value = null
}

const allProjects = [
  {
    title: 'VibeTeams',
    image: vibeTeams,
    tag: 'Coreproc',
    desc: 'Team collaboration SaaS with analytics, reporting, and a dashboard-driven workflow.',
    role: 'UI/UX Designer & Frontend Developer',
    outcome:
      'Delivered a full SaaS dashboard from Figma to production, reducing design-to-dev handoff time by owning both ends.',
    contributions: [
      'Designed component system in Figma',
      'Built Vue 3 frontend with Tailwind',
      'Collaborated directly with backend team on API integration',
    ],
    techs: ['UI/UX', 'SaaS'],
    url: 'https://vibeteams.ai/',
    projectType: 'development',
    developedWith: 'Vue',
  },
  {
    title: 'SynerPark',
    image: synerpark,
    tag: 'Coreproc',
    desc: 'Smart parking payment platform with seamless mobile onboarding and QR-based flow.',
    role: 'Frontend Developer & UX Designer',
    outcome:
      'Streamlined the mobile onboarding to a 3-step QR flow, improving user activation on a tight deadline.',
    contributions: [
      'Designed mobile-first UX flows',
      'Built responsive Nuxt frontend',
      'Optimized for low-end Android devices',
    ],
    techs: ['Mobile'],
    url: 'https://synerpark.com/',
    projectType: 'development',
    developedWith: 'Nuxt',
  },
  {
    title: 'Prestige Paper Products',
    image: prestige,
    tag: 'Coreproc',
    desc: 'Brand identity and e-commerce site for a paper goods brand with editorial-style product showcases.',
    role: 'Frontend Developer',
    outcome:
      'Revamped an outdated e-commerce site into an editorial-style storefront that elevated brand perception.',
    contributions: [
      'Full frontend revamp in Vue',
      'Created editorial product layout system',
      'Worked with designer on component specs',
      'Implemented responsive product gallery',
    ],
    techs: ['Revamp', 'E-commerce'],
    projectType: 'development',
    developedWith: 'Vue',
  },
  {
    title: 'My Shopping Box',
    image: msb,
    tag: 'Coreproc',
    desc: 'E-commerce product showcase with editorial-style layout and brand-forward identity.',
    role: 'Frontend Developer',
    outcome:
      'Built a scalable product showcase that supports a growing SKU catalog with consistent brand presentation.',
    contributions: [
      'Developed Blade-based frontend templates',
      'Built reusable product card components',
      'Ensured cross-browser compatibility',
      'Optimized image loading performance',
    ],
    techs: ['E-commerce'],
    url: 'https://my-shoppingbox.com/ph',
    projectType: 'development',
    developedWith: 'Blade',
  },
  {
    title: 'Thirsty Oasis',
    image: thirsty,
    tag: 'Freelance',
    desc: 'Livestream platform for a mature audience with a sleek landing page and intuitive content discovery.',
    role: 'UI/UX Designer',
    outcome:
      'Designed a complete brand identity and landing page that balances bold visual appeal with clear content hierarchy.',
    contributions: [
      'Brand identity & visual language',
      'Landing page design in Figma',
      'Responsive layout specs for dev handoff',
    ],
    techs: ['Landing Page', 'Branding'],
    projectType: 'design',
  },
  {
    title: "Adrian's Portfolio",
    image: portfolio,
    tag: 'Personal',
    desc: 'Personal portfolio featuring curated design projects in a clean, interactive layout.',
    role: 'Designer & Developer',
    outcome:
      'A fully custom portfolio built without a template — designed and shipped solo to showcase design sensibility.',
    contributions: [
      'Designed in Figma from scratch',
      'Built with TSX & Tailwind',
      'Implemented scroll-based animations',
      'Deployed to Vercel',
    ],
    techs: ['Web', 'Personal'],
    url: 'https://lemonadezzz.vercel.app/',
    projectType: 'development',
    developedWith: 'TSX',
  },
  {
    title: 'Coreproc, Inc. Website',
    image: coreproc,
    tag: 'Personal',
    desc: 'Corporate website for a B2B SaaS company, showcasing products, values, and culture.',
    role: 'Designer',
    outcome:
      'Crafted a modern, approachable website that effectively communicates the brand’s value proposition and culture.',
    contributions: [
      'Designed full website in Figma',
      'Developed a cohesive visual language',
      'Provided specs for development handoff',
    ],
    techs: ['Web', 'Corporate'],
    projectType: 'design',
  },
  {
    title: 'Cozy Bean',
    image: cozyImage,
    tag: 'Personal',
    desc: 'A warm café brand & web experience featuring handcrafted menu design and a cozy product gallery.',
    role: 'Brand Designer & UI Designer',
    outcome:
      'Created a cohesive brand identity and web design system that communicates warmth and craft from first scroll.',
    contributions: [
      'Logo & brand identity design',
      'Menu layout & typography system',
      'Web UI design in Figma',
      'Product gallery visual direction',
    ],
    techs: ['Branding', 'Web'],
    projectType: 'design',
  },
]

const allClientProjects = computed(() =>
  allProjects.filter((p) => p.tag === 'Coreproc' || p.tag === 'Freelance'),
)
const allPersonalProjects = computed(() => allProjects.filter((p) => p.tag === 'Personal'))
</script>

<style scoped>
/* ── AMBIENT GLOWS ── */
.ambient-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(90px);
}
.glow-tl {
  width: 500px;
  height: 500px;
  top: -80px;
  left: -80px;
  background: radial-gradient(circle, rgba(123, 92, 250, 0.08), transparent 70%);
}
.glow-br {
  width: 400px;
  height: 400px;
  bottom: 0;
  right: -60px;
  background: radial-gradient(circle, rgba(45, 212, 191, 0.05), transparent 70%);
}

/* ── SECTION HEADER ── */
.section-header-border {
  border-bottom: 1px solid rgba(123, 92, 250, 0.14);
}
.section-eyebrow {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #2dd4bf;
  margin-bottom: 10px;
}
.section-title {
  font-size: clamp(42px, 5vw, 72px);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: #f0edf8;
}
.title-accent {
  color: #7b5cfa;
  text-shadow: 0 0 40px rgba(123, 92, 250, 0.4);
}
.section-subtitle {
  font-size: 0.9rem;
  color: rgba(240, 237, 248, 0.45);
  margin-top: 0.75rem;
  max-width: 360px;
  line-height: 1.6;
}
.project-count-bg {
  font-size: 64px;
  font-weight: 800;
  line-height: 1;
  color: #7b5cfa;
  opacity: 0.18;
}
.count-label {
  color: rgba(240, 237, 248, 0.3);
}
</style>

