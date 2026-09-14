import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { WAVE_CARDS, WAVE_CARDS_MOBILE } from './waveCardsData'

function AnnotationArrow({ side }) {
  return (
    <svg
      width="46"
      height="34"
      viewBox="0 0 46 34"
      fill="none"
      className={side === 'right' ? 'scale-x-[-1]' : ''}
      aria-hidden="true"
    >
      <path
        d="M4 4 C 4 20, 16 26, 38 27"
        stroke="var(--color-ink)"
        strokeOpacity="0.45"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M31 22 L39 28 L30 31" stroke="var(--color-ink)" strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

function Annotation({ card }) {
  const isLeft = card.annotation.side === 'left'
  return (
    <div
      className="pointer-events-none absolute hidden -translate-y-1/2 md:block"
      style={{
        left: `${card.left + (isLeft ? -15 : 9)}%`,
        top: `${card.top - 12}%`,
        zIndex: card.z + 5,
      }}
    >
      <div className={`flex flex-col items-center ${isLeft ? '' : 'items-end'}`}>
        <span className="font-display -rotate-2 rounded-md bg-cream px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-ink/70 shadow-[0_2px_10px_rgba(22,17,15,0.08)]">
          {card.annotation.text}
        </span>
        <AnnotationArrow side={card.annotation.side} />
      </div>
    </div>
  )
}

export function WaveCards({ scrollProgressRef, mobile }) {
  const reduced = useReducedMotion()
  const cardRefs = useRef([])
  const rafRef = useRef(null)
  const cards = mobile ? WAVE_CARDS_MOBILE : WAVE_CARDS

  useEffect(() => {
    if (reduced) return
    const quicks = cardRefs.current.map((el) =>
      el ? gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power2.out' }) : null,
    )

    const tick = () => {
      const p = scrollProgressRef.current ?? 0
      quicks.forEach((q, i) => {
        if (!q) return
        // cards further along (higher index) travel a little further forward
        q(-p * (70 + i * 18))
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [reduced, scrollProgressRef, cards])

  return (
    <>
      {cards.map((card, i) => (
        <div
          key={i}
          ref={(el) => {
            cardRefs.current[i] = el
          }}
          className="absolute will-change-transform"
          style={{ left: `${card.left}%`, top: `${card.top}%`, zIndex: card.z }}
        >
          <div
            data-cursor={card.hero ? 'link' : undefined}
            className={`overflow-hidden rounded-[1.1rem] border border-white/15 ${
              reduced ? '' : 'animate-card-bob'
            }`}
            style={{
              width: card.hero ? '11.5vw' : '9vw',
              maxWidth: card.hero ? 168 : 130,
              minWidth: card.hero ? 108 : 68,
              aspectRatio: '9 / 16',
              transform: `translate(-50%, -50%) rotate(${card.rotate}deg) scale(${card.scale})`,
              filter: card.blur ? `blur(${card.blur}px)` : 'none',
              opacity: card.opacity,
              boxShadow: '0 18px 40px rgba(22,17,15,0.22)',
              animationDuration: `${card.bob}s`,
              animationDelay: `${i * -0.6}s`,
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
        </div>
      ))}

      {!mobile && cards.filter((c) => c.annotation).map((card, i) => <Annotation key={i} card={card} />)}
    </>
  )
}
