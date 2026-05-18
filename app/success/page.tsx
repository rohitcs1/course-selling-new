'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Mail, Download, BookOpen } from 'lucide-react'

export default function SuccessPage() {
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Get email from URL params
    const params = new URLSearchParams(window.location.search)
    setEmail(params.get('email') || '')
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Welcome to Elneb EdTech!
          </h1>

          <p className="text-lg text-slate-600 mb-8">
            Your payment has been successful. You now have lifetime access to the complete video editing course.
          </p>

          {/* Course Access Info */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8 mb-8 border border-blue-200">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="font-semibold text-slate-900 mb-1">Check Your Email</p>
                  <p className="text-sm text-slate-600">
                    We&apos;ve sent the course access link and materials to <span className="font-semibold text-blue-600">{email}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-blue-200">
                <BookOpen className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="font-semibold text-slate-900 mb-1">Start Learning</p>
                  <p className="text-sm text-slate-600">
                    Click the link in your email to access the complete course with 40+ hours of professional video editing content.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-blue-200">
                <Download className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="font-semibold text-slate-900 mb-1">Download Resources</p>
                  <p className="text-sm text-slate-600">
                    Access project files, presets, templates, and all course materials inside the learning platform.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What&apos;s Included */}
          <div className="text-left mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What&apos;s Included:</h2>
            <ul className="grid md:grid-cols-2 gap-4">
              <li className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span className="text-slate-700">40+ hours of video content</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span className="text-slate-700">Lifetime access</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span className="text-slate-700">Project files & presets</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span className="text-slate-700">Monthly updates</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span className="text-slate-700">Email support</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span className="text-slate-700">Certificate of completion</span>
              </li>
            </ul>
          </div>

          {/* Next Steps */}
          <div className="bg-amber-50 rounded-xl p-6 mb-8 border border-amber-200">
            <p className="font-semibold text-slate-900 mb-2">Next Steps:</p>
            <ol className="text-left text-slate-700 space-y-2 text-sm">
              <li><span className="font-semibold">1.</span> Check your email (check spam folder too)</li>
              <li><span className="font-semibold">2.</span> Click the course access link</li>
              <li><span className="font-semibold">3.</span> Create your account if needed</li>
              <li><span className="font-semibold">4.</span> Start watching Module 1 immediately!</li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Back to Home
            </Link>
            <a
              href="mailto:hello@elnebedtech.com"
              className="px-8 py-3 border-2 border-slate-300 text-slate-900 font-semibold rounded-lg hover:border-slate-400 transition-colors"
            >
              Contact Support
            </a>
          </div>

          {/* Support Info */}
          <div className="mt-8 pt-8 border-t border-slate-200">
            <p className="text-slate-600 text-sm">
              Have questions? Email us at{' '}
              <a
                href="mailto:hello@elnebedtech.com"
                className="text-blue-600 hover:underline font-semibold"
              >
                hello@elnebedtech.com
              </a>
              {' '}or call{' '}
              <a
                href="tel:+919876543210"
                className="text-blue-600 hover:underline font-semibold"
              >
                +91 9876 543 210
              </a>
            </p>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8 text-slate-600">
          <p className="text-sm">
            Thank you for joining our community of video creators and editors!
          </p>
        </div>
      </div>
    </div>
  )
}
