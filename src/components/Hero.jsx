import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import heroProducts from '../data/heroProducts'

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const activeProduct = heroProducts[activeIndex]

  useEffect(() => {
    if (isPaused || heroProducts.length <= 1) return

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroProducts.length)
    }, 2000)

    return () => clearInterval(timer)
  }, [isPaused])

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

        <div className="flex h-[64px] items-center border-b border-[#172b3f]/10">
          <div className="flex items-center gap-4">
            <span className="h-[5px] w-[5px] rounded-full bg-[#c9a84c]" />

            <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#172b3f]/50">
              Boven Frontier International
            </span>
          </div>
        </div>


        {/* =====================================================
            HERO
        ===================================================== */}

        <div className="relative grid min-h-[calc(100svh-112px)] grid-cols-1 lg:grid-cols-[0.94fr_1.06fr]">


          {/* ===================================================
              LEFT
          =================================================== */}

          <div className="relative z-20 flex flex-col justify-center py-14 lg:py-0">

            {/* Credibility marker */}

            <div className="mb-8 flex items-center gap-3">

              <span className="h-px w-9 bg-[#c9a84c]" />

              <span className="text-[8px] font-semibold uppercase tracking-[0.28em] text-[#172b3f]/40">
                Manufactured in India · Export-ready
              </span>

            </div>


            {/* Headline */}

            <h1
              className="
                hero-title
                max-w-[720px]
                text-[clamp(4rem,7vw,7.2rem)]
                font-medium
                leading-[0.84]
                tracking-[-0.075em]
              "
            >
              <span className="block">
                Cleaning
              </span>

              <span className="block pl-[7vw] lg:pl-[5vw]">
                for
              </span>

              <span className="block pl-[2vw]">
                everywhere.
              </span>
            </h1>


            {/* Description */}

            <div
              className="
                hero-description
                mt-10
                flex
                max-w-[510px]
                items-start
                gap-5
                pl-[7vw]
                lg:mt-12
                lg:pl-[5vw]
              "
            >

              <span className="mt-1 h-[42px] w-px shrink-0 bg-[#c9a84c]" />

              <p className="max-w-[420px] text-[14px] leading-[1.8] tracking-[-0.01em] text-[#172b3f]/55 sm:text-[15px]">
                Everyday cleaning, made dependable.
                <br className="hidden sm:block" />
                Built in India. Ready for everywhere.
              </p>

            </div>


            {/* CTA */}

            <div
              className="
                hero-cta
                mt-9
                pl-[7vw]
                lg:mt-10
                lg:pl-[5vw]
              "
            >

              <a
                href="/products"
                className="group inline-flex items-center gap-4"
              >

                <span className="text-[10px] font-semibold uppercase tracking-[0.23em]">
                  Explore products
                </span>

                <span
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#172b3f]/20
                    transition-all
                    duration-500
                    group-hover:bg-[#172b3f]
                    group-hover:text-white
                  "
                >

                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.5}
                    className="
                      transition-transform
                      duration-500
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                    "
                  />

                </span>

              </a>

            </div>

          </div>


          {/* ===================================================
              RIGHT PRODUCT AREA
          =================================================== */}

          <div
            className="
              relative
              min-h-[560px]
              lg:min-h-0
            "
          >

            {/* 
              IMPORTANT:
              Product stage is positioned relative to the hero,
              not vertically centered against the entire column.
            */}

            <div
              className="
                absolute
                left-1/2
                top-[43%]
                flex
                w-[92%]
                -translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                lg:top-[43%]
              "
            >

              {/* Fixed light stage */}

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[min(34vw,500px)]
                  w-[min(34vw,500px)]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-white
                "
              />


              {/* Product canvas */}

              <div
                key={activeProduct.image}
                className="
                  hero-product-enter
                  relative
                  z-10
                  flex
                  h-[min(54vw,590px)]
                  w-full
                  items-end
                  justify-center
                "
              >

                <img
                  src={activeProduct.image}
                  alt={`${activeProduct.brand} ${activeProduct.name}`}
                  style={{
                    transform: `scale(${activeProduct.scale ?? 1})`,
                  }}
                  className="
                    block
                    h-full
                    w-full
                    object-contain
                    object-center
                    mix-blend-multiply
                    drop-shadow-[0_30px_30px_rgba(23,43,63,0.10)]
                  "
                />

              </div>

            </div>


            {/* =================================================
                PRODUCT INFORMATION
            ================================================= */}

            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                border-t
                border-[#172b3f]/10
                py-5
              "
            >

              <div className="flex items-end justify-between">

                {/* Product name */}

                <div
                  key={`info-${activeIndex}`}
                  className="hero-info-enter"
                >

                  <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.3em] text-[#c9a84c]">
                    {activeProduct.category}
                  </p>

                  <div className="flex items-baseline gap-3">

                    <h2 className="text-[24px] font-medium tracking-[-0.045em]">
                      {activeProduct.name}
                    </h2>

                    <span className="text-[8px] uppercase tracking-[0.25em] text-[#172b3f]/35">
                      {activeProduct.brand}
                    </span>

                  </div>

                </div>


                {/* Counter */}

                <div className="flex items-center gap-5">

                  <span className="text-[9px] tabular-nums tracking-[0.2em] text-[#172b3f]/40">
                    {String(activeIndex + 1).padStart(2, '0')}
                    <span className="mx-1 text-[#172b3f]/20">
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
                        onClick={() => setActiveIndex(index)}
                        className="group flex h-5 items-center"
                      >

                        <span
                          className={`
                            h-[2px]
                            transition-all
                            duration-500
                            ${
                              index === activeIndex
                                ? 'w-7 bg-[#172b3f]'
                                : 'w-2.5 bg-[#172b3f]/15 group-hover:bg-[#172b3f]/40'
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

        </div>


        {/* =====================================================
            BOTTOM INFORMATION
        ===================================================== */}

        <div
          className="
            flex
            h-12
            items-center
            justify-between
            border-t
            border-[#172b3f]/10
          "
        >

          <span className="text-[8px] uppercase tracking-[0.3em] text-[#172b3f]/30">
            Manufactured in India
          </span>

          <span className="text-[8px] uppercase tracking-[0.3em] text-[#172b3f]/30">
            India · Middle East
          </span>

        </div>

      </div>


      {/* =====================================================
          ANIMATION
      ===================================================== */}

      <style>{`

        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }


        @keyframes heroProductEnter {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.985);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }


        @keyframes heroProductFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }
        }


        .hero-title {
          animation:
            heroFadeUp
            1000ms
            cubic-bezier(0.16, 1, 0.3, 1)
            120ms
            both;
        }


        .hero-description {
          animation:
            heroFadeUp
            800ms
            cubic-bezier(0.16, 1, 0.3, 1)
            300ms
            both;
        }


        .hero-cta {
          animation:
            heroFadeUp
            750ms
            cubic-bezier(0.16, 1, 0.3, 1)
            420ms
            both;
        }


        .hero-product-enter {
          animation:
            heroProductEnter
            900ms
            cubic-bezier(0.16, 1, 0.3, 1)
            both;
        }


        .hero-info-enter {
          animation:
            heroFadeUp
            600ms
            cubic-bezier(0.16, 1, 0.3, 1)
            both;
        }


        @media (max-width: 1023px) {

          .hero-product-enter {
            height: min(82vw, 570px);
          }

        }


        @media (max-width: 700px) {

          .hero-product-enter {
            height: min(92vw, 480px);
          }

        }


        @media (prefers-reduced-motion: reduce) {

          .hero-title,
          .hero-description,
          .hero-cta,
          .hero-product-enter,
          .hero-info-enter {
            animation: none;
          }

        }

      `}</style>

    </section>
  )
}

export default Hero