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
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-14">
        {/* =====================================================
            HERO CONTENT: MINIMAL, AIRY & ELEGANT
        ===================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12 py-10 sm:py-16 lg:py-20">
          {/* LEFT: MINIMAL EDITORIAL TEXT */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left items-center lg:items-start">
            {/* Simple, understated eyebrow */}
            <p className="text-xs font-semibold uppercase tracking-wider text-[#b08d2e] mb-3">
              B2B Wholesale · Made in India
            </p>

            {/* Clean, confident headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-[#172b3f] leading-[1.1] max-w-2xl">
              Factory-Direct Cleaning Solutions.
            </h1>

            {/* Quiet, concise prose (reduced by >50%) */}
            <p className="mt-3 sm:mt-5 text-sm sm:text-base text-gray-500 max-w-lg leading-relaxed">
              Certified commercial cleaning formulations & contract bottling for wholesale distributors and export partners.
            </p>

            {/* Clean CTA buttons */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#172b3f] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-black shadow-xs"
              >
                <span>Explore Products</span>
                <ArrowUpRight size={14} />
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#172b3f] transition hover:border-[#172b3f] shadow-2xs"
              >
                Wholesale Enquiry
              </Link>
            </div>

            {/* Muted trust line */}
            <div className="mt-6 sm:mt-8 flex items-center justify-center lg:justify-start gap-3 text-xs text-gray-400">
              <span>50+ Case MOQ</span>
              <span>·</span>
              <span>7–14d Export Dispatch</span>
              <span>·</span>
              <span>Direct Supply</span>
            </div>
          </div>

          {/* RIGHT: BULLETPROOF PRODUCT SHOWCASE */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center w-full">
            {/* PRODUCT STAGE CONTAINER */}
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] flex flex-col items-center">
              {/* Circular Stage with Product Inside (Guaranteed no overlap) */}
              <div className="relative flex w-64 h-64 sm:w-80 sm:h-80 lg:w-[380px] lg:h-[380px] items-center justify-center rounded-full bg-[#f6f6f3] shadow-inner p-6">
                {/* Product Image */}
                <img
                  src={activeProduct.image}
                  alt={`${activeProduct.brand} ${activeProduct.name}`}
                  draggable="false"
                  style={{
                    transform: `scale(${(activeProduct.scale || 0.88) * (productVisible ? 1 : 0.96)})`,
                  }}
                  className={`max-h-[85%] max-w-[85%] select-none object-contain mix-blend-multiply drop-shadow-md transition-all duration-300 ease-out ${
                    productVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Prev / Next Chevrons on Stage */}
                <button
                  onClick={handlePrev}
                  type="button"
                  aria-label="Previous product"
                  className="absolute -left-2 sm:left-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:scale-105 active:scale-95 border border-gray-100"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  type="button"
                  aria-label="Next product"
                  className="absolute -right-2 sm:right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:scale-105 active:scale-95 border border-gray-100"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* PRODUCT TITLE & SLIDE INDICATORS */}
              <div className="w-full mt-4 flex items-center justify-between px-2">
                <div className="text-left">
                  <p className="text-xs font-semibold text-gray-900 truncate">
                    {activeProduct.name}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {activeProduct.brand} · {Array.isArray(activeProduct.variants) ? activeProduct.variants.join(', ') : '500ml, 1L, 5L'}
                  </p>
                </div>

                {/* Dots */}
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
      </div>
    </section>
  )
}

export default Hero
