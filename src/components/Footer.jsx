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
            <p className="text-xs font-bold uppercase tracking-wider text-[#EF2034]">Boven Frontier / India</p>
            <h2 className="mt-6 max-w-3xl text-[clamp(3.5rem,7vw,7rem)] font-medium leading-[0.85] tracking-[-0.07em]">Quality that<br /><span className="text-[#EF2034]">travels.</span></h2>
            <p className="mt-8 max-w-md text-sm sm:text-base leading-relaxed text-white/85">Manufacturing and distribution for consumer hygiene, wholesale and international trade — from India to growing markets.</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7 lg:pt-2">
            <div><p className="text-xs font-bold uppercase tracking-wider text-white/70">Explore</p><nav className="mt-5 flex flex-col gap-3 text-sm text-white/80"><Link to="/about" className="hover:text-white transition-colors">About</Link><Link to="/products" className="hover:text-white transition-colors">Products</Link><Link to="/contact" className="hover:text-white transition-colors">Contact</Link><Link to="/#markets" className="hover:text-white transition-colors">Export Markets</Link></nav></div>
            <div><p className="text-xs font-bold uppercase tracking-wider text-white/70">Trade</p><nav className="mt-5 flex flex-col gap-3 text-sm text-white/80"><Link to="/contact?service=Private+Label" className="hover:text-white transition-colors">Private Label</Link><Link to="/contact?service=OEM" className="hover:text-white transition-colors">OEM / Bottling</Link><Link to="/contact?service=Samples" className="hover:text-white transition-colors">Samples</Link><Link to="/contact" className="hover:text-white transition-colors">Wholesale</Link></nav></div>
            <div><p className="text-xs font-bold uppercase tracking-wider text-white/70">Connect</p><div className="mt-5 flex flex-col gap-3 text-sm text-white/80"><a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors"><MessageCircle size={15} /> WhatsApp</a>{company?.phone1 && <a href={`tel:${company.phone1.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:text-white transition-colors"><Phone size={15} /> {company.phone1}</a>}<a href={`mailto:${company?.email1 || 'info@bovenfrontier.co.in'}`} className="flex items-center gap-2 hover:text-white transition-colors"><Mail size={15} /> Email</a></div></div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3"><img src="/favicon.png" alt="Boven Frontier" className="h-7 w-7 rounded-sm bg-white p-1" /><span className="text-xs font-bold uppercase tracking-wider text-white/90">Boven Frontier International LLP</span></div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs uppercase tracking-wider text-white/65"><span>India</span><span>FOB Indian Ports</span><span>GCC Export</span><span>© {new Date().getFullYear()}</span><Link to="/contact" className="inline-flex items-center gap-1 font-semibold text-white/85 hover:text-white transition-colors">Enquire <ArrowUpRight size={13} /></Link></div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
