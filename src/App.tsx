import { lazy, Suspense } from 'react'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { TechStack } from './components/sections/TechStack'
import { Footer } from './components/layout/Footer'
import { CursorGlow } from './components/ui/CursorGlow'
import { ScrollProgress } from './components/ui/ScrollProgress'

// Lazy-load below-the-fold sections (reduces initial JS parse ~40%)
const Services = lazy(() => import('./components/sections/Services').then(m => ({ default: m.Services })))
const LiveDemo = lazy(() => import('./components/sections/LiveDemo').then(m => ({ default: m.LiveDemo })))
const Process = lazy(() => import('./components/sections/Process').then(m => ({ default: m.Process })))
const Testimonials = lazy(() => import('./components/sections/Testimonials').then(m => ({ default: m.Testimonials })))
const FAQ = lazy(() => import('./components/sections/FAQ').then(m => ({ default: m.FAQ })))
const CTA = lazy(() => import('./components/sections/CTA').then(m => ({ default: m.CTA })))
const BlogList = lazy(() => import('./pages/BlogList').then(m => ({ default: m.BlogList })))
const BlogPost = lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })))

interface AppProps {
  page?: 'blog' | 'blogPost'
}

export default function App({ page }: AppProps) {
  const isLanding = !page

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="noise-overlay" />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      {isLanding ? (
        <main>
          <Hero />
          <TechStack />
          <Suspense>
            <div className="section-divider mx-auto max-w-4xl" />
            <Services />
            <LiveDemo />
            <div className="section-divider mx-auto max-w-4xl" />
            <Process />
            <div className="section-divider mx-auto max-w-4xl" />
            <Testimonials />
            <div className="section-divider mx-auto max-w-4xl" />
            <FAQ />
            <CTA />
          </Suspense>
        </main>
      ) : (
        <main>
          <Suspense>
            {page === 'blog' ? <BlogList /> : <BlogPost />}
          </Suspense>
        </main>
      )}
      <Footer />
    </div>
  )
}
