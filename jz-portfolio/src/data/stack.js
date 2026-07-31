// Grouped chip rows. Counts are derived from `items.length` wherever they are
// shown, so adding a tool here can never leave a stale number on the page.
export const stack = [
  {
    label: 'Design',
    items: ['Figma', 'Elementor', 'Webflow', 'Photoshop', 'Canva'],
  },
  {
    label: 'Development',
    items: ['Vue', 'React', 'Nuxt', 'Reka UI', 'Tailwind', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    label: 'AI Tools',
    items: ['ChatGPT', 'Claude', 'Microsoft Copilot', 'Gemini', 'GitHub Copilot'],
  },
]

export const stackTotal = stack.reduce((sum, group) => sum + group.items.length, 0)

export default stack
