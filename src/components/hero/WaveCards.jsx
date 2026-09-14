import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { WAVE_CARDS, WAVE_CARDS_MOBILE } from './waveCardsData'

export function WaveCards({ scrollProgressRef, mobile }) {
  const reduced = useReducedMotion()
  const cardRefs = useRef([])
  const rafRef = useRef(null)
  const cards = mobile ? WAVE_CARDS_MOBILE : WAVE_CARDS
  const heroCard = cards.find((c) => c.hero)

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
  }, [reduced, scrollProgressRef])

  return (
    <div className="absolute inset-0">
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

      {heroCard && !mobile && (
        <p
          className="pointer-events-none absolute z-50 -translate-x-1/2 rotate-[-2deg] font-display text-xs font-medium text-ink/55 italic whitespace-nowrap"
          style={{ left: '63%', top: '10%' }}
          aria-hidden="true"
        >
          the internet decides.
        </p>
      )}
    </div>
  )
}
