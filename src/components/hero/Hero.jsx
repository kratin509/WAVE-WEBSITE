import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { useIsMobile } from '../../lib/useIsMobile'
import { useNavTheme } from '../../lib/navTheme'
import { smoothScrollTo } from '../../lib/scrollTo'
import { CardsFlow } from './CardsFlow'

const WaveScene = lazy(() =>
  import('./WaveScene').then((m) => ({ default: m.WaveScene })),
)

gsap.registerPlugin(ScrollTrigger)

const HEADLINE_LINES = ['TURN UGC INTO', 'YOUR NEXT', 'GROWTH CHANNEL.']

function StaticWaveBackdrop() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(120% 90% at 30% 20%, #ffcf4d 0%, #ff8a1f 32%, #e6231a 62%, #170d08 100%)',
      }}
    />
  )
}

export function Hero() {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const { setOnDark } = useNavTheme()

  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)

  const [motionState] = useState(() => ({ mouseX: 0, mouseY: 0, progress: 0 }))

  // Entrance
  useEffect(() => {
    const targets = [
      eyebrowRef.current,
      ...(headlineRef.current ? Array.from(headlineRef.current.children) : []),
      subRef.current,
      ctaRef.current,
    ].filter(Boolean)

    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0, filter: 'blur(0px)' })
      return
    }

    gsap.set(targets, { opacity: 0, y: 46, filter: 'blur(10px)' })
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 })
    tl.to(eyebrowRef.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6 })
    if (headlineRef.current) {
      tl.to(
        headlineRef.current.children,
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.1 },
        '-=0.3',
      )
    }
    tl.to(subRef.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, '-=0.55')
    tl.to(ctaRef.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, '-=0.55')
  }, [reduced])

  // Cursor parallax → motionState
  useEffect(() => {
    if (reduced || mobile) return
    const onMove = (e) => {
      motionState.mouseX = (e.clientX / window.innerWidth) * 2 - 1
      motionState.mouseY = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced, mobile, motionState])

  // Scroll-out: enter-the-wave transition + nav theme swap
  useEffect(() => {
    if (!sectionRef.current) return

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.35,
      onUpdate: (self) => {
        motionState.progress = self.progress
        setOnDark(self.progress > 0.22)

        if (reduced) return
        const p = self.progress
        gsap.set(headlineRef.current, {
          opacity: Math.max(0, 1 - p * 1.5),
          y: -p * 140,
          filter: `blur(${p * 8}px)`,
        })
        gsap.set(subRef.current, { opacity: Math.max(0, 1 - p * 1.9), y: -p * 70 })
        gsap.set(ctaRef.current, { opacity: Math.max(0, 1 - p * 2.2), y: -p * 50 })
        gsap.set(eyebrowRef.current, { opacity: Math.max(0, 1 - p * 2.6) })
      },
    })

    return () => st.kill()
  }, [reduced, setOnDark, motionState])

  const handleSeeHowItWorks = (e) => {
    e.preventDefault()
    smoothScrollTo('#how-it-works')
  }

  return (
    <section id="top" ref={sectionRef} className="relative" style={{ height: '190vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        <div className="absolute inset-0 z-0">
          {reduced ? (
            <StaticWaveBackdrop />
          ) : (
            <Suspense fallback={<StaticWaveBackdrop />}>
              <WaveScene motion={motionState} quality={mobile ? 'low' : 'high'} />
            </Suspense>
          )}
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(to bottom, rgba(23,13,8,0.15) 0%, rgba(23,13,8,0) 30%, rgba(23,13,8,0) 55%, rgba(23,13,8,0.85) 100%)',
          }}
        />

        <div className="absolute inset-0 z-20">
          <CardsFlow motionState={motionState} reduced={reduced} mobile={mobile} />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-30"
          style={{
            background:
              'radial-gradient(48% 42% at 50% 46%, rgba(15,8,5,0.55) 0%, rgba(15,8,5,0.28) 55%, rgba(15,8,5,0) 100%)',
          }}
        />

        <div className="relative z-40 flex h-full w-full flex-col items-center justify-center px-6 text-center sm:px-8">
          <p
            ref={eyebrowRef}
            className="mb-5 text-[11px] font-semibold tracking-[0.28em] text-cream/70 uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-xs"
          >
            UGC-Led Growth for Consumer Apps + D2C Brands
          </p>

          <h1
            ref={headlineRef}
            className="font-display text-[8vw] leading-[0.94] font-extrabold tracking-tight whitespace-nowrap text-cream drop-shadow-[0_6px_30px_rgba(0,0,0,0.55)] sm:text-[7.4vw] lg:text-[5.8vw]"
          >
            {HEADLINE_LINES.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p
            ref={subRef}
            className="mt-7 max-w-xl text-sm leading-relaxed text-cream/85 drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)] text-balance sm:text-base"
          >
            We run 100+ UGC experiments across creators, hooks and formats to find
            what works — then scale the winners into viral campaigns that drive
            lower-CAC customer acquisition.
          </p>

          <div ref={ctaRef} className="mt-9 flex flex-col items-center gap-5 sm:flex-row">
            <a
              href="#start-a-wave"
              data-cursor="button"
              className="rounded-full bg-cream px-7 py-3.5 text-sm font-semibold tracking-wide text-ink uppercase transition-colors hover:bg-wave-yellow"
            >
              Start a Wave →
            </a>
            <a
              href="#how-it-works"
              onClick={handleSeeHowItWorks}
              data-cursor="link"
              className="text-sm font-semibold tracking-wide text-cream/80 uppercase underline decoration-cream/30 underline-offset-4 transition-colors hover:text-cream"
            >
              See how it works ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
