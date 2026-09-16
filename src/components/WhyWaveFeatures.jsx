import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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

// One continuous canvas layer behind the whole section, drawing itself
// in as you scroll (pathLength 0 -> 1) rather than sitting there static
// - the left curve draws through the first row, the right one through
// the second, so the "ink" keeps pace with the content next to it.
function BackgroundWaves({ sectionRef }) {
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 0.85', 'end 0.35'] })
  const path1 = useTransform(scrollYProgress, [0, 0.45], [0, 1])
  const path2 = useTransform(scrollYProgress, [0.4, 0.85], [0, 1])

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 1200"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
    >
      <motion.path
        d="M180.79 1.30042C163.471 65.6046 110.061 102.919 78.3233 105.455C51.3324 107.612 61.0037 65.4235 78.3233 76.7446C89.9026 84.3135 103.169 118.769 59.3715 133.984C33.4678 142.984 1.79041 130.815 1.79041 130.815"
        stroke="var(--color-wave-orange-deep)"
        strokeWidth="2.23"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.55"
        style={{ pathLength: path1 }}
      />
      <motion.path
        d="M1259.21 780.7C1276.53 716.395 1329.94 679.081 1361.68 676.545C1388.67 674.388 1379 716.577 1361.68 705.255C1350.1 697.687 1336.83 663.231 1380.63 648.016C1406.53 639.016 1438.21 651.185 1438.21 651.185"
        stroke="var(--color-wave-orange)"
        strokeWidth="2.23"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.45"
        style={{ pathLength: path2 }}
      />
    </svg>
  )
}

function FeatureRow({ stat, statLabel, statTone, heading, body, bullets, imageSide }) {
  const imageFirst = imageSide === 'left'
  return (
    <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-8">
      <div className={`relative flex w-full justify-center md:w-auto ${imageFirst ? 'md:order-1' : 'md:order-2'} md:flex-1`}>
        <div className="aspect-[9/16] w-full max-w-[300px] rounded-3xl border border-ink/10 bg-gradient-to-br from-ink/5 to-ink/10 shadow-xl sm:max-w-[360px]" />

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

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-cream px-6 py-20 sm:py-24">
      <BackgroundWaves sectionRef={sectionRef} />

      <div className="relative z-10 mx-auto max-w-[1000px]">
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
