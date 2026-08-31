import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  Phone,
} from 'lucide-react'

function ContactStrip() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#f3f1ec] text-[#172b3f]"
    >
      {/* Subtle background detail */}
      <div className="pointer-events-none absolute right-[-120px] top-[-120px] h-[360px] w-[360px] rounded-full border border-[#172b3f]/5" />
      <div className="pointer-events-none absolute right-[-70px] top-[-70px] h-[260px] w-[260px] rounded-full border border-[#c9a84c]/10" />

      <div className="mx-auto max-w-[1600px] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="grid gap-12 lg:grid-cols-12">

          <div className="lg:col-span-7">

            <div className="flex items-center gap-3">
              <span className="h-[5px] w-[5px] rounded-full bg-[#c9a84c]" />

              <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#172b3f]/45">
                Start a conversation
              </span>
            </div>

            <h2 className="mt-8 max-w-[760px] text-[clamp(3.2rem,6vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.065em]">
              Let's build
              <br />
              something
              <br />
              <span className="text-[#c9a84c]">together.</span>
            </h2>

            <p className="mt-8 max-w-lg text-sm leading-7 text-[#172b3f]/55 sm:text-base">
              Whether you're looking for products, distribution opportunities,
              or export supply, speak directly with the Boven Frontier team.
            </p>

          </div>


          {/* ===================================================
              CONTACT DETAILS
          =================================================== */}

          <div className="flex flex-col justify-end lg:col-span-5">

            <div className="border-t border-[#172b3f]/10">

              {/* Phone */}
              <a
                href="tel:+917012777495"
                className="group flex items-center justify-between border-b border-[#172b3f]/10 py-5 transition-colors duration-300 hover:bg-white/50"
              >
                <div className="flex items-center gap-4">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#172b3f]/10 transition-all duration-300 group-hover:border-[#c9a84c]">
                    <Phone
                      size={16}
                      strokeWidth={1.5}
                    />
                  </div>

                  <div>
                    <p className="text-[8px] uppercase tracking-[0.25em] text-[#172b3f]/35">
                      Phone
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      +91 70127 77495
                    </p>
                  </div>

                </div>

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="text-[#172b3f]/30 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>


              {/* WhatsApp */}
              <a
                href="https://wa.me/919207577242"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border-b border-[#172b3f]/10 py-5 transition-colors duration-300 hover:bg-white/50"
              >
                <div className="flex items-center gap-4">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#172b3f]/10 transition-all duration-300 group-hover:border-[#c9a84c]">
                    <MessageCircle
                      size={16}
                      strokeWidth={1.5}
                    />
                  </div>

                  <div>
                    <p className="text-[8px] uppercase tracking-[0.25em] text-[#172b3f]/35">
                      WhatsApp
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      +91 92075 77242
                    </p>
                  </div>

                </div>

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="text-[#172b3f]/30 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>


              {/* Email */}
              <a
                href="mailto:info@bovenfrontier.co.in"
                className="group flex items-center justify-between border-b border-[#172b3f]/10 py-5 transition-colors duration-300 hover:bg-white/50"
              >
                <div className="flex items-center gap-4">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#172b3f]/10 transition-all duration-300 group-hover:border-[#c9a84c]">
                    <Mail
                      size={16}
                      strokeWidth={1.5}
                    />
                  </div>

                  <div>
                    <p className="text-[8px] uppercase tracking-[0.25em] text-[#172b3f]/35">
                      Email
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      info@bovenfrontier.co.in
                    </p>
                  </div>

                </div>

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="text-[#172b3f]/30 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>

            </div>

          </div>

        </div>


        {/* =====================================================
            ENQUIRY AREA
        ===================================================== */}

        <div className="mt-20 grid overflow-hidden border border-[#172b3f]/10 bg-white lg:mt-28 lg:grid-cols-12">

          {/* Left information */}
          <div className="relative bg-[#172b3f] p-8 text-white sm:p-10 lg:col-span-5 lg:p-14">

            <div className="absolute bottom-0 right-0 h-40 w-40 translate-x-1/3 translate-y-1/3 rounded-full border border-white/5" />

            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#c9a84c]">
              B2B Enquiries
            </p>

            <h3 className="mt-6 max-w-md text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl">
              Tell us what
              <br />
              you're looking for.
            </h3>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/50">
              Product supply, distribution partnerships, private
              requirements, or export opportunities.
            </p>

            <div className="mt-12 space-y-4 border-t border-white/10 pt-6">

              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-[0.25em] text-white/35">
                  Manufacturing
                </span>

                <span className="text-xs text-white/70">
                  India
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-[0.25em] text-white/35">
                  Markets
                </span>

                <span className="text-xs text-white/70">
                  India · Middle East
                </span>
              </div>

            </div>

          </div>


          {/* Form */}
          <div className="p-8 sm:p-10 lg:col-span-7 lg:p-14">

            <form className="space-y-7">

              {/* Name + Company */}
              <div className="grid gap-6 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-[8px] font-semibold uppercase tracking-[0.25em] text-navy/60"
                  >
                    Your name *
                  </label>

                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Name"
                    className="w-full border-b border-[#172b3f]/15 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-[#172b3f]/25 focus:border-[#172b3f]"
                  />
                </div>


                <div>
                  <label
                    htmlFor="company"
                    className="mb-2 block text-[8px] font-semibold uppercase tracking-[0.25em] text-navy/60"
                  >
                    Company
                  </label>

                  <input
                    id="company"
                    type="text"
                    placeholder="Company name"
                    className="w-full border-b border-[#172b3f]/15 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-[#172b3f]/25 focus:border-[#172b3f]"
                  />
                </div>

              </div>


              {/* Email + Region */}
              <div className="grid gap-6 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[8px] font-semibold uppercase tracking-[0.25em] text-navy/60"
                  >
                    Email *
                  </label>

                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="w-full border-b border-[#172b3f]/15 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-[#172b3f]/25 focus:border-[#172b3f]"
                  />
                </div>


                <div>
                  <label
                    htmlFor="region"
                    className="mb-2 block text-[8px] font-semibold uppercase tracking-[0.25em] text-navy/60"
                  >
                    Region
                  </label>

                  <input
                    id="region"
                    type="text"
                    placeholder="Country / region"
                    className="w-full border-b border-[#172b3f]/15 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-[#172b3f]/25 focus:border-[#172b3f]"
                  />
                </div>

              </div>


              {/* Buyer type */}
              <div>

                <label
                  htmlFor="buyer-type"
                  className="mb-2 block text-[8px] font-semibold uppercase tracking-[0.25em] text-navy/60"
                >
                  I am a
                </label>

                <select
                  id="buyer-type"
                  defaultValue=""
                  className="w-full border-b border-[#172b3f]/15 bg-transparent px-0 py-3 text-sm text-[#172b3f] outline-none transition-colors focus:border-[#172b3f]"
                >
                  <option value="" disabled>
                    Select buyer type
                  </option>
                  <option>Distributor</option>
                  <option>Wholesaler</option>
                  <option>Retailer</option>
                  <option>Institutional buyer</option>
                  <option>Export buyer</option>
                  <option>Other</option>
                </select>

              </div>


              {/* Product interest */}
              <div>

                <label
                  htmlFor="product"
                  className="mb-2 block text-[8px] font-semibold uppercase tracking-[0.25em] text-navy/60"
                >
                  Product interest
                </label>

                <select
                  id="product"
                  defaultValue=""
                  className="w-full border-b border-[#172b3f]/15 bg-transparent px-0 py-3 text-sm text-[#172b3f] outline-none transition-colors focus:border-[#172b3f]"
                >
                  <option value="" disabled>
                    Select a brand / category
                  </option>
                  <option>LEXONE</option>
                  <option>FABIE PLUS</option>
                  <option>KARE</option>
                  <option>Multiple products</option>
                  <option>Not sure yet</option>
                </select>

              </div>


              {/* Message */}
              <div>

                <label
                  htmlFor="message"
                  className="mb-2 block text-[8px] font-semibold uppercase tracking-[0.25em] text-navy/60"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows="3"
                  placeholder="Tell us about your requirement..."
                  className="w-full resize-none border-b border-[#172b3f]/15 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-[#172b3f]/25 focus:border-[#172b3f]"
                />

              </div>


              {/* Submit */}
              <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">

                <p className="max-w-xs text-[9px] leading-5 text-[#172b3f]/35">
                  We use your information only to respond to your enquiry.
                </p>

                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-4 bg-[#172b3f] px-7 py-4 text-[9px] font-semibold uppercase tracking-[0.23em] text-white transition-all duration-300 hover:bg-[#c9a84c] hover:text-[#172b3f]"
                >
                  Start an enquiry

                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </button>

              </div>

            </form>

          </div>

        </div>


        {/* =====================================================
            BOTTOM CREDIBILITY LINE
        ===================================================== */}

        <div className="mt-10 flex flex-col gap-3 border-t border-[#172b3f]/10 pt-5 text-[8px] uppercase tracking-[0.25em] text-[#172b3f]/30 sm:flex-row sm:items-center sm:justify-between">

          <span>
            Boven Frontier International LLP
          </span>

          <span>
            Manufactured in Kerala · India
          </span>

          <span>
            India · Middle East
          </span>

        </div>

      </div>
    </section>
  )
}

export default ContactStrip