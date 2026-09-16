import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../lib/useReducedMotion'
import { CountUp } from './ui/CountUp'
import hookC from '../assets/experiments/hookC.jpg'

gsap.registerPlugin(ScrollTrigger)

// Light, warm, editorial palette - scoped to this section only (not the
// shared design tokens). Orange (--color-wave-orange-deep, matches the
// requested #FF4B1F exactly) is reserved for active/high-attention
// details only, never the background.
const BG = '#FFFFFF' // main background
const PANEL = '#FFF0E2' // expanded/active content panel
const RESULT_PANEL = '#CC6046' // the "06 - result" panel only, reusing the same toned-down orange used in FinalCTA's full-bleed gradient

const STAGES = [
  {
    n: '01',
    label: 'the brief',
    eyebrow: 'the problem',
    body: 'A consumer shopping app had a strong product but flat organic growth. Paid CAC was climbing, and nobody could say which creative angle would actually convert.',
  },
  {
    n: '02',
    label: 'the experiment',
    eyebrow: 'the test',
    body: 'We recruited a slate of creators and tested nine distinct hooks — problem-first, POV, tutorial, before/after, lifestyle, testimonial — across dozens of early variations.',
  },
  {
    n: '03',
    label: 'the discovery',
    eyebrow: 'why it matters',
    body: "The best-performing hook wasn't the most polished video — it was a rough, close-to-camera POV that named the exact frustration the product solved. Authenticity beat production value, and no amount of agency polish would have found that.",
  },
  {
    n: '04',
    label: 'the winner',
    eyebrow: 'the hook',
    body: '“How I find what I actually want in 30 seconds.” A plain-spoken, result-driven POV that named the outcome instead of the features.',
  },
  {
    n: '05',
    label: 'the scale',
    eyebrow: 'the rollout',
    body: 'We recreated the winning angle across 20 creators and 47 variations — keeping the core hook intact while testing pacing, captions and hook order.',
  },
]

function ResultStat({ value, label }) {
  return (
    <div className="text-center">
      <CountUp
        value={value}
        className="font-display text-4xl font-semibold text-cream tabular-nums sm:text-6xl lg:text-7xl"
      />
      <p className="mt-2 text-xs text-cream/70 sm:text-sm">{label}</p>
    </div>
  )
}

function CaseRow({ stage, index, active, onActivate }) {
  const isActive = active === index
  return (
    <div
      data-cursor="link"
      onMouseEnter={() => onActivate(index)}
      onClick={() => onActivate(index)}
      onFocus={() => onActivate(index)}
      tabIndex={0}
      role="button"
      aria-expanded={isActive}
      className="cursor-pointer border-b border-[#DDBFA9] px-4 transition-colors duration-300 first:border-t first:border-t-[#DDBFA9] sm:px-6"
      style={{ backgroundColor: isActive ? PANEL : 'transparent' }}
    >
      <div className="grid grid-cols-[1fr_auto] items-center gap-4 py-6 sm:grid-cols-[1fr_72px_32px] sm:gap-6">
        <h3
          className={`text-right font-display text-xl font-medium tracking-tight transition-colors duration-300 sm:text-2xl lg:text-[2.1rem] ${
            isActive ? 'text-[#211914]' : 'text-[#A98776]'
          }`}
        >
          {stage.label}
        </h3>
        <span
          className={`flex items-center justify-center rounded-sm border py-1 font-mono text-xs transition-colors duration-300 ${
            isActive ? 'border-[#DDBFA9] bg-wave-orange-deep text-cream' : 'border-[#DDBFA9] text-[#A98776]'
          }`}
        >
          {stage.n}
        </span>
        <span
          className={`hidden text-right text-lg text-[#FF4B1F] transition-opacity duration-300 sm:block ${
            isActive ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          ↗
        </span>
      </div>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isActive ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="pb-6">
            <p className="font-mono text-[11px] tracking-[0.12em] text-[#FF4B1F] uppercase">{stage.eyebrow}</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#66564C] sm:text-[15px]">{stage.body}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CaseStudies() {
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)

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
      id="case-studies"
      ref={sectionRef}
      className="relative px-6 py-20 sm:px-10 sm:py-24 lg:px-[7vw] lg:py-28"
      style={{ backgroundColor: BG }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div data-reveal className="border-b border-[#DDBFA9] pb-10 sm:pb-12">
          <span className="inline-block rounded-full bg-[#FFF0E2] px-2.5 py-1 text-[10px] font-medium tracking-wide text-[#66564C] uppercase">
            case studies
          </span>
          <h2 className="mt-5 font-display leading-[1.02]">
            <span className="block text-[3.4rem] font-bold tracking-tight text-[#211914] sm:text-[5.2rem] lg:text-[7rem]">
              every result has a
            </span>
            <span className="block font-serif text-[3.6rem] text-[#FF4B1F] italic sm:text-[5.5rem] lg:text-[7.4rem]">
              story.
            </span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[#66564C] sm:text-[15px]">
            Not a folder of clips and a view count — a growth story, stage by stage.
          </p>
        </div>

        <div data-reveal className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="aspect-[9/16] w-40 overflow-hidden rounded-2xl ring-2 ring-[#FF4B1F] ring-offset-2 ring-offset-white sm:w-52 lg:w-full">
              <img src={hookC} alt="The winning hook from this case study" className="h-full w-full object-cover" />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-wave-orange-deep font-mono text-[11px] text-cream">
                {STAGES[active].n}
              </span>
              <p className="text-sm font-medium text-[#211914]">now viewing — {STAGES[active].label}</p>
            </div>
            <p className="mt-2 text-xs text-[#66564C]">Illustrative example, built from the Hook C test.</p>
          </div>

          <div className="mt-2">
            {STAGES.map((stage, i) => (
              <CaseRow key={stage.n} stage={stage} index={i} active={active} onActivate={setActive} />
            ))}
          </div>
        </div>

        <div
          data-reveal
          className="mt-14 w-full rounded-2xl px-6 py-10 text-center sm:px-14 sm:py-12 lg:px-20"
          style={{ backgroundColor: RESULT_PANEL }}
        >
          <p className="text-[11px] font-medium tracking-wide text-cream/80 uppercase">06 — the result</p>
          <div className="mt-6 grid grid-cols-3 gap-6 sm:gap-16 lg:gap-24">
            <ResultStat value="8.3M" label="views total" />
            <ResultStat value="47" label="variations tested" />
            <ResultStat value="20" label="creators onboarded" />
          </div>
          <p className="mt-6 text-xs text-cream/60">Illustrative example — figures shown are sample data.</p>
        </div>
      </div>
    </section>
  )
}
