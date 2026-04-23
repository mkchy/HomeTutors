'use client'
import { useState } from 'react'

const reviews = [
  {
    name: 'Priyanka',
    rating: 5,
    message: 'Cuemath transformed my daughter\'s relationship with math completely. She went from dreading it to loving problem-solving sessions!',
  },
  {
    name: 'Debalina Das',
    rating: 5,
    message: 'The 1:1 sessions are incredibly effective. My son\'s confidence has skyrocketed and his school grades improved within 3 months.',
  },
  {
    name: 'Shivali Mehta',
    rating: 5,
    message: 'Outstanding teaching methodology. The tutors are patient, knowledgeable, and truly care about each child\'s progress.',
  },
  {
    name: 'Veeraraghavan',
    rating: 5,
    message: 'Best investment we made for our child\'s future. The curriculum is well-structured and the app makes practice fun and engaging.',
  },
  {
    name: 'Pawanesh',
    rating: 5,
    message: 'My child used to struggle with word problems. Now he solves them independently. The logical thinking approach really works!',
  },
  {
    name: 'Saima Malik',
    rating: 4,
    message: 'We had a great experience with Cuemath. He started in 2021 and was quite weak but since joining Cuemath he has been getting better grades.',
    previewMessage: 'We had a great experience with Cuemath. He started in 2021 and was quite weak but since joining Cuemath he has been getting better grades.',
    isExpanded: true,
  },
  {
    name: 'Garima',
    rating: 5,
    previewMessage: 'Cuemath keeps introducing new methods, systems, & make it interesting for learners. Unlike the traditional teaching system, it has innovated a different way of teaching.',
    message: 'Cuemath keeps introducing new methods, systems, & make it interesting for learners. Unlike the traditional teaching system, it has innovated a different way of teaching. My child loves every session!',
    isExpanded: true,
  },
  {
    name: 'Naisu Shah',
    rating: 5,
    message: 'Fantastic platform! The teachers are highly qualified and the personalized approach ensures my child gets exactly the help they need.',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <div
          key={i}
          className="w-6 h-6 flex items-center justify-center"
          style={{ backgroundColor: i <= count ? '#00b67a' : '#ddd', borderRadius: '2px' }}
        >
          <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      ))}
    </div>
  )
}

export default function TrustpilotSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">

        {/* Trustpilot header badge */}
        <div className="flex justify-center mb-10">
          <div
            className="flex items-center gap-3 px-8 py-4 border-2 border-gray-800 rounded-sm"
            style={{ minWidth: '320px', justifyContent: 'center' }}
          >
            <span className="text-xl font-black text-gray-900">Rated 4.9+ on</span>
            <div className="flex items-center gap-1.5">
              {/* Trustpilot star icon */}
              <div className="w-7 h-7 flex items-center justify-center" style={{ backgroundColor: '#00b67a', borderRadius: '2px' }}>
                <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">Trustpilot</span>
            </div>
          </div>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-300">
          {reviews.map((review, i) => {
            const isHovered = hoveredCard === i
            const hasPreview = !!review.previewMessage
            const showExpanded = review.isExpanded && !isHovered
            const showHoverMessage = isHovered && !hasPreview

            // Determine if this card naturally shows text (previewMessage set)
            const showPreviewText = hasPreview && !isHovered

            return (
              <div
                key={i}
                className="relative border border-gray-200 transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: isHovered ? '#f0fdf8' : '#fafafa',
                  borderColor: isHovered ? '#00b67a' : '#e5e7eb',
                  boxShadow: isHovered ? 'inset 0 0 0 2px #00b67a' : 'none',
                }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Always-visible top row */}
                <div className="flex items-center gap-3 px-5 py-4">
                  <StarRating count={review.rating} />
                  <span className="font-bold text-gray-900 text-sm">{review.name}</span>
                </div>

                {/* Preview text (shown by default on Garima & Saima Malik cards) */}
                {showPreviewText && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 text-xs leading-relaxed">{review.previewMessage}</p>
                  </div>
                )}

                {/* Hidden message revealed on hover */}
                <div
                  className="overflow-hidden transition-all duration-400"
                  style={{
                    maxHeight: isHovered ? '200px' : (hasPreview ? '0px' : '0px'),
                    opacity: isHovered ? 1 : 0,
                    transition: 'max-height 0.35s ease, opacity 0.3s ease',
                  }}
                >
                  <div className="px-5 pb-5">
                    {/* Green accent line */}
                    <div className="w-8 h-0.5 rounded-full mb-3" style={{ backgroundColor: '#00b67a' }} />
                    <p className="text-gray-700 text-xs leading-relaxed">{review.message}</p>
                  </div>
                </div>

                {/* Hover hint dot — visible only when no preview text and not hovered */}
                {!hasPreview && !isHovered && (
                  <div className="absolute bottom-3 right-4 flex items-center gap-1 opacity-40">
                    <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#00b67a', animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#00b67a', animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#00b67a', animationDelay: '300ms' }} />
                  </div>
                )}

                {/* Hover: green top border flash */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-300"
                  style={{ backgroundColor: '#00b67a', opacity: isHovered ? 1 : 0 }}
                />
              </div>
            )
          })}
        </div>

        {/* Trustpilot footer note */}
        <div className="text-center mt-6 flex items-center justify-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center rounded-sm" style={{ backgroundColor: '#00b67a' }}>
            <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <span className="text-xs text-gray-400">Reviews from verified Trustpilot users · Hover a card to read the full review</span>
        </div>

      </div>
    </section>
  )
}
