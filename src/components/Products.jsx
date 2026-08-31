import { ArrowUpRight } from 'lucide-react'

const products = [
  {
    brand: 'LEXONE',
    name: 'Liquid Detergent',
    category: 'LAUNDRY CARE',
    image: '/assets/products/lexoneliquiddetergent.png',
  },
  {
    brand: 'LEXONE',
    name: 'Floor Cleaner',
    category: 'FLOOR CARE',
    image: '/assets/products/LexoneFloorcleaner500ml.png',
  },
  {
    brand: 'LEXONE',
    name: 'Bathroom Cleaner',
    category: 'SURFACE CARE',
    image: '/assets/products/LexoneBathroomcleaner.png',
  },
  {
    brand: 'LEXONE',
    name: 'Disinfectant Cleaner',
    category: 'DISINFECTION',
    image: '/assets/products/LexoneDisinfectantCleaner.png',
  },
  {
    brand: 'LEXONE',
    name: 'Fabric Conditioner',
    category: 'FABRIC CARE',
    image: '/assets/products/LexoneFabricconditioner.png',
  },
  {
    brand: 'LEXONE',
    name: 'Handwash',
    category: 'PERSONAL CARE',
    image: '/assets/products/Lexonehandwash5ltr.png',
  },

  {
    brand: 'FABIE PLUS',
    name: 'Detergent Powder',
    category: 'LAUNDRY CARE',
    image: '/assets/products/FabiePlusDetergentpowder.png',
  },
  {
    brand: 'FABIE PLUS',
    name: 'Glass Cleaner',
    category: 'SURFACE CARE',
    image: '/assets/products/FabieplusGlasscleaner.png',
  },
  {
    brand: 'FABIE PLUS',
    name: 'Handwash',
    category: 'PERSONAL CARE',
    image: '/assets/products/FabiePlusHandwash.png',
  },
  {
    brand: 'FABIE PLUS',
    name: 'Liquid Detergent',
    category: 'LAUNDRY CARE',
    image: '/assets/products/Fabieplusliquid125.png',
  },


]

const brands = ['ALL', 'LEXONE']

function ProductCard({ product, index }) {
  return (
    <article
      className="product-card group"
      style={{ '--product-index': index }}
    >
      {/* Image */}
      <div className="product-card-image">
        <div className="product-image-stage">
          <img
            src={product.image}
            alt={`${product.brand} ${product.name}`}
            loading="lazy"
            className="product-image"
          />
        </div>

        {/* Hover arrow */}
        <div className="product-card-arrow">
          <ArrowUpRight size={15} strokeWidth={1.5} />
        </div>
      </div>

      {/* Information */}
      <div className="product-card-info">
        <div>
          <p className="product-category">
            {product.category}
          </p>

          <h3 className="product-name">
            {product.name}
          </h3>
        </div>

        <span className="product-brand">
          {product.brand}
        </span>
      </div>
    </article>
  )
}

function Products() {
  return (
    <section
      id="products"
      className="products-section"
    >
      <div className="products-container">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="products-header">

          <div className="products-heading-wrap">

            <div className="products-eyebrow">
              <span />
              PRODUCT PORTFOLIO
            </div>

            <h2 className="products-title">
              Products made
              <br />
              for everyday life.
            </h2>

          </div>

          <div className="products-intro">

            <p>
              A growing range of cleaning solutions designed
              for homes, businesses and institutional use.
            </p>

            <span className="products-intro-line" />

          </div>

        </div>


        {/* =====================================================
            BRAND FILTER
        ===================================================== */}

        <div className="products-filter">

          <div className="products-filter-label">
            BRANDS
          </div>

          <div className="products-brand-list">

            {brands.map((brand, index) => (
              <button
                key={brand}
                type="button"
                className={`products-brand-button ${
                  index === 0 ? 'is-active' : ''
                }`}
              >
                {brand}
              </button>
            ))}

          </div>

          <div className="products-count">
            {String(products.length).padStart(2, '0')} PRODUCTS
          </div>

        </div>


        {/* =====================================================
            PRODUCT GRID
        ===================================================== */}

        <div className="products-grid">

          {products.map((product, index) => (
            <ProductCard
              key={`${product.brand}-${product.name}-${index}`}
              product={product}
              index={index}
            />
          ))}

        </div>


        {/* =====================================================
            BOTTOM
        ===================================================== */}

        <div className="products-bottom">

          <p>
            LEXONE · FABIE PLUS · KARE
          </p>

          <a
            href="/enquire"
            className="products-enquire group"
          >
            <span>
              Enquire about our products
            </span>

            <span className="products-enquire-icon">
              <ArrowUpRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </a>

        </div>

      </div>
    </section>
  )
}

export default Products