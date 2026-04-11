import { motion } from 'framer-motion'
import { ArrowRight, Mail, Sparkles } from 'lucide-react'
import { GlowButton } from '../ui/GlowButton'
import { ScrollReveal } from '../ui/ScrollReveal'

export function CTA() {
  return (
    <section id="contacto" className="relative py-24 lg:py-32">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="morphing-blob w-full h-full bg-gradient-to-br from-accent/[0.08] via-accent/[0.03] to-blue/[0.04] blur-[100px]" />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="relative rounded-3xl overflow-hidden border-beam">
            {/* Card */}
            <div className="relative glass-strong rounded-3xl p-10 lg:p-16 text-center">
              {/* Floating orbs inside */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-accent/[0.06] rounded-full blur-[50px] float" />
              <div className="absolute bottom-10 left-10 w-28 h-28 bg-blue/[0.04] rounded-full blur-[40px] float-delayed" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/[0.02] rounded-full blur-[60px]" />

              {/* Decorative sparkles */}
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-8 left-16"
              >
                <Sparkles className="h-4 w-4 text-accent/30" />
              </motion.div>
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-12 right-20"
              >
                <Sparkles className="h-3 w-3 text-accent/25" />
              </motion.div>

              {/* Logo */}
              <motion.img
                src="/logo-aima.jpg"
                alt="Aima Legacy — Agencia de automatización con IA para negocios locales en España, fundada por Izan Dura"
                width="64"
                height="64"
                loading="lazy"
                decoding="async"
                className="h-16 w-16 rounded-2xl object-cover mx-auto mb-8 shadow-[0_0_40px_rgba(212,175,55,0.25)] border border-accent/15"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', bounce: 0.4, delay: 0.2 }}
              />

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1]">
                ¿Quieres automatizar tu negocio local{' '}
                <span className="text-gradient-accent">con inteligencia artificial</span>?
              </h2>

              <p className="mt-6 text-lg text-white/45 max-w-xl mx-auto leading-relaxed">
                Empezamos con un diagnóstico IA completo. Izan Dura y el equipo de Aima Legacy mapean tu negocio, detectan dónde pierdes dinero y te entregan un roadmap de automatización con impacto real.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-white/35">
                <span className="flex items-center gap-2">
                  <span className="text-accent font-bold">01</span> Mapeo BPMN de tus procesos
                </span>
                <span className="text-white/10">·</span>
                <span className="flex items-center gap-2">
                  <span className="text-accent font-bold">02</span> Oportunidades con IA
                </span>
                <span className="text-white/10">·</span>
                <span className="flex items-center gap-2">
                  <span className="text-accent font-bold">03</span> Revisión ciberseguridad
                </span>
                <span className="text-white/10">·</span>
                <span className="flex items-center gap-2">
                  <span className="text-accent font-bold">04</span> Roadmap priorizado
                </span>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <GlowButton href="mailto:izan@aimalegacy.es?subject=Solicitud%20de%20Diagn%C3%B3stico%20Estrat%C3%A9gico%20IA" variant="primary">
                  <Mail className="h-4 w-4" />
                  Solicitar Diagnóstico
                  <ArrowRight className="h-4 w-4" />
                </GlowButton>
                <GlowButton
                  href="https://www.linkedin.com/in/izandura/"
                  variant="secondary"
                >
                  Hablar con Izan en LinkedIn
                </GlowButton>
              </div>

              <div className="mt-10 flex items-center justify-center gap-8 text-white/25">
                <div className="flex items-center gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400/60 shadow-[0_0_6px_rgba(74,222,128,0.4)]" />
                  Sin compromiso
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400/60 shadow-[0_0_6px_rgba(74,222,128,0.4)]" />
                  Respuesta en 24h
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400/60 shadow-[0_0_6px_rgba(74,222,128,0.4)]" />
                  Plazas limitadas
                </div>
              </div>
              <p className="mt-6 text-[11px] text-white/30 uppercase tracking-[0.2em]">
                Atendido personalmente por <span className="text-accent/70 font-semibold">Izan Dura</span>, fundador de Aima Legacy
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
