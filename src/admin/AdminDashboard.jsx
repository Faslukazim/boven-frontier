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
  Megaphone,
} from 'lucide-react'
import { useStore } from '../context/useStore'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import ProductManager from './ProductManager'
import CompanySettings from './CompanySettings'
import SecuritySettings from './SecuritySettings'
import UserManager from './UserManager'
import BrandCategoryManager from './BrandCategoryManager'
import BannerManager from './BannerManager'

function AdminDashboard() {
  const navigate = useNavigate()
  const { products, brands = [], categories = [], adminUsers, inquiries, resetToDefaults } = useStore()

  const [activeTab, setActiveTab] = useState('products')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [resetSuccessNotice, setResetSuccessNotice] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState({
    name: 'Administrator',
    email: '',
    role: 'Administrator',
  })

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      navigate('/admin/login', { replace: true })
      return
    }

    let mounted = true

    const syncUserFromSession = (session) => {
      if (!session || !session.user) {
        navigate('/admin/login', { replace: true })
        return
      }

      const email = session.user.email || ''
      const metadata = session.user.user_metadata || {}
      const matchedProfile = adminUsers?.find(
        (u) => u.email?.toLowerCase() === email.toLowerCase()
      )

      setCurrentUser({
        id: session.user.id,
        email,
        name: metadata.name || matchedProfile?.name || email.split('@')[0] || 'Admin',
        role:
          metadata.role ||
          matchedProfile?.role ||
          (email.toLowerCase() === 'aswin@bovenfrontier.co.in' ? 'Super Admin' : 'Administrator'),
      })
      setAuthLoading(false)
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return
      if (!session) {
        navigate('/admin/login', { replace: true })
      } else {
        syncUserFromSession(session)
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return
      if (!session) {
        navigate('/admin/login', { replace: true })
      } else {
        syncUserFromSession(session)
      }
    })

    return () => {
      mounted = false
      subscription?.unsubscribe()
    }
  }, [navigate, adminUsers])

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut().catch(console.warn)
    }
    navigate('/admin/login', { replace: true })
  }

  const handleResetCatalog = () => {
    resetToDefaults()
    setShowResetConfirm(false)
    setResetSuccessNotice(true)
    setTimeout(() => setResetSuccessNotice(false), 3500)
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#104360] border-t-transparent" />
          <p className="text-xs font-semibold uppercase tracking-wider text-[#104360]/70">
            Verifying Administrative Session...
          </p>
        </div>
      </div>
    )
  }

  const activeBrands = [...new Set(products.map((p) => p.brand))]
  const featuredCount = products.filter((p) => p.is_featured).length

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#104360]">
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#104360] text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
          <Link to="/" className="flex items-center gap-2.5 font-medium tracking-tight">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#EF2034] text-white">
              <ShieldCheck size={18} />
            </div>
            <div>
              <span className="block text-xs font-semibold tracking-wider">BOVEN FRONTIER</span>
              <span className="block text-[7px] tracking-[0.2em] text-[#EF2034]">ADMIN CONSOLE</span>
            </div>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/60 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto p-4 text-xs font-medium">
          <button
            onClick={() => { setActiveTab('products'); setMobileMenuOpen(false) }}
            className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 transition ${activeTab === 'products' ? 'bg-[#EF2034] text-white font-semibold shadow-xs' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
          >
            <div className="flex items-center gap-3"><Package size={16} /><span>Products & SKUs</span></div>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">{products.length}</span>
          </button>

          <button
            onClick={() => { setActiveTab('brands_categories'); setMobileMenuOpen(false) }}
            className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 transition ${activeTab === 'brands_categories' ? 'bg-[#EF2034] text-white font-semibold shadow-xs' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
          >
            <div className="flex items-center gap-3"><Tags size={16} /><span>Brands & Categories</span></div>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">{brands.length + categories.length}</span>
          </button>

          <button
            onClick={() => { setActiveTab('banners'); setMobileMenuOpen(false) }}
            className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 transition ${activeTab === 'banners' ? 'bg-[#EF2034] text-white font-semibold shadow-xs' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
          >
            <div className="flex items-center gap-3"><Megaphone size={16} /><span>Banners & Promos</span></div>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">LIVE</span>
          </button>

          <button
            onClick={() => { setActiveTab('company'); setMobileMenuOpen(false) }}
            className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 transition ${activeTab === 'company' ? 'bg-[#EF2034] text-white font-semibold shadow-xs' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
          >
            <Building2 size={16} /><span>Company & Contact</span>
          </button>

          <button
            onClick={() => { setActiveTab('users'); setMobileMenuOpen(false) }}
            className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 transition ${activeTab === 'users' ? 'bg-[#EF2034] text-white font-semibold shadow-xs' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
          >
            <div className="flex items-center gap-3"><Users size={16} /><span>Team & Users</span></div>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">{adminUsers?.length || 1}</span>
          </button>

          <button
            onClick={() => { setActiveTab('inquiries'); setMobileMenuOpen(false) }}
            className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 transition ${activeTab === 'inquiries' ? 'bg-[#EF2034] text-white font-semibold shadow-xs' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
          >
            <div className="flex items-center gap-3"><Inbox size={16} /><span>Inquiries Desk</span></div>
            {inquiries?.length > 0 ? (
              <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] text-white font-bold">{inquiries.length}</span>
            ) : (
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/50">0</span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('security'); setMobileMenuOpen(false) }}
            className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 transition ${activeTab === 'security' ? 'bg-[#EF2034] text-white font-semibold shadow-xs' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
          >
            <KeyRound size={16} /><span>Security & Password</span>
          </button>

          <button
            onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false) }}
            className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 transition ${activeTab === 'overview' ? 'bg-[#EF2034] text-white font-semibold shadow-xs' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
          >
            <LayoutDashboard size={16} /><span>Dashboard Overview</span>
          </button>

          <div className="my-4 border-t border-white/10 pt-4">
            <Link to="/" target="_blank" rel="noopener noreferrer" className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-white/70 transition hover:bg-white/10 hover:text-white">
              <ExternalLink size={16} /><span>View Live Website</span>
            </Link>
          </div>
        </nav>

        <div className="border-t border-white/10 bg-black/10 p-4">
          <div className="flex items-center justify-between">
            <div className="truncate">
              <p className="truncate text-xs font-semibold text-white">{currentUser.name}</p>
              <p className="truncate text-[10px] text-white/60">{currentUser.email}</p>
              <span className="mt-0.5 inline-block text-[8px] font-bold uppercase tracking-wider text-[#EF2034]">{currentUser.role}</span>
            </div>
            <button onClick={handleLogout} className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-red-400" title="Sign Out">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-x-hidden">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} className="rounded p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden">
              <Menu size={20} />
            </button>
            <div>
              <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 sm:inline">Management Portal</span>
              <span className="ml-2 hidden text-xs font-bold text-[#104360] md:inline">· {currentUser.name} ({currentUser.role})</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setShowResetConfirm(true)} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-[10px] font-semibold text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700" title="Reset products to initial factory defaults">
              <RotateCcw size={12} /><span className="hidden sm:inline">Reset Defaults</span>
            </button>
            <Link to="/" className="inline-flex items-center gap-1.5 rounded-lg bg-[#104360] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white transition hover:bg-[#EF2034]">
              <span className="hidden sm:inline">Live Site</span><ExternalLink size={12} />
            </Link>
          </div>
        </header>

        {resetSuccessNotice && (
          <div className="mx-4 mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800 shadow-sm sm:mx-8">
            <CheckCircle size={16} className="shrink-0 text-emerald-600" />
            <span>Catalog data has been successfully reset to initial factory defaults.</span>
          </div>
        )}

        <main className="mx-auto w-full max-w-[1600px] flex-1 p-4 sm:p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Products (SKUs)</span>
                  <div className="mt-2 text-3xl font-bold text-[#104360]">{products.length}</div>
                  <span className="mt-1 inline-block text-[11px] font-medium text-emerald-600">Active in wholesale catalog</span>
                </div>
                <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Product Brands</span>
                  <div className="mt-2 text-3xl font-bold text-[#104360]">{activeBrands.length}</div>
                  <span className="mt-1 inline-block truncate text-[11px] text-gray-500">{activeBrands.join(' · ')}</span>
                </div>
                <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Featured in Hero</span>
                  <div className="mt-2 text-3xl font-bold text-[#EF2034]">{featuredCount}</div>
                  <span className="mt-1 inline-block text-[11px] text-gray-500">Rotating 3D showcase</span>
                </div>
                <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Customer Inquiries</span>
                  <div className="mt-2 text-3xl font-bold text-[#104360]">{inquiries?.length || 0}</div>
                  <span className="mt-1 inline-block text-[11px] font-medium text-emerald-600">Submissions received</span>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-2xs">
                <h3 className="text-base font-semibold text-[#104360]">Administrative Management Sections</h3>
                <p className="mt-1 text-xs text-gray-500">Select a module to update products, company details, banners, team members, or inquiries.</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <button onClick={() => setActiveTab('products')} className="group flex items-start gap-4 rounded-xl border border-gray-200/80 p-4 text-left transition hover:border-[#104360] hover:bg-gray-50/50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#104360] text-white transition group-hover:bg-[#EF2034]"><Package size={20} /></div>
                    <div><h4 className="text-sm font-semibold text-[#104360]">Manage Products & SKUs</h4><p className="mt-1 text-xs leading-relaxed text-gray-500">Add products, duplicate SKUs with 1 click, toggle Hero showcase, and edit packaging sizes.</p></div>
                  </button>

                  <button onClick={() => setActiveTab('banners')} className="group flex items-start gap-4 rounded-xl border border-[#EF2034]/30 bg-[#EF2034]/[0.03] p-4 text-left transition hover:border-[#EF2034] hover:bg-[#EF2034]/[0.06]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EF2034] text-white transition"><Megaphone size={20} /></div>
                    <div><h4 className="text-sm font-semibold text-[#104360]">Banners & Promos</h4><p className="mt-1 text-xs leading-relaxed text-gray-500">Change the top announcement, hero badge, and promotional banners without editing code.</p></div>
                  </button>

                  <button onClick={() => setActiveTab('brands_categories')} className="group flex items-start gap-4 rounded-xl border border-gray-200/80 p-4 text-left transition hover:border-[#104360] hover:bg-gray-50/50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#104360] text-white transition group-hover:bg-[#EF2034]"><Tags size={20} /></div>
                    <div><h4 className="text-sm font-semibold text-[#104360]">Brands & Categories</h4><p className="mt-1 text-xs leading-relaxed text-gray-500">Add wholesale brands ({brands.length}) and customize product categories ({categories.length}).</p></div>
                  </button>

                  <button onClick={() => setActiveTab('company')} className="group flex items-start gap-4 rounded-xl border border-gray-200/80 bg-white p-4 text-left transition hover:border-[#104360] hover:bg-gray-50/50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#104360] text-white transition group-hover:bg-[#EF2034]"><Building2 size={20} /></div>
                    <div><h4 className="text-sm font-semibold text-[#104360]">Company & Contact Info</h4><p className="mt-1 text-xs leading-relaxed text-gray-500">Update phone numbers, UAE WhatsApp desk, emails, corporate address, and operating hours.</p></div>
                  </button>

                  <button onClick={() => setActiveTab('users')} className="group flex items-start gap-4 rounded-xl border border-gray-200/80 p-4 text-left transition hover:border-[#104360] hover:bg-gray-50/50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#104360] text-white transition group-hover:bg-[#EF2034]"><Users size={20} /></div>
                    <div><h4 className="text-sm font-semibold text-[#104360]">Team & User Access</h4><p className="mt-1 text-xs leading-relaxed text-gray-500">Add new administrative accounts, set role permissions, and manage staff access.</p></div>
                  </button>

                  <button onClick={() => setActiveTab('security')} className="group flex items-start gap-4 rounded-xl border border-gray-200/80 bg-white p-4 text-left transition hover:border-[#104360] hover:bg-gray-50/50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#104360] text-white transition group-hover:bg-[#EF2034]"><KeyRound size={20} /></div>
                    <div><h4 className="text-sm font-semibold text-[#104360]">Security & Password</h4><p className="mt-1 text-xs leading-relaxed text-gray-500">Change the primary admin login password and manage access security.</p></div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && <ProductManager />}
          {activeTab === 'brands_categories' && <BrandCategoryManager />}
          {activeTab === 'banners' && <BannerManager />}
          {activeTab === 'company' && <CompanySettings />}
          {activeTab === 'users' && <UserManager />}
          {activeTab === 'inquiries' && <SecuritySettings />}
          {activeTab === 'security' && <SecuritySettings />}
        </main>
      </div>

      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-6 shadow-2xl">
            <h4 className="text-base font-semibold text-gray-900">Reset Entire Catalog to Factory Defaults?</h4>
            <p className="text-xs leading-relaxed text-gray-500">This will overwrite custom product edits and restore initial Boven Frontier factory defaults.</p>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowResetConfirm(false)} className="rounded-lg border border-gray-200 px-3.5 py-1.5 text-xs text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleResetCatalog} className="rounded-lg bg-red-600 px-4 py-1.5 text-xs font-medium text-white shadow-xs hover:bg-red-700">Yes, Reset All</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
