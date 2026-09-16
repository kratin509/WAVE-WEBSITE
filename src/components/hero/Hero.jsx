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
      {/* soft ambient glows standing in for the reference's radial highlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl sm:h-[520px] sm:w-[520px]"
        style={{ background: 'radial-gradient(circle, var(--color-wave-peach-light), transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-0 h-[480px] w-[480px] translate-x-1/4 rounded-full opacity-60 blur-3xl sm:h-[620px] sm:w-[620px]"
        style={{ background: 'radial-gradient(circle, var(--color-wave-peach), transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-[1500px] px-6 pt-28 pb-16 sm:px-10 sm:pt-32 sm:pb-20 lg:px-[7vw] lg:pt-36 lg:pb-24">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-10">
          <div>
            <p
              ref={eyebrowRef}
              className="mb-4 flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-ink/55 uppercase"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-wave-orange-deep" />
              UGC growth for consumer apps + D2C
            </p>

            <h1 ref={headlineRef} className="font-display leading-[1.05] tracking-tight text-ink">
              <span className="block text-5xl font-bold sm:text-6xl lg:text-[3.9rem]">Real creators.</span>
              <span className="block text-5xl font-bold text-wave-orange-deep sm:text-6xl lg:text-[3.9rem]">
                Real growth
              </span>
              <span className="block text-5xl font-bold sm:text-6xl lg:text-[3.9rem]">for ambitious brands.</span>
            </h1>

            <p ref={subRef} className="mt-5 max-w-md text-base leading-relaxed text-ink/60">
              We find what content works. Test it at scale.
              <br />
              Turn attention into downloads, signups and revenue.
            </p>

            <div ref={ctaRef} className="mt-6 flex flex-wrap items-center gap-6">
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
          className="mt-16 flex flex-col gap-8 border-t border-ink/10 pt-10 sm:mt-20 sm:flex-row sm:flex-wrap sm:gap-0 sm:divide-x sm:divide-ink/10 sm:pt-12 lg:mt-24"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className={i === 0 ? 'sm:pr-8' : 'sm:px-8'}>
              <p className="font-display text-3xl font-bold text-wave-orange-deep sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-ink/55">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-ink/35">Illustrative example — figures shown are sample data.</p>

        <div className="mt-14 flex flex-col items-center gap-5 sm:mt-16 sm:flex-row sm:gap-8">
          <p className="shrink-0 text-[11px] font-semibold tracking-[0.15em] text-ink/40 uppercase">
            Trusted by fast-growing brands
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-50 grayscale">
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
