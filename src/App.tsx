import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { TechStack } from './components/sections/TechStack'
import { ValueProps } from './components/sections/ValueProps'
import { Services } from './components/sections/Services'
import { LiveDemo } from './components/sections/LiveDemo'
import { Sectors } from './components/sections/Sectors'
import { Process } from './components/sections/Process'
import { SavingsCalculator } from './components/sections/SavingsCalculator'
import { PainPoints } from './components/sections/PainPoints'
import { Testimonials } from './components/sections/Testimonials'
import { Guarantees } from './components/sections/Guarantees'
import { FAQ } from './components/sections/FAQ'
import { CTA } from './components/sections/CTA'
import { Footer } from './components/layout/Footer'
import { CursorGlow } from './components/ui/CursorGlow'
import { ScrollProgress } from './components/ui/ScrollProgress'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="noise-overlay" />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <div className="section-divider mx-auto max-w-4xl" />
        <ValueProps />
        <Services />
        <LiveDemo />
        <Sectors />
        <div className="section-divider mx-auto max-w-4xl" />
        <Process />
        <SavingsCalculator />
        <div className="section-divider mx-auto max-w-4xl" />
        <PainPoints />
        <Testimonials />
        <Guarantees />
        <div className="section-divider mx-auto max-w-4xl" />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
