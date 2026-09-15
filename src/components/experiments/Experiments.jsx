import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { SectionLabel } from '../ui/SectionLabel'
import { CountUp } from '../ui/CountUp'
import { CATEGORIES, HOOKS, WINNER } from './experimentsData'

gsap.registerPlugin(ScrollTrigger)

const AVATAR_TONES = ['bg-wave-orange-deep', 'bg-wave-orange', 'bg-ink-soft', 'bg-wave-peach']

function PlayIcon({ className }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className} aria-hidden="true">
      <circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeOpacity="0.7" />
      <path d="M5.7 4.6 L9.6 7 L5.7 9.4 Z" fill="currentColor" />
    </svg>
  )
}

function HookCard({ hook }) {
  const isDark = hook.tone !== 'light'
  return (
    <div
      className="group relative shrink-0 snap-start pt-4"
      style={{ width: hook.winner ? '15.5vw' : '13.5vw', maxWidth: hook.winner ? 230 : 192, minWidth: hook.winner ? 176 : 150 }}
    >
      {hook.winner && (
        <SectionLabel className="absolute top-0 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap">
          Top performer
        </SectionLabel>
      )}
      <div
        data-cursor="play"
        className={`relative aspect-[9/16] overflow-hidden rounded-2xl transition-transform duration-300 group-hover:-translate-y-1 ${
          hook.winner ? 'ring-2 ring-wave-orange-deep ring-offset-2 ring-offset-cream' : 'border border-ink/10'
        }`}
        style={
          hook.img
            ? { boxShadow: '0 18px 40px rgba(22,17,15,0.16)' }
            : {
                background: isDark
                  ? 'linear-gradient(165deg, var(--color-ink-soft), var(--color-ink))'
                  : 'linear-gradient(165deg, var(--color-cream-dim), var(--color-wave-peach-light))',
                boxShadow: '0 18px 40px rgba(22,17,15,0.16)',
              }
        }
      >
        {hook.img ? (
          <>
            <img
              src={hook.img}
              alt={hook.caption}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
          </>
        ) : (
          <>
            <span className={`absolute top-3 left-3 h-2 w-2 rounded-full ${isDark ? 'bg-cream/40' : 'bg-ink/25'}`} />
            <p
              className={`absolute inset-x-4 top-[38%] font-display text-[1.05rem] leading-snug font-semibold ${
                isDark ? 'text-cream' : 'text-ink'
              }`}
            >
              {hook.caption}
            </p>
          </>
        )}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-1.5 text-xs font-semibold text-cream/90">
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

function ThumbStack({ images }) {
  return (
    <div className="flex items-center">
      {images.map((src, i) => (
        <span
          key={i}
          className="h-9 w-7 overflow-hidden rounded-md border-2 border-cream bg-ink-soft"
          style={{ marginLeft: i === 0 ? 0 : -8 }}
        >
          <img src={src} alt="" className="h-full w-full object-cover" />
        </span>
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
      <CountUp value={value} className="font-display text-2xl font-semibold text-ink tabular-nums" />
      <p className="mt-0.5 text-sm text-ink/55">{label}</p>
      <div className="mt-3">{children}</div>
    </div>
  )
}

// A single hand-drawn-style wave, confined to the section's own top
// padding band so it never reaches down into the headline - full-bleed
// width (ignores the section's horizontal padding on purpose). Fades in
// as a single complete shape via the same [data-reveal] system as the
// rest of the section, rather than a scroll-linked stroke-draw tween,
// so it can never freeze partway through if page height shifts (e.g.
// images below loading) mistime a scroll-triggered animation.
function TopWave() {
  return (
    <svg
      data-reveal
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-16 w-full sm:h-20 lg:h-24"
      viewBox="0 0 1400 100"
      preserveAspectRatio="none"
    >
      <path
        d="M0 62 C 70 66, 100 8, 190 6 C 270 4, 310 58, 360 64 C 430 72, 480 14, 580 10 C 670 6, 720 92, 800 90 C 880 88, 930 18, 1030 12 C 1110 7, 1150 68, 1220 62 C 1300 55, 1340 22, 1400 26"
        stroke="var(--color-wave-red)"
        strokeWidth="15"
        strokeLinecap="round"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
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
      className="relative bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-[7vw] lg:py-28"
    >
      <TopWave />

      <div className="relative mx-auto max-w-[1500px]">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel data-reveal>experiments</SectionLabel>

          <h2
            data-reveal
            className="mt-4 font-display text-[1.75rem] leading-[1.15] font-semibold text-ink sm:text-[2.25rem] lg:text-[2.75rem]"
          >
            <span className="block">one product.</span>
            <span className="block text-wave-orange-deep">30 different ideas.</span>
          </h2>

          <p data-reveal className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink/50 sm:text-[15px]">
            We test multiple hooks, angles and formats with real creators to find what actually works.
          </p>
          <p data-reveal className="mt-1.5 text-[11px] text-ink/35">
            Illustrative example — figures shown are sample data.
          </p>
        </div>

        <div data-reveal className="mt-8 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              data-cursor="button"
              onClick={() => setActive(cat)}
              className={`rounded-full border px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                active === cat
                  ? 'border-ink bg-ink text-cream'
                  : 'border-ink/12 text-ink/55 hover:border-ink/30 hover:text-ink'
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

        <div data-reveal className="mt-16 border-t border-ink/10 pt-10 sm:pt-12">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-10 2xl:flex-nowrap 2xl:justify-between">
            <div className="flex shrink-0 items-center gap-6">
              <div className="max-w-[190px]">
                <SectionLabel>winning idea</SectionLabel>
                <h3 className="mt-3 font-display text-xl font-semibold text-ink">Hook {WINNER.letter}</h3>
                <p className="mt-1 text-sm text-ink/55">&ldquo;{WINNER.caption}&rdquo;</p>
              </div>

              <div className="h-24 w-14 shrink-0 overflow-hidden rounded-xl ring-2 ring-wave-orange-deep ring-offset-2 ring-offset-cream">
                {WINNER.img ? (
                  <img src={WINNER.img} alt={WINNER.caption} className="h-full w-full object-cover" />
                ) : (
                  <div
                    className="h-full w-full"
                    style={{ background: 'linear-gradient(165deg, var(--color-ink-soft), var(--color-ink))' }}
                  />
                )}
              </div>
            </div>

            <span className="hidden h-16 w-px shrink-0 bg-ink/10 2xl:block" aria-hidden="true" />

            <StatBlock value="20" label="creators onboarded">
              <AvatarStack />
            </StatBlock>

            <span className="hidden h-16 w-px shrink-0 bg-ink/10 2xl:block" aria-hidden="true" />

            <StatBlock value="47" label="variations tested">
              <ThumbStack images={HOOKS.filter((h) => !h.winner).slice(0, 4).map((h) => h.img)} />
            </StatBlock>

            <span className="hidden h-16 w-px shrink-0 bg-ink/10 2xl:block" aria-hidden="true" />

            <StatBlock value="8.3M" label="views total">
              <Sparkline />
            </StatBlock>

            <span className="hidden h-16 w-px shrink-0 bg-ink/10 2xl:block" aria-hidden="true" />

            <div className="shrink-0">
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
          className="mt-14 flex flex-col gap-2 border-t border-ink/10 pt-6 text-[11px] font-medium tracking-[0.15em] text-ink/40 uppercase sm:flex-row sm:items-center sm:justify-between"
        >
          <span>Real tests. Real creators. Real growth.</span>
          <span>The compound effect of good creative.</span>
        </div>
      </div>
    </section>
  )
}
