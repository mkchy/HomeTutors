'use client'
import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'

// ─── DATA ─────────────────────────────────────────────────────────────────────

const gradeOptions = ['KG - G8', 'G9 - G12']

const classOptions = [
  { label: '2 classes/week', tag: null },
  { label: '3 classes/week', tag: 'MOST RECOMMENDED' },
]

const plans = {
  '2 classes/week': [
    { duration: '3',  label: 'Months', bg: '#7ee8fa', headerBg: '#5dd8f0', price: 1000, originalPrice: null,  discount: null,      classes: 26,  billing: 26000,  billingPeriod: '13 weeks' },
    { duration: '6',  label: 'Months', bg: '#f4b8a0', headerBg: '#f0a080', price: 900,  originalPrice: 1000,  discount: '10% OFF', classes: 52,  billing: 46800,  billingPeriod: '26 weeks' },
    { duration: '12', label: 'Months', bg: '#f9a8e8', headerBg: '#f080d8', price: 800,  originalPrice: 1000,  discount: '20% OFF', classes: 104, billing: 83200,  billingPeriod: '52 weeks' },
  ],
  '3 classes/week': [
    { duration: '3',  label: 'Months', bg: '#7ee8fa', headerBg: '#5dd8f0', price: 1000, originalPrice: null,  discount: null,      classes: 39,  billing: 39000,  billingPeriod: '13 weeks' },
    { duration: '6',  label: 'Months', bg: '#f4b8a0', headerBg: '#f0a080', price: 900,  originalPrice: 1000,  discount: '10% OFF', classes: 78,  billing: 70200,  billingPeriod: '26 weeks' },
    { duration: '12', label: 'Months', bg: '#f9a8e8', headerBg: '#f080d8', price: 800,  originalPrice: 1000,  discount: '20% OFF', classes: 156, billing: 124800, billingPeriod: '52 weeks' },
  ],
}

const features = [
  { icon: '📅', label: 'Flexible Leaves',     desc: "Reschedule or take leaves without losing your classes. Full flexibility built in." },
  { icon: '🗓️', label: 'Adjustable Schedule', desc: "Change your class timings anytime to fit your child's routine and school schedule." },
  { icon: '💸', label: 'Easy Refunds',        desc: "No-questions-asked refund policy within the first 7 days. Zero risk, full peace of mind." },
]

const included = [
  { symbol: 'Σ', color: '#f59e0b', label: 'Learning Plan',     desc: "A custom-built roadmap tailored to your child's current level, goals, and learning pace." },
  { symbol: '%', color: '#f97316', label: 'Exam Preparation',  desc: 'Targeted practice, mock tests, and strategies to ace school exams and competitive math tests.' },
  { symbol: '△', color: '#ec4899', label: 'Homework Help',     desc: 'Live doubt-clearing for homework and school assignments — no question is left unanswered.' },
  { symbol: '∞', color: '#10b981', label: 'Advanced Learning', desc: 'Go beyond the syllabus with enrichment topics that build real mathematical thinking.' },
  { symbol: 'λ', color: '#06b6d4', label: 'Smart Practice',    desc: "AI-powered practice questions that adapt to your child's mistakes and reinforce weak areas." },
  { symbol: '±', color: '#eab308', label: 'Mental Math',       desc: 'Daily mental math exercises that sharpen speed, accuracy, and numerical intuition.' },
  { symbol: '✓', color: '#22c55e', label: 'Remedial Support',  desc: 'Identify and fix foundational gaps so your child never feels left behind in class again.' },
  { symbol: 'U', color: '#f97316', label: 'Parent App',        desc: 'Real-time progress reports, session recordings, and tutor feedback — all in your pocket.' },
]

const students = [
  { name: 'Charani', grade: 'Grade 2', desc: 'Got Level 5 in the STAAR exam at the Renaissance Institute for Competitive Exams.', img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=380&fit=crop&face', award: '🏆 STAAR Level 5' },
  { name: 'Sanjay',  grade: 'Grade 6', desc: "Received prestigious President's Education Awards Program from the President of US.", img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=380&fit=crop&face', award: '🇺🇸 Presidential Award' },
  { name: 'Bela',    grade: 'Grade 6', desc: 'Tops her class with an outstanding score of 77.5/80.', img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&h=380&fit=crop&face', award: '⭐ Class Topper' },
  { name: 'Vyom',    grade: 'Grade 8', desc: 'Received prestigious Pradhan Mantri Rashtriya Bal Puraskar from the Prime Minister of India.', img: 'https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?w=300&h=380&fit=crop', award: '🇮🇳 PM National Award' },
  { name: 'Arjun',   grade: 'Grade 5', desc: 'Won Gold at the National Science Olympiad three years in a row.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=380&fit=crop&face', award: '🥇 Olympiad Gold x3' },
  { name: 'Priya',   grade: 'Grade 7', desc: 'Secured AIR 12 in the National Mathematics Talent Contest.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=380&fit=crop&face', award: '📐 AIR 12 Maths' },
  { name: 'Rohan',   grade: 'Grade 4', desc: 'Scored 100% in three consecutive school math exams after joining Cuemath.', img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&h=380&fit=crop&face', award: '💯 Perfect Score x3' },
  { name: 'Anika',   grade: 'Grade 9', desc: 'Cracked IIT-JEE Foundation with a top-20 rank in her state.', img: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=300&h=380&fit=crop&face', award: '🎯 IIT Foundation Top 20' },
]

// ── Clean reviews: single `message` per card, always visible. No previewMessage. ──
const reviews = [
  { name: 'Saima Malik',   rating: 4, message: 'We had a great experience with Cuemath. He started in 2021 and was quite weak, but since joining Cuemath he has been getting better grades consistently.' },
  { name: 'Garima',        rating: 5, message: "Cuemath keeps introducing new methods and systems, making it interesting for learners. Unlike traditional teaching, it has innovated a different way. My child loves every session!" },
  { name: 'Priyanka',      rating: 5, message: "Cuemath transformed my daughter's relationship with math completely. She went from dreading it to loving problem-solving sessions!" },
  { name: 'Debalina Das',  rating: 5, message: "The 1:1 sessions are incredibly effective. My son's confidence has skyrocketed and his school grades improved within 3 months." },
  { name: 'Shivali Mehta', rating: 5, message: "Outstanding teaching methodology. The tutors are patient, knowledgeable, and truly care about each child's progress." },
  { name: 'Veeraraghavan', rating: 5, message: "Best investment we made for our child's future. The curriculum is well-structured and the app makes practice fun and engaging." },
  { name: 'Pawanesh',      rating: 5, message: 'My child used to struggle with word problems. Now he solves them independently. The logical thinking approach really works!' },
  { name: 'Naisu Shah',    rating: 5, message: 'Fantastic platform! The teachers are highly qualified and the personalized approach ensures my child gets exactly the help they need.' },
]

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="w-5 h-5 flex items-center justify-center"
          style={{ backgroundColor: i <= count ? '#00b67a' : '#ddd', borderRadius: '2px' }}>
          <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      ))}
    </div>
  )
}

// ─── STUDENTS SUCCESS SECTION ─────────────────────────────────────────────────

function StudentsSuccessSection() {
  const [activeIdx, setActiveIdx]         = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [dragStart, setDragStart]         = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total    = students.length

  const slide = (dir: 'left' | 'right') => {
    if (transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setActiveIdx(prev => dir === 'right' ? (prev + 1) % total : (prev - 1 + total) % total)
      setTransitioning(false)
    }, 380)
  }

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => slide('right'), 3500)
  }

  useEffect(() => {
    resetTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [transitioning])

  // 5-card window centred on activeIdx
  const CENTER = 2
  const window5 = Array.from({ length: 5 }, (_, i) => {
    const offset = i - CENTER
    const idx    = (activeIdx + offset + total) % total
    return { ...students[idx], offset }
  })

  const getSlotConfig = (offset: number) => {
    const abs = Math.abs(offset)
    return {
      zIndex:     10 - abs * 2,
      scale:      offset === 0 ? 1 : abs === 1 ? 0.88 : 0.75,
      translateY: offset === 0 ? 0 : abs === 1 ? 28 : 52,
      opacity:    abs === 2 ? 0.6 : 1,
      imgH:       offset === 0 ? 260 : abs === 1 ? 210 : 180,
      cardW:      offset === 0 ? 210 : abs === 1 ? 180 : 155,
    }
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX
    setDragStart(x)
  }
  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStart === null) return
    const x    = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX
    const diff = dragStart - x
    if (Math.abs(diff) > 40) { slide(diff > 0 ? 'right' : 'left'); resetTimer() }
    setDragStart(null)
  }

  return (
    <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#0d0b2e' }}>
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 60%, rgba(249,115,22,0.12) 0%, transparent 70%)' }} />
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Header */}
      <div className="relative z-10 text-center px-6 mb-4">
        <p className="text-xs font-black tracking-[0.25em] uppercase mb-3" style={{ color: '#f97316' }}>
          ★ STUDENT ACHIEVEMENTS ★
        </p>
        <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight">
          Helping <span style={{ color: '#f97316' }}>200,000+</span> students succeed!
        </h2>
        <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
          Real results from real students. Every card is a story of growth, confidence, and achievement.
        </p>
      </div>

      {/* Carousel */}
      <div
        className="relative z-10 select-none"
        style={{ height: '480px', cursor: dragStart !== null ? 'grabbing' : 'grab' }}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        <div className="flex items-end justify-center h-full pb-10 relative">
          {window5.map(({ name, grade, desc, img, award, offset }) => {
            const { zIndex, scale, translateY, opacity, imgH, cardW } = getSlotConfig(offset)
            const isCenter = offset === 0
            const spacing  = 195

            return (
              <div
                key={`${name}-${offset}`}
                className="absolute flex flex-col"
                style={{
                  width:           `${cardW}px`,
                  left:            `calc(50% + ${offset * spacing}px - ${cardW / 2}px)`,
                  bottom:          0,
                  transformOrigin: 'bottom center',
                  transform:       `scale(${scale}) translateY(${translateY}px)`,
                  zIndex,
                  opacity,
                  transition:      'all 0.38s cubic-bezier(0.4,0,0.2,1)',
                  willChange:      'transform, opacity',
                }}
                onClick={() => {
                  if (!isCenter) { slide(offset > 0 ? 'right' : 'left'); resetTimer() }
                }}
              >
                {/* Award badge — centre card only */}
                {isCenter && (
                  <div
                    className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 text-xs font-black text-white rounded-full z-20"
                    style={{
                      background:    'linear-gradient(135deg,#f97316,#ef4444)',
                      boxShadow:     '0 4px 20px rgba(249,115,22,0.5)',
                      letterSpacing: '0.04em',
                      animation:     'badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                    }}
                  >
                    {award}
                  </div>
                )}

                {/* Image */}
                <div
                  className="overflow-hidden w-full"
                  style={{
                    height:       `${imgH}px`,
                    borderRadius: isCenter ? '16px 16px 0 0' : '10px 10px 0 0',
                    border:       isCenter ? '3px solid #f97316' : '2px solid rgba(255,255,255,0.15)',
                    borderBottom: 'none',
                    position:     'relative',
                    transition:   'height 0.38s ease, border 0.38s ease',
                  }}
                >
                  <img
                    src={img} alt={name}
                    className="w-full h-full object-cover object-top"
                    draggable={false}
                    style={{ filter: isCenter ? 'none' : 'brightness(0.7) saturate(0.8)' }}
                  />
                  <div className="absolute inset-0" style={{
                    background: isCenter
                      ? 'linear-gradient(to top, rgba(249,115,22,0.35) 0%, transparent 60%)'
                      : 'linear-gradient(to top, rgba(13,11,46,0.6) 0%, transparent 50%)',
                  }} />
                  {isCenter && (
                    <div className="absolute inset-0"
                      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)' }} />
                  )}
                </div>

                {/* Info footer */}
                <div
                  className="w-full"
                  style={{
                    background:     isCenter
                      ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
                      : 'rgba(255,255,255,0.06)',
                    backdropFilter: isCenter ? 'none' : 'blur(8px)',
                    border:         isCenter ? '3px solid #f97316' : '2px solid rgba(255,255,255,0.1)',
                    borderTop:      'none',
                    borderRadius:   isCenter ? '0 0 16px 16px' : '0 0 10px 10px',
                    padding:        isCenter ? '14px 16px 16px' : '10px 12px 12px',
                    transition:     'all 0.38s ease',
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="font-black leading-none"
                      style={{ color: 'white', fontSize: isCenter ? '15px' : '12px' }}>
                      {name}
                    </p>
                    <span
                      className="font-semibold px-1.5 py-0.5 rounded"
                      style={{
                        fontSize:      '9px',
                        background:    isCenter ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
                        color:         'white',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {grade}
                    </span>
                  </div>
                  <p style={{
                    color:           isCenter ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.55)',
                    fontSize:        isCenter ? '11px' : '9.5px',
                    lineHeight:      '1.5',
                    display:         '-webkit-box',
                    WebkitLineClamp: isCenter ? 3 : 2,
                    WebkitBoxOrient: 'vertical' as const,
                    overflow:        'hidden',
                  }}>
                    {desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Nav arrows */}
      <div className="relative z-20 flex justify-center gap-4 mt-2">
        {(['left', 'right'] as const).map(dir => (
          <button
            key={dir}
            onClick={() => { slide(dir); resetTimer() }}
            className="w-11 h-11 rounded-full flex items-center justify-center font-black text-lg transition-all duration-200"
            style={{ border: '2px solid rgba(255,255,255,0.25)', color: 'white', background: 'rgba(255,255,255,0.05)' }}
            onMouseEnter={e => {
              const b = e.currentTarget
              b.style.background   = '#f97316'
              b.style.borderColor  = '#f97316'
            }}
            onMouseLeave={e => {
              const b = e.currentTarget
              b.style.background   = 'rgba(255,255,255,0.05)'
              b.style.borderColor  = 'rgba(255,255,255,0.25)'
            }}
          >
            {dir === 'left' ? '←' : '→'}
          </button>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {students.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActiveIdx(i); resetTimer() }}
            className="rounded-full transition-all duration-300"
            style={{
              width:      i === activeIdx ? '24px' : '8px',
              height:     '8px',
              background: i === activeIdx ? '#f97316' : 'rgba(255,255,255,0.25)',
              border:     'none',
              cursor:     'pointer',
            }}
          />
        ))}
      </div>

      {/* Stats strip */}
      <div className="relative z-10 flex justify-center gap-8 mt-10 px-6">
        {[
          { val: '200K+', label: 'Students taught' },
          { val: '4.9★',  label: 'Average rating'  },
          { val: '40+',   label: 'Countries'        },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <p className="text-2xl font-black" style={{ color: '#f97316' }}>{s.val}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes badgePop {
          0%   { transform: translateX(-50%) scale(0.5); opacity: 0; }
          100% { transform: translateX(-50%) scale(1);   opacity: 1; }
        }
      `}</style>
    </section>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const [grade, setGrade]             = useState('KG - G8')
  const [classOpt, setClassOpt]       = useState('2 classes/week')
  const [hovIncl, setHovIncl]         = useState<number | null>(null)
  const [hovPlan, setHovPlan]         = useState<number | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const activePlans = plans[classOpt as keyof typeof plans]

  return (
    <div className="font-sans bg-white">

      {/* ══════════════════════════════════════════
          SECTION 1 — PRICING
      ══════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#f4f4f4' }}>
        <div className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#e0e0e0 1px,transparent 1px),linear-gradient(90deg,#e0e0e0 1px,transparent 1px)',
            backgroundSize:  '40px 40px',
          }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-2">
              Simple Pricing &amp; Clear Value
            </h2>
            <p className="text-gray-500 text-sm">Affordable tutoring for complete math mastery</p>
          </div>

          {/* Grade toggle */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="font-black text-gray-900 text-sm tracking-widest uppercase">GRADES</span>
            <div className="flex border-2 border-gray-900 rounded-sm overflow-hidden">
              {gradeOptions.map(g => (
                <button key={g} onClick={() => setGrade(g)}
                  className="px-6 py-2 text-sm font-bold transition-all duration-200"
                  style={{ backgroundColor: grade === g ? '#111827' : 'white', color: grade === g ? 'white' : '#111827' }}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Classes/week toggle */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative border-2 border-gray-900 rounded-sm overflow-visible flex">
              {classOptions.map(opt => (
                <div key={opt.label} className="relative">
                  {opt.tag && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-3 py-0.5 text-xs font-black text-white whitespace-nowrap rounded-sm z-10"
                      style={{ backgroundColor: '#00b67a', letterSpacing: '0.08em' }}>
                      {opt.tag}
                    </div>
                  )}
                  <button onClick={() => setClassOpt(opt.label)}
                    className="px-8 py-3 text-sm font-bold transition-all duration-200"
                    style={{ backgroundColor: classOpt === opt.label ? '#111827' : 'white', color: classOpt === opt.label ? 'white' : '#111827' }}>
                    {opt.label}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Plan cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-2xl overflow-hidden shadow-xl border-2 border-gray-200">
            {activePlans.map((plan, i) => {
              const isHov = hovPlan === i
              return (
                <div key={i} className="flex flex-col transition-all duration-300 cursor-default"
                  style={{
                    backgroundColor: plan.bg,
                    transform:   isHov ? 'scale(1.02)' : 'scale(1)',
                    boxShadow:   isHov ? '0 12px 40px rgba(0,0,0,0.15)' : 'none',
                    zIndex:      isHov ? 10 : 1,
                    position:    'relative',
                    borderRight: i < 2 ? '2px solid rgba(0,0,0,0.1)' : 'none',
                  }}
                  onMouseEnter={() => setHovPlan(i)}
                  onMouseLeave={() => setHovPlan(null)}>
                  <div className="px-6 py-4" style={{ backgroundColor: plan.headerBg }}>
                    <h3 className="text-2xl font-black text-gray-900">
                      <span className="text-4xl">{plan.duration}</span> {plan.label}
                    </h3>
                  </div>
                  <div className="px-6 py-6 flex-1 flex flex-col gap-3">
                    {plan.originalPrice && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 line-through">₹{plan.originalPrice}/class</span>
                        <span className="text-xs font-black text-white px-2 py-0.5 rounded-sm"
                          style={{ backgroundColor: '#f97316' }}>{plan.discount}</span>
                      </div>
                    )}
                    <p className="text-4xl font-black text-gray-900">
                      ₹{plan.price}<span className="text-base font-bold">/class</span>
                    </p>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#16a34a' }} />
                        <span className="text-sm text-gray-800 font-medium">{plan.classes} classes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#16a34a' }} />
                        <span className="text-sm text-gray-800 font-medium">
                          ₹{plan.billing.toLocaleString()} billed every {plan.billingPeriod}
                        </span>
                      </div>
                    </div>
                    <button className="mt-4 w-full py-3 rounded-xl font-black text-white text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg transform"
                      style={{ backgroundColor: '#111827' }}>
                      Get Started →
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="text-center text-gray-500 text-xs mt-4">All pricing is exclusive of 18% GST</p>

          {/* Feature icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            {features.map((f, i) => (
              <div key={i}
                className="bg-white rounded-2xl px-6 py-7 flex flex-col items-center text-center gap-3 border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <span className="text-4xl">{f.icon}</span>
                <p className="font-black text-gray-900 text-sm">{f.label}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — ALL PLANS INCLUDE
      ══════════════════════════════════════════ */}
      <section className="bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#e5e7eb 1px,transparent 1px),linear-gradient(90deg,#e5e7eb 1px,transparent 1px)',
            backgroundSize:  '40px 40px',
          }} />

        <div className="relative z-10">
          <div className="flex justify-center pt-14 pb-0">
            <div className="border-2 border-gray-900 px-12 py-5 bg-white">
              <h2 className="text-3xl font-black text-gray-900 text-center">All Plans Include</h2>
            </div>
          </div>

          <div className="border-t-2 border-l-2 border-gray-900"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {included.map((item, i) => {
              const isHov = hovIncl === i
              return (
                <div key={i}
                  className="relative border-r-2 border-b-2 border-gray-900 overflow-hidden cursor-default"
                  style={{ minHeight: '200px' }}
                  onMouseEnter={() => setHovIncl(i)}
                  onMouseLeave={() => setHovIncl(null)}>
                  {/* Default */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6"
                    style={{
                      opacity:    isHov ? 0 : 1,
                      transform:  isHov ? 'translateY(-12px)' : 'translateY(0)',
                      transition: 'opacity 0.25s ease, transform 0.25s ease',
                    }}>
                    <span className="font-mono font-bold leading-none select-none"
                      style={{ fontSize: '2.8rem', color: item.color }}>{item.symbol}</span>
                    <p className="font-black text-gray-900 text-sm text-center leading-snug">{item.label}</p>
                  </div>
                  {/* Hover */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6"
                    style={{
                      opacity:         isHov ? 1 : 0,
                      transform:       isHov ? 'translateY(0)' : 'translateY(14px)',
                      transition:      'opacity 0.25s ease, transform 0.25s ease',
                      backgroundColor: item.color + '12',
                    }}>
                    <div className="w-8 h-1 rounded-full mb-1" style={{ backgroundColor: item.color }} />
                    <p className="font-black text-gray-900 text-sm text-center">{item.label}</p>
                    <p className="text-gray-600 text-xs text-center leading-relaxed">{item.desc}</p>
                  </div>
                  {/* Left border flash */}
                  <div className="absolute top-0 left-0 w-1 transition-all duration-300"
                    style={{ height: isHov ? '100%' : '0%', backgroundColor: item.color }} />
                </div>
              )
            })}
          </div>

          <div className="border-t-2 border-gray-900 py-8 flex flex-col items-center gap-4 bg-white">
            <p className="text-gray-500 text-sm">Everything your child needs to excel — all in one subscription.</p>
            <button
              className="px-10 py-3 rounded-xl font-black text-white text-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 transform"
              style={{ backgroundColor: '#111827', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
              Start Free Trial →
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — STUDENT SUCCESS
      ══════════════════════════════════════════ */}
      <StudentsSuccessSection />

      {/* ══════════════════════════════════════════
          SECTION 4 — TRUSTPILOT REVIEWS
          • reviews array has one `message` field
          • message is ALWAYS visible (no hide/reveal)
          • hover = green highlight only
      ══════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">

          {/* Header badge */}
          <div className="flex justify-center mb-10">
            <div className="flex items-center gap-3 px-8 py-4 border-2 border-gray-800 rounded-sm"
              style={{ justifyContent: 'center' }}>
              <span className="text-xl font-black text-gray-900">Rated 4.9+ on</span>
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 flex items-center justify-center"
                  style={{ backgroundColor: '#00b67a', borderRadius: '2px' }}>
                  <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900">Trustpilot</span>
              </div>
            </div>
          </div>

          {/* 2-col review grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review, i) => {
              const isHov = hoveredCard === i
              return (
                <div
                  key={i}
                  className="relative flex flex-col gap-3 rounded-2xl px-5 py-5 cursor-default transition-all duration-300"
                  style={{
                    backgroundColor: isHov ? '#f0fdf8' : '#fafafa',
                    border:          `1.5px solid ${isHov ? '#00b67a' : '#e5e7eb'}`,
                    boxShadow:       isHov ? '0 8px 28px rgba(0,182,122,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
                    transform:       isHov ? 'translateY(-3px)' : 'translateY(0)',
                  }}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Green sweep bar along top edge */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                    style={{
                      backgroundColor: '#00b67a',
                      transform:       isHov ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition:      'transform 0.3s ease',
                    }}
                  />

                  {/* Stars + Verified pill */}
                  <div className="flex items-center justify-between">
                    <StarRating count={review.rating} />
                    <span
                      className="text-xs font-black px-2 py-0.5 rounded-full transition-all duration-200"
                      style={{
                        backgroundColor: isHov ? '#00b67a' : '#f0fdf8',
                        color:           isHov ? 'white'   : '#00b67a',
                      }}
                    >
                      Verified
                    </span>
                  </div>

                  {/* Reviewer name */}
                  <p className="font-black text-gray-900 text-sm leading-none">{review.name}</p>

                  {/* Divider — turns green on hover */}
                  <div className="h-px transition-colors duration-300"
                    style={{ backgroundColor: isHov ? '#00b67a' : '#e5e7eb' }} />

                  {/* Review message — ALWAYS VISIBLE */}
                  <p
                    className="text-xs leading-relaxed flex-1 transition-colors duration-300"
                    style={{ color: isHov ? '#374151' : '#6b7280' }}
                  >
                    &ldquo;{review.message}&rdquo;
                  </p>

                  {/* Closing quote accent */}
                  <div
                    className="self-end font-black text-3xl leading-none select-none transition-colors duration-300"
                    style={{ color: isHov ? '#00b67a' : '#e5e7eb', marginTop: '-4px' }}
                  >
                    &rdquo;
                  </div>
                </div>
              )
            })}
          </div>

          {/* Footer */}
          <div className="text-center mt-8 flex items-center justify-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center rounded-sm" style={{ backgroundColor: '#00b67a' }}>
              <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <span className="text-xs text-gray-400">Reviews from verified Trustpilot users</span>
          </div>

        </div>
      </section>

    </div>
  )
}
