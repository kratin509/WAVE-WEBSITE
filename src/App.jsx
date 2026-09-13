import { NavThemeProvider } from './lib/navTheme'
import { SmoothScroll } from './lib/SmoothScroll'
import { Cursor } from './components/Cursor'
import { Nav } from './components/Nav'
import { Hero } from './components/hero/Hero'

// Scroll-target stub only — the real "How A Wave Starts" section is built next,
// once the hero's visual language is approved.
function NextSectionStub() {
  return (
    <section id="how-it-works" className="relative flex min-h-[60vh] items-center justify-center bg-wave-red-deep px-6 text-center">
      <p className="font-display text-2xl font-semibold tracking-tight text-cream/50 sm:text-3xl">
        How a wave starts — coming next.
      </p>
    </section>
  )
}

function App() {
  return (
    <NavThemeProvider>
      <SmoothScroll>
        <Cursor />
        <Nav />
        <main>
          <Hero />
          <NextSectionStub />
        </main>
      </SmoothScroll>
    </NavThemeProvider>
  )
}

export default App
