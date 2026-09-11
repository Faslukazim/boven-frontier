import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowDownRight } from 'lucide-react'
import { useStore } from '../context/useStore'

function Hero() {
  const { products } = useStore()
  const featured = products.filter((p) => p.is_featured)
  const heroProductsList = (featured.length > 0 ? featured : products.slice(0, 1)).slice(0, 4)

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [productVisible, setProductVisible] = useState(true)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  const heroRef = useRef(null)
  const transitionRef = useRef(null)
  const touchStartX = useRef(null)

  const safeIndex =
    activeIndex < heroProductsList.length ? activeIndex : 0

  const activeProduct = heroProductsList[safeIndex] || {
    name: 'Bathroom Cleaner',
    brand: 'LEXONE',
    variants: ['250 ml', '500 ml'],
    image: '/assets/products/LexoneBathroomcleaner.png',
  }

  const changeProduct = (nextIndex) => {
    if (
      heroProductsList.length <= 1 ||
      nextIndex === safeIndex
    ) {
      return
    }

    if (transitionRef.current) {
      clearTimeout(transitionRef.current)
    }

    setProductVisible(false)

    transitionRef.current = setTimeout(() => {
      setActiveIndex(nextIndex)

      requestAnimationFrame(() => {
        setProductVisible(true)
      })
    }, 280)
  }

  const handleNext = () => {
    changeProduct(
      (safeIndex + 1) % heroProductsList.length
    )
  }

  const handlePrev = () => {
    changeProduct(
      (safeIndex - 1 + heroProductsList.length) %
        heroProductsList.length
    )
  }

  const handleMouseMove = (e) => {
    if (
      window.innerWidth < 1024 ||
      !heroRef.current
    ) {
      return
    }

    const rect = heroRef.current.getBoundingClientRect()

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

    const diff =
      touchStartX.current -
      e.changedTouches[0].clientX

    if (diff > 45) handleNext()
    if (diff < -45) handlePrev()

    touchStartX.current = null
  }

  useEffect(() => {
    if (
      isPaused ||
      heroProductsList.length <= 1
    ) {
      return
    }

    const timer = setInterval(() => {
      setProductVisible(false)

      transitionRef.current = setTimeout(() => {
        setActiveIndex(
          (current) =>
            (current + 1) %
            heroProductsList.length
        )

        requestAnimationFrame(() => {
          setProductVisible(true)
        })
      }, 280)
    }, 5200)

    return () => {
      clearInterval(timer)

      if (transitionRef.current) {
        clearTimeout(transitionRef.current)
      }
    }
  }, [
    isPaused,
    heroProductsList.length,
  ])

  useEffect(() => {
    return () => {
      if (transitionRef.current) {
        clearTimeout(transitionRef.current)
      }
    }
  }, [])

  const scrollToProducts = (e) => {
    const target =
      document.getElementById('products')

    if (!target) return

    e.preventDefault()

    window.scrollTo({
      top:
        target.getBoundingClientRect().top +
        window.scrollY -
        74,
      behavior: 'smooth',
    })
  }

  return (
    <section
      ref={heroRef}
      className="
        relative
        min-h-[78vh]
        overflow-hidden
        bg-[#071B35]
        text-white
      "
      onMouseEnter={() => setIsPaused(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 bg-[#071B35]" />

      <div
        className="
          pointer-events-none
          absolute
          -right-[12%]
          top-[-20%]
          h-[650px]
          w-[650px]
          rounded-full
          bg-[#123B69]
          opacity-40
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-[20%]
          bottom-[-40%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#102A50]
          opacity-50
          blur-[100px]
        "
      />

      {/* =====================================================
          ABSTRACT BOVEN GRAPHIC
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-[-5%]
          top-[5%]
          h-[90%]
          w-[52%]
          opacity-[0.13]
        "
        style={{
          transform: `
            translate(
              ${parallax.x * 15}px,
              ${parallax.y * 10}px
            )
          `,
          transition:
            'transform 1400ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div
          className="
            absolute
            inset-[10%]
            rounded-[45%]
            border-[65px]
            border-[#5579AA]
            rotate-[12deg]
          "
        />

        <div
          className="
            absolute
            inset-[24%]
            rounded-full
            border-[35px]
            border-[#5579AA]
          "
        />
      </div>

      {/* =====================================================
          GRID
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.045]
        "
      >
        <div className="absolute left-[8%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[52%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[88%] top-0 h-full w-px bg-white" />

        <div className="absolute left-0 right-0 top-[20%] h-px bg-white" />
        <div className="absolute left-0 right-0 bottom-[18%] h-px bg-white" />
      </div>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[78vh]
          max-w-[1600px]
          items-center
          px-5
          py-6
          sm:px-8
          lg:px-12
          xl:px-16
        "
      >
        <div
          className="
            grid
            w-full
            grid-cols-1
            items-center
            gap-2
            lg:grid-cols-12
            lg:gap-0
          "
        >
          {/* =================================================
              LEFT
          ================================================== */}

          <div
            className="
              relative
              z-20
              lg:col-span-6
              lg:pr-6
              xl:pr-10
            "
          >
            <div
              className="
                hero-enter
                mb-4
                flex
                items-center
                gap-3
                sm:mb-5
              "
            >
              <span className="h-px w-9 bg-[#EF2034]" />

              <span
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-white/80
                "
              >
                BOVEN FRONTIER / GLOBAL DISTRIBUTION
              </span>
            </div>

            {/* HEADLINE */}

            <h1
              className="
                select-none
                font-inter
                text-[clamp(2.8rem,6.2vw,6.2rem)]
                font-extrabold
                uppercase
                leading-[0.86]
                tracking-[-0.06em]
              "
            >
              <span className="hero-line block">
                <span className="text-[#EF2034]">
                  B
                </span>
                RIDGING
              </span>

              <span className="hero-line block">
                <span className="text-[#EF2034]">
                  F
                </span>
                RONTIERS
              </span>

              <span className="hero-line block">
                <span className="text-[#EF2034]">
                  I
                </span>
                NSPIRING
              </span>

              <span className="hero-line block">
                <span>G</span>
                ROWTH
                <span className="text-[#EF2034]">
                  .
                </span>
              </span>
            </h1>

            {/* DESCRIPTION */}

            <div
              className="
                hero-description
                mt-5
                max-w-[470px]
                sm:mt-6
              "
            >
              <div
                className="
                  border-l-2
                  border-[#EF2034]
                  pl-4
                  text-xs
                  leading-relaxed
                  text-white/85
                  sm:text-sm
                  md:text-base
                "
              >
                Connecting quality brands with growing markets.
                <span className="hidden sm:inline">
                  {' '}
                  Creating long-term partnerships through
                  distribution, trust and scale.
                </span>
              </div>
            </div>

            {/* BUTTONS */}

            <div
              className="
                hero-actions
                mt-5
                flex
                flex-wrap
                items-center
                gap-5
                sm:mt-6
              "
            >
              <Link
                to="/contact"
                className="
                  group
                  inline-flex
                  h-11
                  items-center
                  gap-4
                  bg-[#EF2034]
                  px-5
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-white
                  transition-all
                  duration-500
                  ease-out
                  hover:-translate-y-1
                  hover:bg-white
                  hover:text-[#071B35]
                  sm:h-12
                  sm:px-6
                  sm:text-sm
                "
              >
                <span>
                  Wholesale Enquiry
                </span>

                <ArrowDownRight
                  size={16}
                  strokeWidth={1.5}
                  className="
                    transition-transform
                    duration-500
                    ease-out
                    group-hover:translate-x-1
                    group-hover:translate-y-1
                  "
                />
              </Link>

              <a
                href="#products"
                onClick={scrollToProducts}
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  py-2
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-white/80
                  transition-colors
                  duration-500
                  hover:text-white
                  sm:text-sm
                "
              >
                <span>
                  Explore Products
                </span>

                <span
                  className="
                    text-[#EF2034]
                    transition-transform
                    duration-500
                    group-hover:translate-y-1
                  "
                >
                  ↓
                </span>
              </a>
            </div>
          </div>

          {/* =================================================
              RIGHT PRODUCT
          ================================================== */}

          <div
            className="
              relative
              z-20
              lg:col-span-6
              lg:-mr-6
            "
          >
            <div
              className="
                relative
                flex
                min-h-[300px]
                items-center
                justify-center
                sm:min-h-[370px]
                lg:min-h-[480px]
              "
            >
              {/* HALO */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  h-[230px]
                  w-[230px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-white/[0.055]
                  blur-3xl
                  sm:h-[320px]
                  sm:w-[320px]
                  lg:h-[420px]
                  lg:w-[420px]
                "
              />

              {/* RINGS */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  h-[310px]
                  w-[310px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border
                  border-white/[0.07]
                  sm:h-[390px]
                  sm:w-[390px]
                  lg:h-[500px]
                  lg:w-[500px]
                "
                style={{
                  transform: `
                    translate(
                      calc(-50% + ${parallax.x * 10}px),
                      calc(-50% + ${parallax.y * 10}px)
                    )
                  `,
                  transition:
                    'transform 1400ms cubic-bezier(0.16,1,0.3,1)',
                }}
              />

              {/* PRODUCT */}

              <div
                className="
                  relative
                  flex
                  items-center
                  justify-center
                "
                style={{
                  transform: `
                    translate(
                      ${parallax.x * -12}px,
                      ${parallax.y * -12}px
                    )
                  `,
                  transition:
                    'transform 1100ms cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                <div className="hero-product-float">
                  <img
                    src={activeProduct.image}
                    alt={`${activeProduct.brand} ${activeProduct.name}`}
                    draggable="false"
                    className={`
                      h-[285px]
                      w-auto
                      max-w-[75vw]
                      select-none
                      object-contain
                      drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]
                      transition-all
                      duration-[900ms]
                      ease-[cubic-bezier(0.16,1,0.3,1)]
                      sm:h-[350px]
                      md:h-[410px]
                      lg:h-[480px]
                      ${
                        productVisible
                          ? 'translate-y-0 scale-100 opacity-100'
                          : 'translate-y-8 scale-[0.94] opacity-0'
                      }
                    `}
                  />
                </div>

                {/* MOBILE ARROWS */}

                {heroProductsList.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      type="button"
                      aria-label="Previous product"
                      className="
                        absolute
                        left-0
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/15
                        bg-white/[0.04]
                        text-white
                        backdrop-blur-xl
                        sm:hidden
                      "
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <button
                      onClick={handleNext}
                      type="button"
                      aria-label="Next product"
                      className="
                        absolute
                        right-0
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/15
                        bg-white/[0.04]
                        text-white
                        backdrop-blur-xl
                        sm:hidden
                      "
                    >
                      <ChevronRight size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* =================================================
                PRODUCT INFO
            ================================================== */}

            <div
              className="
                flex
                items-end
                justify-between
                border-t
                border-white/10
                pt-2
                sm:pt-3
              "
            >
              <div>
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-white
                    sm:text-sm
                  "
                >
                  {activeProduct.name}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    font-medium
                    uppercase
                    tracking-wider
                    text-white/75
                    sm:text-sm
                  "
                >
                  {activeProduct.brand}
                  {' · '}
                  {Array.isArray(
                    activeProduct.variants
                  )
                    ? activeProduct.variants.join(', ')
                    : '250ml, 500ml'}
                </p>
              </div>

              {heroProductsList.length > 1 && (
                <div className="flex items-center gap-1.5">
                  {heroProductsList.map(
                    (_, index) => (
                      <button
                        key={index}
                        type="button"
                        aria-label={`Slide ${index + 1}`}
                        onClick={() =>
                          changeProduct(index)
                        }
                        className={`
                          h-[2px]
                          rounded-full
                          transition-all
                          duration-700
                          ease-out
                          ${
                            index === safeIndex
                              ? 'w-7 bg-[#EF2034]'
                              : 'w-2 bg-white/40 hover:bg-white/70'
                          }
                        `}
                      />
                    )
                  )}
                </div>
              )}
            </div>

            <div className="mt-2 flex justify-end">
              <a
                href="#products"
                onClick={scrollToProducts}
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-white/70
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                View all products ({products.length}) →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-3
          left-5
          right-5
          hidden
          items-center
          justify-between
          text-xs
          uppercase
          tracking-[0.2em]
          text-white/60
          sm:flex
          lg:left-12
          lg:right-12
          xl:left-16
          xl:right-16
        "
      >
        <span>
          Quality · Markets · Growth
        </span>

        <span>
          Scroll to explore ↓
        </span>
      </div>

      {/* =====================================================
          SMOOTH MOTION
      ====================================================== */}

      <style>{`
        .hero-enter {
          opacity: 0;
          transform: translateY(14px);
          animation:
            heroFadeUp
            800ms
            cubic-bezier(0.16,1,0.3,1)
            100ms
            forwards;
        }

        .hero-line {
          opacity: 0;
          transform: translateY(42px);
          clip-path: inset(0 0 100% 0);
          animation:
            heroLineReveal
            850ms
            cubic-bezier(0.16,1,0.3,1)
            forwards;
        }

        .hero-line:nth-child(1) {
          animation-delay: 120ms;
        }

        .hero-line:nth-child(2) {
          animation-delay: 190ms;
        }

        .hero-line:nth-child(3) {
          animation-delay: 260ms;
        }

        .hero-line:nth-child(4) {
          animation-delay: 330ms;
        }

        .hero-description {
          opacity: 0;
          transform: translateY(15px);
          animation:
            heroFadeUp
            800ms
            cubic-bezier(0.16,1,0.3,1)
            480ms
            forwards;
        }

        .hero-actions {
          opacity: 0;
          transform: translateY(15px);
          animation:
            heroFadeUp
            800ms
            cubic-bezier(0.16,1,0.3,1)
            580ms
            forwards;
        }

        .hero-product-float {
          animation:
            productFloat
            6.5s
            cubic-bezier(0.45,0,0.55,1)
            infinite;
          will-change: transform;
        }

        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroLineReveal {
          from {
            opacity: 0;
            transform: translateY(42px);
            clip-path: inset(0 0 100% 0);
          }

          to {
            opacity: 1;
            transform: translateY(0);
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes productFloat {
          0% {
            transform: translateY(0) rotate(0deg);
          }

          25% {
            transform: translateY(-6px) rotate(0.2deg);
          }

          50% {
            transform: translateY(-11px) rotate(0deg);
          }

          75% {
            transform: translateY(-5px) rotate(-0.2deg);
          }

          100% {
            transform: translateY(0) rotate(0deg);
          }
        }

        @media (max-width: 1023px) {
          .hero-product-float {
            animation-duration: 7s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-enter,
          .hero-line,
          .hero-description,
          .hero-actions {
            animation: none;
            opacity: 1;
            transform: none;
            clip-path: none;
          }

          .hero-product-float {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero
