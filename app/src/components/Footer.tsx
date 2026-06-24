import { Link } from 'react-router-dom'
import { Wheat } from 'lucide-react'

const quickLinks = [
  { label: 'Crop Doctor', path: '/crop-doctor' },
  { label: 'Krishi Guru', path: '/krishi-guru' },
  { label: 'Market Intelligence', path: '/market-intelligence' },
  { label: 'Soil Analyzer', path: '/soil-analyzer' },
  { label: 'Weather Advisory', path: '/weather-advisory' },
]

const resourceLinks = [
  { label: 'Govt Schemes', path: '#' },
  { label: 'Weather Updates', path: '/weather-advisory' },
  { label: 'Market News', path: '/market-intelligence' },
  { label: 'Farming Guide', path: '/krishi-guru' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#1C2518' }} className="text-white">
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo + Tagline */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Wheat className="w-6 h-6 text-[#6B8F71]" />
              <span
                className="text-white text-lg"
                style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}
              >
                KRISHI-AI
              </span>
            </Link>
            <p
              className="text-sm mb-3"
              style={{ color: 'rgba(255,255,255,0.6)', fontFamily: '"Inter", sans-serif' }}
            >
              AI for every farmer
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: '"Inter", sans-serif' }}
            >
              Combining Google Gemini intelligence with deep agricultural knowledge to help
              smallholder farmers across Tamil Nadu.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-[0.08em] mb-5"
              style={{ color: 'rgba(255,255,255,0.8)', fontFamily: '"Inter", sans-serif' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors duration-300 hover:text-[#6B8F71]"
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-[0.08em] mb-5"
              style={{ color: 'rgba(255,255,255,0.8)', fontFamily: '"Inter", sans-serif' }}
            >
              Resources
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors duration-300 hover:text-[#6B8F71]"
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Hackathon Info */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-[0.08em] mb-5"
              style={{ color: 'rgba(255,255,255,0.8)', fontFamily: '"Inter", sans-serif' }}
            >
              About
            </h4>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: 'rgba(255,255,255,0.6)', fontFamily: '"Inter", sans-serif' }}
            >
              Built for Hack Days Krishnagiri
              <br />
              Powered by Google Gemini
            </p>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(107, 143, 113, 0.15)',
                color: '#6B8F71',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Hackathon Project 2025
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <p
            className="text-xs"
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: '"Inter", sans-serif' }}
          >
            &copy; 2025 KRISHI-AI. All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: '"Inter", sans-serif' }}
          >
            Made with ❤️ for Indian farmers
          </p>
        </div>
      </div>
    </footer>
  )
}
