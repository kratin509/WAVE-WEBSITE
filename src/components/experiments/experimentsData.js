// Illustrative demo data — not real campaign results. Swap in real creator
// stills as `img` per hook once assets land; cards render a styled
// placeholder frame until then.
export const CATEGORIES = ['All', 'Problem', 'POV', 'Tutorial', 'Before/After', 'Lifestyle', 'Testimonial']

export const HOOKS = [
  {
    letter: 'A',
    label: 'Problem first',
    category: 'Problem',
    caption: 'wait, why did nobody tell me about this',
    views: '12K',
    tone: 'dark',
  },
  {
    letter: 'B',
    label: 'Relatable POV',
    category: 'POV',
    caption: 'POV: you finally found the one',
    views: '84K',
    tone: 'dark',
  },
  {
    letter: 'C',
    label: 'Result driven',
    category: 'Testimonial',
    caption: 'this actually changed my routine',
    views: '4.2M',
    tone: 'dark',
    winner: true,
  },
  {
    letter: 'D',
    label: 'Tutorial angle',
    category: 'Tutorial',
    caption: '3 things I wish I knew sooner',
    views: '9K',
    tone: 'light',
  },
  {
    letter: 'E',
    label: 'Before / after',
    category: 'Before/After',
    caption: 'before vs. after, no filter',
    views: '120K',
    tone: 'dark',
  },
  {
    letter: 'F',
    label: 'Lifestyle angle',
    category: 'Lifestyle',
    caption: 'my new non-negotiable',
    views: '37K',
    tone: 'light',
  },
  {
    letter: 'G',
    label: 'Creator testimony',
    category: 'Testimonial',
    caption: 'okay but why is this so good',
    views: '66K',
    tone: 'dark',
  },
  {
    letter: 'H',
    label: 'Unfiltered POV',
    category: 'POV',
    caption: 'not sponsored, just obsessed',
    views: '21K',
    tone: 'dark',
  },
  {
    letter: 'I',
    label: 'Problem focused',
    category: 'Problem',
    caption: "the fix I didn't know I needed",
    views: '19K',
    tone: 'light',
  },
]

export const WINNER = HOOKS.find((h) => h.winner)
