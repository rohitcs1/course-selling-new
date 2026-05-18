import Link from 'next/link'
import { Hero } from '@/components/hero'
import { Syllabus } from '@/components/syllabus'
import { Testimonials } from '@/components/testimonials'
import { FAQ } from '@/components/faq'
import { ScrollUiProvider } from '@/components/scroll-ui-provider'
import { ScrollHeader } from '@/components/scroll-header'
import { FloatingCta } from '@/components/floating-cta'
import { Mail, Phone, MapPin } from 'lucide-react'
import { getPublicCourses } from '@/lib/courses'

export default async function Home() {
  const courses = await getPublicCourses()
  const featuredCourse = courses[0]
  const checkoutHref = featuredCourse ? `/checkout?courseId=${featuredCourse.id}` : '/checkout'

  return (
    <main>
      <ScrollUiProvider>
        {/* Header */}
        <ScrollHeader enrollHref={checkoutHref} />

        {/* Main Content */}
        <div className="pt-16">
          <Hero checkoutHref={checkoutHref} />
        </div>
        <Syllabus checkoutHref={checkoutHref} />
        <Testimonials checkoutHref={checkoutHref} />
        <section id="pricing" className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 font-semibold text-orange-500">Available Courses</p>
            <h2 className="text-4xl font-bold text-slate-900">Pick a course and pay for that exact course</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courses.length ? courses.map((course) => (
              <article key={course.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="aspect-video bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center">
                  {course.poster_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={course.poster_url} alt={course.title} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-5xl">🎬</span>
                  )}
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-slate-900">{course.title}</h3>
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">₹{course.price}</span>
                  </div>
                  <p className="mb-5 text-sm text-slate-600 line-clamp-3">{course.description || 'No description provided yet.'}</p>
                  <Link
                    href={`/checkout?courseId=${course.id}`}
                    className="block rounded-lg bg-orange-500 px-4 py-3 text-center font-semibold text-white hover:bg-orange-600"
                  >
                    Enroll Now
                  </Link>
                </div>
              </article>
            )) : (
              <p className="text-slate-500">No public courses found.</p>
            )}
          </div>
        </div>
        </section>
        <FAQ />
        <FloatingCta price={featuredCourse?.price ?? 0} enrollHref={checkoutHref} />
      </ScrollUiProvider>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">E</span>
                </div>
                <span className="font-bold text-white">Elneb EdTech</span>
              </div>
              <p className="text-sm">Master professional video editing with our comprehensive course.</p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Course</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Curriculum</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Projects</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Resources</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Community</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Contact Info</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:hello@elnebedtech.com" className="hover:text-orange-400 transition-colors">hello@elnebedtech.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+919876543210" className="hover:text-orange-400 transition-colors">+91 9876 543 210</a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Mumbai, India</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; 2024 Elneb EdTech. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0 text-sm">
              <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
