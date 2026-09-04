import {
  ShieldCheck,
  Factory,
  Ship,
  Sparkles,
} from 'lucide-react'

export default function TrustMarquee() {
  const trustPoints = [
    {
      icon: Factory,
      title: 'Direct Factory Supply',
      subtitle: 'Zero middleman markups',
    },
    {
      icon: ShieldCheck,
      title: 'ISO 9001 Quality',
      subtitle: 'Batch verified & COA certified',
    },
    {
      icon: Ship,
      title: 'Container Shipping',
      subtitle: 'FOB Indian Ports & CIF GCC',
    },
    {
      icon: Sparkles,
      title: 'OEM & Private Label',
      subtitle: 'Custom formulation & bottling',
    },
  ]

  return (
    <div className="border-y border-gray-100 bg-[#fafaf8] py-6 sm:py-8 text-[#172b3f]">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-14">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {trustPoints.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="flex items-center gap-3 sm:gap-3.5 p-2 rounded-lg"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white border border-gray-200/70 text-[#b08d2e] shadow-2xs">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#172b3f]">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 truncate sm:whitespace-normal">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
