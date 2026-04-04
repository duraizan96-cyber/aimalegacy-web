import type { ReactNode } from 'react'

interface MarqueeProps {
  children: ReactNode
  speed?: number
  pauseOnHover?: boolean
  className?: string
}

export function Marquee({
  children,
  speed = 30,
  pauseOnHover = true,
  className = '',
}: MarqueeProps) {
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}
    >
      <div
        className={`marquee-track ${pauseOnHover ? '' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {/* Original */}
        <div className="flex items-center gap-12 px-6">{children}</div>
        {/* Duplicate for seamless loop */}
        <div className="flex items-center gap-12 px-6" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
