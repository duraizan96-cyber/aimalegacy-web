import { motion } from 'framer-motion'
import { X, Check, ArrowRight } from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionBadge } from '../ui/SectionBadge'

interface PainCardProps {
  pain: string
  solution: string
  index: number
}

function PainCard({ pain, solution, index }: PainCardProps) {
  return (
    <ScrollReveal delay={index * 0.06}>
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="group relative rounded-2xl overflow-hidden h-full"
      >
        <div className="gradient-border absolute inset-0 rounded-2xl" />
        <div className="relative rounded-2xl bg-black-card p-6 h-full">
          {/* Hover glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.02] via-transparent to-gold/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

          <div className="relative z-10 flex flex-col gap-4">
            {/* Pain */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5 h-7 w-7 rounded-lg bg-red-500/10 flex items-center justify-center">
                <X className="h-3.5 w-3.5 text-red-400" />
              </div>
              <div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-red-400/50 block mb-1.5">
                  Sin AIMA
                </span>
                <p className="text-sm text-white/50 leading-relaxed">{pain}</p>
              </div>
            </div>

            {/* Animated divider */}
            <div className="flex items-center gap-3 px-3">
              <div className="flex-1 h-px bg-gradient-to-r from-red-500/15 to-transparent" />
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight className="h-3.5 w-3.5 text-gold/40" />
              </motion.div>
              <div className="flex-1 h-px bg-gradient-to-l from-gold/15 to-transparent" />
            </div>

            {/* Solution */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5 h-7 w-7 rounded-lg bg-gold/10 flex items-center justify-center">
                <Check className="h-3.5 w-3.5 text-gold" />
              </div>
              <div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gold/50 block mb-1.5">
                  Con AIMA
                </span>
                <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/60 transition-colors">
                  {solution}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

const painPoints = [
  {
    pain: 'Pierdes horas contestando los mismos mensajes y gestionando citas a mano.',
    solution:
      'Respuestas automaticas inteligentes y reservas online 24/7. Recuperas +10 horas/semana.',
  },
  {
    pain: 'No tienes presencia online o tu contenido no conecta con tus clientes.',
    solution:
      'Estrategia de contenido con IA: posts, Reels y copy adaptados a tu marca automaticamente.',
  },
  {
    pain: 'Gastas en publicidad sin saber que funciona ni donde va tu dinero.',
    solution:
      'Campanas optimizadas con IA, metricas claras y cada euro controlado. ROI visible.',
  },
  {
    pain: 'Quieres usar IA pero no sabes por donde empezar ni en quien confiar.',
    solution:
      'Diagnostico profesional: entendemos tu negocio, proponemos mejoras seguras con un plan claro.',
  },
  {
    pain: 'Los errores humanos te cuestan clientes: citas olvidadas, mensajes sin responder.',
    solution:
      'Sistemas con Plan A/B/C/D: si algo falla, hay alternativa activa. Nunca te quedas bloqueado.',
  },
  {
    pain: 'Los negocios grandes tienen tecnologia que tu no puedes permitirte.',
    solution:
      'Misma tecnologia IA adaptada a negocio local. Precio justo, resultados reales, sin humo.',
  },
]

export function PainPoints() {
  return (
    <section id="problemas" className="relative py-24 lg:py-32">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <SectionBadge>Antes y despues</SectionBadge>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            De perder tiempo a{' '}
            <span className="text-gradient-gold">ganar clientes</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white/50">
            Problemas reales que resolvemos cada dia para negocios como el tuyo.
          </p>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {painPoints.map((p, i) => (
            <PainCard key={i} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
