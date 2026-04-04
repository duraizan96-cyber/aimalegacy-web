import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionBadgeProps {
  children: ReactNode
  icon?: ReactNode
}

export function SectionBadge({ children, icon }: SectionBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      className="relative inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.06] px-4 py-1.5 backdrop-blur-sm overflow-hidden"
    >
      {/* Pulse dot */}
      <div className="relative flex items-center">
        <div className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
        <div className="absolute h-1.5 w-1.5 rounded-full bg-accent animate-ping opacity-60" />
      </div>
      {icon && <span className="text-accent relative z-10">{icon}</span>}
      <span className="text-[11px] font-semibold tracking-[0.2em] text-accent uppercase relative z-10">
        {children}
      </span>
    </motion.div>
  )
}
