import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useStore } from '../context/useStore'

function Hero() {
  const { products, topBadge } = useStore()
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
    }, 200)
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
      }, 200)
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
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14 xl:px-16">
        {/* =====================================================
            TOP BRAND LINE
        ===================================================== */}
        <div className="flex h-11 sm:h-13 items-center justify-between border-b border-[#172b3f]/10">
          <div className="flex items-center gap-2.5">
            <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#c9a84c] animate-ping" />
            <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.3em] text-[#172b3f]/65">
              Boven Frontier International
            </span>
          </div>

          <span className="hidden sm:inline text-[9px] uppercase tracking-[0.25em] text-[#172b3f]/40">
            LLP Reg: ACE-5349 · India
          </span>
        </div>

        {/* =====================================================
            HERO CONTENT
        ===================================================== */}
        <div className="grid min-h-[calc(100svh-140px)] grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-10 py-4 sm:py-6 lg:py-4">
          {/* LEFT: TEXT & HEADINGS */}
          <div className="relative flex flex-col justify-center py-2 sm:py-6 lg:py-2">
            <div className="hero-left-content">
              {/* Eyebrow / Editable Hero Badge */}
              <div className="hero-eyebrow mb-3 sm:mb-4 pl-1 sm:pl-[1.5vw]">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#c9a84c]/40 bg-[#fefbf3] px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#b08d2e] shadow-2xs">
                  <span className="h-2 w-2 rounded-full bg-[#c9a84c] animate-ping" />
                  {topBadge?.heroBadge || 'Manufactured in India · Direct Factory Supply'}
                </div>
              </div>

              {/* Kinetic Masked Main Headline */}
              <h1 className="hero-title max-w-[720px] pl-1 sm:pl-[1.5vw] text-[clamp(2.4rem,4.4vw,4.6rem)] font-bold leading-[0.98] tracking-[-0.04em] text-[#172b3f]">
                <span className="block">Direct-from-Factory</span>
                <span className="block text-[#c9a84c]">Cleaning Solutions</span>
                <span className="block text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-[#172b3f]/70 mt-2">
                  for Distributors & Global Importers.
                </span>
              </h1>

              {/* Description */}
              <div className="hero-fade-in hero-description mt-4 sm:mt-5 flex max-w-[540px] items-start gap-3.5 pl-1 sm:pl-[1.5vw]">
                <span className="mt-1 h-[42px] w-[2px] shrink-0 bg-[#c9a84c]" />
                <p className="text-xs sm:text-sm leading-[1.65] text-[#172b3f]/75">
                  Eliminate broker markups. Source certified laundry, surface, and disinfection chemical formulations directly from our manufacturing facility in India. Ready for domestic supermarket supply and GCC container export.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="hero-fade-in hero-cta mt-6 sm:mt-7 flex flex-wrap items-center gap-3 pl-1 sm:pl-[1.5vw]">
                <a
                  href="#products"
                  className="group relative inline-flex items-center gap-2 rounded-lg bg-[#172b3f] px-5 sm:px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#c9a84c] hover:text-[#172b3f] hover:shadow-lg"
                >
                  <span>Explore Products</span>
                  <ArrowUpRight
                    size={14}
                    strokeWidth={2}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-[#172b3f] bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#172b3f] transition-all hover:bg-gray-50 shadow-xs"
                >
                  Wholesale Enquiry
                </Link>
              </div>

              {/* B2B Assurance Metrics */}
              <div className="mt-7 sm:mt-8 border-t border-[#172b3f]/10 pt-5 pl-1 sm:pl-[1.5vw]">
                <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-[480px]">
                  <div>
                    <span className="text-lg sm:text-xl font-bold tracking-tight text-[#172b3f]">
                      50 Cases
                    </span>
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[#172b3f]/55 mt-0.5">
                      Min. Order Quantity
                    </p>
                  </div>
                  <div>
                    <span className="text-lg sm:text-xl font-bold tracking-tight text-[#172b3f]">
                      7–14 Days
                    </span>
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[#172b3f]/55 mt-0.5">
                      Export Dispatch
                    </p>
                  </div>
                  <div>
                    <span className="text-lg sm:text-xl font-bold tracking-tight text-[#c9a84c]">
                      100% Direct
                    </span>
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[#172b3f]/55 mt-0.5">
                      Factory Pricing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: PRODUCT SHOWCASE WITH 3D PARALLAX */}
          <div className="relative flex flex-col justify-center lg:pl-[2vw] py-2 sm:py-4 lg:-translate-y-2 xl:-translate-y-4">
            {/* PRODUCT STAGE */}
            <div className="hero-product-stage relative flex h-[350px] sm:h-[420px] lg:h-[460px] xl:h-[490px] w-full items-center justify-center">
              {/* Background Circle with Parallax */}
              <div
                className="hero-stage-circle absolute left-1/2 top-1/2 h-[90%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f7f7f4] transition-transform duration-300 ease-out shadow-xs"
                style={{
                  transform: `translate(calc(-50% + ${parallax.x * 18}px), calc(-50% + ${parallax.y * 18}px))`,
                }}
              />

              {/* Pulsing Center Glow */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[45%] w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 blur-3xl animate-pulse-glow" />

              {/* Active Product Image with Counter Parallax */}
              <div
                className="hero-product-canvas relative z-10 flex h-[88%] w-[88%] items-center justify-center transition-all duration-300 ease-out"
                style={{
                  transform: `translate(${parallax.x * -20}px, ${parallax.y * -20}px)`,
                }}
              >
                <img
                  src={activeProduct.image}
                  alt={`${activeProduct.brand} ${activeProduct.name}`}
                  draggable="false"
                  style={{
                    transform: `scale(${(activeProduct.scale || 0.85) * (productVisible ? 1 : 0.97)})`,
                  }}
                  className={`hero-product-image block h-full w-full select-none object-contain object-center mix-blend-multiply drop-shadow-xl transition-all duration-300 ease-out ${
                    productVisible
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                />
              </div>

              {/* Prev / Next Chevrons on Mobile */}
              <button
                onClick={handlePrev}
                aria-label="Previous product"
                className="absolute left-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#172b3f] shadow-sm backdrop-blur-xs transition hover:bg-white sm:hidden"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next product"
                className="absolute right-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#172b3f] shadow-sm backdrop-blur-xs transition hover:bg-white sm:hidden"
              >
                <ChevronRight size={18} />
              </button>

              {/* Ground shadow */}
              <div
                className={`hero-product-shadow pointer-events-none absolute bottom-[6%] left-1/2 z-[5] h-4 w-[40%] -translate-x-1/2 rounded-[50%] bg-[#172b3f]/10 blur-xl transition-opacity duration-300 ${
                  productVisible ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>

            {/* PRODUCT INFORMATION & COUNTER */}
            <div className="border-t border-[#172b3f]/10 pt-3.5 sm:pt-4 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5">
                <div
                  className={`hero-product-info transition-all duration-300 ${
                    productVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-2'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#b08d2e]">
                      {activeProduct.category}
                    </span>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#172b3f]/50">
                      · {activeProduct.brand}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#172b3f]">
                    {activeProduct.name}
                  </h2>

                  <p className="mt-0.5 text-xs text-[#172b3f]/65">
                    Manufactured in India · Available in {Array.isArray(activeProduct.variants) ? activeProduct.variants.join(' · ') : '500ml · 1L · 5L'}
                  </p>
                </div>

                {/* Counter and Navigation Dots */}
                <div className="flex items-center gap-3 sm:gap-4 self-end sm:self-auto">
                  <span className="text-[10px] tabular-nums tracking-[0.2em] text-[#172b3f]/55">
                    {String(safeIndex + 1).padStart(2, '0')}
                    <span className="mx-1 text-[#172b3f]/25">/</span>
                    {String(featuredProducts.length).padStart(2, '0')}
                  </span>

                  {/* Dots / Bars */}
                  <div className="flex items-center gap-1">
                    {featuredProducts.map((product, index) => (
                      <button
                        key={product.id || index}
                        type="button"
                        aria-label={`Show ${product.brand} ${product.name}`}
                        onClick={() => changeProduct(index)}
                        className="group flex h-5 items-center p-0.5"
                      >
                        <span
                          className={`h-[2px] transition-all duration-300 ${
                            index === safeIndex
                              ? 'w-5 sm:w-7 bg-[#172b3f]'
                              : 'w-2 sm:w-2.5 bg-[#172b3f]/20 group-hover:bg-[#172b3f]/50'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM LINE
        ===================================================== */}
        <div className="flex h-11 items-center justify-between border-t border-[#172b3f]/10 text-[9px] font-medium uppercase tracking-[0.25em] text-[#172b3f]/50">
          <span>Corporate Office: Kozhikode, India</span>
          <span>Quality Formulations · Container Dispatch</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
