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

// The wave sits as a contained band along the bottom at rest — most of the
// hero stays calm white/cream so the dark headline actually has contrast —
// then grows to fill the screen as the user scrolls "into" it.
const WAVE_REST_VH = 38

function StaticWaveBackdrop() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(120% 90% at 30% 15%, #ffd873 0%, #ff9d42 34%, #f2401f 68%, #d4290f 100%)',
      }}
    />
  )
}

export function Hero() {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const { setOnDark } = useNavTheme()

  const sectionRef = useRef(null)
  const waveBandRef = useRef(null)
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

  // Scroll-out: the wave band rises to fill the screen, headline fades back,
  // nav swaps to its light-on-dark variant once the wave takes over.
  useEffect(() => {
    if (!sectionRef.current) return

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.35,
      onUpdate: (self) => {
        motionState.progress = self.progress
        setOnDark(self.progress > 0.45)

        if (reduced) return
        const p = self.progress

        if (waveBandRef.current) {
          gsap.set(waveBandRef.current, { height: `${WAVE_REST_VH + p * (100 - WAVE_REST_VH)}vh` })
        }
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
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-cream">
        {/* subtle orange presence behind the headline — accent, not a wash */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(60% 45% at 50% 30%, rgba(255,157,66,0.16) 0%, rgba(255,157,66,0) 70%)',
          }}
        />

        <div
          ref={waveBandRef}
          className="absolute inset-x-0 bottom-0 z-10 overflow-hidden"
          style={{
            height: `${WAVE_REST_VH}vh`,
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%)',
          }}
        >
          {reduced ? (
            <StaticWaveBackdrop />
          ) : (
            <Suspense fallback={<StaticWaveBackdrop />}>
              <WaveScene motion={motionState} quality={mobile ? 'low' : 'high'} />
            </Suspense>
          )}
        </div>

        <div className="absolute inset-0 z-20">
          <CardsFlow motionState={motionState} reduced={reduced} mobile={mobile} />
        </div>

        <div
          className="relative z-40 flex h-full w-full flex-col items-center justify-center px-6 text-center sm:px-8"
          style={{ paddingBottom: `${WAVE_REST_VH}vh`, paddingTop: '7rem' }}
        >
          <p
            ref={eyebrowRef}
            className="mb-5 rounded-full border border-ink/12 bg-white/70 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-ink/70 uppercase backdrop-blur-sm sm:text-xs"
          >
            UGC-Led Growth for Consumer Apps + D2C Brands
          </p>

          <h1
            ref={headlineRef}
            className="font-display text-[8vw] leading-[0.94] font-extrabold tracking-tight whitespace-nowrap text-ink sm:text-[7.4vw] lg:text-[5.8vw]"
          >
            {HEADLINE_LINES.map((line, i) => (
              <span
                key={line}
                className={`block ${i === HEADLINE_LINES.length - 1 ? 'text-wave-red' : ''}`}
              >
                {line}
              </span>
            ))}
          </h1>

          <p
            ref={subRef}
            className="mt-7 max-w-xl text-sm leading-relaxed text-ink/65 text-balance sm:text-base"
          >
            We run 100+ UGC experiments across creators, hooks and formats to find
            what works — then scale the winners into viral campaigns that drive
            lower-CAC customer acquisition.
          </p>

          <div ref={ctaRef} className="mt-9 flex flex-col items-center gap-5 sm:flex-row">
            <a
              href="#start-a-wave"
              data-cursor="button"
              className="rounded-full bg-wave-red px-7 py-3.5 text-sm font-semibold tracking-wide text-cream uppercase shadow-[0_10px_30px_rgba(242,64,31,0.35)] transition-colors hover:bg-ink"
            >
              Start a Wave →
            </a>
            <a
              href="#how-it-works"
              onClick={handleSeeHowItWorks}
              data-cursor="link"
              className="text-sm font-semibold tracking-wide text-ink/70 uppercase underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink"
            >
              See how it works ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
