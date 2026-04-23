'use client'
import { useState } from 'react'
import { Check, Calendar, RefreshCw, BookOpen } from 'lucide-react'

// ─── DATA ─────────────────────────────────────────────────────────────────────

const gradeOptions = ['KG - G8', 'G9 - G12']

const classOptions = [
  { label: '2 classes/week', tag: null },
  { label: '3 classes/week', tag: 'MOST RECOMMENDED' },
]

const plans = {
  '2 classes/week': [
    {
      duration: '3',
      label: 'Months',
      bg: '#7ee8fa',
      headerBg: '#5dd8f0',
      price: 1000,
      originalPrice: null,
      discount: null,
      classes: 26,
      billing: 26000,
      billingPeriod: '13 weeks',
    },
    {
      duration: '6',
      label: 'Months',
      bg: '#f4b8a0',
      headerBg: '#f0a080',
      price: 900,
      originalPrice: 1000,
      discount: '10% OFF',
      classes: 52,
      billing: 46800,
      billingPeriod: '26 weeks',
    },
    {
      duration: '12',
      label: 'Months',
      bg: '#f9a8e8',
      headerBg: '#f080d8',
      price: 800,
      originalPrice: 1000,
      discount: '20% OFF',
      classes: 104,
      billing: 83200,
      billingPeriod: '52 weeks',
    },
  ],
  '3 classes/week': [
    {
      duration: '3',
      label: 'Months',
      bg: '#7ee8fa',
      headerBg: '#5dd8f0',
      price: 1000,
      originalPrice: null,
      discount: null,
      classes: 39,
      billing: 39000,
      billingPeriod: '13 weeks',
    },
    {
      duration: '6',
      label: 'Months',
      bg: '#f4b8a0',
      headerBg: '#f0a080',
      price: 900,
      originalPrice: 1000,
      discount: '10% OFF',
      classes: 78,
      billing: 70200,
      billingPeriod: '26 weeks',
    },
    {
      duration: '12',
      label: 'Months',
      bg: '#f9a8e8',
      headerBg: '#f080d8',
      price: 800,
      originalPrice: 1000,
      discount: '20% OFF',
      classes: 156,
      billing: 124800,
      billingPeriod: '52 weeks',
    },
  ],
}

const features = [
  { icon: '📅', label: 'Flexible Leaves', desc: 'Reschedule or take leaves without losing your classes. Full flexibility built in.' },
  { icon: '🗓️', label: 'Adjustable Schedule', desc: 'Change your class timings anytime to fit your child\'s routine and school schedule.' },
  { icon: '💸', label: 'Easy Refunds',       desc: 'No-questions-asked refund policy within the first 7 days. Zero risk, full peace of mind.' },
]

const included = [
  { symbol: 'Σ',  color: '#f59e0b', label: 'Learning Plan',     desc: 'A custom-built roadmap tailored to your child\'s current level, goals, and learning pace.' },
  { symbol: '%',  color: '#f97316', label: 'Exam Preparation',  desc: 'Targeted practice, mock tests, and strategies to ace school exams and competitive math tests.' },
  { symbol: '△',  color: '#ec4899', label: 'Homework Help',     desc: 'Live doubt-clearing for homework and school assignments — no question is left unanswered.' },
  { symbol: '∞',  color: '#10b981', label: 'Advanced Learning', desc: 'Go beyond the syllabus with enrichment topics that build real mathematical thinking.' },
  { symbol: 'λ',  color: '#06b6d4', label: 'Smart Practice',    desc: 'AI-powered practice questions that adapt to your child\'s mistakes and reinforce weak areas.' },
  { symbol: '±',  color: '#eab308', label: 'Mental Math',       desc: 'Daily mental math exercises that sharpen speed, accuracy, and numerical intuition.' },
  { symbol: '✓',  color: '#22c55e', label: 'Remedial Support',  desc: 'Identify and fix foundational gaps so your child never feels left behind in class again.' },
  { symbol: 'U',  color: '#f97316', label: 'Parent App',        desc: 'Real-time progress reports, session recordings, and tutor feedback — all in your pocket.' },
]

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function PricingSection() {
  const [grade, setGrade]       = useState('KG - G8')
  const [classOpt, setClassOpt] = useState('2 classes/week')
  const [hovIncl, setHovIncl]   = useState<number | null>(null)
  const [hovPlan, setHovPlan]   = useState<number | null>(null)

  const activePlans = plans[classOpt as keyof typeof plans]

  return (
    <div className="font-sans bg-white">

      {/* ══════════════════════════════════════════
          SECTION 1 — PRICING
      ══════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#f4f4f4' }}>
        {/* Grid background */}
        <div className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#e0e0e0 1px,transparent 1px),linear-gradient(90deg,#e0e0e0 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6">

          {/* Header */}
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
                <button
                  key={g}
                  onClick={() => setGrade(g)}
                  className="px-6 py-2 text-sm font-bold transition-all duration-200"
                  style={{
                    backgroundColor: grade === g ? '#111827' : 'white',
                    color: grade === g ? 'white' : '#111827',
                  }}
                >
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
                    <div
                      className="absolute -top-6 left-1/2 -translate-x-1/2 px-3 py-0.5 text-xs font-black text-white whitespace-nowrap rounded-sm z-10"
                      style={{ backgroundColor: '#00b67a', letterSpacing: '0.08em' }}
                    >
                      {opt.tag}
                    </div>
                  )}
                  <button
                    onClick={() => setClassOpt(opt.label)}
                    className="px-8 py-3 text-sm font-bold transition-all duration-200"
                    style={{
                      backgroundColor: classOpt === opt.label ? '#111827' : 'white',
                      color: classOpt === opt.label ? 'white' : '#111827',
                    }}
                  >
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
                <div
                  key={i}
                  className="flex flex-col transition-all duration-300 cursor-default"
                  style={{
                    backgroundColor: plan.bg,
                    transform: isHov ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: isHov ? '0 12px 40px rgba(0,0,0,0.15)' : 'none',
                    zIndex: isHov ? 10 : 1,
                    position: 'relative',
                    borderRight: i < 2 ? '2px solid rgba(0,0,0,0.1)' : 'none',
                  }}
                  onMouseEnter={() => setHovPlan(i)}
                  onMouseLeave={() => setHovPlan(null)}
                >
                  {/* Header */}
                  <div className="px-6 py-4" style={{ backgroundColor: plan.headerBg }}>
                    <h3 className="text-2xl font-black text-gray-900">
                      <span className="text-4xl">{plan.duration}</span> {plan.label}
                    </h3>
                  </div>

                  {/* Body */}
                  <div className="px-6 py-6 flex-1 flex flex-col gap-3">
                    {/* Original + discount */}
                    {plan.originalPrice && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 line-through">₹{plan.originalPrice}/class</span>
                        <span
                          className="text-xs font-black text-white px-2 py-0.5 rounded-sm"
                          style={{ backgroundColor: '#f97316' }}
                        >
                          {plan.discount}
                        </span>
                      </div>
                    )}

                    {/* Price */}
                    <p className="text-4xl font-black text-gray-900">
                      ₹{plan.price}<span className="text-base font-bold">/class</span>
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#16a34a' }} />
                        <span className="text-sm text-gray-800 font-medium">{plan.classes} classes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#16a34a' }} />
                        <span className="text-sm text-gray-800 font-medium">₹{plan.billing.toLocaleString()} billed every {plan.billingPeriod}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <button
                      className="mt-4 w-full py-3 rounded-xl font-black text-white text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg transform"
                      style={{ backgroundColor: '#111827' }}
                    >
                      Get Started →
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="text-center text-gray-500 text-xs mt-4">All pricing is exclusive of 18% GST</p>

          {/* Feature icons row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl px-6 py-7 flex flex-col items-center text-center gap-3 border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
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

        {/* Grid background */}
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#e5e7eb 1px,transparent 1px),linear-gradient(90deg,#e5e7eb 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

        <div className="relative z-10">
          {/* Title bar — bordered box centred */}
          <div className="flex justify-center pt-14 pb-0">
            <div className="border-2 border-gray-900 px-12 py-5 bg-white">
              <h2 className="text-3xl font-black text-gray-900 text-center">All Plans Include</h2>
            </div>
          </div>

          {/* 4×2 grid — full width, bordered cells */}
          <div
            className="border-t-2 border-l-2 border-gray-900"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}
          >
            {included.map((item, i) => {
              const isHov = hovIncl === i
              return (
                <div
                  key={i}
                  className="relative border-r-2 border-b-2 border-gray-900 overflow-hidden cursor-default"
                  style={{ minHeight: '200px' }}
                  onMouseEnter={() => setHovIncl(i)}
                  onMouseLeave={() => setHovIncl(null)}
                >
                  {/* Default state — symbol + label */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 transition-all duration-400"
                    style={{
                      opacity: isHov ? 0 : 1,
                      transform: isHov ? 'translateY(-12px)' : 'translateY(0)',
                      transition: 'opacity 0.25s ease, transform 0.25s ease',
                    }}
                  >
                    {/* Math symbol */}
                    <span
                      className="font-mono font-bold leading-none select-none"
                      style={{ fontSize: '2.8rem', color: item.color }}
                    >
                      {item.symbol}
                    </span>
                    <p className="font-black text-gray-900 text-sm text-center leading-snug">
                      {item.label}
                    </p>
                  </div>

                  {/* Hover state — description */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 transition-all duration-400"
                    style={{
                      opacity: isHov ? 1 : 0,
                      transform: isHov ? 'translateY(0)' : 'translateY(14px)',
                      transition: 'opacity 0.25s ease, transform 0.25s ease',
                      backgroundColor: item.color + '12',
                    }}
                  >
                    {/* Accent top bar */}
                    <div className="w-8 h-1 rounded-full mb-1" style={{ backgroundColor: item.color }} />
                    <p className="font-black text-gray-900 text-sm text-center">{item.label}</p>
                    <p className="text-gray-600 text-xs text-center leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Hover: colored left border flash */}
                  <div
                    className="absolute top-0 left-0 w-1 transition-all duration-300"
                    style={{
                      height: isHov ? '100%' : '0%',
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              )
            })}
          </div>

          {/* Bottom CTA strip */}
          <div className="border-t-2 border-gray-900 py-8 flex flex-col items-center gap-4 bg-white">
            <p className="text-gray-500 text-sm">Everything your child needs to excel — all in one subscription.</p>
            <button
              className="px-10 py-3 rounded-xl font-black text-white text-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 transform"
              style={{ backgroundColor: '#111827', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
            >
              Start Free Trial →
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
