'use client'

import { CheckCircle, Film, Layers, Zap } from 'lucide-react'

const modules = [
  {
    icon: Film,
    title: 'Fundamentals of Video Editing',
    description: 'Learn the basics of editing, timeline management, and essential workflows.',
    topics: ['Editing principles', 'Timeline basics', 'Keyboard shortcuts', 'Audio syncing'],
  },
  {
    icon: Layers,
    title: 'Advanced Effects & Transitions',
    description: 'Master professional effects, color grading, and advanced transitions.',
    topics: ['Color correction', 'Effects library', 'Motion graphics', 'Transitions'],
  },
  {
    icon: Zap,
    title: 'Real-World Projects',
    description: 'Apply your skills to real projects and build a professional portfolio.',
    topics: ['Music videos', 'Cinematic edits', 'YouTube content', 'Corporate videos'],
  },
]

type SyllabusProps = {
  checkoutHref: string
}

export function Syllabus({ checkoutHref }: SyllabusProps) {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-orange-500 font-semibold mb-2">Course Content</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">What You&apos;ll Learn</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comprehensive curriculum covering everything from basics to advanced professional techniques
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {modules.map((module, index) => {
            const Icon = module.icon
            return (
              <div
                key={index}
                className="group rounded-xl border border-slate-200 bg-white p-8 hover:border-orange-400 hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4 inline-flex rounded-lg bg-orange-100 p-3">
                  <Icon className="w-6 h-6 text-orange-600" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{module.title}</h3>
                <p className="text-slate-600 mb-6">{module.description}</p>

                <div className="space-y-3">
                  {module.topics.map((topic, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <span className="text-slate-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href={checkoutHref}
            className="inline-flex items-center justify-center w-full md:w-1/2 mx-auto px-8 py-5 bg-orange-500 text-white font-extrabold rounded-xl hover:bg-orange-600 transition-transform duration-200 animate-wiggle-x text-lg"
          >
            Enroll Now
          </a>
        </div>
      </div>
    </section>
  )
}
