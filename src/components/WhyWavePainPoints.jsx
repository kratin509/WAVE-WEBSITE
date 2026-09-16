import { forwardRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '../lib/useReducedMotion'

const HEADING = 'Growth feels harder than it should be.'

// Same five struggles named inline elsewhere in Why Wave (one polished ad,
// 5-10 ideas, rising paid spend) plus two more in the same voice, not a
// new unrelated list. Paired top/bottom cards share the same top/bottom
// offset so the layout reads as symmetric, with the fifth card alone in
// the middle.
const CARDS = [
  { text: 'One polished ad, hoping it lands', pos: 'top-[10%] left-[4%] md:left-[10%]', range: [0.05, 0.25] },
  { text: 'Betting on 5–10 ideas and guessing', pos: 'top-[10%] right-[4%] md:right-[10%]', range: [0.2, 0.4] },
  {
    text: "Content looks polished but doesn't perform",
    pos: 'top-[46%] left-1/2 -translate-x-1/2',
    range: [0.35, 0.55],
  },
  { text: 'Paid media costs that keep climbing', pos: 'bottom-[10%] left-[6%] md:left-[13%]', range: [0.5, 0.7] },
  { text: 'No way to know which creative works', pos: 'bottom-[10%] right-[6%] md:right-[13%]', range: [0.65, 0.85] },
]

function PainCard({ text, pos, range, progress, static: isStatic }) {
  // Static (reduced-motion) fallback renders fully in place, no motion values.
  const opacity = useTransform(progress, range, [0, 1])
  const y = useTransform(progress, range, [50, 0])

  return (
    <motion.div
      style={isStatic ? undefined : { opacity, y }}
      className={`absolute flex w-[290px] items-start gap-4 rounded-2xl bg-[#44403c] p-6 shadow-xl sm:w-[360px] ${pos}`}
    >
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-wave-orange-deep text-sm font-bold text-ink">
        ✕
      </span>
      <p className="font-display text-lg leading-snug font-semibold text-cream sm:text-xl">{text}</p>
    </motion.div>
  )
}

export const WhyWavePainPoints = forwardRef(function WhyWavePainPoints(_props, ref) {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Light -> dark: starts on the section's own light cream, ends on ink-soft.
  const backgroundColor = useTransform(scrollYProgress, [0, 0.5, 0.9], ['#f7f1e8', '#f7f1e8', '#1c1a17'])
  const textColor = useTransform(scrollYProgress, [0, 0.5, 0.9], ['#0d0d0d', '#0d0d0d', '#f7f1e8'])

  if (reduced) {
    return (
      <div ref={ref} className="relative flex min-h-[90vh] items-center justify-center bg-[#1c1a17] px-6 py-24">
        <div className="relative mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          {CARDS.map((card) => (
            <div key={card.text} className="flex items-start gap-4 rounded-2xl bg-[#44403c] p-6">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-wave-orange-deep text-sm font-bold text-ink">
                ✕
              </span>
              <p className="font-display text-base leading-snug font-semibold text-cream">{card.text}</p>
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
