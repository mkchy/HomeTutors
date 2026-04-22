'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function DegreeFormSection() {
  const [agreed, setAgreed] = useState(false)
  const [country, setCountry] = useState('India')
  const [phone, setPhone] = useState('India (+91)')

  return (
    <section 
      className="py-20"
      style={{ background: 'linear-gradient(135deg, #fdf4ff 0%, #fce7f3 20%, #ede9fe 45%, #dbeafe 70%, #d1fae5 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-4">
              Want help choosing the right degree?
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-10 max-w-sm">
              Complete this form and we'll share guides, insights, and top courses to help make your degree journey that much clearer.
            </p>

            {/* Graduation illustration (SVG) */}
            <div className="flex items-center justify-center">
              <svg viewBox="0 0 320 320" className="w-64 h-64" xmlns="http://www.w3.org/2000/svg">
                {/* Body */}
                <ellipse cx="160" cy="260" rx="50" ry="14" fill="#e0e0ff" opacity="0.5" />
                {/* Legs */}
                <rect x="135" y="210" width="20" height="55" rx="10" fill="#4338ca" transform="rotate(-5 145 240)" />
                <rect x="160" y="210" width="20" height="55" rx="10" fill="#4338ca" transform="rotate(8 170 240)" />
                {/* Shoes */}
                <ellipse cx="138" cy="265" rx="16" ry="8" fill="#1e1b4b" />
                <ellipse cx="178" cy="265" rx="16" ry="8" fill="#1e1b4b" />
                {/* Torso */}
                <rect x="130" y="140" width="72" height="80" rx="16" fill="#4338ca" />
                {/* Tie */}
                <polygon points="160,148 167,168 160,175 153,168" fill="#f5a623" />
                {/* Arms */}
                <rect x="96" y="145" width="38" height="18" rx="9" fill="#6d28d9" transform="rotate(15 115 154)" />
                <rect x="190" y="145" width="38" height="18" rx="9" fill="#6d28d9" transform="rotate(-20 209 154)" />
                {/* Hand holding book */}
                <rect x="88" y="168" width="32" height="24" rx="6" fill="#f87171" />
                {/* Extended hand */}
                <rect x="202" y="145" width="22" height="14" rx="7" fill="#fbbf24" transform="rotate(-35 213 152)" />
                {/* Head */}
                <circle cx="160" cy="118" r="34" fill="#f87171" />
                {/* Graduation cap */}
                <rect x="130" y="96" width="62" height="10" rx="3" fill="#1e1b4b" />
                <polygon points="160,78 198,96 160,104 122,96" fill="#4338ca" />
                <line x1="198" y1="96" x2="204" y2="118" stroke="#f5a623" strokeWidth="3" />
                <rect x="200" y="116" width="10" height="8" rx="2" fill="#f5a623" />
                {/* Floating caps */}
                <g transform="rotate(-20 80 80)">
                  <rect x="60" y="70" width="36" height="7" rx="2" fill="#4338ca" opacity="0.8" />
                  <polygon points="78,60 96,70 78,74 60,70" fill="#6d28d9" opacity="0.8" />
                </g>
                <g transform="rotate(15 240 60)">
                  <rect x="225" y="55" width="32" height="6" rx="2" fill="#4338ca" opacity="0.7" />
                  <polygon points="241,46 257,55 241,59 225,55" fill="#6d28d9" opacity="0.7" />
                </g>
                {/* Floating shapes */}
                <rect x="60" y="130" width="18" height="10" rx="3" fill="#f87171" opacity="0.7" transform="rotate(-10 69 135)" />
                <rect x="240" y="100" width="22" height="12" rx="3" fill="#f5a623" opacity="0.8" transform="rotate(20 251 106)" />
                <rect x="228" y="165" width="16" height="10" rx="2" fill="#4338ca" opacity="0.6" transform="rotate(-15 236 170)" />
                <rect x="75" y="200" width="14" height="14" rx="2" fill="#4338ca" opacity="0.5" transform="rotate(10 82 207)" />
                <circle cx="230" cy="140" r="6" fill="#1e1b4b" opacity="0.7" />
                <rect x="100" y="90" width="10" height="6" rx="1" fill="#f87171" opacity="0.5" transform="rotate(-25 105 93)" />
              </svg>
            </div>
          </div>

          {/* Right — form */}
          <div className="space-y-5">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition-colors bg-white"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition-colors bg-white"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <div className="relative w-44 flex-shrink-0">
                  <select
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-pink-500 bg-white pr-10"
                  >
                    <option>India (+91)</option>
                    <option>USA (+1)</option>
                    <option>UK (+44)</option>
                    <option>UAE (+971)</option>
                    <option>Singapore (+65)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
                <input
                  type="tel"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition-colors bg-white"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition-colors bg-white"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Country <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-pink-500 bg-white pr-10"
                >
                  <option>India</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>UAE</option>
                  <option>Singapore</option>
                  <option>Canada</option>
                  <option>Australia</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Privacy note */}
            <p className="text-xs text-gray-500 leading-relaxed">
              On submission of this form we'll share your information with FutureLearn who will be in touch. By registering you agree to the{' '}
              <a href="#" className="underline" style={{ color: '#e91e8c' }}>FutureLearn's Privacy Policy</a>.
            </p>

            {/* Checkbox */}
            <div className="flex items-start gap-3">
              <button
                onClick={() => setAgreed(!agreed)}
                className="w-5 h-5 border-2 border-gray-400 rounded flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors"
                style={{ backgroundColor: agreed ? '#e91e8c' : 'white', borderColor: agreed ? '#e91e8c' : '#9ca3af' }}
              >
                {agreed && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <p className="text-xs text-gray-600 leading-relaxed">
                I want to receive more information from FutureLearn about degrees and other related information.
              </p>
            </div>

            {/* Submit */}
            <button
              className="px-10 py-3 rounded-lg text-white font-bold text-sm transition-all duration-300 hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5 transform"
              style={{ backgroundColor: '#4F46E5' }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
