import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionBadgeProps {
  children: ReactNode
  icon?: ReactNode
}

export function SectionBadge({ children, icon }: SectionBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/[0.06] px-4 py-1.5 backdrop-blur-sm"
    >
      {icon && <span className="text-gold">{icon}</span>}
      <span className="text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">
        {children}
      </span>
    </motion.div>
  )
}
