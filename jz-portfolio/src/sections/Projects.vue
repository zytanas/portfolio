<template>
  <section id="projects" class="relative px-6 py-20 overflow-hidden">
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

    <div class="container relative z-10 mx-auto">
      <!-- Section Header -->
      <div
        class="flex items-end justify-between pb-6 mb-16 border-b section-header-border"
      >
        <div>
          <p class="section-eyebrow">// selected work</p>
          <h2 class="section-title font-heading">
            Featured<br /><span class="text-[#FF6668]">Projects</span>
          </h2>
        </div>
        <div class="text-right">
          <div class="project-count-bg">0{{ allProjects.length }}</div>
          <p class="mt-1 font-mono text-xs tracking-widest uppercase text-white/40">
            total projects
          </p>
        </div>
      </div>

      <!-- ── CLIENT WORK GROUP ── -->
      <div class="mb-14">
        <!-- Group Label -->
        <div class="flex items-center gap-3 mb-6">
          <div class="group-dot bg-[#FF6668]"></div>
          <span class="group-label-text">Client Work · Coreproc, Inc. & Freelance</span>
          <div class="flex-1 h-px group-line"></div>
        </div>

        <!-- Grid -->
        <div class="grid gap-5 md:grid-cols-3">
          <div
            v-for="(project, index) in displayedClientProjects"
            :key="project.title"
            @click="openModal(project)"
            class="flex flex-col overflow-hidden cursor-pointer project-card group rounded-2xl"
          >
            <!-- Thumbnail -->
            <div class="relative h-64 overflow-hidden thumbnail-wrap">
              <img
                :src="project.image"
                :alt="project.title"
                class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <div class="thumb-overlay"></div>
            </div>

            <!-- Card Body -->
            <div class="flex flex-col flex-1 gap-2 p-5">
              <div class="flex items-start justify-between gap-3">
                <h3 class="card-title font-heading">{{ project.title }}</h3>
                <div class="arrow-icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M3 13L13 3M13 3H6M13 3v7" />
                  </svg>
                </div>
              </div>

              <p v-if="project.desc" class="card-desc">{{ project.desc }}</p>

              <div class="flex items-center justify-between pt-3 mt-auto">
                <div class="flex flex-wrap items-center gap-2">
                  <span
                    :class="[
                      'tag',
                      project.tag === 'Coreproc'
                        ? 'tag-client'
                        : project.tag === 'Freelance'
                        ? 'tag-freelance'
                        : 'tag-personal',
                    ]"
                    >{{ project.tag }}</span
                  >
                  <span v-for="tech in project.techs" :key="tech" class="tag tag-tech">{{
                    tech
                  }}</span>
                </div>
                <Figma
                  v-if="project.projectType === 'design'"
                  :size="18"
                  class="figma-icon text-white/30 group-hover:text-[#FF6668] transition-colors duration-200"
                />
                <Code2
                  v-else
                  :size="18"
                  class="figma-icon text-white/30 group-hover:text-[#FF6668] transition-colors duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- See More Button -->
        <div v-if="allClientProjects.length > 3" class="flex justify-center mt-6">
          <button @click="showAllClient = !showAllClient" class="see-more-btn">
            {{ showAllClient ? "See Less" : "See More" }}
            <svg
              :class="['w-3 h-3 transition-transform', showAllClient && 'rotate-180']"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- ── PERSONAL WORK GROUP ── -->
      <div class="mb-14">
        <!-- Group Label -->
        <div class="flex items-center gap-3 mb-6">
          <div class="bg-red-400 group-dot"></div>
          <span class="group-label-text text-white/40">Personal Projects</span>
          <div class="flex-1 h-px group-line"></div>
        </div>

        <div class="grid gap-5 md:grid-cols-3">
          <div
            v-for="(project, index) in displayedPersonalProjects"
            :key="project.title"
            @click="openModal(project)"
            class="flex flex-col overflow-hidden cursor-pointer project-card group rounded-2xl"
          >
            <!-- Thumbnail -->
            <div class="relative h-64 overflow-hidden thumbnail-wrap">
              <img
                :src="project.image"
                :alt="project.title"
                class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <div class="thumb-overlay"></div>
            </div>

            <!-- Card Body -->
            <div class="flex flex-col flex-1 gap-2 p-5">
              <div class="flex items-start justify-between gap-3">
                <h3 class="card-title font-heading">{{ project.title }}</h3>
                <div class="arrow-icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M3 13L13 3M13 3H6M13 3v7" />
                  </svg>
                </div>
              </div>

              <p v-if="project.desc" class="card-desc">{{ project.desc }}</p>

              <div class="flex items-center justify-between pt-3 mt-auto">
                <div class="flex flex-wrap items-center gap-2">
                  <span
                    :class="[
                      'tag',
                      project.tag === 'Coreproc'
                        ? 'tag-client'
                        : project.tag === 'Freelance'
                        ? 'tag-freelance'
                        : 'tag-personal',
                    ]"
                    >{{ project.tag }}</span
                  >
                  <span v-for="tech in project.techs" :key="tech" class="tag tag-tech">{{
                    tech
                  }}</span>
                </div>
                <Figma
                  v-if="project.projectType === 'design'"
                  :size="18"
                  class="figma-icon text-white/30 group-hover:text-[#FF6668] transition-colors duration-200"
                />
                <Code2
                  v-else
                  :size="18"
                  class="figma-icon text-white/30 group-hover:text-[#FF6668] transition-colors duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- See More Button -->
        <div v-if="allPersonalProjects.length > 3" class="flex justify-center mt-6">
          <button @click="showAllPersonal = !showAllPersonal" class="see-more-btn">
            {{ showAllPersonal ? "See Less" : "See More" }}
            <svg
              :class="['w-3 h-3 transition-transform', showAllPersonal && 'rotate-180']"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- ── PROJECT MODAL ── -->
    <Transition name="modal">
      <div
        v-if="isModalOpen"
        @click="closeModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md md:p-8"
      >
        <!-- Panel -->
        <div
          @click.stop
          class="modal-panel relative w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden rounded-2xl"
        >
          <!-- Close button -->
          <button
            @click="closeModal"
            class="absolute z-10 modal-close-btn top-4 right-4"
            title="Close"
          >
            <svg
              class="w-4 h-4 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <!-- LEFT — Scrollable image -->
          <div
            class="modal-image-pane scrollbar-hidden overflow-y-auto md:w-[62%] flex-shrink-0"
          >
            <img
              :src="selectedProject?.image"
              :alt="selectedProject?.title"
              class="block w-full h-auto"
            />
          </div>

          <!-- RIGHT — Project info -->
          <div
            class="flex flex-col flex-1 gap-5 overflow-y-auto modal-info-pane p-7 md:p-8 scrollbar-hidden"
          >
            <!-- Eyebrow -->
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 rounded-full bg-[#FF6668]"></div>
              <span class="modal-eyebrow">// project details</span>
            </div>

            <!-- Title -->
            <h2 class="modal-title font-heading">{{ selectedProject?.title }}</h2>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2">
              <span
                :class="[
                  'tag',
                  selectedProject?.tag === 'Coreproc'
                    ? 'tag-client'
                    : selectedProject?.tag === 'Freelance'
                    ? 'tag-freelance'
                    : 'tag-personal',
                ]"
                >{{ selectedProject?.tag }}</span
              >
              <span
                v-for="tech in selectedProject?.techs"
                :key="tech"
                class="tag tag-tech"
                >{{ tech }}</span
              >
            </div>

            <!-- Divider -->
            <div class="h-px bg-[#FF6668]/15"></div>

            <!-- Description -->
            <p class="modal-desc font-body">{{ selectedProject?.desc }}</p>

            <!-- Bottom row: Figma + Visit button -->
            <div class="flex items-center justify-between pt-2 mt-auto">
              <div class="flex items-center gap-2">
                <Figma v-if="selectedProject?.projectType === 'design'" :size="15" class="text-[#FF6668]/60" />
                <Code2 v-else :size="15" class="text-[#FF6668]/60" />
                <span class="modal-eyebrow">
                  {{ selectedProject?.projectType === 'design' ? 'Designed in Figma' : `Developed with ${selectedProject?.developedWith}` }}
                </span>
              </div>
              <a
                v-if="selectedProject?.url"
                :href="selectedProject.url"
                target="_blank"
                rel="noopener noreferrer"
                class="visit-btn"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M3 13L13 3M13 3H6M13 3v7" />
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
import { ref, computed } from "vue";
import { Figma, Code2 } from "lucide-vue-next";
import cozyImage from "@/assets/images/cozy.png";
import cryptoImage from "@/assets/images/crypto.png";
import vibeTeams from "@/assets/images/vibeteams.png";
import synerpark from "@/assets/images/synerpark.png";
import msb from "@/assets/images/msb.png";
import prestige from "@/assets/images/prestige.png";
import thirsty from "@/assets/images/thirsty.png";
import portfolio from "@/assets/images/portfolio.png";

const isModalOpen = ref(false);
const selectedProject = ref(null);
const showAllClient = ref(false);
const showAllPersonal = ref(false);

const openModal = (project) => {
  selectedProject.value = project;
  isModalOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedProject.value = null;
  document.body.style.overflow = "";
};

const allProjects = [
  {
    title: "VibeTeams",
    image: vibeTeams,
    tag: "Coreproc",
    desc:
      "Team collaboration SaaS where smart decisions happen — dashboard-driven platform with analytics and reporting.",
    techs: ["UI/UX", "SaaS"],
    url: "https://vibeteams.ai/",
    projectType: "development",
    developedWith: "Vue",
  },
  {
    title: "SynerPark",
    image: synerpark,
    tag: "Coreproc",
    desc:
      "Smart parking payment platform with seamless mobile onboarding and QR-based flow.",
    techs: ["Mobile"],
    url: "https://synerpark.com/",
    projectType: "development",
    developedWith: "Nuxt",
  },
  {
    title: "Prestige Paper Products",
    image: prestige,
    tag: "Coreproc",
    desc:
      "Brand identity and e-commerce site for a paper goods company, featuring editorial-style product showcases and a cohesive brand system.",
    techs: ["Revamp", "E-commerce"],
    projectType: "development",
    developedWith: "Vue",
  },
  {
    title: "My Shopping Box",
    image: msb,
    tag: "Coreproc",
    desc:
      "E-commerce product showcase with editorial-style layout and brand-forward identity.",
    techs: ["E-commerce"],
    url: "https://my-shoppingbox.com/ph",
    projectType: "development",
    developedWith: "Blade",
  },
  {
    title: "Thirsty Oasis",
    image: thirsty,
    tag: "Freelance",
    desc:
      "Livestream platform for a mature audience, with a sleek landing page design and intuitive UI for content discovery.",
    techs: ["Landing Page", "Branding"],
    projectType: "design",
  },

  {
    title: "Adrian's Portfolio",
    image: portfolio,
    tag: "Personal",
    desc:
      "A personal portfolio site showcasing a curated selection of design projects, featuring a clean layout and interactive elements to highlight key work.",
    techs: ["Web", "Personal"],
    url: "https://lemonadezzz.vercel.app/",
    projectType: "development",
    developedWith: "TSX",
  },
  {
    title: "Cozy Bean",
    image: cozyImage,
    tag: "Personal",
    desc:
      "A warm café brand & web experience featuring handcrafted menu design and a cozy product gallery.",
    techs: ["Branding", "Web"],
    projectType: "design",
  },
  {
    title: "Crypto",
    image: cryptoImage,
    tag: "Personal",
    desc:
      "Empowering digital currency journeys — bridging traditional finance with the crypto world.",
    techs: ["Fintech", "Landing"],
    projectType: "design",
  },
];

// All projects split by group
const allClientProjects = computed(() =>
  allProjects.filter((p) => p.tag === "Coreproc" || p.tag === "Freelance")
);

const allPersonalProjects = computed(() =>
  allProjects.filter((p) => p.tag === "Personal")
);

// Show 3 by default, all when expanded
const displayedClientProjects = computed(() =>
  showAllClient.value ? allClientProjects.value : allClientProjects.value.slice(0, 3)
);

const displayedPersonalProjects = computed(() =>
  showAllPersonal.value
    ? allPersonalProjects.value
    : allPersonalProjects.value.slice(0, 3)
);
</script>

<style scoped>
/* ── SCROLLBAR ── */
.scrollbar-hidden {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

/* ── MODAL ── */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* ── SECTION HEADER ── */
.section-header-border {
  border-color: rgba(255, 102, 104, 0.18);
}

.section-eyebrow {
  font-family: "JetBrains Mono", "Courier New", monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #ff6668;
  margin-bottom: 10px;
}

.section-title {
  font-size: clamp(42px, 5vw, 72px);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: 0.01em;
  color: #fff;
}

.project-count-bg {
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
  color: #ff6668;
  opacity: 0.2;
  font-family: inherit;
}

/* ── GROUP LABELS ── */
.group-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.group-label-text {
  font-family: "JetBrains Mono", "Courier New", monospace;
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #66ff99;
  white-space: nowrap;
}

.group-line {
  background: rgba(255, 102, 104, 0.15);
}

/* ── SEE MORE BUTTON ── */
.see-more-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: "JetBrains Mono", "Courier New", monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #f3f3f3;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.767);
  border-radius: 999px;
  padding: 4px 12px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.see-more-btn:hover {
  background: rgba(255, 102, 104, 0.18);
  border-color: rgba(255, 102, 104, 0.5);
}

/* ── CARDS ── */
.project-card {
  background: rgba(255, 102, 104, 0.08);
  border: 1px solid rgba(255, 102, 104, 0.2);
  transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
}

.project-card:hover {
  border-color: rgba(255, 102, 104, 0.5);
  background: rgba(255, 102, 104, 0.13);
  transform: translateY(-3px);
}

/* Thumbnail overlay */
.thumbnail-wrap::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10, 3, 3, 0.65) 0%, transparent 55%);
  opacity: 0;
  transition: opacity 0.3s;
}

.project-card:hover .thumbnail-wrap::after {
  opacity: 1;
}

/* Card body text */
.card-title {
  font-size: 22px;
  font-weight: 700;
  color: #ff6668;
  line-height: 1.1;
}

.card-featured .card-title {
  font-size: 26px;
}

.card-desc {
  font-size: 14px;
  font-weight: 300;
  line-height: 1.65;
}

/* Arrow icon */
.arrow-icon {
  width: 30px;
  height: 30px;
  border: 1px solid rgba(255, 102, 104, 0.25);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #ff6668;
  opacity: 0;
  transform: translate(-4px, 4px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.project-card:hover .arrow-icon {
  opacity: 1;
  transform: translate(0, 0);
}

/* Tags */
.tag {
  font-family: "JetBrains Mono", "Courier New", monospace;
  font-size: 10px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 999px;
}

.tag-client {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.tag-freelance {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.tag-personal {
  background: rgba(255, 218, 54, 0.144);
  color: rgb(255, 218, 54);
  border: 1px solid rgb(255, 218, 54);
}

.tag-tech {
  background: transparent;
  color: rgb(255, 255, 255);
  border: 1px solid rgba(255, 255, 255, 0.616);
}

/* ── MODAL ── */
.modal-panel {
  background: #160c0c;
  border: 1px solid rgba(255, 102, 104, 0.25);
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 102, 104, 0.08);
}

.modal-image-pane {
  background: #0e0606;
  border-right: 1px solid rgba(255, 102, 104, 0.12);
  max-height: 90vh;
}

.modal-info-pane {
  background: #160c0c;
  min-width: 260px;
}

.modal-close-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 102, 105, 0.692);
  border: 1px solid rgba(255, 102, 104, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.modal-close-btn:hover {
  background: #ff6668;
  border-color: #ff6668;
}

.modal-close-btn:hover svg {
  color: #fff;
}

.modal-eyebrow {
  font-family: "JetBrains Mono", "Courier New", monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #66ff99;
}

.modal-title {
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 700;
  line-height: 1.05;
  color: #fff;
}

.modal-desc {
  font-size: 14px;
  font-weight: 300;
  color: rgb(255, 255, 255);
  /* line-height: 1.7; */
}

/* ── VISIT BUTTON ── */
.visit-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: "JetBrains Mono", "Courier New", monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #ff6668;
  background: rgba(255, 102, 104, 0.1);
  border: 1px solid rgba(255, 102, 104, 0.35);
  border-radius: 999px;
  padding: 6px 14px;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.visit-btn:hover {
  background: #ff6668;
  border-color: #ff6668;
  color: #fff;
}

/* ── FLOATING CODE SYMBOLS ── */
.code-symbol {
  position: absolute;
  font-family: "Courier New", monospace;
  font-weight: 600;
  color: #ffffff;
  opacity: 0.08;
  pointer-events: none;
}

.symbol-1 {
  font-size: 3rem;
  top: 15%;
  left: 10%;
  animation: floatCode 8s ease-in-out infinite;
}
.symbol-2 {
  font-size: 2.5rem;
  top: 25%;
  right: 15%;
  animation: floatCode 7s ease-in-out infinite;
  animation-delay: -2s;
}
.symbol-3 {
  font-size: 2rem;
  top: 45%;
  left: 20%;
  animation: floatCode 9s ease-in-out infinite;
  animation-delay: -4s;
}
.symbol-4 {
  font-size: 2.8rem;
  bottom: 30%;
  right: 25%;
  animation: floatCode 6.5s ease-in-out infinite;
  animation-delay: -1s;
}
.symbol-5 {
  font-size: 2.2rem;
  top: 60%;
  left: 8%;
  animation: floatCode 7.5s ease-in-out infinite;
  animation-delay: -5s;
}
.symbol-6 {
  font-size: 2rem;
  bottom: 20%;
  left: 30%;
  animation: floatCode 8.5s ease-in-out infinite;
  animation-delay: -3s;
}
.symbol-7 {
  font-size: 2.5rem;
  top: 35%;
  right: 8%;
  animation: floatCode 7s ease-in-out infinite;
  animation-delay: -6s;
}
.symbol-8 {
  font-size: 2rem;
  bottom: 15%;
  right: 12%;
  animation: floatCode 9s ease-in-out infinite;
  animation-delay: -7s;
}

@keyframes floatCode {
  0%,
  100% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0.08;
  }
  25% {
    transform: translateY(-20px) translateX(10px) rotate(5deg);
    opacity: 0.12;
  }
  50% {
    transform: translateY(-40px) translateX(-10px) rotate(-5deg);
    opacity: 0.06;
  }
  75% {
    transform: translateY(-20px) translateX(15px) rotate(3deg);
    opacity: 0.1;
  }
}
</style>
