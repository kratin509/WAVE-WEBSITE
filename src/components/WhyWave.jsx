import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../lib/useReducedMotion'
import { WhyWavePainPoints } from './WhyWavePainPoints'
import { WhyWaveFeatures } from './WhyWaveFeatures'

gsap.registerPlugin(ScrollTrigger)

export function WhyWave() {
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)
  const painRef = useRef(null)

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
