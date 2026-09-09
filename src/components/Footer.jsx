import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react'
import { useStore } from '../context/useStore'

function Footer() {
  const { company } = useStore()
  const whatsapp = company?.whatsappUAE?.replace(/[^0-9]/g, '') || '971507355418'

  return (
    <footer className="bg-[#104360] text-white">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
        <div className="grid gap-14 py-20 sm:py-24 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-6">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#EF2034]">Boven Frontier / India</p>
            <h2 className="mt-6 max-w-3xl text-[clamp(3.5rem,7vw,7rem)] font-medium leading-[0.85] tracking-[-0.07em]">Quality that<br /><span className="text-[#EF2034]">travels.</span></h2>
            <p className="mt-8 max-w-md text-sm leading-7 text-white/55">Manufacturing and distribution for consumer hygiene, wholesale and international trade — from India to growing markets.</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7 lg:pt-2">
            <div><p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/30">Explore</p><nav className="mt-5 flex flex-col gap-3 text-xs text-white/65"><Link to="/about" className="hover:text-white">About</Link><Link to="/products" className="hover:text-white">Products</Link><Link to="/contact" className="hover:text-white">Contact</Link><Link to="/#markets" className="hover:text-white">Export Markets</Link></nav></div>
            <div><p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/30">Trade</p><nav className="mt-5 flex flex-col gap-3 text-xs text-white/65"><Link to="/contact?service=Private+Label" className="hover:text-white">Private Label</Link><Link to="/contact?service=OEM" className="hover:text-white">OEM / Bottling</Link><Link to="/contact?service=Samples" className="hover:text-white">Samples</Link><Link to="/contact" className="hover:text-white">Wholesale</Link></nav></div>
            <div><p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/30">Connect</p><div className="mt-5 flex flex-col gap-3 text-xs text-white/65"><a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white"><MessageCircle size={13} /> WhatsApp</a>{company?.phone1 && <a href={`tel:${company.phone1.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:text-white"><Phone size={13} /> {company.phone1}</a>}<a href={`mailto:${company?.email1 || 'info@bovenfrontier.co.in'}`} className="flex items-center gap-2 hover:text-white"><Mail size={13} /> Email</a></div></div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3"><img src="/favicon.png" alt="Boven Frontier" className="h-7 w-7 rounded-sm bg-white p-1" /><span className="text-[9px] font-bold uppercase tracking-[0.22em]">Boven Frontier International LLP</span></div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[8px] uppercase tracking-[0.18em] text-white/30"><span>India</span><span>FOB Indian Ports</span><span>GCC Export</span><span>© {new Date().getFullYear()}</span><Link to="/contact" className="inline-flex items-center gap-1 text-white/60 hover:text-white">Enquire <ArrowUpRight size={11} /></Link></div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
