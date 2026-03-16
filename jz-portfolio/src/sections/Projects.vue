<template>
  <section id="projects" class="relative px-6 py-24 overflow-hidden">

    <!-- Floating Code Symbols -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="code-symbol symbol-1">&lt;/&gt;</div>
      <div class="code-symbol symbol-2">{ }</div>
      <div class="code-symbol symbol-3">[ ]</div>
      <div class="code-symbol symbol-4">&lt;div&gt;</div>
      <div class="code-symbol symbol-5">( )</div>
      <div class="code-symbol symbol-6">===</div>
      <div class="code-symbol symbol-7">=&gt;</div>
      <div class="code-symbol symbol-8">&lt;/&gt;</div>
    </div>

    <div class="ambient-glow glow-tl" />
    <div class="ambient-glow glow-br" />

    <div class="container relative z-10 max-w-6xl mx-auto">

      <!-- ── SECTION HEADER ── -->
      <div class="flex items-end justify-between pb-8 mb-16 section-header-border">
        <div>
          <p class="section-eyebrow">// selected work</p>
          <h2 class="section-title font-heading">
            Featured<br /><span class="title-accent">Projects</span>
          </h2>
        </div>
        <div class="hidden text-right md:block">
          <div class="project-count-bg font-heading">0{{ allProjects.length }}</div>
          <p class="mt-1 font-mono text-xs tracking-widest uppercase count-label">total projects</p>
        </div>
      </div>

      <!-- ══════════════════════════════════════
           GROUP 1: CLIENT WORK
           Design: Numbered editorial list rows.
           Each row = index ghost + thumb + full info.
      ══════════════════════════════════════ -->
      <div class="mb-24">

        <div class="flex items-center gap-3 mb-10">
          <div class="group-dot dot-client"></div>
          <span class="group-label-text">Client Work · Coreproc, Inc. &amp; Freelance</span>
          <div class="flex-1 h-px group-line"></div>
        </div>

        <div class="client-list">
          <div
            v-for="(project, i) in displayedClientProjects"
            :key="project.title"
            @click="openModal(project)"
            class="cursor-pointer client-row group"
          >
            <!-- Ghost index number -->
            <span class="row-index font-heading" aria-hidden="true">
              {{ String(i + 1).padStart(2, '0') }}
            </span>

            <!-- Thumbnail -->
            <div class="row-thumb">
              <img :src="project.image" :alt="project.title" class="row-thumb-img" />
              <div class="row-thumb-overlay" />
            </div>

            <!-- Info -->
            <div class="row-info">
              <div class="flex items-center gap-2 mb-1.5">
                <span :class="['tag', getTagClass(project.tag)]">{{ project.tag }}</span>
                <span v-for="tech in project.techs" :key="tech" class="tag tag-tech">{{ tech }}</span>
              </div>
              <h3 class="row-title font-heading">{{ project.title }}</h3>
              <p class="row-desc">{{ project.desc }}</p>
            </div>

            <!-- Right: type + arrow -->
            <div class="row-right">
              <div class="row-type-pill">
                <Code2 v-if="project.projectType !== 'design'" :size="11" />
                <Figma v-else :size="11" />
                <span>{{ project.projectType === 'design' ? 'Design' : project.developedWith }}</span>
              </div>
              <div class="row-arrow">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 13L13 3M13 3H6M13 3v7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div v-if="allClientProjects.length > 3" class="flex justify-center mt-8">
          <button @click="showAllClient = !showAllClient" class="see-more-btn">
            {{ showAllClient ? 'See Less' : `+${allClientProjects.length - 3} More` }}
            <svg :class="['w-3 h-3 transition-transform duration-300', showAllClient && 'rotate-180']"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- ══════════════════════════════════════
           GROUP 2: PERSONAL PROJECTS
           Design: Numbered editorial list rows.
           Each row = index ghost + thumb + full info.
      ══════════════════════════════════════ -->
      <div>

        <div class="flex items-center gap-3 mb-10">
          <div class="group-dot dot-personal"></div>
          <span class="group-label-text label-personal">Personal Projects</span>
          <div class="flex-1 h-px group-line"></div>
        </div>

        <div class="personal-list">
          <div
            v-for="(project, i) in allPersonalProjects"
            :key="project.title"
            @click="openModal(project)"
            class="cursor-pointer personal-row group"
          >
            <!-- Ghost index number -->
            <span class="row-index font-heading" aria-hidden="true">
              {{ String(i + 1).padStart(2, '0') }}
            </span>

            <!-- Thumbnail -->
            <div class="row-thumb">
              <img :src="project.image" :alt="project.title" class="row-thumb-img" />
              <div class="row-thumb-overlay" />
            </div>

            <!-- Info -->
            <div class="row-info">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="tag tag-personal">Personal</span>
                <span v-for="tech in project.techs" :key="tech" class="tag tag-tech">{{ tech }}</span>
              </div>
              <h3 class="row-title font-heading">{{ project.title }}</h3>
              <p class="row-desc">{{ project.desc }}</p>
            </div>

            <!-- Right: type + arrow -->
            <div class="row-right">
              <div class="row-type-pill">
                <Code2 v-if="project.projectType !== 'design'" :size="11" />
                <Figma v-else :size="11" />
                <span>{{ project.projectType === 'design' ? 'Design' : project.developedWith }}</span>
              </div>
              <div class="row-arrow">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 13L13 3M13 3H6M13 3v7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- ── MODAL ── -->
    <Transition name="modal">
      <div
        v-if="isModalOpen"
        @click="closeModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md md:p-8"
      >
        <div
          @click.stop
          class="modal-panel relative w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden rounded-2xl"
        >
          <button @click="closeModal" class="absolute z-10 modal-close-btn top-4 right-4" title="Close">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <div class="modal-image-pane scrollbar-hidden overflow-y-auto md:w-[62%] flex-shrink-0">
            <img :src="selectedProject?.image" :alt="selectedProject?.title" class="block w-full h-auto" />
          </div>

          <div class="flex flex-col flex-1 gap-5 overflow-y-auto modal-info-pane p-7 md:p-8 scrollbar-hidden">
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 rounded-full bg-violet-400"></div>
              <span class="modal-eyebrow">// project details</span>
            </div>
            <h2 class="modal-title font-heading">{{ selectedProject?.title }}</h2>
            <div class="flex flex-wrap gap-2">
              <span :class="['tag', getTagClass(selectedProject?.tag)]">{{ selectedProject?.tag }}</span>
              <span v-for="tech in selectedProject?.techs" :key="tech" class="tag tag-tech">{{ tech }}</span>
            </div>
            <div class="modal-divider"></div>
            <p class="modal-desc font-body">{{ selectedProject?.desc }}</p>
            <div class="flex items-center justify-between pt-2 mt-auto">
              <div class="flex items-center gap-2">
                <Figma v-if="selectedProject?.projectType === 'design'" :size="15" class="modal-type-icon" />
                <Code2 v-else :size="15" class="modal-type-icon" />
                <span class="modal-eyebrow">
                  {{ selectedProject?.projectType === 'design' ? 'Designed in Figma' : `Developed with ${selectedProject?.developedWith}` }}
                </span>
              </div>
              <a v-if="selectedProject?.url" :href="selectedProject.url" target="_blank" rel="noopener noreferrer" class="visit-btn">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 13L13 3M13 3H6M13 3v7"/>
                </svg>
                Visit Site
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Figma, Code2 } from 'lucide-vue-next'
import cozyImage    from '@/assets/images/cozy.png'
import cryptoImage  from '@/assets/images/crypto.png'
import vibeTeams    from '@/assets/images/vibeteams.png'
import synerpark    from '@/assets/images/synerpark.png'
import msb          from '@/assets/images/msb.png'
import prestige     from '@/assets/images/prestige.png'
import thirsty      from '@/assets/images/thirsty.png'
import portfolio    from '@/assets/images/portfolio.png'

const isModalOpen     = ref(false)
const selectedProject = ref(null)
const showAllClient   = ref(false)

const openModal = (project) => {
  selectedProject.value = project
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}
const closeModal = () => {
  isModalOpen.value = false
  selectedProject.value = null
  document.body.style.overflow = ''
}

const getTagClass = (tag) => {
  if (tag === 'Coreproc')  return 'tag-client'
  if (tag === 'Freelance') return 'tag-freelance'
  return 'tag-personal'
}

const allProjects = [
  { title: 'VibeTeams', image: vibeTeams, tag: 'Coreproc',
    desc: 'Team collaboration SaaS with analytics, reporting, and a dashboard-driven workflow.',
    techs: ['UI/UX', 'SaaS'], url: 'https://vibeteams.ai/', projectType: 'development', developedWith: 'Vue' },
  { title: 'SynerPark', image: synerpark, tag: 'Coreproc',
    desc: 'Smart parking payment platform with seamless mobile onboarding and QR-based flow.',
    techs: ['Mobile'], url: 'https://synerpark.com/', projectType: 'development', developedWith: 'Nuxt' },
  { title: 'Prestige Paper Products', image: prestige, tag: 'Coreproc',
    desc: 'Brand identity and e-commerce site for a paper goods brand with editorial-style product showcases.',
    techs: ['Revamp', 'E-commerce'], projectType: 'development', developedWith: 'Vue' },
  { title: 'My Shopping Box', image: msb, tag: 'Coreproc',
    desc: 'E-commerce product showcase with editorial-style layout and brand-forward identity.',
    techs: ['E-commerce'], url: 'https://my-shoppingbox.com/ph', projectType: 'development', developedWith: 'Blade' },
  { title: 'Thirsty Oasis', image: thirsty, tag: 'Freelance',
    desc: 'Livestream platform for a mature audience with a sleek landing page and intuitive content discovery.',
    techs: ['Landing Page', 'Branding'], projectType: 'design' },
  { title: "Adrian's Portfolio", image: portfolio, tag: 'Personal',
    desc: 'Personal portfolio featuring curated design projects in a clean, interactive layout.',
    techs: ['Web', 'Personal'], url: 'https://lemonadezzz.vercel.app/', projectType: 'development', developedWith: 'TSX' },
  { title: 'Cozy Bean', image: cozyImage, tag: 'Personal',
    desc: 'A warm café brand & web experience featuring handcrafted menu design and a cozy product gallery.',
    techs: ['Branding', 'Web'], projectType: 'design' },
  { title: 'Crypto', image: cryptoImage, tag: 'Personal',
    desc: 'Empowering digital currency journeys — bridging traditional finance with the crypto world.',
    techs: ['Fintech', 'Landing'], projectType: 'design' },
]

const allClientProjects   = computed(() => allProjects.filter(p => p.tag === 'Coreproc' || p.tag === 'Freelance'))
const displayedClientProjects = computed(() => showAllClient.value ? allClientProjects.value : allClientProjects.value.slice(0, 3))
const allPersonalProjects = computed(() => allProjects.filter(p => p.tag === 'Personal'))
</script>

<style scoped>
/* ── SCROLLBAR ── */
.scrollbar-hidden { scrollbar-width: none; -ms-overflow-style: none; }
.scrollbar-hidden::-webkit-scrollbar { display: none; }

/* ── AMBIENT GLOWS ── */
.ambient-glow { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(90px); }
.glow-tl { width: 500px; height: 500px; top: -80px; left: -80px;
  background: radial-gradient(circle, rgba(123,92,250,0.08), transparent 70%); }
.glow-br { width: 400px; height: 400px; bottom: 0; right: -60px;
  background: radial-gradient(circle, rgba(45,212,191,0.05), transparent 70%); }

/* ── SECTION HEADER ── */
.section-header-border { border-bottom: 1px solid rgba(123,92,250,0.14); }
.section-eyebrow {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
  color: #2DD4BF; margin-bottom: 10px;
}
.section-title {
  font-size: clamp(42px, 5vw, 72px); font-weight: 800;
  line-height: 0.95; letter-spacing: -0.02em; color: #F0EDF8;
}
.title-accent { color: #7B5CFA; text-shadow: 0 0 40px rgba(123,92,250,0.4); }
.project-count-bg { font-size: 64px; font-weight: 800; line-height: 1; color: #7B5CFA; opacity: 0.18; }
.count-label { color: rgba(240,237,248,0.3); }

/* ── GROUP LABELS ── */
.group-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.dot-client   { background: #7B5CFA; box-shadow: 0 0 6px rgba(123,92,250,0.6); }
.dot-personal { background: #F59E0B; box-shadow: 0 0 6px rgba(245,158,11,0.5); }
.group-label-text {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase;
  color: #A78BFA; white-space: nowrap;
}
.label-personal { color: #FCD34D; }
.group-line { background: rgba(123,92,250,0.12); }

/* ══════════════════════════════════════
   CLIENT WORK — EDITORIAL LIST ROWS
══════════════════════════════════════ */
.client-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: 1px solid rgba(123,92,250,0.1);
}

.client-row {
  position: relative;
  display: grid;
  grid-template-columns: 56px 120px 1fr auto;
  align-items: center;
  gap: 1.5rem;
  padding: 1.4rem 0;
  border-bottom: 1px solid rgba(123,92,250,0.1);
  transition: background 0.25s;
  overflow: hidden;
}

/* Full-row hover bg sweep */
.client-row::before {
  content: '';
  position: absolute; inset: 0;
  background: rgba(123,92,250,0.05);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
}
.client-row:hover::before { transform: scaleX(1); }

/* Ghost index number */
.row-index {
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1;
  color: rgba(123,92,250,0.12);
  letter-spacing: -0.04em;
  transition: color 0.25s;
  user-select: none;
  flex-shrink: 0;
}
.client-row:hover .row-index { color: rgba(123,92,250,0.35); }

/* Thumbnail */
.row-thumb {
  position: relative;
  width: 120px;
  height: 72px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid rgba(123,92,250,0.12);
}
.row-thumb-img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.45s ease;
}
.client-row:hover .row-thumb-img { transform: scale(1.08); }
.row-thumb-overlay {
  position: absolute; inset: 0;
  background: rgba(8,8,20,0.2);
  transition: opacity 0.25s;
}
.client-row:hover .row-thumb-overlay { opacity: 0; }

/* Info block */
.row-info { flex: 1; min-width: 0; }
.row-title {
  font-size: clamp(1rem, 2vw, 1.1rem);
  font-weight: 700;
  color: #F0EDF8;
  line-height: 1.15;
  margin-bottom: 0.3rem;
  margin-top: 0.35rem;
  transition: color 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.client-row:hover .row-title { color: #C4B5FD; }
.row-desc {
  font-size: clamp(0.85rem, 1.5vw, 0.9rem);
  color: rgb(240, 237, 248);
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Right side: type pill + arrow */
.row-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.row-type-pill {
  display: flex; align-items: center; gap: 0.3rem;
  padding: 0.22rem 0.65rem; border-radius: 999px;
  background: rgba(123,92,250,0.08);
  border: 1px solid rgba(123,92,250,0.18);
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase;
  color: #A78BFA;
  transition: background 0.2s, border-color 0.2s;
}
.client-row:hover .row-type-pill {
  background: rgba(123,92,250,0.15);
  border-color: rgba(123,92,250,0.35);
}

.row-arrow {
  width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid rgba(123,92,250,0.15);
  border-radius: 6px;
  color: rgba(167,139,250,0.4);
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.25s, transform 0.25s, color 0.2s, border-color 0.2s;
}
.client-row:hover .row-arrow {
  opacity: 1;
  transform: translateX(0);
  color: #A78BFA;
  border-color: rgba(123,92,250,0.4);
}

/* Mobile: stack rows */
@media (max-width: 640px) {
  .client-row {
    grid-template-columns: 36px 80px 1fr;
    gap: 0.75rem;
  }
  .row-index { font-size: 1.5rem; }
  .row-thumb { width: 80px; height: 52px; }
  .row-right { display: none; }
}

/* ══════════════════════════════════════
   PERSONAL PROJECTS — EDITORIAL LIST ROWS
   Same layout as client work, but with amber accents.
══════════════════════════════════════ */
.personal-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: 1px solid rgba(245,158,11,0.1);
}

.personal-row {
  position: relative;
  display: grid;
  grid-template-columns: 56px 120px 1fr auto;
  align-items: center;
  gap: 1.5rem;
  padding: 1.4rem 0;
  border-bottom: 1px solid rgba(245,158,11,0.1);
  transition: background 0.25s;
  overflow: hidden;
}

/* Full-row hover bg sweep with amber tint */
.personal-row::before {
  content: '';
  position: absolute; inset: 0;
  background: rgba(245,158,11,0.05);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
}
.personal-row:hover::before { transform: scaleX(1); }

/* Personal rows share same styling but with amber accents */
.personal-row .row-index {
  color: rgba(245,158,11,0.12);
}
.personal-row:hover .row-index { color: rgba(245,158,11,0.35); }

.personal-row .row-thumb {
  border: 1px solid rgba(245,158,11,0.12);
}

.personal-row:hover .row-title { color: #FDE68A; }

.personal-row .row-type-pill {
  background: rgba(245,158,11,0.08);
  border: 1px solid rgba(245,158,11,0.18);
  color: #FCD34D;
}
.personal-row:hover .row-type-pill {
  background: rgba(245,158,11,0.15);
  border-color: rgba(245,158,11,0.35);
}

.personal-row .row-arrow {
  border: 1px solid rgba(245,158,11,0.15);
  color: rgba(252,211,77,0.4);
}
.personal-row:hover .row-arrow {
  color: #FCD34D;
  border-color: rgba(245,158,11,0.4);
}

/* Mobile: stack rows */
@media (max-width: 640px) {
  .personal-row {
    grid-template-columns: 36px 80px 1fr;
    gap: 0.75rem;
  }
}

/* ── TAGS ── */
.tag {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 9px; letter-spacing: 0.07em; text-transform: uppercase;
  padding: 2px 8px; border-radius: 999px;
}
.tag-client    { background: rgba(34,197,94,0.12);   color: #22c55e;  border: 1px solid rgba(34,197,94,0.25); }
.tag-freelance { background: rgba(59,130,246,0.12);  color: #60a5fa;  border: 1px solid rgba(59,130,246,0.25); }
.tag-personal  { background: rgba(245,158,11,0.12);  color: #FCD34D;  border: 1px solid rgba(245,158,11,0.25); }
.tag-tech      { background: rgba(255,255,255,0.04); color: rgba(240,237,248,0.5); border: 1px solid rgba(255,255,255,0.1); }

/* ── SEE MORE ── */
.see-more-btn {
  display: flex; align-items: center; gap: 5px;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
  color: #A78BFA; background: rgba(123,92,250,0.07);
  border: 1px solid rgba(123,92,250,0.25); border-radius: 999px;
  padding: 6px 16px; cursor: pointer; transition: background 0.2s, border-color 0.2s;
}
.see-more-btn:hover { background: rgba(123,92,250,0.15); border-color: rgba(123,92,250,0.5); }

/* ── MODAL ── */
.modal-enter-active, .modal-leave-active { transition: opacity 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }

.modal-panel {
  background: #0D0D1A;
  border: 1px solid rgba(123,92,250,0.22);
  box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(123,92,250,0.08);
}
.modal-image-pane { background: #080812; border-right: 1px solid rgba(123,92,250,0.1); max-height: 90vh; }
.modal-info-pane  { background: #0D0D1A; min-width: 260px; }

.modal-close-btn {
  width: 32px; height: 32px; border-radius: 8px;
  background: rgba(123,92,250,0.18); border: 1px solid rgba(123,92,250,0.3);
  display: flex; align-items: center; justify-content: center;
  color: rgba(240,237,248,0.7); transition: background 0.2s, border-color 0.2s;
}
.modal-close-btn:hover { background: #7B5CFA; border-color: #7B5CFA; color: #fff; }

.modal-eyebrow {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #2DD4BF;
}
.modal-title { font-size: clamp(24px, 3vw, 36px); font-weight: 800; line-height: 1.05; color: #F0EDF8; }
.modal-divider { height: 1px; background: rgba(123,92,250,0.12); }
.modal-desc { font-size: 14px; font-weight: 300; color: rgba(240,237,248,0.8); line-height: 1.7; }
.modal-type-icon { color: #7B5CFA; opacity: 0.7; }

.visit-btn {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
  color: #A78BFA; background: rgba(123,92,250,0.1);
  border: 1px solid rgba(123,92,250,0.3); border-radius: 999px;
  padding: 6px 14px; text-decoration: none;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}
.visit-btn:hover { background: #7B5CFA; border-color: #7B5CFA; color: #fff; }

/* ── FLOATING CODE SYMBOLS ── */
.code-symbol {
  position: absolute;
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #ffffff;
  opacity: 0.08;
  pointer-events: none;
}

.symbol-1 { font-size: 3rem; top: 15%; left: 10%; animation: floatCode 8s ease-in-out infinite; }
.symbol-2 { font-size: 2.5rem; top: 25%; right: 15%; animation: floatCode 7s ease-in-out infinite; animation-delay: -2s; }
.symbol-3 { font-size: 2rem; top: 45%; left: 20%; animation: floatCode 9s ease-in-out infinite; animation-delay: -4s; }
.symbol-4 { font-size: 2.8rem; bottom: 30%; right: 25%; animation: floatCode 6.5s ease-in-out infinite; animation-delay: -1s; }
.symbol-5 { font-size: 2.2rem; top: 60%; left: 8%; animation: floatCode 7.5s ease-in-out infinite; animation-delay: -5s; }
.symbol-6 { font-size: 2rem; bottom: 20%; left: 30%; animation: floatCode 8.5s ease-in-out infinite; animation-delay: -3s; }
.symbol-7 { font-size: 2.5rem; top: 35%; right: 8%; animation: floatCode 7s ease-in-out infinite; animation-delay: -6s; }
.symbol-8 { font-size: 2rem; bottom: 15%; right: 12%; animation: floatCode 9s ease-in-out infinite; animation-delay: -7s; }

@keyframes floatCode {
  0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.08; }
  25%       { transform: translateY(-20px) translateX(10px) rotate(5deg); opacity: 0.12; }
  50%       { transform: translateY(-40px) translateX(-10px) rotate(-5deg); opacity: 0.06; }
  75%       { transform: translateY(-20px) translateX(15px) rotate(3deg); opacity: 0.1; }
}
</style>