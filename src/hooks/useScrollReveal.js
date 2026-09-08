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

    const revealAll = () => {
      if (!el) return
      const all = el.classList.contains('reveal-on-scroll')
        ? [el, ...el.querySelectorAll('.reveal-on-scroll')]
        : el.querySelectorAll('.reveal-on-scroll')
      all.forEach((item) => item.classList.add('is-revealed'))
    }

    if (prefersReducedMotion) {
      revealAll()
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
        threshold: options.threshold || 0.05,
        rootMargin: options.rootMargin || '150px 0px 100px 0px',
      }
    )

    elementsToObserve.forEach((elem) => observer.observe(elem))

    // Observe dynamically added cards (e.g., category filtering)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            if (node.classList.contains('reveal-on-scroll')) {
              observer.observe(node)
            }
            node.querySelectorAll?.('.reveal-on-scroll').forEach((child) => {
              observer.observe(child)
            })
          }
        })
      })
    })

    mutationObserver.observe(el, { childList: true, subtree: true })

    // Safety fallback: reveal all after 1.5s so nothing stays invisible
    const timer = setTimeout(revealAll, 1500)

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
      clearTimeout(timer)
    }
  }, [options.threshold, options.rootMargin, options.persist])

  return containerRef
}
