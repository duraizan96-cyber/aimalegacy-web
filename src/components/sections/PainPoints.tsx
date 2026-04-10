import { motion } from 'framer-motion'
import { X, Check, ArrowRight } from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionBadge } from '../ui/SectionBadge'
import { SpotlightCard } from '../ui/SpotlightCard'

interface PainCardProps {
  pain: string
  solution: string
  index: number
}

function PainCard({ pain, solution, index }: PainCardProps) {
  return (
    <ScrollReveal delay={index * 0.06}>
      <SpotlightCard className="h-full">
        <div className="relative rounded-2xl bg-black-card border border-white/[0.06] p-6 h-full group-hover:border-accent/15 transition-colors duration-500">
          {/* Hover glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.02] via-transparent to-accent/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

          <div className="relative z-10 flex flex-col gap-4">
            {/* Pain */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5 h-7 w-7 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/15 group-hover:shadow-[0_0_12px_rgba(239,68,68,0.15)] transition-all duration-300">
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
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight className="h-3.5 w-3.5 text-accent/50" />
              </motion.div>
              <div className="flex-1 h-px bg-gradient-to-l from-accent/20 to-transparent" />
            </div>

            {/* Solution */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5 h-7 w-7 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 group-hover:shadow-[0_0_12px_rgba(212,175,55,0.2)] transition-all duration-300">
                <Check className="h-3.5 w-3.5 text-accent" />
              </div>
              <div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-accent/50 block mb-1.5">
                  Con AIMA
                </span>
                <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/65 transition-colors">
                  {solution}
                </p>
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </ScrollReveal>
  )
}

const painPoints = [
  {
    pain: 'Pierdes horas contestando los mismos mensajes y gestionando citas a mano.',
    solution:
      'Respuestas automáticas inteligentes y reservas online 24/7. Recuperas +10 horas/semana.',
  },
  {
    pain: 'No tienes presencia online o tu contenido no conecta con tus clientes.',
    solution:
      'Estrategia de contenido con IA: posts, Reels y copy adaptados a tu marca automáticamente.',
  },
  {
    pain: 'Gastas en publicidad sin saber qué funciona ni dónde va tu dinero.',
    solution:
      'Campañas optimizadas con IA, métricas claras y cada euro controlado. ROI visible.',
  },
  {
    pain: 'Quieres usar IA pero no sabes por dónde empezar ni en quién confiar.',
    solution:
      'Diagnóstico profesional: entendemos tu negocio, proponemos mejoras seguras con un plan claro.',
  },
  {
    pain: 'Los errores humanos te cuestan clientes: citas olvidadas, mensajes sin responder.',
    solution:
      'Sistemas con Plan A/B/C/D: si algo falla, hay alternativa activa. Nunca te quedas bloqueado.',
  },
  {
    pain: 'Los negocios grandes tienen tecnología que tú no puedes permitirte.',
    solution:
      'Misma tecnología IA adaptada a negocio local. Precio justo, resultados reales, sin humo.',
  },
]

export function PainPoints() {
  return (
    <section id="problemas" className="relative py-24 lg:py-32 mesh-gradient-3">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      {/* Floating orbs */}
      <div className="absolute top-40 right-20 w-44 h-44 bg-red-500/[0.03] rounded-full blur-[80px] float" />
      <div className="absolute bottom-40 left-20 w-40 h-40 bg-accent/[0.04] rounded-full blur-[70px] float-delayed" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <SectionBadge>Antes y después</SectionBadge>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Tu negocio hoy{' '}
            <span className="text-gradient-accent">vs con nosotros</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white/50">
            Estos problemas te están costando dinero cada día. Aquí está la diferencia.
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
