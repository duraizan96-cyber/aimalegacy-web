import { motion } from 'framer-motion'
import { ArrowRight, Zap, Mail } from 'lucide-react'
import { GlowButton } from '../ui/GlowButton'
import { ScrollReveal } from '../ui/ScrollReveal'

export function CTA() {
  return (
    <section id="contacto" className="relative py-24 lg:py-32">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="morphing-blob w-full h-full bg-gradient-to-br from-accent/[0.06] via-accent/[0.02] to-blue/[0.03] blur-[100px]" />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="relative rounded-3xl overflow-hidden">
            {/* Animated gradient border */}
            <div className="absolute inset-0 gradient-border gradient-border-animated rounded-3xl" />

            {/* Card */}
            <div className="relative glass-strong rounded-3xl p-10 lg:p-16 text-center">
              {/* Floating orbs inside */}
              <div className="absolute top-10 right-10 w-24 h-24 bg-accent/[0.06] rounded-full blur-[40px] float" />
              <div className="absolute bottom-10 left-10 w-20 h-20 bg-blue/[0.04] rounded-full blur-[30px] float-delayed" />

              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', bounce: 0.4, delay: 0.2 }}
                className="relative mx-auto mb-8 inline-flex items-center justify-center rounded-2xl bg-accent/10 p-4 pulse-ring"
              >
                <Zap className="h-8 w-8 text-accent" />
              </motion.div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1]">
                \u00bfQuieres gastar menos{' '}
                <span className="text-gradient-accent">y facturar m\u00e1s</span>?
              </h2>

              <p className="mt-6 text-lg text-white/45 max-w-xl mx-auto leading-relaxed">
                Empezamos analizando tu negocio gratis. Te decimos exactamente
                d\u00f3nde pierdes dinero y c\u00f3mo solucionarlo.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <GlowButton href="mailto:hola@aimalegacy.es" variant="primary">
                  <Mail className="h-4 w-4" />
                  Solicitar Diagn\u00f3stico
                  <ArrowRight className="h-4 w-4" />
                </GlowButton>
                <GlowButton
                  href="https://instagram.com/aimalegacy"
                  variant="secondary"
                >
                  Hablemos por Instagram
                </GlowButton>
              </div>

              <div className="mt-10 flex items-center justify-center gap-8 text-white/20">
                <div className="flex items-center gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400/60" />
                  Sin compromiso
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400/60" />
                  Sin letra peque\u00f1a
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400/60" />
                  Solo resultados
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
