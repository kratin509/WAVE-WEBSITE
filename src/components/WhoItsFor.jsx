import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../lib/useReducedMotion'
import { SectionLabel } from './ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = ['Consumer apps', 'D2C brands', 'High-growth consumer businesses']

// Faint dot-grid texture, radially faded so it reads as an ambient
// backdrop rather than a hard tiled pattern - dots are ink at low
// opacity since this section sits on the light cream background.
function DotGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        color: 'var(--color-ink)',
        opacity: 0.14,
        maskImage: 'radial-gradient(ellipse 60% 55% at 50% 45%, black 40%, transparent 90%)',
        WebkitMaskImage: 'radial-gradient(ellipse 60% 55% at 50% 45%, black 40%, transparent 90%)',
      }}
    />
  )
}

export function WhoItsFor() {
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
      id="who-its-for"
      ref={sectionRef}
      className="relative overflow-hidden bg-cream px-6 py-20 sm:px-10 sm:py-24 lg:px-[7vw] lg:py-28"
    >
      <DotGrid />
      <div className="relative mx-auto max-w-2xl text-center">
        <SectionLabel data-reveal>who it&rsquo;s for</SectionLabel>

        <h2
          data-reveal
          className="mt-4 font-display text-[1.75rem] leading-[1.15] font-semibold text-ink sm:text-[2.25rem] lg:text-[2.75rem]"
        >
          built for brands that already have something worth growing.
        </h2>

        <div data-reveal className="mt-7 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-ink/12 px-4 py-2 text-sm font-medium text-ink/70"
            >
              {cat}
            </span>
          ))}
        </div>

        <p data-reveal className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-ink/50 sm:text-[15px]">
          Best suited for brands with existing product-market fit and a clear acquisition goal.
        </p>
      </div>
    </section>
  )
}
