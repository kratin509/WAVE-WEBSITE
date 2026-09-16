import card3 from '../../assets/cards/card3_saanvi.png'
import card4 from '../../assets/cards/card4_tanvi.png'
import card5 from '../../assets/cards/card5_kiara.png'

// Three tilted, overlapping UGC-video cards, positioned as percentages of
// this component's own box (not the whole hero) so the cluster is a
// self-contained visual unit next to the copy column - no annotation
// tags, just the cards themselves.
const CARDS = [
  { img: card4, alt: 'UGC creator video', left: 2, top: 15, w: 36, rotate: -7, z: 20, bob: 5.2 },
  { img: card3, alt: 'UGC creator video, the winning hook', left: 32, top: 0, w: 40, rotate: -1, z: 40, bob: 5 },
  { img: card5, alt: 'UGC creator video', left: 66, top: 22, w: 32, rotate: 6, z: 24, bob: 5.8 },
]

export function PhoneCluster({ reduced }) {
  return (
    <div className="relative mx-auto aspect-[6/5] w-full max-w-[520px]">
      {CARDS.map((c, i) => (
        <div
          key={i}
          className={`absolute overflow-hidden rounded-2xl border border-white/15 shadow-[0_24px_55px_rgba(22,17,15,0.25)] ${
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
