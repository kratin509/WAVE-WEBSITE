export function smoothScrollTo(target) {
  if (window.__lenis) {
    window.__lenis.scrollTo(target, { duration: 1.3 })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  el?.scrollIntoView({ behavior: 'smooth' })
}
