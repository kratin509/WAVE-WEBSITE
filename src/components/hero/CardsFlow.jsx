import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { LANES } from './cardsData'

gsap.registerPlugin(MotionPathPlugin)

// All three lanes stay low, at and around the wave band, so the entire
// headline/copy zone above stays clear for legibility — cards read as
// riding the wave rather than crossing the type.
const PATHS = {
  far: 'M -150 430 C 90 395, 260 460, 460 415 C 660 370, 830 440, 1150 400',
  mid: 'M -150 495 C 110 450, 300 520, 520 475 C 730 430, 900 500, 1150 455',
  near: 'M -150 570 C 140 520, 340 595, 540 545 C 750 495, 920 580, 1150 530',
}

function Card({ lane, card, tiltEnabled }) {
  return (
    <div
      data-cursor={lane.id === 'near' ? 'link' : undefined}
      className="card-visual w-[10.5vw] max-w-[152px] min-w-[84px] overflow-hidden rounded-[1.1rem] border border-white/10 shadow-[0_20px_55px_rgba(20,8,4,0.5)] [transform-style:preserve-3d]"
      style={{
        aspectRatio: '9 / 16',
        transform: tiltEnabled
          ? `scale(${lane.depth}) rotateX(calc(var(--tiltY, 0) * 6deg)) rotateY(calc(var(--tiltX, 0) * -6deg))`
          : `scale(${lane.depth})`,
        filter: lane.blur ? `blur(${lane.blur}px)` : 'none',
        opacity: lane.id === 'far' ? 0.7 : 1,
      }}
    >
      <img
        src={card.img}
        alt={card.alt}
        className="h-full w-full object-cover"
        loading="lazy"
        draggable={false}
      />
    </div>
  )
}

function StaticCardsFlow() {
  // prefers-reduced-motion: no continuous motion, just a settled collage —
  // kept low, riding the wave band, so the headline above stays clear.
  const positions = [
    { top: '66%', left: '1%', rotate: -5, scale: 0.85 },
    { top: '81%', left: '0%', rotate: 4, scale: 0.68 },
    { top: '62%', left: '23%', rotate: 3, scale: 0.78 },
    { top: '69%', left: '56%', rotate: -3, scale: 0.95 },
    { top: '83%', left: '80%', rotate: 5, scale: 0.82 },
  ]
  const cards = LANES.flatMap((lane) => lane.cards).slice(0, 5)

  return (
    <div className="absolute inset-0">
      {cards.map((card, i) => {
        const pos = positions[i]
        return (
          <div
            key={i}
            className="absolute top-0 left-0"
            style={{ top: pos.top, left: pos.left, zIndex: 10 + i }}
          >
            <div
              className="w-[10.5vw] max-w-[152px] min-w-[84px] overflow-hidden rounded-[1.1rem] border border-white/10 shadow-[0_20px_55px_rgba(20,8,4,0.5)]"
              style={{
                aspectRatio: '9 / 16',
                transform: `scale(${pos.scale}) rotate(${pos.rotate}deg)`,
              }}
            >
              <img
                src={card.img}
                alt={card.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function CardsFlow({ motionState, reduced, mobile }) {
  const containerRef = useRef(null)
  const pathRefs = useRef({})
  const cardRefs = useRef([])
  const tweensRef = useRef([])
  const rafRef = useRef(null)

  const lanes = useMemo(() => {
    if (!mobile) return LANES
    // drop the far lane and thin each lane out on mobile / low-power devices
    return LANES.filter((lane) => lane.id !== 'far').map((lane) => ({
      ...lane,
      cards: lane.cards.slice(0, 2),
    }))
  }, [mobile])

  useEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((el) => {
        if (!el) return
        const laneId = el.dataset.lane
        const pathEl = pathRefs.current[laneId]
        if (!pathEl) return

        const duration = Number(el.dataset.duration)
        const delay = Number(el.dataset.delay)

        const tween = gsap.to(el, {
          motionPath: {
            path: pathEl,
            align: pathEl,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
          duration,
          delay,
          repeat: -1,
          ease: 'none',
        })
        tweensRef.current.push(tween)
      })
    }, containerRef)

    return () => {
      ctx.revert()
      tweensRef.current = []
      cardRefs.current = []
    }
  }, [reduced, lanes])

  useEffect(() => {
    if (reduced) return

    const tick = () => {
      tweensRef.current.forEach((tween) => {
        tween.timeScale(1 + motionState.progress * 1.6)
      })

      if (!mobile) {
        const nearVisuals = containerRef.current?.querySelectorAll(
          '[data-lane="near"] .card-visual',
        )
        nearVisuals?.forEach((el) => {
          el.style.setProperty('--tiltX', motionState.mouseX.toFixed(3))
          el.style.setProperty('--tiltY', motionState.mouseY.toFixed(3))
        })
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [motionState, reduced, mobile])

  if (reduced) return <StaticCardsFlow />

  let cardIndex = 0
  const totalCards = lanes.reduce((sum, lane) => sum + lane.cards.length, 0)

  return (
    <div ref={containerRef} className="absolute inset-0">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {Object.entries(PATHS).map(([id, d]) => (
          <path
            key={id}
            ref={(el) => {
              pathRefs.current[id] = el
            }}
            d={d}
            fill="none"
            stroke="none"
          />
        ))}
      </svg>

      {lanes.map((lane) =>
        lane.cards.map((card, i) => {
          const idx = cardIndex++
          const [minS, maxS] = lane.speedRange
          const duration = minS + ((maxS - minS) * i) / lane.cards.length
          const delay = -(duration * (idx / totalCards))

          return (
            <div
              key={`${lane.id}-${i}`}
              ref={(el) => {
                cardRefs.current[idx] = el
              }}
              data-lane={lane.id}
              data-duration={duration}
              data-delay={delay}
              className="absolute top-0 left-0 will-change-transform"
              style={{ zIndex: Math.round(lane.depth * 100) }}
            >
              <Card lane={lane} card={card} tiltEnabled={!mobile} />
            </div>
          )
        }),
      )}
    </div>
  )
}
