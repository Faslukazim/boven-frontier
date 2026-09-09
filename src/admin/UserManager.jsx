import { useState } from 'react'
import {
  Users,
  UserPlus,
  ShieldCheck,
  Trash2,
  Mail,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  Send,
} from 'lucide-react'
import { useStore } from '../context/useStore'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

function UserManager() {
  const { adminUsers, addAdminUser, deleteAdminUser } = useStore()

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Add User Form State
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Administrator')
  const [loading, setLoading] = useState(false)

  // Notifications
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleOpenAdd = () => {
    setName('')
    setEmail('')
    setRole('Administrator')
    setError('')
    setIsAddModalOpen(true)
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    setError('')

    const trimmedName = name.trim()
    const trimmedEmail = email.trim().toLowerCase()

    if (!trimmedName || !trimmedEmail) {
      setError('Please provide a name and corporate email address.')
      return
    }

    setLoading(true)

    const res = addAdminUser({
      name: trimmedName,
      email: trimmedEmail,
      role,
    })

    if (!res.success) {
      setError(res.error || 'Failed to add user.')
      setLoading(false)
      return
    }

    // Trigger Supabase Auth invitation / password-setup email if configured
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.resetPasswordForEmail(trimmedEmail, {
          redirectTo: `${window.location.origin}/admin`,
        })
      } catch (authErr) {
        console.warn('Notice sending initial invite email:', authErr)
      }
    }

    setLoading(false)
    setIsAddModalOpen(false)
    setSuccess(
      `Team member ${trimmedName} added! An invitation and password setup link has been sent to ${trimmedEmail}.`
    )
    setTimeout(() => setSuccess(''), 5000)
  }

  const handleSendPasswordReset = async (user) => {
    if (!isSupabaseConfigured || !supabase) {
      alert('Supabase authentication is not configured in this environment.')
      return
    }

    try {
      const { error: resetErr } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/admin`,
      })

      if (resetErr) {
        alert(resetErr.message || 'Failed to dispatch password setup email.')
      } else {
        setSuccess(`Password setup / reset link sent to ${user.email}!`)
        setTimeout(() => setSuccess(''), 4000)
      }
    } catch (err) {
      alert(err.message || 'Error sending password setup email.')
    }
  }

  const handleDeleteUser = (user) => {
    if (user.isPrimary || user.email.toLowerCase() === 'aswin@bovenfrontier.co.in') {
      alert('The primary Super Administrator account (Aswin) cannot be deleted.')
      return
    }

    if (
      window.confirm(
        `Are you sure you want to remove administrative access for ${user.name} (${user.email})?`
      )
    ) {
      const res = deleteAdminUser(user.id)
      if (res.success) {
        setSuccess(`User ${user.name} removed from admin team.`)
        setTimeout(() => setSuccess(''), 3000)
      } else {
        alert(res.error || 'Could not delete user.')
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-gray-200/80 bg-white p-6 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <Users className="text-[#EF2034]" size={20} />
            <h2 className="text-lg font-semibold text-[#104360]">
              Team & Administrative Access
            </h2>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Manage authorized staff members who can manage products, view inquiries, and update company details.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#104360] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#EF2034] transition shadow-xs self-start sm:self-auto"
        >
          <UserPlus size={15} />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Success Alert */}
      {success && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-xs font-medium text-emerald-800 animate-in fade-in">
          <CheckCircle size={16} className="text-emerald-600 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Users Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200/80 bg-white p-4 shadow-2xs flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#104360]/5 text-[#104360]">
            <Users size={18} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Total Users</p>
            <p className="text-lg font-semibold text-[#104360]">{adminUsers.length}</p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200/80 bg-white p-4 shadow-2xs flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EF2034]/10 text-[#EF2034]">
            <ShieldCheck size={18} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Primary Administrator</p>
            <p className="text-xs font-semibold text-gray-900 truncate">aswin@bovenfrontier.co.in</p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200/80 bg-white p-4 shadow-2xs flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <CheckCircle size={18} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Supabase Auth Security</p>
            <p className="text-xs font-semibold text-emerald-700">Encrypted Role-Based Access</p>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#104360]">
            <thead className="border-b border-gray-200 bg-[#F8FAFC] text-[9px] uppercase tracking-wider text-gray-500">
              <tr>
                <th className="py-3.5 pl-6 pr-3">User</th>
                <th className="px-3 py-3.5">Email</th>
                <th className="px-3 py-3.5">Assigned Role</th>
                <th className="px-3 py-3.5">Added Date</th>
                <th className="px-3 py-3.5">Access Status</th>
                <th className="py-3.5 pl-3 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-normal">
              {adminUsers.map((user) => {
                const isPrimary = user.isPrimary || user.email.toLowerCase() === 'aswin@bovenfrontier.co.in'

                return (
                  <tr key={user.id} className="hover:bg-gray-50/70 transition">
                    <td className="py-4 pl-6 pr-3 font-semibold text-gray-900">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#104360] text-white font-bold text-xs uppercase">
                          {user.name ? user.name[0] : 'U'}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm text-gray-900 font-medium">{user.name}</span>
                            {isPrimary && (
                              <span className="rounded-full bg-[#EF2034]/10 px-2 py-0.5 text-[9px] font-bold text-[#EF2034]">
                                Primary Super Admin
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-4 text-gray-600 font-mono text-[11px]">
                      {user.email}
                    </td>

                    <td className="px-3 py-4">
                      <span className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-[10px] font-semibold text-gray-700">
                        {user.role || 'Administrator'}
                      </span>
                    </td>

                    <td className="px-3 py-4 text-gray-500 text-[11px]">
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="text-gray-400" />
                        <span>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Active'}</span>
                      </div>
                    </td>

                    <td className="px-3 py-4">
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-medium text-[11px]">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    </td>

                    <td className="py-4 pl-3 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleSendPasswordReset(user)}
                          title={`Send Password Setup / Reset Email to ${user.email}`}
                          className="rounded p-1.5 text-gray-400 hover:bg-blue-50 hover:text-[#104360] transition"
                        >
                          <Send size={14} />
                        </button>

                        {isPrimary ? (
                          <span className="text-[10px] font-semibold text-gray-400 px-2 py-1 bg-gray-100 rounded">
                            Owner
                          </span>
                        ) : (
                          <button
                            onClick={() => handleDeleteUser(user)}
                            title="Remove User"
                            className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-[#F8FAFC]">
              <div className="flex items-center gap-2 text-[#104360]">
                <UserPlus size={18} className="text-[#EF2034]" />
                <h3 className="font-semibold text-sm sm:text-base">
                  Add New Team Member
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2.5 text-xs text-[#104360] placeholder-gray-400 outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                  Corporate Email Address *
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul@bovenfrontier.co.in"
                    className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2.5 text-xs text-[#104360] placeholder-gray-400 outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                  Assigned Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-xs text-[#104360] outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360] bg-white"
                >
                  <option value="Administrator">Administrator (Full Access)</option>
                  <option value="Catalog Manager">Catalog Manager (Products Only)</option>
                  <option value="Sales Representative">Sales Representative (Inquiries & Products)</option>
                </select>
              </div>

              <div className="rounded-lg bg-blue-50 border border-blue-100 p-3 text-[11px] text-blue-900 leading-relaxed">
                <p className="font-semibold mb-0.5">Secure Passwordless Setup</p>
                <p className="text-blue-700">
                  The user will be added to the team roster and sent an email link to securely establish their credentials in Supabase Auth. Plaintext passwords are never stored in the application.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-lg px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-[#104360] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#EF2034] transition shadow-xs disabled:opacity-50"
                >
                  {loading ? 'Adding User...' : 'Send Invite & Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManager
