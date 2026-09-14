// Builds a seamlessly-tileable repeating sine-wave silhouette as an SVG path.
// The path covers exactly TWO wavelengths; the layer is then rendered at
// 200% width and looped by translating -50% of its own box, which lands
// on an identical frame every cycle (no visible jump).
function buildTilePath({ wavelength, amplitude, baseline, bandHeight, step = 12 }) {
  const width = wavelength * 2
  const points = []
  for (let x = 0; x <= width; x += step) {
    const y = baseline + Math.sin((x / wavelength) * Math.PI * 2) * amplitude
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
    wavelength: 460,
    amplitude: 16,
    baseline: 70,
    duration: 32,
    bobDuration: 9,
    bobAmount: 4,
    parallax: 6,
    opacity: 1,
  },
  {
    id: 'l2',
    color: 'var(--color-wave-peach)',
    wavelength: 380,
    amplitude: 24,
    baseline: 140,
    duration: 24,
    bobDuration: 7.5,
    bobAmount: 5,
    parallax: 9,
    opacity: 1,
  },
  {
    id: 'l3',
    color: 'var(--color-wave-orange)',
    wavelength: 320,
    amplitude: 30,
    baseline: 215,
    duration: 18,
    bobDuration: 6.5,
    bobAmount: 6,
    parallax: 13,
    opacity: 1,
  },
  {
    id: 'l4',
    color: 'var(--color-wave-orange-deep)',
    wavelength: 270,
    amplitude: 38,
    baseline: 300,
    duration: 13,
    bobDuration: 5.5,
    bobAmount: 7,
    parallax: 18,
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
    }),
    viewBoxWidth: layer.wavelength * 2,
    viewBoxHeight: BAND_HEIGHT,
  }))
}

export const BACK_LAYER_IDS = ['l1', 'l2']
export const FRONT_LAYER_IDS = ['l3', 'l4']
