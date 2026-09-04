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
      // Standard local credential check (or demo mode)
      if (
        (email === 'admin@bovenfrontier.co.in' && password === 'admin123') ||
        (email.trim().length > 3 && password.trim().length >= 4)
      ) {
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
        setError('Invalid credentials. Password must be at least 4 characters.')
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
    <div className="flex min-h-screen items-center justify-center bg-[#172b3f] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-2xl sm:p-10">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-[#172b3f] text-[#c9a84c]">
              <ShieldCheck size={22} />
            </div>
            <div className="text-left">
              <span className="block text-sm font-semibold tracking-[0.1em] text-[#172b3f]">
                BOVEN FRONTIER
              </span>
              <span className="block text-[8px] tracking-[0.25em] text-[#c9a84c]">
                ADMIN PORTAL
              </span>
            </div>
          </Link>

          <h2 className="mt-6 text-2xl font-medium tracking-tight text-[#172b3f]">
            Sign in to Dashboard
          </h2>
          <p className="mt-2 text-xs text-[#172b3f]/60">
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
                className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#172b3f]/70"
              >
                Email Address
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#172b3f]/40">
                  <Mail size={16} />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bovenfrontier.co.in"
                  className="w-full border border-gray-200 py-3 pl-10 pr-3 text-sm text-[#172b3f] placeholder-gray-400 outline-none transition focus:border-[#172b3f] focus:ring-1 focus:ring-[#172b3f]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#172b3f]/70"
              >
                Password
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#172b3f]/40">
                  <Lock size={16} />
                </div>
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 py-3 pl-10 pr-3 text-sm text-[#172b3f] placeholder-gray-400 outline-none transition focus:border-[#172b3f] focus:ring-1 focus:ring-[#172b3f]"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-[10px] uppercase tracking-wider text-[#c9a84c] underline hover:text-[#b08d2e]"
            >
              Fill Demo Credentials
            </button>
            <span className="text-[10px] text-gray-400">admin123</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative flex w-full justify-center bg-[#172b3f] py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#c9a84c] hover:text-[#172b3f] disabled:opacity-50"
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
            className="text-[11px] text-[#172b3f]/60 hover:text-[#172b3f]"
          >
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
