import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useStore } from '../context/useStore'

function Hero() {
  const { products } = useStore()
  const featuredProducts =
    products.filter((p) => p.is_featured).length > 0
      ? products.filter((p) => p.is_featured)
      : products

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [productVisible, setProductVisible] = useState(true)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  const heroSectionRef = useRef(null)
  const transitionTimeout = useRef(null)
  const touchStartX = useRef(null)

  // Bounds safety
  const safeIndex =
    activeIndex < featuredProducts.length ? activeIndex : 0
  const activeProduct = featuredProducts[safeIndex] || {
    name: 'Boven Cleaning Products',
    brand: 'LEXONE',
    category: 'CLEANING CARE',
    image: '/assets/products/lexoneliquiddetergent.png',
    scale: 0.85,
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
    const next = (safeIndex + 1) % featuredProducts.length
    changeProduct(next)
  }

  const handlePrev = () => {
    const prev = (safeIndex - 1 + featuredProducts.length) % featuredProducts.length
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

  /*
   * ------------------------------------------------------------
   * AUTO ROTATION
   * ------------------------------------------------------------
   */
  useEffect(() => {
    if (isPaused || featuredProducts.length <= 1) return

    const timer = window.setInterval(() => {
      setProductVisible(false)

      transitionTimeout.current = window.setTimeout(() => {
        setActiveIndex((current) => {
          return (current + 1) % featuredProducts.length
        })

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
  }, [isPaused, featuredProducts.length])

  /*
   * ------------------------------------------------------------
   * CLEANUP
   * ------------------------------------------------------------
   */
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
      className="relative overflow-hidden bg-white text-[#104360]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-14">
        {/* =====================================================
            HERO CONTENT: MINIMAL, AIRY & ELEGANT
        ===================================================== */}
        <div className="grid min-h-0 lg:min-h-[calc(100svh-90px)] grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 py-6 sm:py-10 lg:py-6">
          {/* LEFT: MINIMAL EDITORIAL TEXT */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Simple, understated eyebrow in Brand Red */}
            <p className="text-xs font-semibold uppercase tracking-wider text-[#EF2034] mb-2 sm:mb-3">
              Manufactured in India · Factory Direct
            </p>

            {/* Clean, confident headline in Brand Deep Blue */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.6rem] font-medium tracking-tight text-[#104360] leading-[1.08] max-w-2xl">
              Direct-from-factory cleaning solutions.
            </h1>

            {/* Mobile: concise 1-sentence text */}
            <p className="block sm:hidden mt-3 text-xs text-gray-500 leading-relaxed font-normal">
              Commercial cleaning chemicals & contract manufacturing in India for wholesale distributors.
            </p>

            {/* Desktop: full approved prose */}
            <p className="hidden sm:block mt-4 sm:mt-6 text-sm sm:text-base text-gray-500 max-w-xl leading-relaxed font-normal">
              Certified laundry, surface, and disinfection chemical formulations manufactured in India. Direct container-load supply for regional distributors, institutional facilities, and GCC export.
            </p>

            {/* Clean CTA buttons */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-3.5">
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-lg bg-[#104360] px-5 sm:px-6 py-2.5 sm:py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#EF2034] shadow-xs"
              >
                <span>Explore Products</span>
                <ArrowUpRight size={14} />
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-xs font-semibold uppercase tracking-wider text-[#104360] transition hover:border-[#104360] hover:text-[#EF2034] shadow-2xs"
              >
                Wholesale Enquiry
              </Link>
            </div>

            {/* Mobile: compact trust line */}
            <div className="flex sm:hidden mt-5 items-center gap-2 text-[11px] text-gray-400">
              <span>50+ Cases MOQ</span>
              <span>·</span>
              <span>7–14d Export Dispatch</span>
              <span>·</span>
              <span>Direct Supply</span>
            </div>

            {/* Desktop: full approved trust note */}
            <div className="hidden sm:flex mt-8 sm:mt-10 flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-400 font-normal">
              <span>Min. Order: 50 Cases</span>
              <span>·</span>
              <span>7–14 Day Export Dispatch</span>
              <span>·</span>
              <span>Direct Factory Supply</span>
            </div>
          </div>

          {/* RIGHT: ELEVATED PRODUCT SHOWCASE */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* PRODUCT STAGE (ROBUST ON MOBILE, FULL PARALLAX ON DESKTOP) */}
            <div className="relative flex h-[280px] sm:h-[360px] lg:h-[420px] w-full items-center justify-center overflow-hidden lg:overflow-visible">
              {/* Soft, neutral circular pedestal */}
              <div
                className="absolute left-1/2 top-1/2 w-64 h-64 sm:w-80 sm:h-80 lg:w-[390px] lg:h-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f4f7f9] transition-transform duration-300 ease-out"
                style={{
                  transform: `translate(calc(-50% + ${parallax.x * 16}px), calc(-50% + ${parallax.y * 16}px))`,
                }}
              />

              {/* Product Bottle Canvas */}
              <div
                className="relative z-10 flex h-[85%] w-[85%] items-center justify-center transition-all duration-300 ease-out"
                style={{
                  transform: `translate(${parallax.x * -18}px, ${parallax.y * -18}px)`,
                }}
              >
                <img
                  src={activeProduct.image}
                  alt={`${activeProduct.brand} ${activeProduct.name}`}
                  draggable="false"
                  style={{
                    transform: `scale(${(activeProduct.scale || 0.85) * (productVisible ? 1 : 0.97)})`,
                  }}
                  className={`block h-full w-full select-none object-contain object-center mix-blend-multiply drop-shadow-md transition-all duration-300 ease-out ${
                    productVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>

              {/* Prev / Next Chevrons on Mobile */}
              <button
                onClick={handlePrev}
                aria-label="Previous product"
                className="absolute left-1 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#104360] shadow-sm transition hover:bg-white sm:hidden"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next product"
                className="absolute right-1 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#104360] shadow-sm transition hover:bg-white sm:hidden"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* PRODUCT TITLE & SLIDE INDICATOR (CLEAN & SUBTLE) */}
            <div className="w-full max-w-[360px] mt-2 flex items-center justify-between border-t border-gray-100 pt-3 text-left">
              <div>
                <p className="text-xs font-semibold text-[#104360] truncate">
                  {activeProduct.name}
                </p>
                <p className="text-[11px] text-gray-400">
                  {activeProduct.brand} · {Array.isArray(activeProduct.variants) ? activeProduct.variants.join(', ') : '500ml, 1L, 5L'}
                </p>
              </div>

              {/* Dots / Indicators */}
              <div className="flex items-center gap-1.5 shrink-0 ml-3">
                {featuredProducts.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Slide ${index + 1}`}
                    onClick={() => changeProduct(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === safeIndex
                        ? 'w-5 bg-[#104360]'
                        : 'w-1.5 bg-gray-200 hover:bg-[#EF2034]'
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
