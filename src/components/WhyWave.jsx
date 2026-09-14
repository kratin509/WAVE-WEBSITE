import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../lib/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function ReachIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="3" fill="var(--color-wave-orange-deep)" />
      <path d="M14 6.5 A7.5 7.5 0 0 1 21.5 14" stroke="var(--color-ink)" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 2 A12 12 0 0 1 26 14" stroke="var(--color-ink)" strokeOpacity="0.18" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function VariantsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="2" y="8" width="14" height="14" rx="3" stroke="var(--color-ink)" strokeOpacity="0.22" strokeWidth="2" />
      <rect x="8" y="5" width="14" height="14" rx="3" stroke="var(--color-ink)" strokeOpacity="0.4" strokeWidth="2" />
      <rect x="14" y="2" width="12" height="12" rx="3" stroke="var(--color-wave-orange-deep)" strokeWidth="2" />
    </svg>
  )
}

function CacIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M2.5 7 L10.5 14 L15.5 10 L25.5 19.5"
        stroke="var(--color-ink)"
        strokeOpacity="0.4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.5 19.5 L25.5 12.5 M25.5 19.5 L18.5 19.5"
        stroke="var(--color-wave-orange-deep)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SpreadDots() {
  const sizes = [4, 5, 6.5, 8, 10]
  return (
    <div className="flex h-7 items-end gap-1.5">
      {sizes.map((s, i) => (
        <span
          key={i}
          className="rounded-full"
          style={{
            width: s,
            height: s,
            background: i === sizes.length - 1 ? 'var(--color-wave-orange-deep)' : 'var(--color-wave-peach)',
            opacity: 0.45 + i * 0.13,
          }}
        />
      ))}
    </div>
  )
}

function VariantDots() {
  const winners = [2, 6]
  return (
    <div className="grid h-7 grid-cols-9 items-center gap-1">
      {Array.from({ length: 9 }).map((_, i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-[2px]"
          style={{
            background: winners.includes(i) ? 'var(--color-wave-orange-deep)' : 'var(--color-ink)',
            opacity: winners.includes(i) ? 1 : 0.15,
          }}
        />
      ))}
    </div>
  )
}

function DescendingBars() {
  const heights = [26, 23, 20, 15, 10, 6]
  return (
    <div className="flex h-7 items-end gap-1">
      {heights.map((h, i) => (
        <span
          key={i}
          className="w-1.5 rounded-full"
          style={{
            height: h,
            background: i === heights.length - 1 ? 'var(--color-wave-orange-deep)' : 'var(--color-wave-peach)',
          }}
        />
      ))}
    </div>
  )
}

const CARDS = [
  {
    icon: ReachIcon,
    old: 'one polished ad, hope it lands',
    title: 'Go viral',
    body: 'Get a constant stream of creators talking about your brand and create the conditions for breakout content.',
    visual: SpreadDots,
    metric: 'reach, compounding',
  },
  {
    icon: VariantsIcon,
    old: 'bet on 5–10 ideas',
    title: 'Test more creative',
    body: 'Instead of betting on 5–10 ideas, test hundreds and let real audience behaviour tell you what works.',
    visual: VariantDots,
    metric: 'ideas tested',
  },
  {
    icon: CacIcon,
    old: 'rising paid-media spend',
    title: 'Lower CAC',
    body: 'Turn winning organic creative into a new acquisition channel and reduce your dependence on increasingly expensive paid media.',
    visual: DescendingBars,
    metric: 'cost per acquisition',
  },
]

export function WhyWave() {
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)

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
      className="relative bg-cream px-6 py-20 sm:px-10 sm:py-24 lg:px-[7vw] lg:py-28"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="mx-auto max-w-2xl text-center">
          <span
            data-reveal
            className="inline-block rounded-md bg-wave-peach-light px-3 py-1.5 text-xs font-semibold tracking-wide text-ink uppercase"
          >
            why wave
          </span>

          <h2
            data-reveal
            className="mt-6 font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            <span className="block text-ink/30 line-through decoration-ink/25">the old way.</span>
            <span className="block text-wave-orange-deep">meet the new wave.</span>
          </h2>

          <p data-reveal className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink/60 sm:text-lg">
            A constant stream of creator content, tested at scale, that lowers what you pay to acquire a customer.
          </p>
        </div>

        <div
          data-reveal
          className="mt-16 grid grid-cols-1 border-t border-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-ink/10"
        >
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="border-b border-ink/10 py-10 last:border-b-0 sm:border-b-0 sm:px-8 sm:py-12 sm:first:pl-0 sm:last:pr-0"
            >
              <card.icon />

              <p className="mt-6 flex items-center gap-1.5 text-xs font-medium text-ink/35">
                <span className="line-through decoration-ink/25">{card.old}</span>
                <span aria-hidden="true">→</span>
              </p>

              <h3 className="mt-2 font-display text-xl font-bold text-ink">{card.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/60">{card.body}</p>

              <div className="mt-7">
                <card.visual />
                <p className="mt-2 text-[11px] font-semibold tracking-wide text-wave-orange-deep uppercase">
                  {card.metric}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p data-reveal className="mt-8 text-center text-xs text-ink/40">
          Illustrative — real campaign numbers land here once results are in.
        </p>
      </div>
    </section>
  )
}
