import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Smartphone, Check } from 'lucide-react'

const crops = ['Tomato', 'Onion', 'Rice', 'Groundnut', 'Chili', 'Cotton', 'Banana']

const features = [
  { icon: Bell, text: 'SMS and WhatsApp notifications' },
  { icon: Smartphone, text: 'Works on any phone \u2014 no app needed' },
  { icon: Check, text: 'Set alerts for multiple crops' },
  { icon: Check, text: 'Daily price summary every morning' },
]

export default function PriceAlerts() {
  const [selectedCrop, setSelectedCrop] = useState('')
  const [targetPrice, setTargetPrice] = useState('')
  const [phone, setPhone] = useState('')

  return (
    <section style={{ background: '#2D5A3D' }} className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{
                background: 'rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.9)',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Stay Informed
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4 text-white"
              style={{
                fontFamily: '"Playfair Display", serif',
                letterSpacing: '-0.01em',
              }}
            >
              Set Price Alerts
            </h2>
            <p
              className="mb-8"
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontFamily: '"Inter", sans-serif',
                fontSize: '1.125rem',
                lineHeight: 1.6,
              }}
            >
              Tell us your target price, and we&apos;ll notify you when the market reaches it.
              Never miss the best selling opportunity.
            </p>

            {/* Feature List */}
            <ul className="space-y-3 mb-8">
              {features.map((feature, i) => (
                <motion.li
                  key={feature.text}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.12)' }}
                  >
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <span
                    className="text-sm"
                    style={{
                      color: 'rgba(255,255,255,0.85)',
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {feature.text}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Alert Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              className="rounded-2xl p-5 relative"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              {/* Coming Soon Badge */}
              <div className="absolute -top-3 right-4">
                <span
                  className="px-3 py-1 rounded-full text-[0.6875rem] font-semibold"
                  style={{
                    background: '#D4953A',
                    color: '#fff',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  Coming Soon
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.9)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  <option value="" style={{ color: '#2A2A28' }}>
                    Select Crop
                  </option>
                  {crops.map((crop) => (
                    <option key={crop} value={crop} style={{ color: '#2A2A28' }}>
                      {crop}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Target Price (\u20b9)"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  className="px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.9)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    fontFamily: '"Inter", sans-serif',
                  }}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.9)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    fontFamily: '"Inter", sans-serif',
                  }}
                />
              </div>
              <button
                className="mt-3 w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-250 hover:scale-[1.02]"
                style={{
                  background: '#D4953A',
                  fontFamily: '"Inter", sans-serif',
                  opacity: 0.6,
                  cursor: 'not-allowed',
                }}
                disabled
              >
                Set Your First Alert
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column - Notification Preview */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            className="flex justify-center"
          >
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-full max-w-[320px] rounded-[24px] p-6"
              style={{
                background: '#FFFCF7',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              }}
            >
              {/* Notification Header */}
              <div
                className="rounded-xl px-4 py-3 mb-4 flex items-center gap-2"
                style={{ background: '#D4953A' }}
              >
                <Bell className="w-4 h-4 text-white" />
                <span
                  className="text-sm font-semibold text-white"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  KRISHI-AI Price Alert
                </span>
              </div>

              {/* Notification Body */}
              <div className="space-y-3">
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: '#2A2A28',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  Tomato price at{' '}
                  <strong>Krishnagiri</strong> has reached your target of
                  <strong> \u20b945/kg</strong>!
                </p>
                <div
                  className="rounded-xl p-4"
                  style={{ background: '#FAF6F0' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-xs"
                      style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
                    >
                      Current Price
                    </span>
                    <span
                      className="text-lg font-bold"
                      style={{ color: '#2D5A3D', fontFamily: '"Playfair Display", serif' }}
                    >
                      \u20b946/kg
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className="text-xs font-medium"
                      style={{ color: '#4CAF50' }}
                    >
                      \u2191 8%
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
                    >
                      from yesterday
                    </span>
                  </div>
                </div>
                <p
                  className="text-sm"
                  style={{
                    color: '#2A2A28',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  This is a good time to sell. Prices may drop after new harvest
                  arrivals next week.
                </p>
                <button
                  className="w-full py-2.5 rounded-xl text-sm font-semibold transition-colors"
                  style={{
                    background: 'rgba(107, 143, 113, 0.12)',
                    color: '#6B8F71',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  Tap to view market details \u2192
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
