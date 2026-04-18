import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface GlowButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary'
  className?: string
  onClick?: () => void
}

/**
 * Obsidian Couture button system.
 * - primary:   ivory fill on obsidian (Tom Ford move) + gold hairline
 * - secondary: ghost with gold hairline, warm ivory text
 */
export function GlowButton({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
}: GlowButtonProps) {
  const base =
    'relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full ' +
    'font-medium text-[14px] tracking-[-0.005em] leading-none ' +
    'transition-[transform,background,border-color,box-shadow,color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ' +
    'cursor-pointer outline-none overflow-hidden group ' +
    'focus-visible:ring-2 focus-visible:ring-[#C9A86A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08070B]'

  const variantClass = {
    primary: 'text-[#08070B]',
    secondary: 'text-[#F5EFE0]/90 hover:text-[#F0E3C0]',
  }

  const variantStyle: Record<'primary' | 'secondary', React.CSSProperties> = {
    primary: {
      background: 'linear-gradient(180deg, #F8F2E2 0%, #E8E0CB 100%)',
      border: '1px solid rgba(201, 168, 106, 0.40)',
      boxShadow:
        'inset 0 1px 0 rgba(255,255,255,0.65), 0 1px 0 rgba(0,0,0,0.45), 0 8px 24px -8px rgba(201,168,106,0.28)',
    },
    secondary: {
      background: 'rgba(245, 239, 224, 0.02)',
      border: '1px solid rgba(201, 168, 106, 0.28)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      boxShadow: 'inset 0 1px 0 rgba(245, 239, 224, 0.04)',
    },
  }

  const Component = href ? motion.a : motion.button

  const isExternal =
    typeof href === 'string' &&
    /^https?:\/\//i.test(href) &&
    !/^https?:\/\/([a-z0-9-]+\.)*aimalegacy\.es(\/|$)/i.test(href)

  return (
    <Component
      href={href}
      onClick={onClick}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`${base} ${variantClass[variant]} ${className}`}
      style={variantStyle[variant]}
      whileHover={{ y: -1.5 }}
      whileTap={{ y: 0, scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      {/* Primary: inner gold shimmer sweep on hover */}
      {variant === 'primary' && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[900ms] ease-out"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(232,213,168,0.35) 50%, transparent 100%)',
          }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">
        {children}
      </span>
    </Component>
  )
}
