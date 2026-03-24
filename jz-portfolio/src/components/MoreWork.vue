<template>
  <div class="more-work-section">
    <!-- Section label -->
    <div class="flex items-center gap-3 mb-10">
      <div class="group-dot"></div>
      <span class="group-label">// more work</span>
      <div class="flex-1 h-px group-line"></div>
    </div>

    <!-- List rows -->
    <div class="more-list">
      <div
        v-for="(project, i) in displayedProjects"
        :key="project.title"
        class="more-row group"
        @click="$emit('open-modal', project)"
      >
        <!-- Ghost index -->
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

        <!-- Right: type pill + arrow -->
        <div class="row-right">
          <div class="row-type-pill">
            <Code2 v-if="project.projectType !== 'design'" :size="11" />
            <Figma v-else :size="11" />
            <span>{{ project.projectType === 'design' ? 'Design' : project.developedWith }}</span>
          </div>
          <div class="row-arrow">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 13L13 3M13 3H6M13 3v7" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Show More/Less Button -->
    <div v-if="shouldShowButton" class="flex justify-center mt-8">
      <button @click="toggleShowAll" class="show-more-btn">
        <span>{{ showAll ? 'Show Less' : 'Show More' }}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          :class="['arrow-icon', { 'rotate-180': showAll }]"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Figma, Code2 } from 'lucide-vue-next'

const props = defineProps({
  projects: {
    type: Array,
    required: true,
  },
})

defineEmits(['open-modal'])

const showAll = ref(false)
const INITIAL_DISPLAY_COUNT = 5

const displayedProjects = computed(() => {
  if (props.projects.length <= INITIAL_DISPLAY_COUNT || showAll.value) {
    return props.projects
  }
  return props.projects.slice(0, INITIAL_DISPLAY_COUNT)
})

const shouldShowButton = computed(() => props.projects.length > INITIAL_DISPLAY_COUNT)

const toggleShowAll = () => {
  showAll.value = !showAll.value
}

const getTagClass = (tag) => {
  if (tag === 'Coreproc') return 'tag-client'
  if (tag === 'Freelance') return 'tag-freelance'
  return 'tag-personal'
}
</script>

<style scoped>
/* ── LABEL ── */
.group-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  background: #7b5cfa;
  box-shadow: 0 0 6px rgba(123, 92, 250, 0.55);
}
.group-label {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #a78bfa;
  white-space: nowrap;
}
.group-line {
  background: rgba(123, 92, 250, 0.12);
}

/* ── LIST ── */
.more-list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(123, 92, 250, 0.1);
}

.more-row {
  position: relative;
  display: grid;
  grid-template-columns: 56px 120px 1fr auto;
  align-items: center;
  gap: 1.5rem;
  padding: 1.4rem 0;
  border-bottom: 1px solid rgba(123, 92, 250, 0.1);
  cursor: pointer;
  overflow: hidden;
}

/* Hover sweep */
.more-row::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(123, 92, 250, 0.05);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.more-row:hover::before {
  transform: scaleX(1);
}

/* Ghost index */
.row-index {
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1;
  color: rgba(123, 92, 250, 0.12);
  letter-spacing: -0.04em;
  transition: color 0.25s;
  user-select: none;
  flex-shrink: 0;
}
.more-row:hover .row-index {
  color: rgba(123, 92, 250, 0.35);
}

/* Thumbnail */
.row-thumb {
  position: relative;
  width: 120px;
  height: 72px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid rgba(123, 92, 250, 0.12);
}
.row-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s ease;
}
.more-row:hover .row-thumb-img {
  transform: scale(1.08);
}
.row-thumb-overlay {
  position: absolute;
  inset: 0;
  background: rgba(8, 8, 20, 0.2);
  transition: opacity 0.25s;
}
.more-row:hover .row-thumb-overlay {
  opacity: 0;
}

/* Info */
.row-info {
  flex: 1;
  min-width: 0;
}
.row-title {
  font-size: clamp(1rem, 2vw, 1.1rem);
  font-weight: 700;
  color: #f0edf8;
  line-height: 1.15;
  margin-bottom: 0.3rem;
  margin-top: 0.35rem;
  transition: color 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.more-row:hover .row-title {
  color: #c4b5fd;
}
.row-desc {
  font-size: clamp(0.85rem, 1.5vw, 0.9rem);
  color: rgba(240, 237, 248, 0.4);
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Right */
.row-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}
.row-type-pill {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.22rem 0.65rem;
  border-radius: 999px;
  background: rgba(123, 92, 250, 0.07);
  border: 1px solid rgba(123, 92, 250, 0.18);
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #a78bfa;
  transition: background 0.2s, border-color 0.2s;
}
.more-row:hover .row-type-pill {
  background: rgba(123, 92, 250, 0.14);
  border-color: rgba(123, 92, 250, 0.38);
}
.row-arrow {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(123, 92, 250, 0.15);
  border-radius: 6px;
  color: rgba(167, 139, 250, 0.4);
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.25s, transform 0.25s, color 0.2s, border-color 0.2s;
}
.more-row:hover .row-arrow {
  opacity: 1;
  transform: translateX(0);
  color: #a78bfa;
  border-color: rgba(123, 92, 250, 0.4);
}

/* Mobile */
@media (max-width: 640px) {
  .more-row {
    grid-template-columns: 32px 72px 1fr auto;
    gap: 0.65rem;
    padding: 1rem 0;
  }
  .row-index {
    font-size: 1.4rem;
  }
  .row-thumb {
    width: 72px;
    height: 48px;
  }
  .row-type-pill {
    display: none;
  }
  .row-arrow {
    opacity: 1;
    transform: translateX(0);
    color: rgba(167, 139, 250, 0.5);
  }
  .row-desc {
    display: none;
  }
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

/* ── SHOW MORE BUTTON ── */
.show-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.65rem 1.5rem;
  border-radius: 999px;
  background: rgba(123, 92, 250, 0.08);
  border: 1px solid rgba(123, 92, 250, 0.25);
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #a78bfa;
  cursor: pointer;
  transition: all 0.25s ease;
}
.show-more-btn:hover {
  background: rgba(123, 92, 250, 0.15);
  border-color: rgba(123, 92, 250, 0.4);
  color: #c4b5fd;
  transform: translateY(-1px);
}
.show-more-btn:active {
  transform: translateY(0);
}
.arrow-icon {
  transition: transform 0.3s ease;
}
.arrow-icon.rotate-180 {
  transform: rotate(180deg);
}
</style>