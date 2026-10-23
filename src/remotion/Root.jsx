import { Composition } from 'remotion'
import { WAVE_INTRO } from './config.js'
import { WaveIntro } from './WaveIntro.jsx'

export function RemotionRoot() {
  return (
    <Composition
      id="WaveIntro"
      component={WaveIntro}
      durationInFrames={WAVE_INTRO.durationInFrames}
      fps={WAVE_INTRO.fps}
      width={WAVE_INTRO.width}
      height={WAVE_INTRO.height}
      defaultProps={{ title: 'Turn UGC into your next growth channel' }}
    />
  )
}
