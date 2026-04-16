import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

export function initLenis() {
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
  })

  function raf(time: number) {
    lenisInstance?.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return lenisInstance
}

export function destroyLenis() {
  lenisInstance?.destroy()
  lenisInstance = null
}

export function getLenis() {
  return lenisInstance
}
