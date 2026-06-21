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
    <section className="py-10 md:py-14 bg-white">
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
          <style>{`
            @keyframes bounce-text {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-8px); }
            }
            .bounce-letter {
              display: inline-block;
              animation: bounce-text 0.6s ease-in-out infinite;
              margin: 0 0.32rem;
              letter-spacing: 0.25em;
            }
          `}</style>
          <a
            href={checkoutHref}
            className="group inline-flex items-center justify-center w-full md:w-1/2 mx-auto px-8 py-4 bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-500 text-black font-extrabold rounded-lg hover:from-yellow-200 hover:via-yellow-300 hover:to-yellow-400 transition-all duration-300 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <span className="bounce-letter" style={{ animationDelay: '0s' }}>E</span>
            <span className="bounce-letter" style={{ animationDelay: '0.1s' }}>n</span>
            <span className="bounce-letter" style={{ animationDelay: '0.2s' }}>r</span>
            <span className="bounce-letter" style={{ animationDelay: '0.3s' }}>o</span>
            <span className="bounce-letter" style={{ animationDelay: '0.4s' }}>l</span>
            <span className="bounce-letter" style={{ animationDelay: '0.5s' }}>l</span>
            <span> </span>
            <span className="bounce-letter" style={{ animationDelay: '0.6s' }}>N</span>
            <span className="bounce-letter" style={{ animationDelay: '0.7s' }}>o</span>
            <span className="bounce-letter" style={{ animationDelay: '0.8s' }}>w</span>
          </a>
        </div>
      </div>
    </section>
  )
}
