import { useRef } from 'react'
import { useSectionNavTheme } from '../../lib/useSectionNavTheme'
import { smoothScrollTo } from '../../lib/scrollTo'
import heroImage from '../../assets/hero/wave-web-banner.jpg'

// Reusing Hero's own established stats/copy from earlier rounds, not new claims.
const STATS = [
  { value: '3.4B+', label: 'Views generated' },
  { value: '100K+', label: 'App downloads driven' },
  { value: '60+', label: 'Creators in our network' },
]

export function Hero() {
  const sectionRef = useRef(null)
  useSectionNavTheme(sectionRef, { dark: true })

  const handleSeeSystem = (e) => {
    e.preventDefault()
    smoothScrollTo('#how-it-works')
  }

  return (
    <section id="top" ref={sectionRef} className="relative flex min-h-screen items-end overflow-hidden bg-ink">
      <img
        src={heroImage}
        alt="Vintage TVs floating in the ocean at sunset, each screen showing a creator's UGC video with view counts and engagement stats"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-ink/10" />

      <div className="relative z-10 w-full px-6 pt-32 pb-16 sm:px-10 sm:pb-20 lg:px-[7vw] lg:pb-24">
        <span className="inline-block rounded-full border border-cream/30 bg-cream/10 px-4 py-1.5 text-xs font-medium tracking-wide text-cream backdrop-blur-sm">
          UGC growth for consumer apps + D2C
        </span>

        <h1 className="mt-6 max-w-2xl font-serif text-5xl leading-[1.08] text-cream italic sm:text-6xl lg:text-7xl">
          Turn UGC into
          <br />
          your next growth
          <br />
          channel
        </h1>

        <p className="mt-6 max-w-md text-base leading-relaxed text-cream/80 sm:text-lg">
          Real creators. Real content. Real users. We find what hits. Then we scale it.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#how-it-works"
            onClick={handleSeeSystem}
            data-cursor="link"
            className="rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white"
          >
            See how it works
          </a>
          <a
            href="#start-a-wave"
            data-cursor="button"
            className="rounded-full bg-wave-orange-deep px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-wave-orange"
          >
            Start a wave
          </a>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t border-cream/20 pt-8">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-bold text-cream sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-cream/70">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-cream/40">Illustrative example — figures shown are sample data.</p>
      </div>
    </section>
  )
}
