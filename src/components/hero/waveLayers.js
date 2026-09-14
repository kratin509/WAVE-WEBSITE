// Builds a seamlessly-tileable, deliberately UNEVEN wave silhouette as an
// SVG path: a few harmonics of the tile's fundamental wavelength summed
// together (each an integer multiple, so the whole thing still tiles
// perfectly) so peaks vary in height and spacing instead of reading as one
// mechanical repeating sine. The layer is rendered at 200% width and
// looped by translating -50% of its own box, landing on an identical
// frame every cycle - no visible jump despite the irregular silhouette.
function buildTilePath({ wavelength, amplitude, baseline, bandHeight, seed = 0, step = 10 }) {
  const width = wavelength * 2
  const harmonics = [
    { k: 1, a: 1, phase: seed },
    { k: 2, a: 0.42, phase: seed * 1.7 + 1.1 },
    { k: 3, a: 0.22, phase: seed * 0.6 + 2.4 },
    { k: 5, a: 0.12, phase: seed * 2.3 + 0.5 },
  ]
  const points = []
  for (let x = 0; x <= width; x += step) {
    let y = baseline
    for (const h of harmonics) {
      y += Math.sin((x / wavelength) * Math.PI * 2 * h.k + h.phase) * amplitude * h.a
    }
    points.push(`${x},${y.toFixed(1)}`)
  }
  return `M ${points.join(' L ')} L ${width},${bandHeight} L 0,${bandHeight} Z`
}

// back → front. baseline rises (lower number = higher up = further back),
// amplitude + saturation grow toward the front layer, matching the brief's
// "lighter peach at the top, stronger orange near the bottom" direction.
const LAYER_DEFS = [
  {
    id: 'l1',
    color: 'var(--color-wave-peach-light)',
    wavelength: 540,
    amplitude: 20,
    baseline: 70,
    duration: 34,
    bobDuration: 9,
    bobAmount: 4,
    parallax: 6,
    seed: 0.4,
    opacity: 1,
  },
  {
    id: 'l2',
    color: 'var(--color-wave-peach)',
    wavelength: 440,
    amplitude: 29,
    baseline: 145,
    duration: 25,
    bobDuration: 7.5,
    bobAmount: 5,
    parallax: 9,
    seed: 2.1,
    opacity: 1,
  },
  {
    id: 'l3',
    color: 'var(--color-wave-orange)',
    wavelength: 370,
    amplitude: 36,
    baseline: 220,
    duration: 19,
    bobDuration: 6.5,
    bobAmount: 6,
    parallax: 13,
    seed: 3.6,
    opacity: 1,
  },
  {
    id: 'l4',
    color: 'var(--color-wave-orange-deep)',
    wavelength: 310,
    amplitude: 44,
    baseline: 305,
    duration: 14,
    bobDuration: 5.5,
    bobAmount: 7,
    parallax: 18,
    seed: 5.2,
    opacity: 1,
  },
]

const BAND_HEIGHT = 400

export function getWaveLayers({ mobile = false } = {}) {
  const ampScale = mobile ? 0.55 : 1
  return LAYER_DEFS.map((layer) => ({
    ...layer,
    d: buildTilePath({
      wavelength: layer.wavelength,
      amplitude: layer.amplitude * ampScale,
      baseline: layer.baseline,
      bandHeight: BAND_HEIGHT,
      seed: layer.seed,
    }),
    viewBoxWidth: layer.wavelength * 2,
    viewBoxHeight: BAND_HEIGHT,
  }))
}

export const BACK_LAYER_IDS = ['l1', 'l2']
export const FRONT_LAYER_IDS = ['l3', 'l4']
