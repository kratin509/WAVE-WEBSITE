import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../lib/useReducedMotion'
import { useSectionNavTheme } from '../lib/useSectionNavTheme'
import { WhyWavePainPoints } from './WhyWavePainPoints'
import { WhyWaveFeatures } from './WhyWaveFeatures'

gsap.registerPlugin(ScrollTrigger)

export function WhyWave() {
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)
  const painRef = useRef(null)
  // WhyWavePainPoints is a 350vh container whose sticky h-screen panel
  // unpins after (350vh - 100vh) of scroll - i.e. at 250/350 = 71.4% of
  // the container's own height, not its full bottom edge. The panel's
  // background is now a round trip (white -> dark -> white) rather than a
  // one-way ramp, solidly dark across roughly progress [0.35, 0.85] - so
  // the nav flip window is scoped to that same span, converted to
  // container-relative percent (progress * 71.4%).
  useSectionNavTheme(painRef, { dark: true, start: '25% top', end: '61% top' })

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

  return (
    <section id="why-wave" ref={sectionRef} className="relative bg-ink-soft">
      <WhyWavePainPoints ref={painRef} />
      <WhyWaveFeatures />
    </section>
  )
}
