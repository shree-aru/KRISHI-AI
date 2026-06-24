import { motion } from 'framer-motion'
import { Clock, Award, Radio } from 'lucide-react'

const guideData = [
  {
    icon: Clock,
    title: 'Timing is Everything',
    tips: [
      'Sell early morning for fresh produce (better quality = better price)',
      'Check prices Tuesday-Thursday (typically higher than weekends)',
      'Sell before your crop\'s main harvest season floods the market',
      'Consider festival demand \u2014 prices rise 10-20% before major festivals',
    ],
    color: '#D4953A',
  },
  {
    icon: Award,
    title: 'Grade Your Produce',
    tips: [
      'Grade A produce fetches 30-40% more than Grade C',
      'Clean, sort, and grade before taking to market',
      'Proper packaging protects quality and commands premium',
      'Consistent quality builds trust with buyers',
    ],
    color: '#4CAF50',
  },
  {
    icon: Radio,
    title: 'Know Your Market',
    tips: [
      'Visit your APMC market regularly to build relationships',
      'Compare prices across 2-3 nearby markets',
      'Join farmer WhatsApp groups for real-time price updates',
      'Use KRISHI-AI\'s daily price summary every morning',
    ],
    color: '#42A5F5',
  },
]

export default function MarketGuide() {
  return (
    <section style={{ background: '#FAF6F0' }} className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          className="text-center mb-12"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{
              background: 'rgba(107, 143, 113, 0.12)',
              color: '#2D5A3D',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Farmer&apos;s Guide
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{
              color: '#2D5A3D',
              fontFamily: '"Playfair Display", serif',
              letterSpacing: '-0.01em',
            }}
          >
            Understanding the Market
          </h2>
          <p
            className="max-w-xl mx-auto"
            style={{
              color: '#6B6560',
              fontFamily: '"Inter", sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.6,
            }}
          >
            Learn how to read market signals and make better selling decisions.
          </p>
        </motion.div>

        {/* Guide Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guideData.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              whileHover={{
                y: -3,
                transition: { duration: 0.3 },
              }}
              className="rounded-2xl p-6 sm:p-8 transition-shadow duration-300 hover:shadow-lg"
              style={{
                background: '#FFFCF7',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${card.color}15` }}
              >
                <card.icon className="w-6 h-6" style={{ color: card.color }} />
              </div>

              {/* Title */}
              <h4
                className="text-lg font-semibold mb-4"
                style={{
                  color: '#2A2A28',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                {card.title}
              </h4>

              {/* Tips List */}
              <ul className="space-y-3">
                {card.tips.map((tip, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + i * 0.1 + j * 0.05,
                    }}
                    className="flex items-start gap-2.5"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ background: card.color }}
                    />
                    <span
                      className="text-sm leading-relaxed"
                      style={{
                        color: '#6B6560',
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      {tip}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
