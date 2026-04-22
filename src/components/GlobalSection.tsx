'use client'
import { useEffect, useRef, useState } from 'react'
import { Check, ArrowUpRight, BookOpen, Users, Award } from 'lucide-react'

const checkItems = [
  { text: 'Get access to 12,000+ of our top courses', icon: BookOpen },
  { text: 'Popular topic to learn now in our online courses for student', icon: Users },
  { text: 'Find the right instructor for you', icon: Award },
]

const stats = [
  { value: '12K+', label: 'Courses' },
  { value: '98%', label: 'Success Rate' },
  { value: '50K+', label: 'Students' },
]

export default function GlobalSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const left = sectionRef.current?.querySelector('.left-col')
          const right = sectionRef.current?.querySelector('.right-col')
          left?.classList.add('opacity-100', 'translate-x-0')
          left?.classList.remove('opacity-0', '-translate-x-16')
          setTimeout(() => {
            right?.classList.add('opacity-100', 'translate-x-0')
            right?.classList.remove('opacity-0', 'translate-x-16')
          }, 250)
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-28 bg-white relative overflow-hidden">
      {/* Subtle bg decoration */}
      <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f43f5e, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* ── LEFT: image collage ── */}
          <div className="left-col opacity-0 -translate-x-16 transition-all duration-700 relative min-h-[480px]">

            {/* Soft gradient background plate */}
            <div className="absolute top-6 left-6 w-72 h-[380px] rounded-[2.5rem]"
              style={{ background: 'linear-gradient(145deg, #ede9fe 0%, #dbeafe 100%)' }} />

            {/* Floating ring decoration */}
            <div className="absolute -top-3 left-2 w-8 h-8 rounded-full border-[3px] border-indigo-400 opacity-70 animate-bounce"
              style={{ animationDuration: '2.4s' }} />
            <div className="absolute top-10 left-1 w-4 h-4 rounded-full bg-indigo-500" />

            {/* Main image */}
            <div className="relative z-10 w-72 h-[380px] rounded-[2.5rem] overflow-hidden shadow-2xl ml-10 group">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop"
                alt="Instructor"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay shimmer on hover */}
              <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-all duration-500" />
            </div>

            {/* Small inset image */}
            <div className="absolute bottom-4 right-0 w-48 h-40 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20 group">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=220&h=180&fit=crop"
                alt="Student"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Floating stat badge */}
            <div className="absolute -right-4 top-16 z-30 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-indigo-50 animate-float">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                style={{ backgroundColor: '#eef2ff' }}>🏆</div>
              <div>
                <p className="text-xs text-gray-400 leading-none">Top Rated</p>
                <p className="font-black text-gray-900 text-sm">4.9 / 5.0</p>
              </div>
            </div>

            {/* Floating students badge */}
            <div className="absolute bottom-20 -left-4 z-30 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-indigo-50"
              style={{ animation: 'float 3s ease-in-out 1s infinite' }}>
              <div className="flex -space-x-2">
                {[1,2,3].map(n => (
                  <div key={n} className="w-7 h-7 rounded-full overflow-hidden border-2 border-white">
                    <img src={`https://randomuser.me/api/portraits/${n%2===0?'women':'men'}/${n*10}.jpg`}
                      alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <p className="font-black text-gray-900 text-sm">50K+</p>
                <p className="text-xs text-gray-400">Students</p>
              </div>
            </div>

            {/* Gold sparkle */}
            <div className="absolute top-1/2 -right-6 z-10 animate-spin"
              style={{ animationDuration: '8s' }}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="#fbbf24">
                <path d="M16 0 L19 13 L32 16 L19 19 L16 32 L13 19 L0 16 L13 13 Z" />
              </svg>
            </div>

            {/* Bottom red ring */}
            <div className="absolute -bottom-3 left-4 w-12 h-12 rounded-full border-4 border-rose-400 opacity-60 animate-pulse" />
          </div>

          {/* ── RIGHT: content ── */}
          <div className="right-col opacity-0 translate-x-16 transition-all duration-700 space-y-7">

            {/* Badge */}
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{ backgroundColor: '#eef2ff', color: '#6366f1' }}>
              🌍 Global Reach
            </span>

            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              We Are Providing The{' '}
              <span className="relative inline-block">
                <span style={{ color: '#4F46E5' }}>Online Course</span>
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                  <path d="M0 5 Q100 0 200 5" stroke="#a5b4fc" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </svg>
              </span>{' '}
              In India.
            </h2>

            {/* Description */}
            <p className="text-gray-500 leading-relaxed text-sm max-w-md">
              We offer a brand new approach to the most basic learning paradigms. Choose from a wide range of
              learning options and gain new skills with world-class educators and institutions.
            </p>

            {/* Inline mini stats */}
            <div className="flex gap-6 py-2">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-black" style={{ color: '#4F46E5' }}>{s.value}</p>
                  <p className="text-xs text-gray-400 font-medium">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-indigo-100 via-indigo-300 to-transparent" />

            {/* Checklist */}
            <div className="space-y-3">
              {checkItems.map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 cursor-default"
                    style={{
                      backgroundColor: hovered === i ? '#eef2ff' : 'transparent',
                      transform: hovered === i ? 'translateX(4px)' : 'translateX(0)',
                    }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{
                        backgroundColor: hovered === i ? '#4F46E5' : '#eef2ff',
                      }}
                    >
                      <Check className="w-4 h-4 transition-colors duration-300"
                        style={{ color: hovered === i ? 'white' : '#4F46E5' }} />
                    </div>
                    <p className="font-semibold text-gray-800 text-sm">{item.text}</p>
                  </div>
                )
              })}
            </div>

            {/* CTA Button */}
            <button
              className="group flex items-center gap-3 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 transform"
              style={{ backgroundColor: '#4F46E5', boxShadow: '0 4px 20px rgba(79,70,229,0.3)' }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#4338ca'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(79,70,229,0.45)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#4F46E5'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(79,70,229,0.3)'
              }}
            >
              View All Courses
              <span className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
