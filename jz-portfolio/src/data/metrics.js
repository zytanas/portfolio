import { stackTotal } from './stack'

// Only the entries with a `href` render as links, and only those get the arrow.
export const metrics = [
  { value: '2023', label: 'shipping since', href: '#experience' },
  { value: String(stackTotal), label: 'tools in stack', href: '#stack' },
  { value: '2', label: 'disciplines, 1 person' },
  { value: 'PH', label: 'remote · gmt+8' },
]

export default metrics
