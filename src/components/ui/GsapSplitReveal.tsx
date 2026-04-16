import { useRef, useEffect, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface GsapSplitRevealProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  /** Delay in seconds before animation starts */
  delay?: number
  /** 'words' splits by word, 'chars' by character */
  splitBy?: 'words' | 'chars'
  /** If true, triggers on scroll. If false, triggers on mount. */
  onScroll?: boolean
  /** How far the element enters the viewport before triggering (0–1) */
  threshold?: number
}

/**
 * Splits text into words/chars and reveals them with a staggered GSAP animation.
 * Uses ScrollTrigger when onScroll=true (default for sections).
 */
export function GsapSplitReveal({
  children,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  splitBy = 'words',
  onScroll = true,
  threshold = 0.2,
}: GsapSplitRevealProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Split text into spans
    const text = children
    const units = splitBy === 'words'
      ? text.split(' ')
      : text.split('')

    const separator = splitBy === 'words' ? ' ' : ''

    el.innerHTML = units
      .map(
        (unit) =>
          `<span class="gsap-split-unit" style="display:inline-block;overflow:hidden;vertical-align:bottom">`
          + `<span class="gsap-split-inner" style="display:inline-block">${unit}${separator}</span></span>`
      )
      .join(splitBy === 'words' ? ' ' : '')

    const inners = el.querySelectorAll<HTMLElement>('.gsap-split-inner')

    // Initial state
    gsap.set(inners, { yPercent: 110, opacity: 0 })

    const tween = gsap.to(inners, {
      yPercent: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out',
      stagger: splitBy === 'words' ? 0.08 : 0.03,
      delay,
      paused: onScroll,
    })

    let trigger: ScrollTrigger | null = null

    if (onScroll) {
      trigger = ScrollTrigger.create({
        trigger: el,
        start: `top ${Math.round((1 - threshold) * 100)}%`,
        once: true,
        onEnter: () => tween.play(),
      })
    } else {
      tween.play()
    }

    return () => {
      tween.kill()
      trigger?.kill()
      // Restore original text
      if (el) el.textContent = children
    }
  }, [children, splitBy, delay, onScroll, threshold])

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={containerRef} className={className}>
      {children}
    </Tag>
  )
}
