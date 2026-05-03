import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, AlertCircle } from 'lucide-react'
import { GlowButton } from '../ui/GlowButton'
import { ScrollReveal } from '../ui/ScrollReveal'

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
  website_url: string
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

async function submitWithRetry(payload: object, attempt = 1): Promise<boolean> {
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return true
  } catch {
    if (attempt >= 3) return false
    await new Promise((r) => setTimeout(r, 30_000))
    return submitWithRetry(payload, attempt + 1)
  }
}

function Field({
  label,
  id,
  value,
  onChange,
  type = 'text',
  required,
  autoComplete,
}: {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
  autoComplete?: string
}) {
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

export function CTA() {
  const [data, setData] = useState<FormData>(INITIAL)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((d) => ({ ...d, [key]: value }))

  const validate = (): string | null => {
    if (!data.nombre.trim()) return 'Nombre es obligatorio'
    if (!data.empresa.trim()) return 'Empresa es obligatoria'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'Email no válido'
    if (!data.sector) return 'Selecciona un sector'
    if (data.reto.trim().length < 10) return 'Cuéntanos un poco más (mín. 10 caracteres)'
    if (!data.gdpr) return 'Debes aceptar la política de privacidad'
    return null
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const err = validate()
    if (err) { setErrorMsg(err); setStatus('error'); return }
    if (data.website_url) { setStatus('success'); return }

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
      page: '/#contacto',
    }

    const ok = await submitWithRetry(payload)
    if (ok) {
      setStatus('success')
      try { localStorage.setItem('aima_last_form_submission', JSON.stringify({ ...payload, sent: true })) } catch {}
    } else {
      const mailtoBody = encodeURIComponent(
        `Hola Izan,\n\nNombre: ${payload.nombre}\nEmpresa: ${payload.empresa}\nSector: ${payload.sector}\nReto: ${payload.reto}\n\n(Enviado desde formulario web tras fallo del webhook)`
      )
      setErrorMsg(`mailto:izan@aimalegacy.es?subject=Diagn%C3%B3stico%20Aima%20Legacy&body=${mailtoBody}`)
      setStatus('error')
      try { localStorage.setItem('aima_last_form_submission', JSON.stringify({ ...payload, sent: false })) } catch {}
    }
  }

  return (
    <section
      id="contacto"
      className="relative py-32 lg:py-44 overflow-hidden"
    >
      {/* Ambient light */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] opacity-80"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(232,213,168,0.14) 0%, rgba(201,168,106,0.06) 35%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute top-[15%] left-1/2 -translate-x-1/2 w-px h-16"
          style={{ background: 'linear-gradient(to bottom, transparent, #C9A86A, transparent)' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-10">
        <ScrollReveal>
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#C9A86A] mb-10 text-center"
          >
            El diagnóstico
          </motion.p>

          {/* Editorial headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
            className="text-[40px] sm:text-[58px] md:text-[76px] leading-[1.02] text-center"
            style={{
              fontFamily: 'var(--font-editorial)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              color: '#F5EFE0',
            }}
          >
            Empieza por{' '}
            <span
              style={{
                fontStyle: 'italic',
                fontWeight: 400,
                background: 'linear-gradient(180deg, #F0E3C0 0%, #E8D5A8 40%, #C9A86A 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              entender
            </span>
            .<br />
            Luego,{' '}
            <span
              style={{
                fontStyle: 'italic',
                fontWeight: 400,
                background: 'linear-gradient(180deg, #F0E3C0 0%, #E8D5A8 40%, #C9A86A 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              automatizar
            </span>
            .
          </motion.h2>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-10 max-w-xl mx-auto text-[17px] leading-[1.65] text-[#C7BFB1] text-center"
          >
            Tres minutos. Sin compromiso. Te respondemos en menos de 24h con un
            análisis inicial y, si encaja, te proponemos un diagnóstico completo.
          </motion.p>

          {/* Form area */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-14"
          >
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
                      background: 'linear-gradient(180deg, rgba(201,168,106,0.20) 0%, rgba(201,168,106,0.06) 100%)',
                      border: '1px solid rgba(201,168,106,0.40)',
                    }}
                  >
                    <Check className="h-6 w-6 text-[#E8D5A8]" strokeWidth={2} />
                  </div>
                  <h3
                    className="text-[28px] mb-4"
                    style={{ fontFamily: 'var(--font-editorial)', fontWeight: 300, color: '#F5EFE0' }}
                  >
                    Recibido.
                  </h3>
                  <p className="text-[15px] text-[#C7BFB1] leading-[1.65] max-w-md mx-auto">
                    Te respondo personalmente en menos de 24h al email{' '}
                    <span className="text-[#E8D5A8]">{data.email}</span>.
                  </p>
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
                  <Field label="Tu nombre" id="cta-nombre" value={data.nombre} onChange={(v) => update('nombre', v)} autoComplete="name" required />
                  <Field label="Empresa" id="cta-empresa" value={data.empresa} onChange={(v) => update('empresa', v)} autoComplete="organization" required />
                  <Field label="Email profesional" id="cta-email" type="email" value={data.email} onChange={(v) => update('email', v)} autoComplete="email" required />

                  <div>
                    <label htmlFor="cta-sector" className="mb-2 block text-[12px] uppercase tracking-[0.18em] text-[#C9A86A]">
                      Sector
                    </label>
                    <select
                      id="cta-sector"
                      value={data.sector}
                      onChange={(e) => update('sector', e.target.value)}
                      required
                      className="w-full rounded-lg bg-[rgba(8,7,11,0.6)] px-4 py-3 text-[15px] text-[#F5EFE0] outline-none transition-colors duration-200 focus:border-[#C9A86A]"
                      style={{ border: '1px solid rgba(201, 168, 106, 0.20)' }}
                    >
                      <option value="">— Elige uno —</option>
                      {SECTORES.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="cta-reto" className="mb-2 block text-[12px] uppercase tracking-[0.18em] text-[#C9A86A]">
                      Tu reto principal
                      <span className="ml-2 text-[10px] text-[#7F7869] normal-case tracking-normal">(máx. 300 caracteres)</span>
                    </label>
                    <textarea
                      id="cta-reto"
                      value={data.reto}
                      onChange={(e) => update('reto', e.target.value.slice(0, 300))}
                      maxLength={300}
                      rows={4}
                      required
                      placeholder="Ej: Pierdo 3h al día gestionando reservas por WhatsApp y se nos escapan citas..."
                      className="w-full resize-none rounded-lg bg-[rgba(8,7,11,0.6)] px-4 py-3 text-[15px] text-[#F5EFE0] outline-none transition-colors duration-200 focus:border-[#C9A86A] placeholder:text-[#5C5447]"
                      style={{ border: '1px solid rgba(201, 168, 106, 0.20)' }}
                    />
                    <p className="mt-1 text-right text-[11px] text-[#7F7869]">{data.reto.length}/300</p>
                  </div>

                  {/* Honeypot */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                    <label htmlFor="cta-website">Website (no rellenar)</label>
                    <input type="text" id="cta-website" name="website_url" tabIndex={-1} autoComplete="off" value={data.website_url} onChange={(e) => update('website_url', e.target.value)} />
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
                      Acepto el tratamiento de mis datos para responder a esta solicitud, conforme a la{' '}
                      <a href="/privacy" className="text-[#C9A86A] hover:text-[#E8D5A8] underline-offset-2 hover:underline">
                        política de privacidad
                      </a>
                      .
                    </span>
                  </label>

                  {status === 'error' && errorMsg && (
                    <div
                      className="flex items-start gap-3 rounded-lg p-4 text-[13px] text-[#F5EFE0]"
                      style={{ background: 'rgba(220, 80, 80, 0.06)', border: '1px solid rgba(220, 80, 80, 0.30)' }}
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#F0A0A0]" strokeWidth={2} />
                      <div>
                        {errorMsg.startsWith('mailto:') ? (
                          <>
                            No pudimos enviar tu solicitud. Por favor,{' '}
                            <a href={errorMsg} className="text-[#E8D5A8] underline underline-offset-2">envíanos un email directo aquí</a>.
                          </>
                        ) : (
                          errorMsg
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center pt-2">
                    <GlowButton variant="primary" onClick={() => {}}>
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
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
