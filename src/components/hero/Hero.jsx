import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { useIsMobile } from '../../lib/useIsMobile'
import { smoothScrollTo } from '../../lib/scrollTo'
import { WaveRibbons } from './WaveRibbons'
import { WaveCards } from './WaveCards'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)

  const [motionState] = useState(() => ({ mouseX: 0, mouseY: 0 }))
  const scrollProgressRef = useRef(0)

  // Entrance
  useEffect(() => {
    const targets = [eyebrowRef.current, headlineRef.current, subRef.current, ctaRef.current].filter(
      Boolean,
    )

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
  }, [reduced])

  // Cursor tracking → shared motion state (read by the ribbons each frame)
  useEffect(() => {
    if (reduced || mobile) return
    const onMove = (e) => {
      motionState.mouseX = (e.clientX / window.innerWidth) * 2 - 1
      motionState.mouseY = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced, mobile, motionState])

  // Scroll-out: ribbon rises, cards travel forward, copy eases up and out -
  // background never changes, so the handoff into the next section stays
  // one continuous canvas.
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
        gsap.set([eyebrowRef.current, headlineRef.current, subRef.current, ctaRef.current], {
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

  return (
    <section id="top" ref={sectionRef} className="relative" style={{ height: '160vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-cream">
        <div className={mobile ? 'absolute inset-x-0 bottom-0 h-[42vh]' : 'absolute inset-0'}>
          <WaveRibbons motionState={motionState} scrollProgressRef={scrollProgressRef} />
        </div>

        <WaveCards scrollProgressRef={scrollProgressRef} mobile={mobile} />

        <div className="relative z-30 flex h-full w-full items-center px-6 sm:px-10 lg:pl-[9vw]">
          <div className="max-w-xl">
            <p
              ref={eyebrowRef}
              className="mb-4 flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-ink/55 uppercase"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-wave-orange-deep" />
              UGC growth for consumer apps + D2C
            </p>

            <h1
              ref={headlineRef}
              className="font-display leading-[1.02] tracking-tight text-ink"
            >
              <span className="block text-[7vw] font-medium sm:text-3xl lg:text-[2.5vw]">
                Turn UGC into
              </span>
              <span className="mt-1 block text-[12vw] font-extrabold sm:text-6xl lg:text-[5.2vw]">
                your next <span className="text-wave-orange-deep">growth channel.</span>
              </span>
            </h1>

            <p ref={subRef} className="mt-6 max-w-sm text-base leading-relaxed text-ink/60">
              100+ creative experiments. Real creators. Real audience data.
              <br />
              We find what hits. Then we scale it.
            </p>

            <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-6">
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
                className="text-sm font-semibold tracking-wide text-ink/60 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink"
              >
                See the system ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
