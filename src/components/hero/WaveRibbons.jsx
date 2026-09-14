import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '../../lib/useReducedMotion'

// Three hand-drawn ribbon silhouettes (not a fluid sim, not noise) - each is
// a single clean S-curve with real thickness, entering bottom-left and
// exiting top-right, layered like the planes in the brand mark.
const RIBBONS = [
  {
    id: 'back',
    d: 'M -150,760 C 200,760 300,540 650,540 C 1000,540 1100,320 1700,320 L 1700,410 C 1100,410 1000,630 650,630 C 300,630 200,850 -150,850 Z',
    fill: 'url(#ribbonBack)',
    opacity: 0.55,
    blur: 1,
  },
  {
    id: 'main',
    d: 'M -100,680 C 250,680 350,420 700,420 C 1050,420 1150,160 1750,160 L 1750,340 C 1150,340 1050,600 700,600 C 350,600 250,860 -100,860 Z',
    fill: 'url(#ribbonMain)',
    opacity: 1,
    blur: 0,
  },
  {
    id: 'crest',
    d: 'M -80,620 C 260,620 360,380 700,380 C 1040,380 1140,130 1720,130 L 1720,178 C 1140,178 1040,430 700,430 C 360,430 260,670 -80,670 Z',
    fill: 'url(#ribbonCrest)',
    opacity: 0.85,
    blur: 0,
  },
]

export function WaveRibbons({ motionState, scrollProgressRef }) {
  const reduced = useReducedMotion()
  const groupRef = useRef(null)
  const rafRef = useRef(null)

  // idle left-right drift
  useEffect(() => {
    if (reduced || !groupRef.current) return
    const tween = gsap.to(groupRef.current, {
      x: 18,
      duration: 7,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
    return () => tween.kill()
  }, [reduced])

  // cursor bend + scroll rise, read each frame from shared motion state
  useEffect(() => {
    if (reduced) return
    const quickSkew = gsap.quickTo(groupRef.current, 'skewY', {
      duration: 0.7,
      ease: 'power3.out',
    })
    const quickTilt = gsap.quickTo(groupRef.current, 'y', {
      duration: 0.7,
      ease: 'power3.out',
    })

    const tick = () => {
      const p = scrollProgressRef.current ?? 0
      quickSkew(motionState.mouseX * 1.6)
      quickTilt(motionState.mouseY * -10 - p * 180)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [reduced, motionState, scrollProgressRef])

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ribbonBack" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff2d27" />
          <stop offset="100%" stopColor="#ff741f" />
        </linearGradient>
        <linearGradient id="ribbonMain" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff4a18" />
          <stop offset="55%" stopColor="#ff741f" />
          <stop offset="100%" stopColor="#ffc54a" />
        </linearGradient>
        <linearGradient id="ribbonCrest" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff9d42" />
          <stop offset="100%" stopColor="#ffde8a" />
        </linearGradient>
        <filter id="ribbonShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="#160b06" floodOpacity="0.16" />
        </filter>
        <filter id="ribbonSoftBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <g ref={groupRef} style={{ transformOrigin: '50% 50%' }}>
        {RIBBONS.map((r) => (
          <path
            key={r.id}
            d={r.d}
            fill={r.fill}
            opacity={r.opacity}
            filter={r.blur ? 'url(#ribbonSoftBlur)' : 'url(#ribbonShadow)'}
          />
        ))}
      </g>
    </svg>
  )
}
