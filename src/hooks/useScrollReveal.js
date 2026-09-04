import { useEffect, useRef } from 'react'

export function useScrollReveal(options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const elementsToObserve = el.classList.contains('reveal-on-scroll')
      ? [el, ...el.querySelectorAll('.reveal-on-scroll')]
      : el.querySelectorAll('.reveal-on-scroll')

    if (prefersReducedMotion) {
      elementsToObserve.forEach((elem) => elem.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            if (!options.persist) {
              observer.unobserve(entry.target)
            }
          }
        })
      },
      {
        threshold: options.threshold || 0.12,
        rootMargin: options.rootMargin || '0px 0px -40px 0px',
      }
    )

    elementsToObserve.forEach((elem) => observer.observe(elem))

    return () => {
      observer.disconnect()
    }
  }, [options.threshold, options.rootMargin, options.persist])

  return containerRef
}
