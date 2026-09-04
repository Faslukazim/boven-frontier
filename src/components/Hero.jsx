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
      className="relative overflow-hidden bg-white text-[#172b3f]"
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
        <div className="grid min-h-[calc(100svh-90px)] grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12 py-8 sm:py-12 lg:py-6">
          {/* LEFT: MINIMAL EDITORIAL TEXT */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Simple, understated eyebrow */}
            <p className="text-xs font-semibold uppercase tracking-wider text-[#b08d2e] mb-3">
              Manufactured in India · Factory Direct
            </p>

            {/* Clean, confident headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.6rem] font-medium tracking-tight text-[#172b3f] leading-[1.08] max-w-2xl">
              Direct-from-factory cleaning solutions.
            </h1>

            {/* Quiet, legible prose */}
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-500 max-w-xl leading-relaxed font-normal">
              Certified laundry, surface, and disinfection chemical formulations manufactured in India. Direct container-load supply for regional distributors, institutional facilities, and GCC export.
            </p>

            {/* Clean CTA buttons */}
            <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-lg bg-[#172b3f] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-black shadow-xs"
              >
                <span>Explore Products</span>
                <ArrowUpRight size={14} />
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#172b3f] transition hover:border-[#172b3f] shadow-2xs"
              >
                Wholesale Enquiry
              </Link>
            </div>

            {/* Subtle, quiet trust note */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-400 font-normal">
              <span>Min. Order: 50 Cases</span>
              <span>·</span>
              <span>7–14 Day Export Dispatch</span>
              <span>·</span>
              <span>Direct Factory Supply</span>
            </div>
          </div>

          {/* RIGHT: ELEVATED PRODUCT SHOWCASE */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* PRODUCT STAGE (TRUE CIRCLE, BALANCED HEIGHT) */}
            <div className="relative flex h-[320px] sm:h-[380px] lg:h-[420px] w-full items-center justify-center">
              {/* Soft, neutral circular pedestal */}
              <div
                className="absolute left-1/2 top-1/2 h-[92%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f6f6f3] transition-transform duration-300 ease-out"
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
                className="absolute left-1 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm transition hover:bg-white sm:hidden"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next product"
                className="absolute right-1 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm transition hover:bg-white sm:hidden"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* PRODUCT TITLE & SLIDE INDICATOR (CLEAN & SUBTLE) */}
            <div className="w-full max-w-[360px] mt-2 flex items-center justify-between border-t border-gray-100 pt-3 text-left">
              <div>
                <p className="text-xs font-semibold text-gray-900 truncate">
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
                        ? 'w-5 bg-[#172b3f]'
                        : 'w-1.5 bg-gray-200 hover:bg-gray-400'
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
