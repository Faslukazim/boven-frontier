import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import heroProducts from '../data/heroProducts'

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [productVisible, setProductVisible] = useState(true)

  const animationFrame = useRef(null)

  const activeProduct = heroProducts[activeIndex]

  /*
   * ------------------------------------------------------------
   * PRODUCT CHANGE
   * ------------------------------------------------------------
   *
   * We deliberately avoid using React "key" to force-remount
   * the image. Safari can occasionally skip or render key-based
   * CSS entrance animations inconsistently.
   *
   * Instead:
   * 1. Fade product out
   * 2. Change product
   * 3. Wait one animation frame
   * 4. Fade product back in
   */

  const changeProduct = (nextIndex) => {
    if (nextIndex === activeIndex) return

    setProductVisible(false)

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current)
    }

    animationFrame.current = requestAnimationFrame(() => {
      setActiveIndex(nextIndex)

      animationFrame.current = requestAnimationFrame(() => {
        setProductVisible(true)
      })
    })
  }

  /*
   * ------------------------------------------------------------
   * AUTO ROTATION
   * ------------------------------------------------------------
   */

  useEffect(() => {
    if (isPaused || heroProducts.length <= 1) return

    const timer = window.setInterval(() => {
      setProductVisible(false)

      window.setTimeout(() => {
        setActiveIndex((current) => {
          return (current + 1) % heroProducts.length
        })

        window.requestAnimationFrame(() => {
          setProductVisible(true)
        })
      }, 180)
    }, 4200)

    return () => {
      window.clearInterval(timer)
    }
  }, [isPaused])

  /*
   * ------------------------------------------------------------
   * CLEANUP
   * ------------------------------------------------------------
   */

  useEffect(() => {
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [])

  return (
    <section
      className="relative overflow-hidden bg-white text-[#172b3f]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14 xl:px-16">

        {/* =====================================================
            TOP BRAND LINE
        ===================================================== */}

        <div className="flex h-[68px] items-center border-b border-[#172b3f]/10">
          <div className="flex items-center gap-3">

            <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#c9a84c]" />

            <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#172b3f]/65">
              Boven Frontier International
            </span>

          </div>
        </div>


        {/* =====================================================
            HERO
        ===================================================== */}

        <div className="grid min-h-[calc(100svh-116px)] grid-cols-1 lg:grid-cols-2">


          {/* ===================================================
              LEFT
          =================================================== */}

          <div className="relative flex flex-col justify-center py-16 lg:py-10">

            <div className="hero-left-content">

              {/* Credibility marker */}

              <div className="hero-eyebrow mb-7 flex items-center gap-3 pl-[7vw] lg:pl-[5vw]">

                <span className="h-px w-8 bg-[#c9a84c]" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#172b3f]/65">
                  Manufactured in India · Export-ready
                </span>

              </div>


              {/* Main headline */}

              <h1 className="hero-title max-w-[760px] text-[clamp(4rem,7vw,7.4rem)] font-medium leading-[0.84] tracking-[-0.075em]">

                <span className="hero-line hero-line-1 block">
                  Cleaning
                </span>

                <span className="hero-line hero-line-2 block pl-[7vw] lg:pl-[5vw]">
                  for
                </span>

                <span className="hero-line hero-line-3 block pl-[2vw]">
                  everywhere.
                </span>

              </h1>


              {/* Description */}

              <div className="hero-description mt-9 flex max-w-[500px] items-start gap-5 pl-[7vw] lg:mt-11 lg:pl-[5vw]">

                <span className="mt-1 h-[42px] w-px shrink-0 bg-[#c9a84c]" />

                <p className="max-w-[410px] text-[14px] leading-[1.75] tracking-[-0.01em] text-[#172b3f]/70 sm:text-[15px]">

                  Everyday cleaning, made dependable.

                  <br className="hidden sm:block" />

                  Built in India. Ready for everywhere.

                </p>

              </div>


              {/* CTA */}

              <div className="hero-cta mt-9 pl-[7vw] lg:mt-10 lg:pl-[5vw]">

                <a
                  href="/products"
                  className="group inline-flex items-center gap-4"
                >

                  <span className="text-[10px] font-semibold uppercase tracking-[0.23em] text-[#172b3f]">
                    Explore products
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#172b3f]/25 transition-all duration-300 group-hover:bg-[#172b3f] group-hover:text-white">

                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />

                  </span>

                </a>

              </div>

            </div>

          </div>


          {/* ===================================================
              RIGHT PRODUCT AREA
          =================================================== */}

          <div className="relative flex min-h-[560px] flex-col justify-center lg:min-h-0 lg:pl-[3vw]">


            {/* =================================================
                PRODUCT STAGE
            ================================================= */}

            <div className="hero-product-stage relative flex min-h-[520px] flex-1 items-center justify-center">

              {/* Fixed background stage */}

              <div className="hero-stage-circle absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f7f7f4]" />


              {/* Subtle center glow */}

              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl" />


              {/* Product canvas */}

              <div
                className={`
                  hero-product-canvas
                  relative
                  z-10
                  flex
                  h-[72%]
                  w-[78%]
                  items-center
                  justify-center
                  ${
                    productVisible
                      ? 'hero-product-visible'
                      : 'hero-product-hidden'
                  }
                `}
              >

                <img
                  src={activeProduct.image}
                  alt={`${activeProduct.brand} ${activeProduct.name}`}
                  draggable="false"
                  style={{
                    transform: `scale(${activeProduct.scale ?? 1})`,
                  }}
                  className="
                    hero-product-image
                    block
                    h-full
                    w-full
                    select-none
                    object-contain
                    object-center
                    mix-blend-multiply
                  "
                />

              </div>


              {/* Ground shadow */}

              <div
                className={`
                  hero-product-shadow
                  pointer-events-none
                  absolute
                  bottom-[12%]
                  left-1/2
                  z-[5]
                  h-5
                  w-[34%]
                  -translate-x-1/2
                  rounded-[50%]
                  bg-[#172b3f]/10
                  blur-xl
                  ${
                    productVisible
                      ? 'hero-shadow-visible'
                      : 'hero-shadow-hidden'
                  }
                `}
              />

            </div>


            {/* =================================================
                PRODUCT INFORMATION
            ================================================= */}

            <div className="flex items-end justify-between border-t border-[#172b3f]/10 py-5">


              {/* Product */}

              <div
                className={`
                  hero-product-info
                  ${
                    productVisible
                      ? 'hero-info-visible'
                      : 'hero-info-hidden'
                  }
                `}
              >

                <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.3em] text-[#b08d2e]">
                  {activeProduct.category}
                </p>

                <div className="flex items-baseline gap-3">

                  <h2 className="text-[24px] font-medium tracking-[-0.045em] text-[#172b3f]">
                    {activeProduct.name}
                  </h2>

                  <span className="text-[8px] font-medium uppercase tracking-[0.25em] text-[#172b3f]/55">
                    {activeProduct.brand}
                  </span>

                </div>

              </div>


              {/* Counter */}

              <div className="flex items-center gap-5">

                <span className="text-[9px] tabular-nums tracking-[0.2em] text-[#172b3f]/55">

                  {String(activeIndex + 1).padStart(2, '0')}

                  <span className="mx-1 text-[#172b3f]/25">
                    /
                  </span>

                  {String(heroProducts.length).padStart(2, '0')}

                </span>


                {/* Progress */}

                <div className="hidden items-center gap-1 sm:flex">

                  {heroProducts.map((product, index) => (

                    <button
                      key={product.image}
                      type="button"
                      aria-label={`Show ${product.brand} ${product.name}`}
                      aria-current={
                        index === activeIndex
                          ? 'true'
                          : undefined
                      }
                      onClick={() => changeProduct(index)}
                      className="group flex h-5 items-center"
                    >

                      <span
                        className={`
                          h-[2px]
                          transition-all
                          duration-300
                          ${
                            index === activeIndex
                              ? 'w-7 bg-[#172b3f]'
                              : 'w-2.5 bg-[#172b3f]/20 group-hover:bg-[#172b3f]/45'
                          }
                        `}
                      />

                    </button>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            BOTTOM LINE
        ===================================================== */}

        <div className="flex h-12 items-center justify-between border-t border-[#172b3f]/10">

          <span className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#172b3f]/50">
            Manufactured in India
          </span>

          <span className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#172b3f]/50">
            India · Middle East
          </span>

        </div>

      </div>


      {/* =====================================================
          ANIMATION
      ===================================================== */}

      <style>{`

        /* =====================================================
           LEFT HERO
        ===================================================== */

        @keyframes heroReveal {
          0% {
            opacity: 0;
            transform: translate3d(0, 18px, 0);
          }

          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }


        .hero-eyebrow {
          opacity: 0;
          animation: heroReveal 600ms cubic-bezier(0.22, 1, 0.36, 1) 80ms forwards;
        }


        .hero-title {
          animation: none;
        }


        .hero-line {
          display: block;
          opacity: 0;
          animation:
            heroReveal
            850ms
            cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }


        .hero-line-1 {
          animation-delay: 160ms;
        }


        .hero-line-2 {
          animation-delay: 230ms;
        }


        .hero-line-3 {
          animation-delay: 300ms;
        }


        .hero-description {
          opacity: 0;
          animation:
            heroReveal
            700ms
            cubic-bezier(0.22, 1, 0.36, 1)
            430ms
            forwards;
        }


        .hero-cta {
          opacity: 0;
          animation:
            heroReveal
            650ms
            cubic-bezier(0.22, 1, 0.36, 1)
            520ms
            forwards;
        }


        /* =====================================================
           PRODUCT STAGE
        ===================================================== */

        .hero-product-stage {
          isolation: isolate;
        }


        .hero-stage-circle {
          transform-origin: center center;
        }


        /* =====================================================
           PRODUCT
        ===================================================== */

        .hero-product-canvas {
          opacity: 1;
          transform:
            translate3d(0, 0, 0)
            scale(1);
          transition:
            opacity 320ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }


        .hero-product-visible {
          opacity: 1;
          transform:
            translate3d(0, 0, 0)
            scale(1);
        }


        .hero-product-hidden {
          opacity: 0;
          transform:
            translate3d(0, 10px, 0)
            scale(0.985);
        }


        .hero-product-image {
          display: block;
          max-height: 100%;
          -webkit-user-drag: none;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }


        /* =====================================================
           GROUND SHADOW
        ===================================================== */

        .hero-product-shadow {
          opacity: 0.65;
          transform:
            translate3d(-50%, 0, 0)
            scale(1);
          transition:
            opacity 350ms ease,
            transform 450ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform;
        }


        .hero-shadow-visible {
          opacity: 0.65;
          transform:
            translate3d(-50%, 0, 0)
            scale(1);
        }


        .hero-shadow-hidden {
          opacity: 0;
          transform:
            translate3d(-50%, 2px, 0)
            scale(0.85);
        }


        /* =====================================================
           PRODUCT INFORMATION
        ===================================================== */

        .hero-product-info {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transition:
            opacity 220ms ease,
            transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform;
        }


        .hero-info-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }


        .hero-info-hidden {
          opacity: 0;
          transform: translate3d(0, 5px, 0);
        }


        /* =====================================================
           SAFARI / IOS
        ===================================================== */

        @supports (-webkit-touch-callout: none) {

          .hero-product-canvas,
          .hero-product-image,
          .hero-product-shadow {
            -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
          }

          .hero-product-image {
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }

        }


        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {

          .hero-eyebrow,
          .hero-line,
          .hero-description,
          .hero-cta {
            opacity: 1;
            animation: none;
            transform: none;
          }

          .hero-product-canvas,
          .hero-product-shadow,
          .hero-product-info {
            transition: none;
            transform: none;
          }

        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 1023px) {

          .hero-product-stage {
            min-height: 500px;
          }

          .hero-stage-circle {
            height: 78%;
            width: 82%;
          }

          .hero-product-canvas {
            height: 78%;
            width: 84%;
          }

        }


        @media (max-width: 640px) {

          .hero-product-stage {
            min-height: 430px;
          }

          .hero-stage-circle {
            height: 76%;
            width: 92%;
          }

          .hero-product-canvas {
            height: 76%;
            width: 92%;
          }

          .hero-product-shadow {
            bottom: 9%;
            width: 42%;
          }

        }

      `}</style>

    </section>
  )
}

export default Hero