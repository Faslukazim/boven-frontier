import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'

function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f8f9fa] px-6 py-24 text-[#172b3f]">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c9a84c]">
          404 Error
        </p>

        <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
          Page Not Found
        </h1>

        <p className="mt-4 text-sm leading-6 text-[#172b3f]/60 sm:text-base">
          The page you are looking for might have been moved, removed, or is temporarily unavailable.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="group inline-flex items-center justify-center gap-3 bg-[#172b3f] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#c9a84c] hover:text-[#172b3f]"
          >
            <Home size={15} />
            Back to Home
          </Link>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 border border-[#172b3f]/20 bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#172b3f] transition-all hover:border-[#172b3f]"
          >
            <ArrowLeft size={15} />
            View Products
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFound
