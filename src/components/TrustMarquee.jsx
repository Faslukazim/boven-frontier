import {
  ShieldCheck,
  Factory,
  Ship,
  Sparkles,
  FileCheck,
  Award,
} from 'lucide-react'

export default function TrustMarquee() {
  const trustPoints = [
    {
      icon: Factory,
      title: 'Manufactured in India',
      subtitle: 'Zero middleman direct factory supply',
    },
    {
      icon: ShieldCheck,
      title: 'ISO 9001:2015 Facility',
      subtitle: 'Strict batch quality control & safety',
    },
    {
      icon: Ship,
      title: 'Palletized Container Shipping',
      subtitle: 'FOB Indian Ports & CIF Jebel Ali / Dammam',
    },
    {
      icon: Sparkles,
      title: 'OEM & Private Label',
      subtitle: 'Custom formulation, fragrance & packaging',
    },
    {
      icon: FileCheck,
      title: 'COA & MSDS Provided',
      subtitle: 'Export clearance compliance documentation',
    },
    {
      icon: Award,
      title: 'Verified Formulation Purity',
      subtitle: 'High active matter & leak-proof caps',
    },
  ]

  return (
    <div className="border-y border-gray-200/70 bg-[#fafaf9] py-8 text-[#172b3f]">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-8">
          {trustPoints.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className={`group flex-col items-center text-center sm:items-start sm:text-left ${
                  index >= 4 ? 'hidden sm:flex' : 'flex'
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-gray-200/80 text-[#b08d2e] shadow-2xs transition-transform duration-300 group-hover:scale-105 group-hover:border-[#b08d2e]">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <h4 className="mt-3 text-xs font-semibold text-[#172b3f]">
                  {item.title}
                </h4>
                <p className="mt-1 text-[11px] leading-relaxed text-gray-500">
                  {item.subtitle}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
