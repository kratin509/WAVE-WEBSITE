import { useRef } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

export function useMagnetic(strength = 0.35, max = 16) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 })

  const handleMouseMove = (e) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(Math.max(-max, Math.min(max, relX * strength)))
    y.set(Math.max(-max, Math.min(max, relY * strength)))
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { ref, style: { x: springX, y: springY }, handleMouseMove, handleMouseLeave }
}
