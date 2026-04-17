import { motion } from 'framer-motion'
import { TrendingDown, TrendingUp, Clock, ShieldCheck } from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import type { ReactNode } from 'react'

interface ResultMetric {
  icon: ReactNode
  value: number
  prefix?: string
  suffix: string
  label: string
  sublabel: string
  color: string
  bgColor: string
}

const metrics: ResultMetric[] = [
  {
    icon: <TrendingDown className="h-6 w-6" />,
    value: 40,
    suffix: '%',
    label: 'Menos costes operativos',
    sublabel: 'en tareas repetitivas',
    color: 'text-red-400',
    bgColor: 'from-red-500/10 to-red-500/[0.02]',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    value: 10,
    suffix: 'h/sem',
    prefix: '+',
    label: 'Tiempo recuperado',
    sublabel: 'de media por negocio',
    color: 'text-accent-light',
    bgColor: 'from-accent-light/10 to-accent-light/[0.02]',
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    value: 60,
    suffix: '%',
    prefix: '+',
    label: 'Más eficiencia',
    sublabel: 'en procesos del día a día',
    color: 'text-accent',
    bgColor: 'from-accent/10 to-accent/[0.02]',
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    value: 24,
    suffix: '/7',
    label: 'Siempre activo',
    sublabel: 'sin intervención manual',
    color: 'text-green-400',
    bgColor: 'from-green-400/10 to-green-400/[0.02]',
  },
]

export function TechStack() {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      {/* Subtle top line */}
      <div className="h-px mx-auto max-w-xl bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-12" />

      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-accent/60 uppercase font-[family-name:var(--font-display)]">
            Resultados reales con IA
          </span>
          <h2 className="mt-2 text-lg sm:text-xl font-semibold text-white/70">
            Lo que consiguen las empresas y pymes en España{' '}
            <span className="text-gradient-accent-static">que automatizan con Aima Legacy</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {metrics.map((m, i) => (
            <ScrollReveal key={m.label} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`group relative rounded-2xl border border-white/[0.08] bg-gradient-to-b ${m.bgColor} p-6 text-center hover:border-accent/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)] overflow-hidden`}
              >
                {/* Subtle top line per card */}
                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className={`inline-flex mb-4 ${m.color} opacity-70 group-hover:opacity-100 transition-opacity`}>
                  {m.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1 font-[family-name:var(--font-display)]">
                  <AnimatedCounter
                    target={m.value}
                    prefix={m.prefix}
                    suffix={m.suffix}
                    className="text-3xl lg:text-4xl font-bold text-white"
                  />
                </div>
                <div className="text-sm font-medium text-white/60 mb-0.5">
                  {m.label}
                </div>
                <div className="text-[10px] text-white/25 uppercase tracking-wider">
                  {m.sublabel}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <div className="h-px mx-auto max-w-xl mt-12 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  )
}
