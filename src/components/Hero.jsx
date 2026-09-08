import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useStore } from '../context/useStore'

function Hero() {
  const { products } = useStore()
  const featuredProducts =
    products.filter((p) => p.is_featured).length > 0
      ? products.filter((p) => p.is_featured)
      : products

  // Ensure LexOne Bathroom Cleaner (from client mockup) is the initial flagship product
  const heroProductsList = [
    ...featuredProducts.filter((p) => (p.image || '').toLowerCase().includes('bathroomcleaner')),
    ...featuredProducts.filter((p) => !(p.image || '').toLowerCase().includes('bathroomcleaner')),
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [productVisible, setProductVisible] = useState(true)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  const heroSectionRef = useRef(null)
  const transitionTimeout = useRef(null)
  const touchStartX = useRef(null)

  const safeIndex = activeIndex < heroProductsList.length ? activeIndex : 0
  const activeProduct = heroProductsList[safeIndex] || {
    name: 'Bathroom Cleaner',
    brand: 'LEXONE',
    variants: ['250 ml', '500 ml'],
    image: '/assets/products/LexoneBathroomcleaner.png',
  }

  const changeProduct = (nextIndex) => {
    if (nextIndex === safeIndex) return

    if (transitionTimeout.current) {
      clearTimeout(transitionTimeout.current)
    }

    setProductVisible(false)

    transitionTimeout.current = setTimeout(() => {
      setActiveIndex(nextIndex)

      requestAnimationFrame(() => {
        setProductVisible(true)
      })
    }, 180)
  }

  const handleNext = () => {
    const next = (safeIndex + 1) % heroProductsList.length
    changeProduct(next)
  }

  const handlePrev = () => {
    const prev = (safeIndex - 1 + heroProductsList.length) % heroProductsList.length
    changeProduct(prev)
  }

  // Interactive Mouse Parallax (Desktop)
  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024 || !heroSectionRef.current) return
    const rect = heroSectionRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setParallax({ x, y })
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
    setParallax({ x: 0, y: 0 })
  }

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX
    if (diff > 45) {
      handleNext()
    } else if (diff < -45) {
      handlePrev()
    }
    touchStartX.current = null
  }

  // Auto-Rotation Timer
  useEffect(() => {
    if (isPaused || heroProductsList.length <= 1) return

    const timer = window.setInterval(() => {
      setProductVisible(false)

      transitionTimeout.current = window.setTimeout(() => {
        setActiveIndex((current) => (current + 1) % heroProductsList.length)

        window.requestAnimationFrame(() => {
          setProductVisible(true)
        })
      }, 180)
    }, 4500)

    return () => {
      window.clearInterval(timer)
      if (transitionTimeout.current) {
        clearTimeout(transitionTimeout.current)
      }
    }
  }, [isPaused, heroProductsList.length])

  useEffect(() => {
    return () => {
      if (transitionTimeout.current) {
        clearTimeout(transitionTimeout.current)
      }
    }
  }, [])

  return (
    <section
      ref={heroSectionRef}
      className="relative overflow-hidden text-white"
      style={{
        background: 'linear-gradient(115deg, #3E1E5D 0%, #2A2756 45%, #1B2F62 100%)',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Subtle radial ambient light with parallax depth */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] lg:w-[650px] h-[300px] sm:h-[500px] lg:h-[650px] rounded-full opacity-25 blur-3xl transition-transform duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(27,47,98,0) 70%)',
          transform: `translate(calc(${parallax.x * 25}px), calc(-50% + ${parallax.y * 25}px))`,
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1560px] px-5 sm:px-10 lg:px-16 xl:px-20 py-6 sm:py-8 lg:py-10 xl:py-12 min-h-[calc(100vh-74px)] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 w-full">
          
          {/* LEFT: MAJESTIC EDITORIAL HEADLINE, ACTIONS, & TAGLINE */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            {/* Acronym stylized BFI Headline with Staggered Entrance Animations */}
            <h1
              className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.4rem] font-bold tracking-[0.02em] leading-[1.03] text-white select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
            >
              <span className="block hero-text-reveal-1">
                <span className="text-[#EF2034]">B</span>RIDGING
              </span>
              <span className="block hero-text-reveal-2">
                <span className="text-[#EF2034]">F</span>RONTIERS
              </span>
              <span className="block hero-text-reveal-3">
                <span className="text-[#EF2034]">I</span>NSPIRING
              </span>
              <span className="block text-white hero-text-reveal-4">
                GROWTH
              </span>
            </h1>

            {/* Action Links with Entrance Animation */}
            <div className="hero-fade-in mt-6 sm:mt-7 lg:mt-8 flex flex-row items-center gap-6 sm:gap-10 lg:gap-14">
              <a
                href="#products"
                onClick={(e) => {
                  const target = document.getElementById('products')
                  if (target) {
                    e.preventDefault()
                    const navHeight = 74
                    const top = target.getBoundingClientRect().top + window.scrollY - navHeight
                    window.scrollTo({ top, behavior: 'smooth' })
                  }
                }}
                className="group relative text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-white hover:text-[#EF2034] transition-colors duration-200 py-1"
              >
                <span>EXPLORE PRODUCTS</span>
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-[1.5px] bg-[#EF2034] mt-0.5" />
              </a>

              <Link
                to="/contact"
                className="group relative text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-white hover:text-[#EF2034] transition-colors duration-200 py-1"
              >
                <span>WHOLESALE ENQUIRY</span>
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-[1.5px] bg-[#EF2034] mt-0.5" />
              </Link>
            </div>

            {/* Gold Cursive Script Tagline with Entrance Animation */}
            <div className="hero-script-in mt-6 sm:mt-8 lg:mt-10">
              <p
                className="font-script text-xl sm:text-2xl lg:text-[1.75rem] xl:text-[2rem] text-[#e5b741] font-normal leading-relaxed tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] whitespace-normal lg:whitespace-nowrap"
              >
                Connecting Quality. <br className="block sm:hidden" />
                Creating Markets. <br className="block sm:hidden" />
                Growing Together.
              </p>
            </div>
          </div>

          {/* RIGHT: ANIMATED PRODUCT SHOWCASE WITH FLOATING & PARALLAX */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center lg:justify-end z-10 py-4 lg:py-0">
            <div
              className="relative flex items-center justify-center transition-all duration-300 ease-out"
              style={{
                transform: `translate(${parallax.x * -18}px, ${parallax.y * -18}px)`,
              }}
            >
              <div className="animate-float flex items-center justify-center">
                <img
                  src={activeProduct.image}
                  alt={`${activeProduct.brand} ${activeProduct.name}`}
                  className={`h-[280px] sm:h-[380px] md:h-[420px] lg:h-[460px] xl:h-[500px] w-auto max-w-full object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.55)] select-none transition-all duration-300 ease-out ${
                    productVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  draggable="false"
                />
              </div>

              {/* Mobile Previous / Next Arrows */}
              <button
                onClick={handlePrev}
                type="button"
                aria-label="Previous product"
                className="absolute left-0 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md transition sm:hidden border border-white/15"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                type="button"
                aria-label="Next product"
                className="absolute right-0 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md transition sm:hidden border border-white/15"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* PRODUCT TITLE & SLIDE INDICATOR (CLEAN & SUBTLE) */}
            <div className="w-full max-w-[360px] mt-4 flex items-center justify-between border-t border-white/15 pt-3 text-left">
              <div className="transition-opacity duration-300">
                <p className="text-xs font-semibold text-white truncate">
                  {activeProduct.name}
                </p>
                <p className="text-[11px] text-white/60">
                  {activeProduct.brand} · {Array.isArray(activeProduct.variants) ? activeProduct.variants.join(', ') : '250ml, 500ml'}
                </p>
              </div>

              {/* Slide Indicator Dots */}
              <div className="flex items-center gap-1.5 shrink-0 ml-3">
                {heroProductsList.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Slide ${index + 1}`}
                    onClick={() => changeProduct(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === safeIndex
                        ? 'w-5 bg-[#EF2034]'
                        : 'w-1.5 bg-white/30 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
