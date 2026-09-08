import ProductsGrid from '../components/Products'
import ContactStrip from '../components/ContactStrip'
import Footer from '../components/Footer'
import { MessageCircle } from 'lucide-react'
import { useStore } from '../context/useStore'
import { COMPANY } from '../constants'

function Products() {
  const { company: storeCompany } = useStore()
  const company = storeCompany || COMPANY
  const rawWhatsapp = (company.whatsappUAE || company.phone1 || '+971 50 735 5418').replace(/[^0-9]/g, '')

  return (
    <main className="bg-white text-[#104360]">
      {/* Header Banner */}
      <section className="bg-[#104360] px-6 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-[1600px] px-2 sm:px-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#EF2034]">
                Direct Factory Catalog · 14 Active SKUs
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight">
              Wholesale & Export Products
            </h1>

            <p className="mt-3 max-w-xl text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
              Full specification laundry detergents, disinfectant solutions, surface cleaners, and bulk commercial drums available for distributor and container supply.
            </p>
          </div>

          <a
            href={`https://wa.me/${rawWhatsapp}?text=Hello%20Boven%20Frontier%2C%20I%20am%20interested%20in%20wholesale%2Fdistributor%20pricing%20for%20your%20products.`}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto inline-flex items-center gap-2 rounded-lg bg-[#EF2034] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-white hover:text-[#104360] transition shadow-sm"
          >
            <MessageCircle size={15} />
            <span>Enquire for Wholesale & Export</span>
          </a>
        </div>
      </section>

      {/* Main Catalog Component */}
      <ProductsGrid showFilters={true} />

      {/* Contact Strip & Footer */}
      <ContactStrip />
      <Footer />
    </main>
  )
}

export default Products