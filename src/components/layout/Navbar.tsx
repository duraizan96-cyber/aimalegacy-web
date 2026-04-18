import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { GlowButton } from '../ui/GlowButton'

const navLinks = [
  { label: 'Prueba Eric', href: '#demo' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '#faq' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isLanding = location.pathname === '/'
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.92])
  const blurAmount = useTransform(scrollY, [0, 80], [0, 22])
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.14])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundColor: `rgba(8, 7, 11, ${bgOpacity})`,
            backdropFilter: `blur(${blurAmount}px)`,
            WebkitBackdropFilter: `blur(${blurAmount}px)`,
            borderBottom: `1px solid rgba(201, 168, 106, ${borderOpacity})`,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex h-20 items-center justify-between">
            {/* Wordmark */}
            <Link
              to="/"
              aria-label="Aima Legacy — Inicio"
              className="flex items-center gap-3 group relative z-10 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A86A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08070B]"
            >
              <div className="relative">
                <img
                  src="/logo-aima.jpg"
                  alt="Aima Legacy — Estudio de sistemas de IA"
                  width="36"
                  height="36"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-9 w-9 rounded-lg object-cover transition-all duration-500"
                  style={{
                    boxShadow:
                      '0 0 0 1px rgba(201, 168, 106, 0.25), 0 0 24px -8px rgba(232, 213, 168, 0.2)',
                  }}
                />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-[12px] tracking-[0.24em] uppercase text-[#F5EFE0] font-medium"
                >
                  Aima Legacy
                </span>
                <span
                  className="mt-1 text-[9px] tracking-[0.28em] uppercase text-[#C9A86A] font-medium"
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                  }}
                >
                  Estudio de IA
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isRoute = link.href.startsWith('/')
                const isAnchor = link.href.startsWith('#')
                const anchorHref = isAnchor && !isLanding ? `/${link.href}` : link.href
                const linkClass =
                  'relative px-4 py-2 text-[13px] text-[#C7BFB1] hover:text-[#F5EFE0] transition-colors duration-300 tracking-[0.02em] group rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A86A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08070B]'

                return isRoute ? (
                  <Link key={link.href} to={link.href} className={linkClass}>
                    {link.label}
                    <span
                      className="absolute bottom-1 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent 0%, #C9A86A 50%, transparent 100%)',
                      }}
                    />
                  </Link>
                ) : (
                  <a key={link.href} href={anchorHref} className={linkClass}>
                    {link.label}
                    <span
                      className="absolute bottom-1 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent 0%, #C9A86A 50%, transparent 100%)',
                      }}
                    />
                  </a>
                )
              })}
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
              aria-label={mobileOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="md:hidden relative z-10 p-3 -m-1 text-[#C7BFB1] hover:text-[#E8D5A8] transition-colors cursor-pointer rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A86A]"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={22} strokeWidth={1.5} />
                  </motion.div>
                ) : (
                  <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={22} strokeWidth={1.5} />
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
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{
              backgroundColor: 'rgba(8, 7, 11, 0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            {/* Logo */}
            <motion.img
              src="/logo-aima.jpg"
              alt="Aima Legacy — Estudio de sistemas de IA"
              width="56"
              height="56"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-14 w-14 rounded-xl object-cover mb-12"
              style={{
                boxShadow: '0 0 0 1px rgba(201,168,106,0.25), 0 0 40px -8px rgba(232,213,168,0.25)',
              }}
            />
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => {
                const isRoute = link.href.startsWith('/')
                const isAnchor = link.href.startsWith('#')
                const anchorHref = isAnchor && !isLanding ? `/${link.href}` : link.href
                const motionProps = {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: 10 },
                  transition: { delay: i * 0.07, duration: 0.4, ease: [0.32, 0.72, 0, 1] as const },
                }
                const linkClass =
                  'text-[28px] text-[#C7BFB1] hover:text-[#E8D5A8] transition-colors duration-300'
                const linkStyle = {
                  fontFamily: 'var(--font-editorial)',
                  fontWeight: 300,
                  letterSpacing: '-0.015em',
                }

                return isRoute ? (
                  <motion.div key={link.href} {...motionProps}>
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={linkClass}
                      style={linkStyle}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={link.href}
                    href={anchorHref}
                    onClick={() => setMobileOpen(false)}
                    className={linkClass}
                    style={linkStyle}
                    {...motionProps}
                  >
                    {link.label}
                  </motion.a>
                )
              })}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
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
