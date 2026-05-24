'use client'

import { CheckCircle, Film, Star, Zap } from 'lucide-react'

const reviews = [
  {
    name: 'Abhishek K.',
    rating: 5,
    description:
      '"I am Fully satisfied by the course that has been offered to me and I have learnt many lesson that were not known to me before. Thank you sir." - Abhishek K.',
  },
  {
    name: 'Rakesh',
    rating: 5,
    description:
      '"Inside the edit course is a game-changer! From basics to advanced skills, it been an incredible journey. Clear instruction and expert guidance have transformed my editing abilities. Highly recommended" - Rakesh',
  },
  {
    name: 'Valbhavi S.',
    rating: 5,
    description:
      '"Each and every thing is covered for video editing in a structured format and you can start editing for clients right after completing the course." - Valbhavi S.',
  },
]

const modules = [
  {
    icon: Film,
    title: 'Fundamentals of Video Editing',
    topics: ['Color Correction', 'Cinematic Color Grading', 'Wedding Invitation Editing', 'Animated Title Making', 'Ultimate Effect Making', 'Ai Video Creation & Editing'],
  },
  {
    icon: Film,
    title: 'Advanced Effects & Transitions',
    topics: ['Multi-Cam Editing', 'Green Screen Editing', 'YouTube Editing', 'Color Conversion Effect', 'Advertisement Editing', 'Ai Video Avatar Creation'],
  },
  {
    icon: Zap,
    title: 'Real-World Projects',
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
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-1 text-amber-400">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-base leading-7 text-slate-700">{review.description}</p>
              <p className="mt-4 text-sm font-semibold text-slate-900">{review.name}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">What You Are Going To Learn...</h2>
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
            className="inline-flex items-center justify-center w-full md:w-1/2 mx-auto px-8 py-5 bg-yellow-400 text-black font-extrabold rounded-xl hover:bg-yellow-300 transition-transform duration-200 animate-wiggle-x text-lg"
          >
            Apply Now
          </a>
        </div>
      </div>
    </section>
  )
}
