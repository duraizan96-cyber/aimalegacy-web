import { Clock, ShieldCheck, BarChart3 } from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionBadge } from '../ui/SectionBadge'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import { SpotlightCard } from '../ui/SpotlightCard'
import { useGsapScrollReveal } from '../../hooks/useGsapScrollReveal'
import type { ReactNode } from 'react'

interface ValueCardProps {
  icon: ReactNode
  title: string
  description: string
  metric: { value: number; suffix: string; label: string }
  delay: number
  accentColor: string
}

function ValueCard({ icon, title, description, metric, delay, accentColor }: ValueCardProps) {
  return (
    <ScrollReveal delay={delay}>
      <SpotlightCard className="h-full">
        <div className="relative z-10 rounded-2xl bg-black-card border border-white/[0.08] p-8 h-full group-hover:border-accent/20 transition-all duration-500 overflow-hidden">
          {/* Top accent line — VISIBLE */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
          />

          {/* Hover glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            {/* Icon — bigger and more visible */}
            <div
              className="mb-6 inline-flex items-center justify-center rounded-2xl p-4 text-accent shadow-[0_0_20px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-300"
              style={{ backgroundColor: `${accentColor}15` }}
            >
              {icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300 font-[family-name:var(--font-display)]">
              {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              {description}
            </p>

            {/* Metric — much bigger and glowing */}
            <div className="pt-5 border-t border-white/[0.08]">
              <AnimatedCounter
                target={metric.value}
                suffix={metric.suffix}
                className="text-4xl font-bold text-gradient-accent-static font-[family-name:var(--font-display)]"
              />
              <span className="block text-[11px] text-white/35 tracking-wider uppercase mt-1.5 font-medium">
                {metric.label}
              </span>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </ScrollReveal>
  )
}

const values = [
  {
    icon: <Clock className="h-7 w-7" />,
    title: 'Recupera tu Tiempo',
    description:
      'Las horas que hoy pierdes contestando mensajes, gestionando citas y haciendo tareas repetitivas vuelven a ser tuyas. Dedica ese tiempo a hacer crecer tu negocio.',
    metric: { value: 10, suffix: 'h/sem', label: 'ahorro medio por negocio' },
    accentColor: '#D4AF37',
  },
  {
    icon: <ShieldCheck className="h-7 w-7" />,
    title: 'Tu Negocio No Para Nunca',
    description:
      'Mientras duermes, tu negocio sigue atendiendo clientes, enviando recordatorios y cerrando citas. Sin errores, sin olvidos, sin depender de nadie.',
    metric: { value: 99, suffix: '%', label: 'disponibilidad garantizada' },
    accentColor: '#F4D03F',
  },
  {
    icon: <BarChart3 className="h-7 w-7" />,
    title: 'Sabes Lo Que Ganas',
    description:
      'Nada de intuiciones. Ves exactamente cuánto tiempo ahorras, cuántos clientes gestionas y cuánto dinero te estás ahorrando cada mes. Datos reales, decisiones claras.',
    metric: { value: 40, suffix: '%', label: 'mejora media en eficiencia' },
    accentColor: '#D4AF37',
  },
]

export function ValueProps() {
  const h2Ref = useGsapScrollReveal<HTMLHeadingElement>({ type: 'slide' })
  return (
    <section className="relative py-24 lg:py-32 mesh-gradient-3">
      {/* Floating accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <SectionBadge>Por qué automatizar con Aima Legacy</SectionBadge>
          <h2 ref={h2Ref} className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Menos esfuerzo,{' '}
            <span className="text-gradient-accent">más beneficio con IA</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white/50">
            Tu negocio local funciona mejor, gasta menos y factura más con automatización e inteligencia artificial. Así de simple.
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
