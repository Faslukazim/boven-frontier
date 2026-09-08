import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react'

function Navbar() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [prevPath, setPrevPath] = useState(location.pathname)
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname)
    setMobileMenuOpen(false)
  }

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(16,67,96,0.08)]'
          : 'bg-white'
      }`}
    >
      {/* =======================================================
          MAIN NAVIGATION BAR
      ======================================================= */}
      <nav className="mx-auto flex h-16 sm:h-[72px] max-w-[1600px] items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Brand Logo - Seamlessly blended on white */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src="/assets/branding/bovenlogo2.jpeg"
            alt="Boven Frontier International LLP"
            className="h-[32px] sm:h-[42px] max-w-[170px] sm:max-w-none w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-7 lg:gap-9 md:flex">
          <Link
            to="/about"
            className={`py-1 text-xs uppercase tracking-[0.2em] transition-colors duration-200 ${
              isActive('/about')
                ? 'font-bold text-[#EF2034]'
                : 'font-semibold text-[#104360] hover:text-[#EF2034]'
            }`}
          >
            About
          </Link>

          <Link
            to="/products"
            className={`py-1 text-xs uppercase tracking-[0.2em] transition-colors duration-200 ${
              isActive('/products')
                ? 'font-bold text-[#EF2034]'
                : 'font-semibold text-[#104360] hover:text-[#EF2034]'
            }`}
          >
            Products
          </Link>

          <Link
            to="/contact"
            className={`py-1 text-xs uppercase tracking-[0.2em] transition-colors duration-200 ${
              isActive('/contact')
                ? 'font-bold text-[#EF2034]'
                : 'font-semibold text-[#104360] hover:text-[#EF2034]'
            }`}
          >
            Contact
          </Link>

          <Link
            to="/contact"
            className="py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#104360] hover:text-[#EF2034] transition-colors duration-200"
          >
            Enquire
          </Link>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/contact"
            className="rounded-md bg-[#EF2034] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs active:bg-[#104360]"
          >
            Enquire
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#104360]/15 bg-white text-[#104360] transition active:scale-95 shadow-2xs"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Signature Brand Accent Line (Boven Navy flowing to Frontier Red) */}
      <div className="h-[2.5px] w-full bg-gradient-to-r from-[#104360] via-[#104360] to-[#EF2034]" />

      {/* =======================================================
          MOBILE NAVIGATION DRAWER
      ======================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[66px] sm:top-[74px] z-50 flex flex-col bg-white/98 backdrop-blur-xl px-6 py-6 md:hidden animate-in fade-in slide-in-from-top-2 duration-200 overflow-y-auto">
          <div className="flex flex-col gap-2 text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#EF2034] mb-2">
              Navigation Menu
            </span>

            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between rounded-lg px-3 py-3 text-lg font-medium tracking-tight transition ${
                isActive('/')
                  ? 'bg-[#104360]/5 text-[#EF2034] font-semibold'
                  : 'text-[#104360] hover:bg-gray-50'
              }`}
            >
              <span>Home</span>
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between rounded-lg px-3 py-3 text-lg font-medium tracking-tight transition ${
                isActive('/about')
                  ? 'bg-[#104360]/5 text-[#EF2034] font-semibold'
                  : 'text-[#104360] hover:bg-gray-50'
              }`}
            >
              <span>About Boven Frontier</span>
            </Link>

            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between rounded-lg px-3 py-3 text-lg font-medium tracking-tight transition ${
                isActive('/products')
                  ? 'bg-[#104360]/5 text-[#EF2034] font-semibold'
                  : 'text-[#104360] hover:bg-gray-50'
              }`}
            >
              <span>Products & Brands</span>
            </Link>

            <Link
              to="/#markets"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-lg font-medium tracking-tight text-[#104360] hover:bg-gray-50 transition"
            >
              <span>Logistics & Export Markets</span>
            </Link>

            <Link
              to="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-lg font-medium tracking-tight text-[#104360] hover:bg-gray-50 transition"
            >
              <span>Wholesale FAQ</span>
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between rounded-lg px-3 py-3 text-lg font-medium tracking-tight transition ${
                isActive('/contact')
                  ? 'bg-[#104360]/5 text-[#EF2034] font-semibold'
                  : 'text-[#104360] hover:bg-gray-50'
              }`}
            >
              <span>B2B & Export Enquiries</span>
            </Link>
          </div>

          {/* Direct Quick Actions */}
          <div className="mt-auto space-y-4 border-t border-gray-100 pt-6">
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://wa.me/971507355418?text=Hello%20Boven%20Frontier%2C%20I%20have%20an%20enquiry%20regarding%20cleaning%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-[#104360]/15 py-3 text-xs font-semibold text-[#104360] hover:bg-gray-50 active:bg-gray-100"
              >
                <MessageCircle size={16} className="text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+919633890447"
                className="flex items-center justify-center gap-2 rounded-lg bg-[#EF2034] py-3 text-xs font-semibold text-white hover:bg-[#d8192c] active:scale-98 shadow-xs"
              >
                <Phone size={15} />
                <span>Call Direct</span>
              </a>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                Manufactured in India
              </span>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#104360] hover:text-[#EF2034] hover:underline"
              >
                <ShieldCheck size={13} />
                <span>Admin Portal</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar