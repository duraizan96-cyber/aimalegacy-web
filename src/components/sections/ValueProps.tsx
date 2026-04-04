import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Clock, ShieldCheck, BarChart3 } from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionBadge } from '../ui/SectionBadge'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import type { ReactNode, MouseEvent } from 'react'

interface ValueCardProps {
  icon: ReactNode
  title: string
  description: string
  metric: { value: number; suffix: string; label: string }
  delay: number
}

function ValueCard({ icon, title, description, metric, delay }: ValueCardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-150, 150], [4, -4])
  const rotateY = useTransform(mouseX, [-150, 150], [-4, 4])

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <ScrollReveal delay={delay}>
      <motion.div
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
        className="group relative rounded-2xl h-full gradient-border"
      >
        <div className="relative z-10 rounded-2xl bg-black-card p-8 h-full">
          {/* Hover glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            {/* Icon */}
            <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-gold/10 p-3.5 text-gold group-hover:bg-gold/15 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.15)] transition-all duration-300">
              {icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient-gold-static transition-colors duration-300">
              {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              {description}
            </p>

            {/* Metric */}
            <div className="pt-5 border-t border-white/[0.06]">
              <AnimatedCounter
                target={metric.value}
                suffix={metric.suffix}
                className="text-3xl font-bold text-gradient-gold-static"
              />
              <span className="block text-[10px] text-white/30 tracking-wider uppercase mt-1">
                {metric.label}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

const values = [
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Ahorro de Tiempo Real',
    description:
      'Automatizamos las tareas repetitivas que consumen horas de tu dia. Respuestas automaticas, gestion de citas, seguimiento de clientes — todo sin tu intervencion.',
    metric: { value: 10, suffix: 'h/sem', label: 'ahorro medio por cliente' },
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Cero Errores, Siempre Activo',
    description:
      'Los sistemas de IA no olvidan, no se cansan y no cometen errores humanos. Tu negocio funciona 24/7 con la misma calidad, con planes de respaldo activos.',
    metric: { value: 99, suffix: '%', label: 'uptime garantizado' },
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'Resultados Medibles',
    description:
      'Cada automatizacion incluye metricas claras. Sabes exactamente cuanto tiempo ahorras, cuantos clientes gestionas y cual es tu retorno de inversion.',
    metric: { value: 40, suffix: '%', label: 'mejora media en eficiencia' },
  },
]

export function ValueProps() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <SectionBadge>Por que elegirnos</SectionBadge>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            IA que trabaja{' '}
            <span className="text-gradient-gold">para ti</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white/50">
            No solo implementamos tecnologia. Transformamos como funciona tu negocio.
          </p>
        </ScrollReveal>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {values.map((v, i) => (
            <ValueCard key={v.title} {...v} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  )
}
