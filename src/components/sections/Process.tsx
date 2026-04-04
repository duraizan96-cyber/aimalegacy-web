import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Lightbulb, Shield, Route, ChevronRight } from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionBadge } from '../ui/SectionBadge'
import type { ReactNode } from 'react'

interface Step {
  number: string
  icon: ReactNode
  title: string
  subtitle: string
  description: string
  details: string[]
  color: string
}

const steps: Step[] = [
  {
    number: '01',
    icon: <MapPin className="h-6 w-6" />,
    title: 'Entendemos tu negocio',
    subtitle: 'Análisis',
    description:
      'Nos sentamos contigo y analizamos cómo funciona tu negocio hoy: dónde pierdes tiempo, dónde se te escapan clientes y qué tareas te están costando dinero.',
    details: [
      'Revisamos marketing, ventas, gestión y admin',
      'Identificamos tareas que te roban horas',
      'Detectamos dónde se pierde dinero',
      'Primero entendemos, luego proponemos',
    ],
    color: '#06b6d4',
  },
  {
    number: '02',
    icon: <Lightbulb className="h-6 w-6" />,
    title: 'Detectamos oportunidades',
    subtitle: 'Mejoras',
    description:
      'Te mostramos exactamente dónde puedes reducir costes, ahorrar tiempo y ganar más clientes. Solo proponemos lo que tiene impacto real en tu facturación.',
    details: [
      'Primero simplificar, luego automatizar',
      'Cada mejora tiene un impacto medible',
      'Solo lo que tiene sentido para tu negocio',
      'Priorizamos lo que más dinero te ahorra',
    ],
    color: '#3b82f6',
  },
  {
    number: '03',
    icon: <Shield className="h-6 w-6" />,
    title: 'Protegemos tu negocio',
    subtitle: 'Seguridad',
    description:
      'Antes de implementar nada, nos aseguramos de que tus datos, tus clientes y tu negocio están protegidos. Si no es seguro, no se hace.',
    details: [
      'Tus datos de clientes protegidos',
      'Sin riesgos ni dependencias peligrosas',
      'Cumplimiento de normativa',
      'Si no es seguro, no se propone',
    ],
    color: '#06b6d4',
  },
  {
    number: '04',
    icon: <Route className="h-6 w-6" />,
    title: 'Tu plan de acción claro',
    subtitle: 'Roadmap',
    description:
      'Recibes un documento con todo: qué mejorar, en qué orden, cuánto te va a ahorrar cada paso y plazos realistas. Sin sorpresas, sin letra pequeña.',
    details: [
      'Cada paso con su ahorro estimado',
      'Plazos realistas y claros',
      'Sabes exactamente qué esperar',
      'Listo para empezar cuando tú digas',
    ],
    color: '#06b6d4',
  },
]

export function Process() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="proceso" className="relative py-24 lg:py-32 mesh-gradient-1">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <SectionBadge>Nuestro proceso</SectionBadge>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Cómo pasamos de problema{' '}
            <span className="text-gradient-accent">a resultado</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/50">
            Antes de hacer nada, entendemos tu negocio a fondo.
            Así cada mejora tiene un impacto real en tu día a día y en tu facturación.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Step selectors — left column */}
          <ScrollReveal direction="left" className="lg:col-span-5">
            <div className="flex flex-col gap-2">
              {steps.map((step, i) => (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(i)}
                  className={`group w-full text-left rounded-xl p-5 transition-all duration-300 cursor-pointer border relative overflow-hidden ${
                    activeStep === i
                      ? 'glass-strong border-accent/20 shadow-[0_0_30px_rgba(6,182,212,0.06)]'
                      : 'border-transparent hover:bg-white/[0.02] hover:border-white/[0.05]'
                  }`}
                >
                  {/* Active indicator line */}
                  {activeStep === i && (
                    <motion.div
                      layoutId="activeStep"
                      className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center gap-4 pl-2">
                    <span
                      className={`text-xs font-mono font-bold tracking-wider transition-colors ${
                        activeStep === i ? 'text-accent' : 'text-white/20'
                      }`}
                    >
                      {step.number}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-base font-semibold transition-colors ${
                            activeStep === i ? 'text-white' : 'text-white/50'
                          }`}
                        >
                          {step.title}
                        </span>
                        <span
                          className={`text-[9px] uppercase tracking-widest font-medium px-2 py-0.5 rounded-full transition-colors ${
                            activeStep === i
                              ? 'bg-accent/10 text-accent/80'
                              : 'bg-white/5 text-white/20'
                          }`}
                        >
                          {step.subtitle}
                        </span>
                      </div>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 transition-all duration-300 ${
                        activeStep === i
                          ? 'text-accent translate-x-0 opacity-100'
                          : 'text-white/10 -translate-x-2 opacity-0'
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-6 flex gap-1">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full overflow-hidden bg-white/[0.05] cursor-pointer"
                  onClick={() => setActiveStep(i)}
                >
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: i <= activeStep ? '100%' : '0%' }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Step detail — right column */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
                  className="glass-strong rounded-2xl p-8 lg:p-10 border border-accent/[0.08]"
                >
                  {/* Icon + Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="inline-flex items-center justify-center rounded-xl p-3.5"
                      style={{ backgroundColor: `${steps[activeStep].color}15`, color: steps[activeStep].color }}
                    >
                      {steps[activeStep].icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {steps[activeStep].title}
                      </h3>
                      <span className="text-xs uppercase tracking-widest text-accent/50 font-medium">
                        Fase {steps[activeStep].number}
                      </span>
                    </div>
                  </div>

                  <p className="text-white/55 leading-relaxed mb-8">
                    {steps[activeStep].description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {steps[activeStep].details.map((detail, i) => (
                      <motion.div
                        key={detail}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-3 rounded-xl bg-white/[0.025] border border-white/[0.04] p-4 hover:border-accent/10 transition-colors"
                      >
                        <div
                          className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: steps[activeStep].color }}
                        />
                        <span className="text-sm text-white/55">{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
