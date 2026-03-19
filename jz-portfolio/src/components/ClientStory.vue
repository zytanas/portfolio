<template>
  <section id="testimonials" class="relative px-6 py-24 overflow-hidden perf-optimize">
    <!-- Floating Code Symbols -->
    <FloatingCodeSymbols />

    <div class="stories-glow glow-center" />

    <div class="container relative z-10 max-w-6xl mx-auto">

      <!-- ── HEADER ── -->
      <div class="flex flex-col pb-8 mb-16 md:flex-row md:items-end md:justify-between section-header-border">
        <div>
          <p class="section-eyebrow">// client stories</p>
          <h2 class="section-title font-heading">
            Results That<br /><span class="title-accent">Speak Loud.</span>
          </h2>
        </div>
        <p class="mt-4 section-sub md:mt-0 md:max-w-xs">
          Real feedback from real people. Good design should always have a measurable impact.
        </p>
      </div>

      <!-- ── FEATURED CARD (first story, always static) ── -->
      <div class="mb-4 story-card story-card--featured">
        <div class="story-quote-mark" aria-hidden="true">"</div>
        <div class="story-featured-bar" aria-hidden="true" />
        <div class="story-inner">
          <p class="story-text">{{ stories[0].quote }}</p>
          <div class="story-divider" />
          <div class="story-person">
            <div class="story-avatar">
              <span class="story-initials font-heading">{{ stories[0].initials }}</span>
            </div>
            <div>
              <p class="story-name font-heading">{{ stories[0].name }}</p>
              <p class="font-mono story-role">{{ stories[0].role }}</p>
            </div>
            <div class="ml-auto">
              <span :class="['story-origin-tag', `story-origin-tag--${stories[0].origin}`]">
                {{ stories[0].origin }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── CAROUSEL SECTION (remaining stories) ── -->
      <div class="mb-12 carousel-wrapper">
        <!-- Nav arrows -->
        <button class="carousel-arrow carousel-arrow--prev" @click="scroll(-1)" aria-label="Previous">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button class="carousel-arrow carousel-arrow--next" @click="scroll(1)" aria-label="Next">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>

        <!-- Scrollable track -->
        <div
          class="carousel-track"
          ref="track"
          @mouseenter="pauseAuto"
          @mouseleave="resumeAuto"
          @touchstart="pauseAuto"
          @touchend="resumeAuto"
        >
          <div
            v-for="story in stories.slice(1)"
            :key="story.name"
            class="story-card carousel-card"
          >
            <div class="story-quote-mark" aria-hidden="true">"</div>
            <div class="story-inner">
              <p class="story-text">{{ story.quote }}</p>
              <div class="story-divider" />
              <div class="story-person">
                <div class="story-avatar">
                  <span class="story-initials font-heading">{{ story.initials }}</span>
                </div>
                <div>
                  <p class="story-name font-heading">{{ story.name }}</p>
                  <p class="font-mono story-role">{{ story.role }}</p>
                </div>
                <div class="ml-auto">
                  <span :class="['story-origin-tag', `story-origin-tag--${story.origin}`]">
                    {{ story.origin }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dot indicators -->
        <div class="carousel-dots">
          <button
            v-for="(_, i) in stories.slice(1)"
            :key="i"
            :class="['carousel-dot', activeIndex === i && 'carousel-dot--active']"
            @click="scrollToIndex(i)"
            :aria-label="`Go to testimonial ${i + 1}`"
          />
        </div>
      </div>

      <!-- ── MARQUEE STRIP ── -->
      <div class="marquee-wrap">
        <div class="marquee-track">
          <span v-for="(item, i) in [...marqueeItems, ...marqueeItems]" :key="i" class="font-mono marquee-item">
            {{ item }}
          </span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import FloatingCodeSymbols from '@/components/FloatingCodeSymbols.vue'

const track = ref(null)
const activeIndex = ref(0)
let autoTimer = null
const AUTO_DELAY = 2000 // ms between slides

function startAuto() {
  stopAuto()
  autoTimer = setInterval(() => {
    const total = stories.length - 1
    const next = activeIndex.value >= total - 1 ? 0 : activeIndex.value + 1
    scrollToIndex(next)
  }, AUTO_DELAY)
}

function stopAuto() {
  if (autoTimer) { clearInterval(autoTimer); autoTimer = null }
}

function pauseAuto() { stopAuto() }
function resumeAuto() { startAuto() }

const stories = [
  {
    name: 'Celine Terrado',
    initials: 'CT',
    role: 'WordPress Developer',
    origin: 'Coreproc',
    quote: "I had the chance to work with Julia, and she is a very good developer and a hardworking team member. She also has a strong eye for design, which adds great value to her work. She is easy to work with, listens well, and communicates effectively with the team. Julia is also a fast learner. One thing I appreciate about her is that she doesn't settle for less and always aims to deliver quality work.",
  },
  {
    name: 'Keith Mercado',
    initials: 'KM',
    role: 'UI/UX Engineer - Coreproc, Inc.',
    origin: 'Coreproc',
    quote: 'Julia is a pleasure to work with. She’s friendly, easy to collaborate with, and communicates clearly, which makes teamwork smooth and efficient. Her positive attitude really helps create a great working environment.'
  },
  {
    name: 'Adrian Ramirez',
    initials: 'AR',
    role: 'Web Developer',
    origin: 'NMS',
    quote: "Working with Julia was a great experience. Her designs are clean, modern, and well thought-out, and her frontend skills back them up perfectly. She's eager to learn and quick to adapt — exactly the kind of developer you want on a project. Highly recommend!",
  },
  {
    name: 'Chambelynne Malubay',
    initials: 'CM',
    role: 'IT Project Manager - New Media Services',
    origin: 'NMS',
    quote: "We had the opportunity to have Julia as an intern, and I must say, her performance during the time she spent with us was exceptional. She is incredibly dedicated and consistently delivered great results. Beyond her work, Julia was a joy to have on the team. Her cheerful, easygoing nature and open-minded approach made her a perfect fit.",
  },
  
  {
    name: 'Justin Barnes',
    initials: 'JB',
    role: 'Software Engineer, Live Stream Effort',
    origin: 'Freelance',
    quote: "Her ability to code what she designs is incredibly rare. We didn't need to relay specs to a developer — she handled the entire design-to-code pipeline herself. Saved us weeks.",
  },
  {
    name: 'Quan Doan',
    initials: 'QD',
    role: 'Backend Developer, Live Stream Effort',
    origin: 'Freelance',
    quote: "As the backend developer on the project, I appreciated Julia's clear communication and attention to technical details. She asked thoughtful questions, and her frontend work integrated seamlessly with our backend.",
  },
]

const marqueeItems = [
  'UI/UX Design ·',
  'Vue · React · Nuxt ·',
  'Figma ·',
  'Design Systems ·',
  'Frontend Dev ·',
  'Tailwind CSS ·',
  'Responsive Interfaces ·',
  'Prototyping ·',
  'Component Architecture ·',
  'TypeScript ·',
]

function getCardWidth() {
  if (!track.value) return 0
  const card = track.value.querySelector('.carousel-card')
  if (!card) return 0
  const gap = 16
  return card.offsetWidth + gap
}

function scroll(dir) {
  const total = stories.length - 1
  const next = Math.max(0, Math.min(total - 1, activeIndex.value + dir))
  scrollToIndex(next)
}

function scrollToIndex(i) {
  activeIndex.value = i
  if (!track.value) return
  track.value.scrollTo({ left: getCardWidth() * i, behavior: 'smooth' })
}

function onScroll() {
  if (!track.value) return
  const w = getCardWidth()
  if (w === 0) return
  activeIndex.value = Math.round(track.value.scrollLeft / w)
}

onMounted(() => {
  track.value?.addEventListener('scroll', onScroll, { passive: true })
  startAuto()
})
onBeforeUnmount(() => {
  track.value?.removeEventListener('scroll', onScroll)
  stopAuto()
})
</script>

<style scoped>
/* ── GLOW ── */
.stories-glow {
  position: absolute; border-radius: 50%;
  pointer-events: none; filter: blur(120px);
}
.glow-center {
  width: 600px; height: 400px;
  top: 30%; left: 50%; transform: translateX(-50%);
  background: radial-gradient(circle, rgba(123,92,250,0.06), transparent 70%);
}

/* ── HEADER ── */
.section-header-border { border-bottom: 1px solid rgba(123,92,250,0.14); }
.section-eyebrow {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
  color: #2DD4BF; margin-bottom: 10px;
}
.section-title {
  font-size: clamp(36px, 4.5vw, 64px); font-weight: 800;
  line-height: 0.95; letter-spacing: -0.02em; color: #F0EDF8;
}
.title-accent { color: #7B5CFA; text-shadow: 0 0 40px rgba(123,92,250,0.4); }
.section-sub { font-size: 0.875rem; color: rgba(240,237,248,0.5); line-height: 1.7; }

/* ══════════════════════════════════════
   BASE CARD
══════════════════════════════════════ */
.story-card {
  position: relative;
  padding: 1.75rem;
  border-radius: 16px;
  background: rgba(20,20,40,0.6);
  border: 1px solid rgba(123,92,250,0.1);
  overflow: hidden;
  transition: border-color 0.3s, transform 0.3s;
  display: flex; flex-direction: column;
}
.story-card:hover {
  border-color: rgba(123,92,250,0.28);
  transform: translateY(-3px);
}

/* ── FEATURED ── */
.story-card--featured {
  flex-direction: row;
  align-items: stretch;
  gap: 2rem;
  background: rgba(123,92,250,0.06);
  border-color: rgba(123,92,250,0.18);
}
.story-card--featured:hover { border-color: rgba(123,92,250,0.35); }

@media (max-width: 640px) {
  .story-card--featured { flex-direction: column; gap: 0; }
}

/* Left accent bar on featured card */
.story-featured-bar {
  width: 3px;
  border-radius: 999px;
  background: linear-gradient(180deg, #7B5CFA, #2DD4BF);
  flex-shrink: 0;
  align-self: stretch;
}
@media (max-width: 640px) {
  .story-featured-bar { display: none; }
}

/* ══════════════════════════════════════
   CAROUSEL
══════════════════════════════════════ */
.carousel-wrapper {
  position: relative;
}

.carousel-track {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: 0.5rem;
  /* fade edges */
  mask-image: linear-gradient(90deg, transparent 0%, black 4%, black 96%, transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 4%, black 96%, transparent 100%);
}
.carousel-track::-webkit-scrollbar { display: none; }

.carousel-card {
  flex: 0 0 calc(50% - 0.5rem);
  scroll-snap-align: start;
  min-width: 280px;
}

@media (max-width: 640px) {
  .carousel-card { flex: 0 0 85%; }
}

/* Arrow buttons */
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(calc(-50% - 20px));
  z-index: 10;
  width: 36px; height: 36px;
  border-radius: 50%;
  background: rgba(20,20,40,0.85);
  border: 1px solid rgba(123,92,250,0.25);
  color: #A78BFA;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}
.carousel-arrow:hover {
  background: rgba(123,92,250,0.18);
  border-color: rgba(123,92,250,0.5);
  color: #fff;
}
.carousel-arrow--prev { left: -18px; }
.carousel-arrow--next { right: -18px; }

@media (max-width: 640px) {
  .carousel-arrow { display: none; }
}

/* Dot indicators */
.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 1.25rem;
}
.carousel-dot {
  width: 6px; height: 6px;
  border-radius: 999px;
  background: rgba(123,92,250,0.2);
  border: none;
  cursor: pointer;
  transition: background 0.2s, width 0.2s;
}
.carousel-dot--active {
  width: 20px;
  background: #7B5CFA;
}

/* ── INNER LAYOUT ── */
.story-inner {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

/* Ghost quote mark */
.story-quote-mark {
  position: absolute;
  top: -0.5rem; right: 1.25rem;
  font-family: Georgia, serif;
  font-size: 8rem; line-height: 1;
  color: rgba(123,92,250,0.07);
  pointer-events: none;
  user-select: none;
}
.story-card--featured .story-quote-mark { font-size: 12rem; }

/* Quote text */
.story-text {
  font-size: clamp(0.95rem, 1.8vw, 1rem);
  color: rgba(240,237,248,0.75);
  line-height: 1.75;
  font-style: italic;
  flex: 1;
  margin-bottom: 1.25rem;
  position: relative;
}
.story-card--featured .story-text {
  font-size: clamp(1rem, 2vw, 1.125rem);
  color: rgba(240,237,248,0.85);
}

/* Divider */
.story-divider {
  height: 1px;
  background: rgba(123,92,250,0.1);
  margin-bottom: 1.1rem;
}

/* Person row */
.story-person {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Avatar */
.story-avatar {
  width: 38px; height: 38px;
  border-radius: 50%;
  background: rgba(123,92,250,0.18);
  border: 1px solid rgba(123,92,250,0.3);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.story-initials {
  font-size: 0.72rem; font-weight: 800;
  color: #A78BFA; letter-spacing: 0.04em;
}

.story-name {
  font-size: 0.875rem; font-weight: 700;
  color: #F0EDF8; line-height: 1.2;
}
.story-role {
  font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase;
  color: #2DD4BF; margin-top: 2px;
}

/* Origin tag */
.story-origin-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase;
  padding: 3px 9px; border-radius: 999px;
}
.story-origin-tag--Coreproc {
  background: rgba(34,197,94,0.1);
  color: #22c55e;
  border: 1px solid rgba(34,197,94,0.22);
}
.story-origin-tag--Freelance {
  background: rgba(59,130,246,0.1);
  color: #60a5fa;
  border: 1px solid rgba(59,130,246,0.22);
}
.story-origin-tag--NMS {
  background: rgba(255,107,107,0.1);
  color: #ff6b6b;
  border: 1px solid rgba(255,107,107,0.22);
}

/* ══════════════════════════════════════
   MARQUEE STRIP
══════════════════════════════════════ */
.marquee-wrap {
  overflow: hidden;
  border-top: 1px solid rgba(123,92,250,0.1);
  border-bottom: 1px solid rgba(123,92,250,0.1);
  padding: 0.85rem 0;
  mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
}
.marquee-track {
  display: flex;
  gap: 0;
  width: max-content;
  animation: marquee 28s linear infinite;
}
.marquee-track:hover { animation-play-state: paused; }

.marquee-item {
  font-size: clamp(10px, 1.5vw, 11px);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(167,139,250,0.45);
  padding: 0 1.5rem;
  white-space: nowrap;
  transition: color 0.2s;
}
.marquee-item:hover { color: #A78BFA; }

@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>