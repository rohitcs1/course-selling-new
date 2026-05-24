'use client'

type TestimonialsProps = {
  checkoutHref: string
}

// Use raw screenshots from `public/image/` as requested by the admin.
const IMAGE_FILES = [
  'image1.jpeg',
  'image2.jpeg',
  'image3.jpeg',
  'image4.jpeg',
  'image5.jpeg',
  'image6.jpeg',
  'image7.jpeg',
]

export function Testimonials({ checkoutHref }: TestimonialsProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-orange-500 font-semibold mb-2">Real Student Screenshots</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Hear from Our Students</h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">Screenshots from students — no styled cards, just clear images so visitors can verify authenticity.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {IMAGE_FILES.map((file) => (
            <div key={file} className="overflow-hidden rounded-md bg-white p-[4%]">
              <img
                src={`/image/${file}`}
                onError={(e: any) => { e.currentTarget.src = '/placeholder.jpg' }}
                alt="student screenshot"
                className="block w-full h-auto max-w-full object-contain border border-slate-200 shadow-sm hover:shadow-lg transform transition-transform duration-300 hover:scale-[1.01]"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={checkoutHref}
            className="inline-flex items-center justify-center w-full md:w-1/2 mx-auto px-8 py-4 bg-yellow-400 text-black font-extrabold rounded-lg hover:bg-yellow-300 transition-transform duration-200 text-lg"
          >
            Apply Now
          </a>
        </div>
      </div>
    </section>
  )
}
