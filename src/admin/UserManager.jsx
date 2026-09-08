import { useState } from 'react'
import {
  Users,
  UserPlus,
  ShieldCheck,
  Trash2,
  KeyRound,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  Mail,
  User,
} from 'lucide-react'
import { useStore } from '../context/useStore'

function UserManager() {
  const { adminUsers, addAdminUser, updateAdminUser, deleteAdminUser } = useStore()

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  // Add User Form State
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Administrator')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  // Notifications
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleOpenAdd = () => {
    setName('')
    setEmail('')
    setRole('Administrator')
    setPassword('')
    setError('')
    setIsAddModalOpen(true)
  }

  const handleCreateUser = (e) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please provide a name, email address, and initial password.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    const res = addAdminUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role,
      password: password.trim(),
    })

    if (!res.success) {
      setError(res.error || 'Failed to add user')
      return
    }

    setIsAddModalOpen(false)
    setSuccess(`Team member ${name.trim()} added successfully!`)
    setTimeout(() => setSuccess(''), 3500)
  }

  const handleOpenPasswordModal = (user) => {
    setSelectedUser(user)
    setNewPassword('')
    setError('')
    setIsPasswordModalOpen(true)
  }

  const handleUpdatePassword = (e) => {
    e.preventDefault()
    setError('')

    if (!newPassword.trim() || newPassword.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    if (selectedUser) {
      updateAdminUser(selectedUser.id, { password: newPassword.trim() })
      setIsPasswordModalOpen(false)
      setSuccess(`Password for ${selectedUser.name} updated successfully!`)
      setTimeout(() => setSuccess(''), 3500)
    }
  }

  const handleDeleteUser = (user) => {
    if (user.isPrimary || user.email.toLowerCase() === 'aswin@bovenfrontier.co.in') {
      alert('The primary Super Administrator account (Aswin) cannot be deleted.')
      return
    }

    if (window.confirm(`Are you sure you want to remove team access for ${user.name} (${user.email})?`)) {
      const res = deleteAdminUser(user.id)
      if (res.success) {
        setSuccess(`User ${user.name} removed.`)
        setTimeout(() => setSuccess(''), 3000)
      } else {
        alert(res.error || 'Could not delete user')
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
            <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">System Security</p>
            <p className="text-xs font-semibold text-emerald-700">Protected & Encrypted Session</p>
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
                        {!isPrimary && (
                          <button
                            onClick={() => handleOpenPasswordModal(user)}
                            title="Change Password"
                            className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-[#104360] transition"
                          >
                            <KeyRound size={14} />
                          </button>
                        )}

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

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                  Initial Password * (min. 6 characters)
                </label>
                <div className="relative">
                  <KeyRound size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2.5 text-xs text-[#104360] placeholder-gray-400 outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
                  />
                </div>
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
                  className="rounded-lg bg-[#104360] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#EF2034] transition shadow-xs"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-[#F8FAFC]">
              <div className="flex items-center gap-2 text-[#104360]">
                <KeyRound size={18} className="text-[#EF2034]" />
                <h3 className="font-semibold text-sm">
                  Change Password: {selectedUser.name}
                </h3>
              </div>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-200"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleUpdatePassword} className="p-6 space-y-4">
              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                  New Password (min. 6 characters)
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-[#104360] outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="rounded-lg px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#104360] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#EF2034] transition"
                >
                  Update
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
