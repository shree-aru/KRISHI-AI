import { motion } from 'framer-motion'
import { ArrowUp, ArrowDown, Minus } from 'lucide-react'
import { demandForecasts } from '@/data/marketData'

const actionStyles: Record<string, { bg: string; color: string }> = {
  'Sell Now': { bg: 'rgba(76, 175, 80, 0.15)', color: '#4CAF50' },
  'Can Sell': { bg: 'rgba(255, 152, 0, 0.15)', color: '#FF9800' },
  Wait: { bg: 'rgba(255, 152, 0, 0.15)', color: '#FF9800' },
  Hold: { bg: 'rgba(107, 101, 96, 0.12)', color: '#6B6560' },
}

const directionIcon = (dir: string) => {
  if (dir === 'up') return <ArrowUp className="w-3.5 h-3.5" />
  if (dir === 'down') return <ArrowDown className="w-3.5 h-3.5" />
  return <Minus className="w-3.5 h-3.5" />
}

const directionColor = (dir: string) => {
  if (dir === 'up') return '#4CAF50'
  if (dir === 'down') return '#E53935'
  return '#6B6560'
}

export default function DemandForecast() {
  return (
    <section style={{ background: '#F5F0E8' }} className="py-16 sm:py-20 lg:py-24">
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
            AI-Powered Forecasts
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{
              color: '#2D5A3D',
              fontFamily: '"Playfair Display", serif',
              letterSpacing: '-0.01em',
            }}
          >
            What to Sell This Week
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
            Gemini-analyzed demand forecasts and price predictions for your crops.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {demandForecasts.map((forecast, i) => (
            <motion.div
              key={forecast.crop}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.3 },
              }}
              className="rounded-[20px] overflow-hidden transition-shadow duration-300 hover:shadow-lg"
              style={{
                background: '#FFFCF7',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              {/* Top color bar */}
              <div
                className="h-1 w-full"
                style={{ background: forecast.barColor }}
              />

              <div className="p-6">
                {/* Crop name */}
                <h4
                  className="text-lg font-semibold mb-1"
                  style={{
                    color: '#2D5A3D',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {forecast.crop}
                </h4>
                <p
                  className="text-sm mb-4"
                  style={{
                    color: '#2A2A28',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {forecast.currentPrice}
                </p>

                {/* Demand meter */}
                <div className="mb-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="text-xs font-medium"
                      style={{
                        color: '#6B6560',
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      Demand
                    </span>
                    <span
                      className="text-xs font-semibold"
                      style={{
                        color: '#2D5A3D',
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      {forecast.demandPercent}%
                    </span>
                  </div>
                  <div
                    className="w-full h-2 rounded-full overflow-hidden"
                    style={{ background: '#E8E2DA' }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${forecast.demandPercent}%` }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                      }}
                      className="h-full rounded-full"
                      style={{ background: '#6B8F71' }}
                    />
                  </div>
                </div>

                {/* Price prediction */}
                <div className="flex items-center gap-2 mt-4 mb-3">
                  <span
                    className="text-sm"
                    style={{
                      color: '#6B6560',
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    Next 7 days:
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{
                      color: '#2A2A28',
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {forecast.predictionRange}/q
                  </span>
                  <span
                    className="flex items-center"
                    style={{ color: directionColor(forecast.predictionDirection) }}
                  >
                    {directionIcon(forecast.predictionDirection)}
                  </span>
                </div>

                {/* AI reason */}
                <p
                  className="text-sm italic mb-4"
                  style={{
                    color: '#6B6560',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  &ldquo;{forecast.reason}&rdquo;
                </p>

                {/* Action badge */}
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: actionStyles[forecast.action]?.bg || 'rgba(107, 101, 96, 0.12)',
                    color: actionStyles[forecast.action]?.color || '#6B6560',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {forecast.action}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
