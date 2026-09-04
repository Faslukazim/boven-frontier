import { Link } from 'react-router-dom'
import {
  Award,
  Factory,
  Globe,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'
import ContactStrip from '../components/ContactStrip'
import Footer from '../components/Footer'

function About() {
  const pillars = [
    {
      icon: Factory,
      title: 'Advanced Manufacturing',
      desc: 'Precision blending tanks and high-speed automated bottling lines located in India, engineered for consistent chemical purity and high volume throughput.',
    },
    {
      icon: Award,
      title: 'Quality & Eco-Standards',
      desc: 'Formulated with premium biodegradable surfactants and long-lasting aromatics. Safe on human skin and fabric threads while aggressive on grime.',
    },
    {
      icon: Globe,
      title: 'Export Logistics Ready',
      desc: 'Container-ready freight packaging, international barcoding, and documentation designed specifically for Gulf and Middle Eastern customs clearance.',
    },
    {
      icon: Sparkles,
      title: 'Contract Bottling (OEM)',
      desc: 'Turnkey private-label solutions for regional brands and retail supermarket chains, including custom bottle shapes, label printing, and bespoke fragrances.',
    },
  ]

  return (
    <main className="bg-white text-[#172b3f]">
      {/* Hero Banner */}
      <section className="bg-[#172b3f] px-6 py-20 sm:py-28 text-white">
        <div className="mx-auto max-w-[1600px] px-2 sm:px-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[5px] w-[5px] rounded-full bg-[#c9a84c]" />
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[#c9a84c]">
              About Boven Frontier International LLP
            </p>
          </div>

          <h1 className="max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.94] tracking-[-0.06em]">
            Manufactured in India.
            <br />
            <span className="text-[#c9a84c]">Built for global standards.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-sm sm:text-base leading-relaxed text-white/70">
            Boven Frontier International LLP is an Indian chemical and household cleaning manufacturer headquartered in Kozhikode, India (LLP Reg: ACE-5349). We manufacture, package, and distribute trusted consumer hygiene brands including LEXONE, FABIE PLUS, and KARE, produced at our facilities in India.
          </p>
        </div>
      </section>

      {/* Company Overview & Facility */}
      <section className="mx-auto max-w-[1600px] px-6 py-20 sm:px-10 lg:px-16 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#c9a84c]">
              Our Heritage & Infrastructure
            </span>

            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#172b3f]">
              Reliable chemistry for everyday homes and commercial spaces.
            </h2>

            <p className="text-sm leading-relaxed text-gray-600">
              Founded with a clear mission to elevate cleaning product standards in India and the GCC corridor, Boven Frontier combines state-of-the-art chemical blending with deep supply-chain integration.
            </p>

            <p className="text-sm leading-relaxed text-gray-600">
              Our manufacturing facility in India handles complete raw material synthesis, viscosity optimization, foaming testing, quality control, bottle blow-moulding inspection, and automated capping across liquids, powders, and gel detergents.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-gray-100">
              <div>
                <p className="text-2xl font-bold text-[#172b3f]">14+</p>
                <p className="text-[10px] uppercase tracking-wider text-gray-500">
                  Formulated SKUs
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#c9a84c]">100%</p>
                <p className="text-[10px] uppercase tracking-wider text-gray-500">
                  Batch Quality Tested
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl bg-[#f8f8f6] p-8 border border-gray-200/80 shadow-xs">
              <h3 className="text-lg font-semibold text-[#172b3f] mb-4">
                Manufacturing Highlights
              </h3>

              <div className="space-y-4">
                {[
                  'Automated low-suds formulation blending tanks',
                  'High precision bottle filling from 250ml to 5-Litre institutional cans',
                  'Spouted refill pouch packing machinery',
                  'In-house stability, pH balance, and microbial resistance laboratory',
                  'Export shipping container docking and palleted carton freight handling',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={17} className="text-[#c9a84c] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-lg bg-[#172b3f] p-4 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold">Have OEM or Contract Needs?</p>
                  <p className="text-[10px] text-white/60">We formulate custom white-label batches</p>
                </div>
                <Link
                  to="/contact"
                  className="rounded bg-[#c9a84c] px-3 py-1.5 text-[10px] font-semibold text-[#172b3f] uppercase tracking-wider hover:bg-white"
                >
                  Inquire
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="bg-[#f8f9fa] py-20 px-6 sm:px-10 lg:px-16 border-y border-gray-200/70">
        <div className="mx-auto max-w-[1600px]">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#c9a84c]">
              Why Work With Us
            </span>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-[#172b3f]">
              The Boven Frontier Commitment
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-white p-7 border border-gray-200/80 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#172b3f] text-[#c9a84c] mb-6">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base font-semibold text-[#172b3f] mb-2">
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

      {/* Contact Strip and Footer */}
      <ContactStrip />
      <Footer />
    </main>
  )
}

export default About