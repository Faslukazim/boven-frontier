const stats = [
  { value: '14+', label: 'Commercial SKUs' },
  { value: '50+', label: 'Case Minimum Order' },
  { value: '7–14d', label: 'Export Dispatch' },
  { value: '100%', label: 'Batch Quality Verified' },
]

function Stats() {

  return (
    <section
      className="relative overflow-hidden bg-[#172b3f] px-5 py-14 sm:py-18 text-white sm:px-10 lg:px-14"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Simple Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#c9a84c] mb-1.5">
              Production Capacity
            </p>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
              Manufactured for Scale.
            </h2>
          </div>
          <p className="text-xs text-white/50 max-w-xs leading-relaxed">
            Automated blending and packaging in India for domestic wholesale and container export.
          </p>
        </div>

        {/* 4 Clean Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#c9a84c]">
                {stat.value}
              </span>
              <span className="mt-1.5 text-xs text-white/70 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats