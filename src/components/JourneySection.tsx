'use client'
import { useEffect, useRef } from 'react'

const features = [
  {
    num: '01',
    title: 'Expert Teacher',
    desc: 'Learn from industry-leading educators with proven expertise and real-world experience in their fields.',
    numColor: '#ef4444',
    numBg: '#fef2f2',
    borderColor: '#fca5a5',
    gradientFrom: '#fff5f5',
    gradientTo: '#fef2f2',
    icon: '👨‍🏫',
    glowColor: 'rgba(239,68,68,0.15)',
  },
  {
    num: '02',
    title: 'Quality Education',
    desc: 'Access premium content carefully curated and structured for the most effective learning outcomes.',
    numColor: '#6366f1',
    numBg: '#eef2ff',
    borderColor: '#a5b4fc',
    gradientFrom: '#f5f3ff',
    gradientTo: '#eef2ff',
    icon: '🎓',
    glowColor: 'rgba(99,102,241,0.15)',
  },
  {
    num: '03',
    title: 'Remote Learning',
    desc: 'Study from anywhere, anytime. Our platform adapts to your schedule and lifestyle seamlessly.',
    numColor: '#3b82f6',
    numBg: '#eff6ff',
    borderColor: '#93c5fd',
    gradientFrom: '#f0f9ff',
    gradientTo: '#eff6ff',
    icon: '🌐',
    glowColor: 'rgba(59,130,246,0.15)',
  },
  {
    num: '04',
    title: 'Life Time Support',
    desc: 'Enjoy unlimited access to course materials and dedicated support throughout your learning journey.',
    numColor: '#10b981',
    numBg: '#ecfdf5',
    borderColor: '#6ee7b7',
    gradientFrom: '#f0fdf4',
    gradientTo: '#ecfdf5',
    icon: '🛡️',
    glowColor: 'rgba(16,185,129,0.15)',
  },
]

export default function JourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.feature-card')
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add('opacity-100', 'translate-y-0')
                card.classList.remove('opacity-0', 'translate-y-12')
              }, i * 150)
            })
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-28 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #fdf4ff 0%, #fce7f3 20%, #ede9fe 45%, #dbeafe 70%, #d1fae5 100%)',
      }}
    >
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f9a8d4, transparent)' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #a5b4fc, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
            style={{ backgroundColor: '#ede9fe', color: '#6366f1' }}>
            Why Choose Us
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-5 leading-tight">
            Start your journey <span style={{ color: '#6366f1' }}>With us</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            We offer a brand new approach to the most basic learning paradigms. Choose from a wide range of
            learning options and gain new skills!
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card opacity-0 translate-y-12 transition-all duration-600 group relative rounded-3xl p-7 cursor-pointer"
              style={{
                background: `linear-gradient(145deg, ${f.gradientFrom}, ${f.gradientTo})`,
                border: `1.5px solid ${f.borderColor}`,
                transitionDuration: '500ms',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.transform = 'translateY(-8px) scale(1.02)'
                el.style.boxShadow = `0 24px 48px ${f.glowColor}, 0 8px 24px rgba(0,0,0,0.06)`
                el.style.borderColor = f.numColor
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.transform = 'translateY(0) scale(1)'
                el.style.boxShadow = 'none'
                el.style.borderColor = f.borderColor
              }}
            >
              {/* Top row: number badge + icon */}
              <div className="flex items-center justify-between mb-6">
                {/* Number pill */}
                <span
                  className="text-xs font-black tracking-widest px-3 py-1 rounded-full"
                  style={{ backgroundColor: f.numBg, color: f.numColor }}
                >
                  {f.num}
                </span>
                {/* Emoji icon in circle */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                  style={{ backgroundColor: f.numBg }}
                >
                  {f.icon}
                </div>
              </div>

              {/* Title */}
              <h3
                className="font-black text-xl mb-3 leading-snug transition-colors duration-300"
                style={{ color: '#1e1b4b' }}
              >
                {f.title}
              </h3>

              {/* Divider that grows on hover */}
              <div
                className="h-0.5 w-10 rounded-full mb-4 transition-all duration-300 group-hover:w-16"
                style={{ backgroundColor: f.numColor }}
              />

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {f.desc}
              </p>

              {/* Bottom arrow link */}
              <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <span className="text-xs font-bold" style={{ color: f.numColor }}>Learn More</span>
                <span className="text-sm font-bold" style={{ color: f.numColor }}>→</span>
              </div>

              {/* Corner accent glow */}
              <div
                className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
                style={{ backgroundColor: f.numColor }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
