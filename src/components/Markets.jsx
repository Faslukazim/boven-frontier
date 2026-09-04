import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Plane } from 'lucide-react'

function Markets() {
  return (
    <section className="relative overflow-hidden bg-[#172b3f] px-5 py-16 sm:py-24 text-white sm:px-10 lg:px-14">
      <div className="mx-auto max-w-[1500px]">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#c9a84c] mb-1.5">
              Distribution Corridors
            </p>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
              Domestic & Global Dispatch.
            </h2>
          </div>

          <p className="max-w-xs text-xs text-white/50 leading-relaxed">
            Direct surface supply across India and container ocean freight to GCC markets.
          </p>
        </div>

        {/* =====================================================
            MARKET CARDS
        ===================================================== */}
        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          {/* INDIA */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-[#c9a84c]">
                <MapPin size={18} />
              </div>
              <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">
                Origin: India
              </span>
            </div>

            <h3 className="mt-6 text-xl sm:text-2xl font-medium text-white">
              Pan-India Distribution
            </h3>

            <p className="mt-2 text-xs text-white/60 leading-relaxed">
              Fast dispatch for FMCG distributors, supermarkets, and institutional facilities.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs text-white/40">
              <span className="h-1 w-1 rounded-full bg-[#c9a84c]" />
              <span>Nationwide surface logistics</span>
            </div>
          </div>

          {/* MIDDLE EAST */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#c9a84c]/10 text-[#c9a84c]">
                <Plane size={18} />
              </div>
              <span className="text-[11px] font-medium text-[#c9a84c] uppercase tracking-wider">
                FCL / Sea Freight
              </span>
            </div>

            <h3 className="mt-6 text-xl sm:text-2xl font-medium text-white">
              GCC & Export Trade
            </h3>

            <p className="mt-2 text-xs text-white/60 leading-relaxed">
              Container-load shipping to UAE, Saudi Arabia, Oman, and international ports with full COA documentation.
            </p>

            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-[#c9a84c] transition-colors"
              >
                <span>Request container export quote</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Markets