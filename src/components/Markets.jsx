import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Plane, Navigation } from 'lucide-react'

function Markets() {
  return (
    <section className="relative overflow-hidden bg-[#172b3f] px-6 py-20 text-white sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1600px]">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#c9a84c] mb-2">
              Logistics & Distribution
            </p>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
              Manufactured in India. Distributed globally.
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm leading-relaxed text-white/60">
            Boven Frontier serves pan-India commercial distribution networks and direct containerized ocean freight to GCC wholesale import partners.
          </p>
        </div>

        {/* =====================================================
            MARKET ROUTE
        ===================================================== */}
        <div className="relative mt-12">
          {/* Middle Route Badge */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-[#122334]/90 px-4 py-1.5 shadow-xl backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c9a84c]" />
              <span className="text-[11px] font-medium tracking-wide text-white/90">
                Direct Export Corridor
              </span>
              <Navigation size={12} className="text-[#c9a84c] rotate-90" />
            </div>
          </div>

          {/* Route Connecting Line */}
          <div className="hidden lg:block absolute left-[20%] right-[20%] top-1/2 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-0">
            {/* =================================================
                INDIA (HOME MARKET)
            ================================================= */}
            <div className="group relative rounded-xl lg:rounded-none lg:rounded-l-xl border border-white/10 bg-white/[0.02] p-8 lg:p-12 transition-colors duration-300 hover:bg-white/[0.04]">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono tracking-wider text-white/40">
                    01
                  </span>

                  <div className="mt-6 flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors group-hover:border-[#c9a84c]/50">
                    <MapPin
                      size={18}
                      strokeWidth={1.75}
                      className="text-[#c9a84c]"
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

              <h3 className="mt-8 text-2xl sm:text-3xl font-semibold tracking-tight text-white group-hover:text-[#c9a84c] transition-colors">
                Domestic Supply Network
              </h3>

              <p className="mt-3 max-w-md text-xs sm:text-sm leading-relaxed text-white/60">
                Direct factory dispatch across India for wholesale distributors, institutional housekeeping facilities, and commercial supermarket partners.
              </p>

              <div className="mt-8 flex items-center gap-2 text-xs text-white/50">
                <span className="h-1 w-1 rounded-full bg-[#c9a84c]" />
                <span>Pan-India surface freight & dispatch</span>
              </div>
            </div>

            {/* =================================================
                MIDDLE EAST (EXPORT MARKET)
            ================================================= */}
            <div className="group relative rounded-xl lg:rounded-none lg:rounded-r-xl border border-white/10 lg:border-l-0 bg-white/[0.02] p-8 lg:p-12 transition-colors duration-300 hover:bg-white/[0.04]">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono tracking-wider text-white/40">
                    02
                  </span>

                  <div className="mt-6 flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-[#c9a84c]/10 transition-colors group-hover:border-[#c9a84c]">
                    <Plane
                      size={18}
                      strokeWidth={1.75}
                      className="text-[#c9a84c]"
                    />
                  </div>
                </div>

                <div className="text-right">
                  <span className="block text-[11px] font-medium text-[#c9a84c] uppercase tracking-wider">
                    Ocean & Air Freight
                  </span>
                  <span className="block text-xs font-medium text-white/80 mt-0.5">
                    UAE · KSA · Oman · GCC
                  </span>
                </div>
              </div>

              <h3 className="mt-8 text-2xl sm:text-3xl font-semibold tracking-tight text-white group-hover:text-[#c9a84c] transition-colors">
                Middle East & GCC Export
              </h3>

              <p className="mt-3 max-w-md text-xs sm:text-sm leading-relaxed text-white/60">
                High-stability chemical formulations built for tropical climates, packed in palletized export-grade cartons with full COA and shipping documentation.
              </p>

              <div className="mt-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs font-medium text-white hover:text-[#c9a84c] transition-colors"
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
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between text-xs text-white/40">
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