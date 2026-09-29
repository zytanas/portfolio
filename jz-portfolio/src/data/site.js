/* Everything the unfurlers need, in one place.

   Open Graph and Twitter both require absolute URLs — a relative /og.png is
   silently dropped by every crawler that reads it — so every URL on the page
   is built from SITE_URL rather than written out by hand. Moving to a custom
   domain is this one line.

   VITE_SITE_URL overrides it, which is what Netlify deploy previews should
   set; without the override a preview would advertise the production URL as
   its canonical and ask Google to index the wrong host. */
/* Two reads, not one: `import.meta.env` is Vite's, and is undefined when this
   module is imported by a plain Node script (the sitemap generator, the
   prerender verifier), where the same variable arrives on process.env. */
export const SITE_URL = (
  import.meta.env?.VITE_SITE_URL ||
  globalThis.process?.env?.VITE_SITE_URL ||
  'https://juliaalmoite.netlify.app'
)
  // a trailing slash here doubles every slash downstream
  .replace(/\/+$/, '')

export const SITE_NAME = 'Julia Almoite'

/* The legal name, spelled out. Google matches a name query against the words
   actually on the page and in the structured data — "Julia Zyrene Almoite"
   could not rank for a page that never said it. It appears in the title, the
   description, the Person schema and the footer for that reason. */
export const FULL_NAME = 'Julia Zyrene Almoite'
export const NAME_VARIANTS = ['Julia Almoite', 'Julia Zyrene Almoite', 'Julia Z. Almoite']

export const JOB_TITLE = 'UI/UX Engineer'
export const SITE_TITLE = 'Julia Zyrene Almoite — UI/UX Engineer & Frontend Developer'
export const SITE_DESCRIPTION =
  'Portfolio of Julia Zyrene Almoite (Julia Almoite) — UI/UX engineer and frontend developer. Need a design? Done. Need it built? Also me. Design systems, Vue, React, Nuxt, Tailwind.'

/* sameAs is how a search engine reconciles two pages into one person. Without
   it the portfolio and the LinkedIn profile are unrelated documents that happen
   to share a name, and the one with the domain authority wins every time; with
   it they are the same entity, and this site is the one declaring itself the
   canonical home. Every profile that is genuinely hers belongs here — add new
   ones as they appear. */
export const PROFILES = [
  'https://www.linkedin.com/in/almoitejuliazyrene/',
  'https://github.com/zytanas',
]

export const EMAIL = 'juliazyrene23@gmail.com'

/* Regenerate with `npm run og-image`. The query string is a cache-buster:
   LinkedIn and Slack cache a preview image against its URL more or less
   forever, so a redesigned card at the same path never reaches anyone who has
   already unfurled the link. Bump it when the artwork changes. */
export const OG_IMAGE = '/og-image.png?v=1'
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630
export const OG_IMAGE_ALT = 'Julia Almoite — UI/UX Engineer'

export const absolute = (path) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

/* The routes that are prerendered, indexable and listed in the sitemap — one
   list, read by vite.config.js (includedRoutes), scripts/generate-sitemap.mjs
   and scripts/verify-prerender.mjs. Three copies of this would drift, and the
   symptom of drift is a page that exists but is never crawled.

   `priority` is a hint, not a ranking lever; the homepage leads because it is
   the page a name search should land on. */
export const INDEXABLE_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/selected-work', priority: '0.8', changefreq: 'monthly' },
  { path: '/recommendation', priority: '0.6', changefreq: 'yearly' },
]

/* ------------------------------------------------------------------
   Structured data.

   Plain meta tags describe a document; this describes a person. It is what
   lets Google treat the site as the home of an entity called "Julia Zyrene
   Almoite" rather than as another page containing those words — the
   prerequisite for the name query resolving here instead of only to LinkedIn.
   Emitted as one @graph so the WebSite, the page and the Person cross-
   reference each other by @id.
   ------------------------------------------------------------------ */

const PERSON_ID = `${SITE_URL}/#person`
const SITE_ID = `${SITE_URL}/#website`

/** @param {{title: string, description: string, url: string, image: string, isHome: boolean}} page */
export function jsonLd({ title, description, url, image, isHome }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: FULL_NAME,
        // Every form someone might type. givenName/familyName are separate
        // fields so the middle name does not get parsed as a surname.
        alternateName: NAME_VARIANTS.filter((n) => n !== FULL_NAME),
        givenName: 'Julia',
        additionalName: 'Zyrene',
        familyName: 'Almoite',
        jobTitle: JOB_TITLE,
        description: SITE_DESCRIPTION,
        url: `${SITE_URL}/`,
        image: absolute(OG_IMAGE),
        email: `mailto:${EMAIL}`,
        sameAs: PROFILES,
        knowsAbout: [
          'UI/UX Design',
          'Frontend Development',
          'Design Systems',
          'Vue.js',
          'React',
          'Nuxt',
          'Tailwind CSS',
          'Web Accessibility',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': SITE_ID,
        url: `${SITE_URL}/`,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: 'en',
        publisher: { '@id': PERSON_ID },
      },
      {
        // ProfilePage on the homepage: it is the page *about* the person, which
        // is the type Google reads when deciding which URL represents them.
        '@type': isHome ? 'ProfilePage' : 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        isPartOf: { '@id': SITE_ID },
        about: { '@id': PERSON_ID },
        primaryImageOfPage: image,
        inLanguage: 'en',
      },
    ],
  }
}
