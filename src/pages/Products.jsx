import ProductGrid from '../components/Products'

function Products() {
  return (
    <main>
      <section className="bg-[var(--navy)] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl font-bold text-white">
            The ZENY Range
          </h1>
          <p className="mt-4 text-white/60">
            Cleaning products for Indian and Gulf markets.
          </p>
        </div>
      </section>

      <ProductGrid showAll />
    </main>
  )
}

export default Products