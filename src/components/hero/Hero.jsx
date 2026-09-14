import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { useIsMobile } from '../../lib/useIsMobile'
import { smoothScrollTo } from '../../lib/scrollTo'
import { WaveLayers } from './WaveLayers'
import { WaveCards } from './WaveCards'

gsap.registerPlugin(ScrollTrigger)

const CHECKLIST = ['UGC strategy', 'Creator sourcing', 'Testing & iteration', 'Scale what works']

function HandLine({ className, style, color = 'var(--color-wave-orange-deep)', size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M20 3 L20 15 M20 25 L20 37 M3 20 L15 20 M25 20 L37 20 M7 7 L14.5 14.5 M25.5 25.5 L33 33 M33 7 L25.5 14.5 M14.5 25.5 L7 33"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function BarChartDoodle() {
  return (
    <svg width="34" height="28" viewBox="0 0 34 28" fill="none" aria-hidden="true">
      <path d="M2 26 L14 12 L20 18 L32 3" stroke="var(--color-ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M24 3 L32 3 L32 11" stroke="var(--color-ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M4 26 L4 20 M11 26 L11 16 M18 26 L18 21 M25 26 L25 13" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

function IdeasThatConvert() {
  return (
    <div
      className="pointer-events-none absolute z-30 hidden -rotate-3 flex-col items-end gap-1.5 lg:flex"
      style={{ right: '4%', top: '87%' }}
    >
      <span className="font-display rounded-lg bg-cream/90 px-3.5 py-1.5 text-base font-semibold whitespace-nowrap text-ink shadow-[0_4px_14px_rgba(22,17,15,0.15)]">
        Ideas that convert
      </span>
      <BarChartDoodle />
    </div>
  )
}

function Checkmark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="8" cy="8" r="8" fill="var(--color-wave-orange-deep)" />
      <path d="M4.5 8.2 L6.8 10.5 L11.5 5.5" stroke="var(--color-cream)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export function Hero() {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const checklistRef = useRef(null)

  const [motionState] = useState(() => ({ mouseX: 0, mouseY: 0 }))
  const scrollProgressRef = useRef(0)

  // Entrance
  useEffect(() => {
    const targets = [
      eyebrowRef.current,
      headlineRef.current,
      subRef.current,
      ctaRef.current,
      checklistRef.current,
    ].filter(Boolean)

    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    gsap.set(targets, { opacity: 0, y: 28 })
    gsap
      .timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 })
      .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.5 })
      .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.25')
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .to(checklistRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.35')
  }, [reduced])

  // Cursor tracking → shared motion state (read by the wave layers each frame)
  useEffect(() => {
    if (reduced || mobile) return
    const onMove = (e) => {
      motionState.mouseX = (e.clientX / window.innerWidth) * 2 - 1
      motionState.mouseY = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced, mobile, motionState])

  // Scroll-out: cards travel forward, copy eases up and out - background
  // never changes, so the handoff into the next section stays one
  // continuous canvas.
  useEffect(() => {
    if (!sectionRef.current || reduced) return

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.35,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress
        const p = self.progress
        gsap.set([eyebrowRef.current, headlineRef.current, subRef.current, ctaRef.current, checklistRef.current], {
          y: -p * 70,
          opacity: Math.max(0, 1 - p * 1.6),
        })
      },
    })

    return () => st.kill()
  }, [reduced])

  const handleSeeSystem = (e) => {
    e.preventDefault()
    smoothScrollTo('#how-it-works')
  }

  const waveBandHeight = mobile ? '30vh' : '40vh'

  return (
    <section id="top" ref={sectionRef} className="relative" style={{ height: '150vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-cream">
        {/* wave layers + cards, interleaved by z-index: back waves (10) <
            back cards (14) < front waves (20) < front/hero cards (24-40) */}
        <WaveLayers
          ids={['l1', 'l2']}
          motionState={motionState}
          mobile={mobile}
          style={{ height: waveBandHeight, zIndex: 10 }}
        />

        <WaveCards scrollProgressRef={scrollProgressRef} mobile={mobile} />

        <WaveLayers
          ids={['l3', 'l4']}
          motionState={motionState}
          mobile={mobile}
          style={{ height: waveBandHeight, zIndex: 20 }}
        />

        {/* hand-drawn emphasis marks - desktop only, kept well clear of the header */}
        <HandLine
          className="absolute hidden xl:block"
          style={{ top: '24%', left: '44%', zIndex: 30 }}
          size={44}
        />
        <HandLine
          className="absolute hidden -rotate-12 lg:block"
          style={{ top: '27%', left: '65%', zIndex: 45 }}
          color="var(--color-ink)"
          size={38}
        />
        <HandLine
          className="absolute hidden rotate-6 opacity-80 lg:block"
          style={{ top: '66%', left: '67%', zIndex: 30 }}
          size={36}
        />

        <IdeasThatConvert />

        <div className="relative z-50 flex h-full w-full items-start px-6 pt-24 sm:px-10 sm:pt-28 lg:pt-[17vh] lg:pl-[7vw]">
          <div className="w-full lg:max-w-[46vw]">
            <p
              ref={eyebrowRef}
              className="mb-4 flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-ink/55 uppercase"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-wave-orange-deep" />
              UGC growth for consumer apps + D2C
            </p>

            <h1 ref={headlineRef} className="font-display leading-[1.02] tracking-tight text-ink">
              <span className="block text-[7vw] font-medium sm:text-3xl lg:text-[2.3vw]">
                Turn UGC into
              </span>
              <span className="mt-1 block text-[11vw] font-extrabold sm:text-6xl lg:text-[4.7vw]">
                your next
              </span>
              <span className="block text-[11vw] font-extrabold text-wave-orange-deep sm:text-6xl lg:text-[4.7vw]">
                growth channel.
              </span>
            </h1>

            <p ref={subRef} className="mt-6 max-w-md text-base leading-relaxed text-ink/60">
              Real creators. Real content. Real users.
              <br />
              We find what hits. Then we scale it.
            </p>

            <div ref={ctaRef} className="mt-7 flex flex-wrap items-center gap-6">
              <a
                href="#start-a-wave"
                data-cursor="button"
                className="rounded-full bg-wave-orange-deep px-6 py-3 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-ink"
              >
                Start a wave →
              </a>
              <a
                href="#how-it-works"
                onClick={handleSeeSystem}
                data-cursor="link"
                className="flex items-center gap-1.5 text-sm font-semibold tracking-wide text-ink/60 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink"
              >
                See how it works →
              </a>
            </div>

            <div ref={checklistRef} className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              {CHECKLIST.map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-[13px] font-medium text-ink/65">
                  <Checkmark />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
