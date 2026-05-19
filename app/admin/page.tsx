'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail, Zap } from 'lucide-react'

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated background blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-orange-600 to-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative w-full max-w-5xl mx-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Branding & Features */}
          <div className="hidden lg:flex flex-col justify-center p-8 rounded-2xl">
            <div className="mb-8 animate-fade-up">
              <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">Admin Console</h1>
              <p className="text-lg text-slate-300">Powerful dashboard for course management</p>
            </div>

            <div className="space-y-4 animate-fade-up" style={{ animationDelay: '100ms' }}>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 hover:border-cyan-500 transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                  <Zap size={24} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-lg">Fast & Secure</p>
                  <p className="text-sm text-slate-300 mt-1">Enterprise-grade authentication</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 hover:border-purple-500 transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-lg">Manage Courses</p>
                  <p className="text-sm text-slate-300 mt-1">Add, edit, and manage all courses</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 hover:border-orange-500 transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                  <Zap size={24} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-lg">Track Analytics</p>
                  <p className="text-sm text-slate-300 mt-1">Real-time sales and performance data</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Login Form */}
          <div className="p-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl border border-slate-700 backdrop-blur-md animate-fade-up" style={{ animationDelay: '150ms' }}>
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-slate-400">Sign in to your admin account</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3 animate-pulse">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <p className="text-red-300 text-sm font-semibold">{error}</p>
              </div>
            )}

            <form onSubmit={submit} className="space-y-5">
              {/* Email */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-300 mb-3">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                  <input
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-300 mb-3">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                  <input
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-12 pr-12 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-purple-500/50 disabled:shadow-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Authenticating...
                  </span>
                ) : (
                  'Sign In to Dashboard'
                )}
              </button>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gradient-to-br from-slate-800 to-slate-900 text-slate-400">Need access?</span>
                </div>
              </div>

              <p className="text-center text-slate-400 text-sm">Contact your administrator for access credentials</p>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-up {
          animation: fade-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
