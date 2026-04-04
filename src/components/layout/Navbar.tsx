import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { GlowButton } from '../ui/GlowButton'

const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Problemas', href: '#problemas' },
  { label: 'FAQ', href: '#faq' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1])
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.08])

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Dynamic background */}
        <motion.div
          className="absolute inset-0 backdrop-blur-xl"
          style={{
            backgroundColor: `rgba(4, 4, 15, ${bgOpacity})`,
            borderBottom: `1px solid rgba(6, 182, 212, ${borderOpacity})`,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group relative z-10">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-light shadow-[0_0_20px_rgba(6,182,212,0.25)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.45)] transition-shadow duration-300">
                  <span className="text-lg font-extrabold text-black">A</span>
                </div>
                {/* Pulse ring on logo */}
                <div className="absolute inset-0 rounded-xl border border-accent/30 animate-ping opacity-0 group-hover:opacity-30" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-[0.2em] text-white uppercase">
                  AIMA
                </span>
                <span className="text-[9px] font-medium tracking-[0.35em] text-accent/60 uppercase">
                  Legacy
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm text-white/50 hover:text-white transition-colors duration-200 tracking-wide group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:block">
              <GlowButton href="#contacto" variant="primary">
                Solicitar Diagnóstico
              </GlowButton>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative z-10 p-2 text-white/60 hover:text-accent transition-colors cursor-pointer"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  className="text-2xl font-semibold text-white/60 hover:text-accent transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="mt-6"
              >
                <GlowButton
                  href="#contacto"
                  variant="primary"
                  onClick={() => setMobileOpen(false)}
                >
                  Solicitar Diagnóstico
                </GlowButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
