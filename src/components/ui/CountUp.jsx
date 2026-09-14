import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../lib/useReducedMotion'

export function CountUp({ value, className }) {
  const reduced = useReducedMotion()
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const match = value.match(/^([\d.]+)(.*)$/)
    if (!match || reduced) {
      el.textContent = value
      return
    }

    const [, numStr, suffix] = match
    const target = parseFloat(numStr)
    const decimals = (numStr.split('.')[1] || '').length
    const proxy = { v: 0 }
    el.textContent = `0${suffix}`

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(proxy, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${proxy.v.toFixed(decimals)}${suffix}`
          },
        })
      },
    })
    return () => st.kill()
  }, [value, reduced])

  return (
    <p ref={ref} className={className}>
      {value}
    </p>
  )
}
