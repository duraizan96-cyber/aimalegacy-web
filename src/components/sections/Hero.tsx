import { useEffect, useState, lazy, Suspense, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { GlowButton } from '../ui/GlowButton'

const ParticleField = lazy(() =>
  import('../ui/ParticleField').then((m) => ({ default: m.ParticleField }))
)

const rotatingWords = [
  'automatizado',
  'optimizado',
  'potenciado',
  'digitalizado',
  'escalado',
]

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
  },
}

function AnimatedStat({ value, label, sub }: { value: string; label: string; sub: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center py-6 px-4"
    >
      <span className="text-2xl sm:text-3xl font-bold text-gradient-accent-static">
        {value}
      </span>
      <span className="mt-1 text-xs font-medium text-white/60 tracking-wider uppercase">
        {label}
      </span>
      <span className="text-[10px] text-white/30 mt-0.5 hidden sm:block">
        {sub}
      </span>
    </motion.div>
  )
}

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 600], [0, 150])
  const contentY = useTransform(scrollY, [0, 600], [0, -60])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Volumetric light layers */}
      <div className="absolute inset-0 pointer-events-none isolate">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rotate-[-12deg] bg-gradient-to-br from-accent/[0.07] via-transparent to-transparent blur-[120px]" />
        <div className="absolute bottom-[30%] right-[20%] w-[500px] h-[400px] rotate-[25deg] bg-gradient-to-tl from-blue/[0.05] via-transparent to-transparent blur-[100px]" />
        <div className="absolute top-[60%] left-[15%] w-[400px] h-[400px] bg-gradient-to-r from-accent/[0.04] to-transparent blur-[80px] rounded-full" />
      </div>

      {/* Particle background with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </motion.div>

      {/* Morphing gradient blob */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="morphing-blob w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] bg-gradient-to-br from-accent/[0.08] via-accent/[0.02] to-blue/[0.04] blur-[80px]" />
      </div>

      {/* Ambient orbs */}
      <div className="orb orb-accent w-64 h-64 -top-20 -left-20" />
      <div className="orb orb-blue w-48 h-48 top-1/3 -right-10" style={{ animationDelay: '-4s' }} />
      <div className="orb orb-accent w-32 h-32 bottom-20 left-1/4" style={{ animationDelay: '-2s' }} />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        <motion.div variants={stagger} initial="hidden" animate="visible">
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/[0.06] px-5 py-2.5 backdrop-blur-md">
              <div className="relative">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                <div className="absolute inset-0 animate-ping">
                  <Sparkles className="h-3.5 w-3.5 text-accent opacity-40" />
                </div>
              </div>
              <span className="text-[11px] font-semibold tracking-[0.2em] text-accent/90 uppercase">
                IA para negocios locales
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight"
          >
            <span className="text-white">Tu negocio</span>
            <br />
            <span className="relative inline-block w-full h-[1.15em]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 30, rotateX: -40 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -30, rotateX: 40 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                  className="text-gradient-accent absolute inset-0"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            <span className="text-white">con IA</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white-dim leading-relaxed"
          >
            Reduce costes, ahorra horas cada semana y haz crecer tu facturación.
            <span className="block mt-1 text-white/50">
              Sin complicaciones técnicas. Solo resultados para tu negocio.
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <GlowButton href="#contacto" variant="primary">
              Solicitar Diagnóstico
              <ArrowRight className="h-4 w-4" />
            </GlowButton>
            <GlowButton href="#servicios" variant="secondary">
              Ver Servicios
            </GlowButton>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            variants={fadeUp}
            className="mt-20 grid grid-cols-3 rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.015] backdrop-blur-sm shadow-[inset_0_-20px_60px_-20px_rgba(6,182,212,0.04)]"
          >
            <div className="border-r border-white/[0.06]">
              <AnimatedStat value="-40%" label="Costes" sub="en tareas repetitivas" />
            </div>
            <div className="border-r border-white/[0.06]">
              <AnimatedStat value="+10h" label="A la semana" sub="tiempo recuperado" />
            </div>
            <div>
              <AnimatedStat value="24/7" label="Siempre activo" sub="sin intervención" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/30 font-medium">
            Descubrir
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-accent/40 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none z-[1]" />
    </section>
  )
}
