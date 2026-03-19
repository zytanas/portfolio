<template>
  <section id="contact" class="relative px-6 py-24 overflow-hidden perf-optimize">
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
    
    <!-- Ambient glows -->
    <div class="contact-glow glow-tl" />
    <div class="contact-glow glow-br" />

    <div class="container relative z-10 max-w-6xl mx-auto">

      <!-- ── SECTION HEADER ── -->
      <div class="flex items-end justify-between pb-8 mb-16 section-header-border">
        <div>
          <p class="section-eyebrow">// contact</p>
          <h2 class="section-title font-heading">
            Let's Build<br /><span class="title-accent">Something.</span>
          </h2>
        </div>
        <div class="hidden text-right md:block">
          <div class="hi-bg font-heading">Hi!</div>
          <p class="font-mono hi-label">let's connect</p>
        </div>
      </div>

      <!-- ── GROUP LABEL ── -->
      <div class="flex items-center gap-3 mb-8">
        <div class="group-dot"></div>
        <span class="font-mono group-label-text">Send me a message</span>
        <div class="flex-1 h-px group-line"></div>
      </div>

      <!-- ── TWO COLUMN LAYOUT ── -->
      <div class="contact-grid">

        <!-- LEFT — Info panel -->
        <div class="info-panel">

          <div class="info-header">
            <h3 class="info-title font-heading">Let's Work Together</h3>
            <p class="info-sub">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
          </div>

          <!-- Contact items -->
          <div class="contact-items">
            <a href="mailto:juliazyrene23@gmail.com" class="contact-item group">
              <div class="ci-icon-wrap">
                <Mail class="w-4 h-4" />
              </div>
              <div>
                <p class="font-mono ci-label">Email</p>
                <p class="transition-colors ci-value group-hover:text-violet-300">juliazyrene23@gmail.com</p>
              </div>
            </a>

            <a href="tel:09565595721" class="contact-item group">
              <div class="ci-icon-wrap">
                <Phone class="w-4 h-4" />
              </div>
              <div>
                <p class="font-mono ci-label">Phone</p>
                <p class="transition-colors ci-value group-hover:text-violet-300">09565595721</p>
              </div>
            </a>

            <div class="contact-item">
              <div class="ci-icon-wrap">
                <MapPin class="w-4 h-4" />
              </div>
              <div>
                <p class="font-mono ci-label">Location</p>
                <p class="ci-value">Baguio City, Philippines</p>
              </div>
            </div>
          </div>

          <!-- Divider -->
          <div class="info-divider" />

          <!-- Socials -->
          <div>
            <p class="font-mono socials-label">Follow me on</p>
            <div class="flex gap-2.5 mt-3">
              <a
                v-for="social in socials"
                :key="social.name"
                :href="social.url"
                target="_blank"
                :title="social.name"
                class="social-btn group"
              >
                <component
                  :is="social.icon"
                  class="w-4 h-4 text-white transition-colors"
                />
              </a>
            </div>
          </div>

        </div>

        <!-- RIGHT — Form -->
        <div class="form-panel">

          <h3 class="form-title font-heading">Send a Message</h3>

          <!-- Status messages -->
          <Transition name="fade">
            <div v-if="formStatus === 'success'" class="status-msg status-msg--success">
              <span class="status-icon">✓</span>
              Message sent! I'll get back to you soon.
            </div>
          </Transition>
          <Transition name="fade">
            <div v-if="formStatus === 'error'" class="status-msg status-msg--error">
              <span class="status-icon">✗</span>
              Something went wrong. Please email me directly.
            </div>
          </Transition>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            @submit.prevent="handleSubmit"
            class="form-fields"
          >
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />

            <div class="field-group">
              <label for="name" class="font-mono field-label">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                v-model="form.name"
                required
                placeholder="Juan Dela Cruz"
                class="form-input"
              />
            </div>

            <div class="field-group">
              <label for="email" class="font-mono field-label">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                v-model="form.email"
                required
                placeholder="juandelacruz@example.com"
                class="form-input"
              />
            </div>

            <div class="field-group">
              <label for="message" class="font-mono field-label">Message</label>
              <textarea
                id="message"
                name="message"
                v-model="form.message"
                required
                rows="5"
                placeholder="Tell me about your project..."
                class="resize-none form-input"
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="submit-btn font-heading"
            >
              <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
              <Send v-if="!isSubmitting" class="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Mail, Phone, MapPin, Linkedin, Github, Send } from 'lucide-vue-next'

const form = reactive({ name: '', email: '', message: '' })
const isSubmitting = ref(false)
const formStatus = ref(null)

const socials = [
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/almoitejuliazyrene/' },
  { name: 'GitHub',   icon: Github,   url: 'https://github.com/zytanas' },
]

const handleSubmit = async () => {
  isSubmitting.value = true
  formStatus.value = null
  try {
    const formData = new FormData()
    formData.append('form-name', 'contact')
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('message', form.message)

    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })

    if (response.ok) {
      formStatus.value = 'success'
      form.name = form.email = form.message = ''
      setTimeout(() => { formStatus.value = null }, 5000)
    } else {
      formStatus.value = 'error'
    }
  } catch (e) {
    formStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* ── GLOWS ── */
.contact-glow { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(100px); }
.glow-tl { width: 500px; height: 500px; top: -80px; left: -100px;
  background: radial-gradient(circle, rgba(123,92,250,0.08), transparent 70%); }
.glow-br { width: 400px; height: 400px; bottom: -60px; right: -80px;
  background: radial-gradient(circle, rgba(45,212,191,0.05), transparent 70%); }

/* ── HEADER ── */
.section-header-border { border-bottom: 1px solid rgba(123,92,250,0.14); }
.section-eyebrow {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
  color: #2DD4BF; margin-bottom: 10px;
}
.section-title {
  font-size: clamp(42px, 5vw, 72px); font-weight: 800;
  line-height: 0.95; letter-spacing: -0.02em; color: #F0EDF8;
}
.title-accent { color: #7B5CFA; text-shadow: 0 0 40px rgba(123,92,250,0.4); }
.hi-bg { font-size: 64px; font-weight: 800; line-height: 1; color: #7B5CFA; opacity: 0.18; }
.hi-label { font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(240,237,248,0.3); margin-top: 2px; }

/* ── GROUP LABEL ── */
.group-dot { width: 6px; height: 6px; border-radius: 50%; background: #7B5CFA;
  box-shadow: 0 0 6px rgba(123,92,250,0.6); flex-shrink: 0; }
.group-label-text { font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; color: #A78BFA; white-space: nowrap; }
.group-line { background: rgba(123,92,250,0.12); }

/* ── GRID ── */
.contact-grid {
  display: grid; grid-template-columns: 1fr;
  gap: 1.5rem;
}
@media (min-width: 768px) {
  .contact-grid { grid-template-columns: 1fr 1fr; align-items: start; }
}

/* ══════════════════════════════════════
   LEFT — INFO PANEL
══════════════════════════════════════ */
.info-panel {
  display: flex; flex-direction: column; gap: 1.75rem;
  padding: 2rem;
  border-radius: 18px;
  background: rgba(20,20,40,0.6);
  border: 1px solid rgba(123,92,250,0.12);
  height: 100%;
}

.info-title {
  font-size: clamp(1.15rem, 2.5vw, 1.35rem);
  font-weight: 800;
  color: #F0EDF8;
  margin-bottom: 0.5rem;
}
.info-sub {
  font-size: clamp(0.875rem, 1.8vw, 0.95rem);
  color: rgba(240,237,248,0.5);
  line-height: 1.7;
}

/* Contact items */
.contact-items { display: flex; flex-direction: column; gap: 1.1rem; }
.contact-item {
  display: flex; align-items: flex-start; gap: 0.85rem;
  text-decoration: none;
}
.ci-icon-wrap {
  width: 38px; height: 38px; flex-shrink: 0;
  border-radius: 10px;
  background: rgba(123,92,250,0.1);
  border: 1px solid rgba(123,92,250,0.2);
  display: flex; align-items: center; justify-content: center;
  color: #A78BFA;
  transition: background 0.2s, border-color 0.2s;
}
.contact-item:hover .ci-icon-wrap {
  background: rgba(123,92,250,0.18);
  border-color: rgba(123,92,250,0.4);
}
.ci-label {
  font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase;
  color: #2DD4BF; margin-bottom: 3px;
}
.ci-value { font-size: 0.85rem; color: rgb(240, 237, 248); }

.info-divider { height: 1px; background: rgba(123,92,250,0.1); }

.socials-label { font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: #2DD4BF; }
.social-btn {
  width: 38px; height: 38px; border-radius: 10px;
  background: rgba(123,92,250,0.08);
  border: 1px solid rgba(123,92,250,0.18);
  display: flex; align-items: center; justify-content: center;
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}
.social-btn:hover { background: #7B5CFA; border-color: #7B5CFA; transform: translateY(-2px); }

/* ══════════════════════════════════════
   RIGHT — FORM PANEL
══════════════════════════════════════ */
.form-panel {
  padding: 2rem;
  border-radius: 18px;
  background: rgba(20,20,40,0.6);
  border: 1px solid rgba(123,92,250,0.12);
}

.form-title {
  font-size: 1.25rem; font-weight: 800; color: #F0EDF8;
  margin-bottom: 1.5rem;
}

/* Status messages */
.status-msg {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0.75rem 1rem; border-radius: 10px;
  font-size: 0.82rem; margin-bottom: 1.25rem;
}
.status-msg--success {
  background: rgba(34,197,94,0.1); color: #4ade80;
  border: 1px solid rgba(34,197,94,0.25);
}
.status-msg--error {
  background: rgba(239,68,68,0.1); color: #f87171;
  border: 1px solid rgba(239,68,68,0.2);
}
.status-icon { font-weight: 700; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Form fields */
.form-fields { display: flex; flex-direction: column; gap: 1.1rem; }
.field-group { display: flex; flex-direction: column; gap: 0.4rem; }
.field-label {
  font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase;
  color: #2DD4BF;
}

.form-input {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(123,92,250,0.18);
  border-radius: 10px;
  padding: 10px 14px;
  color: #F0EDF8;
  font-family: inherit;
  font-size: clamp(14px, 2vw, 15px);
  outline: none;
  transition: border-color 0.2s, background 0.2s;
}
.form-input::placeholder { color: rgba(255,255,255,0.18); }
.form-input:focus {
  border-color: #7B5CFA;
  background: rgba(123,92,250,0.06);
}

/* Submit button */
.submit-btn {
  display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  width: 100%; padding: 0.875rem;
  background: #7B5CFA; color: #fff;
  border: 1px solid rgba(167,139,250,0.3);
  border-radius: 12px;
  font-size: 0.9rem; font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  margin-top: 0.25rem;
}
.submit-btn:hover:not(:disabled) {
  background: #A78BFA;
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(123,92,250,0.3);
}
.submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

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