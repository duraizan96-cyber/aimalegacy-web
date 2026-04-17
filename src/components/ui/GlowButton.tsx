import { motion } from 'framer-motion'
import { useMagneticEffect } from '../../hooks/useMagneticEffect'
import type { ReactNode } from 'react'

interface GlowButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary'
  className?: string
  onClick?: () => void
}

export function GlowButton({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
}: GlowButtonProps) {
  // Magnetic effect: primary buttons pull slightly toward cursor (more noticeable)
  // Secondary buttons have subtler pull
  const magneticRef = useMagneticEffect<HTMLElement>(variant === 'primary' ? 0.35 : 0.2)

  const baseClasses =
    'relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 cursor-pointer overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black'

  const variants = {
    primary:
      'bg-[#533afd] text-white shadow-[0_4px_15px_rgba(50,50,93,0.25),0_2px_25px_rgba(83,58,253,0.2)] hover:bg-[#4434d4] hover:shadow-[0_7px_30px_rgba(50,50,93,0.35),0_3px_40px_rgba(83,58,253,0.3)] active:shadow-[0_3px_15px_rgba(50,50,93,0.35),0_2px_20px_rgba(83,58,253,0.4)]',
    secondary:
      'border border-white/[0.12] text-white/70 hover:text-accent hover:border-accent/30 hover:bg-accent/[0.04] hover:shadow-[0_0_30px_rgba(83,58,253,0.1)]',
  }

  const Component = href ? motion.a : motion.button

  // External link detection — any http(s):// that isn't aimalegacy.es
  const isExternal =
    typeof href === 'string' &&
    /^https?:\/\//i.test(href) &&
    !/^https?:\/\/([a-z0-9-]+\.)*aimalegacy\.es(\/|$)/i.test(href)

  return (
    <Component
      ref={magneticRef as React.RefObject<HTMLAnchorElement & HTMLButtonElement>}
      href={href}
      onClick={onClick}
      // Prevent reverse tabnabbing and referrer leak on external links
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {/* Glow halo behind button */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -z-10 bg-accent/30 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-xl" />
      )}
      {/* Shine sweep effect on primary */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Component>
  )
}
