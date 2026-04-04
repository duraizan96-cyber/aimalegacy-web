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
    title: 'Diagn\u00f3stico Inicial IA',
    description:
      'Analizamos tus procesos reales con metodolog\u00eda BPMN. Detectamos oportunidades de automatizaci\u00f3n, revisamos ciberseguridad y te entregamos un roadmap a medida.',
    features: [
      'Mapeo de procesos BPMN',
      'Detecci\u00f3n de cuellos de botella',
      'Revisi\u00f3n de ciberseguridad',
      'Roadmap priorizado por impacto',
    ],
    accentColor: 'rgba(6, 182, 212, 0.15)',
    featured: true,
  },
  {
    icon: <Workflow className="h-6 w-6" />,
    title: 'Automatizaci\u00f3n de Procesos',
    description:
      'Workflows inteligentes que eliminan tareas manuales. Gesti\u00f3n de citas, emails, facturaci\u00f3n, seguimiento \u2014 todo conectado y funcionando 24/7.',
    features: [
      'Workflows personalizados',
      'Integraci\u00f3n con tus herramientas',
      'Funcionamiento 24/7 sin intervenci\u00f3n',
    ],
    accentColor: 'rgba(59, 130, 246, 0.12)',
  },
  {
    icon: <PenTool className="h-6 w-6" />,
    title: 'Contenido con IA',
    description:
      'Estrategia de contenido y generaci\u00f3n automatizada para redes sociales adaptada a tu marca y tu audiencia.',
    features: [
      'Estrategia de contenido',
      'Generaci\u00f3n automatizada',
      'Publicaci\u00f3n programada',
    ],
    accentColor: 'rgba(6, 182, 212, 0.12)',
  },
  {
    icon: <Megaphone className="h-6 w-6" />,
    title: 'Publicidad Digital',
    description:
      'Campa\u00f1as en Meta, Google y TikTok optimizadas con IA. Segmentaci\u00f3n inteligente y creatividades que convierten.',
    features: [
      'Meta & Google Ads',
      'Creatividades con IA',
      'Optimizaci\u00f3n continua por datos',
    ],
    accentColor: 'rgba(6, 182, 212, 0.12)',
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: 'CRM Personalizado',
    description:
      'Sistema de gesti\u00f3n de clientes a medida con pipeline visual, seguimiento autom\u00e1tico e informes en tiempo real.',
    features: [
      'Pipeline de ventas visual',
      'Seguimiento autom\u00e1tico de leads',
      'Informes y m\u00e9tricas en tiempo real',
    ],
    accentColor: 'rgba(59, 130, 246, 0.12)',
  },
]

export function Services() {
  return (
    <section id="servicios" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <SectionBadge>Servicios</SectionBadge>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Todo lo que tu negocio{' '}
            <span className="text-gradient-accent">necesita</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/50">
            Desde el diagn\u00f3stico hasta la automatizaci\u00f3n completa.
            Cada servicio resuelve problemas reales de negocios reales.
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
