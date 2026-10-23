import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

const COLORS = {
  cream: '#f7f1e8',
  ink: '#0d0d0d',
  peach: '#ffb36b',
  orange: '#ff7a32',
  red: '#ff2d27',
}

export function WaveIntro({ title }) {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  const logoIn = spring({ frame, fps, config: { damping: 200 } })
  const titleIn = spring({ frame: frame - 20, fps, config: { damping: 200 } })
  const sweep = interpolate(frame, [0, durationInFrames], [-20, 120])
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
  })

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.ink} 0%, ${COLORS.ink} ${sweep}%, ${COLORS.orange} ${sweep + 30}%, ${COLORS.red} ${sweep + 60}%)`,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 96,
        opacity: fadeOut,
        fontFamily: '"Inter Tight", ui-sans-serif, system-ui, sans-serif',
      }}
    >
      <div
        style={{
          color: COLORS.peach,
          fontSize: 160,
          fontWeight: 800,
          letterSpacing: '-0.04em',
          transform: `scale(${interpolate(logoIn, [0, 1], [0.8, 1])})`,
          opacity: logoIn,
        }}
      >
        WAVE
      </div>
      <div
        style={{
          marginTop: 48,
          color: COLORS.cream,
          fontFamily: '"Instrument Serif", ui-serif, Georgia, serif',
          fontStyle: 'italic',
          fontSize: 96,
          lineHeight: 1.08,
          textAlign: 'center',
          transform: `translateY(${interpolate(titleIn, [0, 1], [60, 0])}px)`,
          opacity: titleIn,
        }}
      >
        {title}
      </div>
    </AbsoluteFill>
  )
}
