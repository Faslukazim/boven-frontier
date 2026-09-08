import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        background: 'linear-gradient(115deg, #3E1E5D 0%, #2A2756 45%, #1B2F62 100%)',
      }}
    >
      {/* Subtle radial ambient light behind the product bottles */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] lg:w-[650px] h-[300px] sm:h-[500px] lg:h-[650px] rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(27,47,98,0) 70%)',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1560px] px-5 sm:px-10 lg:px-16 xl:px-20 py-8 sm:py-14 lg:py-16 xl:py-20 min-h-[calc(100vh-74px)] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 w-full">
          
          {/* LEFT: MAJESTIC EDITORIAL HEADLINE, ACTIONS, & TAGLINE */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            {/* Acronym stylized BFI Headline */}
            <h1
              className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.75rem] font-bold tracking-[0.02em] leading-[1.06] text-white select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
            >
              <span className="block">
                <span className="text-[#EF2034]">B</span>RIDGING
              </span>
              <span className="block">
                <span className="text-[#EF2034]">F</span>RONTIERS
              </span>
              <span className="block">
                <span className="text-[#EF2034]">I</span>NSPIRING
              </span>
              <span className="block text-white">
                GROWTH
              </span>
            </h1>

            {/* Action Links: EXPLORE PRODUCTS & WHOLESALE ENQUIRY */}
            <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-row items-center gap-6 sm:gap-10 lg:gap-14">
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

            {/* Gold Cursive Script Tagline */}
            <div className="mt-8 sm:mt-12 lg:mt-18">
              <p
                className="font-script text-xl sm:text-2xl lg:text-[1.85rem] xl:text-[2.15rem] text-[#e5b741] font-normal leading-relaxed tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] whitespace-normal lg:whitespace-nowrap"
              >
                Connecting Quality. <br className="block sm:hidden" />
                Creating Markets. <br className="block sm:hidden" />
                Growing Together.
              </p>
            </div>
          </div>

          {/* RIGHT: LEXONE BOTTLES STAGE */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end z-10 py-4 lg:py-0">
            <div className="relative flex items-center justify-center">
              <img
                src="/assets/products/LexoneBathroomcleaner.png"
                alt="LexOne Bathroom Cleaner Bottles 500ml and 250ml"
                className="h-[280px] sm:h-[400px] md:h-[460px] lg:h-[500px] xl:h-[560px] w-auto max-w-full object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.55)] select-none transition-transform duration-500 hover:scale-[1.02]"
                draggable="false"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
