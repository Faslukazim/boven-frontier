import { MapPin, Phone, Mail, ShieldCheck } from 'lucide-react'
import ContactStrip from '../components/ContactStrip'
import Footer from '../components/Footer'

function Contact() {
  return (
    <main className="bg-white text-[#104360]">
      {/* Contact Header */}
      <section className="bg-[#104360] px-6 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-[1600px] px-2 sm:px-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#EF2034]">
              Direct Communication
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
            Connect With Our Team
          </h1>

          <p className="mt-4 max-w-xl text-sm sm:text-base text-white/70">
            For retail distributorship, bulk institutional purchase, or Middle East export inquiries, contact our management desk directly.
          </p>
        </div>
      </section>

      {/* Corporate Details Bar */}
      <section className="border-b border-gray-200 bg-[#f8f9fa] py-12 px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1600px] grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-xs border border-gray-200 text-[#EF2034]">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-gray-500">
                Corporate & Registered Office
              </p>
              <p className="mt-1 text-xs text-gray-800 leading-relaxed">
                Room No. OP 7/452, Manakkadavu, Kozhikode 673019, India
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-xs border border-gray-200 text-[#EF2034]">
              <Phone size={18} />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-gray-500">
                Direct Calls / WhatsApp
              </p>
              <p className="mt-1 text-xs text-gray-800">
                +91 70127 77495
                <br />
                +91 92075 77242
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-xs border border-gray-200 text-[#EF2034]">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-gray-500">
                Email Communications
              </p>
              <p className="mt-1 text-xs text-gray-800">
                info@bovenfrontier.co.in
                <br />
                shidil@bovenfrontier.co.in
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-xs border border-gray-200 text-[#EF2034]">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-gray-500">
                Entity Registration
              </p>
              <p className="mt-1 text-xs text-gray-800">
                LLP ID: ACE-5349
                <br />
                Boven Frontier International LLP
              </p>
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