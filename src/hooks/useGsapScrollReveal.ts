import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Options {
  delay?: number
  duration?: number
  /** 'slide' = slides up from clip mask. 'fade' = simple fade + translate. */
  type?: 'slide' | 'fade'
  start?: string
}

/**
 * Returns a ref to attach to any element.
 * On scroll entry, GSAP animates it in with a premium clip-path or fade+slide reveal.
 * Works with any JSX content (spans, gradients, mixed text, etc.)
 */
export function useGsapScrollReveal<T extends HTMLElement>(opts: Options = {}) {
  const { delay = 0, duration = 0.85, type = 'slide', start = 'top 88%' } = opts
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let tween: gsap.core.Tween
    let trigger: ScrollTrigger

    if (type === 'slide') {
      // Wrap in clip container (preserves original layout)
      const parent = el.parentElement
      if (!parent) return

      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = window.getComputedStyle(el).display === 'inline' ? 'inline-block' : 'block'
      parent.insertBefore(wrapper, el)
      wrapper.appendChild(el)

      gsap.set(el, { yPercent: 105, opacity: 0 })

      tween = gsap.to(el, {
        yPercent: 0,
        opacity: 1,
        duration,
        delay,
        ease: 'power3.out',
        paused: true,
      })

      trigger = ScrollTrigger.create({
        trigger: wrapper,
        start,
        once: true,
        onEnter: () => tween.play(),
      })

      return () => {
        tween.kill()
        trigger.kill()
        // Unwrap
        if (wrapper.parentElement) {
          wrapper.parentElement.insertBefore(el, wrapper)
          wrapper.remove()
        }
        gsap.set(el, { clearProps: 'all' })
      }
    } else {
      gsap.set(el, { opacity: 0, y: 30 })

      tween = gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        paused: true,
      })

      trigger = ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () => tween.play(),
      })

      return () => {
        tween.kill()
        trigger.kill()
        gsap.set(el, { clearProps: 'all' })
      }
    }
  }, [delay, duration, type, start])

  return ref
}
