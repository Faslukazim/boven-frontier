import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Plane, Navigation } from 'lucide-react'

function Markets() {
  return (
    <section id="markets" className="relative overflow-hidden bg-[#0c354d] px-6 py-20 text-white sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1600px]">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#EF2034] mb-2">
              Logistics & Distribution
            </p>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
              Manufactured in India. Distributed globally.
            </h2>
          </div>

          <p className="hidden sm:block max-w-md text-xs sm:text-sm leading-relaxed text-white/60">
            Boven Frontier serves pan-India commercial distribution networks and direct containerized ocean freight to GCC wholesale import partners.
          </p>
          <p className="block sm:hidden text-xs leading-relaxed text-white/60">
            Pan-India commercial distribution and direct container ocean freight to GCC markets.
          </p>
        </div>

        {/* =====================================================
            MARKET ROUTE
        ===================================================== */}
        <div className="relative mt-12">
          {/* Middle Route Badge */}
          <div className="hidden lg:flex absolute left-1/2 top-10 -translate-x-1/2 z-20 items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[#104360] px-4 py-1.5 shadow-xl backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#EF2034] animate-pulse" />
              <span className="text-[11px] font-semibold tracking-wide text-white">
                Direct Export Corridor
              </span>
              <Navigation size={12} className="text-[#EF2034] rotate-90" />
            </div>
          </div>

          {/* Route Connecting Line */}
          <div className="hidden lg:block absolute left-[25%] right-[25%] top-10 mt-[14px] h-px bg-gradient-to-r from-transparent via-[#EF2034]/40 to-transparent" />

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-0">
            {/* =================================================
                INDIA (HOME MARKET)
            ================================================= */}
            <div className="group relative rounded-xl lg:rounded-none lg:rounded-l-xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:p-12 transition-colors duration-300 hover:bg-white/[0.04]">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono tracking-wider text-white/40">
                    01
                  </span>

                  <div className="mt-4 sm:mt-6 flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors group-hover:border-[#EF2034]/50">
                    <MapPin
                      size={18}
                      strokeWidth={1.75}
                      className="text-[#EF2034]"
                    />
                  </div>
                </div>

                <div className="text-right">
                  <span className="block text-[11px] font-medium text-white/40 uppercase tracking-wider">
                    Origin Base
                  </span>
                  <span className="block text-xs font-medium text-white/80 mt-0.5">
                    India
                  </span>
                </div>
              </div>

              <h3 className="mt-6 sm:mt-8 text-2xl sm:text-3xl font-semibold tracking-tight text-white group-hover:text-[#EF2034] transition-colors">
                Domestic Supply Network
              </h3>

              <p className="mt-2.5 sm:mt-3 max-w-md text-xs sm:text-sm leading-relaxed text-white/60 line-clamp-2 sm:line-clamp-none">
                Direct factory dispatch across India for wholesale distributors, institutional housekeeping facilities, and commercial supermarket partners.
              </p>

              <div className="mt-6 sm:mt-8 flex items-center gap-2 text-xs text-white/50">
                <span className="h-1 w-1 rounded-full bg-[#EF2034]" />
                <span>Pan-India surface freight & dispatch</span>
              </div>
            </div>

            {/* =================================================
                MIDDLE EAST (EXPORT MARKET)
            ================================================= */}
            <div className="group relative rounded-xl lg:rounded-none lg:rounded-r-xl border border-white/10 lg:border-l-0 bg-white/[0.02] p-6 sm:p-8 lg:p-12 transition-colors duration-300 hover:bg-white/[0.04]">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono tracking-wider text-white/40">
                    02
                  </span>

                  <div className="mt-4 sm:mt-6 flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-[#EF2034]/10 transition-colors group-hover:border-[#EF2034]">
                    <Plane
                      size={18}
                      strokeWidth={1.75}
                      className="text-[#EF2034]"
                    />
                  </div>
                </div>

                <div className="text-right">
                  <span className="block text-[11px] font-medium text-[#EF2034] uppercase tracking-wider">
                    Ocean & Air Freight
                  </span>
                  <span className="block text-xs font-medium text-white/80 mt-0.5">
                    UAE · KSA · Oman · GCC
                  </span>
                </div>
              </div>

              <h3 className="mt-6 sm:mt-8 text-2xl sm:text-3xl font-semibold tracking-tight text-white group-hover:text-[#EF2034] transition-colors">
                Middle East & GCC Export
              </h3>

              <p className="mt-2.5 sm:mt-3 max-w-md text-xs sm:text-sm leading-relaxed text-white/60 line-clamp-2 sm:line-clamp-none">
                High-stability chemical formulations built for tropical climates, packed in palletized export-grade cartons with full COA and shipping documentation.
              </p>

              <div className="mt-6 sm:mt-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs font-medium text-white hover:text-[#EF2034] transition-colors"
                >
                  <span>Inquire for export container pricing</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM STATEMENT
        ===================================================== */}
        <div className="hidden sm:flex mt-10 flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between text-xs text-white/40">
          <p>
            Domestic & International Commercial Trade
          </p>

          <p>
            Manufactured in India · International LLP Reg: ACE-5349
          </p>
        </div>
      </div>
    </section>
  )
}

export default Markets