'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

type HeroProps = {
  checkoutHref: string
}

export function Hero({ checkoutHref }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    const startPlayback = () => {
      void video.play().catch(() => {})
    }

    startPlayback()
    video.addEventListener('loadedmetadata', startPlayback)

    return () => {
      video.removeEventListener('loadedmetadata', startPlayback)
    }
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-20 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8 items-center">
          {/* Left side - Video placeholder */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shadow-2xl">
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src="https://kabirmehra.in/wp-content/uploads/2024/06/RAMPAGE-trailer-for-international-course_1-1.mp4"
              autoPlay
              controls
              loop
              muted
              playsInline
              preload="metadata"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-500/20 pointer-events-none" />
          </div>

          {/* Right side - Content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                MASTER THE WORLD'S MOST IN-DEMAND SKILL : VIDEO EDITING
              </h1>
            </div>

            <p className="text-lg text-slate-300 leading-relaxed">
              Inside The Edit is for anyone who wants to produce cinematic & emotional videos without wasting months.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href={checkoutHref}
                className="inline-flex items-center justify-center px-12 py-6 bg-yellow-400 text-black font-extrabold rounded-xl hover:bg-yellow-300 transition-transform duration-300 transform-gpu animate-wiggle-x shadow-2xl shadow-yellow-500/35 text-xl md:text-2xl"
                aria-label="Apply now"
              >
                Apply Now
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-700">
              <div>
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-sm text-slate-400">Students</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">40hrs</p>
                <p className="text-sm text-slate-400">Content</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">100%</p>
                <p className="text-sm text-slate-400">Lifetime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
