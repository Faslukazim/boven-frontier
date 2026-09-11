import {
  Factory,
  Sparkles,
  Ship,
  ShieldCheck,
} from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const wholesalePillars = [
  { number: '01', icon: Factory, title: 'Direct Factory Margins', text: 'Direct factory pricing from automated blending and bottling lines in India.' },
  { number: '02', icon: Sparkles, title: 'OEM & Private Label', text: 'Custom formulations, viscosities, fragrances, and packaging for your market.' },
  { number: '03', icon: Ship, title: 'Container Logistics', text: 'Palletized 20ft / 40ft FCL dispatch to major international ports.' },
  { number: '04', icon: ShieldCheck, title: 'Certified Quality', text: 'Lab-tested formulations, active matter control, and secure sealed packaging.' },
]

function WhyUs() {
  const sectionRef = useScrollReveal()

  return (
    <section id="why-us" ref={sectionRef} className="relative overflow-hidden border-t border-[#104360]/10 bg-white px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-5 border-b border-gray-100 pb-8 md:flex-row md:items-end md:justify-between reveal-on-scroll">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#EF2034]">Why Boven</p>
            <h2 className="max-w-2xl text-3xl font-medium tracking-tight text-[#104360] sm:text-4xl lg:text-5xl">
              Built to move product.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-gray-500">
            Factory-direct supply, flexible production, and export-ready logistics.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 border-y border-gray-200/80 sm:grid-cols-2 lg:grid-cols-4">
          {wholesalePillars.map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={item.number} className={`reveal-on-scroll stagger-${idx + 1} group border-b border-gray-200/80 p-6 last:border-b-0 sm:border-r sm:p-7 lg:border-b-0 lg:border-r lg:p-8 lg:last:border-r-0`}>
                <div className="flex items-center justify-between">
                  <Icon size={21} strokeWidth={1.6} className="text-[#EF2034]" />
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#104360]/35">{item.number}</span>
                </div>
                <h3 className="mt-8 text-base font-semibold tracking-tight text-[#104360] sm:text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyUs