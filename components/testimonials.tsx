'use client'

import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Aisha Patel',
    role: 'Content Creator',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5,
    text: 'This course completely transformed my editing skills. The instructor breaks down complex concepts beautifully and the real-world projects are incredibly valuable.',
  },
  {
    name: 'Rahul Singh',
    role: 'Freelance Editor',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
    text: 'Worth every penny! I\'ve applied what I learned immediately to my client projects and doubled my rates. The techniques taught here are professional-grade.',
  },
  {
    name: 'Priya Sharma',
    role: 'YouTube Creator',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 5,
    text: 'The best investment I\'ve made for my content. My video quality has improved dramatically, and my audience engagement is up 300%. Highly recommend!',
  },
]

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-slate-950 to-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-orange-400 font-semibold mb-2">Success Stories</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What Our Students Say</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Join hundreds of satisfied students who have transformed their video editing skills
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-xl bg-slate-800 border border-slate-700 p-8 hover:border-orange-400 transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                ))}
              </div>

              <p className="text-slate-300 mb-6 leading-relaxed">&quot;{testimonial.text}&quot;</p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
