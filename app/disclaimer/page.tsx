import React from 'react'

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen w-full bg-white px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          Disclaimer
        </h1>

        <div className="mt-10 space-y-8 text-lg leading-8 text-slate-700 sm:text-xl">
          <section>
            <p>
              The information on this website, https://kabirmehra.in/, is shared in good faith and
              for general information only. Kabir Mehra does not guarantee that every detail is
              complete, reliable, or fully accurate. Any action you take based on the information
              here is at your own responsibility, and Kabir Mehra will not be responsible for any
              loss or damage that may result from using this website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">External Links</h2>
            <p>
              This website may include links to third-party websites. While we try to share only
              helpful and trustworthy links, we do not control the content, availability, or
              practices of external sites. Including a link does not mean we endorse everything on
              that website. Site content can change without warning, sometimes before we have a
              chance to remove a link that no longer works or is no longer appropriate.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">Privacy and Terms on Other Sites</h2>
            <p>
              Once you leave our website, the destination site may apply its own privacy policy and
              terms of service. Those rules are outside our control, so we recommend reviewing the
              privacy policy and terms of any external website before sharing information or
              starting any business transaction there.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">Consent</h2>
            <p>
              By using this website, you acknowledge that you have read this disclaimer and agree
              to its terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">Updates</h2>
            <p>
              If we revise, expand, or change this document in the future, the updated version will
              be posted here prominently.
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

        <footer className="mt-12 border-t border-slate-200 py-6 text-center">
          <div className="text-sm font-semibold text-slate-700 sm:text-base">
            <a href="/terms" className="hover:text-slate-950 transition-colors">Term of Service</a>
            <span className="px-2 text-slate-400">|</span>
            <a href="/privacy" className="hover:text-slate-950 transition-colors">Privacy Policy</a>
            <span className="px-2 text-slate-400">|</span>
            <a href="/disclaimer" className="hover:text-slate-950 transition-colors">Disclaimer</a>
          </div>
          <div className="mt-2 text-sm font-medium text-slate-500 sm:text-base">
            Copyright 2024 - Kabir Mehra - All Rights Reserved
          </div>
        </footer>
      </div>
    </main>
  )
}