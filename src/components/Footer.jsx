import { ArrowUpRight } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-[#172b3f] text-white">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">

        <div className="grid gap-14 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10">

          {/* BRAND */}
          <div className="lg:col-span-5">

            <div className="flex items-center gap-3">

              {/* Favicon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-white p-1.5">
                <img
                  src="/favicon.png"
                  alt="Boven Frontier"
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <p className="text-[13px] font-semibold tracking-[0.08em]">
                  BOVEN FRONTIER
                </p>

                <p className="mt-1 text-[7px] tracking-[0.32em] text-[#c9a84c]">
                  INTERNATIONAL LLP
                </p>
              </div>

            </div>

            <p className="mt-10 max-w-md text-[14px] leading-7 text-white/65">
              Indian manufacturer of everyday cleaning solutions,
              serving domestic and export markets with dependable
              products across multiple categories.
            </p>

            <div className="mt-10">
              <p className="text-[8px] uppercase tracking-[0.3em] text-white/45">
                Manufacturing
              </p>

              <p className="mt-2 text-[12px] text-white/80">
                Kozhikode · Kerala · India
              </p>
            </div>

          </div>

          {/* NAVIGATION */}
          <div className="lg:col-span-2">

            <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#c9a84c]">
              Explore
            </p>

            <nav className="mt-6 flex flex-col gap-4">

              <a
                href="/about"
                className="w-fit text-[11px] uppercase tracking-[0.18em] text-white/65 transition-colors duration-300 hover:text-white"
              >
                About
              </a>

              <a
                href="/products"
                className="w-fit text-[11px] uppercase tracking-[0.18em] text-white/65 transition-colors duration-300 hover:text-white"
              >
                Products
              </a>

              <a
                href="/contact"
                className="w-fit text-[11px] uppercase tracking-[0.18em] text-white/65 transition-colors duration-300 hover:text-white"
              >
                Contact
              </a>

            </nav>

          </div>

          {/* BRANDS */}
          <div className="lg:col-span-2">

            <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#c9a84c]">
              Brands
            </p>

            <div className="mt-6 flex flex-col gap-4">

              <span className="text-[11px] uppercase tracking-[0.18em] text-white/65">
                LEXONE
              </span>

              <span className="text-[11px] uppercase tracking-[0.18em] text-white/65">
                FABIE PLUS
              </span>

              <span className="text-[11px] uppercase tracking-[0.18em] text-white/65">
                KARE
              </span>

            </div>

          </div>

          {/* ENQUIRY */}
          <div className="lg:col-span-3">

            <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#c9a84c]">
              Business Enquiries
            </p>

            <p className="mt-6 max-w-xs text-[14px] leading-6 text-white/65">
              Looking for a cleaning-products manufacturing
              partner in India?
            </p>

            <a
              href="/contact"
              className="group mt-7 inline-flex items-center gap-4"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">
                Start an enquiry
              </span>

              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#172b3f]">
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </a>

          </div>

        </div>

        {/* DIVIDER */}
        <div className="h-px bg-white/10" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-[8px] uppercase tracking-[0.25em] text-white/45">
            © {new Date().getFullYear()} Boven Frontier International LLP
          </p>

          <div className="flex items-center gap-6">

            <span className="text-[8px] uppercase tracking-[0.25em] text-white/45">
              Made in India
            </span>

            <span className="h-1 w-1 rounded-full bg-[#c9a84c]" />

            <span className="text-[8px] uppercase tracking-[0.25em] text-white/45">
              India · Middle East
            </span>

          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer