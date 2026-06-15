import Link from 'next/link'
import { ArrowRight, IndianRupee } from 'lucide-react'
import { normalizePublicUrl } from '@/lib/public-url'

export type CourseCard = {
  id: string
  title: string
  description: string | null
  poster_url: string | null
  price: number
  hidden?: boolean
}

type CourseGalleryProps = {
  courses: CourseCard[]
  mode?: 'home' | 'browse'
  title?: string
  subtitle?: string
}

function getPosterUrl(url: string | null | undefined) {
  return normalizePublicUrl(url)
}

export function CourseGallery({
  courses,
  mode = 'home',
  title = 'All Courses',
  subtitle = 'Choose the course that fits your goal. Each card below is controlled from the admin panel.',
}: CourseGalleryProps) {
  if (!courses.length) {
    return (
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900">No courses available yet</h2>
            <p className="mt-2 text-slate-600">Add a course from the admin panel and it will appear here automatically.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={mode === 'home' ? 'bg-white py-16 md:py-20' : 'bg-slate-50 py-16 md:py-20'}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">Courses</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">{title}</h2>
          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">{subtitle}</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => {
            const posterUrl = getPosterUrl(course.poster_url)
            const isBrowseMode = mode === 'browse'
            const href = isBrowseMode ? `/checkout?courseId=${course.id}` : `/courses#course-${course.id}`
            const ctaLabel = isBrowseMode ? 'Proceed to Checkout' : 'Enroll Now'

            return (
              <article
                key={course.id}
                id={`course-${course.id}`}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="bg-slate-950 p-3">
                  <div className="relative aspect-[1280/714] overflow-hidden rounded-2xl bg-slate-900">
                    {posterUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={posterUrl}
                        alt={course.title}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 px-6 text-center">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-400">Poster coming soon</p>
                          <p className="mt-3 text-xl font-bold text-white">{course.title}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4 p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-2xl font-bold leading-tight text-slate-950">{course.title}</h3>
                    <div className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-600">
                      <IndianRupee className="h-4 w-4" />
                      {course.price}
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-slate-600">
                    {course.description || 'This course is available now. Check the all-courses page to choose the one you want to enroll in.'}
                  </p>

                  <Link
                    href={href}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 text-base font-bold text-white shadow-[0_12px_32px_rgba(249,115,22,0.28)] transition hover:-translate-y-0.5 hover:from-orange-600 hover:to-amber-600"
                  >
                    {ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}