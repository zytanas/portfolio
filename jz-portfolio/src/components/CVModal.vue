<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div
          class="relative w-full max-w-4xl max-h-[90vh] bg-dark-card border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
        >
          <!-- Header -->
          <div class="sticky top-0 z-10 flex items-center justify-between p-6 border-b bg-dark-bg/95 backdrop-blur-sm border-white/20">
            <h2 class="text-2xl font-bold text-white font-heading">Resume</h2>
            <div class="flex items-center gap-2">
              <button
                @click="downloadCV"
                class="flex items-center gap-2 px-4 py-2 text-white transition-all duration-300 bg-red-500 rounded-lg hover:bg-red-600 font-body"
                title="Download Resume"
              >
                <Download class="w-4 h-4" />
                <span class="hidden sm:inline">Download</span>
              </button>
              <button
                @click="closeModal"
                class="p-2 text-white transition-colors rounded-lg hover:bg-white/10"
                aria-label="Close modal"
              >
                <X class="w-6 h-6" />
              </button>
            </div>
          </div>

          <!-- CV Content - PDF Viewer -->
          <div class="relative overflow-hidden bg-gray-900 max-h-[calc(90vh-88px)]">
            <iframe
              :src="cvPath + '#toolbar=0&navpanes=0&scrollbar=1'"
              class="w-full h-[calc(90vh-88px)]"
              title="Resume PDF"
              @error="handlePDFError"
            >
              <!-- Fallback for browsers that don't support iframe -->
              <p class="p-8 text-center text-white">
                Your browser does not support viewing PDFs.
                <a :href="cvPath" download class="text-red-400 underline hover:text-red-300">
                  Click here to download the PDF
                </a>
              </p>
            </iframe>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { X, Download } from 'lucide-vue-next'
import cvFile from '../docs/Almoite_Julia_Zyrene - CV.pdf'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

// Path to CV PDF
const cvPath = cvFile

const closeModal = () => {
  emit('close')
}

const downloadCV = () => {
  // Create a temporary link element to trigger download
  const link = document.createElement('a')
  link.href = cvPath
  link.download = 'Julia_Zyrene_Padasas_CV.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const handlePDFError = () => {
  console.error('Failed to load PDF. Make sure the file exists at:', cvPath)
}

// Close modal on Escape key
const handleEscape = (e) => {
  if (e.key === 'Escape' && props.isOpen) {
    closeModal()
  }
}

// Add/remove event listener
import { onMounted, onUnmounted, watch } from 'vue'

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

// Prevent body scroll when modal is open
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(239, 68, 68, 0.5);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(239, 68, 68, 0.7);
}
</style>
