import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  ShieldCheck,
  ArrowUpRight,
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
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-200/80 text-[#104360]'
          : 'bg-white border-b border-gray-100 text-[#104360]'
      }`}
    >
      {/* =======================================================
          MAIN NAVIGATION BAR (MINIMAL & REFINED)
      ======================================================= */}
      <nav className="mx-auto flex h-16 sm:h-[72px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Brand Logo - New Official Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/branding/bovenlogo.png"
            alt="Boven Frontier International LLP"
            className="h-[36px] sm:h-[44px] w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-8 lg:gap-10 md:flex">
          <Link
            to="/about"
            className={`text-[10px] uppercase tracking-[0.25em] transition-colors duration-200 ${
              isActive('/about')
                ? 'font-bold text-[#104360] border-b-2 border-[#EF2034] pb-0.5'
                : 'text-[#104360]/75 hover:text-[#EF2034]'
            }`}
          >
            About
          </Link>

          <Link
            to="/products"
            className={`text-[10px] uppercase tracking-[0.25em] transition-colors duration-200 ${
              isActive('/products')
                ? 'font-bold text-[#104360] border-b-2 border-[#EF2034] pb-0.5'
                : 'text-[#104360]/75 hover:text-[#EF2034]'
            }`}
          >
            Products
          </Link>

          <Link
            to="/contact"
            className={`group flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] transition-colors duration-200 ${
              isActive('/contact')
                ? 'font-bold text-[#104360] border-b-2 border-[#EF2034] pb-0.5'
                : 'font-semibold text-[#104360] hover:text-[#EF2034]'
            }`}
          >
            Contact
            <ArrowUpRight
              size={13}
              strokeWidth={1.5}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded bg-[#EF2034] px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-white hover:bg-[#104360] transition shadow-xs"
          >
            Enquire
          </Link>

          <Link
            to="/admin"
            className="ml-1 rounded border border-[#104360]/15 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#104360]/60 transition hover:border-[#104360] hover:text-[#104360]"
            title="Management Console"
          >
            Admin
          </Link>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/contact"
            className="rounded bg-[#EF2034] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white active:bg-[#104360]"
          >
            Enquire
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 items-center justify-center border border-[#104360]/15 bg-white text-[#104360] rounded transition active:scale-95"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* =======================================================
          MOBILE NAVIGATION DRAWER
      ======================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[64px] sm:top-[72px] z-40 flex flex-col bg-white px-6 py-8 text-[#104360] md:hidden animate-in fade-in slide-in-from-top duration-200 border-t border-gray-100">
          <div className="flex flex-col gap-6 text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#EF2034]">
              Navigation
            </span>

            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-2xl font-medium tracking-tight ${
                isActive('/') ? 'text-[#EF2034]' : 'text-[#104360]'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-2xl font-medium tracking-tight ${
                isActive('/about') ? 'text-[#EF2034]' : 'text-[#104360]'
              }`}
            >
              About Boven Frontier
            </Link>

            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-2xl font-medium tracking-tight ${
                isActive('/products') ? 'text-[#EF2034]' : 'text-[#104360]'
              }`}
            >
              Products & Brands
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-2xl font-medium tracking-tight ${
                isActive('/contact') ? 'text-[#EF2034]' : 'text-[#104360]'
              }`}
            >
              B2B & Export Enquiries
            </Link>
          </div>

          {/* Direct Quick Actions */}
          <div className="mt-auto space-y-4 border-t border-gray-100 pt-6">
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://wa.me/919207577242?text=Hello%20Boven%20Frontier%2C%20I%20have%20an%20enquiry%20regarding%20cleaning%20products."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded border border-[#104360]/15 py-3 text-xs font-semibold text-[#104360] hover:bg-gray-50"
              >
                <MessageCircle size={15} className="text-emerald-600" />
                WhatsApp
              </a>

              <a
                href="tel:+917012777495"
                className="flex items-center justify-center gap-2 rounded bg-[#EF2034] py-3 text-xs font-semibold text-white hover:bg-[#d8192c]"
              >
                <Phone size={15} />
                Call Direct
              </a>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] uppercase tracking-wider text-gray-400">
                Manufactured in India
              </span>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#104360] hover:text-[#EF2034] hover:underline"
              >
                <ShieldCheck size={13} />
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar