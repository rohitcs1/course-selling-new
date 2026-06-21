'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import { useScrollUi } from '@/components/scroll-ui-provider'
import { EnrollButton } from '@/components/enroll-button'

type FloatingCtaProps = {
  price: number
  enrollHref: string
}

export function FloatingCta({ price, enrollHref }: FloatingCtaProps) {
  const { headerHidden } = useScrollUi()
  const INITIAL_SECONDS = 25 * 60
  const [secondsLeft, setSecondsLeft] = useState<number>(INITIAL_SECONDS)
  const minutesLeft = Math.floor(secondsLeft / 60)
  const remainingSeconds = secondsLeft % 60

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!price || price <= 0) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 pointer-events-none">
      <div
        className={[
          'w-full border-t bg-white/95 px-3 py-2.5 shadow-[0_-12px_40px_rgba(15,23,42,0.12)] backdrop-blur-md transition-all duration-300 ease-out sm:px-4 sm:py-4',
          headerHidden
            ? 'pointer-events-auto translate-y-0 opacity-100 border-orange-200'
            : 'pointer-events-none translate-y-full opacity-0 border-transparent',
        ].join(' ')}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 px-3 py-2 text-white shadow-sm sm:px-4 sm:py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 sm:text-xs">Today&apos;s Price</p>
              <div className="mt-0.5 flex items-baseline gap-2 sm:mt-1">
                <span className="text-xl font-extrabold sm:text-2xl">₹{price}</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 sm:text-sm">Limited seats available</p>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3 w-3 text-orange-500" />
                <p className="text-[11px] text-slate-500 sm:text-xs">Offer will expire in {String(minutesLeft).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}</p>
              </div>
            </div>
          </div>

          <EnrollButton
            href={enrollHref}
            disabled={!headerHidden}
            fullWidthMobile
            className="sm:min-w-[220px] sm:px-6 sm:py-3"
          />
        </div>
      </div>
    </div>
  )
}
