import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../lib/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// Two triangular chevrons pointing at each other - a generic geometric
// accent (not a redraw of any specific reference artwork), echoing the
// wave/arrow motifs already used in the hero.
function ArrowMark({ className, size = 96, rotate = 0 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        d="M12 8 L40 40 L12 72 M68 8 L40 40 L68 72"
        stroke="var(--color-cream)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const GRADIENT = [
  'radial-gradient(120% 140% at 12% 15%, var(--color-wave-red) 0%, transparent 55%)',
  'radial-gradient(100% 120% at 65% 5%, var(--color-wave-orange-deep) 0%, transparent 60%)',
  'radial-gradient(120% 140% at 90% 95%, var(--color-wave-peach) 0%, transparent 55%)',
  'linear-gradient(135deg, var(--color-wave-red) 0%, var(--color-wave-orange-deep) 35%, var(--color-wave-orange) 68%, var(--color-wave-peach) 100%)',
].join(', ')

const GRID = [
  'linear-gradient(rgba(247,241,232,0.08) 1px, transparent 1px)',
  'linear-gradient(90deg, rgba(247,241,232,0.08) 1px, transparent 1px)',
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
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{ backgroundImage: GRID, backgroundSize: '44px 44px' }}
          />

          <ArrowMark className="pointer-events-none absolute top-10 right-12 hidden opacity-25 sm:block" size={110} rotate={-8} />
          <ArrowMark className="pointer-events-none absolute right-28 bottom-16 hidden opacity-15 lg:block" size={70} rotate={14} />
          <ArrowMark className="pointer-events-none absolute top-1/2 right-4 hidden -translate-y-1/2 opacity-15 lg:block" size={54} rotate={-20} />

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
