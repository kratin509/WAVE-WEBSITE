# WAVE

Marketing site for WAVE — a UGC experimentation and acquisition engine.

Built with React, Vite, and Tailwind CSS, with GSAP/ScrollTrigger, Lenis smooth
scroll, and a React Three Fiber wave for the hero.

## Status

Navigation + hero only, pending visual sign-off before the rest of the page is
built out (see the brief for the full section list).

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Video (Remotion)

Programmatic videos live in `src/remotion/` (`WaveIntro` is a starter 1080×1920
composition in the site's brand colors).

```bash
npm run video:studio   # open Remotion Studio to preview/edit compositions
npm run video:render   # render WaveIntro to out/wave-intro.mp4
```

To embed a composition on the site, use `<WaveIntroPlayer />` from
`src/remotion/WaveIntroPlayer.jsx` (built on `@remotion/player`).
