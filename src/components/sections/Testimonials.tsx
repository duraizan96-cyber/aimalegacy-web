import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mic, ClipboardList, ShieldCheck } from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionBadge } from '../ui/SectionBadge'
import { SpotlightCard } from '../ui/SpotlightCard'

interface ProofCardProps {
  icon: React.ElementType
  tag: string
  title: string
  description: string
  delay: number
}

function ProofCard({ icon: Icon, tag, title, description, delay }: ProofCardProps) {
  return (
    <ScrollReveal delay={delay}>
      <SpotlightCard className="h-full">
        <div className="relative rounded-2xl bg-black-card border border-white/[0.06] p-7 lg:p-8 h-full flex flex-col group-hover:border-accent/15 transition-colors duration-500">
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[inset_0_-20px_60px_-20px_rgba(212,175,55,0.05)]" />

          <div className="relative z-10 flex flex-col h-full">
            <div className="mb-5 h-12 w-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Icon className="h-6 w-6 text-accent" />
            </div>

            <span className="text-xs uppercase tracking-wider text-accent/70 font-semibold mb-3">
              {tag}
            </span>

            <h3 className="text-lg font-bold text-white mb-3 leading-snug">{title}</h3>

            <p className="text-sm text-white/55 leading-relaxed flex-grow">{description}</p>
          </div>
        </div>
      </SpotlightCard>
    </ScrollReveal>
  )
}

const proofPoints: Omit<ProofCardProps, 'delay'>[] = [
  {
    icon: Mic,
    tag: 'Prueba ahora mismo',
    title: 'Eric funciona en vivo — no es una demo grabada',
    description:
      'Puedes hablar con Eric ahora mismo en esta web. Es un agente de voz IA real, activo 24/7, construido con las mismas herramientas que usamos para los clientes. Si funciona aquí, funciona en tu negocio.',
  },
  {
    icon: ClipboardList,
    tag: 'Metodología real',
    title: 'Primero diagnóstico, luego implementación — siempre',
    description:
      'Nunca automatizamos sin entender tu negocio. El diagnóstico BPMN detecta qué optimizar antes de tocar tecnología. Si automatizas un proceso ineficiente, la IA solo devuelve super-ineficiencia.',
  },
  {
    icon: ShieldCheck,
    tag: 'Garantía documentada',
    title: 'Cada sistema entregado con Plan A, B, C y D',
    description:
      'Si algo falla, hay alternativas activas de forma automática. Tu negocio nunca se queda bloqueado. Todo workflow se entrega probado, documentado y con monitorización en tiempo real vía Telegram.',
  },
]

const trustMetrics = [
  { value: '1er', label: 'Cliente piloto sin coste' },
  { value: '48h', label: 'Propuesta en menos de' },
  { value: '24/7', label: 'Sistemas activos' },
  { value: '4', label: 'Fases del diagnóstico' },
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
          <SectionBadge>Por qué confiar</SectionBadge>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Prueba real antes de{' '}
            <span className="text-gradient-accent">comprometerte</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white/50">
            Estamos abriendo los primeros proyectos de diagnóstico en 2026. Contacto directo
            con Izan Dura — sin intermediarios, sin burocracia.
          </p>
        </ScrollReveal>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {proofPoints.map((p, i) => (
            <ProofCard key={p.title} {...p} delay={i * 0.12} />
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
