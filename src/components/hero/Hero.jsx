import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { smoothScrollTo } from '../../lib/scrollTo'
import { PhoneCluster } from './PhoneCluster'
import hookC from '../../assets/experiments/hookC.jpg'

// Reusing Why Wave's three established pillars as short benefit tags,
// rather than inventing new claims.
const BENEFITS = ['go viral', 'test more creative', 'lower CAC']

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--color-wave-orange-deep)" aria-hidden="true">
      <path d="M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z" />
    </svg>
  )
}

// A small floating teaser, honestly framed around our own illustrative
// "top performer" hook rather than a fabricated client project card.
function TopHookCard() {
  return (
    <div className="hidden items-center gap-3 rounded-2xl border border-ink/10 bg-white/80 p-3 pr-5 shadow-[0_14px_32px_rgba(22,17,15,0.08)] backdrop-blur-sm sm:flex">
      <div className="aspect-[9/16] h-14 shrink-0 overflow-hidden rounded-lg">
        <img src={hookC} alt="" className="h-full w-full object-cover" />
      </div>
      <div>
        <p className="text-[10px] font-semibold tracking-[0.12em] text-wave-orange-deep uppercase">Top performer</p>
        <p className="font-display text-sm font-semibold text-ink">Hook C</p>
      </div>
    </div>
  )
}

// One extremely subtle flowing line - abstract brand-wave identity, not
// an ocean wave and not decoration: a single thin, low-contrast stroke
// with a couple of large smooth curves, drawn across the full hero so it
// partially disappears behind the copy and the card cluster.
function AmbientWaveLine() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]"
    >
      <path
        d="M-20 260 C 220 120, 420 340, 640 200 C 820 90, 980 260, 1220 140"
        stroke="var(--color-wave-orange-deep)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export function Hero() {
  const reduced = useReducedMotion()

  const headlineRef = useRef(null)
  const benefitsRef = useRef(null)
  const cardTeaserRef = useRef(null)
  const cardsRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const targets = [
      headlineRef.current,
      benefitsRef.current,
      cardTeaserRef.current,
      cardsRef.current,
      subRef.current,
      ctaRef.current,
    ].filter(Boolean)

    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    gsap.set(targets, { opacity: 0, y: 28 })
    gsap
      .timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 })
      .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.7 })
      .to(benefitsRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.35')
      .to(cardTeaserRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
      .to(cardsRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.55')
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.6')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
  }, [reduced])

  const handleSeeSystem = (e) => {
    e.preventDefault()
    smoothScrollTo('#how-it-works')
  }

  return (
    <section id="top" className="relative overflow-hidden bg-cream">
      <AmbientWaveLine />

      <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-16 px-6 pt-28 pb-16 sm:px-10 sm:pt-32 sm:pb-20 lg:grid-cols-2 lg:gap-14 lg:px-[7vw] lg:pt-36 lg:pb-24">
        <div>
          <h1 ref={headlineRef} className="font-display leading-[1.08] tracking-tight text-ink">
            <span className="block text-2xl font-medium sm:text-3xl lg:text-4xl">Turn UGC into</span>
            <span className="mt-1 block text-5xl font-bold sm:text-6xl lg:text-[3.6rem]">your next</span>
            <span className="block text-5xl font-bold text-wave-orange-deep sm:text-6xl lg:text-[3.6rem]">
              growth channel.
            </span>
          </h1>

          <div ref={benefitsRef} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            {BENEFITS.map((label) => (
              <span key={label} className="flex items-center gap-2 text-sm font-medium text-ink/65">
                <StarIcon />
                {label}
              </span>
            ))}
          </div>

          <div ref={cardTeaserRef} className="mt-8">
            <TopHookCard />
          </div>
        </div>

        <div>
          <div ref={cardsRef}>
            <PhoneCluster reduced={reduced} />
          </div>

          <p ref={subRef} className="mx-auto mt-8 max-w-sm text-center text-base leading-relaxed text-ink/60 lg:text-left">
            Real creators. Real content. Real users. We find what hits. Then we scale it.
          </p>

          <div ref={ctaRef} className="mt-6 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
            <a
              href="#start-a-wave"
              data-cursor="button"
              className="rounded-full bg-wave-orange-deep px-6 py-3 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-ink"
            >
              Start a wave →
            </a>
            <a
              href="#how-it-works"
              onClick={handleSeeSystem}
              data-cursor="link"
              className="flex items-center gap-1.5 text-sm font-semibold tracking-wide text-ink/60 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink"
            >
              See how it works →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
