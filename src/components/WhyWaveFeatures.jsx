import { useRef } from 'react'
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
  if (reduced) return <>{text}</>
  return (
    <>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: i * 0.035, ease: 'easeOut' }}
          className="inline-block"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </>
  )
}

// One unbroken orange thread that starts behind the mission heading and
// winds its way down past both feature cards to the foot of the section -
// a single scroll-drawn pathLength stroke rather than two disconnected
// decorations, so the whole section reads as one continuous piece instead
// of stacked blocks. preserveAspectRatio=none deliberately lets the curve
// stretch to whatever height the content ends up being, since it's an
// abstract squiggle, not something that needs geometric precision.
function BackgroundWave({ sectionRef, reduced }) {
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 0.85', 'end 0.15'] })
  // Two separate strokes sharing one scroll timeline rather than one path
  // with a single [0,1] budget - a tightly coiled loop eats a hugely
  // disproportionate share of a path's arc length for how little vertical
  // space it covers, so treating the whole thing as one pathLength left
  // the long spine stalled just past the loop for most of the scroll.
  // Giving the flourish its own short early budget and the spine the rest
  // guarantees the spine actually reaches both cards and the section's
  // foot by the time you're done scrolling.
  const loopDrawn = useTransform(scrollYProgress, [0, 0.12], [0, 1])
  const spineDrawn = useTransform(scrollYProgress, [0.08, 1], [0, 1])

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 2064"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    >
      {/* Waypoints are tuned to this section's actual measured layout at
          1440px: a flourish loop in the top-left margin, handing off at
          (120,200) into a wide spine that dives through each 9:16 card at
          roughly x282-642/y512-1152 and x798-1158/y1248-1888 - it genuinely
          passes behind both cards, not just near them. */}
      <motion.path
        d="M 90 260
           C 0 190, 40 30, 170 40
           C 300 50, 320 190, 220 250
           C 160 285, 110 260, 120 200"
        stroke="var(--color-wave-orange-deep)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.8"
        style={reduced ? undefined : { pathLength: loopDrawn }}
        pathLength={reduced ? undefined : 1}
      />
      <motion.path
        d="M 120 200
           C 200 260, 280 300, 340 380
           C 420 480, 380 500, 420 580
           C 460 660, 430 820, 470 960
           C 500 1060, 540 1100, 580 1160
           C 620 1220, 660 1190, 700 1220
           C 770 1270, 860 1300, 910 1360
           C 960 1420, 980 1500, 1010 1600
           C 1040 1700, 1000 1780, 1030 1850
           C 1055 1910, 1000 1950, 950 2000"
        stroke="var(--color-wave-orange-deep)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.8"
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
        <div className="aspect-[9/16] w-full max-w-[300px] rounded-3xl border border-ink/10 bg-cream-dim shadow-xl sm:max-w-[360px]" />

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
    <section ref={sectionRef} className="relative overflow-hidden bg-white px-6 py-20 sm:py-24">
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
