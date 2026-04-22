'use client'
import { useState } from 'react'

const stories = [
  {
    name: 'NAYIL AHMAD',
    title: 'Grade 7 Honors Student Solving Grade 9 Math',
    desc: 'Cuemath learner, a Grade 7 Honors Math student solving Grade 9 content, shines in competitions like the Pennsylvania Mathematics League and Math Challenge.',
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=500&fit=crop',
    bgColor: '#b2f0e8',
  },
  {
    name: 'PRIYA SHARMA',
    title: 'National Math Olympiad Silver Medalist',
    desc: 'A dedicated Cuemath student who won the silver medal at the National Math Olympiad after just 6 months of personalized coaching.',
    img: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=500&fit=crop',
    bgColor: '#fce4d6',
  },
  {
    name: 'ARJUN MEHTA',
    title: 'From Math Anxiety to Top of His Class',
    desc: 'Arjun overcame his fear of math and now leads his class with confidence, crediting Cuemath\'s 1:1 personalized sessions.',
    img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&h=500&fit=crop',
    bgColor: '#e8f4fd',
  },
]

const galleryImages = [
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&h=400&fit=crop',
]

export default function CommunitySection() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + stories.length) % stories.length)
  const next = () => setCurrent((c) => (c + 1) % stories.length)

  const story = stories[current]

  return (
    <section 
      className="py-20"
      style={{ background: 'linear-gradient(135deg, #fdf4ff 0%, #fce7f3 20%, #ede9fe 45%, #dbeafe 70%, #d1fae5 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-3">
            Community of 200,000+ MathFit Kids
          </h2>
          <p className="text-gray-500 text-base">
            Heartfelt stories of transformations, learnings, and achievements of cuemath students!
          </p>
        </div>

        {/* Slider row */}
        <div className="flex gap-0 overflow-hidden rounded-none">
          {/* Nav + story card */}
          <div className="flex flex-shrink-0">
            {/* Arrow buttons */}
            <div className="flex flex-col">
              <button
                onClick={prev}
                className="w-14 h-14 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors text-lg font-bold"
              >
                ←
              </button>
              <button
                onClick={next}
                className="w-14 h-14 bg-gray-200 text-black flex items-center justify-center hover:bg-gray-300 transition-colors text-lg font-bold"
              >
                →
              </button>
            </div>

            {/* Story text card */}
            <div
              className="w-56 p-6 flex flex-col justify-end"
              style={{ backgroundColor: story.bgColor, minHeight: '360px' }}
            >
              <h3 className="font-black text-gray-900 text-lg leading-snug mb-2">{story.title}</h3>
              <p className="text-gray-700 text-xs leading-relaxed mb-3">{story.desc}</p>
              <a href="#" className="font-black text-gray-900 text-sm underline">Read more</a>
            </div>
          </div>

          {/* Featured image with name tag */}
          <div className="relative flex-shrink-0 w-64 h-[360px]">
            <img
              src={story.img}
              alt={story.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold text-gray-900 tracking-wider">
              {story.name}
            </div>
          </div>

          {/* Gallery images */}
          <div className="flex flex-1 overflow-hidden">
            {galleryImages.map((src, i) => (
              <div
                key={i}
                className="flex-1 h-[360px] overflow-hidden relative"
                style={{ opacity: i === 0 ? 1 : i === 1 ? 0.85 : i === 2 ? 0.7 : 0.5 }}
              >
                <img
                  src={src}
                  alt={`Student ${i + 1}`}
                  className="w-full h-full object-cover hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
