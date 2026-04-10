import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Eye,
  Layers,
  BadgeCheck,
  Lock,
  RefreshCw,
} from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionBadge } from '../ui/SectionBadge'
import { SpotlightCard } from '../ui/SpotlightCard'
import type { ReactNode } from 'react'

interface Guarantee {
  icon: ReactNode
  title: string
  description: string
  accent: string
}

const guarantees: Guarantee[] = [
  {
    icon: <Layers className="h-6 w-6" />,
    title: 'Plan A, B, C y D',
    description:
      'Cada sistema que entregamos tiene alternativas activas. Si algo falla, hay respaldo automático. Nunca te quedas bloqueado.',
    accent: '#D4AF37',
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: '100% Transparente',
    description:
      'Sabes qué hacemos, cómo lo hacemos y por qué. Sin letra pequeña. Sin costes ocultos. Sin sorpresas.',
    accent: '#F4D03F',
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: 'Seguridad Primero',
    description:
      'Revisión de ciberseguridad antes de entregar. Tus datos y los de tus clientes protegidos. Si no es seguro, no se propone.',
    accent: '#D4AF37',
  },
  {
    icon: <BadgeCheck className="h-6 w-6" />,
    title: 'Calidad Garantizada',
    description:
      'Todo se audita antes de entregar. Workflow probado, documentado y funcionando. Solo entregamos lo que nosotros usaríamos.',
    accent: '#F4D03F',
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    title: 'Soporte Continuo',
    description:
      'Monitorizamos tus sistemas. Si algo falla, te avisamos antes que tu cliente. Respuestas rápidas cuando las necesitas.',
    accent: '#D4AF37',
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Sin Compromiso Inicial',
    description:
      'El diagnóstico es un producto cerrado. Si no ves valor, no avanzas. Sin ataduras, sin letra pequeña.',
    accent: '#F4D03F',
  },
]

export function Guarantees() {
  return (
    <section className="relative py-24 lg:py-32 mesh-gradient-2 overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />

      {/* Animated orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-accent/[0.04] rounded-full blur-[100px] float" />
      <div className="absolute bottom-20 right-1/4 w-56 h-56 bg-blue/[0.03] rounded-full blur-[90px] float-delayed" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <SectionBadge icon={<ShieldCheck className="h-3.5 w-3.5" />}>
            Garantías de Aima Legacy
          </SectionBadge>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Automatización IA con{' '}
            <span className="text-gradient-accent">garantía real</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white/50">
            <span className="text-white/75 font-semibold">Izan Dura</span> firma personalmente cada diagnóstico y cada automatización entregada. Plan A/B/C/D en cada sistema, revisión de ciberseguridad previa y soporte continuo. Sin humo, sin excusas.
          </p>
        </ScrollReveal>

        {/* Guarantees grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {guarantees.map((g, i) => (
            <ScrollReveal key={g.title} delay={i * 0.08}>
              <SpotlightCard className="h-full">
                <div className="relative rounded-2xl bg-black-card border border-white/[0.08] p-7 h-full group-hover:border-accent/20 transition-all duration-500 overflow-hidden">
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${g.accent}, transparent)` }}
                  />

                  {/* Corner glow */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[40px]"
                    style={{ background: `radial-gradient(circle at top right, ${g.accent}20, transparent 70%)` }}
                  />

                  <div className="relative z-10">
                    {/* Icon with pulse */}
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: 3 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="inline-flex items-center justify-center rounded-2xl p-3.5 mb-5 transition-all duration-300"
                      style={{
                        backgroundColor: `${g.accent}15`,
                        color: g.accent,
                        boxShadow: `0 0 20px ${g.accent}15`,
                      }}
                    >
                      {g.icon}
                    </motion.div>

                    <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-accent transition-colors duration-300 font-[family-name:var(--font-display)]">
                      {g.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/60 transition-colors">
                      {g.description}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom commitment */}
        <ScrollReveal delay={0.4}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="mt-12 relative rounded-2xl overflow-hidden border-beam border-beam-slow"
          >
            <div className="relative glass-strong rounded-2xl p-6 lg:p-8 text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                  <span className="text-sm font-semibold text-white/80">
                    Sistemas activos 24/7
                  </span>
                </div>
                <div className="hidden sm:block h-4 w-px bg-white/10" />
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                  <span className="text-sm font-semibold text-white/80">
                    Soporte técnico continuo
                  </span>
                </div>
                <div className="hidden sm:block h-4 w-px bg-white/10" />
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent-light animate-pulse shadow-[0_0_8px_rgba(244,208,63,0.6)]" />
                  <span className="text-sm font-semibold text-white/80">
                    Garantía de entrega
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
