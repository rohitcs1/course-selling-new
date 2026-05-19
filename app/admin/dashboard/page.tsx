 'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Trash2, Edit2, LogOut, Plus, Search, TrendingUp, Users, BookOpen, IndianRupee } from 'lucide-react'

type Course = {
  id: string
  title: string
  description?: string | null
  price: number
  drive_link?: string
  poster_url?: string
  hidden?: boolean
}

type SalesRow = {
  day: string
  total_amount: number
  orders_count: number
}

type SearchOrder = {
  id: string
  email: string
  amount: number
  status: string
  created_at: string
  razorpay_order_id?: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [sales, setSales] = useState<SalesRow[]>([])
  const [searchEmail, setSearchEmail] = useState('')
  const [searchResults, setSearchResults] = useState<SearchOrder[]>([])
  const [ordersForDay, setOrdersForDay] = useState<SearchOrder[]>([])
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    title: '',
    description: '',
    drive_link: '',
    poster_url: '',
    price: 0,
    hidden: false,
  })

  // Calculate stats
  const totalSales = sales.reduce((sum, row) => sum + row.total_amount, 0)
  const totalOrders = sales.reduce((sum, row) => sum + row.orders_count, 0)

  useEffect(() => {
    const t = localStorage.getItem('admin_token')
    if (!t) return router.push('/admin')
    setToken(t)
    fetchCourses(t)
    fetchSales(t)
  }, [])

  async function fetchCourses(t: string) {
    setLoading(true)
    const res = await fetch('/api/admin/courses', { headers: { Authorization: `Bearer ${t}` } })
    const json = await res.json()
    setCourses(Array.isArray(json) ? json : [])
    setLoading(false)
  }

  async function fetchSales(t: string) {
    const res = await fetch('/api/admin/reports/day-sales', { headers: { Authorization: `Bearer ${t}` } })
    const json = await res.json()
    setSales(Array.isArray(json) ? json : [])
  }

  async function fetchOrdersForDay(day: string) {
    if (!token) {
      alert('Not authenticated')
      return
    }
    setOrdersLoading(true)
    try {
      const res = await fetch(`/api/admin/reports/day-sales/${encodeURIComponent(day)}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (res.ok) setOrdersForDay(Array.isArray(json) ? json : [])
      else {
        setOrdersForDay([])
        alert(`Failed to fetch orders: ${json?.error || res.statusText}`)
      }
      setSelectedDay(day)
    } catch (err) {
      setOrdersForDay([])
      alert(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setOrdersLoading(false)
    }
  }

  async function searchByEmail() {
    if (!token || !searchEmail.trim()) return
    const res = await fetch(`/api/admin/users/search?email=${encodeURIComponent(searchEmail)}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const json = await res.json()
    setSearchResults(Array.isArray(json?.orders) ? json.orders : [])
  }

  function beginEdit(course: Course) {
    setEditingId(course.id)
    setForm({
      title: course.title,
      description: course.description || '',
      drive_link: course.drive_link || '',
      poster_url: course.poster_url || '',
      price: course.price,
      hidden: !!course.hidden,
    })
  }

  async function saveCourse(e: React.FormEvent) {
    e.preventDefault()
    if (!token) return

    if (!form.title.trim()) {
      alert('Please enter course title')
      return
    }

    if (form.price <= 0) {
      alert('Please enter a valid price (greater than 0)')
      return
    }

    const url = editingId ? `/api/admin/courses/${editingId}` : '/api/admin/courses'
    const method = editingId ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setEditingId(null)
      setForm({
        title: '',
        description: '',
        drive_link: '',
        poster_url: '',
        price: 0,
        hidden: false,
      })
      fetchCourses(token)
    } else alert('Failed to add')
  }

  async function removeCourse(id: string) {
    if (!token) {
      alert('Not authenticated')
      return
    }
    if (!window.confirm('Are you sure you want to delete this course?')) return
    
    try {
      const res = await fetch(`/api/admin/courses/${id}`, { 
        method: 'DELETE', 
        headers: { Authorization: `Bearer ${token}` } 
      })
      const data = await res.json()
      if (res.ok) {
        alert('Course deleted successfully')
        fetchCourses(token)
      } else {
        alert(`Delete failed: ${data.error || res.statusText}`)
      }
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  async function toggleHidden(id: string, hidden: boolean) {
    if (!token) {
      alert('Not authenticated')
      return
    }
    
    try {
      const res = await fetch(`/api/admin/courses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ hidden: !hidden }),
      })
      const data = await res.json()
      if (res.ok) {
        alert(`Course ${!hidden ? 'hidden' : 'unhidden'} successfully`)
        fetchCourses(token)
      } else {
        alert(`Update failed: ${data.error || res.statusText}`)
      }
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      {/* Animated background blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-orange-600 to-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-1 md:mb-2 animate-pulse">Admin Dashboard</h1>
            <p className="text-xs md:text-sm text-slate-300">Manage courses, view analytics & sales</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('admin_token')
              router.push('/admin')
            }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 px-4 md:px-6 py-2 md:py-3 rounded-lg text-white font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-4 md:p-6 text-white shadow-2xl hover:shadow-cyan-500/20 transform hover:scale-105 transition-all duration-300 animate-fade-up">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-cyan-100 text-xs md:text-sm font-semibold mb-1 md:mb-2">Total Courses</p>
                <p className="text-2xl md:text-4xl font-bold">{courses.length}</p>
              </div>
              <BookOpen className="w-8 md:w-12 h-8 md:h-12 opacity-30 shrink-0" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-4 md:p-6 text-white shadow-2xl hover:shadow-purple-500/20 transform hover:scale-105 transition-all duration-300 animate-fade-up" style={{ animationDelay: '50ms' }}>
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-purple-100 text-xs md:text-sm font-semibold mb-1 md:mb-2">Total Orders</p>
                <p className="text-2xl md:text-4xl font-bold">{totalOrders}</p>
              </div>
              <Users className="w-8 md:w-12 h-8 md:h-12 opacity-30 shrink-0" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-4 md:p-6 text-white shadow-2xl hover:shadow-orange-500/20 transform hover:scale-105 transition-all duration-300 animate-fade-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-orange-100 text-xs md:text-sm font-semibold mb-1 md:mb-2">Total Revenue</p>
                <p className="text-2xl md:text-4xl font-bold">₹{totalSales.toLocaleString()}</p>
              </div>
              <IndianRupee className="w-8 md:w-12 h-8 md:h-12 opacity-30 shrink-0" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 md:p-6 text-white shadow-2xl hover:shadow-green-500/20 transform hover:scale-105 transition-all duration-300 animate-fade-up" style={{ animationDelay: '150ms' }}>
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-green-100 text-xs md:text-sm font-semibold mb-1 md:mb-2">Avg Order Value</p>
                <p className="text-2xl md:text-4xl font-bold">₹{totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0}</p>
              </div>
              <TrendingUp className="w-8 md:w-12 h-8 md:h-12 opacity-30 shrink-0" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:gap-6 lg:grid-cols-3 mb-8">
          {/* Add/Edit Course Form */}
          <section className="lg:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 md:p-6 lg:p-8 shadow-2xl border border-slate-700 hover:border-purple-500 transition-colors duration-300">
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <Plus size={20} className="text-purple-400 shrink-0" />
              <h2 className="text-lg md:text-2xl font-bold text-white">{editingId ? 'Edit Course' : 'Add New Course'}</h2>
            </div>
            <form onSubmit={saveCourse} className="space-y-3 md:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="md:col-span-2">
                  <label className="block text-slate-300 text-xs md:text-sm font-semibold mb-2">Course Title</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Enter course title"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 md:px-4 py-2 md:py-3 text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-300 text-xs md:text-sm font-semibold mb-2">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Enter course description"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 md:px-4 py-2 md:py-3 text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    rows={3}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-300 text-xs md:text-sm font-semibold mb-2">Google Drive Link</label>
                  <input
                    value={form.drive_link}
                    onChange={(e) => setForm({ ...form, drive_link: e.target.value })}
                    placeholder="https://drive.google.com/..."
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 md:px-4 py-2 md:py-3 text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-300 text-xs md:text-sm font-semibold mb-2">Poster URL</label>
                  <input
                    value={form.poster_url}
                    onChange={(e) => setForm({ ...form, poster_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 md:px-4 py-2 md:py-3 text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-xs md:text-sm font-semibold mb-2">Price (₹)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    placeholder="999"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 md:px-4 py-2 md:py-3 text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    min="1"
                    required
                  />
                </div>

                <div className="flex items-center gap-2 md:gap-3 bg-slate-700 rounded-lg px-3 md:px-4 py-2 md:py-3">
                  <input
                    type="checkbox"
                    checked={form.hidden}
                    onChange={(e) => setForm({ ...form, hidden: e.target.checked })}
                    id="hidden"
                    className="w-4 h-4 rounded cursor-pointer shrink-0"
                  />
                  <label htmlFor="hidden" className="text-slate-300 text-sm md:text-base font-semibold cursor-pointer">Hide course</label>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-2 md:gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 md:px-6 py-2 md:py-3 rounded-lg text-white text-sm md:text-base font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {editingId ? 'Update' : 'Save'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null)
                      setForm({ title: '', description: '', drive_link: '', poster_url: '', price: 0, hidden: false })
                    }}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 px-4 md:px-6 py-2 md:py-3 rounded-lg text-slate-200 text-sm md:text-base font-bold transition-all duration-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* Day-wise Sales */}
          <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 md:p-6 lg:p-8 shadow-2xl border border-slate-700 hover:border-cyan-500 transition-colors duration-300">
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <TrendingUp size={20} className="text-cyan-400 shrink-0" />
              <h2 className="text-lg md:text-2xl font-bold text-white">Day-wise Sales</h2>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-slate-700/50">
              {sales.length ? sales.map((row, index) => (
                <div
                  key={row.day}
                  className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 hover:border-cyan-500 rounded-xl p-3 md:p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-bold text-white text-sm md:text-lg truncate">{row.day}</p>
                      <p className="text-xs md:text-sm text-cyan-300 mt-0.5">📦 {row.orders_count} orders</p>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 shrink-0">
                      <div className="text-right">
                        <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 text-sm md:text-xl">₹{row.total_amount.toLocaleString()}</p>
                      </div>
                      <button
                        onClick={() => fetchOrdersForDay(row.day)}
                        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 px-2 md:px-3 py-1 md:py-2 rounded-lg text-white text-xs md:text-sm font-semibold transition-all duration-300 whitespace-nowrap"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              )) : <p className="text-slate-400 text-center py-8">No sales data yet</p>}
            </div>
          </section>
        </div>

        {/* Orders for Selected Day */}
        {selectedDay && (
          <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 md:p-6 lg:p-8 shadow-2xl border border-slate-700 hover:border-orange-500 transition-colors duration-300 animate-fade-up">
            <div className="flex items-center justify-between gap-2 md:gap-3 mb-4 md:mb-6">
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <Users size={20} className="text-orange-400 shrink-0" />
                <h2 className="text-lg md:text-2xl font-bold text-white truncate">Orders for <span className="text-orange-400">{selectedDay}</span></h2>
              </div>
              <button
                onClick={() => setSelectedDay(null)}
                className="text-slate-400 hover:text-white transition-colors duration-200 text-lg md:text-xl shrink-0"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-orange-500/50 scrollbar-track-slate-700/50">
              {ordersLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
                </div>
              ) : ordersForDay.length ? (
                ordersForDay.map((o, index) => (
                  <div
                    key={o.id}
                    className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 hover:border-orange-500 rounded-xl p-3 md:p-4 min-h-[80px] md:min-h-[90px] flex flex-col justify-between transition-all duration-300 transform hover:scale-102 hover:shadow-lg hover:shadow-orange-500/20 animate-fade-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white text-xs md:text-sm truncate">{o.email}</p>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">📅 {new Date(o.created_at).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-right">
                          <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 text-sm md:text-base">₹{o.amount}</p>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${o.status === 'completed' ? 'bg-green-500/30 text-green-300' : o.status === 'pending' ? 'bg-yellow-500/30 text-yellow-300' : 'bg-red-500/30 text-red-300'}`}>
                          {o.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-center py-8">No orders for this day</p>
              )}
            </div>
          </section>
        )}

        {/* Search User & All Courses Grid */}
        <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
          {/* Search User */}
          <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 md:p-6 lg:p-8 shadow-2xl border border-slate-700 hover:border-pink-500 transition-colors duration-300">
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <Search size={20} className="text-pink-400 shrink-0" />
              <h2 className="text-lg md:text-2xl font-bold text-white">Search User</h2>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-3 mb-4 md:mb-6">
              <input
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                placeholder="user@example.com"
                className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 md:py-3 text-white text-sm md:text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
              />
              <button
                onClick={searchByEmail}
                className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 px-4 md:px-6 py-2 md:py-3 rounded-lg text-white font-bold text-sm md:text-base transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
              >
                Search
              </button>
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-pink-500/50 scrollbar-track-slate-700/50">
              {searchResults.length ? searchResults.map((order, index) => (
                <div
                  key={order.id}
                  className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/30 rounded-lg p-3 md:p-4 hover:border-pink-500 transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <p className="font-bold text-white text-xs md:text-sm truncate">{order.email}</p>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs ${order.status === 'completed' ? 'bg-green-500/30 text-green-300' : 'bg-yellow-500/30 text-yellow-300'} mr-1`}>{order.status}</span>
                    ₹{order.amount} • {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
              )) : <p className="text-slate-400 text-center py-8">No results</p>}
            </div>
          </section>

          {/* All Courses */}
          <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 md:p-6 lg:p-8 shadow-2xl border border-slate-700 hover:border-green-500 transition-colors duration-300">
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <BookOpen size={20} className="text-green-400 shrink-0" />
              <h2 className="text-lg md:text-2xl font-bold text-white">All Courses</h2>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
              </div>
            ) : (
              <ul className="space-y-2 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-500/50 scrollbar-track-slate-700/50">
                {courses.map((c, index) => (
                  <li
                    key={c.id}
                    className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 hover:border-green-500 rounded-xl p-3 md:p-4 transition-all duration-300 transform hover:scale-102 hover:shadow-lg hover:shadow-green-500/20 animate-fade-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white text-xs md:text-sm truncate">
                            {c.title}
                            {c.hidden && <span className="ml-1 inline-block bg-red-500/30 text-red-300 text-xs px-1.5 py-0.5 rounded">H</span>}
                          </p>
                          <p className="text-xs md:text-sm text-green-300 font-semibold mt-0.5">₹{c.price}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          onClick={() => beginEdit(c)}
                          className="flex items-center gap-0.5 bg-blue-600 hover:bg-blue-700 px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-white text-xs font-semibold transition-all duration-300"
                        >
                          <Edit2 size={12} /> Edit
                        </button>
                        <button
                          onClick={() => toggleHidden(c.id, !!c.hidden)}
                          className="flex items-center gap-0.5 bg-yellow-600 hover:bg-yellow-700 px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-white text-xs font-semibold transition-all duration-300"
                        >
                          {c.hidden ? <Eye size={12} /> : <EyeOff size={12} />}
                          {c.hidden ? 'Show' : 'Hide'}
                        </button>
                        <button
                          onClick={() => removeCourse(c.id)}
                          className="flex items-center gap-0.5 bg-red-600 hover:bg-red-700 px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-white text-xs font-semibold transition-all duration-300"
                        >
                          <Trash2 size={12} /> Del
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>

      <style>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-up {
          animation: fade-up 0.5s ease-out forwards;
        }

        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  )
}
