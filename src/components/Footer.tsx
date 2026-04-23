'use client'
import { useEffect, useRef } from 'react'
import { GraduationCap, MapPin, Phone, MessageCircle, Mail, ArrowUpRight, Send } from 'lucide-react'

const aboutLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Instructor Registration', href: '#' },
  { label: 'Become A Teacher', href: '#' },
  { label: 'All Instructors', href: '#' },
  { label: 'Asked Question', href: '#' },
  { label: 'Contact Us', href: '#' },
]
const courseLinks = [
  { label: 'Development', href: '#' },
  { label: 'Arts & Design', href: '#' },
  { label: 'Visual Design', href: '#' },
  { label: 'Graphic Design', href: '#' },
  { label: 'Code Inspection', href: '#' },
  { label: 'Digital Marketing', href: '#' },
]

const socialLinks = [
  {
    title: 'Facebook',
    href: 'https://www.facebook.com/',   // ← replace with your Facebook page URL
    hoverBg: '#1877F2',
    hoverShadow: '#1877F244',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    title: 'X / Twitter',
    href: 'https://twitter.com/',       // ← replace with your X/Twitter handle URL
    hoverBg: '#000000',
    hoverShadow: '#00000044',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/', // ← replace with your Instagram profile URL
    hoverBg: '#E1306C',
    hoverShadow: '#E1306C44',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    title: 'LinkedIn',
    href: 'https://in.linkedin.com/in/mkchy', // ← replace with your LinkedIn page URL
    hoverBg: '#0A66C2',
    hoverShadow: '#0A66C244',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    title: 'WhatsApp',
    href: 'https://wa.me/919507819754',            // ← uses your phone number (91 = India code, no +)
    hoverBg: '#25D366',
    hoverShadow: '#25D36644',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    title: 'YouTube',
    href: 'https://www.youtube.com/', // ← replace with your YouTube channel URL
    hoverBg: '#FF0000',
    hoverShadow: '#FF000044',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
]

const contactItems = [
  {
    icon: MapPin,
    text: 'Plot No. GH-01 Link Road, Greater Noida, Uttar Pradesh 201318',
    isLink: false,
  },
  {
    icon: Phone,
    text: '+91 9507819754',
    isLink: false,
  },
  {
    icon: MessageCircle,
    text: 'Contact Whatsapp',
    isLink: true,
    href: '#',
  },
  {
    icon: Mail,
    text: 'mkchaudhary00@gmail.com',
    isLink: false,
  },
]

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const cols = footerRef.current?.querySelectorAll('.footer-col')
          cols?.forEach((col, i) => {
            setTimeout(() => {
              col.classList.add('opacity-100', 'translate-y-0')
              col.classList.remove('opacity-0', 'translate-y-8')
            }, i * 100)
          })
        }
      },
      { threshold: 0.1 }
    )
    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className="relative overflow-hidden" style={{ backgroundColor: '#ffffff' }}>

      {/* Top decorative wave */}
      <div className="w-full overflow-hidden leading-none" style={{ backgroundColor: '#f8f7ff' }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,40 1440,35 L1440,60 L0,60 Z" fill="white"/>
        </svg>
      </div>

      {/* Subtle bg blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4F46E5, transparent)' }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #818cf8, transparent)' }} />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-4 pb-14 relative z-10">

        {/* Newsletter banner */}
        <div
          className="rounded-3xl px-8 py-7 mb-14 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(135deg, #4F46E5 0%, #7c3aed 100%)',
            boxShadow: '0 8px 40px rgba(79,70,229,0.25)',
          }}
        >
          <div>
            <h3 className="text-white font-black text-xl mb-1">Stay updated with our latest courses!</h3>
            <p className="text-indigo-200 text-sm">Get new course alerts, tips, and offers directly in your inbox.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email..."
              className="flex-1 md:w-64 px-4 py-3 rounded-xl text-sm outline-none bg-white/10 border border-white/20 text-white placeholder-white/50 focus:bg-white/20 transition-colors"
            />
            <button
              className="px-5 py-3 rounded-xl text-sm font-black bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 transform flex items-center gap-2 flex-shrink-0"
              style={{ color: '#4F46E5' }}
            >
              <Send className="w-4 h-4" />
              Subscribe
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand col */}
          <div className="footer-col opacity-0 translate-y-8 transition-all duration-500 space-y-5">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ background: 'linear-gradient(135deg, #4F46E5, #7c3aed)' }}
              >
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-gray-900 text-xl">Home Tutors</span>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Empowering students across India with world-class 1:1 tutoring from expert educators.
            </p>

            {/* Social icons — official SVGs */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Follow Us</p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    title={social.title}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300"
                    style={{ borderColor: '#e5e7eb', color: '#6b7280' }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget
                      el.style.backgroundColor = social.hoverBg
                      el.style.borderColor = social.hoverBg
                      el.style.color = 'white'
                      el.style.transform = 'translateY(-3px) scale(1.1)'
                      el.style.boxShadow = `0 6px 18px ${social.hoverShadow}`
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      el.style.backgroundColor = 'white'
                      el.style.borderColor = '#e5e7eb'
                      el.style.color = '#6b7280'
                      el.style.transform = 'translateY(0) scale(1)'
                      el.style.boxShadow = 'none'
                    }}
                  >
                    {social.svg}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* About col */}
          <div className="footer-col opacity-0 translate-y-8 transition-all duration-500">
            <h4 className="font-black text-gray-900 text-base mb-6 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full inline-block" style={{ backgroundColor: '#4F46E5' }} />
              About Us
            </h4>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-gray-500 text-sm transition-all duration-200 hover:text-indigo-600"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0" style={{ color: '#4F46E5' }} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses col */}
          <div className="footer-col opacity-0 translate-y-8 transition-all duration-500">
            <h4 className="font-black text-gray-900 text-base mb-6 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full inline-block" style={{ backgroundColor: '#7c3aed' }} />
              Popular Courses
            </h4>
            <ul className="space-y-3">
              {courseLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-gray-500 text-sm transition-all duration-200 hover:text-indigo-600"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0" style={{ color: '#7c3aed' }} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div className="footer-col opacity-0 translate-y-8 transition-all duration-500">
            <h4 className="font-black text-gray-900 text-base mb-6 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full inline-block" style={{ backgroundColor: '#06b6d4' }} />
              Contact Info
            </h4>
            <ul className="space-y-4">
              {contactItems.map((item, i) => {
                const Icon = item.icon
                return (
                  <li key={i} className="flex items-start gap-3 group">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: '#eef2ff' }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: '#4F46E5' }} />
                    </div>
                    {item.isLink ? (
                      <a href={item.href} className="text-gray-500 text-sm hover:text-indigo-600 transition-colors leading-relaxed">
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-gray-500 text-sm leading-relaxed">{item.text}</span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="h-px mx-6 lg:mx-12" style={{ background: 'linear-gradient(90deg, transparent, #e0e7ff, transparent)' }} />

      {/* Bottom bar */}
      <div className="py-5 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-sm">© 2026 <span className="font-bold text-gray-600">Home Tutors</span>. All Rights Reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="text-gray-400 text-xs hover:text-indigo-600 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}
