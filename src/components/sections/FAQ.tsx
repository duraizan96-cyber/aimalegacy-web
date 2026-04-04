import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Plus } from 'lucide-react'
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
      <div
        className={`rounded-xl border transition-all duration-300 ${
          isOpen
            ? 'border-gold/15 bg-gold/[0.02] shadow-[0_0_30px_rgba(201,168,76,0.04)]'
            : 'border-white/[0.05] bg-white/[0.01] hover:border-white/[0.08]'
        }`}
      >
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-6 text-left cursor-pointer group"
        >
          <span
            className={`text-[15px] font-medium pr-6 transition-colors duration-200 ${
              isOpen ? 'text-gold' : 'text-white/75 group-hover:text-white'
            }`}
          >
            {question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            className={`flex-shrink-0 p-1 rounded-md transition-colors ${
              isOpen ? 'text-gold bg-gold/10' : 'text-white/30'
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
                <div className="h-px bg-gradient-to-r from-gold/10 via-gold/5 to-transparent mb-4" />
                <p className="text-sm text-white/45 leading-relaxed max-w-2xl">
                  {answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  )
}

const faqs = [
  {
    question: 'Que incluye el diagnostico inicial?',
    answer:
      'El diagnostico es un producto cerrado de 4 fases: mapeo de procesos BPMN, deteccion de mejoras y oportunidades, revision de ciberseguridad, y un roadmap priorizado a medida. Recibes un documento profesional con todo analizado — no es una reunion ni una charla informal.',
  },
  {
    question: 'Cuanto tiempo tarda en verse resultados?',
    answer:
      'El diagnostico se entrega en 5-7 dias laborables. Una vez aprobado el roadmap, las primeras automatizaciones pueden estar activas en 2-4 semanas. Algunos clientes ven ahorro de tiempo desde la primera semana de implementacion.',
  },
  {
    question: 'Necesito conocimientos tecnicos?',
    answer:
      'No. Nosotros nos encargamos de todo lo tecnico. Tu solo necesitas contarnos como funciona tu negocio y que problemas tienes. El diagnostico traduce la tecnologia en decisiones claras que puedes entender.',
  },
  {
    question: 'Que tipo de negocios atendeis?',
    answer:
      'Trabajamos con negocios locales en Espana: clinicas, restaurantes, peluquerias, tatuadores, tiendas, estudios de yoga, academias... Cualquier negocio que tenga procesos repetitivos y quiera optimizarlos con IA.',
  },
  {
    question: 'Que pasa si algo falla despues de implementar?',
    answer:
      'Cada sistema que entregamos incluye Plan A, B, C y D. Si el componente principal falla, hay alternativas activas automaticas. Tu negocio nunca se queda bloqueado. Ademas, monitorizamos todo con alertas en tiempo real.',
  },
  {
    question: 'Puedo ver un ejemplo antes de contratar?',
    answer:
      'El diagnostico inicial es precisamente eso: nuestro primer producto donde demostramos que entendemos tu negocio. No implementamos sin diagnostico previo — asi aseguramos que cada propuesta tiene sentido real.',
  },
  {
    question: 'Cuanto cuesta?',
    answer:
      'Depende del tamano y complejidad de tu negocio. El diagnostico tiene un precio fijo que te comunicamos en la primera conversacion. La implementacion se presupuesta una vez tenemos el roadmap aprobado. Sin sorpresas ni costes ocultos.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-14">
          <SectionBadge>FAQ</SectionBadge>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Preguntas{' '}
            <span className="text-gradient-gold">frecuentes</span>
          </h2>
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
      </div>
    </section>
  )
}
