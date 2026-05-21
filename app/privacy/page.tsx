import React from 'react'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-[#072045] py-12">
        <div className="mx-auto max-w-6xl px-6 text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Privacy Policy</h1>
        </div>
      </header>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6 text-left text-slate-900">
          <p className="mb-4">Last updated: 18 May 2026</p>

          <section className="mb-6 text-left">
            <h2 className="text-xl font-bold mb-2">Introduction</h2>
            <p>
              Elneb EdTech ("we", "us", "our") respects your privacy and is committed to
              protecting your personal data. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our website.
            </p>
          </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Information We Collect</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Information you provide:</strong> name, email address, phone number,
            billing and order details, and any other information you submit when enrolling or
            contacting us.
          </li>
          <li>
            <strong>Automatically collected information:</strong> usage data, IP address,
            browser type, device identifiers, pages viewed, and cookies or similar tracking
            technologies.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">How We Use Your Information</h2>
        <p>We may use your information to:</p>
        <ul className="list-disc list-inside">
          <li>provide, operate, and maintain our services;</li>
          <li>process transactions and send related information, including invoices and confirmations;</li>
          <li>send you technical notices, updates, security alerts, and support messages;</li>
          <li>respond to your comments, questions, and requests;</li>
          <li>monitor and analyze trends, usage and activities to improve our services;</li>
          <li>prevent, detect and investigate fraud, abuse, or other illegal activity.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Cookies and Tracking</h2>
        <p>
          We use cookies and similar tracking technologies to track activity on our Service and
          hold certain information. You can instruct your browser to refuse all cookies or to
          indicate when a cookie is being sent, but some parts of the Service may not function
          properly without cookies.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Disclosure of Your Information</h2>
        <p>
          We may share information with service providers who perform services on our behalf
          (payment processors, email providers, analytics providers), as required by law, or to
          protect our rights. We do not sell your personal information to third parties.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Data Security</h2>
        <p>
          We take reasonable administrative, technical and physical safeguards designed to
          protect your personal information. However, no method of transmission over the
          Internet or electronic storage is 100% secure and we cannot guarantee absolute security.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Children's Privacy</h2>
        <p>
          Our Service is not directed to children under 13. We do not knowingly collect personal
          information from children under 13. If you become aware that a child has provided us
          with personal data, please contact us and we will delete such information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Your Rights</h2>
        <p>
          Subject to applicable law, you may have rights to access, correct, update, or request
          deletion of your personal data. To exercise these rights, please contact us at
          rasoiroom31@gmail.com.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will post the updated policy on
          this page with a revised "Last updated" date.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, contact us at rasoiroom31@gmail.com.</p>
      </section>
        </div>
      </section>

      <footer className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-700 text-center">
        <div className="mb-2">
          <a href="/terms" className="hover:underline mr-2">Term of Service</a>
          <span className="px-2">|</span>
          <a href="/privacy" className="hover:underline mx-2">Privacy Policy</a>
          <span className="px-2">|</span>
          <a href="/contact" className="hover:underline mx-2">Contact Us</a>
          <span className="px-2">|</span>
          <a href="/refund-policy" className="hover:underline mx-2">Refund Policy</a>
          <span className="px-2">|</span>
          <a href="/disclaimer" className="hover:underline ml-2">Disclaimer</a>
        </div>
        <div>Copyright 2024 - Kabir Mehra - All Rights Reserved</div>
      </footer>
    </main>
  )
}
