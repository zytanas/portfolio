<template>
  <section id="projects" class="px-6 py-20">
    <div class="container mx-auto">
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
          v-for="project in projects"
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
              <div class="mt-2 flex items-center justify-between">
                <span
                  :class="[
                    'px-3 py-2 text-xs font-semibold rounded-full whitespace-nowrap',
                    project.tag === 'Coreproc'
                      ? 'bg-red-500/20 text-red-500'
                      : 'bg-white/20 text-white',
                  ]"
                >
                  {{ project.tag }}
                </span>

                <div class="relative group">
                  <Figma :size="24" class="transition-colors text-white/70 hover:text-red-500" />

                  <!-- Tooltip -->
                  <div
                    class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gradient-to-r from-red-300/50 to-pink-200/60 text-white text-sm font-semibold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap shadow-lg"
                  >
                    Figma
                    <div
                      class="absolute -translate-x-1/2 border-4 border-transparent top-full left-1/2 border-t-red-500"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- View All Projects Button -->
      <div class="text-center">
        <button
          class="px-8 py-3 text-red-500 transition-all duration-300 border-2 border-red-500 rounded-full font-body hover:bg-red-700/50 hover:text-white bg-red-500/10"
        >
          Explore All Projects
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
import { ref } from 'vue'
import { Figma } from 'lucide-vue-next'
import cozyImage from '@/assets/images/cozy.png'
import cryptoImage from '@/assets/images/crypto.png'
import vibeTeams from '@/assets/images/vibeteams.png'
import synerpark from '@/assets/images/synerpark.png'

const isModalOpen = ref(false)
const selectedProject = ref(null)

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

const projects = [
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
    title: 'Cozy Bean',
    image: cozyImage,
    tag: 'Personal',
  },
  {
    title: 'Crypto',
    image: cryptoImage,
    tag: 'Personal',
  },
]
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
</style>
