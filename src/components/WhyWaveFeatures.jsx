import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '../lib/useReducedMotion'

const MISSION_HEADING = 'We made UGC into a consistent, high-performing growth channel.'

const BULLETS = [
  {
    title: 'Go viral',
    body: 'Get a constant stream of creators talking about your brand and create the conditions for breakout content.',
  },
  {
    title: 'Test more creative',
    body: 'Instead of betting on 5–10 ideas, test hundreds and let real audience behaviour tell you what works.',
  },
  {
    title: 'Lower CAC',
    body: 'Turn winning organic creative into a new acquisition channel and reduce your dependence on paid media.',
  },
]

function AnimatedWords({ text, reduced }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: '-100px' },
                transition: { duration: 0.5, delay: i * 0.035, ease: 'easeOut' },
              })}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </>
  )
}

// The signature Wave swirl - an exact, hand-authored reference path. Its
// numbers are never redrawn or approximated; the only thing allowed to
// change is where and how large it appears, via the similarity transform
// below (uniform scale + rotation + translation, plus a horizontal mirror
// so the sweep opens toward card one and closes toward card two, matching
// their alternating left/right layout - still no shear, no reshaping).
const WAVE_PATH_D =
  'M-180.79 1.30042C-163.471 65.6046 -110.061 102.919 -78.3233 105.455C-51.3324 107.612 -61.0037 65.4235 -78.3233 76.7446C-89.9026 84.3135 -103.169 118.769 -59.3715 133.984C-33.4678 142.984 -1.79041 130.815 -1.79041 130.815'
const WAVE_START = { x: -180.79, y: 1.30042 }
const WAVE_END = { x: -1.79041, y: 130.815 }
const WAVE_STROKE_WIDTH = 2.2337811386935087

// Solves for the unique similarity transform (uniform scale + rotation +
// translation) that carries the path's own start/end anchors onto two
// live-measured target points, so the exact reference geometry can be
// resized and repositioned to fit any section width/height without ever
// bending its proportions.
function waveTransform(targetStart, targetEnd) {
  const lv = { x: WAVE_END.x - WAVE_START.x, y: WAVE_END.y - WAVE_START.y }
  const tv = { x: targetEnd.x - targetStart.x, y: targetEnd.y - targetStart.y }
  const scale = Math.hypot(tv.x, tv.y) / Math.hypot(lv.x, lv.y)
  const rotation = Math.atan2(tv.y, tv.x) - Math.atan2(lv.y, lv.x)
  const cos = Math.cos(rotation)
  const sin = Math.sin(rotation)
  const a = scale * cos
  const b = scale * sin
  const c = -scale * sin
  const d = scale * cos
  const e = targetStart.x - a * WAVE_START.x - c * WAVE_START.y
  const f = targetStart.y - b * WAVE_START.x - d * WAVE_START.y
  return `matrix(${a} ${b} ${c} ${d} ${e} ${f})`
}

// The reference swirl scaled dramatically larger and threaded through the
// whole Mission section: it opens just below the heading at card one's
// edge, sweeps down through card one's image, loops through the negative
// space between the two feature rows, and closes past card two's image
// into the right margin - one continuous journey rather than a
// shortest-path connector. Anchors are measured live off the DOM so the
// sweep still lands correctly however the section reflows; below the
// breakpoint where the two feature rows stack single-column (md, 768px)
// there's no room left to sweep through without overlapping stacked text,
// so it's hidden instead.
function BackgroundWave({ sectionRef, reduced }) {
  const [geo, setGeo] = useState(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    function measure() {
      const sRect = section.getBoundingClientRect()
      const heading = section.querySelector('[data-anchor="mission-heading"]')
      const cards = section.querySelectorAll('[data-anchor="card"]')
      if (!heading || cards.length < 2 || sRect.width === 0) return
      const toLocal = (r) => ({
        left: r.left - sRect.left,
        right: r.right - sRect.left,
        top: r.top - sRect.top,
        bottom: r.bottom - sRect.top,
      })
      setGeo({
        width: sRect.width,
        height: sRect.height,
        heading: toLocal(heading.getBoundingClientRect()),
        c1: toLocal(cards[0].getBoundingClientRect()),
        c2: toLocal(cards[1].getBoundingClientRect()),
      })
    }

    measure()
    document.fonts?.ready?.then(measure)
    const ro = new ResizeObserver(measure)
    ro.observe(section)
    return () => ro.disconnect()
  }, [sectionRef])

  // Draws forward as the section scrolls through view and retracts on the
  // way back up - a live scroll-position mapping, not a one-shot trigger.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const drawProgress = useTransform(scrollYProgress, [0.05, 0.85], [0, 1])

  if (!geo || geo.width < 768) return null

  // Card one's own left edge - the reference unit for how close to the
  // heading's centered text the opening sweep can sit without crossing it.
  const cl = geo.c1.left

  // Path start opens just below the mission heading - never inside its
  // text block - right at card one's edge, so the big first sweep crosses
  // straight into card one's image (text sits on the far side, to the
  // right, out of the way). Path end tapers into the right margin past
  // card two's image (whose text sits on the far side, to the left) - so
  // the mirrored sweep's loop lands in the negative space between the two
  // rows and the whole journey threads behind both cards' images without
  // ever crossing either row's typography.
  const c2 = geo.c2
  const targetStart = { x: cl * 0.85, y: geo.heading.bottom + 40 }
  const targetEnd = { x: Math.min(c2.right + 50, geo.width - 20), y: c2.bottom - 60 }
  const transform = waveTransform(targetStart, targetEnd)

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${geo.width} ${geo.height}`}
      className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
    >
      <motion.path
        d={WAVE_PATH_D}
        transform={transform}
        stroke="var(--color-wave-orange-deep)"
        strokeWidth={WAVE_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        pathLength={reduced ? 1 : drawProgress}
      />
    </svg>
  )
}

function FeatureRow({ stat, statLabel, statTone, heading, body, bullets, imageSide }) {
  const imageFirst = imageSide === 'left'
  return (
    <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-8">
      <div className={`relative flex w-full justify-center md:w-auto ${imageFirst ? 'md:order-1' : 'md:order-2'} md:flex-1`}>
        {/* Solid, fully opaque fill - anything drawn behind this (the
            background wave) must not show through, the way it would with
            a low-alpha tint. */}
        <div
          data-anchor="card"
          className="aspect-[9/16] w-full max-w-[300px] rounded-3xl border border-ink/10 bg-cream-dim shadow-xl sm:max-w-[360px]"
        />

        <div
          className={`absolute bottom-4 min-w-[160px] rounded-2xl border p-4 shadow-lg ${
            imageFirst ? 'left-0' : 'right-0'
          } ${statTone === 'orange' ? 'border-wave-orange-deep/20 bg-wave-orange-deep text-cream' : 'border-wave-peach/40 bg-wave-peach-light text-ink'}`}
        >
          <p className="text-4xl font-bold tracking-tight">{stat}</p>
          <p className={`mt-0.5 text-sm ${statTone === 'orange' ? 'text-cream/80' : 'text-ink/60'}`}>{statLabel}</p>
        </div>
      </div>

      <div className={`w-full md:flex-1 ${imageFirst ? 'md:order-2' : 'md:order-1'}`}>
        <h3 className="mb-6 font-display text-4xl leading-[1.1] font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
          {heading}
        </h3>
        <p className="max-w-md text-lg leading-relaxed text-ink/60">{body}</p>

        {bullets && (
          <ul className="mt-8 max-w-md space-y-4">
            {bullets.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-wave-orange-deep" />
                <p className="text-sm leading-relaxed text-ink/60">
                  <span className="font-semibold text-ink">{item.title}:</span> {item.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export function WhyWaveFeatures() {
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()

  return (
    <section ref={sectionRef} className="bg-dot-grid relative overflow-hidden bg-white px-6 py-20 sm:py-24">
      <BackgroundWave sectionRef={sectionRef} reduced={reduced} />

      <div className="relative z-10 mx-auto max-w-[1000px]">
        <div className="mx-auto mb-20 flex max-w-[850px] flex-col items-center gap-4 text-center sm:mb-28">
          <span className="inline-block rounded-full bg-wave-peach px-2 py-1 text-xs font-semibold tracking-[0.08em] text-ink uppercase">
            our mission
          </span>
          <h2
            data-anchor="mission-heading"
            className="font-display text-3xl leading-[1.1] font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            <AnimatedWords text={MISSION_HEADING} reduced={reduced} />
          </h2>
        </div>

        <div className="mb-24">
          <FeatureRow
            stat="200%"
            statLabel="Organic follower growth"
            statTone="peach"
            heading="Performance-driven UGC that delivers results"
            body="Our UGC strategy is grounded in real performance data. We design, test, and refine creative so every piece contributes to growth you can actually measure."
            imageSide="left"
          />
        </div>

        <div>
          <FeatureRow
            stat="4.2M"
            statLabel="Impressions"
            statTone="orange"
            heading="Creator-led content, long-term growth."
            body="We source and test creators across niches and communities, focusing on those who naturally align with your brand. The result is authentic UGC that feels native and performs consistently."
            bullets={BULLETS}
            imageSide="right"
          />
        </div>

        <p className="relative z-10 mt-16 text-center text-xs text-ink/35">
          Illustrative example — figures shown are sample data.
        </p>
      </div>
    </section>
  )
}
