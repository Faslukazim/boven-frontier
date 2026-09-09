import { Link } from 'react-router-dom'
import { MessageCircle, Phone, Mail } from 'lucide-react'
import { useStore } from '../context/useStore'

function Footer() {
  const { company } = useStore()

  return (
    <footer className="bg-[#104360] text-white">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
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
                <p className="mt-0.5 text-[8px] font-semibold tracking-[0.25em] text-[#EF2034]">
                  INTERNATIONAL LLP · REG: ACE-5349
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-xs leading-6 text-white/65">
              Certified manufacturer of professional cleaning chemicals in India. Supplying domestic retail chains and GCC container import partners.
            </p>

            <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4 text-xs">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#EF2034]">
                Operations & Facility
              </p>
              <p className="mt-1 font-medium text-white/90">
                India · LLP Reg: {company?.llpId || 'ACE-5349'}
              </p>
              <p className="mt-0.5 text-[11px] font-mono text-white/70">
                GSTIN: {company?.gstin || '32ABCFB2913N1ZN'}
              </p>
              <p className="mt-1 text-[11px] text-white/60 leading-relaxed">
                {company?.address || 'Room No. OP 7/452, Manakkadavu, Kozhikode 673019, India'}
              </p>
            </div>
          </div>

          {/* CATALOG */}
          <div className="lg:col-span-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#EF2034]">
              Product Catalog
            </p>

            <nav className="mt-5 flex flex-col gap-2.5 text-xs text-white/70">
              <Link to="/products?category=LAUNDRY+CARE" className="hover:text-white transition">
                Laundry Care
              </Link>
              <Link to="/products?category=FLOOR+CARE" className="hover:text-white transition">
                Floor Cleaners
              </Link>
              <Link to="/products?category=SURFACE+CARE" className="hover:text-white transition">
                Surface & Glass
              </Link>
              <Link to="/products?category=DISINFECTION" className="hover:text-white transition">
                Disinfection & Hygiene
              </Link>
              <Link to="/products?category=PERSONAL+CARE" className="hover:text-white transition">
                Personal Care & Handwash
              </Link>
            </nav>
          </div>

          {/* B2B SERVICES */}
          <div className="lg:col-span-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#EF2034]">
              Wholesale Services
            </p>

            <nav className="mt-5 flex flex-col gap-2.5 text-xs text-white/70">
              <Link to="/about" className="hover:text-white transition">
                Contract Bottling & OEM
              </Link>
              <Link to="/contact?service=Private+Label" className="hover:text-white transition">
                Private Label Formulation
              </Link>
              <Link to="/#markets" className="hover:text-white transition">
                Palletized Container Shipping (FCL)
              </Link>
              <Link to="/contact?service=Samples" className="hover:text-white transition">
                Request Samples & Specifications
              </Link>
            </nav>
          </div>

          {/* EXPORT DESK CONTACT */}
          <div className="lg:col-span-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#EF2034]">
              B2B Export Desk
            </p>

            <div className="mt-5 space-y-3 text-xs">
              <a
                href={`https://wa.me/${company?.whatsappUAE?.replace(/[^0-9]/g, '') || '971507355418'}?text=Hello%20Boven%20Frontier,%20I%20have%20a%20wholesale%20enquiry`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 transition"
              >
                <MessageCircle size={15} />
                <span>WhatsApp: {company?.whatsappUAE || '+971 50 735 5418'}</span>
              </a>

              {company?.phone1 && (
                <a
                  href={`tel:${company.phone1.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2.5 text-white/80 hover:text-white transition"
                >
                  <Phone size={14} />
                  <span>Direct: {company.phone1}</span>
                </a>
              )}

              {company?.phone2 && (
                <a
                  href={`tel:${company.phone2.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2.5 text-white/80 hover:text-white transition"
                >
                  <Phone size={14} />
                  <span>Direct: {company.phone2}</span>
                </a>
              )}

              <a
                href={`mailto:${company?.email2 || company?.email1 || 'aswin@bovenfrontier.co.in'}`}
                className="flex items-center gap-2.5 text-white/80 hover:text-white transition"
              >
                <Mail size={14} />
                <span>{company?.email2 || company?.email1 || 'aswin@bovenfrontier.co.in'}</span>
              </a>

              <div className="pt-2 text-[10px] text-white/50 leading-relaxed">
                Operating Hours: {company?.operatingHours || 'Mon – Sat: 9:00 AM – 6:30 PM (IST)'}
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-white/10" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col gap-3 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left text-[9px] uppercase tracking-[0.2em] text-white/45">
          <p>
            © {new Date().getFullYear()} Boven Frontier International LLP. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-1">
            <span>Incoterms: FOB Indian Ports · CIF Jebel Ali / Dammam</span>
            <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-[#EF2034]" />
            <span>T/T & L/C Accepted</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer