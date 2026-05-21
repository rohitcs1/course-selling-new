import React from 'react'

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-[#072045] py-12">
        <div className="mx-auto max-w-6xl px-6 text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">DISCLAIMER</h1>
        </div>
      </header>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6 text-left text-slate-700">
          <div className="mt-10 space-y-8 text-lg leading-8 sm:text-xl">
          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">Disclaimer for ELNEB EdTech</h2>
            <p>
              All the information on this website - https://course.elneb.in/ - is published in good faith and for general information purpose only. ELNEB EdTech does not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website (ELNEB EdTech), is strictly at your own risk. ELNEB EdTech will not be liable for any losses and/or damages in connection with the use of our website.
            </p>

            <p>
              From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link which may have gone 'bad'.
            </p>

            <p>
              Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control. Please be sure to check the Privacy Policies of these sites as well as their "Terms of Service" before engaging in any business or uploading any information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">Consent</h2>
            <p>
              By using our website, you hereby consent to our disclaimer and agree to its terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">Update</h2>
            <p>
              Should we update, amend or make any changes to this document, those changes will be prominently posted here.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">Refund Policy</h2>
            <p>
              <a href="/refund-policy" className="font-semibold text-orange-600 hover:underline">
                Click here to check return/refund policy
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">Contact Us</h2>
            <p>
              <a href="/contact" className="font-semibold text-orange-600 hover:underline">
                Click here to contact us
              </a>
            </p>
          </section>
          </div>
        </div>
      </section>

      <footer className="mt-12 border-t border-slate-200 py-6 text-center">
          <div className="text-sm font-semibold text-slate-700 sm:text-base">
            <a href="/terms" className="hover:text-slate-950 transition-colors">Term of Service</a>
            <span className="px-2 text-slate-400">|</span>
            <a href="/privacy" className="hover:text-slate-950 transition-colors">Privacy Policy</a>
            <span className="px-2 text-slate-400">|</span>
            <a href="/disclaimer" className="hover:text-slate-950 transition-colors">Disclaimer</a>
          </div>
          <div className="mt-2 text-sm font-medium text-slate-500 sm:text-base relative bottom-8">
            Copyright © 2026 - ELNEB EdTech - All Rights Reserved
          </div>
        </footer>
    </main>
  )
}