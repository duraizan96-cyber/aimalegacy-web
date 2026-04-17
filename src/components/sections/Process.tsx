import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Lightbulb, Shield, Route, ChevronRight, ArrowRight } from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionBadge } from '../ui/SectionBadge'
import { useGsapScrollReveal } from '../../hooks/useGsapScrollReveal'
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
    title: 'Mapeamos tus procesos con BPMN',
    subtitle: 'BPMN',
    description:
      'Mapeamos todos tus procesos con diagramas BPMN profesionales: marketing, ventas, delivery y admin. Detectamos el caos real antes de hablar de automatización o IA.',
    details: [
      'Diagramas BPMN profesionales',
      'Revisamos marketing, ventas y admin',
      'Identificamos cuellos de botella reales',
      'Primero entendemos, luego proponemos',
    ],
    color: '#D4AF37',
  },
  {
    number: '02',
    icon: <Lightbulb className="h-6 w-6" />,
    title: 'Detectamos mejoras y oportunidades IA',
    subtitle: 'Mejoras',
    description:
      'Primero optimizamos procesos, luego proponemos automatización con IA donde tenga sentido real. Si automatizas un proceso ineficiente, la IA devuelve super-ineficiencia.',
    details: [
      'Primero simplificar, luego automatizar',
      'Cada mejora tiene un impacto medible',
      'Solo IA donde realmente aporta valor',
      'Priorizamos lo que más dinero te ahorra',
    ],
    color: '#D4AF37',
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
    color: '#D4AF37',
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
    color: '#D4AF37',
  },
]

export function Process() {
  const [activeStep, setActiveStep] = useState(0)
  const h2Ref = useGsapScrollReveal<HTMLHeadingElement>({ type: 'slide', delay: 0.1 })

  return (
    <section id="proceso" className="relative py-24 lg:py-32 mesh-gradient-1">
      {/* Decorative grid */}
      <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />

      {/* Floating elements */}
      <div className="absolute top-32 right-20 w-40 h-40 bg-accent/[0.04] rounded-full blur-[80px] float" />
      <div className="absolute bottom-32 left-10 w-32 h-32 bg-blue/[0.03] rounded-full blur-[60px] float-delayed" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <SectionBadge>Proceso del diagnóstico IA en 4 fases</SectionBadge>
          <h2 ref={h2Ref} className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Nuestro diagnóstico IA en{' '}
            <span className="text-gradient-accent">4 fases</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/50">
            Antes de automatizar, <span className="text-white/75 font-semibold">Izan Dura</span> y el equipo de Aima Legacy mapean tu operación con BPMN profesional. Así cada propuesta de inteligencia artificial tiene impacto real en tu P&amp;L.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Step selectors — left column */}
          <ScrollReveal direction="left" className="lg:col-span-5">
            <div className="flex flex-col gap-2">
              {steps.map((step, i) => (
                <motion.button
                  key={step.number}
                  onClick={() => setActiveStep(i)}
                  whileHover={{ x: activeStep === i ? 0 : 4 }}
                  className={`group w-full text-left rounded-xl p-5 transition-all duration-300 cursor-pointer border relative overflow-hidden ${
                    activeStep === i
                      ? 'glass-strong border-accent/20 shadow-[0_0_30px_rgba(212,175,55,0.06)]'
                      : 'border-transparent hover:bg-white/[0.02] hover:border-white/[0.05]'
                  }`}
                >
                  {/* Active indicator line */}
                  {activeStep === i && (
                    <motion.div
                      layoutId="activeStep"
                      className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
                      style={{ backgroundColor: step.color }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Shine effect on active */}
                  {activeStep === i && (
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/[0.03] via-transparent to-transparent" />
                  )}

                  <div className="flex items-center gap-4 pl-2 relative z-10">
                    {/* Step number with glow */}
                    <div className="relative">
                      <span
                        className={`text-xs font-mono font-bold tracking-wider transition-all duration-300 ${
                          activeStep === i ? 'text-accent drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]' : 'text-white/20'
                        }`}
                      >
                        {step.number}
                      </span>
                    </div>
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
                          className={`text-[9px] uppercase tracking-widest font-medium px-2 py-0.5 rounded-full transition-all ${
                            activeStep === i
                              ? 'bg-accent/10 text-accent/80 shadow-[0_0_12px_rgba(212,175,55,0.1)]'
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
                </motion.button>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-6 flex gap-1.5">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="h-1.5 flex-1 rounded-full overflow-hidden bg-white/[0.05] cursor-pointer"
                  onClick={() => setActiveStep(i)}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: step.color }}
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
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                  className="relative rounded-2xl overflow-hidden"
                >
                  {/* Border beam on active card */}
                  <div className="absolute inset-0 rounded-2xl border-beam" />

                  <div className="relative glass-strong rounded-2xl p-8 lg:p-10 border border-accent/[0.08]">
                    {/* Floating orb inside */}
                    <div className="absolute top-6 right-6 w-32 h-32 bg-accent/[0.04] rounded-full blur-[50px] float" />

                    {/* Icon + Title */}
                    <div className="flex items-center gap-4 mb-6 relative z-10">
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', bounce: 0.4, delay: 0.1 }}
                        className="inline-flex items-center justify-center rounded-xl p-3.5"
                        style={{ backgroundColor: `${steps[activeStep].color}15`, color: steps[activeStep].color }}
                      >
                        {steps[activeStep].icon}
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {steps[activeStep].title}
                        </h3>
                        <span className="text-xs uppercase tracking-widest text-accent/50 font-medium">
                          Fase {steps[activeStep].number}
                        </span>
                      </div>
                    </div>

                    <p className="text-white/55 leading-relaxed mb-8 relative z-10">
                      {steps[activeStep].description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
                      {steps[activeStep].details.map((detail, i) => (
                        <motion.div
                          key={detail}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 + 0.15 }}
                          className="group/detail flex items-start gap-3 rounded-xl bg-white/[0.025] border border-white/[0.04] p-4 hover:border-accent/15 hover:bg-accent/[0.02] transition-all duration-300"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.08 + 0.2, type: 'spring', bounce: 0.5 }}
                            className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: steps[activeStep].color }}
                          />
                          <span className="text-sm text-white/55 group-hover/detail:text-white/70 transition-colors">
                            {detail}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Bottom CTA hint */}
                    {activeStep === steps.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 flex items-center gap-2 text-accent/60 text-sm"
                      >
                        <ArrowRight className="h-4 w-4" />
                        <span>Solicita tu diagnóstico y empezamos</span>
                      </motion.div>
                    )}
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
