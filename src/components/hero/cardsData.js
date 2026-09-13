import card1 from '../../assets/cards/card1_ananv.png'
import card2 from '../../assets/cards/card2_aryan.png'
import card3 from '../../assets/cards/card3_saanvi.png'
import card4 from '../../assets/cards/card4_tanvi.png'
import card5 from '../../assets/cards/card5_kiara.png'

const SOURCE = [
  { img: card1, alt: 'UGC creator holding a drink — "best thing I\'ve bought this year"' },
  { img: card2, alt: 'UGC creator outdoors — 2.1M views' },
  { img: card3, alt: 'UGC creator — "finally found a matcha that hits"' },
  { img: card4, alt: 'UGC creator — "this is your sign"' },
  { img: card5, alt: 'UGC creator — "holy grail" skincare' },
]

// far -> mid -> near, distributed across the flow so the same handful of
// supplied assets read as a busy, varied current rather than a repeated loop.
export const LANES = [
  {
    id: 'far',
    depth: 0.55,
    blur: 5,
    speedRange: [30, 38],
    cards: [SOURCE[1], SOURCE[3], SOURCE[0]],
  },
  {
    id: 'mid',
    depth: 0.82,
    blur: 1.5,
    speedRange: [22, 28],
    cards: [SOURCE[4], SOURCE[0], SOURCE[2]],
  },
  {
    id: 'near',
    depth: 1.15,
    blur: 0,
    speedRange: [15, 20],
    cards: [SOURCE[2], SOURCE[4], SOURCE[1]],
  },
]
