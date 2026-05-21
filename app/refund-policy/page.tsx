import React from 'react'

export default function RefundPolicyPage() {
  return (
    <main id="refund-policy" className="min-h-screen w-full bg-white px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">Refund Policy</h1>

        <div className="mt-10 space-y-8 text-lg leading-8 text-slate-700 sm:text-xl">
          <section>
            <p>
              We are committed to providing you with high-quality online video editing education.
              We want to ensure your satisfaction with our course, and we understand that sometimes
              circumstances may change. Therefore, we offer a 7-day Satisfaction Guarantee to give
              you peace of mind when enrolling in our course.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">1. Satisfaction Guarantee</h2>
            <p>
              We are confident in the value and quality of our &quot;Inside the Edit&quot; online video
              editing course. If, for any reason, you are not satisfied with the course within the
              first 7 days from the date of purchase, you are eligible for a full refund of the
              course fee. No questions asked.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">2. Eligibility for Refund</h2>
            <p>
              To be eligible for a refund within the 7-day Satisfaction Guarantee period, you must
              meet the following conditions:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Your request for a refund must be made within 7 days from the date of purchase.</li>
              <li>You must have completed less than 10% of the course content.</li>
              <li>
                Your request for a refund must be submitted in writing to our customer support team
                at Hello@kabirmehra.com with the subject line &quot;Refund Request.&quot;
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">3. Refund Process</h2>
            <p>
              Upon receiving your written refund request, we will review your eligibility and
              process your refund as follows:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                If you meet the eligibility criteria and your request is within the 7-day period,
                we will initiate the refund immediately.
              </li>
              <li>The refund will be issued to the original payment method used for the course purchase.</li>
              <li>Please allow 3 Days for the refund to appear in your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">4. Exclusions</h2>
            <p>This Satisfaction Guarantee does not apply to the following situations:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Requests made after the 7-day period has expired.</li>
              <li>Users who have completed more than 10% of the course content.</li>
              <li>Refund requests due to a violation of our terms of use and policies.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">5. Contact Us</h2>
            <p>
              If you have any questions or need further assistance regarding our refund policy,
              please contact our customer support team at Hello@kabirmehra.com or Whatsapp us at
              +91 8700936219.
            </p>
          </section>

          <section>
            <p>
              Please note that this refund policy is subject to change, and any updates will be
              posted on our website. We recommend reviewing this policy periodically for any changes.
            </p>
            <p className="mt-4">
              Thank you for choosing &quot;Inside the Edit&quot; for your video editing education. We are
              dedicated to helping you achieve your creative goals, and we look forward to
              supporting your journey in the world of video editing.
            </p>
          </section>
        </div>

        <footer className="mt-12 border-t border-slate-200 py-6 text-center">
          <div className="text-sm font-semibold text-slate-700 sm:text-base">
            <a href="/terms" className="hover:text-slate-950 transition-colors">Term of Service</a>
            <span className="px-2 text-slate-400">|</span>
            <a href="/privacy" className="hover:text-slate-950 transition-colors">Privacy Policy</a>
            <span className="px-2 text-slate-400">|</span>
            <a href="/contact" className="hover:text-slate-950 transition-colors">Contact Us</a>
            <span className="px-2 text-slate-400">|</span>
            <a href="#refund-policy" className="hover:text-slate-950 transition-colors">Refund Policy</a>
            <span className="px-2 text-slate-400">|</span>
            <a href="/disclaimer" className="hover:text-slate-950 transition-colors">Disclaimer</a>
          </div>
          <div className="mt-2 text-sm font-medium text-slate-500 sm:text-base">
            Copyright © 2026 - ELNEB - All Rights Reserved
          </div>
        </footer>
      </div>
    </main>
  )
}