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
    name: 'Mar\u00eda Garc\u00eda',
    role: 'Propietaria',
    business: 'Cl\u00ednica Dental Sonrisa',
    text: 'Antes perd\u00edamos 2 horas al d\u00eda gestionando citas por tel\u00e9fono. Ahora los pacientes reservan solos y reciben recordatorios autom\u00e1ticos. Hemos reducido las faltas un 40%.',
    rating: 5,
    result: '-2h/d\u00eda en gesti\u00f3n',
  },
  {
    name: 'Carlos Ruiz',
    role: 'Chef & Fundador',
    business: 'Restaurante La Brasa',
    text: 'No ten\u00eda ni redes sociales. AIMA Legacy nos mont\u00f3 la estrategia de contenido con IA y ahora publicamos Reels cada d\u00eda sin que yo toque nada. Las reservas online han subido un 60%.',
    rating: 5,
    result: '+60% reservas online',
  },
  {
    name: 'Laura Fern\u00e1ndez',
    role: 'Directora',
    business: 'Studio Pilates Zen',
    text: 'El diagn\u00f3stico fue un antes y un despu\u00e9s. Nos ense\u00f1aron exactamente d\u00f3nde perd\u00edamos dinero y tiempo. En 3 semanas ten\u00edamos todo automatizado. Incre\u00edble el nivel de profesionalidad.',
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
            <span className="text-gradient-accent">clientes</span>
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Testimonial card */}
          <div className="glass-strong rounded-3xl p-8 lg:p-12 min-h-[320px] flex flex-col justify-center">
            <Quote className="h-8 w-8 text-accent/20 mb-6" />

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
                      className="h-4 w-4 fill-accent text-accent"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author + Result */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-black font-bold text-lg">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-white/40">
                        {t.role} — {t.business}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-accent/20 bg-accent/[0.06] px-4 py-2">
                    <span className="text-sm font-semibold text-accent">
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
              className="p-2 rounded-lg border border-white/10 text-white/40 hover:text-accent hover:border-accent/30 transition-colors cursor-pointer"
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
                      ? 'w-8 bg-accent'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-lg border border-white/10 text-white/40 hover:text-accent hover:border-accent/30 transition-colors cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
