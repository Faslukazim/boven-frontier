import { useState, useEffect, useRef } from 'react'

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
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    let triggered = false

    const handleCheck = () => {
      if (triggered || !sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()

      // Only trigger when user actively scrolls down and section is in view
      if (window.scrollY > 60 && rect.top <= window.innerHeight * 0.8) {
        triggered = true
        setIsVisible(true)
        window.removeEventListener('scroll', handleCheck)
      }
    }

    window.addEventListener('scroll', handleCheck, { passive: true })
    return () => window.removeEventListener('scroll', handleCheck)
  }, [])

  const stats = [
    { num: 3, label: 'Consumer Brands' },
    { num: 14, label: 'Current SKUs' },
    { num: 2, label: 'Core Markets' },
    { num: 1, label: 'Manufacturing Partner' },
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
              One manufacturing partner. Multiple possibilities.
            </h2>
          </div>
          <p className="hidden sm:block text-xs sm:text-sm text-white/60 max-w-sm leading-relaxed">
            Formulated and bottled in India with certified active chemical purity for institutional buyers and global container exports.
          </p>
          <p className="block sm:hidden text-xs text-white/60 leading-relaxed">
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
                  <AnimatedCounter target={stat.num} isVisible={isVisible} />
                  <span className="text-lg font-bold text-[#EF2034]">+</span>
                </div>

                {/* Label */}
                <div className="mt-2 sm:mt-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================
            BOTTOM CONTEXT
        ===================================================== */}
        <div className="hidden sm:flex mt-10 flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-[9px] uppercase leading-5 tracking-[0.25em] text-white/30">
            Cleaning solutions
            <span className="mx-2 text-[#EF2034]">·</span>
            Manufactured in India
          </p>

          <p className="text-[9px] uppercase tracking-[0.25em] text-white/30">
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