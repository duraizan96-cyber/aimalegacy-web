import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, MessageCircleQuestion } from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionBadge } from '../ui/SectionBadge'

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}

function FAQItem({ question, answer, isOpen, onToggle, index }: FAQItemProps) {
  return (
    <ScrollReveal delay={index * 0.05}>
      <motion.div
        whileHover={{ scale: isOpen ? 1 : 1.005 }}
        transition={{ duration: 0.2 }}
        className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
          isOpen
            ? 'border-beam border-beam-slow'
            : ''
        }`}
      >
        <div
          className={`relative rounded-xl border transition-all duration-300 ${
            isOpen
              ? 'border-accent/15 bg-accent/[0.02] shadow-[0_0_30px_rgba(212,175,55,0.04)]'
              : 'border-white/[0.05] bg-white/[0.01] hover:border-white/[0.08] hover:bg-white/[0.015]'
          }`}
        >
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-between p-6 text-left cursor-pointer group"
          >
            <span
              className={`text-[15px] font-medium pr-6 transition-colors duration-200 font-[family-name:var(--font-display)] ${
                isOpen ? 'text-accent' : 'text-white/75 group-hover:text-white'
              }`}
            >
              {question}
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.25 }}
              className={`flex-shrink-0 p-1.5 rounded-lg transition-all ${
                isOpen
                  ? 'text-accent bg-accent/10 shadow-[0_0_12px_rgba(212,175,55,0.15)]'
                  : 'text-white/30 group-hover:text-white/50'
              }`}
            >
              <Plus className="h-4 w-4" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <div className="h-px bg-gradient-to-r from-accent/15 via-accent/5 to-transparent mb-4" />
                  <p className="text-sm text-white/50 leading-relaxed max-w-2xl">
                    {answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

const faqs = [
  {
    question: '¿Qué incluye el diagnóstico IA inicial de Aima Legacy?',
    answer:
      'El diagnóstico IA de Aima Legacy es un producto cerrado de 4 fases: (1) mapeo de procesos con BPMN profesional, (2) detección de mejoras y oportunidades de automatización, (3) revisión de ciberseguridad, (4) roadmap priorizado a medida con ROI estimado por área. Recibes un documento profesional firmado por Izan Dura — no es una reunión ni una charla informal.',
  },
  {
    question: '¿Cuánto tiempo tarda en ver resultados con la automatización?',
    answer:
      'El diagnóstico se entrega en 5-7 días laborables. Una vez aprobado el roadmap, las primeras automatizaciones con IA pueden estar activas en 2-4 semanas. Muchos clientes ven ahorro de tiempo desde la primera semana de implementación.',
  },
  {
    question: '¿Necesito conocimientos técnicos para automatizar mi negocio?',
    answer:
      'No. Nosotros nos encargamos de todo lo técnico. Tú solo cuentas cómo funciona tu negocio y qué problemas tienes. Integramos la inteligencia artificial en las herramientas que ya usas (WhatsApp, Google Calendar, tu web) sin que tengas que cambiar nada.',
  },
  {
    question: '¿Qué negocios locales automatizáis con IA en España?',
    answer:
      'Aima Legacy automatiza con inteligencia artificial negocios locales en toda España: clínicas dentales, restaurantes, peluquerías, tatuadores, tiendas, gimnasios, estudios de yoga y academias. Cualquier pyme con procesos repetitivos que quiera optimizarlos con automatización profesional.',
  },
  {
    question: '¿Qué pasa si algo falla después de implementar la automatización?',
    answer:
      'Cada sistema que entregamos incluye Plan A, B, C y D. Si el componente principal falla, hay alternativas activas automáticas. Tu negocio nunca se queda bloqueado. Además, monitorizamos todo con alertas en tiempo real vía Telegram.',
  },
  {
    question: '¿Puedo ver un ejemplo antes de contratar a Aima Legacy?',
    answer:
      'Sí. Puedes hablar con Eric, nuestro agente de voz IA en vivo, directamente en esta web — es un ejemplo real, no una demo falsa. Además, el diagnóstico IA inicial es precisamente nuestro primer producto: donde demostramos que entendemos tu negocio. Nunca implementamos sin diagnóstico previo.',
  },
  {
    question: '¿Cuánto cuesta automatizar un negocio local con Aima Legacy?',
    answer:
      'El diagnóstico IA incluye las 4 fases completas (BPMN, mejoras, ciberseguridad, roadmap) y el entregable profesional firmado por Izan Dura. La implementación se presupuesta sobre el roadmap aprobado, adaptado a cada negocio. Contáctanos para recibir una propuesta personalizada sin compromiso.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-24 lg:py-32 mesh-gradient-4">
      {/* Grid lines decoration */}
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />

      {/* Floating orbs */}
      <div className="absolute top-32 left-20 w-40 h-40 bg-accent/[0.04] rounded-full blur-[70px] float" />
      <div className="absolute bottom-32 right-20 w-36 h-36 bg-blue/[0.03] rounded-full blur-[60px] float-delayed" />

      <div className="mx-auto max-w-3xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-14">
          <SectionBadge icon={<MessageCircleQuestion className="h-3.5 w-3.5" />}>
            FAQ
          </SectionBadge>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Preguntas frecuentes sobre{' '}
            <span className="text-gradient-accent">automatización con IA</span>
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-white/45">
            Todo sobre automatización con IA para negocios locales en España.
          </p>
        </ScrollReveal>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              index={i}
            />
          ))}
        </div>

        {/* Bottom CTA hint */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <p className="text-sm text-white/30">
              ¿Tienes otra pregunta?{' '}
              <a
                href="mailto:izan@aimalegacy.es"
                className="text-accent/60 hover:text-accent transition-colors underline underline-offset-4 decoration-accent/20 hover:decoration-accent/50"
              >
                Escríbenos directamente
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
