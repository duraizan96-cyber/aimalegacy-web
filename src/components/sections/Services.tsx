import { motion } from 'framer-motion'
import {
  Search,
  Workflow,
  Megaphone,
  PenTool,
  Database,
  ArrowUpRight,
} from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionBadge } from '../ui/SectionBadge'
import type { ReactNode } from 'react'

interface ServiceProps {
  icon: ReactNode
  title: string
  description: string
  features: string[]
  accentColor: string
  delay: number
  featured?: boolean
}

function ServiceCard({
  icon,
  title,
  description,
  features,
  accentColor,
  delay,
  featured,
}: ServiceProps) {
  return (
    <ScrollReveal delay={delay}>
      <motion.div
        whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
        className={`group relative h-full rounded-2xl overflow-hidden ${
          featured ? 'md:col-span-2 lg:row-span-2' : ''
        }`}
      >
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl gradient-border gradient-border-animated" />

        {/* Card body */}
        <div className="relative rounded-2xl bg-black-card p-7 lg:p-8 h-full flex flex-col">
          {/* Hover accent glow */}
          <div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: accentColor }}
          />

          {/* Top line accent on hover */}
          <div
            className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
          />

          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div className="inline-flex items-center justify-center rounded-xl bg-accent/10 p-3 text-accent group-hover:bg-accent/15 group-hover:shadow-[0_0_16px_rgba(6,182,212,0.12)] transition-all duration-300">
                {icon}
              </div>
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <ArrowUpRight className="h-5 w-5 text-accent" />
              </motion.div>
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gradient-accent-static transition-colors">
              {title}
            </h3>
            <p className="text-sm text-white/45 leading-relaxed mb-6 flex-grow">
              {description}
            </p>

            {/* Features */}
            <ul className="space-y-2.5 pt-5 border-t border-white/[0.05]">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-white/50 group-hover:text-white/60 transition-colors">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

const services = [
  {
    icon: <Search className="h-6 w-6" />,
    title: 'Saber exactamente dónde pierdes dinero',
    description:
      'Analizamos cómo funciona tu negocio hoy, detectamos dónde estás perdiendo tiempo y dinero, y te damos un plan claro con oportunidades reales de mejora.',
    features: [
      'Ves dónde se van tus horas y tu dinero',
      'Oportunidades ordenadas por impacto',
      'Plan de acción claro y realista',
      'Todo revisado desde la seguridad',
    ],
    accentColor: 'rgba(6, 182, 212, 0.15)',
    featured: true,
  },
  {
    icon: <Workflow className="h-6 w-6" />,
    title: 'Eliminar tareas que te roban el día',
    description:
      'Citas, emails, facturas, seguimientos... Todo lo que hoy haces a mano, funcionando solo. Tú te dedicas a lo importante, el sistema trabaja 24/7.',
    features: [
      'Ahorra +10 horas a la semana',
      'Funciona mientras tú duermes',
      'Cero errores humanos',
    ],
    accentColor: 'rgba(59, 130, 246, 0.12)',
  },
  {
    icon: <PenTool className="h-6 w-6" />,
    title: 'Atraer clientes sin estar pendiente',
    description:
      'Contenido profesional para tus redes que se genera y publica solo. Tu negocio visible todos los días sin que tú toques nada.',
    features: [
      'Presencia online constante',
      'Contenido adaptado a tu marca',
      'Más visibilidad, más clientes',
    ],
    accentColor: 'rgba(6, 182, 212, 0.12)',
  },
  {
    icon: <Megaphone className="h-6 w-6" />,
    title: 'Que cada euro en publicidad rinda',
    description:
      'Campañas que sabes exactamente cuánto te cuestan y cuánto te generan. Cada euro invertido, controlado y optimizado.',
    features: [
      'ROI visible desde el día uno',
      'Sin tirar dinero a ciegas',
      'Optimización continua por datos',
    ],
    accentColor: 'rgba(6, 182, 212, 0.12)',
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: 'No perder ni un cliente por desorden',
    description:
      'Todos tus clientes organizados, con seguimiento automático para que ninguno se te escape. Sabes quién te debe, quién vuelve y quién necesita atención.',
    features: [
      'Ningún cliente se te olvida',
      'Seguimiento automático de cada uno',
      'Datos claros para tomar decisiones',
    ],
    accentColor: 'rgba(59, 130, 246, 0.12)',
  },
]

export function Services() {
  return (
    <section id="servicios" className="relative py-24 lg:py-32 mesh-gradient-4">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <SectionBadge>Servicios</SectionBadge>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Problemas reales,{' '}
            <span className="text-gradient-accent">soluciones reales</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/50">
            No vendemos tecnología. Resolvemos lo que te frena cada día
            para que tu negocio facture más con menos esfuerzo.
          </p>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div key={s.title} className={s.featured ? 'md:col-span-2 lg:col-span-2' : ''}>
              <ServiceCard {...s} delay={i * 0.08} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
