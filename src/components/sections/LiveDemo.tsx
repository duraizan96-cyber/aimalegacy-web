import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Mic,
  Calendar,
  Mail,
  Bot,
  CheckCircle2,
  Zap,
  Phone,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionBadge } from '../ui/SectionBadge'

const ericCapabilities = [
  { icon: Phone, text: 'Atiende llamadas 24/7 sin descanso' },
  { icon: Calendar, text: 'Reserva citas directamente en tu calendario' },
  { icon: Mail, text: 'Envía confirmaciones por email automáticamente' },
  { icon: Clock, text: 'Gestiona tu disponibilidad en tiempo real' },
]

const automationSteps = [
  { icon: <Mic className="h-4 w-4" />, text: 'Cliente habla con Eric' },
  { icon: <Bot className="h-4 w-4" />, text: 'IA entiende la intención' },
  { icon: <Calendar className="h-4 w-4" />, text: 'Cita creada en calendario' },
  { icon: <Mail className="h-4 w-4" />, text: 'Confirmación enviada' },
  { icon: <CheckCircle2 className="h-4 w-4" />, text: 'Cliente notificado' },
]

function openEricWidget() {
  const widget = document.querySelector('elevenlabs-convai') as HTMLElement | null
  if (!widget) return
  widget.scrollIntoView({ behavior: 'smooth', block: 'center' })
  setTimeout(() => {
    const shadow = (widget as unknown as { shadowRoot?: ShadowRoot }).shadowRoot
    const innerButton = shadow?.querySelector('button') as HTMLButtonElement | null
    if (innerButton) {
      innerButton.click()
      return
    }
    widget.click?.()
  }, 600)
}

function EricShowcase() {
  return (
    <div className="relative rounded-2xl overflow-hidden h-full group">
      <div className="absolute inset-0 rounded-2xl border border-accent/[0.2]" />
      <div className="absolute inset-0 bg-black-card" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] via-transparent to-accent/[0.04]" />
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent/[0.12] rounded-full blur-[90px] group-hover:bg-accent/[0.18] transition-colors duration-700" />
      <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-accent/[0.06] rounded-full blur-[70px]" />
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="relative z-10 p-7 lg:p-9 h-full flex flex-col">
        <div className="flex items-center justify-between mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="relative h-2 w-2">
              <div className="absolute inset-0 rounded-full bg-green-400 animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-green-400 blur-[4px]" />
            </div>
            <span className="text-[10px] font-bold text-green-400/90 tracking-[0.15em] uppercase">
              En vivo
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-white/30 uppercase tracking-wider">
            <Sparkles className="h-3 w-3 text-accent/60" />
            Agente real
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-shrink-0">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)] border border-accent/30">
              <Mic className="h-7 w-7 text-black" strokeWidth={2.5} />
            </div>
            <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-400 border-[3px] border-black-card shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
          </div>
          <div className="min-w-0">
            <p className="text-2xl font-bold text-white font-[family-name:var(--font-display)] leading-tight">
              Eric
            </p>
            <p className="text-xs text-accent/70 font-medium tracking-wider uppercase mt-1">
              Agente de citas · Aima Legacy
            </p>
          </div>
        </div>

        <p className="text-sm text-white/60 leading-relaxed mb-7">
          Atiende a tus clientes por voz, reserva citas en tu calendario
          y envía confirmaciones automáticas.{' '}
          <span className="text-white/85 font-medium">
            No es una demo falsa — puedes hablarle ahora mismo.
          </span>
        </p>

        <div className="space-y-2.5 mb-8">
          {ericCapabilities.map((cap, i) => {
            const Icon = cap.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-accent/[0.08] border border-accent/[0.15] flex items-center justify-center">
                  <Icon className="h-3.5 w-3.5 text-accent" />
                </div>
                <span className="text-sm text-white/70">{cap.text}</span>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-auto space-y-3">
          <button
            onClick={openEricWidget}
            className="relative w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-accent via-accent-light to-accent text-black font-bold text-sm tracking-wide shadow-[0_0_40px_rgba(212,175,55,0.35)] hover:shadow-[0_0_60px_rgba(212,175,55,0.55)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group/btn overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <Mic className="h-4 w-4 relative z-10" strokeWidth={2.5} />
            <span className="relative z-10">Hablar con Eric ahora</span>
            <ArrowRight className="h-4 w-4 relative z-10 transition-transform group-hover/btn:translate-x-1" />
          </button>
          <p className="text-[11px] text-center text-white/35 leading-relaxed">
            Sin registro · Conversación real con IA
          </p>
        </div>
      </div>
    </div>
  )
}

function WorkflowDemo() {
  const [activeStep, setActiveStep] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-100px' })

  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % (automationSteps.length + 1))
    }, 1400)
    return () => clearInterval(interval)
  }, [inView])

  return (
    <div
      ref={ref}
      className="relative rounded-2xl bg-black-card border border-white/[0.08] overflow-hidden h-full"
    >
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06] bg-white/[0.015]">
        <Zap className="h-4 w-4 text-accent" />
        <span className="text-xs font-semibold text-white/70">
          Lo que pasa por detrás
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
          <span className="text-[10px] text-green-400/70 font-medium">
            Corriendo
          </span>
        </div>
      </div>

      <div className="p-6 space-y-3 min-h-[400px]">
        {automationSteps.map((step, i) => {
          const isActive = i === activeStep
          const isDone = i < activeStep
          const isPending = i > activeStep

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {i < automationSteps.length - 1 && (
                <div className="absolute left-[17px] top-9 w-px h-8 overflow-hidden">
                  <motion.div
                    animate={{
                      scaleY: isDone ? 1 : isActive ? [0, 1] : 0,
                      opacity: isDone || isActive ? 1 : 0.2,
                    }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full w-full bg-gradient-to-b from-accent to-accent/20 origin-top"
                  />
                </div>
              )}

              <div
                className={`flex items-center gap-3 rounded-xl p-3 transition-all duration-300 ${
                  isActive
                    ? 'bg-accent/10 border border-accent/25 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                    : isDone
                      ? 'bg-white/[0.02] border border-white/[0.06]'
                      : 'bg-white/[0.01] border border-white/[0.04] opacity-40'
                }`}
              >
                <div
                  className={`flex-shrink-0 h-9 w-9 rounded-lg flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-accent text-black shadow-[0_0_15px_rgba(212,175,55,0.5)]'
                      : isDone
                        ? 'bg-green-500/15 text-green-400'
                        : 'bg-white/5 text-white/20'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="h-4 w-4" /> : step.icon}
                </div>
                <span
                  className={`text-sm font-medium ${
                    isActive
                      ? 'text-white'
                      : isDone
                        ? 'text-white/60'
                        : 'text-white/30'
                  }`}
                >
                  {step.text}
                </span>
                {isActive && (
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="ml-auto text-[10px] font-semibold text-accent uppercase tracking-wider"
                  >
                    Procesando
                  </motion.div>
                )}
                {isDone && (
                  <span className="ml-auto text-[10px] font-semibold text-green-400/70 uppercase tracking-wider">
                    OK
                  </span>
                )}
                {isPending && (
                  <span className="ml-auto text-[10px] font-semibold text-white/20 uppercase tracking-wider">
                    En espera
                  </span>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export function LiveDemo() {
  return (
    <section id="demo" className="relative py-24 lg:py-32 mesh-gradient-5">
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
      <div className="absolute top-20 left-10 w-48 h-48 bg-accent/[0.04] rounded-full blur-[80px] float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/[0.03] rounded-full blur-[70px] float-delayed" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <SectionBadge icon={<Sparkles className="h-3.5 w-3.5" />}>
            Prueba en vivo
          </SectionBadge>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Habla con Eric,{' '}
            <span className="text-gradient-accent">nuestro agente de voz IA</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/50">
            Un agente de voz con IA real que reserva citas en tiempo real. No es una animación ni maqueta — puedes hablarle ahora mismo. Así son las automatizaciones que construimos en Aima Legacy para negocios locales en España.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScrollReveal direction="left" delay={0.1}>
            <EricShowcase />
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2}>
            <WorkflowDemo />
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <p className="mt-10 text-center text-sm text-white/40">
            <span className="text-accent/70 font-medium">Eric es un ejemplo real construido por Izan Dura y el equipo de Aima Legacy.</span>{' '}
            Cada automatización con IA que construimos se adapta a tu negocio local y a tus procesos reales.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
