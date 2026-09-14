import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../lib/useReducedMotion'
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
      <p className="font-display text-2xl font-semibold text-ink">{value}</p>
      <p className="mt-0.5 text-xs text-ink/50">{label}</p>
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
        <div className="mx-auto max-w-2xl text-center">
          <span
            data-reveal
            className="inline-block rounded-full bg-wave-peach-light/70 px-2.5 py-1 text-[10px] font-medium tracking-wide text-ink/70 uppercase"
          >
            case studies
          </span>

          <h2
            data-reveal
            className="mt-4 font-display text-2xl leading-[1.15] font-semibold text-ink sm:text-3xl lg:text-[2.5rem]"
          >
            every result has a story.
          </h2>

          <p data-reveal className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink/50 sm:text-[15px]">
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
                className={`border-t border-ink/10 py-8 first:border-t-0 first:pt-0 sm:py-9 ${
                  stage.highlight ? 'border-l-2 border-l-wave-orange-deep pl-5 sm:pl-6' : ''
                }`}
              >
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="font-display text-xs text-ink/40 tabular-nums">{stage.n}</span>
                  <div className="flex-1">
                    <h3 className="font-display text-base font-semibold text-ink sm:text-lg">{stage.label}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/60">{stage.body}</p>
                    {stage.highlight && (
                      <p className="mt-2 text-[11px] font-medium tracking-wide text-wave-orange-deep uppercase">
                        why it matters — this is the part a production agency never gets to
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="border-t border-ink/10 py-8 sm:py-9">
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-6">
                <span className="font-display text-xs text-ink/40 tabular-nums">06</span>
                <div className="flex-1">
                  <h3 className="font-display text-base font-semibold text-ink sm:text-lg">the result</h3>
                  <div className="mt-4 flex flex-wrap gap-x-10 gap-y-6">
                    <ResultStat value="8.3M" label="views total" />
                    <ResultStat value="47" label="variations tested" />
                    <ResultStat value="20" label="creators onboarded" />
                  </div>
                  <p className="mt-4 text-xs text-ink/40">Illustrative example — figures shown are sample data.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
