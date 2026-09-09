import { Link } from 'react-router-dom'
import { ArrowUpRight, Factory, Globe2, ShieldCheck, Users } from 'lucide-react'
import ContactStrip from '../components/ContactStrip'
import Footer from '../components/Footer'
import { useStore } from '../context/useStore'
import { COMPANY } from '../constants'

function About() {
  const { company: storeCompany } = useStore()
  const company = storeCompany || COMPANY

  const pillars = [
    ['01', Factory, 'Manufacturing', 'Direct access to Indian production capabilities, controlled sourcing and consistent batch supply.'],
    ['02', ShieldCheck, 'Quality', 'Professional formulations and specification-led supply built for retail, institutional and export channels.'],
    ['03', Globe2, 'Trade', 'Container-ready distribution connecting Indian manufacturing with domestic and GCC demand.'],
    ['04', Users, 'Partnership', 'Long-term relationships with distributors, wholesalers and institutional buyers.'],
  ]

  return (
    <main className="bg-[#F7F5F0] text-[#104360]">
      <section className="relative overflow-hidden bg-[#104360] text-white">
        <div className="absolute inset-y-0 right-0 w-[42%] border-l border-white/10 opacity-50" />
        <div className="mx-auto grid min-h-[68vh] max-w-[1600px] items-end gap-10 px-5 py-16 sm:px-10 lg:grid-cols-12 lg:px-16 lg:py-24">
          <div className="relative z-10 lg:col-span-9">
            <div className="mb-8 flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] text-white/45">
              <span className="text-[#EF2034]">02</span><span className="h-px w-10 bg-[#EF2034]" /> About Boven Frontier
            </div>
            <h1 className="max-w-5xl text-[clamp(3.4rem,8vw,8rem)] font-medium leading-[0.88] tracking-[-0.07em]">
              Made in India.<br /><span className="text-[#EF2034]">Moved by ambition.</span>
            </h1>
          </div>
          <div className="relative z-10 lg:col-span-3 lg:pb-2">
            <p className="border-l border-[#EF2034] pl-5 text-sm leading-7 text-white/65">
              Boven Frontier connects quality consumer goods manufacturing with distributors, retailers and international trade networks.
            </p>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1600px] justify-between border-t border-white/10 px-5 py-4 text-[8px] uppercase tracking-[0.25em] text-white/35 sm:px-10 lg:px-16">
          <span>India / GCC / International</span><span>Quality · Reach · Growth</span>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#EF2034]">01 — The company</p>
            <h2 className="mt-5 text-4xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl">A trade partner built around consistency.</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="text-xl leading-8 tracking-tight text-[#104360]/75 sm:text-2xl">
              We bring together manufacturing, consumer brands and commercial distribution under one clear objective: make dependable products easier to source, move and grow.
            </p>
            <p className="mt-8 max-w-2xl text-sm leading-7 text-[#104360]/55">
              From everyday hygiene products to container-scale export, our role is to make the connection between production and market demand straightforward. We work with buyers who value reliable specifications, practical commercial terms and responsive communication.
            </p>
            <Link to="/contact" className="group mt-10 inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#104360]">
              Start a conversation <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EF2034] text-white transition group-hover:translate-x-1"><ArrowUpRight size={15} /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[#104360]/10 bg-white">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-10 lg:px-16 lg:py-28">
          <div className="mb-14 flex items-end justify-between gap-6">
            <div><p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#EF2034]">02 — How we work</p><h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] sm:text-6xl">Four things we don't compromise.</h2></div>
            <span className="hidden font-mono text-[9px] text-[#104360]/30 sm:block">BF / 2026</span>
          </div>
          <div className="grid border-l border-t border-[#104360]/10 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(([number, Icon, title, desc]) => (
              <article key={number} className="group min-h-[300px] border-b border-r border-[#104360]/10 p-7 transition hover:bg-[#104360] hover:text-white sm:p-9">
                <div className="flex items-center justify-between"><span className="font-mono text-[9px] text-[#EF2034]">{number}</span><Icon size={20} strokeWidth={1.4} className="text-[#104360]/35 transition group-hover:text-white/50" /></div>
                <h3 className="mt-20 text-xl font-medium tracking-tight">{title}</h3>
                <p className="mt-3 text-xs leading-6 text-[#104360]/55 transition group-hover:text-white/55">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#104360] text-white">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-24 sm:px-10 lg:grid-cols-12 lg:px-16 lg:py-32">
          <div className="lg:col-span-7"><p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#EF2034]">03 — Company credentials</p><h2 className="mt-5 text-4xl font-medium tracking-[-0.05em] sm:text-6xl">A real company behind every shipment.</h2></div>
          <div className="lg:col-span-4 lg:col-start-9">
            <dl className="divide-y divide-white/10 border-y border-white/10 text-xs">
              {[['Legal entity', company.name], ['LLP registration', company.llpId], ['GSTIN', company.gstin], ['Origin', company.origin || 'India'], ['Office', company.address]].map(([label, value]) => <div key={label} className="grid grid-cols-2 gap-4 py-4"><dt className="uppercase tracking-[0.18em] text-white/30">{label}</dt><dd className="text-right text-white/75">{value}</dd></div>)}
            </dl>
          </div>
        </div>
      </section>

      <ContactStrip />
      <Footer />
    </main>
  )
}

export default About
