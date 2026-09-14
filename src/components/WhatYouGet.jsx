import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../lib/useReducedMotion'
import { useSectionNavTheme } from '../lib/useSectionNavTheme'
import { SectionLabel } from './ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="mt-0.5 shrink-0">
      <path
        d="M2.5 7.4 L5.3 10.2 L11.5 3.5"
        stroke="var(--color-wave-orange)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const PHASES = [
  {
    label: 'strategy',
    items: ['Creative strategy', 'Creator recruitment', 'Creator accounts'],
  },
  {
    label: 'production',
    items: ['Creative briefs', 'Content production', 'Daily review'],
  },
  {
    label: 'testing',
    items: ['Organic testing', 'Performance tracking', 'Winner identification'],
  },
  {
    label: 'scale',
    items: ['Creative iteration', 'Winner replication', 'Campaign scaling'],
  },
]

export function WhatYouGet() {
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)
  useSectionNavTheme(sectionRef, { dark: true })

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
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="what-you-get"
      ref={sectionRef}
      className="relative bg-ink px-6 py-20 sm:px-10 sm:py-24 lg:px-[7vw] lg:py-28"
    >
      <div className="mx-auto max-w-[1500px]">
        <div data-reveal className="max-w-xl">
          <SectionLabel tone="dark">what you get</SectionLabel>

          <h2 className="mt-4 font-display text-[1.75rem] leading-[1.15] font-semibold text-cream sm:text-[2.25rem] lg:text-[2.75rem]">
            you don&rsquo;t get a folder of UGC. you get a <span className="text-wave-orange">growth engine.</span>
          </h2>
        </div>

        <div
          data-reveal
          className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 border-t border-cream/10 pt-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PHASES.map((phase) => (
            <div key={phase.label}>
              <p className="text-[11px] font-semibold tracking-[0.15em] text-cream/35 uppercase">{phase.label}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-cream/70">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
