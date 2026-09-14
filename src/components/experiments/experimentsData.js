import hookA from '../../assets/experiments/hookA.jpg'
import hookB from '../../assets/experiments/hookB.jpg'
import hookC from '../../assets/experiments/hookC.jpg'
import hookD from '../../assets/experiments/hookD.jpg'
import hookE from '../../assets/experiments/hookE.jpg'
import hookF from '../../assets/experiments/hookF.jpg'
import hookG from '../../assets/experiments/hookG.jpg'
import hookH from '../../assets/experiments/hookH.jpg'
import hookI from '../../assets/experiments/hookI.jpg'

// Illustrative demo data — not real campaign results.
export const CATEGORIES = ['All', 'Problem', 'POV', 'Tutorial', 'Before/After', 'Lifestyle', 'Testimonial']

export const HOOKS = [
  {
    letter: 'A',
    label: 'Problem first',
    category: 'Problem',
    caption: 'Finally, a shopping app that gets me.',
    views: '12K',
    img: hookA,
  },
  {
    letter: 'B',
    label: 'Relatable POV',
    category: 'POV',
    caption: "POV: you've opened 7 apps and still can't decide",
    views: '84K',
    img: hookB,
  },
  {
    letter: 'C',
    label: 'Result driven',
    category: 'Tutorial',
    caption: 'how I find what I actually want in 30 seconds',
    views: '4.2M',
    img: hookC,
    winner: true,
  },
  {
    letter: 'D',
    label: 'Feature reaction',
    category: 'POV',
    caption: 'wait... it compares everything for you?',
    views: '9K',
    img: hookD,
  },
  {
    letter: 'E',
    label: 'Switch story',
    category: 'Testimonial',
    caption: '3 reasons I switched to this',
    views: '120K',
    img: hookE,
  },
  {
    letter: 'F',
    label: 'Before / after',
    category: 'Before/After',
    caption: 'things that made shopping way easier',
    views: '37K',
    img: hookF,
  },
  {
    letter: 'G',
    label: 'Lifestyle angle',
    category: 'Lifestyle',
    caption: 'POV: your new shopping obsession',
    views: '66K',
    img: hookG,
  },
  {
    letter: 'H',
    label: 'Problem focused',
    category: 'Problem',
    caption: 'stop buying things at full price.',
    views: '18K',
    img: hookH,
  },
  {
    letter: 'I',
    label: 'Tutorial angle',
    category: 'Tutorial',
    caption: 'the shopping hack I wish I knew earlier',
    views: '52K',
    img: hookI,
  },
]

export const WINNER = HOOKS.find((h) => h.winner)
