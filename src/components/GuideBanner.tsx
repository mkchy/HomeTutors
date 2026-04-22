'use client'
import { useEffect, useRef } from 'react'
import { ArrowUpRight, BookOpen, GraduationCap, Compass } from 'lucide-react'

const guides = [
  {
    icon: BookOpen,
    label: 'Explore our subject guides',
    sub: '120+ subjects',
    color: '#4F46E5',
    glow: 'rgba(79,70,229,0.25)',
  },
  {
    icon: GraduationCap,
    label: 'Explore our qualification guides',
    sub: '80+ qualifications',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.25)',
  },
]

const floatingStats = [
  { emoji: '📚', value: '120+', label: 'Subject Guides' },
  { emoji: '🎓', value: '80+',  label: 'Qualifications' },
  { emoji: '🌍', value: '50+',  label: 'Countries' },
]

export default function GuideBanner() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const left  = sectionRef.current?.querySelector('.gb-left')
          const right = sectionRef.current?.querySelector('.gb-right')
          left?.classList.add('opacity-100', 'translate-x-0')
          left?.classList.remove('opacity-0', '-translate-x-12')
          setTimeout(() => {
            right?.classList.add('opacity-100', 'translate-x-0')
            right?.classList.remove('opacity-0', 'translate-x-12')
          }, 200)
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Subtle background blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #a5b4fc, transparent)' }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c4b5fd, transparent)' }} />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Section label */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
            style={{ backgroundColor: '#eef2ff', color: '#4F46E5' }}>
            <Compass className="w-3 h-3" /> Your Learning Compass
          </span>
        </div>

        {/* Main banner card */}
        <div
          className="relative rounded-[2rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
          style={{ border: '1.5px solid #e0e7ff' }}
        >
          {/* ── LEFT — image with overlays ── */}
          <div className="gb-left opacity-0 -translate-x-12 transition-all duration-700 lg:w-96 flex-shrink-0 relative overflow-hidden"
            style={{ minHeight: '340px' }}>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=420&fit=crop"
              alt="Guide"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              style={{ minHeight: '340px' }}
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.55) 0%, rgba(0,0,0,0.2) 100%)' }} />

            {/* Floating badge on image */}
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
                style={{ backgroundColor: '#eef2ff' }}>🧭</div>
              <div>
                <p className="text-xs text-gray-400 leading-none">Find your path</p>
                <p className="font-black text-gray-900 text-sm">200+ Guides</p>
              </div>
            </div>

            {/* Bottom stat pills on image */}
            <div className="absolute bottom-6 left-6 right-6 flex gap-2 flex-wrap">
              {floatingStats.map((s, i) => (
                <div key={i}
                  className="bg-white/85 backdrop-blur rounded-xl px-3 py-1.5 flex items-center gap-1.5"
                >
                  <span className="text-sm">{s.emoji}</span>
                  <span className="font-black text-gray-900 text-xs">{s.value}</span>
                  <span className="text-gray-500 text-xs">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — content ── */}
          <div
            className="gb-right opacity-0 translate-x-12 transition-all duration-700 flex-1 flex flex-col justify-center px-10 lg:px-14 py-12"
            style={{ background: 'linear-gradient(135deg, #fafbff 0%, #f0f4ff 100%)' }}
          >
            {/* Heading */}
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 mb-5 leading-tight">
              Every journey{' '}
              <span className="relative inline-block">
                <span style={{ color: '#4F46E5' }}>needs a guide</span>
                <svg className="absolute -bottom-1 left-0 w-full" height="5" viewBox="0 0 200 5" preserveAspectRatio="none">
                  <path d="M0 4 Q100 0 200 4" stroke="#a5b4fc" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>

            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
              Think of us as your compass. Browse any of our popular subject or qualification guides to
              explore your options and decide what comes next in your learning journey.
            </p>

            {/* CTA buttons — rich cards */}
            <div className="flex flex-col sm:flex-row gap-4">
              {guides.map((g, i) => {
                const Icon = g.icon
                return (
                  <button
                    key={i}
                    className="group flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 transform flex-1"
                    style={{
                      backgroundColor: 'white',
                      border: `1.5px solid ${g.color}30`,
                      boxShadow: `0 2px 12px ${g.glow}`,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = g.color
                      e.currentTarget.style.borderColor = g.color
                      e.currentTarget.style.boxShadow = `0 12px 32px ${g.glow}`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'white'
                      e.currentTarget.style.borderColor = `${g.color}30`
                      e.currentTarget.style.boxShadow = `0 2px 12px ${g.glow}`
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-white/20"
                      style={{ backgroundColor: `${g.color}15` }}
                    >
                      <Icon className="w-5 h-5 transition-colors duration-300 group-hover:text-white"
                        style={{ color: g.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-gray-900 group-hover:text-white transition-colors duration-300 leading-snug">
                        {g.label}
                      </p>
                      <p className="text-xs text-gray-400 group-hover:text-white/70 transition-colors duration-300 mt-0.5">
                        {g.sub}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="w-4 h-4 flex-shrink-0 transition-all duration-300 group-hover:text-white group-hover:rotate-12"
                      style={{ color: g.color }}
                    />
                  </button>
                )
              })}
            </div>

            {/* Trust line */}
            <p className="mt-6 text-xs text-gray-400 flex items-center gap-2">
              <span className="inline-block w-4 h-0.5 rounded bg-indigo-300"></span>
              Trusted by over 200,000 learners worldwide
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
