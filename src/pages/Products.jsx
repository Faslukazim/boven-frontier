import ProductsGrid from '../components/Products'
import Footer from '../components/Footer'
import { MessageCircle } from 'lucide-react'

function Products() {
  return (
    <main className="bg-white text-[#172b3f]">
      {/* Products Page Hero */}
      <section className="bg-[#172b3f] px-6 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-[1600px] px-2 sm:px-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#c9a84c]">
                Direct Factory Catalog · 14 Active SKUs
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight">
              Wholesale & Export Products
            </h1>

            <p className="mt-3 max-w-xl text-xs sm:text-sm text-white/70 leading-relaxed">
              Full specification laundry detergents, disinfectant solutions, surface cleaners, and bulk commercial drums available for distributor and container supply.
            </p>
          </div>

          <a
            href="https://wa.me/919207577242?text=Hello%20Boven%20Frontier%2C%20I%20am%20interested%20in%20wholesale%2Fdistributor%20pricing%20for%20your%20products."
            target="_blank"
            rel="noreferrer"
            className="self-start md:self-auto inline-flex items-center gap-2 rounded-lg bg-[#c9a84c] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#172b3f] hover:bg-white transition shadow-sm"
          >
            <MessageCircle size={15} />
            Enquire for Wholesale & Export
          </a>
        </div>
      </section>

      {/* Main Catalog Component */}
      <ProductsGrid showFilters={true} />

      {/* Footer */}
      <Footer />
    </main>
  )
}

export default Products