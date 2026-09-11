import {
  Factory,
  Sparkles,
  Ship,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const wholesalePillars = [
  {
    number: '01',
    icon: Factory,
    title: 'Direct Factory Margins',
    subtitle: 'Zero middleman markups',
    text: 'Direct factory pricing from automated blending & bottling lines in India.',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Contract OEM & Private Label',
    subtitle: 'Custom formulation & bottling',
    text: 'Tailored surfactant active matter, custom viscosities, and private label packaging.',
  },
  {
    number: '03',
    icon: Ship,
    title: 'Container-Load Logistics',
    subtitle: 'Palletized 20ft / 40ft FCL',
    text: 'Palletized container dispatch to Jebel Ali, Dammam, and international ports.',
  },
  {
    number: '04',
    icon: ShieldCheck,
    title: 'Certified Formulation Quality',
    subtitle: 'Induction sealed & lab tested',
    text: 'pH-tested active matter formulations with leak-proof induction heat foil seals.',
  },
]

function WhyUs() {
  const sectionRef = useScrollReveal()

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-6 py-20 sm:px-10 lg:px-16 lg:py-28 border-t border-[#104360]/10"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-gray-100 reveal-on-scroll">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#EF2034] mb-2">
              Wholesale Advantage
            </p>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#104360]">
              Direct manufacturing. Dependable wholesale scale.
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-gray-600 leading-relaxed">
            Consistent formulations, export compliance, and direct factory pricing.
          </p>
        </div>

        {/* =====================================================
            B2B ADVANTAGE GRID (SHOPIFY B2B STYLE)
        ===================================================== */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {wholesalePillars.map((item, idx) => {
            const Icon = item.icon
            const staggerClass = `stagger-${idx + 1}`

            return (
              <div
                key={item.number}
                className={`reveal-on-scroll ${staggerClass} group flex flex-col justify-between rounded-xl border border-gray-200/80 bg-[#F8FAFC] p-5 sm:p-6 transition-all duration-300 hover:bg-white hover:border-[#EF2034]/40 hover:shadow-lg`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-white border border-gray-200 text-[#104360] shadow-2xs transition-transform duration-300 group-hover:scale-110 group-hover:border-[#EF2034] group-hover:text-[#EF2034]">
                      <Icon size={20} strokeWidth={1.75} />
                    </div>

                    <span className="text-xs sm:text-sm font-bold tabular-nums tracking-wider text-[#104360]/50 group-hover:text-[#EF2034]">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-5 sm:mt-6 text-base sm:text-lg font-bold tracking-tight text-[#104360] group-hover:text-[#EF2034] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#EF2034]">
                    {item.subtitle}
                  </p>

                  <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed text-gray-600 line-clamp-3 sm:line-clamp-none">
                    {item.text}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#104360]/80 group-hover:text-[#104360]">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  <span>Guaranteed SLA</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyUs