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
// amplitude grows toward the front layer, matching the brief's "lighter
// tone at the top, deeper tone near the bottom" direction. Wavelengths are
// close to a full viewport width, so each layer reads as a couple of big,
// dramatically uneven swells rather than many small evenly spaced repeats
// - large peaks, deep valleys, no two crests alike.
//
// Colors here are deliberately muted/desaturated hex values dedicated to
// the wave band, not the vivid --color-wave-* brand tokens used elsewhere
// (CTA button, headline accent) - keeps the hero calm while those accents
// stay punchy.
const LAYER_DEFS = [
  {
    id: 'l1',
    color: '#f1ddc9',
    wavelength: 1500,
    amplitude: 50,
    baseline: 70,
    duration: 40,
    bobDuration: 10,
    bobAmount: 6,
    parallax: 6,
    seed: 0.5,
    opacity: 1,
  },
  {
    id: 'l2',
    color: '#e6bd94',
    wavelength: 1150,
    amplitude: 72,
    baseline: 130,
    duration: 30,
    bobDuration: 8,
    bobAmount: 7,
    parallax: 9,
    seed: 2.3,
    opacity: 1,
  },
  {
    id: 'l3',
    color: '#d99a6c',
    wavelength: 900,
    amplitude: 95,
    baseline: 210,
    duration: 22,
    bobDuration: 7,
    bobAmount: 8,
    parallax: 13,
    seed: 4.1,
    opacity: 1,
  },
  {
    id: 'l4',
    color: '#c97a4e',
    wavelength: 700,
    amplitude: 118,
    baseline: 320,
    duration: 16,
    bobDuration: 6,
    bobAmount: 9,
    parallax: 18,
    seed: 6.4,
    opacity: 1,
  },
]

const BAND_HEIGHT = 540

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
