<template>
  <section id="testimonials" class="relative px-6 py-24 overflow-hidden perf-optimize">
    <!-- Floating Code Symbols -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="code-symbol symbol-1">&lt;/&gt;</div>
      <div class="code-symbol symbol-2">{ }</div>
      <div class="code-symbol symbol-3">[ ]</div>
      <div class="code-symbol symbol-4">&lt;div&gt;</div>
    </div>

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

      <!-- ── TESTIMONIAL CARDS ── -->
      <div class="stories-grid">
        <div
          v-for="(story, i) in stories"
          :key="story.name"
          :class="['story-card', i === 0 && 'story-card--featured']"
        >
          <!-- Quote mark -->
          <div class="story-quote-mark" aria-hidden="true">"</div>

          <!-- Featured: left accent bar -->
          <div v-if="i === 0" class="story-featured-bar" aria-hidden="true" />

          <!-- Inner wrapper keeps column layout inside the row-flex featured card -->
          <div class="story-inner">
            <!-- Quote text -->
            <p class="story-text">{{ story.quote }}</p>

            <!-- Divider -->
            <div class="story-divider" />

            <!-- Person -->
            <div class="story-person">
              <div class="story-avatar">
                <span class="story-initials font-heading">{{ story.initials }}</span>
              </div>
              <div>
                <p class="story-name font-heading">{{ story.name }}</p>
                <p class="font-mono story-role">{{ story.role }}</p>
              </div>
              <!-- Origin tag -->
              <div class="ml-auto">
                <span :class="['story-origin-tag', `story-origin-tag--${story.origin}`]">
                  {{ story.origin }}
                </span>
              </div>
            </div>
          </div>
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

const stories = [
  {
    name: 'Celine Terrado',
    initials: 'CT',
    role: 'WordPress Developer',
    origin: 'Coreproc',
    quote: 'I had the chance to work with Julia, and she is a very good developer and a hardworking team member. She also has a strong eye for design, which adds great value to her work. She is easy to work with, listens well, and communicates effectively with the team. Julia is also a fast learner. One thing I appreciate about her is that she doesn\'t settle for less and always aims to deliver quality work.',
  },
  {
    name: 'Justin Barnes',
    initials: 'JB',
    role: 'Software Engineer, Live Stream Effort',
    origin: 'Freelance',
    quote: "Her ability to code what she designs is incredibly rare. We didn't need to relay specs to a developer — she handled the entire design-to-code pipeline herself. Saved us weeks.",
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
    role: 'IT Project Manager',
    origin: 'NMS',
    quote: "We had the opportunity to have Julia as an intern, and I must say, her performance during the time she spent with us was exceptional. She is incredibly dedicated and consistently delivered great results. Beyond her work, Julia was a joy to have on the team. Her cheerful, easygoing nature and open-minded approach made her a perfect fit. She is a reliable professional who brings a positive energy to any environment.",
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
   TESTIMONIAL GRID
   2-col on desktop. Featured card spans full.
══════════════════════════════════════ */
.stories-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 3rem;
}
@media (max-width: 640px) {
  .stories-grid { grid-template-columns: 1fr; }
}

/* Base card */
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

/* Featured card — first one, spans full width */
.story-card--featured {
  grid-column: 1 / -1;
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

/* Inner wrapper — keeps text+divider+person in a column regardless of card orientation */
.story-inner {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
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

/* Stars */
.story-stars { display: flex; gap: 2px; margin-bottom: 1rem; }
.star { font-size: 12px; color: #FCD34D; }

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