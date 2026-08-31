import { ArrowUpRight, MapPin, Plane } from 'lucide-react'

function Markets() {
  return (
    <section className="relative overflow-hidden bg-[#172b3f] px-6 py-24 text-white sm:px-10 lg:px-16 lg:py-32">

      <div className="mx-auto max-w-[1600px]">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="grid gap-10 lg:grid-cols-12">

          {/* Label */}

          <div className="lg:col-span-4">

            <div className="flex items-center gap-3">

              <span className="h-[5px] w-[5px] rounded-full bg-[#c9a84c]" />

              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/40">
                Markets
              </p>

            </div>

          </div>


          {/* Heading */}

          <div className="lg:col-span-7 lg:col-start-5">

            <h2 className="max-w-[850px] text-[clamp(3rem,5.5vw,6rem)] font-medium leading-[0.9] tracking-[-0.065em]">

              Made in India.
              <br />

              <span className="ml-[5vw] text-white/45">
                Ready for beyond.
              </span>

            </h2>

            <p className="mt-8 max-w-xl text-[14px] leading-7 text-white/50 sm:text-[15px]">
              Boven Frontier is positioned to serve cleaning-product
              requirements across its home market and international
              destinations.
            </p>

          </div>

        </div>


        {/* =====================================================
            MARKET ROUTE
        ===================================================== */}

        <div className="relative mt-20 border-t border-white/10">

          {/* Route line */}

          <div className="hidden lg:block absolute left-[25%] right-[25%] top-1/2 h-px bg-white/10">

            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a84c]" />

          </div>


          <div className="grid lg:grid-cols-2">


            {/* =================================================
                INDIA
            ================================================= */}

            <div className="relative border-b border-white/10 py-12 lg:border-b-0 lg:border-r lg:pr-16 lg:py-16">

              <div className="flex items-start justify-between">

                <div>

                  <span className="text-[9px] tabular-nums tracking-[0.25em] text-white/25">
                    01
                  </span>

                  <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/10">

                    <MapPin
                      size={18}
                      strokeWidth={1.4}
                      className="text-[#c9a84c]"
                    />

                  </div>

                </div>


                <span className="text-[8px] uppercase tracking-[0.25em] text-white/25">
                  Home Market
                </span>

              </div>


              <h3 className="mt-10 text-[clamp(2.2rem,4vw,4rem)] font-medium tracking-[-0.055em]">
                India
              </h3>


              <p className="mt-5 max-w-md text-[13px] leading-6 text-white/45 sm:text-[14px]">
                Manufactured in Kerala for the Indian market,
                across retail, institutional and distribution
                requirements.
              </p>


              <div className="mt-8 flex items-center gap-3">

                <span className="h-px w-8 bg-[#c9a84c]" />

                <span className="text-[8px] uppercase tracking-[0.25em] text-white/35">
                  Kerala · India
                </span>

              </div>

            </div>


            {/* =================================================
                MIDDLE EAST
            ================================================= */}

            <div className="relative py-12 lg:pl-16 lg:py-16">

              <div className="flex items-start justify-between">

                <div>

                  <span className="text-[9px] tabular-nums tracking-[0.25em] text-white/25">
                    02
                  </span>

                  <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a84c]/30">

                    <Plane
                      size={18}
                      strokeWidth={1.4}
                      className="text-[#c9a84c]"
                    />

                  </div>

                </div>


                <span className="text-[8px] uppercase tracking-[0.25em] text-[#c9a84c]/70">
                  Export Market
                </span>

              </div>


              <h3 className="mt-10 text-[clamp(2.2rem,4vw,4rem)] font-medium tracking-[-0.055em]">
                Middle East
              </h3>


              <p className="mt-5 max-w-md text-[13px] leading-6 text-white/45 sm:text-[14px]">
                Products positioned for Gulf and Middle Eastern
                markets, with export enquiries handled directly
                by the business.
              </p>


              <a
                href="/contact"
                className="group mt-8 inline-flex items-center gap-4"
              >

                <span className="text-[9px] font-semibold uppercase tracking-[0.22em]">
                  Export enquiry
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-[#c9a84c] group-hover:bg-[#c9a84c] group-hover:text-[#172b3f]">

                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />

                </span>

              </a>

            </div>

          </div>

        </div>


        {/* =====================================================
            BOTTOM STATEMENT
        ===================================================== */}

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
            India
            <span className="mx-2 text-[#c9a84c]">→</span>
            Middle East
          </p>

          <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
            Manufactured in Kerala
          </p>

        </div>

      </div>

    </section>
  )
}

export default Markets