import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Redirect to /admin if already logged in with a valid Supabase session
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return

    let mounted = true
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted && session) {
        navigate('/admin', { replace: true })
      }
    })

    return () => {
      mounted = false
    }
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    const enteredEmail = email.trim()
    const enteredPassword = password

    if (!enteredEmail || !enteredPassword) {
      setError('Please provide both email address and password.')
      return
    }

    if (!isSupabaseConfigured || !supabase) {
      setError(
        'Supabase authentication is not configured. Please define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.'
      )
      return
    }

    setLoading(true)

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: enteredEmail,
        password: enteredPassword,
      })

      if (authError) {
        setError(authError.message || 'Invalid administrative credentials.')
        setLoading(false)
        return
      }

      if (data?.session) {
        navigate('/admin', { replace: true })
      } else {
        setError('Login failed. Please verify your administrative credentials.')
        setLoading(false)
      }
    } catch (err) {
      setError(err?.message || 'An unexpected error occurred during authentication.')
      setLoading(false)
    }
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
            Secure administrative access via Supabase Authentication.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle size={16} className="shrink-0 text-red-600" />
            <span>{error}</span>
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
                  placeholder="aswin@bovenfrontier.co.in"
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

          <button
            type="submit"
            disabled={loading}
            className="group relative flex w-full justify-center bg-[#104360] py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#EF2034] hover:text-white disabled:opacity-50"
          >
            {loading ? 'Verifying Session...' : 'Sign In'}
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
