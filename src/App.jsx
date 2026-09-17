import { SmoothScroll } from './lib/SmoothScroll'
import { Cursor } from './components/Cursor'
import { Nav } from './components/Nav'
import { Hero } from './components/hero/Hero'
import { HowItWorks } from './components/HowItWorks'
import { WhyWave } from './components/WhyWave'
import { Experiments } from './components/experiments/Experiments'
import { CaseStudies } from './components/CaseStudies'
import { WhatYouGet } from './components/WhatYouGet'
import { WhoItsFor } from './components/WhoItsFor'
import { FAQ } from './components/FAQ'
import { FinalCTA } from './components/FinalCTA'

function App() {
  return (
    <SmoothScroll>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <WhyWave />
        <HowItWorks />
        <Experiments />
        <CaseStudies />
        <WhatYouGet />
        <WhoItsFor />
        <FAQ />
        <FinalCTA />
      </main>
    </SmoothScroll>
  )
}

export default App
