import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, MapPin, ChevronDown } from 'lucide-react'
import SummaryCards from '@/components/market-intelligence/SummaryCards'
import PriceChart from '@/components/market-intelligence/PriceChart'
import PriceTable from '@/components/market-intelligence/PriceTable'
import AIInsights from '@/components/market-intelligence/AIInsights'
import DemandForecast from '@/components/market-intelligence/DemandForecast'
import PriceAlerts from '@/components/market-intelligence/PriceAlerts'
import MarketGuide from '@/components/market-intelligence/MarketGuide'

const markets = ['Krishnagiri', 'Hosur', 'Dharmapuri', 'Salem', 'Coimbatore', 'Bangalore']

export default function MarketIntelligence() {
  const [selectedMarket, setSelectedMarket] = useState('Krishnagiri')
  const [marketOpen, setMarketOpen] = useState(false)

  return (
    <div>
      {/* ── Section 1: Page Hero ── */}
      <section
        className="relative flex items-center justify-center text-center"
        style={{
          background: 'linear-gradient(135deg, #2D5A3D, #1C2518)',
          minHeight: '45vh',
          paddingTop: '8rem',
          paddingBottom: '3rem',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Breadcrumb */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-sm mb-6"
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Home / Market Intelligence
          </motion.p>

          {/* Tool Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: '#D4953A' }}
          >
            <BarChart3 className="w-7 h-7 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{
              fontFamily: '"Playfair Display", serif',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            Market Intelligence
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            className="max-w-[600px] mx-auto mb-8"
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontFamily: '"Inter", sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.6,
            }}
          >
            Real-time crop prices, AI-powered demand forecasts, and smart
            recommendations to help you sell at the right time for the best
            price.
          </motion.p>

          {/* Location Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            className="relative inline-block"
          >
            <button
              onClick={() => setMarketOpen(!marketOpen)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:bg-white/15"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.9)',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              <MapPin className="w-4 h-4" />
              Market: {selectedMarket}
              <ChevronDown
                className="w-3.5 h-3.5 transition-transform"
                style={{ transform: marketOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>

            {marketOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-full rounded-xl overflow-hidden z-10"
                style={{
                  background: '#FFFCF7',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                }}
              >
                {markets.map((market) => (
                  <button
                    key={market}
                    onClick={() => {
                      setSelectedMarket(market)
                      setMarketOpen(false)
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-[#F5F0E8]"
                    style={{
                      color: market === selectedMarket ? '#2D5A3D' : '#2A2A28',
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: market === selectedMarket ? 600 : 400,
                    }}
                  >
                    {market}
                  </button>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Price Dashboard ── */}
      <section style={{ background: '#FAF6F0' }} className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1100px] mx-auto px-6">
          {/* Summary Cards */}
          <SummaryCards />

          {/* Chart + Table Row */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            {/* Chart - 60% on desktop */}
            <div className="lg:col-span-3">
              <PriceChart />
            </div>
            {/* Table - 40% on desktop */}
            <div className="lg:col-span-2">
              <PriceTable />
            </div>
          </div>

          {/* AI Insights */}
          <AIInsights />
        </div>
      </section>

      {/* ── Section 3: Demand Forecast ── */}
      <DemandForecast />

      {/* ── Section 4: Price Alerts ── */}
      <PriceAlerts />

      {/* ── Section 5: Market Guide ── */}
      <MarketGuide />
    </div>
  )
}
