'use client'

import Link from 'next/link'
import { useScrollUi } from '@/components/scroll-ui-provider'

type ScrollHeaderProps = {
  enrollHref: string
}

export function ScrollHeader({ enrollHref }: ScrollHeaderProps) {
  const { headerHidden } = useScrollUi()

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-transform duration-300',
        headerHidden ? '-translate-y-full' : 'translate-y-0',
      ].join(' ')}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 shadow-sm">
            <span className="text-lg font-bold text-white">E</span>
          </div>
          <span className="text-xl font-bold text-slate-900">Elneb EdTech</span>
        </div>
        <Link
          href={enrollHref}
          className="rounded-full bg-yellow-400 px-5 py-2 font-semibold text-black shadow-sm transition hover:bg-yellow-300"
        >
          Enroll Now
        </Link>
      </div>
    </header>
  )
}
