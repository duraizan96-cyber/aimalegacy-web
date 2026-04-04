import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionBadge } from '../ui/SectionBadge'

interface Testimonial {
  name: string
  role: string
  business: string
  text: string
  rating: number
  result: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Maria Garcia',
    role: 'Propietaria',
    business: 'Clinica Dental Sonrisa',
    text: 'Antes perdiamos 2 horas al dia gestionando citas por telefono. Ahora los pacientes reservan solos y reciben recordatorios automaticos. Hemos reducido las faltas un 40%.',
    rating: 5,
    result: '-2h/dia en gestion',
  },
  {
    name: 'Carlos Ruiz',
    role: 'Chef & Fundador',
    business: 'Restaurante La Brasa',
    text: 'No tenia ni redes sociales. AIMA Legacy nos monto la estrategia de contenido con IA y ahora publicamos Reels cada dia sin que yo toque nada. Las reservas online han subido un 60%.',
    rating: 5,
    result: '+60% reservas online',
  },
  {
    name: 'Laura Fernandez',
    role: 'Directora',
    business: 'Studio Pilates Zen',
    text: 'El diagnostico fue un antes y un despues. Nos ensenaron exactamente donde perdiamos dinero y tiempo. En 3 semanas teniamos todo automatizado. Increible el nivel de profesionalidad.',
    rating: 5,
    result: '3 semanas hasta ROI',
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((p) => (p + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)
  }

  const next = () => {
    setDirection(1)
    setCurrent((p) => (p + 1) % testimonials.length)
  }

  const t = testimonials[current]

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  }

  return (
    <section className="relative py-24 lg:py-32 mesh-gradient-2">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <SectionBadge>Resultados reales</SectionBadge>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
            Lo que dicen nuestros{' '}
            <span className="text-gradient-gold">clientes</span>
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Testimonial card */}
          <div className="glass-strong rounded-3xl p-8 lg:p-12 min-h-[320px] flex flex-col justify-center">
            <Quote className="h-8 w-8 text-gold/20 mb-6" />

            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-gold text-gold"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
                  "{t.text}"
                </p>

                {/* Author + Result */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-black font-bold text-lg">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-white/40">
                        {t.role} — {t.business}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-gold/20 bg-gold/[0.06] px-4 py-2">
                    <span className="text-sm font-semibold text-gold">
                      {t.result}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-lg border border-white/10 text-white/40 hover:text-gold hover:border-gold/30 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === current
                      ? 'w-8 bg-gold'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-lg border border-white/10 text-white/40 hover:text-gold hover:border-gold/30 transition-colors cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
