import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react'
import ContactStrip from '../components/ContactStrip'
import Footer from '../components/Footer'
import { useStore } from '../context/useStore'

function Contact() {
  const { company } = useStore()
  const phone = company?.phone1?.replace(/\s+/g, '') || '+919633890447'
  const whatsapp = company?.whatsappUAE?.replace(/[^0-9]/g, '') || '971507355418'

  return (
    <main className="bg-[#F7F5F0] text-[#104360]">
      <section className="bg-[#104360] text-white">
        <div className="mx-auto grid min-h-[60vh] max-w-[1600px] items-end gap-12 px-5 py-16 sm:px-10 lg:grid-cols-12 lg:px-16 lg:py-24">
          <div className="lg:col-span-8">
            <p className="mb-8 text-xs font-bold uppercase tracking-wider text-white/80"><span className="mr-4 text-[#EF2034]">04</span> Direct communication</p>
            <h1 className="text-[clamp(3.4rem,8vw,8rem)] font-medium leading-[0.86] tracking-[-0.07em]">Let's make<br /><span className="text-[#EF2034]">something move.</span></h1>
          </div>
          <div className="lg:col-span-3 lg:col-start-10 lg:pb-2"><p className="border-l border-[#EF2034] pl-5 text-sm sm:text-base leading-relaxed text-white/85">Wholesale distribution, institutional supply, private label and GCC export enquiries start here.</p></div>
        </div>
      </section>

      <section className="border-b border-[#104360]/10 bg-white">
        <div className="mx-auto grid max-w-[1600px] divide-y divide-[#104360]/10 px-5 sm:px-10 lg:grid-cols-4 lg:divide-x lg:divide-y-0 lg:px-16">
          {[
            [MapPin, 'Office', company?.address || 'Kozhikode, Kerala, India'],
            [Phone, 'Direct', company?.phone1 || '+91 96338 90447'],
            [MessageCircle, 'WhatsApp', company?.whatsappUAE || '+971 50 735 5418'],
            [Mail, 'Email', company?.email1 || 'info@bovenfrontier.co.in'],
          ].map(([Icon, label, value]) => <div key={label} className="group py-7 lg:px-7 first:lg:pl-0 last:lg:pr-0"><Icon size={18} className="text-[#EF2034]" /><p className="mt-5 text-xs font-bold uppercase tracking-wider text-[#104360]/75">{label}</p><p className="mt-2 text-sm sm:text-base font-semibold leading-relaxed text-gray-900">{value}</p></div>)}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4"><p className="text-xs font-bold uppercase tracking-wider text-[#EF2034]">05 — Before you enquire</p><h2 className="mt-5 text-4xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl">Give us the right brief.</h2><p className="mt-6 max-w-sm text-sm sm:text-base leading-relaxed text-gray-600">The more context you provide, the faster our team can route your enquiry to the right commercial conversation.</p></div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="divide-y divide-[#104360]/10 border-y border-[#104360]/10">
              {[
                ['01', 'What are you buying?', 'Product, category, private label or general catalogue.'],
                ['02', 'Where are you buying for?', 'Country, region, distributor territory or institutional market.'],
                ['03', 'What scale do you need?', 'Approximate cartons, pallets, containers or recurring requirement.'],
                ['04', 'How should we reach you?', 'Email, phone or WhatsApp — whichever is fastest for you.'],
              ].map(([n, title, desc]) => <div key={n} className="grid gap-4 py-7 sm:grid-cols-[50px_1fr_1fr] sm:items-center"><span className="font-mono text-xs font-bold text-[#EF2034]">{n}</span><h3 className="text-base font-bold tracking-tight text-[#104360]">{title}</h3><p className="text-xs sm:text-sm leading-relaxed text-gray-600">{desc}</p></div>)}
            </div>
            <div className="mt-8 flex flex-wrap gap-3"><a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#104360] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#EF2034] transition-colors">WhatsApp export desk <ArrowUpRight size={14} /></a><a href={`tel:${phone}`} className="inline-flex items-center gap-3 border border-[#104360]/20 px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#104360] hover:bg-[#104360] hover:text-white transition-colors">Call direct <Phone size={14} /></a></div>
          </div>
        </div>
      </section>

      <section className="bg-[#104360] text-white"><div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-20 sm:px-10 lg:grid-cols-12 lg:px-16 lg:py-28"><div className="lg:col-span-7"><p className="text-xs font-bold uppercase tracking-wider text-[#EF2034]">06 — Official details</p><h2 className="mt-5 text-4xl font-medium tracking-[-0.05em] sm:text-6xl">A direct line to the business.</h2></div><div className="lg:col-span-4 lg:col-start-9"><div className="divide-y divide-white/10 border-y border-white/10 text-xs sm:text-sm">{[[ShieldCheck, 'LLP registration', company?.llpId || 'ACE-5349'], [ShieldCheck, 'GSTIN', company?.gstin || '32ABCFB2913N1ZN'], [Clock, 'Operating hours', company?.operatingHours || 'Mon – Sat: 9:00 AM – 6:30 PM (IST)']].map(([Icon, label, value]) => <div key={label} className="flex gap-4 py-5"><Icon size={16} className="mt-0.5 shrink-0 text-[#EF2034]" /><div><p className="text-xs font-semibold uppercase tracking-wider text-white/70">{label}</p><p className="mt-1 font-semibold text-white/90">{value}</p></div></div>)}</div></div></div></section>

      <ContactStrip />
      <Footer />
    </main>
  )
}

export default Contact
