import { useRef } from 'react'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { WAVE_CARDS, WAVE_CARDS_MOBILE } from './waveCardsData'

function AnnotationArrow({ side, vertical }) {
  const transform = [side === 'right' && 'scaleX(-1)', vertical === 'below' && 'scaleY(-1)']
    .filter(Boolean)
    .join(' ')
  return (
    <svg width="64" height="46" viewBox="0 0 64 46" fill="none" style={{ transform }} aria-hidden="true">
      <path
        d="M5 5 C 5 27, 22 35, 53 37"
        stroke="var(--color-ink)"
        strokeOpacity="0.65"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M43 30 L54 38 L41 42"
        stroke="var(--color-ink)"
        strokeOpacity="0.65"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

function Annotation({ card }) {
  const { side, vertical = 'above', dx, dy } = card.annotation
  const isLeft = side === 'left'
  const isBelow = vertical === 'below'
  const offsetX = dx ?? (isLeft ? -19 : 12)
  const offsetY = dy ?? (isBelow ? 20 : -14)
  return (
    <div
      className="pointer-events-none absolute z-40 hidden xl:block"
      style={{
        left: `${card.left + offsetX}%`,
        top: `${card.top + offsetY}%`,
        transform: isBelow ? 'none' : 'translateY(-100%)',
      }}
    >
      <div
        className={`flex flex-col items-center ${isLeft ? '' : 'items-end'} ${isBelow ? 'flex-col-reverse' : ''}`}
      >
        <span className="font-display -rotate-2 rounded-lg bg-cream px-4 py-2 text-base font-semibold whitespace-nowrap text-ink shadow-[0_4px_16px_rgba(22,17,15,0.12)]">
          {card.annotation.text}
        </span>
        <AnnotationArrow side={side} vertical={vertical} />
      </div>
    </div>
  )
}

export function WaveCards({ mobile }) {
  const reduced = useReducedMotion()
  const cardRefs = useRef([])
  const cards = mobile ? WAVE_CARDS_MOBILE : WAVE_CARDS

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
            className={`overflow-hidden rounded-2xl border border-white/15 ${
              reduced ? '' : 'animate-card-bob'
            }`}
            style={{
              width: `${card.vw}vw`,
              maxWidth: card.maxW,
              minWidth: card.minW,
              aspectRatio: '9 / 16',
              transform: `translate(-50%, -50%) rotate(${card.rotate}deg)`,
              filter: card.blur ? `blur(${card.blur}px)` : 'none',
              opacity: card.opacity,
              boxShadow: '0 24px 55px rgba(22,17,15,0.25)',
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
