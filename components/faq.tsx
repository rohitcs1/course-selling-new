'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'How long do I have access to the course?',
    answer: 'You get lifetime access to all course materials. Once enrolled, you can watch and rewatch the videos anytime, anywhere. We also update the course regularly with new content and techniques.',
  },
  {
    question: 'Which software do I need?',
    answer: 'The course covers industry-standard tools including Adobe Premiere Pro, After Effects, and DaVinci Resolve. We provide tutorials for all platforms and you can choose based on your preference.',
  },
  {
    question: 'Is this course suitable for beginners?',
    answer: 'Absolutely! The course starts from the fundamentals and progressively moves to advanced techniques. Whether you\'re a complete beginner or have some experience, you\'ll find valuable content.',
  },
  {
    question: 'Do you provide project files and resources?',
    answer: 'Yes, all project files, presets, templates, and resources used in the course are provided for download. You can use them in your projects immediately after learning the techniques.',
  },
  {
    question: 'What if I\'m not satisfied with the course?',
    answer: 'We offer a 30-day money-back guarantee with no questions asked. If you\'re not happy with the course for any reason, we\'ll refund your money completely.',
  },
  {
    question: 'Will I get a certificate after completion?',
    answer: 'Yes, upon completing the course and projects, you\'ll receive a professional certificate of completion that you can add to your portfolio and share on LinkedIn.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-slate-950 to-slate-900">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-orange-400 font-semibold mb-2">Common Questions</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border border-slate-700 bg-slate-800 overflow-hidden hover:border-orange-400 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors text-left"
              >
                <span className="font-semibold text-white pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-orange-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 bg-slate-800/50 border-t border-slate-700">
                  <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-8 rounded-lg border border-slate-700 bg-slate-800">
          <p className="text-slate-300 mb-4">Still have questions?</p>
          <a
            href="mailto:support@insidetheedit.com"
            className="inline-flex items-center justify-center px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}
