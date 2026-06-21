'use client'

import { useScrollUi } from '@/components/scroll-ui-provider'
import { EnrollButton } from '@/components/enroll-button'

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
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 shadow-sm">
            <span className="text-lg font-bold text-white">E</span>
          </div>
          <span className="text-lg font-bold text-slate-900">Elneb EdTech</span>
        </div>

        <div className="flex items-center gap-4">
          <EnrollButton href={enrollHref} compactOnMobile className="px-5 py-2.5 text-sm" />
        </div>
      </div>
    </header>
  )
}
