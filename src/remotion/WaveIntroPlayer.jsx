import { Player } from '@remotion/player'
import { WAVE_INTRO } from './config.js'
import { WaveIntro } from './WaveIntro.jsx'

// Drop-in for embedding the composition on the site, e.g. <WaveIntroPlayer className="w-80" />.
export function WaveIntroPlayer({ title = 'Turn UGC into your next growth channel', ...props }) {
  return (
    <Player
      component={WaveIntro}
      inputProps={{ title }}
      durationInFrames={WAVE_INTRO.durationInFrames}
      fps={WAVE_INTRO.fps}
      compositionWidth={WAVE_INTRO.width}
      compositionHeight={WAVE_INTRO.height}
      style={{ width: '100%', aspectRatio: `${WAVE_INTRO.width} / ${WAVE_INTRO.height}` }}
      autoPlay
      loop
      controls
      {...props}
    />
  )
}
