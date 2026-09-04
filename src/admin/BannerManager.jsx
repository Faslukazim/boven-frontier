import { useState } from 'react'
import {
  Megaphone,
  Check,
  RotateCcw,
  Eye,
  Sparkles,
  ExternalLink,
  ArrowUpRight,
  Plus,
  Trash2,
  Edit2,
  X,
} from 'lucide-react'
import { useStore } from '../context/useStore'

function BannerManager() {
  const {
    topBadge,
    updateTopBadge,
    banners,
    addBanner,
    updateBanner,
    deleteBanner,
    toggleBanner,
  } = useStore()

  // Local state for Top Badge form
  const [badgeForm, setBadgeForm] = useState(() => ({
    title: topBadge?.title || '',
    subtitle: topBadge?.subtitle || '',
    ctaText: topBadge?.ctaText || '',
    ctaLink: topBadge?.ctaLink || '',
    theme: topBadge?.theme || 'navy',
    is_active: topBadge?.is_active !== false,
    heroBadge: topBadge?.heroBadge || '',
  }))

  const [savedSuccess, setSavedSuccess] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  // Secondary promo banners state
  const [showPromoList, setShowPromoList] = useState(false)
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false)
  const [editingPromo, setEditingPromo] = useState(null)
  const [deletePromoId, setDeletePromoId] = useState(null)
  const [promoForm, setPromoForm] = useState({
    title: '',
    subtitle: '',
    ctaText: 'Enquire Now',
    ctaLink: '/contact',
    position: 'top-bar',
    theme: 'gold',
    is_active: true,
  })

  // Save Top Badge & Hero Badge
  const handleSaveBadge = (e) => {
    e.preventDefault()
    updateTopBadge({
      title: badgeForm.title.trim(),
      subtitle: badgeForm.subtitle.trim(),
      ctaText: badgeForm.ctaText.trim(),
      ctaLink: badgeForm.ctaLink.trim(),
      theme: badgeForm.theme,
      is_active: badgeForm.is_active,
      heroBadge: badgeForm.heroBadge.trim(),
    })

    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3500)
  }

  // Quick reset to recommended defaults
  const handleResetBadge = () => {
    const defaultSettings = {
      title: 'Direct Factory Wholesale · Manufactured in India · Export Ready to UAE, KSA, GCC',
      subtitle: 'Min. Order: 50 Cartons · Direct Factory Pricing',
      ctaText: 'Export Desk',
      ctaLink: 'https://wa.me/919207577242?text=Hello%20Boven%20Frontier%2C%20I%20would%20like%20to%20enquire%20about%20wholesale%20orders.',
      theme: 'navy',
      is_active: true,
      heroBadge: 'Manufactured in India · Direct Factory Supply',
    }
    setBadgeForm(defaultSettings)
    updateTopBadge(defaultSettings)
    setShowResetConfirm(false)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3500)
  }

  // Promo Banner handlers
  const handleOpenAddPromo = () => {
    setEditingPromo(null)
    setPromoForm({
      title: '',
      subtitle: '',
      ctaText: 'Enquire Now',
      ctaLink: '/contact',
      position: 'top-bar',
      theme: 'gold',
      is_active: true,
    })
    setIsPromoModalOpen(true)
  }

  const handleOpenEditPromo = (item) => {
    setEditingPromo(item)
    setPromoForm({
      title: item.title,
      subtitle: item.subtitle || '',
      ctaText: item.ctaText || 'Learn More',
      ctaLink: item.ctaLink || '/contact',
      position: item.position || 'top-bar',
      theme: item.theme || 'gold',
      is_active: item.is_active !== false,
    })
    setIsPromoModalOpen(true)
  }

  const handleSavePromo = (e) => {
    e.preventDefault()
    const payload = {
      title: promoForm.title.trim(),
      subtitle: promoForm.subtitle.trim(),
      ctaText: promoForm.ctaText.trim(),
      ctaLink: promoForm.ctaLink.trim() || '/contact',
      position: promoForm.position,
      theme: promoForm.theme,
      is_active: promoForm.is_active,
    }

    if (editingPromo) {
      updateBanner(editingPromo.id, payload)
    } else {
      addBanner(payload)
    }
    setIsPromoModalOpen(false)
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Notification Banner */}
      {savedSuccess && (
        <div className="flex items-center justify-between rounded-xl bg-emerald-600 px-5 py-3.5 text-white shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
              <Check size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold">Settings Published Successfully!</p>
              <p className="text-[11px] text-emerald-100">
                Your top announcement bar and hero badge are updated live on the website.
              </p>
            </div>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded bg-white px-3 py-1.5 text-[11px] font-bold text-emerald-800 hover:bg-emerald-50 transition"
          >
            Check Live Site
            <ExternalLink size={12} />
          </a>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#172b3f] text-[#c9a84c]">
              <Megaphone size={14} />
            </span>
            <h2 className="text-xl font-bold tracking-tight text-[#172b3f]">
              Top Announcement & Hero Badge
            </h2>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Easily customize what visitors see at the very top of the website and on the homepage hero pill.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition shadow-2xs"
            title="Reset to original factory defaults"
          >
            <RotateCcw size={13} />
            Reset Defaults
          </button>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#172b3f] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#c9a84c] hover:text-[#172b3f] transition shadow-2xs"
          >
            <Eye size={13} />
            View Live
          </a>
        </div>
      </div>

      {/* =======================================================
          LIVE INTERACTIVE PREVIEW
      ======================================================= */}
      <div className="rounded-2xl border border-gray-200/90 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye size={15} className="text-[#c9a84c]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Live Preview (As Seen on Website)
            </h3>
          </div>

          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
              badgeForm.is_active
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-gray-100 text-gray-500 border border-gray-200'
            }`}
          >
            {badgeForm.is_active ? '● Visible on Site' : '○ Hidden from Site'}
          </span>
        </div>

        {/* Live Top Announcement Bar Preview */}
        <div className="space-y-1.5">
          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
            1. Top Announcement Bar (Header):
          </p>

          {badgeForm.is_active ? (
            <div
              className={`flex flex-wrap items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-xs transition-colors shadow-2xs ${
                badgeForm.theme === 'gold'
                  ? 'bg-[#c9a84c] text-[#172b3f]'
                  : badgeForm.theme === 'dark'
                  ? 'bg-gray-900 text-white'
                  : 'bg-[#172b3f] text-white'
              }`}
            >
              <div className="flex flex-1 items-center justify-center gap-2 text-center text-[11px] sm:text-xs min-w-0">
                <Megaphone
                  size={13}
                  className={`shrink-0 ${
                    badgeForm.theme === 'gold' ? 'text-[#172b3f]' : 'text-[#c9a84c]'
                  }`}
                />
                <span className="font-bold truncate">
                  {badgeForm.title || 'Your announcement message goes here...'}
                </span>

                {badgeForm.subtitle && (
                  <span className="hidden md:inline opacity-80 text-[11px] truncate">
                    — {badgeForm.subtitle}
                  </span>
                )}

                {badgeForm.ctaText && (
                  <span className="ml-2 inline-flex items-center gap-1 rounded bg-white/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                    {badgeForm.ctaText}
                    <ArrowUpRight size={10} />
                  </span>
                )}
              </div>

              <span className="opacity-40 text-xs">✕</span>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50/80 p-3 text-center text-xs text-gray-400">
              Announcement bar is currently disabled. Toggle &ldquo;Show Announcement Bar&rdquo; below to display it.
            </div>
          )}
        </div>

        {/* Live Hero Pill Badge Preview */}
        <div className="space-y-1.5 pt-3 border-t border-gray-100">
          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
            2. Homepage Hero Pill Badge (Above Main Headline):
          </p>

          <div className="rounded-lg bg-[#fbfbfa] border border-gray-200/80 p-4 flex items-center justify-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c9a84c]/40 bg-[#fefbf3] px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#b08d2e] shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[#c9a84c] animate-ping" />
              {badgeForm.heroBadge || 'Manufactured in India · Direct Factory Supply'}
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================
          EDIT FORM
      ======================================================= */}
      <form onSubmit={handleSaveBadge} className="space-y-6">
        {/* SECTION 1: Top Announcement Bar */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#172b3f]">
                Top Announcement Bar Settings
              </h3>
              <p className="text-[11px] text-gray-500">
                Appears at the very top of every page on the website.
              </p>
            </div>

            {/* Enable/Disable Toggle */}
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <span className="text-xs font-medium text-gray-700">
                {badgeForm.is_active ? 'Active (Visible)' : 'Disabled (Hidden)'}
              </span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={badgeForm.is_active}
                  onChange={(e) =>
                    setBadgeForm({ ...badgeForm, is_active: e.target.checked })
                  }
                  className="sr-only"
                />
                <div
                  className={`h-6 w-11 rounded-full transition-colors ${
                    badgeForm.is_active ? 'bg-emerald-600' : 'bg-gray-300'
                  }`}
                />
                <div
                  className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    badgeForm.is_active ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </label>
          </div>

          <div className="grid gap-4">
            {/* Title */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Main Headline / Announcement Text *
              </label>
              <input
                type="text"
                required
                value={badgeForm.title}
                onChange={(e) =>
                  setBadgeForm({ ...badgeForm, title: e.target.value })
                }
                placeholder="e.g. Direct Factory Wholesale · Manufactured in India · Export Ready to UAE, KSA, GCC"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#172b3f] focus:ring-1 focus:ring-[#172b3f]"
              />
              <p className="mt-1 text-[10px] text-gray-400">
                Keep this clear and concise for maximum readability across mobile and desktop.
              </p>
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Subtitle / Extra Info (Optional)
              </label>
              <input
                type="text"
                value={badgeForm.subtitle}
                onChange={(e) =>
                  setBadgeForm({ ...badgeForm, subtitle: e.target.value })
                }
                placeholder="e.g. Min. Order: 50 Cartons · Direct Factory Pricing"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#172b3f] focus:ring-1 focus:ring-[#172b3f]"
              />
              <p className="mt-1 text-[10px] text-gray-400">
                Appears on tablet & desktop screens next to the headline.
              </p>
            </div>

            {/* Button Text & Link */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Action Button Label (Optional)
                </label>
                <input
                  type="text"
                  value={badgeForm.ctaText}
                  onChange={(e) =>
                    setBadgeForm({ ...badgeForm, ctaText: e.target.value })
                  }
                  placeholder="e.g. Export Desk, WhatsApp Us, Enquire Now"
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#172b3f] focus:ring-1 focus:ring-[#172b3f]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Action Button Link / WhatsApp URL
                </label>
                <input
                  type="text"
                  value={badgeForm.ctaLink}
                  onChange={(e) =>
                    setBadgeForm({ ...badgeForm, ctaLink: e.target.value })
                  }
                  placeholder="e.g. https://wa.me/919207577242 or /contact"
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#172b3f] focus:ring-1 focus:ring-[#172b3f]"
                />
              </div>
            </div>

            {/* Theme Picker */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-2">
                Color Theme Style
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Navy */}
                <button
                  type="button"
                  onClick={() => setBadgeForm({ ...badgeForm, theme: 'navy' })}
                  className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition ${
                    badgeForm.theme === 'navy'
                      ? 'border-[#172b3f] bg-slate-50 ring-2 ring-[#172b3f]/20'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="h-6 w-6 rounded-full bg-[#172b3f] shadow-xs shrink-0 flex items-center justify-center text-white text-[10px]">
                    {badgeForm.theme === 'navy' && <Check size={12} />}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Navy Theme</p>
                    <p className="text-[10px] text-gray-500">Classic Boven Blue</p>
                  </div>
                </button>

                {/* Gold */}
                <button
                  type="button"
                  onClick={() => setBadgeForm({ ...badgeForm, theme: 'gold' })}
                  className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition ${
                    badgeForm.theme === 'gold'
                      ? 'border-[#c9a84c] bg-amber-50/50 ring-2 ring-[#c9a84c]/30'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="h-6 w-6 rounded-full bg-[#c9a84c] shadow-xs shrink-0 flex items-center justify-center text-[#172b3f] text-[10px]">
                    {badgeForm.theme === 'gold' && <Check size={12} />}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Gold Theme</p>
                    <p className="text-[10px] text-gray-500">High-Visibility Gold</p>
                  </div>
                </button>

                {/* Charcoal */}
                <button
                  type="button"
                  onClick={() => setBadgeForm({ ...badgeForm, theme: 'dark' })}
                  className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition ${
                    badgeForm.theme === 'dark'
                      ? 'border-gray-900 bg-gray-50 ring-2 ring-gray-900/20'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="h-6 w-6 rounded-full bg-gray-900 shadow-xs shrink-0 flex items-center justify-center text-white text-[10px]">
                    {badgeForm.theme === 'dark' && <Check size={12} />}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Midnight Dark</p>
                    <p className="text-[10px] text-gray-500">Modern Neutral Dark</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Hero Pill Badge */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-sm font-bold text-[#172b3f]">
              Homepage Hero Pill Badge
            </h3>
            <p className="text-[11px] text-gray-500">
              The animated pill badge positioned directly above the &ldquo;Direct-from-Factory&rdquo; headline on the homepage.
            </p>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">
              Hero Badge Text *
            </label>
            <input
              type="text"
              required
              value={badgeForm.heroBadge}
              onChange={(e) =>
                setBadgeForm({ ...badgeForm, heroBadge: e.target.value })
              }
              placeholder="e.g. Manufactured in India · Direct Factory Supply"
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#172b3f] focus:ring-1 focus:ring-[#172b3f]"
            />
            <p className="mt-1 text-[10px] text-gray-400">
              Keep &ldquo;Manufactured in India&rdquo; prominent to comply with export and branding standards.
            </p>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl bg-gray-50 border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Sparkles size={16} className="text-[#c9a84c] shrink-0" />
            <span>Changes take effect immediately across all site visitors once saved.</span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#172b3f] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#c9a84c] hover:text-[#172b3f] transition"
          >
            <Check size={16} />
            Save & Publish to Website
          </button>
        </div>
      </form>

      {/* =======================================================
          OPTIONAL: SECONDARY PROMOTIONAL BANNERS
      ======================================================= */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#172b3f]">
              Additional Promotional Banners
            </h3>
            <p className="text-[11px] text-gray-500">
              Manage secondary campaign announcements and export alerts.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowPromoList(!showPromoList)}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition"
          >
            {showPromoList ? 'Hide List' : `View ${banners.length} Banners`}
          </button>
        </div>

        {showPromoList && (
          <div className="space-y-4 pt-4 border-t border-gray-100 animate-in fade-in duration-200">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleOpenAddPromo}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#172b3f] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#c9a84c] hover:text-[#172b3f] transition"
              >
                <Plus size={14} />
                Create New Banner
              </button>
            </div>

            <div className="grid gap-3">
              {banners.map((b) => (
                <div
                  key={b.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-gray-200 p-4 bg-gray-50/50"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                          b.is_active
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {b.is_active ? 'Active' : 'Disabled'}
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                        Placement: {b.position}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-gray-900 truncate">{b.title}</p>
                    {b.subtitle && (
                      <p className="text-[11px] text-gray-500 line-clamp-1">{b.subtitle}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleBanner(b.id)}
                      className={`rounded px-2.5 py-1 text-[11px] font-semibold transition ${
                        b.is_active
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {b.is_active ? 'Disable' : 'Enable'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenEditPromo(b)}
                      className="rounded p-1.5 text-gray-500 hover:bg-gray-200"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletePromoId(b.id)}
                      className="rounded p-1.5 text-red-500 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Promo Add/Edit Modal */}
      {isPromoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-[#f8f9fa]">
              <h3 className="font-bold text-sm text-[#172b3f]">
                {editingPromo ? 'Edit Promotional Banner' : 'Create New Promotional Banner'}
              </h3>
              <button
                onClick={() => setIsPromoModalOpen(false)}
                className="rounded p-1 text-gray-400 hover:bg-gray-200"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSavePromo} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Title / Headline *
                </label>
                <input
                  type="text"
                  required
                  value={promoForm.title}
                  onChange={(e) =>
                    setPromoForm({ ...promoForm, title: e.target.value })
                  }
                  placeholder="e.g. Private Label Bottling Available"
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-xs outline-none focus:border-[#172b3f]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Subtitle
                </label>
                <textarea
                  rows={2}
                  value={promoForm.subtitle}
                  onChange={(e) =>
                    setPromoForm({ ...promoForm, subtitle: e.target.value })
                  }
                  placeholder="e.g. Container-load dispatch direct from India manufacturing plant..."
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-xs outline-none focus:border-[#172b3f]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={promoForm.ctaText}
                    onChange={(e) =>
                      setPromoForm({ ...promoForm, ctaText: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#172b3f]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Button Link
                  </label>
                  <input
                    type="text"
                    value={promoForm.ctaLink}
                    onChange={(e) =>
                      setPromoForm({ ...promoForm, ctaLink: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#172b3f]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsPromoModalOpen(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#172b3f] px-5 py-2 text-xs font-semibold text-white hover:bg-[#c9a84c] hover:text-[#172b3f]"
                >
                  {editingPromo ? 'Save Changes' : 'Create Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Promo Modal */}
      {deletePromoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl space-y-4">
            <h4 className="text-sm font-bold text-gray-900">
              Delete Promotional Banner?
            </h4>
            <p className="text-xs text-gray-500">
              Are you sure you want to remove this banner?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeletePromoId(null)}
                className="rounded-lg border border-gray-200 px-3.5 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteBanner(deletePromoId)
                  setDeletePromoId(null)
                }}
                className="rounded-lg bg-red-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Defaults Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl space-y-4">
            <h4 className="text-sm font-bold text-gray-900">
              Restore Default Announcement & Hero Badge?
            </h4>
            <p className="text-xs text-gray-500">
              This will restore the original Boven Frontier factory wholesale announcement and &ldquo;Manufactured in India&rdquo; badge.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="rounded-lg border border-gray-200 px-3.5 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleResetBadge}
                className="rounded-lg bg-[#172b3f] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#c9a84c] hover:text-[#172b3f]"
              >
                Restore Defaults
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BannerManager
