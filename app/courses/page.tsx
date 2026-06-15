import { CourseGallery } from '@/components/course-gallery'
import { getPublicCourses } from '@/lib/courses'

export default async function CoursesPage() {
  const courses = await getPublicCourses()

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-16 md:py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">All Courses</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Pick the course you want to enroll in</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              Admin-added courses appear here in one place. Open the course you want, then continue to checkout.
            </p>
          </div>
        </div>
      </section>

      <CourseGallery
        courses={courses}
        mode="browse"
        title="Choose Your Course"
        subtitle="Select a course card below to continue to checkout. Posters are shown at their full ratio so they do not get cut."
      />
    </main>
  )
}