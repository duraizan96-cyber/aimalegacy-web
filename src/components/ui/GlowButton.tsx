import { motion } from 'framer-motion'
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
  const baseClasses =
    'relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 cursor-pointer overflow-hidden group'

  const variants = {
    primary:
      'bg-gradient-to-r from-gold to-gold-light text-black hover:shadow-[0_0_40px_rgba(201,168,76,0.35)] active:shadow-[0_0_20px_rgba(201,168,76,0.5)]',
    secondary:
      'border border-white/[0.12] text-white/70 hover:text-gold hover:border-gold/30 hover:bg-gold/[0.04] hover:shadow-[0_0_30px_rgba(201,168,76,0.08)]',
  }

  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {/* Shine sweep effect on primary */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Component>
  )
}
