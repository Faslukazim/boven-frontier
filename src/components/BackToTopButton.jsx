import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top of page"
      className={`fixed right-6 bottom-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#172b3f]/15 bg-white/90 text-[#172b3f] shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#172b3f] hover:text-[#c9a84c] hover:border-[#c9a84c] ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp size={17} strokeWidth={2} />
    </button>
  )
}

export default BackToTopButton
