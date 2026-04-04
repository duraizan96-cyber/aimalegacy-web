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
}

const metrics: ResultMetric[] = [
  {
    icon: <TrendingDown className="h-5 w-5" />,
    value: 40,
    suffix: '%',
    label: 'Menos costes operativos',
    sublabel: 'en tareas repetitivas',
    color: 'text-red-400',
  },
  {
    icon: <Clock className="h-5 w-5" />,
    value: 10,
    suffix: 'h/sem',
    prefix: '+',
    label: 'Tiempo recuperado',
    sublabel: 'de media por negocio',
    color: 'text-cyan',
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    value: 60,
    suffix: '%',
    prefix: '+',
    label: 'Más eficiencia',
    sublabel: 'en procesos del día a día',
    color: 'text-accent',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    value: 24,
    suffix: '/7',
    label: 'Siempre activo',
    sublabel: 'sin intervención manual',
    color: 'text-green-400',
  },
]

export function TechStack() {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      {/* Subtle top line */}
      <div className="line-glow mx-auto max-w-xl mb-12" />

      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-white/30 uppercase">
            Resultados reales
          </span>
          <h3 className="mt-2 text-lg sm:text-xl font-semibold text-white/60">
            Lo que consiguen los negocios{' '}
            <span className="text-gradient-accent-static">que trabajan con nosotros</span>
          </h3>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {metrics.map((m, i) => (
            <ScrollReveal key={m.label} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center hover:border-accent/20 hover:bg-accent/[0.03] transition-all duration-300"
              >
                <div className={`inline-flex mb-4 ${m.color} opacity-60 group-hover:opacity-100 transition-opacity`}>
                  {m.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
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
      <div className="line-glow mx-auto max-w-xl mt-12" />
    </section>
  )
}
