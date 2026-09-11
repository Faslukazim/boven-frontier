import { useState, useEffect, useRef } from 'react'
import { useStore } from '../context/useStore'

function AnimatedCounter({ target, isVisible }) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let startTime = null
    const duration = 1000

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setVal(Math.round(easeOut * target))

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [target, isVisible])

  return String(val).padStart(2, '0')
}

function Stats() {
  const { products = [], brands = [] } = useStore()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const skuCount = products.length > 0 ? products.length : 14
  const brandCount = brands.length > 0 ? brands.length : 3

  const stats = [
    {
      num: brandCount,
      suffix: '',
      label: 'Consumer Brands',
      subtext: 'In-house formulated',
    },
    {
      num: skuCount,
      suffix: '+',
      label: 'Current SKUs',
      subtext: 'Bottled & export ready',
    },
    {
      num: 24,
      prefix: '< ',
      suffix: 'h',
      label: 'Quote Response SLA',
      subtext: 'Direct management desk',
    },
    {
      num: 50,
      suffix: '+',
      label: 'Cartons MOQ / SKU',
      subtext: 'Flexible container mix',
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#104360] px-6 py-20 text-white sm:px-10 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* =====================================================
            INTRO
        ===================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#EF2034] mb-2">
              At a glance
            </p>
            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-white">
              Engineered for wholesale. Built for scale.
            </h2>
          </div>
          <p className="hidden sm:block text-sm text-white/80 max-w-sm leading-relaxed">
            Formulated and bottled in India with certified active chemical purity for institutional buyers and global container exports.
          </p>
          <p className="block sm:hidden text-xs text-white/80 leading-relaxed">
            Formulated & bottled in India for wholesale and container exports.
          </p>
        </div>

        {/* =====================================================
            STATS CARDS WITH ANIMATED COUNTERS
        ===================================================== */}
        <div className="pt-2">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 transition-all duration-300 hover:border-[#EF2034]/40 hover:bg-white/[0.06]"
              >
                {/* Number with Counter */}
                <div className="text-3xl sm:text-5xl font-light tracking-tight text-white flex items-baseline gap-1">
                  {stat.prefix && (
                    <span className="text-xl sm:text-3xl font-light text-white/60">
                      {stat.prefix}
                    </span>
                  )}
                  <AnimatedCounter target={stat.num} isVisible={isVisible} />
                  {stat.suffix && (
                    <span className="text-lg font-bold text-[#EF2034]">
                      {stat.suffix}
                    </span>
                  )}
                </div>

                {/* Label */}
                <div className="mt-2 sm:mt-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/90">
                    {stat.label}
                  </p>
                  {stat.subtext && (
                    <p className="mt-1 text-xs text-white/70 font-medium">
                      {stat.subtext}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================
            BOTTOM CONTEXT
        ===================================================== */}
        <div className="hidden sm:flex mt-10 flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-xs uppercase leading-5 tracking-[0.2em] text-white/65">
            Cleaning solutions
            <span className="mx-2 text-[#EF2034]">·</span>
            Manufactured in India
          </p>

          <p className="text-xs uppercase tracking-[0.2em] text-white/65">
            India
            <span className="mx-2 text-[#EF2034]">·</span>
            Middle East
          </p>
        </div>
      </div>
    </section>
  )
}

export default Stats