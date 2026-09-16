import card5 from '../assets/cards/card5_kiara.png'
import hookC from '../assets/experiments/hookC.jpg'

// One continuous canvas layer behind the whole section (not per-row
// backgrounds), so the curves can bleed across the section's own edges
// instead of feeling boxed in. The top-left spiral is a real hand-drawn
// squiggle shape (kept as-is, just recolored into the brand's orange
// rather than the reference's pink) paired with a second swoop on the
// opposite side for balance.
function BackgroundWaves() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 1200"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
    >
      <path
        d="M180.79 1.30042C163.471 65.6046 110.061 102.919 78.3233 105.455C51.3324 107.612 61.0037 65.4235 78.3233 76.7446C89.9026 84.3135 103.169 118.769 59.3715 133.984C33.4678 142.984 1.79041 130.815 1.79041 130.815"
        stroke="var(--color-wave-orange-deep)"
        strokeWidth="2.23"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M1259.21 780.7C1276.53 716.395 1329.94 679.081 1361.68 676.545C1388.67 674.388 1379 716.577 1361.68 705.255C1350.1 697.687 1336.83 663.231 1380.63 648.016C1406.53 639.016 1438.21 651.185 1438.21 651.185"
        stroke="var(--color-wave-orange)"
        strokeWidth="2.23"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.4"
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
