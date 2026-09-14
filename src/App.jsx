import { NavThemeProvider } from './lib/navTheme'
import { SmoothScroll } from './lib/SmoothScroll'
import { Cursor } from './components/Cursor'
import { Nav } from './components/Nav'
import { Hero } from './components/hero/Hero'
import { HowItWorks } from './components/HowItWorks'
import { WhyWave } from './components/WhyWave'
import { Experiments } from './components/experiments/Experiments'

function App() {
  return (
    <NavThemeProvider>
      <SmoothScroll>
        <Cursor />
        <Nav />
        <main>
          <Hero />
          <HowItWorks />
          <WhyWave />
          <Experiments />
        </main>
      </SmoothScroll>
    </NavThemeProvider>
  )
}

export default App
