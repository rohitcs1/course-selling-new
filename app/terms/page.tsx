import React from 'react'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <main className="min-h-screen w-full bg-white px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">Terms of Service</h1>
        <h2 className="mt-3 text-2xl font-bold text-slate-700 sm:text-3xl">Website Terms and Conditions of Us</h2>

        <div className="mt-10 space-y-8 text-lg leading-8 text-slate-700 sm:text-xl">
          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">1. Terms</h2>
            <p>
          By accessing this Website, accessible from https://kabirmehra.in/, you are agreeing to be
          bound by these Website Terms and Conditions of Use and agree that you are responsible
          for the agreement with any applicable local laws. If you disagree with any of these
          terms, you are prohibited from accessing this site. The materials contained in this
          Website are protected by copyright and trade mark law.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">2. Use License</h2>
            <p>
          Permission is granted to temporarily download one copy of the materials on
          kabirmehra.in Website for personal, non-commercial transitory viewing only. This is the
          grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose or for any public display;</li>
              <li>attempt to reverse engineer any software contained on kabirmehra.in&apos;s Website;</li>
              <li>remove any copyright or other proprietary notations from the materials; or</li>
              <li>transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
            </ul>
            <p className="mt-4">
          This will let Mehra Enterprises to terminate upon violations of any of these
          restrictions. Upon termination, your viewing right will also be terminated and you
          should destroy any downloaded materials in your possession whether it is printed or
          electronic format.
            </p>
          </section>

          <section id="disclaimer">
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">3. Disclaimer</h2>
            <p>
          All the materials on Mehra Enterprises's Website are provided "as is". Mehra
          Enterprises makes no warranties, may it be expressed or implied, therefore negates all
          other warranties. Furthermore, Mehra Enterprises does not make any representations
          concerning the accuracy or reliability of the use of the materials on its Website or
          otherwise relating to such materials or any sites linked to this Website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">4. Limitations</h2>
            <p>
          Mehra Enterprises or its suppliers will not be hold accountable for any damages that will
          arise with the use or inability to use the materials on Mehra Enterprises's Website, even
          if Mehra Enterprises or an authorize representative of this Website has been notified,
          orally or written, of the possibility of such damage. Some jurisdiction does not allow
          limitations on implied warranties or limitations of liability for incidental damages,
          these limitations may not apply to you.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">5. Revisions and Errata</h2>
            <p>
          The materials appearing on Mehra Enterprises's Website may include technical,
          typographical, or photographic errors. Mehra Enterprises will not promise that any of the
          materials in this Website are accurate, complete, or current. Mehra Enterprises may
          change the materials contained on its Website at any time without notice. Mehra
          Enterprises does not make any commitment to update the materials.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">6. Links</h2>
            <p>
          Mehra Enterprises has not reviewed all of the sites linked to its Website and is not
          responsible for the contents of any such linked site. The presence of any link does not
          imply endorsement by Mehra Enterprises of the site. The use of any linked website is at
          the user's own risk.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">7. Site Terms of Use Modifications</h2>
            <p>
          Mehra Enterprises may revise these Terms of Use for its Website at any time without
          prior notice. By using this Website, you are agreeing to be bound by the current version
          of these Terms and Conditions of Use.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">8. Your Privacy</h2>
            <p>Please read our Privacy Policy.</p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-slate-950">9. Governing Law</h2>
            <p>
          Any claim related to Mehra Enterprises's Website shall be governed by the laws of in
          without regards to its conflict of law provisions.
            </p>
          </section>

          <p className="pt-4 text-sm font-medium text-slate-500">Last updated: 18 May 2026</p>
        </div>

        <footer className="mt-12 border-t border-slate-200 py-6 text-center">
          <div className="text-sm font-semibold text-slate-700 sm:text-base">
              <Link href="/terms" className="hover:text-slate-950 transition-colors">Term of Service</Link>
            <span className="px-2 text-slate-400">|</span>
              <Link href="/privacy" className="hover:text-slate-950 transition-colors">Privacy Policy</Link>
            <span className="px-2 text-slate-400">|</span>
              <Link href="#disclaimer" className="hover:text-slate-950 transition-colors">Disclaimer</Link>
          </div>
          <div className="mt-2 text-sm font-medium text-slate-500 sm:text-base">
            Copyright © 2026 - ELNEB - All Rights Reserved
          </div>
        </footer>
      </div>
    </main>
  )
}
