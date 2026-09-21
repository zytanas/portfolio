// Grouped chip rows. Counts are derived from `items.length` wherever they are
// shown, so adding a tool here can never leave a stale number on the page.
export const stack = [
  {
    label: 'Design',
    // `cat` is the short tag the flat grid prints next to each tool. The full
    // `label` is too long to sit in a 150px cell beside the name.
    cat: 'design',
    items: ['Figma', 'Elementor', 'Webflow', 'Photoshop', 'Canva'],
  },
  {
    // HTML, CSS and JavaScript are one entry, not three. Counted separately
    // they pad the total with things every frontend role assumes you have, and
    // list a language next to the frameworks written in it as if they were
    // peers.
    label: 'Development',
    cat: 'dev',
    items: ['Vue', 'React', 'Nuxt', 'Reka UI', 'Tailwind', 'HTML/CSS/JS'],
  },
  {
    label: 'AI Tools',
    cat: 'ai',
    items: ['Claude Code', 'ChatGPT', 'Microsoft Copilot', 'Gemini', 'GitHub Copilot'],
  },
]

export const stackTotal = stack.reduce((sum, group) => sum + group.items.length, 0)

/* Flattened for the spotlight grid, which lays every tool out in one run
   instead of grouped rows. Derived rather than re-listed, so the two views can
   never disagree about what is in the stack. */
export const stackFlat = stack.flatMap((group) =>
  group.items.map((name) => ({ name, cat: group.cat })),
)

export default stack
