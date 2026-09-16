import { forwardRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '../lib/useReducedMotion'

const HEADING = 'Growth feels harder than it should be.'

// Same five struggles named inline elsewhere in Why Wave (one polished ad,
// 5-10 ideas, rising paid spend) plus two more in the same voice, not a
// new unrelated list.
const CARDS = [
  { text: 'One polished ad, hoping it lands', pos: 'top-[15%] left-[5%] md:left-[10%]', range: [0.05, 0.25] },
  { text: 'Betting on 5–10 ideas and guessing', pos: 'top-[20%] right-[5%] md:right-[10%]', range: [0.2, 0.4] },
  { text: 'Paid media costs that keep climbing', pos: 'top-[48%] left-[8%] md:left-[14%]', range: [0.35, 0.55] },
  { text: 'Reach that never turns into signups', pos: 'bottom-[20%] left-[5%] md:left-[12%]', range: [0.5, 0.7] },
  { text: 'No way to know which creative works', pos: 'bottom-[15%] right-[8%] md:right-[18%]', range: [0.65, 0.85] },
]

function PainCard({ text, pos, range, progress, static: isStatic }) {
  // Static (reduced-motion) fallback renders fully in place, no motion values.
  const opacity = useTransform(progress, range, [0, 1])
  const y = useTransform(progress, range, [50, 0])

  return (
    <motion.div
      style={isStatic ? undefined : { opacity, y }}
      className={`absolute flex w-[210px] items-start gap-3 rounded-2xl bg-[#44403c] p-4 shadow-lg sm:w-[250px] ${pos}`}
    >
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-wave-orange-deep text-xs font-bold text-ink">
        ✕
      </span>
      <p className="font-display text-sm leading-snug font-semibold text-cream sm:text-base">{text}</p>
    </motion.div>
  )
}

export const WhyWavePainPoints = forwardRef(function WhyWavePainPoints(_props, ref) {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const backgroundColor = useTransform(scrollYProgress, [0, 0.5, 0.9], ['#1c1a17', '#1c1a17', '#ffffff'])
  const textColor = useTransform(scrollYProgress, [0, 0.5, 0.9], ['#f7f1e8', '#f7f1e8', '#0d0d0d'])

  if (reduced) {
    return (
      <div ref={ref} className="relative flex min-h-[90vh] items-center justify-center bg-[#1c1a17] px-6 py-24">
        <div className="relative mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {CARDS.map((card) => (
            <div key={card.text} className="flex items-start gap-3 rounded-2xl bg-[#44403c] p-4">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-wave-orange-deep text-xs font-bold text-ink">
                ✕
              </span>
              <p className="font-display text-sm leading-snug font-semibold text-cream">{card.text}</p>
            </div>
          ))}
        </div>
        <h2 className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center px-6 text-center font-display text-3xl leading-tight font-bold text-cream/20 sm:text-5xl">
          {HEADING}
        </h2>
      </div>
    )
  }

  return (
    <div ref={ref} className="relative h-[300vh]">
      <motion.div
        style={{ backgroundColor }}
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden"
      >
        {CARDS.map((card) => (
          <PainCard key={card.text} {...card} progress={scrollYProgress} />
        ))}

        <motion.h2
          style={{ color: textColor }}
          className="relative z-10 max-w-3xl px-6 text-center font-display text-3xl leading-tight font-bold sm:text-5xl lg:text-6xl"
        >
          {HEADING}
        </motion.h2>
      </motion.div>
    </div>
  )
})
