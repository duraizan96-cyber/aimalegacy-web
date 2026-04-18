import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, Mic } from 'lucide-react'
import { GlowButton } from '../ui/GlowButton'

/**
 * Hero — "Obsidian Couture"
 * Editorial premium. Cormorant italic display · warm obsidian · champagne gold.
 * Reference: Tom Ford · Aesop · Koto Studio · La Tribu Divisual.
 */

const rotatingWords = ['automatizado', 'optimizado', 'escalado']

function Stat({
  value,
  label,
  sub,
  delay,
}: {
  value: string
  label: string
  sub: string
  delay: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.32, 0.72, 0, 1] }}
      className="relative"
    >
      <span className="block h-px w-8 bg-[#C9A86A]" />
      <div
        className="mt-5 text-[40px] sm:text-[48px] text-[#F5EFE0] leading-none"
        style={{
          fontFamily: 'var(--font-editorial)',
          fontStyle: 'italic',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          fontVariantNumeric: 'lining-nums tabular-nums',
        }}
      >
        {value}
      </div>
      <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[#C7BFB1] font-medium">
        {label}
      </div>
      <div className="text-[12px] text-[#7F7869] mt-1.5 leading-relaxed">{sub}</div>
    </motion.div>
  )
}

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 600], [0, -40])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 lg:pt-32 pb-24">
      {/* ——— Cinematic lighting ——— */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary warm gold light (top-right, like Tom Ford key light) */}
        <div
          className="absolute -top-40 -right-20 w-[1100px] h-[900px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(232,213,168,0.16) 0%, rgba(201,168,106,0.07) 30%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
        {/* Sapphire fill light (bottom-left, subtle tech undertone from logo) */}
        <div
          className="absolute -bottom-20 -left-20 w-[800px] h-[700px] opacity-70"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(30,127,217,0.09) 0%, transparent 65%)',
            filter: 'blur(90px)',
          }}
        />
        {/* Editorial grid hairlines — very faint */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,239,224,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(245,239,224,0.035) 1px, transparent 1px)',
            backgroundSize: '96px 96px',
            maskImage:
              'radial-gradient(ellipse 70% 55% at 50% 45%, black 30%, transparent 85%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 55% at 50% 45%, black 30%, transparent 85%)',
          }}
        />
        {/* Warm floor gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[45vh]"
          style={{
            background:
              'linear-gradient(to top, rgba(232,213,168,0.035) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* ——— Content ——— */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10 w-full"
      >
        <div className="max-w-[900px]">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="h-px w-12 bg-[#C9A86A]/70" />
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#C9A86A]">
              Aima Legacy — Estudio de IA
            </span>
          </motion.div>

          {/* Headline — editorial mixed typography */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="text-[52px] sm:text-[76px] md:text-[100px] lg:text-[120px] leading-[0.92]"
            style={{
              fontFamily: 'var(--font-editorial)',
              fontWeight: 300,
              letterSpacing: '-0.025em',
            }}
          >
            <span className="block text-[#F5EFE0]">Tu negocio,</span>
            <span className="relative inline-block align-baseline">
              {/* SEO proxy for rotating word */}
              <span className="sr-only">automatizado</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  aria-hidden="true"
                  className="inline-block"
                  style={{
                    fontStyle: 'italic',
                    fontWeight: 400,
                    background:
                      'linear-gradient(180deg, #F0E3C0 0%, #E8D5A8 40%, #C9A86A 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter:
                      'drop-shadow(0 0 24px rgba(232, 213, 168, 0.28)) drop-shadow(0 0 60px rgba(201, 168, 106, 0.15))',
                  }}
                >
                  {rotatingWords[wordIndex]}.
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="block text-[#C7BFB1]">Tu equipo, liberado.</span>
          </motion.h1>

          {/* Gold divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.32, 0.72, 0, 1] }}
            className="mt-12 h-px w-28 origin-left"
            style={{
              background:
                'linear-gradient(90deg, #C9A86A 0%, rgba(201,168,106,0.1) 100%)',
            }}
          />

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-10 max-w-xl text-[17px] md:text-[18px] leading-[1.6] text-[#C7BFB1]"
          >
            Diseñamos sistemas de IA a medida para empresas y pymes en España que
            quieren ordenar procesos, recuperar horas y escalar{' '}
            <span className="text-[#F5EFE0]">sin añadir plantilla.</span>
          </motion.p>

          {/* Founder signature — editorial italic */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.5 }}
            className="mt-7 text-[18px] text-[#C9A86A]"
            style={{
              fontFamily: 'var(--font-editorial)',
              fontStyle: 'italic',
              fontWeight: 400,
              letterSpacing: '-0.005em',
            }}
          >
            — Izan Dura, fundador.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.7 }}
            className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-3"
          >
            <GlowButton href="#contacto" variant="primary">
              Solicitar Diagnóstico
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </GlowButton>
            <GlowButton href="#demo" variant="secondary">
              <Mic className="h-4 w-4" strokeWidth={1.8} />
              Habla con Eric
              <span className="relative inline-flex h-1.5 w-1.5 ml-1">
                <span className="absolute inset-0 rounded-full bg-[#4DD2FF] animate-ping opacity-60" />
                <span className="relative rounded-full h-1.5 w-1.5 bg-[#4DD2FF] shadow-[0_0_8px_rgba(77,210,255,0.7)]" />
              </span>
            </GlowButton>
          </motion.div>

          {/* Stats — editorial serif numbers with gold marks */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="mt-24 lg:mt-28 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-14 max-w-3xl"
          >
            <Stat
              value="−40%"
              label="Costes operativos"
              sub="en tareas repetitivas"
              delay={0}
            />
            <Stat
              value="+10h"
              label="Por semana"
              sub="tiempo recuperado"
              delay={0.1}
            />
            <Stat
              value="24/7"
              label="Siempre activo"
              sub="sin intervención manual"
              delay={0.2}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[9px] tracking-[0.35em] uppercase text-[#7F7869] font-medium">
          Descubrir
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="h-8 w-px"
          style={{
            background: 'linear-gradient(to bottom, #C9A86A, transparent)',
          }}
        />
      </motion.div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to top, #08070B 0%, transparent 100%)',
        }}
      />
    </section>
  )
}
