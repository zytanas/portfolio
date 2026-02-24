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
      <!-- Section Title -->
      <div class="mb-16">
        <h2 class="mb-5 text-4xl font-bold md:text-5xl font-heading">Featured Projects</h2>
        <p class="text-white/70">
          A showcase of projects I’ve created and contributed to, spanning UI/UX design and web
          development, with a strong focus on detail and user experience.
        </p>
      </div>

      <!-- Projects Grid -->
      <div class="grid gap-8 mb-12 md:grid-cols-3">
        <div
          v-for="project in displayedProjects"
          @click="openModal(project)"
          :key="project.title"
          class="overflow-hidden bg-[#FF6668]/20 border border-[#FF6668]/50 rounded-2xl card-hover cursor-pointer"
        >
          <!-- Project Image -->
          <div
            class="relative h-64 overflow-hidden cursor-pointer bg-gradient-to-br from-red-400/10 to-red-600/50"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="object-cover w-full h-full transition-all duration-500 opacity-80 hover:opacity-100 hover:rotate-3"
            />
          </div>

          <!-- Project Info -->
          <div class="p-6">
            <div class="mb-3">
              <h3 class="text-2xl font-bold font-heading">{{ project.title }}</h3>
              <div class="flex items-center justify-between mt-2">
                <span
                  :class="[
                    'px-3 py-2 text-xs font-semibold rounded-full whitespace-nowrap',
                    project.tag === 'Coreproc'
                      ? 'bg-green-500/30 text-green-500'
                      : 'bg-white/20 text-white',
                  ]"
                >
                  {{ project.tag }}
                </span>

                <div class="relative group">
                  <Figma :size="24" class="text-white/70" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- View All Projects Button -->
      <div class="text-center">
        <button
          v-if="!showAllProjects"
          @click="exploreAllProjects"
          class="px-8 py-3 text-red-500 transition-all duration-300 border-2 border-red-500 rounded-full font-body hover:bg-red-700/50 hover:text-white bg-red-500/10"
        >
          Explore All Projects
        </button>
        <button
          v-else
          @click="showLessProjects"
          class="px-8 py-3 text-red-500 transition-all duration-300 border-2 border-red-500 rounded-full font-body hover:bg-red-700/50 hover:text-white bg-red-500/10"
        >
          See Less
        </button>
      </div>
    </div>

    <!-- Image Modal -->
    <Transition name="modal">
      <div
        v-if="isModalOpen"
        @click="closeModal"
        class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      >
        <!-- Close Button - Fixed Position -->
        <button
          @click="closeModal"
          class="fixed top-4 right-4 z-[60] p-3 transition-colors rounded-full shadow-lg bg-white/20 hover:bg-red-500/80"
        >
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Scrollable Image Container -->
        <div
          @click.stop
          class="flex items-center justify-center w-full h-full p-4 overflow-y-auto scrollbar-hidden md:p-16"
        >
          <!-- Full Image -->
          <img
            :src="selectedProject?.image"
            :alt="selectedProject?.title"
            class="max-w-full max-h-[80vh] md:max-w-4xl md:max-h-[85vh] w-auto h-auto rounded-lg shadow-2xl object-contain"
          />
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Figma } from 'lucide-vue-next'
import cozyImage from '@/assets/images/cozy.png'
import cryptoImage from '@/assets/images/crypto.png'
import vibeTeams from '@/assets/images/vibeteams.png'
import synerpark from '@/assets/images/synerpark.png'
import msb from '@/assets/images/msb.png'

const isModalOpen = ref(false)
const selectedProject = ref(null)
const showAllProjects = ref(false)

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

const exploreAllProjects = () => {
  showAllProjects.value = true
}

const showLessProjects = () => {
  showAllProjects.value = false
}

const allProjects = [
  {
    title: 'VibeTeams',
    image: vibeTeams,
    tag: 'Coreproc',
  },
  {
    title: 'SynerPark',
    image: synerpark,
    tag: 'Coreproc',
  },
  {
    title: 'My Shopping Box',
    image: msb,
    tag: 'Coreproc',
  },
  {
    title: 'Cozy Bean',
    image: cozyImage,
    tag: 'Personal',
  },
  {
    title: 'Crypto',
    image: cryptoImage,
    tag: 'Personal',
  },
  // Add more projects here as needed
]

const displayedProjects = computed(() => {
  return showAllProjects.value ? allProjects : allProjects.slice(0, 3)
})
</script>

<style scoped>
/* Hide scrollbar but keep scrolling functionality */
.scrollbar-hidden {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.code-symbol {
  position: absolute;
  font-family: 'Courier New', monospace;
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
