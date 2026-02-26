<template>
  <Transition name="modal">
    <div
      v-if="isOpen"
      @click="$emit('close')"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md md:p-8"
    >
      <!-- Panel -->
      <div
        @click.stop
        class="modal-panel relative w-full max-w-6xl flex flex-col overflow-hidden rounded-2xl h-auto md:h-[95vh]"
      >

        <!-- ── HEADER ── -->
        <div class="flex items-center justify-between flex-shrink-0 py-5 modal-header px-7">
          <div class="flex items-center gap-3">
            <div class="header-icon-wrap">
              <FileText class="w-4 h-4 text-[#FF6668]" />
            </div>
            <div>
              <p class="modal-eyebrow mb-0.5">// curriculum vitae</p>
              <h2 class="modal-title font-heading">Resume</h2>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <!-- Download button -->
            <a
              href="/Almoite_Julia_Zyrene - CV.pdf"
              download
              class="download-btn flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold font-body transition-all duration-300"
            >
              <Download class="w-4 h-4" />
              Download
            </a>

            <!-- Close button -->
            <button
              @click="$emit('close')"
              class="modal-close-btn"
              title="Close"
            >
              <svg class="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- ── DIVIDER ── -->
        <div class="h-px bg-[#FF6668]/15 flex-shrink-0"></div>

        <!-- ── PDF VIEWER ── -->
        <div class="modal-body">
          <iframe
            src="/Almoite_Julia_Zyrene - CV.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
            class="pdf-frame"
            type="application/pdf"
            title="Julia Zyrene Almoite — Resume"
          />
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { FileText, Download } from 'lucide-vue-next'

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['close'])
</script>

<style scoped>
/* ── MODAL TRANSITION ── */
.modal-enter-active, .modal-leave-active { transition: opacity 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }

/* ── SCROLLBAR ── */
.scrollbar-hidden { scrollbar-width: none; -ms-overflow-style: none; }
.scrollbar-hidden::-webkit-scrollbar { display: none; }

/* ── PANEL ── */
.modal-panel {
  background: #160c0c;
  border: 1px solid rgba(255, 102, 104, 0.25);
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 102, 104, 0.08);
}

/* ── HEADER ── */
.modal-header {
  background: #160c0c;
}

.header-icon-wrap {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: rgba(255, 102, 104, 0.12);
  border: 1px solid rgba(255, 102, 104, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.modal-eyebrow {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
  display: block;
}

.modal-title {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
}

/* ── DOWNLOAD BUTTON ── */
.download-btn {
  background: #FF6668;
  color: #fff;
  border: 1px solid #FF6668;
}

.download-btn:hover {
  background: transparent;
  color: #FF6668;
}

/* ── CLOSE BUTTON ── */
.modal-close-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 102, 104, 0.08);
  border: 1px solid rgba(255, 102, 104, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
}

.modal-close-btn:hover {
  background: #FF6668;
  border-color: #FF6668;
}

.modal-close-btn:hover svg {
  color: #fff;
}

/* ── BODY — mobile: natural A4 aspect ratio, desktop: fills remaining space ── */
.modal-body {
  background: #0e0606;
  display: flex;
  flex-direction: column;
  /* Mobile: size to content so no dead space */
  width: 100%;
}

/* ── PDF FRAME ── */
.pdf-frame {
  width: 100%;
  border: none;
  display: block;
  /* A4 aspect ratio (1:1.414) so it fits neatly on mobile */
  aspect-ratio: 1 / 1.414;
}

/* Desktop: stretch to fill the panel */
@media (min-width: 768px) {
  .modal-body {
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  .pdf-frame {
    aspect-ratio: unset;
    flex: 1;
    height: 100%;
    min-height: 0;
  }
}
</style>