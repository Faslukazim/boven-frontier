import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react'

function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const validAdminEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@bovenfrontier.co.in').trim().toLowerCase()
      const validAdminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'BovenAdmin2026!'

      const isDevLogin = import.meta.env.DEV && email.trim().toLowerCase() === 'admin@bovenfrontier.co.in' && password === 'admin123'
      const isConfiguredLogin = email.trim().toLowerCase() === validAdminEmail && password === validAdminPassword

      if (isConfiguredLogin || isDevLogin) {
        localStorage.setItem(
          'bf_admin_auth',
          JSON.stringify({
            email,
            role: 'Administrator',
            loggedInAt: new Date().toISOString(),
          })
        )
        navigate('/admin')
      } else {
        setError('Invalid credentials. Please check your admin email and password.')
      }
      setLoading(false)
    }, 400)
  }

  const fillDemoCredentials = () => {
    setEmail('admin@bovenfrontier.co.in')
    setPassword('admin123')
    setError('')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#104360] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-2xl sm:p-10">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-[#104360] text-[#EF2034]">
              <ShieldCheck size={22} />
            </div>
            <div className="text-left">
              <span className="block text-sm font-semibold tracking-[0.1em] text-[#104360]">
                BOVEN FRONTIER
              </span>
              <span className="block text-[8px] tracking-[0.25em] text-[#EF2034]">
                ADMIN PORTAL
              </span>
            </div>
          </Link>

          <h2 className="mt-6 text-2xl font-medium tracking-tight text-[#104360]">
            Sign in to Dashboard
          </h2>
          <p className="mt-2 text-xs text-[#104360]/60">
            Manage product catalog, inventory status, and announcement banners.
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#104360]/70"
              >
                Email Address
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#104360]/40">
                  <Mail size={16} />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bovenfrontier.co.in"
                  className="w-full border border-gray-200 py-3 pl-10 pr-3 text-sm text-[#104360] placeholder-gray-400 outline-none transition focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#104360]/70"
              >
                Password
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#104360]/40">
                  <Lock size={16} />
                </div>
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 py-3 pl-10 pr-3 text-sm text-[#104360] placeholder-gray-400 outline-none transition focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
                />
              </div>
            </div>
          </div>

          {import.meta.env.DEV && (
            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-[10px] uppercase tracking-wider text-[#EF2034] underline hover:text-[#104360]"
              >
                Fill Dev Credentials
              </button>
              <span className="text-[10px] text-gray-400 font-mono">admin123 (dev only)</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group relative flex w-full justify-center bg-[#104360] py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#EF2034] hover:text-[#104360] disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            {!loading && (
              <ArrowRight
                size={14}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            )}
          </button>
        </form>

        <div className="text-center">
          <Link
            to="/"
            className="text-[11px] text-[#104360]/60 hover:text-[#104360]"
          >
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
