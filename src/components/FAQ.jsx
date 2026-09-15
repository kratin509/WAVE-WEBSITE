import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../lib/useReducedMotion'
import { SectionLabel } from './ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const QUESTIONS = [
  {
    q: 'Is this influencer marketing?',
    a: "No. We're not paying creators for their audience. We're using creators to produce and distribute a large volume of creative experiments — the goal is finding what content works, not renting someone's followers.",
  },
  {
    q: 'Do you guarantee virality?',
    a: 'No. Nobody can. We engineer the process around testing enough creative to dramatically increase the odds of finding breakout content — volume and iteration replace guesswork.',
  },
  {
    q: 'Where does the content get posted?',
    a: "Content runs from a network of dedicated creator and seeding accounts we manage — not your brand's main handle. That keeps testing fast and your official channels curated. When a piece proves itself, we turn it into paid ads and, where it fits, feed it back into your own accounts.",
  },
  {
    q: 'Can you run this alongside our existing paid ads?',
    a: 'Yes — and this is where the relationship between organic testing and paid amplification becomes powerful. Every winning organic post becomes a validated ad concept, so your paid team stops guessing what to test next.',
  },
  {
    q: 'How many creators/videos do we need?',
    a: 'Most engagements start with 15–25 creators producing 40–60 pieces of content in the first testing cycle — enough volume to find a statistically meaningful winner without spreading review too thin.',
  },
  {
    q: 'How long before we see results?',
    a: 'The first testing cycle typically runs 3–4 weeks. Early signal on which hooks are resonating often shows up in the first 1–2 weeks; identifying a genuine winner and starting to scale usually takes the full cycle.',
  },
]

function PlusIcon({ open }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
    >
      <path d="M8 1.5 L8 14.5 M1.5 8 L14.5 8" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-ink/10 py-6 first:border-t-0 first:pt-0">
      <button
        type="button"
        data-cursor="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-6 text-left"
      >
        <span className="font-display text-base font-semibold text-ink">{q}</span>
        <PlusIcon open={open} />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/55">{a}</p>
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
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
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="faq" ref={sectionRef} className="relative bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-[7vw] lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-20">
          <div data-reveal className="lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>faq</SectionLabel>
            <h2 className="mt-4 font-display text-[1.75rem] leading-[1.15] font-semibold text-ink sm:text-[2.1rem]">
              questions, answered.
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/50">
              The objections we hear most, answered plainly.
            </p>
          </div>

          <div data-reveal>
            {QUESTIONS.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
