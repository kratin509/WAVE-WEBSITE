import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavTheme } from './navTheme'

// Flips the fixed nav into its dark-surface styling while a black/orange
// section is in view, and restores it on the way back up. `start`/`end`
// are tuned per-call since a short, last-on-page section (the final CTA)
// can run out of scroll room before a midpoint threshold like 'top center'
// is ever reachable — for that case pass `onLeave: false` too, since its
// `end` boundary can be satisfied almost immediately after `start`,
// firing onLeave right after onEnter and canceling the flip out.
export function useSectionNavTheme(ref, { dark, start = 'top 65%', end = 'bottom 65%', onLeave = true } = {}) {
  const { setOnDark } = useNavTheme()

  useEffect(() => {
    const el = ref.current
    if (!el || !dark) return
    const st = ScrollTrigger.create({
      trigger: el,
      start,
      end,
      onEnter: () => setOnDark(true),
      onEnterBack: () => setOnDark(true),
      ...(onLeave ? { onLeave: () => setOnDark(false) } : {}),
      onLeaveBack: () => setOnDark(false),
    })
    return () => st.kill()
  }, [ref, dark, start, end, onLeave, setOnDark])
}
