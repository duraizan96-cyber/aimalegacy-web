import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calculator, Clock, TrendingUp, Euro, Sparkles } from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionBadge } from '../ui/SectionBadge'

const HOURLY_COST = 15

function AnimatedValue({ value, suffix, prefix = '' }: { value: number; suffix: string; prefix?: string }) {
  return (
    <span className="tabular-nums">
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  )
}

export function SavingsCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(10)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const weeklySavings = hoursPerWeek * HOURLY_COST
  const monthlySavings = weeklySavings * 4.33
  const yearlySavings = monthlySavings * 12
  const yearlyHours = hoursPerWeek * 52

  const cards = [
    {
      icon: <Clock className="h-5 w-5" />,
      label: 'Horas al año',
      value: yearlyHours,
      suffix: 'h',
      prefix: '',
      color: 'from-accent-light/20 to-accent-light/5',
      iconColor: 'text-accent-light',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]',
    },
    {
      icon: <Euro className="h-5 w-5" />,
      label: 'Ahorro mensual',
      value: Math.round(monthlySavings),
      suffix: '\u20AC',
      prefix: '',
      color: 'from-accent/20 to-accent/5',
      iconColor: 'text-accent',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]',
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      label: 'Ahorro anual',
      value: Math.round(yearlySavings),
      suffix: '\u20AC',
      prefix: '',
      color: 'from-accent-light/20 to-accent-light/5',
      iconColor: 'text-accent-light',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(244,208,63,0.15)]',
    },
    {
      icon: <Calculator className="h-5 w-5" />,
      label: 'ROI estimado',
      value: Math.round((yearlySavings / 2000) * 100),
      suffix: '%',
      prefix: '',
      color: 'from-green-400/20 to-green-400/5',
      iconColor: 'text-green-400',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(74,222,128,0.12)]',
    },
  ]

  return (
    <section className="relative py-24 lg:py-32 mesh-gradient-2">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <SectionBadge icon={<Calculator className="h-3.5 w-3.5" />}>
            Calculadora de ahorro
          </SectionBadge>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            ¿Cuánto dinero{' '}
            <span className="text-gradient-accent">estás tirando</span>?
          </h2>
          <p className="mt-4 text-white/45 max-w-xl mx-auto">
            Mueve el slider y mira cuánto podrías ahorrar cada mes
            eliminando las tareas que hoy haces a mano.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div ref={ref} className="relative rounded-3xl overflow-hidden">
            {/* Border beam */}
            <div className="absolute inset-0 rounded-3xl border-beam border-beam-slow" />

            <div className="relative glass-strong rounded-3xl p-8 lg:p-12">
              {/* Floating sparkle */}
              <div className="absolute top-8 right-8 opacity-20 float">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>

              {/* Slider */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-white/60 font-medium">
                    Horas/semana en tareas manuales
                  </span>
                  <motion.span
                    key={hoursPerWeek}
                    initial={{ scale: 1.2, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-3xl font-bold text-gradient-accent-static font-[family-name:var(--font-display)] number-glow"
                  >
                    {hoursPerWeek}h
                  </motion.span>
                </div>

                <div className="relative">
                  <input
                    type="range"
                    min={2}
                    max={40}
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                    className="w-full h-2.5 rounded-full appearance-none cursor-pointer bg-white/10
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(212,175,55,0.5),0_0_40px_rgba(212,175,55,0.2)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent-light [&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:hover:shadow-[0_0_30px_rgba(212,175,55,0.7),0_0_60px_rgba(212,175,55,0.3)]
                      [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-accent-light [&::-moz-range-thumb]:cursor-pointer"
                    style={{
                      background: `linear-gradient(90deg, #D4AF37 ${((hoursPerWeek - 2) / 38) * 100}%, rgba(255,255,255,0.1) ${((hoursPerWeek - 2) / 38) * 100}%)`,
                    }}
                  />
                </div>

                <div className="flex justify-between mt-3 text-[10px] text-white/25 tracking-wider uppercase font-medium">
                  <span>2 horas</span>
                  <span className="text-accent/40">Mover para calcular</span>
                  <span>40 horas</span>
                </div>
              </div>

              {/* Results grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((card, i) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`group relative rounded-xl bg-gradient-to-br ${card.color} border border-white/[0.06] p-5 text-center transition-all duration-300 hover:border-accent/15 ${card.glowColor}`}
                  >
                    {/* Card shine */}
                    <div className="absolute inset-0 rounded-xl card-shine" />

                    <div className="relative z-10">
                      <div className={`inline-flex mb-3 ${card.iconColor} opacity-60 group-hover:opacity-100 transition-opacity`}>
                        {card.icon}
                      </div>
                      <motion.div
                        key={card.value}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="text-2xl lg:text-3xl font-bold text-white mb-1 font-[family-name:var(--font-display)]"
                      >
                        <AnimatedValue value={card.value} suffix={card.suffix} prefix={card.prefix} />
                      </motion.div>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider font-medium">
                        {card.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom note */}
              <p className="mt-8 text-center text-xs text-white/25">
                * Estimación basada en un coste medio de {HOURLY_COST}€/hora.
                Los resultados reales dependen de tu negocio.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
