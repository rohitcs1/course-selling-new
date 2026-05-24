'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Mail, ArrowRight, Sparkles } from 'lucide-react'

export default function SuccessPage() {
  const [email, setEmail] = useState('')
  const [driveLink, setDriveLink] = useState('')
  const [secondsLeft, setSecondsLeft] = useState(1)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setEmail(params.get('email') || '')
    setDriveLink(params.get('driveLink') || '')
  }, [])

  useEffect(() => {
    if (!driveLink) return

    const redirectTimer = window.setTimeout(() => {
      window.location.href = driveLink
    }, 800)

    const countdownTimer = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1))
    }, 800)

    return () => {
      window.clearTimeout(redirectTimer)
      window.clearInterval(countdownTimer)
    }
  }, [driveLink])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-72 h-72 rounded-full bg-emerald-100/40 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-cyan-100/40 blur-3xl animate-pulse" style={{ animationDelay: '1.2s' }} />
      </div>

      <div className="w-full max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg p-6 md:p-10 text-center text-slate-900">

          <div className="relative flex justify-center mb-6">
            <div className="absolute inset-0 rounded-full bg-emerald-100/40 blur-2xl animate-ping" />
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center shadow-[0_0_40px_rgba(52,211,153,0.12)] animate-[float_2.5s_ease-in-out_infinite]">
              <CheckCircle2 className="w-14 h-14 md:w-16 md:h-16 text-white" />
            </div>
          </div>

          <div className="relative space-y-4 animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              <Sparkles className="w-4 h-4 text-emerald-600" /> Payment successful
            </div>

            <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-tight uppercase text-slate-900">
              CHECK YOUR EMAIL ID
            </h1>

            <p className="mx-auto max-w-2xl text-lg md:text-2xl font-semibold text-slate-700 leading-relaxed">
              We have sent the course link to your email address. Please check your inbox (and spam folder) to access the course.
            </p>

            <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-6">
              <div className="flex items-start gap-3 text-left">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                <div>
                  <p className="text-sm md:text-base font-bold text-slate-900">Course link sent to</p>
                  <p className="text-sm md:text-base text-slate-700 break-all">{email || 'your registered email address'}</p>
                </div>
              </div>

              {driveLink && (
                <div className="mt-4 flex items-start gap-3 text-left border-t border-white/10 pt-4">
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                  <div>
                    <p className="text-sm md:text-base font-bold text-slate-900">Redirecting to Google Drive</p>
                    <p className="text-sm md:text-base text-slate-700">
                      Please wait {secondsLeft}s while we open your course link.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link
                href="/"
                className="px-8 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 font-bold hover:bg-slate-50 transition-colors"
              >
                Back to Home
              </Link>
              <a
                href="mailto:hello@elnebedtech.com"
                className="px-8 py-3 rounded-xl border border-slate-200 text-slate-900 font-bold hover:bg-slate-50 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-fade-up {
          animation: fade-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
