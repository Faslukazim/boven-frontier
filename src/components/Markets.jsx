import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Plane, Navigation } from 'lucide-react'

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
              <span className="h-[5px] w-[5px] rounded-full bg-[#c9a84c] animate-ping" />
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/40">
                Logistics & Distribution
              </p>
            </div>
          </div>

          {/* Heading */}
          <div className="lg:col-span-7 lg:col-start-5">
            <h2 className="max-w-[850px] text-[clamp(3rem,5.5vw,6rem)] font-medium leading-[0.9] tracking-[-0.06em]">
              Made in India.
              <br />
              <span className="ml-[5vw] text-white/45">
                Ready for beyond.
              </span>
            </h2>

            <p className="mt-8 max-w-xl text-[14px] leading-7 text-white/50 sm:text-[15px]">
              Boven Frontier is engineered to serve bulk and retail cleaning requirements across pan-India distribution chains and direct seaport shipments to GCC markets.
            </p>
          </div>
        </div>

        {/* =====================================================
            MARKET ROUTE
        ===================================================== */}
        <div className="relative mt-20 border-t border-white/10">
          {/* Middle Route Badge / Trajectory Indicator */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 rounded-full border border-[#c9a84c]/40 bg-[#122334] px-4 py-1.5 shadow-xl backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c9a84c] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c9a84c]" />
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#c9a84c]">
                Direct Export Corridor
              </span>
              <Navigation size={12} className="text-[#c9a84c] rotate-90" />
            </div>
          </div>

          {/* Route Connecting Line */}
          <div className="hidden lg:block absolute left-[20%] right-[20%] top-1/2 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />

          <div className="grid lg:grid-cols-2">
            {/* =================================================
                INDIA (HOME MARKET)
            ================================================= */}
            <div className="group relative border-b border-white/10 py-12 lg:border-b-0 lg:border-r lg:pr-16 lg:py-16 transition-colors duration-500 hover:bg-white/[0.02]">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[9px] tabular-nums tracking-[0.25em] text-white/25">
                    01
                  </span>

                  <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:border-[#c9a84c] group-hover:scale-105">
                    <MapPin
                      size={18}
                      strokeWidth={1.4}
                      className="text-[#c9a84c]"
                    />
                  </div>
                </div>

                <div className="text-right">
                  <span className="block text-[8px] uppercase tracking-[0.25em] text-white/25">
                    Origin Base
                  </span>
                  <span className="block text-[9px] tracking-wider text-white/40 mt-1 font-mono">
                    India
                  </span>
                </div>
              </div>

              <h3 className="mt-10 text-[clamp(2.2rem,4vw,4rem)] font-medium tracking-[-0.055em] group-hover:text-[#c9a84c] transition-colors">
                India
              </h3>

              <p className="mt-5 max-w-md text-[13px] leading-6 text-white/45 sm:text-[14px]">
                Manufactured in India for nationwide retail networks, supplying wholesale traders and institutional facilities.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <span className="h-px w-8 bg-[#c9a84c]" />
                <span className="text-[8px] uppercase tracking-[0.25em] text-white/40">
                  India Production & Export Base
                </span>
              </div>
            </div>

            {/* =================================================
                MIDDLE EAST (EXPORT MARKET)
            ================================================= */}
            <div className="group relative py-12 lg:pl-16 lg:py-16 transition-colors duration-500 hover:bg-white/[0.02]">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[9px] tabular-nums tracking-[0.25em] text-white/25">
                    02
                  </span>

                  <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 transition-all duration-300 group-hover:border-[#c9a84c] group-hover:scale-105">
                    <Plane
                      size={18}
                      strokeWidth={1.4}
                      className="text-[#c9a84c]"
                    />
                  </div>
                </div>

                <div className="text-right">
                  <span className="block text-[8px] uppercase tracking-[0.25em] text-[#c9a84c]/80 font-semibold">
                    Seaport & Air Freight
                  </span>
                  <span className="block text-[9px] tracking-wider text-white/40 mt-1 font-mono">
                    UAE · KSA · GCC
                  </span>
                </div>
              </div>

              <h3 className="mt-10 text-[clamp(2.2rem,4vw,4rem)] font-medium tracking-[-0.055em] group-hover:text-[#c9a84c] transition-colors">
                Middle East
              </h3>

              <p className="mt-5 max-w-md text-[13px] leading-6 text-white/45 sm:text-[14px]">
                Products formulated to withstand Gulf climate conditions with container-grade export packaging. Direct bilateral trade queries managed by our export desk.
              </p>

              <Link
                to="/contact"
                className="group mt-8 inline-flex items-center gap-4"
              >
                <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white group-hover:text-[#c9a84c] transition-colors">
                  Export enquiry
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-[#c9a84c] group-hover:bg-[#c9a84c] group-hover:text-[#172b3f]">
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
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
            Manufactured in India
          </p>
        </div>
      </div>
    </section>
  )
}

export default Markets