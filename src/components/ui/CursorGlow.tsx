import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = glowRef.current
    if (!el) return

    let x = 0
    let y = 0
    let targetX = 0
    let targetY = 0

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const animate = () => {
      x += (targetX - x) * 0.08
      y += (targetY - y) * 0.08
      el.style.left = `${x}px`
      el.style.top = `${y}px`
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    const raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="cursor-glow hidden lg:block"
      aria-hidden="true"
    />
  )
}
