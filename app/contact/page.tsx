import React from 'react'
import { Phone, Mail, MessageSquare } from 'lucide-react'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-[#072045] py-12">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Contact Us</h1>
        </div>
      </header>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Have any questions? We'd love to hear from you!</h2>
          <p className="mt-2 text-slate-600">Our Working hours is from Monday to Saturday (10 Am to 07:30 Pm)</p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="flex flex-col items-center">
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-black text-white shadow-lg">
                <MessageSquare className="h-20 w-20" />
              </div>
              <h3 className="mt-6 text-lg font-semibold">Whatsapp us at +91 7250939051</h3>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-black text-white shadow-lg">
                <Mail className="h-20 w-20" />
              </div>
              <h3 className="mt-6 text-lg font-semibold">Email us at rasoiroom31@gmail.com</h3>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-black text-white shadow-lg">
                <Phone className="h-20 w-20" />
              </div>
              <h3 className="mt-6 text-lg font-semibold">Call us at +91 7250939051</h3>
            </div>
          </div>

          <p className="mt-10 text-slate-700">Address:Bankey Bazar, Sherghati, Gaya, Bihar, 824217</p>
        </div>
      </section>

      <footer className="border-t bg-white py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-slate-600">
          <div className="mb-2">
            <a href="/terms" className="mx-2 hover:underline">Terms of Service</a>
            |
            <a href="/privacy" className="mx-2 hover:underline">Privacy Policy</a>
            |
            <a href="/contact" className="mx-2 hover:underline">Contact Us</a>
            |
            <a href="/refund-policy" className="mx-2 hover:underline">Refund Policy</a>
            |
            <a href="/disclaimer" className="mx-2 hover:underline">Disclaimer</a>
          </div>
          <div className="text-xs text-slate-500">Copyright 2026 - ELNEB - All Rights Reserved</div>
        </div>
      </footer>
    </main>
  )
}
