'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Check, Clock } from 'lucide-react'

type Feature = {
  label: string
  note: string
}

const leftFeatures: Feature[] = [
  { label: '8 Incredibly Valuable, Online Training', note: 'Value = ₹5,999' },
  { label: 'Private Community Access', note: '₹2,499' },
  { label: 'Call, Email & Whatsapp Chat Support', note: '₹3,999' },
  { label: 'Course Lifetime Update', note: '₹4,999' },
]

const rightFeatures: Feature[] = [
  { label: 'Stock Music & Videos Collection', note: '₹4,999' },
  { label: 'Premium Fonts & Templates Packs', note: '₹4,999' },
  { label: 'Ai Video Creation & Editing', note: '₹6,999' },
  { label: 'Certificate After Complete Course', note: 'Priceless' },
]

type PricingProps = {
  checkoutHref: string
  currentPrice?: number
  originalPrice?: number
}

export function Pricing({ checkoutHref, currentPrice = 299, originalPrice = 1499 }: PricingProps) {
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const endOfDay = new Date(now)
      endOfDay.setHours(23, 59, 59, 999)

      const diff = Math.max(0, endOfDay.getTime() - now.getTime())
      const minutes = Math.floor(diff / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="pricing" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-black uppercase tracking-tight text-slate-950 md:text-5xl">
            Here&apos;s what you&apos;ll get :
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-10 md:grid-cols-2 md:gap-14">
          <div className="space-y-3 text-[15px] leading-6 text-slate-800 md:pl-4">
            {leftFeatures.map((feature) => (
              <div key={feature.label} className="flex items-start gap-3">
                <Check className="mt-1 h-5 w-5 shrink-0 text-blue-600" />
                <p>
                  {feature.label}{' '}
                  <span className="font-semibold">({feature.note})</span>
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-[15px] leading-6 text-slate-800 md:pr-4">
            {rightFeatures.map((feature) => (
              <div key={feature.label} className="flex items-start gap-3">
                <Check className="mt-1 h-5 w-5 shrink-0 text-blue-600" />
                <p>
                  <span className="font-semibold">Bonus : </span>
                  {feature.label}{' '}
                  <span className="font-semibold">({feature.note})</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-xl text-center">
          <p className="text-sm text-slate-500 line-through">Total Value : ₹34,493</p>
          <p className="mt-1 text-2xl text-slate-900 line-through decoration-2 decoration-slate-900/80">
            Only ₹{originalPrice.toLocaleString('en-IN')}
          </p>
          <p className="mt-2 text-5xl font-black leading-none tracking-tight text-blue-600 md:text-6xl">
            Now ₹{currentPrice}/-
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.28em] text-red-500">For limited time</p>

          <div className="mt-8 inline-flex flex-col items-center rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-700">Offer will expire in...</p>
            <div className="mt-2 flex items-center gap-2 rounded-xl bg-white px-4 py-2 shadow-inner shadow-slate-200">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-2xl font-black text-blue-600">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-sm font-semibold text-slate-400">m</span>
              <span className="text-2xl font-black text-blue-600">:</span>
              <span className="text-2xl font-black text-blue-600">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-sm font-semibold text-slate-400">s</span>
            </div>
          </div>

          <Link
            href={checkoutHref}
            className="mt-10 inline-flex min-h-[66px] w-full items-center justify-center rounded-2xl border border-yellow-300 bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-500 px-6 py-4 text-xl font-black uppercase tracking-wide text-black shadow-[0_10px_30px_rgba(234,179,8,0.35)] transition hover:-translate-y-0.5 hover:from-yellow-200 hover:via-yellow-300 hover:to-yellow-400 sm:w-[460px]"
          >
            Apply Now
          </Link>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-700">Hurry up!</p>
        </div>
      </div>
    </section>
  )
}
