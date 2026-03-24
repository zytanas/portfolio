<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen && project"
        @click="$emit('close')"
        class="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md"
        style="margin: 0"
      >
        <div
          @click.stop
          class="relative flex flex-col w-full max-w-5xl overflow-y-auto scrollbar-hidden md:overflow-hidden modal-panel md:flex-row rounded-t-2xl md:rounded-2xl modal-height"
        >
          <button
            @click="$emit('close')"
            class="absolute z-20 modal-close-btn top-4 right-4"
            title="Close"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <!-- IMAGE PANE -->
          <div class="modal-image-pane scrollbar-hidden md:w-[55%] flex-shrink-0">
            <img :src="project.modalImage || project.image" :alt="project.title" class="block w-full h-auto" />
          </div>

          <!-- INFO PANE -->
          <div class="flex flex-col flex-1 gap-0 modal-info-pane scrollbar-hidden">
            <!-- Header -->
            <div class="p-6 pb-5 modal-info-header md:p-7">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-1.5 h-1.5 rounded-full bg-violet-400"></div>
                <span class="modal-eyebrow">// project details</span>
              </div>
              <h2 class="mb-3 modal-title font-heading">{{ project.title }}</h2>
              <div class="flex flex-wrap gap-2 mb-4">
                <span :class="['tag', getTagClass(project.tag)]">{{ project.tag }}</span>
                <span v-for="tech in project.techs" :key="tech" class="tag tag-tech">{{
                  tech
                }}</span>
              </div>
              <!-- Role badge -->
              <div class="modal-role-badge">
                <Figma
                  v-if="project.projectType === 'design'"
                  :size="11"
                  class="text-violet-400"
                />
                <Code2 v-else :size="11" class="text-violet-400" />
                <span>{{ project.role }}</span>
              </div>
            </div>

            <div class="mx-6 modal-divider md:mx-7" />

            <!-- Body -->
            <div class="flex flex-col flex-1 gap-5 p-6 pt-5 md:p-7">
              <!-- Description -->
              <div>
                <p class="mb-2 modal-section-label">Overview</p>
                <p class="modal-desc font-body">{{ project.desc }}</p>
              </div>

              <!-- Outcome -->
              <div v-if="project.outcome" class="modal-outcome-block">
                <p class="mb-2 modal-section-label"><span class="outcome-dot">●</span> Impact</p>
                <p class="modal-outcome font-body">{{ project.outcome }}</p>
              </div>

              <!-- Contributions -->
              <div v-if="project.contributions?.length">
                <p class="mb-2 modal-section-label">What I did</p>
                <ul class="modal-contributions">
                  <li
                    v-for="item in project.contributions"
                    :key="item"
                    class="modal-contribution-item"
                  >
                    <span class="contribution-arrow">→</span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between gap-3 px-6 py-4 modal-footer md:px-7">
              <div class="flex items-center gap-2">
                <Figma
                  v-if="project.projectType === 'design'"
                  :size="13"
                  class="modal-type-icon"
                />
                <Code2 v-else :size="13" class="modal-type-icon" />
                <span class="modal-eyebrow">
                  {{
                    project.projectType === 'design'
                      ? 'Designed in Figma'
                      : `Developed with ${project.developedWith}`
                  }}
                </span>
              </div>
              <a
                v-if="project.url"
                :href="project.url"
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
  </Teleport>
</template>

<script setup>
import { watch } from 'vue'
import { Figma, Code2 } from 'lucide-vue-next'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  project: {
    type: Object,
    default: null,
  },
})

defineEmits(['close'])

const getTagClass = (tag) => {
  if (tag === 'Coreproc') return 'tag-client'
  if (tag === 'Freelance') return 'tag-freelance'
  return 'tag-personal'
}

// Handle body overflow when modal opens/closes
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)
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

.modal-height {
  max-height: 92vh;
}
@media (min-width: 640px) {
  .modal-height {
    max-height: 88vh;
  }
}

.modal-panel {
  background: #0d0d1a;
  border: 1px solid rgba(123, 92, 250, 0.22);
  box-shadow:
    0 32px 80px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(123, 92, 250, 0.08);
}
@media (min-width: 768px) {
  .modal-panel {
    overflow: hidden;
  }
}
.modal-image-pane {
  background: #080812;
  border-right: none;
  border-bottom: 1px solid rgba(123, 92, 250, 0.1);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (min-width: 768px) {
  .modal-image-pane {
    border-right: 1px solid rgba(123, 92, 250, 0.1);
    border-bottom: none;
    max-height: none;
    overflow-y: auto;
  }
}
.modal-info-pane {
  background: #0d0d1a;
  min-width: 0;
}
@media (min-width: 768px) {
  .modal-info-pane {
    overflow-y: auto;
  }
}

.modal-close-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(123, 92, 250, 0.18);
  border: 1px solid rgba(123, 92, 250, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(240, 237, 248, 0.7);
  transition:
    background 0.2s,
    border-color 0.2s;
  cursor: pointer;
}
.modal-close-btn:hover {
  background: #7b5cfa;
  border-color: #7b5cfa;
  color: #fff;
}

.modal-eyebrow {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #2dd4bf;
}
.modal-title {
  font-size: clamp(20px, 3vw, 30px);
  font-weight: 800;
  line-height: 1.05;
  color: #f0edf8;
}
.modal-divider {
  height: 1px;
  background: rgba(123, 92, 250, 0.12);
}
.modal-desc {
  font-size: 13px;
  font-weight: 300;
  color: rgba(240, 237, 248, 0.75);
  line-height: 1.75;
}
.modal-type-icon {
  color: #7b5cfa;
  opacity: 0.7;
}

/* Role badge */
.modal-role-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #a78bfa;
  background: rgba(123, 92, 250, 0.08);
  border: 1px solid rgba(123, 92, 250, 0.2);
  border-radius: 6px;
  padding: 0.3rem 0.7rem;
}

/* Section labels inside modal */
.modal-section-label {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(240, 237, 248, 0.3);
}

/* Outcome block */
.modal-outcome-block {
  background: rgba(123, 92, 250, 0.05);
  border: 1px solid rgba(123, 92, 250, 0.15);
  border-radius: 10px;
  padding: 0.85rem 1rem;
}
.outcome-dot {
  color: #7b5cfa;
  margin-right: 0.35rem;
  font-size: 8px;
}
.modal-outcome {
  font-size: 13px;
  font-weight: 400;
  color: rgba(196, 181, 253, 0.9);
  line-height: 1.7;
}

/* Contributions list */
.modal-contributions {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  list-style: none;
  padding: 0;
  margin: 0;
}
.modal-contribution-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 12.5px;
  color: rgba(240, 237, 248, 0.65);
  line-height: 1.5;
}
.contribution-arrow {
  color: #2dd4bf;
  font-size: 11px;
  margin-top: 2px;
  flex-shrink: 0;
}

/* Modal footer */
.modal-footer {
  border-top: 1px solid rgba(123, 92, 250, 0.1);
  background: rgba(8, 8, 20, 0.4);
  flex-shrink: 0;
}

.modal-info-header {
  flex-shrink: 0;
}

.visit-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #a78bfa;
  background: rgba(123, 92, 250, 0.1);
  border: 1px solid rgba(123, 92, 250, 0.3);
  border-radius: 999px;
  padding: 6px 14px;
  text-decoration: none;
  transition:
    background 0.2s,
    border-color 0.2s,
    color 0.2s;
}
.visit-btn:hover {
  background: #7b5cfa;
  border-color: #7b5cfa;
  color: #fff;
}

/* ── TAGS ── */
.tag {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 9px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 999px;
}
.tag-client {
  background: rgba(34, 197, 94, 0.12);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.25);
}
.tag-freelance {
  background: rgba(59, 130, 246, 0.12);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.25);
}
.tag-personal {
  background: rgba(245, 158, 11, 0.12);
  color: #fcd34d;
  border: 1px solid rgba(245, 158, 11, 0.25);
}
.tag-tech {
  background: rgba(255, 255, 255, 0.04);
  color: rgba(240, 237, 248, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
