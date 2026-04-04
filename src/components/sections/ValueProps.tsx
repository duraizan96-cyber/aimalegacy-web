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
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            {/* Icon */}
            <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-accent/10 p-3.5 text-accent group-hover:bg-accent/15 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300">
              {icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient-accent-static transition-colors duration-300">
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
                className="text-3xl font-bold text-gradient-accent-static"
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
    title: 'Recupera tu Tiempo',
    description:
      'Las horas que hoy pierdes contestando mensajes, gestionando citas y haciendo tareas repetitivas vuelven a ser tuyas. Dedica ese tiempo a hacer crecer tu negocio.',
    metric: { value: 10, suffix: 'h/sem', label: 'ahorro medio por negocio' },
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Tu Negocio No Para Nunca',
    description:
      'Mientras duermes, tu negocio sigue atendiendo clientes, enviando recordatorios y cerrando citas. Sin errores, sin olvidos, sin depender de nadie.',
    metric: { value: 99, suffix: '%', label: 'disponibilidad garantizada' },
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'Sabes Lo Que Ganas',
    description:
      'Nada de intuiciones. Ves exactamente cuánto tiempo ahorras, cuántos clientes gestionas y cuánto dinero te estás ahorrando cada mes. Datos reales, decisiones claras.',
    metric: { value: 40, suffix: '%', label: 'mejora media en eficiencia' },
  },
]

export function ValueProps() {
  return (
    <section className="relative py-24 lg:py-32 mesh-gradient-3">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <SectionBadge>Por qué elegirnos</SectionBadge>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Menos esfuerzo,{' '}
            <span className="text-gradient-accent">más beneficio</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white/50">
            Tu negocio funciona mejor, gasta menos y factura más. Así de simple.
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
