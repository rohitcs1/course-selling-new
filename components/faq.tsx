'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Is it a recorded course or a live course?',
    answer: 'It’s a recorded course which will be given to you in a video format. On signup, you will create account and password using which you can watch all the modules in one go.',
  },
  {
    question: 'Can you tell me what is the duration of the course?',
    answer: 'This course duration is 25 hours+',
  },
  {
    question: 'Is this course in Hindi or English language?',
    answer: 'This course is in Hindi language and a little bit of English.',
  },
  {
    question: 'How long will You get support for your Questions?',
    answer: 'We give lifetime support to our students so you can ask as many questions you want and we have a dedicated Facebook group also for the student, where you can ask as many questions as you like.',
  },
  {
    question: 'Which software I will learn in this Course?',
    answer: 'You’ll learn Adobe Premiere Pro which is the latest version of Adobe Premiere Pro editing software, to run Premiere Pro you need a Computer or Laptop.',
  },
  {
    question: 'Can You download the videos?',
    answer: 'The Videos are shared in the member’s area, you cannot download them however you can watch it anytime you want – any number of times you want. All you need is a Mobile/Laptop and an Internet connection.',
  },
  {
    question: 'Is there a guarantee?',
    answer: 'Absolutely! Inside The Edit has a 7-Day Satisfaction Guarantee. If you are not completely SATISFIED and ENLIGHTENED by the Inside The Edit Course, then contact us within 7 Days for refund, no questions asked!',
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
