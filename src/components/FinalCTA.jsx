import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../lib/useReducedMotion'
import { useSectionNavTheme } from '../lib/useSectionNavTheme'

gsap.registerPlugin(ScrollTrigger)

export function FinalCTA() {
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)
  useSectionNavTheme(sectionRef, { dark: true, start: 'top 80%', end: 'bottom bottom', onLeave: false })

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
      className="relative bg-ink px-6 py-20 text-center sm:px-10 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-xl">
        <h2
          data-reveal
          className="font-display text-[1.75rem] leading-[1.15] font-semibold text-cream sm:text-[2.25rem] lg:text-[2.75rem]"
        >
          ready to start a <span className="text-wave-orange">wave?</span>
        </h2>

        <p data-reveal className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-cream/55 sm:text-[15px]">
          Tell us about your brand. We&rsquo;ll show you what we&rsquo;d test first.
        </p>

        <a
          data-reveal
          href="#start-a-wave"
          data-cursor="button"
          className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-wave-orange-deep px-6 py-3 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-wave-orange"
        >
          Start a wave
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}
