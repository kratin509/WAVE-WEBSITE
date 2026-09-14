import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../lib/useReducedMotion'
import { SectionLabel } from './ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    n: '01.',
    title: 'build the playbook',
    body: 'We research your audience, product and competitors and develop dozens of creative angles worth testing.',
  },
  {
    n: '02.',
    title: 'launch the wave',
    body: 'Creators start publishing across fresh accounts, testing different hooks, formats, narratives and audiences.',
  },
  {
    n: '03.',
    title: 'find the winners',
    body: 'We track performance and identify the creatives that break through.',
  },
  {
    n: '04.',
    title: 'scale what works',
    body: 'Winning ideas get recreated across more creators and more variations until they become campaigns.',
  },
  {
    n: '05.',
    title: 'turn attention into acquisition',
    body: 'The best-performing creative becomes an ongoing source of organic reach, customers and paid creative.',
  },
]

export function HowItWorks() {
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)
  const fillRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean)

    if (reduced) {
      gsap.set(items, { opacity: 1, y: 0 })
      if (fillRef.current) gsap.set(fillRef.current, { height: '100%' })
      return
    }

    const ctx = gsap.context(() => {
      items.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })

      if (fillRef.current) {
        gsap.fromTo(
          fillRef.current,
          { height: '0%' },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 60%',
              scrub: 0.3,
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative bg-cream px-6 py-20 sm:px-10 sm:py-24 lg:px-[7vw] lg:py-28"
    >
      <div className="mx-auto max-w-[1360px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[300px_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>our approach</SectionLabel>
            <h2 className="mt-4 font-display text-[1.75rem] leading-[1.15] font-semibold tracking-tight text-ink sm:text-[2.1rem]">
              how it works
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/50">
              Five steps, one continuous loop. Same process every time.
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-0 left-0 hidden h-full w-px bg-ink/10 md:block">
              <div ref={fillRef} className="w-full bg-wave-orange-deep" style={{ height: '0%' }} />
            </div>

            <div className="md:pl-10">
              {STEPS.map((step, i) => (
                <div
                  key={step.n}
                  ref={(el) => {
                    itemRefs.current[i] = el
                  }}
                  className="border-t border-ink/10 py-10 first:border-t-0 first:pt-0 sm:py-12"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-7">
                    <span className="font-display text-sm text-ink/40 tabular-nums">{step.n}</span>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">{step.title}</h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/55 sm:text-[15px]">{step.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
