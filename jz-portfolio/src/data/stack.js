// Grouped chip rows. Counts are derived from `items.length` wherever they are
// shown, so adding a tool here can never leave a stale number on the page.
export const stack = [
  {
    label: 'Design',
    items: ['Figma', 'Elementor', 'Webflow', 'Photoshop', 'Canva'],
  },
  {
    // HTML, CSS and JavaScript are one entry, not three. Counted separately
    // they pad the total with things every frontend role assumes you have, and
    // list a language next to the frameworks written in it as if they were
    // peers.
    label: 'Development',
    items: ['Vue', 'React', 'Nuxt', 'Reka UI', 'Tailwind', 'HTML/CSS/JS'],
  },
  {
    label: 'AI Tools',
    items: ['Claude Code', 'ChatGPT', 'Microsoft Copilot', 'Gemini', 'GitHub Copilot'],
  },
]

export const stackTotal = stack.reduce((sum, group) => sum + group.items.length, 0)

export default stack
