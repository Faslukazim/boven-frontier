import { useState, useEffect } from 'react'
import {
  KeyRound,
  CheckCircle,
  AlertCircle,
  Inbox,
  Trash2,
} from 'lucide-react'
import { useStore } from '../context/useStore'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

function SecuritySettings() {
  const { inquiries, deleteInquiry, clearInquiries, showToast } = useStore()
  const [currentUserEmail, setCurrentUserEmail] = useState('aswin@bovenfrontier.co.in')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user && user.email) {
          setCurrentUserEmail(user.email)
        }
      })
    }
  }, [])

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.')
      return
    }

    if (!isSupabaseConfigured || !supabase) {
      setError('Supabase authentication is not configured in this environment.')
      return
    }

    setUpdating(true)

    try {
      const { error: updateErr } = await supabase.auth.updateUser({
        password: newPassword,
      })

      setUpdating(false)

      if (updateErr) {
        setError(updateErr.message || 'Failed to update password in Supabase Auth.')
        showToast(updateErr.message || 'Failed to update password.', 'error')
      } else {
        const msg = 'Administrative password successfully updated in Supabase Auth!'
        setSuccess(msg)
        showToast(msg)
        setNewPassword('')
        setConfirmPassword('')
        setTimeout(() => setSuccess(''), 5000)
      }
    } catch (err) {
      setUpdating(false)
      const msg = err?.message || 'An unexpected error occurred while updating your password.'
      setError(msg)
      showToast(msg, 'error')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#104360] text-[#EF2034]">
            <KeyRound size={14} />
          </span>
          <h2 className="text-xl font-bold tracking-tight text-[#104360]">
            Admin Password & Access Security
          </h2>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Change your administrative login password. Your new password is encrypted and updated directly in Supabase Auth.
        </p>
      </div>

      {/* Success / Error Alerts */}
      {success && (
        <div className="flex items-center gap-2.5 rounded-xl bg-emerald-600 px-4 py-3 text-white shadow-sm">
          <CheckCircle size={18} className="shrink-0 text-white" />
          <p className="text-xs font-semibold">{success}</p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2.5 rounded-xl bg-red-600 px-4 py-3 text-white shadow-sm">
          <AlertCircle size={18} className="shrink-0 text-white" />
          <p className="text-xs font-semibold">{error}</p>
        </div>
      )}

      {/* Password Form */}
      <div className="max-w-xl rounded-xl border border-gray-200 bg-white p-6 shadow-2xs">
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">
              Admin Login Email
            </label>
            <input
              type="text"
              disabled
              value={currentUserEmail}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-xs text-gray-500 cursor-not-allowed font-medium font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={updating}
              className="inline-flex items-center gap-2 rounded-lg bg-[#104360] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#EF2034] transition shadow-xs disabled:opacity-50"
            >
              <KeyRound size={14} />
              {updating ? 'Updating Password...' : 'Update Password in Supabase'}
            </button>
          </div>
        </form>
      </div>

      {/* Inquiries Inbox */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Inbox size={16} className="text-[#EF2034]" />
            <h3 className="text-sm font-bold text-[#104360] uppercase tracking-wider">
              Website Inquiries Log ({inquiries.length})
            </h3>
          </div>

          {inquiries.length > 0 && (
            <button
              type="button"
              onClick={() => {
                clearInquiries()
                showToast('All customer inquiries cleared.')
              }}
              className="text-[11px] font-medium text-gray-400 hover:text-red-600 transition"
            >
              Clear All
            </button>
          )}
        </div>

        {inquiries.length === 0 ? (
          <p className="text-xs text-gray-400 py-6 text-center">
            No inquiries recorded yet. When prospective clients submit the website contact form, they will appear here.
          </p>
        ) : (
          <div className="space-y-3">
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-gray-100 bg-gray-50/70 p-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#104360]">{inq.name}</span>
                    {inq.company && <span className="text-gray-400">· {inq.company}</span>}
                    <span className="rounded bg-gray-200 px-1.5 py-0.5 text-[9px] font-medium text-gray-600">
                      {inq.buyerType || 'B2B Buyer'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-gray-500 text-[11px]">
                    {inq.phone && <span>📞 {inq.phone}</span>}
                    {inq.email && <span>✉️ {inq.email}</span>}
                    {inq.region && <span>📍 {inq.region}</span>}
                    {inq.product && <span className="text-[#EF2034] font-medium">📦 {inq.product}</span>}
                  </div>
                  {inq.message && (
                    <p className="mt-1 text-gray-600 italic text-[11px]">"{inq.message}"</p>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="text-[10px] text-gray-400">
                    {inq.submittedAt ? new Date(inq.submittedAt).toLocaleDateString() : 'Recent'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      deleteInquiry(inq.id)
                      showToast('Inquiry removed.')
                    }}
                    className="p-1 text-gray-400 hover:text-red-600"
                    title="Delete inquiry"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SecuritySettings
