import card4 from '../../assets/cards/card4_tanvi.png'

// A single real UGC card up front, with two plain solid-color card backs
// fanned out behind it (no extra photos) - dimensional without turning
// into a wall of images.
const BACK_CARDS = [
  { color: 'var(--color-wave-orange-deep)', left: 2, top: 9, w: 36, rotate: -11, z: 10 },
  { color: 'var(--color-wave-peach)', left: 12, top: 3, w: 36, rotate: -5, z: 15 },
]

// A big, near-invisible outline of the brand's own wave mark sitting
// behind the cards - identity, not decoration.
function WaveMarkGhost() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className="pointer-events-none absolute top-1/2 left-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
    >
      <path
        d="M20 110 Q 45 60 70 110 T 120 110 T 170 110"
        stroke="var(--color-wave-orange-deep)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function PlayBadge() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
        <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M4 2.5 L11 7 L4 11.5 Z" fill="var(--color-ink)" />
        </svg>
      </span>
    </div>
  )
}

export function PhoneCluster({ reduced }) {
  return (
    <div className="relative mx-auto aspect-[5/6] w-full max-w-[420px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-wave-peach), transparent 68%)' }}
      />
      <WaveMarkGhost />

      {BACK_CARDS.map((c, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute rounded-2xl shadow-[0_16px_36px_rgba(22,17,15,0.18)]"
          style={{
            left: `${c.left}%`,
            top: `${c.top}%`,
            width: `${c.w}%`,
            aspectRatio: '9 / 16',
            background: c.color,
            transform: `rotate(${c.rotate}deg)`,
            zIndex: c.z,
          }}
        />
      ))}

      <div
        className={`absolute overflow-hidden rounded-2xl shadow-[0_24px_55px_rgba(22,17,15,0.28)] ${
          reduced ? '' : 'animate-card-bob'
        }`}
        style={{ left: '32%', top: '0%', width: '46%', aspectRatio: '9 / 16', zIndex: 30, animationDuration: '5.5s' }}
      >
        <img
          src={card4}
          alt="Creator showing a product to camera"
          className="h-full w-full object-cover"
          loading="lazy"
          draggable={false}
        />
        <PlayBadge />
      </div>
    </div>
  )
}
