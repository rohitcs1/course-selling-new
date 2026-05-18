'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Clock, CheckCircle } from 'lucide-react'

const features = [
  'Complete 40-hour video course',
  'Lifetime access to materials',
  'Project files and resources',
  'Email support',
  'Certificate of completion',
  'Monthly updates with new content',
]

export function Pricing() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const endOfDay = new Date(now)
      endOfDay.setHours(23, 59, 59, 999)

      const diff = endOfDay.getTime() - now.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      setTimeLeft({ days, hours, minutes })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-orange-500 font-semibold mb-2">Limited Time Offer</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
        </div>

        {/* Countdown Timer */}
        <div className="mb-12 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 p-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-orange-600" />
            <p className="font-semibold text-orange-600">Offer Expires In:</p>
          </div>
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">{String(timeLeft.days).padStart(2, '0')}</p>
              <p className="text-sm text-orange-600">Days</p>
            </div>
            <p className="text-2xl text-orange-600">:</p>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">{String(timeLeft.hours).padStart(2, '0')}</p>
              <p className="text-sm text-orange-600">Hours</p>
            </div>
            <p className="text-2xl text-orange-600">:</p>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">{String(timeLeft.minutes).padStart(2, '0')}</p>
              <p className="text-sm text-orange-600">Minutes</p>
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-white to-orange-50 p-8 md:p-12 shadow-xl">
          <div className="mb-8">
            <p className="text-slate-600 text-lg mb-2">Special Course Price</p>
            <div className="flex items-baseline gap-2">
              <p className="text-5xl md:text-6xl font-bold text-slate-900">₹1,499</p>
              <p className="text-xl text-slate-500 line-through">₹4,999</p>
            </div>
            <p className="text-orange-600 font-semibold mt-2">70% off - Limited time only</p>
          </div>

          <Link
            href="/checkout"
            className="block w-full mb-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all text-center text-lg"
          >
            Enroll Now
          </Link>

          <div className="space-y-4 mb-8 pb-8 border-b border-slate-200">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-slate-700">{feature}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-600 text-sm">
            30-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </section>
  )
}
