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
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="h-[5px] w-[5px] rounded-full bg-[#c9a84c] animate-ping" />
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
            STATS CARDS WITH ANIMATED COUNTERS
        ===================================================== */}
        <div className="mt-20 border-t border-white/10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`group relative border-b border-white/10 px-4 py-10 sm:px-6 lg:border-b-0 lg:py-12 transition-all duration-500 hover:bg-white/[0.03] ${
                  index !== 0 ? 'lg:border-l lg:border-white/10' : ''
                }`}
              >
                {/* Number with Counter */}
                <div className="text-[clamp(3.2rem,5.5vw,5.5rem)] font-medium leading-none tracking-[-0.06em] text-[#c9a84c] transition-transform duration-300 group-hover:scale-105">
                  <AnimatedCounter target={stat.num} isVisible={isVisible} />
                </div>

                {/* Label */}
                <div className="mt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75 group-hover:text-white transition-colors">
                    {stat.label}
                  </p>
                </div>

                {/* Index marker */}
                <span className="absolute right-5 top-5 text-[8px] tabular-nums tracking-[0.2em] text-white/20 group-hover:text-[#c9a84c]/50 transition-colors">
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