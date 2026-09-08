import { Link } from 'react-router-dom'
import {
  Award,
  Factory,
  Globe,
  Sparkles,
  Users,
  Handshake,
  ArrowRight,
} from 'lucide-react'
import ContactStrip from '../components/ContactStrip'
import Footer from '../components/Footer'
import { COMPANY } from '../constants'

function About() {
  const pillars = [
    {
      icon: Factory,
      title: 'Advanced Sourcing & Manufacturing',
      desc: 'Formulated and packaged at certified production facilities in India, ensuring batch consistency, high active matter, and strict compliance.',
    },
    {
      icon: Award,
      title: 'Quality & Innovation Focus',
      desc: 'Continuous formulation enhancement for everyday consumer hygiene, balanced for maximum stain/grime removal while safe on surfaces.',
    },
    {
      icon: Globe,
      title: 'Domestic & Global Distribution',
      desc: 'Container-load export and regional wholesale supply chains engineered for Indian domestic markets, the GCC, and international trade.',
    },
    {
      icon: Sparkles,
      title: 'Trusted Consumer Brands',
      desc: 'Manufacturing and distributing trusted consumer hygiene brands including LEXONE, FABIE PLUS, and KARE produced at facilities in India.',
    },
  ]

  return (
    <main className="bg-white text-[#104360]">
      {/* =====================================================
          HERO BANNER
      ===================================================== */}
      <section className="bg-[#104360] px-6 py-20 sm:py-28 text-white relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl bg-[#EF2034]"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-[1600px] px-2 sm:px-10 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#EF2034]">
              About Boven Frontier International LLP
            </span>
          </div>

          <h1 className="max-w-4xl text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
            Manufactured in India.
            <br />
            <span className="text-[#EF2034]">Built for global standards.</span>
          </h1>

          <p className="mt-6 max-w-3xl text-sm sm:text-base leading-relaxed text-white/80 font-normal">
            BOVEN FRONTIER INTERNATIONAL LLP is a dynamic and forward-looking consumer goods company engaged in the manufacturing, domestic distribution, and international export of quality Food and Non-Food products. With a strong focus on quality, innovation, and customer satisfaction, we aim to bring reliable products to consumers while creating strong and sustainable market networks.
          </p>
        </div>
      </section>

      {/* =====================================================
          OVERVIEW & CORE CAPABILITIES
      ===================================================== */}
      <section className="mx-auto max-w-[1600px] px-6 py-20 sm:px-10 lg:px-16 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#EF2034]">
              Global Trade & Manufacturing
            </span>

            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#104360] leading-snug">
              From manufacturing to distribution and global trade.
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-gray-600">
              From manufacturing to distribution and global trade, BOVEN FRONTIER INTERNATIONAL LLP connects quality products with diverse markets. Our growing portfolio spans everyday consumer essentials, supported by efficient sourcing, manufacturing capabilities, and a robust distribution network.
            </p>

            {/* Vision Callout Box */}
            <div className="rounded-xl border-l-4 border-[#EF2034] bg-[#f8f9fa] p-5 sm:p-6 shadow-2xs">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#104360] mb-1">
                Our Driving Vision
              </p>
              <p className="text-base sm:text-lg font-medium italic text-gray-800">
                “Quality, Reach and Growth”
              </p>
              <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                Driven by this vision, we continuously explore new markets, develop meaningful business partnerships, and deliver products that create value for customers and partners alike.
              </p>
            </div>

            <p className="text-sm leading-relaxed text-gray-600">
              We manufacture, package, and distribute trusted consumer hygiene brands including <strong className="text-[#104360]">LEXONE</strong>, <strong className="text-[#104360]">FABIE PLUS</strong>, and <strong className="text-[#104360]">KARE</strong>, produced at our facilities in India.
            </p>

            <div className="pt-2">
              <p className="font-script text-xl sm:text-2xl text-[#104360] font-normal">
                {COMPANY.tagline}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#f8f9fa] p-7 sm:p-9 border border-gray-200/80 shadow-xs space-y-6">
              <h3 className="text-base font-bold uppercase tracking-wider text-[#104360] border-b border-gray-200 pb-3">
                Company Credentials
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Legal Entity</p>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">{COMPANY.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">LLP Registration</p>
                    <p className="text-sm font-semibold text-[#EF2034] mt-0.5">{COMPANY.llpId}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">GSTIN</p>
                    <p className="text-xs font-semibold text-gray-900 mt-0.5">{COMPANY.gstin}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Corporate Office</p>
                  <p className="text-xs text-gray-700 mt-0.5 leading-relaxed">{COMPANY.address}</p>
                </div>

                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Product Portfolio</p>
                  <p className="text-xs text-gray-700 mt-0.5">Quality Food & Non-Food Consumer Goods</p>
                </div>

                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Hygiene Brands</p>
                  <p className="text-xs font-medium text-gray-800 mt-0.5">LEXONE · FABIE PLUS · KARE</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#104360] px-4 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#EF2034] transition shadow-xs"
                >
                  <span>Connect With Our Team</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PILLARS GRID
      ===================================================== */}
      <section className="bg-[#f8f9fa] py-20 px-6 sm:px-10 lg:px-16 border-y border-gray-200/70">
        <div className="mx-auto max-w-[1600px]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#EF2034]">
              Our Foundation
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-semibold tracking-tight text-[#104360]">
              Built for Quality, Reach and Growth
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-white p-7 border border-gray-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#104360]/5 text-[#EF2034] mb-5">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <h3 className="text-base font-semibold text-[#104360] mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-gray-600">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          STRATEGIC PARTNERSHIPS & LEAD GENERATION (FROM CLIENT DATA)
      ===================================================== */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 mx-auto max-w-[1600px]">
        <div className="grid gap-12 lg:grid-cols-2">
          
          {/* Relationship-Driven Lead Generation */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 sm:p-12 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EF2034]/10 text-[#EF2034]">
                  <Users size={20} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#EF2034]">
                  Relationship-Driven Lead Generation
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-[#104360]">
                We believe lasting business begins with meaningful relationships.
              </h3>

              <div className="mt-5 space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                <p>
                  At BOVEN FRONTIER INTERNATIONAL LLP, we go beyond traditional lead generation by building strong connections with distributors, retailers, wholesalers, importers, exporters, and business partners.
                </p>
                <p>
                  Through a relationship-first approach, we identify the right opportunities, understand market needs, and create partnerships that deliver long-term value.
                </p>
                <p>
                  Our approach focuses on <strong className="text-[#104360]">trust, communication, market understanding, and consistent engagement</strong>—turning initial connections into productive business relationships and sustainable growth.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#104360]">
                Connect with us. Explore opportunities. Grow together.
              </span>
              <Link
                to="/contact"
                className="text-xs font-bold text-[#EF2034] hover:text-[#104360] flex items-center gap-1.5 transition"
              >
                <span>Inquire</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* B2B Strategic Events & Partnership Networks */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 sm:p-12 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#104360]/10 text-[#104360]">
                  <Handshake size={20} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#104360]">
                  B2B Strategic Events & Partnership Networks
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-[#104360]">
                Creating connections that create opportunities.
              </h3>

              <div className="mt-5 space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                <p>
                  At BOVEN FRONTIER INTERNATIONAL LLP, we actively build and strengthen our B2B ecosystem through strategic business events, industry engagements, trade exhibitions, buyer–seller meets, and partnership networks.
                </p>
                <p>
                  These platforms help us connect with distributors, retailers, wholesalers, importers, exporters, manufacturers, and strategic business partners across domestic and international markets.
                </p>
                <p>
                  Our relationship-focused approach enables us to discover new markets, exchange industry insights, develop collaborations, and create long-term commercial opportunities. By bringing the right businesses together, we aim to transform connections into sustainable partnerships and measurable growth.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#104360]">
                Connect • Collaborate • Expand • Grow
              </span>
              <Link
                to="/contact"
                className="text-xs font-bold text-[#EF2034] hover:text-[#104360] flex items-center gap-1.5 transition"
              >
                <span>Partner</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Contact Strip and Footer */}
      <ContactStrip />
      <Footer />
    </main>
  )
}

export default About