// Real recommendations, carried over from the previous ClientStory section.
//
// Two fields, deliberately. `quote` is the complete text as written and is what
// /recommendation renders. `excerpt` is what the three homepage teasers render:
// one contiguous, verbatim passage lifted from that same quote, short enough to
// sit in a card whole.
//
// The teasers used to be the full quote under a four-line CSS clamp, which cut
// them mid-word ("...adds gre...") and read as a rendering fault rather than an
// edit. Choosing the cut here instead means the card always ends on a finished
// thought.
//
// Rules for an excerpt, if you add one: copy it character-for-character from
// `quote`, and take a single unbroken run of sentences. Do not stitch together
// passages that are not adjacent in the original — that puts words next to each
// other the recommender never put next to each other.
export const recommendations = [
  {
    quote:
      "I had the chance to work with Julia, and she is a very good developer and a hardworking team member. She also has a strong eye for design, which adds great value to her work. She is easy to work with, listens well, and communicates effectively with the team. Julia is also a fast learner. One thing I appreciate about her is that she doesn't settle for less and always aims to deliver quality work.",
    excerpt:
      "One thing I appreciate about her is that she doesn't settle for less and always aims to deliver quality work.",
    initials: 'CT',
    name: 'Celine Terrado',
    role: 'wordpress developer · coreproc',
  },
  {
    quote:
      'Julia is a pleasure to work with. She’s friendly, easy to collaborate with, and communicates clearly, which makes teamwork smooth and efficient. Her positive attitude really helps create a great working environment.',
    excerpt:
      'She’s friendly, easy to collaborate with, and communicates clearly, which makes teamwork smooth and efficient.',
    initials: 'KM',
    name: 'Keith Mercado',
    role: 'ui/ux engineer · coreproc',
  },
  {
    quote:
      "Working with Julia was a great experience. Her designs are clean, modern, and well thought-out, and her frontend skills back them up perfectly. She's eager to learn and quick to adapt — exactly the kind of developer you want on a project. Highly recommend!",
    excerpt:
      'Her designs are clean, modern, and well thought-out, and her frontend skills back them up perfectly.',
    initials: 'AR',
    name: 'Adrian Ramirez',
    role: 'web developer · new media services',
  },
  {
    quote:
      'We had the opportunity to have Julia as an intern, and I must say, her performance during the time she spent with us was exceptional. She is incredibly dedicated and consistently delivered great results. Beyond her work, Julia was a joy to have on the team. Her cheerful, easygoing nature and open-minded approach made her a perfect fit.',
    excerpt:
      'She is incredibly dedicated and consistently delivered great results.',
    initials: 'CM',
    name: 'Chambelynne Malubay',
    role: 'it project manager · new media services',
  },
  {
    quote:
      "Her ability to code what she designs is incredibly rare. We didn't need to relay specs to a developer — she handled the entire design-to-code pipeline herself. Saved us weeks.",
    excerpt: 'Her ability to code what she designs is incredibly rare.',
    initials: 'JB',
    name: 'Justin Barnes',
    role: 'software engineer · live stream effort',
  },
  {
    quote:
      "As the backend developer on the project, I appreciated Julia's clear communication and attention to technical details. She asked thoughtful questions, and her frontend work integrated seamlessly with our backend.",
    excerpt:
      'She asked thoughtful questions, and her frontend work integrated seamlessly with our backend.',
    initials: 'QD',
    name: 'Quan Doan',
    role: 'backend developer · live stream effort',
  },
]

export default recommendations
