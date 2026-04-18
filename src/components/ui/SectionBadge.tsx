import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionBadgeProps {
  children: ReactNode
  icon?: ReactNode
}

/**
 * Editorial eyebrow. No pill. Typography-led.
 * Hairline + uppercase tracked text in champagne gold.
 */
export function SectionBadge({ children, icon }: SectionBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      className="inline-flex items-center gap-3"
    >
      <span
        className="h-px w-8"
        style={{ background: 'rgba(201, 168, 106, 0.7)' }}
        aria-hidden="true"
      />
      {icon && <span className="text-[#C9A86A]">{icon}</span>}
      <span className="text-[11px] font-medium tracking-[0.24em] text-[#C9A86A] uppercase">
        {children}
      </span>
      <span
        className="h-px w-8"
        style={{ background: 'rgba(201, 168, 106, 0.7)' }}
        aria-hidden="true"
      />
    </motion.div>
  )
}
