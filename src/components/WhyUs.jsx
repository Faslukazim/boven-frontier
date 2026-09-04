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
    text: 'Source directly from our automated blending and bottling facility in India. Enjoy pure factory-level pricing that protects your wholesale and retail margins.',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Contract OEM & Private Label',
    subtitle: 'Custom formulation & bottling',
    text: 'We manufacture tailored formulations matching your required surfactant concentration, viscosity, and proprietary fragrance profiles with custom branded labels.',
  },
  {
    number: '03',
    icon: Ship,
    title: 'Container-Load Logistics',
    subtitle: 'Palletized 20ft / 40ft FCL',
    text: 'Strategically located for Cochin Port dispatch to GCC trade hubs including Jebel Ali (Dubai), Dammam, and Muscat with complete customs and bill of lading documentation.',
  },
  {
    number: '04',
    icon: ShieldCheck,
    title: 'Certified Formulation Quality',
    subtitle: 'Induction sealed & lab tested',
    text: 'Every batch is quality verified for pH balance and active matter. All bottles feature induction heat-sealed foil liners to ensure zero transit leakage during ocean shipping.',
  },
]

function WhyUs() {
  const sectionRef = useScrollReveal()

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-6 py-20 sm:px-10 lg:px-16 lg:py-28 border-t border-[#172b3f]/10"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="grid gap-10 lg:grid-cols-12 reveal-on-scroll">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="h-[5px] w-[5px] rounded-full bg-[#c9a84c] animate-ping" />
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#c9a84c]">
                The Boven Wholesale Advantage
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-5">
            <h2 className="max-w-[850px] text-[clamp(2.4rem,4.8vw,5rem)] font-bold leading-[0.94] tracking-[-0.05em] text-[#172b3f]">
              Direct manufacturing.
              <br />
              <span className="text-[#c9a84c]">
                Dependable wholesale scale.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#172b3f]/70 sm:text-[15px]">
              Whether you are stocking regional supermarket shelves or importing full shipping containers into the Gulf, Boven Frontier delivers consistency, compliance, and competitive factory pricing.
            </p>
          </div>
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