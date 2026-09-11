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
      setVal(Math.round((1 - Math.pow(1 - progress, 3)) * target))
      if (progress < 1) requestAnimationFrame(step)
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
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.2 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const skuCount = products.length > 0 ? products.length : 14
  const brandCount = brands.length > 0 ? brands.length : 3

  const stats = [
    { num: brandCount, label: 'Consumer Brands' },
    { num: skuCount, suffix: '+', label: 'Export-ready SKUs' },
    { num: 24, prefix: '< ', suffix: 'h', label: 'Quote Response' },
    { num: 50, suffix: '+', label: 'Cartons MOQ / SKU' },
  ]

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#104360] px-6 py-14 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-9 flex items-end justify-between border-b border-white/10 pb-7">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#EF2034]">At a glance</p>
            <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl lg:text-4xl">Built for wholesale. Ready for scale.</h2>
          </div>
          <p className="hidden max-w-xs text-right text-xs leading-relaxed text-white/55 md:block">Indian manufacturing for institutional buyers and international distribution.</p>
        </div>

        <div className="grid grid-cols-2 divide-x divide-y divide-white/10 lg:grid-cols-4 lg:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.label} className="px-4 py-5 first:pl-0 lg:px-8 lg:py-3 first:lg:pl-0">
              <div className="flex items-baseline gap-1 text-3xl font-light tracking-tight sm:text-5xl">
                {stat.prefix && <span className="text-xl text-white/50 sm:text-2xl">{stat.prefix}</span>}
                <AnimatedCounter target={stat.num} isVisible={isVisible} />
                {stat.suffix && <span className="text-base font-bold text-[#EF2034]">{stat.suffix}</span>}
              </div>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70 sm:text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats