import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Wheat } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Crop Doctor', path: '/crop-doctor' },
  { label: 'Krishi Guru', path: '/krishi-guru' },
  { label: 'Market', path: '/market-intelligence' },
  { label: 'Soil', path: '/soil-analyzer' },
  { label: 'Weather', path: '/weather-advisory' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center"
      style={{ background: 'rgba(26, 37, 24, 0.95)', backdropFilter: 'blur(12px)' }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Wheat className="w-7 h-7 text-[#6B8F71] transition-transform group-hover:rotate-12" />
          <span
            className="text-white text-xl tracking-tight"
            style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}
          >
            KRISHI-AI
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative text-[0.9375rem] font-medium tracking-[0.02em] transition-colors duration-300 hover:text-white"
                style={{
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-[2px] bg-[#6B8F71] transition-transform duration-300 origin-left"
                  style={{
                    width: '100%',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                  }}
                />
                {!isActive && (
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-[#6B8F71] scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left" />
                )}
              </Link>
            )
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link
            to="/crop-doctor"
            className="inline-flex items-center px-6 py-2.5 rounded-full text-[0.9375rem] font-semibold text-white transition-all duration-250 hover:scale-[1.02]"
            style={{
              background: '#D4953A',
              fontFamily: '"Inter", sans-serif',
              letterSpacing: '0.02em',
            }}
          >
            Try Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] z-50 lg:hidden flex flex-col"
              style={{ background: '#1C2518' }}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <Link
                  to="/"
                  className="flex items-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <Wheat className="w-6 h-6 text-[#6B8F71]" />
                  <span
                    className="text-white text-lg"
                    style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}
                  >
                    KRISHI-AI
                  </span>
                </Link>
                <button
                  className="text-white p-1"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className="text-base font-medium py-2 transition-colors"
                      style={{
                        color: isActive ? '#D4953A' : 'rgba(255,255,255,0.8)',
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      {link.label}
                    </Link>
                  )
                })}
                <Link
                  to="/crop-doctor"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-semibold text-white"
                  style={{ background: '#D4953A', fontFamily: '"Inter", sans-serif' }}
                >
                  Try Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
