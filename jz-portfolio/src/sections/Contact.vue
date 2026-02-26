<template>
  <section id="contact" class="relative px-6 py-20 overflow-hidden">
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

      <!-- ── SECTION HEADER ── -->
      <div class="flex items-end justify-between pb-6 mb-16 section-header-border">
        <div>
          <p class="section-eyebrow">// contact</p>
          <h2 class="section-title font-heading">
            Get In<br /><span class="text-[#FF6668]">Touch</span>
          </h2>
        </div>
        <div class="hidden text-right md:block">
          <div class="project-count-bg">Hi!</div>
          <p class="mt-1 font-mono text-xs tracking-widest uppercase text-white/40">let's connect</p>
        </div>
      </div>

      <!-- ── GROUP LABEL ── -->
      <div class="flex items-center gap-3 mb-6">
        <div class="group-dot bg-[#FF6668]"></div>
        <span class="group-label-text">Send me a message</span>
        <div class="flex-1 h-px group-line"></div>
      </div>

      <!-- ── TWO COLUMN LAYOUT ── -->
      <div class="grid items-start gap-5 md:grid-cols-2">

        <!-- LEFT — Contact Info -->
        <div class="flex flex-col about-card rounded-2xl p-7 gap-7">
          <div>
            <h3 class="text-xl font-bold text-[#FF6668] font-heading mb-2">Let's Work Together</h3>
            <p class="text-sm leading-relaxed text-white font-body">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </div>

          <!-- Contact Items -->
          <div class="flex flex-col gap-5">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-[#FF6668]/15 flex items-center justify-center">
                <Mail class="w-4 h-4 text-[#FF6668]" />
              </div>
              <div>
                <p class="text-xs font-mono text-[#FF6668] tracking-widest uppercase mb-1">Email</p>
                <a
                  href="mailto:juliazyrene23@gmail.com"
                  class="text-sm text-white hover:text-[#FF6668] transition-colors duration-200 font-body"
                >
                  juliazyrene23@gmail.com
                </a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-[#FF6668]/15 flex items-center justify-center">
                <Phone class="w-4 h-4 text-[#FF6668]" />
              </div>
              <div>
                <p class="text-xs font-mono text-[#FF6668] tracking-widest uppercase mb-1">Phone</p>
                <a
                  href="tel:09565595721"
                  class="text-sm text-white hover:text-[#FF6668] transition-colors duration-200 font-body"
                >
                  09565595721
                </a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-[#FF6668]/15 flex items-center justify-center">
                <MapPin class="w-4 h-4 text-[#FF6668]" />
              </div>
              <div>
                <p class="text-xs font-mono text-[#FF6668] tracking-widest uppercase mb-1">Location</p>
                <p class="text-sm text-white font-body">Baguio City, Philippines</p>
              </div>
            </div>
          </div>

          <!-- Divider -->
          <div class="h-px bg-[#FF6668]/15"></div>

          <!-- Socials -->
          <div>
            <p class="mb-4 font-mono text-xs tracking-widest text-white uppercase">Follow me on</p>
            <div class="flex gap-3">
              <a
                v-for="social in socials"
                :key="social.name"
                :href="social.url"
                target="_blank"
                :title="social.name"
                class="social-btn group"
              >
                <component :is="social.icon" class="w-4 h-4 transition-colors duration-200 text-white/50 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        <!-- RIGHT — Contact Form -->
        <div class="about-card rounded-2xl p-7">
          <h3 class="text-xl font-bold text-[#FF6668] font-heading mb-6">Send a Message</h3>

          <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
            <div>
              <label for="name" class="block mb-2 font-mono text-xs tracking-widest text-white uppercase">Your Name</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                required
                placeholder="Juan Dela Cruz"
                class="form-input"
              />
            </div>

            <div>
              <label for="email" class="block mb-2 font-mono text-xs tracking-widest text-white uppercase">Your Email</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                required
                placeholder="juandelacruz@example.com"
                class="form-input"
              />
            </div>

            <div>
              <label for="message" class="block mb-2 font-mono text-xs tracking-widest text-white uppercase">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="5"
                placeholder="Tell me about your project..."
                class="resize-none form-input"
              ></textarea>
            </div>

            <button
              type="submit"
              class="flex items-center justify-center w-full gap-2 py-3 text-sm font-semibold transition-all duration-300 submit-btn rounded-xl font-body"
            >
              Send Message
              <Send class="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { Mail, Phone, MapPin, Linkedin, Github, Send } from 'lucide-vue-next'

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const socials = [
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/almoitejuliazyrene/' },
  { name: 'GitHub', icon: Github, url: 'https://github.com/zytanas' },
]

const handleSubmit = () => {
  console.log('Form submitted:', form)
  alert('Thank you for your message! I will get back to you soon.')
  form.name = ''
  form.email = ''
  form.message = ''
}
</script>

<style scoped>
/* ── SECTION HEADER ── */
.section-header-border {
  border-bottom: 1px solid rgba(255, 102, 104, 0.18);
}

.section-eyebrow {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #FF6668;
  margin-bottom: 10px;
}

.section-title {
  font-size: clamp(42px, 5vw, 72px);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: 0.01em;
  color: #fff;
}

.project-count-bg {
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
  color: #FF6668;
  opacity: 0.2;
}

/* ── GROUP LABELS ── */
.group-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.group-label-text {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  white-space: nowrap;
}

.group-line {
  background: rgba(255, 102, 104, 0.15);
}

/* ── CARDS ── */
.about-card {
  background: rgba(255, 102, 104, 0.08);
  border: 1px solid rgba(255, 102, 104, 0.2);
  transition: border-color 0.3s ease, background 0.3s ease;
}

.about-card:hover {
  border-color: rgba(255, 102, 104, 0.38);
  background: rgba(255, 102, 104, 0.11);
}

/* ── FORM INPUTS ── */
.form-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 102, 104, 0.2);
  border-radius: 10px;
  padding: 10px 14px;
  color: #fff;
  font-family: inherit;
  font-size: 14px;
  transition: border-color 0.2s ease, background 0.2s ease;
  outline: none;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.2);
}

.form-input:focus {
  border-color: #FF6668;
  background: rgba(255, 102, 104, 0.08);
}

/* ── SUBMIT BUTTON ── */
.submit-btn {
  background: #FF6668;
  color: #fff;
  border: 1px solid #FF6668;
}

.submit-btn:hover {
  background: transparent;
  color: #FF6668;
}

/* ── SOCIAL BUTTONS ── */
.social-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 102, 104, 0.08);
  border: 1px solid rgba(255, 102, 104, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.social-btn:hover {
  background: #FF6668;
  border-color: #FF6668;
  transform: translateY(-2px);
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