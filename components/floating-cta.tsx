'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useScrollUi } from '@/components/scroll-ui-provider'

type FloatingCtaProps = {
  price: number
  enrollHref: string
}

export function FloatingCta({ price, enrollHref }: FloatingCtaProps) {
  const { headerHidden } = useScrollUi()

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
              <p className="text-[11px] text-slate-500 sm:text-xs">Apply now and pay the exact admin-set course price.</p>
            </div>
          </div>

          <Link
            href={enrollHref}
            aria-disabled={!headerHidden}
            tabIndex={headerHidden ? 0 : -1}
            className={[
              'inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 font-semibold shadow-sm transition-all duration-300 sm:w-auto sm:min-w-[220px] sm:px-6 sm:py-3',
                  headerHidden
                    ? 'bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-500 text-black shadow-[0_10px_30px_rgba(234,179,8,0.35)] hover:-translate-y-0.5 hover:from-yellow-200 hover:via-yellow-300 hover:to-yellow-400'
                    : 'cursor-not-allowed bg-slate-300 text-slate-500',
            ].join(' ')}
          >
            Apply Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
