import { motion } from 'framer-motion'
import { useReducedMotion } from '../lib/useReducedMotion'

const HEADING = 'We made UGC into a consistent, high-performing growth channel.'

function AnimatedWords({ text, reduced }) {
  const words = text.split(' ')

  if (reduced) return <>{text}</>

  return (
    <>
      {words.map((word, i) => (
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

export function OurMission() {
  const reduced = useReducedMotion()

  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-cream px-6 py-20 sm:min-h-[75vh] sm:py-24">
      <div className="mx-auto flex max-w-[850px] flex-col items-center gap-4 text-center">
        <span className="inline-block rounded-full bg-wave-peach px-2 py-1 text-xs font-semibold tracking-[0.08em] text-ink uppercase">
          our mission
        </span>
        <h2 className="font-display text-3xl leading-[1.1] font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
          <AnimatedWords text={HEADING} reduced={reduced} />
        </h2>
      </div>
    </section>
  )
}
