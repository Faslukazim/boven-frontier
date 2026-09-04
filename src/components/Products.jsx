import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { useStore } from '../context/useStore'
import { useScrollReveal } from '../hooks/useScrollReveal'

function ProductCard({ product, index }) {
  const whatsappMessage = encodeURIComponent(
    `Hello Boven Frontier, I would like to enquire about wholesale/export supply for ${product.brand} ${product.name}.`
  )

  const staggerClass = `stagger-${(index % 4) + 1}`

  return (
    <article
      className={`product-card reveal-on-scroll ${staggerClass} group flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:border-gray-200 hover:shadow-md`}
    >
      <div>
        {/* Product Image Stage */}
        <div className="product-card-image relative aspect-square overflow-hidden rounded-lg bg-[#f8f8f6]">
          {/* Quick WhatsApp Action */}
          <a
            href={`https://wa.me/919207577242?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="absolute right-2.5 bottom-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-emerald-600 shadow-xs backdrop-blur-xs transition hover:scale-110 hover:bg-emerald-600 hover:text-white"
            title={`Enquire on WhatsApp for ${product.name}`}
          >
            <MessageCircle size={15} />
          </a>

          {/* Centered Image */}
          <div className="product-image-stage absolute inset-0 flex items-center justify-center p-6">
            <img
              src={product.image}
              alt={`${product.brand} ${product.name}`}
              loading="lazy"
              className="product-image max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-sm transition-transform duration-400 ease-out group-hover:scale-[1.025]"
            />
          </div>
        </div>

        {/* Product Meta */}
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#c9a84c]">
              {product.category}
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#172b3f]/50">
              {product.brand}
            </span>
          </div>

          <h3 className="text-base font-bold tracking-tight text-[#172b3f] group-hover:text-[#c9a84c] transition-colors duration-300">
            {product.name}
          </h3>

          {product.tagline && (
            <p className="text-xs text-[#172b3f]/60 line-clamp-2 leading-relaxed">
              {product.tagline}
            </p>
          )}
        </div>
      </div>

      {/* Footer: Sizes & Clean Enquire Link */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {Array.isArray(product.variants) &&
            product.variants.map((v) => (
              <span
                key={v}
                className="rounded bg-gray-100 px-1.5 py-0.5 text-[9px] font-medium text-gray-700"
              >
                {v}
              </span>
            ))}
        </div>

        <Link
          to={`/contact?product=${encodeURIComponent(
            `${product.brand} ${product.name}`
          )}`}
          className="group/btn inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#172b3f] hover:text-[#c9a84c] transition-colors"
        >
          Enquire
          <ArrowUpRight
            size={12}
            className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  )
}

function Products({ limit, showFilters = true }) {
  const { products } = useStore()
  const [selectedBrand, setSelectedBrand] = useState('ALL')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const gridSectionRef = useScrollReveal()

  // Extract unique brands and categories
  const brands = ['ALL', ...new Set(products.map((p) => p.brand))]
  const categories = ['ALL', ...new Set(products.map((p) => p.category))]

  const filteredProducts = products.filter((p) => {
    const brandMatch = selectedBrand === 'ALL' || p.brand === selectedBrand
    const categoryMatch = selectedCategory === 'ALL' || p.category === selectedCategory
    return brandMatch && categoryMatch
  })

  const displayedProducts = limit
    ? filteredProducts.slice(0, limit)
    : filteredProducts

  return (
    <section
      id="products"
      ref={gridSectionRef}
      className="products-section bg-white py-16 sm:py-24"
    >
      <div className="products-container mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="products-header reveal-on-scroll flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[#172b3f]/10">
          <div className="products-heading-wrap">
            <div className="products-eyebrow flex items-center gap-3 mb-3 text-[9px] font-bold uppercase tracking-[0.3em] text-[#c9a84c]">
              <span className="h-px w-8 bg-[#c9a84c]" />
              PRODUCT PORTFOLIO
            </div>

            <h2 className="products-title text-[clamp(2.4rem,4.8vw,4.8rem)] font-bold leading-[0.94] tracking-[-0.05em] text-[#172b3f]">
              Products made
              <br />
              <span className="text-[#c9a84c]">for everyday life.</span>
            </h2>
          </div>

          <div className="products-intro max-w-sm border-l-2 border-[#c9a84c] pl-4 text-xs sm:text-sm text-[#172b3f]/70 leading-relaxed">
            <p>
              Direct-from-plant cleaning chemicals manufactured in India. Supplying regional distributors, institutional facilities, and GCC container shipments.
            </p>
          </div>
        </div>

        {/* =====================================================
            MINIMAL CATEGORY & BRAND FILTERS
        ===================================================== */}
        {showFilters && (
          <div className="reveal-on-scroll stagger-1 border-b border-[#172b3f]/10 py-5 space-y-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 rounded-full px-3.5 py-1 text-xs font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-[#172b3f] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Brand Filter Row */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#172b3f]/40 mr-1">
                  BRANDS:
                </span>
                {brands.map((brand) => (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => setSelectedBrand(brand)}
                    className={`text-[11px] font-semibold uppercase tracking-wider transition ${
                      selectedBrand === brand
                        ? 'text-[#c9a84c] border-b-2 border-[#c9a84c] pb-0.5'
                        : 'text-gray-500 hover:text-[#172b3f]'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>

              <div className="text-[10px] font-semibold tracking-wider text-gray-400 whitespace-nowrap pl-4">
                {filteredProducts.length} Products
              </div>
            </div>
          </div>
        )}

        {/* =====================================================
            PRODUCT GRID WITH STAGGERED REVEALS
        ===================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8">
          {displayedProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>

        {/* =====================================================
            BOTTOM B2B INQUIRY STRIP
        ===================================================== */}
        <div className="reveal-on-scroll stagger-2 mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#172b3f]/10 pt-6">
          <p className="text-xs text-[#172b3f]/65">
            Manufactured in India · Available for domestic distribution & GCC container export.
          </p>

          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#172b3f] hover:text-[#c9a84c] transition-colors"
          >
            <span>Enquire about wholesale & export supply</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#172b3f] text-white transition-all duration-300 group-hover:bg-[#c9a84c] group-hover:text-[#172b3f]">
              <ArrowUpRight size={13} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Products