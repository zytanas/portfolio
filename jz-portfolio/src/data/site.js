/* Everything the unfurlers need, in one place.

   Open Graph and Twitter both require absolute URLs — a relative /og.png is
   silently dropped by every crawler that reads it — so every URL on the page
   is built from SITE_URL rather than written out by hand. Moving to a custom
   domain is this one line.

   VITE_SITE_URL overrides it, which is what Netlify deploy previews should
   set; without the override a preview would advertise the production URL as
   its canonical and ask Google to index the wrong host. */
export const SITE_URL = (import.meta.env?.VITE_SITE_URL || 'https://juliaalmoite.netlify.app')
  // a trailing slash here doubles every slash downstream
  .replace(/\/+$/, '')

export const SITE_NAME = 'Julia Almoite'
export const SITE_TITLE = 'Julia Almoite — UI/UX Engineer'
export const SITE_DESCRIPTION =
  'Julia Almoite — UI/UX engineer and frontend developer. Need a design? Done. Need it built? Also me. Design systems, Vue, React, Nuxt, Tailwind.'

/* Regenerate with `npm run og-image`. The query string is a cache-buster:
   LinkedIn and Slack cache a preview image against its URL more or less
   forever, so a redesigned card at the same path never reaches anyone who has
   already unfurled the link. Bump it when the artwork changes. */
export const OG_IMAGE = '/og-image.png?v=1'
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630
export const OG_IMAGE_ALT = 'Julia Almoite — UI/UX Engineer'

export const absolute = (path) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
