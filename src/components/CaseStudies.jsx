import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../lib/useReducedMotion'
import { SectionLabel } from './ui/SectionLabel'
import hookC from '../assets/experiments/hookC.jpg'

gsap.registerPlugin(ScrollTrigger)

const STAGES = [
  {
    n: '01',
    label: 'the brief',
    body: 'A consumer shopping app had a strong product but flat organic growth. Paid CAC was climbing, and nobody could say which creative angle would actually convert.',
  },
  {
    n: '02',
    label: 'the experiment',
    body: 'We recruited a slate of creators and tested nine distinct hooks — problem-first, POV, tutorial, before/after, lifestyle, testimonial — across dozens of early variations.',
  },
  {
    n: '03',
    label: 'the discovery',
    body: "The best-performing hook wasn't the most polished video — it was a rough, close-to-camera POV that named the exact frustration the product solved. Authenticity beat production value, and no amount of agency polish would have found that.",
    highlight: true,
  },
  {
    n: '04',
    label: 'the winner',
    body: '“How I find what I actually want in 30 seconds.” A plain-spoken, result-driven POV that named the outcome instead of the features.',
  },
  {
    n: '05',
    label: 'the scale',
    body: 'We recreated the winning angle across 20 creators and 47 variations — keeping the core hook intact while testing pacing, captions and hook order.',
  },
]

function ResultStat({ value, label }) {
  return (
    <div>
      <p className="font-display text-3xl font-semibold text-ink sm:text-4xl">{value}</p>
      <p className="mt-1 text-xs text-ink/60 sm:text-sm">{label}</p>
    </div>
  )
}

export function CaseStudies() {
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
    <section
      id="case-studies"
      ref={sectionRef}
      className="relative bg-cream px-6 py-20 sm:px-10 sm:py-24 lg:px-[7vw] lg:py-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <div
          data-reveal
          className="grid grid-cols-1 gap-4 border-b border-ink/10 pb-10 sm:pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-end lg:gap-16"
        >
          <div>
            <SectionLabel>case studies</SectionLabel>
            <h2 className="mt-4 font-display text-[1.75rem] leading-[1.15] font-semibold text-ink sm:text-[2.25rem] lg:text-[2.75rem]">
              every result has a story.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink/50 sm:text-[15px] lg:text-right">
            Not a folder of clips and a view count — a growth story, stage by stage.
          </p>
        </div>

        <div data-reveal className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="aspect-[9/16] w-28 overflow-hidden rounded-xl ring-2 ring-wave-orange-deep ring-offset-2 ring-offset-cream sm:w-32">
              <img src={hookC} alt="The winning hook from this case study" className="h-full w-full object-cover" />
            </div>
            <p className="mt-3 text-xs text-ink/40">Illustrative example, built from the Hook C test.</p>
          </div>

          <div>
            {STAGES.map((stage) => (
              <div
                key={stage.n}
                className={`group border-t border-l-2 border-ink/10 py-8 pl-5 transition-colors duration-300 first:border-t-0 first:pt-0 sm:py-9 sm:pl-6 ${
                  stage.highlight ? 'border-l-wave-orange-deep' : 'border-l-transparent hover:border-l-wave-orange-deep'
                }`}
              >
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-6">
                  <span
                    className={`font-display text-xs tabular-nums transition-colors duration-300 ${
                      stage.highlight ? 'text-wave-orange-deep' : 'text-ink/40 group-hover:text-wave-orange-deep'
                    }`}
                  >
                    {stage.n}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-ink sm:text-xl">{stage.label}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/55">{stage.body}</p>
                    {stage.highlight && (
                      <p className="mt-2 text-[11px] font-medium tracking-wide text-wave-orange-deep uppercase">
                        why it matters — this is the part a production agency never gets to
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliberately not --color-wave-orange-deep - full-bleed at this size it
            needs to be muted, not the vivid brand accent used for CTAs. */}
        <div data-reveal className="mt-14 rounded-2xl bg-[#d35e41] px-6 py-10 sm:px-10 sm:py-12">
          <p className="text-[11px] font-medium tracking-wide text-ink/60 uppercase">06 — the result</p>
          <div className="mt-5 flex flex-wrap gap-x-12 gap-y-6">
            <ResultStat value="8.3M" label="views total" />
            <ResultStat value="47" label="variations tested" />
            <ResultStat value="20" label="creators onboarded" />
          </div>
          <p className="mt-6 text-xs text-ink/55">Illustrative example — figures shown are sample data.</p>
        </div>
      </div>
    </section>
  )
}
