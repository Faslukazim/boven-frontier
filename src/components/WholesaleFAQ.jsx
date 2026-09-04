import { useState } from 'react'
import { ChevronDown, HelpCircle, MessageCircle, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function WholesaleFAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      q: 'What is the Minimum Order Quantity (MOQ) for wholesale and export orders?',
      a: 'For standard stock SKUs under our LEXONE and FABIE PLUS brands, our MOQ is 50 cartons per SKU for domestic supply and 100 cartons for export shipments. We also accommodate mixed-container stuffing (FCL) where multiple products are consolidated in a single 20ft or 40ft container.',
    },
    {
      q: 'Can we receive lab test reports and product samples prior to placing a bulk order?',
      a: 'Yes. We dispatch sample kits to verified distributors, supermarket buyers, and commercial facilities worldwide. Each sample dispatch includes full formulation specifications, Certificate of Analysis (COA), and Material Safety Data Sheets (MSDS).',
    },
    {
      q: 'Do you offer Private Label and Contract Manufacturing (OEM)?',
      a: 'Absolutely. We provide end-to-end OEM and contract bottling solutions. We can manufacture using your desired formulation viscosity, active matter percentage, and proprietary fragrance profiles, packaged in your custom bottle molds and private labels with induction-sealed leak-proof caps.',
    },
    {
      q: 'What are your export shipping terms and primary ports of dispatch?',
      a: 'We operate primarily on FOB Indian Ports and CIF Jebel Ali (Dubai / UAE), Dammam (KSA), and Muscat (Oman). We handle complete export documentation, customs clearance, and palletized ocean freight logistics.',
    },
    {
      q: 'How are liquids packed to prevent leakage during long ocean container transits?',
      a: 'All our bottles utilize induction heat-sealed foil liners beneath heavy-duty threaded caps. Cartons are manufactured from heavy 5-ply export-grade corrugated board, shrink-wrapped on treated wooden/plastic pallets to ensure zero transit leakage or carton collapse.',
    },
    {
      q: 'What are the accepted payment terms for commercial orders?',
      a: 'We accept Wire Transfer (T/T), with standard terms of 30% advance on order confirmation and 70% against Bill of Lading (B/L) copy. For large-scale container export orders, we also accept Irrevocable Letters of Credit (L/C at sight) from prime international banks.',
    },
  ]

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section className="bg-white py-16 sm:py-24 border-t border-[#172b3f]/10">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Support Desk */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle size={16} className="text-[#b08d2e]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#b08d2e]">
                Wholesale Knowledge Base
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#172b3f] leading-tight">
              Frequently Asked Questions for B2B Buyers.
            </h2>

            <p className="mt-4 text-xs sm:text-sm text-gray-500 leading-relaxed">
              Find quick answers regarding our minimum order volumes, private label capabilities, international shipping corridors, and compliance standards.
            </p>

            <div className="mt-8 rounded-xl border border-[#172b3f]/10 bg-[#f8f8f6] p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#172b3f]">
                Need a Custom Formulation or Pricing?
              </h3>
              <p className="mt-2 text-xs text-[#172b3f]/70 leading-relaxed">
                Speak directly with our B2B Export Desk for custom container pricing, bulk drums (20L/200L), and OEM packaging schedules.
              </p>

              <div className="mt-5 flex flex-col gap-2.5">
                <a
                  href="https://wa.me/919207577242?text=Hello%20Boven%20Frontier,%20I%20have%20a%20B2B%20wholesale%20enquiry"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-700 transition"
                >
                  <MessageCircle size={15} />
                  WhatsApp B2B Desk
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#172b3f]/20 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#172b3f] hover:bg-gray-50 transition"
                >
                  Contact Form
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-8 divide-y divide-[#172b3f]/10 rounded-xl border border-[#172b3f]/10 bg-white overflow-hidden shadow-xs">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <div key={index} className="transition-colors">
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left hover:bg-gray-50/70 transition"
                  >
                    <span className="text-sm sm:text-base font-semibold text-[#172b3f]">
                      {faq.q}
                    </span>
                    <span
                      className={`shrink-0 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-[#172b3f] text-white border-[#172b3f]' : ''
                      }`}
                    >
                      <ChevronDown size={15} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm leading-relaxed text-[#172b3f]/75 border-t border-gray-100 bg-gray-50/40 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
