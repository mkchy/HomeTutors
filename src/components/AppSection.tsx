'use client'
import { useEffect, useRef, useState } from 'react'
import { Star, Wifi, Download, Shield } from 'lucide-react'

const features = [
  { icon: Wifi,     label: 'Stream Live',     desc: 'Watch classes in real-time' },
  { icon: Download, label: 'Download & Go',   desc: 'Learn offline, anywhere' },
  { icon: Shield,   label: 'Safe & Secure',   desc: 'End-to-end encrypted' },
]

const reviews = [
  { name: 'Priya S.', rating: 5, text: 'Best learning app ever!' },
  { name: 'Arjun M.', rating: 5, text: 'My son improved 2 grades in one month.' },
]

export default function AppSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeFeature, setActiveFeature] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const devices = sectionRef.current?.querySelector('.devices')
          const content  = sectionRef.current?.querySelector('.content')
          devices?.classList.add('opacity-100', 'translate-y-0')
          devices?.classList.remove('opacity-0', 'translate-y-12')
          setTimeout(() => {
            content?.classList.add('opacity-100', 'translate-y-0')
            content?.classList.remove('opacity-0', 'translate-y-12')
          }, 200)
        }
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
      style={{ background: 'linear-gradient(135deg, #0d0b2e 0%, #1a1750 50%, #0d0b2e 100%)' }}
    >
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4F46E5, transparent)' }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #818cf8, transparent)' }} />
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: device mockups ── */}
          <div className="devices opacity-0 translate-y-12 transition-all duration-700">
            <div className="relative flex items-end justify-center gap-6 h-[420px]">

              {/* Glow under devices */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-12 rounded-full blur-2xl opacity-40"
                style={{ background: 'radial-gradient(ellipse, #4F46E5, transparent)' }} />

              {/* Phone */}
              <div className="relative z-10 flex-shrink-0"
                style={{ animation: 'floatDevice 3.5s ease-in-out infinite' }}>
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-4 rounded-b-xl z-20"
                  style={{ backgroundColor: '#0a0920' }} />
                <div
                  className="w-32 h-64 rounded-[2rem] overflow-hidden shadow-2xl relative"
                  style={{ border: '6px solid #2d2a6e', boxShadow: '0 0 40px rgba(79,70,229,0.4), inset 0 0 0 1px rgba(255,255,255,0.05)' }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&h=380&fit=crop"
                    alt="App mobile"
                    className="w-full h-full object-cover"
                  />
                  {/* Screen shine */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)' }} />
                  {/* Status bar */}
                  <div className="absolute top-5 left-0 right-0 flex justify-between items-center px-4">
                    <span className="text-white text-xs font-bold opacity-80">9:41</span>
                    <div className="flex gap-1">
                      {[3,4,5].map(h => (
                        <div key={h} className="w-0.5 bg-white opacity-80 rounded-full" style={{ height: `${h}px`, alignSelf: 'flex-end' }} />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Side button */}
                <div className="absolute right-0 top-16 w-1 h-8 rounded-r-sm"
                  style={{ backgroundColor: '#2d2a6e' }} />
              </div>

              {/* Tablet */}
              <div className="relative flex-shrink-0"
                style={{ animation: 'floatDevice 4s ease-in-out 0.8s infinite' }}>
                <div
                  className="w-72 h-52 rounded-2xl overflow-hidden shadow-2xl relative"
                  style={{
                    border: '8px solid #2d2a6e',
                    boxShadow: '0 0 50px rgba(79,70,229,0.35), inset 0 0 0 1px rgba(255,255,255,0.05)',
                  }}
                >
                  {/* App UI inside tablet */}
                  <div className="w-full h-full flex flex-col"
                    style={{ background: 'linear-gradient(160deg, #0d0b2e 0%, #1a1750 100%)' }}>
                    {/* App top bar */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                      <span className="text-white font-black text-xs">Home Tutors</span>
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-400 opacity-60" />
                        ))}
                      </div>
                    </div>
                    {/* Course card preview */}
                    <div className="flex-1 p-3 flex flex-col gap-2">
                      <div className="bg-white/10 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 rounded-lg bg-indigo-500 flex items-center justify-center text-xs">📐</div>
                          <span className="text-white text-xs font-bold">Mathematics — Grade 8</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: '72%', backgroundColor: '#00E5A0' }} />
                        </div>
                        <span className="text-xs mt-1 block" style={{ color: '#00E5A0' }}>72% Complete</span>
                      </div>
                      <div className="flex gap-2">
                        {['Live Now', 'Recorded', 'Notes'].map((t, i) => (
                          <div key={i} className="flex-1 bg-white/5 rounded-lg px-2 py-1.5 text-center">
                            <span className="text-xs text-indigo-300 font-medium">{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Screen shine */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)' }} />
                </div>
                {/* Home button */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4"
                  style={{ borderColor: '#2d2a6e', backgroundColor: '#0d0b2e' }} />
              </div>

              {/* Floating notification card */}
              <div
                className="absolute -top-4 right-0 bg-white rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3 w-52 z-20"
                style={{ animation: 'floatDevice 5s ease-in-out 1.5s infinite', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
              >
                <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center text-lg flex-shrink-0">✅</div>
                <div>
                  <p className="font-black text-gray-900 text-xs">Class Completed!</p>
                  <p className="text-gray-400 text-xs">+50 XP earned today</p>
                </div>
              </div>

              {/* App rating badge */}
              <div
                className="absolute -left-4 top-12 bg-white rounded-2xl shadow-2xl px-4 py-3 z-20"
                style={{ animation: 'floatDevice 4.5s ease-in-out 0.5s infinite', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
              >
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-black text-gray-900 text-sm">4.9</span>
                </div>
                <p className="text-gray-400 text-xs mt-0.5">50K+ Reviews</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: content ── */}
          <div className="content opacity-0 translate-y-12 transition-all duration-700 space-y-7">

            {/* Badge */}
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{ backgroundColor: 'rgba(99,102,241,0.2)', color: '#a5b4fc', border: '1px solid rgba(165,180,252,0.2)' }}>
              📱 Available Now
            </span>

            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black leading-tight text-white">
              Learn From{' '}
              <span className="relative inline-block">
                <span style={{ color: '#818cf8' }}>Anywhere</span>
                <svg className="absolute -bottom-1 left-0 w-full" height="5" viewBox="0 0 160 5" preserveAspectRatio="none">
                  <path d="M0 4 Q80 0 160 4" stroke="#4F46E5" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>

            <p className="text-indigo-200 leading-relaxed text-base max-w-md">
              Take classes on the go with the Home Tutors app. Stream or download to watch on the plane,
              the subway, or wherever you learn best — your progress syncs everywhere.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3">
              {features.map((f, i) => {
                const Icon = f.icon
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl cursor-default transition-all duration-300"
                    style={{
                      backgroundColor: activeFeature === i ? '#4F46E5' : 'rgba(255,255,255,0.06)',
                      border: `1px solid ${activeFeature === i ? '#4F46E5' : 'rgba(255,255,255,0.1)'}`,
                      transform: activeFeature === i ? 'translateY(-2px)' : 'none',
                      boxShadow: activeFeature === i ? '0 8px 24px rgba(79,70,229,0.4)' : 'none',
                    }}
                    onMouseEnter={() => setActiveFeature(i)}
                    onMouseLeave={() => setActiveFeature(null)}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0"
                      style={{ color: activeFeature === i ? 'white' : '#818cf8' }} />
                    <div>
                      <p className="text-white text-xs font-bold">{f.label}</p>
                      <p className="text-indigo-300 text-xs" style={{ color: activeFeature === i ? 'rgba(255,255,255,0.7)' : '' }}>{f.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* App store buttons */}
            <div className="flex flex-wrap gap-4">
              {/* Apple */}
              <button
                className="group flex items-center gap-4 px-6 py-4 rounded-2xl text-white font-semibold transition-all duration-300 hover:-translate-y-1 transform"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1.5px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <svg className="w-7 h-7 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.2 1.28-2.18 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-60">Download on the</div>
                  <div className="text-sm font-black tracking-tight">Apple Store</div>
                </div>
              </button>

              {/* Google Play */}
              <button
                className="group flex items-center gap-4 px-6 py-4 rounded-2xl text-white font-semibold transition-all duration-300 hover:-translate-y-1 transform"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1.5px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <svg className="w-7 h-7 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.37.2.8.22 1.19.05L15.31 12 4.37.19c-.39-.17-.82-.15-1.19.05-.76.42-1.18 1.24-1.18 2.13v19.26c0 .89.42 1.71 1.18 2.13zm2.69-20.84L14.96 12l-9.09 9.08V2.92zm13.86 8.54l-2.67-1.52-3.17 3.17 3.17 3.17 2.68-1.53c.76-.44.76-1.85-.01-2.29z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-60">Get it on</div>
                  <div className="text-sm font-black tracking-tight">Google Play</div>
                </div>
              </button>
            </div>

            {/* Mini reviews */}
            <div className="flex gap-4 flex-wrap pt-2">
              {reviews.map((r, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-xs text-white flex-shrink-0"
                    style={{ backgroundColor: '#4F46E5' }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="flex gap-0.5 mb-0.5">
                      {[...Array(r.rating)].map((_, j) => (
                        <Star key={j} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-indigo-200 text-xs leading-tight max-w-[140px]">"{r.text}"</p>
                    <p className="text-indigo-400 text-xs mt-0.5 font-bold">{r.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes floatDevice {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  )
}
