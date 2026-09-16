import card5 from '../assets/cards/card5_kiara.png'
import hookC from '../assets/experiments/hookC.jpg'

// Two soft decorative curves behind the content - the brand's warm
// orange/peach tones standing in for the reference's pink/purple, kept
// low-opacity so they read as texture rather than competing with copy.
function BackgroundWaves() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 900"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    >
      <path
        d="M-40 60 C 40 -20, 160 -20, 200 90 C 240 200, 120 260, 40 220 C -30 185, -10 130, 60 140 C 160 155, 260 260, 380 210"
        stroke="var(--color-wave-orange-deep)"
        strokeWidth="2"
        fill="none"
        opacity="0.35"
      />
      <path
        d="M1240 260 C 1120 320, 1060 420, 1140 500 C 1220 580, 1180 680, 1080 700 C 990 718, 940 660, 960 610"
        stroke="var(--color-wave-orange)"
        strokeWidth="2"
        fill="none"
        opacity="0.35"
      />
    </svg>
  )
}

function FeatureRow({ image, alt, stat, statLabel, statTone, heading, body, imageSide }) {
  const imageFirst = imageSide === 'left'
  return (
    <div className="relative z-10 grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
      <div
        className={`relative flex justify-center ${imageFirst ? 'md:order-1 md:justify-end' : 'md:order-2 md:justify-start'}`}
      >
        <div className="h-[380px] w-72 overflow-hidden rounded-3xl border border-ink/10 shadow-xl">
          <img src={image} alt={alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
        </div>

        <div
          className={`absolute z-20 min-w-[170px] rounded-2xl border p-4 shadow-lg ${
            imageFirst ? '-bottom-4 left-4 md:left-6' : '-top-4 right-4 md:right-6'
          } ${statTone === 'orange' ? 'border-wave-orange-deep/20 bg-wave-orange-deep text-cream' : 'border-wave-peach/40 bg-wave-peach-light text-ink'}`}
        >
          <p className="text-2xl font-black">{stat}</p>
          <p className={`mt-0.5 text-xs font-medium ${statTone === 'orange' ? 'text-cream/80' : 'text-ink/60'}`}>
            {statLabel}
          </p>
        </div>
      </div>

      <div className={imageFirst ? 'md:order-2' : 'order-2 md:order-1'}>
        <h3 className="mb-4 font-display text-3xl font-bold text-ink sm:text-4xl">{heading}</h3>
        <p className="max-w-md text-base leading-relaxed text-ink/60 sm:text-lg">{body}</p>
      </div>
    </div>
  )
}

export function WhyWaveFeatures() {
  return (
    <section className="relative overflow-hidden bg-cream px-6 py-20 sm:py-24">
      <BackgroundWaves />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div data-reveal className="relative z-10 mb-20 text-center">
          <span className="mb-4 inline-block rounded-full bg-wave-peach-light px-3 py-1 text-xs font-semibold tracking-wider text-ink/70 uppercase">
            Our approach
          </span>
          <h2 className="mx-auto max-w-3xl font-display text-4xl leading-tight font-extrabold tracking-tight text-ink sm:text-5xl">
            We made UGC into a consistent, high-performing growth channel.
          </h2>
        </div>

        <div data-reveal className="mb-24">
          <FeatureRow
            image={card5}
            alt="Creator holding up a skincare serum to camera"
            stat="200%"
            statLabel="Organic follower growth"
            statTone="peach"
            heading="Performance-driven UGC that delivers results"
            body="Our UGC strategy is grounded in real performance data. We design, test, and refine creative so every piece contributes to growth you can actually measure."
            imageSide="left"
          />
        </div>

        <div data-reveal>
          <FeatureRow
            image={hookC}
            alt="The winning hook - a creator talking to camera about a product she found"
            stat="4.2M"
            statLabel="Impressions"
            statTone="orange"
            heading="Creator-led content, long-term growth."
            body="We source and test creators across niches and communities, focusing on those who naturally align with your brand. The result is authentic UGC that feels native and performs consistently."
            imageSide="right"
          />
        </div>

        <p data-reveal className="relative z-10 mt-16 text-center text-xs text-ink/35">
          Illustrative example — figures shown are sample data.
        </p>
      </div>
    </section>
  )
}
