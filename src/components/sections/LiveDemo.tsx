import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { MessageCircle, Calendar, Mail, Bot, CheckCircle2, Zap } from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionBadge } from '../ui/SectionBadge'

interface Message {
  from: 'user' | 'bot'
  text: string
  delay: number
}

const conversation: Message[] = [
  { from: 'user', text: 'Hola, quiero reservar una cita', delay: 0 },
  { from: 'bot', text: '¡Hola! Claro, puedo ayudarte. ¿Qué día te viene bien?', delay: 1200 },
  { from: 'user', text: 'El jueves por la tarde', delay: 2600 },
  { from: 'bot', text: 'Tengo libre el jueves a las 17:00 o 18:30. ¿Cuál prefieres?', delay: 4200 },
  { from: 'user', text: 'Las 17:00', delay: 5800 },
  { from: 'bot', text: 'Reservado. Te envío confirmación por email y te recordaré 1h antes.', delay: 7400 },
]

const automationSteps = [
  { icon: <Mail className="h-4 w-4" />, text: 'Email recibido', status: 'done' },
  { icon: <Bot className="h-4 w-4" />, text: 'IA clasifica intención', status: 'done' },
  { icon: <Calendar className="h-4 w-4" />, text: 'Cita creada en calendario', status: 'done' },
  { icon: <MessageCircle className="h-4 w-4" />, text: 'Recordatorio programado', status: 'active' },
  { icon: <CheckCircle2 className="h-4 w-4" />, text: 'Cliente confirmado', status: 'pending' },
]

function ChatDemo() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [cycleKey, setCycleKey] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-100px' })

  useEffect(() => {
    if (!inView) return

    let timeouts: ReturnType<typeof setTimeout>[] = []

    const runCycle = () => {
      // Clear previous timeouts
      timeouts.forEach(clearTimeout)
      timeouts = []

      // Reset UI
      setVisibleCount(0)
      setIsTyping(false)
      setCycleKey((k) => k + 1)

      // Schedule messages
      conversation.forEach((msg, i) => {
        if (msg.from === 'bot') {
          timeouts.push(setTimeout(() => setIsTyping(true), msg.delay - 600))
          timeouts.push(setTimeout(() => setIsTyping(false), msg.delay))
        }
        timeouts.push(setTimeout(() => setVisibleCount(i + 1), msg.delay))
      })
    }

    runCycle()
    // Total conversation takes ~8s, pause 2s, repeat
    const interval = setInterval(runCycle, 10000)

    return () => {
      clearInterval(interval)
      timeouts.forEach(clearTimeout)
    }
  }, [inView])

  return (
    <div ref={ref} className="relative rounded-2xl bg-black-card border border-white/[0.08] overflow-hidden h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06] bg-white/[0.015]">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/60" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
          <div className="h-3 w-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center border border-accent/20">
            <Bot className="h-3 w-3 text-accent" />
          </div>
          <span className="text-xs font-semibold text-white/70">IA Automática</span>
          <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
          <span className="text-[10px] text-green-400/70 font-medium">Activo</span>
        </div>
      </div>

      {/* Messages */}
      <div className="p-5 space-y-3 min-h-[340px] flex flex-col">
        <AnimatePresence mode="popLayout">
          {conversation.slice(0, visibleCount).map((msg, i) => (
            <motion.div
              key={`${cycleKey}-${i}`}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.from === 'user'
                    ? 'bg-white/[0.06] text-white/80 border border-white/[0.08]'
                    : 'bg-accent/10 text-white/90 border border-accent/20 shadow-[0_0_15px_rgba(6,182,212,0.08)]'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-start"
          >
            <div className="rounded-2xl px-4 py-3 bg-accent/10 border border-accent/20">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    className="h-1.5 w-1.5 rounded-full bg-accent/60"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
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
      setActiveStep(prev => (prev + 1) % (automationSteps.length + 1))
    }, 1400)

    return () => clearInterval(interval)
  }, [inView])

  return (
    <div ref={ref} className="relative rounded-2xl bg-black-card border border-white/[0.08] overflow-hidden h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06] bg-white/[0.015]">
        <Zap className="h-4 w-4 text-accent" />
        <span className="text-xs font-semibold text-white/70">Automatización en vivo</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
          <span className="text-[10px] text-green-400/70 font-medium">Corriendo</span>
        </div>
      </div>

      {/* Steps */}
      <div className="p-6 space-y-3 min-h-[340px]">
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
              {/* Connecting line */}
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
                    ? 'bg-accent/10 border border-accent/25 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                    : isDone
                      ? 'bg-white/[0.02] border border-white/[0.06]'
                      : 'bg-white/[0.01] border border-white/[0.04] opacity-40'
                }`}
              >
                <div
                  className={`flex-shrink-0 h-9 w-9 rounded-lg flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-accent text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                      : isDone
                        ? 'bg-green-500/15 text-green-400'
                        : 'bg-white/5 text-white/20'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="h-4 w-4" /> : step.icon}
                </div>
                <span className={`text-sm font-medium ${
                  isActive ? 'text-white' : isDone ? 'text-white/60' : 'text-white/30'
                }`}>
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
    <section className="relative py-24 lg:py-32 mesh-gradient-5">
      {/* Decorative grid lines */}
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-accent/[0.04] rounded-full blur-[80px] float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue/[0.03] rounded-full blur-[70px] float-delayed" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <SectionBadge icon={<Zap className="h-3.5 w-3.5" />}>
            Así funciona
          </SectionBadge>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Tu negocio trabajando{' '}
            <span className="text-gradient-accent">solo</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white/50">
            Mientras tú haces lo importante, la IA atiende a tus clientes
            y gestiona tus procesos en tiempo real.
          </p>
        </ScrollReveal>

        {/* Demos grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScrollReveal direction="left" delay={0.1}>
            <ChatDemo />
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2}>
            <WorkflowDemo />
          </ScrollReveal>
        </div>

        {/* Bottom note */}
        <ScrollReveal delay={0.3}>
          <p className="mt-10 text-center text-sm text-white/35">
            <span className="text-accent/60">Esto es solo un ejemplo.</span>{' '}
            Cada automatización se adapta a tu negocio y a tus procesos reales.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
