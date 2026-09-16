import card4 from '../../assets/cards/card4_tanvi.png'
import card5 from '../../assets/cards/card5_kiara.png'
import hookE from '../../assets/experiments/hookE.jpg'

// Three tilted, overlapping UGC-video cards, positioned as percentages of
// this component's own box (not the whole hero) so the cluster is a
// self-contained visual unit next to the copy column - no annotation
// tags, just the cards themselves. Card 1 (largest, female + product) up
// front-left, Card 2 (male creator) tucked behind/right with an opposite
// rotation, Card 3 (smallest, female talking to camera) farthest right.
const CARDS = [
  { img: card4, alt: 'Creator showing a product to camera', left: 0, top: 14, w: 40, rotate: -6, z: 30, bob: 5.2 },
  { img: hookE, alt: 'Creator holding up a phone to camera', left: 30, top: 0, w: 38, rotate: 4, z: 20, bob: 5.6 },
  { img: card5, alt: 'Creator talking to camera', left: 66, top: 24, w: 30, rotate: 7, z: 24, bob: 5.9 },
]

// A big, near-invisible outline of the brand's own wave mark sitting
// behind the cards - identity, not decoration.
function WaveMarkGhost() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className="pointer-events-none absolute top-1/2 left-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
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

export function PhoneCluster({ reduced }) {
  return (
    <div className="relative mx-auto aspect-[6/5] w-full max-w-[480px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-wave-peach), transparent 68%)' }}
      />
      <WaveMarkGhost />

      {CARDS.map((c, i) => (
        <div
          key={i}
          className={`absolute overflow-hidden rounded-2xl border border-white/15 shadow-[0_20px_45px_rgba(22,17,15,0.22)] ${
            reduced ? '' : 'animate-card-bob'
          }`}
          style={{
            left: `${c.left}%`,
            top: `${c.top}%`,
            width: `${c.w}%`,
            aspectRatio: '9 / 16',
            transform: `rotate(${c.rotate}deg)`,
            zIndex: c.z,
            animationDuration: `${c.bob}s`,
            animationDelay: `${i * -0.6}s`,
          }}
        >
          <img src={c.img} alt={c.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
        </div>
      ))}
    </div>
  )
}
