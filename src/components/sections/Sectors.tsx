import { motion } from 'framer-motion'
import {
  Stethoscope,
  UtensilsCrossed,
  Scissors,
  Palette,
  ShoppingBag,
  GraduationCap,
  Dumbbell,
  Flower2,
  Building2,
  CheckCircle2,
} from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionBadge } from '../ui/SectionBadge'
import { useTilt } from '../../hooks/useTilt'
import type { ReactNode } from 'react'

interface FeaturedSector {
  number: string
  icon: ReactNode
  name: string
  tagline: string
  description: string
  points: string[]
}

interface SecondarySector {
  icon: ReactNode
  name: string
}

const featuredSectors: FeaturedSector[] = [
  {
    number: '01',
    icon: <Stethoscope className="h-7 w-7" />,
    name: 'Clínicas y consultas médicas',
    tagline: 'Más citas. Menos llamadas.',
    description:
      'Gestión de citas con WhatsApp IA, recordatorios automáticos, historial de pacientes y seguimiento post-visita sin intervención manual.',
    points: [
      'Agente WhatsApp 24/7 para reservas',
      'Recordatorios que reducen no-shows un 70%',
      'Integración con cualquier software de clínica',
      'Cumplimiento RGPD garantizado',
    ],
  },
  {
    number: '02',
    icon: <Building2 className="h-7 w-7" />,
    name: 'Inmobiliarias y agencias',
    tagline: 'Leads cualificados. Menos esperas.',
    description:
      'Cualificación automática de leads, seguimiento de interesados, agenda de visitas y respuesta 24/7 por WhatsApp o web.',
    points: [
      'Lead scoring automático desde portales',
      'Agente IA que cualifica antes de llamar',
      'Agenda de visitas sin secretaria',
      'CRM actualizado en tiempo real',
    ],
  },
]

const secondarySectors: SecondarySector[] = [
  { icon: <UtensilsCrossed className="h-4 w-4" />, name: 'Restaurantes' },
  { icon: <Scissors className="h-4 w-4" />, name: 'Peluquerías' },
  { icon: <Palette className="h-4 w-4" />, name: 'Tatuadores' },
  { icon: <ShoppingBag className="h-4 w-4" />, name: 'Tiendas' },
  { icon: <GraduationCap className="h-4 w-4" />, name: 'Academias' },
  { icon: <Dumbbell className="h-4 w-4" />, name: 'Gimnasios' },
  { icon: <Flower2 className="h-4 w-4" />, name: 'Estudios de yoga' },
]

function SectorPill({ sector }: { sector: SecondarySector }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/[0.07] bg-white/[0.025] text-white/40 text-sm font-medium select-none">
      <span className="text-accent/50">{sector.icon}</span>
      {sector.name}
    </div>
  )
}

function FeaturedCard({ sector, index }: { sector: FeaturedSector; index: number }) {
  const { tiltStyle, handleMouseMove, handleMouseLeave } = useTilt(6)

  return (
    <ScrollReveal delay={index * 0.14}>
      <motion.div
        style={{ perspective: 1000, ...tiltStyle }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative rounded-2xl bg-gradient-to-br from-accent/[0.07] to-black-card border border-accent/[0.15] p-8 lg:p-10 hover:border-accent/30 transition-all duration-500 hover:shadow-[0_0_60px_rgba(212,175,55,0.10)] overflow-hidden cursor-default"
      >
        {/* Giant editorial number — background */}
        <span className="absolute bottom-2 right-5 text-[130px] lg:text-[160px] font-extrabold leading-none text-white/[0.025] select-none font-[family-name:var(--font-display)] pointer-events-none">
          {sector.number}
        </span>

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/40 via-accent-light/90 to-accent/40" />

        {/* Hover corner glow */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-accent/[0.06] rounded-full blur-[60px] group-hover:bg-accent/[0.15] transition-colors duration-700" />

        {/* Hover inset glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[inset_0_-30px_80px_-20px_rgba(212,175,55,0.07)]" />

        <div className="relative z-10">
          {/* Badge + number label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Sector principal
            </span>
            <span className="text-[11px] font-mono text-white/20 tracking-wider">{sector.number}</span>
          </div>

          {/* Icon + name */}
          <div className="flex items-center gap-4 mb-1.5">
            <div className="flex-shrink-0 inline-flex items-center justify-center rounded-2xl p-3.5 bg-accent/15 border border-accent/20 text-accent shadow-[0_0_20px_rgba(212,175,55,0.15)] group-hover:shadow-[0_0_35px_rgba(212,175,55,0.30)] transition-all duration-400">
              {sector.icon}
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-white font-[family-name:var(--font-display)] leading-tight">
              {sector.name}
            </h3>
          </div>

          {/* Tagline */}
          <p className="text-accent/65 text-sm font-semibold tracking-wide mb-5 pl-[60px]">
            {sector.tagline}
          </p>

          {/* Description */}
          <p className="text-sm text-white/50 leading-relaxed mb-6">
            {sector.description}
          </p>

          {/* Feature points */}
          <ul className="space-y-2.5">
            {sector.points.map((point) => (
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

function SectorMarquee() {
  const doubled = [...secondarySectors, ...secondarySectors]
  return (
    <div className="relative overflow-hidden py-2">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      <div className="animate-sector-marquee gap-3">
        {doubled.map((sector, i) => (
          <SectorPill key={i} sector={sector} />
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

      {/* Floating orbs */}
      <div className="absolute top-10 right-1/4 w-40 h-40 bg-accent/[0.03] rounded-full blur-[80px] float" />
      <div className="absolute bottom-10 left-1/4 w-36 h-36 bg-accent/[0.02] rounded-full blur-[70px] float-delayed" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-12">
          <SectionBadge>Automatización IA por sector</SectionBadge>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Sectores donde la IA{' '}
            <span className="text-gradient-accent">cambia las reglas</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white/50">
            Nos especializamos donde el impacto es mayor. Si tu sector no aparece aquí,{' '}
            <a href="#contacto" className="text-accent/70 hover:text-accent transition-colors underline-offset-4 underline decoration-accent/20">cuéntanos tu caso</a>
            {' '}— lo automatizamos igualmente.
          </p>
        </ScrollReveal>

        {/* Featured sectors — editorial, numbered, 3D tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featuredSectors.map((sector, i) => (
            <FeaturedCard key={sector.number} sector={sector} index={i} />
          ))}
        </div>

        {/* Secondary sectors — marquee ticker */}
        <ScrollReveal delay={0.2} className="mt-14">
          <div className="text-center mb-5">
            <span className="text-[11px] uppercase tracking-[0.28em] text-white/25 font-medium">
              También automatizamos
            </span>
          </div>
          <SectorMarquee />
        </ScrollReveal>

        {/* Bottom note */}
        <ScrollReveal delay={0.35}>
          <p className="mt-8 text-center text-sm text-white/30">
            ¿No ves tu sector?{' '}
            <a
              href="#contacto"
              className="text-accent/65 hover:text-accent transition-colors underline underline-offset-4 decoration-accent/20 hover:decoration-accent/50"
            >
              Cuéntanos tu caso
            </a>
            {' '}— automatizamos cualquier negocio local en España con IA.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
