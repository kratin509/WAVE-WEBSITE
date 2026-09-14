import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { getWaveLayers } from './waveLayers'

function WaveLayer({ layer, motionState, mobile, reduced }) {
  const svgRef = useRef(null)

  useEffect(() => {
    const el = svgRef.current
    if (!el) return

    if (reduced) {
      // Respect prefers-reduced-motion: render a static frame, no tweens.
      return
    }

    const loop = gsap.to(el, {
      xPercent: -50,
      duration: layer.duration,
      ease: 'none',
      repeat: -1,
    })

    const bob = gsap.to(el, {
      y: layer.bobAmount,
      duration: layer.bobDuration,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    let raf
    let quickX
    if (!mobile) {
      quickX = gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' })
      const tick = () => {
        quickX(motionState.mouseX * layer.parallax)
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    return () => {
      loop.kill()
      bob.kill()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [layer, motionState, mobile, reduced])

  return (
    <svg
      ref={svgRef}
      className="absolute bottom-0 left-0 h-full"
      width="200%"
      height="100%"
      viewBox={`0 0 ${layer.viewBoxWidth} ${layer.viewBoxHeight}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={layer.d} fill={layer.color} opacity={layer.opacity} />
    </svg>
  )
}

export function WaveLayers({ ids, motionState, mobile, className = '', style }) {
  const reduced = useReducedMotion()
  const layers = useMemo(() => getWaveLayers({ mobile }), [mobile])
  const active = layers.filter((l) => ids.includes(l.id))

  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden ${className}`} style={style}>
      {active.map((layer) => (
        <WaveLayer key={layer.id} layer={layer} motionState={motionState} mobile={mobile} reduced={reduced} />
      ))}
    </div>
  )
}
