import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../lib/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// A repeating tile of the brand's wave-line motif (the same sine-curve
// language used in the hero), stroked at low opacity so it reads as a
// subtle wallpaper pattern rather than competing with the headline -
// this is Wave's own brand mark standing in for the "logos in the
// background" texture, since we have no real client logos to show.
const WAVE_PATTERN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='100' viewBox='0 0 140 100'%3E%3Cpath d='M-10 25 Q 7.5 5 25 25 T 60 25 T 95 25 T 130 25 T 165 25' stroke='%23F7F1E8' stroke-opacity='0.16' stroke-width='2.5' fill='none'/%3E%3Cpath d='M-10 72 Q 7.5 52 25 72 T 60 72 T 95 72 T 130 72 T 165 72' stroke='%23F7F1E8' stroke-opacity='0.1' stroke-width='2' fill='none'/%3E%3C/svg%3E"

// Fine film-grain texture (feTurbulence), matching the site's global
// .grain-overlay technique but scoped and stronger here so the gradient
// reads as a textured surface instead of a flat color fill.
const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"

function WaveMark({ className, size = 130, rotate = 0 }) {
  return (
    <svg
      width={size}
      height={size * 0.5}
      viewBox="0 0 140 70"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        d="M0 35 Q 17.5 10 35 35 T 70 35 T 105 35 T 140 35"
        stroke="var(--color-cream)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

// Deliberately not the vivid --color-wave-* brand tokens - blended ~40%
// toward neutral so a full-bleed card stays calm and legible instead of
// glaring, while still reading unmistakably warm/orange.
const GRADIENT = [
  'radial-gradient(120% 140% at 12% 15%, #cc4e4b 0%, transparent 60%)',
  'radial-gradient(100% 120% at 65% 0%, #cc6046 0%, transparent 65%)',
  'radial-gradient(120% 140% at 92% 100%, #cc9f73 0%, transparent 60%)',
  'linear-gradient(135deg, #cc4e4b 0%, #cc6046 35%, #cc7c51 68%, #cc9f73 100%)',
].join(', ')

export function FinalCTA() {
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)

  useEffect(() => {
    if (reduced || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-reveal]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="start-a-wave"
      ref={sectionRef}
      className="relative bg-cream px-6 py-20 sm:px-10 sm:py-24 lg:px-[7vw] lg:py-28"
    >
      <div className="mx-auto max-w-[1500px]">
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-14 sm:py-20 lg:px-20 lg:py-24"
          style={{ background: GRADIENT }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: `url("${WAVE_PATTERN}")`, backgroundSize: '140px 100px' }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay"
            style={{ backgroundImage: `url("${GRAIN}")`, backgroundSize: '140px 140px' }}
          />

          <WaveMark className="pointer-events-none absolute top-12 right-10 hidden opacity-30 sm:block" size={150} rotate={-6} />
          <WaveMark className="pointer-events-none absolute bottom-14 left-10 hidden opacity-20 lg:block" size={110} rotate={4} />

          <div className="relative mx-auto max-w-2xl">
            <span data-reveal className="font-serif text-6xl text-cream/40 italic sm:text-7xl">
              &ldquo;
            </span>

            <h2
              data-reveal
              className="mt-1 font-display text-[2rem] leading-[1.12] font-semibold text-cream sm:text-[2.75rem] lg:text-[3.5rem]"
            >
              Ready to start a wave?
            </h2>

            <p data-reveal className="mx-auto mt-5 max-w-md text-base leading-relaxed text-cream/80 sm:text-lg">
              Tell us about your brand. We&rsquo;ll show you what we&rsquo;d test first.
            </p>

            <a
              data-reveal
              href="#start-a-wave"
              data-cursor="button"
              className="mt-9 inline-flex items-center gap-1.5 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-ink-soft"
            >
              Start a wave
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
