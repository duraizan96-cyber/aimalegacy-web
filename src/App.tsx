import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { TechStack } from './components/sections/TechStack'
import { ValueProps } from './components/sections/ValueProps'
import { Services } from './components/sections/Services'
import { Process } from './components/sections/Process'
import { SavingsCalculator } from './components/sections/SavingsCalculator'
import { PainPoints } from './components/sections/PainPoints'
import { FAQ } from './components/sections/FAQ'
import { CTA } from './components/sections/CTA'
import { Footer } from './components/layout/Footer'
import { CursorGlow } from './components/ui/CursorGlow'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="noise-overlay" />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <ValueProps />
        <Services />
        <Process />
        <SavingsCalculator />
        <PainPoints />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
