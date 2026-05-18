 'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem('admin_token')
              router.push('/admin')
            }}
            className="rounded-lg bg-slate-900 px-4 py-2 text-white"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold">{editingId ? 'Edit Course' : 'Add Course'}</h2>
            <form onSubmit={saveCourse} className="grid gap-4 md:grid-cols-2">
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="rounded-lg border p-3 md:col-span-2" />
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="rounded-lg border p-3 md:col-span-2" rows={4} />
              <input value={form.drive_link} onChange={(e) => setForm({ ...form, drive_link: e.target.value })} placeholder="Google Drive link" className="rounded-lg border p-3 md:col-span-2" />
              <input value={form.poster_url} onChange={(e) => setForm({ ...form, poster_url: e.target.value })} placeholder="Poster URL" className="rounded-lg border p-3 md:col-span-2" />
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} placeholder="Price (₹)" className="rounded-lg border p-3" min="1" required />
              <label className="flex items-center gap-2 rounded-lg border p-3">
                <input type="checkbox" checked={form.hidden} onChange={(e) => setForm({ ...form, hidden: e.target.checked })} />
                Hide course
              </label>
              <div className="flex gap-2 md:col-span-2">
                <button className="rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white">
                  {editingId ? 'Update Course' : 'Save Course'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null)
                      setForm({ title: '', description: '', drive_link: '', poster_url: '', price: 0, hidden: false })
                    }}
                    className="rounded-lg border px-4 py-3 font-semibold text-slate-700"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Day-wise Sales</h2>
            <div className="space-y-3">
              {sales.length ? sales.map((row) => (
                <div
                  key={row.day}
                  className="flex items-center justify-between rounded-2xl border p-4 card-accent shadow-sm hover:shadow-md transition-transform duration-200 transform hover:-translate-y-1 animate-fade-up"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{row.day}</p>
                    <p className="text-sm text-slate-500">{row.orders_count} orders</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-orange-600 text-lg">₹{row.total_amount}</p>
                    <button
                      onClick={() => fetchOrdersForDay(row.day)}
                      className="rounded-full bg-white/90 border px-3 py-2 text-sm font-medium shadow-sm hover:shadow-md transition"
                    >
                      View Orders
                    </button>
                  </div>
                </div>
              )) : <p className="text-sm text-slate-500">No sales data yet</p>}
            </div>
          </section>
          {selectedDay && (
            <section className="rounded-2xl bg-white p-6 shadow-sm mt-4">
              <h2 className="mb-4 text-xl font-semibold">Orders for {selectedDay}</h2>
              <div className="space-y-3">
                {ordersLoading ? (
                  <p>Loading...</p>
                ) : ordersForDay.length ? (
                  ordersForDay.map((o) => (
                    <div key={o.id} className="rounded-xl border p-3 bg-white shadow-sm hover:shadow-md transition-transform duration-150 transform hover:scale-[1.02]">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium text-slate-900">{o.email}</p>
                          <p className="text-sm text-slate-500 mt-1">{new Date(o.created_at).toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-900">₹{o.amount}</p>
                          <p className="text-xs mt-1 text-green-600">{o.status}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No orders for this day</p>
                )}
              </div>
            </section>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Search User by Email</h2>
            <div className="flex gap-2">
              <input value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} placeholder="user@example.com" className="w-full rounded-lg border p-3" />
              <button onClick={searchByEmail} className="rounded-lg bg-slate-900 px-4 py-3 text-white">Search</button>
            </div>
            <div className="mt-4 space-y-3">
              {searchResults.length ? searchResults.map((order) => (
                <div key={order.id} className="rounded-lg border p-3 text-sm">
                  <p className="font-medium">{order.email}</p>
                  <p className="text-slate-500">{order.status} | ₹{order.amount} | {new Date(order.created_at).toLocaleString()}</p>
                </div>
              )) : <p className="text-sm text-slate-500">No results</p>}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">All Courses</h2>
            {loading ? <p>Loading...</p> : (
              <ul className="space-y-3">
                {courses.map((c) => (
                  <li key={c.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-semibold text-slate-900">{c.title} {c.hidden && <span className="text-xs text-slate-500">(hidden)</span>}</p>
                      <p className="text-sm text-slate-500">₹{c.price}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => beginEdit(c)} className="rounded-lg bg-slate-200 px-3 py-2 text-sm font-medium">Edit</button>
                      <button onClick={() => toggleHidden(c.id, !!c.hidden)} className="rounded-lg bg-amber-400 px-3 py-2 text-sm font-medium">{c.hidden ? 'Unhide' : 'Hide'}</button>
                      <button onClick={() => removeCourse(c.id)} className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white">Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
