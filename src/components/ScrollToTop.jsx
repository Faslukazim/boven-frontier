import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          const navHeight = 76
          const elementPosition = element.getBoundingClientRect().top + window.scrollY
          window.scrollTo({
            top: elementPosition - navHeight,
            behavior: 'smooth',
          })
        }
      }, 80)
      return () => clearTimeout(timer)
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      })
    }
  }, [pathname, hash])

  return null
}

export default ScrollToTop
