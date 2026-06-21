'use client'

import { GraduationCap, ShieldCheck, Sparkles, Trophy, Users } from 'lucide-react'
import { EnrollButton } from '@/components/enroll-button'

type HeroProps = {
  checkoutHref: string
}

export function Hero({ checkoutHref }: HeroProps) {

  return (
    <section className="relative overflow-hidden py-6 md:py-8" style={{background: 'linear-gradient(180deg, #ffffff 0%, #fff6fb 50%, #ffffff 100%)'}}>
      <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-fuchsia-200/45 blur-3xl" />
      <div className="absolute right-12 top-24 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="absolute left-12 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-violet-200/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" style={{minHeight: 'calc(100vh - 80px)'}}>
        <div className="relative grid gap-8 md:grid-cols-2 md:gap-16 lg:gap-20 items-start md:items-center h-full">

          {/* Left side - Content (large text, badges, enroll) */}
          <div className="space-y-6 pt-2 md:pt-0 md:pr-4" style={{maxWidth: 680}}>
            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-white/75 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Become a Creative Video Pro
              </p>
              {/* Enforce same 3-line break as design */}
              <h1 className="font-extrabold text-slate-900" style={{fontSize: 'clamp(34px, 5.4vw, 58px)', lineHeight: 0.98, letterSpacing: '-0.045em'}}>
                <span className="block">Discover The World's</span>
                <span className="block">Most <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-violet-500">In-Demand</span></span>
                <span className="block">Skill: <span className="text-violet-700">Video Editing</span></span>
              </h1>
            </div>

            <p className="max-w-xl text-[16px] leading-8 text-slate-600 md:text-[17px]">
              Inside The Edit helps anyone create cinematic & emotional videos without wasting time.
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4">
              <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-800 shadow-sm">
                <ShieldCheck className="h-4 w-4 text-violet-500" />
                Beginner Friendly
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-800 shadow-sm">
                <GraduationCap className="h-4 w-4 text-emerald-500" />
                Lifetime Access
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-800 shadow-sm">
                <Trophy className="h-4 w-4 text-amber-500" />
                Expert Support
              </span>
            </div>

            <div className="flex w-full flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4 md:pt-4">
              <EnrollButton href={checkoutHref} fullWidthMobile className="sm:justify-start" />

              <div className="flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-500 shadow-sm sm:w-auto sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-300" />
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-400" />
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-500" />
                </div>
                <div className="pl-2 leading-5">Join <strong>500+</strong> students<br /><span className="text-xs text-slate-400">transforming their future</span></div>
              </div>
            </div>
          </div>

          {/* Right side - Video with decorative frame */}
          <div className="relative flex justify-center md:justify-end pt-2 md:pt-0">
            <div className="absolute left-1/2 top-1/2 hidden h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-200/55 blur-[90px] md:block md:w-[88%]" />
            <div className="absolute left-1/2 top-4 hidden h-6 w-6 -translate-x-1/2 rounded-full border border-fuchsia-200/40 md:block" />
            <div className="absolute left-6 top-1/2 hidden h-44 w-14 -translate-y-1/2 bg-[radial-gradient(circle,_rgba(180,120,255,0.42)_1.5px,_transparent_1.5px)] [background-size:12px_12px] opacity-55 md:block" />

            <div className="relative w-full max-w-[740px] bg-transparent p-0 shadow-[0_18px_60px_rgba(210,115,255,0.18)]">
              <div className="rounded-[10px] bg-gradient-to-br from-pink-300 via-fuchsia-300 to-violet-300 p-[6px] shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
                <div className="rounded-[4px] bg-black p-[4px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]">
                  <div className="relative overflow-hidden rounded-[14px] bg-black" style={{paddingTop: '56.25%'}}>
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/tC2U46vsu3w?autoplay=0&mute=1&modestbranding=1"
                  title="Countdown Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative badges positioned like design */}
            <div className="hidden md:block">
              <div className="absolute -left-6 top-1/2 z-10 flex h-16 w-16 -translate-y-1/2 rotate-[-8deg] items-center justify-center rounded-xl border-[4px] border-pink-200 bg-fuchsia-100 p-1 shadow-[0_12px_26px_rgba(0,0,0,0.12)]">
                <span className="flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-300 to-purple-500 text-white font-bold">🎬</span>
              </div>
              <div className="absolute -right-4 top-8 z-10 flex h-16 w-16 rotate-6 items-center justify-center rounded-xl border-[4px] border-pink-200 bg-fuchsia-100 p-1 shadow-[0_12px_26px_rgba(0,0,0,0.12)]">
                <span className="flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-violet-400 to-fuchsia-500 text-white font-bold">Pr</span>
              </div>
              <div className="absolute -right-6 bottom-8 z-10 flex h-12 w-12 items-center justify-center rounded-xl border-[4px] border-pink-200 bg-fuchsia-100 p-1 shadow-[0_12px_26px_rgba(0,0,0,0.12)]">
                <span className="flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-slate-900 to-slate-700 text-white text-xs font-bold">Da</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 w-full rounded-3xl border border-white/80 bg-white/85 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur-sm md:mt-12 md:p-6 lg:p-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-0 md:divide-x md:divide-slate-200">
            <div className="flex items-center gap-4 rounded-2xl bg-white px-4 py-4 md:bg-transparent md:px-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-violet-500">
                <Users className="h-7 w-7" />
              </div>
              <div>
                <p className="text-[28px] font-extrabold text-violet-600">500+</p>
                <p className="text-sm text-slate-500">Happy Students</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-white px-4 py-4 md:bg-transparent md:justify-center md:px-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-500">
                <GraduationCap className="h-7 w-7" />
              </div>
              <div>
                <p className="text-[28px] font-extrabold text-emerald-500">40+hrs</p>
                <p className="text-sm text-slate-500">High Quality Content</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-white px-4 py-4 md:bg-transparent md:justify-center md:px-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                <Trophy className="h-7 w-7" />
              </div>
              <div>
                <p className="text-[28px] font-extrabold text-orange-500">100%</p>
                <p className="text-sm text-slate-500">Lifetime Access</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 rounded-2xl bg-white px-4 py-4 md:bg-transparent md:px-5">
              <div className="flex flex-col items-center gap-1">
                <div className="flex text-amber-400 text-lg leading-none">★★★★★</div>
                <p className="text-center text-sm text-slate-600">“Best course I've ever joined!”</p>
                <p className="text-center text-sm text-slate-500">- Rohan, Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
