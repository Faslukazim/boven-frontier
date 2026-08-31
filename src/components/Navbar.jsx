import { ArrowUpRight, Menu } from 'lucide-react'

function Navbar() {
  return (
    <header className="relative z-50 bg-white">

      <nav className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between border-b border-[#172b3f]/10 px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* Logo */}

        <a
          href="/"
          className="flex items-center"
        >

          <img
            src="/assets/branding/bovenlogo.jpg"
            alt="Boven Frontier International LLP"
            className="h-[42px] w-auto object-contain"
          />

        </a>


        {/* Desktop navigation */}

        <div className="hidden items-center gap-10 md:flex">

          <a
            href="/about"
            className="
              text-[9px]
              uppercase
              tracking-[0.25em]
              text-[#172b3f]/55
              transition-colors
              duration-300
              hover:text-[#172b3f]
            "
          >
            About
          </a>

          <a
            href="/products"
            className="
              text-[9px]
              uppercase
              tracking-[0.25em]
              text-[#172b3f]/55
              transition-colors
              duration-300
              hover:text-[#172b3f]
            "
          >
            Products
          </a>

          <a
            href="/contact"
            className="
              group
              flex
              items-center
              gap-2
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.25em]
            "
          >

            Enquire

            <ArrowUpRight
              size={13}
              strokeWidth={1.5}
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />

          </a>

        </div>


        {/* Mobile */}

        <div className="flex items-center gap-3 md:hidden">

          <a
            href="/contact"
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.2em]
            "
          >
            Enquire
          </a>

          <button
            type="button"
            aria-label="Open menu"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              border
              border-[#172b3f]/10
            "
          >

            <Menu
              size={18}
              strokeWidth={1.5}
            />

          </button>

        </div>

      </nav>

    </header>
  )
}

export default Navbar