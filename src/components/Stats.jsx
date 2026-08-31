function Stats() {
  const stats = [
    ['03', 'Consumer Brands'],
    ['14', 'Current SKUs'],
    ['02', 'Core Markets'],
    ['01', 'Manufacturing Partner'],
  ]

  return (
    <section className="relative overflow-hidden bg-[#172b3f] px-6 py-20 text-white sm:px-10 lg:px-16 lg:py-24">

      <div className="mx-auto max-w-[1600px]">

        {/* =====================================================
            INTRO
        ===================================================== */}

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">

          <div className="lg:col-span-4">

            <div className="flex items-center gap-3">

              <span className="h-[5px] w-[5px] rounded-full bg-[#c9a84c]" />

              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/40">
                At a glance
              </p>

            </div>

          </div>


          <div className="lg:col-span-7 lg:col-start-5">

            <h2 className="max-w-3xl text-[clamp(2.4rem,4.5vw,5rem)] font-medium leading-[0.92] tracking-[-0.06em]">

              One manufacturer.
              <br />

              <span className="ml-[4vw] text-white/45">
                Multiple possibilities.
              </span>

            </h2>

          </div>

        </div>


        {/* =====================================================
            STATS
        ===================================================== */}

        <div className="mt-20 border-t border-white/10">

          <div className="grid sm:grid-cols-2 lg:grid-cols-4">

            {stats.map(([number, label], index) => (

              <div
                key={label}
                className={`
                  relative
                  border-b
                  border-white/10
                  px-2
                  py-10
                  sm:px-6
                  lg:border-b-0
                  lg:py-12
                  ${index !== 0 ? 'lg:border-l lg:border-white/10' : ''}
                `}
              >

                {/* Number */}

                <div className="text-[clamp(3rem,5vw,5rem)] font-medium leading-none tracking-[-0.06em] text-[#c9a84c]">

                  {number}

                </div>


                {/* Label */}

                <div className="mt-5">

                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75">

                    {label}

                  </p>

                </div>


                {/* Index */}

                <span className="absolute right-5 top-5 text-[8px] tabular-nums tracking-[0.2em] text-white/20">

                  {String(index + 1).padStart(2, '0')}

                </span>

              </div>

            ))}

          </div>

        </div>


        {/* =====================================================
            BOTTOM CONTEXT
        ===================================================== */}

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">

          <p className="max-w-md text-[9px] uppercase leading-5 tracking-[0.25em] text-white/30">

            Cleaning solutions
            <span className="mx-2 text-[#c9a84c]">·</span>
            Manufactured in Kerala

          </p>


          <p className="text-[9px] uppercase tracking-[0.25em] text-white/30">

            India
            <span className="mx-2 text-[#c9a84c]">·</span>
            Middle East

          </p>

        </div>

      </div>

    </section>
  )
}

export default Stats