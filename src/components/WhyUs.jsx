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
    text: 'Direct supply from our plant in India with protected distributor pricing.',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Contract OEM & Private Label',
    subtitle: 'Custom formulation & bottling',
    text: 'Tailored active matter, viscosity, fragrance profiles, and custom branded labels.',
  },
  {
    number: '03',
    icon: Ship,
    title: 'Container Shipping (FCL)',
    subtitle: 'Palletized ocean freight',
    text: 'Direct seaport dispatch from India to GCC hubs with complete bill of lading documentation.',
  },
  {
    number: '04',
    icon: ShieldCheck,
    title: 'Transit-Proof Packaging',
    subtitle: 'Induction sealed & tested',
    text: 'Induction heat-sealed foil liners on all bottles to guarantee zero leakage during shipping.',
  },
]

function WhyUs() {
  const sectionRef = useScrollReveal()

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-5 py-16 sm:py-24 sm:px-10 lg:px-14 border-t border-gray-100"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-gray-100 reveal-on-scroll">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#b08d2e] mb-1.5">
              Wholesale Advantage
            </p>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#172b3f]">
              Direct Manufacturing. Wholesale Scale.
            </h2>
          </div>

          <p className="max-w-xs text-xs text-gray-500 leading-relaxed">
            Reliable supply chain, verified chemical purity, and export compliance.
          </p>
        </div>

        {/* =====================================================
            B2B ADVANTAGE GRID (SHOPIFY B2B STYLE)
        ===================================================== */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wholesalePillars.map((item, idx) => {
            const Icon = item.icon
            const staggerClass = `stagger-${idx + 1}`

            return (
              <div
                key={item.number}
                className={`reveal-on-scroll ${staggerClass} group flex flex-col justify-between rounded-xl border border-gray-200/80 bg-[#fbfbf9] p-6 transition-all duration-300 hover:bg-white hover:border-[#c9a84c]/50 hover:shadow-lg`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white border border-gray-200 text-[#172b3f] shadow-2xs transition-transform duration-300 group-hover:scale-110 group-hover:border-[#c9a84c] group-hover:text-[#c9a84c]">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>

                    <span className="text-xs font-bold tabular-nums tracking-wider text-[#172b3f]/30 group-hover:text-[#c9a84c]">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-base font-bold tracking-tight text-[#172b3f] group-hover:text-[#c9a84c] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-[#b08d2e]">
                    {item.subtitle}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-[#172b3f]/65">
                    {item.text}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#172b3f]/60 group-hover:text-[#172b3f]">
                  <CheckCircle2 size={13} className="text-emerald-600" />
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