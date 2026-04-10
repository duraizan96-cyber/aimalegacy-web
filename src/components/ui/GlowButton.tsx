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
    'relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 cursor-pointer overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black'

  const variants = {
    primary:
      'bg-gradient-to-r from-accent via-accent-light to-accent text-black shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_50px_rgba(212,175,55,0.5)] active:shadow-[0_2px_20px_rgba(212,175,55,0.6)]',
    secondary:
      'border border-white/[0.12] text-white/70 hover:text-accent hover:border-accent/30 hover:bg-accent/[0.04] hover:shadow-[0_0_30px_rgba(212,175,55,0.08)]',
  }

  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      onClick={onClick}
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
