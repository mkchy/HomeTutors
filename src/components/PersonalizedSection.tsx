'use client'
import { useEffect, useRef, useState } from 'react'

const students = [
  { img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=300&fit=crop', bg: '#f5a623', label: 'Grade 5' },
  { img: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=300&h=300&fit=crop', bg: '#56c1f5', label: 'Grade 7' },
  { img: 'https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?w=300&h=300&fit=crop', bg: '#f472b6', label: 'Grade 3' },
  { img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop', bg: '#34d399', label: 'Grade 9' },
]

const goals = [
  { icon: '🏠', label: 'GET AHEAD AT SCHOOL',        color: '#f5a623', bg: '#fffbeb' },
  { icon: '🏆', label: 'PREPARE FOR COMPETITIONS',   color: '#f87171', bg: '#fff5f5' },
  { icon: '🌍', label: 'APPLY MATH IN REAL WORLD',   color: '#a78bfa', bg: '#f5f3ff' },
  { icon: '🧠', label: 'BUILD LOGICAL THINKING',     color: '#34d399', bg: '#f0fdf4' },
]

export default function PersonalizedSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeGoal, setActiveGoal] = useState<number | null>(null)
  const [hoveredStudent, setHoveredStudent] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const items = sectionRef.current?.querySelectorAll('.reveal-item')
          items?.forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('opacity-100', 'translate-y-0', 'scale-100')
              el.classList.remove('opacity-0', 'translate-y-8', 'scale-95')
            }, i * 120)
          })
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-28 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f5a623, transparent)' }} />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #a78bfa, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-16 reveal-item opacity-0 translate-y-8 scale-95 transition-all duration-500">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
            style={{ backgroundColor: '#fef9c3', color: '#b45309' }}>
            ✨ Tailored For Every Child
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
            A Personalized{' '}
            <span className="relative inline-block">
              <span style={{ color: '#f5a623' }}>Math™</span>
              <svg className="absolute -bottom-1 left-0 w-full" height="5" viewBox="0 0 120 5" preserveAspectRatio="none">
                <path d="M0 4 Q60 0 120 4" stroke="#fde68a" strokeWidth="3" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
            {' '}Journey for Your Child
          </h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto text-base leading-relaxed">
            Every child learns differently. Our adaptive platform creates a unique path just for them.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-0 rounded-3xl overflow-hidden shadow-xl reveal-item opacity-0 translate-y-8 scale-95 transition-all duration-500">

            {/* 2×2 student grid */}
            <div className="grid grid-cols-2">
              {students.map((s, i) => (
                <div
                  key={i}
                  className="aspect-square flex items-center justify-center overflow-hidden relative cursor-pointer"
                  style={{ backgroundColor: s.bg }}
                  onMouseEnter={() => setHoveredStudent(i)}
                  onMouseLeave={() => setHoveredStudent(null)}
                >
                  {/* Circle image */}
                  <div
                    className="w-4/5 h-4/5 rounded-full overflow-hidden border-4 border-white/40 transition-transform duration-500"
                    style={{ transform: hoveredStudent === i ? 'scale(1.08)' : 'scale(1)' }}
                  >
                    <img
                      src={s.img}
                      alt={`Student ${i + 1}`}
                      className="w-full h-full object-cover object-top transition-transform duration-500"
                      style={{ transform: hoveredStudent === i ? 'scale(1.1)' : 'scale(1)' }}
                    />
                  </div>

                  {/* Grade chip on hover */}
                  <div
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-black text-gray-800 transition-all duration-300"
                    style={{
                      opacity: hoveredStudent === i ? 1 : 0,
                      transform: `translateX(-50%) translateY(${hoveredStudent === i ? '0' : '6px'})`,
                    }}
                  >
                    {s.label}
                  </div>

                  {/* Corner shine */}
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/60" />
                </div>
              ))}
            </div>

            {/* Bottom peach card */}
            <div
              className="p-8 flex items-center gap-5"
              style={{ background: 'linear-gradient(135deg, #f4b8a0 0%, #fca99b 100%)' }}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/30 flex items-center justify-center text-2xl flex-shrink-0">
                🎯
              </div>
              <p className="text-gray-900 text-lg font-bold leading-snug">
                Every 1:1 session is adapted to the child's pace for truly personalized learning.
              </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-0 rounded-3xl overflow-hidden shadow-xl reveal-item opacity-0 translate-y-8 scale-95 transition-all duration-500">

            {/* Top yellow info card */}
            <div
              className="p-8 flex items-center justify-between gap-6"
              style={{ background: 'linear-gradient(135deg, #fde68a 0%, #fbbf24 100%)' }}
            >
              <p className="text-gray-900 text-lg font-bold leading-snug max-w-xs">
                No one-size-fits-all. Your child gets exactly the curriculum they need.
              </p>
              {/* Animated star decoration */}
              <div className="flex-shrink-0 relative w-20 h-20">
                <div
                  className="absolute top-0 right-0 w-9 h-9 bg-yellow-600/40 rounded-sm"
                  style={{
                    clipPath: 'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)',
                    animation: 'spin 6s linear infinite',
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 w-14 h-14 bg-yellow-700/30 rounded-sm"
                  style={{
                    clipPath: 'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)',
                    animation: 'spin 9s linear infinite reverse',
                  }}
                />
              </div>
            </div>

            {/* Learning goals card — dark panel */}
            <div className="relative flex-1 bg-gray-950 overflow-hidden" style={{ minHeight: '340px' }}>
              {/* Background image with overlay */}
              <img
                src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=700&h=400&fit=crop"
                alt="Laptop learning"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 min-h-[340px]">
                <div className="w-full max-w-sm">
                  <h3 className="text-white font-black text-2xl text-center mb-7 tracking-tight">
                    Select your learning goals
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {goals.map((g, i) => (
                      <button
                        key={i}
                        className="rounded-2xl p-4 text-center transition-all duration-300 border"
                        style={{
                          backgroundColor: activeGoal === i ? g.color : g.bg + '15',
                          borderColor: activeGoal === i ? g.color : g.color + '50',
                          transform: activeGoal === i ? 'scale(1.05)' : 'scale(1)',
                          boxShadow: activeGoal === i ? `0 8px 24px ${g.color}55` : 'none',
                        }}
                        onMouseEnter={() => setActiveGoal(i)}
                        onMouseLeave={() => setActiveGoal(null)}
                      >
                        <div className="text-2xl mb-2">{g.icon}</div>
                        <p
                          className="text-xs font-black leading-tight transition-colors duration-300"
                          style={{ color: activeGoal === i ? (i === 0 || i === 1 ? '#1a1a1a' : 'white') : 'white' }}
                        >
                          {g.label}
                        </p>
                      </button>
                    ))}
                  </div>

                  {/* CTA inside panel */}
                  <button
                    className="mt-6 w-full py-3 rounded-2xl font-black text-sm text-white transition-all duration-300 hover:opacity-90 hover:shadow-2xl hover:-translate-y-0.5 transform"
                    style={{ backgroundColor: '#4F46E5', boxShadow: '0 4px 16px rgba(79,70,229,0.4)' }}
                  >
                    Start Free Trial →
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom trust bar */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 reveal-item opacity-0 translate-y-8 scale-95 transition-all duration-500">
          {[
            { emoji: '⭐', value: '4.9/5', label: 'Average Rating' },
            { emoji: '👧', value: '200K+', label: 'Happy Students' },
            { emoji: '🏅', value: '95%', label: 'Grade Improvement' },
            { emoji: '🌎', value: '50+', label: 'Countries' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <span className="text-2xl">{item.emoji}</span>
              <div>
                <p className="font-black text-gray-900 text-base">{item.value}</p>
                <p className="text-gray-400 text-xs">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
