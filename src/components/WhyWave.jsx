import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../lib/useReducedMotion'
import { useIsMobile } from '../lib/useIsMobile'
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

// The "old way" struggles, scattered as floating cards around the
// headline - reusing the same three pain points already named inline in
// CARDS below (one polished ad / 5-10 ideas / rising paid spend) plus two
// more in the same voice, rather than inventing an unrelated new list.
const PAIN_POINTS = [
  { text: 'One polished ad, hoping it lands', pos: 'left-0 top-[2%] lg:w-[230px]' },
  { text: 'Betting on 5–10 ideas and guessing', pos: 'right-0 top-[6%] lg:w-[240px]' },
  { text: 'Paid media costs that keep climbing', pos: 'left-0 top-[80%] lg:w-[240px]' },
  { text: "Reach that never turns into signups", pos: 'right-0 top-[80%] lg:w-[230px]' },
  { text: 'No way to know which creative works', pos: 'left-1/2 top-[88%] -translate-x-1/2 lg:w-[250px]' },
]

function PainCard({ text, pos }) {
  return (
    <div
      data-pain-card
      className={`absolute flex items-start gap-3 rounded-2xl border border-cream/10 bg-cream/[0.06] p-4 backdrop-blur-sm ${pos}`}
    >
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-wave-orange-deep text-xs font-bold text-ink">
        ✕
      </span>
      <p className="font-display text-sm leading-snug font-semibold text-cream sm:text-base">{text}</p>
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
  const mobile = useIsMobile()
  const sectionRef = useRef(null)
  const painRef = useRef(null)
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

      // Pain-point cards pin in place and float into position as the
      // user scrolls through them - desktop only, where there's room for
      // the scatter layout; mobile keeps the plain stacked reveal above.
      if (!mobile && painRef.current) {
        const cards = gsap.utils.toArray('[data-pain-card]', painRef.current)
        gsap.set(cards, { opacity: 0, y: 50 })
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: painRef.current,
            start: 'top top+=90',
            end: '+=650',
            pin: true,
            scrub: 0.6,
          },
        })
        cards.forEach((card, i) => {
          tl.to(card, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, i * 0.25)
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced, mobile])

  return (
    <section
      id="why-wave"
      ref={sectionRef}
      className="relative bg-ink px-6 py-20 sm:px-10 sm:py-24 lg:px-[7vw] lg:py-28"
    >
      <div className="mx-auto max-w-[1800px]">
        {/* Mobile/tablet: the plain centered version, no scatter layout. */}
        <div className="mx-auto max-w-4xl text-center lg:hidden">
          <SectionLabel data-reveal tone="dark">
            why wave
          </SectionLabel>

          <h2 data-reveal className="mt-5 leading-[1.1]">
            <span className="block font-display text-[2rem] font-semibold tracking-tight text-cream/30 line-through decoration-cream/25 sm:text-[2.5rem]">
              the old way.
            </span>
            <span className="mt-2 block font-serif text-[3rem] text-wave-orange italic sm:text-[4rem]">
              meet the new wave.
            </span>
          </h2>

          <p data-reveal className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/50 sm:text-lg">
            A constant stream of creator content, tested at scale, that lowers what you pay to acquire a customer.
          </p>
        </div>

        {/* Desktop: pain-point cards pin and float into place around the
            headline as the section scrolls into view. */}
        <div ref={painRef} className="relative mx-auto hidden min-h-[680px] max-w-5xl lg:block">
          {PAIN_POINTS.map((point) => (
            <PainCard key={point.text} text={point.text} pos={point.pos} />
          ))}

          <div className="absolute inset-0 flex flex-col items-center justify-center px-16 text-center">
            <SectionLabel tone="dark">why wave</SectionLabel>

            <h2 className="mt-5 leading-[1.1]">
              <span className="block font-display text-[2.25rem] font-semibold tracking-tight text-cream/30 line-through decoration-cream/25 2xl:text-[2.75rem]">
                the old way.
              </span>
              <span className="mt-2 block font-serif text-[3.5rem] text-wave-orange italic 2xl:text-[4.25rem]">
                meet the new wave.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/50 sm:text-lg">
              A constant stream of creator content, tested at scale, that lowers what you pay to acquire a customer.
            </p>
          </div>
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
