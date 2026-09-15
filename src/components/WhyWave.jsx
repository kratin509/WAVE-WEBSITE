import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../lib/useReducedMotion'
import { useSectionNavTheme } from '../lib/useSectionNavTheme'
import { SectionLabel } from './ui/SectionLabel'
import hookB from '../assets/experiments/hookB.jpg'
import hookC from '../assets/experiments/hookC.jpg'
import hookE from '../assets/experiments/hookE.jpg'
import hookF from '../assets/experiments/hookF.jpg'
import hookH from '../assets/experiments/hookH.jpg'
import hookI from '../assets/experiments/hookI.jpg'
import goViralNetwork from '../assets/why-wave/go-viral-network.png'

gsap.registerPlugin(ScrollTrigger)

// A repeating tile of the brand's own wave-line motif, stroked in orange
// at very low opacity, standing in for "logos in the background" the way
// Valley's reference tiles its own mark across a colored panel - here
// adapted to a plain black section so it reads as a subtle watermark
// texture rather than a flat, dull fill.
const WAVE_PATTERN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='100' viewBox='0 0 140 100'%3E%3Cpath d='M-10 25 Q 7.5 5 25 25 T 60 25 T 95 25 T 130 25 T 165 25' stroke='%23FF4B1F' stroke-opacity='0.5' stroke-width='2.5' fill='none'/%3E%3Cpath d='M-10 72 Q 7.5 52 25 72 T 60 72 T 95 72 T 130 72 T 165 72' stroke='%23FF4B1F' stroke-opacity='0.35' stroke-width='2' fill='none'/%3E%3C/svg%3E"

// Fine film-grain texture (feTurbulence), matching the site's global
// .grain-overlay technique but scoped here so the flat black reads as a
// textured surface instead of a dull, dead-flat fill.
const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"

function ViralIllustration() {
  return (
    <img
      src={goViralNetwork}
      alt="Creator profile cards feeding reach, followers and engagement into a central growth hub"
      className="h-full min-h-[260px] w-full object-cover"
      loading="lazy"
      draggable={false}
    />
  )
}

function GridIllustration() {
  const items = [hookB, hookC, hookE, hookF, hookH, hookI]
  return (
    <div className="grid grid-cols-3 gap-2.5 p-6 sm:gap-3">
      {items.map((src, i) => (
        <div key={i} className="aspect-[9/16] overflow-hidden rounded-lg border border-ink/10 shadow-sm">
          <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" draggable={false} />
        </div>
      ))}
    </div>
  )
}

function CacIllustration() {
  const heights = [72, 64, 55, 42, 28, 16]
  return (
    <div className="w-full max-w-xs px-6">
      <p className="text-[11px] font-semibold tracking-[0.15em] text-ink/35 uppercase">cost per acquisition</p>
      <div className="mt-5 flex h-36 items-end gap-2.5 sm:h-40">
        {heights.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              height: `${h}%`,
              background: i === heights.length - 1 ? 'var(--color-wave-orange-deep)' : 'var(--color-wave-peach)',
            }}
          />
        ))}
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-wave-orange-deep">
        trending down <span aria-hidden="true">↓</span>
      </p>
    </div>
  )
}

const CARDS = [
  {
    title: 'Go viral',
    eyebrow: 'reach, compounding',
    old: 'one polished ad, hope it lands',
    body: 'Get a constant stream of creators talking about your brand and create the conditions for breakout content.',
    cta: 'See how it spreads',
    href: '#experiments',
    illustration: ViralIllustration,
  },
  {
    title: 'Test more creative',
    eyebrow: 'ideas tested',
    old: 'bet on 5–10 ideas',
    body: 'Instead of betting on 5–10 ideas, test hundreds and let real audience behaviour tell you what works.',
    cta: 'See the test grid',
    href: '#experiments',
    illustration: GridIllustration,
  },
  {
    title: 'Lower CAC',
    eyebrow: 'cost per acquisition',
    old: 'rising paid-media spend',
    body: 'Turn winning organic creative into a new acquisition channel and reduce your dependence on increasingly expensive paid media.',
    cta: 'See the math',
    href: '#case-studies',
    illustration: CacIllustration,
  },
]

function StackCard({ card, index }) {
  const Illustration = card.illustration
  return (
    <div
      className="sticky flex min-h-[420px] flex-col overflow-hidden rounded-[28px] border border-ink/5 bg-white shadow-2xl shadow-black/40 lg:min-h-[440px] lg:flex-row"
      style={{ top: `${108 + index * 28}px`, zIndex: 10 + index }}
    >
      <div className="flex flex-col justify-center p-8 sm:p-10 lg:w-1/2 lg:p-14">
        <p className="text-[11px] font-semibold tracking-[0.15em] text-wave-orange-deep uppercase">
          {card.eyebrow}
        </p>
        <h3 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">{card.title}</h3>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/55 sm:text-base">{card.body}</p>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-ink/35">
          <span className="line-through decoration-ink/20">{card.old}</span>
          <span aria-hidden="true">→</span>
        </p>

        <a
          href={card.href}
          data-cursor="button"
          className="mt-7 inline-flex w-fit items-center gap-1.5 rounded-full bg-ink px-6 py-3 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-wave-orange-deep"
        >
          {card.cta}
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className="flex min-h-[260px] items-center justify-center bg-neutral-50 lg:w-1/2">
        <Illustration />
      </div>
    </div>
  )
}

export function WhyWave() {
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)
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
      className="relative overflow-hidden bg-ink px-6 py-20 sm:px-10 sm:py-24 lg:px-[7vw] lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.09]"
        style={{ backgroundImage: `url("${WAVE_PATTERN}")`, backgroundSize: '140px 100px' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN}")`, backgroundSize: '140px 140px' }}
      />

      <div className="relative mx-auto max-w-[1800px]">
        <div className="mx-auto max-w-4xl text-center">
          <SectionLabel data-reveal tone="dark">
            why wave
          </SectionLabel>

          <h2 data-reveal className="mt-5 leading-[1.1]">
            <span className="block font-display text-[2rem] font-semibold tracking-tight text-cream/30 line-through decoration-cream/25 sm:text-[2.5rem] lg:text-[3.25rem] 2xl:text-[3.75rem]">
              the old way.
            </span>
            <span className="mt-2 block font-serif text-[3rem] text-wave-orange italic sm:text-[4rem] lg:text-[5rem] 2xl:text-[5.75rem]">
              meet the new wave.
            </span>
          </h2>

          <p data-reveal className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/50 sm:text-lg">
            A constant stream of creator content, tested at scale, that lowers what you pay to acquire a customer.
          </p>
        </div>

        <div data-reveal className="relative mx-auto mt-20 max-w-5xl space-y-8 pb-8">
          {CARDS.map((card, i) => (
            <StackCard key={card.title} card={card} index={i} />
          ))}
        </div>

        <p data-reveal className="mt-8 text-center text-sm text-cream/30">
          Illustrative — real campaign numbers land here once results are in.
        </p>
      </div>
    </section>
  )
}
