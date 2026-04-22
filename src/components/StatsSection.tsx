'use client'
import { useEffect, useRef, useState } from 'react'
import { Folder, Trophy, UserCheck, Users } from 'lucide-react'

const stats = [
  {
    icon: Folder,
    value: 134,
    suffix: '+',
    label: 'Online Courses',
    sub: 'Expert-curated content',
    color: '#f87171',
    bg: '#fef2f2',
    border: '#fecaca',
    glow: 'rgba(248,113,113,0.18)',
    gradient: 'linear-gradient(135deg,#fff5f5,#fef2f2)',
  },
  {
    icon: Trophy,
    value: 299,
    suffix: '+',
    label: 'Academic Programs',
    sub: 'Across all grade levels',
    color: '#818cf8',
    bg: '#eef2ff',
    border: '#c7d2fe',
    glow: 'rgba(129,140,248,0.18)',
    gradient: 'linear-gradient(135deg,#f5f3ff,#eef2ff)',
  },
  {
    icon: UserCheck,
    value: 684,
    suffix: '+',
    label: 'Certified Students',
    sub: 'Recognised nationally',
    color: '#60a5fa',
    bg: '#eff6ff',
    border: '#bfdbfe',
    glow: 'rgba(96,165,250,0.18)',
    gradient: 'linear-gradient(135deg,#f0f9ff,#eff6ff)',
  },
  {
    icon: Users,
    value: 941,
    suffix: '+',
    label: 'Enrolled Students',
    sub: 'And growing every day',
    color: '#34d399',
    bg: '#ecfdf5',
    border: '#a7f3d0',
    glow: 'rgba(52,211,153,0.18)',
    gradient: 'linear-gradient(135deg,#f0fdf4,#ecfdf5)',
  },
]

function Counter({
  target,
  suffix = '',
  duration = 1800,
}: {
  target: number
  suffix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  const [hovered, setHovered] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const cards = sectionRef.current?.querySelectorAll('.stat-card')
          cards?.forEach((card, i) => {
            setTimeout(() => {
              card.classList.add('!opacity-100', '!translate-y-0')
              card.classList.remove('opacity-0', 'translate-y-10')
            }, i * 120)
          })
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-white pt-0 pb-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* FIX: added min-w-0 to each card to prevent flex/grid blowout */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 -mt-10 relative z-10"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon
            const isHovered = hovered === i

            return (
              <div
                key={i}
                /* FIX: added min-w-0 so the counter text can't overflow the column */
                className="stat-card min-w-0 opacity-0 translate-y-10 transition-all duration-500 rounded-3xl p-6 cursor-default select-none"
                style={{
                  background: isHovered ? stat.gradient : 'white',
                  border: `1.5px solid ${isHovered ? stat.border : '#f3f4f6'}`,
                  boxShadow: isHovered
                    ? `0 20px 48px ${stat.glow}, 0 4px 16px rgba(0,0,0,0.06)`
                    : '0 4px 20px rgba(0,0,0,0.07)',
                  transform: isHovered
                    ? 'translateY(-8px) scale(1.02)'
                    : 'translateY(0) scale(1)',
                  transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-5">
                  {/* Icon bubble */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      backgroundColor: isHovered ? stat.color : stat.bg,
                      transform: isHovered
                        ? 'rotate(-6deg) scale(1.12)'
                        : 'rotate(0deg) scale(1)',
                      boxShadow: isHovered ? `0 8px 20px ${stat.glow}` : 'none',
                    }}
                  >
                    <Icon
                      className="w-7 h-7 transition-colors duration-300"
                      style={{ color: isHovered ? 'white' : stat.color }}
                    />
                  </div>

                  {/* Trend badge */}
                  <div
                    className="text-xs font-black px-2.5 py-1 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: isHovered ? stat.color : stat.bg,
                      color: isHovered ? 'white' : stat.color,
                    }}
                  >
                    ↑ Growing
                  </div>
                </div>

                {/* Counter — FIX: truncate prevents overflow at narrow widths */}
                <p
                  className="text-4xl font-black mb-1 transition-colors duration-300 leading-none truncate"
                  style={{ color: isHovered ? stat.color : '#111827' }}
                >
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>

                {/* Animated progress bar */}
                <div
                  className="h-1 w-full rounded-full mb-3 overflow-hidden"
                  style={{ backgroundColor: stat.bg }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: isHovered ? '80%' : '40%',
                      backgroundColor: stat.color,
                    }}
                  />
                </div>

                {/* Labels */}
                <p className="font-black text-gray-900 text-sm leading-snug">
                  {stat.label}
                </p>
                <p
                  className="text-xs mt-1 transition-colors duration-300"
                  style={{ color: isHovered ? stat.color : '#9ca3af' }}
                >
                  {stat.sub}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
