'use client'
import { useState } from 'react'
import { Search, ShoppingCart, Menu, X, ChevronDown, GraduationCap } from 'lucide-react'
import Link from 'next/link' // ✅ correct import

const navItems = [
  { label: 'Home', hasDropdown: false, path: '/' },
  { label: 'Courses', hasDropdown: true, path: '/courses' },
  { label: 'Pages', hasDropdown: true, path: '/pages' },
  { label: 'Pricing', hasDropdown: false, path: '/pricing' },
  { label: 'Contact', hasDropdown: false, path: '/contact' },
  { label: 'About Us', hasDropdown: false, path: '/about' }, // ✅ fixed
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-5 bg-navy-dark">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl">Home Tutors</span>
          </div>
        </Link>
       
        {/* Explore */}
        {/* <button className="hidden lg:flex items-center gap-2 text-accent font-medium text-sm">
          <Menu className="w-4 h-4" />
          Explore
        </button> */}

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <Link key={item.label} href={item.path} className="nav-link group">
              {item.label}
              {item.hasDropdown && (
                <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-200" />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="text-gray-300 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          {/* <button className="text-gray-300 hover:text-white transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">0</span>
          </button> */}
          <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium text-sm">Log in</a>
          <a href="#" className="border border-white/30 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-white hover:text-navy-dark transition-all duration-300">
            Sign up
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden mt-4 bg-navy-mid/95 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.path}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-3 text-gray-300 hover:text-white border-b border-white/5 last:border-0">
              {item.label}
              {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
            </Link>
          ))}
          <div className="flex gap-3 mt-4">
            <a href="#" className="flex-1 text-center py-2 text-gray-300 hover:text-white font-medium">Log in</a>
            <a href="#" className="flex-1 text-center py-2 bg-primary text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">Sign up</a>
          </div>
        </div>
      )}
    </nav>
  )
}

