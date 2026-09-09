import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { useStore } from '../context/useStore'
import { useScrollReveal } from '../hooks/useScrollReveal'

function ProductCard({ product, index }) {
  const { company } = useStore()
  const whatsappDigits = company?.whatsappUAE?.replace(/[^0-9]/g, '') || '971507355418'
  const whatsappMessage = encodeURIComponent(
    `Hello Boven Frontier, I would like to enquire about wholesale/export supply for ${product.brand} ${product.name}.`
  )

  const staggerClass = `stagger-${(index % 4) + 1}`

  return (
    <article
      className={`reveal-on-scroll ${staggerClass} group flex flex-col justify-between rounded-xl border border-gray-200/80 bg-white p-4 transition-all duration-300 hover:border-[#EF2034]/40 hover:shadow-lg`}
    >
      <div>
        {/* Product Image Stage (Unobstructed bottle photo) */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-[#f8f8f6]">
          {/* Centered Image */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <img
              src={product.image}
              alt={`${product.brand} ${product.name}`}
              className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-sm transition-transform duration-400 ease-out group-hover:scale-[1.04]"
            />
          </div>
        </div>

        {/* Product Meta */}
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#EF2034]">
              {product.category}
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#4D4B4C]">
              {product.brand}
            </span>
          </div>

          <h3 className="text-base font-bold tracking-tight text-[#104360] group-hover:text-[#EF2034] transition-colors duration-300">
            {product.name}
          </h3>

          {product.tagline && (
            <p className="text-xs text-[#4D4B4C] line-clamp-2 leading-relaxed">
              {product.tagline}
            </p>
          )}
        </div>
      </div>

      {/* Footer: Sizes & Actions (WhatsApp + Formal Enquiry) */}
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

        <div className="flex items-center gap-2.5">
          <a
            href={`https://wa.me/${whatsappDigits}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition shadow-2xs"
            title={`WhatsApp Enquiry for ${product.name}`}
          >
            <MessageCircle size={13} />
          </a>

          <Link
            to={`/contact?product=${encodeURIComponent(
              `${product.brand} ${product.name}`
            )}`}
            className="group/btn inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#104360] hover:text-[#EF2034] transition-colors"
          >
            Enquire
            <ArrowUpRight
              size={12}
              className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  )
}

function Products({ limit, showFilters = true }) {
  const { products, brands: storeBrands = [], categories: storeCategories = [] } = useStore()
  const [searchParams, setSearchParams] = useSearchParams()

  // Extract unique brands and categories
  const brands = ['ALL', ...new Set([...(storeBrands || []), ...products.map((p) => p.brand)])]
  const categories = ['ALL', ...new Set([...(storeCategories || []), ...products.map((p) => p.category)])]

  const catParam = searchParams.get('category') || ''
  const brandParam = searchParams.get('brand') || ''

  // Fuzzy match category
  const getMatchedCategory = (query) => {
    if (!query || query.toUpperCase() === 'ALL') return 'ALL'
    const q = query.toLowerCase().trim()
    return (
      categories.find(
        (c) =>
          c.toLowerCase() === q ||
          c.toLowerCase().includes(q) ||
          q.includes(c.toLowerCase())
      ) || 'ALL'
    )
  }

  const [userCategory, setUserCategory] = useState(null)
  const [userBrand, setUserBrand] = useState(null)

  const selectedCategory =
    userCategory !== null
      ? userCategory
      : catParam
      ? getMatchedCategory(catParam)
      : 'ALL'

  const selectedBrand =
    userBrand !== null
      ? userBrand
      : brandParam
      ? brands.find((b) => b.toLowerCase() === brandParam.toLowerCase()) || 'ALL'
      : 'ALL'

  const gridSectionRef = useScrollReveal()

  const filteredProducts = products.filter((p) => {
    const brandMatch = selectedBrand === 'ALL' || p.brand === selectedBrand
    const categoryMatch = selectedCategory === 'ALL' || p.category === selectedCategory
    return brandMatch && categoryMatch
  })

  const displayedProducts = limit
    ? filteredProducts.slice(0, limit)
    : filteredProducts

  const handleCategorySelect = (cat) => {
    setUserCategory(cat)
    if (cat === 'ALL') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', cat)
    }
    setSearchParams(searchParams, { replace: true })
  }

  const handleBrandSelect = (brand) => {
    setUserBrand(brand)
    if (brand === 'ALL') {
      searchParams.delete('brand')
    } else {
      searchParams.set('brand', brand)
    }
    setSearchParams(searchParams, { replace: true })
  }

  return (
    <section
      id="products"
      ref={gridSectionRef}
      className="bg-white py-16 sm:py-24 border-t border-[#104360]/10"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="reveal-on-scroll flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#EF2034] mb-1.5">
              Product Portfolio
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#104360]">
              Manufactured for everyday performance.
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium text-gray-400 shrink-0">
            <span>Direct Plant Supply</span>
            <span>·</span>
            <span>GCC Container Ready</span>
          </div>
        </div>

        {/* =====================================================
            MINIMAL CATEGORY & BRAND FILTERS
        ===================================================== */}
        {showFilters && (
          <div className="reveal-on-scroll stagger-1 border-b border-[#104360]/10 py-5 space-y-4">
            {/* Category Filter Row with Mobile Scroll Hint */}
            <div className="relative">
              <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pr-6">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#104360]/60 shrink-0 mr-1">
                  CATEGORY:
                </span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategorySelect(cat)}
                    className={`shrink-0 rounded-full px-3.5 py-1 text-xs font-semibold transition ${
                      selectedCategory === cat
                        ? 'bg-[#104360] text-white shadow-xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat === 'ALL' ? 'ALL CATEGORIES' : cat}
                  </button>
                ))}
              </div>
              {/* Subtle gradient scroll hint for mobile */}
              <div
                className="pointer-events-none absolute right-0 top-0 bottom-1.5 w-10 bg-gradient-to-l from-white via-white/80 to-transparent sm:hidden z-10"
                aria-hidden="true"
              />
            </div>

            {/* Brand Filter Row */}
            <div className="flex items-center justify-between pt-1 border-t border-gray-100">
              <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#104360]/60 mr-1 shrink-0">
                  BRAND:
                </span>
                {brands.map((brand) => (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => handleBrandSelect(brand)}
                    className={`text-[11px] font-semibold uppercase tracking-wider shrink-0 transition ${
                      selectedBrand === brand
                        ? 'text-[#EF2034] border-b-2 border-[#EF2034] pb-0.5 font-bold'
                        : 'text-gray-500 hover:text-[#104360]'
                    }`}
                  >
                    {brand === 'ALL' ? 'ALL BRANDS' : brand}
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
        <div className="reveal-on-scroll stagger-2 mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#104360]/10 pt-6">
          <p className="text-xs text-[#4D4B4C]">
            Manufactured in India · Available for domestic distribution & GCC container export.
          </p>

          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#104360] hover:text-[#EF2034] transition-colors"
          >
            <span>Enquire about wholesale & export supply</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#104360] text-white transition-all duration-300 group-hover:bg-[#EF2034] group-hover:text-white">
              <ArrowUpRight size={13} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Products