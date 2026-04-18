import { ScrollReveal } from '../ui/ScrollReveal'

const footerLinks = [
  {
    title: 'Servicios',
    links: [
      { label: 'Diagnóstico', href: '#servicios' },
      { label: 'Automatización', href: '#servicios' },
      { label: 'Agentes IA', href: '#servicios' },
      { label: 'Integraciones', href: '#servicios' },
    ],
  },
  {
    title: 'Estudio',
    links: [
      { label: 'Proceso', href: '#proceso' },
      { label: 'Preguntas', href: '#faq' },
      { label: 'Contacto', href: '#contacto' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacidad', href: '/privacidad.html' },
      { label: 'Aviso legal', href: '/aviso-legal.html' },
      { label: 'Cookies', href: '/cookies.html' },
    ],
  },
]

export function Footer() {
  return (
    <footer
      className="relative"
      style={{
        borderTop: '1px solid rgba(245, 239, 224, 0.06)',
        background: '#08070B',
      }}
    >
      {/* Gold hairline accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(201,168,106,0.35) 50%, transparent 100%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Wordmark column — no narrative */}
          <ScrollReveal className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo-aima.jpg"
                alt="Aima Legacy — Estudio de sistemas de IA"
                width="32"
                height="32"
                loading="lazy"
                decoding="async"
                className="h-8 w-8 rounded-lg object-cover"
                style={{
                  boxShadow: '0 0 0 1px rgba(201,168,106,0.2)',
                }}
              />
              <span
                className="text-[13px] tracking-[0.22em] uppercase text-[#F5EFE0] font-medium"
              >
                Aima Legacy
              </span>
            </div>

            {/* Single-line editorial tagline — no repeat with CTA */}
            <p
              className="text-[14px] leading-[1.5] text-[#7F7869] mb-6"
              style={{
                fontFamily: 'var(--font-editorial)',
                fontStyle: 'italic',
                fontWeight: 400,
              }}
            >
              Estudio de sistemas de IA.
            </p>

            <a
              href="mailto:izan@aimalegacy.es"
              className="inline-flex items-center gap-2 text-[13px] text-[#C9A86A] hover:text-[#E8D5A8] transition-colors group"
            >
              <span>izan@aimalegacy.es</span>
              <span className="group-hover:translate-x-0.5 transition-transform">
                &rarr;
              </span>
            </a>
          </ScrollReveal>

          {/* Link columns */}
          {footerLinks.map((col, i) => (
            <ScrollReveal key={col.title} delay={0.08 * (i + 1)}>
              <h4 className="text-[10px] font-medium text-[#C9A86A] tracking-[0.24em] uppercase mb-6">
                {col.title}
              </h4>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-[#7F7869] hover:text-[#F0E3C0] transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom bar — minimal */}
        <div
          className="mt-20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            borderTop: '1px solid rgba(245, 239, 224, 0.04)',
          }}
        >
          <p className="text-[11px] tracking-[0.12em] uppercase text-[#4A4538]">
            &copy; {new Date().getFullYear()} Aima Legacy
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/aimalegacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4A4538] hover:text-[#E8D5A8] transition-colors duration-300"
              aria-label="Instagram"
            >
              <svg className="h-[16px] w-[16px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/izandura/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4A4538] hover:text-[#E8D5A8] transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <svg className="h-[16px] w-[16px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
