import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
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

// The signature Wave swirl - an exact, hand-authored reference path. These
// numbers are never redrawn, approximated, or reshaped.
const WAVE_PATH_D =
  'M-180.79 1.30042C-163.471 65.6046 -110.061 102.919 -78.3233 105.455C-51.3324 107.612 -61.0037 65.4235 -78.3233 76.7446C-89.9026 84.3135 -103.169 118.769 -59.3715 133.984C-33.4678 142.984 -1.79041 130.815 -1.79041 130.815'

// A small, independent instance of the wave motif that belongs to one
// mission image card, not to the whole section. Its own start anchor sits
// near the top-left of its 220x170 viewBox and its end anchor sits near
// the bottom-right - so, positioned with no extra transform, it opens in
// the empty margin above/beside the card and tucks its other end behind
// the card's own top corner (z-0 under the card's z-10), never reaching
// into the text column on the other side of the row. `mirror` flips the
// whole box (position and rendering) to the opposite corner for the
// alternating row layout. Each instance watches its own scroll progress,
// so the two rows draw independently instead of one driving the other.
function MissionWave({ mirror = false }) {
  const reduced = useReducedMotion()
  const svgRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: svgRef, offset: ['start 90%', 'start 15%'] })

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      viewBox="-200 -10 220 170"
      className={`pointer-events-none absolute -top-20 z-0 hidden h-[170px] w-[220px] md:block ${
        mirror ? '-right-20 scale-x-[-1]' : '-left-20'
      }`}
    >
      <motion.path
        d={WAVE_PATH_D}
        stroke="var(--color-wave-orange-deep)"
        strokeWidth={7}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        pathLength={reduced ? 1 : scrollYProgress}
      />
    </svg>
  )
}

function FeatureRow({ stat, statLabel, statTone, heading, body, bullets, imageSide }) {
  const imageFirst = imageSide === 'left'
  return (
    <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-8">
      <div className={`relative flex w-full justify-center md:w-auto ${imageFirst ? 'md:order-1' : 'md:order-2'} md:flex-1`}>
        <MissionWave mirror={!imageFirst} />

        {/* Solid, fully opaque fill, and stacked above the mission wave -
            anything drawn behind this must not show through, the way it
            would with a low-alpha tint. */}
        <div className="relative z-10 aspect-[9/16] w-full max-w-[300px] rounded-3xl border border-ink/10 bg-cream-dim shadow-xl sm:max-w-[360px]" />

        <div
          className={`absolute bottom-4 z-10 min-w-[160px] rounded-2xl border p-4 shadow-lg ${
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
  const reduced = useReducedMotion()

  return (
    <section className="bg-dot-grid relative overflow-hidden bg-white px-6 py-20 sm:py-24">
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
