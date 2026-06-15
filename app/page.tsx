import { Hero } from '@/components/hero'
import { Syllabus } from '@/components/syllabus'
import { Testimonials } from '@/components/testimonials'
import { FAQ } from '@/components/faq'
import { Pricing } from '@/components/pricing'
import { ScrollUiProvider } from '@/components/scroll-ui-provider'
import { ScrollHeader } from '@/components/scroll-header'
import { FloatingCta } from '@/components/floating-cta'
import { ContactForm } from '@/components/contact-form'
import { getPublicCourses } from '@/lib/courses'

export default async function Home() {
  const courses = await getPublicCourses()
  const featuredCourse = courses[0]
  const checkoutHref = '/courses'
  const supportEmail = 'rasoiroom31@gmail.com'

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
        <Pricing checkoutHref={checkoutHref} currentPrice={featuredCourse?.price ?? 299} />
        <FAQ />
        <FloatingCta price={featuredCourse?.price ?? 0} enrollHref={checkoutHref} />
      </ScrollUiProvider>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 mb-8 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">E</span>
                </div>
                <span className="font-bold text-white">Elneb EdTech</span>
              </div>
              <p className="text-sm">Master professional video editing with our comprehensive course.</p>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Phone / WhatsApp</p>
                  <a href="tel:+917250939051" className="text-white hover:text-orange-400 transition-colors font-semibold text-lg">
                    +91 72509 39051
                  </a>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Email</p>
                  <a href="mailto:rasoiroom31@gmail.com" className="text-white hover:text-orange-400 transition-colors font-semibold text-lg">
                    rasoiroom31@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Contact Us</h3>
              <ContactForm supportEmail={supportEmail} />
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
              <div className="text-sm"> 
                <a href="/terms" className="hover:text-orange-400 transition-colors mr-4">Terms of Service |</a>
                <a href="/privacy" className="hover:text-orange-400 transition-colors mr-4">Privacy Policy |</a>
                <a href="/contact" className="hover:text-orange-400 transition-colors mr-4">Contact Us |</a>
                <a href="/refund-policy" className="hover:text-orange-400 transition-colors mr-4">Refund Policy |</a>
                <a href="/disclaimer" className="hover:text-orange-400 transition-colors">Disclaimer</a>
              </div>
              <div className="text-sm">
                <p>&copy; 2026 - <a href="https://elneb.in" target="_blank" rel="noreferrer" className="font-semibold text-white hover:text-orange-400">ELNEB</a> - All Rights Reserved</p>
              </div>
            </div>
          </div>

          {/* Bottom bar always visible at page end */}
          <div className="mt-6 border-t border-slate-800 pt-4 text-center text-sm text-slate-400">
            <span>Copyright 2026 - ELNEB - All Rights Reserved • </span>
            <a href="https://elneb.in" target="_blank" rel="noreferrer" className="text-white hover:text-orange-400">https://elneb.in</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
