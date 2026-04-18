import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { GlowButton } from '../ui/GlowButton'
import { ScrollReveal } from '../ui/ScrollReveal'

/**
 * CTA — "The Close"
 * Editorial, emotional, one message, one action.
 * No brand narrative repeat (that lives in Footer).
 * No process steps (those live in Process section).
 */
export function CTA() {
  return (
    <section
      id="contacto"
      className="relative py-32 lg:py-44 overflow-hidden"
    >
      {/* Ambient light — single warm gold beam */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] opacity-80"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(232,213,168,0.14) 0%, rgba(201,168,106,0.06) 35%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Vertical hairline — editorial anchor */}
        <div
          className="absolute top-[15%] left-1/2 -translate-x-1/2 w-px h-16"
          style={{
            background:
              'linear-gradient(to bottom, transparent, #C9A86A, transparent)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-10 text-center">
        <ScrollReveal>
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#C9A86A] mb-10"
          >
            El diagnóstico
          </motion.p>

          {/* Editorial headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
            className="text-[40px] sm:text-[58px] md:text-[76px] leading-[1.02]"
            style={{
              fontFamily: 'var(--font-editorial)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              color: '#F5EFE0',
            }}
          >
            Empieza por{' '}
            <span
              style={{
                fontStyle: 'italic',
                fontWeight: 400,
                background:
                  'linear-gradient(180deg, #F0E3C0 0%, #E8D5A8 40%, #C9A86A 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              entender
            </span>
            .
            <br />
            Luego,{' '}
            <span
              style={{
                fontStyle: 'italic',
                fontWeight: 400,
                background:
                  'linear-gradient(180deg, #F0E3C0 0%, #E8D5A8 40%, #C9A86A 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              automatizar
            </span>
            .
          </motion.h2>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-10 max-w-xl mx-auto text-[17px] leading-[1.65] text-[#C7BFB1]"
          >
            Mapeamos tus procesos, detectamos dónde pierdes tiempo y dinero, y
            entregamos un roadmap de automatización con impacto real y medible.
          </motion.p>

          {/* Single primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-14 flex justify-center"
          >
            <GlowButton
              href="mailto:izan@aimalegacy.es?subject=Solicitud%20de%20Diagn%C3%B3stico%20Estrat%C3%A9gico%20IA"
              variant="primary"
            >
              <Mail className="h-4 w-4" strokeWidth={1.8} />
              Solicitar Diagnóstico
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </GlowButton>
          </motion.div>

          {/* Fine-print guarantees — editorial micro row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-[#7F7869] uppercase tracking-[0.18em]"
          >
            <span>Sin compromiso</span>
            <span
              aria-hidden="true"
              className="inline-block w-1 h-1 rounded-full bg-[#C9A86A]/50"
            />
            <span>Respuesta en 24h</span>
            <span
              aria-hidden="true"
              className="inline-block w-1 h-1 rounded-full bg-[#C9A86A]/50"
            />
            <span>Plazas limitadas</span>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
