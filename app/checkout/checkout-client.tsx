'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const DEFAULT_COURSE = {
  id: '',
  title: 'Elneb EdTech',
  description: 'Professional Video Editing Course',
  poster_url: '',
  price: 0,
}

const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID

declare global {
  interface Window {
    Razorpay: any
  }
}

type Course = {
  id: string
  title: string
  description: string | null
  poster_url: string | null
  drive_link: string | null
  price: number
}

type CheckoutClientProps = {
  courseId: string | null
}

function getRenderableImageUrl(url: string | null | undefined) {
  if (!url) return ''

  try {
    const parsedUrl = new URL(url)
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return ''
    }

    const hostname = parsedUrl.hostname.toLowerCase()
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname.endsWith('.local')
    ) {
      return ''
    }

    return url
  } catch {
    return ''
  }
}

export default function CheckoutClient({ courseId }: CheckoutClientProps) {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })
  const [course, setCourse] = useState<Course | null>(null)
  const [courseLoading, setCourseLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadCourse() {
      if (!courseId) {
        setCourse(null)
        return
      }

      setCourseLoading(true)
      try {
        const res = await fetch(`/api/admin/courses/${courseId}`)
        if (!res.ok) {
          setCourse(null)
          return
        }
        const json = await res.json()
        setCourse(json)
      } finally {
        setCourseLoading(false)
      }
    }

    loadCourse()
  }, [courseId])

  const amount = course?.price ?? DEFAULT_COURSE.price
  const title = course?.title ?? DEFAULT_COURSE.title
  const description = course?.description ?? DEFAULT_COURSE.description
  const posterUrl = getRenderableImageUrl(course?.poster_url) || DEFAULT_COURSE.poster_url

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!formData.name.trim()) {
        setError('Please enter your name')
        setLoading(false)
        return
      }

      if (!formData.email.trim()) {
        setError('Please enter your email')
        setLoading(false)
        return
      }

      if (!formData.email.includes('@')) {
        setError('Please enter a valid email address')
        setLoading(false)
        return
      }

      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          amount,
          currency: 'INR',
          courseId: course?.id || null,
        }),
      })

      if (!orderRes.ok) {
        throw new Error('Failed to create order')
      }

      const orderData = await orderRes.json()

      const isLoaded = await loadRazorpayScript()
      if (!isLoaded) {
        throw new Error('Failed to load payment gateway')
      }

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.orderID,
        name: title,
        prefill: {
          name: formData.name,
          email: formData.email,
        },
        theme: {
          color: '#f97316',
        },
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                email: formData.email,
              }),
            })

            if (!verifyRes.ok) {
              throw new Error('Payment verification failed')
            }

            const verifyJson = await verifyRes.json()
            const driveLink = verifyJson?.courseLink

            router.push(
              `/success?email=${encodeURIComponent(formData.email)}${
                driveLink ? `&driveLink=${encodeURIComponent(driveLink)}` : ''
              }`
            )
          } catch (err) {
            setError('Payment verification failed. Please contact support.')
            setLoading(false)
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.14),transparent_30%),linear-gradient(180deg,#fff7ed_0%,#ffffff_45%,#f8fafc_100%)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-20 h-56 w-56 rounded-full bg-orange-400/15 blur-3xl animate-pulse" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      <header className="relative z-10 px-4 pt-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Back" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/90 text-slate-700 shadow-lg shadow-slate-900/5 backdrop-blur transition hover:-translate-y-0.5 hover:text-slate-950">
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid w-full gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <section className="order-2 overflow-hidden rounded-[2rem] border border-white/90 bg-white/90 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-6 lg:order-1 lg:p-8">
            <div className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-slate-50 shadow-inner">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                {posterUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={posterUrl} alt={title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-orange-500 to-amber-500">
                    <span className="text-6xl">🎬</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-slate-100 bg-white px-4 py-4 sm:px-5">
                <h1 className="min-w-0 truncate text-lg font-black text-slate-950 sm:text-2xl">{title}</h1>
                <div className="shrink-0 rounded-full bg-slate-950 px-4 py-2 text-base font-black text-white sm:text-lg">
                  ₹{amount}
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-4 rounded-[1.5rem] border border-slate-100 bg-white p-4 shadow-sm sm:p-5 lg:mt-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-600">Course details</p>
                  <h2 className="mt-1 text-xl font-black text-slate-950 sm:text-2xl">Everything included in this course</h2>
                </div>
                <div className="rounded-full bg-orange-50 px-3 py-1.5 text-sm font-black text-orange-600">
                  ₹{amount}
                </div>
              </div>

              <p className="whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">{description}</p>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Access', value: 'Instant' },
                  { label: 'Support', value: 'Guided' },
                  { label: 'Delivery', value: 'Email link' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-slate-50 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                    <p className="mt-1 text-sm font-black text-slate-950">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="order-1 rounded-[2rem] border border-slate-200/80 bg-white/90 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-6 lg:order-2 lg:p-8">
            <form onSubmit={handlePayment} className="space-y-4 sm:space-y-5">
              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="name" className="sr-only">Name</label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={loading}
                  className="h-14 rounded-2xl border-slate-200 bg-slate-50 px-4 text-base shadow-sm transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-orange-500/30"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="sr-only">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={loading}
                  className="h-14 rounded-2xl border-slate-200 bg-slate-50 px-4 text-base shadow-sm transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-orange-500/30"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="h-14 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-base font-black text-white shadow-[0_16px_40px_rgba(249,115,22,0.28)] transition hover:-translate-y-0.5 hover:from-orange-600 hover:to-amber-600 disabled:translate-y-0 disabled:opacity-70"
              >
                {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {loading ? 'Processing' : `Pay ₹${amount}`}
              </Button>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-2xl bg-slate-200 shadow-sm">
                    {posterUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={posterUrl} alt={title} className="h-full w-full object-cover" />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-950">{title}</p>
                    <p className="mt-1 text-lg font-black text-slate-950">₹{amount}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                Secure payment
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  )
}