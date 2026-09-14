import card1 from '../../assets/cards/card1_ananv.png'
import card2 from '../../assets/cards/card2_aryan.png'
import card3 from '../../assets/cards/card3_saanvi.png'
import card4 from '../../assets/cards/card4_tanvi.png'
import card5 from '../../assets/cards/card5_kiara.png'

// Hand-placed along the ribbon's centerline (bottom-left → top-right) so
// each card visibly rides the wave rather than floating at random. Position
// is a % of the hero box; rotate roughly matches the ribbon's local slope.
// Nothing sits left of ~40% - that column belongs to the copy.
export const WAVE_CARDS = [
  {
    img: card1,
    alt: 'UGC creator - "best thing I\'ve bought this year"',
    left: 41,
    top: 80,
    rotate: -8,
    scale: 0.55,
    blur: 1,
    opacity: 0.75,
    z: 10,
    bob: 5.2,
  },
  {
    img: card2,
    alt: 'UGC creator outdoors - 2.1M views',
    left: 51,
    top: 60,
    rotate: -11,
    scale: 0.66,
    blur: 0.5,
    opacity: 0.88,
    z: 15,
    bob: 4.6,
  },
  {
    img: card4,
    alt: 'UGC creator - "this is your sign"',
    left: 61,
    top: 45,
    rotate: -13,
    scale: 0.74,
    blur: 0,
    opacity: 0.95,
    z: 20,
    bob: 4.2,
  },
  {
    img: card3,
    alt: 'UGC creator - "finally found a matcha that hits", the winning hook',
    left: 75,
    top: 24,
    rotate: -6,
    scale: 1.15,
    blur: 0,
    opacity: 1,
    z: 40,
    bob: 5,
    hero: true,
  },
  {
    img: card5,
    alt: 'UGC creator - "holy grail" skincare',
    left: 89,
    top: 15,
    rotate: -3,
    scale: 0.56,
    blur: 1.2,
    opacity: 0.75,
    z: 12,
    bob: 6,
  },
]

// Mobile: text runs full-width and stacks tall, so cards are kept small and
// entirely below the copy block rather than sharing the same columns.
export const WAVE_CARDS_MOBILE = [
  {
    img: card4,
    alt: 'UGC creator - "this is your sign"',
    left: 22,
    top: 86,
    rotate: -8,
    scale: 0.62,
    blur: 0,
    opacity: 0.95,
    z: 20,
    bob: 4.5,
  },
  {
    img: card3,
    alt: 'UGC creator - "finally found a matcha that hits"',
    left: 70,
    top: 90,
    rotate: 6,
    scale: 0.7,
    blur: 0,
    opacity: 1,
    z: 15,
    bob: 5,
  },
]
