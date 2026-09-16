import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import card5 from '../assets/cards/card5_kiara.png'
import hookC from '../assets/experiments/hookC.jpg'

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

// Splits the headline into words so each one settles into place as the
// heading scrolls into view, instead of the whole line appearing at once.
function AnimatedHeadline({ text }) {
  const words = text.split(' ')
  return (
    <h2 className="mx-auto max-w-3xl font-display text-4xl leading-tight font-extrabold tracking-tight text-ink sm:text-5xl">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: i * 0.035, ease: 'easeOut' }}
          className="inline-block"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </h2>
  )
}

function FeatureRow({ image, alt, stat, statLabel, statTone, heading, body, bullets, imageSide }) {
  const imageFirst = imageSide === 'left'
  return (
    <div className="relative z-10 grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-16">
      <div
        className={`relative flex justify-center ${imageFirst ? 'md:order-1 md:justify-end' : 'md:order-2 md:justify-start'}`}
      >
        <div className="aspect-[9/16] w-64 overflow-hidden rounded-3xl border border-ink/10 shadow-xl sm:w-72">
          <img src={image} alt={alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
        </div>

        <div
          className={`absolute z-20 min-w-[170px] rounded-2xl border p-4 shadow-lg ${
            imageFirst ? '-bottom-4 left-4 md:left-6' : '-top-4 right-4 md:right-6'
          } ${statTone === 'orange' ? 'border-wave-orange-deep/20 bg-wave-orange-deep text-cream' : 'border-wave-peach/40 bg-wave-peach-light text-ink'}`}
        >
          <p className="text-2xl font-black">{stat}</p>
          <p className={`mt-0.5 text-xs font-medium ${statTone === 'orange' ? 'text-cream/80' : 'text-ink/60'}`}>
            {statLabel}
          </p>
        </div>
      </div>

      <div className={imageFirst ? 'md:order-2' : 'order-2 md:order-1'}>
        <h3 className="mb-4 font-display text-3xl font-bold text-ink sm:text-4xl">{heading}</h3>
        <p className="max-w-md text-base leading-relaxed text-ink/60 sm:text-lg">{body}</p>

        {bullets && (
          <ul className="mt-6 max-w-md space-y-4">
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

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="relative z-10 mb-20 text-center">
          <span className="mb-4 inline-block rounded-full bg-wave-peach-light px-3 py-1 text-xs font-semibold tracking-wider text-ink/70 uppercase">
            Our approach
          </span>
          <AnimatedHeadline text="We made UGC into a consistent, high-performing growth channel." />
        </div>

        <div className="mb-24">
          <FeatureRow
            image={card5}
            alt="Creator holding up a skincare serum to camera"
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
            image={hookC}
            alt="The winning hook - a creator talking to camera about a product she found"
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
