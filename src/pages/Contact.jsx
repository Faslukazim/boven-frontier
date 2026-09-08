import { MapPin, Phone, Mail, ShieldCheck, Clock, MessageCircle } from 'lucide-react'
import ContactStrip from '../components/ContactStrip'
import Footer from '../components/Footer'
import { useStore } from '../context/useStore'

function Contact() {
  const { company } = useStore()

  return (
    <main className="bg-white text-[#104360]">
      {/* =====================================================
          CONTACT HEADER
      ===================================================== */}
      <section className="bg-[#104360] px-6 py-16 text-white sm:py-20 relative overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-2 sm:px-10 relative z-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#EF2034] block mb-2">
            Direct Communication
          </span>

          <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight">
            Connect With Our Team
          </h1>

          <p className="mt-2 max-w-xl text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
            For retail distributorship, bulk institutional purchase, or Middle East export inquiries, contact our management desk directly.
          </p>
        </div>
      </section>

      {/* =====================================================
          OFFICIAL CORPORATE DETAILS CARDS
      ===================================================== */}
      <section className="border-b border-gray-200 bg-[#F8FAFC] py-12 px-6 sm:px-10 lg:px-16">
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
              {company?.address || 'Room No. OP 7/452, Manakkadavu, Kozhikode 673019, India'}
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
              {company?.phone1 && (
                <p>
                  <a href={`tel:${company.phone1.replace(/\s+/g, '')}`} className="font-semibold text-gray-900 hover:text-[#EF2034] transition">
                    {company.phone1}
                  </a>
                </p>
              )}
              {company?.phone2 && (
                <p>
                  <a href={`tel:${company.phone2.replace(/\s+/g, '')}`} className="font-semibold text-gray-900 hover:text-[#EF2034] transition">
                    {company.phone2}
                  </a>
                </p>
              )}
              <p className="pt-1">
                <a
                  href={`https://wa.me/${company?.whatsappUAE?.replace(/[^0-9]/g, '') || '971507355418'}?text=Hello%20Boven%20Frontier%2C%20I%20have%20an%20enquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 transition"
                >
                  <MessageCircle size={13} />
                  <span>{company?.whatsappUAE || '+971 50 735 5418'} (UAE)</span>
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
              {company?.email1 && (
                <p>
                  <a href={`mailto:${company.email1}`} className="font-medium text-gray-900 hover:text-[#EF2034] transition">
                    {company.email1}
                  </a>
                </p>
              )}
              {company?.email2 && (
                <p>
                  <a href={`mailto:${company.email2}`} className="font-medium text-gray-900 hover:text-[#EF2034] transition">
                    {company.email2}
                  </a>
                </p>
              )}
              {company?.email3 && (
                <p>
                  <a href={`mailto:${company.email3}`} className="font-medium text-gray-900 hover:text-[#EF2034] transition">
                    {company.email3}
                  </a>
                </p>
              )}
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
              <p className="font-semibold text-gray-900">LLP ID: {company?.llpId || 'ACE-5349'}</p>
              <p className="font-mono text-[11px] text-gray-600">GSTIN: {company?.gstin || '32ABCFB2913N1ZN'}</p>
              <div className="pt-2 text-[10px] text-gray-500 flex items-center gap-1">
                <Clock size={12} className="text-[#104360]" />
                <span>{company?.operatingHours || 'Mon – Sat: 9:00 AM – 6:30 PM (IST)'}</span>
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