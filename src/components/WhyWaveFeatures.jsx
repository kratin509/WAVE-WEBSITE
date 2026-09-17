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
          data-anchor={word === 'growth' ? 'growth' : undefined}
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

// Turns a list of {x,y} points into cubic-bezier segments (Catmull-Rom ->
// Bezier, tension 1/6) so the curve can be rebuilt from live-measured
// anchors without redoing the bezier math by hand every time those
// anchors move. Returns the raw "C ..." segments rather than one joined
// `d` string, so a sequence that's later split into two separately
// animated <path> elements (loop, then spine) still gets tangents
// computed from the FULL point sequence at the join - splitting the
// points into two arrays first and smoothing each in isolation loses the
// neighbour on the far side of the join, which is exactly what produced
// the sharp kink where the loop handed off into the spine.
function smoothSegments(points) {
  const segments = []
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] || p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    segments.push(`C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`)
  }
  return segments
}

// One unbroken orange thread that starts right at the "G" of "growth" in
// the mission heading, curls into a flourish, then dives through both
// feature cards to the foot of the section. The anchor points (the growth
// word, each card) are measured live off the DOM rather than hard-coded
// pixel guesses - hard-coded values only ever matched one exact viewport
// width, and broke (badly - loops landing on the wrong line, the spine
// missing the cards entirely) the moment the heading wrapped onto a
// different number of lines at another width. Re-measures on resize and
// once fonts finish loading, since a late font swap reflows the heading.
function BackgroundWave({ sectionRef, reduced }) {
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 0.85', 'end 0.15'] })
  const loopDrawn = useTransform(scrollYProgress, [0, 0.12], [0, 1])
  const spineDrawn = useTransform(scrollYProgress, [0.08, 1], [0, 1])
  const [geo, setGeo] = useState(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    function measure() {
      const sRect = section.getBoundingClientRect()
      const growth = section.querySelector('[data-anchor="growth"]')
      const cards = section.querySelectorAll('[data-anchor="card"]')
      if (!growth || cards.length < 2 || sRect.width === 0) return
      const toLocal = (r) => ({
        left: r.left - sRect.left,
        right: r.right - sRect.left,
        top: r.top - sRect.top,
        bottom: r.bottom - sRect.top,
      })
      setGeo({
        width: sRect.width,
        height: sRect.height,
        g: toLocal(growth.getBoundingClientRect()),
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

  if (!geo) return null

  const gx = geo.g.left + 6
  const gy = geo.g.top + (geo.g.bottom - geo.g.top) * 0.5
  const gBottom = geo.g.bottom

  // Every point after the first sits at or below gBottom (the text's own
  // bottom edge, not just its vertical center) and the last two points
  // both trend down-right - so the curve never has to double back up
  // across the heading to reach them, the way it did when the loop's
  // exit point was pinned to the text's vertical center instead of
  // clearing its bottom edge with margin.
  const loopPoints = [
    { x: gx, y: gy },
    { x: gx - 70, y: gy - 65 },
    { x: gx - 190, y: gy - 35 },
    { x: gx - 190, y: gBottom + 45 },
    { x: gx - 90, y: gBottom + 75 },
  ]
  const loopEnd = loopPoints[loopPoints.length - 1]

  const c1w = geo.c1.right - geo.c1.left
  const c1h = geo.c1.bottom - geo.c1.top
  const c2w = geo.c2.right - geo.c2.left
  const c2h = geo.c2.bottom - geo.c2.top

  const spineRest = [
    { x: geo.c1.left + c1w * 0.55, y: geo.c1.top + c1h * 0.12 },
    { x: geo.c1.left + c1w * 0.35, y: geo.c1.top + c1h * 0.5 },
    { x: geo.c1.left + c1w * 0.55, y: geo.c1.bottom - c1h * 0.05 },
    { x: (geo.c1.left + geo.c2.right) / 2, y: (geo.c1.bottom + geo.c2.top) / 2 },
    { x: geo.c2.left + c2w * 0.35, y: geo.c2.top + c2h * 0.1 },
    { x: geo.c2.left + c2w * 0.55, y: geo.c2.top + c2h * 0.55 },
    { x: geo.c2.left + c2w * 0.4, y: geo.c2.bottom - c2h * 0.05 },
    { x: geo.c2.left + c2w * 0.3, y: Math.min(geo.c2.bottom + 60, geo.height - 20) },
  ]

  // One continuous point sequence, smoothed once, then split back into
  // the two `d` strings the loop and spine each animate independently -
  // see smoothSegments' comment for why splitting the points first (and
  // smoothing each half separately) isn't the same thing.
  const allPoints = [...loopPoints, ...spineRest]
  const segments = smoothSegments(allPoints)
  const loopSegCount = loopPoints.length - 1
  const loopD = `M ${loopPoints[0].x} ${loopPoints[0].y} ` + segments.slice(0, loopSegCount).join(' ')
  const spineD = `M ${loopEnd.x} ${loopEnd.y} ` + segments.slice(loopSegCount).join(' ')

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${geo.width} ${geo.height}`}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    >
      <motion.path
        d={loopD}
        stroke="var(--color-wave-orange-deep)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.85"
        style={reduced ? undefined : { pathLength: loopDrawn }}
        pathLength={reduced ? undefined : 1}
      />
      <motion.path
        d={spineD}
        stroke="var(--color-wave-orange-deep)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.85"
        style={reduced ? undefined : { pathLength: spineDrawn }}
        pathLength={reduced ? undefined : 1}
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
          <h2 className="font-display text-3xl leading-[1.1] font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
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
