import { forwardRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useReducedMotion } from '../lib/useReducedMotion'

const HEADING = 'Growth feels harder than it should be.'

// Same five struggles named inline elsewhere in Why Wave (one polished ad,
// 5-10 ideas, rising paid spend) plus two more in the same voice, not a
// new unrelated list. Paired top/bottom cards share the same top/bottom
// offset so the layout reads as symmetric, with the fifth card alone in
// the middle. This is a round trip, not a one-way reveal: each card has
// an `outRange` mirroring its `range`, staggered in the same left-right-
// center-left-right order, so the whole panel undoes itself - cards gone,
// background back to white - before the sticky panel unpins into the
// (white) section below. No hard color cut at the handoff.
const CARDS = [
  {
    text: 'One polished ad, hoping it lands',
    pos: 'top-[10%] left-[4%] md:left-[10%]',
    range: [0.1, 0.23],
    outRange: [0.66, 0.8],
  },
  {
    text: 'Betting on 5–10 ideas and guessing',
    pos: 'top-[10%] right-[4%] md:right-[10%]',
    range: [0.18, 0.31],
    outRange: [0.71, 0.85],
  },
  {
    text: "Content looks polished but doesn't perform",
    pos: 'top-[46%] left-1/2 -translate-x-1/2',
    range: [0.28, 0.41],
    outRange: [0.76, 0.9],
  },
  {
    text: 'Paid media costs that keep climbing',
    pos: 'bottom-[10%] left-[6%] md:left-[13%]',
    range: [0.38, 0.51],
    outRange: [0.81, 0.95],
  },
  {
    text: 'No way to know which creative works',
    pos: 'bottom-[10%] right-[6%] md:right-[13%]',
    range: [0.48, 0.61],
    outRange: [0.86, 1],
  },
]

function PainCard({ text, pos, range, outRange, progress, static: isStatic }) {
  // Static (reduced-motion) fallback renders fully in place, no motion values.
  const y = useTransform(progress, range, [80, 0])
  // Opacity ramps in over just the first quarter of the card's own range,
  // so it's fully opaque well before it physically overlaps the heading -
  // otherwise a still-translucent card lets the heading text show through
  // underneath it and the two visually merge. It then holds at full
  // opacity until outRange, where it ramps back down to 0 on the way out.
  const fadeEnd = range[0] + (range[1] - range[0]) * 0.25
  const opacity = useTransform(progress, [range[0], fadeEnd, outRange[0], outRange[1]], [0, 1, 1, 0])

  return (
    <motion.div
      style={isStatic ? undefined : { opacity, y }}
      className={`absolute z-20 flex w-[290px] items-start gap-4 rounded-2xl bg-[#44403c] p-6 shadow-xl sm:w-[360px] ${pos}`}
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
  const { scrollYProgress: rawProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // Spring-smoothed so the whole sequence trails the scroll with a little
  // inertia instead of snapping 1:1 to every wheel notch - tuned brisk
  // rather than heavy, so it reads as smooth, not slow.
  const scrollYProgress = useSpring(rawProgress, { stiffness: 140, damping: 24, mass: 0.3, restDelta: 0.0005 })

  // A round trip rather than a one-way ramp: starts pure white to bleed
  // seamlessly out of the white Experiments section above, darkens through
  // the card reveal, holds dark while the cards are up, then eases back to
  // white as they leave - so by the time the panel unpins, the page is
  // already white and hands off to the (also white) section below with no
  // seam at all.
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.55, 0.75, 0.97, 1],
    ['#ffffff', '#ffffff', '#1c1a17', '#1c1a17', '#ffffff', '#ffffff'],
  )
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.55, 0.75, 0.97, 1],
    ['#0d0d0d', '#0d0d0d', '#f7f1e8', '#f7f1e8', '#0d0d0d', '#0d0d0d'],
  )
  // The heading itself steps aside once all five cards are up (the last
  // card's range ends at 0.61, the first card's outRange starts at 0.66)
  // rather than sitting there behind them for that whole stretch - it
  // fades out just before the cards finish arriving and back in once
  // they've started leaving.
  const headingOpacity = useTransform(scrollYProgress, [0, 0.45, 0.6, 0.67, 0.82, 1], [1, 1, 0, 0, 1, 1])

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
        <h2 className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center px-6 text-center font-display text-3xl leading-[1.1] font-bold tracking-tight text-cream/20 sm:text-5xl">
          {HEADING}
        </h2>
      </div>
    )
  }

  return (
    <div ref={ref} className="relative h-[350vh]">
      <motion.div
        style={{ backgroundColor }}
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden"
      >
        {CARDS.map((card) => (
          <PainCard key={card.text} {...card} progress={scrollYProgress} />
        ))}

        <motion.h2
          style={{ color: textColor, opacity: headingOpacity }}
          className="relative z-10 max-w-4xl px-6 text-center font-display text-4xl leading-[1.1] font-bold tracking-tight sm:text-6xl lg:text-[4.5rem]"
        >
          {HEADING}
        </motion.h2>
      </motion.div>
    </div>
  )
})
