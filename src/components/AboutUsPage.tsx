'use client'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, GraduationCap, Users, BookOpen, Star, Globe, Award, Heart, Zap } from 'lucide-react'

// ─── DATA ────────────────────────────────────────────────────────────────────

const partners = [
  { name: 'Brunel University London', initials: 'BU', color: '#1a4480' },
  { name: 'Arden University',         initials: 'AU', color: '#2d8a6e' },
  { name: 'University of Roehampton', initials: 'UR', color: '#007a5e' },
  { name: 'University of Bradford',   initials: 'UB', color: '#7b2d8b' },
  { name: 'UCL',                      initials: 'UC', color: '#1e3a5f' },
  { name: 'Coventry University',      initials: 'CU', color: '#003399' },
  { name: 'Open University',          initials: 'OU', color: '#e84b37' },
  { name: 'University of Leeds',      initials: 'UL', color: '#4a1942' },
]

const numbers = [
  { emoji: '🖥️', value: 100,  suffix: 's', label: 'of world-class degrees',        isDecimal: false },
  { emoji: '👤', value: 21,   suffix: 'm+', label: 'global registered learners',    isDecimal: false },
  { emoji: '🎓', value: 200,  suffix: '+',  label: 'universities and brands',       isDecimal: false },
  { emoji: '⭐', value: 4.7,  suffix: '',   label: 'score on Trustpilot',           isDecimal: true  },
]

const learningCards = [
  {
    tag:   'Online short courses',
    title: 'Learn a skill in just a few hours',
    desc:  "Be ready when it's time to apply for your next degree with bite-sized, flexible learning. Fast-track your career, explore new skills in popular subjects, or try something you've been curious about…it's up to you.",
    cta:   'Start a short course',
    img:   'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=600&h=420&fit=crop',
    imgRight: false,
  },
  {
    tag:   'Online microcredentials',
    title: 'Get a qualification that counts',
    desc:  'Not ready for a full degree yet? Start with a microcredential. Gain in-demand skills, specialist knowledge, and university credit to boost your application. Plus, benefit from expert guidance all along the way.',
    cta:   'Find a microcredential',
    img:   'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=420&fit=crop',
    imgRight: true,
  },
]

const values = [
  { icon: Globe,  title: 'Global Reach',      desc: 'Partners in 50+ countries bring world-class education to your doorstep.', color: '#e91e8c' },
  { icon: Heart,  title: 'Learner First',      desc: 'Every feature, every course, every decision is made with you in mind.',   color: '#a78bfa' },
  { icon: Zap,    title: 'Flexible Learning',  desc: 'Study at your own pace, on any device, wherever life takes you.',         color: '#f59e0b' },
  { icon: Award,  title: 'Trusted Quality',    desc: 'Verified credentials recognised by employers and universities worldwide.', color: '#34d399' },
]

// ─── COUNTER ─────────────────────────────────────────────────────────────────

function Counter({ target, suffix = '', isDecimal = false, duration = 1800 }: {
  target: number; suffix?: string; isDecimal?: boolean; duration?: number
}) {
  const [count, setCount] = useState(0)
  const ref    = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const t0 = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1)
          const v = (1 - Math.pow(1 - p, 3)) * target
          setCount(isDecimal ? parseFloat(v.toFixed(1)) : Math.floor(v))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    if (ref.current) ob.observe(ref.current)
    return () => ob.disconnect()
  }, [target, duration, isDecimal])

  return <span ref={ref}>{isDecimal ? count.toFixed(1) : count}{suffix}</span>
}

// ─── REVEAL HOOK ─────────────────────────────────────────────────────────────

function useReveal(selector: string, stagger = 120) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        ref.current?.querySelectorAll(selector).forEach((el, i) =>
          setTimeout(() => {
            el.classList.add('opacity-100', 'translate-y-0', 'translate-x-0', 'scale-100')
            el.classList.remove('opacity-0', 'translate-y-10', '-translate-x-12', 'translate-x-12', 'scale-95')
          }, i * stagger)
        )
      }
    }, { threshold: 0.1 })
    if (ref.current) ob.observe(ref.current)
    return () => ob.disconnect()
  }, [selector, stagger])
  return ref
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function AboutUsPage() {
  const heroRef     = useReveal('.hero-reveal', 0)
  const storyRef    = useReveal('.story-reveal', 180)
  const learnersRef = useReveal('.learner-reveal', 150)
  const valuesRef   = useReveal('.value-card', 110)
  const numRef      = useReveal('.num-card', 110)
  const lfeRef      = useReveal('.lfe-card', 200)
  const scrollRef   = useRef<HTMLDivElement>(null)
  const [hovNum, setHovNum] = useState<number | null>(null)
  const [hovVal, setHovVal] = useState<number | null>(null)

  // Auto-scroll partners strip
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let raf: number
    let pos = 0
    const run = () => { pos += 0.6; if (pos >= el.scrollWidth / 2) pos = 0; el.scrollLeft = pos; raf = requestAnimationFrame(run) }
    raf = requestAnimationFrame(run)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="font-sans bg-white overflow-x-hidden">

      {/* ══════════════════════════════════════════
          1. HERO — full-bleed photo + floating card
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ minHeight: '460px' }}>
        <img
          src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=1600&h=520&fit=crop"
          alt="About us"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg,rgba(0,0,0,0.45) 0%,rgba(0,0,0,0.1) 70%)' }} />

        {/* Animated gradient ring */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle,#e91e8c,transparent)', animation: 'pulse 4s ease-in-out infinite' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-end min-h-[460px] py-24">
          <div className="hero-reveal opacity-0 translate-y-10 transition-all duration-700 bg-white rounded-3xl p-10 max-w-lg shadow-2xl">
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: '#fce7f3', color: '#be185d' }}>Who We Are</span>
            <h1 className="text-5xl font-black text-gray-900 mb-4 leading-tight">About us</h1>
            <p className="text-gray-500 text-base leading-relaxed">
              Millions of learners. Thousands of courses. Hundreds of partners. One online learning platform.
            </p>
            <div className="flex gap-6 mt-6 pt-6 border-t border-gray-100">
              {[['21M+','Learners'],['200+','Partners'],['4.7★','Trustpilot']].map(([v,l]) => (
                <div key={l}>
                  <p className="text-xl font-black" style={{ color: '#e91e8c' }}>{v}</p>
                  <p className="text-xs text-gray-400">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. OUR STORY
      ══════════════════════════════════════════ */}
      <section
        ref={storyRef}
        className="py-28 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#fff0f8 0%,#f5f0ff 50%,#f0f8ff 100%)' }}
      >
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle,#e91e8c,transparent)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Text */}
            <div className="story-reveal opacity-0 -translate-x-12 transition-all duration-700 space-y-5">
              <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
                style={{ backgroundColor: '#fce7f3', color: '#be185d' }}>Our Story</span>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                How it all <span style={{ color: '#e91e8c' }}>began</span>
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Over a decade ago, we began with a bold vision: to transform access to education. What started
                as a handful of online courses quickly grew into a global learning platform, trusted by millions
                and powered by partnerships with top universities and institutions.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Since then, we've grown our catalogue to include everything from free short courses to premium
                programmes, microcredentials, and full degrees — designed with our learners in mind.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                With us, it's easy to browse, discover, and apply — all in one place.
              </p>
              <div className="flex gap-10 pt-3">
                {[['21M+','Learners'],['200+','Partners'],['1000+','Courses']].map(([v,l]) => (
                  <div key={l}>
                    <p className="text-2xl font-black" style={{ color: '#e91e8c' }}>{v}</p>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Illustration card */}
            <div className="story-reveal opacity-0 translate-x-12 transition-all duration-700">
              <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-6 overflow-hidden">
                <div className="rounded-2xl overflow-hidden flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#f5f0ff,#fce7f3)', minHeight: '320px' }}>
                  <svg viewBox="0 0 400 300" className="w-full max-w-sm" xmlns="http://www.w3.org/2000/svg">
                    <rect x="30"  y="260" width="340" height="12" rx="6" fill="#7c3aed" opacity="0.8"/>
                    <rect x="160" y="210" width="80"  height="50" rx="8" fill="#6d28d9" opacity="0.7"/>
                    <rect x="155" y="200" width="90"  height="20" rx="6" fill="#7c3aed" opacity="0.8"/>
                    <ellipse cx="200" cy="190" rx="35" ry="40" fill="#f97316" opacity="0.9"/>
                    <circle cx="200" cy="140" r="28" fill="#fed7aa"/>
                    <ellipse cx="200" cy="120" rx="28" ry="16" fill="#7c2d12"/>
                    <rect x="120" y="175" width="55" height="16" rx="8" fill="#f97316" opacity="0.8" transform="rotate(-10 148 183)"/>
                    <rect x="225" y="175" width="55" height="16" rx="8" fill="#f97316" opacity="0.8" transform="rotate(10 252 183)"/>
                    <rect x="100" y="110" width="200" height="130" rx="10" fill="#1e1b4b"/>
                    <rect x="108" y="118" width="184" height="110" rx="6" fill="#312e81"/>
                    <rect x="116" y="126" width="50" height="8"  rx="3" fill="#e91e8c"/>
                    <text x="119" y="133" fontSize="6" fill="white" fontWeight="bold">Home Tutors</text>
                    <rect x="116" y="146" width="168" height="5" rx="2" fill="white" opacity="0.4"/>
                    <rect x="116" y="158" width="140" height="5" rx="2" fill="white" opacity="0.3"/>
                    <rect x="116" y="170" width="155" height="5" rx="2" fill="white" opacity="0.25"/>
                    <rect x="90"  y="240" width="220" height="10" rx="5" fill="#1e1b4b"/>
                    <rect x="310" y="210" width="14" height="50" rx="4" fill="#7c3aed" opacity="0.5"/>
                    <circle cx="317" cy="200" r="22" fill="#34d399" opacity="0.7"/>
                    <circle cx="307" cy="210" r="16" fill="#10b981" opacity="0.6"/>
                    <rect x="60"  y="235" width="18" height="26" rx="2" fill="#f87171"/>
                    <rect x="79"  y="240" width="14" height="21" rx="2" fill="#fbbf24"/>
                    <rect x="340" y="238" width="22" height="22" rx="5" fill="#e5e7eb"/>
                    <path d="M362 245 Q372 248 362 256" stroke="#d1d5db" strokeWidth="3" fill="none"/>
                    <circle cx="60"  cy="100" r="8"  fill="#f472b6" opacity="0.5"/>
                    <circle cx="340" cy="90"  r="12" fill="#a78bfa" opacity="0.4"/>
                    <circle cx="350" cy="130" r="6"  fill="#34d399" opacity="0.4"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. OUR LEARNERS
      ══════════════════════════════════════════ */}
      <section
        ref={learnersRef}
        className="py-28 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#fff0f8 0%,#fdf4ff 60%,#f0f8ff 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Photo */}
            <div className="learner-reveal opacity-0 -translate-x-12 transition-all duration-700 flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-72 lg:w-96 rounded-3xl overflow-hidden shadow-2xl" style={{ backgroundColor: '#e91e8c', minHeight: '380px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&h=520&fit=crop&face"
                    alt="Learner"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    style={{ minHeight: '380px' }}
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl px-4 py-3 border border-pink-100" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <p className="font-black text-gray-900 text-sm">⭐ 4.9 / 5.0</p>
                  <p className="text-xs text-gray-400">Learner Rating</p>
                </div>
                {/* Second badge */}
                <div className="absolute -top-5 -left-5 bg-white rounded-2xl shadow-xl px-4 py-3 border border-pink-100" style={{ animation: 'float 3s ease-in-out 1.5s infinite' }}>
                  <p className="font-black text-gray-900 text-sm">🌍 50+ Countries</p>
                  <p className="text-xs text-gray-400">Global learners</p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="learner-reveal opacity-0 translate-x-12 transition-all duration-700 space-y-5">
              <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
                style={{ backgroundColor: '#fce7f3', color: '#be185d' }}>Our Learners</span>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                Learning for <span style={{ color: '#e91e8c' }}>everyone</span>
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our learners are from all walks of life, but united by a shared goal: to turn possibility into progress.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Whether it's a first step, a pivot, or a comeback, each degree we feature is chosen to support that
                journey, on your terms and on your timeline. We're here to help you arrive at your best 'you' yet.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {['Flexible Learning','Expert Tutors','1:1 Sessions','Any Device','Lifetime Access'].map(tag => (
                  <span key={tag} className="text-xs font-bold px-4 py-2 rounded-full border"
                    style={{ borderColor: '#f9a8d4', color: '#be185d', backgroundColor: '#fdf2f8' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. OUR VALUES
      ══════════════════════════════════════════ */}
      <section ref={valuesRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
              style={{ backgroundColor: '#fce7f3', color: '#be185d' }}>Our Values</span>
            <h2 className="text-4xl font-black text-gray-900">What drives <span style={{ color: '#e91e8c' }}>everything</span> we do</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              const hov = hovVal === i
              return (
                <div key={i}
                  className="value-card opacity-0 translate-y-10 scale-95 transition-all duration-500 rounded-3xl p-7 text-center cursor-default"
                  style={{
                    border: `1.5px solid ${hov ? v.color + '60' : '#f3f4f6'}`,
                    backgroundColor: hov ? v.color + '08' : 'white',
                    boxShadow: hov ? `0 16px 40px ${v.color}20` : '0 2px 12px rgba(0,0,0,0.05)',
                    transform: hov ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                  }}
                  onMouseEnter={() => setHovVal(i)}
                  onMouseLeave={() => setHovVal(null)}
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300"
                    style={{
                      backgroundColor: hov ? v.color : v.color + '15',
                      transform: hov ? 'rotate(-6deg) scale(1.1)' : 'rotate(0) scale(1)',
                    }}>
                    <Icon className="w-6 h-6 transition-colors duration-300" style={{ color: hov ? 'white' : v.color }} />
                  </div>
                  <h3 className="font-black text-gray-900 text-base mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. LEARNING FOR EVERYONE
      ══════════════════════════════════════════ */}
      <section ref={lfeRef} className="py-24 relative overflow-hidden" style={{ backgroundColor: '#f8f4f0' }}>
        <div className="absolute -top-20 right-0 w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle,#e91e8c,transparent)' }} />
        <div className="max-w-6xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-14">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900">Learning for <span style={{ color: '#e91e8c' }}>everyone</span></h2>
          </div>
          <div className="flex flex-col gap-6">
            {learningCards.map((card, i) => (
              <div key={i}
                className={`lfe-card opacity-0 translate-y-10 transition-all duration-600 rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transform flex flex-col ${card.imgRight ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                style={{ backgroundColor: i === 1 ? '#fdf4f9' : 'white', border: '1px solid #f0e8f0', minHeight: '260px' }}
              >
                <div className="md:w-5/12 flex-shrink-0 overflow-hidden" style={{ minHeight: '220px' }}>
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" style={{ minHeight: '220px' }} />
                </div>
                <div className="flex-1 flex flex-col justify-center px-10 py-10">
                  <p className="text-xs font-medium text-gray-500 mb-3">{card.tag}</p>
                  <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-4 leading-tight">{card.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-md">{card.desc}</p>
                  <button
                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold self-start transition-all duration-300 hover:-translate-y-0.5"
                    style={{ border: '1.5px solid #e91e8c', color: '#e91e8c' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor='#e91e8c'; e.currentTarget.style.color='white'; e.currentTarget.style.boxShadow='0 8px 24px rgba(233,30,140,0.3)' }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor='transparent'; e.currentTarget.style.color='#e91e8c'; e.currentTarget.style.boxShadow='none' }}
                  >
                    {card.cta}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. NUMBERS
      ══════════════════════════════════════════ */}
      <section ref={numRef} className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#f0f0ff 0%,#f5f0ff 50%,#fff0f8 100%)' }}>
        <div className="absolute top-0 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle,#e91e8c,transparent)' }} />
        <div className="max-w-6xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
              style={{ backgroundColor: '#fce7f3', color: '#be185d' }}>By The Numbers</span>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900">
              Platform <span style={{ color: '#e91e8c' }}>in numbers</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {numbers.map((n, i) => {
              const hov = hovNum === i
              return (
                <div key={i}
                  className="num-card opacity-0 translate-y-8 rounded-3xl p-8 text-center cursor-default flex flex-col items-center gap-4"
                  style={{
                    backgroundColor: hov ? '#fff0f8' : 'white',
                    border: `1.5px solid ${hov ? '#f9a8d4' : '#f3f4f6'}`,
                    boxShadow: hov ? '0 16px 40px rgba(233,30,140,0.12),0 4px 12px rgba(0,0,0,0.04)' : '0 4px 16px rgba(0,0,0,0.06)',
                    transform: hov ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                  }}
                  onMouseEnter={() => setHovNum(i)}
                  onMouseLeave={() => setHovNum(null)}
                >
                  <div className="text-5xl transition-transform duration-300"
                    style={{ transform: hov ? 'scale(1.2) rotate(-5deg)' : 'scale(1) rotate(0)' }}>
                    {n.emoji}
                  </div>
                  <p className="text-3xl lg:text-4xl font-black leading-none transition-colors duration-300"
                    style={{ color: hov ? '#e91e8c' : '#111827' }}>
                    <Counter target={n.value} suffix={n.suffix} isDecimal={n.isDecimal} />
                  </p>
                  <p className="text-sm text-gray-500 text-center leading-snug">{n.label}</p>
                  <div className="h-1 rounded-full transition-all duration-500"
                    style={{ width: hov ? '60%' : '20%', backgroundColor: '#e91e8c' }} />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. OUR PARTNERS
      ══════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 mb-12 text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
            style={{ backgroundColor: '#fce7f3', color: '#be185d' }}>Trusted Worldwide</span>
          <h2 className="text-3xl font-black text-gray-900 mb-3">Our partners</h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            We partner with more than 200 top universities and educators worldwide to bring you exceptional learning opportunities.
          </p>
        </div>
        {/* Infinite-scroll strip */}
        <div ref={scrollRef} className="flex gap-8 overflow-x-hidden" style={{ scrollbarWidth: 'none' }}>
          {[...partners, ...partners].map((p, i) => (
            <div key={i}
              className="flex-shrink-0 flex items-center gap-4 px-7 py-5 rounded-2xl border border-gray-100 hover:border-pink-200 hover:shadow-md transition-all duration-300 cursor-default bg-white"
              style={{ minWidth: '200px' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                style={{ backgroundColor: p.color }}>
                {p.initials}
              </div>
              <p className="font-semibold text-gray-700 text-xs leading-snug">{p.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Global float keyframe */}
      <style jsx global>{`
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes pulse {
          0%,100% { opacity: 0.3; }
          50%      { opacity: 0.5; }
        }
      `}</style>

    </div>
  )
}
