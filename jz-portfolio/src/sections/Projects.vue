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
          <div class="project-count-bg font-heading">0{{ featuredProjects.length + moreProjects.length }}</div>
          <p class="mt-1 font-mono text-xs tracking-widest uppercase count-label">total projects</p>
        </div>
      </div>

      <!-- ── FEATURED CARDS GRID ── -->
      <div class="projects-grid">
        <div
          v-for="(project, i) in featuredProjects"
          :key="project.title"
          class="project-card"
          @click="openModal(project)"
        >
          <!-- Image -->
          <div class="card-img-wrap">
            <img :src="project.image" :alt="project.title" class="card-img" />
            <div class="card-img-overlay" />
            <!-- Index badge -->
            <span class="card-index font-heading" aria-hidden="true">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
          </div>

          <!-- Body -->
          <div class="card-body">
            <div class="card-tags">
              <span :class="['tag', getTagClass(project.tag)]">{{ project.tag }}</span>
              <span v-for="tech in project.techs" :key="tech" class="tag tag-tech">{{ tech }}</span>
            </div>
            <h3 class="card-title font-heading">{{ project.title }}</h3>
            <p class="card-desc font-body">{{ project.desc }}</p>

            <!-- Footer -->
            <div class="card-footer">
              <div class="card-type-pill">
                <Code2 v-if="project.projectType !== 'design'" :size="11" />
                <Figma v-else :size="11" />
                <span>{{ project.projectType === 'design' ? 'Design' : project.developedWith }}</span>
              </div>
              <div class="card-arrow">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 13L13 3M13 3H6M13 3v7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── MORE WORK ── -->
      <div class="mt-20">
        <MoreWork :projects="moreProjects" @open-modal="openModal" />
      </div>
    </div>

    <!-- MODAL -->
    <ProjectModal :is-open="isModalOpen" :project="selectedProject" @close="closeModal" />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Figma, Code2 } from 'lucide-vue-next'
import ProjectModal from '@/components/ProjectModal.vue'
import MoreWork from '@/components/MoreWork.vue'
import FloatingCodeSymbols from '@/components/FloatingCodeSymbols.vue'
import vibeThumbnail from '@/assets/images/vibeteams-thumbnail.webp'
import cozyImage from '@/assets/images/cozy.webp'
import vibeTeams from '@/assets/images/vibeteams.webp'
import adrianThumbnail from '@/assets/images/adrian-thumbnail.webp'
import prestigeThumbnail from '@/assets/images/prestige-thumbnail.webp'
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

const getTagClass = (tag) => {
  if (tag === 'Coreproc') return 'tag-client'
  if (tag === 'Freelance') return 'tag-freelance'
  return 'tag-personal'
}

// ── 3 featured case studies (card grid) ──
const featuredProjects = [
  {
    title: 'VibeTeams',
    image: vibeThumbnail,
    modalImage: vibeTeams,
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
    title: "Adrian's Portfolio",
    image: adrianThumbnail,
    modalImage: portfolio,
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
    techs: ['Web', 'Portfolio'],
    url: 'https://lemonadezzz.vercel.app/',
    projectType: 'development',
    developedWith: 'TSX',
  },
  {
    title: 'Prestige Paper Products',
    image: prestigeThumbnail,
    modalImage: prestige,
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
]

// ── Remaining 5 projects (list rows in MoreWorkSection) ──
const moreProjects = [
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
    title: 'Coreproc, Inc. Website',
    image: coreproc,
    tag: 'Personal',
    desc: 'Corporate website for a B2B SaaS company, showcasing products, values, and culture.',
    role: 'Designer',
    outcome:
      "Crafted a modern, approachable website that effectively communicates the brand's value proposition and culture.",
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

/* ── GRID ── */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
@media (max-width: 900px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}

/* ── CARD ── */
.project-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(123, 92, 250, 0.12);
  background: rgba(255, 255, 255, 0.025);
  cursor: pointer;
  transition:
    transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}
.project-card:hover {
  transform: translateY(-7px);
  border-color: rgba(123, 92, 250, 0.38);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(123, 92, 250, 0.1);
}

/* ── IMAGE ── */
.card-img-wrap {
  position: relative;
  width: 100%;
  height: 190px;
  overflow: hidden;
  background: rgba(8, 8, 20, 0.6);
}
.card-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  filter: brightness(0.88) saturate(0.8);
  transition: transform 0.5s ease, filter 0.4s ease;
}
.project-card:hover .card-img {
  transform: scale(1.06);
  filter: brightness(1) saturate(1);
}
.card-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 35%, rgba(8, 8, 20, 0.82));
}
.card-index {
  position: absolute;
  top: 12px;
  left: 14px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: rgba(240, 237, 248, 0.75);
  background: rgba(8, 8, 20, 0.6);
  backdrop-filter: blur(6px);
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  z-index: 2;
  user-select: none;
}

/* ── CARD BODY ── */
.card-body {
  padding: 18px 20px 20px;
}
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}
.card-title {
  font-size: clamp(1rem, 2vw, 1.1rem);
  font-weight: 700;
  color: #f0edf8;
  line-height: 1.2;
  margin-bottom: 7px;
  transition: color 0.2s;
}
.project-card:hover .card-title {
  color: #c4b5fd;
}
.card-desc {
  font-size: 0.82rem;
  color: rgba(240, 237, 248, 0.42);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ── CARD FOOTER ── */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid rgba(123, 92, 250, 0.1);
}
.card-type-pill {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(123, 92, 250, 0.07);
  border: 1px solid rgba(123, 92, 250, 0.18);
  color: #a78bfa;
  transition: background 0.2s, border-color 0.2s;
}
.project-card:hover .card-type-pill {
  background: rgba(123, 92, 250, 0.14);
  border-color: rgba(123, 92, 250, 0.38);
}
.card-arrow {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid rgba(123, 92, 250, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(167, 139, 250, 0.45);
  transition: all 0.2s;
}
.project-card:hover .card-arrow {
  background: rgba(123, 92, 250, 0.12);
  border-color: rgba(123, 92, 250, 0.45);
  color: #a78bfa;
}

/* ── TAGS ── */
.tag {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 8.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 9px;
  border-radius: 999px;
}
.tag-client {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.22);
}
.tag-freelance {
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.22);
}
.tag-personal {
  background: rgba(245, 158, 11, 0.1);
  color: #fcd34d;
  border: 1px solid rgba(245, 158, 11, 0.22);
}
.tag-tech {
  background: rgba(255, 255, 255, 0.04);
  color: rgba(240, 237, 248, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.09);
}
</style>