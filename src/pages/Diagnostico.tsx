import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { GlowButton } from '../components/ui/GlowButton'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { usePageMeta } from '../hooks/usePageMeta'

const WEBHOOK_URL =
  (import.meta.env.VITE_N8N_FORM_WEBHOOK as string | undefined) ??
  'https://aprendiendo1-n8n.qtma3u.easypanel.host/webhook/diagnostico-form'

const SECTORES = [
  { value: 'clinica', label: 'Clínica / Sanidad' },
  { value: 'restaurante', label: 'Restaurante / Hostelería' },
  { value: 'inmobiliaria', label: 'Inmobiliaria' },
  { value: 'ecommerce', label: 'E-commerce / Tienda online' },
  { value: 'servicios', label: 'Servicios profesionales' },
  { value: 'otro', label: 'Otro' },
]

interface FormData {
  nombre: string
  empresa: string
  email: string
  sector: string
  reto: string
  website_url: string // honeypot
  gdpr: boolean
}

const INITIAL: FormData = {
  nombre: '',
  empresa: '',
  email: '',
  sector: '',
  reto: '',
  website_url: '',
  gdpr: false,
}

const RETRY_MAX = 3
const RETRY_DELAY_MS = 30_000

async function submitWithRetry(payload: object, attempt = 1): Promise<boolean> {
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return true
  } catch (err) {
    if (attempt >= RETRY_MAX) return false
    await new Promise((r) => setTimeout(r, RETRY_DELAY_MS))
    return submitWithRetry(payload, attempt + 1)
  }
}

export default function Diagnostico() {
  usePageMeta({
    title: 'Solicitar Diagnóstico Estratégico de IA — Aima Legacy',
    description:
      'Solicita el Diagnóstico Inicial de Aima Legacy. Mapeo BPMN, oportunidades reales, ciberseguridad y roadmap a medida. Respuesta en menos de 24h, sin compromiso.',
    canonical: 'https://aimalegacy.es/diagnostico',
    ogImage: 'https://aimalegacy.es/og-image.jpg',
  })

  const [data, setData] = useState<FormData>(INITIAL)
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((d) => ({ ...d, [key]: value }))

  const validate = (): string | null => {
    if (!data.nombre.trim()) return 'Nombre es obligatorio'
    if (!data.empresa.trim()) return 'Empresa es obligatoria'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      return 'Email no válido'
    if (!data.sector) return 'Selecciona un sector'
    if (data.reto.trim().length < 10) return 'Cuéntanos un poco más (mín. 10 caracteres)'
    if (!data.gdpr) return 'Debes aceptar la política de privacidad'
    return null
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const err = validate()
    if (err) {
      setErrorMsg(err)
      setStatus('error')
      return
    }

    // Honeypot check — if filled, silently fake success (drop spam bot)
    if (data.website_url) {
      setStatus('success')
      return
    }

    setStatus('submitting')
    setErrorMsg('')

    const payload = {
      nombre: data.nombre.trim(),
      empresa: data.empresa.trim(),
      email: data.email.trim().toLowerCase(),
      sector: data.sector,
      reto: data.reto.trim(),
      timestamp: new Date().toISOString(),
      fuente: 'web_form',
      page: '/diagnostico',
    }

    const ok = await submitWithRetry(payload)
    if (ok) {
      setStatus('success')
      // Plan B fallback storage: also save locally so user data not lost on edge cases
      try {
        localStorage.setItem(
          'aima_last_form_submission',
          JSON.stringify({ ...payload, sent: true })
        )
      } catch {}
    } else {
      // Plan C: build mailto fallback so the user still has a way to contact
      const mailtoBody = encodeURIComponent(
        `Hola Izan,\n\nNombre: ${payload.nombre}\nEmpresa: ${payload.empresa}\nSector: ${payload.sector}\nReto: ${payload.reto}\n\n(Enviado desde formulario web tras fallo del webhook)`
      )
      const mailtoUrl = `mailto:izan@aimalegacy.es?subject=Diagn%C3%B3stico%20Aima%20Legacy&body=${mailtoBody}`
      try {
        localStorage.setItem(
          'aima_last_form_submission',
          JSON.stringify({ ...payload, sent: false })
        )
      } catch {}
      setErrorMsg(mailtoUrl)
      setStatus('error')
    }
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="noise-overlay" />
      <Navbar />

      <main>
        <section className="relative pt-40 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
          {/* Ambient gold light */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[800px] opacity-70"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(232,213,168,0.13) 0%, rgba(201,168,106,0.05) 35%, transparent 70%)',
                filter: 'blur(80px)',
              }}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-10">
            <ScrollReveal>
              {/* Eyebrow */}
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#C9A86A] mb-8 text-center">
                Diagnóstico estratégico
              </p>

              <h1
                className="text-center text-[40px] sm:text-[54px] md:text-[64px] leading-[1.04] mb-8"
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  color: '#F5EFE0',
                }}
              >
                Cuéntanos tu{' '}
                <span
                  style={{
                    fontStyle: 'italic',
                    fontWeight: 400,
                    background:
                      'linear-gradient(180deg, #F0E3C0 0%, #E8D5A8 40%, #C9A86A 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  reto
                </span>
                .
              </h1>

              <p className="text-center max-w-xl mx-auto text-[16px] leading-[1.65] text-[#C7BFB1] mb-14">
                Tres minutos. Sin compromiso. Te respondemos en menos de 24h con
                un análisis inicial y, si encaja, te proponemos un diagnóstico
                completo.
              </p>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl p-12 text-center"
                    style={{
                      background: 'rgba(245, 239, 224, 0.03)',
                      border: '1px solid rgba(201, 168, 106, 0.30)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <div
                      className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(201,168,106,0.20) 0%, rgba(201,168,106,0.06) 100%)',
                        border: '1px solid rgba(201,168,106,0.40)',
                      }}
                    >
                      <Check
                        className="h-6 w-6 text-[#E8D5A8]"
                        strokeWidth={2}
                      />
                    </div>
                    <h2
                      className="text-[28px] mb-4"
                      style={{
                        fontFamily: 'var(--font-editorial)',
                        fontWeight: 300,
                        color: '#F5EFE0',
                      }}
                    >
                      Recibido.
                    </h2>
                    <p className="text-[15px] text-[#C7BFB1] leading-[1.65] max-w-md mx-auto">
                      Te respondo personalmente en menos de 24h al email{' '}
                      <span className="text-[#E8D5A8]">{data.email}</span>.
                      Mientras tanto, mira el blog o vuelve al inicio.
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                      <Link
                        to="/"
                        className="text-[13px] uppercase tracking-[0.18em] text-[#C9A86A] hover:text-[#E8D5A8] transition-colors"
                      >
                        ← Volver
                      </Link>
                      <Link
                        to="/blog"
                        className="text-[13px] uppercase tracking-[0.18em] text-[#C9A86A] hover:text-[#E8D5A8] transition-colors"
                      >
                        Leer el blog →
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6 rounded-2xl p-8 lg:p-12"
                    style={{
                      background: 'rgba(245, 239, 224, 0.025)',
                      border: '1px solid rgba(201, 168, 106, 0.22)',
                      backdropFilter: 'blur(8px)',
                    }}
                    noValidate
                  >
                    <Field
                      label="Tu nombre"
                      id="nombre"
                      value={data.nombre}
                      onChange={(v) => update('nombre', v)}
                      autoComplete="name"
                      required
                    />
                    <Field
                      label="Empresa"
                      id="empresa"
                      value={data.empresa}
                      onChange={(v) => update('empresa', v)}
                      autoComplete="organization"
                      required
                    />
                    <Field
                      label="Email profesional"
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(v) => update('email', v)}
                      autoComplete="email"
                      required
                    />

                    <div>
                      <label
                        htmlFor="sector"
                        className="mb-2 block text-[12px] uppercase tracking-[0.18em] text-[#C9A86A]"
                      >
                        Sector
                      </label>
                      <select
                        id="sector"
                        value={data.sector}
                        onChange={(e) => update('sector', e.target.value)}
                        required
                        className="w-full rounded-lg bg-[rgba(8,7,11,0.6)] px-4 py-3 text-[15px] text-[#F5EFE0] outline-none transition-colors duration-200 focus:border-[#C9A86A]"
                        style={{
                          border: '1px solid rgba(201, 168, 106, 0.20)',
                        }}
                      >
                        <option value="">— Elige uno —</option>
                        {SECTORES.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="reto"
                        className="mb-2 block text-[12px] uppercase tracking-[0.18em] text-[#C9A86A]"
                      >
                        Tu reto principal
                        <span className="ml-2 text-[10px] text-[#7F7869] normal-case tracking-normal">
                          (máx. 300 caracteres)
                        </span>
                      </label>
                      <textarea
                        id="reto"
                        value={data.reto}
                        onChange={(e) =>
                          update('reto', e.target.value.slice(0, 300))
                        }
                        maxLength={300}
                        rows={4}
                        required
                        placeholder="Ej: Pierdo 3h al día gestionando reservas por WhatsApp y se nos escapan citas..."
                        className="w-full resize-none rounded-lg bg-[rgba(8,7,11,0.6)] px-4 py-3 text-[15px] text-[#F5EFE0] outline-none transition-colors duration-200 focus:border-[#C9A86A] placeholder:text-[#5C5447]"
                        style={{
                          border: '1px solid rgba(201, 168, 106, 0.20)',
                        }}
                      />
                      <p className="mt-1 text-right text-[11px] text-[#7F7869]">
                        {data.reto.length}/300
                      </p>
                    </div>

                    {/* Honeypot — hidden from users, visible to bots */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        left: '-9999px',
                        width: '1px',
                        height: '1px',
                        overflow: 'hidden',
                      }}
                    >
                      <label htmlFor="website_url">Website (no rellenar)</label>
                      <input
                        type="text"
                        id="website_url"
                        name="website_url"
                        tabIndex={-1}
                        autoComplete="off"
                        value={data.website_url}
                        onChange={(e) =>
                          update('website_url', e.target.value)
                        }
                      />
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer text-[13px] text-[#C7BFB1]">
                      <input
                        type="checkbox"
                        checked={data.gdpr}
                        onChange={(e) => update('gdpr', e.target.checked)}
                        required
                        className="mt-1 h-4 w-4 cursor-pointer accent-[#C9A86A]"
                      />
                      <span>
                        Acepto el tratamiento de mis datos para responder a esta
                        solicitud, conforme a la{' '}
                        <a
                          href="/privacidad.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#C9A86A] hover:text-[#E8D5A8] underline-offset-2 hover:underline"
                        >
                          política de privacidad
                        </a>
                        .
                      </span>
                    </label>

                    {status === 'error' && errorMsg && (
                      <div
                        className="flex items-start gap-3 rounded-lg p-4 text-[13px] text-[#F5EFE0]"
                        style={{
                          background: 'rgba(220, 80, 80, 0.06)',
                          border: '1px solid rgba(220, 80, 80, 0.30)',
                        }}
                      >
                        <AlertCircle
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#F0A0A0]"
                          strokeWidth={2}
                        />
                        <div>
                          {errorMsg.startsWith('mailto:') ? (
                            <>
                              No pudimos enviar tu solicitud. Por favor,{' '}
                              <a
                                href={errorMsg}
                                className="text-[#E8D5A8] underline underline-offset-2"
                              >
                                envíanos un email directo aquí
                              </a>
                              .
                            </>
                          ) : (
                            errorMsg
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-center pt-2">
                      <GlowButton
                        variant="primary"
                        onClick={() => {
                          /* form submit handled via onSubmit */
                        }}
                      >
                        {status === 'submitting' ? (
                          <>Enviando…</>
                        ) : (
                          <>
                            Enviar solicitud
                            <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                          </>
                        )}
                      </GlowButton>
                    </div>

                    <p className="pt-2 text-center text-[11px] uppercase tracking-[0.18em] text-[#7F7869]">
                      Sin compromiso · Respuesta en 24h · Plazas limitadas
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

interface FieldProps {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
  autoComplete?: string
}

function Field({
  label,
  id,
  value,
  onChange,
  type = 'text',
  required,
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[12px] uppercase tracking-[0.18em] text-[#C9A86A]"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-lg bg-[rgba(8,7,11,0.6)] px-4 py-3 text-[15px] text-[#F5EFE0] outline-none transition-colors duration-200 focus:border-[#C9A86A] placeholder:text-[#5C5447]"
        style={{ border: '1px solid rgba(201, 168, 106, 0.20)' }}
      />
    </div>
  )
}
