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
    title: 'Mapeo de Procesos',
    subtitle: 'BPMN',
    description:
      'Analizamos cada area de tu negocio: marketing, ventas, delivery y admin. Dibujamos tus procesos reales y detectamos donde hay caos y friccion.',
    details: [
      'Analisis de las 4 areas clave',
      'Diagrama BPMN profesional',
      'Identificacion de pasos innecesarios',
      'Sin hablar de IA todavia — primero entender',
    ],
    color: '#c9a84c',
  },
  {
    number: '02',
    icon: <Lightbulb className="h-6 w-6" />,
    title: 'Mejoras y Oportunidades',
    subtitle: 'Optimizacion',
    description:
      'Primero optimizamos procesos ineficientes. Luego detectamos donde la automatizacion e IA tienen sentido real — no por moda, por resultados.',
    details: [
      'Optimizar antes de automatizar',
      'Deteccion de cuellos de botella',
      'Oportunidades reales de IA',
      'Priorizacion por impacto vs esfuerzo',
    ],
    color: '#2563eb',
  },
  {
    number: '03',
    icon: <Shield className="h-6 w-6" />,
    title: 'Ciberseguridad',
    subtitle: 'Revision',
    description:
      'Cada oportunidad se revisa desde accesos, datos, dependencias y riesgos. Si no es seguro, no se propone. Tu negocio protegido desde el dia uno.',
    details: [
      'Revision de accesos y permisos',
      'Proteccion de datos sensibles',
      'Analisis de dependencias',
      'Si no es seguro, no se implementa',
    ],
    color: '#06b6d4',
  },
  {
    number: '04',
    icon: <Route className="h-6 w-6" />,
    title: 'Roadmap a Medida',
    subtitle: 'Plan de Accion',
    description:
      'Ordenamos todas las oportunidades, priorizamos por impacto vs riesgo, y te explicamos el porque de cada fase. Un plan claro y accionable.',
    details: [
      'Oportunidades ordenadas por prioridad',
      'Fases claras con plazos realistas',
      'Explicacion del porque de cada paso',
      'Listo para implementar',
    ],
    color: '#c9a84c',
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
            Diagnostico en{' '}
            <span className="text-gradient-gold">4 fases</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/50">
            Un producto cerrado que te da claridad total. Analizamos, optimizamos,
            aseguramos y planificamos — antes de tocar nada.
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
                      ? 'glass-strong border-gold/20 shadow-[0_0_30px_rgba(201,168,76,0.06)]'
                      : 'border-transparent hover:bg-white/[0.02] hover:border-white/[0.05]'
                  }`}
                >
                  {/* Active indicator line */}
                  {activeStep === i && (
                    <motion.div
                      layoutId="activeStep"
                      className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-gold"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center gap-4 pl-2">
                    <span
                      className={`text-xs font-mono font-bold tracking-wider transition-colors ${
                        activeStep === i ? 'text-gold' : 'text-white/20'
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
                              ? 'bg-gold/10 text-gold/80'
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
                          ? 'text-gold translate-x-0 opacity-100'
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
                    className="h-full rounded-full bg-gold"
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
                  className="glass-strong rounded-2xl p-8 lg:p-10 border border-gold/[0.08]"
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
                      <span className="text-xs uppercase tracking-widest text-gold/50 font-medium">
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
                        className="flex items-start gap-3 rounded-xl bg-white/[0.025] border border-white/[0.04] p-4 hover:border-gold/10 transition-colors"
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
