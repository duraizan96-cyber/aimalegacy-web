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
            ? 'border-accent/15 bg-accent/[0.02] shadow-[0_0_30px_rgba(6,182,212,0.04)]'
            : 'border-white/[0.05] bg-white/[0.01] hover:border-white/[0.08]'
        }`}
      >
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-6 text-left cursor-pointer group"
        >
          <span
            className={`text-[15px] font-medium pr-6 transition-colors duration-200 ${
              isOpen ? 'text-accent' : 'text-white/75 group-hover:text-white'
            }`}
          >
            {question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            className={`flex-shrink-0 p-1 rounded-md transition-colors ${
              isOpen ? 'text-accent bg-accent/10' : 'text-white/30'
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
                <div className="h-px bg-gradient-to-r from-accent/10 via-accent/5 to-transparent mb-4" />
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
    question: '\u00bfQu\u00e9 incluye el diagn\u00f3stico inicial?',
    answer:
      'El diagn\u00f3stico es un producto cerrado de 4 fases: mapeo de procesos BPMN, detecci\u00f3n de mejoras y oportunidades, revisi\u00f3n de ciberseguridad, y un roadmap priorizado a medida. Recibes un documento profesional con todo analizado \u2014 no es una reuni\u00f3n ni una charla informal.',
  },
  {
    question: '\u00bfCu\u00e1nto tiempo tarda en verse resultados?',
    answer:
      'El diagn\u00f3stico se entrega en 5-7 d\u00edas laborables. Una vez aprobado el roadmap, las primeras automatizaciones pueden estar activas en 2-4 semanas. Algunos clientes ven ahorro de tiempo desde la primera semana de implementaci\u00f3n.',
  },
  {
    question: '\u00bfNecesito conocimientos t\u00e9cnicos?',
    answer:
      'No. Nosotros nos encargamos de todo lo t\u00e9cnico. T\u00fa solo necesitas contarnos c\u00f3mo funciona tu negocio y qu\u00e9 problemas tienes. El diagn\u00f3stico traduce la tecnolog\u00eda en decisiones claras que puedes entender.',
  },
  {
    question: '\u00bfQu\u00e9 tipo de negocios atend\u00e9is?',
    answer:
      'Trabajamos con negocios locales en Espa\u00f1a: cl\u00ednicas, restaurantes, peluquer\u00edas, tatuadores, tiendas, estudios de yoga, academias... Cualquier negocio que tenga procesos repetitivos y quiera optimizarlos con IA.',
  },
  {
    question: '\u00bfQu\u00e9 pasa si algo falla despu\u00e9s de implementar?',
    answer:
      'Cada sistema que entregamos incluye Plan A, B, C y D. Si el componente principal falla, hay alternativas activas autom\u00e1ticas. Tu negocio nunca se queda bloqueado. Adem\u00e1s, monitorizamos todo con alertas en tiempo real.',
  },
  {
    question: '\u00bfPuedo ver un ejemplo antes de contratar?',
    answer:
      'El diagn\u00f3stico inicial es precisamente eso: nuestro primer producto donde demostramos que entendemos tu negocio. No implementamos sin diagn\u00f3stico previo \u2014 as\u00ed aseguramos que cada propuesta tiene sentido real.',
  },
  {
    question: '\u00bfCu\u00e1nto cuesta?',
    answer:
      'Depende del tama\u00f1o y complejidad de tu negocio. El diagn\u00f3stico tiene un precio fijo que te comunicamos en la primera conversaci\u00f3n. La implementaci\u00f3n se presupuesta una vez tenemos el roadmap aprobado. Sin sorpresas ni costes ocultos.',
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
            <span className="text-gradient-accent">frecuentes</span>
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
