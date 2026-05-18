'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error || 'Login failed')
        setLoading(false)
        return
      }
      localStorage.setItem('admin_token', json.token)
      router.push('/admin/dashboard')
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 overflow-hidden">
      {/* Decorative colorful blobs */}
      <div className="pointer-events-none absolute -z-10 w-96 h-96 rounded-full bg-gradient-to-tr from-purple-300 to-pink-300 opacity-40 blur-3xl animate-[pulse_6s_ease-in-out_infinite] transform -translate-x-20 -translate-y-24"></div>
      <div className="pointer-events-none absolute -z-10 w-72 h-72 rounded-full bg-gradient-to-br from-amber-300 to-rose-300 opacity-30 blur-2xl animate-[pulse_7s_ease-in-out_infinite] transform translate-x-64 -translate-y-32"></div>

      <div className="relative w-full max-w-4xl mx-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Welcome / Branding */}
          <div className="hidden md:flex flex-col justify-center p-8 rounded-2xl bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-md border border-white/30 shadow-lg">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-amber-500">Welcome Admin</h1>
            <p className="mt-4 text-slate-700">Manage courses, view sales, and help learners — all from your dashboard.</p>
            <div className="mt-6 flex gap-3">
              <div className="p-4 bg-white/60 rounded-lg shadow-md">🎓</div>
              <div className="p-4 bg-white/60 rounded-lg shadow-md">📊</div>
              <div className="p-4 bg-white/60 rounded-lg shadow-md">⚙️</div>
            </div>
          </div>

          {/* Right: Login form */}
          <div className="p-6 md:p-8 bg-white/80 rounded-2xl shadow-2xl border border-white/40 transform transition-all hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Admin Login</h2>
              <div className="text-sm text-slate-500">Secure access</div>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded animate-[fadeIn_300ms_ease-in-out]">{error}</div>
            )}

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-slate-500 hover:text-slate-700"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Remember me</span>
                </label>
                <a className="text-sm text-pink-600 hover:underline" href="#">Forgot?</a>
              </div>

              <div>
                <button
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold shadow hover:brightness-105 transition disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login to Dashboard'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
