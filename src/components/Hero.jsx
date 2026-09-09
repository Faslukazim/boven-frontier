import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowDownRight } from 'lucide-react'
import { useStore } from '../context/useStore'

function Hero() {
  const { products } = useStore()
  const featuredProducts =
    products.filter((p) => p.is_featured).length > 0
      ? products.filter((p) => p.is_featured)
      : products

  // Keep LexOne Bathroom Cleaner as the first flagship product, and trim to 4 flagship slides
  const heroProductsList = [
    ...featuredProducts.filter((p) => (p.image || '').toLowerCase().includes('bathroomcleaner')),
    ...featuredProducts.filter((p) => !(p.image || '').toLowerCase().includes('bathroomcleaner')),
  ].slice(0, 4)

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
    if (heroProductsList.length <= 1 || nextIndex === safeIndex) return

    if (transitionTimeout.current) clearTimeout(transitionTimeout.current)

    setProductVisible(false)
    transitionTimeout.current = setTimeout(() => {
      setActiveIndex(nextIndex)
      requestAnimationFrame(() => setProductVisible(true))
    }, 180)
  }

  const handleNext = () => {
    if (heroProductsList.length <= 1) return
    changeProduct((safeIndex + 1) % heroProductsList.length)
  }

  const handlePrev = () => {
    if (heroProductsList.length <= 1) return
    changeProduct((safeIndex - 1 + heroProductsList.length) % heroProductsList.length)
  }

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024 || !heroSectionRef.current) return
    const rect = heroSectionRef.current.getBoundingClientRect()
    setParallax({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    })
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
    setParallax({ x: 0, y: 0 })
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 45) handleNext()
    else if (diff < -45) handlePrev()
    touchStartX.current = null
  }

  useEffect(() => {
    if (isPaused || heroProductsList.length <= 1) return

    const timer = window.setInterval(() => {
      setProductVisible(false)
      transitionTimeout.current = window.setTimeout(() => {
        setActiveIndex((current) => (current + 1) % heroProductsList.length)
        window.requestAnimationFrame(() => setProductVisible(true))
      }, 180)
    }, 4500)

    return () => {
      window.clearInterval(timer)
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current)
    }
  }, [isPaused, heroProductsList.length])

  useEffect(() => {
    return () => {
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current)
    }
  }, [])

  const scrollToProducts = (e) => {
    const target = document.getElementById('products')
    if (!target) return
    e.preventDefault()
    const top = target.getBoundingClientRect().top + window.scrollY - 74
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section
      ref={heroSectionRef}
      className="relative min-h-[calc(100svh-74px)] overflow-hidden text-white"
      style={{
        background: 'linear-gradient(115deg, #3E1E5D 0%, #2A2756 45%, #1B2F62 100%)',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient depth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(circle at ${65 + parallax.x * 8}% ${48 + parallax.y * 8}%, rgba(255,255,255,0.13), transparent 30%)`,
          transition: 'background-position 500ms ease-out',
        }}
      />

      {/* Architectural grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true">
        <div className="absolute left-[8%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[67%] top-0 h-full w-px bg-white" />
        <div className="absolute left-0 right-0 top-[24%] h-px bg-white" />
        <div className="absolute left-0 right-0 bottom-[15%] h-px bg-white" />
      </div>

      {/* Product halo */}
      <div
        className="pointer-events-none absolute right-[-10%] top-[20%] h-[55vw] w-[55vw] max-h-[760px] max-w-[760px] rounded-full border border-white/[0.07]"
        style={{
          transform: `translate(${parallax.x * 20}px, ${parallax.y * 20}px)`,
          transition: 'transform 700ms cubic-bezier(.2,.8,.2,1)',
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-74px)] max-w-[1560px] items-center px-5 py-8 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid w-full grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-0">
          {/* LEFT — BRAND STATEMENT */}
          <div className="relative z-20 lg:col-span-7 lg:pr-12 xl:pr-20">
            <div className="mb-5 flex items-center gap-3 sm:mb-7">
              <span className="h-px w-8 bg-[#EF2034]" />
              <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-white/45 sm:text-[10px]">
                BOVEN FRONTIER / GLOBAL DISTRIBUTION
              </span>
            </div>

            <h1 className="select-none font-inter text-[clamp(3rem,7.2vw,7rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.055em] text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.3)]">
              <span className="hero-text-reveal-1 block">
                <span className="inline-block min-w-[0.63em] text-left text-[#EF2034]">B</span>RIDGING
              </span>
              <span className="hero-text-reveal-2 block">
                <span className="inline-block min-w-[0.63em] text-left text-[#EF2034]">F</span>RONTIERS
              </span>
              <span className="hero-text-reveal-3 block">
                <span className="inline-block min-w-[0.63em] text-left text-[#EF2034]">I</span>NSPIRING
              </span>
              <span className="hero-text-reveal-4 block">
                <span className="inline-block min-w-[0.63em] text-left">G</span>ROWTH<span className="text-[#EF2034]">.</span>
              </span>
            </h1>

            <div className="hero-fade-in mt-6 max-w-[560px] sm:mt-8">
              <div className="border-l-2 border-[#EF2034] pl-4 text-xs leading-relaxed text-white/65 sm:text-sm md:text-[15px]">
                Connecting quality brands with growing markets.
                <span className="hidden sm:inline"> Creating long-term partnerships through distribution, trust and scale.</span>
              </div>
            </div>

            <div className="hero-fade-in mt-6 flex flex-wrap items-center gap-4 sm:mt-8">
              <Link
                to="/contact"
                className="group inline-flex h-12 items-center gap-5 bg-[#EF2034] px-5 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-lg transition duration-300 hover:bg-white hover:text-[#211F50] sm:h-14 sm:px-6 sm:text-[11px]"
              >
                <span>Wholesale Enquiry</span>
                <ArrowDownRight size={17} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
              </Link>

              <a
                href="#products"
                onClick={scrollToProducts}
                className="group inline-flex items-center gap-3 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55 transition hover:text-white sm:text-[11px]"
              >
                <span>Explore Products</span>
                <span className="text-[#EF2034] transition-transform duration-300 group-hover:translate-y-1">↓</span>
              </a>
            </div>
          </div>

          {/* RIGHT — PRODUCT */}
          <div className="relative z-20 lg:col-span-5 lg:-mr-4">
            <div className="mb-2 flex items-center justify-between lg:hidden">
              <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/30">
                Featured Product
              </span>
              <span className="text-[9px] tracking-[0.2em] text-white/30">
                {String(safeIndex + 1).padStart(2, '0')} / {String(Math.max(heroProductsList.length, 1)).padStart(2, '0')}
              </span>
            </div>

            <div className="relative flex min-h-[340px] items-center justify-center sm:min-h-[430px] lg:min-h-[590px]">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.055] blur-3xl sm:h-[360px] sm:w-[360px]"
                style={{
                  transform: `translate(calc(-50% + ${parallax.x * -20}px), calc(-50% + ${parallax.y * -20}px))`,
                }}
              />

              <div
                className="relative flex items-center justify-center transition-transform duration-700 ease-out"
                style={{ transform: `translate(${parallax.x * -14}px, ${parallax.y * -14}px)` }}
              >
                <div className="animate-float flex items-center justify-center">
                  <img
                    src={activeProduct.image}
                    alt={`${activeProduct.brand} ${activeProduct.name}`}
                    draggable="false"
                    className={`h-[300px] w-auto max-w-[78vw] select-none object-contain drop-shadow-[0_30px_42px_rgba(0,0,0,0.55)] transition-all duration-500 ease-out sm:h-[390px] md:h-[440px] lg:h-[510px] ${productVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-5 scale-[0.94] opacity-0'}`}
                  />
                </div>

                <button
                  onClick={handlePrev}
                  type="button"
                  aria-label="Previous product"
                  className="absolute left-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white backdrop-blur-md transition hover:bg-white/10 sm:hidden"
                >
                  <ChevronLeft size={17} />
                </button>
                <button
                  onClick={handleNext}
                  type="button"
                  aria-label="Next product"
                  className="absolute right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white backdrop-blur-md transition hover:bg-white/10 sm:hidden"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>

            {/* Product information */}
            <div className="flex items-end justify-between border-t border-white/10 pt-3 sm:pt-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-white sm:text-xs">
                  {activeProduct.name}
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-white/35 sm:text-[10px]">
                  {activeProduct.brand} · {Array.isArray(activeProduct.variants) ? activeProduct.variants.join(', ') : '250ml, 500ml'}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                {heroProductsList.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Slide ${index + 1}`}
                    onClick={() => changeProduct(index)}
                    className={`h-[2px] rounded-full transition-all duration-300 ${index === safeIndex ? 'w-7 bg-[#EF2034]' : 'w-2.5 bg-white/25 hover:bg-white/60'}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-2 flex justify-end">
              <a
                href="#products"
                onClick={scrollToProducts}
                className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35 transition hover:text-white sm:text-[10px]"
              >
                View all products ({products.length}) →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop footer detail */}
      <div className="pointer-events-none absolute bottom-5 left-5 right-5 hidden items-center justify-between text-[9px] uppercase tracking-[0.25em] text-white/25 sm:flex lg:left-16 lg:right-16 xl:left-20 xl:right-20">
        <span>Quality · Markets · Growth</span>
        <span>Scroll to explore ↓</span>
      </div>
    </section>
  )
}

export default Hero
