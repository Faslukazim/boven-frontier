import { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  RotateCcw,
  Save,
  Building2,
} from 'lucide-react'
import { useStore } from '../context/useStore'

function CompanySettings() {
  const { company, updateCompany, resetCompany, showToast } = useStore()
  const [form, setForm] = useState({ ...company })
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    updateCompany(form)
    showToast('Company settings published successfully across the website!')
  }

  const handleReset = () => {
    resetCompany()
    setForm({ ...company })
    setShowResetConfirm(false)
    showToast('Company settings restored to factory defaults.')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#104360] text-[#EF2034]">
              <Building2 size={14} />
            </span>
            <h2 className="text-xl font-bold tracking-tight text-[#104360]">
              Company & Contact Settings
            </h2>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Update phone numbers, WhatsApp desk, emails, and address. Changes reflect immediately across all pages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition shadow-2xs"
          >
            <RotateCcw size={13} />
            Reset
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-base font-bold text-[#104360]">Reset to Factory Defaults?</h3>
            <p className="mt-2 text-xs text-gray-600 leading-relaxed">
              This will restore the original company contact numbers, emails, and address. Any custom edits will be replaced.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg bg-[#EF2034] px-4 py-2 text-xs font-semibold text-white hover:bg-red-700"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact Numbers & WhatsApp */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-2xs">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
            <Phone size={16} className="text-[#EF2034]" />
            <h3 className="text-sm font-bold text-[#104360] uppercase tracking-wider">
              Phone & WhatsApp Channels
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Direct Phone 1 (Primary)
              </label>
              <input
                type="text"
                value={form.phone1 || ''}
                onChange={(e) => setForm({ ...form, phone1: e.target.value })}
                placeholder="+91 96338 90447"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Direct Phone 2 (Secondary)
              </label>
              <input
                type="text"
                value={form.phone2 || ''}
                onChange={(e) => setForm({ ...form, phone2: e.target.value })}
                placeholder="+91 70127 77495"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                UAE / GCC WhatsApp Desk
              </label>
              <input
                type="text"
                value={form.whatsappUAE || ''}
                onChange={(e) => setForm({ ...form, whatsappUAE: e.target.value })}
                placeholder="+971 50 735 5418"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                India WhatsApp / Mobile Desk
              </label>
              <input
                type="text"
                value={form.whatsappIndia || ''}
                onChange={(e) => setForm({ ...form, whatsappIndia: e.target.value })}
                placeholder="+91 96338 90447"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
              />
            </div>
          </div>
        </div>

        {/* Email Addresses */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-2xs">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
            <Mail size={16} className="text-[#EF2034]" />
            <h3 className="text-sm font-bold text-[#104360] uppercase tracking-wider">
              Email Addresses
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                General Inquiries
              </label>
              <input
                type="email"
                value={form.email1 || ''}
                onChange={(e) => setForm({ ...form, email1: e.target.value })}
                placeholder="info@bovenfrontier.co.in"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Export / Operations Desk
              </label>
              <input
                type="email"
                value={form.email2 || ''}
                onChange={(e) => setForm({ ...form, email2: e.target.value })}
                placeholder="aswin@bovenfrontier.co.in"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Sales & Wholesale
              </label>
              <input
                type="email"
                value={form.email3 || ''}
                onChange={(e) => setForm({ ...form, email3: e.target.value })}
                placeholder="shidil@bovenfrontier.co.in"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
              />
            </div>
          </div>
        </div>

        {/* Corporate Address & Operating Hours */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-2xs">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
            <MapPin size={16} className="text-[#EF2034]" />
            <h3 className="text-sm font-bold text-[#104360] uppercase tracking-wider">
              Location & Entity Registration
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Registered Office & Plant Address
              </label>
              <input
                type="text"
                value={form.address || ''}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Room No. OP 7/452, Manakkadavu, Kozhikode 673019, India"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  LLP ID Number
                </label>
                <input
                  type="text"
                  value={form.llpId || ''}
                  onChange={(e) => setForm({ ...form, llpId: e.target.value })}
                  placeholder="ACE-5349"
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  GSTIN
                </label>
                <input
                  type="text"
                  value={form.gstin || ''}
                  onChange={(e) => setForm({ ...form, gstin: e.target.value })}
                  placeholder="32ABCFB2913N1ZN"
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Operating Hours
                </label>
                <input
                  type="text"
                  value={form.operatingHours || ''}
                  onChange={(e) => setForm({ ...form, operatingHours: e.target.value })}
                  placeholder="Mon – Sat: 9:00 AM – 6:30 PM (IST)"
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-[#104360] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#EF2034] transition shadow-xs"
          >
            <Save size={15} />
            Save Company Settings
          </button>
        </div>
      </form>
    </div>
  )
}

export default CompanySettings
