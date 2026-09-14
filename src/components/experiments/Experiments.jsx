import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { CATEGORIES, HOOKS, WINNER } from './experimentsData'

gsap.registerPlugin(ScrollTrigger)

const BREADCRUMB = ['Ideas', 'Tests', 'Data', 'Growth']
const AVATAR_TONES = ['bg-wave-orange-deep', 'bg-wave-orange', 'bg-ink-soft', 'bg-wave-peach']

function PlayIcon({ className }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className} aria-hidden="true">
      <circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeOpacity="0.7" />
      <path d="M5.7 4.6 L9.6 7 L5.7 9.4 Z" fill="currentColor" />
    </svg>
  )
}

function CurvedArrow() {
  return (
    <svg width="60" height="40" viewBox="0 0 60 40" fill="none" aria-hidden="true">
      <path
        d="M54 4 C 40 4, 18 8, 8 30"
        stroke="var(--color-ink)"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M17 24 L7 31 L11 19" stroke="var(--color-ink)" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

function HookCard({ hook }) {
  const isDark = hook.tone === 'dark'
  return (
    <div
      className="group relative shrink-0 snap-start pt-4"
      style={{ width: hook.winner ? '15.5vw' : '13.5vw', maxWidth: hook.winner ? 230 : 192, minWidth: hook.winner ? 176 : 150 }}
    >
      {hook.winner && (
        <span className="absolute top-0 left-1/2 z-10 -translate-x-1/2 rounded-full border border-wave-orange-deep/30 bg-cream px-3 py-1 text-[10px] font-semibold whitespace-nowrap text-wave-orange-deep uppercase shadow-sm">
          Top performer
        </span>
      )}
      <div
        data-cursor="play"
        className={`relative aspect-[9/16] overflow-hidden rounded-2xl transition-transform duration-300 group-hover:-translate-y-1 ${
          hook.winner ? 'ring-2 ring-wave-orange-deep ring-offset-2 ring-offset-cream' : 'border border-ink/10'
        }`}
        style={{
          background: isDark
            ? 'linear-gradient(165deg, var(--color-ink-soft), var(--color-ink))'
            : 'linear-gradient(165deg, var(--color-cream-dim), var(--color-wave-peach-light))',
          boxShadow: '0 18px 40px rgba(22,17,15,0.16)',
        }}
      >
        <span className={`absolute top-3 left-3 h-2 w-2 rounded-full ${isDark ? 'bg-cream/40' : 'bg-ink/25'}`} />
        <p
          className={`absolute inset-x-4 top-[38%] font-display text-[1.05rem] leading-snug font-semibold ${
            isDark ? 'text-cream' : 'text-ink'
          }`}
        >
          {hook.caption}
        </p>
        <div
          className={`absolute inset-x-3 bottom-3 flex items-center gap-1.5 text-xs font-semibold ${
            isDark ? 'text-cream/85' : 'text-ink/70'
          }`}
        >
          <PlayIcon />
          {hook.views}
        </div>
      </div>
      <div className="mt-3">
        <p className="font-display text-sm font-bold text-ink">Hook {hook.letter}</p>
        <p className="text-xs text-ink/50">{hook.label}</p>
      </div>
    </div>
  )
}

function AvatarStack() {
  return (
    <div className="flex items-center">
      {AVATAR_TONES.map((tone, i) => (
        <span
          key={i}
          className={`h-8 w-8 rounded-full border-2 border-cream ${tone}`}
          style={{ marginLeft: i === 0 ? 0 : -10 }}
        />
      ))}
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-cream bg-white text-[10px] font-semibold text-ink/60"
        style={{ marginLeft: -10 }}
      >
        +17
      </span>
    </div>
  )
}

function ThumbStack() {
  return (
    <div className="flex items-center">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="h-9 w-7 rounded-md border-2 border-cream"
          style={{
            marginLeft: i === 0 ? 0 : -8,
            background: `linear-gradient(165deg, var(--color-ink-soft), var(--color-ink))`,
          }}
        />
      ))}
      <span
        className="flex h-9 w-7 items-center justify-center rounded-md border-2 border-cream bg-white text-[9px] font-semibold text-ink/60"
        style={{ marginLeft: -8 }}
      >
        +43
      </span>
    </div>
  )
}

function Sparkline() {
  const heights = [5, 8, 7, 12, 16, 22, 30]
  return (
    <div className="flex h-8 items-end gap-1">
      {heights.map((h, i) => (
        <span
          key={i}
          className="w-1.5 rounded-full"
          style={{
            height: `${h}px`,
            background: i === heights.length - 1 ? 'var(--color-wave-orange-deep)' : 'var(--color-wave-peach)',
          }}
        />
      ))}
    </div>
  )
}

function StatBlock({ value, label, children }) {
  return (
    <div>
      <p className="font-display text-3xl font-extrabold text-ink">{value}</p>
      <p className="mt-0.5 text-sm text-ink/55">{label}</p>
      <div className="mt-3">{children}</div>
    </div>
  )
}

function DecorativeWave() {
  return (
    <svg
      className="pointer-events-none absolute right-0 bottom-0 hidden h-auto w-[38vw] max-w-[560px] opacity-90 md:block"
      viewBox="0 0 560 360"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M560 360 L560 160 C 480 190, 430 90, 350 120 C 270 150, 240 240, 150 220 C 90 208, 60 250, 0 260 L0 360 Z"
        fill="url(#expWaveGrad)"
      />
      <defs>
        <linearGradient id="expWaveGrad" x1="0" y1="360" x2="560" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--color-wave-orange-deep)" />
          <stop offset="100%" stopColor="var(--color-wave-orange)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function Experiments() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState('All')
  const scrollerRef = useRef(null)
  const sectionRef = useRef(null)

  const filtered = useMemo(
    () => (active === 'All' ? HOOKS : HOOKS.filter((h) => h.category === active)),
    [active],
  )

  useEffect(() => {
    if (reduced || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-reveal]',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  const scrollByAmount = (dir) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section
      id="experiments"
      ref={sectionRef}
      className="relative overflow-hidden bg-cream px-6 py-24 sm:px-10 lg:px-[7vw] lg:py-32"
    >
      <div className="relative mx-auto max-w-[1500px]">
        <div data-reveal className="flex flex-wrap items-start justify-between gap-6">
          <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-ink/55 uppercase">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-wave-orange-deep" />
            Experimentation
          </p>
          <div className="hidden items-center gap-2 text-[11px] font-semibold tracking-[0.15em] text-ink/35 uppercase lg:flex">
            {BREADCRUMB.map((w, i) => (
              <span key={w} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">→</span>}
                {w}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mt-6">
          <h2
            data-reveal
            className="font-display text-[12vw] leading-[0.98] font-extrabold tracking-tight text-ink sm:text-6xl lg:text-[4.2vw]"
          >
            <span className="block">One product.</span>
            <span className="block text-wave-orange-deep">30 different ideas.</span>
          </h2>

          <p data-reveal className="mt-5 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">
            We test multiple hooks, angles and formats with real creators to find what actually works. Then we
            scale it.
          </p>
          <p data-reveal className="mt-2 text-xs text-ink/35 italic">
            Illustrative example. Figures shown are sample data.
          </p>

          <div
            data-reveal
            className="pointer-events-none absolute top-0 right-0 hidden -rotate-2 flex-col items-end gap-1 xl:flex"
          >
            <span className="font-display text-lg font-semibold text-ink">30+ ideas tested</span>
            <CurvedArrow />
          </div>
        </div>

        <div data-reveal className="mt-10 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              data-cursor="button"
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                active === cat ? 'bg-ink text-cream' : 'bg-white/70 text-ink/55 hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div data-reveal className="mt-10 flex gap-5 lg:gap-8">
          <div className="hidden shrink-0 flex-col items-center md:flex" style={{ width: 24 }}>
            <span className="font-display text-xs text-ink/40">01</span>
            <span className="my-2 w-px flex-1 bg-ink/10" />
            <span className="font-display text-xs text-ink/40">{String(filtered.length).padStart(2, '0')}</span>
          </div>

          <div className="min-w-0 flex-1">
            <div ref={scrollerRef} className="no-scrollbar flex snap-x gap-5 overflow-x-auto scroll-smooth pb-2">
              {filtered.map((hook) => (
                <HookCard key={hook.letter} hook={hook} />
              ))}
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                data-cursor="button"
                aria-label="Scroll back"
                onClick={() => scrollByAmount(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-ink/40 hover:text-ink"
              >
                ←
              </button>
              <button
                type="button"
                data-cursor="button"
                aria-label="Scroll forward"
                onClick={() => scrollByAmount(1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-ink/40 hover:text-ink"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div
          data-reveal
          className="mt-14 rounded-[2rem] border border-ink/10 bg-white/60 p-7 backdrop-blur-sm sm:p-9 lg:p-10"
        >
          <div className="flex flex-wrap items-center gap-x-10 gap-y-8">
            <div className="max-w-[220px]">
              <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-ink/55 uppercase">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-wave-orange-deep" />
                Winning idea
              </p>
              <h3 className="mt-2 font-display text-2xl font-extrabold text-ink">Hook {WINNER.letter}</h3>
              <p className="mt-1 text-ink/60 italic">&ldquo;{WINNER.caption}&rdquo;</p>
            </div>

            <div
              className="h-24 w-14 shrink-0 rounded-xl ring-2 ring-wave-orange-deep ring-offset-2 ring-offset-cream"
              style={{ background: 'linear-gradient(165deg, var(--color-ink-soft), var(--color-ink))' }}
            />

            <span className="hidden font-display text-2xl text-ink/25 sm:block" aria-hidden="true">
              →
            </span>

            <StatBlock value="20" label="creators onboarded">
              <AvatarStack />
            </StatBlock>

            <StatBlock value="47" label="variations tested">
              <ThumbStack />
            </StatBlock>

            <StatBlock value="8.3M" label="views total">
              <Sparkline />
            </StatBlock>

            <div className="ml-0 sm:ml-auto">
              <p className="font-display text-lg font-semibold text-ink">From a scroll to real growth.</p>
              <button
                type="button"
                data-cursor="button"
                className="mt-3 rounded-full bg-wave-orange-deep px-5 py-2.5 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-ink"
              >
                See more experiments →
              </button>
            </div>
          </div>
        </div>

        <div
          data-reveal
          className="mt-16 flex flex-col gap-2 border-t border-ink/10 pt-6 text-[11px] font-medium tracking-[0.15em] text-ink/40 uppercase sm:flex-row sm:items-center sm:justify-between"
        >
          <span>Real tests. Real creators. Real growth.</span>
          <span>The compound effect of good creative.</span>
        </div>
      </div>

      <DecorativeWave />
    </section>
  )
}
