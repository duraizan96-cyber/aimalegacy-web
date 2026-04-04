import { ScrollReveal } from '../ui/ScrollReveal'

const footerLinks = [
  {
    title: 'Servicios',
    links: [
      { label: 'Diagnóstico IA', href: '#servicios' },
      { label: 'Automatización', href: '#servicios' },
      { label: 'Contenido con IA', href: '#servicios' },
      { label: 'Publicidad Digital', href: '#servicios' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Proceso', href: '#proceso' },
      { label: 'Preguntas frecuentes', href: '#faq' },
      { label: 'Contacto', href: '#contacto' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacidad', href: '#' },
      { label: 'Términos', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] bg-black-soft">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand — wider column */}
          <ScrollReveal className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-light shadow-[0_0_16px_rgba(6,182,212,0.2)]">
                <span className="text-base font-extrabold text-black">A</span>
              </div>
              <div>
                <span className="text-sm font-bold tracking-[0.2em] text-white uppercase">
                  AIMA Legacy
                </span>
              </div>
            </div>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs mb-5">
              Automatizamos tu negocio local con inteligencia artificial.
              Menos tareas manuales, más tiempo para lo que importa.
            </p>
            <a
              href="mailto:hola@aimalegacy.es"
              className="inline-flex items-center gap-2 text-sm text-accent/70 hover:text-accent transition-colors group"
            >
              <span>hola@aimalegacy.es</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </a>
          </ScrollReveal>

          {/* Link columns */}
          {footerLinks.map((col, i) => (
            <ScrollReveal key={col.title} delay={0.1 * (i + 1)}>
              <h4 className="text-xs font-semibold text-white/60 tracking-[0.15em] uppercase mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/30 hover:text-accent/80 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} AIMA Legacy. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5">
            {/* Instagram */}
            <a
              href="https://instagram.com/aimalegacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-accent transition-colors duration-200"
              aria-label="Instagram"
            >
              <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/company/aimalegacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-accent transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
