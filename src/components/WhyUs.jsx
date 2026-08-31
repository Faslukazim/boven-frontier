import {
  ShieldCheck,
  Globe2,
  Package,
  CheckCircle2,
} from 'lucide-react'

const items = [
  {
    number: '01',
    icon: ShieldCheck,
    title: 'Manufacturer-direct',
    text: 'An India-based cleaning-products manufacturer serving retail, institutional and export requirements.',
  },
  {
    number: '02',
    icon: Globe2,
    title: 'India · Middle East',
    text: 'Manufactured in Kerala with a product portfolio positioned for domestic and Gulf markets.',
  },
  {
    number: '03',
    icon: Package,
    title: 'Multiple product categories',
    text: 'A growing range of powders, liquids and cleaning solutions across multiple brands and SKUs.',
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'Traceable products',
    text: 'Barcoded products and documented product information designed to support professional distribution.',
  },
]

function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 sm:px-10 lg:px-16 lg:py-32">

      <div className="mx-auto max-w-[1600px]">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="grid gap-10 lg:grid-cols-12">

          <div className="lg:col-span-4">

            <div className="flex items-center gap-3">

              <span className="h-[5px] w-[5px] rounded-full bg-[#c9a84c]" />

              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#172b3f]/45">
                Why Boven Frontier
              </p>

            </div>

          </div>


          <div className="lg:col-span-7 lg:col-start-5">

            <h2 className="max-w-[850px] text-[clamp(2.8rem,5.5vw,6rem)] font-medium leading-[0.9] tracking-[-0.065em] text-[#172b3f]">

              Built for
              <br />

              <span className="ml-[5vw]">
                everyday demand.
              </span>

            </h2>

            <p className="mt-8 max-w-xl text-[14px] leading-7 tracking-[-0.01em] text-[#172b3f]/55 sm:text-[15px]">

              From Kerala to markets beyond India, Boven Frontier
              brings together multiple cleaning brands and product
              categories under one manufacturing partner.

            </p>

          </div>

        </div>


        {/* =====================================================
            CREDIBILITY GRID
        ===================================================== */}

        <div className="mt-20 border-t border-[#172b3f]/10">

          {items.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.number}
                className="
                  group
                  grid
                  gap-6
                  border-b
                  border-[#172b3f]/10
                  py-8
                  transition-colors
                  duration-500
                  lg:grid-cols-12
                  lg:items-center
                  lg:py-10
                  hover:bg-[#f8f7f3]
                "
              >

                {/* Number */}

                <div className="lg:col-span-1">

                  <span className="text-[9px] font-medium tabular-nums tracking-[0.2em] text-[#172b3f]/30">
                    {item.number}
                  </span>

                </div>


                {/* Icon */}

                <div className="lg:col-span-1">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#172b3f]/10 text-[#172b3f]/65 transition-all duration-500 group-hover:border-[#c9a84c] group-hover:text-[#c9a84c]">

                    <Icon
                      size={17}
                      strokeWidth={1.4}
                    />

                  </div>

                </div>


                {/* Title */}

                <div className="lg:col-span-3">

                  <h3 className="text-[16px] font-medium tracking-[-0.025em] text-[#172b3f] sm:text-[18px]">

                    {item.title}

                  </h3>

                </div>


                {/* Description */}

                <div className="lg:col-span-6 lg:col-start-7">

                  <p className="max-w-lg text-[13px] leading-6 text-[#172b3f]/50 sm:text-[14px]">

                    {item.text}

                  </p>

                </div>

              </div>
            )
          })}

        </div>


        {/* =====================================================
            BOTTOM STATEMENT
        ===================================================== */}

        <div className="mt-16 flex flex-col gap-6 border-t border-[#172b3f]/10 pt-8 sm:flex-row sm:items-center sm:justify-between">

          <p className="max-w-md text-[10px] uppercase leading-5 tracking-[0.22em] text-[#172b3f]/35">

            Manufactured in
            <span className="mx-2 text-[#c9a84c]">·</span>
            Kerala
            <span className="mx-2 text-[#c9a84c]">·</span>
            India

          </p>


          <p className="text-[10px] uppercase tracking-[0.22em] text-[#172b3f]/35">

            India
            <span className="mx-2 text-[#c9a84c]">·</span>
            Middle East

          </p>

        </div>

      </div>

    </section>
  )
}

export default WhyUs