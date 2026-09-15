import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../lib/useReducedMotion'
import { useSectionNavTheme } from '../lib/useSectionNavTheme'
import { SectionLabel } from './ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    title: 'Go viral',
    eyebrow: 'reach, compounding',
    old: 'one polished ad, hope it lands',
    body: 'Get a constant stream of creators talking about your brand and create the conditions for breakout content.',
  },
  {
    title: 'Test more creative',
    eyebrow: 'ideas tested',
    old: 'bet on 5–10 ideas',
    body: 'Instead of betting on 5–10 ideas, test hundreds and let real audience behaviour tell you what works.',
  },
  {
    title: 'Lower CAC',
    eyebrow: 'cost per acquisition',
    old: 'rising paid-media spend',
    body: 'Turn winning organic creative into a new acquisition channel and reduce your dependence on increasingly expensive paid media.',
  },
]

function WaveRow({ card, index, active, onActivate }) {
  const isActive = active === index
  return (
    <div
      data-cursor="link"
      onMouseEnter={() => onActivate(index)}
      onClick={() => onActivate(index)}
      onFocus={() => onActivate(index)}
      tabIndex={0}
      role="button"
      aria-expanded={isActive}
      className={`cursor-pointer rounded-2xl transition-colors duration-500 ${
        isActive ? 'bg-cream/[0.06] px-5 py-7 sm:px-8 sm:py-9' : 'px-5 py-5 sm:px-8'
      }`}
    >
      <div className="flex items-center gap-5">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-display text-sm font-semibold tabular-nums transition-colors duration-500 ${
            isActive ? 'bg-wave-orange-deep text-cream' : 'border border-cream/20 text-cream/35'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3
          className={`font-display text-xl font-semibold transition-colors duration-500 sm:text-2xl ${
            isActive ? 'text-cream' : 'text-cream/35'
          }`}
        >
          {card.title}
        </h3>
      </div>

      <div
        className="grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: isActive ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="mt-5 flex items-start justify-between gap-6 pl-14">
            <div className="max-w-md">
              <p className="text-[11px] font-semibold tracking-[0.15em] text-wave-orange uppercase">
                {card.eyebrow}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-cream/55">{card.body}</p>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-cream/30">
                <span className="line-through decoration-cream/25">{card.old}</span>
                <span aria-hidden="true">→</span>
              </p>
            </div>
            <span className="hidden shrink-0 text-lg text-cream/25 sm:block" aria-hidden="true">
              ↗
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WhyWave() {
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)
  useSectionNavTheme(sectionRef, { dark: true })

  useEffect(() => {
    if (reduced || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-reveal]',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="why-wave"
      ref={sectionRef}
      className="relative bg-ink px-6 py-20 sm:px-10 sm:py-24 lg:px-[7vw] lg:py-28"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel data-reveal tone="dark">
            why wave
          </SectionLabel>

          <h2 data-reveal className="mt-4 leading-[1.1]">
            <span className="block font-display text-[1.6rem] font-semibold tracking-tight text-cream/30 line-through decoration-cream/25 sm:text-[2rem] lg:text-[2.5rem]">
              the old way.
            </span>
            <span className="mt-1 block font-serif text-[2.4rem] text-wave-orange italic sm:text-[3.1rem] lg:text-[3.75rem]">
              meet the new wave.
            </span>
          </h2>

          <p data-reveal className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-cream/50 sm:text-[15px]">
            A constant stream of creator content, tested at scale, that lowers what you pay to acquire a customer.
          </p>
        </div>

        <div data-reveal className="mx-auto mt-14 max-w-3xl border-t border-cream/10 pt-2">
          {CARDS.map((card, i) => (
            <WaveRow key={card.title} card={card} index={i} active={active} onActivate={setActive} />
          ))}
        </div>

        <p data-reveal className="mt-8 text-center text-xs text-cream/30">
          Illustrative — real campaign numbers land here once results are in.
        </p>
      </div>
    </section>
  )
}
