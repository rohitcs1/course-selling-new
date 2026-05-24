'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { normalizePublicUrl } from '@/lib/public-url'

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
  return normalizePublicUrl(url)
}

export default function CheckoutClient({ courseId }: CheckoutClientProps) {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
          phone: formData.phone,
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
          contact: formData.phone,
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
                phone: formData.phone,
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
    <div className="flex min-h-screen items-start justify-center bg-[#eceeef] px-4 pb-10 pt-12 sm:pt-16">
      <div className="w-full max-w-[356px]">
        <div className="min-h-[700px] overflow-hidden rounded-[2px] border border-[#cfd4db] bg-[#f7f8fa] shadow-sm">
          <div className="flex items-center gap-3 bg-[#022a59] px-3 py-4 text-white">
            <div className="h-8 w-8 overflow-hidden rounded-[2px] bg-[#f3c623]">
              {posterUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={posterUrl} alt={title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs font-bold text-slate-900">
                  {title.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>
            <div className="leading-tight">
              <p className="text-[11px] text-white/85">Paying to</p>
              <p className="line-clamp-1 text-[20px] font-medium">Rohit Kumar</p>
            </div>
          </div>

          <form onSubmit={handlePayment} className="flex min-h-[620px] flex-col px-3 pb-4 pt-3 text-[#6f7785]">
            <div className="border-b border-[#d7dbe1] pb-2">
              <p className="text-[12px]">Purpose of Payment</p>
              <p className="mt-1 line-clamp-1 text-[20px] font-medium uppercase text-[#4c5564]">{title}</p>
            </div>

            <div className="border-b border-[#d7dbe1] py-2">
              <p className="text-[12px]">Amount</p>
              <p className="mt-1 text-[22px] font-semibold text-[#4c5564]">₹{amount}</p>
            </div>

            <div className="flex items-center border-b border-[#d7dbe1] py-2 text-[13px]">
              <span className="font-medium text-[#4c5564]">Your Details</span>
              <span className="mx-2 text-[#c0c4ca]">&gt;</span>
              <span className="text-[#8f96a3]">Payment</span>
            </div>

            {error && (
              <div className="mt-3 rounded border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700">
                {error}
              </div>
            )}

            <div className="mt-3 space-y-3 text-[13px]">
              <div>
                <label htmlFor="name" className="mb-1 block text-[#7b8290]">Name</label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={loading}
                  className="h-9 w-full rounded-[2px] border border-[#c8ced6] bg-white px-2 text-[13px] text-[#404957] outline-none focus:border-[#9aa3af]"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-[#7b8290]">Email</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={loading}
                  className="h-9 w-full rounded-[2px] border border-[#c8ced6] bg-white px-2 text-[13px] text-[#404957] outline-none focus:border-[#9aa3af]"
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-1 block text-[#7b8290]">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={loading}
                  className="h-9 w-full rounded-[2px] border border-[#c8ced6] bg-white px-2 text-[13px] text-[#404957] outline-none focus:border-[#9aa3af]"
                />
              </div>
            </div>

            <p className="mt-auto border-t border-[#e1e4e8] pt-3 text-center text-[24px] font-medium text-[#485161]">
              You Pay ₹{amount}
            </p>

            <div className="mt-2 text-center text-[11px] text-[#8d95a3] underline underline-offset-2">
              <Link href="/terms" className="hover:text-[#5e6572]">
                Terms of service
              </Link>
              <span className="mx-1">and</span>
              <Link href="/refund-policy" className="hover:text-[#5e6572]">
                Refund policy
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-3 flex h-10 w-full items-center justify-center rounded-[3px] bg-[#34c06a] text-[22px] font-medium text-white transition hover:bg-[#2fb562] disabled:opacity-80"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Next'}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-[13px] text-[#9ea5b2]">
          Powered by <span className="font-semibold text-[#8f96a3]">Elneb EdTech</span>
        </p>
      </div>
    </div>
  )
}