'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react'
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

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const courseId = searchParams.get('courseId')

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
  const posterUrl = course?.poster_url ?? DEFAULT_COURSE.poster_url

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
        description,
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
            // Open the drive link in a new tab if available (admin-provided), then navigate to success page
            if (driveLink) {
              try {
                window.open(driveLink, '_blank')
              } catch (err) {
                // ignore
              }
            }

            router.push(`/success?email=${encodeURIComponent(formData.email)}`)
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Complete Your Purchase</h1>
              <p className="text-slate-600 mb-8">
                {courseLoading ? 'Loading selected course...' : 'Fill in your details to get instant access to the course'}
              </p>

              <form onSubmit={handlePayment} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={loading}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Email Address</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={loading}
                    className="w-full"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    You&apos;ll receive the course access link at this email
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {loading ? 'Processing...' : `Pay ₹${amount} Now`}
                </Button>

                <p className="text-xs text-slate-500 text-center">
                  Your payment is secure and encrypted. 30-day money-back guarantee.
                </p>
              </form>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {posterUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={posterUrl} alt={title} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-2xl">🎬</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{title}</p>
                    <p className="text-sm text-slate-600">{description}</p>
                    <ul className="text-xs text-slate-500 mt-2 space-y-1">
                      <li className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> 40 hours of content
                      </li>
                      <li className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Lifetime access
                      </li>
                      <li className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Certificate
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-600">Price</span>
                  <span className="font-semibold text-slate-900">₹{amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tax (0%)</span>
                  <span className="font-semibold text-slate-900">₹0</span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-orange-600">₹{amount}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">✓ 30-day money-back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
