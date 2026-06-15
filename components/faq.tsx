'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Is it a recorded course or a live course?',
    answer: 't is a recorded course that will be provided in video format. After signup, you will get an account and password through which you can access and watch all the modules easily.',
  },
  {
    question: 'Can you tell me what is the duration of the course?',
    answer: 'The total duration of this course is 30+ hours.',
  },
  {
    question: 'Is this course in Hindi or English language?',
    answer: 'This course is available in Hindi with a small amount of English.',
  },
  {
    question: 'How long will You get support for your Questions?',
    answer: 'We provide lifetime support to our students, so you can ask unlimited questions anytime. We also have a dedicated Facebook group for students where you can freely ask your doubts and queries.',
  },
  {
    question: 'Which software I will learn in this Course?',
    answer: 'You will learn Adobe Premiere Pro, the latest version of the editing software. To use Premiere Pro, you will need a computer or laptop.',
  },
  {
    question: 'Can You download the videos?',
    answer: 'The videos are available in the member’s area and cannot be downloaded. However, you can watch them anytime and as many times as you want using a mobile, laptop, and internet connection.',
  },
  {
    question: 'Is there a guarantee?',
    answer: 'Yes! Inside The Edit comes with a 7-Day Satisfaction Guarantee. If you are not fully satisfied with the course, you can contact us within 7 days for a refund without any questions asked!',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-slate-950 to-slate-900">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">FREQUENTLY ASKED QUESTIONS</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

function FAQItem({ faq, isOpen, onToggle }: { faq: { question: string; answer: string }; isOpen: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    if (isOpen) {
      const scrollHeight = el.scrollHeight
      el.style.height = `${scrollHeight}px`
    } else {
      el.style.height = '0px'
    }
  }, [isOpen])

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 overflow-hidden hover:border-orange-400 transition-colors">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors text-left"
      >
        <span className="font-semibold text-white pr-4">{faq.question}</span>
        <ChevronDown className={`w-5 h-5 text-orange-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div
        ref={contentRef}
        style={{ height: 0, overflow: 'hidden', transition: 'height 300ms ease' }}
        className="px-6 bg-slate-800/50 border-t border-slate-700"
      >
        <div className="py-4">
          <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  )
}
