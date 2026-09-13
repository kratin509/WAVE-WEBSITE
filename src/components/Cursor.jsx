import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../lib/useReducedMotion'
import { useIsMobile } from '../lib/useIsMobile'

export function Cursor() {
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const [variant, setVariant] = useState('default')
  const enabled = !reduced && !isMobile

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

  const ringX = useSpring(x, { stiffness: 220, damping: 30, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 220, damping: 30, mass: 0.6 })

  const frame = useRef(null)

  useEffect(() => {
    if (!enabled) return

    document.documentElement.classList.add('cursor-enabled')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)

      const target = e.target.closest('[data-cursor]')
      setVariant(target ? target.dataset.cursor : 'default')
    }

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.classList.remove('cursor-enabled')
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const isBig = variant === 'link' || variant === 'button'
  const isPlay = variant === 'play'
  const isDrag = variant === 'drag'

  return (
    <div ref={frame} className="pointer-events-none fixed inset-0 z-[70]" aria-hidden="true">
      <motion.div
        className="absolute top-0 left-0 rounded-full mix-blend-difference bg-cream"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isBig ? 14 : isPlay || isDrag ? 10 : 8,
          height: isBig ? 14 : isPlay || isDrag ? 10 : 8,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute top-0 left-0 rounded-full border border-ink/70"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isBig ? 56 : isPlay || isDrag ? 64 : 32,
          height: isBig ? 56 : isPlay || isDrag ? 64 : 32,
          opacity: isBig || isPlay || isDrag ? 1 : 0.5,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {(isPlay || isDrag) && (
          <span className="absolute inset-0 flex items-center justify-center font-display text-[10px] font-semibold tracking-[0.15em] uppercase text-ink">
            {isPlay ? 'Play' : 'Drag'}
          </span>
        )}
      </motion.div>
    </div>
  )
}
