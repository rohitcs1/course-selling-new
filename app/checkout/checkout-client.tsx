'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Loader2, Mail, Phone, User } from 'lucide-react'
import { normalizePublicUrl } from '@/lib/public-url'

const DEFAULT_COURSE = {
  id: '',
  title: 'Elneb EdTech',
  description: 'Professional Video Editing Course',
  poster_url: '',
  price: 0,
}

const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
let razorpayScriptPromise: Promise<boolean> | null = null

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
  const payeeName = 'Rohit Kumar'

  const loadRazorpayScript = (): Promise<boolean> => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      return Promise.resolve(true)
    }

    if (!razorpayScriptPromise) {
      razorpayScriptPromise = new Promise<boolean>((resolve) => {
        const existingScript = document.querySelector('script[data-razorpay-checkout="true"]')

        if (existingScript) {
          const poll = window.setInterval(() => {
            if (window.Razorpay) {
              window.clearInterval(poll)
              resolve(true)
            }
          }, 50)

          window.setTimeout(() => {
            window.clearInterval(poll)
            resolve(Boolean(window.Razorpay))
          }, 5000)

          return
        }

        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.async = true
        script.dataset.razorpayCheckout = 'true'
        script.onload = () => resolve(true)
        script.onerror = () => resolve(false)
        document.body.appendChild(script)
      }).finally(() => {
        razorpayScriptPromise = null
      })
    }

    return razorpayScriptPromise ?? Promise.resolve(false)
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const name = formData.name.trim()
      const email = formData.email.trim()
      const phone = formData.phone.trim()

      if (!name) {
        setError('Please enter your name')
        setLoading(false)
        return
      }

      if (!email) {
        setError('Please enter your email')
        setLoading(false)
        return
      }

      if (!email.includes('@')) {
        setError('Please enter a valid email address')
        setLoading(false)
        return
      }

      if (!phone) {
        setError('Please enter your phone number')
        setLoading(false)
        return
      }

      if (!/^[0-9+\-\s()]{8,15}$/.test(phone)) {
        setError('Please enter a valid phone number')
        setLoading(false)
        return
      }

      if (!RAZORPAY_KEY_ID) {
        throw new Error('Payment gateway is not configured')
      }

      if (!course?.id) {
        throw new Error('Course information is missing')
      }

      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          amount,
          currency: 'INR',
          courseId: course.id,
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
          name,
          email,
          contact: phone,
        },
        retry: {
          enabled: true,
          max_count: 2,
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
                email,
                phone,
              }),
            })

            if (!verifyRes.ok) {
              throw new Error('Payment verification failed')
            }

            const verifyJson = await verifyRes.json()
            const driveLink = verifyJson?.courseLink

            router.push(
              `/success?email=${encodeURIComponent(email)}${
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
    <div className="relative flex min-h-screen items-start justify-center overflow-hidden bg-[#f4f7fb] px-4 pb-10 pt-6 sm:pt-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.94),rgba(244,247,251,0.94)_38%,rgba(237,243,255,0.96)_100%)]" />
        <div className="page-wave page-wave--field absolute inset-x-[-12%] bottom-[-2%] h-[56vh] bg-[radial-gradient(circle_at_18%_46%,rgba(176,202,255,0.32),transparent_28%),radial-gradient(circle_at_76%_62%,rgba(174,205,255,0.24),transparent_25%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0))]" />
        <svg className="page-wave page-wave--rear absolute bottom-[-7%] left-[-18%] h-[44vh] w-[150%]" viewBox="0 0 1200 420" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,220 C120,160 240,150 360,188 C480,226 600,248 720,208 C840,168 960,98 1080,118 C1140,130 1170,154 1200,166 L1200,420 L0,420 Z" fill="rgba(191,211,255,0.24)" />
        </svg>
        <svg className="page-wave page-wave--mid absolute bottom-[-5%] left-[-10%] h-[40vh] w-[160%]" viewBox="0 0 1200 360" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,200 C120,112 240,96 360,140 C480,184 600,240 720,214 C840,188 960,86 1080,98 C1140,104 1170,124 1200,136 L1200,360 L0,360 Z" fill="rgba(153,182,255,0.30)" />
        </svg>
        <svg className="page-wave page-wave--front absolute bottom-[-3%] left-[-14%] h-[34vh] w-[168%]" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,190 C120,132 240,104 360,150 C480,196 600,250 720,224 C840,198 960,96 1080,112 C1140,122 1170,144 1200,156 L1200,300 L0,300 Z" fill="rgba(133,164,246,0.36)" />
        </svg>
        <div className="bg-bubble bg-bubble--left" />
        <div className="bg-bubble bg-bubble--right" />
        <div className="bg-ripple bg-ripple--one" />
        <div className="bg-ripple bg-ripple--two" />
        <div className="page-dots page-dots--left" />
        <div className="page-dots page-dots--right" />
      </div>
      <div className="relative w-full max-w-[404px] pt-0">
        <div className="overflow-hidden rounded-[18px] border border-[#d8dee8] bg-white shadow-[0_20px_60px_rgba(66,88,128,0.18)]">
          <div className="relative h-[115px] overflow-hidden bg-[#0d3f93] text-white">
            <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_34%,rgba(255,255,255,0.03))]" />
            <div className="absolute left-0 right-0 top-[52px] h-[56px] overflow-hidden">
              <svg className="wave-wave absolute left-0 top-0 h-[64px] w-[220%]" viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,64 C120,24 240,24 360,58 C480,92 600,92 720,58 C840,24 960,24 1080,58 C1140,75 1170,83 1200,84 L1200,160 L0,160 Z" fill="rgba(70,143,255,0.95)" />
              </svg>
              <svg className="wave-wave wave-wave--slow absolute left-0 top-2 h-[62px] w-[220%]" viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,70 C120,18 240,18 360,54 C480,90 600,90 720,54 C840,18 960,18 1080,54 C1140,72 1170,82 1200,80 L1200,160 L0,160 Z" fill="rgba(15,104,255,0.72)" />
              </svg>
              <svg className="wave-wave wave-wave--float absolute left-0 top-6 h-[58px] w-[220%]" viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,66 C120,10 240,10 360,44 C480,78 600,78 720,44 C840,10 960,10 1080,44 C1140,62 1170,74 1200,72 L1200,160 L0,160 Z" fill="rgba(255,255,255,0.93)" />
              </svg>
            </div>
            <div className="relative flex items-start gap-3 px-4 pt-4">
              <div className="h-10 w-10 overflow-hidden rounded-[3px] bg-[#f3c623] shadow-[0_4px_18px_rgba(0,0,0,0.2)]">
                {posterUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={posterUrl} alt={title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-bold text-slate-900">
                    {title.slice(0, 1).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="pt-0.5 leading-tight">
                <p className="text-[11px] text-white/85">Paying to</p>
                <p className="line-clamp-1 text-[20px] font-semibold tracking-[-0.01em]">{payeeName}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handlePayment} className="px-4 pb-4 pt-3 text-[#617083]">
            <div className="border-b border-[#dee3ea] pb-3">
              <p className="text-[12px] font-medium text-[#7f8a98]">Purpose of Payment</p>
              <p className="mt-1 line-clamp-1 text-[19px] font-semibold uppercase tracking-[-0.01em] text-[#4c5a70]">
                {title}
              </p>
            </div>

            <div className="border-b border-[#dee3ea] py-3">
              <p className="text-[12px] font-medium text-[#7f8a98]">Amount</p>
              <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em] text-[#4c5a70]">₹{amount}</p>
            </div>

            <div className="flex items-center gap-2 border-b border-[#dee3ea] py-3 text-[13px]">
              <span className="font-semibold text-[#334055]">Your Details</span>
              <ChevronRight className="h-3.5 w-3.5 text-[#b6bdc8]" />
              <span className="text-[#a1a8b4]">Payment</span>
            </div>

            {error && (
              <div className="mt-3 rounded-[6px] border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700">
                {error}
              </div>
            )}

            <div className="mt-3 space-y-4 text-[13px]">
              <div>
                <label htmlFor="name" className="mb-1 block font-medium text-[#6e7786]">
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="flex h-[42px] items-center overflow-hidden rounded-[8px] border border-[#d4dbe5] bg-white shadow-[0_3px_12px_rgba(68,89,120,0.06)] transition focus-within:border-[#9fb0d0]">
                  <div className="flex h-full w-11 items-center justify-center border-r border-[#e8edf4] text-[#74829a]">
                    <User className="h-4.5 w-4.5" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    autoComplete="name"
                    disabled={loading}
                    placeholder="Enter your full name"
                    className="h-full flex-1 bg-transparent px-3 text-[13px] text-[#404957] outline-none placeholder:text-[#98a3b3]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block font-medium text-[#6e7786]">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="flex h-[42px] items-center overflow-hidden rounded-[8px] border border-[#d4dbe5] bg-white shadow-[0_3px_12px_rgba(68,89,120,0.06)] transition focus-within:border-[#9fb0d0]">
                  <div className="flex h-full w-11 items-center justify-center border-r border-[#e8edf4] text-[#74829a]">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    autoComplete="email"
                    disabled={loading}
                    placeholder="Enter your email address"
                    className="h-full flex-1 bg-transparent px-3 text-[13px] text-[#404957] outline-none placeholder:text-[#98a3b3]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="mb-1 block font-medium text-[#6e7786]">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex h-[42px] items-center overflow-hidden rounded-[8px] border border-[#d4dbe5] bg-white shadow-[0_3px_12px_rgba(68,89,120,0.06)] transition focus-within:border-[#9fb0d0]">
                  <div className="flex h-full w-11 items-center justify-center border-r border-[#e8edf4] text-[#74829a]">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    inputMode="tel"
                    autoComplete="tel"
                    disabled={loading}
                    placeholder="Enter your phone number"
                    className="h-full flex-1 bg-transparent px-3 text-[13px] text-[#404957] outline-none placeholder:text-[#98a3b3]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-[8px] bg-[linear-gradient(180deg,#eaf1ff_0%,#f5f8ff_100%)] px-4 py-3 text-center shadow-[0_4px_14px_rgba(74,103,160,0.06)]">
              <p className="text-[20px] font-semibold tracking-[-0.02em] text-[#244d9b]">You Pay ₹{amount}</p>
              <div className="mt-1 text-[11px] text-[#244d9b] underline decoration-[#244d9b]/60 underline-offset-2">
                <Link href="/terms" className="hover:text-[#183d81]">
                  Terms of service
                </Link>
                <span className="mx-1">and</span>
                <Link href="/refund-policy" className="hover:text-[#183d81]">
                  Refund policy
                </Link>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-4 flex h-11 w-full items-center justify-center rounded-[4px] bg-[linear-gradient(180deg,#28b44f_0%,#20a543_100%)] text-[19px] font-semibold text-white shadow-[0_8px_18px_rgba(31,160,67,0.35)] transition hover:brightness-105 disabled:opacity-80"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Next'}
              </button>
            </div>
          </form>
        </div>

        <p className="mt-4 text-center text-[13px] text-[#9ea5b2]">
          Powered by <span className="font-semibold text-[#8f96a3]">Elneb EdTech</span>
        </p>
      </div>

      <style jsx global>{`
        @keyframes checkout-wave-drift {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-18%);
          }
        }

        @keyframes checkout-wave-float {
          0%,
          100% {
            transform: translateX(0) translateY(0) scale(1);
          }
          50% {
            transform: translateX(-4%) translateY(1px) scale(1.01);
          }
        }

        @keyframes checkout-bg-bob {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(0, -14px, 0) scale(1.03);
          }
        }

        @keyframes checkout-bg-slide {
          0% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(24px, -8px, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .wave-drift {
          animation: checkout-wave-drift 14s linear infinite;
        }

        .page-wave {
          transform-origin: center bottom;
          will-change: transform;
        }

        .page-wave--field {
          animation: checkout-bg-bob 12s ease-in-out infinite;
        }

        .page-wave--rear {
          animation: checkout-wave-drift 18s linear infinite, checkout-bg-bob 14s ease-in-out infinite;
        }

        .page-wave--mid {
          animation: checkout-wave-drift 12s linear infinite, checkout-bg-bob 10s ease-in-out infinite;
        }

        .page-wave--front {
          animation: checkout-wave-drift 9s linear infinite, checkout-bg-bob 8s ease-in-out infinite;
        }

        .wave-wave {
          animation: checkout-wave-drift 9s linear infinite;
        }

        .wave-wave--slow {
          animation-duration: 13s;
          opacity: 0.92;
        }

        .wave-wave--float {
          animation: checkout-wave-float 6s ease-in-out infinite, checkout-wave-drift 11s linear infinite;
        }

        .bg-bubble {
          position: absolute;
          bottom: -75px;
          border-radius: 9999px;
          filter: blur(4px);
          opacity: 0.9;
          animation: checkout-bg-bob 8s ease-in-out infinite;
        }

        .bg-bubble--left {
          left: -6%;
          width: 42vw;
          max-width: 390px;
          height: 42vw;
          max-height: 390px;
          background: radial-gradient(circle at 35% 35%, rgba(175, 207, 255, 0.5), rgba(175, 207, 255, 0.18) 52%, rgba(175, 207, 255, 0.02) 72%);
          animation-duration: 9s;
        }

        .bg-bubble--right {
          right: -10%;
          width: 34vw;
          max-width: 320px;
          height: 34vw;
          max-height: 320px;
          background: radial-gradient(circle at 35% 35%, rgba(196, 224, 255, 0.5), rgba(196, 224, 255, 0.16) 52%, rgba(196, 224, 255, 0.01) 75%);
          animation-duration: 11s;
          animation-name: checkout-bg-bob, checkout-bg-slide;
          animation-timing-function: ease-in-out, ease-in-out;
          animation-iteration-count: infinite, infinite;
        }

        .bg-ripple {
          position: absolute;
          inset-inline: 10%;
          bottom: 0;
          height: 120px;
          border-radius: 9999px;
          background: linear-gradient(90deg, rgba(197, 220, 255, 0), rgba(197, 220, 255, 0.26), rgba(197, 220, 255, 0));
          filter: blur(16px);
          opacity: 0.55;
          animation: checkout-bg-slide 10s ease-in-out infinite;
        }

        .bg-ripple--one {
          bottom: 10px;
        }

        .bg-ripple--two {
          bottom: 34px;
          inset-inline: 22%;
          height: 80px;
          opacity: 0.38;
          animation-duration: 13s;
        }

        .page-dots {
          position: absolute;
          width: 64px;
          height: 64px;
          opacity: 0.38;
          background-image: radial-gradient(circle, rgba(165, 192, 255, 0.8) 0 2px, transparent 2.5px);
          background-size: 18px 18px;
          filter: blur(0.25px);
          animation: checkout-bg-slide 14s ease-in-out infinite;
        }

        .page-dots--left {
          left: 0;
          top: 18%;
        }

        .page-dots--right {
          right: 1.5rem;
          bottom: 18%;
          opacity: 0.34;
          animation-duration: 16s;
        }

        @media (prefers-reduced-motion: reduce) {
          .wave-drift,
          .wave-wave,
          .wave-wave--slow,
          .wave-wave--float,
          .page-wave,
          .bg-bubble,
          .bg-ripple {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}