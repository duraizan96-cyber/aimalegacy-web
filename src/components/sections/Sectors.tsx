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
} from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionBadge } from '../ui/SectionBadge'
import type { ReactNode } from 'react'

interface Sector {
  icon: ReactNode
  name: string
  tasks: string
}

const sectors: Sector[] = [
  {
    icon: <Stethoscope className="h-6 w-6" />,
    name: 'Clínicas dentales',
    tasks: 'Automatización de citas, recordatorios IA, historial digital',
  },
  {
    icon: <UtensilsCrossed className="h-6 w-6" />,
    name: 'Restaurantes',
    tasks: 'Reservas automáticas, agente IA de pedidos, fidelización',
  },
  {
    icon: <Scissors className="h-6 w-6" />,
    name: 'Peluquerías',
    tasks: 'Citas online con IA, recordatorios automáticos, agenda 24/7',
  },
  {
    icon: <Palette className="h-6 w-6" />,
    name: 'Tatuadores',
    tasks: 'Agenda automatizada, presupuestos IA, portfolio online',
  },
  {
    icon: <ShoppingBag className="h-6 w-6" />,
    name: 'Tiendas',
    tasks: 'Inventario automático, atención 24/7, ventas online IA',
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    name: 'Academias',
    tasks: 'Inscripciones automáticas, pagos, seguimiento IA',
  },
  {
    icon: <Dumbbell className="h-6 w-6" />,
    name: 'Gimnasios',
    tasks: 'Reservas automáticas, facturación IA, fidelización',
  },
  {
    icon: <Flower2 className="h-6 w-6" />,
    name: 'Estudios de yoga',
    tasks: 'Clases automatizadas, pagos, comunicación IA',
  },
]

export function Sectors() {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

      {/* Floating orbs */}
      <div className="absolute top-10 right-1/4 w-40 h-40 bg-accent/[0.03] rounded-full blur-[80px] float" />
      <div className="absolute bottom-10 left-1/4 w-36 h-36 bg-blue/[0.03] rounded-full blur-[70px] float-delayed" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-12">
          <SectionBadge>Automatización IA por sector</SectionBadge>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Negocios locales en España que{' '}
            <span className="text-gradient-accent">automatizan con IA</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white/50">
            Cada sector tiene sus propios retos. Nos adaptamos al tuyo con automatización e inteligencia artificial concreta — no plantillas genéricas.
          </p>
        </ScrollReveal>

        {/* Sectors grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
          {sectors.map((sector, i) => (
            <ScrollReveal key={sector.name} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl bg-black-card border border-white/[0.06] p-5 lg:p-6 text-center hover:border-accent/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)] overflow-hidden cursor-default"
              >
                {/* Top line */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="inline-flex mb-3 p-3 rounded-xl bg-accent/5 border border-accent/10 text-accent/80 group-hover:bg-accent/10 group-hover:border-accent/20 group-hover:text-accent group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300">
                    {sector.icon}
                  </div>
                  <h3 className="text-base font-bold text-white/90 mb-1.5 font-[family-name:var(--font-display)]">
                    {sector.name}
                  </h3>
                  <p className="text-[11px] text-white/35 leading-relaxed">
                    {sector.tasks}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom note */}
        <ScrollReveal delay={0.3}>
          <p className="mt-10 text-center text-sm text-white/35">
            ¿No ves tu sector?{' '}
            <a
              href="#contacto"
              className="text-accent/70 hover:text-accent transition-colors underline underline-offset-4 decoration-accent/20 hover:decoration-accent/50"
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
