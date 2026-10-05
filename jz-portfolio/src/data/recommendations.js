// Real recommendations, carried over from the previous ClientStory section.
//
// One field: `quote`, the complete text as written. /recommendation renders it
// whole; the three homepage teasers render it from the start through `teaser`
// below, which trails off if it runs long. Add a recommendation by adding its
// quote — there is nothing to curate by hand.
//
// Order matters: the homepage teases the first three, in this order, so moving
// an entry up or down changes which three the landing page shows and where.

/* The homepage cards used to show a hand-picked excerpt, which meant the reader
   saw an edited sentence rather than the recommendation. They now open with the
   real text and end in an ellipsis when there is more, which is what sends them
   to /recommendation.

   The cut is made here rather than with a CSS line clamp because a clamp breaks
   mid-word ("...adds gre...") and reads as a rendering fault. This lands on a
   word boundary and takes any trailing punctuation with it, so the text never
   reads "work,…".

   150 characters is four lines at the narrowest the three-up row gets (a card
   fits roughly 37 characters per line there). Budgeting for the narrow case
   means the cards stay four lines at every width rather than growing to five
   or six as the row tightens. RecommendationCard backs this with a four-line
   clamp for the fonts and widths this estimate cannot predict. */
const TEASER_MAX = 150

export function teaser(quote) {
  if (quote.length <= TEASER_MAX) return quote
  const cut = quote.slice(0, TEASER_MAX)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.—–-]+$/, '')}…`
}

export const recommendations = [
  {
    quote:
      "I had the chance to work with Julia, and she is a very good developer and a hardworking team member. She also has a strong eye for design, which adds great value to her work. She is easy to work with, listens well, and communicates effectively with the team. Julia is also a fast learner. One thing I appreciate about her is that she doesn't settle for less and always aims to deliver quality work.",
    name: 'Celine Terrado',
    role: 'wordpress developer · coreproc',
  },
  {
    quote:
      "Her ability to code what she designs is incredibly rare. We didn't need to relay specs to a developer — she handled the entire design-to-code pipeline herself. Saved us weeks.",
    name: 'Justin Barnes',
    role: 'software engineer · live stream effort',
  },
  {
    quote:
      'Julia is a pleasure to work with. She’s friendly, easy to collaborate with, and communicates clearly, which makes teamwork smooth and efficient. Her positive attitude really helps create a great working environment.',
    name: 'Keith Mercado',
    role: 'ui/ux engineer · coreproc',
  },
  {
    quote:
      "Working with Julia was a great experience. Her designs are clean, modern, and well thought-out, and her frontend skills back them up perfectly. She's eager to learn and quick to adapt — exactly the kind of developer you want on a project. Highly recommend!",
    name: 'Adrian Ramirez',
    role: 'web developer · new media services',
  },
  {
    quote:
      'We had the opportunity to have Julia as an intern, and I must say, her performance during the time she spent with us was exceptional. She is incredibly dedicated and consistently delivered great results. Beyond her work, Julia was a joy to have on the team. Her cheerful, easygoing nature and open-minded approach made her a perfect fit.',
    name: 'Chambelynne Malubay',
    role: 'it project manager · new media services',
  },
  {
    quote:
      "As the backend developer on the project, I appreciated Julia's clear communication and attention to technical details. She asked thoughtful questions, and her frontend work integrated seamlessly with our backend.",
    name: 'Quan Doan',
    role: 'backend developer · live stream effort',
  },
]

export default recommendations
