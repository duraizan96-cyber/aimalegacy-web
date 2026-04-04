import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionBadge } from '../ui/SectionBadge'
import { SpotlightCard } from '../ui/SpotlightCard'

interface TestimonialProps {
  name: string
  role: string
  location: string
  text: string
  metric: string
  metricLabel: string
  initials: string
  delay: number
}

function TestimonialCard({
  name,
  role,
  location,
  text,
  metric,
  metricLabel,
  initials,
  delay,
}: TestimonialProps) {
  return (
    <ScrollReveal delay={delay}>
      <SpotlightCard className="h-full">
        <div className="relative rounded-2xl bg-black-card border border-white/[0.06] p-7 lg:p-8 h-full flex flex-col group-hover:border-accent/15 transition-colors duration-500">
          {/* Inset glow */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[inset_0_-20px_60px_-20px_rgba(6,182,212,0.05)]" />

          <div className="relative z-10 flex flex-col h-full">
            {/* Quote icon */}
            <div className="mb-5">
              <Quote className="h-8 w-8 text-accent/15" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent/80 text-accent/80" />
              ))}
            </div>

            {/* Text */}
            <p className="text-sm text-white/55 leading-relaxed mb-6 flex-grow italic">
              &ldquo;{text}&rdquo;
            </p>

            {/* Metric */}
            <div className="pt-5 mb-6 border-t border-white/[0.06]">
              <span className="text-2xl font-bold text-gradient-accent-static font-[family-name:var(--font-display)]">
                {metric}
              </span>
              <span className="block text-[10px] text-white/30 tracking-wider uppercase mt-1">
                {metricLabel}
              </span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center border border-accent/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <span className="text-xs font-bold text-accent">{initials}</span>
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">{name}</span>
                <span className="text-xs text-white/35">
                  {role} &middot; {location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </ScrollReveal>
  )
}

const testimonials = [
  {
    name: 'Dra. Laura M.',
    role: 'Directora',
    location: 'Valencia',
    text: 'Pasamos de perder 3 horas diarias en gestionar citas a que todo funcione solo. Los pacientes reciben recordatorios, las cancelaciones se reubican y yo me dedico a lo importante: atender pacientes.',
    metric: '-15h/sem',
    metricLabel: 'tiempo en tareas manuales',
    initials: 'LM',
  },
  {
    name: 'Carlos R.',
    role: 'Propietario restaurante',
    location: 'Madrid',
    text: 'No entiendo de tecnología, pero AIMA me lo hizo todo fácil. Ahora mis redes se gestionan solas, las reservas entran automáticas y sé exactamente cuánto me cuesta cada cliente que entra por publicidad.',
    metric: '+40%',
    metricLabel: 'más reservas online',
    initials: 'CR',
  },
  {
    name: 'Marina S.',
    role: 'Studio de tatuajes',
    location: 'Barcelona',
    text: 'Antes perdía clientes porque tardaba en contestar DMs. Ahora la IA responde al instante, agenda citas y manda el aftercare automático. Mis clientes flipan y yo facturo más sin hacer nada extra.',
    metric: '24/7',
    metricLabel: 'atención automatizada',
    initials: 'MS',
  },
]

const trustMetrics = [
  { value: '100%', label: 'Clientes satisfechos' },
  { value: '48h', label: 'Propuesta en menos de' },
  { value: '24/7', label: 'Sistemas activos' },
  { value: '0\u20AC', label: 'Primera consulta' },
]

export function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-24 lg:py-32 mesh-gradient-5">
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-accent/[0.04] rounded-full blur-[80px] float" />
      <div className="absolute bottom-20 right-10 w-36 h-36 bg-blue/[0.03] rounded-full blur-[60px] float-delayed" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <SectionBadge>Testimonios</SectionBadge>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Lo que dicen{' '}
            <span className="text-gradient-accent">nuestros clientes</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white/50">
            Negocios reales en España que ya trabajan mejor gracias a nosotros.
          </p>
        </ScrollReveal>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} {...t} delay={i * 0.12} />
          ))}
        </div>

        {/* Trust metrics bar */}
        <div ref={ref} className="mt-16">
          <ScrollReveal>
            <div className="relative rounded-2xl overflow-hidden border-beam border-beam-slow">
              <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.015] backdrop-blur-sm">
                <div className="grid grid-cols-2 lg:grid-cols-4">
                  {trustMetrics.map((m, i) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className={`flex flex-col items-center py-6 px-4 ${
                        i < trustMetrics.length - 1 ? 'lg:border-r border-white/[0.06]' : ''
                      } ${i < 2 ? 'border-b lg:border-b-0 border-white/[0.06]' : ''}`}
                    >
                      <span className="text-2xl sm:text-3xl font-bold text-gradient-accent-static font-[family-name:var(--font-display)]">
                        {m.value}
                      </span>
                      <span className="mt-1 text-[10px] text-white/35 tracking-wider uppercase text-center">
                        {m.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
