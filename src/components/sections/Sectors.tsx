import { motion } from 'framer-motion'
import {
  MessageSquare,
  Users,
  Calendar,
  FileBarChart,
  Package,
  Star,
  UserPlus,
  Headphones,
  Receipt,
  CheckCircle2,
} from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionBadge } from '../ui/SectionBadge'
import { useTilt } from '../../hooks/useTilt'
import type { ReactNode } from 'react'

interface FeaturedProcess {
  number: string
  icon: ReactNode
  name: string
  tagline: string
  description: string
  points: string[]
}

interface SecondaryProcess {
  icon: ReactNode
  name: string
}

const featuredProcesses: FeaturedProcess[] = [
  {
    number: '01',
    icon: <MessageSquare className="h-7 w-7" />,
    name: 'Atención al cliente 24/7',
    tagline: 'Responde, cualifica, reserva. Sin intervención humana.',
    description:
      'Agentes de IA sobre WhatsApp, web o email que gestionan la primera conversación con cada cliente: resuelven dudas, cualifican intención y derivan solo lo que importa a tu equipo.',
    points: [
      'Respuesta en segundos, a cualquier hora',
      'Integrable con tu CRM y tus herramientas',
      'Tono y conocimiento entrenados con tu marca',
      'Handoff a humano cuando hace falta',
    ],
  },
  {
    number: '02',
    icon: <Users className="h-7 w-7" />,
    name: 'Cualificación y nurturing de leads',
    tagline: 'Más oportunidades reales. Menos tiempo perdido.',
    description:
      'Sistemas que reciben leads desde cualquier canal, los puntúan según tu ICP, ejecutan secuencias de seguimiento y sincronizan el estado en tu CRM sin intervención manual.',
    points: [
      'Lead scoring automático según criterios propios',
      'Secuencias multicanal (email, WhatsApp, llamada)',
      'CRM actualizado en tiempo real',
      'Alertas a comerciales cuando un lead está caliente',
    ],
  },
]

const secondaryProcesses: SecondaryProcess[] = [
  { icon: <Calendar className="h-4 w-4" />, name: 'Gestión de citas y reservas' },
  { icon: <FileBarChart className="h-4 w-4" />, name: 'Reporting automático' },
  { icon: <Package className="h-4 w-4" />, name: 'Pedidos y proveedores' },
  { icon: <Star className="h-4 w-4" />, name: 'Respuesta a reseñas' },
  { icon: <UserPlus className="h-4 w-4" />, name: 'Onboarding de clientes' },
  { icon: <Headphones className="h-4 w-4" />, name: 'Helpdesk interno IA' },
  { icon: <Receipt className="h-4 w-4" />, name: 'Facturación y cobros' },
]

function ProcessPill({ process }: { process: SecondaryProcess }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/[0.07] bg-white/[0.025] text-white/45 text-sm font-medium select-none">
      <span className="text-accent/50">{process.icon}</span>
      {process.name}
    </div>
  )
}

function FeaturedCard({ process, index }: { process: FeaturedProcess; index: number }) {
  const { tiltStyle, handleMouseMove, handleMouseLeave } = useTilt(6)

  return (
    <ScrollReveal delay={index * 0.14}>
      <motion.div
        style={{ perspective: 1000, ...tiltStyle }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative rounded-lg bg-gradient-to-br from-accent/[0.05] to-black-card border border-accent/[0.12] p-8 lg:p-10 hover:border-accent/25 transition-all duration-500 hover:shadow-[0_0_60px_rgba(212,175,55,0.08)] overflow-hidden cursor-default"
      >
        {/* Giant editorial number — background */}
        <span className="absolute bottom-2 right-5 text-[130px] lg:text-[160px] font-extrabold leading-none text-white/[0.025] select-none font-[family-name:var(--font-display)] pointer-events-none">
          {process.number}
        </span>

        {/* Top accent line — Ferrari hairline */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

        {/* Hover corner glow */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-accent/[0.05] rounded-full blur-[60px] group-hover:bg-accent/[0.12] transition-colors duration-700" />

        <div className="relative z-10">
          {/* Editorial eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-block h-px w-6 bg-accent/40" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-accent/70 font-medium">
              Proceso · {process.number}
            </span>
          </div>

          {/* Icon + name */}
          <div className="flex items-center gap-4 mb-2">
            <div className="flex-shrink-0 inline-flex items-center justify-center rounded-lg p-3.5 bg-accent/10 border border-accent/20 text-accent group-hover:shadow-[0_0_25px_rgba(212,175,55,0.20)] transition-all duration-400">
              {process.icon}
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-white font-[family-name:var(--font-display)] leading-tight">
              {process.name}
            </h3>
          </div>

          {/* Tagline */}
          <p className="text-accent/65 text-sm font-medium tracking-wide mb-5 pl-[60px]">
            {process.tagline}
          </p>

          {/* Description */}
          <p className="text-sm text-white/50 leading-relaxed mb-6">
            {process.description}
          </p>

          {/* Feature points */}
          <ul className="space-y-2.5">
            {process.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-white/60 group-hover:text-white/70 transition-colors duration-300">
                <CheckCircle2 className="h-4 w-4 text-accent/60 flex-shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

function ProcessMarquee() {
  const doubled = [...secondaryProcesses, ...secondaryProcesses]
  return (
    <div className="relative overflow-hidden py-2">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      <div className="animate-sector-marquee gap-3">
        {doubled.map((process, i) => (
          <ProcessPill key={i} process={process} />
        ))}
      </div>
    </div>
  )
}

export function Sectors() {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header — editorial */}
        <ScrollReveal className="text-center mb-14">
          <SectionBadge>Qué automatizamos</SectionBadge>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Procesos, no promesas.{' '}
            <span className="text-gradient-accent">Resultados medibles.</span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-white/55 leading-relaxed">
            Diseñamos sistemas de IA para procesos concretos que existen en cualquier empresa.
            Sin ataduras de sector. Si tu proceso genera fricción, lo ordenamos, lo optimizamos y lo automatizamos.
          </p>
        </ScrollReveal>

        {/* Featured processes — editorial, numbered, 3D tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featuredProcesses.map((process, i) => (
            <FeaturedCard key={process.number} process={process} index={i} />
          ))}
        </div>

        {/* Secondary processes — marquee ticker */}
        <ScrollReveal delay={0.2} className="mt-16">
          <div className="text-center mb-5">
            <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-white/30 font-medium">
              <span className="inline-block h-px w-6 bg-white/20" />
              También automatizamos
              <span className="inline-block h-px w-6 bg-white/20" />
            </span>
          </div>
          <ProcessMarquee />
        </ScrollReveal>

        {/* Bottom note */}
        <ScrollReveal delay={0.35}>
          <p className="mt-10 text-center text-sm text-white/35">
            ¿Tienes un proceso específico en mente?{' '}
            <a
              href="#contacto"
              className="text-accent/70 hover:text-accent transition-colors underline underline-offset-4 decoration-accent/20 hover:decoration-accent/60"
            >
              Cuéntanoslo en el diagnóstico
            </a>
            {' '}— el primer paso es mapearlo, antes de tocar nada.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
