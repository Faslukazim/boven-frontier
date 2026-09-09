import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Package,
  LayoutDashboard,
  LogOut,
  ExternalLink,
  Menu,
  X,
  RotateCcw,
  ShieldCheck,
  CheckCircle,
  Tags,
  Building2,
  KeyRound,
  Users,
  Inbox,
} from 'lucide-react'
import { useStore } from '../context/useStore'
import ProductManager from './ProductManager'
import CompanySettings from './CompanySettings'
import SecuritySettings from './SecuritySettings'
import UserManager from './UserManager'
import BrandCategoryManager from './BrandCategoryManager'

function AdminDashboard() {
  const navigate = useNavigate()
  const { products, brands = [], categories = [], adminUsers, inquiries, resetToDefaults } = useStore()

  const [activeTab, setActiveTab] = useState('products')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [resetSuccessNotice, setResetSuccessNotice] = useState(false)
  const [currentUser] = useState(() => {
    try {
      const authData = localStorage.getItem('bf_admin_auth')
      if (authData) {
        const parsed = JSON.parse(authData)
        if (parsed && parsed.email) {
          return {
            name: parsed.name || 'Aswin',
            email: parsed.email,
            role: parsed.role || 'Super Admin',
          }
        }
      }
    } catch (e) {
      console.warn('Error reading admin auth data:', e)
    }
    return {
      name: 'Aswin',
      email: 'aswin@bovenfrontier.co.in',
      role: 'Super Admin',
    }
  })

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

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#104360]">
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
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#EF2034] text-white">
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
          {/* Products Tab */}
          <button
            onClick={() => {
              setActiveTab('products')
              setMobileMenuOpen(false)
            }}
            className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 transition ${
              activeTab === 'products'
                ? 'bg-[#EF2034] text-white font-semibold shadow-xs'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Package size={16} />
              <span>Products & SKUs</span>
            </div>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">
              {products.length}
            </span>
          </button>

          {/* Brands & Categories Tab */}
          <button
            onClick={() => {
              setActiveTab('brands_categories')
              setMobileMenuOpen(false)
            }}
            className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 transition ${
              activeTab === 'brands_categories'
                ? 'bg-[#EF2034] text-white font-semibold shadow-xs'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Tags size={16} />
              <span>Brands & Categories</span>
            </div>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">
              {brands.length + categories.length}
            </span>
          </button>

          {/* Company Settings Tab */}
          <button
            onClick={() => {
              setActiveTab('company')
              setMobileMenuOpen(false)
            }}
            className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 transition ${
              activeTab === 'company'
                ? 'bg-[#EF2034] text-white font-semibold shadow-xs'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Building2 size={16} />
            <span>Company & Contact</span>
          </button>

          {/* Team & Users Tab */}
          <button
            onClick={() => {
              setActiveTab('users')
              setMobileMenuOpen(false)
            }}
            className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 transition ${
              activeTab === 'users'
                ? 'bg-[#EF2034] text-white font-semibold shadow-xs'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users size={16} />
              <span>Team & Users</span>
            </div>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">
              {adminUsers?.length || 1}
            </span>
          </button>

          {/* Inquiries Tab */}
          <button
            onClick={() => {
              setActiveTab('inquiries')
              setMobileMenuOpen(false)
            }}
            className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 transition ${
              activeTab === 'inquiries'
                ? 'bg-[#EF2034] text-white font-semibold shadow-xs'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Inbox size={16} />
              <span>Inquiries Desk</span>
            </div>
            {inquiries?.length > 0 ? (
              <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] text-white font-bold">
                {inquiries.length}
              </span>
            ) : (
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/50">
                0
              </span>
            )}
          </button>

          {/* Security Tab */}
          <button
            onClick={() => {
              setActiveTab('security')
              setMobileMenuOpen(false)
            }}
            className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 transition ${
              activeTab === 'security'
                ? 'bg-[#EF2034] text-white font-semibold shadow-xs'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <KeyRound size={16} />
            <span>Security & Password</span>
          </button>

          {/* Overview Tab */}
          <button
            onClick={() => {
              setActiveTab('overview')
              setMobileMenuOpen(false)
            }}
            className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 transition ${
              activeTab === 'overview'
                ? 'bg-[#EF2034] text-white font-semibold shadow-xs'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <LayoutDashboard size={16} />
            <span>Dashboard Overview</span>
          </button>

          {/* View Website Link */}
          <div className="pt-4 border-t border-white/10 my-4">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <ExternalLink size={16} />
              <span>View Live Website</span>
            </Link>
          </div>
        </nav>

        {/* Bottom User Session Info & Logout */}
        <div className="border-t border-white/10 p-4 bg-black/10">
          <div className="flex items-center justify-between">
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate">
                {currentUser.name}
              </p>
              <p className="text-[10px] text-white/60 truncate">
                {currentUser.email}
              </p>
              <span className="inline-block mt-0.5 text-[8px] uppercase tracking-wider font-bold text-[#EF2034]">
                {currentUser.role}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-red-400"
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

            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 hidden sm:inline">
                Management Portal
              </span>
              <span className="text-xs font-bold text-[#104360] ml-2 hidden md:inline">
                · {currentUser.name} ({currentUser.role})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-[10px] font-semibold text-gray-600 transition hover:bg-red-50 hover:border-red-200 hover:text-red-700"
              title="Reset products to initial factory defaults"
            >
              <RotateCcw size={12} />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#104360] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white transition hover:bg-[#EF2034]"
            >
              <span className="hidden sm:inline">Live Site</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </header>

        {/* Notification Toast */}
        {resetSuccessNotice && (
          <div className="mx-4 mt-4 sm:mx-8 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800">
            <CheckCircle size={16} className="text-emerald-600 shrink-0" />
            <span>Catalog data has been successfully reset to initial factory defaults.</span>
          </div>
        )}

        {/* Content Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-[1600px] w-full mx-auto">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Total Products (SKUs)
                  </span>
                  <div className="mt-2 text-3xl font-bold text-[#104360]">
                    {products.length}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium mt-1 inline-block">
                    Active in wholesale catalog
                  </span>
                </div>

                <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Product Brands
                  </span>
                  <div className="mt-2 text-3xl font-bold text-[#104360]">
                    {activeBrands.length}
                  </div>
                  <span className="text-[11px] text-gray-500 mt-1 inline-block truncate">
                    {activeBrands.join(' · ')}
                  </span>
                </div>

                <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Featured in Hero
                  </span>
                  <div className="mt-2 text-3xl font-bold text-[#EF2034]">
                    {featuredCount}
                  </div>
                  <span className="text-[11px] text-gray-500 mt-1 inline-block">
                    Rotating 3D showcase
                  </span>
                </div>

                <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Customer Inquiries
                  </span>
                  <div className="mt-2 text-3xl font-bold text-[#104360]">
                    {inquiries?.length || 0}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium mt-1 inline-block">
                    Submissions received
                  </span>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-2xs">
                <h3 className="text-base font-semibold text-[#104360]">
                  Administrative Management Sections
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Select a module to update products, company details, team members, or inquiries.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <button
                    onClick={() => setActiveTab('products')}
                    className="flex items-start gap-4 rounded-xl border border-gray-200/80 p-4 text-left transition hover:border-[#104360] hover:bg-gray-50/50 group"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#104360] text-white group-hover:bg-[#EF2034] transition">
                      <Package size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#104360]">
                        Manage Products & SKUs
                      </h4>
                      <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                        Add products, duplicate SKUs with 1 click, toggle Hero showcase, and edit packaging sizes.
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('brands_categories')}
                    className="flex items-start gap-4 rounded-xl border border-gray-200/80 p-4 text-left transition hover:border-[#104360] hover:bg-gray-50/50 group"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#104360] text-white group-hover:bg-[#EF2034] transition">
                      <Tags size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#104360]">
                        Brands & Categories
                      </h4>
                      <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                        Add wholesale brands ({brands.length}) and customize product categories ({categories.length}).
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('company')}
                    className="flex items-start gap-4 rounded-xl border border-gray-200/80 p-4 text-left transition hover:border-[#104360] hover:bg-gray-50/50 group"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#104360] text-white group-hover:bg-[#EF2034] transition">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#104360]">
                        Company & Contact Info
                      </h4>
                      <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                        Update phone numbers, UAE WhatsApp desk, emails, corporate address, and operating hours.
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('users')}
                    className="flex items-start gap-4 rounded-xl border border-gray-200/80 p-4 text-left transition hover:border-[#104360] hover:bg-gray-50/50 group"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#104360] text-white group-hover:bg-[#EF2034] transition">
                      <Users size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#104360]">
                        Team & User Access
                      </h4>
                      <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                        Add new administrative accounts, set role permissions, and manage staff access.
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('security')}
                    className="flex items-start gap-4 rounded-xl border border-gray-200/80 p-4 text-left transition hover:border-[#104360] hover:bg-gray-50/50 group"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#104360] text-white group-hover:bg-[#EF2034] transition">
                      <KeyRound size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#104360]">
                        Security & Password
                      </h4>
                      <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                        Change the primary admin login password and manage access security.
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && <ProductManager />}
          {activeTab === 'brands_categories' && <BrandCategoryManager />}
          {activeTab === 'company' && <CompanySettings />}
          {activeTab === 'users' && <UserManager />}
          {activeTab === 'inquiries' && <SecuritySettings />}
          {activeTab === 'security' && <SecuritySettings />}
        </main>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <h4 className="text-base font-semibold text-gray-900">
              Reset Entire Catalog to Factory Defaults?
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              This will overwrite custom product edits and restore initial Boven Frontier factory defaults.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="rounded-lg border border-gray-200 px-3.5 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleResetCatalog}
                className="rounded-lg bg-red-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-red-700 shadow-xs"
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
