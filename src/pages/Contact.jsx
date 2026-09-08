import { MapPin, Phone, Mail, ShieldCheck, Clock, MessageCircle } from 'lucide-react'
import ContactStrip from '../components/ContactStrip'
import Footer from '../components/Footer'
import { COMPANY } from '../constants'

function Contact() {
  return (
    <main className="bg-white text-[#104360]">
      {/* =====================================================
          CONTACT HEADER (FROM CLIENT DATA)
      ===================================================== */}
      <section className="bg-[#104360] px-6 py-20 text-white sm:py-24 relative overflow-hidden">
        <div
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl bg-[#EF2034]"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-[1600px] px-2 sm:px-10 relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#EF2034]">
              Direct Communication
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
            Connect With Our Team
          </h1>

          <p className="mt-4 max-w-2xl text-sm sm:text-base text-white/80 leading-relaxed font-normal">
            For retail distributorship, bulk institutional purchase, or Middle East export inquiries, contact our management desk directly.
          </p>
        </div>
      </section>

      {/* =====================================================
          OFFICIAL CORPORATE DETAILS CARDS
      ===================================================== */}
      <section className="border-b border-gray-200 bg-[#f8f9fa] py-14 px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1600px] grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Corporate & Registered Office */}
          <div className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-2xs">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#104360]/5 border border-[#104360]/10 text-[#EF2034] mb-4">
              <MapPin size={18} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Corporate & Registered Office
            </p>
            <p className="mt-2 text-xs font-medium text-gray-800 leading-relaxed">
              {COMPANY.address}
            </p>
          </div>

          {/* Direct Phone & WhatsApp */}
          <div className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-2xs">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#104360]/5 border border-[#104360]/10 text-[#EF2034] mb-4">
              <Phone size={18} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Direct Calls & WhatsApp
            </p>
            <div className="mt-2 space-y-1 text-xs">
              <p>
                <a href="tel:+919633890447" className="font-semibold text-gray-900 hover:text-[#EF2034] transition">
                  +91 96338 90447
                </a>
              </p>
              <p>
                <a href="tel:+917012777495" className="font-semibold text-gray-900 hover:text-[#EF2034] transition">
                  +91 70127 77495
                </a>
              </p>
              <p className="pt-1">
                <a
                  href="https://wa.me/971507355418?text=Hello%20Boven%20Frontier%2C%20I%20have%20an%20enquiry."
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 transition"
                >
                  <MessageCircle size={13} />
                  <span>+971 50 735 5418 (UAE)</span>
                </a>
              </p>
            </div>
          </div>

          {/* Email Communications */}
          <div className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-2xs">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#104360]/5 border border-[#104360]/10 text-[#EF2034] mb-4">
              <Mail size={18} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Email Communications
            </p>
            <div className="mt-2 space-y-1 text-xs">
              <p>
                <a href="mailto:info@bovenfrontier.co.in" className="font-medium text-gray-900 hover:text-[#EF2034] transition">
                  info@bovenfrontier.co.in
                </a>
              </p>
              <p>
                <a href="mailto:aswin@bovenfrontier.co.in" className="font-medium text-gray-900 hover:text-[#EF2034] transition">
                  aswin@bovenfrontier.co.in
                </a>
              </p>
              <p>
                <a href="mailto:shidil@bovenfrontier.co.in" className="font-medium text-gray-900 hover:text-[#EF2034] transition">
                  shidil@bovenfrontier.co.in
                </a>
              </p>
            </div>
          </div>

          {/* Entity Registration & Hours */}
          <div className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-2xs">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#104360]/5 border border-[#104360]/10 text-[#EF2034] mb-4">
              <ShieldCheck size={18} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Entity Registration
            </p>
            <div className="mt-2 text-xs space-y-1 text-gray-800">
              <p className="font-semibold text-gray-900">LLP ID: {COMPANY.llpId}</p>
              <p className="font-mono text-[11px] text-gray-600">GSTIN: {COMPANY.gstin}</p>
              <div className="pt-2 text-[10px] text-gray-500 flex items-center gap-1">
                <Clock size={12} className="text-[#104360]" />
                <span>{COMPANY.operatingHours}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Interactive Contact Section */}
      <ContactStrip />

      {/* Footer */}
      <Footer />
    </main>
  )
}

export default Contact