import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Clock, TrendingUp, Euro } from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionBadge } from '../ui/SectionBadge'
import { AnimatedCounter } from '../ui/AnimatedCounter'

const HOURLY_COST = 15 // avg cost per hour for manual work in Spain

export function SavingsCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(10)

  const weeklySavings = hoursPerWeek * HOURLY_COST
  const monthlySavings = weeklySavings * 4.33
  const yearlySavings = monthlySavings * 12
  const yearlyHours = hoursPerWeek * 52

  return (
    <section className="relative py-24 lg:py-32 mesh-gradient-1">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <SectionBadge icon={<Calculator className="h-3.5 w-3.5" />}>
            Calculadora de ahorro
          </SectionBadge>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
            \u00bfCu\u00e1nto dinero{' '}
            <span className="text-gradient-accent">est\u00e1s tirando</span>?
          </h2>
          <p className="mt-4 text-white-dim max-w-xl mx-auto">
            Mueve el slider y mira cu\u00e1nto podr\u00edas ahorrar cada mes
            eliminando las tareas que hoy haces a mano.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="glass-strong rounded-3xl p-8 lg:p-12">
            {/* Slider */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-white/60">
                  Horas/semana en tareas manuales
                </span>
                <span className="text-2xl font-bold text-gradient-accent-static">
                  {hoursPerWeek}h
                </span>
              </div>

              <input
                type="range"
                min={2}
                max={40}
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(6,182,212,0.5)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent-light
                  [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-accent-light [&::-moz-range-thumb]:cursor-pointer"
                style={{
                  background: `linear-gradient(90deg, #06b6d4 ${((hoursPerWeek - 2) / 38) * 100}%, rgba(255,255,255,0.1) ${((hoursPerWeek - 2) / 38) * 100}%)`,
                }}
              />

              <div className="flex justify-between mt-2 text-[10px] text-white/20 tracking-wider uppercase">
                <span>2 horas</span>
                <span>40 horas</span>
              </div>
            </div>

            {/* Results grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: <Clock className="h-5 w-5" />,
                  label: 'Horas al a\u00f1o',
                  value: yearlyHours,
                  suffix: 'h',
                  color: 'text-cyan',
                },
                {
                  icon: <Euro className="h-5 w-5" />,
                  label: 'Ahorro mensual',
                  value: Math.round(monthlySavings),
                  prefix: '',
                  suffix: '\u20AC',
                  color: 'text-accent',
                },
                {
                  icon: <TrendingUp className="h-5 w-5" />,
                  label: 'Ahorro anual',
                  value: Math.round(yearlySavings),
                  prefix: '',
                  suffix: '\u20AC',
                  color: 'text-accent-light',
                },
                {
                  icon: <Calculator className="h-5 w-5" />,
                  label: 'ROI estimado',
                  value: Math.round((yearlySavings / 2000) * 100),
                  suffix: '%',
                  color: 'text-green-400',
                },
              ].map((card) => (
                <motion.div
                  key={card.label}
                  layout
                  className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-5 text-center"
                >
                  <div className={`inline-flex mb-3 ${card.color} opacity-60`}>
                    {card.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {card.prefix}
                    {card.value.toLocaleString()}
                    {card.suffix}
                  </div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider">
                    {card.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom note */}
            <p className="mt-8 text-center text-xs text-white/30">
              * Estimaci\u00f3n basada en un coste medio de {HOURLY_COST}\u20AC/hora.
              Los resultados reales dependen de tu negocio.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
