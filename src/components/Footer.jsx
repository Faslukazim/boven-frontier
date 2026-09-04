import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, Phone, Mail, CheckCircle2 } from 'lucide-react'

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setTimeout(() => {
      setEmail('')
      setSubscribed(false)
    }, 4000)
  }

  return (
    <footer className="bg-[#172b3f] text-white">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
        {/* =====================================================
            TOP NEWSLETTER / WHOLESALE CATALOG SIGNUP
        ===================================================== */}
        <div className="border-b border-white/10 py-12">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#c9a84c]">
                B2B Price List & SKU Bulletins
              </span>
              <h3 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight">
                Receive updated wholesale price sheets directly in your inbox.
              </h3>
              <p className="mt-1 text-xs text-white/60">
                Monthly formulation updates, seasonal bulk discounts, and GCC shipping schedules.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-900/50 border border-emerald-500/30 p-3.5 text-xs text-emerald-200">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Thank you! You will receive our latest B2B wholesale export catalog shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter distributor / company email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-xs text-white placeholder-white/40 focus:border-[#c9a84c] focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-[#c9a84c] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#172b3f] hover:bg-white transition whitespace-nowrap shadow-xs"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* =====================================================
            MAIN FOOTER COLUMNS
        ===================================================== */}
        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10">
          {/* BRAND & FACILITY */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white p-1.5">
                <img
                  src="/favicon.png"
                  alt="Boven Frontier"
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <p className="text-[13px] font-bold tracking-[0.08em]">
                  BOVEN FRONTIER
                </p>
                <p className="mt-0.5 text-[8px] font-semibold tracking-[0.25em] text-[#c9a84c]">
                  INTERNATIONAL LLP · REG: ACE-5349
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-xs leading-6 text-white/65">
              Certified manufacturer of professional cleaning chemicals, detergents, and disinfection products in India. Supplying regional retail chains and GCC container import partners.
            </p>

            <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4 text-xs">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#c9a84c]">
                Operations & Facility
              </p>
              <p className="mt-1 text-white/80">
                India · LLP Reg: ACE-5349
              </p>
              <p className="mt-0.5 text-[11px] text-white/50">
                Manufactured in India · ISO 9001:2015 Quality Standards
              </p>
            </div>
          </div>

          {/* CATALOG */}
          <div className="lg:col-span-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#c9a84c]">
              Product Catalog
            </p>

            <nav className="mt-5 flex flex-col gap-2.5 text-xs text-white/70">
              <Link to="/products" className="hover:text-white transition">
                Laundry Care
              </Link>
              <Link to="/products" className="hover:text-white transition">
                Floor Cleaners
              </Link>
              <Link to="/products" className="hover:text-white transition">
                Surface & Glass
              </Link>
              <Link to="/products" className="hover:text-white transition">
                Disinfection & Hygiene
              </Link>
              <Link to="/products" className="hover:text-white transition">
                Personal Care & Handwash
              </Link>
            </nav>
          </div>

          {/* B2B SERVICES */}
          <div className="lg:col-span-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#c9a84c]">
              Wholesale Services
            </p>

            <nav className="mt-5 flex flex-col gap-2.5 text-xs text-white/70">
              <Link to="/about" className="hover:text-white transition">
                Contract Bottling & OEM
              </Link>
              <Link to="/contact" className="hover:text-white transition">
                Private Label Formulation
              </Link>
              <Link to="/contact" className="hover:text-white transition">
                Palletized Container Shipping (FCL)
              </Link>
              <Link to="/contact" className="hover:text-white transition">
                Request Samples & Specifications
              </Link>
              <Link to="/admin" className="text-white/40 hover:text-white transition">
                Admin Console
              </Link>
            </nav>
          </div>

          {/* EXPORT DESK CONTACT */}
          <div className="lg:col-span-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#c9a84c]">
              B2B Export Desk
            </p>

            <div className="mt-5 space-y-3 text-xs">
              <a
                href="https://wa.me/919207577242?text=Hello%20Boven%20Frontier,%20I%20have%20a%20wholesale%20enquiry"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 transition"
              >
                <MessageCircle size={15} />
                <span>WhatsApp: +91 92075 77242</span>
              </a>

              <a
                href="tel:+917012777495"
                className="flex items-center gap-2.5 text-white/80 hover:text-white transition"
              >
                <Phone size={14} />
                <span>Direct: +91 70127 77495</span>
              </a>

              <a
                href="mailto:exports@bovenfrontier.com"
                className="flex items-center gap-2.5 text-white/80 hover:text-white transition"
              >
                <Mail size={14} />
                <span>exports@bovenfrontier.com</span>
              </a>

              <div className="pt-2 text-[10px] text-white/50 leading-relaxed">
                Operating Hours: Mon – Sat<br />
                9:00 AM – 6:30 PM (IST) · 7:30 AM – 5:00 PM (GST)
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-white/10" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col gap-4 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left text-[9px] uppercase tracking-[0.2em] text-white/45">
          <p>
            © {new Date().getFullYear()} Boven Frontier International LLP. All Rights Reserved.
          </p>

          <div className="flex items-center justify-center gap-4">
            <span>Incoterms: FOB Indian Ports · CIF Jebel Ali / Dammam</span>
            <span className="h-1 w-1 rounded-full bg-[#c9a84c]" />
            <span>T/T & L/C Accepted</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer