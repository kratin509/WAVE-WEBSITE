import card3 from '../../assets/cards/card3_saanvi.png'
import card4 from '../../assets/cards/card4_tanvi.png'
import card5 from '../../assets/cards/card5_kiara.png'

// Right-hand cluster: three smaller, row-aligned cards - a medium card on
// the left, a slightly larger hero card centered and a touch higher, and a
// small card on the right, so the trio reads as one tidy, symmetrical
// group rather than a scatter of oversized thumbnails. Nothing sits left
// of ~54% (or above ~32% for the tallest card) so cards and their
// annotations never cross the copy column or hide under the nav.
export const WAVE_CARDS = [
  {
    img: card4,
    alt: 'UGC creator - "this is your sign"',
    left: 58,
    top: 46,
    rotate: -5,
    vw: 10,
    maxW: 172,
    minW: 112,
    blur: 0,
    opacity: 0.95,
    z: 22,
    bob: 5.2,
    annotation: { text: 'Authentic content', side: 'right', vertical: 'below' },
  },
  {
    img: card3,
    alt: 'UGC creator - "finally found a matcha that hits", the winning hook',
    left: 74,
    top: 36,
    rotate: -2,
    vw: 12,
    maxW: 210,
    minW: 135,
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
    left: 89,
    top: 46,
    rotate: 4,
    vw: 8.5,
    maxW: 148,
    minW: 96,
    blur: 0,
    opacity: 0.95,
    z: 24,
    bob: 6,
    annotation: { text: 'Actual results', side: 'left', vertical: 'below', dx: -6, dy: 18 },
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
    vw: 9,
    maxW: 96,
    minW: 68,
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
    vw: 10,
    maxW: 108,
    minW: 76,
    blur: 0,
    opacity: 1,
    z: 26,
    bob: 5,
  },
]
