import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ArrowUpRight,
  Menu,
  X,
  Phone,
  MessageCircle,
  ShieldCheck,
  Megaphone,
} from 'lucide-react'
import { useStore } from '../context/useStore'

function Navbar() {
  const location = useLocation()
  const { topBadge } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [bannerDismissed, setBannerDismissed] = useState(false)

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
      setIsScrolled(window.scrollY > 25)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-[#172b3f]/10'
          : 'bg-white border-b border-[#172b3f]/5'
      }`}
    >
      {/* =======================================================
          TOP EDITABLE ANNOUNCEMENT BADGE (CONTROLLED FROM ADMIN)
      ======================================================= */}
      {topBadge?.is_active && !bannerDismissed && (
        <div
          className={`relative z-40 px-4 py-2 text-xs transition-all ${
            topBadge.theme === 'gold'
              ? 'bg-[#c9a84c] text-[#172b3f]'
              : topBadge.theme === 'dark'
              ? 'bg-gray-900 text-white'
              : 'bg-[#172b3f] text-white'
          }`}
        >
          <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-2 sm:px-6">
            <div className="flex flex-1 items-center justify-center gap-2 text-center text-[10px] sm:text-xs">
              <Megaphone size={13} className="shrink-0 hidden sm:inline text-[#c9a84c]" />
              <span className="font-semibold">{topBadge.title}</span>
              {topBadge.subtitle && (
                <span className="hidden md:inline opacity-80">— {topBadge.subtitle}</span>
              )}
              {topBadge.ctaText && (
                <a
                  href={topBadge.ctaLink || '/contact'}
                  target={topBadge.ctaLink?.startsWith('http') ? '_blank' : undefined}
                  rel={topBadge.ctaLink?.startsWith('http') ? 'noreferrer' : undefined}
                  className="ml-2 inline-flex items-center gap-1 rounded bg-white/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider transition hover:bg-white/30"
                >
                  {topBadge.ctaText}
                  <ArrowUpRight size={10} />
                </a>
              )}
            </div>

            <button
              onClick={() => setBannerDismissed(true)}
              className="p-1 opacity-70 hover:opacity-100"
              aria-label="Dismiss banner"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      )}

      {/* =======================================================
          MAIN NAVIGATION BAR (MINIMAL & REFINED)
      ======================================================= */}
      <nav className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between border-b border-[#172b3f]/10 px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/branding/bovenlogo.jpg"
            alt="Boven Frontier International LLP"
            className="h-[38px] sm:h-[42px] w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-8 lg:gap-10 md:flex">
          <Link
            to="/about"
            className={`text-[10px] uppercase tracking-[0.25em] transition-colors duration-200 ${
              isActive('/about')
                ? 'font-bold text-[#172b3f] border-b-2 border-[#c9a84c] pb-0.5'
                : 'text-[#172b3f]/65 hover:text-[#172b3f]'
            }`}
          >
            About
          </Link>

          <Link
            to="/products"
            className={`text-[10px] uppercase tracking-[0.25em] transition-colors duration-200 ${
              isActive('/products')
                ? 'font-bold text-[#172b3f] border-b-2 border-[#c9a84c] pb-0.5'
                : 'text-[#172b3f]/65 hover:text-[#172b3f]'
            }`}
          >
            Products
          </Link>

          <Link
            to="/contact"
            className={`group flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] transition-colors duration-200 ${
              isActive('/contact')
                ? 'font-bold text-[#172b3f] border-b-2 border-[#c9a84c] pb-0.5'
                : 'font-semibold text-[#172b3f] hover:text-[#c9a84c]'
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
            className="inline-flex items-center gap-2 rounded bg-[#172b3f] px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-white hover:bg-[#c9a84c] hover:text-[#172b3f] transition shadow-xs"
          >
            Enquire
          </Link>

          <Link
            to="/admin"
            className="ml-1 rounded border border-[#172b3f]/15 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#172b3f]/60 transition hover:border-[#172b3f] hover:text-[#172b3f]"
            title="Management Console"
          >
            Admin
          </Link>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/contact"
            className="rounded bg-[#172b3f] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white"
          >
            Enquire
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 items-center justify-center border border-[#172b3f]/15 bg-white text-[#172b3f] rounded transition active:scale-95"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* =======================================================
          MOBILE NAVIGATION DRAWER
      ======================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[68px] z-40 flex flex-col bg-white px-6 py-8 md:hidden animate-in fade-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-6 text-left">
            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#c9a84c]">
              Navigation
            </span>

            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-2xl font-medium tracking-tight ${
                isActive('/') ? 'text-[#c9a84c]' : 'text-[#172b3f]'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-2xl font-medium tracking-tight ${
                isActive('/about') ? 'text-[#c9a84c]' : 'text-[#172b3f]'
              }`}
            >
              About Boven Frontier
            </Link>

            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-2xl font-medium tracking-tight ${
                isActive('/products') ? 'text-[#c9a84c]' : 'text-[#172b3f]'
              }`}
            >
              Products & Brands
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-2xl font-medium tracking-tight ${
                isActive('/contact') ? 'text-[#c9a84c]' : 'text-[#172b3f]'
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
                className="flex items-center justify-center gap-2 rounded border border-[#172b3f]/15 py-3 text-xs font-semibold text-[#172b3f] hover:bg-gray-50"
              >
                <MessageCircle size={15} className="text-emerald-600" />
                WhatsApp
              </a>

              <a
                href="tel:+917012777495"
                className="flex items-center justify-center gap-2 rounded bg-[#172b3f] py-3 text-xs font-semibold text-white"
              >
                <Phone size={15} />
                Call Direct
              </a>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[9px] uppercase tracking-wider text-gray-400">
                Kozhikode, India
              </span>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#c9a84c] hover:underline"
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