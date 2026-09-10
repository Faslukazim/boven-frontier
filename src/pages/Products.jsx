import ProductsGrid from '../components/Products'
import ContactStrip from '../components/ContactStrip'
import Footer from '../components/Footer'
import { ArrowUpRight } from 'lucide-react'
import { useStore } from '../context/useStore'
import { COMPANY } from '../constants'

function Products() {
  const { company: storeCompany } = useStore()
  const company = storeCompany || COMPANY
  const whatsapp = (company.whatsappUAE || company.phone1 || '+971 50 735 5418').replace(/[^0-9]/g, '')

  return (
    <main className="bg-[#F7F5F0] text-[#104360]">
      <section className="relative overflow-hidden bg-[#104360] text-white">
        <div className="absolute right-[8%] top-1/2 h-[36vw] max-h-[560px] w-[36vw] max-w-[560px] -translate-y-1/2 rounded-full border border-white/10" />
        <div className="absolute right-[14%] top-1/2 h-[22vw] max-h-[340px] w-[22vw] max-w-[340px] -translate-y-1/2 rounded-full border border-[#EF2034]/30" />
        <div className="mx-auto grid min-h-[62vh] max-w-[1600px] items-end gap-10 px-5 py-16 sm:px-10 lg:grid-cols-12 lg:px-16 lg:py-24">
          <div className="relative z-10 lg:col-span-8">
            <p className="mb-8 text-[9px] font-bold uppercase tracking-[0.3em] text-white/40"><span className="mr-4 text-[#EF2034]">03</span> Product catalogue</p>
            <h1 className="text-[clamp(3.4rem,8vw,8rem)] font-medium leading-[0.86] tracking-[-0.07em]">Products<br /><span className="text-[#EF2034]">that move.</span></h1>
          </div>
          <div className="relative z-10 lg:col-span-3 lg:col-start-10 lg:pb-2">
            <p className="border-l border-[#EF2034] pl-5 text-sm leading-7 text-white/60">A focused portfolio of consumer hygiene products for wholesale, retail, institutional and export channels.</p>
            <a href={`https://wa.me/${whatsapp}?text=Hello%20Boven%20Frontier%2C%20I%20am%20interested%20in%20wholesale%20pricing.`} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-white">Wholesale enquiry <ArrowUpRight size={14} className="text-[#EF2034]" /></a>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1600px] justify-between border-t border-white/10 px-5 py-4 text-[8px] uppercase tracking-[0.25em] text-white/30 sm:px-10 lg:px-16"><span>Direct factory supply</span><span>14 active SKUs</span></div>
      </section>

      <ProductsGrid showFilters={true} />

      <section className="border-y border-[#104360]/10 bg-white">
        <div className="mx-auto grid max-w-[1600px] gap-8 px-5 py-20 sm:px-10 lg:grid-cols-12 lg:px-16 lg:py-28">
          <div className="lg:col-span-7"><p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#EF2034]">04 — Built for trade</p><h2 className="mt-5 text-4xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl">Need volume, private label or export-ready supply?</h2></div>
          <div className="flex items-end lg:col-span-4 lg:col-start-9"><div><p className="text-sm leading-7 text-[#104360]/55">Tell us your market, product interest and expected volume. We'll take it from there.</p><a href="/contact" className="group mt-8 inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.22em]">Talk to the export desk <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EF2034] text-white transition group-hover:translate-x-1"><ArrowUpRight size={15} /></span></a></div></div>
        </div>
      </section>

      <ContactStrip />
      <Footer />
    </main>
  )
}

export default Products
