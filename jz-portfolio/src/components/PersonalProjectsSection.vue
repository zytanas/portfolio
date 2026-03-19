<template>
  <div>
    <div class="flex items-center gap-3 mb-10">
      <div class="group-dot dot-personal"></div>
      <span class="group-label-text label-personal">Personal Projects</span>
      <div class="flex-1 h-px group-line"></div>
    </div>

    <div class="personal-list">
      <div
        v-for="(project, i) in projects"
        :key="project.title"
        @click="$emit('open-modal', project)"
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
            <span v-for="tech in project.techs" :key="tech" class="tag tag-tech">{{
              tech
            }}</span>
          </div>
          <h3 class="row-title font-heading">{{ project.title }}</h3>
          <p class="row-desc">{{ project.desc }}</p>
        </div>

        <!-- Right: type + arrow -->
        <div class="row-right">
          <div class="row-type-pill">
            <Code2 v-if="project.projectType !== 'design'" :size="11" />
            <Figma v-else :size="11" />
            <span>{{
              project.projectType === 'design' ? 'Design' : project.developedWith
            }}</span>
          </div>
          <div class="row-arrow">
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { Figma, Code2 } from 'lucide-vue-next'

defineProps({
  projects: {
    type: Array,
    required: true,
  },
})

defineEmits(['open-modal'])
</script>

<style scoped>
/* ── GROUP LABELS ── */
.group-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.dot-personal {
  background: #f59e0b;
  box-shadow: 0 0 6px rgba(245, 158, 11, 0.5);
}
.group-label-text {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #a78bfa;
  white-space: nowrap;
}
.label-personal {
  color: #fcd34d;
}
.group-line {
  background: rgba(123, 92, 250, 0.12);
}

/* ══════════════════════════════════════
   PERSONAL PROJECTS — EDITORIAL LIST ROWS
   Same layout as client work, but with amber accents.
══════════════════════════════════════ */
.personal-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: 1px solid rgba(245, 158, 11, 0.1);
}

.personal-row {
  position: relative;
  display: grid;
  grid-template-columns: 56px 120px 1fr auto;
  align-items: center;
  gap: 1.5rem;
  padding: 1.4rem 0;
  border-bottom: 1px solid rgba(245, 158, 11, 0.1);
  transition: background 0.25s;
  overflow: hidden;
}

/* Full-row hover bg sweep with amber tint */
.personal-row::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(245, 158, 11, 0.05);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.personal-row:hover::before {
  transform: scaleX(1);
}

/* Personal rows share same styling but with amber accents */
.personal-row .row-index {
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1;
  color: rgba(245, 158, 11, 0.12);
  letter-spacing: -0.04em;
  transition: color 0.25s;
  user-select: none;
  flex-shrink: 0;
}
.personal-row:hover .row-index {
  color: rgba(245, 158, 11, 0.35);
}

.personal-row .row-thumb {
  position: relative;
  width: 120px;
  height: 72px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid rgba(245, 158, 11, 0.12);
}

.row-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s ease;
}
.personal-row:hover .row-thumb-img {
  transform: scale(1.08);
}
.row-thumb-overlay {
  position: absolute;
  inset: 0;
  background: rgba(8, 8, 20, 0.2);
  transition: opacity 0.25s;
}
.personal-row:hover .row-thumb-overlay {
  opacity: 0;
}

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
.personal-row:hover .row-title {
  color: #fde68a;
}
.row-desc {
  font-size: clamp(0.85rem, 1.5vw, 0.9rem);
  color: rgb(240, 237, 248);
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.personal-row .row-type-pill {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.22rem 0.65rem;
  border-radius: 999px;
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.18);
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fcd34d;
  transition:
    background 0.2s,
    border-color 0.2s;
}
.personal-row:hover .row-type-pill {
  background: rgba(245, 158, 11, 0.15);
  border-color: rgba(245, 158, 11, 0.35);
}

.personal-row .row-arrow {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(245, 158, 11, 0.15);
  border-radius: 6px;
  color: rgba(252, 211, 77, 0.4);
  opacity: 0;
  transform: translateX(-6px);
  transition:
    opacity 0.25s,
    transform 0.25s,
    color 0.2s,
    border-color 0.2s;
}
.personal-row:hover .row-arrow {
  opacity: 1;
  transform: translateX(0);
  color: #fcd34d;
  border-color: rgba(245, 158, 11, 0.4);
}

/* Mobile: stack rows */
@media (max-width: 640px) {
  .personal-row {
    grid-template-columns: 32px 72px 1fr auto;
    gap: 0.65rem;
    padding: 1rem 0;
  }
  .personal-row .row-index {
    font-size: 1.4rem;
  }
  .personal-row .row-thumb {
    width: 72px;
    height: 48px;
  }
  .personal-row .row-type-pill {
    display: none;
  }
  .personal-row .row-arrow {
    opacity: 1;
    transform: translateX(0);
    color: rgba(252, 211, 77, 0.5);
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
