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
      className="relative overflow-hidden bg-[#172b3f] px-6 py-20 text-white sm:px-10 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* =====================================================
            INTRO
        ===================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#c9a84c] mb-2">
              At a glance
            </p>
            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-white">
              One manufacturing partner. Multiple possibilities.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-white/60 max-w-sm leading-relaxed">
            Formulated and bottled in India with certified active chemical purity for institutional buyers and global container exports.
          </p>
        </div>

        {/* =====================================================
            STATS CARDS WITH ANIMATED COUNTERS
        ===================================================== */}
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="py-8 px-4 sm:px-6 first:pl-0"
              >
                {/* Number with Counter */}
                <div className="text-4xl sm:text-5xl font-light tracking-tight text-[#c9a84c]">
                  <AnimatedCounter target={stat.num} isVisible={isVisible} />
                </div>

                {/* Label */}
                <div className="mt-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-white/70">
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
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-[9px] uppercase leading-5 tracking-[0.25em] text-white/30">
            Cleaning solutions
            <span className="mx-2 text-[#c9a84c]">·</span>
            Manufactured in India
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