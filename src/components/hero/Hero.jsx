import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { smoothScrollTo } from '../../lib/scrollTo'
import { PhoneCluster } from './PhoneCluster'

const STATS = [
  { value: '3.4B+', label: 'Views generated' },
  { value: '100K+', label: 'App downloads driven' },
  { value: '60+', label: 'Creators in our network' },
  { value: '2–5x', label: 'Avg. CAC improvement' },
]

// Placeholder wordmarks, not real client logos - kept as plain styled
// text rather than fabricated logo art.
const TRUSTED_BY = ['zave', 'māyā', 'YoLearn', 'oolka', 'hulp']

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

  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const cardsRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const targets = [
      eyebrowRef.current,
      headlineRef.current,
      subRef.current,
      ctaRef.current,
      cardsRef.current,
      statsRef.current,
    ].filter(Boolean)

    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    gsap.set(targets, { opacity: 0, y: 28 })
    gsap
      .timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 })
      .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.5 })
      .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.25')
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .to(cardsRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .to(statsRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
  }, [reduced])

  const handleSeeSystem = (e) => {
    e.preventDefault()
    smoothScrollTo('#how-it-works')
  }

  return (
    <section id="top" className="relative overflow-hidden bg-cream">
      <AmbientWaveLine />

      <div className="relative mx-auto max-w-[1500px] px-6 pt-24 pb-10 sm:px-10 sm:pt-28 sm:pb-12 lg:px-[7vw] lg:pt-28 lg:pb-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-8">
          <div>
            <p
              ref={eyebrowRef}
              className="mb-3 flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-ink/55 uppercase"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-wave-orange-deep" />
              UGC growth for consumer apps + D2C
            </p>

            <h1 ref={headlineRef} className="font-display leading-[1.08] tracking-tight text-ink">
              <span className="block text-4xl font-bold sm:text-5xl lg:text-[3.3rem]">Real creators.</span>
              <span className="block text-4xl font-bold text-wave-orange-deep sm:text-5xl lg:text-[3.3rem]">
                Real growth
              </span>
              <span className="block text-4xl font-bold sm:text-5xl lg:text-[3.3rem]">for ambitious brands.</span>
            </h1>

            <p ref={subRef} className="mt-4 max-w-md text-base leading-relaxed text-ink/60">
              We find what content works. Test it at scale.
              <br />
              Turn attention into downloads, signups and revenue.
            </p>

            <div ref={ctaRef} className="mt-5 flex flex-wrap items-center gap-6">
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

          <div ref={cardsRef}>
            <PhoneCluster reduced={reduced} />
          </div>
        </div>

        <div
          ref={statsRef}
          className="mt-10 flex flex-col gap-6 border-t border-ink/10 pt-6 sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-0 sm:divide-x sm:divide-ink/10 sm:pt-7 lg:mt-14"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className={i === 0 ? 'sm:pr-8' : 'sm:px-8'}>
              <p className="font-display text-2xl font-bold text-wave-orange-deep sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm text-ink/55">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-ink/35">Illustrative example — figures shown are sample data.</p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:mt-9 sm:flex-row sm:gap-8">
          <p className="shrink-0 text-[11px] font-semibold tracking-[0.15em] text-ink/40 uppercase">
            Trusted by fast-growing brands
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 opacity-50 grayscale">
            {TRUSTED_BY.map((name) => (
              <span key={name} className="font-display text-lg font-bold text-ink">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
