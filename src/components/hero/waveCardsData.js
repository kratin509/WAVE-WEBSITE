import card1 from '../../assets/cards/card1_ananv.png'
import card3 from '../../assets/cards/card3_saanvi.png'
import card4 from '../../assets/cards/card4_tanvi.png'
import card5 from '../../assets/cards/card5_kiara.png'

// Right-hand cluster, roughly aligned in one row like the reference (small
// left, large hero center, small right) - kept well clear of the ~53%-wide
// copy column so nothing (cards or their annotations) ever crosses it.
export const WAVE_CARDS = [
  {
    img: card1,
    alt: 'UGC creator - "best thing I\'ve bought this year"',
    left: 55,
    top: 47,
    rotate: -6,
    scale: 0.68,
    blur: 0,
    opacity: 0.92,
    z: 22,
    bob: 5.2,
    annotation: { text: 'Authentic content', side: 'right', vertical: 'below' },
  },
  {
    img: card3,
    alt: 'UGC creator - "finally found a matcha that hits", the winning hook',
    left: 72,
    top: 28,
    rotate: -5,
    scale: 1.15,
    blur: 0,
    opacity: 1,
    z: 40,
    bob: 5,
    hero: true,
    annotation: { text: 'Real creators', side: 'left' },
  },
  {
    img: card5,
    alt: 'UGC creator - "holy grail" skincare',
    left: 90,
    top: 22,
    rotate: 4,
    scale: 0.58,
    blur: 0,
    opacity: 0.9,
    z: 24,
    bob: 6,
    annotation: { text: 'Actual results', side: 'right' },
  },
]

// Mobile: text runs full-width and stacks tall, so cards are kept small,
// unannotated, and entirely below the copy block.
export const WAVE_CARDS_MOBILE = [
  {
    img: card4,
    alt: 'UGC creator - "this is your sign"',
    left: 24,
    top: 78,
    rotate: -8,
    scale: 0.6,
    blur: 0,
    opacity: 0.95,
    z: 24,
    bob: 4.5,
  },
  {
    img: card3,
    alt: 'UGC creator - "finally found a matcha that hits"',
    left: 70,
    top: 82,
    rotate: 6,
    scale: 0.68,
    blur: 0,
    opacity: 1,
    z: 26,
    bob: 5,
  },
]
