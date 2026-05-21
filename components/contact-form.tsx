'use client'

import { Mail } from 'lucide-react'

type ContactFormProps = {
  supportEmail: string
}

export function ContactForm({ supportEmail }: ContactFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const problem = String(formData.get('problem') || '').trim()

    const body = [
      name ? `Name: ${name}` : '',
      email ? `Email: ${email}` : '',
      problem ? `Problem: ${problem}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    const subject = encodeURIComponent('Elneb EdTech support request')
    const mailtoUrl = `mailto:${supportEmail}?subject=${subject}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoUrl
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 rounded-2xl border border-slate-700 bg-slate-950/40 p-4">
      <input
        name="name"
        type="text"
        placeholder="Your name"
        className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-orange-500"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Your email"
        className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-orange-500"
        required
      />
      <textarea
        name="problem"
        placeholder="Describe your problem"
        rows={4}
        className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-orange-500"
        required
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
      >
        <Mail className="h-4 w-4" />
        Submit
      </button>
    </form>
  )
}