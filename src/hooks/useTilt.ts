import type { MouseEvent } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

/**
 * Spring-based 3D tilt hook for premium card interactions.
 * Based on Framer Motion's useMotionValue + useSpring pattern.
 * Usage: spread `tiltStyle` into a motion.div's `style` prop,
 * and bind `handleMouseMove` + `handleMouseLeave` to the element.
 */
export function useTilt(maxTilt = 8) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(y, { stiffness: 300, damping: 30 })
  const rotateY = useSpring(x, { stiffness: 300, damping: 30 })

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct * maxTilt)
    y.set(-yPct * maxTilt)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return {
    tiltStyle: {
      rotateX,
      rotateY,
      transformStyle: 'preserve-3d' as const,
    },
    handleMouseMove,
    handleMouseLeave,
  }
}
