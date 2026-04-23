'use client'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Send, CheckCircle, AlertCircle, Loader2, User, Mail, Phone, MessageSquare } from 'lucide-react'

const phoneCodes = [
  { label: 'India (+91)',     value: '+91' },
  { label: 'USA (+1)',        value: '+1'  },
  { label: 'UK (+44)',        value: '+44' },
  { label: 'UAE (+971)',      value: '+971'},
  { label: 'Singapore (+65)', value: '+65' },
  { label: 'Canada (+1)',     value: '+1'  },
  { label: 'Australia (+61)', value: '+61' },
]

type Status = 'idle' | 'loading' | 'success' | 'error'

type Field = 'firstName' | 'lastName' | 'phoneCode' | 'phone' | 'email' | 'message' | 'agreed'

export default function DegreeFormSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState({
    firstName: '',
    lastName:  '',
    phoneCode: '+91',
    phone:     '',
    email:     '',
    message:   '',
    agreed:    false,
  })
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [status, setStatus]   = useState<Status>('idle')
  const [errMsg, setErrMsg]   = useState('')

  // Scroll reveal
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        sectionRef.current?.querySelectorAll('.reveal').forEach((el, i) =>
          setTimeout(() => {
            el.classList.add('opacity-100', 'translate-y-0')
            el.classList.remove('opacity-0', 'translate-y-8')
          }, i * 80)
        )
      }
    }, { threshold: 0.1 })
    if (sectionRef.current) ob.observe(sectionRef.current)
    return () => ob.disconnect()
  }, [])

  const set = (k: Field, v: string | boolean) =>
    setForm(prev => ({ ...prev, [k]: v }))

  const touch = (k: Field) =>
    setTouched(prev => ({ ...prev, [k]: true }))

  const errors: Partial<Record<Field, string>> = {
    firstName: !form.firstName.trim()                       ? 'Required' : '',
    lastName:  !form.lastName.trim()                        ? 'Required' : '',
    phone:     !form.phone.trim()                           ? 'Required' : !/^\d{7,15}$/.test(form.phone) ? 'Invalid number' : '',
    email:     !form.email.trim()                           ? 'Required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? 'Invalid email' : '',
    message:   !form.message.trim()                         ? 'Required' : form.message.trim().length < 10 ? 'Too short (min 10 chars)' : '',
  }

  const isValid = Object.values(errors).every(e => !e) && form.agreed

  const handleSubmit = async () => {
    // Touch all fields to show errors
    setTouched({ firstName: true, lastName: true, phone: true, email: true, message: true })
    if (!isValid) return

    setStatus('loading')
    setErrMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName:  form.lastName.trim(),
          phone:     `${form.phoneCode} ${form.phone.trim()}`,
          email:     form.email.trim(),
          message:   form.message.trim(),
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({ firstName: '', lastName: '', phoneCode: '+91', phone: '', email: '', message: '', agreed: false })
        setTouched({})
      } else {
        setStatus('error')
        setErrMsg(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setErrMsg('Network error. Please try again.')
    }
  }

  const inputCls = (field: Field) => {
    const err = touched[field] && errors[field]
    const ok  = touched[field] && !errors[field] && (form[field] as string)
    return [
      'w-full border rounded-xl px-4 py-3 text-sm bg-white outline-none transition-all duration-200',
      err ? 'border-red-400 ring-1 ring-red-300 bg-red-50' :
      ok  ? 'border-green-400 ring-1 ring-green-200' :
            'border-gray-200 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200',
    ].join(' ')
  }

  return (
    <section
      ref={sectionRef}
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#fdf4ff 0%,#fce7f3 20%,#ede9fe 45%,#dbeafe 70%,#d1fae5 100%)' }}
    >
      {/* bg blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle,#a78bfa,transparent)' }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle,#f472b6,transparent)' }} />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── LEFT ── */}
          <div>
            <div className="reveal opacity-0 translate-y-8 transition-all duration-500">
              <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
                style={{ backgroundColor: '#ede9fe', color: '#6d28d9' }}>
                Get Started
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-4">
                Want help choosing the{' '}
                <span className="relative inline-block">
                  <span style={{ color: '#4F46E5' }}>right degree?</span>
                  <svg className="absolute -bottom-1 left-0 w-full" height="5" viewBox="0 0 200 5" preserveAspectRatio="none">
                    <path d="M0 4 Q100 0 200 4" stroke="#a5b4fc" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  </svg>
                </span>
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-sm">
                Complete this form and we'll share guides, insights, and top courses to help make your degree journey that much clearer.
              </p>
            </div>

            {/* SVG illustration */}
            <div className="reveal opacity-0 translate-y-8 transition-all duration-500 flex justify-center">
              <svg viewBox="0 0 320 320" className="w-64 h-64" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="160" cy="260" rx="50" ry="14" fill="#e0e0ff" opacity="0.5"/>
                <rect x="135" y="210" width="20" height="55" rx="10" fill="#4338ca" transform="rotate(-5 145 240)"/>
                <rect x="160" y="210" width="20" height="55" rx="10" fill="#4338ca" transform="rotate(8 170 240)"/>
                <ellipse cx="138" cy="265" rx="16" ry="8" fill="#1e1b4b"/>
                <ellipse cx="178" cy="265" rx="16" ry="8" fill="#1e1b4b"/>
                <rect x="130" y="140" width="72" height="80" rx="16" fill="#4338ca"/>
                <polygon points="160,148 167,168 160,175 153,168" fill="#f5a623"/>
                <rect x="96" y="145" width="38" height="18" rx="9" fill="#6d28d9" transform="rotate(15 115 154)"/>
                <rect x="190" y="145" width="38" height="18" rx="9" fill="#6d28d9" transform="rotate(-20 209 154)"/>
                <rect x="88" y="168" width="32" height="24" rx="6" fill="#f87171"/>
                <rect x="202" y="145" width="22" height="14" rx="7" fill="#fbbf24" transform="rotate(-35 213 152)"/>
                <circle cx="160" cy="118" r="34" fill="#f87171"/>
                <rect x="130" y="96" width="62" height="10" rx="3" fill="#1e1b4b"/>
                <polygon points="160,78 198,96 160,104 122,96" fill="#4338ca"/>
                <line x1="198" y1="96" x2="204" y2="118" stroke="#f5a623" strokeWidth="3"/>
                <rect x="200" y="116" width="10" height="8" rx="2" fill="#f5a623"/>
                <g transform="rotate(-20 80 80)"><rect x="60" y="70" width="36" height="7" rx="2" fill="#4338ca" opacity="0.8"/><polygon points="78,60 96,70 78,74 60,70" fill="#6d28d9" opacity="0.8"/></g>
                <g transform="rotate(15 240 60)"><rect x="225" y="55" width="32" height="6" rx="2" fill="#4338ca" opacity="0.7"/><polygon points="241,46 257,55 241,59 225,55" fill="#6d28d9" opacity="0.7"/></g>
                <rect x="60" y="130" width="18" height="10" rx="3" fill="#f87171" opacity="0.7" transform="rotate(-10 69 135)"/>
                <rect x="240" y="100" width="22" height="12" rx="3" fill="#f5a623" opacity="0.8" transform="rotate(20 251 106)"/>
                <rect x="228" y="165" width="16" height="10" rx="2" fill="#4338ca" opacity="0.6" transform="rotate(-15 236 170)"/>
                <circle cx="230" cy="140" r="6" fill="#1e1b4b" opacity="0.7"/>
              </svg>
            </div>
          </div>

          {/* ── RIGHT: FORM ── */}
          <div className="reveal opacity-0 translate-y-8 transition-all duration-500">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/60">

              {/* Success state */}
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: '#f0fdf4' }}>
                    <CheckCircle className="w-10 h-10" style={{ color: '#16a34a' }} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">Message Sent! 🎉</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    We've received your enquiry and sent a confirmation to your email. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-8 py-3 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 transform"
                    style={{ backgroundColor: '#4F46E5' }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <h3 className="text-lg font-black text-gray-900 mb-6">Fill in your details</h3>

                  {/* First + Last name row */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Ravi"
                          value={form.firstName}
                          onChange={e => set('firstName', e.target.value)}
                          onBlur={() => touch('firstName')}
                          className={inputCls('firstName') + ' pl-9'}
                        />
                      </div>
                      {touched.firstName && errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Kumar"
                        value={form.lastName}
                        onChange={e => set('lastName', e.target.value)}
                        onBlur={() => touch('lastName')}
                        className={inputCls('lastName')}
                      />
                      {touched.lastName && errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="relative w-40 flex-shrink-0">
                        <select
                          value={form.phoneCode}
                          onChange={e => set('phoneCode', e.target.value)}
                          className="w-full appearance-none border border-gray-200 rounded-xl px-3 py-3 text-sm bg-white outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 pr-8 transition-all"
                        >
                          {phoneCodes.map(c => (
                            <option key={c.label} value={c.value}>{c.label}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                      </div>
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                          type="tel"
                          placeholder="9876543210"
                          value={form.phone}
                          onChange={e => set('phone', e.target.value.replace(/\D/g, ''))}
                          onBlur={() => touch('phone')}
                          className={inputCls('phone') + ' pl-9'}
                        />
                      </div>
                    </div>
                    {touched.phone && errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        type="email"
                        placeholder="ravi@example.com"
                        value={form.email}
                        onChange={e => set('email', e.target.value)}
                        onBlur={() => touch('email')}
                        className={inputCls('email') + ' pl-9'}
                      />
                    </div>
                    {touched.email && errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                      <textarea
                        rows={4}
                        placeholder="Tell us about your learning goals, your child's grade, or any specific questions..."
                        value={form.message}
                        onChange={e => set('message', e.target.value)}
                        onBlur={() => touch('message')}
                        className={inputCls('message') + ' pl-9 resize-none'}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      {touched.message && errors.message
                        ? <p className="text-red-500 text-xs">{errors.message}</p>
                        : <span />
                      }
                      <p className="text-gray-400 text-xs">{form.message.length} chars</p>
                    </div>
                  </div>

                  {/* Privacy note */}
                  <p className="text-xs text-gray-400 leading-relaxed">
                    By submitting this form you agree to our{' '}
                    <a href="#" className="underline font-medium" style={{ color: '#4F46E5' }}>Privacy Policy</a>.
                    We'll share your details with our team who will be in touch.
                  </p>

                  {/* Checkbox */}
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => set('agreed', !form.agreed)}
                      className="w-5 h-5 border-2 rounded flex-shrink-0 mt-0.5 flex items-center justify-center transition-all duration-200"
                      style={{
                        backgroundColor: form.agreed ? '#4F46E5' : 'white',
                        borderColor: form.agreed ? '#4F46E5' : '#d1d5db',
                        boxShadow: form.agreed ? '0 0 0 3px rgba(79,70,229,0.15)' : 'none',
                      }}
                    >
                      {form.agreed && (
                        <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      I want to receive more information about degrees and related courses.
                    </p>
                  </div>

                  {/* Error banner */}
                  {status === 'error' && (
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
                      style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {errMsg}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-black text-white text-sm transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-xl transform"
                    style={{
                      backgroundColor: '#4F46E5',
                      boxShadow: '0 4px 20px rgba(79,70,229,0.35)',
                    }}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Enquiry
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
