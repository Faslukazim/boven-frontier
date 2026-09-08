import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  Phone,
  CheckCircle,
} from 'lucide-react'
import { useStore } from '../context/useStore'

function ContactStrip() {
  const [searchParams] = useSearchParams()
  const { products } = useStore()

  const [formData, setFormData] = useState(() => ({
    name: '',
    company: '',
    email: '',
    phone: '',
    region: '',
    buyerType: '',
    product: searchParams.get('product') || '',
    message: '',
  }))

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Persist inquiry to local storage so leads are safely retained
    try {
      const existing = JSON.parse(localStorage.getItem('bf_inquiries') || '[]')
      const newLead = {
        ...formData,
        id: `lead-${Date.now()}`,
        submittedAt: new Date().toISOString(),
      }
      localStorage.setItem('bf_inquiries', JSON.stringify([newLead, ...existing]))
    } catch (err) {
      console.warn('Local storage inquiry error:', err)
    }

    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 500)
  }

  const handleWhatsAppDirect = () => {
    const text = `*New B2B Enquiry - Boven Frontier Web*\n\n*Name:* ${formData.name || 'Not specified'}\n*Company:* ${formData.company || 'Not specified'}\n*Email:* ${formData.email || 'Not specified'}\n*Phone:* ${formData.phone || 'Not specified'}\n*Region:* ${formData.region || 'Not specified'}\n*Buyer Type:* ${formData.buyerType || 'Not specified'}\n*Product Interest:* ${formData.product || 'General Products'}\n*Message:* ${formData.message || 'I would like more information on bulk/export pricing.'}`

    window.open(
      `https://wa.me/971507355418?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#f3f1ec] text-[#104360]"
    >
      {/* Subtle Background Circles */}
      <div className="pointer-events-none absolute -right-28 -top-28 h-96 w-96 rounded-full border border-[#104360]/5" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-[#EF2034]/10" />

      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16 py-16 sm:py-24">
        {/* =====================================================
            HEADER & QUICK CONTACTS
        ===================================================== */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#EF2034] mb-2">
              Start a conversation
            </p>

            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#104360]">
              Let's build something together.
            </h2>

            <p className="mt-4 max-w-lg text-xs sm:text-sm leading-relaxed text-gray-500">
              Whether you are an institutional buyer, domestic distributor, or looking for container-load export supply to the Middle East, speak directly with the Boven Frontier team.
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div className="flex flex-col justify-end lg:col-span-5">
            <div className="border-t border-[#104360]/10">
              {/* Phone */}
              <a
                href="tel:+919633890447"
                className="group flex items-center justify-between border-b border-[#104360]/10 py-4 sm:py-5 transition-colors hover:bg-white/40 px-2"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#104360]/10 bg-white transition group-hover:border-[#EF2034]">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.25em] text-[#104360]/40">
                      Direct Phone
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-gray-900">
                      +91 96338 90447 / +91 70127 77495
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-[#104360]/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/971507355418?text=Hello%20Boven%20Frontier%2C%20I%20have%20an%20enquiry%20regarding%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-[#104360]/10 py-4 sm:py-5 transition-colors hover:bg-white/40 px-2"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#104360]/10 bg-white transition group-hover:border-[#EF2034]">
                    <MessageCircle size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.25em] text-[#104360]/40">
                      WhatsApp Quick Chat
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-gray-900">
                      +971 50 735 5418
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-[#104360]/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              {/* Email */}
              <a
                href="mailto:info@bovenfrontier.co.in"
                className="group flex items-center justify-between border-b border-[#104360]/10 py-4 sm:py-5 transition-colors hover:bg-white/40 px-2"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#104360]/10 bg-white transition group-hover:border-[#EF2034]">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.25em] text-[#104360]/40">
                      Official Email
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-gray-900">
                      info@bovenfrontier.co.in / aswin@bovenfrontier.co.in
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-[#104360]/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </div>

        {/* =====================================================
            ENQUIRY FORM
        ===================================================== */}
        <div className="mt-14 sm:mt-20 grid overflow-hidden border border-[#104360]/10 bg-white shadow-sm lg:grid-cols-12">
          {/* Information Panel */}
          <div className="relative bg-[#104360] p-8 text-white sm:p-12 lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#EF2034] mb-2">
                B2B & Export Desk
              </p>

              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight">
                Tell us your requirement.
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-white/60 leading-relaxed">
                Wholesale supply, private label (OEM) formulation, custom bottle packaging, or bulk freight export.
              </p>
            </div>

            <div className="mt-10 space-y-4 border-t border-white/10 pt-6 text-xs text-white/80">
              <div className="flex justify-between">
                <span className="text-white/40 text-[10px] uppercase tracking-wider">
                  Origin
                </span>
                <span>India</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40 text-[9px] uppercase tracking-wider">
                  Target Regions
                </span>
                <span>India · UAE · Saudi Arabia · GCC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40 text-[9px] uppercase tracking-wider">
                  Response Time
                </span>
                <span className="text-[#EF2034]">Within 24 Hours</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-10 lg:col-span-7">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                  <CheckCircle size={28} />
                </div>
                <h4 className="text-xl font-medium text-gray-900">
                  Enquiry Received
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-gray-500 max-w-sm">
                  Thank you, <strong>{formData.name}</strong>. Our export and distribution team will review your requirement and reach out shortly.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={handleWhatsAppDirect}
                    className="inline-flex items-center gap-2 bg-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-emerald-700"
                  >
                    <MessageCircle size={14} />
                    Follow up on WhatsApp
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        region: '',
                        buyerType: '',
                        product: '',
                        message: '',
                      })
                    }}
                    className="border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#104360]/70 mb-1"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Rahul Sharma"
                      className="w-full border-b border-[#104360]/20 bg-transparent py-2.5 text-base sm:text-sm outline-none transition focus:border-[#104360]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#104360]/70 mb-1"
                    >
                      Company / Organization
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      placeholder="e.g. Gulf Trading LLC"
                      className="w-full border-b border-[#104360]/20 bg-transparent py-2.5 text-base sm:text-sm outline-none transition focus:border-[#104360]"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#104360]/70 mb-1"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="you@company.com"
                      className="w-full border-b border-[#104360]/20 bg-transparent py-2.5 text-base sm:text-sm outline-none transition focus:border-[#104360]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#104360]/70 mb-1"
                    >
                      Phone / WhatsApp Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+91 / +971..."
                      className="w-full border-b border-[#104360]/20 bg-transparent py-2.5 text-base sm:text-sm outline-none transition focus:border-[#104360]"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-region"
                      className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#104360]/70 mb-1"
                    >
                      Country / Region
                    </label>
                    <input
                      id="contact-region"
                      type="text"
                      value={formData.region}
                      onChange={(e) =>
                        setFormData({ ...formData, region: e.target.value })
                      }
                      placeholder="e.g. UAE, Saudi Arabia, India..."
                      className="w-full border-b border-[#104360]/20 bg-transparent py-2.5 text-base sm:text-sm outline-none transition focus:border-[#104360]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-buyer-type"
                      className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#104360]/70 mb-1"
                    >
                      Buyer Profile
                    </label>
                    <select
                      id="contact-buyer-type"
                      value={formData.buyerType}
                      onChange={(e) =>
                        setFormData({ ...formData, buyerType: e.target.value })
                      }
                      className="w-full border-b border-[#104360]/20 bg-transparent py-2.5 text-base sm:text-sm outline-none transition focus:border-[#104360]"
                    >
                      <option value="">Select Buyer Type</option>
                      <option value="Export Importer">Export Importer / Trader</option>
                      <option value="Distributor">FMCG / Retail Distributor</option>
                      <option value="Wholesaler">Wholesaler</option>
                      <option value="Institutional Buyer">Hotel / Hospital / Facility Buyer</option>
                      <option value="Private Label OEM">Private Label / Brand Owner</option>
                      <option value="Other">Other Requirement</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-product"
                    className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#104360]/70 mb-1"
                  >
                    Product Interest
                  </label>
                  <select
                    id="contact-product"
                    value={formData.product}
                    onChange={(e) =>
                      setFormData({ ...formData, product: e.target.value })
                    }
                    className="w-full border-b border-[#104360]/20 bg-transparent py-2.5 text-base sm:text-sm outline-none transition focus:border-[#104360]"
                  >
                    <option value="">Select product or general range</option>
                    <option value="All Products Portfolio">Complete Portfolio (Container Load)</option>
                    <option value="Laundry Range">Laundry Detergents (Powder & Liquids)</option>
                    <option value="Floor Care Range">Floor Cleaners & Perfumed Phenyl</option>
                    <option value="Disinfection & Hygiene">Disinfectants & Handwash</option>
                    {products.map((p) => (
                      <option key={p.id} value={`${p.brand} ${p.name}`}>
                        {p.brand} - {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#104360]/70 mb-1"
                  >
                    Estimated Quantity & Requirements
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us about order volumes, destination port, or specific variants needed..."
                    className="w-full resize-none border-b border-[#104360]/20 bg-transparent py-2.5 text-base sm:text-sm outline-none transition focus:border-[#104360]"
                  />
                </div>

                {/* Submit Actions */}
                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="inline-flex items-center justify-center gap-2 rounded border border-emerald-600 bg-emerald-50 px-5 py-3.5 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-100"
                  >
                    <MessageCircle size={15} />
                    Send via WhatsApp
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex items-center justify-center gap-3 bg-[#104360] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#EF2034] hover:text-white disabled:opacity-50"
                  >
                    <span>{loading ? 'Submitting...' : 'Submit Enquiry'}</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactStrip