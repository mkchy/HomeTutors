'use client'
import { useEffect, useRef } from 'react'
import { Star, Briefcase, Award } from 'lucide-react'

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = heroRef.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-hero-gradient overflow-hidden flex items-center"
      style={{ background: 'linear-gradient(135deg, #0d0b2e 0%, #1a1750 50%, #0d0b2e 100%)' }}
    >
      {/* Background decorative circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-900/30 rounded-full filter blur-3xl animate-pulse-slow animation-delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-light/20 rounded-full filter blur-3xl" />

      {/* Sparkle icons */}
      <div className="absolute top-1/4 left-1/2 text-gold opacity-60 animate-float">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" />
        </svg>
      </div>
      <div className="absolute bottom-1/3 right-1/3 text-gold opacity-40 animate-float animation-delay-800">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Heading */}
            <div className="space-y-2">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight opacity-0 animate-fade-up"
                style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                Learn New Skills Online
              </h1>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight opacity-0 animate-fade-up"
                style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                with Top{' '}
                <span
                  className="font-black underline decoration-2"
                  style={{ color: '#00E5A0' }}
                >
                  Home Tutors
                </span>
              </h1>
            </div>

            <p className="text-gray-300 text-lg max-w-md leading-relaxed opacity-0 animate-fade-up"
              style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
              Build skills with courses, certificates, and degrees online from world-class universities and companies.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-up"
              style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
              <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/40">
                Join For Free
              </button>
              <button
                className="border-2 text-sm font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                style={{ borderColor: '#00E5A0', color: '#00E5A0' }}
              >
                Find Courses
              </button>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-6 opacity-0 animate-fade-up"
              style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
              {[
                { icon: '🎓', label: 'Over 12 million students' },
                { icon: '▶', label: 'More than 60,000 courses' },
                { icon: '🔒', label: 'Learn anything online' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                  <span className="text-base">{stat.icon}</span>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Image collage */}
          <div className="relative h-[520px] hidden lg:block">
            {/* Main large image */}
            <div className="absolute top-8 left-16 w-72 h-96 rounded-3xl overflow-hidden shadow-2xl animate-float"
              style={{ animationDelay: '0s' }}>
              <img
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=550&fit=crop"
                alt="Student"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Top-right image */}
            <div className="absolute top-0 right-0 w-44 h-56 rounded-3xl overflow-hidden shadow-2xl animate-float animation-delay-600">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=250&fit=crop"
                alt="Educator"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom-right image */}
            <div className="absolute bottom-0 right-2 w-44 h-52 rounded-3xl overflow-hidden shadow-2xl animate-float animation-delay-400">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=220&fit=crop"
                alt="Student"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Instructor card */}
            <div className="absolute top-1/3 right-40 bg-white rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3 w-52 animate-float animation-delay-200 z-10">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-green-500 flex-shrink-0">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Ali Tufan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Manohar</p>
                <p className="text-gray-500 text-xs">UX/UI Designer</p>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>

            {/* Free courses card */}
            <div className="absolute bottom-24 left-4 bg-white rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-4 w-52 animate-float animation-delay-800 z-10">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="font-black text-gray-900" style={{ color: '#f87171' }}>3,000 +</p>
                <p className="text-gray-500 text-xs">Free Courses</p>
              </div>
            </div>

            {/* Congrats card */}
            <div className="absolute bottom-4 right-8 bg-white rounded-2xl shadow-2xl px-5 py-4 z-10 animate-float animation-delay-1000">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: '#4F46E5' }}>Congrats!</p>
                  <p className="text-gray-500 text-xs">Your Admission Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
          <path
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,70 L1440,120 L0,120 Z"
            fill="#f0f0ff"
            opacity="0.15"
          />
          <path
            d="M0,90 C480,30 960,100 1440,60 L1440,120 L0,120 Z"
            fill="#e8e8f8"
            opacity="0.1"
          />
        </svg>
      </div>
    </section>
  )
}
