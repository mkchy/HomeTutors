'use client'
import { useState, useRef, useEffect } from 'react'
import { X, Plus, ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'What is the frequency and duration of your classes?',
    a: "Typically, the number of classes is two per week for grades K to 8, and three per week for high school. But the schedule is flexible, according to your child's requirements and availability. Also, each class runs for 55 minutes, extendable to an hour.",
    category: 'Schedule',
    emoji: '🗓️',
  },
  {
    q: 'What devices do I need for attending your classes?',
    a: 'You need a computer, tablet, or smartphone with a stable internet connection. A webcam and microphone are recommended for the best learning experience.',
    category: 'Technical',
    emoji: '💻',
  },
  {
    q: "My child has specific learning requirements. Is your program flexible enough?",
    a: "Absolutely. Our 1:1 model means every session is tailored specifically to your child's pace, learning style, and requirements. Our tutors are trained to handle diverse learning needs.",
    category: 'Curriculum',
    emoji: '🎯',
  },
  {
    q: "Can your tutors teach the topics covered in my child's school or curriculum?",
    a: "Yes! Our tutors are well-versed in all major curricula including Common Core, CBSE, ICSE, IB, and more. They can align sessions with your child's school syllabus.",
    category: 'Curriculum',
    emoji: '📚',
  },
  {
    q: 'Can my child join anytime of the year?',
    a: 'Yes, enrollment is open year-round. You can start at any time and our team will onboard your child with a diagnostic assessment to place them at the right level.',
    category: 'Enrollment',
    emoji: '🚀',
  },
  {
    q: 'How are the tutors selected and qualified?',
    a: 'All our tutors go through a rigorous 3-stage selection process including subject tests, demo sessions, and background checks. Only the top 5% of applicants are accepted, ensuring your child gets the best possible guidance.',
    category: 'Tutors',
    emoji: '👨‍🏫',
  },
  {
    q: 'Is there a free trial available?',
    a: 'Yes! We offer a complimentary first session so your child can experience our teaching style and platform before committing. No credit card is required for the trial.',
    category: 'Pricing',
    emoji: '🎁',
  },
  {
    q: 'What happens if my child misses a class?',
    a: 'No worries! Missed classes can be rescheduled at no extra cost. We also provide session recordings so your child never falls behind on any topic covered.',
    category: 'Schedule',
    emoji: '🔄',
  },
]

const VISIBLE_COUNT = 4

function AccordionItem({ faq, index, isOpen, onToggle }: {
  faq: typeof faqs[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(isOpen ? bodyRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div
      className="group rounded-2xl mb-3 overflow-hidden border transition-all duration-300"
      style={{
        backgroundColor: isOpen ? '#faf5ff' : 'white',
        borderColor: isOpen ? '#c4b5fd' : '#e5e7eb',
        boxShadow: isOpen ? '0 4px 24px rgba(139,92,246,0.12)' : '0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-6 py-5 text-left"
      >
        {/* Emoji badge */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-all duration-300"
          style={{
            backgroundColor: isOpen ? '#ede9fe' : '#f3f4f6',
            transform: isOpen ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          {faq.emoji}
        </div>

        {/* Question */}
        <div className="flex-1 min-w-0">
          <span
            className="text-sm font-bold transition-colors duration-200 leading-snug block"
            style={{ color: isOpen ? '#4F46E5' : '#111827' }}
          >
            {faq.q}
          </span>
        </div>

        {/* Icon */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            backgroundColor: isOpen ? '#4F46E5' : '#f3f4f6',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <Plus
            className="w-4 h-4 transition-colors duration-300"
            style={{ color: isOpen ? 'white' : '#6b7280' }}
          />
        </div>
      </button>

      {/* Animated body */}
      <div
        style={{
          height: `${height}px`,
          overflow: 'hidden',
          transition: 'height 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div ref={bodyRef} className="px-6 pb-5 pt-1">
          <div className="ml-14">
            {/* Category chip */}
            <span
              className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-0.5 rounded-full mb-3"
              style={{ backgroundColor: '#ede9fe', color: '#7c3aed' }}
            >
              {faq.category}
            </span>
            <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)
  const [showAll, setShowAll] = useState(false)

  const visibleFaqs = showAll ? faqs : faqs.slice(0, VISIBLE_COUNT)

  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #fdf4ff 0%, #fce7f3 20%, #ede9fe 45%, #dbeafe 70%, #d1fae5 100%)' }}
    >
      {/* BG blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c4b5fd, transparent)' }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6ee7b7, transparent)' }} />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
            style={{ backgroundColor: '#ede9fe', color: '#6d28d9' }}>
            FAQ
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            We love solving{' '}
            <span className="relative inline-block">
              <span style={{ color: '#4F46E5' }}>doubts!</span>
              <svg className="absolute -bottom-1 left-0 w-full" height="5" viewBox="0 0 100 5" preserveAspectRatio="none">
                <path d="M0 4 Q50 0 100 4" stroke="#a5b4fc" strokeWidth="3" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
            Got questions? We've got answers. Find everything you need to know about our platform.
          </p>
        </div>

        {/* FAQ list */}
        <div>
          {visibleFaqs.map((faq, i) => (
            <div
              key={i}
              style={{
                opacity: 0,
                animation: `fadeSlideUp 0.4s ease forwards`,
                animationDelay: `${i * 60}ms`,
              }}
            >
              <AccordionItem
                faq={faq}
                index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </div>
          ))}
        </div>

        {/* Hidden items fade preview when collapsed */}
        {!showAll && (
          <div className="relative -mt-6 h-20 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, #f3eeff)' }}
          />
        )}

        {/* See More / See Less button */}
        <div className="text-center mt-4">
          <button
            onClick={() => {
              setShowAll(!showAll)
              if (showAll) setOpen(0)
            }}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 transform"
            style={{
              backgroundColor: '#4F46E5',
              color: 'white',
              boxShadow: '0 4px 16px rgba(79,70,229,0.3)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#4338ca'
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(79,70,229,0.45)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#4F46E5'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(79,70,229,0.3)'
            }}
          >
            <ChevronDown
              className="w-4 h-4 transition-transform duration-300"
              style={{ transform: showAll ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
            {showAll ? 'See Less' : `See More (${faqs.length - VISIBLE_COUNT} more)`}
          </button>
        </div>

        {/* Bottom contact prompt */}
        <div className="mt-14 text-center p-8 rounded-3xl border border-indigo-100"
          style={{ backgroundColor: 'white' }}>
          <p className="text-gray-500 text-sm mb-2">Still have questions?</p>
          <p className="font-black text-gray-900 text-lg mb-4">We're here to help 24/7</p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: '#4F46E5' }}
          >
            💬 Contact Support
          </a>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
