import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useStore } from '../context/useStore'

function Navbar() {
  const { company } = useStore()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const active = (path) => location.pathname === path
  const whatsapp = company?.whatsappUAE?.replace(/[^0-9]/g, '') || '971507355418'
  const phone = company?.phone1?.replace(/\s+/g, '') || '+919633890447'

  return (
    <header className={`sticky top-0 z-50 border-b border-[#104360]/10 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl' : 'bg-white'}`}>
      <nav className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">
        <Link to="/" className="flex shrink-0 items-center">
          <img src="/assets/branding/bovenlogo2.jpeg" alt="Boven Frontier International LLP" className="h-9 w-auto object-contain sm:h-11" />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {[['/about', 'About'], ['/products', 'Products'], ['/contact', 'Contact']].map(([path, label]) => (
            <Link key={path} to={path} className={`relative py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition-colors ${active(path) ? 'text-[#EF2034]' : 'text-[#104360]/65 hover:text-[#104360]'}`}>
              {label}
              <span className={`absolute bottom-0 left-0 h-px bg-[#EF2034] transition-all ${active(path) ? 'w-full' : 'w-0'}`} />
            </Link>
          ))}
          <Link to="/contact" className="group flex items-center gap-3 border-l border-[#104360]/10 pl-10 text-[10px] font-bold uppercase tracking-[0.22em] text-[#104360]">
            Enquire
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EF2034] text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"><ArrowUpRight size={14} /></span>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link to="/contact" className="bg-[#EF2034] px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white">Enquire</Link>
          <button onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} className="flex h-9 w-9 items-center justify-center border border-[#104360]/15 text-[#104360]">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      <div className="h-[2px] bg-gradient-to-r from-[#104360] via-[#104360] to-[#EF2034]" />

      {open && (
        <div className="fixed inset-0 top-[74px] z-40 flex flex-col bg-[#F7F5F0] px-6 py-8 md:hidden">
          <div className="mb-8 flex items-center justify-between border-b border-[#104360]/10 pb-4">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#EF2034]">Navigation</span>
            <span className="font-mono text-[9px] text-[#104360]/35">BF / 01</span>
          </div>
          <div className="flex flex-col">
            {[['/', 'Home'], ['/about', 'About Boven Frontier'], ['/products', 'Products & Brands'], ['/#markets', 'Export Markets'], ['/#faq', 'Wholesale FAQ'], ['/contact', 'B2B Enquiries']].map(([to, label], i) => (
              <Link key={`${to}-${label}`} to={to} className="group flex items-center justify-between border-b border-[#104360]/10 py-5 text-xl font-medium tracking-tight text-[#104360]">
                <span><span className="mr-4 font-mono text-[9px] text-[#EF2034]">0{i + 1}</span>{label}</span>
                <ArrowUpRight size={18} className="opacity-30 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
          <div className="mt-auto grid grid-cols-2 gap-2 border-t border-[#104360]/10 pt-5">
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="border border-[#104360]/15 py-3 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-[#104360]">WhatsApp</a>
            <a href={`tel:${phone}`} className="bg-[#104360] py-3 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-white">Call Direct</a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
