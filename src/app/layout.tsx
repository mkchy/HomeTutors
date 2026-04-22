import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Home Tutors IIT JEE',
  description: 'Build skills with courses, certificates, and degrees online from world-class universities and companies.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="pt-20">
        {/* ✅ Fixed Navbar */}
        <Navbar />

        {/* ✅ Page Content */}
        {children}

        {/* ✅ Fixed Footer */}
        <Footer />
      </body>
    </html>
  )
}