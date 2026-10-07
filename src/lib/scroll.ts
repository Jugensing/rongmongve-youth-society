import Lenis from 'lenis'
export let lenis: Lenis | null = null
export function initScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  lenis = new Lenis({ duration: 1.1, anchors: true })
  let id = requestAnimationFrame(function raf(t) { lenis?.raf(t); id = requestAnimationFrame(raf) })
  return () => { cancelAnimationFrame(id); lenis?.destroy(); lenis = null }
}
export const scrollTop = (immediate = false) => lenis ? lenis.scrollTo(0, { immediate }) : window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
