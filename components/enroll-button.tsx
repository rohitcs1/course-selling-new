'use client'

import Link from 'next/link'
import { ArrowRight, Rocket } from 'lucide-react'

type EnrollButtonProps = {
  href: string
  compactOnMobile?: boolean
  fullWidthMobile?: boolean
  disabled?: boolean
  className?: string
  label?: string
}

export function EnrollButton({
  href,
  compactOnMobile = false,
  fullWidthMobile = false,
  disabled = false,
  className = '',
  label = 'Enroll Now',
}: EnrollButtonProps) {
  const baseClasses = [
    'cta-button inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-500 px-7 py-4 text-[17px] font-extrabold text-black shadow-[0_12px_28px_rgba(245,188,0,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(245,188,0,0.34)]',
    fullWidthMobile ? 'w-full sm:w-auto' : 'w-auto',
    disabled ? 'pointer-events-none cursor-not-allowed bg-slate-300 text-slate-500 shadow-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Link
      href={href}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className={baseClasses}
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-lg">
        <Rocket className="h-4 w-4" />
      </span>
      <span className={compactOnMobile ? 'hidden sm:inline-block' : 'inline-block'}>{label}</span>
      <ArrowRight className={compactOnMobile ? 'h-4 w-4 hidden sm:block' : 'h-4 w-4'} />
    </Link>
  )
}