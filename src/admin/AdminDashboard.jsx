import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Package,
  Megaphone,
  LayoutDashboard,
  LogOut,
  ExternalLink,
  Menu,
  X,
  RotateCcw,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react'
import { useStore } from '../context/useStore'
import ProductManager from './ProductManager'
import BannerManager from './BannerManager'

function AdminDashboard() {
  const navigate = useNavigate()
  const { products, banners, resetToDefaults } = useStore()

  const [activeTab, setActiveTab] = useState('products')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [resetSuccessNotice, setResetSuccessNotice] = useState(false)

  // Auth Guard
  useEffect(() => {
    const authData = localStorage.getItem('bf_admin_auth')
    if (!authData) {
      navigate('/admin/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('bf_admin_auth')
    navigate('/admin/login')
  }

  const handleResetCatalog = () => {
    resetToDefaults()
    setShowResetConfirm(false)
    setResetSuccessNotice(true)
    setTimeout(() => setResetSuccessNotice(false), 3500)
  }

  const activeBrands = [...new Set(products.map((p) => p.brand))]
  const featuredCount = products.filter((p) => p.is_featured).length
  const activeBannersCount = banners.filter((b) => b.is_active).length

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] text-[#104360]">
      {/* =======================================================
          MOBILE SIDEBAR OVERLAY
      ======================================================= */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* =======================================================
          SIDEBAR (DESKTOP & MOBILE DRAWER)
      ======================================================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#104360] text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
          <Link
            to="/"
            className="flex items-center gap-2.5 font-medium tracking-tight"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#EF2034] text-[#104360]">
              <ShieldCheck size={18} />
            </div>
            <div>
              <span className="block text-xs font-semibold tracking-wider">
                BOVEN FRONTIER
              </span>
              <span className="block text-[7px] tracking-[0.2em] text-[#EF2034]">
                ADMIN CONSOLE
              </span>
            </div>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/60 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-1.5 p-4 text-xs font-medium">
          <button
            onClick={() => {
              setActiveTab('products')
              setMobileMenuOpen(false)
            }}
            className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 transition ${
              activeTab === 'products'
                ? 'bg-[#EF2034] text-[#104360] font-semibold'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Package size={16} />
              Products & SKUs
            </div>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('banners')
              setMobileMenuOpen(false)
            }}
            className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 transition ${
              activeTab === 'banners'
                ? 'bg-[#EF2034] text-[#104360] font-semibold'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Megaphone size={16} />
              Top Badge & Announcement
            </div>
            <span className="rounded-full bg-emerald-500/30 px-2 py-0.5 text-[10px] text-emerald-300">
              Live
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('overview')
              setMobileMenuOpen(false)
            }}
            className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 transition ${
              activeTab === 'overview'
                ? 'bg-[#EF2034] text-[#104360] font-semibold'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <LayoutDashboard size={16} />
            Dashboard Overview
          </button>

          <div className="pt-4 border-t border-white/10 my-4">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <ExternalLink size={16} />
              View Live Website
            </Link>
          </div>
        </nav>

        {/* Bottom User / Logout */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div className="truncate">
              <p className="text-[11px] font-medium text-white truncate">
                admin@bovenfrontier.co.in
              </p>
              <p className="text-[9px] uppercase tracking-wider text-[#EF2034]">
                Administrator
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded p-1.5 text-white/60 transition hover:bg-white/10 hover:text-red-400"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* =======================================================
          MAIN CONTENT AREA
      ======================================================= */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <Menu size={20} />
            </button>

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 hidden sm:inline">
              Management Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="inline-flex items-center gap-1.5 rounded border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-[10px] font-semibold text-gray-600 transition hover:bg-red-50 hover:border-red-200 hover:text-red-700"
              title="Reset products and banners to factory defaults"
            >
              <RotateCcw size={12} />
              <span className="hidden sm:inline">Reset Catalog Defaults</span>
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 bg-[#104360] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white transition hover:bg-[#EF2034] hover:text-[#104360]"
            >
              <span className="hidden sm:inline">Live Site</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </header>

        {/* Notification Toast */}
        {resetSuccessNotice && (
          <div className="mx-4 mt-4 sm:mx-8 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800">
            <CheckCircle size={16} />
            Catalog data has been successfully reset to initial Boven Frontier defaults.
          </div>
        )}

        {/* Content Container */}
        <main className="flex-1 p-4 sm:p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Total Products (SKUs)
                  </span>
                  <div className="mt-2 text-3xl font-bold text-[#104360]">
                    {products.length}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium mt-1 inline-block">
                    In local reactive store
                  </span>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Active Brands
                  </span>
                  <div className="mt-2 text-3xl font-bold text-[#104360]">
                    {activeBrands.length}
                  </div>
                  <span className="text-[11px] text-gray-500 mt-1 inline-block truncate">
                    {activeBrands.join(' · ')}
                  </span>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Featured on Hero
                  </span>
                  <div className="mt-2 text-3xl font-bold text-[#EF2034]">
                    {featuredCount}
                  </div>
                  <span className="text-[11px] text-gray-500 mt-1 inline-block">
                    Auto-cycling products
                  </span>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Active Banners
                  </span>
                  <div className="mt-2 text-3xl font-bold text-[#104360]">
                    {activeBannersCount}
                  </div>
                  <span className="text-[11px] text-gray-500 mt-1 inline-block">
                    of {banners.length} total banners
                  </span>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
                <h3 className="text-base font-semibold text-[#104360]">
                  Quick Management Actions
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Select a section to manage live site contents.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <button
                    onClick={() => setActiveTab('products')}
                    className="flex items-start gap-4 rounded-lg border border-gray-200 p-4 text-left transition hover:border-[#104360] hover:bg-gray-50/50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#104360] text-white">
                      <Package size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#104360]">
                        Manage Products & SKUs
                      </h4>
                      <p className="mt-1 text-xs text-gray-500">
                        Add new cleaning products, edit packing variants (1L, 5L), upload bottle mockups, or toggle featured status.
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('banners')}
                    className="flex items-start gap-4 rounded-lg border border-gray-200 p-4 text-left transition hover:border-[#104360] hover:bg-gray-50/50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EF2034] text-[#104360]">
                      <Megaphone size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#104360]">
                        Edit Top Badge & Announcement
                      </h4>
                      <p className="mt-1 text-xs text-gray-500">
                        Customize the top website announcement bar, color theme, and homepage hero badge.
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && <ProductManager />}
          {activeTab === 'banners' && <BannerManager />}
        </main>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl space-y-4">
            <h4 className="text-sm font-semibold text-gray-900">
              Reset Entire Catalog to Factory Defaults?
            </h4>
            <p className="text-xs text-gray-500">
              This will overwrite your custom changes and restore all default Boven Frontier products and banners.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="border border-gray-200 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleResetCatalog}
                className="bg-red-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-red-700"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
